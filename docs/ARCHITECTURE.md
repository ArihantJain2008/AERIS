# Architecture

## High-level components

1. **Mobile client:** React Native + Expo + TypeScript + Expo Router.
2. **API:** Node.js + Express + TypeScript. Validates requests, authenticates users, applies business rules, and reads/writes PostgreSQL.
3. **Database:** PostgreSQL with Prisma migrations.
4. **Identity:** Supabase Auth. The API verifies access tokens; service-role credentials remain server-side only.
5. **Metadata adapter:** AniList GraphQL adapter with caching, rate-limit handling, and provider-specific mapping into internal DTOs.
6. **Release worker:** Separate server process/worker that refreshes due schedules and emits domain events.
7. **Notification dispatcher:** Sends push notifications through Expo Push Service, records tickets/receipts, retries transient failures, and invalidates dead tokens.

## Important boundaries

- The mobile client never performs continuous schedule polling.
- The API is the only writer for user-owned data.
- The metadata provider is not the source of truth for user watch progress.
- Push delivery is best-effort; store notification events in-app so users can recover missed pushes.
- Scheduled airing and streaming-provider availability are separate concepts.
- Keep provider-specific IDs and payloads behind adapters.

## Suggested monorepo layout

```text
apps/
  mobile/       # Expo application
  api/          # Express HTTP API
  worker/       # Release monitoring and push dispatch
packages/
  contracts/    # Shared DTOs and API schemas
  config/       # Shared lint/TypeScript configuration
prisma/         # Schema and migrations
 docs/          # Product and engineering documentation
```

## Release event flow

1. Worker selects schedule records due for refresh.
2. Metadata adapter fetches current airing data under provider rate limits.
3. Worker upserts schedule records and records source/check timestamps.
4. A schedule event is considered notification-eligible only when the configured evidence rule is satisfied.
5. Dispatcher finds users with an active Watching subscription and eligible preferences.
6. Unique deduplication key prevents duplicate event creation.
7. Push is submitted; ticket and receipt state are persisted.
8. Failed transient sends are retried; invalid tokens are deactivated.

## Reliability and operations

- Worker jobs must be idempotent.
- Use bounded retries with exponential backoff and jitter.
- Add dead-letter handling for repeatedly failing jobs.
- Use database transactions for event creation and deduplication.
- Track provider errors, worker lag, push ticket/receipt failures, and notification latency.
- Start with a simple PostgreSQL-backed job table or a managed queue; avoid adding Redis until workload requires it.

## Security

- Verify Supabase JWTs on protected API routes.
- Enforce user ownership in every query/mutation.
- Validate input with shared schemas.
- Rate-limit authentication-sensitive and search endpoints.
- Keep secrets in server environment variables.
- Do not log access tokens, push tokens, or unnecessary personal data.
