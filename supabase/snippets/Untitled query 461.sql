INSERT INTO storage.buckets (id, name, public, avif_autodetection, file_size_limit, allowed_mime_types)
VALUES ('avatars', 'avatars', true, true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']);

CREATE POLICY "Users can upload their own avatar"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[2]);

CREATE POLICY "Users can update their own avatar"
ON storage.objects FOR UPDATE
WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[2]);

CREATE POLICY "Anyone can view avatars"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');