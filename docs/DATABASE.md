# Database Design — Initial Model

Use PostgreSQL. Persist instants as UTC timestamps (`timestamptz`); store user timezone as an IANA identifier such as `Asia/Kolkata`.

## Tables

### `profiles`
- `id uuid primary key` — same subject ID as Supabase Auth.
- `display_name text null`
- `app_locale text not null default 'en'`
- `timezone text not null`
- `audio_language text null`
- `subtitle_language text null`
- `created_at`, `updated_at`

### `anime`
- `id uuid primary key`
- `provider text not null` (initially `anilist`)
- `provider_id text not null`
- `title_romaji`, `title_english`, `title_native` nullable text
- `cover_image_url`, `banner_image_url` nullable text
- `synopsis text null`
- `format`, `status` nullable text
- `total_episodes integer null`
- `metadata_updated_at timestamptz`
- Unique (`provider`, `provider_id`)

### `user_anime`
- `id uuid primary key`
- `user_id uuid references profiles(id)`
- `anime_id uuid references anime(id)`
- `watch_status text` constrained to Watching/Planning/Completed/On Hold/Dropped
- `current_episode integer not null default 0`
- `rating numeric null`
- `notifications_enabled boolean not null default true`
- `created_at`, `updated_at`
- Unique (`user_id`, `anime_id`)

### `airing_events`
- `id uuid primary key`
- `anime_id uuid references anime(id)`
- `episode_number integer not null`
- `scheduled_at timestamptz null`
- `state text` (scheduled, aired, delayed, cancelled, unknown)
- `evidence_source text`
- `source_event_id text null`
- `last_checked_at timestamptz`
- Unique (`anime_id`, `episode_number`, `evidence_source`)

### `episode_progress`
- `id uuid primary key`
- `user_id uuid references profiles(id)`
- `anime_id uuid references anime(id)`
- `episode_number integer not null`
- `watched_at timestamptz not null`
- Unique (`user_id`, `anime_id`, `episode_number`)

### `device_tokens`
- `id uuid primary key`
- `user_id uuid references profiles(id)`
- `push_token text unique not null`
- `platform text not null`
- `active boolean not null default true`
- `last_seen_at timestamptz`

### `notification_preferences`
- `user_id uuid primary key references profiles(id)`
- `push_enabled boolean not null default true`
- `reminder_minutes integer null`
- `quiet_hours_start time null`
- `quiet_hours_end time null`
- `updated_at`

### `notification_events`
- `id uuid primary key`
- `user_id uuid references profiles(id)`
- `anime_id uuid references anime(id)`
- `airing_event_id uuid references airing_events(id)`
- `kind text not null`
- `dedupe_key text unique not null`
- `locale text not null`
- `state text not null` (queued, submitted, delivered, failed, skipped)
- `provider_ticket_id text null`
- `created_at`, `sent_at`, `updated_at`

## Indexes

- `user_anime(user_id, watch_status)`
- `airing_events(scheduled_at, state)`
- `episode_progress(user_id, anime_id)`
- `notification_events(user_id, created_at desc)`
- `device_tokens(user_id, active)`

## Data integrity

- Validate episode numbers as positive integers.
- Ensure rating is within the chosen product scale.
- Use foreign keys and cascade policies deliberately; do not cascade-delete shared anime metadata when one user removes a list entry.
- Deduplicate notifications using a stable event key containing user, anime, episode, and notification kind.
- Add migrations and tests for all constraints before production.
