import { motion } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';
import { useEffect, useState } from 'react';

export function OutroScene() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 800);
    const t2 = setTimeout(() => setStep(2), 1600);
    const t3 = setTimeout(() => setStep(3), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-[var(--color-bg)]"
      {...sceneTransitions.morphExpand}
    >
      <video
        src="/bg-particles.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-screen"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-transparent to-[var(--color-bg)]" />

      <div className="relative z-10 flex flex-col items-center text-center">
        {step >= 1 && (
          <motion.h2
            initial={{ opacity: 0, y: '3vw' }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="text-[5vw] font-display text-[var(--color-primary-light)] mb-[2vw]"
          >
            Sizi garaşýarys
          </motion.h2>
        )}

        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center space-y-[1vw] mb-[3vw]"
          >
            <div className="text-[2.5vw] font-body text-[var(--color-white)] tracking-wider">
              +993 12 34-56-78
            </div>
            <div className="text-[1.5vw] font-body text-[var(--color-white)]/70 uppercase tracking-widest">
              Aşgabat, Türkmenistan
            </div>
          </motion.div>
        )}

        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: '2vw' }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="px-[2vw] py-[1vw] border border-[var(--color-primary)] rounded-sm bg-[var(--color-bg)]/50 backdrop-blur-md"
          >
            <span className="text-[1.2vw] font-body text-[var(--color-primary)] uppercase tracking-[0.3em]">
              Onlaýn bron ediň
            </span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
