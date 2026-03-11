"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaFileAlt, FaQuestionCircle, FaStar } from "react-icons/fa";
import { Michroma } from "next/font/google";
import SocialBadges from "../components/SocialBadges";

const michroma = Michroma({
  subsets: ["latin"],
  weight: "400",
});

/** Slido Q&A link is shown until midnight on 22 April 2026 */
const SLIDO_DEADLINE = new Date("2026-04-22T23:59:59");

/** Replace with your actual Slido event URL */
const SLIDO_URL = "https://app.sli.do/event/mrbyk6V9atpK4HLuP51qEL/live/questions?section=ce0c8c2b-1ebc-4f04-bf89-c718917ad6f2";

/** Replace with the target GitHub repository / Pages URL */
const GITHUB_URL = "https://github.com/JohannesRabauer";

export default function JConPage() {
  const [showQRCode, setShowQRCode] = useState(true);

  useEffect(() => {
    setShowQRCode(new Date() < SLIDO_DEADLINE);
  }, []);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-[#0a0608] text-white overflow-hidden">
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
            className="rounded-full border border-[#7f2d3a] jcon-glow-cyan"
            priority
          />
        </Link>

        <h1
          className={`${michroma.className} text-[#f1f4ff] text-4xl md:text-6xl font-extrabold uppercase tracking-[0.18em]`}
          style={{ textShadow: "0 0 10px rgba(214, 42, 66, 0.75), 0 0 24px rgba(122, 19, 30, 0.5)" }}
        >
         Ten Angry Comments Later
        </h1>

        <h2 className={`${michroma.className} text-[#ff2c4d] text-2xl md:text-4xl font-bold tracking-wide -mt-3`}>
          Stories About Code Reviews, Teams, and Yesterday&apos;s Code
        </h2>

        <p className="max-w-4xl text-[#8f9fcb] text-lg md:text-2xl font-medium leading-tight -mt-4">
           Johannes Rabauer
        </p>

        {/* Cards */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center gap-8 mt-2">
          {/* QR code → Slido (hidden after 22 Apr 2026) */}
          {showQRCode && (
            <a
              href={SLIDO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="jcon-card w-[220px]"
              aria-label="Join Q&amp;A on Slido"
            >
              <div className="w-[180px] h-[180px] rounded flex items-center justify-center border border-[#ff2c4d]/45 bg-[#ff2c4d]/10">
                <FaQuestionCircle className="text-[#f1f4ff] text-8xl drop-shadow-[0_0_10px_rgba(214,42,66,0.55)]" />
              </div>
              <span className={`${michroma.className} jcon-label w-full text-center text-[#f1f4ff] text-[1.4rem] md:text-[1.5rem] leading-tight`}>Q&amp;A via Slido</span>
            </a>
          )}

          {/* Placeholder → GitHub page */}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="jcon-card w-[220px]"
            aria-label="Slides"
          >
            <div className="w-[180px] h-[180px] rounded flex items-center justify-center border border-[#8f9fcb]/45 bg-[#8f9fcb]/10">
              <FaFileAlt className="text-[#8f9fcb] text-8xl drop-shadow-[0_0_10px_rgba(98,114,164,0.45)]" />
            </div>
            <span className={`${michroma.className} jcon-label w-full text-center text-[#8f9fcb] text-[1.4rem] md:text-[1.5rem] leading-tight`}>Slides</span>
          </a>

          {/* Rating page */}
          <a
            href="https://schedule.jcon.one/2026/session/1117149"
            target="_blank"
            rel="noopener noreferrer"
            className="jcon-card w-[220px]"
            aria-label="Rate the session"
          >
            <div className="w-[180px] h-[180px] rounded flex items-center justify-center border border-[#ff2c4d]/45 bg-[#ff2c4d]/10">
              <FaStar className="text-[#ff2c4d] text-8xl drop-shadow-[0_0_10px_rgba(214,42,66,0.5)]" />
            </div>
            <span className={`${michroma.className} jcon-label w-full text-center text-[#ff2c4d] text-[1.4rem] md:text-[1.5rem] leading-tight`}>Rate the session</span>
          </a>
        </div>

        <SocialBadges variant="jcon" />
      </div>
    </main>
  );
}
