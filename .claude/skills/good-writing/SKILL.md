---
name: good-writing
description: >-
  Use this skill whenever writing or editing prose meant to sound human — blog posts, articles, emails, video descriptions, social posts, documentation, or any text the user will publish under their own name. Strips out the stock patterns that make text read as AI-generated, per Wikipedia's "Signs of AI writing" field guide - puffed-up significance, rule-of-three padding, negative parallelism ("it's not just X, it's Y"), false ranges, elegant variation, formulaic transitions, vague attributions, boilerplate structure, and overuse of bold/bullets/em dashes. Also applies language-specific style rules on top of the checklist: Gutes Deutsch nach Wolf Schneider for German text, Plain English per Strunk & White for English text. Trigger this any time the user asks to write, draft, rewrite, "humanize," or edit copy for external use, even if they don't explicitly mention AI detection or say "make this sound human."
---

# Avoid AI Writing Tells

A checklist-driven pass for making written output read like it came from a person who knows the subject and has opinions about it, not like it was assembled from a template. Based on Wikipedia's WikiProject AI Cleanup field guide ("[Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing)"), which catalogs the patterns editors use to flag undisclosed AI-generated content, cross-checked against the project's own resource list.

## This is the top priority, not a nice-to-have

**No text this skill produces should be identifiable as AI-written.** That is the actual job here, not a side effect of "good style." Every rule below exists in service of that one goal, and when a specific instruction elsewhere (a house style, a format request) seems to conflict with it, the fix is almost always to satisfy both by writing something *specific* — not to drop this goal in favor of the other one. Treat every item on the checklist below as something to strictly avoid, not a suggestion to weigh against convenience.

## Important framing

None of these patterns are individually damning in isolation — humans use em dashes, triplets, and "furthermore" too. What gives AI writing away is the *density and consistency* of these patterns stacked together, plus the way they replace specific knowledge with generic-but-plausible-sounding statements. The goal is not "never type this word," it's: default to specificity and let structure vary, so nothing feels templated — and treat every pattern below as something to actively hunt down and remove, not just something to be aware of.

This means the fix is rarely "delete the em dash." It's "go find the actual fact, opinion, or detail that a template-filler would have skipped."

## The checklist

Run a completed draft against this list before delivering it. Fix what you find, don't just flag it. Nothing here is optional to check.

### Wording and phrasing

**1. Overused AI vocabulary.** Certain words are so statistically overrepresented in LLM output that their presence alone is a signal, even though none of them are "wrong" words. Strictly avoid, and replace with the plainer or more specific word that actually fits:
*align/aligning, additionally, boasts, bolstered, crucial, delve, emphasizing, enduring, enhance, ensuring, fostering, garner(ed), highlight/highlighting (as a verb meaning "shows"), interplay, intricate/intricacies, key, landscape (as in "the X landscape"), leverage, meticulous/meticulously, multifaceted, nuanced, pivotal, seamless, showcase/showcasing, tapestry, testament, underpin, underscore, valuable, vibrant, vital.*
This list drifts as models change (GPT-4-era favorites like "delve" and "tapestry" have partly given way to "align with," "enhance," and "showcasing" from later models, and different providers have their own tics — Grok, for instance, overuses faux-scientific words like "causal," "empirical," "correlate"). Don't treat this as exhaustive or frozen: if a word feels like a "safe," generic choice a template would reach for rather than the specific word this piece actually needs, cut it regardless of whether it's on this list.

**2. Puffed-up significance.** Any sentence whose job is to *tell* the reader something matters, rather than showing why. Tells: "stands as a testament to," "plays a vital/pivotal role," "leaves a lasting legacy," "underscores the importance of," "serves as a reminder that," "a watershed moment," "in the ever-evolving landscape of," "continues to captivate."
**Fix:** cut the sentence, or replace it with the concrete fact that would let the reader judge significance themselves.

**3. Promotional / travel-brochure tone.** "Rich," "vibrant," "nestled," "in the heart of," "diverse array of," "boasts a," writing that reads like tourism or marketing copy applied to a subject that doesn't call for it.
**Fix:** describe what's actually there. Neutral, specific description beats enthusiasm with nothing behind it.

**4. Superficial "-ing" analysis tacked onto inanimate subjects.** Sentences that give an inanimate fact or object its own analytical action via a dangling participle: "the report highlights...," "this reflects...," "the change underscores...," "the update, ensuring greater flexibility, ...". The participle clause manufactures an insight that isn't actually there.
**Fix:** if the participle clause doesn't add a new fact, cut it. If it does, make it its own sentence with a real subject.

**5. Regression to the mean.** Replacing a specific, checkable fact with a generic-but-plausible-sounding description — "a revolutionary titan of industry" instead of what the person or thing actually did.
**Fix:** go find the specific fact. If none is available, that's a sign the sentence shouldn't be there at all.

**6. False ranges.** "Ranging from X to Y" or "from [abstract thing] to [unrelated abstract thing]" constructions that sound specific but describe no coherent scale ("from personal ambition to familial complexities").
**Fix:** name the actual, discrete things. If there's no real range, don't invent one for cadence.

**7. Rule-of-three padding.** Stacking three adjectives, clauses, or short phrases to make a point sound thorough when it's one idea repeated three ways ("robust, scalable, and efficient"; "reliable, portable, and convenient").
**Fix:** say the one true thing. If there really are three distinct points, they deserve three distinct sentences with different content, not a triplet.

**8. Negative parallelism.** "It's not just X, it's Y." "This isn't just a tool, it's a movement." Also its punchier cousin, the **outline of negatives**: "no gimmicks, no filler, just results" — a rhythmic list of things something *isn't*, standing in for saying what it is.
**Fix:** state the claim directly. If a real contrast exists, it survives without the "not just... it's" scaffolding.

**9. Excessive synonym variance ("elegant variation").** Swapping in a different synonym every time a word repeats, even when the repeated word is clearer — calling the same person "the founder," then "the entrepreneur," then "the visionary" purely to avoid repetition.
**Fix:** repeat the plain word. Clarity beats variety; a human writer doesn't flinch at using "agents" five times in a row.

**10. Vague attribution.** "Critics argue," "some believe," "experts say," "many consider," "observers have noted," "industry reports suggest," with no name attached.
**Fix:** name the source, or cut the claim. If you don't know who said it, don't attribute it to a faceless crowd.

**11. Editorializing asides / didactic disclaimers.** Inserted meta-commentary addressed at an imagined reader rather than actual content: "it's important to note," "it's worth noting that," "crucial to remember," "results may vary."
**Fix:** cut it, or fold the actual caveat into a real sentence with content.

### Structure and shape

**12. Formulaic transitions and connectives.** "Furthermore," "moreover," "additionally," "in today's fast-paced world," "when it comes to X," "at the end of the day." These show up at several times the normal human rate because the model is stitching text together linearly rather than reasoning in paragraphs.
**Fix:** cut them outright most of the time — sentences usually connect fine without a signpost. Where a transition is genuinely needed, use a plain one ("but," "so," "still").

**13. Boilerplate summary/conclusion moves.** Restating what was just said ("In summary," "Overall, X represents..."), especially at the end of a short piece where the reader hasn't forgotten the first paragraph.
**Fix:** just end. Land on the last real point, not a recap.

**14. Formulaic "Despite its challenges" closer.** The outline-shaped ending that raises a generic downside only to wave it away with generic optimism: "Despite its challenges, X shows great promise for the future."
**Fix:** the ending should say the specific thing that's actually true, good or bad, not perform a balanced-sounding shrug.

**15. Rigid, symmetrical structure.** Every section the same length, every list the same number of items, headers that all follow "The X of Y," a "Challenges" or "Future Outlook" section tacked onto everything regardless of whether it's warranted.
**Fix:** let structure follow content. Some points need a paragraph, some need one sentence. Cut sections that don't have real material.

**16. Relentlessly even, upbeat tone.** No friction, no genuine criticism, every problem "easily addressed," every downside softened into a silver lining.
**Fix:** if there's a real weakness, say so plainly. Certainty and enthusiasm should track how the writer actually feels, not stay pinned at a constant pleasant hum.

### Formatting

**17. Overuse of bold, bullets, and emoji.** Turning ordinary prose into bolded lists, or scattering emoji into headers, when the content is a normal paragraph. Also watch for **inline-header vertical lists**, bullets built entirely from a bolded term followed by a colon and a definition ("**Term:** description of that term," repeated down a list) when the same content would read better as prose.
**Fix:** default to prose. Use a list only when the content is actually a list (steps, discrete items) — not as a formatting reflex.

**18. Title Case Section Headings.** Capitalizing every main word in a heading, instead of the sentence case a human writer typically defaults to.
**Fix:** sentence case headings, capitalize only the first word and proper nouns.

**19. Em dashes and other punctuation tics.** Not a reliable tell on their own (plenty of human writers use em dashes constantly), but worth checking if they're the *only* punctuation doing structural work in a piece — commas, periods, and parentheses can usually carry more of the load. Also check for curly/smart quotes (" " ' ') mixed in with straight ones elsewhere in the same piece, a sign of unedited paste-through.
**Fix:** vary sentence construction rather than leaning on one connector; make quote style consistent throughout.

**20. Leftover template and chatbot artifacts.** Fill-in-the-blank phrasing left unedited, placeholder text ("2025-XX-XX"), chatbot sign-offs ("I hope this helps! Let me know if you have questions"), knowledge-cutoff disclaimers ("as of my last update," "I don't have real-time access to..."), or apology/refusal leftovers ("as an AI language model, I..."). These should never survive a real editing pass.
**Fix:** delete on sight — catch them on the final read, every time.

## How to apply this while drafting (not just after)

The checklist above is for auditing, but it's more effective to write this way from the start:

- **Front-load one real detail per claim.** Before writing a sentence that states something is important, useful, or notable, put in the specific fact that makes it so. If no such fact is available, that's a sign the sentence shouldn't be there.
- **Vary sentence and paragraph length on purpose.** Don't let every paragraph land at 3-4 sentences of similar length. Short paragraphs, even single-sentence ones, are fine.
- **Write the opinion, not just the description.** A human writer describing something usually has a take — what's good, what's annoying, what surprised them. Generic AI copy tends to describe without judging. Include the judgment.
- **Match the register the user actually asked for.** Check whether the person has any known preferences for voice (casual vs. formal, first person, contractions, specific words to avoid) and apply those on top of this checklist — those preferences take priority over defaults here, and a project's own house style (e.g. deliberately heavy use of bold for a specific reason) can override an individual formatting rule above as long as the underlying goal, not reading as AI-written, is still met some other way.

## Language-specific style rules

Which language the piece is written in decides which additional style tradition applies, on top of the checklist above. Check the language of the draft (not the language of the conversation) before applying these.

### German → Gutes Deutsch nach Wolf Schneider

If the piece is in German, apply Wolf Schneider's rules for good style (from *Deutsch für Profis* and related work), in addition to the checklist above:

- **Kurze Sätze.** Aim short — Schneider's rule of thumb is roughly 12 words per sentence, about 6 before and 6 after the verb. Vary between moderately short and moderately long sentences rather than a wall of uniform length.
- **Starke Verben statt Nominalstil.** Prefer strong verbs over noun constructions (Nominalisierung). "Er entschied" beats "Er traf eine Entscheidung." Turn "zur Anwendung bringen" into "anwenden," "in Erwägung ziehen" into "erwägen."
- **Aktiv statt Passiv.** Default to active voice; use passive only when the actor genuinely doesn't matter.
- **Anschauliche, konkrete Begriffe statt Abstrakta.** Concrete, vivid words over abstractions. Say what happened, not what "took place within the context of."
- **Adjektive sparsam einsetzen.** Schneider is sharply critical of adjective-stacking — cut adjectives unless they carry real information; most are filler.
- **Überflüssige Wörter streichen.** Strike words that add no information — if a sentence works without a word, that word goes.
- **Für die Ohren schreiben.** Write for the ear, not just the eye — read it aloud; if it's hard to say, rewrite it.
- **Schachtelsätze vermeiden.** Avoid nested subordinate clauses piled on top of each other (Schachtelmonster). One main idea per sentence.
- **Für den Leser schreiben.** Write from the reader's perspective — what do they need to know, what would interest them — not from the writer's convenience.

### English → Plain English per Strunk & White

If the piece is in English, apply the core rules from Strunk & White's *The Elements of Style*, in addition to the checklist above:

- **Omit needless words.** Every word should earn its place. Cut "the fact that," "in order to," "there is/are" constructions where a direct subject-verb works better.
- **Use active voice.** "The committee approved the plan," not "The plan was approved by the committee" — unless the actor is genuinely unknown or unimportant.
- **Use definite, specific, concrete language.** Prefer the specific over the general, the definite over the vague.
- **Write with nouns and verbs, not adjectives and adverbs.** Let the noun and verb carry the sentence; don't prop up a weak verb with an adverb ("walked quickly" → "strode").
- **Avoid a succession of loose sentences** strung together with "and" or "which" — vary sentence construction.
- **Put statements in positive form.** Say what something is, not what it isn't ("He was not very often on time" → "He usually came late").
- **Keep related words together**, and keep the subject and verb close so the sentence doesn't lose the reader.
- **Don't overstate or overqualify.** Avoid "rather," "very," "little," "pretty" and other hedge/intensifier words that dilute a claim rather than sharpening it.

## Quick self-check before delivering

Read the piece once purely for rhythm, out loud if possible. If every sentence could be swapped with any other sentence in the piece without changing the shape, that's the tell. Real writing has some short sentences, some long ones, a fragment here and there, and a place where the writer clearly cared more than elsewhere.

Then run the checklist above item by item, explicitly, against the actual draft — not from memory of having read it once. This is the step that's easiest to skip under time pressure and the one that matters most: the goal stated at the top of this document (nothing reads as AI-written) is only as good as whether this pass actually happened.
