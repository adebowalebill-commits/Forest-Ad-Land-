-- Drop the foreign key constraint that requires users to exist in auth.users first
ALTER TABLE public.users DROP CONSTRAINT users_id_fkey;

-- If you want to change the id column to auto-generate UUIDs for new web3 users:
ALTER TABLE public.users ALTER COLUMN id SET DEFAULT gen_random_uuid();

-- Create Ad Campaigns table
CREATE TABLE IF NOT EXISTS public.ad_campaigns (
  campaign_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  target_property_id UUID REFERENCES public.properties(property_id) ON DELETE CASCADE,
  media_url TEXT NOT NULL,
  target_url TEXT NOT NULL,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT DEFAULT 'Active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);
