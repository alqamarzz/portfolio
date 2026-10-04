import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/audio';

interface ToastProps {
  message: string;
  visible: boolean;
  type?: 'thwip' | 'spidey' | 'info';
}

export const SpideyToast: React.FC<ToastProps> = ({ message, visible, type = 'thwip' }) => {
  const icons = {
    thwip: '🕸️',
    spidey: '⚡',
    info: '🕷️',
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 40, opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="fixed bottom-6 right-6 z-[60] flex items-center gap-2.5 px-4 py-2.5 rounded-2xl glass-hud border border-white/15 shadow-2xl max-w-xs"
        >
          <span className="text-lg">{icons[type]}</span>
          <span className="font-comic text-sm tracking-wide text-white uppercase">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Global toast manager hook
export function useSpideyToast() {
  const [toastState, setToastState] = useState<{ message: string; type: 'thwip' | 'spidey' | 'info'; visible: boolean }>({
    message: '',
    type: 'thwip',
    visible: false,
  });
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (message: string, type: 'thwip' | 'spidey' | 'info' = 'thwip', durationMs = 2200) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToastState({ message, type, visible: true });
    timerRef.current = setTimeout(() => {
      setToastState((prev) => ({ ...prev, visible: false }));
    }, durationMs);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return { toastState, showToast };
}
