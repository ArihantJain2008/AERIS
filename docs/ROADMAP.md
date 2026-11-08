# Development Roadmap

## Phase 0 — Repository foundation
- [x] Product scope and initial technical decisions documented.
- [x] Initial architecture, data model, API outline, and roadmap drafted.
- [ ] Create remote GitHub repository.
- [ ] Bootstrap Expo app and pin compatible dependency versions.
- [ ] Add linting, formatting, typecheck, and CI.

## Phase 1 — Mobile shell
- [ ] Expo Router navigation and dark design tokens.
- [ ] Onboarding and locale selection.
- [ ] Home, search, anime details, watchlist, schedule, notifications, profile screens.
- [ ] Loading, empty, error, and offline states.

## Phase 2 — Anime catalogue and watchlist
- [ ] AniList adapter and caching.
- [ ] Search and detail views.
- [ ] Watchlist CRUD and progress.
- [ ] Local cache and synchronization behavior.

## Phase 3 — Accounts and backend
- [ ] Supabase Auth integration.
- [ ] Express API and request validation.
- [ ] PostgreSQL schema and Prisma migrations.
- [ ] Authorization and ownership tests.

## Phase 4 — Release engine
- [ ] Schedule ingestion and refresh worker.
- [ ] Event state transitions and reschedule handling.
- [ ] Idempotency and notification deduplication.
- [ ] Observability, retries, and failure recovery.

## Phase 5 — Push notifications
- [ ] Device token registration and revocation.
- [ ] Expo push integration and receipts.
- [ ] Quiet hours and per-anime preferences.
- [ ] Real-device tests, including denied permissions and invalid tokens.

## Phase 6 — Internationalization and release readiness
- [ ] English, Hindi, Japanese, Korean, Spanish, French translations.
- [ ] Locale-aware date/time formatting.
- [ ] Android QA and accessibility checks.
- [ ] Privacy policy, account deletion, production monitoring, Play Store preparation.
- [ ] Evaluate iOS rollout.
