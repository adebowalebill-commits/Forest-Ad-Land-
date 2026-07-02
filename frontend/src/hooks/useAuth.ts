import { useState, useCallback, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import { api } from '../lib/api';

export function useAuth() {
  const { publicKey, signMessage } = useWallet();
  const [token, setToken] = useState<string | null>(localStorage.getItem('auth_token'));
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-clear token if wallet disconnects
  useEffect(() => {
    if (!publicKey) {
      setToken(null);
      localStorage.removeItem('auth_token');
    }
  }, [publicKey]);

  const authenticate = useCallback(async () => {
    if (!publicKey) {
      setError('Wallet not connected');
      return false;
    }
    if (!signMessage) {
      setError('Wallet does not support message signing!');
      return false;
    }

    try {
      setIsAuthenticating(true);
      setError(null);

      const message = `Sign this message to authenticate with Forest Ad Land.\nTimestamp: ${Date.now()}`;
      const messageBytes = new TextEncoder().encode(message);
      
      const signatureBytes = await signMessage(messageBytes);
      const signature = bs58.encode(signatureBytes);

      const response = await api.login(publicKey.toBase58(), signature, message);
      
      setToken(response.token);
      localStorage.setItem('auth_token', response.token);
      
      return true;
    } catch (err: any) {
      console.error('Authentication error:', err);
      setError(err.message || 'Failed to authenticate');
      return false;
    } finally {
      setIsAuthenticating(false);
    }
  }, [publicKey, signMessage]);

  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem('auth_token');
  }, []);

  return {
    token,
    isAuthenticated: !!token,
    isAuthenticating,
    error,
    authenticate,
    logout
  };
}
