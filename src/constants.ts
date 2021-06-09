export function isNullish(value: unknown): value is undefined | null {
	return value === undefined || value === null;
}

export const ContinuousDeliveryWorkflow = 'continuous-delivery.yml';

export const VerifiedSenders = new Map<number, string>([
	[4019718, 'Favna'],
	[24852502, 'kyranet'],
	[17960496, 'vladfrangu']
]);
