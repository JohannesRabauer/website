import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import { FaArrowRight, FaExternalLinkAlt, FaFilePdf, FaGithub, FaPlay, FaYoutube } from "react-icons/fa";
import SocialBadges from "../components/SocialBadges";
import { withBasePath } from "@/lib/basePath";
import { SESSIONS } from "./sessions";
import SlidoBanner from "./SlidoBanner";

// Styled after the talk's "Quiet Signal" deck design: white surface,
// near-black ink, XDEV red as the only accent, Geist type, line icons.
const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

const TALK_TITLE = "Enterprise AI Trends That Actually Matter";
const PAGE_PATH = "/jcon-db-2026";

/**
 * Drop the exported deck at public/jcon-db-2026/enterprise-ai-trends.pdf.
 * The Slides button switches from "coming soon" to the download on the next build.
 */
const SLIDES_PDF_FILE = "enterprise-ai-trends.pdf";
const SLIDES_PDF_URL = `${PAGE_PATH}/${SLIDES_PDF_FILE}`;
const hasSlidesPdf = fs.existsSync(path.join(process.cwd(), "public", "jcon-db-2026", SLIDES_PDF_FILE));

const LIVE_DECK_URL = "https://johannesrabauer.github.io/talk-ai-learnings/";

export const metadata: Metadata = {
  title: `${TALK_TITLE}: Slides & Links | Johannes Rabauer`,
  description:
    "Slides, session recordings, blog posts and skills from the talk “Enterprise AI Trends That Actually Matter”: lessons from 100+ hours of AI live coding in Java.",
  alternates: { canonical: `${PAGE_PATH}/` },
  openGraph: {
    type: "website",
    title: `${TALK_TITLE}: Slides & Links`,
    description: "Slides, recordings, blog posts and skills from 100+ hours of AI live coding in Java.",
    url: `${PAGE_PATH}/`,
  },
};

/* ------------------------------------------------------------ line icons -- */
// Same 24x24 line drawings as the deck (slides/icons/*.svg).

const GLYPHS: Record<string, ReactNode> = {
  intent: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" />
    </>
  ),
  workflow: (
    <>
      <rect x="2" y="2" width="5.5" height="5.5" rx="1.3" />
      <rect x="9.25" y="9.25" width="5.5" height="5.5" rx="1.3" />
      <rect x="16.5" y="16.5" width="5.5" height="5.5" rx="1.3" />
      <path d="M7.5 4.75H12v4.5M14.75 12h4.5v4.5" />
    </>
  ),
  attention: (
    <>
      <path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  ramble: (
    <>
      <path d="M4 5h16v11H9.5L4 20z" />
      <path d="M7.5 10.5c1-1.4 2-1.4 3 0s2 1.4 3 0 2-1.4 3 0" />
    </>
  ),
  ask: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.5a2.6 2.6 0 1 1 3.8 2.3c-.8.4-1.3 1-1.3 2v.4" />
      <circle cx="12" cy="17.1" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  specify: (
    <>
      <rect x="5" y="4.5" width="14" height="16.5" rx="2" />
      <path d="M9 3h6v3H9z" />
      <path d="M8.5 11h7M8.5 14.5h7M8.5 18h4" />
    </>
  ),
  generate: <path d="m8 7.5-4.5 4.5L8 16.5M16 7.5l4.5 4.5-4.5 4.5M13.5 4.5l-3 15" />,
  verify: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.3 12.3 2.5 2.5 4.9-5.2" />
    </>
  ),
  skill: (
    <>
      <rect x="3" y="8" width="18" height="12" rx="2" />
      <path d="M9 8V5.5h6V8M3 13h7M14 13h7M10 12h4v2.5h-4z" />
    </>
  ),
};

function Glyph({ name, className = "h-6 w-6" }: { name: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {GLYPHS[name]}
    </svg>
  );
}

/* ------------------------------------------------------------- content -- */

const TRENDS = [
  { icon: "intent", name: "Intent over prompts", takeaway: "A prompt is not a goal." },
  { icon: "workflow", name: "Workflow over models", takeaway: "The workflow outlives the agent." },
  { icon: "attention", name: "Attention over typing", takeaway: "Gates watch, you own the goal." },
];

const PIPELINE: { icon: string; name: string; caption: ReactNode }[] = [
  { icon: "ramble", name: "Ramble", caption: "Say it out loud" },
  {
    icon: "ask",
    name: "Refine",
    caption: (
      <>
        Use{" "}
        <a
          href="https://github.com/mattpocock/skills/tree/main/skills/productivity/grill-me"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[#D71E23] underline decoration-[#D71E23]/30 underline-offset-4 hover:decoration-[#D71E23]"
        >
          /grill-me
        </a>
      </>
    ),
  },
  { icon: "specify", name: "Specify", caption: "Short spec, non-goals" },
  { icon: "generate", name: "Generate", caption: "Small diff" },
  { icon: "verify", name: "Verify", caption: "Gates, then you" },
];

type ToolLink = { label: string; href: string };
type Tool = { name: string; by: string; description: string; links: ToolLink[]; featured?: boolean };

const TOOLS: Tool[] = [
  {
    name: "Grill Me",
    by: "Matt Pocock",
    description:
      "A skill that interviews you one question at a time until the plan is clear. In the talk it is the Refine step: you ramble, the AI asks.",
    featured: true,
    links: [
      { label: "grill-me skill", href: "https://github.com/mattpocock/skills/tree/main/skills/productivity/grill-me" },
      { label: "All of Matt's skills", href: "https://github.com/mattpocock/skills" },
    ],
  },
  {
    name: "BMad Method",
    by: "Brian Madison",
    description:
      "Agent personas, workflows and review gates, all packaged as skills. From the talk: Party Mode, the architecture skill that shrank from 2,523 to 86 lines, and self-review with QuickDev.",
    featured: true,
    links: [
      { label: "BMAD-METHOD on GitHub", href: "https://github.com/bmad-code-org/BMAD-METHOD" },
      { label: "Party Mode skill", href: "https://github.com/bmad-code-org/BMAD-METHOD/tree/main/skills/bmad-party-mode" },
      { label: "Docs", href: "https://docs.bmad-method.org/" },
      { label: "Method overview", href: "/methods/bmad-method/" },
    ],
  },
  {
    name: "AI Unified Process",
    by: "Simon Martinelli",
    description:
      "Spec-driven development as a set of skills: requirements, use cases and entity model first, then stack skills for implementation, Flyway migrations and Playwright tests.",
    links: [
      { label: "unifiedprocess.ai", href: "https://unifiedprocess.ai" },
      { label: "Skill marketplace", href: "https://github.com/AI-Unified-Process/marketplace" },
      { label: "Method overview", href: "/methods/ai-unified-process/" },
    ],
  },
  {
    name: "Semantic Anchors",
    by: "Ralf D. Müller",
    description:
      "Well-known terms like Gherkin or arc42 that load a whole method into the model with one word. Matt Pocock calls them leading words.",
    links: [
      { label: "Semantic Anchors catalog", href: "https://llm-coding.github.io/Semantic-Anchors" },
      { label: "Method overview", href: "/methods/semantic-anchors/" },
    ],
  },
  {
    name: "Guided Coding",
    by: "Kenny Pflug",
    description: "One change, one plan, one record. Includes Kenny's advice on finding the right plan size.",
    links: [
      { label: "Guided Coding docs", href: "https://kenny-codes.net/docs/guided-coding" },
      { label: "Finding the right plan size", href: "https://kenny-codes.net/docs/guided-coding/finding-the-right-plan-size" },
      { label: "Method overview", href: "/methods/guided-coding/" },
    ],
  },
  {
    name: "Docker Sandboxes",
    by: "Docker",
    description:
      "Run coding agents in a microVM with their own Docker and a host proxy for network rules and API keys. Context first, sandbox second.",
    links: [{ label: "Docker Sandboxes docs", href: "https://docs.docker.com/ai/sandboxes/" }],
  },
  {
    name: "biomelab",
    by: "Manuel de la Peña",
    description: "A dashboard for running several coding agents side by side, one worktree each, from created to PR merged.",
    links: [{ label: "biomelab on GitHub", href: "https://github.com/mdelapenya/biomelab" }],
  },
  {
    name: "Quanta",
    by: "Johannes Rabauer",
    description:
      "The running example of Act 2: adding chat to a local file search app, from idea to commit. Every PRD, spec and test from the stream is in the repo.",
    links: [{ label: "Quanta on GitHub", href: "https://github.com/JohannesRabauer/quanta" }],
  },
];

const MORE_LINKS: (ToolLink & { note: string })[] = [
  {
    label: "Commit Cards",
    href: "https://xdev.software/ueber-uns/xdev-commit-cards",
    note: "The card deck from the end of the talk: practical coding principles to discuss in your team.",
  },
  {
    label: "Live coding on YouTube",
    href: "https://www.youtube.com/@johannesrabauer",
    note: "New sessions with guests almost every Thursday evening. Join live and ask your own questions.",
  },
  {
    label: "rabauer.dev blog",
    href: "/en/blog/",
    note: "A write-up for every session, with the key moments and links.",
  },
];

/* ------------------------------------------------------------- helpers -- */

const isExternal = (href: string) => /^https?:\/\//.test(href);

function SmartLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  if (isExternal(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

const LABEL = "font-mono text-[0.72rem] font-medium uppercase tracking-[0.12em] text-[#5E5E5E]";
const CARD =
  "rounded-[14px] border border-[#E8E8E8] bg-white shadow-[0_1px_2px_rgba(20,20,20,0.04),0_10px_28px_-14px_rgba(20,20,20,0.18)]";
const H2 = "text-[2rem] font-bold leading-[1.08] tracking-[-0.03em] md:text-[2.4rem]";

function SectionHead({ label, title, children }: { label: string; title: string; children?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <span className="h-[3px] w-4 rounded bg-[#D71E23]" aria-hidden="true" />
        <span className={LABEL}>{label}</span>
      </div>
      <h2 className={H2} style={{ textWrap: "balance" }}>
        {title}
      </h2>
      {children && <p className="max-w-2xl text-lg leading-relaxed text-[#5E5E5E]">{children}</p>}
    </div>
  );
}

/* ---------------------------------------------------------------- page -- */

export default function JconDb2026Page() {
  return (
    <main
      className={`${geist.variable} ${geistMono.variable} min-h-screen bg-white text-[#141414] antialiased selection:bg-[#D71E23] selection:text-white`}
      style={{ fontFamily: "var(--font-geist), 'Segoe UI', system-ui, sans-serif" }}
    >
      <style>{`.font-mono{font-family:var(--font-geist-mono),ui-monospace,Consolas,monospace}`}</style>

      <SlidoBanner />

      {/* Top rail */}
      <header className="mx-auto flex max-w-6xl items-center justify-between pl-16 pr-4 pt-6 sm:pr-8 xl:pl-8">
        <Link href="/" aria-label="Back to main page" className="transition-opacity hover:opacity-70">
          <span className="font-mono text-sm font-medium">rabauer.dev</span>
        </Link>
        <span className={LABEL}>JCON · 2026</span>
      </header>

      {/* Hero */}
      <section className="relative mx-auto max-w-6xl overflow-hidden px-4 pb-16 pt-14 sm:px-8 md:pt-20">
        <div className="relative z-10 max-w-3xl">
          <div className={LABEL}>100+ hours of AI live coding</div>
          <h1
            className="mt-5 text-[2.75rem] font-extrabold leading-[0.98] tracking-[-0.045em] sm:text-6xl md:text-7xl"
            style={{ textWrap: "balance" }}
          >
            Enterprise AI Trends That Actually Matter
          </h1>
          <p className="mt-6 text-xl font-medium text-[#5E5E5E] md:text-2xl">
            <b className="text-[#141414]">Johannes Rabauer</b> · 2026
          </p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#5E5E5E]">
            Slides, recordings and every link from the talk. Each story happened live on stream, with a co-host who
            knew more than I did.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {hasSlidesPdf ? (
              <a
                href={withBasePath(SLIDES_PDF_URL)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-[12px] bg-[#D71E23] px-6 py-4 text-lg font-semibold text-white transition hover:bg-[#b5181c]"
              >
                <FaFilePdf aria-hidden="true" /> Slides (PDF)
              </a>
            ) : (
              <span
                className="inline-flex cursor-default items-center justify-center gap-3 rounded-[12px] border border-dashed border-[#D71E23]/50 bg-[#D71E23]/[0.04] px-6 py-4 text-lg font-semibold text-[#D71E23]"
                aria-label="Slides PDF coming soon"
              >
                <FaFilePdf aria-hidden="true" /> Slides (PDF) · coming soon
              </span>
            )}
            <a
              href={LIVE_DECK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-[12px] border border-[#DADADA] bg-white px-6 py-4 text-lg font-semibold transition hover:border-[#141414]"
            >
              <FaPlay className="text-sm" aria-hidden="true" /> Interactive deck
            </a>
          </div>
        </div>

        <Image
          src="/jcon-db-2026/duke.png"
          alt="Johannes as Java Duke"
          width={420}
          height={480}
          className="pointer-events-none absolute -bottom-6 right-0 hidden h-[440px] w-auto lg:block"
          priority
        />
      </section>

      {/* Three trends */}
      <section className="border-y border-[#E8E8E8] bg-[#F3F3F2]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8 md:py-20">
          <SectionHead label="The summary slide" title="Three trends, three lessons" />
          <div className="flex flex-col divide-y divide-[#DADADA]">
            {TRENDS.map(({ icon, name, takeaway }, i) => (
              <div key={name} className="grid grid-cols-[auto_1fr] items-center gap-x-5 gap-y-1 py-5 md:grid-cols-[auto_18rem_1fr]">
                <span className="row-span-2 flex h-12 w-12 items-center justify-center rounded-[12px] bg-[#D71E23] text-white md:row-span-1">
                  <Glyph name={icon} className="h-6 w-6" />
                </span>
                <span className="text-xl font-bold tracking-[-0.02em] md:text-2xl">
                  <span className="mr-2 font-mono text-sm font-medium text-[#5E5E5E]">0{i + 1}</span>
                  {name}
                </span>
                <span className="text-lg font-medium text-[#5E5E5E] md:text-xl">{takeaway}</span>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <div className="relative inline-block text-xl font-semibold tracking-wide text-[#5E5E5E] md:text-2xl">
              MAKE NO MISTAKES
              <span className="absolute left-[-4%] top-1/2 h-[4px] w-[108%] -translate-y-1/2 -rotate-2 rounded bg-[#D71E23]" aria-hidden="true" />
            </div>
            <p className="mt-3 text-3xl font-extrabold leading-[1.02] tracking-[-0.04em] md:text-5xl" style={{ textWrap: "balance" }}>
              Own the understanding. Spend attention wisely.
            </p>
          </div>
        </div>
      </section>

      {/* Your next change */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-8 md:py-20">
        <SectionHead label="Try it once yourself" title="Your next change">
          Pick one small, low-risk change. Not a rewrite. Run it through all five steps and commit before and after.
        </SectionHead>
        <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {PIPELINE.map(({ icon, name, caption }, i) => (
            <li key={name} className={`${CARD} flex flex-col gap-3 p-5`}>
              <div className="flex items-center justify-between text-[#D71E23]">
                <Glyph name={icon} className="h-[26px] w-[26px]" />
                <span className="font-mono text-sm font-medium text-[#5E5E5E]">{i + 1}</span>
              </div>
              <div className="text-xl font-bold tracking-[-0.02em]">{name}</div>
              <div className="text-base text-[#5E5E5E]">{caption}</div>
            </li>
          ))}
        </ol>
      </section>

      {/* Skills & methods */}
      <section className="border-t border-[#E8E8E8]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8 md:py-20">
          <SectionHead label="Skills · methods · tools" title="Everything I mentioned">
            The skills and methods behind the stories. Most of them came straight from a co-host.
          </SectionHead>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {TOOLS.map(({ name, by, description, links, featured }) => (
              <article
                key={name}
                className={`${CARD} flex flex-col gap-4 p-6 ${featured ? "border-[#D71E23]/35 bg-[#D71E23]/[0.035]" : ""}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-bold tracking-[-0.02em]">{name}</h3>
                    <div className={`${LABEL} mt-1`}>{by}</div>
                  </div>
                  {featured && (
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#D71E23] text-white">
                      <Glyph name="skill" className="h-5 w-5" />
                    </span>
                  )}
                </div>
                <p className="text-[0.98rem] leading-relaxed text-[#5E5E5E]">{description}</p>
                <ul className="mt-auto flex flex-col gap-2">
                  {links.map(({ label, href }) => (
                    <li key={href}>
                      <SmartLink
                        href={href}
                        className="group inline-flex items-center gap-2 font-semibold text-[#141414] hover:text-[#D71E23]"
                      >
                        <span className="h-[3px] w-3 rounded bg-[#D71E23]" aria-hidden="true" />
                        {label}
                        {isExternal(href) ? (
                          <FaExternalLinkAlt className="text-[0.65rem] text-[#5E5E5E] group-hover:text-[#D71E23]" aria-hidden="true" />
                        ) : (
                          <FaArrowRight className="text-[0.7rem] text-[#5E5E5E] group-hover:text-[#D71E23]" aria-hidden="true" />
                        )}
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Sessions */}
      <section className="border-t border-[#E8E8E8] bg-[#F3F3F2]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8 md:py-20">
          <SectionHead label={`${SESSIONS.length} sessions · ${SESSIONS.length} co-hosts`} title="My co-hosts did the real work">
            Every story in the talk comes from one of these live-coding sessions. Read the blog post, watch the recording,
            or jump straight to the moment from the talk.
          </SectionHead>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SESSIONS.map((s) => (
              <article key={s.id} className={`${CARD} flex flex-col overflow-hidden`}>
                <a href={s.youtube} target="_blank" rel="noopener noreferrer" className="group relative block aspect-video bg-[#141414]">
                  <Image
                    src={s.thumbnail}
                    alt={`Thumbnail: ${s.title}`}
                    fill
                    sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-opacity group-hover:opacity-85"
                  />
                  <span className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#D71E23] text-white opacity-90 transition group-hover:opacity-100">
                    <FaPlay className="ml-0.5 text-sm" aria-hidden="true" />
                  </span>
                </a>

                <div className="flex flex-1 flex-col gap-4 p-5">
                  <div>
                    <div className={LABEL}>{formatDate(s.date)}</div>
                    <h3 className="mt-2 text-lg font-bold leading-snug tracking-[-0.015em]">{s.title}</h3>
                  </div>


                  <div>
                    <div className={LABEL}>In the talk</div>
                    <ul className="mt-2 flex flex-wrap gap-1.5">
                      {s.talkStories.map((story) => (
                        <li key={story} className="rounded-[6px] bg-[#F3F3F2] px-2 py-1 text-sm text-[#141414]">
                          {story}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto flex flex-wrap gap-2 pt-1">
                    <Link
                      href={s.blog}
                      className="inline-flex items-center gap-2 rounded-[10px] bg-[#141414] px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-[#D71E23]"
                    >
                      Blog post <FaArrowRight className="text-xs" aria-hidden="true" />
                    </Link>
                    <a
                      href={s.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-[10px] border border-[#DADADA] px-3.5 py-2 text-sm font-semibold transition hover:border-[#141414]"
                    >
                      <FaYoutube className="text-[#D71E23]" aria-hidden="true" /> Recording
                    </a>
                    {s.repo && (
                      <a
                        href={s.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-[10px] border border-[#DADADA] px-3.5 py-2 text-sm font-semibold transition hover:border-[#141414]"
                      >
                        <FaGithub aria-hidden="true" /> Code
                      </a>
                    )}
                  </div>

                  {s.moments.length > 0 && (
                    <details className="group border-t border-[#E8E8E8] pt-3">
                      <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold hover:text-[#D71E23] [&::-webkit-details-marker]:hidden">
                        Jump to {s.moments.length} key moments
                        <span className="text-[#D71E23] transition-transform group-open:rotate-45" aria-hidden="true">
                          +
                        </span>
                      </summary>
                      <ul className="mt-3 flex flex-col gap-2">
                        {s.moments.map((m) => (
                          <li key={m.url}>
                            <a
                              href={m.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="grid grid-cols-[4.25rem_1fr] gap-2 text-sm leading-snug hover:text-[#D71E23]"
                            >
                              <span className="font-mono text-[#D71E23]">{m.time}</span>
                              <span>{m.label}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </details>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* More */}
      <section className="border-t border-[#E8E8E8]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8 md:py-20">
          <SectionHead label="After the talk" title="Keep going" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MORE_LINKS.map(({ label, href, note }) => (
              <SmartLink key={href} href={href} className={`${CARD} group flex flex-col gap-2 p-5 transition hover:border-[#D71E23]/40`}>
                <span className="flex items-center justify-between text-lg font-bold tracking-[-0.015em] group-hover:text-[#D71E23]">
                  {label}
                  {isExternal(href) ? (
                    <FaExternalLinkAlt className="text-xs text-[#5E5E5E]" aria-hidden="true" />
                  ) : (
                    <FaArrowRight className="text-sm text-[#5E5E5E]" aria-hidden="true" />
                  )}
                </span>
                <span className="text-[0.95rem] leading-relaxed text-[#5E5E5E]">{note}</span>
              </SmartLink>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-[#E8E8E8] bg-[#F3F3F2]">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-12 sm:px-8">
          <p className="text-center text-lg font-semibold">Questions after the talk? Get in touch.</p>
          <SocialBadges variant="quiet" />
        </div>
      </footer>
    </main>
  );
}
