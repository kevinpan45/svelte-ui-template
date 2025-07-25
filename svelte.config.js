import adapter from '@sveltejs/adapter-vercel';
import adapterStatic from '@sveltejs/adapter-static';

const config = {
	kit: {
		adapter: process.env.SVELTEKIT_BUILD_TYPE === 'static'
			? adapterStatic({
				fallback: 'app.html' // may differ from host to host
			})
			: adapter({
				runtime: 'nodejs20.x',
			}),
		alias: {
			$component: "src/component",
			$lib: "src/lib",
		},
	}
};

export default config;
