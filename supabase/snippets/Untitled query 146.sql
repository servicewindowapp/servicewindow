SELECT id, name, public, allowed_mime_types, file_size_limit
FROM storage.buckets
WHERE id = 'avatars';