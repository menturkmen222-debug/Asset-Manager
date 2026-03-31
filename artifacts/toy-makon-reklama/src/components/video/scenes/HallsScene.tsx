import { motion } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';
import { useEffect, useState } from 'react';

const halls = [
  { name: 'Şa Zaly', desc: '800m² • 400 myhman • Klassik Lýuks' },
  { name: 'Bahar Zaly', desc: '500m² • Häzirki zaman' },
  { name: 'Altyn Zaly', desc: '300m² • Ykjam premium' },
  { name: 'Açyk Howly', desc: '1200m² • Açyk howlu' },
];

export function HallsScene() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowContent(true), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-center overflow-hidden bg-[var(--color-bg)]"
      {...sceneTransitions.wipe}
    >
      {/* Background with Ken Burns */}
      <motion.img
        src={`${import.meta.env.BASE_URL}hall.jpg`}
        alt="Hall"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 6, ease: 'linear' }}
        className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg)] via-[var(--color-bg)]/80 to-transparent" />

      <div className="relative z-10 px-[10vw] max-w-[60vw]">
        {showContent && (
          <>
            <motion.h3
              initial={{ opacity: 0, x: '-5vw' }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-[1.8vw] text-[var(--color-primary)] font-body tracking-widest uppercase mb-[1vw]"
            >
              Mekanymyz
            </motion.h3>
            
            <motion.h2
              initial={{ opacity: 0, x: '-5vw' }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="text-[4vw] leading-tight font-display text-[var(--color-white)] mb-[3vw]"
            >
              Lýuks we döwrebaplygyň sazlaşygy
            </motion.h2>

            <div className="space-y-[1.5vw] border-l border-[var(--color-primary-dark)] pl-[2vw]">
              {halls.map((hall, i) => (
                <motion.div
                  key={hall.name}
                  initial={{ opacity: 0, x: '-2vw' }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.15 }}
                >
                  <h4 className="text-[2.2vw] font-display text-[var(--color-primary-light)]">
                    {hall.name}
                  </h4>
                  <p className="text-[1.2vw] font-body text-[var(--color-white)]/70">
                    {hall.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
