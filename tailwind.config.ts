import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'gray-c': '#626262',
        'white-c': '#f0f0f0',
        'black-c': '#0f172a',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
export default config
