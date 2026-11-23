# Departures from the FiveTalents look

The baseline is the FiveTalents look (FiveTalents repo: `web/five-talents-web/src/styles.scss` and `docs/brand/media-kit.md`). Camp keeps it. This file lists every difference and why. A new difference needs a new line here.

| # | Baseline | Camp | Why |
|---|---|---|---|
| 1 | Fonts and Material Icons load from Google's CDN. | Cormorant Garamond, Inter and Material Icons are bundled as woff2 files in `fonts/`. | Camp has no internet at the venue. |
| 2 | Angular Material uses stock azure and orange palettes. The brand colours live in separate CSS variables that Material components do not use. | Material is themed from the brand tokens: primary is midnight `#0d3f78`, tertiary is gold `#C8A96B`. The theme code is written in #2 and #4 (needs Angular). | Material controls should look like the rest of the brand. |
| 3 | Gold is used as an accent and sometimes as text colour. | Gold is a rule, border or decoration. It is text only on midnight. | Gold on parchment is about 2.0:1 and fails. |
| 4 | Meaning can be carried by colour alone. | Status is always a word, with a border style and a small mark as support. | Sheets are photocopied, printed in greyscale and read by people who cannot tell colours apart. |
| 5 | No print styles. | `print.css` defines named pages, ink rules and print-only hiding of screen chrome. | Camp's output is mostly paper. |
| 6 | Cormorant Garamond is used for any large text, with its default old-style numerals. | Titles use lining numerals (`font-variant-numeric: lining-nums`). Numbers people must read (person numbers, counts, times) are set in Inter. | Old-style numerals look like letters ("101" reads as "IOI"). Found on the carry card sample. |
| 7 | Screen type scale only. | Added print scale (12px floor, 9pt captions) and ink tokens (`--ink`, `--ink-muted`, `--ink-hair`, `--ink-fill`). | Paper needs darker text and a minimum size. |

## Unchanged from the baseline

Palette (midnight, gold, parchment, charcoal, forest, burgundy, slate), type families, border radii, the reverent and calm tone from the brand kit.

## Material mapping for the Angular theme (applied in #2 and #4)

| Material role | Camp token |
|---|---|
| primary | `--color-midnight` |
| tertiary | `--color-gold` (decoration and accents, not text) |
| surface | `--color-parchment` |
| on-surface | `--color-charcoal` |
| error | `--color-burgundy` |
| typography | `--font-body` for body, `--font-display` for headings |

## Possible flow back

Improvements that suit FiveTalents and FiveTalents.Calendar too (bundled fonts, print styles, status as words) can be offered to those repos. That is a separate decision and a separate issue.
