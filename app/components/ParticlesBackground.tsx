
"use client";

import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import { useCallback, useEffect, useState } from "react";

type ParticleEngine = Parameters<typeof loadSlim>[0];

/**
 * Full-screen animated particles background.
 * - Cyber palette including pink
 * - Grab interactivity on hover (links up nearby particles)
 * - Respects prefers-reduced-motion (freezes particles if set)
 * - aria-hidden — purely decorative
 */
export default function ParticlesBackground() {
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
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
          detectRetina: true,
          particles: {
            color: { value: ["#7b2ff7", "#f107a3", "#00f2fe", "#00ff9d"] },
            links: {
              enable: true,
              color: "#7b2ff7",
              distance: 150,
              opacity: 0.25,
              width: 1,
            },
            move: { enable: !reducedMotion, speed: 0.8 },
            number: { value: 45, density: { enable: true } },
            opacity: { value: { min: 0.3, max: 0.65 } },
            size: { value: { min: 1, max: 2.5 } },
          },
          interactivity: {
            events: {
              onHover: { enable: !reducedMotion, mode: "grab" },
            },
            modes: {
              grab: {
                distance: 140,
                links: { opacity: 0.7 },
              },
            },
          },
        }}
      />
    </div>
  );
}
