import { LayoutDashboard, Coins, Activity, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useWallet } from '@solana/wallet-adapter-react';
import { useState, useEffect } from 'react';
import { api } from '../../lib/api';

export default function DashboardOverview() {
  const { t } = useTranslation();
  const { publicKey } = useWallet();
  const [plotsOwned, setPlotsOwned] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      if (!publicKey) {
        setPlotsOwned(0);
        setLoading(false);
        return;
      }
      
      try {
        const properties = await api.getProperties();
        const userAddress = publicKey.toBase58();
        // Filter properties where the associated user's wallet_address matches the connected wallet
        const userPlots = properties.filter((p: any) => p.users?.wallet_address === userAddress);
        setPlotsOwned(userPlots.length);
      } catch (error) {
        console.error('Failed to fetch user properties:', error);
        setPlotsOwned(0);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [publicKey]);

  // Currently, active campaigns and rewards don't have backend tables yet, so we initialize to 0.
  const activeCampaigns = 0;
  const totalRewards = 0;
  const recentActivity: any[] = []; // Empty for now until backend supports activity logs

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-50"></div>
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <LayoutDashboard size={100} className="text-blue-500" />
          </div>
          <h3 className="text-gray-400 font-medium mb-2 uppercase tracking-wider text-xs relative z-10">{t('dashboard.totalPlots')}</h3>
          <p className="text-4xl font-black text-white mb-2 relative z-10">
            {loading ? '...' : plotsOwned}
          </p>
          <div className="text-sm text-gray-400 font-medium bg-white/5 inline-block px-2 py-1 rounded-md relative z-10">
            {plotsOwned === 0 ? 'No plots yet' : 'Total owned'}
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-50"></div>
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <TrendingUp size={100} className="text-purple-500" />
          </div>
          <h3 className="text-gray-400 font-medium mb-2 uppercase tracking-wider text-xs relative z-10">{t('dashboard.activeCampaigns')}</h3>
          <p className="text-4xl font-black text-white mb-2 relative z-10">{activeCampaigns}</p>
          <div className="text-sm text-gray-400 font-medium bg-white/5 inline-block px-2 py-1 rounded-md relative z-10">
            None running
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50"></div>
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Coins size={100} className="text-primary" />
          </div>
          <h3 className="text-gray-400 font-medium mb-2 uppercase tracking-wider text-xs relative z-10">{t('dashboard.totalRewards')}</h3>
          <p className="text-4xl font-black text-primary mb-2 relative z-10">{totalRewards} $FL</p>
          <div className="text-sm text-gray-400 font-medium bg-white/5 inline-block px-2 py-1 rounded-md relative z-10">
            ~$0 USD
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Activity className="text-primary" /> {t('dashboard.recentActivity')}
        </h3>
        
        {recentActivity.length > 0 ? (
          <div className="space-y-6">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between pb-6 border-b border-white/5 last:border-0 last:pb-0">
                <div>
                  <p className="font-bold text-white text-lg">{activity.action}</p>
                  <p className={`font-mono text-sm ${activity.color}`}>{activity.target}</p>
                </div>
                <span className="text-gray-500 text-sm font-medium">{activity.time}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No recent activity found for your wallet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
