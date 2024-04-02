/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        current: "var(--text-color)",
      },
      textColor: {
        skin: {
          base: "var(--text-color)",
          red: "var(--danger-color)",
          boder: "var(--border-color)",
        },
      },
      backgroundColor: {
        skin: {
          fill: "var(--bg-color)",
          nav: "var(--nav-color)",
        },
      },
    },

    fontFamily: {
      outfit: "Outfit",
      garamond: "EB Garamond",
      poppins: "Poppins",
    },
  },
  plugins: [],
};
