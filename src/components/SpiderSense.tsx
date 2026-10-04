import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SpiderSenseProps {
  active: boolean;
  message?: string;
  onClose?: () => void;
}

export const SpiderSense: React.FC<SpiderSenseProps> = ({ active, message = 'SPIDER-SENSE TINGLING!' }) => {
  return (
    <AnimatePresence>
      {active && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          {/* Comic Spider-Sense Radiating Lightning / Zig-Zag Lines */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="relative flex flex-col items-center"
          >
            {/* Wavy Comic Sense Rays */}
            <svg
              className="w-48 h-32 text-[#ef233c] drop-shadow-[0_0_12px_rgba(239,35,60,0.8)]"
              viewBox="0 0 200 120"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            >
              <motion.path
                d="M30 110 Q40 60 10 30"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.path
                d="M60 105 Q80 40 50 15"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3, delay: 0.05 }}
              />
              <motion.path
                d="M100 100 L100 10"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              />
              <motion.path
                d="M140 105 Q120 40 150 15"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3, delay: 0.05 }}
              />
              <motion.path
                d="M170 110 Q160 60 190 30"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3 }}
              />
            </svg>

            {/* Comic Bubble Text */}
            <motion.div
              initial={{ y: 20, scale: 0.5, rotate: -4 }}
              animate={{ y: 0, scale: 1, rotate: [-4, 3, -2, 0] }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className="bg-[#ef233c] border-2 border-white px-5 py-2 rounded-xl shadow-[0_10px_30px_rgba(239,35,60,0.5)] -mt-6"
            >
              <span className="font-comic text-2xl tracking-wider text-white uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                ⚡ {message} ⚡
              </span>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
