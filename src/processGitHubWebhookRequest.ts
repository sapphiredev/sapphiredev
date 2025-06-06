import { App } from '@octokit/app';
import { Octokit } from '@octokit/core';
import { restEndpointMethods } from '@octokit/plugin-rest-endpoint-methods';
import { retry } from '@octokit/plugin-retry';
import {
	ContinuousDeliveryName,
	ContinuousDeliveryWorkflow,
	OctokitRequestHeaders,
	VerifiedSenders,
	isNullish,
	packageMatchRegex
} from './constants.js';
import { getJobLogs } from './octokit/getJobLogs.js';
import type { Env, SupportedWebhookEvents } from './types.js';
import { verifyWebhookSignature } from './verify.js';

const HydratedOctokit = Octokit.plugin(restEndpointMethods).plugin(retry).defaults({
	userAgent: 'Sapphire Deployer/ (@octokit/core) (https://github.com/sapphiredev/sapphiredev/tree/main)'
});

async function processPackages(octokit: Octokit & ReturnType<typeof restEndpointMethods>, owner: string, repo: string, publishJobId: number) {
	const jobLogsUrl = await getJobLogs(octokit, owner, repo, publishJobId);
	if (!jobLogsUrl) return null;

	const jobLogsResult = await fetch(jobLogsUrl);
	const jobLogs = await jobLogsResult.text();

	const regexMatches = jobLogs.matchAll(packageMatchRegex);
	return [...regexMatches].map((match) => match.groups?.name).filter(Boolean);
}

export async function processGitHubWebhookRequest(request: Request, env: Env): Promise<Response> {
	const appId = env.APP_ID;
	const secret = env.WEBHOOK_SECRET;
	const privateKey = env.PRIVATE_KEY;

	const app = new App({
		appId,
		privateKey,
		webhooks: {
			secret
		},
		Octokit: HydratedOctokit
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

			const fullPrData = await octokit.rest.pulls.get({
				owner,
				repo,
				pull_number: payload.issue.number,
				headers: OctokitRequestHeaders
			});

			if (commentBodyLowerCase.includes('@sapphiredev pack') && fullPrData.data.head.repo) {
				// Store the this PR number
				const lastPrNumber = payload.issue.number;
				const lastCommenter = payload.sender.login;

				await octokit.rest.actions.createWorkflowDispatch({
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

				await octokit.rest.issues.createComment({
					owner,
					repo,
					issue_number: payload.issue.number,
					body: [
						`Heya @${lastCommenter}, I've started to run the deployment workflow on this PR at ${fullPrData.data.head.sha.slice(0, 7)}.`,
						`You can monitor the build [here](${workflowUrl})!`
					].join(' '),
					headers: OctokitRequestHeaders
				});

				await env.cache.put('LAST_PR_NUMBER', lastPrNumber.toString());
				await env.cache.put('LAST_COMMENTER', lastCommenter);
			}
		}
	});

	app.webhooks.on('workflow_run.completed', async ({ octokit, payload }) => {
		const lastPrNumber = await env.cache.get('LAST_PR_NUMBER');
		const lastCommenter = await env.cache.get('LAST_COMMENTER');
		// Validate that the action is completed
		if (lastPrNumber && lastCommenter && payload.action === 'completed' && payload.workflow?.path.endsWith(ContinuousDeliveryWorkflow)) {
			const workflowRunInfo = payload.workflow_run;
			const owner = payload.repository.owner.name ?? 'sapphiredev';
			const repo = payload.repository.name;

			if (!workflowRunInfo) return;

			const workflowJobs = await octokit.rest.actions.listJobsForWorkflowRun({
				owner,
				repo,
				run_id: workflowRunInfo.id,
				headers: OctokitRequestHeaders
			});

			const publishJobId = workflowJobs.data.jobs.find((job) => job.name.toLowerCase().startsWith(ContinuousDeliveryName))?.id;
			if (!publishJobId) return;

			const packageNames = await processPackages(octokit, owner, repo, publishJobId);
			if (!packageNames?.length) return;

			await octokit.rest.issues.createComment({
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

			// Remove values from KV
			await env.cache.delete('LAST_PR_NUMBER');
			await env.cache.delete('LAST_COMMENTER');
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
		return new Response(`{ "error": "Webhook signature verification failed: ${error instanceof Error ? error.message : 'Unknown error'}" }`, {
			status: 400,
			headers: { 'content-type': 'application/json' }
		});
	}

	// Verify that the headers were provided
	if (!id || !name) {
		return new Response(`{ "error": "Missing wequiwed headews. Maybe you awe not CwoudFwawe? UwU" }`, {
			status: 400,
			headers: { 'content-type': 'application/json' }
		});
	}

	// Now handle the request
	try {
		await app.webhooks.receive({
			id,
			name: name as SupportedWebhookEvents,
			payload
		});

		return new Response(`{ "ok": true }`, {
			headers: { 'content-type': 'application/json' }
		});
	} catch (error) {
		return new Response(`{ "error": "Server error: ${error instanceof Error ? error.message : 'Unknown error'}" }`, {
			status: 500,
			headers: { 'content-type': 'application/json' }
		});
	}
}
