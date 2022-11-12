import { sveltekit } from '@sveltejs/kit/vite';
import path, { dirname } from 'path';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	resolve: {
		alias: {
			'@douganderson444/tiny-browser-connect': path.resolve('src/lib')
		}
	},
	define: {
		global: {}
	},
	build: {
		commonjsOptions: {
			include: [/node_modules/, /p2pt/]
		},
		minify: false,
		sourcemap: true,
		optimization: {
			minimize: false
		}
	},
	optimization: {
		minimize: false
	},
	optimizeDeps: {
		include: ['immortal-db', 'p2pcf', 'p2pt'],
		force: true
	}
};

export default config;
