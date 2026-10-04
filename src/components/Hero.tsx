import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { ArrowDown, Flame, Code2, Sparkles, Terminal, ExternalLink } from 'lucide-react';
import { GithubIcon } from './Icons';

interface HeroProps {
  triggerSpiderSense: (msg?: string) => void;
  isLight?: boolean;
}

const ROLES = [
  'Design Engineer',
  'Tactile UI Craftsman',
  'Motion & Physics Specialist',
  'Solana / Web3 Builder',
  'Frontend Performance Engineer',
];

const STATS = [
  { label: 'Projects Shipped', value: '15+', color: '#ef233c' },
  { label: 'Open Source Repos', value: '10+', color: '#00d2ff' },
  { label: 'Web3 Integrations', value: '5+', color: '#a855f7' },
  { label: 'FPS Target', value: '60', color: '#06d6a0' },
];

export const Hero: React.FC<HeroProps> = ({ triggerSpiderSense, isLight = false }) => {
  const [roleIndex, setRoleIndex] = useState(0);

  const nameLetters = 'ALQAMAR'.split('');

  const handleLetterClick = (i: number) => {
    sound.playClick();
    triggerSpiderSense('THWIP!');
    confetti({
      particleCount: 20,
      spread: 50,
      origin: { y: 0.5 },
      colors: ['#ef233c', '#00d2ff', '#ffffff'],
      scalar: 0.7,
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  const fireWebCelebration = () => {
    sound.playThwip();
    triggerSpiderSense('THWIP! WEB DEPLOYED!');
    confetti({
      particleCount: 80,
      spread: 75,
      origin: { y: 0.55 },
      colors: ['#ef233c', '#00d2ff', '#ffffff', '#ffd166', '#a855f7'],
    });
  };


  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-20 px-4 overflow-hidden"
    >
      {/* ── Decorative Background Elements ── */}
      {/* Giant watermark spider mask */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10 overflow-hidden">
        <svg
          viewBox="0 0 400 320"
          className="w-[550px] sm:w-[700px] md:w-[900px] opacity-[0.035] select-none text-zinc-800 dark:text-white"
          fill="currentColor"
        >
          {/* Spider-Man Mask silhouette */}
          <ellipse cx="200" cy="155" rx="175" ry="145" />
          {/* Left eye - classic white angular shape */}
          <ellipse cx="130" cy="120" rx="48" ry="38" fill="black" transform="rotate(-20 130 120)" />
          <ellipse cx="270" cy="120" rx="48" ry="38" fill="black" transform="rotate(20 270 120)" />
          {/* Web lines from center */}
          <line x1="200" y1="10" x2="200" y2="300" stroke="black" strokeWidth="2" opacity="0.5" />
          <line x1="25" y1="155" x2="375" y2="155" stroke="black" strokeWidth="2" opacity="0.5" />
          <line x1="60" y1="30" x2="340" y2="280" stroke="black" strokeWidth="1.5" opacity="0.4" />
          <line x1="340" y1="30" x2="60" y2="280" stroke="black" strokeWidth="1.5" opacity="0.4" />
        </svg>
      </div>

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-radial from-[#ef233c]/12 via-[#00d2ff]/6 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* ── Hanging Spider Mascot ── */}
      <motion.div
        className="absolute top-0 right-[8%] sm:right-[14%] md:right-[18%] z-20 flex flex-col items-center cursor-pointer pointer-events-auto"
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 90, damping: 14, delay: 0.3 }}
        whileHover={{ y: 30 }}
        onClick={fireWebCelebration}
        title="Thwip me!"
      >
        {/* Silk strand */}
        <motion.div
          animate={{ scaleX: [1, 1.08, 0.95, 1] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[1.5px] h-28 sm:h-40 origin-top"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.7) 60%, white 100%)',
            boxShadow: '0 0 6px rgba(255,255,255,0.6)',
          }}
        />
        {/* Spidey figure */}
        <motion.div
          animate={{ rotate: [0, 5, -5, 3, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative -mt-0.5 group"
        >
          {/* Custom Spider-Man Mask SVG */}
          <div className="relative w-12 h-12 sm:w-14 sm:h-14">
            <svg viewBox="0 0 80 70" className="w-full h-full drop-shadow-[0_4px_12px_rgba(239,35,60,0.6)]">
              {/* Red mask base */}
              <ellipse cx="40" cy="38" rx="36" ry="30" fill="#ef233c" />
              {/* Blue temples */}
              <rect x="4" y="28" width="14" height="18" rx="4" fill="#1d4ed8" />
              <rect x="62" y="28" width="14" height="18" rx="4" fill="#1d4ed8" />
              {/* Left eye */}
              <ellipse cx="25" cy="30" rx="12" ry="9" fill="white" transform="rotate(-12 25 30)" />
              {/* Right eye */}
              <ellipse cx="55" cy="30" rx="12" ry="9" fill="white" transform="rotate(12 55 30)" />
              {/* Web lines on mask */}
              <line x1="40" y1="8" x2="40" y2="68" stroke="black" strokeWidth="1" opacity="0.3" />
              <line x1="4" y1="38" x2="76" y2="38" stroke="black" strokeWidth="1" opacity="0.3" />
              <path d="M4 18 Q 40 8 76 18" stroke="black" strokeWidth="0.8" fill="none" opacity="0.25" />
              <path d="M4 58 Q 40 68 76 58" stroke="black" strokeWidth="0.8" fill="none" opacity="0.25" />
            </svg>
          </div>

          {/* Tooltip */}
          <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black/90 border border-white/15 text-[10px] px-2.5 py-1 rounded-lg text-white font-comic pointer-events-none">
            ⚡ CLICK TO THWIP!
          </div>
        </motion.div>
      </motion.div>

      {/* ── Status Pill ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-md mb-8 shadow-sm transition cursor-default ${
          isLight
            ? 'bg-slate-100/80 border border-slate-200 hover:border-[#ef233c]/40'
            : 'bg-white/5 border border-white/10 hover:border-[#ef233c]/40'
        }`}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className={`text-xs sm:text-sm font-medium ${
          isLight ? 'text-slate-600' : 'text-zinc-300'
        }`}>
          Friendly Neighborhood Dev · Available for Work
        </span>
      </motion.div>

      {/* ── Name Wordmark ── */}
      <div className="relative flex flex-col items-center text-center select-none">
        {/* Comic badge */}
        <motion.div
          initial={{ rotate: -12, scale: 0, opacity: 0 }}
          animate={{ rotate: -8, scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.4 }}
          className="absolute -top-8 sm:-top-10 -left-2 sm:-left-8 z-20 bg-[#ef233c] text-white px-3 py-0.5 rounded-lg border-2 border-white shadow-lg pointer-events-none"
        >
          <span className="font-comic text-xs sm:text-sm tracking-wider uppercase">
            Earth-616 Codebase
          </span>
        </motion.div>

        {/* Doodle Crown (perched atop the wordmark, matching user reference image) */}
        <motion.div
          initial={{ y: -15, opacity: 0, rotate: -6 }}
          animate={{ y: 0, opacity: 1, rotate: -4 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.35 }}
          whileHover={{ rotate: 8, scale: 1.15, y: -6 }}
          className="absolute -top-7 sm:-top-11 left-[50%] -translate-x-1/2 z-30 cursor-pointer pointer-events-auto"
          onClick={() => {
            sound.playSpiderSense();
            confetti({
              particleCount: 35,
              spread: 60,
              origin: { y: 0.45 },
              colors: ['#3b82f6', '#ef233c', '#ffffff'],
            });
          }}
          title="King of Code"
        >
          <svg
            viewBox="0 0 52 38"
            className="w-10 h-7 sm:w-14 sm:h-9 text-[#3b82f6] dark:text-[#60a5fa] drop-shadow-sm"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Hand-drawn blue doodle crown matching the reference image */}
            <path d="M 5 28 L 8 9 L 26 21 L 44 9 L 47 28 Z" />
          </svg>
        </motion.div>

        {/* Hand-drawn Doodle Rays (top-left, from reference image) */}
        <div className="absolute -top-6 sm:-top-9 left-[6%] sm:left-[12%] pointer-events-none select-none">
          <svg viewBox="0 0 40 40" className="w-7 h-7 sm:w-10 sm:h-10 text-[#3b82f6] dark:text-[#60a5fa]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="8" y1="18" x2="2" y2="10" />
            <line x1="20" y1="12" x2="20" y2="3" />
            <line x1="30" y1="16" x2="36" y2="8" />
            <path d="M 6 24 C 18 20 28 22 34 26" />
          </svg>
        </div>

        {/* Hand-drawn Doodle Curved Ticks (top-right, from reference image) */}
        <div className="absolute -top-4 sm:-top-7 right-[10%] sm:right-[16%] pointer-events-none select-none">
          <svg viewBox="0 0 35 25" className="w-6 h-4 sm:w-8 sm:h-5 text-zinc-400 dark:text-zinc-500" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M 3 14 C 10 6 22 6 30 14" />
            <path d="M 8 7 C 14 2 22 2 28 7" />
          </svg>
        </div>

        {/* Hand-drawn Doodle Curved Smile Line (bottom-left, from reference image) */}
        <div className="absolute -bottom-4 sm:-bottom-6 left-[20%] sm:left-[26%] pointer-events-none select-none flex items-center gap-1.5">
          <svg viewBox="0 0 45 18" className="w-8 h-3.5 sm:w-11 sm:h-4 text-[#3b82f6] dark:text-[#60a5fa]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M 4 5 Q 22 18 40 5" />
          </svg>
          <div className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] dark:bg-[#60a5fa]" />
        </div>

        {/* Hand-drawn Doodle Curved Smile Line (bottom-right, from reference image) */}
        <div className="absolute -bottom-3 sm:-bottom-5 right-[22%] sm:right-[28%] pointer-events-none select-none flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] dark:bg-[#60a5fa]" />
          <svg viewBox="0 0 45 18" className="w-8 h-3.5 sm:w-11 sm:h-4 text-[#3b82f6] dark:text-[#60a5fa]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M 4 5 Q 22 16 38 6" />
          </svg>
        </div>

        {/* Hand-drawn Spark Doodle (right side from reference image) */}
        <div className="absolute top-[38%] -right-1 sm:-right-5 pointer-events-none select-none">
          <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-400 dark:text-zinc-500" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="4" y1="8" x2="20" y2="8" />
            <line x1="4" y1="16" x2="20" y2="16" />
            <line x1="12" y1="3" x2="10" y2="21" />
          </svg>
        </div>

        {/* 3D Puffy Marshmallow Clay Name */}
        <h1 className="flex items-center justify-center flex-wrap font-puffy text-6xl sm:text-8xl md:text-[9.5rem] lg:text-[10.5rem] font-bold tracking-tight leading-none px-2 py-1 my-1">
          {nameLetters.map((char, i) => (
            <motion.span
              key={i}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: 'spring',
                stiffness: 280,
                damping: 22,
                delay: 0.1 + i * 0.05,
              }}
              whileHover={{
                y: -10,
                scale: 1.1,
                rotate: i % 2 === 0 ? 3 : -3,
                transition: { type: 'spring', stiffness: 450, damping: 15 },
              }}
              whileTap={{ scale: 0.92 }}
              onClick={() => handleLetterClick(i)}
              className="puffy-letter px-0.5 sm:px-1"
            >
              {char}
            </motion.span>
          ))}
        </h1>

        {/* Animated Role Ticker */}
        <div className="h-9 sm:h-11 flex items-center justify-center overflow-hidden mt-3 mb-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={roleIndex}
              initial={{ y: 28, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -28, opacity: 0 }}
              transition={{ duration: 0.38, ease: 'easeOut' }}
              className="flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#ef233c] animate-pulse shrink-0" />
              <span className={`text-lg sm:text-2xl md:text-3xl font-semibold bg-clip-text text-transparent whitespace-nowrap ${
                  isLight
                    ? 'bg-gradient-to-r from-slate-800 via-slate-600 to-slate-400'
                    : 'bg-gradient-to-r from-zinc-100 via-zinc-300 to-zinc-500'
                }`}>
                {ROLES[roleIndex]}
              </span>
              <Sparkles className="w-4 h-4 text-[#00d2ff] animate-pulse shrink-0" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bio text */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className={`max-w-[580px] text-sm sm:text-base leading-relaxed mt-2 mb-8 px-2 ${
            isLight ? 'text-slate-500' : 'text-zinc-400'
          }`}
        >
          Building polished, tactile web experiences shipped at production quality. Specializing in 
          fluid React interfaces, spring-physics micro-interactions, and high-performance Web3 tooling.
        </motion.p>

        {/* CTA Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <a
            href="#projects"
            onClick={() => sound.playClick()}
            className={`px-7 py-3 rounded-full font-bold text-sm transition-all flex items-center gap-2 active:scale-95 ${
              isLight
                ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/20'
                : 'bg-white text-zinc-950 hover:bg-zinc-100 shadow-lg shadow-white/10'
            }`}
          >
            <Code2 className="w-4 h-4 text-[#ef233c]" />
            <span>Explore Missions</span>
          </a>

          <button
            onClick={fireWebCelebration}
            className={`px-7 py-3 rounded-full font-bold text-sm transition-all flex items-center gap-2 active:scale-95 group ${
              isLight
                ? 'bg-white border border-slate-200 text-slate-900 hover:border-[#ef233c]/60 hover:text-[#ef233c] shadow-sm'
                : 'glass-hud border border-white/15 text-white hover:border-[#ef233c]/60 hover:text-[#ef233c]'
            }`}
          >
            <Flame className="w-4 h-4 text-[#ef233c] group-hover:rotate-12 transition-transform" />
            <span>Thwip Web!</span>
          </button>

          <a
            href="https://github.com/alqamarzz"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className={`px-7 py-3 rounded-full font-bold text-sm transition-all flex items-center gap-2 active:scale-95 ${
              isLight
                ? 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300 hover:text-slate-900 shadow-sm'
                : 'glass-hud border border-white/15 text-zinc-300 hover:border-white/30 hover:text-white'
            }`}
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>

          <a
            href="#contact"
            onClick={() => sound.playClick()}
            className="px-7 py-3 rounded-full bg-[#ef233c] hover:bg-[#d90429] text-white font-bold text-sm transition-all flex items-center gap-2 shadow-lg shadow-[#ef233c]/25 active:scale-95"
          >
            <Terminal className="w-4 h-4" />
            <span>Send Signal</span>
          </a>
        </motion.div>
      </div>

      {/* ── Stats Strip ── */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-16 sm:mt-20 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 w-full max-w-2xl px-2"
      >
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.85 + i * 0.07 }}
            className="flex flex-col items-center gap-0.5 text-center p-3 rounded-xl glass-hud border border-white/[0.07] hover:border-white/20 transition"
          >
            <span
              className="font-heading text-2xl sm:text-3xl font-black tabular-nums"
              style={{ color: stat.color }}
            >
              {stat.value}
            </span>
            <span className="text-[10px] sm:text-xs font-mono-tech text-zinc-400 leading-tight">{stat.label}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Stack chips ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.6 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs font-mono-tech max-w-2xl px-4"
      >
        <span className="text-zinc-500 mr-1">STACK:</span>
        {['React', 'TypeScript', 'Tailwind', 'Framer Motion', 'Solana', 'Vite', 'Node.js', 'Canvas API'].map((t) => (
          <span
            key={t}
            onMouseEnter={() => sound.playClick()}
            className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.07] text-zinc-300 hover:border-[#ef233c]/40 hover:text-white transition cursor-default"
          >
            {t}
          </span>
        ))}
      </motion.div>

      {/* ── Scroll Indicator ── */}
      <motion.a
        href="#about"
        onClick={() => sound.playClick()}
        animate={{ y: [0, 9, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-6 flex flex-col items-center gap-1.5 text-zinc-500 hover:text-zinc-300 transition text-[11px] font-mono-tech tracking-wider"
      >
        <span>SCROLL TO DESCEND</span>
        <ArrowDown className="w-3.5 h-3.5" />
      </motion.a>
    </section>
  );
};
