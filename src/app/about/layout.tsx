import { Geist_Mono } from "next/font/google";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function AboutLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className={geistMono.variable}>{children}</div>;
}
