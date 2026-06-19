import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  // Reactive window height — avoids raw window.innerHeight in JSX and handles resize
  const [windowHeight, setWindowHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight : 800
  );
  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Pre-compute random values once — prevents them from re-randomizing on every re-render
  const matrixItems = useMemo(
    () =>
      [...Array(15)].map(() => ({
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 5,
        left: Math.random() * 100,
        text: Math.random().toString(36).substring(2, 15),
      })),
    []
  );

  const particles = useMemo(
    () =>
      [...Array(20)].map(() => ({
        dx: Math.random() * 200 - 100,
        dy: Math.random() * 200 - 100,
        duration: Math.random() * 10 + 10,
        left: Math.random() * 100,
        top: Math.random() * 100,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-neon-green/5 to-transparent"></div>

      {/* Matrix-style falling code — values memoized to prevent re-randomizing on re-render */}
      {matrixItems.map((item, i) => (
        <motion.div
          key={`matrix-${i}`}
          className="absolute text-neon-green/20 font-mono text-xs"
          animate={{
            y: [0, windowHeight + 100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: "linear",
          }}
          style={{
            left: `${item.left}%`,
            top: -100,
          }}
        >
          {item.text}
        </motion.div>
      ))}

      {/* Floating particles — values memoized to prevent re-randomizing on re-render */}
      {particles.map((p, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-neon-green rounded-full opacity-30"
          animate={{
            x: [0, p.dx],
            y: [0, p.dy],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;
