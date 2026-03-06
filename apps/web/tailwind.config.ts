/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        black: "#000000",
        gray: {
          500: "#909090",
          600:"#616060",
        },
      },
      fontFamily: {
        sans: ["var(--font-satoshi)"],
        integral: ["var(--font-integral)"],
      },
    },
  },
  plugins: [],
};
