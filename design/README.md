# design/

The FiveTalents.Camp look and print-first standard. Plain CSS and static samples, no framework, nothing loads from the network. Later issues (#2 skeleton, #4 screens, #6 carry card) import these files.

The look is the FiveTalents look, conformed to current tools and given a print layer (see [ADR 0002](../docs/decisions/0002-conform-look-and-print-first-standard.md)).

| File | What it is |
|---|---|
| `tokens.css` | Colours, type, radii, ink and status tokens. |
| `fonts.css`, `fonts/` | Bundled Cormorant Garamond, Inter and Material Icons, with licences. |
| `print.css` | Named pages (Letter, 6 x 4 and 4 x 6 cards), ink rules, status component, print-only hiding. |
| `print-standard.md` | The rules every printout follows. |
| `departures.md` | Every difference from the FiveTalents baseline, with its reason. |
| `sample/` | Printable sample sheets with fake data. Start at `sample/index.html`. |
| `check.mjs` | Guard: required files exist, nothing references the network, every `url()`, `href` and `src` resolves. |

## Try it

Open `design/sample/index.html` in a browser (double-click it, no server needed) and print a sample on each printer. `sample/index.html` explains the print settings.

## Check

```
node design/check.mjs
```

Run it before committing a change to this folder. It needs Node and nothing installed.

## Rules for changing it

- Real camper data never goes here. Samples use obviously fake data.
- A new departure from FiveTalents gets a line in `departures.md`.
- New fonts or icons need a licence check, a file in `fonts/` and an entry in `THIRD_PARTY_NOTICES.md`.
- Layouts in `sample/` are examples and will change as leader feedback arrives. The rules in `print-standard.md` are what stays fixed.
