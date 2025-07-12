import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "StockIt",
  description: "Analyze Stock Trends with Real-Time Data.",
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'StockIt: Analyze Stock Trends with Real-Time Data',
    description: 'Track and analyze stocks with our modern tools.',
    url: 'https://yourdomain.com',
    siteName: 'StockIt',
    images: [
      {
        url: 'https://yourdomain.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'StockIt: Analyze Stock Trends with Real-Time Data',
      },
    ],
    locale: 'en_US',
    type: 'website',
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
        className={`${sora.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
