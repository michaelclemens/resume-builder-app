import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./containers/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
    transitionProperty: {
      'height': 'height',
      'max-height': 'max-height',
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
};
export default config;
