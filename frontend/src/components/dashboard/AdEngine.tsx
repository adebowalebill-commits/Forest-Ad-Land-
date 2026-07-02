import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Megaphone, Target, Link as LinkIcon, Image as ImageIcon, Calendar, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { api } from '../../lib/api';

export default function AdEngine() {
  const { publicKey } = useWallet();
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [selectedProperty, setSelectedProperty] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [targetUrl, setTargetUrl] = useState('');
  const [duration, setDuration] = useState('7'); // days

  useEffect(() => {
    async function fetchUserProperties() {
      if (!publicKey) return;
      try {
        const allProperties = await api.getProperties();
        const userAddress = publicKey.toBase58();
        const userPlots = allProperties.filter((p: any) => p.users?.wallet_address === userAddress);
        setProperties(userPlots);
        if (userPlots.length > 0) {
          setSelectedProperty(userPlots[0].property_id);
        }
      } catch (err) {
        console.error('Error fetching properties for ads:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchUserProperties();
  }, [publicKey]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    
    if (!selectedProperty || !mediaUrl || !targetUrl) {
      setError("Please fill out all required fields.");
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error("Not authenticated. Please connect wallet.");

      const startDate = new Date().toISOString();
      const endDate = new Date(Date.now() + parseInt(duration) * 24 * 60 * 60 * 1000).toISOString();

      await api.createAd(token, selectedProperty, mediaUrl, targetUrl, startDate, endDate);
      
      setSuccess(true);
      setMediaUrl('');
      setTargetUrl('');
    } catch (err: any) {
      setError(err.message || "Failed to deploy campaign");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-400">Loading your properties...</div>;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Megaphone size={200} className="text-primary" />
        </div>
        
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-3 relative z-10">
          <Megaphone className="text-primary" /> Deploy Ad Campaign
        </h2>
        <p className="text-gray-400 mb-8 relative z-10 max-w-2xl">
          Turn your digital land into a billboard. Enter your creative asset and target link, and your advertisement will go live on your property across the Forest Ad Land network.
        </p>

        {properties.length === 0 ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 flex items-center gap-4 relative z-10">
            <AlertCircle className="text-red-400 w-8 h-8 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-red-400">No Properties Owned</h3>
              <p className="text-red-400/80 text-sm">You need to own at least one property to run an ad campaign. Head to the Explorer to acquire land.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="relative z-10 space-y-6 max-w-3xl">
            
            {/* Target Property */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-300 flex items-center gap-2">
                <Target size={16} className="text-primary" /> Target Property
              </label>
              <select 
                value={selectedProperty}
                onChange={(e) => setSelectedProperty(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              >
                {properties.map(p => (
                  <option key={p.property_id} value={p.property_id}>
                    {p.type.charAt(0).toUpperCase() + p.type.slice(1)} Plot at [X: {p.x_coord}, Y: {p.y_coord}]
                  </option>
                ))}
              </select>
            </div>

            {/* Media URL */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-300 flex items-center gap-2">
                <ImageIcon size={16} className="text-primary" /> Creative Image URL
              </label>
              <input 
                type="url" 
                placeholder="https://example.com/my-ad-banner.png"
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-600"
                required
              />
            </div>

            {/* Target URL */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-300 flex items-center gap-2">
                <LinkIcon size={16} className="text-primary" /> Target Destination URL
              </label>
              <input 
                type="url" 
                placeholder="https://yourwebsite.com"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-600"
                required
              />
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-300 flex items-center gap-2">
                <Calendar size={16} className="text-primary" /> Campaign Duration
              </label>
              <select 
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              >
                <option value="1">1 Day Test Run</option>
                <option value="7">7 Days (Standard)</option>
                <option value="30">30 Days (Monthly)</option>
              </select>
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-medium">
                {error}
              </div>
            )}

            {success && (
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm font-medium flex items-center gap-2">
                <CheckCircle2 size={18} />
                Campaign successfully deployed and is now live!
              </div>
            )}

            <button 
              type="submit"
              disabled={submitting}
              className="w-full h-14 rounded-full bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-all shadow-[0_0_30px_rgba(var(--primary),0.3)] hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {submitting ? (
                <><Loader2 className="animate-spin" /> Deploying Campaign...</>
              ) : (
                'Launch Campaign'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
