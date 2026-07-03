import { Router } from 'express';
import { supabase } from '../config/supabaseClient';
import { verifyAuth } from './auth';

const router = Router();

// DexScreener helper
async function getFlPriceUsd() {
  try {
    const res = await fetch('https://api.dexscreener.com/latest/dex/tokens/2iqdyuBEtNeR15PtmuWAZBorK1hEmWhYnpY71j42pump');
    const data = await res.json();
    return parseFloat(data.pairs[0].priceUsd);
  } catch (err) {
    console.error('DexScreener API error:', err);
    return 0.000006; // fallback price
  }
}

function calculatePlotPrice(x: number, y: number) {
  // Returns a value between 5 and 30 consistently based on coordinates
  return 5 + ((Math.abs(x) * Math.abs(y)) % 26);
}

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

// @route   GET /api/properties/:id/price
// @desc    Fetch dynamic $FL price for a specific property
router.get('/:id/price', async (req, res) => {
  try {
    const { id } = req.params;
    let x, y;
    
    if (id.startsWith('temp-')) {
      const parts = id.split('-');
      x = parseInt(parts[1], 10);
      y = parseInt(parts[2], 10);
    } else {
      const { data: property, error } = await supabase.from('properties').select('x_coord, y_coord').eq('property_id', id).single();
      if (error || !property) return res.status(404).json({ error: 'Property not found' });
      x = property.x_coord;
      y = property.y_coord;
    }
    
    const baseUsd = calculatePlotPrice(x, y);
    const flPriceUsd = await getFlPriceUsd();
    const flAmount = Math.ceil(baseUsd / flPriceUsd);
    
    res.json({ baseUsd, flPriceUsd, flAmount });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// @route   POST /api/properties/:id/acquire
// @desc    Acquire property with verified Solana transaction
router.post('/:id/acquire', verifyAuth, async (req: any, res: any) => {
  const { id } = req.params;
  const { txSignature } = req.body;
  const owner_id = req.user.id;

  if (!txSignature) return res.status(400).json({ error: 'Missing transaction signature' });

  try {
    let x, y;
    let existingProp = false;

    if (id.startsWith('temp-')) {
      const parts = id.split('-');
      x = parseInt(parts[1], 10);
      y = parseInt(parts[2], 10);
      
      // Double check if someone minted it since the user opened the panel
      const { data: checkProp } = await supabase.from('properties').select('status').eq('x_coord', x).eq('y_coord', y).single();
      if (checkProp && checkProp.status === 'Owned') {
        return res.status(400).json({ error: 'Property already acquired by someone else' });
      }
    } else {
      // 1. Get Property
      const { data: property, error: propError } = await supabase
        .from('properties')
        .select('x_coord, y_coord, status')
        .eq('property_id', id)
        .single();

      if (propError || !property) return res.status(404).json({ error: 'Property not found' });
      if (property.status === 'Owned') return res.status(400).json({ error: 'Property already owned' });
      x = property.x_coord;
      y = property.y_coord;
      existingProp = true;
    }

    // 2. Calculate Expected Price
    const baseUsd = calculatePlotPrice(x, y);
    const flPriceUsd = await getFlPriceUsd();
    const expectedFlAmount = Math.ceil(baseUsd / flPriceUsd);
    // Allow 5% slippage on backend due to price fluctuations between frontend fetch and tx inclusion
    const minExpectedFlAmount = expectedFlAmount * 0.95;

    // 3. Verify Transaction on Mainnet via direct RPC fetch to avoid web3.js ESM crash on Vercel
    const rpcRes = await fetch('https://api.mainnet-beta.solana.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getTransaction',
        params: [txSignature, { encoding: 'jsonParsed', maxSupportedTransactionVersion: 0 }]
      })
    });
    
    const rpcData = await rpcRes.json();
    const tx = rpcData.result;

    if (!tx || !tx.meta) {
      return res.status(400).json({ error: 'Transaction not found or unconfirmed' });
    }

    const treasuryWallet = process.env.TREASURY_WALLET;
    const tokenMint = process.env.TOKEN_MINT || '2iqdyuBEtNeR15PtmuWAZBorK1hEmWhYnpY71j42pump';

    if (!treasuryWallet) throw new Error('TREASURY_WALLET env not set on backend');

    // Check pre/post token balances for the treasury wallet
    const preBalances = tx.meta.preTokenBalances || [];
    const postBalances = tx.meta.postTokenBalances || [];

    const treasuryPre = preBalances.find((b: any) => b.owner === treasuryWallet && b.mint === tokenMint);
    const treasuryPost = postBalances.find((b: any) => b.owner === treasuryWallet && b.mint === tokenMint);

    const preAmount = treasuryPre ? Number(treasuryPre.uiTokenAmount.amount) : 0;
    const postAmount = treasuryPost ? Number(treasuryPost.uiTokenAmount.amount) : 0;

    // amount is in raw units (6 decimals). To compare with expectedFlAmount, we compare UI amount.
    const uiAmountTransferred = (postAmount - preAmount) / 1_000_000;

    if (uiAmountTransferred < minExpectedFlAmount) {
      return res.status(400).json({ error: `Insufficient funds transferred. Expected at least ${minExpectedFlAmount} $FL, got ${uiAmountTransferred}` });
    }

    // 4. Mark Property as Owned
    let updatedProperty;
    if (existingProp) {
      const { data, error: updateError } = await supabase
        .from('properties')
        .update({ owner_id, status: 'Owned' })
        .eq('property_id', id)
        .select()
        .single();
      if (updateError) throw updateError;
      updatedProperty = data;
    } else {
      const { data, error: insertError } = await supabase
        .from('properties')
        .insert([{ owner_id, type: 'standard', x_coord: x, y_coord: y, status: 'Owned' }])
        .select()
        .single();
      if (insertError) throw insertError;
      updatedProperty = data;
    }

    res.status(200).json({ message: 'Property acquired successfully', property: updatedProperty });

  } catch (error: any) {
    console.error('Acquisition error:', error);
    res.status(500).json({ error: 'Failed to process acquisition', details: error.message });
  }
});

export default router;
