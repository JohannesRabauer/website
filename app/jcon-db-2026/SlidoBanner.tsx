"use client";

import { useSyncExternalStore } from "react";
import { FaArrowRight, FaQuestionCircle } from "react-icons/fa";

const SLIDO_URL = "https://app.sli.do/event/fh9TsTVfTR39Dq6EF7GFY5";

/** The Slido Q&A link is only shown on the day of the talk, 15 October 2026 (viewer's local time). */
const SHOW_FROM = new Date("2026-10-15T00:00:00");
const SHOW_UNTIL = new Date("2026-10-16T00:00:00");

const subscribe = () => () => undefined;

export default function SlidoBanner() {
  const visible = useSyncExternalStore(
    subscribe,
    () => {
      const now = new Date();
      return now >= SHOW_FROM && now < SHOW_UNTIL;
    },
    // The page is statically exported, so the banner only appears after hydration.
    () => false
  );

  if (!visible) return null;

  return (
    <a
      href={SLIDO_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-[#D71E23] text-white transition hover:bg-[#b5181c]"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 py-3 pl-16 pr-4 sm:pr-8 xl:pl-8">
        <span className="flex items-center gap-3 text-base font-semibold sm:text-lg">
          <FaQuestionCircle className="shrink-0 text-xl" aria-hidden="true" />
          Questions? Ask them on Slido
        </span>
        <FaArrowRight className="shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </div>
    </a>
  );
}
