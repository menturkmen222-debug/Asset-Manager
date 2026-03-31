import { motion } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';
import { useEffect, useState } from 'react';

export function IntroScene() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 500);
    const t2 = setTimeout(() => setStep(2), 1500);
    const t3 = setTimeout(() => setStep(3), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
      {...sceneTransitions.scaleFade}
    >
      {/* Background Video */}
      <video
        src={`${import.meta.env.BASE_URL}bg-particles.mp4`}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-transparent to-[var(--color-bg)] opacity-80" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-[3vw] max-w-[80vw]">
        
        {step >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: '5vw', scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-[1.5vw]"
          >
            <h2 className="text-[2vw] tracking-[0.2em] uppercase text-[var(--color-primary-light)] font-body mb-[0.5vw]">
              Toý Makon
            </h2>
            <h1 className="text-[7vw] leading-none font-display text-[var(--color-white)] drop-shadow-2xl">
              Bagtly Köşk
            </h1>
          </motion.div>
        )}

        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1 }}
            className="w-full h-px bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent my-[2vw]"
          />
        )}

        {step >= 3 && (
          <motion.p
            initial={{ opacity: 0, y: '2vw' }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-[2.5vw] font-body text-[var(--color-white)] font-light italic"
          >
            "Arzuwyňyzdaky toý — biziň elimizde."
          </motion.p>
        )}

      </div>
    </motion.div>
  );
}
