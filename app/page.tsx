

import ParticlesBackground from "./components/ParticlesBackground";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-cyber-bg text-white overflow-hidden">
      <ParticlesBackground />
      <Hero />
    </main>
  );
}
