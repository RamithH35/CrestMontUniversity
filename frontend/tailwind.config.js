/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'bg-base': 'var(--bg)',
        'text-primary': 'var(--ink)',
        'accent-primary': 'var(--blue)',
        'accent-secondary': 'var(--clay)',
        'duotone-tint': 'var(--blue)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      boxShadow: {
        soft: "0 10px 30px rgba(53, 88, 162, 0.05)",
        lift: "0 16px 40px rgba(53, 88, 162, 0.08)",
      },
    },
  },
  plugins: [],
}

