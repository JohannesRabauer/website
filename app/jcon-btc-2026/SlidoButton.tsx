"use client";

import { useSyncExternalStore } from "react";
import { FaQuestionCircle } from "react-icons/fa";

const SLIDO_URL = "https://app.sli.do/event/fh9TsTVfTR39Dq6EF7GFY5";

/** The Slido Q&A link is only shown on the day of the talk, 15 October 2026 (viewer's local time). */
const SHOW_FROM = new Date("2026-10-15T00:00:00");
const SHOW_UNTIL = new Date("2026-10-16T00:00:00");

// Re-check every minute so a tab left open across midnight shows or hides the button without a reload.
const subscribe = (onChange: () => void) => {
  const id = window.setInterval(onChange, 60_000);
  return () => window.clearInterval(id);
};

export default function SlidoButton() {
  const visible = useSyncExternalStore(
    subscribe,
    () => {
      const now = new Date();
      return now >= SHOW_FROM && now < SHOW_UNTIL;
    },
    // The page is statically exported, so the button only appears after hydration.
    () => false
  );

  if (!visible) return null;

  return (
    <a
      href={SLIDO_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-3 rounded-[12px] bg-[#141414] px-6 py-4 text-lg font-semibold text-white transition hover:bg-[#333333]"
    >
      <FaQuestionCircle aria-hidden="true" /> Questions? Ask on Slido
    </a>
  );
}
