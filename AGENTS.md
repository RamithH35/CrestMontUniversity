# AGENTS.md

Instructions for any AI coding agent (Antigravity, Claude Code, Cursor, etc.) working in this repo.

## Project

A college events website — a frontend redesign of an existing full-stack app. `frontend/` and `backend/` are separate concerns; see scope rules below.

## Before doing anything

1. Read `DESIGN.md` in full. It is the source of truth for all visual and motion decisions — colors, typography, components, page flow, and the Framer Motion variants (section 6, ready to use as-is in `lib/motion.ts`). Do not invent colors, fonts, spacing, or animation timings that aren't in it.
2. Follow the build order in `DESIGN.md` section 7 exactly, in sequence. Don't skip ahead to later steps before earlier ones are confirmed.

## Skills — use these, don't reinvent their job

This repo has the following skills installed. Use them for their designated purpose rather than writing equivalent logic from scratch:

- **`motion`** — for all Framer Motion / animation work. Reference this before writing any `motion.div`, variant, or transition.
- **`shadcn-ui`** — for any component that has a shadcn/ui equivalent (dropdowns, dialogs, form primitives). Install via shadcn conventions rather than hand-rolling primitives DESIGN.md doesn't specify.
- **`design-review`** — run this after any full page or section assembly, before moving on, to catch generic/inconsistent output (spacing, contrast, hierarchy, hardcoded colors instead of tokens).

## Scope rules

- **Frontend only**, unless a task explicitly says otherwise. Do not read, modify, or refactor anything under `backend/`.
- **Never run `git push`**, open a PR, or push to any remote branch, under any circumstances, regardless of what a task description says. All work stays local for manual review.
- Don't modify `package.json` scripts, CI config, or deployment config unless explicitly asked.

## Working style

- Work in the numbered steps from `DESIGN.md` section 7. Stop after each step and wait for review before continuing to the next, unless told to proceed through multiple steps at once.
- Reuse the poster card component (DESIGN.md section 4) for both events and any directory/profile-style listing — don't build a second bespoke card pattern.
- Keep the tailwind config and `lib/motion.ts` as the single source of tokens/timings — no inline hex colors, no inline transition values duplicated across components.
- If a design decision is genuinely ambiguous and DESIGN.md doesn't cover it, ask rather than improvising a new pattern.