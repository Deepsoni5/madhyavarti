import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollToTop } from "@/components/scroll-to-top";
import { AnalyticsTracker } from "@/components/analytics-tracker";
import { Suspense } from "react";

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
        url: "/mfavicon.png",
        width: 1200,
        height: 630,
        alt: "Madhyavarti Solutions",
      },
    ],
  },
  icons: {
    icon: "/mfavicon.png",
    apple: "/mfavicon.png",
    shortcut: "/mfavicon.png",
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
          <Suspense fallback={null}>
            <AnalyticsTracker />
          </Suspense>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
