import { useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 4);
      cursorY.set(e.clientY - 4);
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="cursor-dot"
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: 8,
        height: 8,
        backgroundColor: '#fbbf24',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 100001,
        translateX: cursorX,
        translateY: cursorY,
      }}
    />
  );
}
