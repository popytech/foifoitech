/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A4B8C',
          50: '#E9F2FA',
          100: '#D7E6F6',
          200: '#AECFEA',
          300: '#86B7DD',
          400: '#5E9FD1',
          500: '#0A4B8C'
        }
      },
      fontFamily: {
        primary: ['var(--font-primary)', ...defaultTheme.fontFamily.sans],
        secondary: ['var(--font-secondary)', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwind-bootstrap-grid')
  ]
};
