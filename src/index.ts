import { config } from 'dotenv-cra';
import { join } from 'path';
import { createNodeMiddleware, createProbot } from 'probot';
import app from './App';

config({
	path: join(__dirname, '..', '.env')
});

const probot = createProbot({
	defaults: {
		webhookPath: '/api/'
	}
});

export default createNodeMiddleware(app, { probot });
