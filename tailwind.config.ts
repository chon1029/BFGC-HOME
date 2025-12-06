import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			primary: {
  				'50': '#f0efff',
  				'100': '#e0deff',
  				'200': '#c7c3ff',
  				'300': '#a39eff',
  				'400': '#7b70ff',
  				'500': '#0c076d',
  				'600': '#090555',
  				'700': '#06033d',
  				'800': '#040228',
  				'900': '#02011a',
  				DEFAULT: '#0c076d',
  				foreground: '#ffffff'
  			},
  			accent: {
  				'50': '#fff5f0',
  				'100': '#ffe8dc',
  				'200': '#ffd4c3',
  				'300': '#ffb89a',
  				'400': '#ff9466',
  				'500': '#fb5800',
  				'600': '#c84600',
  				'700': '#953400',
  				'800': '#632300',
  				'900': '#3e1600',
  				DEFAULT: '#fb5800',
  				foreground: '#ffffff'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'SC Dream',
  				'var(--font-nanum-gothic)',
  				'Nanum Gothic',
  				'sans-serif'
  			],
  			serif: [
  				'var(--font-gowun-batang)',
  				'Gowun Batang',
  				'serif'
  			],
  			cute: [
  				'var(--font-cute)',
  				'Cute Font',
  				'cursive'
  			]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
