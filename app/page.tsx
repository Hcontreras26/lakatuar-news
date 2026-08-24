import React from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import OnDemandSection from "@/components/OnDemandSection";
import NewsSliderSection from "@/components/NewsSliderSection";
import TopStoriesSection from "@/components/TopStoriesSection";
import Footer from "@/components/Footer";

export default function Home(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-[#120404] text-white">
      <Header />
      <HeroSection />
      <OnDemandSection />
      <NewsSliderSection />
      <TopStoriesSection />
      <Footer />
    </main>
  );
}
