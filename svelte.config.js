import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		autoPreprocess: {
			replace: [
				[/process\.env\.NODE_ENV/g, JSON.stringify(process.env.NODE_ENV)],
				[/process\.env\.NODE_DEBUG/g, false]
			]
		},
		postcss: true
	}),

	kit: {
		adapter: adapter({
			pages: 'docs',
			assets: 'docs'
		}),
		paths: {
			// change below to your repo name
			base: '/tiny-browser-connect'
		}
	}
};

export default config;
