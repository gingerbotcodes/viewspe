import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "ViewsPeCash — Earn from Your Reels & Shorts",
  description:
    "India's #1 Micro-Influencer Marketing Platform. Post Reels & Shorts, earn per view. Join thousands of creators earning daily.",
  keywords: ["creator economy", "influencer marketing", "earn money", "reels", "shorts", "India"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
