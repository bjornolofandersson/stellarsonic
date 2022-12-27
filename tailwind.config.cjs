/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
	theme: {
		extend: {
      textColor: {
        dark: 'rgb(71 85 105)',
        accent: '#d77f7a',
      },
      backgroundColor: {
        dark: {
          'base': '#242424',
          'base-variant': '#282828',
          'accent': '#d77f7a',
          'accent-variant': '#5a3232',
        },
        light: {
          'base': 'blue',
          'base-variant': '#ffffff',
          'accent': '#d77f7a',
          'accent-variant': '#5a3232',
        }
      }
    },
	},
	plugins: [],
}
