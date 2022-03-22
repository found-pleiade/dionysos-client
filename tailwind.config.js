module.exports = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        foreground: '#fbfbfb',
        background: {
          600: '#202031',
          700: '#181825',
          800: '#101019',
          900: '#08080d',
        },
        accent: '#9D2B84',
        valid: '#72b01d',
        error: '#d62839',
      },
    },
  },
  plugins: [],
};
