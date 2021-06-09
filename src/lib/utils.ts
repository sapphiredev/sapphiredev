import type { Nullish } from '@sapphire/utilities';
import { isNullish } from '@sapphire/utilities';

export function isNullishOrEmpty(value: unknown): value is Nullish | '' {
	return value === '' || isNullish(value);
}
