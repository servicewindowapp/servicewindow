-- ════════════════════════════════════════════════════════════════════════════════
-- ServiceWindow Email Notification Triggers with Resend
-- Run these SQL triggers in Supabase after deploying send-notification function
-- ════════════════════════════════════════════════════════════════════════════════

-- ────────────────────────────────────────────────────────────────────────────────
-- 1. NEW BOOKING REQUEST EMAIL
-- Trigger when a request is inserted with status='pending'
-- ────────────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION send_new_booking_email()
RETURNS TRIGGER AS $$
BEGIN
  -- Only send if status is pending
  IF NEW.status = 'pending' THEN
    PERFORM
      net.http_post(
        url := 'https://your-project-id.supabase.co/functions/v1/send-notification',
        body := jsonb_build_object(
          'type', 'new_booking_request',
          'recipient_email', (SELECT email FROM profiles WHERE id = (SELECT owner_id FROM trucks WHERE id = NEW.truck_id)),
          'recipient_name', (SELECT full_name FROM profiles WHERE id = (SELECT owner_id FROM trucks WHERE id = NEW.truck_id)),
          'data', jsonb_build_object(
            'event_name', NEW.event_name,
            'event_date', NEW.event_date,
            'organizer_name', (SELECT full_name FROM profiles WHERE id = NEW.requester_id),
            'organizer_email', (SELECT email FROM profiles WHERE id = NEW.requester_id),
            'event_description', NEW.event_description,
            'truck_owner_name', (SELECT full_name FROM profiles WHERE id = (SELECT owner_id FROM trucks WHERE id = NEW.truck_id))
          )
        ),
        headers := jsonb_build_object(
          'Content-Type', 'application/json',
          'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
        )
      );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_new_booking_email ON requests;
CREATE TRIGGER trigger_new_booking_email
AFTER INSERT ON requests
FOR EACH ROW
EXECUTE FUNCTION send_new_booking_email();

-- ────────────────────────────────────────────────────────────────────────────────
-- 2. REQUEST ACCEPTED EMAIL
-- Trigger when request status changes to 'accepted'
-- ────────────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION send_request_accepted_email()
RETURNS TRIGGER AS $$
BEGIN
  -- Only send if status changed to accepted
  IF NEW.status = 'accepted' AND OLD.status != 'accepted' THEN
    PERFORM
      net.http_post(
        url := 'https://your-project-id.supabase.co/functions/v1/send-notification',
        body := jsonb_build_object(
          'type', 'request_accepted',
          'recipient_email', (SELECT email FROM profiles WHERE id = NEW.requester_id),
          'recipient_name', (SELECT full_name FROM profiles WHERE id = NEW.requester_id),
          'data', jsonb_build_object(
            'event_name', NEW.event_name,
            'event_date', NEW.event_date,
            'truck_name', (SELECT name FROM trucks WHERE id = NEW.truck_id),
            'truck_owner_email', (SELECT email FROM profiles WHERE id = (SELECT owner_id FROM trucks WHERE id = NEW.truck_id)),
            'organizer_name', (SELECT full_name FROM profiles WHERE id = NEW.requester_id)
          )
        ),
        headers := jsonb_build_object(
          'Content-Type', 'application/json',
          'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
        )
      );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_request_accepted_email ON requests;
CREATE TRIGGER trigger_request_accepted_email
AFTER UPDATE ON requests
FOR EACH ROW
EXECUTE FUNCTION send_request_accepted_email();

-- ────────────────────────────────────────────────────────────────────────────────
-- 3. REQUEST DECLINED EMAIL
-- Trigger when request status changes to 'declined'
-- ────────────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION send_request_declined_email()
RETURNS TRIGGER AS $$
BEGIN
  -- Only send if status changed to declined
  IF NEW.status = 'declined' AND OLD.status != 'declined' THEN
    PERFORM
      net.http_post(
        url := 'https://your-project-id.supabase.co/functions/v1/send-notification',
        body := jsonb_build_object(
          'type', 'request_declined',
          'recipient_email', (SELECT email FROM profiles WHERE id = NEW.requester_id),
          'recipient_name', (SELECT full_name FROM profiles WHERE id = NEW.requester_id),
          'data', jsonb_build_object(
            'event_name', NEW.event_name,
            'event_date', NEW.event_date,
            'organizer_name', (SELECT full_name FROM profiles WHERE id = NEW.requester_id)
          )
        ),
        headers := jsonb_build_object(
          'Content-Type', 'application/json',
          'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
        )
      );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_request_declined_email ON requests;
CREATE TRIGGER trigger_request_declined_email
AFTER UPDATE ON requests
FOR EACH ROW
EXECUTE FUNCTION send_request_declined_email();

-- ────────────────────────────────────────────────────────────────────────────────
-- 4. NEW MESSAGE EMAIL
-- Trigger when a message is inserted
-- ────────────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION send_new_message_email()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM
    net.http_post(
      url := 'https://your-project-id.supabase.co/functions/v1/send-notification',
      body := jsonb_build_object(
        'type', 'new_message',
        'recipient_email', (SELECT email FROM profiles WHERE id = NEW.recipient_id),
        'recipient_name', (SELECT full_name FROM profiles WHERE id = NEW.recipient_id),
        'data', jsonb_build_object(
          'sender_name', (SELECT full_name FROM profiles WHERE id = NEW.sender_id),
          'event_name', COALESCE(NEW.event_name, 'ServiceWindow Message'),
          'message_preview', SUBSTRING(NEW.message_content, 1, 100),
          'recipient_name', (SELECT full_name FROM profiles WHERE id = NEW.recipient_id)
        )
      ),
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
      )
    );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_new_message_email ON messages;
CREATE TRIGGER trigger_new_message_email
AFTER INSERT ON messages
FOR EACH ROW
EXECUTE FUNCTION send_new_message_email();

-- ────────────────────────────────────────────────────────────────────────────────
-- 5. VERIFICATION APPROVED EMAIL
-- Trigger when verification_status changes to 'verified' in profiles
-- ────────────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION send_verification_approved_email()
RETURNS TRIGGER AS $$
BEGIN
  -- Only send if verification_status changed to 'verified'
  IF NEW.verification_status = 'verified' AND OLD.verification_status != 'verified' THEN
    PERFORM
      net.http_post(
        url := 'https://your-project-id.supabase.co/functions/v1/send-notification',
        body := jsonb_build_object(
          'type', 'verification_approved',
          'recipient_email', NEW.email,
          'recipient_name', NEW.full_name,
          'data', jsonb_build_object(
            'organizer_name', NEW.full_name
          )
        ),
        headers := jsonb_build_object(
          'Content-Type', 'application/json',
          'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
        )
      );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_verification_approved_email ON profiles;
CREATE TRIGGER trigger_verification_approved_email
AFTER UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION send_verification_approved_email();

-- ────────────────────────────────────────────────────────────────────────────────
-- 6. WELCOME EMAIL
-- Trigger when a new user signs up (new record in profiles table)
-- ────────────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION send_welcome_email()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM
    net.http_post(
      url := 'https://your-project-id.supabase.co/functions/v1/send-notification',
      body := jsonb_build_object(
        'type', 'welcome_email',
        'recipient_email', NEW.email,
        'recipient_name', NEW.full_name,
        'data', jsonb_build_object(
          'user_name', NEW.full_name
        )
      ),
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
      )
    );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_welcome_email ON profiles;
CREATE TRIGGER trigger_welcome_email
AFTER INSERT ON profiles
FOR EACH ROW
EXECUTE FUNCTION send_welcome_email();

-- ════════════════════════════════════════════════════════════════════════════════
-- IMPORTANT SETUP INSTRUCTIONS
-- ════════════════════════════════════════════════════════════════════════════════

-- 1. Enable the 'http' extension in Supabase:
--    Run in Supabase SQL Editor:
--    CREATE EXTENSION IF NOT EXISTS http;

-- 2. Replace 'your-project-id' in all URLs with your actual Supabase project ID
--    You can find this in Supabase project settings

-- 3. Get your Resend API Key:
--    - Sign up at https://resend.com
--    - Go to API Keys section
--    - Create a new API key
--    - Add to Supabase Edge Function secrets:
--      supabase secrets set RESEND_API_KEY your_api_key_here

-- 4. Deploy the send-notification function:
--    supabase functions deploy send-notification --no-verify-jwt

-- 5. Test the email triggers by:
--    - Creating a new request (should trigger new booking request email)
--    - Accepting a request (should trigger request accepted email)
--    - Creating a message (should trigger new message email)

-- ════════════════════════════════════════════════════════════════════════════════
