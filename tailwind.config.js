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
          400: '#30304b',
          500: '#28283e',
          600: '#202031',
          700: '#181825',
          800: '#101019',
          900: '#08080d',
        },
        accent: {
          400: '#b03094',
          500: '#9D2B84',
        },
        valid: '#72b01d',
        error: '#d62839',
        pending: '#1C7CB0',
      },
    },
  },
  plugins: [],
};
