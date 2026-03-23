-- Set all credential flags to true for Fuego Latin Grill (demo seed data)
UPDATE trucks SET
  is_verified           = true,
  has_insurance         = true,
  has_license           = true,
  has_food_handler_cert = true,
  is_school_approved    = true
WHERE id = 'b1000000-0000-0000-0000-000000000001';
