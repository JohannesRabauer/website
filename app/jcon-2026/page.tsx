"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import SocialBadges from "../components/SocialBadges";

/** Slido Q&A link is shown until midnight on 22 April 2026 */
const SLIDO_DEADLINE = new Date("2026-04-22T23:59:59");

/** Replace with your actual Slido event URL */
const SLIDO_URL = "https://app.sli.do";

/** Replace with the target GitHub repository / Pages URL */
const GITHUB_URL = "https://github.com/JohannesRabauer";

export default function JConPage() {
  const [showQRCode, setShowQRCode] = useState(true);

  useEffect(() => {
    setShowQRCode(new Date() < SLIDO_DEADLINE);
  }, []);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-[#050514] text-white overflow-hidden">
      {/* ── Animated neon-grid background ── */}
      <div className="jcon-bg" aria-hidden="true">
        {/* Horizontal pulsing lines */}
        <div className="jcon-hline" style={{ top: "15%", animationDelay: "0s" }} />
        <div className="jcon-hline" style={{ top: "35%", animationDelay: "1.1s" }} />
        <div className="jcon-hline" style={{ top: "55%", animationDelay: "0.55s" }} />
        <div className="jcon-hline" style={{ top: "75%", animationDelay: "1.65s" }} />
        <div className="jcon-hline" style={{ top: "90%", animationDelay: "2.2s" }} />
        {/* Vertical pulsing lines */}
        <div className="jcon-vline" style={{ left: "10%", animationDelay: "0.3s" }} />
        <div className="jcon-vline" style={{ left: "30%", animationDelay: "1.4s" }} />
        <div className="jcon-vline" style={{ left: "50%", animationDelay: "0.8s" }} />
        <div className="jcon-vline" style={{ left: "70%", animationDelay: "1.95s" }} />
        <div className="jcon-vline" style={{ left: "90%", animationDelay: "2.5s" }} />
        {/* Moving scan line */}
        <div className="jcon-scan" />
      </div>

      {/* ── Page content ── */}
      <div className="relative z-10 flex flex-col items-center gap-10 px-6 py-12 text-center">
        {/* Logo → home */}
        <Link
          href="/"
          aria-label="Back to main page"
          className="hover:scale-110 transition-transform duration-300"
        >
          <Image
            src="/Logo_round.png"
            alt="Johannes Rabauer"
            width={110}
            height={110}
            className="rounded-full border border-cyber-cyan jcon-glow-cyan"
            priority
          />
        </Link>

        {/* Cards */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-2">
          {/* QR code → Slido (hidden after 22 Apr 2026) */}
          {showQRCode && (
            <a
              href={SLIDO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="jcon-card"
              aria-label="Join Q&amp;A on Slido"
            >
              <Image
                src="/jcon-2026/slido_logo.png"
                alt="Slido logo"
                width={180}
                height={180}
                className="rounded"
                unoptimized
              />
              <span className="jcon-label text-cyber-cyan">Q&amp;A via Slido</span>
            </a>
          )}

          {/* Placeholder → GitHub page */}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="jcon-card"
            aria-label="View resources on GitHub"
          >
            <Image
              src="/fullIcon.png"
              alt="Resources on GitHub"
              width={180}
              height={180}
              className="rounded"
            />
            <span className="jcon-label text-cyber-purple">Resources on GitHub</span>
          </a>
        </div>
        <SocialBadges variant="jcon" />
      </div>
    </main>
  );
}
