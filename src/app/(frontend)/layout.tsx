import type { Metadata } from "next";
import localFont from "next/font/local";
import { Oswald, Inter, Geist_Mono } from "next/font/google";
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

// Tipografía de Titulares de Alto Impacto (Estilo Breaking News / Televisivo Internacional)
const oswald = Oswald({
  variable: "--font-headline",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

// Tipografía de Lectura y UI Profesional
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

// Tipografía Mono para Badges, Horarios y Fechas
const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LAKATUAR NEWS",
  description: "Portal de noticias multimedia con contenido en vivo, on demand y análisis diario.",
  icons: {
    icon: [
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/isotipo.png", type: "image/png" },
    ],
    apple: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/icon.png",
  },
};

export interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): React.JSX.Element {
  return (
    <html
      lang="es"
      className={`${oswald.variable} ${inter.variable} ${geistMono.variable} ${hiraginoSans.variable} ${inter.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#120404] text-white font-sans">{children}</body>
    </html>
  );
}

