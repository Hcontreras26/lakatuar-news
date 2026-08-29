"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import type { NavItem, SocialLink, SocialIconType } from "@/types";

export interface SocialIconProps {
  type: SocialIconType;
  className?: string;
}

export interface HeaderProps {
  brandName?: string;
  brandSubname?: string;
  navItems?: NavItem[];
  socialLinks?: SocialLink[];
  announcement?: string;
  isLive?: boolean;
  className?: string;
}

const defaultNavItems: NavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Lo último", href: "/#lo-ultimo" },
  { label: "Noticias", href: "/#noticias" },
  { label: "En vivo", href: "/#en-vivo" },
  { label: "Programas", href: "/#programas" },
  { label: "Contacto", href: "/contacto" },
];

const defaultSocialLinks: SocialLink[] = [
  { name: "YouTube", href: "https://youtube.com", icon: "youtube" },
  { name: "Instagram", href: "https://instagram.com/la_katuar", icon: "instagram" },
  { name: "X", href: "https://x.com/la_katuar", icon: "x" },
  { name: "TikTok", href: "https://tiktok.com", icon: "tiktok" },
  { name: "Facebook", href: "https://facebook.com", icon: "facebook" },
  { name: "WhatsApp", href: "https://whatsapp.com", icon: "whatsapp" },
];

export function SocialIcon({ type, className = "h-4 w-4 fill-current" }: SocialIconProps): React.JSX.Element | null {
  switch (type) {
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path d="M13.5 22v-8h2.6l.4-3h-3V7.2c0-.9.3-1.6 1.7-1.6H17V2.8c-.3 0-1.4-.1-2.6-.1-2.5 0-4.2 1.5-4.2 4.4V11H8v3h2.2v8h3.3Z" />
        </svg>
      );
    case "x":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path d="M18.9 2h3.5l-7.6 8.7L22.8 22h-6.9l-5.4-7.7L4.4 22H.9l8.1-9.2L1.2 2h7.1l4.9 7.1L18.9 2Zm-1.2 18h1.9L7.1 3.9H5.1L17.7 20Z" />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path d="M23.5 7.2a3 3 0 0 0-2.1-2.1C19.6 4.7 12 4.7 12 4.7s-7.6 0-9.4.4A3 3 0 0 0 .5 7.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.8.4 9.4.4 9.4.4s7.6 0 9.4-.4a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-4.8ZM9.7 15.5V8.5l6.2 3.5-6.2 3.5Z" />
        </svg>
      );
    case "tiktok":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path d="M16.2 3.1c.5 1.4 1.7 2.6 3.3 3.1v2.9c-1.3 0-2.5-.3-3.6-.9v6.7a5.6 5.6 0 1 1-5.6-5.6c.2 0 .4 0 .6.1v3c-.2-.1-.4-.1-.6-.1a2.6 2.6 0 1 0 2.6 2.6V3.1h3.3Z" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path d="M19.1 4.9A9.8 9.8 0 0 0 12 2a9.9 9.9 0 0 0-8.5 15l-1.3 4.8 5-1.3A9.9 9.9 0 1 0 19.1 4.9Zm-5.5 14.1c-1.3 0-2.6-.4-3.8-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.1 8.1 0 1 1 12 20.1Zm4.4-6.1c-.2-.1-1.1-.5-1.3-.6-.2-.1-.3-.1-.5.1-.1.2-.5.6-.6.7-.1.1-.3.1-.5 0s-1-.4-2-1.2c-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.3.1-.4.1-.1.2-.3.3-.4.1-.1.2-.2.3-.4.1-.1.1-.3 0-.4-.1-.1-.5-1.2-.7-1.7-.2-.5-.4-.4-.5-.4h-.4c-.1 0-.3.1-.5.2s-.6.6-.6 1.5c0 .8.7 1.7.8 1.8.1.1 1.5 2.3 3.6 3.2.5.2.9.3 1.2.4.5.1.9.1 1.2.1.4 0 1.1-.4 1.3-.9.2-.5.2-.9.1-1Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Header({
  brandName = "LA KATUAR",
  brandSubname = "NEWS",
  navItems = defaultNavItems,
  socialLinks = defaultSocialLinks,
  announcement,
  isLive = false,
  className = "",
}: HeaderProps): React.JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const closeMenu = useCallback((): void => {
    setIsOpen(false);
  }, []);

  const toggleMenu = useCallback((): void => {
    setIsOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape" && isOpen) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeMenu]);

  return (
    <>
      {announcement && announcement.trim().length > 0 && (
        <div className="bg-red-700 text-white text-xs font-bold py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-2 border-b border-red-800 z-50 relative">
          <span className="bg-black/30 px-2 py-0.5 rounded text-[10px] uppercase font-black tracking-widest animate-pulse">
            ÚLTIMA HORA
          </span>
          <span>{announcement}</span>
        </div>
      )}

      <header
        className={`sticky top-0 z-40 bg-[#120404]/95 backdrop-blur-md border-b border-red-950/40 ${className}`.trim()}
      >
        <div className="mx-auto flex max-w-7xl min-h-[58px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center group transition-opacity hover:opacity-90 py-1"
              aria-label={`${brandName} ${brandSubname} - Inicio`}
            >
              <Image
                src="/logo-header.png"
                alt="LA KATUAR NEWS"
                width={170}
                height={42}
                priority
                className="h-9 sm:h-10 w-auto object-contain transition-transform group-hover:scale-[1.02]"
              />
            </Link>

            <nav
              aria-label="Navegación principal"
              className="hidden md:flex items-center gap-5 lg:gap-7 text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-200"
            >
              {navItems.map((item) => {
                const isExternal = item.href.startsWith("http");
                const isLiveItem = item.href.includes("en-vivo") || item.label.toLowerCase().includes("vivo");

                const labelContent = (
                  <span className="flex items-center gap-1.5">
                    {item.label}
                    {isLive && isLiveItem && (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                      </span>
                    )}
                  </span>
                );

                return isExternal ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-200 hover:text-red-400"
                  >
                    {labelContent}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="transition-colors duration-200 hover:text-red-400"
                  >
                    {labelContent}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-red-900/70 bg-[#1b0707] text-zinc-200 transition duration-200 hover:border-red-500 hover:text-red-400"
                >
                  <SocialIcon type={social.icon} />
                </a>
              ))}
            </div>

            <button
              type="button"
              onClick={toggleMenu}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
              className="flex md:hidden h-10 w-10 items-center justify-center rounded-lg border border-red-900/70 bg-[#1b0707] text-zinc-200 transition duration-200 hover:border-red-500 hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              {isOpen ? (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-50 bg-black/75 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <aside
        id="mobile-navigation-drawer"
        aria-label="Menú principal móvil"
        aria-hidden={!isOpen}
        className={`fixed top-0 right-0 bottom-0 z-50 flex h-full w-[85%] max-w-sm flex-col justify-between border-l border-red-900/40 bg-[#140404]/98 p-6 shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          <div className="flex items-center justify-between pb-5 border-b border-red-950/70">
            <Link
              href="/"
              onClick={closeMenu}
              className="flex items-center"
              aria-label="LA KATUAR NEWS - Inicio"
            >
              <Image
                src="/logo-header.png"
                alt="LA KATUAR NEWS"
                width={160}
                height={40}
                className="h-8 w-auto object-contain"
              />
            </Link>

            <button
              type="button"
              onClick={closeMenu}
              aria-label="Cerrar menú"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-900/60 bg-[#1b0707] text-zinc-300 transition-colors hover:border-red-500 hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav
            aria-label="Navegación móvil"
            className="mt-6 flex flex-col space-y-2"
          >
            {navItems.map((item) => {
              const isExternal = item.href.startsWith("http");
              return isExternal ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="group flex items-center justify-between rounded-lg px-3.5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-200 transition-all duration-200 hover:bg-red-950/50 hover:text-red-400 hover:pl-5"
                >
                  <span>{item.label}</span>
                  <svg
                    className="h-4 w-4 text-red-700/60 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-red-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={closeMenu}
                  className="group flex items-center justify-between rounded-lg px-3.5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-200 transition-all duration-200 hover:bg-red-950/50 hover:text-red-400 hover:pl-5"
                >
                  <span>{item.label}</span>
                  <svg
                    className="h-4 w-4 text-red-700/60 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-red-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-red-950/70">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            Síguenos en redes
          </p>
          <div className="flex items-center gap-2.5 flex-wrap">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-red-900/70 bg-[#1b0707] text-zinc-200 transition duration-200 hover:border-red-500 hover:text-red-400"
              >
                <SocialIcon type={social.icon} />
              </a>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
