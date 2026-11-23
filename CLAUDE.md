# FiveTalents.Camp — Claude Working Guide

FiveTalents.Camp is a locally hosted app on one laptop that processes registration data and prints everything needed to run the Anglican Diocese of Pittsburgh's overnight youth camp (next camp: March 12 to 14, 2027). Owner: Jason Goble. It replaces the retired Cairn project.

Read `docs/superpowers/specs/2026-11-22-fivetalents-camp-phase1-design.md` first. It is the approved Phase I design. Decisions are ADRs in `docs/decisions/`.

## Product constraints

- Phase I is one laptop and a printer, Windows or macOS, no internet. No multi-machine sync, no nurse laptop, no in-app registration, no flexible import. Do not build toward them beyond leaving the schema portable.
- Relational database is the system of record (ADR 0001). Every edit also writes a change-log row in the same transaction. Printouts are thin views (template plus query) over current-state tables.
- Printing goes through the browser with print CSS. Printouts must work in greyscale; status is a word, never colour alone.
- Fonts and assets are bundled. No CDN.
- Camper data includes minors' medical details. Never put real data in the repo, issues, PRs, logs, test fixtures or screenshots. Use obviously fake data. Never silently correct questionable data; flag it for a person.
- Out of scope entirely: Saturday teams. Roommate requests are a possible later nice-to-have.

## Stack

Follows FiveTalents: .NET 10, ASP.NET Core, EF Core 10, Angular 21 with Material, signals-first state. SQLite for Phase I. The look follows FiveTalents and is being reworked with the Design tool as the first build step. Do not copy theme values from FiveTalents until that rework is done.

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

The design is approved and the repo is set up. No issues are filed and no code exists yet. Next, in order:

1. File the first issues in the "1. Foundation and first slice" milestone: rework the FiveTalents look with the Design tool (print-first, bundled fonts), the .NET and Angular solution skeleton, then the first slice (add a person, assign a cabin, print one carry card). Propose them to Jason before filing.
2. Retire the Cairn repo (`JasonGoble/Cairn`): add a "retired, superseded by FiveTalents.Camp" note to its README, and archive it once Jason says so.
3. Port what is still useful from Cairn's `docs/camp-context.md` and from the medication design (structured medication times, per-printout visibility tags) into this repo's docs.

Open questions are listed in the design spec. Station sheets, documents to track and printout layouts are expected to change as Jason gathers feedback from other leaders before March.

## Before every commit

1. Build and run the tests for what changed (once code exists).
2. Documentation check, done deliberately: README, ADR needed, design spec still matches.
3. Confirm nothing in the diff is real data. `.gitignore` excludes databases, spreadsheets, CSVs and PDFs.
