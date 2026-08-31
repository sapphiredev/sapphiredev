import { processGitHubWebhookRequest } from './processGitHubWebhookRequest.js';
import type { Env } from './types.js';

export default {
	fetch(request: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
		console.log('Received request:', request.method, request.url);
		return processGitHubWebhookRequest(request, env);
	}
};
