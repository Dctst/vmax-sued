/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.ejs',
    './src/scripts/**/*.js',
  ],
  theme: {
    fontFamily: {
      sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      display: ['"Neue Haas Grotesk Display"', '"Inter"', 'system-ui', 'sans-serif'],
      mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
    },
    extend: {
      colors: {
        bg: {
          primary: '#0A0A0A',
          secondary: '#141414',
          tertiary: '#1C1C1C',
        },
        border: {
          subtle: '#2A2A2A',
          strong: '#3A3A3A',
        },
        text: {
          primary: '#F5F5F5',
          secondary: '#A8A8A8',
          muted: '#6B6B6B',
        },
        accent: {
          DEFAULT: '#E63946',
          hover: '#C42B37',
          dark: '#8B1A22',
          success: '#4ADE80',
        },
      },
      fontSize: {
        'display-hero': ['96px', { lineHeight: '100px', letterSpacing: '-0.03em', fontWeight: '500' }],
        'display-section': ['64px', { lineHeight: '72px', letterSpacing: '-0.02em', fontWeight: '500' }],
        'display-card': ['32px', { lineHeight: '40px', letterSpacing: '-0.01em', fontWeight: '500' }],
        'body-lg': ['20px', { lineHeight: '32px' }],
        'body': ['16px', { lineHeight: '28px' }],
        'caption': ['12px', { lineHeight: '16px', letterSpacing: '0.15em', fontWeight: '500' }],
      },
      maxWidth: {
        'container': '1440px',
      },
      spacing: {
        'section': '160px',
        'section-mobile': '96px',
        'card-inner': '32px',
        'card-inner-lg': '48px',
      },
      gap: {
        'grid': '24px',
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(135deg, #E63946 0%, #8B1A22 100%)',
        'gradient-hero': 'linear-gradient(180deg, rgba(10,10,10,0) 0%, rgba(10,10,10,0.9) 100%)',
      },
      gridTemplateColumns: {
        '12': 'repeat(12, minmax(0, 1fr))',
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
};
