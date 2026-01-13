import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Thames Optic | Ultra-Fast Fibre Broadband",
    template: "%s | Thames Optic",
  },
  description: "Thames Optic provides ultra-fast fibre broadband with speeds up to 1Gbps. Reliable internet, free installation, no price rises, and 24/7 UK support.",
  keywords: ["broadband", "fibre broadband", "internet", "Thames Optic", "fast broadband", "UK broadband", "fibre optic"],
  authors: [{ name: "Thames Optic" }],
  creator: "Thames Optic",
  publisher: "Thames Optic",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Thames Optic",
    title: "Thames Optic | Ultra-Fast Fibre Broadband",
    description: "Ultra-fast fibre broadband with speeds up to 1Gbps. Free installation, no price rises, and 24/7 UK support.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thames Optic | Ultra-Fast Fibre Broadband",
    description: "Ultra-fast fibre broadband with speeds up to 1Gbps. Free installation, no price rises, and 24/7 UK support.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
