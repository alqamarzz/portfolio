import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/audio';

interface SwingUpButtonProps {
  triggerSpiderSense: (msg?: string) => void;
}

export const SwingUpButton: React.FC<SwingUpButtonProps> = ({ triggerSpiderSense }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSwinging, setIsSwinging] = useState(false);
  const [webProgress, setWebProgress] = useState(0); // 0 to 1
  const [targetCoord, setTargetCoord] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [btnCoord, setBtnCoord] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Monitor scroll depth to show button after scrolling down 350px
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSwingUp = () => {
    if (isSwinging) return;
    setIsSwinging(true);
    sound.playThwip();
    triggerSpiderSense('WEB-LINE ATTACHED! SWINGING UP!');

    // Find destination target (Navbar or top center)
    const navElem = document.querySelector('header');
    const navRect = navElem ? navElem.getBoundingClientRect() : null;
    const targetX = navRect ? navRect.left + navRect.width / 2 : window.innerWidth / 2;
    const targetY = navRect ? navRect.top + navRect.height / 2 : 30;
    setTargetCoord({ x: targetX, y: targetY });

    // Find origin point (this button)
    if (buttonRef.current) {
      const bRect = buttonRef.current.getBoundingClientRect();
      setBtnCoord({
        x: bRect.left + bRect.width / 2,
        y: bRect.top + bRect.height / 2,
      });
    }

    // Step 1: Shoot web line rapidly upwards to navbar
    const shootStartTime = performance.now();
    const shootDuration = 320; // 320ms fast web shot

    const shootStep = (now: number) => {
      const elapsed = now - shootStartTime;
      const progress = Math.min(1, elapsed / shootDuration);
      setWebProgress(progress);

      if (progress < 1) {
        requestAnimationFrame(shootStep);
      } else {
        // Step 2: Line latched! Physics pull scroll upwards to top
        startPullUp();
      }
    };

    requestAnimationFrame(shootStep);
  };

  const startPullUp = () => {
    sound.playThwip();
    const startScrollY = window.scrollY;
    const pullStartTime = performance.now();
    const pullDuration = 900; // 900ms dynamic zip-pull

    const pullStep = (now: number) => {
      const elapsed = now - pullStartTime;
      const t = Math.min(1, elapsed / pullDuration);

      // Custom spring-like cubic bezier ease-in-out: starts with tension then accelerates upward
      const easeTension = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const currentY = startScrollY * (1 - easeTension);

      window.scrollTo(0, currentY);

      // Keep updating button coords as viewport moves
      if (buttonRef.current) {
        const bRect = buttonRef.current.getBoundingClientRect();
        setBtnCoord({
          x: bRect.left + bRect.width / 2,
          y: bRect.top + bRect.height / 2,
        });
      }

      if (t < 1 && window.scrollY > 0) {
        requestAnimationFrame(pullStep);
      } else {
        window.scrollTo(0, 0);
        // Clean snap & reset
        setTimeout(() => {
          setIsSwinging(false);
          setWebProgress(0);
        }, 200);
      }
    };

    requestAnimationFrame(pullStep);
  };

  // Calculate current tip of web as it extends towards target
  const currentTipX = btnCoord.x + (targetCoord.x - btnCoord.x) * webProgress;
  const currentTipY = btnCoord.y + (targetCoord.y - btnCoord.y) * webProgress;

  return (
    <>
      {/* ── Dynamic Web Filament Layer ── */}
      {isSwinging && (
        <svg
          className="fixed inset-0 w-screen h-screen pointer-events-none z-[100]"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="webGlow" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#ef233c" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
            </linearGradient>
            <filter id="webBloom" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Glowing Silk Web Strand */}
          <line
            x1={btnCoord.x}
            y1={btnCoord.y}
            x2={currentTipX}
            y2={currentTipY}
            stroke="url(#webGlow)"
            strokeWidth="3.5"
            strokeLinecap="round"
            filter="url(#webBloom)"
          />
          {/* Inner tight white core */}
          <line
            x1={btnCoord.x}
            y1={btnCoord.y}
            x2={currentTipX}
            y2={currentTipY}
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Web impact cluster at anchor tip */}
          {webProgress > 0.1 && (
            <g transform={`translate(${currentTipX}, ${currentTipY})`}>
              {/* Pulsing impact web ring */}
              <circle r="8" fill="none" stroke="#ef233c" strokeWidth="2" opacity="0.8" />
              <circle r="4" fill="#ffffff" />
              {/* Web splinter anchors */}
              <line x1="-12" y1="-6" x2="12" y2="6" stroke="#ffffff" strokeWidth="1.2" opacity="0.7" />
              <line x1="-6" y1="12" x2="6" y2="-12" stroke="#ffffff" strokeWidth="1.2" opacity="0.7" />
              <line x1="-10" y1="10" x2="10" y2="-10" stroke="#ef233c" strokeWidth="1.5" opacity="0.7" />
            </g>
          )}
        </svg>
      )}

      {/* ── Swing Up Button ── */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 30 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 flex items-center"
          >
            <button
              ref={buttonRef}
              onClick={handleSwingUp}
              disabled={isSwinging}
              className={`relative group flex items-center gap-2.5 px-4 py-2.5 rounded-full glass-hud border border-white/20 shadow-[0_8px_32px_rgba(239,35,60,0.35)] transition-all duration-300 cursor-pointer overflow-hidden ${
                isSwinging
                  ? 'scale-110 border-[#ef233c] shadow-[0_0_30px_rgba(239,35,60,0.8)]'
                  : 'hover:scale-105 hover:border-[#ef233c] active:scale-95'
              }`}
              title="Shoot Web & Swing to Top"
            >
              {/* Spider Emblem Animated Ring */}
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#ef233c] to-[#990011] flex items-center justify-center text-white shadow-md relative overflow-hidden shrink-0">
                {/* Spidey Web Shooter Icon */}
                <motion.svg
                  animate={isSwinging ? { y: [-2, 2, -2] } : {}}
                  transition={{ repeat: Infinity, duration: 0.3 }}
                  className="w-4 h-4 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m18 15-6-6-6 6" />
                </motion.svg>
              </div>

              {/* Button text with comic font */}
              <div className="flex flex-col text-left pr-1">
                <span className="font-comic text-xs tracking-wider text-white flex items-center gap-1 leading-tight">
                  SWING UP
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ef233c] animate-pulse" />
                </span>
                <span className="text-[9px] font-mono-tech text-zinc-400 group-hover:text-zinc-200 transition-colors uppercase">
                  {isSwinging ? 'Web Zipping...' : 'Pull To Navbar'}
                </span>
              </div>

              {/* Ambient Red Glow on hover */}
              <div className="absolute inset-0 bg-[#ef233c]/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
