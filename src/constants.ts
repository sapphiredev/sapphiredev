export function isNullish(value: unknown): value is undefined | null {
	return value === undefined || value === null;
}

export const ContinuousDeliveryWorkflow = 'continuous-delivery.yml';
export const PublishJobName = 'publish next to npm';

export const VerifiedSenders = new Map<number, string>([
	[4019718, 'Favna'],
	[24852502, 'kyranet'],
	[17960496, 'vladfrangu']
]);

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
