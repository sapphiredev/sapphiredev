import { rm } from 'fs/promises';

const apiDir = new URL('../api/', import.meta.url);
const distDir = new URL('../dist/', import.meta.url);

const config = { recursive: true, force: true };
await rm(apiDir, config);
await rm(distDir, config);
