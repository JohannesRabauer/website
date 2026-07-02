

import ParticlesBackground from "./components/ParticlesBackground";
import Reveal from "./components/Reveal";
import Hero from "./components/Hero";
import Certifications from "./components/Certifications";
import Publications from "./components/Publications";
import Youtube from "./components/Youtube";
import { getHomepageJsonLd, stringifyJsonLd } from "@/lib/seo";

export default function Home() {
  const homepageJsonLd = stringifyJsonLd(getHomepageJsonLd());

  return (
    <main
      id="main-content"
      className="relative min-h-screen flex flex-col items-center justify-start bg-cyber-bg text-white"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: homepageJsonLd }}
      />

      {/* Depth vignette — sits between particles (z:-1) and content (z:10) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% -5%, rgba(123,47,247,0.20) 0%, transparent 55%), radial-gradient(ellipse at 95% 85%, rgba(0,242,254,0.11) 0%, transparent 48%)",
        }}
      />

      <ParticlesBackground />
      <Hero />

      <Reveal className="w-full flex justify-center">
        <Youtube />
      </Reveal>

      <Reveal className="w-full flex justify-center" delay={0.05}>
        <Certifications />
      </Reveal>

      <Reveal className="w-full flex justify-center" delay={0.05}>
        <Publications />
      </Reveal>
    </main>
  );
}
