module.exports = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        'pulse-slow': 'pulse 2.5s linear infinite',
      },
      colors: {
        foreground: 'hsl(0, 0%, 98%)',
        background: {
          400: 'hsl(240, 22%, 24%)',
          500: 'hsl(240, 22%, 20%)',
          600: 'hsl(240, 21%, 16%)',
          700: 'hsl(240, 21%, 12%)',
          800: 'hsl(240, 22%, 8%)',
          900: 'hsl(240, 24%, 4%)',
        },
        accent: {
          400: 'hsl(313, 57%, 44%)',
          500: 'hsl(313, 57%, 39%)',
        },
        valid: 'hsl(85, 72%, 40%)',
        error: 'hsl(354, 72%, 40%)',
        pending: 'hsl(201, 72%, 40%)',
      },
    },
  },
  plugins: [],
};
