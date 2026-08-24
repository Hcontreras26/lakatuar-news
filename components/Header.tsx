import React from "react";
import type { NavItem, SocialLink, SocialIconType } from "@/types";

export interface SocialIconProps {
  type: SocialIconType;
  className?: string;
}

export interface HeaderProps {
  navItems?: NavItem[];
  socialLinks?: SocialLink[];
  className?: string;
}

const defaultNavItems: NavItem[] = [
  { label: "Lo último", href: "#ultimas" },
  { label: "Noticias", href: "#noticias" },
  { label: "En vivo", href: "#en-vivo" },
  { label: "Programas", href: "#programas" },
  { label: "Contactos", href: "#contactos" },
];

const defaultSocialLinks: SocialLink[] = [
  { name: "Facebook", href: "#", icon: "facebook" },
  { name: "X", href: "#", icon: "x" },
  { name: "YouTube", href: "#", icon: "youtube" },
  { name: "TikTok", href: "#", icon: "tiktok" },
  { name: "WhatsApp", href: "#", icon: "whatsapp" },
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
    default:
      return null;
  }
}

export default function Header({
  navItems = defaultNavItems,
  socialLinks = defaultSocialLinks,
  className = "",
}: HeaderProps): React.JSX.Element {
  return (
    <header className={`sticky top-0 z-50 bg-[#120404]/95 backdrop-blur-sm ${className}`.trim()}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <nav className="flex flex-1 items-center justify-start gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-200 sm:gap-5 md:gap-7">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="transition-colors duration-200 hover:text-red-400"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              aria-label={social.name}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-red-900/70 bg-[#1b0707] text-zinc-200 transition duration-200 hover:border-red-500 hover:text-red-400"
            >
              <SocialIcon type={social.icon} />
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
