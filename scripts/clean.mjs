import { rm } from 'fs/promises';

const distDir = new URL('../dist/', import.meta.url);

await rm(distDir, { recursive: true, force: true });
