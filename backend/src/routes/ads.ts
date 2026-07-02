import { Router } from 'express';
import { supabase } from '../config/supabaseClient';
import { verifyAuth } from './auth';
import multer from 'multer';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// @route   POST /api/ads/upload
// @desc    Upload creative asset to Supabase Storage
router.post('/upload', verifyAuth, upload.single('creative'), async (req: any, res: any) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const fileExt = req.file.originalname.split('.').pop();
    const fileName = `${req.user.id}-${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('ad_creatives') // Note: this bucket must be created in Supabase
      .upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype,
      });

    if (error) throw error;

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('ad_creatives')
      .getPublicUrl(fileName);

    res.status(200).json({ url: publicUrlData.publicUrl });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to upload creative', details: error.message });
  }
});

// @route   POST /api/ads/create
// @desc    Create campaign and link to property
router.post('/create', verifyAuth, async (req: any, res: any) => {
  const { target_property_id, media_url, start_date, end_date } = req.body;
  const business_id = req.user.id;

  if (!target_property_id || !media_url || !start_date || !end_date) {
    return res.status(400).json({ error: 'Missing required campaign fields' });
  }

  try {
    const { data: campaign, error } = await supabase
      .from('ad_campaigns')
      .insert([{
        business_id,
        target_property_id,
        media_url,
        start_date,
        end_date,
        status: 'Active'
      }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ message: 'Campaign created successfully', campaign });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to create campaign', details: error.message });
  }
});

// @route   GET /api/ads/active
// @desc    Fetch currently active ads for map rendering
router.get('/active', async (req, res) => {
  try {
    const now = new Date().toISOString();

    const { data: ads, error } = await supabase
      .from('ad_campaigns')
      .select(`
        campaign_id,
        media_url,
        target_property_id,
        properties (x_coord, y_coord)
      `)
      .eq('status', 'Active')
      .lte('start_date', now)
      .gte('end_date', now);

    if (error) throw error;

    res.status(200).json(ads);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch active ads', details: error.message });
  }
});

// @route   POST /api/ads/click
// @desc    Track ad engagement/impressions (Placeholder for analytics tracking)
router.post('/click', async (req, res) => {
  const { campaign_id } = req.body;
  res.status(200).json({ message: `Click tracked for campaign ${campaign_id}` });
});

export default router;
