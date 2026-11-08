# API Contract — Draft

Base path: `/api/v1`. Protected routes require a valid Supabase access token in `Authorization: Bearer <token>`.

## Anime

- `GET /anime/search?q=&page=` — search provider-backed catalogue.
- `GET /anime/:id` — internal anime detail.
- `GET /anime/:id/airing` — known airing events and evidence metadata.

## Watchlist

- `GET /me/watchlist?status=`
- `POST /me/watchlist` — `{ "animeProvider": "anilist", "providerId": "...", "status": "WATCHING" }`
- `PATCH /me/watchlist/:entryId` — update status, progress, rating, notification toggle.
- `DELETE /me/watchlist/:entryId`

Adding a Watching entry creates/activates release monitoring subscription transactionally.

## Progress

- `PUT /me/anime/:animeId/progress/:episodeNumber` — idempotently mark episode watched.
- `DELETE /me/anime/:animeId/progress/:episodeNumber`

## Calendar and notifications

- `GET /me/calendar?from=&to=` — user-local schedule window; timestamps remain ISO UTC in API payload.
- `GET /me/notifications?cursor=`
- `PATCH /me/notifications/:notificationId/read`
- `POST /me/devices` — register push token and platform.
- `DELETE /me/devices/:deviceId` — revoke device token.

## Preferences

- `GET /me/preferences`
- `PATCH /me/preferences` — locale, timezone, audio/subtitle preferences, notification settings.

## API rules

- Use consistent error envelopes and request IDs.
- Validate path, query, and body inputs.
- Paginate collection endpoints.
- Never trust a user ID supplied by the client; derive it from the verified token.
- Keep internal worker/admin endpoints private and separately authenticated.
- Return provider attribution and data freshness where relevant.
