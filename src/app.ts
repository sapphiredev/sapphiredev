import { fetch, FetchResultTypes } from '@sapphire/fetch';
import type { Probot } from 'probot';
import { ContinuousDeliveryWorkflow, isNullish, PublishJobName, VerifiedSenders } from './constants';

let lastPrNumber = 0;
export default (app: Probot) => {
	app.on(['issue_comment.created', 'issue_comment.edited'], async (context) => {
		type IssueWithPullRequestPayload = typeof context.payload.issue & {
			/** Pull Request API data. This is only undefined on Issue comments so we can use it to filter out those */
			pull_request: Record<PropertyKey, unknown> | undefined;
		};

		/** Do not trigger if the comment was made by a bot */
		if (context.isBot) {
			return;
		}

		if (
			/** Validate that the action is either comments created or comments edited */
			(context.payload.action === 'created' || context.payload.action === 'edited') &&
			!isNullish((context.payload.issue as IssueWithPullRequestPayload).pull_request) &&
			VerifiedSenders.has(context.payload.sender.id)
		) {
			const commentBodyLowerCase = context.payload.comment.body.toLowerCase();
			const workflowUrl = `https://github.com/${context.payload.repository.full_name}/actions/workflows/${ContinuousDeliveryWorkflow}`;

			const fullPrData = await context.octokit.pulls.get(context.pullRequest());

			if (commentBodyLowerCase.includes('@sapphiredev pack')) {
				// Store the this PR number
				lastPrNumber = context.payload.issue.number;

				await context.octokit.actions.createWorkflowDispatch({
					workflow_id: ContinuousDeliveryWorkflow,
					owner: context.payload.repository.owner.name ?? 'sapphiredev',
					repo: context.payload.repository.name,
					ref: 'main',
					inputs: {
						prNumber: context.payload.issue.number.toString(),
						ref: fullPrData.data.head.ref,
						repository: fullPrData.data.head.repo.full_name
					}
				});

				const replyMessage = context.issue({
					body: [
						`Heya @${context.payload.sender.login}, I've started to run the deployment workflow on this PR.`,
						`You can monitor the build [here](${workflowUrl})!`
					].join(' ')
				});

				await context.octokit.issues.createComment(replyMessage);
			}
		}
	});

	app.on('workflow_run.completed', async (context) => {
		if (
			/** Validate that the action is completed */
			context.payload.action === 'completed' &&
			context.payload.workflow?.path.endsWith(ContinuousDeliveryWorkflow)
		) {
			const workflowRunInfo = context.payload.workflow_run;
			const { owner, repo } = context.issue();

			if (workflowRunInfo) {
				const workflowJobs = await context.octokit.actions.listJobsForWorkflowRun({ owner, repo, run_id: workflowRunInfo.id });

				const publishJobId = workflowJobs.data.jobs.find((job) => job.name.toLowerCase() === PublishJobName)?.id;

				if (publishJobId) {
					const jobLogsData = await context.octokit.actions.downloadJobLogsForWorkflowRun({ owner, repo, job_id: publishJobId });

					if (jobLogsData.url) {
						const jobLogs = await fetch(jobLogsData.url, FetchResultTypes.Text);

						const matched = jobLogs.match(/📦\s+@sapphire\/[a-z\-0-9.]+/g);

						if (matched) {
							const packageNames = matched.map((a) => a.slice(4));

							await context.octokit.issues.createComment({
								owner,
								repo,
								body: [
									`The deployment workflow has finished successfully. You can install it for testing like so:`,
									'```sh',
									packageNames.map((name) => `npm install ${name}@pr-${lastPrNumber}`).join('\n'),
									'```'
								].join('\n'),
								issue_number: lastPrNumber
							});
						}
					}
				}
			}

			// Reset value to 0
			lastPrNumber = 0;
		}
	});
};
