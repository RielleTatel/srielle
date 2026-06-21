import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { BackgroundGrid } from "@/components/background/BackgroundGrid";
import { Navbar } from "@/components/ui/Navbar";
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
  title: "Gabrielle Tatel — Full-Stack Developer, Speaker, Student Leader",
  description:
    "Gabrielle Tatel builds scalable software, AI-powered solutions, and communities. Full-Stack Developer · Speaker · Student Leader · ASEAN Delegate.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <BackgroundGrid />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
