// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class', 'class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			surface: '#252526',
  			border: 'hsl(var(--border))',
  			borderAlt: '#2a2a2c',
  			textPrimary: '#e5e5e5',
  			textSecondary: '#a1a1a3',
  			textMuted: '#666668',
  			sea: '#1BD2EB',
  			gold: '#F8E539',
  			neonSea: '#1BD2EB',
  			high: '#FFB300',
  			highGold: '#FFFB72',
  			ground: '#000321',
  			container: '#010210',
  			inactive: '#B6AE46',
  			head: '#FFFFFF',
  			coHead: '#E0E0E0',
  			darkSea: '#04132A',
  			power: '#000000',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
