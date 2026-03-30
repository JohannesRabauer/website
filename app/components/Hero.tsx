"use client";

import { FaVolumeUp } from "react-icons/fa";
import { FaLaptopCode } from "react-icons/fa";
import Image from "next/image";
import { useRef } from "react";
import Link from "next/link";
import SocialBadges from "./SocialBadges";

/**
 * Hero section with animated headline and social links
 */
function Hero() {
  const audioRef = useRef<HTMLAudioElement>(null);

  function playPronunciation() {
    audioRef.current?.play();
  }

  return (
    <section className="content-layer flex flex-col items-center justify-center text-center py-6 px-4 min-h-screen bg-cyber-bg/80">
      <div className="w-full max-w-4xl mx-auto mb-12">
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
          Johannes Rabauer
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
          Senior Software Engineer at <a href="https://xdev.software">XDEV Software GmbH</a>
        </h2>
        <p className="max-w-xl mx-auto text-lg md:text-xl text-gray-300 mb-10 animate-fade-in delay-200">
          Java Craftsman • Public Speaker • Father of three • Nature & Tech Enthusiast. Building secure and scalable systems with passion for elegant, expressive code.
        </p>
        <SocialBadges />
        <div className="flex flex-wrap justify-center gap-4 animate-fade-in delay-400">
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
        <div className="mt-8 animate-fade-in delay-500">
          <Link
            href="/blog"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-cyber-green text-cyber-green text-base md:text-lg font-semibold tracking-wide hover:bg-cyber-green/10 hover:scale-[1.02] transition-all shadow-lg shadow-cyber-green/10"
          >
            <FaLaptopCode className="text-lg md:text-xl" aria-hidden="true" />
            Live-Coding Learnings: Modern Java with AI
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
