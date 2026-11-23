# Print-first standard

Camp runs on paper. This is the standard every printout follows. It sits beside the FiveTalents look and does not replace it. Tokens are in `tokens.css` and the print primitives are in `print.css`. Working examples are in `sample/` (open `sample/index.html`).

## Colour and greyscale

- Colour is allowed. The inkjet and the laser both print it.
- Every sheet must still read photocopied or printed in greyscale.
- A status is always a word. The border style (solid, dashed, heavy) and a small mark support it but never replace it.
- Gold `#C8A96B` is decoration or a rule, never text on parchment or white (about 2.0:1). Gold text is allowed on midnight `#0d3f78` (about 4.7:1).

## Type and ink

- Body text is 12pt (16px) or more. Dense lists may use 14px to 15px. The floor is 12px, even on the leader card at 23 rows.
- Captions are 9pt (12px) or more. Nothing is smaller.
- No text lighter than `#767676`. Body text is `--ink` (`#1a1a1a`), muted text is `--ink-muted` (`#4a4a4a`).
- Rules and strokes are at least 1px. Finer lines vanish on paper.
- Headings use Cormorant Garamond, everything else uses Inter. Both are bundled.
- Cormorant's default numerals are old-style and read as letters ("101" looks like "IOI"). Titles set lining numerals (`.sheet-title` does this), and numbers people must read correctly (person numbers, counts, times) are set in Inter.
- No large dark floods. A header band is fine.

## Pages

Named pages are defined in `print.css`. Apply the class to the sheet's root element.

| Class | Size | Use |
|---|---|---|
| `page-letter-portrait` | 8.5 x 11 in | registrar and other lists |
| `page-letter-landscape` | 11 x 8.5 in | nurse medication record |
| `page-card-6x4` | 6 x 4 in | carry card (size is an assumption to confirm against the real stock) |
| `page-card-4x6` | 4 x 6 in | leader badge card, double-sided |

Sheets carry their own margins (0.5 in on Letter, 14 to 24px on cards). Print at 100% scale with no browser margins and Background graphics on.

## Screen chrome

Anything marked `no-print`, plus `.app-chrome`, `.sidebar`, `.mobile-header` and `nav`, is hidden on print.

## Sensitive sheets

A sheet with medical details carries a boxed word `CONFIDENTIAL` and a return-if-found line. Medical detail is limited to what that sheet needs. The carry card shows only what a station should expect (for example "Medications: YES"), never medical detail.

## Fill-in-by-hand sheets

- Cells are at least 56px tall, with 1px rules.
- Each cell has a printed hint (such as `time ____`) and an initials line.
- Outcomes are written as words (REFUSED, MISSED), never a mark alone.
- A notes box and a sign-off box are always present.

## Specific sheets

- **Carry card.** Printed only when a person has something to do at the documents or nurse station. It lists only the stations that apply, in fixed order (documents, then nurse), what each should expect, and a blank initials line. No cabin number and no medical detail.
- **Leader card.** 4 x 6 in for a badge holder, double-sided. Front is the cabin roster for 12 to 23 campers, with a flag word per camper. Back is medical details for flagged campers only.
- **Registrar sheet.** Alphabetical, a tick box for arrived, a "needs attention" box that flags questionable data and never corrects it.

## What may change

Fields, wording and layouts are expected to change as leader feedback arrives before March. The rules above are what stays fixed.
