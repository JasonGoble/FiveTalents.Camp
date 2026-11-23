# ADR-0002: Conform the FiveTalents look and add a print-first standard

**Status:** Accepted
**Date:** 2026-11-22

## Context

FiveTalents.Camp uses the FiveTalents look. The first plan was to redo that look from scratch with the Design tool. The FiveTalents look is already coherent and has a brand kit, and Camp's output is mostly paper, which the original never had to handle. The baseline also loads fonts and icons from a CDN (Camp has no internet), themes Angular Material with stock palettes instead of the brand tokens, has no print styles, and leans on colour alone for some meaning.

Camp's printers (an inkjet and a laser) both print colour, so greyscale is not a hard requirement. Sheets are still photocopied and read by people who cannot tell colours apart.

## Decision

The FiveTalents look is the baseline. Camp conforms it to current tools and adds a print-first standard. It is not redone.

- A framework-neutral `design/` folder is the source of truth: `tokens.css`, `fonts.css` with bundled fonts and icons, `print.css`, the written standard (`print-standard.md`) and every departure with its reason (`departures.md`).
- Colour is allowed on printouts, but every sheet must still read in greyscale. A status is always a word.
- Fonts and icons are bundled (SIL OFL and Apache 2.0), with licences in `design/fonts/` and attributions in `THIRD_PARTY_NOTICES.md`.
- `design/sample/` holds static printable samples with fake data, so the standard can be checked on the real printers before Angular exists.
- Angular Material theming is written later (#2, #4) from the mapping in `departures.md`.

## Consequences

- Camp stays visually consistent with FiveTalents, and each difference is recorded and justified.
- Later issues (#2, #4, #6) import the CSS instead of re-deciding the look.
- Print rules can be checked on a real printer now, not after the app exists.
- A new departure from the baseline needs a new line in `departures.md`.
- Possible future work: offer bundled fonts, print styles and status-as-words back to FiveTalents and Calendar.
