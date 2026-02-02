import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Muonium AI - Real-Time AI Video Agents",
  description: "Launch real-time video AI agents using Anam AI avatars. Face-to-face conversations with Muonium AI.",
  openGraph: {
    title: "Muonium AI - Real-Time AI Video Agents",
    description: "Turn any photo into a real-time interactive video agent with Muonium AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
