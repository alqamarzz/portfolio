import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { ArrowDown, Flame, Code2, Sparkles, Terminal } from 'lucide-react';

interface HeroProps {
  triggerSpiderSense: (msg?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ triggerSpiderSense }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = [
    'Design Engineer',
    'Tactile Frontend Craftsman',
    'Motion & Interaction Specialist',
    'Solana / Web3 Builder',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [roles.length]);

  const fireWebCelebration = () => {
    sound.playThwip();
    triggerSpiderSense('THWIP! WEB DEPLOYED!');
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ef233c', '#00d2ff', '#ffffff', '#ffd166'],
    });
  };

  const nameLetters = 'ALQAMAR'.split('');

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 overflow-hidden">
      {/* Spider Web Radial Backlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#ef233c]/15 via-[#00d2ff]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Floating Hanging Spider Mascot (Interactive Swing) */}
      <motion.div
        className="absolute top-0 right-[10%] sm:right-[15%] md:right-[20%] z-20 flex flex-col items-center cursor-pointer pointer-events-auto"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 12, delay: 0.2 }}
        whileHover={{ y: 25, rotate: [0, -10, 10, -5, 0] }}
        onClick={fireWebCelebration}
        title="Click to Thwip!"
      >
        {/* Web Strand */}
        <div className="w-[1.5px] h-32 sm:h-44 bg-gradient-to-b from-white/20 via-white/60 to-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
        {/* Upside Down Spider-Man Badge */}
        <motion.div
          animate={{ rotate: [0, 4, -4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative -mt-1 p-2 rounded-full bg-zinc-900 border border-white/20 shadow-xl group"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-b from-[#ef233c] to-[#990011] flex items-center justify-center shadow-lg relative">
            <span className="text-xl transform rotate-180 select-none">🕷️</span>
          </div>
          <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition whitespace-nowrap bg-black/90 border border-white/20 text-[10px] px-2 py-0.5 rounded text-white font-comic pointer-events-none">
            THWIP ME!
          </div>
        </motion.div>
      </motion.div>

      {/* Status Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 shadow-sm hover:border-[#ef233c]/40 transition"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-xs sm:text-sm font-medium text-zinc-300">
          Friendly Neighborhood Developer · Available for Work
        </span>
      </motion.div>

      {/* Giant Interactive Wordmark */}
      <div className="relative flex flex-col items-center select-none text-center">
        {/* Comic Hand-Drawn Badge Overlay */}
        <motion.div
          initial={{ rotate: -12, scale: 0 }}
          animate={{ rotate: -8, scale: 1 }}
          transition={{ type: 'spring', delay: 0.4 }}
          className="absolute -top-7 sm:-top-9 left-2 sm:-left-6 z-20 bg-[#ef233c] text-white px-3 py-0.5 rounded-lg border-2 border-white shadow-lg pointer-events-none"
        >
          <span className="font-comic text-xs sm:text-sm tracking-wider uppercase">
            Earth-616 Codebase
          </span>
        </motion.div>

        {/* Name Title */}
        <h1 className="flex items-center justify-center font-heading text-6xl sm:text-8xl md:text-9xl font-black tracking-tight text-white mb-2">
          {nameLetters.map((char, index) => (
            <motion.span
              key={index}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: 0.15 + index * 0.05,
              }}
              whileHover={{
                y: -12,
                color: '#ef233c',
                scale: 1.1,
                rotate: (index % 2 === 0 ? 5 : -5),
                transition: { duration: 0.15 },
              }}
              onMouseEnter={() => sound.playClick()}
              className="inline-block cursor-default transition-colors duration-200"
            >
              {char}
            </motion.span>
          ))}
        </h1>

        {/* Animated Role Switcher */}
        <div className="h-10 sm:h-12 flex items-center justify-center overflow-hidden my-1">
          <motion.div
            key={roleIndex}
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -25, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#ef233c] animate-pulse" />
            <span className="text-xl sm:text-2xl md:text-3xl font-semibold bg-gradient-to-r from-zinc-100 via-zinc-300 to-zinc-400 bg-clip-text text-transparent">
              {roles[roleIndex]}
            </span>
            <Sparkles className="w-4 h-4 text-[#00d2ff] animate-pulse" />
          </motion.div>
        </div>

        {/* Subtitle Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="max-w-xl text-sm sm:text-base text-zinc-400 font-normal leading-relaxed mt-3 px-4"
        >
          Building polished, tactile web experiences and shipped products. Specializing in fluid React interfaces, physics-based interactions, and Web3 performance.
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8"
        >
          <a
            href="#projects"
            onClick={() => sound.playClick()}
            className="px-6 py-3 rounded-full bg-white text-zinc-950 font-semibold text-sm hover:bg-zinc-200 transition-all flex items-center gap-2 shadow-lg shadow-white/10 hover:shadow-white/20 active:scale-95"
          >
            <Code2 className="w-4 h-4 text-[#ef233c]" />
            <span>Explore Missions</span>
          </a>

          <button
            onClick={fireWebCelebration}
            className="px-6 py-3 rounded-full glass-hud border border-white/15 text-white font-semibold text-sm hover:border-[#ef233c] hover:text-[#ef233c] transition-all flex items-center gap-2 active:scale-95 group"
          >
            <Flame className="w-4 h-4 text-[#ef233c] group-hover:rotate-12 transition-transform" />
            <span>Thwip Web!</span>
          </button>

          <a
            href="#contact"
            onClick={() => sound.playClick()}
            className="px-6 py-3 rounded-full bg-[#ef233c] text-white font-semibold text-sm hover:bg-[#d90429] transition-all flex items-center gap-2 shadow-lg shadow-[#ef233c]/25 active:scale-95"
          >
            <Terminal className="w-4 h-4" />
            <span>Send Signal</span>
          </a>
        </motion.div>
      </div>

      {/* Floating Tech Chips Strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="mt-16 flex flex-wrap items-center justify-center gap-2 text-xs font-mono-tech text-zinc-500 max-w-2xl px-4"
      >
        <span className="text-zinc-400">STACK:</span>
        {['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Solana', 'Vite', 'Node.js'].map((item) => (
          <span
            key={item}
            className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-zinc-300 hover:border-[#ef233c]/40 hover:text-white transition"
          >
            {item}
          </span>
        ))}
      </motion.div>

      {/* Scroll Indicator */}
      <motion.a
        href="#about"
        onClick={() => sound.playClick()}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-6 flex flex-col items-center gap-1 text-zinc-500 hover:text-zinc-300 transition text-xs font-mono-tech"
      >
        <span>SCROLL DOWN</span>
        <ArrowDown className="w-3.5 h-3.5" />
      </motion.a>
    </section>
  );
};
