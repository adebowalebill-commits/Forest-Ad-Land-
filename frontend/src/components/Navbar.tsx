import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const { disconnect, connected, publicKey } = useWallet();
  const { setVisible } = useWalletModal();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string, hash?: string) => {
    e.preventDefault();
    setMobileMenuOpen(false); // Close mobile menu on click
    if (location.pathname !== path) {
      navigate(path);
      setTimeout(() => {
        if (hash) {
          document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    } else {
      if (hash) {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const toggleLanguage = () => {
    const nextLang = i18n.language.startsWith('en') ? 'ru' : 'en';
    i18n.changeLanguage(nextLang);
  };

  const navLinks = [
    { label: t('nav.home'), path: '/', hash: undefined },
    { label: t('nav.mapEngine'), path: '/explore', hash: undefined, highlight: true },
    { label: t('nav.ecosystem'), path: '/', hash: 'features' },
    { label: t('nav.about'), path: '/about', hash: undefined },
    { label: t('nav.dashboard'), path: '/dashboard', hash: undefined }
  ];

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-full max-w-[800px]">
      <div className="bg-[#1a1a1a]/80 backdrop-blur-2xl text-white px-3 md:px-4 py-3 rounded-full flex items-center justify-between shadow-2xl border border-white/10 w-full">
        
        {/* Logo (No Text) */}
        <a href="/" onClick={(e) => handleNavClick(e, '/')} className="flex items-center shrink-0 hover:scale-105 transition-transform">
          <img src="/assets/logo.png" alt="Forest Ad Land Logo" className="h-8 md:h-9 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
        </a>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          {navLinks.map((link, idx) => (
            <a 
              key={idx}
              href={link.hash ? `${link.path}#${link.hash}` : link.path}
              onClick={(e) => handleNavClick(e, link.path, link.hash)} 
              className={`hover:text-white transition-colors cursor-pointer ${link.highlight ? 'text-primary font-bold' : ''}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          
          {/* Language Switcher */}
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 h-9 md:h-10 px-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-xs font-bold text-gray-300 hover:text-white"
          >
            <Globe size={14} />
            <span className="uppercase">{i18n.language.slice(0, 2)}</span>
          </button>

          <div className="hidden md:flex items-center gap-3 mr-1 border-r border-white/10 pr-4">
            <a href="https://x.com/forestlandlc?s=21" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="X (Twitter)">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://t.me/ForestAdLand" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Telegram">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.94z"/></svg>
            </a>
          </div>

          {connected && publicKey ? (
            <button 
              onClick={() => disconnect()}
              className="bg-white text-black hover:bg-gray-200 rounded-full h-9 md:h-10 px-4 md:px-6 text-sm font-bold transition-all shadow-lg hover:shadow-white/20 flex items-center justify-center"
            >
              {publicKey.toBase58().slice(0, 4)}...
            </button>
          ) : (
            <button 
              onClick={() => setVisible(true)}
              className="bg-white text-black hover:bg-gray-200 rounded-full h-9 md:h-10 px-4 md:px-6 text-sm font-bold transition-all shadow-lg hover:shadow-white/20 flex items-center justify-center"
            >
              {t('nav.connect')}
            </button>
          )}

          {/* Mobile Hamburger Toggle */}
          <button 
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white shrink-0"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-4 bg-[#1a1a1a]/95 backdrop-blur-2xl rounded-3xl border border-white/10 p-6 flex flex-col gap-6 shadow-2xl md:hidden"
          >
            <nav className="flex flex-col gap-4 text-center text-lg font-medium">
              {navLinks.map((link, idx) => (
                <a 
                  key={idx}
                  href={link.hash ? `${link.path}#${link.hash}` : link.path}
                  onClick={(e) => handleNavClick(e, link.path, link.hash)} 
                  className={`py-2 transition-colors cursor-pointer ${link.highlight ? 'text-primary font-bold' : 'text-gray-300 hover:text-white'}`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center justify-center gap-6 pt-4 border-t border-white/10">
              <a href="https://x.com/forestlandlc?s=21" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="X (Twitter)">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://t.me/ForestAdLand" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Telegram">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.94z"/></svg>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
