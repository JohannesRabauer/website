"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FaVolumeUp, FaLaptopCode, FaChevronDown } from "react-icons/fa";
import Image from "next/image";
import { useRef } from "react";
import Link from "next/link";
import SocialBadges from "./SocialBadges";
import { getBlogListingPath } from "@/lib/blog-i18n";
import { HOMEPAGE_INTRO, PERSON_NAME } from "@/lib/site-data";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
    },
  },
};

/**
 * Hero section — near-full-viewport with staggered entrance,
 * gradient avatar ring, gradient name text, and a scroll cue.
 */
function Hero() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const reducedMotion = useReducedMotion();

  function playPronunciation() {
    audioRef.current?.play();
  }

  return (
    <section className="content-layer relative w-full flex flex-col items-center px-4 pb-16 text-center">
      {/* Banner image with avatar overlapping bottom edge */}
      <div className="relative w-full max-w-4xl mx-auto mb-20">
        <div className="relative w-full h-48 overflow-hidden rounded-xl shadow-2xl">
          <Image
            src="/banner.jpg"
            alt="Tech conference speaking banner"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b1e]/70 to-transparent" />
        </div>
        {/* Avatar with animated neon ring, overlapping banner bottom */}
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
          <div className="p-[3px] rounded-full bg-gradient-to-br from-cyber-green via-cyber-purple to-cyber-cyan animate-glow-pulse inline-block">
            <div className="rounded-full overflow-hidden bg-[#0d0b1e] p-0.5">
              <Image
                src="https://avatars.githubusercontent.com/u/8188460?v=4"
                alt="Johannes Rabauer"
                width={116}
                height={116}
                className="rounded-full"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Staggered entrance container */}
      <motion.div
        variants={containerVariants}
        initial={reducedMotion ? false : "hidden"}
        animate="show"
        className="flex flex-col items-center w-full max-w-3xl mx-auto"
      >

        {/* Name — gradient text */}
        <motion.h1
          variants={itemVariants}
          className="mb-4 flex flex-wrap items-center justify-center gap-3 text-4xl font-extrabold sm:text-6xl md:text-7xl"
        >
          <span className="gradient-text-hero leading-tight">
            {PERSON_NAME}
          </span>
          <button
            onClick={playPronunciation}
            aria-label="Play name pronunciation"
            title="Hear how to pronounce my name"
            className="text-cyber-green/55 hover:text-cyber-green text-2xl md:text-3xl transition-colors focus:outline-none focus:ring-2 focus:ring-cyber-green rounded-full p-1"
          >
            <FaVolumeUp aria-hidden="true" />
          </button>
        </motion.h1>
        <audio ref={audioRef} src="/name-pronunciation.mp3" preload="none" />

        {/* Job title */}
        <motion.h2
          variants={itemVariants}
          className="text-cyber-cyan text-lg sm:text-2xl font-semibold mb-6"
        >
          Senior Software Engineer at{" "}
          <a
            href="https://xdev.software"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyber-green transition-colors underline decoration-cyber-cyan/30 underline-offset-4"
          >
            XDEV Software GmbH
          </a>
        </motion.h2>

        {/* Intro text */}
        <motion.p
          variants={itemVariants}
          className="mx-auto mb-8 max-w-2xl text-base text-white/65 md:text-lg leading-relaxed"
        >
          {HOMEPAGE_INTRO}
        </motion.p>

        {/* Blog CTA */}
        <motion.div variants={itemVariants} className="mx-auto mb-8 w-full max-w-xl">
          <Link
            href={getBlogListingPath("en")}
            className="group flex items-center justify-between gap-4 rounded-2xl border border-cyber-green/35 bg-cyber-green/[0.07] p-5 text-left shadow-[0_0_24px_rgba(0,255,157,0.07)] transition-all hover:-translate-y-0.5 hover:border-cyber-green/60 hover:bg-cyber-green/[0.11] hover:shadow-[0_0_36px_rgba(0,255,157,0.14)] md:p-6"
          >
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-cyber-cyan/75 mb-1">
                {"// featured"}
              </p>
              <h3 className="text-xl font-extrabold text-cyber-green md:text-2xl">
                Read the blog
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/55">
                Live-Coding Learnings: modern Java, AI, experiments, conference takeaways, and practical engineering notes.
              </p>
            </div>
            <FaLaptopCode
              className="hidden shrink-0 text-5xl text-cyber-green/50 transition-all group-hover:text-cyber-green group-hover:drop-shadow-cyber-green md:block"
              aria-hidden="true"
            />
          </Link>
        </motion.div>

        {/* Social badges */}
        <motion.div variants={itemVariants} className="w-full">
          <SocialBadges />
        </motion.div>

        {/* Skill pills */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-3 mt-2"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-cyber-green/30 bg-cyber-green/[0.08] text-cyber-green text-[11px] tracking-widest uppercase font-mono">
            Java Developer
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-cyber-purple/30 bg-cyber-purple/[0.08] text-cyber-purple text-[11px] tracking-widest uppercase font-mono">
            Public Speaker
          </span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-cyber-cyan/30 bg-cyber-cyan/[0.08] text-cyber-cyan text-[11px] tracking-widest uppercase font-mono">
            Tech Enthusiast
          </span>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      {!reducedMotion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="mt-14 text-white/25"
          aria-hidden="true"
        >
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <FaChevronDown className="text-base mx-auto" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}

export default Hero;
