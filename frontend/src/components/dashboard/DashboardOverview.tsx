import { LayoutDashboard, Coins, Activity, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function DashboardOverview() {
  const { t } = useTranslation();

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
          <p className="text-4xl font-black text-white mb-2 relative z-10">4</p>
          <div className="text-sm text-green-400 font-bold bg-green-500/10 inline-block px-2 py-1 rounded-md relative z-10">
            +2 this week
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-50"></div>
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <TrendingUp size={100} className="text-purple-500" />
          </div>
          <h3 className="text-gray-400 font-medium mb-2 uppercase tracking-wider text-xs relative z-10">{t('dashboard.activeCampaigns')}</h3>
          <p className="text-4xl font-black text-white mb-2 relative z-10">2</p>
          <div className="text-sm text-blue-400 font-bold bg-blue-500/10 inline-block px-2 py-1 rounded-md relative z-10">
            Running globally
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50"></div>
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Coins size={100} className="text-primary" />
          </div>
          <h3 className="text-gray-400 font-medium mb-2 uppercase tracking-wider text-xs relative z-10">{t('dashboard.totalRewards')}</h3>
          <p className="text-4xl font-black text-primary mb-2 relative z-10">425 $FL</p>
          <div className="text-sm text-primary font-bold bg-primary/20 inline-block px-2 py-1 rounded-md relative z-10">
            ~$6,400 USD
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Activity className="text-primary" /> {t('dashboard.recentActivity')}
        </h3>
        
        <div className="space-y-6">
          {[
            { id: 1, action: "Ad Campaign Deployed", target: "Plot X:12 Y:4", time: "2 hours ago", color: "text-blue-400" },
            { id: 2, action: "Ecosystem Reward Claimed", target: "12 $FL", time: "1 day ago", color: "text-primary" },
            { id: 3, action: "Plot Acquired", target: "Plot X:18 Y:2", time: "3 days ago", color: "text-green-400" },
          ].map((activity) => (
            <div key={activity.id} className="flex items-center justify-between pb-6 border-b border-white/5 last:border-0 last:pb-0">
              <div>
                <p className="font-bold text-white text-lg">{activity.action}</p>
                <p className={`font-mono text-sm ${activity.color}`}>{activity.target}</p>
              </div>
              <span className="text-gray-500 text-sm font-medium">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
