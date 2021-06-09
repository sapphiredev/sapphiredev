import esbuild from 'esbuild';
import { opendir } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath, URL } from 'url';

async function* scan(path, cb) {
	const dir = await opendir(path);

	for await (const item of dir) {
		const file = join(dir.path, item.name);
		if (item.isFile()) {
			if (cb(file)) yield file;
		} else if (item.isDirectory()) {
			yield* scan(file, cb);
		}
	}
}

export async function build(watch = false) {
	const rootFolder = new URL('../', import.meta.url);
	const distFolder = new URL('dist/', rootFolder);
	const srcFolder = new URL('src/', rootFolder);

	const cb = (path) => path.endsWith('.ts');

	const tsFiles = [];

	for await (const path of scan(srcFolder, cb)) {
		if (!path.endsWith('.d.ts')) {
			tsFiles.push(path);
		}
	}

	await esbuild.build({
		logLevel: 'info',
		entryPoints: tsFiles,
		format: 'esm',
		resolveExtensions: ['.ts', '.js'],
		write: true,
		outdir: fileURLToPath(distFolder),
		platform: 'node',
		tsconfig: join(fileURLToPath(srcFolder), 'tsconfig.json'),
		watch,
		incremental: watch,
		sourcemap: true,
		external: [],
		minify: process.env.NODE_ENV === 'production'
	});
}
