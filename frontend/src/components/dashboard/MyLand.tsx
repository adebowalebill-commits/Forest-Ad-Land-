import { useState, useEffect } from 'react';
import { MapPin, Image as ImageIcon, ExternalLink } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useTranslation } from 'react-i18next';
import ManageAdModal from './ManageAdModal';
import { api } from '../../lib/api';

export default function MyLand() {
  const { t } = useTranslation();
  const { publicKey } = useWallet();
  const [selectedPlot, setSelectedPlot] = useState<any | null>(null);
  const [myPlots, setMyPlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!publicKey) return;

    api.getProperties()
      .then((liveProperties: any[]) => {
        // Filter properties where the owner's wallet matches the connected wallet
        const owned = liveProperties.filter(
          (p) => p.users?.wallet_address === publicKey.toBase58()
        );
        // Map to expected frontend format (mocking ad status for now since the backend doesn't return ads yet)
        const formatted = owned.map(p => ({
          id: p.property_id,
          x: p.x_coord,
          y: p.y_coord,
          hasAd: false // Will be updated when Ad campaigns API is integrated
        }));
        setMyPlots(formatted);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [publicKey]);

  if (loading) {
    return <div className="text-gray-400 font-mono animate-pulse">{t('dashboard.scanning')}</div>;
  }

  if (myPlots.length === 0) {
    return (
      <div className="bg-white/5 border border-white/10 p-12 rounded-3xl text-center backdrop-blur-md">
        <MapPin size={48} className="mx-auto text-gray-600 mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">{t('dashboard.noLand')}</h3>
        <p className="text-gray-400 mb-6">{t('dashboard.getLand')}</p>
        <a href="/explore" className="inline-block px-6 py-3 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/30">
          {t('dashboard.exploreMap')}
        </a>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myPlots.map((plot) => (
          <div key={plot.id} className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md hover:bg-white/10 transition-colors flex flex-col h-full">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold flex items-center gap-2 mb-1">
                  <MapPin className="text-primary" size={20} /> Plot X:{plot.x} Y:{plot.y}
                </h3>
                <span className={`px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wider inline-block ${
                  plot.hasAd ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/20 text-gray-400'
                }`}>
                  {plot.hasAd ? t('dashboard.activeAd') : t('dashboard.dormant')}
                </span>
              </div>
            </div>

            {plot.hasAd && plot.adImageUrl ? (
              <div className="w-full h-40 rounded-xl overflow-hidden mb-6 relative group border border-white/10 bg-black flex-grow">
                <img src={plot.adImageUrl} alt="Ad" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 text-white">
                  <span className="font-bold flex items-center gap-2">{t('dashboard.viewLink')} <ExternalLink size={16} /></span>
                </div>
              </div>
            ) : (
              <div className="w-full h-40 rounded-xl mb-6 border border-white/10 bg-black/50 flex flex-col items-center justify-center text-gray-500 flex-grow">
                <ImageIcon size={32} className="mb-2 opacity-50" />
                <span className="text-sm font-medium">No Active Ad</span>
              </div>
            )}

            <button 
              onClick={() => setSelectedPlot(plot)}
              className={`w-full h-12 rounded-xl font-bold transition-all mt-auto ${
                plot.hasAd 
                  ? 'bg-white/10 hover:bg-white/20 text-white' 
                  : 'bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(var(--primary),0.2)]'
              }`}
            >
              {plot.hasAd ? 'Update Campaign' : 'Launch Campaign'}
            </button>
          </div>
        ))}
      </div>

      {selectedPlot && (
        <ManageAdModal 
          plot={selectedPlot} 
          onClose={() => setSelectedPlot(null)} 
        />
      )}
    </div>
  );
}
