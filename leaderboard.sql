-- অফিস যাবো, ভাই! V4 — লিডারবোর্ড টেবিল (Supabase → SQL Editor-এ পুরোটা পেস্ট করে Run)
create table if not exists public.scores (
  id bigint generated always as identity primary key,
  day int not null check (day between 20250101 and 21001231),
  track text not null check (track in ('office','varsity')),
  name text not null check (char_length(name) between 1 and 24),
  score int not null check (score between -5000 and 9999),
  plan text not null check (plan in ('bus','dd','metro','cng','bike','car','cycle')),
  arrive int not null default 0,
  stars int not null default 0 check (stars between 0 and 3),
  pid text not null check (char_length(pid) <= 24),
  ver text,
  created_at timestamptz not null default now()
);
create index if not exists scores_day_track_score on public.scores (day, track, score desc);

alter table public.scores enable row level security;
-- সবাই পড়তে পারবে, সবাই নতুন স্কোর যোগ করতে পারবে; কেউ এডিট/ডিলিট করতে পারবে না
drop policy if exists "read scores" on public.scores;
create policy "read scores" on public.scores for select to anon using (true);
drop policy if exists "add score" on public.scores;
create policy "add score" on public.scores for insert to anon with check (true);
