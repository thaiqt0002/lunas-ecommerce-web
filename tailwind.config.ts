import tailwindTheme from '@customafk/lunas-ui/tailwindTheme'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/libs/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@customafk/lunas-ui/dist/**/*.js',
  ],
  theme: {
    screens: {
      xs: '375px', // => @media (min-width: 375px) { }
      sm: '640px', // => @media (min-width: 640px) { }
      md: '768px', // => @media (min-width: 768px) { }
      lg: '1024px', // => @media (min-width: 1024px) { }
      xl: '1280px', //  => @media (min-width: 1280px) { }
      '2xl': '1440px', // => @media (min-width: 1440px) { }
    },
    container: {
      center: true,
      screens: {
        desktop: '1120px',
      },
    },
    extend: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...(tailwindTheme as any),
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require('tailwindcss-animate')],
}
export default config
