import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			$component: './src/component',
			$lib: './src/lib',
			$store: './src/store',
			$utils: './src/lib/utils',
		},
	}
};

export default config;
