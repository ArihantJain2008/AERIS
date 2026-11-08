# AERIS — Product Requirements Document

**Version:** 0.1 · **Status:** Draft baseline · **Platform:** Android first, iOS later

## Product vision

AERIS is a personal anime companion. Users discover anime, maintain a watchlist, track episode progress, see localized airing schedules, and receive notifications when new episodes are reported as aired.

**Promise:** Add an anime to Watching once. AERIS handles the schedule tracking.

## Target users

- Anime viewers who follow multiple currently airing series.
- Viewers who want one organized watchlist and release calendar.
- Multilingual viewers who want the app interface and notification copy in their preferred language.

## Functional requirements

### Accounts and profile
- Email/password and supported social sign-in.
- Secure session handling and account recovery.
- Profile preferences synchronized to the account.
- Device registration and revocation for push notifications.

### Discovery
- Trending, popular, seasonal, and upcoming anime.
- Search by title and supported alternate titles.
- Genre and status filters.
- Detail page with synopsis, artwork, format, status, episode count, and airing data when available.
- Cache metadata and respect upstream API limits and terms.

### Watchlist
- Statuses: Watching, Planning, Completed, On Hold, Dropped.
- Current episode, personal rating, date added, and updated timestamp.
- One entry per user/anime.
- Adding an entry as Watching automatically subscribes it to release monitoring.
- Removing or changing status updates monitoring subscriptions.

### Release tracking
- Store expected airing events with source and last-checked timestamp.
- Refresh schedules server-side.
- Handle unknown dates, delays, cancellations, and schedule changes.
- Distinguish scheduled airing from confirmed episode availability on a streaming service.
- Never promise a stream link unless an authorized provider integration verifies it.

### Notifications
- New episode aired event.
- Optional pre-release reminder.
- Schedule changed/cancelled event where reliable.
- Per-anime mute and global preferences.
- Quiet hours and timezone-aware delivery.
- Notification deduplication and delivery outcome tracking.
- Notification language follows the user's selected app locale by default.

### Calendar
- Daily and weekly release views for MVP; monthly view can follow.
- Filter to the user's Watching list.
- Show episode number, local time, and schedule confidence/source.

### Progress
- Mark episodes watched and edit progress.
- Show progress percentage where total episode count is known.
- Prevent duplicate progress records.
- Optional auto-complete behavior controlled by the user.

### Internationalization
Initial interface locales: `en`, `hi`, `ja`, `ko`, `es`, `fr`.
- Detect device locale during onboarding, but let the user choose.
- Persist explicit language selection.
- Translate all UI strings, empty states, validation, and notification templates.
- Format dates/times using locale and the user's IANA timezone.
- Support Unicode and test text expansion.
- Anime titles and descriptions should retain provider-supplied original/localized text; UI translation must not overwrite source metadata.

### Audio/subtitle preferences
- Preferred audio and subtitle languages are profile preferences.
- Show availability only when supported by reliable provider data.
- Do not infer dubbing/subtitle availability from the anime's country or original language.

## MVP acceptance criteria

1. User can sign in and retain a session.
2. User can search anime and view details.
3. User can add/remove anime and change watch status.
4. Watching entries are registered for server-side schedule monitoring.
5. A simulated airing event can generate one push notification per user/anime/episode/event.
6. Device token registration, invalidation, and notification preferences work.
7. Watch progress persists and syncs.
8. Calendar shows airing times in the user's timezone.
9. User can switch among all six initial interface locales.
10. App remains useful when metadata or push services are temporarily unavailable.

## Explicitly out of scope for MVP

- Hosting, scraping, or downloading copyrighted episodes.
- Unlicensed streaming links.
- Social feeds, messaging, and public user profiles.
- Community reviews and recommendations powered by ML.
- iOS launch before Android release quality is established.

## Non-functional requirements

- Validate all API input and enforce authorization server-side.
- Never ship service-role secrets in the mobile bundle.
- Use UTC for persisted instants and IANA timezone identifiers for user preferences.
- Use database constraints for deduplication and uniqueness.
- Add structured logs, retry policies, and observable worker health.
- Respect provider terms, quotas, and attribution requirements.
- Minimize personal data collection and provide account deletion/export planning.
