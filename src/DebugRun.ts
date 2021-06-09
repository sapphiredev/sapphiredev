import app from '#lib/App';
import { rootFolder } from '#lib/constants';
import { envParseBoolean } from '#lib/env-parsers';
import { config } from 'dotenv-cra';
import { run } from 'probot';
import { fileURLToPath, URL } from 'url';

config({
	debug: process.env.DOTENV_DEBUG_ENABLED ? envParseBoolean('DOTENV_DEBUG_ENABLED') : undefined,
	path: fileURLToPath(new URL('.env', rootFolder))
});

void run(app);
