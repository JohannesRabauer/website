

import ParticlesBackground from "./components/ParticlesBackground";
import Hero from "./components/Hero";
import Certifications from "./components/Certifications";
import Publications from "./components/Publications";
import Youtube from "./components/Youtube";
import HomeEntitySection from "./components/HomeEntitySection";
import { getHomepageJsonLd, stringifyJsonLd } from "@/lib/seo";

export default function Home() {
  const homepageJsonLd = stringifyJsonLd(getHomepageJsonLd());

  return (
    <main id="main-content" className="relative min-h-screen flex flex-col items-center justify-start bg-cyber-bg text-white overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: homepageJsonLd }}
      />
      <ParticlesBackground />
      <Hero />
      <HomeEntitySection />
      <Youtube />
      <Certifications />
      <Publications />
    </main>
  );
}
