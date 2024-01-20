export interface Env {
	APP_ID: string;
	PRIVATE_KEY: string;
	WEBHOOK_SECRET: string;
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
