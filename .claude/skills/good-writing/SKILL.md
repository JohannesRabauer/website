---
name: good-writing
description: >-
  Use this skill whenever writing or editing prose meant to sound human — blog posts, articles, emails, video descriptions, social posts, documentation, or any text the user will publish under their own name. Strips out the stock patterns that make text read as AI-generated, per Wikipedia's "Signs of AI writing" field guide - puffed-up significance, rule-of-three padding, negative parallelism ("it's not just X, it's Y"), formulaic transitions, vague attributions, boilerplate structure, and overuse of bold/bullets/em dashes. Also applies language-specific style rules on top of the checklist: Gutes Deutsch nach Wolf Schneider for German text, Plain English per Strunk & White for English text. Trigger this any time the user asks to write, draft, rewrite, "humanize," or edit copy for external use, even if they don't explicitly mention AI detection or say "make this sound human."
---

# Avoid AI Writing Tells

A checklist-driven pass for making written output read like it came from a person who knows the subject and has opinions about it, not like it was assembled from a template. Based on Wikipedia's WikiProject AI Cleanup field guide ("Signs of AI writing"), which catalogs the patterns editors use to flag undisclosed AI-generated content.

## Important framing

None of these patterns are individually damning — humans use em dashes, triplets, and "furthermore" too. What gives AI writing away is the *density and consistency* of these patterns stacked together, plus the way they replace specific knowledge with generic-but-plausible-sounding statements. So the goal here isn't "never do X," it's: default to specificity and let structure vary, so nothing feels templated.

This means the fix is rarely "delete the em dash." It's "go find the actual fact, opinion, or detail that a template-filler would have skipped."

## The checklist

Run a completed draft against this list before delivering it. Fix what you find, don't just flag it.

### 1. Puffed-up significance
Watch for any sentence whose job is to tell the reader something matters, rather than showing why. Tells: "stands as a testament to," "plays a vital/pivotal role," "leaves a lasting legacy," "underscores the importance of," "serves as a reminder that," "a watershed moment," "in the ever-evolving landscape of."
**Fix:** cut the sentence, or replace it with the actual concrete fact that would let the reader judge significance themselves.

### 2. Rule-of-three padding
Stacking three adjectives, clauses, or short phrases to make a point sound thorough when it's actually one idea repeated three ways ("robust, scalable, and efficient"; "reliable, portable, and convenient").
**Fix:** say the one true thing. If there really are three distinct points, they deserve three distinct sentences with different content, not a triplet.

### 3. Negative parallelism ("It's not just X, it's Y")
The reflexive contrast-reframe: "This isn't just a tool, it's a movement." Overused as a fake-profundity device.
**Fix:** state the claim directly. If a real contrast exists, it can survive without the "not just... it's" scaffolding.

### 4. Formulaic transitions and connectives
"Furthermore," "moreover," "additionally," "in today's fast-paced world," "when it comes to X," "it's worth noting that," "at the end of the day." These show up at several times the normal human rate in AI text because the model is stitching text together linearly rather than reasoning in paragraphs.
**Fix:** cut them outright most of the time — sentences usually connect fine without a signpost. Where a transition is genuinely needed, use a plain one ("but," "so," "still").

### 5. Vague attribution
"Critics argue," "some believe," "experts say," "many consider," with no name attached.
**Fix:** name the source, or cut the claim. If you don't know who said it, don't attribute it to a faceless crowd.

### 6. Boilerplate summary/conclusion moves
Restating what was just said ("In summary," "Overall, X represents..."), especially at the end of a short piece where the reader hasn't forgotten the first paragraph.
**Fix:** just end. Land on the last real point, not a recap.

### 7. Rigid, symmetrical structure
Every section the same length, every list the same number of items, headers that all follow "The X of Y" or are all in Title Case, a "Challenges" or "Future Outlook" section tacked onto everything regardless of whether it's warranted.
**Fix:** let structure follow content. Some points need a paragraph, some need one sentence. Cut sections that don't have real material.

### 8. Relentlessly even, upbeat tone
No friction, no genuine criticism, every problem is "easily addressed," every downside is softened into a silver lining.
**Fix:** if there's a real weakness, say so plainly. Certainty and enthusiasm should track how the writer actually feels, not stay pinned at a constant pleasant hum.

### 9. Overuse of bold, bullets, and emoji
Turning ordinary prose into bolded lists, or scattering emoji into headers, when the content is a normal paragraph.
**Fix:** default to prose. Use a list only when the content is actually a list (steps, discrete items) — not as a formatting reflex.

### 10. Leftover template artifacts
Fill-in-the-blank phrasing left unedited, chatbot sign-offs ("I hope this helps! Let me know if you have questions"), or curly quotes/apostrophes where the rest of the piece uses straight ones.
**Fix:** these should never survive a real editing pass — catch them on the final read.

### 11. Em dashes and other punctuation tics
Not a reliable tell on their own (plenty of human writers use em dashes constantly), but worth checking if they're the *only* punctuation doing structural work in a piece — commas, periods, and parentheses can usually carry more of the load.
**Fix:** vary sentence construction rather than leaning on one connector.

## How to apply this while drafting (not just after)

The checklist above is for auditing, but it's more effective to write this way from the start:

- **Front-load one real detail per claim.** Before writing a sentence that states something is important, useful, or notable, put in the specific fact that makes it so. If no such fact is available, that's a sign the sentence shouldn't be there.
- **Vary sentence and paragraph length on purpose.** Don't let every paragraph land at 3-4 sentences of similar length. Short paragraphs, even single-sentence ones, are fine.
- **Write the opinion, not just the description.** A human writer describing something usually has a take — what's good, what's annoying, what surprised them. Generic AI copy tends to describe without judging. Include the judgment.
- **Match the register the user actually asked for.** Check whether the person has any known preferences for voice (casual vs. formal, first person, contractions, specific words to avoid) and apply those on top of this checklist — those preferences take priority over defaults here.

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
