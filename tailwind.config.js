/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'], 
  theme: {
    extend: {
      colors: {
        'light-bg': '#ffffff',
        'light-text': '#000000',
        'light-primary': '#1d4ed8',
        'light-secondary': '#64748b',
        'light-border': '#e5e7eb',

        'dark-bg': '#18181b',
        'dark-text': '#f9fafb',
        'dark-primary': '#3b82f6',
        'dark-secondary': '#94a3b8',
        'dark-border': '#334155',
      },
    },
  },
  darkMode: ['class', '[theme="dark"]'],
  plugins: [
    require('daisyui'), 
  ],
};
