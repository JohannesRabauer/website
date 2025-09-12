"use client";
import { motion } from "framer-motion";

/**
 * Interactive project card
 * - Hover grows slightly
 * - Shows project title and description
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
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noreferrer"
      whileHover={{ scale: 1.05 }}
      className="p-6 rounded-2xl bg-white/5 backdrop-blur border border-cyber-purple/30 shadow-lg hover:shadow-cyber-purple/50 transition"
    >
      <h3 className="text-xl font-semibold mb-2 text-cyber-cyan">{title}</h3>
      <p className="text-sm text-gray-300">{description}</p>
    </motion.a>
  );
}
