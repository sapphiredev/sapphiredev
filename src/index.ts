import { processGitHubWebhookRequest } from './processGitHubWebhookRequest.js';
import type { Env } from './types.js';

export default {
	fetch(request: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
		return processGitHubWebhookRequest(request, env);
	}
};
