import { App } from '@octokit/app';
import {
	ContinuousDeliveryName,
	ContinuousDeliveryWorkflow,
	OctokitRequestHeaders,
	VerifiedSenders,
	isNullish,
	packageMatchRegex
} from './constants.js';
import type { Env } from './types.js';
import { verifyWebhookSignature } from './verify.js';

export async function processGitHubWebhookRequest(request: Request, env: Env): Promise<Response> {
	const appId = env.APP_ID;
	const secret = env.WEBHOOK_SECRET;
	const privateKey = env.PRIVATE_KEY;

	const app = new App({
		appId,
		privateKey,
		webhooks: {
			secret
		}
	});

	app.webhooks.on(['issue_comment.created', 'issue_comment.edited'], async ({ octokit, payload }) => {
		type IssueWithPullRequestPayload = typeof payload.issue & {
			/** Pull Request API data. This is only undefined on Issue comments so we can use it to filter out those */
			pull_request: Record<PropertyKey, unknown> | undefined;
		};

		/** Do not trigger if the comment was made by a bot */
		if (payload.sender.type === 'Bot') {
			return;
		}

		if (
			/** Validate that the action is either comments created or comments edited */
			(payload.action === 'created' || payload.action === 'edited') &&
			!isNullish((payload.issue as IssueWithPullRequestPayload).pull_request) &&
			VerifiedSenders.has(payload.sender.id)
		) {
			const owner = payload.repository.owner.login ?? 'sapphiredev';
			const repo = payload.repository.name;
			const commentBodyLowerCase = payload.comment.body.toLowerCase();
			const workflowUrl = `https://github.com/${payload.repository.full_name}/actions/workflows/${ContinuousDeliveryWorkflow}`;

			const fullPrData = await octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}', {
				owner,
				repo,
				pull_number: payload.issue.number,
				headers: OctokitRequestHeaders
			});

			if (commentBodyLowerCase.includes('@sapphiredev pack') && fullPrData.data.head.repo) {
				// Store the this PR number
				const lastPrNumber = payload.issue.number;
				const lastCommenter = payload.sender.login;

				await octokit.request('POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches', {
					workflow_id: ContinuousDeliveryWorkflow,
					owner,
					repo,
					ref: 'main',
					inputs: {
						prNumber: payload.issue.number.toString(),
						ref: fullPrData.data.head.ref,
						repository: fullPrData.data.head.repo.full_name
					},
					headers: OctokitRequestHeaders
				});

				await octokit.request('POST /repos/{owner}/{repo}/issues/{issue_number}/comments', {
					owner,
					repo,
					issue_number: payload.issue.number,
					body: [
						`Heya @${lastCommenter}, I've started to run the deployment workflow on this PR at ${fullPrData.data.head.sha.slice(0, 7)}.`,
						`You can monitor the build [here](${workflowUrl})!`
					].join(' '),
					headers: OctokitRequestHeaders
				});

				await env.CACHE.put('LAST_PR_NUMBER', lastPrNumber.toString());
				await env.CACHE.put('LAST_COMMENTER', lastCommenter);
			}
		}
	});

	app.webhooks.on('workflow_run.completed', async ({ octokit, payload }) => {
		const lastPrNumber = await env.CACHE.get('LAST_PR_NUMBER');
		const lastCommenter = await env.CACHE.get('LAST_COMMENTER');

		console.log('Processing workflow completed');
		console.log('lastPrNumber', lastPrNumber);
		console.log('lastCommenter', lastCommenter);
		console.log('payload.action', payload.action);
		console.log('payload.workflow.path', payload.workflow.path);
		console.log(
			"lastPrNumber && lastCommenter && payload.action === 'completed' && payload.workflow.path.endsWith(ContinuousDeliveryWorkflow)",
			Boolean(lastPrNumber && lastCommenter && payload.action === 'completed' && payload.workflow.path.endsWith(ContinuousDeliveryWorkflow))
		);

		// Validate that the action is completed
		if (lastPrNumber && lastCommenter && payload.action === 'completed' && payload.workflow.path.endsWith(ContinuousDeliveryWorkflow)) {
			const workflowRunInfo = payload.workflow_run;
			const owner = payload.repository.owner.name ?? 'sapphiredev';
			const repo = payload.repository.name;

			console.log('If checks passed: 1');
			if (workflowRunInfo) {
				console.log('If checks passed: 2');
				const workflowJobs = await octokit.request('GET /repos/{owner}/{repo}/actions/runs/{run_id}/jobs', {
					owner,
					repo,
					run_id: workflowRunInfo.id,
					headers: OctokitRequestHeaders
				});

				const publishJobId = workflowJobs.data.jobs.find((job) => job.name.toLowerCase() === ContinuousDeliveryName)?.id;

				if (publishJobId) {
					console.log('If checks passed: 3');
					const jobLogsData = await octokit.request('GET /repos/{owner}/{repo}/actions/jobs/{job_id}/logs', {
						owner,
						repo,
						job_id: publishJobId,
						headers: OctokitRequestHeaders
					});

					if (jobLogsData.url) {
						console.log('If checks passed: 4');
						const jobLogsResult = await fetch(jobLogsData.url);
						const jobLogs = await jobLogsResult.text();

						const regexMatches = jobLogs.matchAll(packageMatchRegex);
						const packageNames = [...regexMatches].map((match) => match.groups?.name).filter(Boolean);

						if (packageNames.length) {
							console.log('If checks passed: 5');
							await octokit.request('POST /repos/{owner}/{repo}/issues/{issue_number}/comments', {
								owner,
								repo,
								issue_number: Number(lastPrNumber),
								body: [
									`Hey @${lastCommenter}, I've released this to NPM. You can install it for testing like so:`,
									'```sh',
									packageNames.map((name) => `npm install ${name}@pr-${lastPrNumber}`).join('\n'),
									'```'
								].join('\n'),
								headers: OctokitRequestHeaders
							});
						}
					}
				}
			}

			// Remove values from KV
			await env.CACHE.delete('LAST_PR_NUMBER');
			await env.CACHE.delete('LAST_COMMENTER');
		}
	});

	if (request.method === 'GET') {
		return new Response(
			`<h1>Sapphiredev Homepage</h1>

<p>You found the landing page for the CloudFlare worker that manages our GitHub app.</p>

<p>There really isn't anything to see here.</p>`,
			{
				headers: { 'content-type': 'text/html' }
			}
		);
	}

	const id = request.headers.get('x-github-delivery');
	const name = request.headers.get('x-github-event');
	const signature = request.headers.get('x-hub-signature-256') ?? '';
	const payloadString = await request.text();
	const payload = JSON.parse(payloadString);

	// Verify webhook signature
	try {
		await verifyWebhookSignature(payloadString, signature, secret);
	} catch (error) {
		const typedError = error as Error;
		app.log.warn(typedError.message);
		return new Response(`{ "error": "${typedError.message}" }`, {
			status: 400,
			headers: { 'content-type': 'application/json' }
		});
	}

	// Verify that the headers were provided
	if (!id || !name) {
		return new Response(`{ "error": "Missing required headers" }`, {
			status: 400,
			headers: { 'content-type': 'application/json' }
		});
	}

	// Now handle the request
	try {
		await app.webhooks.receive({
			id,
			name: name as any,
			payload
		});

		return new Response(`{ "ok": true }`, {
			headers: { 'content-type': 'application/json' }
		});
	} catch (error) {
		const typedError = error as Error;
		app.log.error(typedError.message);

		return new Response(`{ "error": "${typedError.message}" }`, {
			status: 500,
			headers: { 'content-type': 'application/json' }
		});
	}
}
