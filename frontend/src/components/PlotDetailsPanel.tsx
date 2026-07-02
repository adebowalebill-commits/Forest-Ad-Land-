import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { MapPin, User, Tag, Image as ImageIcon, Link as LinkIcon, ExternalLink, X, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { PlotData } from '../pages/Explore';

interface PlotDetailsPanelProps {
  plot: PlotData | null;
  onClose: () => void;
  onPlotUpdated?: () => void;
}

export default function PlotDetailsPanel({ plot, onClose, onPlotUpdated }: PlotDetailsPanelProps) {
  const { connected, publicKey, signMessage } = useWallet();
  const { setVisible } = useWalletModal();
  const [isMinting, setIsMinting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  const handleAcquire = async () => {
    if (!connected || !publicKey || !signMessage) {
      setVisible(true);
      return;
    }

    try {
      setIsMinting(true);
      setError(null);
      
      let token = localStorage.getItem('auth_token');
      if (!token) {
        const message = new TextEncoder().encode(`Sign this message to authenticate with Forest Ad Land: ${Date.now()}`);
        const signature = await signMessage(message);
        
        const authRes = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/auth/verify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            publicKey: publicKey.toString(),
            signature: Buffer.from(signature).toString('base64'),
            message: Buffer.from(message).toString('base64')
          })
        });

        if (!authRes.ok) throw new Error("Authentication failed");
        const data = await authRes.json();
        token = data.token;
        if(token) localStorage.setItem('auth_token', token);
      }

      await new Promise(resolve => setTimeout(resolve, 1500));

      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/plots/${plot?.id}/acquire`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          txSignature: 'simulated_tx_sig_' + Date.now()
        })
      });

      if (!res.ok) {
        throw new Error("Failed to acquire plot. It might be taken.");
      }

      if (onPlotUpdated) {
        onPlotUpdated();
      }
      onClose();
      
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred");
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <AnimatePresence>
      {plot && (
        <motion.div 
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          className="absolute top-4 right-4 w-[380px] bg-[#1a1a1a]/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl z-20 flex flex-col max-h-[calc(100vh-2rem)] overflow-y-auto"
        >
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
                <MapPin className="text-primary" size={24} /> 
                {t('plotDetails.title')}
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <div className="bg-white/10 px-3 py-1 rounded-full text-sm font-mono font-medium text-white shadow-inner">
                  X: {plot.x} <span className="text-gray-500 mx-1">|</span> Y: {plot.y}
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${plot.status === 'available' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'}`}>
                  {plot.status === 'available' ? t('plotDetails.available') : t('plotDetails.occupied')}
                </div>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-6">
            
            {plot.status === 'available' ? (
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center px-2">
                  <span className="text-gray-400">{t('plotDetails.price')}</span>
                  <span className="text-2xl font-bold text-primary">{plot.price || 10} $FL</span>
                </div>
                <button 
                  onClick={handleAcquire}
                  disabled={isMinting}
                  className="w-full bg-primary hover:brightness-110 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-primary/20 flex justify-center items-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isMinting ? t('plotDetails.minting') : t('plotDetails.acquirePlot')}
                </button>
                {error && <p className="text-red-400 text-sm text-center">{error}</p>}
              </div>
            ) : (
              <div className="space-y-6">
                
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <User size={14} /> {t('plotDetails.landowner')}
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-500" />
                    <p className="text-white font-mono text-sm truncate pr-4">
                      {plot.owner ? `${plot.owner.slice(0,4)}...${plot.owner.slice(-4)}` : 'Unknown'}
                    </p>
                  </div>
                </div>

                {(plot.adImageUrl || plot.adLinkUrl) && (
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5 space-y-4">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                      <Tag size={14} /> {t('plotDetails.activeAdvertisement')}
                    </h3>
                    
                    {plot.adImageUrl && (
                      <div className="space-y-2">
                         <span className="text-xs text-gray-400 flex items-center gap-1"><ImageIcon size={12}/> {t('plotDetails.creativePreview')}</span>
                         <div className="w-full h-32 rounded-lg bg-black overflow-hidden border border-white/10 relative group">
                            <img src={plot.adImageUrl} alt="Plot Ad" className="w-full h-full object-cover group-hover:opacity-50 transition-opacity" />
                            <a href={plot.adImageUrl} target="_blank" rel="noreferrer" className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <ExternalLink className="text-white drop-shadow-md" />
                            </a>
                         </div>
                      </div>
                    )}

                    {plot.adLinkUrl && (
                      <div className="space-y-2 pt-2">
                        <span className="text-xs text-gray-400 flex items-center gap-1"><LinkIcon size={12}/> {t('plotDetails.destinationLink')}</span>
                        <a 
                          href={plot.adLinkUrl.startsWith('http') ? plot.adLinkUrl : `https://${plot.adLinkUrl}`}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 w-full p-3 bg-black/40 hover:bg-black/60 rounded-xl border border-white/5 transition-colors text-sm text-blue-400 truncate"
                        >
                          <Navigation size={14} className="shrink-0" />
                          <span className="truncate">{plot.adLinkUrl}</span>
                        </a>
                      </div>
                    )}
                  </div>
                )}
                
                <button onClick={() => alert(t('plotDetails.offerComingSoon'))} className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-6 rounded-xl transition-all border border-white/10">
                  {t('plotDetails.makeOffer')}
                </button>
              </div>
            )}
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
