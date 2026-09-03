/*
# Complete contact submission access policies

1. Security Updates
- Adds explicit deny policies for public reads, updates, and deletes.
- Keeps anonymous and authenticated access limited to inserting validated inquiries.

2. Privacy
- Contact messages are never exposed through the public client.
- Database administrators retain privileged access for responding to inquiries.
*/

DROP POLICY IF EXISTS "No public contact inquiry reads" ON public.contact_submissions;
CREATE POLICY "No public contact inquiry reads"
  ON public.contact_submissions
  FOR SELECT
  TO anon, authenticated
  USING (false);

DROP POLICY IF EXISTS "No public contact inquiry updates" ON public.contact_submissions;
CREATE POLICY "No public contact inquiry updates"
  ON public.contact_submissions
  FOR UPDATE
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

DROP POLICY IF EXISTS "No public contact inquiry deletes" ON public.contact_submissions;
CREATE POLICY "No public contact inquiry deletes"
  ON public.contact_submissions
  FOR DELETE
  TO anon, authenticated
  USING (false);
