/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gaming: {
          black: "#050505",
          dark: "#0c0c0e",
          card: "#121216",
          purple: "#7c3aed",
          cyan: "#06b6d4",
          neonPurple: "#a855f7",
          neonCyan: "#22d3ee",
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        gaming: ["Outfit", "sans-serif"],
        tech: ["Rajdhani", "sans-serif"],
      },
      boxShadow: {
        'glow-purple': '0 0 15px rgba(124, 58, 237, 0.5)',
        'glow-cyan': '0 0 15px rgba(6, 182, 212, 0.5)',
        'glow-cyan-lg': '0 0 25px rgba(6, 182, 212, 0.7)',
        'glow-purple-lg': '0 0 25px rgba(124, 58, 237, 0.7)',
        'glow-rgb': '0 0 20px rgba(124, 58, 237, 0.35), 0 0 20px rgba(6, 182, 212, 0.35)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s infinite alternate',
        'rgb-border': 'rgbBorder 6s infinite linear',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%': { boxShadow: '0 0 5px rgba(124, 58, 237, 0.3), 0 0 5px rgba(6, 182, 212, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(124, 58, 237, 0.7), 0 0 20px rgba(6, 182, 212, 0.7)' },
        },
        rgbBorder: {
          '0%, 100%': { borderColor: '#7c3aed' },
          '50%': { borderColor: '#06b6d4' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}


