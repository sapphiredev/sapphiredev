import { config } from 'dotenv-cra';
import { join } from 'path';
import { createNodeMiddleware, createProbot } from 'probot';
import app from './app';

config({
	path: process.env.NODE_ENV === 'production' ? join(__dirname, '.env') : join(__dirname, '..', '.env')
});

export default createNodeMiddleware(app, {
	probot: createProbot(),
	webhooksPath: '/api/'
});
