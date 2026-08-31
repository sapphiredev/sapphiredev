export const PublishWorkflow = 'publish.yml';
export const PublishName = 'Publish @sapphire/';

export const ValidPackages: string[] = [
	'async-queue',
	'bitfield',
	'cron',
	'decorators',
	'discord-utilities',
	'discord.js-utilities',
	'duration',
	'eslint-config',
	'eslint-plugin-result',
	'event-iterator',
	'fetch',
	'iterator-utilities',
	'lexure',
	'node-utilities',
	'phisherman',
	'prettier-config',
	'ratelimits',
	'result',
	'snowflake',
	'stopwatch',
	'string-store',
	'time-utilities',
	'timer-manager',
	'timestamp',
	'ts-config',
	'utilities'
];

export const VerifiedSenders = new Map<number, string>([
	[4019718, 'Favna'],
	[24852502, 'kyranet'],
	[17960496, 'vladfrangu']
]);

export const packageMatchRegex = /📦\s+Bumped (?<name>@sapphire\/[a-z\-0-9.]+)/g;

export const OctokitRequestHeaders = {
	'X-GitHub-Api-Version': '2026-03-10',
	Accept: 'application/vnd.github+json'
};

export function isNullish(value: unknown): value is null | undefined {
	return value === undefined || value === null;
}
