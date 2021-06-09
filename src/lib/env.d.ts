export type BooleanString = 'true' | 'false';
export type IntegerString = `${bigint}`;

export type SapphireBotEnvAny = keyof SapphireBotEnv;
export type SapphireBotEnvString = {
	[K in SapphireBotEnvAny]: SapphireBotEnv[K] extends BooleanString | IntegerString ? never : K;
}[SapphireBotEnvAny];
export type SapphireBotEnvBoolean = { [K in SapphireBotEnvAny]: SapphireBotEnv[K] extends BooleanString ? K : never }[SapphireBotEnvAny];
export type SapphireBotEnvInteger = { [K in SapphireBotEnvAny]: SapphireBotEnv[K] extends IntegerString ? K : never }[SapphireBotEnvAny];

export interface SapphireBotEnv {
	/**
	 * The App ID assigned to your GitHub App.
	 * @required
	 * @example
	 * 1234
	 */
	APP_ID: IntegerString;
	/**
	 * The webhook secret used when creating a GitHub App.
	 * 'development' is used as a default,
	 * but the value in .env needs to match the value configured in
	 * your App settings on GitHub.
	 *
	 * @remark GitHub marks this value as optional,
	 * but for optimal security it's required for Probot apps.
	 *
	 * @required
	 *
	 * @example
	 * 'development'
	 */
	WEBHOOK_SECRET: string;
	/**
	 * Allows your local development environment to receive GitHub webhook events. Go to https://smee.io/new to get started.
	 * @example
	 * 'https://smee.io/your-custom-url'
	 */
	WEBHOOK_PROXY_URL: string;

	// Use `trace` to get verbose logging or `info` to show less
	/**
	 * The verbosity of logs to show when running your app
	 * @default 'info'
	 */
	LOG_LEVEL: 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace' | 'silent';
	/**
	 * The contents of the private key for your GitHub App. If you're unable to use multiline environment variables, use base64 encoding to convert the key to a single line string.
	 *
	 * See the [Deployment](https://probot.github.io/docs/deployment/) docs for provider specific usage.
	 */
	PRIVATE_KEY: string;
	/**
	 * Whether dotenv should log all the environment variables that it is reading
	 * @default false
	 */
	DOTENV_DEBUG_ENABLED: BooleanString;
	/**
	 * Set to a [Sentry](https://sentry.io/) DSN to report all errors thrown by your app.
	 * @example
	 * 'https://1234abcd@sentry.io/12345'
	 */
	SENTRY_DSN: string;
	/**
	 * The port to start the local server on.
	 * @default 3000
	 */
	PORT: IntegerString;
	/**
	 * The host to start the local server on.
	 * @default 'localhost'
	 */
	HOST: string;
	/**
	 * Set to a `redis://` url as connection option for [ioredis](https://github.com/luin/ioredis#connect-to-redis) in order to enable [cluster support for request throttling](https://github.com/octokit/plugin-throttling.js#clustering).
	 */
	REDIS_URL: string;
}
