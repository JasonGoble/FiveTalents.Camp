# FiveTalents.Camp

A locally hosted app that runs registration, cabin planning, documents, medical paperwork and check-in/check-out for the Anglican Diocese of Pittsburgh's overnight youth camp (next camp: March 12 to 14, 2027). It runs on one laptop, needs no internet, and prints everything the camp needs.

It is a sibling of [FiveTalents](https://github.com/JasonGoble/FiveTalents) and [FiveTalents.Calendar](https://github.com/JasonGoble/FiveTalents.Calendar) and uses the FiveTalents look. It replaces the retired Cairn project.

## Status

Planning. Nothing is built yet. Other camps are welcome to use and adapt this under the MIT licence. The Phase I design is in [`docs/superpowers/specs/`](docs/superpowers/specs/2026-11-22-fivetalents-camp-phase1-design.md). Decisions are recorded in [`docs/decisions/`](docs/decisions/README.md).

## Phase I at a glance

- One laptop and a printer. Windows or macOS. No network.
- A relational database (SQLite to start) holds the current state, with a change-log table recording every edit.
- Registrar station on the computer, two paper stations (documents, nurse), a numbered carry card per person.
- Printouts are thin views over the data, so layouts can change until the week of camp.

## Camper data

Camper data includes minors' medical details. No real camper, leader or parent data goes in this repository, in issues, in pull requests or in screenshots. The database lives on the laptop, outside the repo. Use obviously fake sample data for development and tests.
