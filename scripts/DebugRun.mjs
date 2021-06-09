process.env.NODE_ENV = 'development';

import { config } from 'dotenv-cra';
import { run } from 'probot';
import { fileURLToPath } from 'url';
import App from '../dist/app.js';

const app = App.default;

config({
	path: fileURLToPath(new URL('../.env', import.meta.url))
});

void run(app);
