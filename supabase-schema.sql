create extension if not exists pgcrypto;

create table if not exists public.presets (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  camera_model text not null default '未注明机型',
  author text not null default '未署名',
  filter_type text not null default '通用风格',
  mood text not null default '未标注',
  scene text not null default '未标注',
  white_balance text not null default '自动',
  tags text[] not null default '{}',
  strength smallint not null default 0 check (strength between 0 and 100),
  contrast smallint not null default 0 check (contrast between 0 and 100),
  saturation smallint not null default 0 check (saturation between 0 and 100),
  sharpness smallint not null default 0 check (sharpness between 0 and 100),
  clarity smallint not null default 0 check (clarity between 0 and 100),
  grain smallint not null default 0 check (grain between 0 and 100),
  favorite boolean not null default false,
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists presets_updated_at_idx on public.presets (updated_at desc);
create index if not exists presets_camera_model_idx on public.presets (camera_model);
create index if not exists presets_mood_idx on public.presets (mood);
create index if not exists presets_tags_idx on public.presets using gin (tags);

alter table public.presets enable row level security;

drop policy if exists "Public presets are readable" on public.presets;
create policy "Public presets are readable"
on public.presets for select
to anon
using (true);

drop policy if exists "Pilot users can insert presets" on public.presets;
create policy "Pilot users can insert presets"
on public.presets for insert
to anon
with check (true);

drop policy if exists "Pilot users can update presets" on public.presets;
create policy "Pilot users can update presets"
on public.presets for update
to anon
using (true)
with check (true);

drop policy if exists "Pilot users can delete presets" on public.presets;
create policy "Pilot users can delete presets"
on public.presets for delete
to anon
using (true);
