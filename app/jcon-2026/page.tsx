"use client";

import Image from "next/image";
import Link from "next/link";
import type { IconType } from "react-icons";
import { useSyncExternalStore } from "react";
import { FaAnchor, FaBlog, FaBook, FaCodeBranch, FaFileAlt, FaIdCard, FaQuestionCircle, FaRobot, FaStar } from "react-icons/fa";
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

type RelatedLink = {
  href: string;
  title: string;
  description: string;
  meta: string;
  Icon: IconType;
  iconPanelClassName: string;
  iconClassName: string;
  titleClassName: string;
};

const RELATED_LINKS: RelatedLink[] = [
  {
    href: "https://llm-coding.github.io/Semantic-Anchors",
    title: "Semantic Anchors",
    description: "Patterns for creating more stable references while working with AI in codebases.",
    meta: "llm-coding.github.io/Semantic-Anchors",
    Icon: FaAnchor,
    iconPanelClassName: "border-[#f1f4ff]/35 bg-[#f1f4ff]/8",
    iconClassName: "text-[#f1f4ff] drop-shadow-[0_0_10px_rgba(241,244,255,0.35)]",
    titleClassName: "text-[#f1f4ff]",
  },
  {
    href: "https://ai4jvm.com",
    title: "ai4jvm.com",
    description: "AI-focused JVM material, talks, and experiments around modern development workflows.",
    meta: "ai4jvm.com",
    Icon: FaRobot,
    iconPanelClassName: "border-[#ff2c4d]/35 bg-[#ff2c4d]/10",
    iconClassName: "text-[#ff2c4d] drop-shadow-[0_0_10px_rgba(214,42,66,0.45)]",
    titleClassName: "text-[#ff2c4d]",
  },
  {
    href: "https://rabauer.dev/en/blog",
    title: "rabauer.dev blog",
    description: "Articles, event recaps, and write-ups that go deeper into the themes behind this session.",
    meta: "rabauer.dev/en/blog",
    Icon: FaBlog,
    iconPanelClassName: "border-[#8f9fcb]/35 bg-[#8f9fcb]/10",
    iconClassName: "text-[#8f9fcb] drop-shadow-[0_0_10px_rgba(98,114,164,0.4)]",
    titleClassName: "text-[#8f9fcb]",
  },
  {
    href: "https://xdev.software/ueber-uns/xdev-commit-cards",
    title: "xdev commit cards",
    description: "Conversation cards designed to make review and feedback discussions more effective.",
    meta: "xdev.software/xdev-commit-cards",
    Icon: FaIdCard,
    iconPanelClassName: "border-[#f4b25f]/35 bg-[#f4b25f]/10",
    iconClassName: "text-[#f4b25f] drop-shadow-[0_0_10px_rgba(244,178,95,0.35)]",
    titleClassName: "text-[#f4b25f]",
  },
  {
    href: "https://github.com/JohannesRabauer/vaadin-routes-export-maven-plugin",
    title: "Vaadin Routes Export",
    description: "A Maven plugin for exporting Vaadin route information in a form that can be reused outside the app.",
    meta: "github.com/JohannesRabauer/vaadin-routes-export-maven-plugin",
    Icon: FaCodeBranch,
    iconPanelClassName: "border-[#73d2de]/35 bg-[#73d2de]/10",
    iconClassName: "text-[#73d2de] drop-shadow-[0_0_10px_rgba(115,210,222,0.35)]",
    titleClassName: "text-[#73d2de]",
  },
  {
    href: "https://github.com/joelparkerhenderson/architecture-decision-record",
    title: "Architecture Decision Record",
    description: "The ADR reference repository for capturing architectural decisions as lightweight, durable documents.",
    meta: "github.com/joelparkerhenderson/architecture-decision-record",
    Icon: FaBook,
    iconPanelClassName: "border-[#d596f4]/35 bg-[#d596f4]/10",
    iconClassName: "text-[#d596f4] drop-shadow-[0_0_10px_rgba(213,150,244,0.32)]",
    titleClassName: "text-[#d596f4]",
  },
];

const subscribeToQrCodeAvailability = () => () => undefined;

export default function JConPage() {
  const showQRCode = useSyncExternalStore(
    subscribeToQrCodeAvailability,
    () => new Date() < SLIDO_DEADLINE,
    () => true
  );

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

        <section className="w-full max-w-6xl rounded-[1.25rem] border border-[#7f2d3a]/45 bg-[#120c0f]/72 px-5 py-6 shadow-[0_0_30px_rgba(80,28,36,0.18)] backdrop-blur-md">
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <p className={`${michroma.className} text-[0.7rem] uppercase tracking-[0.4em] text-[#8f9fcb]`}>
              After The Talk
            </p>
            <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
              <h3 className={`${michroma.className} text-xl text-[#f1f4ff] md:text-2xl`}>
                Keep Exploring
              </h3>
              <p className="max-w-2xl text-sm leading-relaxed text-[#8f9fcb] md:text-base">
                A few pages that connect directly to the ideas, tools, and review culture behind this session.
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {RELATED_LINKS.map(({ Icon, href, title, description, meta, iconPanelClassName, iconClassName, titleClassName }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="jcon-card h-full w-full items-start gap-4 text-left"
                aria-label={`Open ${title}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded border ${iconPanelClassName}`}>
                    <Icon className={`${iconClassName} text-3xl`} />
                  </div>

                  <div className="min-w-0">
                    <h4 className={`${michroma.className} text-lg leading-tight ${titleClassName}`}>
                      {title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-[#c0c8e5]">
                      {description}
                    </p>
                  </div>
                </div>

                <span className="text-[0.72rem] uppercase tracking-[0.22em] text-[#8f9fcb]">
                  {meta}
                </span>
              </a>
            ))}
          </div>
        </section>

        <SocialBadges variant="jcon" />
      </div>
    </main>
  );
}
