import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import FeaturesSection from '../components/FeaturesSection';
import Footer from '../components/Footer';

export default function Landing() {
  return (
    <div className="bg-darkbg min-h-screen font-sans selection:bg-primary/20">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
}
