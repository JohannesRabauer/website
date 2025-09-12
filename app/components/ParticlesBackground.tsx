
"use client";

import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import { useCallback } from "react";

/**
 * Full-screen animated particles background
 * - Cyber-inspired colors
 * - Reacts smoothly without blocking content
 */
export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}
      options={{
        background: { color: "#0d0b1e" },
        particles: {
          color: { value: ["#7b2ff7", "#f107a3", "#00f2fe"] },
          links: { enable: true, color: "#7b2ff7" },
          move: { enable: true, speed: 1 },
          number: { value: 50 },
          opacity: { value: 0.6 },
          size: { value: { min: 1, max: 3 } },
        },
      }}
    />
  );
}
