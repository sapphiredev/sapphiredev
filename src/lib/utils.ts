import { isNullish, Nullish } from '@sapphire/utilities';

export function isNullishOrEmpty(value: unknown): value is Nullish | '' {
	return value === '' || isNullish(value);
}
