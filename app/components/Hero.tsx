"use client";

import { FaVolumeUp } from "react-icons/fa";
import { FaLaptopCode } from "react-icons/fa";
import Image from "next/image";
import { useRef } from "react";
import Link from "next/link";
import SocialBadges from "./SocialBadges";
import { getBlogListingPath } from "@/lib/blog-i18n";
import { HOMEPAGE_INTRO, PERSON_NAME } from "@/lib/site-data";

/**
 * Hero section with animated headline and social links
 */
function Hero() {
  const audioRef = useRef<HTMLAudioElement>(null);

  function playPronunciation() {
    audioRef.current?.play();
  }

  return (
    <section className="content-layer flex flex-col items-center text-center px-4 pb-4 pt-8 bg-cyber-bg/80 sm:pt-10">
      <div className="w-full max-w-4xl mx-auto mb-4">
        <div className="relative w-full h-48 mb-20">
          <Image
            src="/banner.jpg"
            alt="Tech conference speaking banner"
            fill
            className="object-cover rounded-lg shadow-xl"
            priority
          />
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <Image
              src="https://avatars.githubusercontent.com/u/8188460?v=4"
              alt="Johannes Rabauer"
              width={128}
              height={128}
              className="rounded-full border-4 border-cyber-bg shadow-xl"
              priority
            />
          </div>
        </div>
        
        <h1 className="text-cyber-green text-3xl sm:text-5xl md:text-7xl font-extrabold drop-shadow-cyber mb-4 animate-fade-in flex flex-wrap items-center justify-center gap-2">
          {PERSON_NAME}
          <button
            onClick={playPronunciation}
            aria-label="Play name pronunciation"
            title="Hear how to pronounce my name"
            className="text-cyber-green/70 hover:text-cyber-green text-xl md:text-2xl transition drop-shadow-cyber focus:outline-none focus:ring-2 focus:ring-cyber-green rounded"
          >
            <FaVolumeUp />
          </button>
        </h1>
        <audio ref={audioRef} src="/name-pronunciation.mp3" preload="none" />
        <h2 className="text-cyber-cyan text-base sm:text-2xl md:text-3xl font-semibold mb-6 animate-fade-in delay-100">
          Senior Software Engineer at <a href="https://xdev.software" target="_blank" rel="noopener noreferrer">XDEV Software GmbH</a>
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-base text-gray-300 md:text-xl animate-fade-in delay-200">
          {HOMEPAGE_INTRO}
        </p>
        <div className="mx-auto mb-8 w-full max-w-2xl animate-fade-in delay-300">
          <Link
            href={getBlogListingPath("en")}
            className="group block rounded-3xl border-2 border-cyber-green bg-cyber-green/10 p-5 text-left shadow-[0_0_30px_rgba(57,255,20,0.12)] transition-all hover:-translate-y-1 hover:bg-cyber-green/15 hover:shadow-[0_0_36px_rgba(57,255,20,0.18)] md:p-6"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-cyber-cyan">
                  Featured
                </p>
                <h3 className="mt-2 text-2xl font-extrabold text-cyber-green md:text-3xl">
                  Read the blog
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-7 text-gray-200 md:text-base">
                  Live-Coding Learnings: modern Java, AI, experiments, conference takeaways, and practical engineering notes.
                </p>
              </div>
              <FaLaptopCode
                className="hidden text-5xl text-cyber-green drop-shadow-cyber transition-transform group-hover:scale-110 md:block"
                aria-hidden="true"
              />
            </div>
          </Link>
        </div>
        <SocialBadges />
        <div className="flex flex-wrap justify-center gap-4 animate-fade-in delay-400 mt-8">
          <span className="inline-block px-4 py-2 rounded-full bg-cyber-green/20 text-cyber-green text-xs tracking-widest uppercase">
            Java Developer
          </span>
          <span className="inline-block px-4 py-2 rounded-full bg-cyber-purple/20 text-cyber-purple text-xs tracking-widest uppercase">
            Public Speaker
          </span>
          <span className="inline-block px-4 py-2 rounded-full bg-cyber-cyan/20 text-cyber-cyan text-xs tracking-widest uppercase">
            Tech Enthusiast
          </span>
        </div>
      </div>
    </section>
  );
}

export default Hero;
