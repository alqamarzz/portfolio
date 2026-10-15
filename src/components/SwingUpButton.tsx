import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/audio';

interface SwingUpButtonProps {
  triggerSpiderSense: (msg?: string) => void;
}

export const SwingUpButton: React.FC<SwingUpButtonProps> = ({ triggerSpiderSense }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSwinging, setIsSwinging] = useState(false);
  const [webProgress, setWebProgress] = useState(0); // 0 to 1 (shooting up)
  const [netSpread, setNetSpread] = useState(0);     // 0 to 1 (expanding web net over navbar)
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
    triggerSpiderSense('SPIDER-NET DEPLOYED! PULLING UP!');

    // Find destination target (Navbar or top center)
    const navElem = document.querySelector('header');
    const navRect = navElem ? navElem.getBoundingClientRect() : null;
    const targetX = navRect ? navRect.left + navRect.width / 2 : window.innerWidth / 2;
    const targetY = navRect ? navRect.top + navRect.height / 2 : 36;
    setTargetCoord({ x: targetX, y: targetY });

    // Find origin point (this button)
    if (buttonRef.current) {
      const bRect = buttonRef.current.getBoundingClientRect();
      setBtnCoord({
        x: bRect.left + bRect.width / 2,
        y: bRect.top + bRect.height / 2,
      });
    }

    // Step 1: Shoot web strand rapidly upwards to navbar (260ms)
    const shootStartTime = performance.now();
    const shootDuration = 260;

    const shootStep = (now: number) => {
      const elapsed = now - shootStartTime;
      const progress = Math.min(1, elapsed / shootDuration);
      setWebProgress(progress);

      if (progress < 1) {
        requestAnimationFrame(shootStep);
      } else {
        // Step 2: Impact! Expand a radial spider net across the navbar
        expandSpiderNet();
      }
    };

    requestAnimationFrame(shootStep);
  };

  const expandSpiderNet = () => {
    sound.playThwip();
    const netStartTime = performance.now();
    const netDuration = 220; // 220ms spider-net bloom

    const netStep = (now: number) => {
      const elapsed = now - netStartTime;
      const progress = Math.min(1, elapsed / netDuration);
      // Ease out expansion
      setNetSpread(Math.sin((progress * Math.PI) / 2));

      if (progress < 1) {
        requestAnimationFrame(netStep);
      } else {
        // Step 3: Spider Net fully latched on Navbar! Reel in & pull scroll to top
        startPullUp();
      }
    };

    requestAnimationFrame(netStep);
  };

  const startPullUp = () => {
    sound.playThwip();
    const startScrollY = window.scrollY;
    const pullStartTime = performance.now();
    const pullDuration = 850; // Dynamic upward web pull

    const pullStep = (now: number) => {
      const elapsed = now - pullStartTime;
      const t = Math.min(1, elapsed / pullDuration);

      // Strong rubber-band elastic easing: tense start, rapid upward acceleration
      const easeTension = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const currentY = startScrollY * (1 - easeTension);

      window.scrollTo(0, currentY);

      // Keep button coords updated with camera movement
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
          setNetSpread(0);
        }, 220);
      }
    };

    requestAnimationFrame(pullStep);
  };

  // Coordinates of the leading web projectile tip
  const currentTipX = btnCoord.x + (targetCoord.x - btnCoord.x) * webProgress;
  const currentTipY = btnCoord.y + (targetCoord.y - btnCoord.y) * webProgress;

  // Geometry for Spider-Net rings and radial threads (8-spoke spider web)
  const spokesCount = 8;
  const maxNetRadius = 85 * netSpread;
  const rings = [0.35, 0.7, 1.0];

  return (
    <>
      {/* ── Dynamic Spider Net & Web Filament SVG Layer ── */}
      {isSwinging && (
        <svg
          className="fixed inset-0 w-screen h-screen pointer-events-none z-[100]"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="spiderWebGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#ef233c" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
            </linearGradient>

            <filter id="spiderWebBloom" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="3.5" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 1. Main Silk Web Cable Shot from Button */}
          <line
            x1={btnCoord.x}
            y1={btnCoord.y}
            x2={currentTipX}
            y2={currentTipY}
            stroke="url(#spiderWebGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            filter="url(#spiderWebBloom)"
          />
          <line
            x1={btnCoord.x}
            y1={btnCoord.y}
            x2={currentTipX}
            y2={currentTipY}
            stroke="#ffffff"
            strokeWidth="1.6"
            strokeLinecap="round"
          />

          {/* 2. Trailing Silk Fibers for high-speed comic effect */}
          {webProgress > 0.2 && webProgress < 1 && (
            <>
              <line
                x1={btnCoord.x + 6}
                y1={btnCoord.y}
                x2={currentTipX - 8}
                y2={currentTipY + 4}
                stroke="#ef233c"
                strokeWidth="1.2"
                strokeOpacity="0.6"
                strokeDasharray="4 6"
              />
              <line
                x1={btnCoord.x - 6}
                y1={btnCoord.y}
                x2={currentTipX + 8}
                y2={currentTipY + 4}
                stroke="#ffffff"
                strokeWidth="1.2"
                strokeOpacity="0.7"
                strokeDasharray="3 5"
              />
            </>
          )}

          {/* 3. Spider Net Cast Over the Navbar on Impact */}
          {netSpread > 0.05 && (
            <g transform={`translate(${targetCoord.x}, ${targetCoord.y})`} filter="url(#spiderWebBloom)">
              {/* Radial Spokes / Web Strands */}
              {Array.from({ length: spokesCount }).map((_, i) => {
                const angle = (i * 2 * Math.PI) / spokesCount;
                const sx = Math.cos(angle) * maxNetRadius;
                const sy = Math.sin(angle) * (maxNetRadius * 0.55); // Elliptical to hug horizontal navbar
                return (
                  <line
                    key={`spoke-${i}`}
                    x1={0}
                    y1={0}
                    x2={sx}
                    y2={sy}
                    stroke="#ffffff"
                    strokeWidth="1.6"
                    strokeOpacity={0.85}
                    strokeLinecap="round"
                  />
                );
              })}

              {/* Concentric Spider Net Spirals/Rings */}
              {rings.map((rMultiplier, ringIdx) => {
                const rX = maxNetRadius * rMultiplier;
                const rY = maxNetRadius * 0.55 * rMultiplier;
                const points = Array.from({ length: spokesCount + 1 }).map((_, i) => {
                  const angle = (i * 2 * Math.PI) / spokesCount;
                  const px = Math.cos(angle) * rX;
                  const py = Math.sin(angle) * rY;
                  return `${px},${py}`;
                }).join(' ');

                return (
                  <g key={`ring-${ringIdx}`}>
                    {/* Concentric polygon web strand */}
                    <polygon
                      points={points}
                      fill="none"
                      stroke={ringIdx % 2 === 0 ? '#ffffff' : '#ef233c'}
                      strokeWidth={ringIdx === 2 ? '1.8' : '1.3'}
                      strokeOpacity={0.8}
                    />
                  </g>
                );
              })}

              {/* Spider-Net Central Latch Node */}
              <circle r="7" fill="#ef233c" />
              <circle r="3.5" fill="#ffffff" />

              {/* Navbar Anchor Tendrils (clinging to edges of the navbar) */}
              <path
                d={`M ${-maxNetRadius * 1.1} 0 Q 0 ${maxNetRadius * 0.3} ${maxNetRadius * 1.1} 0`}
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                opacity="0.8"
              />
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
              title="Shoot Spider Net & Swing to Top"
            >
              {/* Spider Emblem Animated Ring */}
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#ef233c] to-[#990011] flex items-center justify-center text-white shadow-md relative overflow-hidden shrink-0">
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
                  {isSwinging ? 'Spider Net Latched!' : 'Cast Net to Top'}
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
