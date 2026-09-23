import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useMotionPreference } from '../motion/useMotionPreference';

const makeField = (isMobile: boolean) => ({
  matrixItems: Array.from({ length: isMobile ? 9 : 15 }, () => ({
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 5,
    left: Math.random() * 100,
    text: Math.random().toString(36).substring(2, 15),
  })),
  particles: Array.from({ length: isMobile ? 12 : 20 }, () => ({
    dx: Math.random() * 200 - 100,
    dy: Math.random() * 200 - 100,
    duration: Math.random() * 10 + 10,
    left: Math.random() * 100,
    top: Math.random() * 100,
  })),
});

const AnimatedBackground = () => {
  const reduceMotion = useMotionPreference();
  // Random values are generated once after mount: stable for the component's
  // lifetime and never mismatched against the prerendered HTML.
  const [field, setField] = useState<ReturnType<typeof makeField> | null>(null);
  useEffect(() => {
    setField(makeField(window.matchMedia('(max-width: 767px)').matches));
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-neon-green/5 to-transparent"></div>

      {field && !reduceMotion && (
        <>
          {/* Matrix-style falling code */}
          {field.matrixItems.map((item, i) => (
            <motion.div
              key={`matrix-${i}`}
              className="absolute text-neon-green/20 font-mono text-xs"
              animate={{ y: ['0vh', '110vh'], opacity: [0, 1, 0] }}
              transition={{ duration: item.duration, repeat: Infinity, delay: item.delay, ease: 'linear' }}
              style={{ left: `${item.left}%`, top: -100 }}
            >
              {item.text}
            </motion.div>
          ))}

          {/* Floating particles */}
          {field.particles.map((p, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-neon-green rounded-full opacity-30"
              animate={{ x: [0, p.dx], y: [0, p.dy], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: p.duration, repeat: Infinity, ease: 'linear' }}
              style={{ left: `${p.left}%`, top: `${p.top}%` }}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default AnimatedBackground;
