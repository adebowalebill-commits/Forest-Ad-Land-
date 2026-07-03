import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function AboutSection() {
  const slides = [
    '/assets/about/slide1.jpg',
    '/assets/about/slide2.jpg',
    '/assets/about/slide3.jpg',
    '/assets/about/slide4.jpg',
    '/assets/about/slide5.jpg',
    '/assets/about/slide6.jpg',
  ];

  return (
    <section className="w-full pb-32 px-4 md:px-8 relative">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col gap-24 md:gap-40 items-center">
          {slides.map((src, index) => {
            return (
              <Slide key={index} src={src} index={index} />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Slide({ src, index }: { src: string, index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.2 1"] // Animates precisely as the element enters the viewport
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  return (
    <motion.div 
      ref={ref}
      style={{ scale, opacity }}
      className="w-full max-w-sm md:max-w-md lg:max-w-[600px] mx-auto rounded-2xl md:rounded-[2rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-white/10 bg-black"
    >
      <img src={src} alt={`About Slide ${index + 1}`} className="w-full h-auto object-cover" />
    </motion.div>
  );
}
