export const ContinuousDeliveryWorkflow = 'continuous-delivery.yml';
export const ContinuousDeliveryName = 'publish next to npm';

export const VerifiedSenders = new Map<number, string>([
	[4019718, 'Favna'],
	[24852502, 'kyranet'],
	[17960496, 'vladfrangu']
]);

export const packageMatchRegex = /📦\s+Bumped (?<name>@sapphire\/[a-z\-0-9.]+)/g;

export const OctokitRequestHeaders = {
	'X-GitHub-Api-Version': '2022-11-28',
	Accept: 'application/vnd.github+json'
};

export function isNullish(value: unknown): value is null | undefined {
	return value === undefined || value === null;
}
