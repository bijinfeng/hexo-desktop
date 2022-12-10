/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primary: {
        1: 'var(--primary-1)',
        2: 'var(--primary-2)',
        3: 'var(--primary-3)',
        4: 'var(--primary-4)',
        5: 'var(--primary-5)',
        6: 'var(--primary-6)',
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
      border: {
        1: 'var(--color-border-1)',
        2: 'var(--color-border-2)',
        3: 'var(--color-border-3)',
        4: 'var(--color-border-4)',
      },
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
