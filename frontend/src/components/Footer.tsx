import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-darkbg w-full py-16 px-6 border-t border-white/5 relative z-10">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start">
          <img src="/assets/logo.png" alt="Forest Ad Land Logo" className="h-12 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] mb-4" />
          <p className="text-gray-500 text-sm">{t('footer.copyright')}</p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 text-sm font-medium">
          <a href="/explore" className="text-gray-400 hover:text-white transition-colors">{t('footer.mapEngine')}</a>
          <button onClick={() => alert("Whitepaper coming soon!")} className="text-gray-400 hover:text-white transition-colors">{t('footer.whitepaper')}</button>
          <a href="/dashboard" className="text-gray-400 hover:text-white transition-colors">{t('footer.advertising')}</a>
          <a href="mailto:hello@forestadland.com" className="text-gray-400 hover:text-white transition-colors">{t('footer.contact')}</a>
        </div>

        {/* Socials */}
        <div className="flex items-center gap-6">
          <a href="https://x.com/forestlandlc?s=21" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full" aria-label="X (Twitter)">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="https://t.me/ForestAdLand" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full" aria-label="Telegram">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.94z"/></svg>
          </a>
        </div>
        
      </div>
    </footer>
  );
}
