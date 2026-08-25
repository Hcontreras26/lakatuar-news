"use client";

import React from "react";
import type { TweetPost } from "@/types";
import TweetCard from "@/components/ui/TweetCard";

export { default as TweetCard } from "@/components/ui/TweetCard";
export type { TweetCardProps } from "@/components/ui/TweetCard";

export interface TwitterFeedSectionProps {
  tweets?: TweetPost[];
  className?: string;
}

const defaultTweets: TweetPost[] = [
  {
    id: 1,
    authorName: "Jessica Vallenilla",
    authorHandle: "la_katuar",
    authorAvatar: "/presentadora.png",
    isVerified: true,
    timeAgo: "4h",
    text: "Juez sentencia a 5 años de cárcel a coacusada en el caso con el excongresista republicano David Rivera.\n\nEl colega Joshua Goodman reporta la sentencia contra Esther Nuhfer por el cabildeo de $50 millones pagado por el régimen de Venezuela.",
    hashtags: ["#Venezuela", "#EEUU"],
    quote: {
      authorName: "Joshua Goodman",
      authorHandle: "APjoshgoodman",
      isVerified: true,
      translatedText: "Traducido del inglés (Mostrar original)",
      text: "Coacusada de excongresista republicano David Rivera sentenciada a 5 años de prisión por su rol en campaña secreta de cabildeo de $50 millones pagada por el gobierno de Venezuela.\n\nFuncionarios locales y amigos llenaron la sala del tribunal de Miami mientras se leía el veredicto a la consultora política Esther Nuhfer.",
      courtDetails: "Califica esta traducción 🌐 👍 👎",
      timestamp: "10:55 p. m. · 18 ago. 2026 · 2,689 Visualizaciones",
    },
    stats: {
      replies: "3",
      reposts: "5",
      likes: "18",
      views: "183",
    },
  },
  {
    id: 2,
    authorName: "Jessica Vallenilla",
    authorHandle: "la_katuar",
    authorAvatar: "/presentadora.png",
    isVerified: true,
    timeAgo: "5h",
    text: "Familia de preso político denuncia amenaza de sobrino de Cilia Flores por alzar la voz ante injusticia.\n\nA través de dos personas la mandó a amenazar que tenía que dejar las publicaciones en redes sociales o la iba a meter presa, detalló Rilyn Rivero sobre amenaza a su cuñada.",
    media: {
      type: "video",
      duration: "3:00",
      presenterName: "JESSICA VALLENILLA",
      guestName: "EILYN RIVERO",
      guestTitle: "FAMILIAR PRESO POLÍTICO",
      showTitle: "EN LA MIRA con La Katuar",
      hasQrCode: true,
    },
    stats: {
      replies: "1",
      reposts: "228",
      likes: "314",
      views: "4.1K",
    },
  },
];

export default function TwitterFeedSection({
  tweets = defaultTweets,
  className = "",
}: TwitterFeedSectionProps): React.JSX.Element {
  return (
    <section
      aria-label="Feed de X"
      className={`bg-black py-10 text-white sm:py-14 border-t border-b border-zinc-900 ${className}`.trim()}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {tweets.map((tweet) => (
            <TweetCard key={tweet.id} tweet={tweet} />
          ))}
        </div>
      </div>
    </section>
  );
}
