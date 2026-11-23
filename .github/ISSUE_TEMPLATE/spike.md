---
name: Spike
about: A time-boxed investigation whose output is an answer, not code that ships
title: "chore: spike, "
labels: chore, spike
assignees: ''
---

> Do not paste real camper, leader or parent details into an issue. Describe the shape of the problem or use obviously fake data.

## Question

The one thing this spike must answer, as a question ("Can the laptop print a double-sided cabin card on cardstock?").

## Background

Why the answer matters and what it unblocks. Link related issues, ADRs or specs.

## What we will try

The cheapest probe that answers the question. Anything built is throwaway unless a later issue says otherwise.

## Time box

How long to spend before stopping and reporting what is known.

## Output

A findings note in `docs/spikes/` that states the answer, what was tried and a recommendation. If the answer settles a decision, that gets an ADR in `docs/decisions/`.

## Out of scope

What this spike will not try to answer.

## Depends on

Any issues this is blocked by. Also record each one as a GitHub "blocked by" relationship (see Issue conventions in CLAUDE.md); say here what the spike needs that is not an issue (a person, a device, a decision).

<!-- Also add: at least one `area:` label, and the "Spikes & Fact-finding" milestone. -->
