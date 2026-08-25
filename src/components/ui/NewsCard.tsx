import React from "react";
import Image from "next/image";
import type { NewsItem } from "@/types";

export interface NewsCardProps {
  item: NewsItem;
  className?: string;
}

export default function NewsCard({ item, className = "" }: NewsCardProps): React.JSX.Element {
  return (
    <article
      className={`min-w-[285px] flex-1 overflow-hidden rounded-2xl border border-red-900/70 bg-[#170707] sm:min-w-[320px] md:min-w-[340px] ${className}`.trim()}
    >
      <div className="relative h-52 overflow-hidden bg-black">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 285px, (max-width: 768px) 320px, 340px"
          className="object-cover"
        />
        <span className="absolute left-4 top-4 z-10 rounded-full bg-red-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
          {item.tag}
        </span>
      </div>

      <div className="p-4">
        <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-zinc-400">
          {item.date}
        </p>
        <h3 className="mt-3 text-lg font-semibold leading-7 text-zinc-100">
          {item.title}
        </h3>
      </div>
    </article>
  );
}
