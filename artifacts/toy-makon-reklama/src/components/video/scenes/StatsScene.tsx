import { motion } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';
import { useEffect, useState } from 'react';

const stats = [
  { value: '1200+', label: 'Geçirilen Toýlar' },
  { value: '500', label: 'Myhmana Çenli' },
  { value: '200', label: 'Awtoulag Duralgasy' },
  { value: '2015', label: 'Ýylynda Döredildi' },
];

export function StatsScene() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-[var(--color-bg)]"
      {...sceneTransitions.clipCircle}
    >
      <motion.img
        src={`${import.meta.env.BASE_URL}garden.jpg`}
        alt="Garden"
        initial={{ scale: 1.1, y: '5vw' }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 5, ease: 'easeOut' }}
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      
      <div className="absolute inset-0 bg-[var(--color-bg)]/60" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-[var(--color-bg)] opacity-80" />

      {showContent && (
        <div className="relative z-10 w-full px-[10vw] flex flex-col items-center">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1 }}
            className="text-[6vw] font-display text-[var(--color-primary)] mb-[4vw] text-center"
          >
            Ajaýyp pursatlar
          </motion.h2>

          <div className="grid grid-cols-4 gap-[4vw] w-full">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: '4vw' }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + i * 0.15, ease: 'backOut' }}
                className="flex flex-col items-center text-center"
              >
                <div className="text-[4vw] font-display text-[var(--color-white)] mb-[0.5vw]">
                  {stat.value}
                </div>
                <div className="text-[1.2vw] font-body text-[var(--color-primary-light)] uppercase tracking-widest">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
