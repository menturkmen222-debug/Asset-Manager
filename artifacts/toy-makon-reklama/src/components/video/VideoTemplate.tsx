import { AnimatePresence } from 'framer-motion';
import { useVideoPlayer } from '@/lib/video';
import { IntroScene } from './scenes/IntroScene';
import { HallsScene } from './scenes/HallsScene';
import { ServicesScene } from './scenes/ServicesScene';
import { StatsScene } from './scenes/StatsScene';
import { OutroScene } from './scenes/OutroScene';

const SCENE_DURATIONS = {
  0: 4500, // Intro
  1: 4500, // Halls
  2: 4500, // Services
  3: 4500, // Stats
  4: 5000, // Outro
};

export default function VideoTemplate() {
  const { currentScene } = useVideoPlayer({
    durations: SCENE_DURATIONS,
  });

  return (
    <div
      className="w-full h-screen overflow-hidden relative"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <AnimatePresence mode="wait">
        {currentScene === 0 && <IntroScene key="intro" />}
        {currentScene === 1 && <HallsScene key="halls" />}
        {currentScene === 2 && <ServicesScene key="services" />}
        {currentScene === 3 && <StatsScene key="stats" />}
        {currentScene === 4 && <OutroScene key="outro" />}
      </AnimatePresence>
    </div>
  );
}
