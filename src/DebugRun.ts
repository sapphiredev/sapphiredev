import { config } from 'dotenv-cra';
import { join } from 'path';
import { run } from 'probot';
import app from './lib/App';
import { rootFolder } from './lib/constants';

config({
	path: join(rootFolder, '.env')
});

void run(app);
