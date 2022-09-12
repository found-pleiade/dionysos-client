module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Montserrat"],
        body: ["Source Sans Pro"],
      },
      animation: {
        "pulse-slow": "pulse 2.5s linear infinite",
      },
      colors: {
        dark: {
          primary: {
            400: "hsl(240, 22%, 24%)",
            500: "hsl(240, 22%, 20%)",
            600: "hsl(240, 21%, 16%)",
            700: "hsl(240, 21%, 12%)",
            800: "hsl(240, 22%, 8%)",
            900: "hsl(240, 24%, 4%)",
          },
          secondary: "hsl(0, 0%, 98%)",
          accent: {
            400: "hsl(313, 57%, 34%)",
            500: "hsl(313, 57%, 30%)",
            900: "hsl(314, 40%, 6%)",
          },
          complementary: {
            400: "hsl(204, 69%, 34%)",
            500: "hsl(204, 69%, 30%)",
            900: "hsl(204, 69%, 7%)",
          },
          success: {
            400: "hsl(85, 68%, 43%)",
            500: "hsl(85, 68%, 33%)",
          },
          error: {
            100: "hsl(354, 72%, 97%)",
            400: "hsl(354, 72%, 50%)",
            500: "hsl(354, 72%, 43%)",
            900: "hsl(354, 72%, 30%)",
          },
          pending: "hsl(201, 72%, 40%)",
        },
        light: {
          primary: {
            100: "hsl(240, 24%, 98%)",
            200: "hsl(240, 19%, 94%)",
            300: "hsl(240, 17%, 90%)",
            400: "hsl(240, 17%, 86%)",
            500: "hsl(240, 19%, 80%)",
            600: "hsl(240, 19%, 76%)",
          },
          secondary: "hsl(0, 0%, 2%)",
          accent: {
            100: "hsl(314, 40%, 90%)",
            400: "hsl(313, 50%, 58%)",
            500: "hsl(313, 50%, 50%)",
          },
          complementary: {
            500: "hsl(201, 72%, 40%)",
          },
          success: {
            400: "hsl(85, 68%, 48%)",
            500: "hsl(85, 68%, 40%)",
          },
          error: {
            100: "hsl(354, 80%, 98%)",
            400: "hsl(354, 80%, 54%)",
            500: "hsl(354, 74%, 47%)",
          },
          pending: "hsl(201, 72%, 50%)",
        },
      },
    },
  },
  plugins: [],
};
