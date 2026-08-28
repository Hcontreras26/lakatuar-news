import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const hiraginoSans = localFont({
  src: [
    {
      path: "../../fonts/HiraginoKakuGothicStd-W8.otf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-hiragino",
  display: "block",
  preload: true,
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "block",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "block",
  preload: true,
});

export const metadata: Metadata = {
  title: "LAKATUAR NEWS",
  description: "Portal de noticias multimedia con contenido en vivo, on demand y análisis diario.",
};

export interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): React.JSX.Element {
  return (
    <html
      lang="es"
      className={`${hiraginoSans.variable} ${geistSans.variable} ${geistMono.variable} ${geistSans.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#120404] text-white">{children}</body>
    </html>
  );
}
