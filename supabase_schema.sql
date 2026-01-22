-- Enable UUID extension if not already enabled
create extension if not exists "uuid-ossp";

-- 1. Projects Table (Folders)
create table if not exists projects (
  id uuid default uuid_generate_v4() primary key,
  name text not null, -- Project Name
  description text,
  owner_client text, -- Project Owner / Client
  partner text, -- Project Partner
  status text check (status in ('Active', 'Closed')) default 'Active',
  department text, -- Department / Category
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Documents Table (Subfolders/Files)
-- Updated for Cloudinary usage
create table if not exists madhyavarti_documents (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references projects(id) on delete cascade not null, -- Link to Project
  title text not null, -- Document Title
  document_type text not null, -- Document Type (Subfolder concept)
  public_id text not null, -- Cloudinary Public ID (for deletion/management)
  file_url text not null, -- Cloudinary Secure URL
  file_format text, -- e.g., pdf, docx
  size integer, -- File size in bytes
  uploaded_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table projects enable row level security;
alter table madhyavarti_documents enable row level security;

-- Policies for Projects
create policy "Public Read Projects" on projects
  for select using (true);

create policy "Admin Insert Projects" on projects
  for insert with check (auth.role() = 'authenticated');

create policy "Admin Update Projects" on projects
  for update using (auth.role() = 'authenticated');

create policy "Admin Delete Projects" on projects
  for delete using (auth.role() = 'authenticated');

-- Policies for Documents
create policy "Public Read Documents" on madhyavarti_documents
  for select using (true);

create policy "Admin Insert Documents" on madhyavarti_documents
  for insert with check (auth.role() = 'authenticated');

create policy "Admin Delete Documents" on madhyavarti_documents
  for delete using (auth.role() = 'authenticated');
