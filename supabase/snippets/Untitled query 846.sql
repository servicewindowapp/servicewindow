INSERT INTO verification_requests (user_id, status, role, email, contact_name, submitted_at)
SELECT p.id, 'pending', p.role, p.email, p.full_name, now()
FROM profiles p
INNER JOIN auth.users u ON u.id = p.id
WHERE p.role IN ('truck', 'organizer', 'venue', 'property', 'service_provider')
AND p.id NOT IN (SELECT user_id FROM verification_requests);