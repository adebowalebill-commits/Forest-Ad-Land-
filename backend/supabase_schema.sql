-- Forest Ad Land Supabase Schema

-- Create custom enum for roles
CREATE TYPE user_role AS ENUM ('standard', 'early_supporter', 'business', 'admin');

-- Users Table
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  wallet_address TEXT UNIQUE,
  email TEXT UNIQUE,
  role user_role DEFAULT 'standard',
  is_early_supporter BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Properties Table
CREATE TABLE public.properties (
  property_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID REFERENCES public.users(id),
  type TEXT NOT NULL, -- e.g. 'Regular', 'Premium', 'Billboard'
  x_coord INT NOT NULL,
  y_coord INT NOT NULL,
  status TEXT DEFAULT 'Available',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Ad Campaigns Table
CREATE TABLE public.ad_campaigns (
  campaign_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID REFERENCES public.users(id),
  target_property_id UUID REFERENCES public.properties(property_id),
  media_url TEXT NOT NULL,
  status TEXT DEFAULT 'Active',
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Listings (Marketplace) Table
CREATE TABLE public.listings (
  listing_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID REFERENCES public.properties(property_id),
  seller_id UUID REFERENCES public.users(id),
  price NUMERIC NOT NULL,
  currency TEXT NOT NULL, -- 'FIAT' or 'SPL'
  status TEXT DEFAULT 'Active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Transactions Table
CREATE TABLE public.transactions (
  tx_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id),
  amount NUMERIC NOT NULL,
  currency TEXT NOT NULL,
  type TEXT NOT NULL, -- 'Purchase', 'Reward', 'Fee'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add Row Level Security (RLS) policies here as needed
