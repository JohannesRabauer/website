"use client";

import { useSyncExternalStore } from "react";
import { FaCommentDots } from "react-icons/fa";

const FEEDBACK_URL =
  "https://forms.cloud.microsoft/pages/responsepage.aspx?id=hUjK0q3WUEKNGDXVfwZijkCw8_XPJBlKtEIqJF_e09xUNEVJTzRCUEhVU0FOQzZJTFVKWUc4Tk5IVi4u&origin=QRCode&route=shorturl";

/** The feedback form is only shown on 15 and 16 October 2026 (viewer's local time). */
const SHOW_FROM = new Date("2026-10-15T00:00:00");
const SHOW_UNTIL = new Date("2026-10-17T00:00:00");

// Re-check every minute so a tab left open across midnight shows or hides the button without a reload.
const subscribe = (onChange: () => void) => {
  const id = window.setInterval(onChange, 60_000);
  return () => window.clearInterval(id);
};

export default function FeedbackButton() {
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
      href={FEEDBACK_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-3 rounded-[12px] border-2 border-[#D71E23] bg-white px-6 py-4 text-lg font-semibold text-[#D71E23] transition hover:bg-[#D71E23]/[0.06]"
    >
      <FaCommentDots aria-hidden="true" /> Give Feedback
    </a>
  );
}
