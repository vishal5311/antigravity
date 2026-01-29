import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Antigravity - Real-Time AI Video Agents",
  description: "Launch real-time video AI agents using Beyond Presence avatars. Face-to-face conversations with AI.",
  openGraph: {
    title: "Antigravity - Real-Time AI Video Agents",
    description: "Turn any photo into a real-time interactive video agent.",
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
