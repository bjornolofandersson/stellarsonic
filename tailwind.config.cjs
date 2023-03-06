/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
	theme: {
    extend: {
      backgroundColor: {
        primary: 'var(--theme-bg-primary)',
        accent: 'var(--theme-bg-accent)',
        'primary-invert': 'var(--theme-text-primary)',
        'accent-invert': 'var(--theme-text-accent)',
        article: {
          primary: 'var(--theme-article-bg-primary)',
          accent: 'var(--theme-article-bg-accent)',
        }
      },
      textColor: {
        primary: 'var(--theme-text-primary)',
        accent: 'var(--theme-text-accent)',
        'primary-invert': 'var(--theme-bg-primary)',
        'accent-invert': 'var(--theme-bg-accent)',
        article: {
          primary: 'var(--theme-article-text-primary)',
          accent: 'var(--theme-article-text-accent)',
        }
      },
      borderColor: {
        primary: 'var(--theme-text-primary)',
        accent: 'var(--theme-text-accent)',
        'primary-invert': 'var(--theme-bg-primary)',
        'accent-invert': 'var(--theme-bg-accent)',
      }
    }
	},
	plugins: [],
}
