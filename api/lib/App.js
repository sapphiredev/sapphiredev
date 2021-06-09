"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utilities_1 = require("@sapphire/utilities");
const constants_1 = require("./constants");
exports.default = (app) => {
    app.on(['issue_comment.created', 'issue_comment.edited'], async (context) => {
        var _a;
        /** Do not trigger if the comment was made by a bot */
        if (context.isBot) {
            return;
        }
        if (
        /** Validate that the action is either comments created or comments edited */
        (context.payload.action === 'created' || context.payload.action === 'edited') &&
            !utilities_1.isNullish(context.payload.issue.pull_request)) {
            const issueBodyLower = context.payload.comment.body.toLowerCase();
            const workflowUrl = `https://github.com/${context.payload.repository.full_name}/actions/workflows/${constants_1.ContinuousDeliveryWorkflow}`;
            try {
                const fullPrData = await context.octokit.pulls.get(context.pullRequest());
                if (issueBodyLower.includes('@sapphiredev deploy')) {
                    try {
                        await context.octokit.actions.createWorkflowDispatch({
                            workflow_id: constants_1.ContinuousDeliveryWorkflow,
                            owner: (_a = context.payload.repository.owner.name) !== null && _a !== void 0 ? _a : 'sapphiredev',
                            repo: context.payload.repository.name,
                            ref: fullPrData.data.head.ref
                        });
                        const replyMessage = context.issue({
                            body: [
                                `Heya @${context.payload.sender.login}, I've started to run the deployment workflow on this PR.`,
                                `You can monitor the build [here](${workflowUrl})!`
                            ].join(' ')
                        });
                        await context.octokit.issues.createComment(replyMessage);
                    }
                    catch (error) {
                        context.log.fatal(error);
                    }
                }
            }
            catch (error) {
                context.log.fatal(error);
            }
        }
    });
};
//# sourceMappingURL=App.js.map