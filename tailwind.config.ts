/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [{
      light: {
        ...require("daisyui/src/theming/themes")["light"],
        primary: "#c7ff80",
        secondary: "#c09ff8",
        accent:"#fec4dd",
        neutral:"#87c1c4",
        "secondary-content": "#000",
        "neutral-content":"#000"
      },
      dark: {
        ...require("daisyui/src/theming/themes")["dark"],
        "base-100":"#000",
        primary: "#c7ff80",
        secondary: "#c09ff8",
        accent:"#fec4dd",
        neutral:"#87c1c4",
        "neutral-content":"#000"
      },
    }
    ]

  },
  plugins: [require('daisyui')],
} satisfies Config;
