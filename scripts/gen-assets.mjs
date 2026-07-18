/**
 * Rasterise brand SVGs into the PNG icons + OG image the site references.
 * Run with:  node scripts/gen-assets.mjs   (or `yarn gen:assets`)
 */
import { Resvg } from '@resvg/resvg-js';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/** @param {string} src @param {string} out @param {number} width */
function render(src, out, width) {
	const svg = readFileSync(resolve(root, src));
	const resvg = new Resvg(svg, {
		fitTo: { mode: 'width', value: width },
		font: { loadSystemFonts: true },
		background: 'rgba(0,0,0,0)'
	});
	const png = resvg.render().asPng();
	mkdirSync(dirname(resolve(root, out)), { recursive: true });
	writeFileSync(resolve(root, out), png);
	console.log(`✓ ${out} (${width}px, ${(png.length / 1024).toFixed(0)}kb)`);
}

render('static/favicon.svg', 'static/icon-192.png', 192);
render('static/favicon.svg', 'static/icon-512.png', 512);
render('static/og/auracare-og.svg', 'static/og/auracare-og.png', 1200);
console.log('Done generating brand assets.');
