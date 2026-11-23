# FiveTalents.Camp — Claude Working Guide

FiveTalents.Camp is a locally hosted app on one laptop that processes registration data and prints everything needed to run the Anglican Diocese of Pittsburgh's overnight youth camp (next camp: March 12 to 14, 2027). Owner: Jason Goble. It replaces the retired Cairn project.

Read `docs/superpowers/specs/2026-11-22-fivetalents-camp-phase1-design.md` first. It is the approved Phase I design. Decisions are ADRs in `docs/decisions/`.

## Product constraints

- Phase I is one laptop and a printer, Windows or macOS, no internet. No multi-machine sync, no nurse laptop, no in-app registration, no flexible import. Do not build toward them beyond leaving the schema portable.
- Relational database is the system of record (ADR 0001). Every edit also writes a change-log row in the same transaction. Printouts are thin views (template plus query) over current-state tables.
- Printing goes through the browser with print CSS. Colour is allowed (the inkjet and laser both print it), but every printout must still read in greyscale or photocopied. Status is a word, never colour alone.
- Fonts and assets are bundled. No CDN.
- Camper data includes minors' medical details. Never put real data in the repo, issues, PRs, logs, test fixtures or screenshots. Use obviously fake data. Never silently correct questionable data; flag it for a person.
- Out of scope entirely: Saturday teams. Roommate requests are a possible later nice-to-have.

## Stack

Follows FiveTalents: .NET 10, ASP.NET Core, EF Core 10, Angular 21 with Material, signals-first state. SQLite for Phase I. The look is the FiveTalents look (tokens, Cormorant Garamond and Inter, `docs/brand/media-kit.md` in the FiveTalents repo), kept as the baseline. It is conformed to current tools (Material themed from the brand tokens, fonts and icons bundled) and given a print-first standard, with each departure from FiveTalents recorded with a reason (#1). The Design canvas for it was approved on 2026-11-22.

## Branching and GitHub workflow

- GitHub Flow: `feature/<issue#>-<slug>`, `fix/<issue#>-<slug>` or `chore/<issue#>-<slug>`, then a PR to `main`. The initial commit is the only direct push.
- Every piece of work has an issue. Assign `JasonGoble` when work begins. Put `Fixes #N` or `Closes #N` in the commit or PR. Follow-ups to shipped work use `fix/<original#>-<slug>` with `Refs #N`.
- Issue templates in `.github/ISSUE_TEMPLATE/` (`gh issue create --template`). Title prefix, lowercase: `feat:`, `bug:`, `chore:`. Labels: `feat:` gets `feature` plus `backend` and/or `frontend`; `bug:` gets `bug`; `chore:` gets `chore`; a spike also gets `spike`. Every issue gets at least one `area:` label and a milestone.
- Bug body: Symptom, Root Cause, Fix, Fixed In (commit SHA). File an issue for every defect found in merged work.
- Record blocking as a GitHub "blocked by" relationship: `gh api -X POST repos/JasonGoble/FiveTalents.Camp/issues/<blocked#>/dependencies/blocked_by -F issue_id=<blocker's internal id>`.
- Pass `--repo JasonGoble/FiveTalents.Camp` to `gh` explicitly; this workspace has sibling repos.

## Claude's approval gates and process

Approval gates: required

The repo is public (MIT licensed, so other camps can reuse it), so Claude asks before each commit, push, PR or merge. Design approval and the "Before every commit" checks always apply.

Review before PR: visible changes

For any change a person can see (screens, printouts, wording), finish, verify and commit locally, then stop with the running build and a short "what you will see". Do not push or open a PR until Jason says it is right. His changes are more commits on the same branch. Changes with nothing to see go straight to the PR.

- Design first: bounded work gets a short design in chat and Claude waits for Jason's yes; larger work gets a written spec and plan.
- Code changes are test first: failing test, run it red, implement, run it green.
- Background sessions work in a worktree, never the shared checkout.
- Merge only with Jason's say-so while approval gates are `required`. One PR at a time off `main`, never stacked. Never merge red.
- Before a session ends, every open item is in an issue or an ADR, not only in chat.

## Where we are (2026-11-22)

The design is approved, the repo is set up and the first issues are filed in the "1. Foundation and first slice" milestone. No code exists yet. In order:

1. #1: conform the FiveTalents look and add the print-first standard (Design canvas approved; the repo write-up of tokens and the print standard is still to do).
2. #2 solution skeleton, #3 person record and change log, #4 add-a-person screen, #5 cabins, #6 carry card (printed only when a station needs it).
3. Off the main path: #7 retire the Cairn repo (archive only once Jason says so), #8 port the still-useful Cairn context and medication design into this repo's docs, #9 docs wording.

Open questions are listed in the design spec. Station sheets, documents to track and printout layouts are expected to change as Jason gathers feedback from other leaders before March.

## Before every commit

1. Build and run the tests for what changed (once code exists).
2. Documentation check, done deliberately: README, ADR needed, design spec still matches.
3. Confirm nothing in the diff is real data. `.gitignore` excludes databases, spreadsheets, CSVs and PDFs.
