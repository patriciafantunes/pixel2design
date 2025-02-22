import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'deep-indigo': '#2A1E5C',
        'dark-purple': '#270C36',
        'rose-red': '#EE4266',
        'royal-purple': '#7806BA',
        'soft-magenta': '#C856BC',
        'muted-blue': '#9CB1CA',
        'pale-blue': '#B9C9DA',
        'off-white': '#F8F9FB',
      },
      backgroundImage: {
        'gradient': 'linear-gradient(to bottom right, #EE4266, #7806BA)',
      },
      container: {
        center: true, // Centers the container
        padding: '2rem', // Adjust padding as needed
        screens: {
          sm: '100%', // Set max width at different breakpoints
          md: '768px',
          lg: '1024px',
          xl: '1280px',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
