// Centralized API Client for Frontend

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = {
  // --- Properties (Map Grid) ---
  
  // Fetch all properties to render on the Map Grid
  async getProperties() {
    const res = await fetch(`${API_URL}/properties`);
    if (!res.ok) throw new Error('Failed to fetch properties');
    return res.json();
  },

  // Fetch a specific property's metadata
  async getProperty(id: string) {
    const res = await fetch(`${API_URL}/properties/${id}`);
    if (!res.ok) throw new Error('Failed to fetch property details');
    return res.json();
  },

  // Authenticate Web3 Wallet
  async login(publicKey: string, signature: string, message: string) {
    const res = await fetch(`${API_URL}/auth/web3-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ publicKey, signature, message })
    });
    if (!res.ok) throw new Error('Authentication failed');
    return res.json();
  },

  // Mint a new property
  async mintProperty(token: string, x: number, y: number, type: string) {
    const res = await fetch(`${API_URL}/properties/mint`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ type, x_coord: x, y_coord: y })
    });
    if (!res.ok) throw new Error('Failed to mint property');
    return res.json();
  },

  // --- Ads ---

  // Fetch active ads for the connected user
  async getMyAds(token: string) {
    const res = await fetch(`${API_URL}/ads/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!res.ok) throw new Error('Failed to fetch user campaigns');
    return res.json();
  },

  // Create a new ad campaign
  async createAd(token: string, target_property_id: string, media_url: string, target_url: string, start_date: string, end_date: string) {
    const res = await fetch(`${API_URL}/ads/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ target_property_id, media_url, target_url, start_date, end_date })
    });
    if (!res.ok) throw new Error('Failed to create campaign');
    return res.json();
  }
};
