/*
# Create contact submissions table

1. New Tables
- `contact_submissions`
  - `id` (uuid, primary key): Unique identifier for each inquiry.
  - `name` (text): Visitor name captured from the contact form.
  - `email` (text): Visitor email address used for follow-up.
  - `message` (text): Project inquiry message.
  - `created_at` (timestamptz): Submission time, set automatically.

2. Security
- Row Level Security is enabled on `contact_submissions`.
- Anonymous and authenticated visitors may submit contact inquiries.
- No public read, update, or delete access is granted, keeping submissions private.

3. Important Notes
- This is a single-tenant portfolio contact channel and does not require sign-in.
- The app only inserts new inquiries; management access remains restricted to privileged database roles.
*/

CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can submit contact inquiries" ON public.contact_submissions;
CREATE POLICY "Anyone can submit contact inquiries"
  ON public.contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (length(trim(name)) BETWEEN 1 AND 120 AND length(trim(email)) BETWEEN 3 AND 320 AND length(trim(message)) BETWEEN 1 AND 5000);

DROP POLICY IF EXISTS "No public contact inquiry reads" ON public.contact_submissions;
DROP POLICY IF EXISTS "No public contact inquiry updates" ON public.contact_submissions;
DROP POLICY IF EXISTS "No public contact inquiry deletes" ON public.contact_submissions;
