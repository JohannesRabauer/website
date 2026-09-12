---
name: new-blog-post
description: Guides the creation of a new bilingual (EN + DE) session-recap blog post for rabauer.dev from a YouTube video, its transcript, and a thorough interview with the user that pins down the post's actual goal before any drafting starts. Use this whenever the user wants to "write a new blog post", "add a post about the stream/session/video", mentions turning a YouTube recording or livestream into a blog article, or pastes a video transcript for a write-up. Make sure to trigger this even if the user only pastes a YouTube link and says something like "can you turn this into a post" — that is the starting signal this skill is built around.
---

# New Blog Post (rabauer.dev)

Turns a recorded session (YouTube video + transcript) into a matched pair of MDX blog posts, English and German, for this repo. This skill is self-contained: the question flow and the writing rules (constraints, style, bilingual conventions) live together below, so there is no separate agent file to keep in sync.

## Why this workflow, not just "write a post"

Two things make this different from a normal writing task:

1. **The user knows the facts, you don't.** Never invent quotes, timestamps, names, or opinions, and never fill gaps with plausible-sounding assumptions. Your job is to extract facts through targeted questions and the transcript, not to pad with generic filler.
2. **The transcript is large and mostly noise for you.** A full transcript can be tens of thousands of words. Reading it directly into this conversation burns context you need for drafting and editing later. Offload the heavy reading to a subagent (see Step 4) so only a compact summary lands in your context.

## Ground rules

**Constraints**
- Do not invent facts, quotes, links, timestamps, speaker details, or opinions not supported by the source material, and do not fill gaps with plausible-sounding assumptions.
- Do not pad the article with generic background, hype, or praise.
- Do not default to long-form writing; keep the result within roughly a 5-minute read.
- Do not use "—" or a hyphen as a sentence-break (a dash standing in for a comma or period) — use plain punctuation instead. Hyphenating compound words is fine.
- Do not use big words when plain language is stronger.
- Do not continue drafting if key facts are missing; ask targeted questions first.
- Only create content that gives the reader clear value.
- Do not let the German and English versions drift on facts, timestamps, names, or claims. Translation may adapt phrasing, but factual content must stay aligned.
- Do not invent localized examples, jokes, or idioms just to make the German version feel different.
- Do not change the slug between the German and English versions unless the user explicitly asks for a slug change.

**Style**
- Write in Plain English per Strunk & White; for the German version, gutes Deutsch nach Wolf Schneider.
- Be direct, practical, and slightly personal when it helps, but keep the focus on observable takeaways.
- Stay mostly positive when warranted, without sounding promotional.
- Prefer cold, hard facts over vague impressions.
- Explain why something mattered to the reader, but keep that grounded in what actually happened.

**Bilingual conventions**
- Brand names, product names, repo names, package names, and code identifiers usually stay unchanged across languages.
- Technical tags may stay in English when that is the established term.
- If a direct translation feels awkward, choose clearer plain German rather than a stiff literal rendering, but do not add new meaning.

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
   - **a shortlist of the best direct quotes** — punchy, specific, opinionated, or surprising lines, each attributed to a speaker and anchored to a timestamp. Ask the subagent to over-collect (8–12 candidates) so you have real choice later, not just whatever it found first. Only guest/co-speaker lines end up in the published `Quote` blocks (see Step 11), so weight the ask toward the guest, but it's fine if the subagent also flags strong host lines. Just keep the speaker attribution clear so you can tell them apart when picking.
   - names, tools, repos, and links mentioned
   - anything that contradicts or adds nuance to what the user says in Steps 5–7
3. Work from the subagent's summary for the rest of this workflow. If a specific passage needs verification later, spawn another targeted subagent lookup rather than reading the whole file yourself.

If the user pastes the transcript directly into chat instead of using a file, proceed with what you have — don't block on re-collection — but prefer the file+subagent path when the transcript is long.

## Step 5 — Content questions: grill the user until the goal is sharp

Ask these six content questions. Treat this as the most important step, not a formality — a post with a fuzzy goal is a post nobody finishes reading.

1. **What is the core conclusion?** The single most important thing a reader should understand after reading.
2. **What should the reader take away and do differently?** Any concrete action or mindset shift.
3. **Name three highlights.** The moments, findings, or arguments that were most interesting or surprising.
4. **What was harder than expected, or what went wrong?** Honest observations make better posts.
5. **Who is this for?** The ideal reader in one sentence (role, experience level, context).
6. **What is NOT covered?** Anything deliberately left out that readers might expect.

Don't accept the first answer at face value if it's vague or generic:
- If the "core conclusion" sounds like a topic label rather than a claim ("it's about AI agents"), push back and ask what the actual takeaway is — what does the reader believe or do differently afterward?
- If "three highlights" come out generic ("we discussed X, then Y, then Z"), ask what was actually surprising, counterintuitive, or hard-won about each one.
- If the target reader is vague ("developers"), ask for the one sentence that would make a wrong-fit reader bounce off the title.
- If two answers seem to pull in different directions (e.g. the takeaway doesn't match what the highlights emphasize), point that out and ask which one should win.

Use the Socratic method: a few pointed follow-ups at a time, not a wall of questions at once. The user may answer inline, answer partially, or say "figure it out from the transcript" — in that case, propose answers drawn from the transcript summary (including any quotes that support them) and confirm them rather than silently assuming. Do not move to drafting until the core conclusion and target reader are both concrete enough that you could defend why a given sentence belongs in the post or not.

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

## Step 9 — Find and place relevant links

Named things deserve a real, verified link, not plain text and never a guessed URL.

1. Ask the user directly: is there anything specific they want linked (a tool, a skill, a person's site, a competing product, a related resource)? Don't skip this — they may have a link in mind that no amount of research would surface.
2. Independently scan the transcript summary and your draft for named tools, skills, products, and competitors that a curious reader would want to click through to — the "grill me" skill from skills.sh is the case that prompted this step: a specific, nameable thing mentioned in passing, not just a generic technology.
3. For each candidate, verify the URL with `WebSearch`/`WebFetch` before using it. Never construct a URL from a guessed pattern (e.g. assuming a GitHub path exists because a similar one does) — confirm the page is real and actually says what you think it says.
4. Prefer authoritative sources: the vendor's own docs or product page, the project's own repo, the creator's own site or post, over a third-party summary or listicle.
5. If the only verifiable source for a specific claim is informal (a creator's own social post, an announcement), that is fine to cite as long as it is real and directly on point — just don't dress it up as something more official than it is.
6. Place the link at first mention inline, and add the most load-bearing ones to the closing Links section. Skip linking commodity technology named only in passing (e.g. a database or CSS framework picked semi-randomly by a stack wizard) unless it is genuinely central to the story — the goal is links a reader would actually want, not a link on every proper noun.
7. **Never repeat the guest's links or the main/demo repository link in the Useful Links section.** Both already have a fixed, dedicated spot elsewhere in the post: the guest's social links live in `CoSpeakerCard`, and the repository link lives in the `mainRepository` frontmatter field (rendered as its own "Working Repository" card). Restating either in the closing list is a duplicate, not a convenience.

## Step 10 — Add diagrams where they earn their place

Look for at least one place where a diagram would make the mental model click faster than prose: an architecture, a data flow, a before/after contrast, a state machine. Don't force one into every section — skip this step entirely if nothing in the session is genuinely visual, and don't add a second or third diagram just to decorate the post.

**Do not use the `MermaidDiagram` component for new diagrams.** It renders flat and neutral-toned, and doesn't match this site's actual visual identity. The house style is a bespoke, colorful inline-SVG React component, illustrated by [`app/components/LangGraph4jControlTowerDiagram.tsx`](../../../app/components/LangGraph4jControlTowerDiagram.tsx) (the current reference implementation, node/edge/palette conventions plus the zoomable wrapper below) and [`app/components/EntireCheckpointDiagram.tsx`](../../../app/components/EntireCheckpointDiagram.tsx) / [`app/components/PartyModeDiagram.tsx`](../../../app/components/PartyModeDiagram.tsx) (older diagrams, good for palette and node-drawing reference, but predate the zoomable wrapper, don't copy their root `<figure>` markup) — read `LangGraph4jControlTowerDiagram.tsx` in full before building a new one, it's the ground truth for the pattern below, not just a description of it.

**Every diagram must be clickable and zoomable, no exceptions.** A reader on a phone, or anyone whose eyes aren't reading 9px SVG text on a laptop screen, needs a way to open it larger. This is provided by a shared wrapper, not something to reimplement per diagram.

1. **Create a new component file** at `app/components/<PostTopic>Diagram.tsx` (PascalCase, named for what it depicts, not generically). One component per post; don't try to reuse another post's diagram component for a different post's content.
2. **Make it bilingual internally, not two diagrams.** Define a `COPY` record keyed by `'en' | 'de'` holding every visible string in the SVG (titles, subtitles, captions, arrow labels) plus an `ariaLabel` per locale: a full prose sentence describing what the diagram shows, since the SVG itself carries no visible text for screen readers, only the wrapper's accessible name (see step 3). The component takes a `{ locale?: 'en' | 'de' }` prop (default `'en'`) and looks up `const t = COPY[locale]`.
3. **Root markup: wrap the SVG in [`ZoomableDiagram`](../../../app/components/ZoomableDiagram.tsx), don't hand-roll a `<figure>`.** That component supplies the card chrome (border, gradient background, padding), the click-to-enlarge affordance, and the fullscreen zoomable lightbox, so a diagram component's own `return` is just:
   ```
   return (
     <ZoomableDiagram ariaLabel={t.ariaLabel}>
       <svg viewBox="0 0 W H" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
         {/* nodes and edges */}
       </svg>
     </ZoomableDiagram>
   );
   ```
   Size the viewBox to fit the content, don't default to a fixed size copied from another diagram. `ZoomableDiagram` needs no import registration of its own in MDX, it's a plain component import inside your diagram file, not an MDX tag.
4. **Reuse the site's established palette** rather than inventing new colors, so every diagram on the site feels like the same family: dark purple `#3D2B6B` / mid purple `#7C5CBF` (light fill `#EDE8F5`) as the primary accent, green `#2A5C45` (light fill `#E6F0EC`) as a secondary accent, rust `#B5351A` as a third accent when a diagram needs more than two categories, muted gray `#9CA3AF` for de-emphasized connectors and `#6B7280` for caption text, `#E5E1F0` for hairline borders, `#1A1A2E` for primary text, `#FFFFFF`/`#F8F7F4` for card fills. Assign color **by role** (one color per participant, branch, phase, or state) so the diagram reads at a glance, not decoratively.
5. **Nodes and edges**: rounded `<rect rx="12">` (or `rx="16"` for an outer container) with a bold `<text>` title around 13px and an optional muted `<text>` subtitle around 9–10px, connected by `<line>`/`<path>` edges. Define one `<marker>` arrowhead per color used, id-prefixed to the component (e.g. `lgtd-arrow-purple` in `LangGraph4jControlTowerDiagram`) so ids never collide between diagrams on the same page. `ZoomableDiagram` renders your `<svg>` markup twice (once inline, once in the lightbox); reusing the same id prefix in both copies is harmless since both copies share identical `<defs>`, don't try to make ids unique across the two.
6. **Keep it as minimal as a Mermaid version would have been**: a handful of nodes telling one clear story and one direction, not a dense schematic. If the diagram needs more than roughly 6–8 nodes to make its point, the point is probably too complex for a diagram and belongs in prose instead.
7. **Register the component** in [`app/components/BlogPostContent.tsx`](../../../app/components/BlogPostContent.tsx): import it, then add it to the `components` map passed to `MDXRemote`, following the existing `LangGraph4jControlTowerDiagram` entry exactly so `locale` is injected automatically:
   ```
   YourDiagram: (props: React.ComponentProps<typeof YourDiagram>) => (
     <YourDiagram {...props} locale={locale} />
   ),
   ```
   Skipping this step means the MDX tag renders as literal text instead of the component.
8. **Use it in both MDX files** as `<YourDiagram />` with no props — the wrapper registered in step 7 injects the right locale automatically, and the component's own `COPY` record supplies the matching language. Never pass English text into the German post's diagram or vice versa.

## Step 11 — Draft and save

Apply the ground rules above (constraints, style, bilingual conventions) throughout. In particular:
- No invented facts, quotes, or links.
- Keep both languages factually identical; only phrasing should differ.
- Same slug in both locales.
- Keep it to roughly a 5-minute read; cut filler.
- End with a takeaway/conclusion (e.g. "Final Thought"), then put the Useful Links section **after** it, as the last thing in the post, not before. Per Step 9, that list excludes the guest's links and the main/demo repository link — both already live at their own fixed spot.
- If a co-author is present, include a co-speaker panel with social badges: keep directly provided links as highest priority, only fill missing badges from GitHub-derived metadata, never invent a username or URL (an empty badge beats a wrong one), and ask before finalizing an inferred link you're unsure about.

**Write around a point, not a timeline.** Avoid "then we did X, then Y, and after that Z" blow-by-blow retelling of the session. Every paragraph exists to deliver one clear takeaway, stated as directly and as briefly as possible — if a beat doesn't have one, cut it or fold it into a paragraph that does. Chronology can shape the overall order of sections, but individual paragraphs should read like the point of the moment, not a transcript of it.

**Write short, precise sentences, and let a few of them be very short.** Default to sentences under roughly 20 words. When a sentence carries two ideas, split it at the natural clause break instead of chaining clauses with commas or "which." Precision means cutting hedges and throat-clearing ("kind of," "basically," "in a sense," "it's worth noting that") rather than softening a claim to sound careful. After a longer, information-dense sentence, land a short one, three to six words is fine, to give the point room to breathe. That contrast is what keeps a technical recap entertaining without turning it into stand-up: the wit lives in precision and timing, not in jokes bolted on top.

**Use bold and italics generously as visual anchors, and keep paragraphs short** (2-4 sentences; one is fine). Aim for at least one bolded or italicized phrase in nearly every paragraph, sometimes two if the paragraph earns it, marking the exact claim, number, or turn that paragraph exists to deliver. This project's house style wants deliberate emphasis on the specific claim or takeaway a paragraph delivers, not mechanical bolding of random nouns — see the note in Step 12 on how this differs from the general anti-AI-tell guidance on bolding. A paragraph with no emphasis at all should be the exception, not the norm.

**Use the quotes, via the `Quote` component, guests only, never the host.** Pull 1–3 of the strongest candidates from the Step 4 shortlist into the post using `<Quote author="..." role="...">...</Quote>` ([`app/components/Quote.tsx`](../../../app/components/Quote.tsx), globally available in MDX with no import needed) — not a markdown blockquote (`>`). Place each where it lands the point rather than bunching them together. A quote earns its place if it says something sharper or more specific than you'd write in your own words — skip any that are just restating the surrounding paragraph. **Only ever quote a guest or co-speaker, never Johannes (the host).** If a line from Johannes is worth using, fold it into prose (first person, no `Quote` block, no attribution) instead of setting it off as a quote — the `Quote` component is reserved for the person the post is featuring, not the person writing it. **Never wrap the quoted text in literal quotation marks.** The component already renders it as a visually distinct quote (a quote-mark icon plus styled block), so adding `"..."` around the text produces a double-quote look. Write the quoted line plain, exactly as said, with no surrounding quote characters. Translate quotes for the German version like the rest of the text (keep meaning exact; note in your own words if a quote's punch depends on English phrasing that doesn't survive translation).

Save the pair to `content/posts/en/<slug>.mdx` and `content/posts/de/<slug>.mdx`, matching the `PostFrontmatter` shape exactly: `title`, `date`, `summary`, `tags`, `youtubeId`, `mainRepository` (optional), `draft` (default `false` unless the user wants it staged first), `timestamps`.

## Step 12 — Self-edit against AI writing tells

Before saving, reread the draft specifically hunting for these patterns. They're the most common tells that a text was machine-written rather than by someone who was actually there, compiled from Wikipedia's [Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing) essay. The goal isn't to hit a checklist — it's that a session recap should read like the user telling a colleague what happened, not like a press release about it.

**Vocabulary that's become an AI tell through overuse.** If one of these is the natural word, fine, but check whether a plainer word says the same thing: *delve, boasts, crucial, intricate/intricacies, garner, landscape (as in "the X landscape"), pivotal, underscore, tapestry, testament, vibrant, additionally, align with, enhance, foster/fostering, showcase, highlight (as a verb meaning "shows"), leverage.*

**Avoiding plain "is/has" for no reason.** "The workflow serves as a foundation" instead of "the workflow is a foundation." "The talk features three demos" instead of "the talk has three demos." Use the plain copula when it's plain.

**Inflating stakes with legacy/significance language.** "Marks a pivotal moment," "stands as a testament to," "plays a crucial role in," "underscores the importance of." A session recap earns its importance from what actually happened, not from a sentence announcing that it was important.

**Dangling participle padding.** Sentences that end with an unearned "-ing" clause tacked on for weight: "...further highlighting the growing need for X" or "...underscoring the significance of Y." If the participle clause doesn't add a new fact, cut it.

**Negative parallelism as a crutch.** "Not just X, but also Y." "It's not about X, it's about Y." "X rather than Y." One or two of these read fine; a post full of them reads like a template.

**Rule-of-three padding.** Automatically grouping adjectives or examples into triplets ("fast, flexible, and powerful") because three feels complete, not because there are exactly three. Use however many the fact actually supports.

**Promotional/travel-brochure tone.** "Rich," "vibrant," "nestled," "in the heart of," "diverse array of." This is a technical recap, not tourism copy.

**Vague attribution.** "Industry reports suggest," "observers have noted," "experts argue" — the constraints above already ban inventing sources, and this phrasing is exactly how an invented source sneaks in disguised as consensus. Every claim should trace to the transcript or the user, not to an unnamed "they."

**Formulaic essay conclusion.** "Despite its challenges, X shows great promise for the future." The takeaway section should say the specific thing the user told you in Step 5, not wrap up with a generic good-news/bad-news bow.

**Formatting tells:** Title Case Section Headers (use sentence case), bullet lists built entirely from `**Bold label:** description` where prose would read better, emoji used as visual structure, em dashes standing in for periods or commas in most sentences (the ground rules above already ban `—`/`-` mid-sentence), horizontal rules inserted before headings, tables used for content that's really just a paragraph.

**Exception — bold/italic on this project.** The generic tell to watch for is *mechanical* bolding: bolding nouns or phrases at random, with no particular claim behind them, just to look scannable. This project's house style (Step 11) deliberately wants the opposite kind of emphasis, and wants it often: one or two bolded or italicized takeaways in nearly every short paragraph, placed on the actual claim, number, or turn being made. That's wanted here, not a tell — the difference is whether the emphasis marks a real point or just decorates a term.

**Elegant variation.** Swapping in a synonym every time a word repeats, even when the repeated word is clearer. If the session was about "agents," it's fine to say "agents" five times in a row instead of cycling through "assistants," "systems," and "tools" to avoid repetition.

**Overworked metaphor.** If Step 6 produced a chosen metaphor, check it was used once or twice with purpose, not stretched to cover every section — a metaphor forced into every paragraph reads as artificial as the vocabulary tells above.

## Step 13 — Tell the user what's next

Point out that `npm run dev` will let them preview the post locally, and that RSS/llms.txt regenerate automatically on build (`predev`/`prebuild` scripts) — no manual step needed there. Don't run the dev server or commit anything yourself unless asked.

## Step 14 — Always offer to publish to the `preview` branch

This repo has a live-preview mechanism, documented in the repo's own `README.md` under "Preview deployments": pushing (or merging) content onto the `preview` branch triggers `.github/workflows/publish-preview.yml`, which deploys that branch under `https://rabauer.dev/preview/` alongside the normal production site built from `main`. This is the intended way to let the user check a freshly drafted post on a phone or share a draft link before it's merged to `main`.

Once the post (and any commit the user asked for) is in place, always ask whether they want it pushed to `preview` too — don't wait for them to bring it up, and don't skip this even if they didn't mention "preview" in their request. This is a repo-specific step this skill's own workflow would otherwise miss.

If they say yes:
1. Fetch `origin preview` and check `git merge-base --is-ancestor origin/preview <your branch>` — if `preview` is an ancestor of the content branch, a fast-forward (`git checkout -B preview origin/preview && git merge --ff-only <your branch>`) is enough. If it isn't (preview has diverged, e.g. another draft is already staged there), stop and ask the user how to reconcile rather than force-pushing or discarding what's already on `preview`.
2. This pushes directly to a shared branch that immediately triggers a public deployment — confirm with the user before running `git push origin preview`, the same as any other push to a shared branch per the general git safety rules.
3. After pushing, tell the user the preview workflow was triggered and where to look once it finishes (`https://rabauer.dev/preview/<locale>/blog/<slug>`), and remind them of the README's caveat: a subsequent `main` deploy will overwrite `/preview` until the preview workflow is re-run.
4. Return to the branch you were working on afterward; don't leave the session sitting on a local `preview` checkout.
