"use client";

import { FaGithub, FaYoutube, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import { SiMastodon, SiBluesky, SiTiktok } from "react-icons/si";
import Image from "next/image";

/**
 * Hero section with animated headline and social links
 */
function Hero() {
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
        
        <h1 className="text-cyber-green text-5xl md:text-7xl font-extrabold drop-shadow-cyber mb-4 animate-fade-in">
          Johannes Rabauer
        </h1>
        <h2 className="text-cyber-cyan text-2xl md:text-3xl font-semibold mb-6 animate-fade-in delay-100">
          Senior Software Engineer at <a href="https://xdev.software">XDEV Software GmbH</a>
        </h2>
        <p className="max-w-xl mx-auto text-lg md:text-xl text-gray-300 mb-10 animate-fade-in delay-200">
          Java Craftsman • Public Speaker • Father of three • Nature & Tech Enthusiast. Building secure and scalable systems with passion for elegant, expressive code.
        </p>
        <div className="flex flex-wrap justify-center gap-6 mb-10 animate-fade-in delay-300">
          <a href="https://github.com/JohannesRabauer" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-cyber-green hover:text-cyber-purple text-3xl transition drop-shadow-cyber">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/johannes-rabauer" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-cyber-cyan hover:text-cyber-green text-3xl transition drop-shadow-cyber">
            <FaLinkedin />
          </a>
          <a href="https://www.youtube.com/@johannesrabauer" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-cyber-purple hover:text-cyber-cyan text-3xl transition drop-shadow-cyber">
            <FaYoutube />
          </a>
          <a href="https://twitter.com/JohannesRabauer" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-cyber-green hover:text-cyber-purple text-3xl transition drop-shadow-cyber">
            <FaTwitter />
          </a>
          <a href="https://mastodon.online/@rabauer" target="_blank" rel="noopener noreferrer" aria-label="Mastodon" className="text-cyber-cyan hover:text-cyber-green text-3xl transition drop-shadow-cyber">
            <SiMastodon />
          </a>
          <a href="https://bsky.app/profile/rabauer.bsky.social" target="_blank" rel="noopener noreferrer" aria-label="Bluesky" className="text-cyber-purple hover:text-cyber-cyan text-3xl transition drop-shadow-cyber">
            <SiBluesky />
          </a>
          <a href="https://www.tiktok.com/@johannes.rabauer" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-cyber-green hover:text-cyber-purple text-3xl transition drop-shadow-cyber">
            <SiTiktok />
          </a>
          <a href="mailto:johannes@rabauer.dev" target="_blank" rel="noopener noreferrer" aria-label="E-Mail" className="text-cyber-cyan hover:text-cyber-green text-3xl transition drop-shadow-cyber">
            <FaEnvelope />
          </a>
        </div>
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
      </div>
    </section>
  );
}

export default Hero;
