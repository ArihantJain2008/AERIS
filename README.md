# AERIS

A mobile anime companion for discovery, watchlists, airing schedules, episode progress, and release notifications.

> Working product name. Trademark, domain, and app-store availability have not been verified.

## Product decisions

- Android-first; iOS is a planned follow-on target.
- React Native + Expo + TypeScript.
- Premium dark visual system, with light theme support left open for a later release.
- Anime metadata: AniList GraphQL, subject to API terms, rate limits, and availability.
- Backend: Node.js + Express + TypeScript.
- Database: PostgreSQL + Prisma.
- Authentication: Supabase Auth.
- Release monitoring: server-side worker; the mobile app must not be responsible for continuous polling.
- Notifications: Expo Push Notifications initially, with provider delivery receipts and token lifecycle handling.
- Initial interface locales: English, Hindi, Japanese, Korean, Spanish, French.

## Repository status

This is the documentation and bootstrap foundation. The Expo app and API dependencies must be installed on a machine with npm registry access.

## Bootstrap

Run PowerShell from the repository root:

```powershell
./scripts/bootstrap.ps1
```

The script creates an Expo Router tabs application in `apps/mobile`. Review generated dependency versions against the current Expo SDK before committing lockfiles.

## Documentation

- [Product requirements](docs/PRD.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Database design](docs/DATABASE.md)
- [API contract](docs/API.md)
- [Roadmap](docs/ROADMAP.md)

## Core product rule

Adding an anime to **Watching** should be sufficient to register its airing schedule automatically. Notifications must distinguish an anime's scheduled airing from confirmed availability on a particular streaming service. A scheduled airing is not proof that a stream is available.
