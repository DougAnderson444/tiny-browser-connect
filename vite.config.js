import { sveltekit } from '@sveltejs/kit/vite';
import path, { dirname } from 'path';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	resolve: {
		alias: {
			'@douganderson444/tiny-browser-connect': path.resolve('src/lib'),
			process: 'process/browser',
			util: 'util',
			buffer: 'buffer'
		}
	},
	define: {
		'process.env': { NODE_DEBUG: false }
	},
	build: {
		commonjsOptions: {
			include: [/node_modules/, /p2pcf/, /ardag/]
		},
		minify: false,
		sourcemap: true,
		optimization: {
			minimize: true
		}
	},
	optimization: {
		minimize: false
	},
	optimizeDeps: {
		include: [
			'immortal-db',
			// 'js-cookie',
			'@douganderson444/ardag',
			'p2pcf',
			'ar-gql'
			// '@peerpiper/did-ar'
		],
		force: true,
		esbuildOptions: {
			define: {
				global: 'globalThis',
				'globalThis.process.env.NODE_ENV': 'production'
			}
		}
	}
};

export default config;
