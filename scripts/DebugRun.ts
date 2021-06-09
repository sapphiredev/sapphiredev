process.env.NODE_ENV = 'development';

import { config } from 'dotenv-cra';
import { join } from 'path';
import { run } from 'probot';
import app from '../api/github/webhooks/lib/App';

config({
	path: join(__dirname, '..', '.env')
});

void run(app);
