import { motion } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';
import { useEffect, useState } from 'react';

const services = [
  'Premium Milli Tagam',
  'Gül we Zal Bezeği',
  'Milli Toý Sazandalary',
  'Foto & Wideo Hyzmat',
  'Toý Tamadasy',
  'Toý Transport'
];

export function ServicesScene() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowContent(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-end overflow-hidden bg-[var(--color-bg)]"
      {...sceneTransitions.splitVertical}
    >
      <motion.img
        src={`${import.meta.env.BASE_URL}food.jpg`}
        alt="Food"
        initial={{ x: '-10%', scale: 1.1 }}
        animate={{ x: '0%', scale: 1 }}
        transition={{ duration: 5, ease: 'easeOut' }}
        className="absolute inset-0 w-[60%] h-full object-cover opacity-70"
      />
      
      <div className="absolute inset-0 bg-gradient-to-l from-[var(--color-bg)] via-[var(--color-bg)]/90 to-transparent" />

      <div className="relative z-10 w-[50%] pr-[10vw] flex flex-col items-start text-left">
        {showContent && (
          <>
            <motion.h2
              initial={{ opacity: 0, y: '3vw' }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-[3.5vw] leading-[1.1] font-display text-[var(--color-primary-light)] mb-[2vw]"
            >
              Toýuňyzy düýş<br/>ýaly edýäris
            </motion.h2>

            <div className="w-full space-y-[1vw]">
              {services.map((service, i) => (
                <motion.div
                  key={service}
                  initial={{ opacity: 0, x: '5vw' }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                  className="flex items-center space-x-[1vw] border-b border-[var(--color-primary)]/20 pb-[1vw]"
                >
                  <div className="w-[0.5vw] h-[0.5vw] rounded-full bg-[var(--color-accent)]" />
                  <span className="text-[1.6vw] font-body text-[var(--color-white)] tracking-wide">
                    {service}
                  </span>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
