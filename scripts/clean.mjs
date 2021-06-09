import { rm } from 'fs/promises';

const apiDir = new URL('../api/', import.meta.url);

await rm(apiDir, { recursive: true, force: true });
