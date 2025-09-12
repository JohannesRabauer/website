/**
 * Tailwind configuration file
 * - Extends theme with custom cyberpunk-inspired color palette
 */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    'bg-cyber-bg',
    'bg-cyber-purple',
    'bg-cyber-pink',
    'bg-cyber-cyan',
    'text-cyber-bg',
    'text-cyber-purple',
    'text-cyber-pink',
    'text-cyber-cyan',
    'border-cyber-purple',
    'border-cyber-purple/30',
    'bg-white/10',
    'text-gray-300',
    'text-gray-500',
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#0d0b1e", // Dark background
          purple: "#7b2ff7", // Neon purple
          pink: "#f107a3", // Neon pink
          cyan: "#00f2fe", // Cyan accent
        },
      },
      dropShadow: {
        cyber: [
          "0 0 8px #7b2ff7, 0 0 16px #f107a3, 0 0 24px #00f2fe"
        ],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 1s cubic-bezier(0.4,0,0.2,1) both',
      },
    },
  },
  plugins: [],
};
