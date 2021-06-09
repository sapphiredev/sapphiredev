import type { Probot } from 'probot';

export default (app: Probot) => {
	app.on(['issue_comment.created', 'issue_comment.edited'], async (context) => {
		if (context.payload.action === 'created' || context.payload.action === 'edited') {
			const issueBodyLower = context.payload.issue.body.toLowerCase();
			const fullPrData = await context.octokit.pulls.get({
				pull_number: context.payload.issue.number,
				repo: context.payload.repository.full_name,
				owner: context.payload.repository.owner.login
			});

			if (issueBodyLower.includes('@sapphire-bot deploy')) {
				const workflowDispatch = await context.octokit.actions.createWorkflowDispatch({
					workflow_id: 'continuous-delivery.yml',
					owner: 'sapphiredev',
					repo: context.payload.repository.full_name,
					ref: fullPrData.data.head.ref,
					inputs: {
						branch: fullPrData.data.head.ref
					}
				});

				const replyMessage = context.issue({
					body: [
						`Heya ${context.payload.sender.login}, I've started to run the deployment workflow on this PR.`,
						`You can monitor the build [here](https://github.com${workflowDispatch.url})!`
					].join(' ')
				});

				await context.octokit.issues.createComment(replyMessage);
			}
		}
	});
	// For more information on building apps:
	// https://probot.github.io/docs/

	// To get your app running against GitHub, see:
	// https://probot.github.io/docs/development/
};
