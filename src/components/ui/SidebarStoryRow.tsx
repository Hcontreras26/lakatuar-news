import React from "react";
import Image from "next/image";
import type { SidebarStory } from "@/types";

export interface SidebarStoryRowProps {
  story: SidebarStory;
  className?: string;
}

export default function SidebarStoryRow({ story, className = "" }: SidebarStoryRowProps): React.JSX.Element {
  return (
    <article
      className={`flex items-start justify-between gap-4 border-b border-zinc-200 py-3 last:border-b-0 hover:opacity-80 transition cursor-pointer ${className}`.trim()}
    >
      <div className="flex-1 pr-2">
        <h4 className="font-serif text-sm font-bold leading-snug text-zinc-900 sm:text-[15px]">
          {story.title}
        </h4>
        <span className="mt-1 block text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
          {story.date}
        </span>
      </div>

      {story.thumbnail && (
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded bg-zinc-100 sm:h-18 sm:w-18">
          <Image
            src={story.thumbnail}
            alt={story.title}
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>
      )}
    </article>
  );
}
