---
name: new-blog-post
description: Guides the creation of a new bilingual (EN + DE) session-recap blog post for rabauer.dev from a YouTube video, its transcript, and a thorough interview with the user that pins down the post's actual goal before any drafting starts. Use this whenever the user wants to "write a new blog post", "add a post about the stream/session/video", mentions turning a YouTube recording or livestream into a blog article, pastes a video transcript for a write-up, or references new-blog-post.prompt.md / the blog-article-writer agent. Make sure to trigger this even if the user only pastes a YouTube link and says something like "can you turn this into a post" — that is the starting signal this skill is built around.
---

# New Blog Post (rabauer.dev)

Turns a recorded session (YouTube video + transcript) into a matched pair of MDX blog posts, English and German, for this repo. This skill is the interactive front door; the actual writing rules live in [`.github/agents/blog-article-writer.agent.md`](../../../.github/agents/blog-article-writer.agent.md) and the question set lives in [`.github/agents/new-blog-post.prompt.md`](../../../.github/agents/new-blog-post.prompt.md). Re-read both files at the start of every run instead of relying on this summary — they are the source of truth and may have changed since this skill was written.

## Why this workflow, not just "write a post"

Two things make this different from a normal writing task:

1. **The user knows the facts, you don't.** The agent file is explicit: never invent quotes, timestamps, names, or opinions. Your job is to extract facts through targeted questions and the transcript, not to pad with generic filler.
2. **The transcript is large and mostly noise for you.** A full transcript can be tens of thousands of words. Reading it directly into this conversation burns context you need for drafting and editing later. Offload the heavy reading to a subagent (see Step 4) so only a compact summary lands in your context.

## Step 1 — Get the YouTube link first

Ask for the YouTube link before anything else. From it:
- Extract the `youtubeId` (the `v=` query param, or the path segment for `youtu.be/...` links).
- Optionally `WebFetch` the video page to cross-check the published title — useful as a sanity check, but never treat it as a substitute for the user's own answers or the transcript.

## Step 2 — Co-host / guest

Ask who else was involved, if anyone. If a GitHub profile URL is given or inferable, you may fetch it to pre-fill `CoSpeakerCard` social links (`website`, `github`, `linkedin`, `bluesky`, `youtube`) — but only use links you can actually confirm from that profile. Never guess a username or URL; an empty badge is better than a wrong one. Confirm inferred links with the user before finalizing if there's any doubt.

## Step 3 — Timestamps

Ask for the chapter timestamps (`time` + `label` pairs). These go straight into frontmatter and double as your outline for the article's section headings — use them to sanity-check that your draft covers the session in the same order it happened.

## Step 4 — Transcript (keep it out of your main context)

The transcript is the one piece of source material too big to paste into the chat directly.

1. Ask the user to save it to a file rather than pasting it inline, and give you the path. Use whatever scratch/temp location is available in the current environment for this session — don't hardcode or assume a specific path, since this skill needs to work on any machine.
2. Once you have the path, **do not `Read` it yourself.** Spawn a `general-purpose` subagent with the file path and the timestamps from Step 3, and ask it to return (not the full text):
   - a chronological list of concrete facts, claims, and decisions per timestamp/section
   - **a shortlist of the best direct quotes** — punchy, specific, opinionated, or surprising lines, each attributed to a speaker and anchored to a timestamp. Ask the subagent to over-collect (8–12 candidates) so you have real choice later, not just whatever it found first.
   - names, tools, repos, and links mentioned
   - anything that contradicts or adds nuance to what the user says in Steps 5–7
3. Work from the subagent's summary for the rest of this workflow. If a specific passage needs verification later, spawn another targeted subagent lookup rather than reading the whole file yourself.

If the user pastes the transcript directly into chat instead of using a file, proceed with what you have — don't block on re-collection — but prefer the file+subagent path when the transcript is long.

## Step 5 — Content questions: grill the user until the goal is sharp

Ask the six content questions from `new-blog-post.prompt.md` (core conclusion, reader takeaway/action, three highlights, what went wrong or was harder than expected, target reader, what's deliberately not covered). Treat this as the most important step, not a formality — a post with a fuzzy goal is a post nobody finishes reading.

Don't accept the first answer at face value if it's vague or generic:
- If the "core conclusion" sounds like a topic label rather than a claim ("it's about AI agents"), push back and ask what the actual takeaway is — what does the reader believe or do differently afterward?
- If "three highlights" come out generic ("we discussed X, then Y, then Z"), ask what was actually surprising, counterintuitive, or hard-won about each one.
- If the target reader is vague ("developers"), ask for the one sentence that would make a wrong-fit reader bounce off the title.
- If two answers seem to pull in different directions (e.g. the takeaway doesn't match what the highlights emphasize), point that out and ask which one should win.

Use the Socratic method the agent file already asks for: a few pointed follow-ups at a time, not a wall of questions at once. The user may answer inline, answer partially, or say "figure it out from the transcript" — in that case, propose answers drawn from the transcript summary (including any quotes that support them) and confirm them rather than silently assuming. Do not move to drafting until the core conclusion and target reader are both concrete enough that you could defend why a given sentence belongs in the post or not.

## Step 6 — Suggest metaphors, let the user pick

A good central metaphor makes a technical recap easier to follow and more memorable, but it has to come from the actual content, not from a generic "let's dress this up" instinct. Once the core conclusion from Step 5 is settled:

1. Think of 3–5 candidate metaphors or images that genuinely fit this session's topic and conclusion — grounded in what was actually discussed (the tools, the domain, the shape of the problem), not a stock metaphor bolted onto any tech post ("journey," "puzzle pieces," "building blocks" are usually too generic to bother offering). A good candidate should illuminate something specific about the core conclusion, not just decorate the title.
2. Present the options to the user with a one-line reason each — why it fits this particular session — and let them pick one, propose their own, or reject the idea entirely. `AskUserQuestion` works well here since it's a discrete choice among a handful of options.
3. If they pick one, use it deliberately: introduce it once, let it inform a section heading or two if it fits naturally, and don't force it into every paragraph. If they decline, drop it and write straight prose.

Skip this step only if the user says up front they don't want a metaphor.

## Step 7 — Metadata

Ask for: `title` (EN and DE may differ), `date`, `repository` (the source repo, if any). Try to fill in the rest yourself before asking:
- **`tags`**: grep existing frontmatter across `content/posts/en/*.mdx` for tags already in use and reuse matching ones where they genuinely apply, rather than inventing near-duplicate tags.
- **`slug`**: derive from the English title (kebab-case), and confirm it doesn't collide with an existing file in `content/posts/en/` or `content/posts/de/`.
- **`summary`**: draft one from the content questions once you have them; this is the frontmatter field, not something to leave blank.

**Field name correction**: the prompt template's metadata table says `repository`, but the actual frontmatter field (see [`lib/posts.ts`](../../../lib/posts.ts)) is `mainRepository`. Use `mainRepository` when writing frontmatter.

## Step 8 — Match the existing style

Read one or two recent posts in `content/posts/en/` (and their `de/` counterparts) close in topic to this one, to match structure, frontmatter shape, heading style, and length. Don't skip this even if you think you remember the format — conventions here evolve.

## Step 9 — Draft and save

Follow `blog-article-writer.agent.md` for everything about tone, constraints, bilingual rules, and the co-speaker panel. In particular:
- No invented facts, quotes, or links.
- Keep both languages factually identical; only phrasing should differ.
- Same slug in both locales.
- Keep it to roughly a 5-minute read; cut filler.
- Close with a links section and a takeaway/conclusion.

**Use the quotes.** Pull 1–3 of the strongest candidates from the Step 4 shortlist into the post as short blockquotes or inline attributed lines, placed where they land the point rather than bunched together. A quote earns its place if it says something sharper or more specific than you'd write in your own words — skip any that are just restating the surrounding paragraph. Translate quotes for the German version like the rest of the text (keep meaning exact; note in your own words if a quote's punch depends on English phrasing that doesn't survive translation).

Save the pair to `content/posts/en/<slug>.mdx` and `content/posts/de/<slug>.mdx`, matching the `PostFrontmatter` shape exactly: `title`, `date`, `summary`, `tags`, `youtubeId`, `mainRepository` (optional), `draft` (default `false` unless the user wants it staged first), `timestamps`.

## Step 10 — Self-edit against AI writing tells

Before saving, reread the draft specifically hunting for these patterns. They're the most common tells that a text was machine-written rather than by someone who was actually there, compiled from Wikipedia's [Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing) essay. The goal isn't to hit a checklist — it's that a session recap should read like the user telling a colleague what happened, not like a press release about it.

**Vocabulary that's become an AI tell through overuse.** If one of these is the natural word, fine, but check whether a plainer word says the same thing: *delve, boasts, crucial, intricate/intricacies, garner, landscape (as in "the X landscape"), pivotal, underscore, tapestry, testament, vibrant, additionally, align with, enhance, foster/fostering, showcase, highlight (as a verb meaning "shows"), leverage.*

**Avoiding plain "is/has" for no reason.** "The workflow serves as a foundation" instead of "the workflow is a foundation." "The talk features three demos" instead of "the talk has three demos." Use the plain copula when it's plain.

**Inflating stakes with legacy/significance language.** "Marks a pivotal moment," "stands as a testament to," "plays a crucial role in," "underscores the importance of." A session recap earns its importance from what actually happened, not from a sentence announcing that it was important.

**Dangling participle padding.** Sentences that end with an unearned "-ing" clause tacked on for weight: "...further highlighting the growing need for X" or "...underscoring the significance of Y." If the participle clause doesn't add a new fact, cut it.

**Negative parallelism as a crutch.** "Not just X, but also Y." "It's not about X, it's about Y." "X rather than Y." One or two of these read fine; a post full of them reads like a template.

**Rule-of-three padding.** Automatically grouping adjectives or examples into triplets ("fast, flexible, and powerful") because three feels complete, not because there are exactly three. Use however many the fact actually supports.

**Promotional/travel-brochure tone.** "Rich," "vibrant," "nestled," "in the heart of," "diverse array of." This is a technical recap, not tourism copy.

**Vague attribution.** "Industry reports suggest," "observers have noted," "experts argue" — the agent file already bans inventing sources, and this phrasing is exactly how an invented source sneaks in disguised as consensus. Every claim should trace to the transcript or the user, not to an unnamed "they."

**Formulaic essay conclusion.** "Despite its challenges, X shows great promise for the future." The takeaway section should say the specific thing the user told you in Step 5, not wrap up with a generic good-news/bad-news bow.

**Formatting tells:** Title Case Section Headers (use sentence case), mechanical bolding of "key terms" throughout body text, bullet lists built entirely from `**Bold label:** description` where prose would read better, emoji used as visual structure, em dashes standing in for periods or commas in most sentences (the agent file already bans `—`/`-` mid-sentence), horizontal rules inserted before headings, tables used for content that's really just a paragraph.

**Elegant variation.** Swapping in a synonym every time a word repeats, even when the repeated word is clearer. If the session was about "agents," it's fine to say "agents" five times in a row instead of cycling through "assistants," "systems," and "tools" to avoid repetition.

**Overworked metaphor.** If Step 6 produced a chosen metaphor, check it was used once or twice with purpose, not stretched to cover every section — a metaphor forced into every paragraph reads as artificial as the vocabulary tells above.

## Step 11 — Tell the user what's next

Point out that `npm run dev` will let them preview the post locally, and that RSS/llms.txt regenerate automatically on build (`predev`/`prebuild` scripts) — no manual step needed there. Don't run the dev server or commit anything yourself unless asked.
