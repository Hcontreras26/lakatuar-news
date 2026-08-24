import React from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import OnDemandSection from "@/components/OnDemandSection";
import InstagramSection from "@/components/InstagramSection";
import TwitterFeedSection from "@/components/TwitterFeedSection";
import TopStoriesSection from "@/components/TopStoriesSection";
import Footer from "@/components/Footer";

export default function Home(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-[#120404] text-white">
      {/* 1. Encabezado de Navegación */}
      <Header />

      {/* 2. Hero Section con Transmisión y Presentadora */}
      <HeroSection />

      {/* 3. Sección ON Demand / VOD */}
      <OnDemandSection />

      {/* 4. Sección de Publicaciones de Instagram */}
      <InstagramSection />

      {/* 5. Sección de Tweets y Notas de X */}
      <TwitterFeedSection />

      {/* 6. Sección de Top Stories con Noticia Central y Banner de Denuncias */}
      <TopStoriesSection />

      {/* 7. Footer Oficial Replicado al Detalle */}
      <Footer />
    </main>
  );
}
