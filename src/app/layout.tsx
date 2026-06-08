import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-cormorant",
  style: ["normal", "italic"],
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#020812",
};

export const metadata: Metadata = {
  title: "VIRTUS | Precision Watchmaking Portfolio",
  description: "A luxury watch showcase featuring cold-precision scroll-linked interactions, cinematic watch rotation canvas animations, and minimalist Swiss design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${cormorant.variable} ${jost.variable} bg-background text-foreground antialiased font-ui`}
      >
        {children}
      </body>
    </html>
  );
}

