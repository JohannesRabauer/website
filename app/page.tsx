

import ParticlesBackground from "./components/ParticlesBackground";
import Hero from "./components/Hero";
import Certifications from "./components/Certifications";
import Publications from "./components/Publications";
import Youtube from "./components/Youtube";
import AiExperiment from "./components/AiExperiment";

export default function Home() {
  return (
    <main id="main-content" className="relative min-h-screen flex flex-col items-center justify-start bg-cyber-bg text-white overflow-hidden">
      <ParticlesBackground />
      <Hero />
      <Youtube />
      <Certifications />
      <Publications />
      <AiExperiment />
    </main>
  );
}
