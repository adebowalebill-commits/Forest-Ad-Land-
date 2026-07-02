import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="bg-darkbg w-full min-h-screen flex flex-col">
      {/* Top massive image */}
      <div className="w-full pt-[120px] px-4 md:px-8 max-w-[1600px] mx-auto">
        <div className="w-full h-[55vh] md:h-[65vh] rounded-[2rem] overflow-hidden relative shadow-sm">
          <img 
            src="/assets/Forestlandbg.jpeg" 
            alt="Forest Ad Land Landscape"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content split layout below image */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-16 pb-24 grid md:grid-cols-12 gap-12 items-start flex-grow">
        {/* Left side: Massive text */}
        <div className="md:col-span-7">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-[5.5rem] font-bold tracking-tight text-white leading-[1.05]"
          >
            {t('hero.title1')}<br/>
            {t('hero.title2')}<br/>
            <span className="font-serif italic text-gray-400">{t('hero.title3')}</span>
          </motion.h1>
          
          <div className="mt-12 hidden md:block">
             <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">{t('hero.contract')}</p>
             <div className="flex items-center gap-3 bg-[#1a1a1a]/80 w-fit px-4 py-2.5 rounded-full border border-white/10">
               <span className="text-sm font-mono text-gray-300 select-all">2iqdyuBEtNeR15PtmuWAZBorK1hEmWhYnpY71j42pump</span>
               <button 
                 onClick={() => navigator.clipboard.writeText('2iqdyuBEtNeR15PtmuWAZBorK1hEmWhYnpY71j42pump')}
                 className="text-[10px] uppercase font-bold text-black bg-white hover:bg-primary px-3 py-1.5 rounded-full transition-colors"
               >
                 {t('hero.copy')}
               </button>
             </div>
          </div>
        </div>

        {/* Right side: Description & CTA */}
        <div className="md:col-span-5 md:pt-4">
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-8">
            {t('hero.desc')}
          </p>
          
          <div className="bg-[#1a1a1a]/80 p-2 rounded-full flex items-center justify-between shadow-inner max-w-md border border-white/10">
             <span className="pl-5 text-sm text-gray-400 font-medium">{t('hero.ready')}</span>
             <a href="/explore" className="bg-primary hover:brightness-110 text-white px-8 py-3.5 rounded-full text-sm font-semibold transition-transform hover:scale-105 whitespace-nowrap">
               {t('hero.exploreMap')}
             </a>
          </div>
          
          {/* Mobile CA display */}
          <div className="mt-12 block md:hidden">
             <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">{t('hero.contract')}</p>
             <div className="flex items-center gap-3 bg-[#1a1a1a]/80 w-full px-4 py-2.5 rounded-full border border-white/10">
               <span className="text-xs font-mono text-gray-300 truncate select-all">2iqdyu...42pump</span>
               <button 
                 onClick={() => navigator.clipboard.writeText('2iqdyuBEtNeR15PtmuWAZBorK1hEmWhYnpY71j42pump')}
                 className="text-[10px] uppercase font-bold text-black bg-white hover:bg-primary px-3 py-1.5 rounded-full transition-colors"
               >
                 {t('hero.copy')}
               </button>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
