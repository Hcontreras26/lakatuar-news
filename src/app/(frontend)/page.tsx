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
import { getInstagramFeed } from "@/lib/instagram";
import { getTopStoriesData } from "@/lib/payload";

export default async function Home(): Promise<React.JSX.Element> {
  const [latestVideos, twitterFeed, instagramFeed, topStoriesData] = await Promise.all([
    getLatestYouTubeVideosFromRSS(),
    getTwitterFeed(),
    getInstagramFeed(8),
    getTopStoriesData(),
  ]);

  const mappedMainStory = topStoriesData.mainStory
    ? {
        title: topStoriesData.mainStory.title,
        date: topStoriesData.mainStory.publishedAt
          ? new Date(topStoriesData.mainStory.publishedAt)
              .toLocaleDateString("es-ES", { month: "short", day: "numeric" })
              .toUpperCase()
          : "HOY",
        image:
          typeof topStoriesData.mainStory.coverImage === "object" &&
          topStoriesData.mainStory.coverImage?.url
            ? topStoriesData.mainStory.coverImage.url
            : "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
        summary: topStoriesData.mainStory.summary,
        url: `/noticias/${topStoriesData.mainStory.slug}`,
      }
    : undefined;

  const mappedSidebarStories =
    topStoriesData.sidebarStories.length > 0
      ? topStoriesData.sidebarStories.map((story) => ({
          id: story.id,
          title: story.title,
          date: story.publishedAt
            ? new Date(story.publishedAt)
                .toLocaleDateString("es-ES", { month: "short", day: "numeric" })
                .toUpperCase()
            : "HOY",
          thumbnail:
            typeof story.coverImage === "object" && story.coverImage?.url
              ? story.coverImage.url
              : undefined,
          url: `/noticias/${story.slug}`,
        }))
      : undefined;

  return (
    <main className="min-h-screen bg-[#120404] text-white">
      {/* 1. Encabezado de Navegación */}
      <Header />

      {/* 2. Hero Section con Transmisión y Presentadora */}
      <HeroSection latestVideo={latestVideos[0]} />

      {/* 3. Sección ON Demand / VOD */}
      <OnDemandSection items={latestVideos} />

      {/* 4. Sección de Publicaciones de Instagram */}
      <InstagramSection posts={instagramFeed.posts} />

      {/* 5. Sección de Tweets y Notas de X */}
      <TwitterFeedSection tweets={twitterFeed.tweets} user={twitterFeed.user} />

      {/* 6. Sección de Top Stories con Noticia Central y Banner de Denuncias */}
      <TopStoriesSection
        mainStory={mappedMainStory}
        sidebarStories={mappedSidebarStories}
      />

      {/* 7. Footer Oficial Replicado al Detalle */}
      <Footer />
    </main>
  );
}
