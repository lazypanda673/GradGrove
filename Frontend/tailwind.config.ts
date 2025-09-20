import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'gg-primary': 'var(--gg-primary)',
        'gg-blue': 'var(--gg-blue)',
        'gg-green': 'var(--gg-green)',
        'gg-orange': 'var(--gg-orange)',
        'gg-warning': 'var(--gg-warning)',
        'gg-danger': 'var(--gg-danger)',
        'gg-foreground': 'var(--gg-foreground)',
        'gg-background': 'var(--gg-background)',
        'gg-muted': 'var(--gg-bg-light)',
        'gg-card': 'var(--gg-card-bg)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      borderRadius: {
        'gg-card': 'var(--gg-card-radius)',
      },
      boxShadow: {
        'gg-soft': 'var(--gg-soft-shadow)',
      },
    },
  },
  plugins: [],
}

export default config