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
    },
  },
  plugins: [],
};
