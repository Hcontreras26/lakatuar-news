"use client";

import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    twttr?: {
      widgets?: {
        load: (element?: HTMLElement) => void;
      };
    };
  }
}

export interface TwitterEmbedProps {
  tweetIdOrUrl: string;
  className?: string;
}

function extractTweetId(input: string): string {
  const clean = input.trim();
  const match = clean.match(/status\/(\d+)/i);
  if (match) return match[1];
  if (/^\d+$/.test(clean)) return clean;
  return clean;
}

export default function TwitterEmbed({ tweetIdOrUrl, className = "" }: TwitterEmbedProps): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const tweetId = extractTweetId(tweetIdOrUrl);

  useEffect(() => {
    const tryLoadWidgets = () => {
      if (typeof window !== "undefined" && window.twttr?.widgets && containerRef.current) {
        window.twttr.widgets.load(containerRef.current);
      }
    };

    tryLoadWidgets();

    const interval = setInterval(() => {
      if (typeof window !== "undefined" && window.twttr?.widgets) {
        tryLoadWidgets();
        clearInterval(interval);
      }
    }, 250);

    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [tweetId]);

  return (
    <div
      ref={containerRef}
      className={`w-full flex justify-center items-start min-h-[300px] overflow-hidden rounded-2xl bg-black ${className}`.trim()}
    >
      <blockquote
        className="twitter-tweet"
        data-theme="dark"
        data-dnt="true"
        data-conversation="none"
        data-align="center"
      >
        <a href={`https://twitter.com/la_katuar/status/${tweetId}`}>
          Cargando publicación oficial en X...
        </a>
      </blockquote>
    </div>
  );
}
