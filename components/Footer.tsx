import React from "react";
import type { FooterLink, FooterContactInfo } from "@/types";

export interface FooterProps {
  links?: FooterLink[];
  contactInfo?: FooterContactInfo;
  tagline?: string;
  brandName?: string;
  brandSubtitle?: string;
  copyrightYear?: number;
  className?: string;
}

const defaultFooterLinks: FooterLink[] = [
  { label: "Inicio", href: "#" },
  { label: "Lo último", href: "#ultimas" },
  { label: "Noticias", href: "#noticias" },
  { label: "Programas", href: "#programas" },
  { label: "Contacto", href: "#contactos" },
];

const defaultContactInfo: FooterContactInfo = {
  email: "contacto@lakatuarnews.com",
  phone: "+1 (555) 010-2026",
  location: "Ciudad de la Verdad, RD",
};

export default function Footer({
  links = defaultFooterLinks,
  contactInfo = defaultContactInfo,
  tagline = "LAKATUAR | SIN MIEDOS. SIN MIEDO. CON LA VERDAD.",
  brandName = "LK",
  brandSubtitle = "LAKATUAR NEWS",
  copyrightYear = 2026,
  className = "",
}: FooterProps): React.JSX.Element {
  return (
    <footer className={`border-t border-red-900/70 bg-[#0d0202] text-zinc-200 ${className}`.trim()}>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md border border-red-700 bg-red-900/30 text-xs font-black tracking-[0.2em] text-red-200">
                {brandName}
              </div>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-zinc-400">
                  {brandSubtitle}
                </p>
              </div>
            </div>

            <p className="max-w-md text-base font-medium uppercase leading-7 tracking-[0.12em] text-red-200">
              {tagline}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-zinc-300">
              Mapa del sitio
            </h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              {links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="transition hover:text-red-400">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div id="contactos">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-zinc-300">
              Contacto
            </h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li>{contactInfo.email}</li>
              <li>{contactInfo.phone}</li>
              <li>{contactInfo.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-red-900/60 pt-6 text-center text-sm text-zinc-500">
          © {copyrightYear} La Katuar, LLC
        </div>
      </div>
    </footer>
  );
}
