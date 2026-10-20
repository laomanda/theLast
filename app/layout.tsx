import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { bricolageGrotesque, newsreader, shantellSans } from "@/src/ui/fonts";
import { FoldedPointer } from "@/src/ui/cursor/FoldedPointer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Malica Yohana Hutagaol",
  description: "A Keepsake That Slowly Opens",
  icons: {
    icon: [
      { url: "/assets/favicon.png", type: "image/png" },
      { url: "/assets/favicon.png", rel: "shortcut icon", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#F6F1E8",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="id"
      className={`${bricolageGrotesque.variable} ${newsreader.variable} ${shantellSans.variable}`}
      data-s01-font-family={bricolageGrotesque.style.fontFamily}
    >
      <body className="bg-[#F6F1E8] text-[#2C282A] antialiased">
        {children}
        <FoldedPointer />
      </body>
    </html>
  );
}
