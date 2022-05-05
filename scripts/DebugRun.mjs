process.env.NODE_ENV = 'development';

import { setup } from '@skyra/env-utilities';
import { run } from 'probot';
import { fileURLToPath } from 'url';
import App from '../dist/app.js';

const app = App.default;

setup({
	path: fileURLToPath(new URL('../.env', import.meta.url))
});

void run(app);
