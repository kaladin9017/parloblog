import type { Metadata } from "next";
import { Inter, Poppins } from 'next/font/google';
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: "Parlo Blog - Learn French Naturally",
  description: "The fun, easy, and interactive way to learn French",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} antialiased`}>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
