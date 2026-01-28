/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "#fefbf2",
        foreground: "#4a4a4a",
        primary: {
          // DEFAULT: "#abc4a1",
          DEFAULT: "#485733",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#e9b643",
          foreground: "#ffffff",
        },
        muted: {
          foreground: "#fbefd8ce",
        },
        card: {
          DEFAULT: "#fffff",
          foreground: "#fbefd8",
        },
      },
      lineHeight: {
        14: "3.5rem",
        24: "6rem",
      },
      fontFamily: {
        vazir: ["Vazirmatn", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
