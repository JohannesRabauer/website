/**
 * Tailwind configuration file
 * - Extends theme with custom cyberpunk-inspired color palette
 */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./content/**/*.mdx",
  ],
  safelist: [
    'bg-cyber-bg',
    'bg-cyber-green',
    'bg-cyber-purple',
    'bg-cyber-cyan',
    'bg-cyber-pink',
    'text-cyber-bg',
    'text-cyber-green',
    'text-cyber-purple',
    'text-cyber-cyan',
    'text-cyber-pink',
    'border-cyber-purple',
    'border-cyber-purple/30',
    'border-cyber-green',
    'border-cyber-cyan',
    'bg-white/10',
    'text-gray-300',
    'text-gray-500',
    'drop-shadow-cyber-sm',
    'drop-shadow-cyber-green',
    'drop-shadow-cyber-cyan',
    'animate-glow-pulse',
    'animate-bounce-y',
    'font-mono',
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#0d0b1e4b", // Dark background
          green: "#00ff9d", // Matrix-inspired neon green
          purple: "#7b2ff7", // Neon purple
          cyan: "#00f2fe", // Cyan accent
          pink: "#f107a3", // Hot pink accent
        },
        blog: {
          bg: '#F8F7F4',
          surface: '#FFFFFF',
          text: '#1A1A2E',
          muted: '#6B7280',
          purple: '#3D2B6B',
          'purple-light': '#EDE8F5',
          'purple-mid': '#7C5CBF',
          green: '#2A5C45',
          'green-light': '#E6F0EC',
          border: '#E5E1F0',
          'code-bg': '#F0EDF8',
        },
      },
      dropShadow: {
        cyber: [
          "0 0 8px #7b2ff7, 0 0 16px #00ff9d, 0 0 24px #00f2fe"
        ],
        'cyber-sm': [
          "0 0 6px rgba(123,47,247,0.5), 0 0 12px rgba(123,47,247,0.3)"
        ],
        'cyber-green': [
          "0 0 8px rgba(0,255,157,0.7), 0 0 16px rgba(0,255,157,0.4)"
        ],
        'cyber-cyan': [
          "0 0 8px rgba(0,242,254,0.7), 0 0 16px rgba(0,242,254,0.4)"
        ],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 8px rgba(123,47,247,0.4), 0 0 16px rgba(0,255,157,0.15)' },
          '50%': { boxShadow: '0 0 20px rgba(123,47,247,0.75), 0 0 40px rgba(0,255,157,0.3)' },
        },
        'bounce-y': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(6px)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 1s cubic-bezier(0.4,0,0.2,1) both',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'bounce-y': 'bounce-y 1.6s ease-in-out infinite',
      },
        fontFamily: {
          sans: ['var(--font-heading)', 'system-ui', 'sans-serif'],
          heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
          mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
        },
        typography: () => ({
          blog: {
            css: {
              '--tw-prose-body': '#1A1A2E',
              '--tw-prose-headings': '#3D2B6B',
              '--tw-prose-lead': '#4B5563',
              '--tw-prose-links': '#2A5C45',
              '--tw-prose-bold': '#1A1A2E',
              '--tw-prose-counters': '#6B7280',
              '--tw-prose-bullets': '#3D2B6B',
              '--tw-prose-hr': '#E5E1F0',
              '--tw-prose-quotes': '#1A1A2E',
              '--tw-prose-quote-borders': '#3D2B6B',
              '--tw-prose-captions': '#6B7280',
              '--tw-prose-code': '#3D2B6B',
              '--tw-prose-pre-code': '#1A1A2E',
              '--tw-prose-pre-bg': '#F0EDF8',
              '--tw-prose-th-borders': '#E5E1F0',
              '--tw-prose-td-borders': '#F0EDF8',
              h1: { fontFamily: 'var(--font-heading), system-ui, sans-serif' },
              h2: { fontFamily: 'var(--font-heading), system-ui, sans-serif' },
              h3: { fontFamily: 'var(--font-heading), system-ui, sans-serif' },
              'h2 a, h3 a, h4 a': { textDecoration: 'none' },
              a: { '&:hover': { color: '#3D2B6B' } },
              'pre code': { backgroundColor: 'transparent' },
            },
          },
        }),
    },
  },
    plugins: [require('@tailwindcss/typography')],
};
