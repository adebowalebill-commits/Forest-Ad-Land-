import { Router } from 'express';
import { supabase } from '../config/supabaseClient';
import { verifyAuth } from './auth';

const router = Router();

// @route   GET /api/properties
// @desc    Fetch all grid data for map rendering
router.get('/', async (req, res) => {
  try {
    const { data: properties, error } = await supabase
      .from('properties')
      .select('property_id, type, x_coord, y_coord, status, users (wallet_address)');

    if (error) throw error;
    res.status(200).json(properties);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch properties', details: error.message });
  }
});

// @route   POST /api/properties/mint
// @desc    Register newly generated land to the user
router.post('/mint', verifyAuth, async (req: any, res: any) => {
  const { type, x_coord, y_coord } = req.body;
  const owner_id = req.user.id;

  if (!type || x_coord === undefined || y_coord === undefined) {
    return res.status(400).json({ error: 'Missing type, x_coord, or y_coord' });
  }

  try {
    // Basic check: is this coordinate already taken?
    const { data: existing, error: checkError } = await supabase
      .from('properties')
      .select('property_id')
      .eq('x_coord', x_coord)
      .eq('y_coord', y_coord)
      .single();

    if (existing) {
      return res.status(400).json({ error: 'A property already exists at these coordinates' });
    }
    // PGRST116 means no rows returned, which is what we want.
    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError;
    }

    // Insert new property
    const { data: newProperty, error: insertError } = await supabase
      .from('properties')
      .insert([{ owner_id, type, x_coord, y_coord, status: 'Owned' }])
      .select()
      .single();

    if (insertError) throw insertError;
    res.status(201).json({ message: 'Property minted successfully', property: newProperty });

  } catch (error: any) {
    res.status(500).json({ error: 'Failed to mint property', details: error.message });
  }
});

// @route   GET /api/properties/:id
// @desc    Fetch specific property metadata
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { data: property, error } = await supabase
      .from('properties')
      .select(`
        *,
        users (wallet_address)
      `)
      .eq('property_id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Property not found' });
      }
      throw error;
    }
    res.status(200).json(property);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch property metadata', details: error.message });
  }
});

export default router;
