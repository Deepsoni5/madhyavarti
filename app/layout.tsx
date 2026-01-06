import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollToTop } from "@/components/scroll-to-top";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Madhyavarti Solutions - Premium IT & Business Solutions",
  description:
    "Leading IT solutions company providing enterprise software, web development, and digital transformation services for businesses across India.",

  keywords:
    "IT solutions, software development, digital transformation, enterprise solutions, Bangalore",
  authors: [{ name: "Madhyavarti Solutions" }],
  creator: "Madhyavarti Solutions",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://madhyavarti.com",
    title: "Madhyavarti Solutions - Premium IT & Business Solutions",
    description:
      "Leading IT solutions company providing enterprise software, web development, and digital transformation services.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Madhyavarti Solutions",
      },
    ],
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ScrollToTop />
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
