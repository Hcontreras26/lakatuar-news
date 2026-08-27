import React from "react";
import Link from "next/link";
import type { FooterLink } from "@/types";

export interface FooterProps {
  brandName?: string;
  brandSubname?: string;
  tagline?: string;
  navLinks?: FooterLink[];
  socials?: { name: string; href: string }[];
  copyrightYear?: number;
  className?: string;
}

const defaultNavLinks: FooterLink[] = [
  { label: "Inicio", href: "/" },
  { label: "Lo último", href: "/lo-ultimo" },
  { label: "Análisis", href: "/#analisis" },
  { label: "Opinión", href: "/#opinion" },
  { label: "Venezuela", href: "/#venezuela" },
  { label: "Internacional", href: "/#internacional" },
  { label: "Política", href: "/#politica" },
  { label: "Videos", href: "/#vod" },
  { label: "Contacto", href: "/contacto" },
];

const defaultSocials = [
  { name: "YouTube", href: "https://youtube.com" },
  { name: "Instagram", href: "https://instagram.com/la_katuar" },
  { name: "X", href: "https://x.com/la_katuar" },
  { name: "Facebook", href: "https://facebook.com" },
  { name: "TikTok", href: "https://tiktok.com" },
  { name: "WhatsApp", href: "https://whatsapp.com" },
];

export default function Footer({
  brandName = "LA KATUAR",
  brandSubname = "NEWS",
  tagline = "LA KATUAR | SIN FILTROS. SIN MIEDO. CON LA VERDAD.",
  navLinks = defaultNavLinks,
  socials = defaultSocials,
  copyrightYear = 2026,
  className = "",
}: FooterProps): React.JSX.Element {
  return (
    <footer
      aria-label="Pie de página"
      className={`bg-black py-8 text-white border-t border-zinc-900 ${className}`.trim()}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:gap-10">
          {/* Logo Circular Rojo LA KATUAR NEWS */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              aria-label="Ir al inicio de La Katuar News"
              className="flex h-20 w-20 flex-col items-center justify-center rounded-full bg-red-600 p-2 text-center shadow-lg transition-transform hover:scale-105 sm:h-24 sm:w-24"
            >
              <span className="text-xs font-black leading-tight tracking-tight text-white uppercase sm:text-sm">
                {brandName}
              </span>
              <span className="text-[10px] font-bold leading-tight tracking-wider text-white/90 uppercase sm:text-xs">
                {brandSubname}
              </span>
            </Link>
          </div>

          {/* Bloque de 4 Líneas Informativas y Enlaces */}
          <div className="flex flex-1 flex-col items-center space-y-2 text-center md:items-start md:text-left">
            {/* Línea 1: Slogan de la marca */}
            <p className="text-xs font-black uppercase tracking-wider text-white sm:text-sm">
              {tagline}
            </p>

            {/* Línea 2: Navegación del sitio separada por plecas (|) */}
            <nav
              aria-label="Navegación del pie de página"
              className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-zinc-300 md:justify-start"
            >
              {navLinks.map((link, idx) => {
                const isExternal = link.href.startsWith("http");
                return (
                  <React.Fragment key={link.label}>
                    {isExternal ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-red-400 hover:underline"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="transition-colors hover:text-red-400 hover:underline"
                      >
                        {link.label}
                      </Link>
                    )}
                    {idx < navLinks.length - 1 && (
                      <span aria-hidden="true" className="text-zinc-600">
                        |
                      </span>
                    )}
                  </React.Fragment>
                );
              })}
            </nav>

            {/* Línea 3: Enlaces a Redes Sociales separadas por viñetas (·) */}
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-zinc-400 md:justify-start">
              <span className="font-semibold text-zinc-300">Síguenos:</span>
              {socials.map((social, idx) => (
                <React.Fragment key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-white hover:underline"
                  >
                    {social.name}
                  </a>
                  {idx < socials.length - 1 && (
                    <span aria-hidden="true" className="text-zinc-600">
                      ·
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Línea 4: Copyright y Enlaces Legales */}
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[11px] text-zinc-500 md:justify-start">
              <span>
                © {copyrightYear} La Katuar, LLC - Todos los derechos reservados.
              </span>
              <span aria-hidden="true" className="text-zinc-700">
                -
              </span>
              <Link
                href="/privacidad"
                className="transition-colors hover:text-zinc-300 hover:underline"
              >
                Política de Privacidad
              </Link>
              <span aria-hidden="true" className="text-zinc-700">
                ·
              </span>
              <Link
                href="/terminos"
                className="transition-colors hover:text-zinc-300 hover:underline"
              >
                Términos y Condiciones
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
