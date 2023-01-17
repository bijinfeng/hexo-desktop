/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[arco-theme="dark"]'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      primary: {
        1: 'rgb(var(--primary-1))',
        2: 'rgb(var(--primary-2))',
        3: 'rgb(var(--primary-3))',
        4: 'rgb(var(--primary-4))',
        5: 'rgb(var(--primary-5))',
        6: 'rgb(var(--primary-6))',
      },
      text: {
        1: 'var(--color-text-1)',
        2: 'var(--color-text-2)',
        3: 'var(--color-text-3)',
        4: 'var(--color-text-4)',
      },
      bg: {
        1: 'var(--color-bg-1)',
        2: 'var(--color-bg-2)',
        3: 'var(--color-bg-3)',
        4: 'var(--color-bg-4)',
        5: 'var(--color-bg-5)',
        white: 'var(--color-bg-white)',
      },
      fill: {
        1: 'var(--color-fill-1)',
        2: 'var(--color-fill-2)',
        3: 'var(--color-fill-3)',
        4: 'var(--color-fill-4)',
      },
      border: 'var(--color-border)',
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: 'var(--color-text-2)',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
