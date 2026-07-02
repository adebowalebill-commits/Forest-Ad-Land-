import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { Lock, LayoutDashboard, Map as MapIcon } from 'lucide-react';
import Navbar from '../components/Navbar';
import DashboardOverview from '../components/dashboard/DashboardOverview';
import MyLand from '../components/dashboard/MyLand';

export default function Dashboard() {
  const { connected } = useWallet();
  const { setVisible } = useWalletModal();
  const [activeTab, setActiveTab] = useState<'overview' | 'myland'>('overview');

  return (
    <div className="bg-darkbg min-h-screen text-white font-sans selection:bg-primary/20 flex flex-col pt-24 relative overflow-hidden">
      <Navbar />

      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      {!connected ? (
        <main className="flex-grow flex flex-col items-center justify-center p-6 pb-32">
          <div className="bg-white/5 border border-white/10 p-12 rounded-3xl max-w-md w-full text-center backdrop-blur-xl shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-50"></div>
            <Lock className="w-16 h-16 text-primary mx-auto mb-6 relative z-10" />
            <h1 className="text-3xl font-bold mb-4 relative z-10">Secured Area</h1>
            <p className="text-gray-400 mb-8 relative z-10">
              Please connect your Solana wallet to access your private Dashboard and manage your digital real estate.
            </p>
            <button 
              onClick={() => setVisible(true)}
              className="w-full h-14 rounded-full bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-all shadow-[0_0_30px_rgba(var(--primary),0.3)] hover:scale-[1.02] relative z-10"
            >
              Connect Wallet
            </button>
          </div>
        </main>
      ) : (
        <main className="flex-grow max-w-[1200px] mx-auto w-full p-6 pb-20">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
            <h1 className="text-4xl font-bold tracking-tight">Control Center</h1>
            
            {/* Tabs */}
            <div className="flex bg-white/5 p-1.5 rounded-full border border-white/10">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                  activeTab === 'overview' ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-white'
                }`}
              >
                <LayoutDashboard size={18} /> Overview
              </button>
              <button 
                onClick={() => setActiveTab('myland')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                  activeTab === 'myland' ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-white'
                }`}
              >
                <MapIcon size={18} /> My Land
              </button>
            </div>
          </div>

          <div className="animate-fade-in">
            {activeTab === 'overview' ? <DashboardOverview /> : <MyLand />}
          </div>

        </main>
      )}
    </div>
  );
}
