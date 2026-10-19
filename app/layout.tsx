import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { bricolageGrotesque, newsreader, shantellSans } from "@/src/ui/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "theLast",
  description: "A Keepsake That Slowly Opens",
  icons: {
    icon: "/assets/svg/signature/offset-loop-open.svg",
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
      </body>
    </html>
  );
}
