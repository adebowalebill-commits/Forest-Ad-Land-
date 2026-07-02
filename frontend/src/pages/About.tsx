import Navbar from '../components/Navbar';
import AboutSection from '../components/AboutSection';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="bg-darkbg min-h-screen font-sans selection:bg-primary/20 flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32">
         {/* Title area for About */}
         <div className="text-center py-16 px-4">
            <motion.h1 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="text-5xl font-extrabold text-white mb-6 tracking-tight"
            >
               Pitch Deck
            </motion.h1>
            <motion.p
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               className="text-gray-400 max-w-xl mx-auto text-lg"
            >
               Scroll to learn more about the Forest Ad Land ecosystem, our community, and the vision for the future.
            </motion.p>
         </div>
         <AboutSection />
      </main>
      <Footer />
    </div>
  );
}
