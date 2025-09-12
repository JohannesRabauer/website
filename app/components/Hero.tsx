"use client";

import { FaGithub, FaYoutube, FaLinkedin } from "react-icons/fa";

/**
 * Hero section with animated headline and social links
 */
function Hero() {
  return (
  <section className="content-layer flex flex-col items-center justify-center text-center py-24 px-4 min-h-screen bg-cyber-bg/80">
      <h1 className="text-cyber-pink text-5xl md:text-7xl font-extrabold drop-shadow-cyber mb-4 animate-fade-in">
        [Your Name]
      </h1>
      <h2 className="text-cyber-cyan text-2xl md:text-3xl font-semibold mb-6 animate-fade-in delay-100">
        AI & Cyberpunk Developer
      </h2>
      <p className="max-w-xl text-lg md:text-xl text-gray-300 mb-10 animate-fade-in delay-200">
        Building futuristic, intelligent, and visually stunning web experiences. Passionate about AI, open source, and the cyberpunk aesthetic.
      </p>
      <div className="flex space-x-6 mb-10 animate-fade-in delay-300">
        <a href="https://github.com/yourname" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-cyber-cyan hover:text-cyber-pink text-3xl transition drop-shadow-cyber">
          <FaGithub />
        </a>
        <a href="https://youtube.com/yourchannel" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-cyber-pink hover:text-cyber-cyan text-3xl transition drop-shadow-cyber">
          <FaYoutube />
        </a>
        <a href="https://linkedin.com/in/yourname" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-cyber-purple hover:text-cyber-cyan text-3xl transition drop-shadow-cyber">
          <FaLinkedin />
        </a>
      </div>
      <span className="inline-block px-4 py-2 rounded-full bg-cyber-purple/20 text-cyber-purple text-xs tracking-widest uppercase animate-fade-in delay-400">
        Welcome to my digital world
      </span>
    </section>
  );
}

export default Hero;
