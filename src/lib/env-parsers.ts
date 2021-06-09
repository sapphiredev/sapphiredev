import { isNullishOrEmpty } from '#lib/utils';
import type { SapphireBotEnv, SapphireBotEnvAny, SapphireBotEnvBoolean, SapphireBotEnvInteger, SapphireBotEnvString } from './env';

export function envParseInteger(key: SapphireBotEnvInteger, defaultValue?: number): number {
	const value = process.env[key];
	if (isNullishOrEmpty(value)) {
		if (defaultValue === undefined) throw new Error(`[ENV] ${key} - The key must be an integer, but is empty or undefined.`);
		return defaultValue;
	}

	const integer = Number(value);
	if (Number.isInteger(integer)) return integer;
	throw new Error(`[ENV] ${key} - The key must be an integer, but received '${value}'.`);
}

export function envParseBoolean(key: SapphireBotEnvBoolean, defaultValue?: boolean): boolean {
	const value = process.env[key];
	if (isNullishOrEmpty(value)) {
		if (defaultValue === undefined) throw new Error(`[ENV] ${key} - The key must be a boolean, but is empty or undefined.`);
		return defaultValue;
	}

	if (value === 'true') return true;
	if (value === 'false') return false;
	throw new Error(`[ENV] ${key} - The key must be a boolean, but received '${value}'.`);
}

export function envParseString<K extends SapphireBotEnvString>(key: K, defaultValue?: SapphireBotEnv[K]): SapphireBotEnv[K] {
	const value = process.env[key];
	if (isNullishOrEmpty(value)) {
		if (defaultValue === undefined) throw new Error(`[ENV] ${key} - The key must be a string, but is empty or undefined.`);
		return defaultValue;
	}

	return value as SapphireBotEnv[K];
}

export function envParseArray(key: SapphireBotEnvString, defaultValue?: string[]): string[] {
	const value = process.env[key];
	if (isNullishOrEmpty(value)) {
		if (defaultValue === undefined) throw new Error(`[ENV] ${key} - The key must be an array, but is empty or undefined.`);
		return defaultValue;
	}

	return value.split(' ');
}

export function envIsDefined(...keys: readonly SapphireBotEnvAny[]): boolean {
	return keys.every((key) => {
		const value = process.env[key];
		return value !== undefined && value.length !== 0;
	});
}
