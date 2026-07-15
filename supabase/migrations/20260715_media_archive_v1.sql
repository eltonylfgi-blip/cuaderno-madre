-- Archivo multimedia MADRE v1
-- PREPARADA, NO APLICADA: requiere aprobación explícita de Tony antes de tocar producción.
-- Objetivo: entrada anónima con cuarentena privada, catálogo público solo tras revisión,
-- preferencias/relaciones muchos-a-muchos y trazabilidad de seguridad + derechos.

create extension if not exists pgcrypto;

create table public.media_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  title text not null check (char_length(title) between 1 and 100),
  description text not null default '' check (char_length(description) <= 900),
  intended_use text not null check (char_length(intended_use) between 1 and 900),
  category text not null default 'other' check (category in ('asmr','mlg','ui','ambient','illustration','reaction','other')),
  source_url text check (source_url is null or char_length(source_url) <= 700),
  source_host text check (source_host is null or char_length(source_host) <= 255),
  author_claim text not null default '' check (char_length(author_claim) <= 100),
  rights_claim text not null default 'unknown' check (rights_claim in ('own','cc0','cc-by','licensed','unknown')),
  status text not null default 'quarantined' check (status in ('quarantined','reviewing','needs_info','approved','rejected')),
  safety_status text not null default 'pending' check (safety_status in ('pending','safe','manual_review','unsafe')),
  rights_status text not null default 'pending' check (rights_status in ('pending','verified','rejected')),
  file_count smallint not null default 0 check (file_count between 0 and 3),
  submitter_hash text not null check (char_length(submitter_hash) between 32 and 128),
  review_note text not null default '' check (char_length(review_note) <= 2000),
  approved_at timestamptz,
  rejected_at timestamptz,
  constraint media_submission_source_required check (file_count > 0 or source_url is not null),
  constraint media_submission_publish_gate check (
    status <> 'approved' or (safety_status = 'safe' and rights_status = 'verified' and approved_at is not null)
  )
);

create table public.media_files (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.media_submissions(id) on delete cascade,
  created_at timestamptz not null default now(),
  bucket_id text not null default 'media-quarantine' check (bucket_id in ('media-quarantine','media-approved')),
  object_path text not null unique check (char_length(object_path) between 1 and 500),
  original_name text not null check (char_length(original_name) between 1 and 220),
  declared_mime text not null default '' check (char_length(declared_mime) <= 100),
  detected_mime text not null check (detected_mime in (
    'audio/mpeg','audio/wav','audio/ogg',
    'image/png','image/jpeg','image/webp','image/gif',
    'video/mp4','video/webm'
  )),
  media_kind text not null check (media_kind in ('audio','image','video')),
  bytes bigint not null check (bytes between 1 and 26214400),
  sha256 text not null check (sha256 ~ '^[a-f0-9]{64}$'),
  review_status text not null default 'pending' check (review_status in ('pending','safe','unsafe','duplicate','rejected')),
  duplicate_of uuid references public.media_files(id) on delete set null
);

create table public.media_assets (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  submission_id uuid references public.media_submissions(id) on delete set null,
  file_id uuid not null unique references public.media_files(id) on delete restrict,
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title text not null check (char_length(title) between 1 and 100),
  description text not null default '' check (char_length(description) <= 900),
  intended_use text not null default '' check (char_length(intended_use) <= 900),
  kind text not null check (kind in ('audio','image','video','animation')),
  category text not null default 'other' check (category in ('asmr','mlg','ui','ambient','illustration','reaction','other')),
  alt_text text not null default '' check (char_length(alt_text) <= 300),
  author_name text not null default '' check (char_length(author_name) <= 160),
  source_url text check (
    source_url is null or (char_length(source_url) <= 700 and source_url ~ '^https://[^[:space:]]+$')
  ),
  license_kind text not null default 'unknown' check (license_kind in ('own','cc0','cc-by','licensed','public-domain','unknown')),
  license_url text check (
    license_url is null or (char_length(license_url) <= 700 and license_url ~ '^https://[^[:space:]]+$')
  ),
  rights_status text not null default 'pending' check (rights_status in ('pending','verified','rejected')),
  safety_status text not null default 'pending' check (safety_status in ('pending','safe','unsafe')),
  status text not null default 'draft' check (status in ('draft','approved','retired')),
  tags text[] not null default '{}',
  published_at timestamptz,
  constraint media_asset_publish_gate check (
    status <> 'approved' or (safety_status = 'safe' and rights_status = 'verified' and published_at is not null and file_id is not null)
  )
);

create table public.media_relations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  from_asset_id uuid not null references public.media_assets(id) on delete cascade,
  to_asset_id uuid not null references public.media_assets(id) on delete cascade,
  relation_type text not null check (relation_type in ('play-together','alternative','triggers','sequence','represents')),
  note text not null default '' check (char_length(note) <= 500),
  status text not null default 'proposed' check (status in ('proposed','approved','rejected','retired')),
  proposed_by text not null default 'public' check (proposed_by in ('public','tony','madre')),
  approved_at timestamptz,
  constraint media_relation_distinct_assets check (from_asset_id <> to_asset_id),
  unique (from_asset_id, to_asset_id, relation_type)
);

create table public.media_signals (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  asset_id uuid references public.media_assets(id) on delete cascade,
  submission_id uuid references public.media_submissions(id) on delete cascade,
  signal_type text not null check (signal_type in ('match','favorite','favorite_removed','relation','report')),
  result text not null default '' check (char_length(result) <= 80),
  note text not null default '' check (char_length(note) <= 500),
  session_hash text not null check (char_length(session_hash) between 32 and 128),
  constraint media_signal_has_subject check (asset_id is not null or submission_id is not null)
);

create table public.media_review_events (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  submission_id uuid references public.media_submissions(id) on delete cascade,
  asset_id uuid references public.media_assets(id) on delete cascade,
  actor text not null check (char_length(actor) between 1 and 100),
  action text not null check (char_length(action) between 1 and 80),
  from_status text,
  to_status text,
  note text not null default '' check (char_length(note) <= 2000),
  constraint media_review_has_subject check (submission_id is not null or asset_id is not null)
);

create table public.media_intake_events (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  submitter_hash text not null check (char_length(submitter_hash) between 32 and 128),
  bytes bigint not null default 0 check (bytes between 0 and 78643200)
);

create index media_submissions_review_queue_idx on public.media_submissions (status, created_at);
create index media_submissions_submitter_idx on public.media_submissions (submitter_hash, created_at desc);
create index media_files_submission_idx on public.media_files (submission_id);
create index media_files_hash_idx on public.media_files (sha256, bytes);
create index media_assets_public_idx on public.media_assets (status, safety_status, rights_status, published_at desc);
create index media_relations_from_idx on public.media_relations (from_asset_id, status);
create index media_relations_to_idx on public.media_relations (to_asset_id, status);
create index media_signals_asset_idx on public.media_signals (asset_id, created_at desc);
create index media_intake_events_rate_idx on public.media_intake_events (submitter_hash, created_at desc);

create or replace function public.media_touch_updated_at()
returns trigger
language plpgsql
set search_path = public, pg_temp
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger media_submissions_touch
before update on public.media_submissions
for each row execute function public.media_touch_updated_at();

create trigger media_assets_touch
before update on public.media_assets
for each row execute function public.media_touch_updated_at();

-- Un activo publicable siempre apunta a una copia revisada dentro de Storage controlado.
-- No se aceptan URLs externas mutables como bytes finales. La existencia se comprueba al aprobar.
create or replace function public.media_asset_validate_file()
returns trigger
language plpgsql
security definer
set search_path = public, storage, pg_temp
as $$
declare
  valid_file boolean;
begin
  if new.status = 'approved' then
    select exists (
      select 1
      from public.media_files f
      join storage.objects o on o.bucket_id = f.bucket_id and o.name = f.object_path
      where f.id = new.file_id
        and f.bucket_id = 'media-approved'
        and f.review_status = 'safe'
        and (new.kind = f.media_kind or (new.kind = 'animation' and f.media_kind in ('image','video')))
    ) into valid_file;
    if not valid_file then
      raise exception 'media asset requires a reviewed immutable file in private approved storage';
    end if;
  end if;
  return new;
end;
$$;

create trigger media_assets_validate_file
before insert or update on public.media_assets
for each row execute function public.media_asset_validate_file();

-- Para cambiar/mover/borrar los bytes hay que retirar primero el activo. Así nunca queda una
-- fila pública apuntando a un archivo que dejó de ser seguro.
create or replace function public.media_file_protect_published()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if exists (select 1 from public.media_assets a where a.file_id = old.id and a.status = 'approved') then
    if tg_op = 'DELETE' then
      raise exception 'retire the public media asset before changing its reviewed file';
    elsif new.bucket_id is distinct from old.bucket_id
       or new.object_path is distinct from old.object_path
       or new.detected_mime is distinct from old.detected_mime
       or new.media_kind is distinct from old.media_kind
       or new.bytes is distinct from old.bytes
       or new.sha256 is distinct from old.sha256
       or new.review_status is distinct from old.review_status then
      raise exception 'published media bytes are immutable; retire the asset before replacing them';
    end if;
  end if;
  if tg_op = 'DELETE' then return old; end if;
  return new;
end;
$$;

create trigger media_files_protect_published
before update or delete on public.media_files
for each row execute function public.media_file_protect_published();

-- Rate limit atómico para la Edge Function: 3 envíos/10 min, 10/día, 100 MB/día.
-- Solo service_role puede llamarlo; no conserva IP ni user-agent en claro.
create or replace function public.media_register_intake(p_submitter_hash text, p_bytes bigint)
returns boolean
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  recent_10m integer;
  recent_day integer;
  bytes_day bigint;
  global_10m integer;
  global_day integer;
  global_bytes_day bigint;
begin
  if p_submitter_hash is null or char_length(p_submitter_hash) not between 32 and 128
     or p_bytes is null or p_bytes < 0 or p_bytes > 78643200 then
    return false;
  end if;

  perform pg_advisory_xact_lock(hashtextextended('media-intake-global', 0));
  perform pg_advisory_xact_lock(hashtextextended(p_submitter_hash, 0));
  delete from public.media_intake_events where created_at < now() - interval '2 days';

  select count(*) filter (where created_at >= now() - interval '10 minutes'),
         count(*) filter (where created_at >= now() - interval '1 day'),
         coalesce(sum(bytes) filter (where created_at >= now() - interval '1 day'), 0)
  into recent_10m, recent_day, bytes_day
  from public.media_intake_events
  where submitter_hash = p_submitter_hash;

  select count(*) filter (where created_at >= now() - interval '10 minutes'),
         count(*) filter (where created_at >= now() - interval '1 day'),
         coalesce(sum(bytes) filter (where created_at >= now() - interval '1 day'), 0)
  into global_10m, global_day, global_bytes_day
  from public.media_intake_events;

  if recent_10m >= 3 or recent_day >= 10 or bytes_day + p_bytes > 104857600
     or global_10m >= 60 or global_day >= 500 or global_bytes_day + p_bytes > 2147483648 then
    return false;
  end if;

  insert into public.media_intake_events (submitter_hash, bytes)
  values (p_submitter_hash, p_bytes);
  return true;
end;
$$;

alter table public.media_submissions enable row level security;
alter table public.media_files enable row level security;
alter table public.media_assets enable row level security;
alter table public.media_relations enable row level security;
alter table public.media_signals enable row level security;
alter table public.media_review_events enable row level security;
alter table public.media_intake_events enable row level security;

-- El público solo puede leer activos ya aprobados por los dos gates.
create policy media_assets_public_read
on public.media_assets for select
to anon, authenticated
using (status = 'approved' and safety_status = 'safe' and rights_status = 'verified' and published_at is not null);

create policy media_relations_public_read
on public.media_relations for select
to anon, authenticated
using (
  status = 'approved' and approved_at is not null
  and exists (
    select 1 from public.media_assets a
    where a.id = from_asset_id and a.status = 'approved' and a.safety_status = 'safe' and a.rights_status = 'verified'
  )
  and exists (
    select 1 from public.media_assets a
    where a.id = to_asset_id and a.status = 'approved' and a.safety_status = 'safe' and a.rights_status = 'verified'
  )
);

create or replace view public.media_catalog_public
with (security_invoker = true, security_barrier = true)
as
select id, slug, title, description, intended_use, kind, category,
       file_id, alt_text, author_name, source_url,
       license_kind, license_url, tags, published_at
from public.media_assets
where status = 'approved' and safety_status = 'safe' and rights_status = 'verified' and published_at is not null;

create or replace view public.media_relations_public
with (security_invoker = true, security_barrier = true)
as
select id, from_asset_id, to_asset_id, relation_type, note, approved_at
from public.media_relations
where status = 'approved' and approved_at is not null;

revoke all on public.media_submissions, public.media_files, public.media_assets,
  public.media_relations, public.media_signals, public.media_review_events,
  public.media_intake_events from anon, authenticated;
grant select on public.media_assets, public.media_relations to anon, authenticated;
grant select on public.media_catalog_public, public.media_relations_public to anon, authenticated;
revoke all on function public.media_register_intake(text, bigint) from public, anon, authenticated;
grant execute on function public.media_register_intake(text, bigint) to service_role;
revoke all on function public.media_touch_updated_at() from public, anon, authenticated;
revoke all on function public.media_asset_validate_file() from public, anon, authenticated;
revoke all on function public.media_file_protect_published() from public, anon, authenticated;

-- Ambos buckets son privados. media-public comprueba el estado EN CADA petición y sirve el archivo
-- en streaming; retirar el activo vuelve esa misma URL 404 sin esperar a que caduque una firma.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media-quarantine','media-quarantine',false,26214400,
  array['audio/mpeg','audio/wav','audio/ogg','image/png','image/jpeg','image/webp','image/gif','video/mp4','video/webm']
)
on conflict (id) do update set
  public = false,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media-approved','media-approved',false,26214400,
  array['audio/mpeg','audio/wav','audio/ogg','image/png','image/jpeg','image/webp','image/gif','video/mp4','video/webm']
)
on conflict (id) do update set
  public = false,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Defensa explícita: no hay políticas INSERT/UPDATE/DELETE para anon/authenticated en tablas ni Storage.
-- La Edge Function usa service_role y escribe solo tras MIME real + tamaño + rate-limit.
