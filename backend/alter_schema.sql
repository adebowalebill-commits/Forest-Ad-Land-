-- Drop the foreign key constraint that requires users to exist in auth.users first
ALTER TABLE public.users DROP CONSTRAINT users_id_fkey;

-- If you want to change the id column to auto-generate UUIDs for new web3 users:
ALTER TABLE public.users ALTER COLUMN id SET DEFAULT gen_random_uuid();
