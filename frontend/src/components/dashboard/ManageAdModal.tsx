import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Link as LinkIcon, MapPin } from 'lucide-react';

interface ManageAdModalProps {
  plot: { id: string; x: number; y: number; hasAd: boolean; adImageUrl?: string; adLink?: string };
  onClose: () => void;
}

export default function ManageAdModal({ plot, onClose }: ManageAdModalProps) {
  const [imageUrl, setImageUrl] = useState(plot.adImageUrl || '');
  const [linkUrl, setLinkUrl] = useState(plot.adLink || '');
  const [isDeploying, setIsDeploying] = useState(false);

  const handleDeploy = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDeploying(true);
    // Mock deployment delay
    setTimeout(() => {
      setIsDeploying(false);
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          className="bg-[#111] border border-white/10 p-8 rounded-3xl max-w-lg w-full shadow-2xl relative"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={16} />
          </button>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              Launch Campaign
            </h2>
            <p className="text-gray-400 flex items-center gap-2 font-mono bg-white/5 inline-flex px-3 py-1 rounded-lg">
              <MapPin size={16} className="text-primary" /> Target: Plot X:{plot.x} Y:{plot.y}
            </p>
          </div>

          <form onSubmit={handleDeploy} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <Upload size={16} /> Image URL (Creative)
              </label>
              <input 
                type="url" 
                required
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/my-ad.jpg"
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
              <p className="text-xs text-gray-500 mt-2">Provides the visual creative that will be rendered on the Map Grid.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <LinkIcon size={16} /> Destination URL
              </label>
              <input 
                type="url" 
                required
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://mywebsite.com"
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
              <p className="text-xs text-gray-500 mt-2">Where users will be redirected when they click your ad on the grid.</p>
            </div>

            <button 
              type="submit"
              disabled={isDeploying}
              className="w-full h-14 rounded-xl bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-all shadow-[0_0_30px_rgba(var(--primary),0.3)] hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {isDeploying ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Deploying to Grid...
                </>
              ) : (
                'Deploy Campaign'
              )}
            </button>
          </form>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
