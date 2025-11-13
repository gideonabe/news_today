import type { Metadata } from "next";
import { Libre_Baskerville } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';

// Initialize Libre Baskerville
const libre = Libre_Baskerville({
  subsets: ['latin'],
  variable: '--font-libre',
  weight: ['400', '700'], // Regular and Bold
});

export const metadata: Metadata = {
  title: "News Today",
  description: "Daily news feed",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${libre.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
