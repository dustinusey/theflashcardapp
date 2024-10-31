/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    "bg-emerald-500/10",
    "text-emerald-500",
    "bg-orange-500/10",
    "text-orange-500",
    "bg-rose-500/10",
    "text-rose-500",
  ],
};
