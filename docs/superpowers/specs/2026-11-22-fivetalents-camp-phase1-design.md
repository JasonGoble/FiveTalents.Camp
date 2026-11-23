# FiveTalents.Camp, Phase I design

Status: draft for approval. Date: 2026-11-22. Owner: Jason Goble.
Supersedes: the Cairn project (retired; its repo stays as a record).

## Intent and why

The Anglican Diocese of Pittsburgh runs an overnight youth camp (next: March 12 to 14, 2027, at an off-grid camp with unreliable internet). Last year's registration data was cleaned by hand in Excel and mail-merged into Word. The check-in list was one 15-page sheet used by three people at once, and the work was chaotic. Jason has limited off-hours to build the replacement before late March 2027.

FiveTalents.Camp is a locally hosted app on one laptop. It holds registration data and prints everything needed to run intake, cabins, documents, medical care and check-out. It is a sibling of FiveTalents.Calendar (its own repo and folder beside FiveTalents) and uses the FiveTalents look.

Why this shape: the earlier offline-first multi-device design (Cairn) was not testable or supportable in the time available. A single machine and a printer removes sync, networking and device management.

## Goals

- Faster, more accurate check-in than last year, with fewer sheets of paper to reconcile.
- Cabin assignment before camp, changeable up to and during check-in day.
- Per-station printed sheets that fit each station's work (registrar, documents, nurse).
- A numbered carry card per person, printed at check-in.
- A reportable relational database. Every edit is recorded in a change-log table in that database.
- Runs on Windows or macOS with no internet.
- Layouts can change until the week of camp.

## Non-goals (Phase I)

- Multi-machine sync, the nurse's laptop, networking of any kind.
- Registration inside the app (later), and any flexible import mechanism.
- Saturday teams (internal to the camp, out of scope entirely).
- Roommate and buddy requests (possible nice-to-have later).
- Digital medication administration. The nurse works on paper.
- Scanning completed sheets back in (a later option).

## Anti-goals

- Anything that makes camp-day operation depend on a network or a second computer.
- Silently correcting or discarding questionable data. Flag it for a person.
- Real camper data in any repository, public or private, ever.

## Constraints

- .NET and Angular, following FiveTalents (.NET 10, EF Core, Angular 21, Material, signals-first). SQLite for Phase I. The schema must stay portable to another RDBMS.
- Fonts and all assets are bundled. No CDN.
- Jason is the sole developer and operator, working in off hours. A non-technical volunteer may need to start the app, so launching must be one step.
- Camper data includes minors' medical details. The database lives on the laptop, outside the repo.

## Approaches considered

- A. Printouts first: design the real documents, derive the model from them. Rejected as the starting point because the final printouts won't be known until feedback from other leaders arrives over the next couple of months.
- B. Data model first, printouts as thin views over it. Chosen. It tolerates the unknown printouts.
- C. Throwaway spike first. Folded into B as an early thin slice instead.

## How camp runs (the walkthrough so far)

Before camp, Jason enters registrations and assigns cabins. On Friday people walk down a line of three stations, in person, carrying their own forms, medications and payments. Groups arrive by car-load, so church grouping does not help lookup.

1. Registrar (the computer): find the person by search or add a walk-on, confirm cabin and payment, mark arrived, print the carry card, and print any slips needed by stations 2 and 3.
2. Documents (a volunteer lead, with a second volunteer who files): waivers; for leaders, SafeChurch documentation and training.
3. Medical (the camp nurse): medical forms, medications, special instructions.

Stations 2 and 3 work on paper sheets. After check-in finishes, Jason keys their results into the laptop. On Sunday the departure list is the checked-in list with a check-out box. Last year's single sheet doubled as the check-out record.

## Design

### Data (relational; current state in ordinary tables)

- Person: permanent short number (assigned once, never reused), name, role (youth, leader, diocesan staff), sex, birthdate, church, shirt size, contact and emergency details, notes.
- Cabin: a named place with capacity and notes. Names are free ("Cabin W", "Terrace Cabin") and can be added or renamed on the day.
- Cabin assignment: person to cabin, with the history kept via the change log.
- Payment: amount due, amount received, payer (family or church), state (paid, promised, to verify, comped, church check pending), note.
- Document: a type list that is data, not code (waiver, SafeChurch clearance, training, and others to be decided), and a per-person status with received date and note.
- Activities: paintball and climbing opt-ins.
- Medical: allergies, conditions, activity restrictions, medications. Medication times are structured (breakfast, lunch, dinner, bedtime, specific time, as needed), not free text. Each field is tagged with who may see it on which printout.
- Attendance: arrived (with time and note, including late arrival), departed.
- Change log: a table recording who or what changed which field, from what, to what, and when. Queried like any other table.

### Printouts (provisional; each is a template plus a query, separate from the model)

Carry card, registrar sheet (alphabetical), documents sheet, nurse health sheet and medication record, cabin leader sheet (roster, medical flags in words, never colour alone), cabin rosters, Sunday check-out list. Greyscale-safe. The exact set and layouts are expected to change.

### Interface

Web UI served by the app on the laptop, localhost only. Priority screens: person search and edit, cabin planning (assign and move, with capacity shown), and a quick add for walk-ons. A "needs attention" list for questionable data (impossible birthdates, duplicates, placeholders). Printing goes through the browser with print CSS.

### Theme

FiveTalents look, redone with the Design tool as the first step. Print-first. Fonts bundled.

### Packaging

One process serves the API and the built UI. One launcher per operating system opens the browser. No accounts in Phase I.

### Safety

Database file lives outside the repo and is gitignored. Recommend full-disk encryption on the laptop. Backups to a second drive during camp. Retention and deletion after camp is an open decision.

## Out of the first slice, and what comes first

First slice: add a person by hand, assign a cabin, print one carry card. Then medications and documents, then the station sheets, then the Sunday list.

## Open questions

- The final list of legal documents and training to track (open until feedback arrives).
- What each printout should look like (expected to change).
- Whether to build a fixed-column paste import for the registration spreadsheet if typing proves slow.
- Retention and deletion of camper data after camp.
- Whether leaders may photograph their badges.

## Process

New repo and folder `FiveTalents.Camp` beside FiveTalents. Same conventions as FiveTalents: GitHub Flow, an issue for every piece of work, ADRs, test first, a PR for every change. ADR 0001 records: relational database as the system of record, with a change-log table.

## Calls I made (for Jason to check)

- No login in Phase I, localhost only.
- Browser printing with print CSS.
- Documents flagged on leaders, never blocking.
- Carry card printed at the registrar station.
- Station sheets keyed in after check-in.
- SQLite as the Phase I database.
