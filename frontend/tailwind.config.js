module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        hero: '#1b1434',
        energy: '#7c3aed',
        glow: '#38bdf8',
        ember: '#ef4444'
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at top, rgba(124,58,237,0.18), transparent 35%), radial-gradient(circle at bottom right, rgba(56,189,248,0.12), transparent 30%)'
      }
    }
  },
  plugins: []
};
