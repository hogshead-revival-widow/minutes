import { sveltekit } from '@sveltejs/kit/vite';
import { isoImport } from 'vite-plugin-iso-import';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [isoImport(), sveltekit()],

	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@use "src/variables.scss" as *;'
			}
		}
	},
	ssr: {
		noExternal: ['@fortawesome/free-solid-svg-icons']
	}
};

export default config;
