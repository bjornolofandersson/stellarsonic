/** @type {import('tailwindcss').Config} */
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
	theme: {
    screens: {
      'sm': isDev ? '1060px' : '640px',
      'md': isDev ? '1188px' : '768px',
      'lg': isDev ? '1444px' : '1024px',
      'xl': isDev ? '1700px' : '1280px',
      '2xl': isDev ? '1956px' : '1536px',
    },
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
