/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {

    extend: {
      colors: {
        CF4F3FA: "#F4F3FA",
        CECF0FF: "#ECF0FF",
        C99AAFF: "#99AAFF",
        C748BFF: "#748BFF",
        C8DBDFF: "#8DBDFF",
        CAF9FF3: "#AF9FF3",
        C333333: "#333333",
      },
    },


    extend: {},

  },
  plugins: [require("@tailwindcss/line-clamp")],
};
