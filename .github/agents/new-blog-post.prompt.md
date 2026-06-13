---
agent: agent
description: Write a new blog post (EN + DE) for rabauer.dev
---

Write a new blog post for rabauer.dev in **both English and German**.

## Source material

<!-- Paste a YouTube link, notes, or a short description of the topic here -->


## Co-host / guest

<!-- Name and optional link/handle of the co-host or guest speaker, if any -->


## Content questions

Answer these before writing (or leave blank to let Copilot ask you):

1. **What is the core conclusion?** What is the single most important thing a reader should understand after reading this?
2. **What should the reader take away and do differently?** Any concrete action or mindset shift?
3. **Name three highlights.** The moments, findings, or arguments that were most interesting or surprising.
4. **What was harder than expected, or what went wrong?** Honest observations make better posts.
5. **Who is this for?** Describe the ideal reader in one sentence (role, experience level, context).
6. **What is NOT covered?** Anything deliberately left out that readers might expect?


## Metadata to fill in

| Field | Value |
|---|---|
| `title` | |
| `date` | <!-- ISO format: YYYY-MM-DD --> |
| `summary` | <!-- 1–2 sentence teaser, plain language --> |
| `tags` | <!-- lowercase, hyphenated, e.g. ["java", "ai-agents"] --> |
| `youtubeId` | <!-- optional, YouTube video ID only --> |
| `draft` | `false` |

## Timestamps (if video post)

```yaml
timestamps:
  - time: "00:00"
    label: ""
```

## Instructions

- Follow the style of existing posts in `content/posts/en/` and `content/posts/de/`.
- Keep reading time under ~5 minutes.
- Use plain language, factual value; mild positive emotion where it fits naturally.
- Do not pad — cut anything that doesn't add value.
- Create matching slugs for both locales (e.g. `my-topic.mdx` in both `en/` and `de/`).
- Frontmatter format must match the existing MDX posts exactly.
- Ask if any required information is missing before writing.
