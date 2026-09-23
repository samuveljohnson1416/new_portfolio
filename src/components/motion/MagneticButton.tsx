import { useEffect, useState, type ReactNode } from 'react';
import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';

type MagneticButtonProps = HTMLMotionProps<'button'> & {
  children: ReactNode;
  maxDistance?: number;
};

const MagneticButton = ({
  children,
  className,
  maxDistance = 8,
  onBlur,
  onPointerLeave,
  onPointerMove,
  ...buttonProps
}: MagneticButtonProps) => {
  const prefersReducedMotion = useReducedMotion();
  const [supportsFinePointer, setSupportsFinePointer] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const updatePointerSupport = () => setSupportsFinePointer(mediaQuery.matches);

    updatePointerSupport();
    mediaQuery.addEventListener('change', updatePointerSupport);
    return () => mediaQuery.removeEventListener('change', updatePointerSupport);
  }, []);

  const resetOffset = () => setOffset({ x: 0, y: 0 });
  const isEnabled = supportsFinePointer && !prefersReducedMotion;

  return (
    <motion.button
      {...buttonProps}
      className={className}
      animate={isEnabled ? offset : { x: 0, y: 0 }}
      transition={{ type: 'spring', stiffness: 340, damping: 20, mass: 0.35 }}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      onPointerMove={(event) => {
        onPointerMove?.(event);
        if (!isEnabled) return;

        const bounds = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - (bounds.left + bounds.width / 2)) * 0.16;
        const y = (event.clientY - (bounds.top + bounds.height / 2)) * 0.16;

        setOffset({
          x: Math.max(-maxDistance, Math.min(maxDistance, x)),
          y: Math.max(-maxDistance, Math.min(maxDistance, y)),
        });
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event);
        resetOffset();
      }}
      onBlur={(event) => {
        onBlur?.(event);
        resetOffset();
      }}
    >
      {children}
    </motion.button>
  );
};

export default MagneticButton;
