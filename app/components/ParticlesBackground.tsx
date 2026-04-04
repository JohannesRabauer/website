
"use client";

import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import { useCallback, useEffect, useState } from "react";

type ParticleEngine = Parameters<typeof loadSlim>[0];

/**
 * Full-screen animated particles background
 * - Cyber-inspired colors
 * - Reacts smoothly without blocking content
 */
export default function ParticlesBackground() {
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const particlesInit = useCallback(async (engine: ParticleEngine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div aria-hidden="true">
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="particles-background"
      options={{
        background: { color: "#0d0b1e" },
        particles: {
          color: { value: ["#7b2ff7", "#f107a3", "#00f2fe"] },
          links: { enable: true, color: "#7b2ff7" },
          move: { enable: !reducedMotion, speed: 1 },
          number: { value: 50 },
          opacity: { value: 0.6 },
          size: { value: { min: 1, max: 3 } },
        },
      }}
    />
    </div>
  );
}
