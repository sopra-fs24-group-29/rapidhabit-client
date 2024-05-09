/** @type {import('tailwindcss').Config} */
export const content = ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"];
export const theme = {
  extend: {
    colors: {
      accent: "#fde047",
      "accent-fg": "#020617",
      input: "#1A1A1A",
      "input-outline": "#424141",
      "dark-green": "#0B261A",
      "light-green": "#57BF84",
      "tab-off": "#8A8A8A",
      "admin": "#E1E1E1",
    },
    width: {
      "custom-236": "236px",
      "custom-472": "472px",
      "custom-354": "354px",
    }
  },
};
export const plugins = [];
