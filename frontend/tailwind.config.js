module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        main_blue: "#0C5CD2",
        transparent_black: "rgba(0, 0, 0, 0.75)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0%" },
          "100%": { opacity: "100%" },
        },
        fadeOut: {
          "0%": { opacity: "100%" },
          "100%": { opacity: "0%" },
        },
      },
      animation: {
        fadeIn: "fadeIn 200ms ease-in-out",
        fadeOut: "fadeOut 200ms ease-in-out",
      },
    },
  },
  plugins: [],
};
