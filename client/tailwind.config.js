/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-bg": "#36393F",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
