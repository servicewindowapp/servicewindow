-- Only if the SELECT above returned nothing — backfill existing test accounts
INSERT INTO verification_requests (user_id, status, role, email, contact_name, submitted_at)
SELECT id, 'pending', role, email, full_name, now()
FROM profiles
WHERE role IN ('truck', 'organizer', 'venue', 'property', 'service_provider')
AND id NOT IN (SELECT user_id FROM verification_requests);