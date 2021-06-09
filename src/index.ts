import app from '#lib/App';
import { rootFolder } from '#lib/constants';
import { envParseBoolean } from '#lib/env-parsers';
import { config } from 'dotenv-cra';
import { createNodeMiddleware, createProbot } from 'probot';
import { fileURLToPath, URL } from 'url';

config({
	debug: process.env.DOTENV_DEBUG_ENABLED ? envParseBoolean('DOTENV_DEBUG_ENABLED') : undefined,
	path: fileURLToPath(new URL('.env', rootFolder))
});

const probot = createProbot({
	defaults: {
		webhookPath: '/api/github/webhooks'
	}
});

export default createNodeMiddleware(app, { probot });
