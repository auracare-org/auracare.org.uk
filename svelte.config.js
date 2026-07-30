import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	// Runtime pinned so the investor-form function builds the same everywhere,
	// regardless of the local Node version.
	kit: { adapter: adapter({ runtime: 'nodejs22.x' }) }
};

export default config;
