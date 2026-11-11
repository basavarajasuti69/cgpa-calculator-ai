// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://cgpacalculatorai.com',
	adapter: cloudflare(),
	integrations: [sitemap({
		filter: (page) => {
			const url = new URL(page);
			const p = url.pathname;
			const manualUnis = ['anna','ktu','srm','vit','ipu','saveetha'];
			const isManualUni = manualUnis.some(u => p === '/'+u+'/' || p.startsWith('/'+u+'/'));
			if (p === '/404' || p === '/500' || p.startsWith('/status') || p.startsWith('/my-results') || p.startsWith('/request-college') || p.startsWith('/api/') || p === '/tools/ask' || p === '/tools/scanner' || p === '/tools/what-if' || isManualUni) return false;
			return true;
		}
	})],

	vite: {
		plugins: [tailwindcss()]
	}
});
