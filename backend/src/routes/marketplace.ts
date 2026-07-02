import { Router } from 'express';
import { supabase } from '../config/supabaseClient';
import { verifyAuth } from './auth';

const router = Router();

// @route   GET /api/marketplace/listings
// @desc    Fetch active properties for sale
router.get('/listings', async (req, res) => {
  try {
    const { data: listings, error } = await supabase
      .from('listings')
      .select(`
        listing_id, price, currency, status,
        properties (property_id, type, x_coord, y_coord),
        users (wallet_address)
      `)
      .eq('status', 'Active');

    if (error) throw error;
    res.status(200).json(listings);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch listings', details: error.message });
  }
});

// @route   POST /api/marketplace/list
// @desc    List a property for sale
router.post('/list', verifyAuth, async (req: any, res: any) => {
  const { property_id, price, currency } = req.body;
  const seller_id = req.user.id;

  if (!property_id || !price || !currency) {
    return res.status(400).json({ error: 'Missing required listing fields' });
  }

  try {
    // Check if user owns the property
    const { data: property, error: propError } = await supabase
      .from('properties')
      .select('owner_id')
      .eq('property_id', property_id)
      .single();

    if (propError || !property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    if (property.owner_id !== seller_id) {
      return res.status(403).json({ error: 'You do not own this property' });
    }

    // Insert listing
    const { data: listing, error: listError } = await supabase
      .from('listings')
      .insert([{ property_id, seller_id, price, currency, status: 'Active' }])
      .select()
      .single();

    if (listError) throw listError;

    res.status(201).json({ message: 'Property listed successfully', listing });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to list property', details: error.message });
  }
});

// @route   POST /api/marketplace/buy
// @desc    Execute transaction off-chain/initiate escrow (placeholder logic)
router.post('/buy', verifyAuth, async (req: any, res: any) => {
  const { listing_id } = req.body;
  const buyer_id = req.user.id;

  if (!listing_id) return res.status(400).json({ error: 'Missing listing_id' });

  try {
    // 1. Fetch listing
    const { data: listing, error: fetchError } = await supabase
      .from('listings')
      .select('*')
      .eq('listing_id', listing_id)
      .single();

    if (fetchError || !listing) return res.status(404).json({ error: 'Listing not found' });
    if (listing.status !== 'Active') return res.status(400).json({ error: 'Listing is no longer active' });

    // 2. Here we would verify payment (Stripe/Solana). For MVP logic, assume payment succeeded.
    // We update the property owner, create a transaction record, and close the listing.
    
    // Create transaction record
    await supabase.from('transactions').insert([{
      user_id: buyer_id, amount: listing.price, currency: listing.currency, type: 'Purchase'
    }]);

    // Update Property ownership
    await supabase.from('properties')
      .update({ owner_id: buyer_id })
      .eq('property_id', listing.property_id);

    // Close Listing
    await supabase.from('listings')
      .update({ status: 'Sold' })
      .eq('listing_id', listing_id);

    res.status(200).json({ message: 'Property purchased successfully' });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to process purchase', details: error.message });
  }
});

export default router;
