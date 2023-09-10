/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  // darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // primary: "#15202B",
        "blue-d": "#1D9BF0",
        "green-d": "#00BA7C",
        "orange-d": "#FF7A00",
        "pink-d": "#F91880",
        "purple-d": "#7856FF",
        "yellow-d": "#FFD400",
        "design-declare": "var(--design-declare)",
        "gray-h": "#E7E7E8",
        "gray-second": "#536471",
        "gray-active": "#CFD0D1",
        "user-hover": "#F7F9F9",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          active: "hsl(var(--accent-active))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        xl: `calc(var(--radius) + 4px)`,
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    screens: {
      mobile: "500px",
      sm: "640px",
      // => @media (min-width: 640px) { ... }
      md: "768px",
      // => @media (min-width: 768px) { ... }
      lg: "1024px",
      // => @media (min-width: 1024px) { ... }
      xl: "1280px",
      // => @media (min-width: 1280px) { ... }
      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [require("tailwindcss-animate")],
};

//  /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       backgroundImage: {
//         "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
//         "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
//       },
//       colors: {
//         primary: "#15202B",
//         "blue-d": "#1D9BF0",
//         "green-d": "#00BA7C",
//         "orange-d": "#FF7A00",
//         "pink-d": "#F91880",
//         "purple-d": "#7856FF",
//         "yellow-d": "#FFD400",
//         "design-declare": "var(--design-declare)",
//         "gray-h": "#E7E7E8",
//         "gray-second": "#536471",
//         "gray-active": "#CFD0D1",
//       },
//     },
//     screens: {
//       mobile: "480px",
//       sm: "640px",
//       // => @media (min-width: 640px) { ... }
//       md: "768px",
//       // => @media (min-width: 768px) { ... }
//       lg: "1024px",
//       // => @media (min-width: 1024px) { ... }
//       xl: "1280px",
//       // => @media (min-width: 1280px) { ... }
//       "2xl": "1536px",
//       // => @media (min-width: 1536px) { ... }
//     },
//   },
//   plugins: [],
// };
