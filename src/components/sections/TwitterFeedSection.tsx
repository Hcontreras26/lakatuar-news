"use client";

import React from "react";
import type { Tweet, TwitterUser } from "@/types/twitter";
import TweetCard from "@/components/ui/TweetCard";

export { default as TweetCard } from "@/components/ui/TweetCard";
export type { TweetCardProps } from "@/components/ui/TweetCard";

export interface TwitterFeedSectionProps {
  tweets?: Tweet[];
  user?: TwitterUser;
  username?: string;
  className?: string;
}

export default function TwitterFeedSection({
  tweets = [],
  user,
  username = "la_katuar",
  className = "",
}: TwitterFeedSectionProps): React.JSX.Element {
  const currentUsername = user?.username || username;

  return (
    <section
      id="lo-ultimo"
      aria-label="Feed de X (Twitter) - Lo último"
      className={`relative scroll-mt-16 bg-black py-10 text-white sm:py-14 border-t border-b border-zinc-900 ${className}`.trim()}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cabecera de la Sección con Branding de X */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-900 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950 text-white shadow-md">
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-white">
                  @{currentUsername}
                </span>
                <span className="rounded bg-red-600/90 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-white">
                  EN VIVO
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Últimas publicaciones y coberturas en X (Twitter)
              </p>
            </div>
          </div>

          <a
            href={`https://x.com/${currentUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-xs font-bold uppercase tracking-wider text-zinc-200 shadow-sm transition hover:border-zinc-500 hover:bg-zinc-800 hover:text-white"
          >
            <span>Seguir en X</span>
            <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>

        {/* Grilla simétrica a ancho completo de 2 columnas alimentada por la API */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 items-stretch">
          {tweets.map((tweet) => (
            <TweetCard key={tweet.id} tweet={tweet} user={user} />
          ))}
        </div>
      </div>
    </section>
  );
}
