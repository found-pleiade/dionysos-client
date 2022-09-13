module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Montserrat"],
        body: ["Source Sans Pro"],
        mono: ["Fira Mono"],
      },
      animation: {
        "pulse-slow": "pulse 2.5s linear infinite",
      },
      colors: {
        dark: {
          primary: {
            800: "hsl(241, 28%, 17%)",
            900: "hsl(241, 28%, 12%)",
          },
          secondary: {
            100: "hsl(0, 0%, 95%)",
            200: "hsl(0, 0%, 87%)",
            500: "hsl(0, 0%, 59%)",
          },
          accent: {
            400: "hsl(299, 36%, 55%)",
          },
          complementary: {
            400: "hsl(201, 41%, 48%)",
          },
          success: {
            400: "hsl(85, 68%, 48%)",
          },
          error: {
            400: "hsl(354, 80%, 54%)",
          },
          pending: "hsl(201, 72%, 50%)",
        },
        light: {
          primary: {
            100: "hsl(0, 0%, 100%)",
            200: "hsl(0, 0%, 97%)",
          },
          secondary: {
            900: "hsl(0, 0%, 5%)",
            800: "hsl(0, 0%, 13%)",
            500: "hsl(0, 0%, 41%)",
          },
          accent: {
            400: "hsl(299, 39%, 48%)",
          },
          complementary: {
            400: "hsl(201, 41%, 42%)",
          },
          success: {
            400: "hsl(85, 68%, 48%)",
          },
          error: {
            400: "hsl(354, 80%, 54%)",
          },
          pending: "hsl(201, 72%, 50%)",
        },
      },
    },
  },
  plugins: [],
};
