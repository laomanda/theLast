import localFont from "next/font/local";

export const bricolageGrotesque = localFont({
  src: "../../font/BricolageGrotesque[opsz,wdth,wght].woff2",
  variable: "--font-bricolage",
  display: "swap",
  fallback: [
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "sans-serif",
  ],
  preload: true,
});

export const newsreader = localFont({
  src: [
    {
      path: "../../font/Newsreader[opsz,wght].woff2",
      style: "normal",
    },
    {
      path: "../../font/Newsreader-Italic[opsz,wght].woff2",
      style: "italic",
    },
  ],
  variable: "--font-newsreader",
  display: "swap",
  fallback: ["Georgia", "Cambria", "Times New Roman", "serif"],
  preload: true,
});

export const shantellSans = localFont({
  src: "../../font/Shantell_Sans-Normal-Regular.woff2",
  variable: "--font-shantell",
  display: "swap",
  fallback: ["Caveat", "Comic Sans MS", "cursive", "sans-serif"],
  preload: false,
});

/**
 * The generated family name is owned by next/font/local. Consumers must use
 * this value rather than guessing the font's source-family name.
 */
export const bricolageGrotesqueFamily = bricolageGrotesque.style.fontFamily;
export const newsreaderFamily = newsreader.style.fontFamily;
export const shantellSansFamily = shantellSans.style.fontFamily;

