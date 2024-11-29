/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	container: {
  		center: 'true',
  		padding: '15px'
  	},
  	screens: {
  		sm: '640px',
  		md: '768px',
  		lg: '960px',
  		xl: '1200px'
  	},
  	extend: {
  		colors: {
  			primary: {
  				DEFAULT: '#3C552D',
  			},
  			sencondary: '#CA7373',
  			accent: {
  				DEFAULT: '#D7B26D',
  				HOVER: '#EEE2B5',
  			},
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	},
  	fontFamily: {
  		primary: 'var(--font-jetbrainsMono)'
  	}
  },
  plugins: [require("tailwindcss-animate"),require('tailwind-scrollbar-hide')],
};
