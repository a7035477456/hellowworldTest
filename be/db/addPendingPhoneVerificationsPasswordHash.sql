-- Add missing password_hash column to pending_phone_verifications (if table existed without it).
-- Run if you see: column "password_hash" of relation "pending_phone_verifications" does not exist
ALTER TABLE public.pending_phone_verifications
  ADD COLUMN IF NOT EXISTS password_hash character varying(255);

-- Remove password_plain if present (app uses only password_hash; do not store plain-text passwords).
-- Run if you see: null value in column "password_plain" of relation "pending_phone_verifications" violates not-null constraint
ALTER TABLE public.pending_phone_verifications
  DROP COLUMN IF EXISTS password_plain;

-- Add used_at if missing (required by verifyPhone / resendPhoneCode / createPassword).
-- Run if you see: column "used_at" does not exist
ALTER TABLE public.pending_phone_verifications
  ADD COLUMN IF NOT EXISTS used_at timestamp with time zone;
