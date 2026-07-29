/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f7fa',
          100: '#e4ebf2',
          200: '#c5d3e2',
          300: '#9cb5cf',
          400: '#6d92b8',
          500: '#4c749c',
          600: '#3a5b7d',
          700: '#304a66',
          800: '#2a3f55',
          900: '#273748',
          950: '#1a2430',
        },
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
