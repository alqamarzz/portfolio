import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/audio';

interface SwingUpButtonProps {
  triggerSpiderSense: (msg?: string) => void;
}

export const SwingUpButton: React.FC<SwingUpButtonProps> = ({ triggerSpiderSense }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSwinging, setIsSwinging] = useState(false);
  const [castProgress, setCastProgress] = useState(0); // 0 -> 1: web fan blast from button to screen & navbar
  const [targetCoord, setTargetCoord] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [btnCoord, setBtnCoord] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Monitor scroll depth to reveal button
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

  // Pre-generate organic web fan structure spanning from button to top & sides
  const webStructure = useMemo(() => {
    const mainStrands = 18; // Number of primary radial web strands blasting out
    return {
      mainStrands,
      rings: [0.15, 0.28, 0.42, 0.58, 0.74, 0.88, 1.0], // Concentric spiral arcs
    };
  }, []);

  const handleSwingUp = () => {
    if (isSwinging) return;
    setIsSwinging(true);
    sound.playThwip();
    triggerSpiderSense('SPIDER-WEB BLAST! PULLING UP!');

    // Target is top Navbar center
    const navElem = document.querySelector('header');
    const navRect = navElem ? navElem.getBoundingClientRect() : null;
    const targetX = navRect ? navRect.left + navRect.width / 2 : window.innerWidth / 2;
    const targetY = navRect ? navRect.top + navRect.height / 2 : 40;
    setTargetCoord({ x: targetX, y: targetY });

    // Origin is bottom right button
    if (buttonRef.current) {
      const bRect = buttonRef.current.getBoundingClientRect();
      setBtnCoord({
        x: bRect.left + bRect.width / 2,
        y: bRect.top + bRect.height / 2,
      });
    }

    // Step 1: Rapid web blast shooting out across the screen (340ms)
    const blastStartTime = performance.now();
    const blastDuration = 340;

    const blastStep = (now: number) => {
      const elapsed = now - blastStartTime;
      const progress = Math.min(1, elapsed / blastDuration);
      // Fast explosive launch easing (quad out)
      setCastProgress(1 - Math.pow(1 - progress, 3));

      if (progress < 1) {
        requestAnimationFrame(blastStep);
      } else {
        // Step 2: The web is completely attached to navbar and screen boundaries!
        // Initiate rubber-band tension pull to reel in page
        startScreenReel();
      }
    };

    requestAnimationFrame(blastStep);
  };

  const startScreenReel = () => {
    sound.playThwip();
    const startScrollY = window.scrollY;
    const reelStartTime = performance.now();
    const reelDuration = 950; // Realistic elastic swing-up

    const reelStep = (now: number) => {
      const elapsed = now - reelStartTime;
      const t = Math.min(1, elapsed / reelDuration);

      // Elastic pull easing: initial tension buildup then rapid web pull
      const pullEase = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const currentY = startScrollY * (1 - pullEase);

      window.scrollTo(0, currentY);

      // Keep button coords updated as window scrolls
      if (buttonRef.current) {
        const bRect = buttonRef.current.getBoundingClientRect();
        setBtnCoord({
          x: bRect.left + bRect.width / 2,
          y: bRect.top + bRect.height / 2,
        });
      }

      if (t < 1 && window.scrollY > 0) {
        requestAnimationFrame(reelStep);
      } else {
        window.scrollTo(0, 0);
        setTimeout(() => {
          setIsSwinging(false);
          setCastProgress(0);
        }, 250);
      }
    };

    requestAnimationFrame(reelStep);
  };

  // Screen dimension helpers
  const winW = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const winH = typeof window !== 'undefined' ? window.innerHeight : 800;

  // Calculate endpoint targets for radial strands across the screen and navbar
  const strandTargets = useMemo(() => {
    const targets: { x: number; y: number; isCenterAnchor?: boolean }[] = [];
    const count = webStructure.mainStrands;

    // Distribute anchor points across top border (Navbar area) and side boundaries
    for (let i = 0; i < count; i++) {
      const ratio = i / (count - 1);
      // Concentrate key anchor strands tightly onto the navbar center
      if (ratio >= 0.4 && ratio <= 0.6) {
        const offset = (ratio - 0.5) * 260;
        targets.push({ x: targetCoord.x + offset, y: targetCoord.y + (Math.abs(offset) * 0.05), isCenterAnchor: true });
      } else if (ratio < 0.4) {
        // Left screen & top-left fan anchors
        const lx = ratio * (winW * 0.7);
        const ly = 0;
        targets.push({ x: lx, y: ly });
      } else {
        // Right screen & top-right fan anchors
        const rx = targetCoord.x + (ratio - 0.6) * (winW * 0.75);
        const ry = 0;
        targets.push({ x: Math.min(winW, rx), y: ry });
      }
    }
    return targets;
  }, [webStructure.mainStrands, targetCoord.x, targetCoord.y, winW]);

  return (
    <>
      {/* ── Realistic Screen-Wide Spider-Web Canvas Overlay ── */}
      {isSwinging && (
        <svg
          className="fixed inset-0 w-screen h-screen pointer-events-none z-[100]"
          style={{ overflow: 'visible' }}
        >
          <defs>
            {/* Spider-verse Web Filament Gradient */}
            <linearGradient id="silkGlow" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="45%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="75%" stopColor="#ef233c" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
            </linearGradient>

            {/* Specular Bloom glow */}
            <filter id="silkBloom" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Micro drop-shadow for 3D realism */}
            <filter id="webShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000000" floodOpacity="0.6" />
            </filter>
          </defs>

          {/* 1. Main Fan of Primary Structural Silk Strands */}
          <g filter="url(#webShadow)">
            {strandTargets.map((anchor, idx) => {
              // Current tip of each individual strand projecting outward based on progress
              const curX = btnCoord.x + (anchor.x - btnCoord.x) * castProgress;
              const curY = btnCoord.y + (anchor.y - btnCoord.y) * castProgress;

              // Organic curvature curve control point
              const midX = (btnCoord.x + curX) / 2 + (idx % 2 === 0 ? 15 : -15);
              const midY = (btnCoord.y + curY) / 2 - 20;

              return (
                <g key={`main-strand-${idx}`}>
                  {/* Outer Glowing Web Silk */}
                  <path
                    d={`M ${btnCoord.x} ${btnCoord.y} Q ${midX} ${midY} ${curX} ${curY}`}
                    fill="none"
                    stroke="url(#silkGlow)"
                    strokeWidth={anchor.isCenterAnchor ? '3.8' : '2.0'}
                    strokeLinecap="round"
                    filter="url(#silkBloom)"
                  />
                  {/* Inner Solid White Core */}
                  <path
                    d={`M ${btnCoord.x} ${btnCoord.y} Q ${midX} ${midY} ${curX} ${curY}`}
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth={anchor.isCenterAnchor ? '1.8' : '1.0'}
                    strokeLinecap="round"
                    strokeOpacity={0.95}
                  />
                </g>
              );
            })}

            {/* 2. Concentric Web Cross-Strands (Connecting the spokes into a full web net) */}
            {castProgress > 0.15 &&
              webStructure.rings.map((ringT, rIdx) => {
                if (ringT > castProgress) return null;

                // Build a curved polyline string crossing across all spokes
                const points = strandTargets.map((anchor, sIdx) => {
                  const spokeX = btnCoord.x + (anchor.x - btnCoord.x) * ringT;
                  const spokeY = btnCoord.y + (anchor.y - btnCoord.y) * ringT;
                  // Organic droop sag between webs
                  const sag = Math.sin((sIdx / strandTargets.length) * Math.PI) * 12;
                  return { x: spokeX, y: spokeY + sag };
                });

                const pathData = points.reduce((acc, pt, i) => {
                  if (i === 0) return `M ${pt.x} ${pt.y}`;
                  const prev = points[i - 1];
                  const cx = (prev.x + pt.x) / 2;
                  const cy = (prev.y + pt.y) / 2 + 8; // Sagging curved web loop
                  return `${acc} Q ${cx} ${cy} ${pt.x} ${pt.y}`;
                }, '');

                return (
                  <g key={`web-ring-${rIdx}`}>
                    <path
                      d={pathData}
                      fill="none"
                      stroke={rIdx % 2 === 0 ? '#ffffff' : '#ef233c'}
                      strokeWidth={rIdx === webStructure.rings.length - 1 ? '2.2' : '1.4'}
                      strokeOpacity={0.8}
                      strokeLinecap="round"
                      filter="url(#silkBloom)"
                    />
                    <path
                      d={pathData}
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="0.8"
                      strokeOpacity={0.9}
                      strokeLinecap="round"
                    />
                  </g>
                );
              })}
          </g>

          {/* 3. Navbar Sticky Anchor Clustered Web Net */}
          {castProgress > 0.8 && (
            <g transform={`translate(${targetCoord.x}, ${targetCoord.y})`} filter="url(#silkBloom)">
              {/* Dense sticky web covering navbar center */}
              <circle r="14" fill="#ef233c" fillOpacity="0.75" />
              <circle r="6" fill="#ffffff" />
              {/* Web splinter anchors gripping navbar */}
              {[-50, -25, 0, 25, 50].map((xOff, i) => (
                <line
                  key={`anchor-tendril-${i}`}
                  x1={0}
                  y1={0}
                  x2={xOff}
                  y2={Math.abs(xOff) * 0.15 - 8}
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ))}
              {/* Translucent adhesive web sheen */}
              <ellipse rx="80" ry="24" fill="rgba(255,255,255,0.08)" stroke="#ffffff" strokeWidth="1.2" strokeDasharray="3 3" />
            </g>
          )}

          {/* 4. Origin Web Shooter Muzzle Cluster at Button */}
          <g transform={`translate(${btnCoord.x}, ${btnCoord.y})`} filter="url(#silkBloom)">
            <circle r="16" fill="#ef233c" fillOpacity="0.4" />
            <circle r="8" fill="#ffffff" fillOpacity="0.9" />
          </g>
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
                  ? 'scale-110 border-[#ef233c] shadow-[0_0_35px_rgba(239,35,60,0.85)]'
                  : 'hover:scale-105 hover:border-[#ef233c] active:scale-95'
              }`}
              title="Cast Spider-Web Across Screen & Swing Up"
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
                  {isSwinging ? 'Web Pulling...' : 'Cast Web to Top'}
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
