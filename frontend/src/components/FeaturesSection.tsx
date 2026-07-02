import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function FeaturesSection() {
  const { t } = useTranslation();

  return (
    <section id="features" className="bg-darkbg w-full py-32 px-6 border-t border-white/5 relative overflow-hidden">
      
      {/* Mystical background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight"
          >
            {t('features.title')}
          </motion.h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t('features.desc')}
          </p>
        </div>

        {/* 3 Column Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-32">
          
          {/* Card 1 */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="bg-darkcard border border-white/10 rounded-3xl p-6 hover:border-primary/50 transition-colors group shadow-2xl"
          >
            <div className="w-full h-48 rounded-2xl overflow-hidden mb-6 bg-black">
               <img src="/assets/property_1.jpeg" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" alt="Properties" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 tracking-wide">{t('features.card1Title')}</h3>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed h-16">
              {t('features.card1Desc')}
            </p>
            <a href="/explore" className="text-primary font-bold text-sm flex items-center gap-2 hover:text-white transition-colors">
              {t('features.card1Link')}
            </a>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="bg-darkcard border border-white/10 rounded-3xl p-6 hover:border-primary/50 transition-colors group shadow-2xl"
          >
            <div className="w-full h-48 rounded-2xl overflow-hidden mb-6 bg-black">
               <img src="/assets/nature_1.jpeg" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" alt="Advertising" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 tracking-wide">{t('features.card2Title')}</h3>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed h-16">
              {t('features.card2Desc')}
            </p>
            <a href="/dashboard" className="text-primary font-bold text-sm flex items-center gap-2 hover:text-white transition-colors">
              {t('features.card2Link')}
            </a>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="bg-darkcard border border-white/10 rounded-3xl p-6 hover:border-primary/50 transition-colors group shadow-2xl flex flex-col"
          >
            <div className="w-full h-48 rounded-2xl overflow-hidden mb-6 bg-black flex items-center justify-center p-4">
               <img src="/assets/logo.png" className="w-full h-full object-contain opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 drop-shadow-2xl" alt="Token Economy" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 tracking-wide">{t('features.card3Title')}</h3>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed h-16">
              {t('features.card3Desc')}
            </p>
            <a href="https://pump.fun/coin/2iqdyuBEtNeR15PtmuWAZBorK1hEmWhYnpY71j42pump" target="_blank" rel="noopener noreferrer" className="text-primary font-bold text-sm flex items-center gap-2 hover:text-white transition-colors">
              {t('features.card3Link')}
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
