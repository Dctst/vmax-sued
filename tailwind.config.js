/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.ejs',
    './src/scripts/**/*.js',
  ],
  theme: {
    fontFamily: {
      sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      display: ['"Bodoni Moda"', '"Playfair Display"', '"Georgia"', 'serif'],
      mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      micro: ['"Space Mono"', '"JetBrains Mono"', 'monospace'],
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
          DEFAULT: '#F59E0B',
          hover: '#D97706',
          hot: '#FB923C',
          glow: 'rgba(245, 158, 11, 0.15)',
          success: '#4ADE80',
        },
        error: '#EF4444',
      },
      fontSize: {
        'display-hero': ['clamp(3.5rem,5vw,5.5rem)', { lineHeight: '1.05', letterSpacing: '-0.04em', fontWeight: '500' }],
        'display-section': ['clamp(2.5rem,4vw,4rem)', { lineHeight: '1.1', letterSpacing: '-0.035em', fontWeight: '500' }],
        'display-card': ['clamp(1.5rem,2.5vw,2rem)', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '500' }],
        'body-lg': ['20px', { lineHeight: '32px' }],
        'body': ['16px', { lineHeight: '28px' }],
        'caption': ['11px', { lineHeight: '16px', letterSpacing: '0.12em', fontWeight: '500' }],
        'micro': ['9px', { lineHeight: '14px', letterSpacing: '0.08em', fontWeight: '400' }],
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
        'gradient-accent': 'linear-gradient(135deg, #F59E0B 0%, #B45309 100%)',
      },
      gridTemplateColumns: {
        '12': 'repeat(12, minmax(0, 1fr))',
      },
      transitionDuration: {
        '400': '400ms',
      },
      animation: {
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
