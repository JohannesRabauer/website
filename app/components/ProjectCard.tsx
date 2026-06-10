"use client";
import { motion, useReducedMotion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";

/**
 * Glass publication card with hover lift, border glow, and external-link icon.
 */
export default function ProjectCard({
  title,
  description,
  link,
}: {
  title: string;
  description: string;
  link: string;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={reducedMotion ? {} : { y: -4 }}
      className="cyber-card group flex flex-col gap-4 p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyber-cyan"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/35 border border-white/10 rounded px-2 py-0.5 inline-block mb-3">
            {description}
          </span>
          <h3 className="text-base font-semibold text-white leading-snug">
            {title}
          </h3>
        </div>
        <FaExternalLinkAlt
          className="shrink-0 mt-0.5 text-xs text-white/20 transition-colors duration-200 group-hover:text-cyber-cyan"
          aria-hidden="true"
        />
      </div>
    </motion.a>
  );
}
