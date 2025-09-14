/**
 * Tailwind configuration file
 * - Extends theme with custom cyberpunk-inspired color palette
 */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    'bg-cyber-bg',
    'bg-cyber-green',
    'bg-cyber-purple',
    'bg-cyber-cyan',
    'text-cyber-bg',
    'text-cyber-green',
    'text-cyber-purple',
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
          bg: "#0d0b1e4b", // Dark background
          green: "#00ff9d", // Matrix-inspired neon green
          purple: "#7b2ff7", // Neon purple
          cyan: "#00f2fe", // Cyan accent
        },
      },
      dropShadow: {
        cyber: [
          "0 0 8px #7b2ff7, 0 0 16px #00ff9d, 0 0 24px #00f2fe"
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
