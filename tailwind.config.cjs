/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
      textColor: {
        dark: 'rgb(71 85 105)',
        accent: '#d77f7a',
      },
      backgroundColor: {
        dark: 'rgb(51 65 85)',
        accent: '#d77f7a',
      }
    },
	},
	plugins: [],
}
