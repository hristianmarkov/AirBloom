create table public.waitlist (
 id uuid primary key default gen_random_uuid(),
 email text not null unique check (email = lower(trim(email)) and length(email) between 3 and 254 and email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'),
 platform text not null check (platform in ('ios','android','both')),
 consent boolean not null check (consent),
 consent_version text not null default 'beta-v1' check (consent_version = 'beta-v1'),
 request_id text not null check (request_id ~ '^[a-zA-Z0-9-]{16,64}$'),
 created_at timestamptz not null default now()
);
create table public.waitlist_removal_requests (
 id uuid primary key default gen_random_uuid(),
 email text not null check (email = lower(trim(email)) and length(email) between 3 and 254 and email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'),
 request_id text not null unique check (request_id ~ '^[a-zA-Z0-9-]{16,64}$'),
 created_at timestamptz not null default now()
);
alter table public.waitlist enable row level security;
alter table public.waitlist_removal_requests enable row level security;
revoke all on public.waitlist, public.waitlist_removal_requests from public, anon, authenticated;
grant insert (email, platform, consent, consent_version, request_id) on public.waitlist to anon;
grant insert (email, request_id) on public.waitlist_removal_requests to anon;
grant all on public.waitlist, public.waitlist_removal_requests to service_role;
create policy waitlist_insert on public.waitlist for insert to anon with check (consent and consent_version = 'beta-v1');
create policy removal_request_insert on public.waitlist_removal_requests for insert to anon with check (true);
