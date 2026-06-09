import tailwindcssAnimate from 'tailwindcss-animate'
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  plugins: [tailwindcssAnimate, typography],
  prefix: '',
  safelist: [
    'lg:col-span-4',
    'lg:col-span-6',
    'lg:col-span-8',
    'lg:col-span-12',
    'border-border',
    'bg-card',
    'border-error',
    'bg-error/30',
    'border-success',
    'bg-success/30',
    'border-warning',
    'bg-warning/30',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        '2xl': '2rem',
        DEFAULT: '1rem',
        lg: '2rem',
        md: '2rem',
        sm: '1rem',
        xl: '2rem',
      },
      screens: {
        '2xl': '86rem',
        lg: '64rem',
        md: '48rem',
        sm: '40rem',
        xl: '80rem',
      },
    },
    extend: {
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        background: 'hsl(var(--background))',
        border: 'hsla(var(--border))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        foreground: 'hsl(var(--foreground))',
        input: 'hsl(var(--input))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        ring: 'hsl(var(--ring))',
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        success: 'hsl(var(--success))',
        error: 'hsl(var(--error))',
        warning: 'hsl(var(--warning))',
      },
      fontFamily: {
        mono: ['var(--font-geist-mono)'],
        sans: ['var(--font-geist-sans)'],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
        playfair: ['var(--font-playfair)', 'serif'],
        lato: ['var(--font-lato)', 'Lato', 'sans-serif'],
        'open-sans': ['var(--font-open-sans)', '"Open Sans"', 'sans-serif'],
        merriweather: ['var(--font-merriweather)', 'Merriweather', 'serif'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      typography: () => ({
        DEFAULT: {
          css: [
            {
              '--tw-prose-body': 'hsl(var(--foreground))',
              '--tw-prose-headings': 'hsl(var(--primary))',
              '--tw-prose-links': 'hsl(var(--primary))',
              '--tw-prose-code': 'hsl(var(--foreground))',
              '--tw-prose-bold': 'hsl(var(--foreground))',
              // H1
              h1: {
                fontFamily: 'var(--font-playfair), serif',
                fontSize: '2.5rem',
                lineHeight: '1.2',
                fontWeight: '400',
                marginTop: '0',
                marginBottom: '0.5em',
              },
              // H2
              h2: {
                fontFamily: 'var(--font-playfair), serif',
                fontSize: '2rem',
                lineHeight: '1.25',
                fontWeight: '400',
                marginTop: '1.25em',
                marginBottom: '0.5em',
              },
              // H3
              h3: {
                fontFamily: 'var(--font-playfair), serif',
                fontSize: '1.5rem',
                lineHeight: '1.3',
                fontWeight: '400',
                marginTop: '1em',
                marginBottom: '0.4em',
              },
              // H4
              h4: {
                fontFamily: 'var(--font-playfair), serif',
                fontSize: '1.25rem',
                lineHeight: '1.35',
                fontWeight: '400',
                marginTop: '0.75em',
                marginBottom: '0.35em',
              },
              // H5
              h5: {
                fontFamily: 'var(--font-montserrat), sans-serif',
                fontSize: '1.125rem',
                lineHeight: '1.4',
                fontWeight: '300',
                marginTop: '0.5em',
                marginBottom: '0.3em',
              },
              // paragraphs
              p: {
                marginTop: '0.75em',
                marginBottom: '0.75em',
                lineHeight: '1.625',
              },
            },
          ],
        },
        md: {
          css: [
            {
              h1: { fontSize: '3.5rem' },
              h2: { fontSize: '2.5rem' },
              h3: { fontSize: '2rem' },
              h4: { fontSize: '1.5rem' },
              h5: { fontSize: '1.25rem' },
            },
          ],
        },
      }),
    },
  },
}

export default config
