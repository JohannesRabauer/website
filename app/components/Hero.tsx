"use client";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

/**
 * Hero section with animated headline and social links
 */
export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen relative z-10 text-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-bold bg-gradient-to-r from-cyber-purple via-cyber-pink to-cyber-cyan bg-clip-text text-transparent mt-8 mb-4"
        style={{ fontSize: '3rem', marginTop: '2rem', marginBottom: '1rem' }}
      >
        Hi, I’m [Your Name]
      </motion.h1>
      <p className="mt-4 text-lg max-w-xl">
        Senior Java Developer | Exploring AI & Tech Leadership
      </p>
      <div className="flex gap-6 mt-6">
        <a href="https://github.com/yourname" target="_blank" rel="noreferrer">
          <Github className="w-6 h-6 hover:text-cyber-purple transition" />
        </a>
        <a
          href="https://linkedin.com/in/yourname"
          target="_blank"
          rel="noreferrer"
        >
          <Linkedin className="w-6 h-6 hover:text-cyber-cyan transition" />
        </a>
        <a href="mailto:youremail@example.com">
          <Mail className="w-6 h-6 hover:text-cyber-pink transition" />
        </a>
      </div>
    </section>
  );
}
