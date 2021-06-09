import { config } from 'dotenv-cra';
import { join } from 'path';
import { createNodeMiddleware, createProbot } from 'probot';
import app from './lib/App';
import { rootFolder } from './lib/constants';

config({
	path: join(rootFolder, '.env')
});

const probot = createProbot({
	defaults: {
		webhookPath: '/api'
	}
});

export default createNodeMiddleware(app, { probot });
