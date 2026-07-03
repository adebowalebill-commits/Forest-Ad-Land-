import { Router } from 'express';
import { supabase } from '../config/supabaseClient';
import nacl from 'tweetnacl';
import bs58 from 'bs58';
import jwt from 'jsonwebtoken';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

// @route   POST /api/auth/web3-login
// @desc    Verify wallet signature and login/register
router.post('/web3-login', async (req, res) => {
  const { publicKey, signature, message } = req.body;

  if (!publicKey || !signature || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const signatureUint8 = Buffer.from(signature, 'base64');
    const messageUint8 = Buffer.from(message, 'base64');
    const pubKeyUint8 = bs58.decode(publicKey);

    const isValid = nacl.sign.detached.verify(messageUint8, signatureUint8, pubKeyUint8);

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid signature' });
    }

    // Check if user exists in public.users
    let { data: user, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('wallet_address', publicKey)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      // PGRST116 means no rows returned
      return res.status(500).json({ error: 'Database error', details: fetchError.message });
    }

    // If user doesn't exist, create one
    if (!user) {
       // Since the schema has a Foreign Key constraint to auth.users, inserting directly will fail
       // unless we drop the FK or use the Supabase Admin API.
       // Assuming we drop the FK constraint for the MVP so we can support pure web3 auth without email:
       const { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert([{ wallet_address: publicKey }])
        .select()
        .single();
        
       if (insertError) {
         return res.status(500).json({ error: 'Error creating user (Ensure FK constraint on auth.users is dropped or handled)', details: insertError.message });
       }
       user = newUser;
    }

    // Generate custom JWT
    const token = jwt.sign(
      { id: user.id, wallet_address: user.wallet_address, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user
    });

  } catch (error: any) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// Middleware to verify JWT for protected routes
export const verifyAuth = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// @route   GET /api/auth/profile
// @desc    Get user profile (Protected)
router.get('/profile', verifyAuth, async (req: any, res: any) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('wallet_address', req.user.wallet_address)
      .single();

    if (error) throw error;
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ error: 'Error fetching profile', details: error.message });
  }
});

export default router;
