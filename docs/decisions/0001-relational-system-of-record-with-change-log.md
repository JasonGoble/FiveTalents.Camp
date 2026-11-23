# ADR-0001: Relational system of record with a change-log table

**Status:** Accepted
**Date:** 2026-11-22

## Context

The retired Cairn project made an append-only event log the source of truth and derived current state from it. It was very flexible, but it made ordinary reporting hard, because every question had to be answered by replaying or projecting events. FiveTalents.Camp is a single-machine app whose main output is printed reports, so queryability matters more than event-stream flexibility. Later phases may add multi-machine support through delta packages, with the database becoming a snapshot.

## Decision

The current state of people, cabins, payments, documents, medications and attendance lives in ordinary normalized tables in a relational database (SQLite for Phase I; the schema stays portable to another RDBMS). Every edit also writes a row to a change-log table in the same database, recording what changed, from what, to what, and when.

The change log is data to query and report on. It is not the source of truth and nothing is rebuilt from it. Future delta packages are generated from it.

## Consequences

- Reports and printouts are plain queries over current-state tables.
- "What changed since this sheet was printed" can be answered from the change log without extra machinery.
- Writes do slightly more work (state plus log row), done in one transaction.
- Moving to multi-machine sync later means building delta export and import on top of the change log, which is deferred.
