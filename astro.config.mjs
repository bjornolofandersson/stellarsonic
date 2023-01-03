import { defineConfig } from 'astro/config';

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import svelte from "@astrojs/svelte";

import yaml from '@rollup/plugin-yaml';


// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), svelte()],
  vite: {
    plugins: [yaml()]
  },
  experimental: {
    contentCollections: true,
  },
});
