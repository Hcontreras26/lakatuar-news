import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import OnDemandSection from "@/components/sections/OnDemandSection";
import InstagramSection from "@/components/sections/InstagramSection";
import TwitterFeedSection from "@/components/sections/TwitterFeedSection";
import TopStoriesSection from "@/components/sections/TopStoriesSection";
import { getLatestYouTubeVideosFromRSS } from "@/lib/youtube";
import { getTwitterFeed } from "@/lib/twitter";

export default async function Home(): Promise<React.JSX.Element> {
  const [latestVideos, twitterFeed] = await Promise.all([
    getLatestYouTubeVideosFromRSS(),
    getTwitterFeed(),
  ]);

  return (
    <main className="min-h-screen bg-[#120404] text-white">
      {/* 1. Encabezado de Navegación */}
      <Header />

      {/* 2. Hero Section con Transmisión y Presentadora */}
      <HeroSection latestVideo={latestVideos[0]} />

      {/* 3. Sección ON Demand / VOD */}
      <OnDemandSection items={latestVideos} />

      {/* 4. Sección de Publicaciones de Instagram */}
      <InstagramSection />

      {/* 5. Sección de Tweets y Notas de X */}
      <TwitterFeedSection tweets={twitterFeed.tweets} user={twitterFeed.user} />

      {/* 6. Sección de Top Stories con Noticia Central y Banner de Denuncias */}
      <TopStoriesSection />

      {/* 7. Footer Oficial Replicado al Detalle */}
      <Footer />
    </main>
  );
}
