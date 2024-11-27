import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["selector"],
  theme: {
    extend: {
      borderRadius: {
        none: "0",
        sm: "calc(var(--border-radius-size) / 3)",
        md: "calc(var(--border-radius-size) * 1)",
        lg: "calc(var(--border-radius-size) * 3)",
        xl: "calc(var(--border-radius-size) * 4)",
        "2xl": "calc(var(--border-radius-size) * 5)",
        "3xl": "calc(var(--border-radius-size) * 6)",
        full: "9999px",
        custom: "12px",
      },
      // نمونه‌ای از یک مقدار سفارشی },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        buttons: "var(--color-buttons)",
      },
    },
  },
  plugins: [],
} satisfies Config;
