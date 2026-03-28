SELECT column_name FROM information_schema.columns 
WHERE table_name = 'profiles' 
AND column_name IN ('trial_ends_at', 'trial_converted');