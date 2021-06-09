import { ContinuousDeliveryWorkflow } from '#lib/constants';
import { isNullish } from '@sapphire/utilities';
import type { Probot } from 'probot';

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
			!isNullish((context.payload.issue as IssueWithPullRequestPayload).pull_request)
		) {
			const issueBodyLower = context.payload.comment.body.toLowerCase();
			const workflowUrl = `https://github.com/${context.payload.repository.full_name}/actions/workflows/${ContinuousDeliveryWorkflow}`;

			try {
				const fullPrData = await context.octokit.pulls.get(context.pullRequest());

				if (issueBodyLower.includes('@sapphiredev deploy')) {
					try {
						await context.octokit.actions.createWorkflowDispatch({
							workflow_id: ContinuousDeliveryWorkflow,
							owner: context.payload.repository.owner.name ?? 'sapphiredev',
							repo: context.payload.repository.name,
							ref: fullPrData.data.head.ref
						});

						const replyMessage = context.issue({
							body: [
								`Heya ${context.payload.sender.login}, I've started to run the deployment workflow on this PR.`,
								`You can monitor the build [here](${workflowUrl})!`
							].join(' ')
						});

						await context.octokit.issues.createComment(replyMessage);
					} catch (error) {
						context.log.fatal(error);
					}
				}
			} catch (error) {
				context.log.fatal(error);
			}
		}
	});
};
