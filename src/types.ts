import type { WebhookEventName } from '@octokit/webhooks-types';

export type SupportedWebhookEvents = Extract<WebhookEventName, 'workflow_run.completed' | 'issue_comment.created' | 'issue_comment.edited'>;

export interface Env {
	APP_ID: string;
	PRIVATE_KEY: string;
	WEBHOOK_SECRET: string;
	cache: KVNamespace;
}

export interface PullRequestData {
	url: string;
	id: number;
	number: number;
	head: Ref;
	base: Ref;
}

interface Ref {
	ref: string;
	sha: string;
	repo: Repo;
}

interface Repo {
	id: number;
	url: string;
	name: string;
}
