import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sound } from '../utils/audio';
import {
  Zap,
  MapPin,
  Sparkles,
  Cpu,
  Compass,
  Flame,
  Code2,
  Layers,
  Palette,
  GitBranch,
} from 'lucide-react';

interface AboutBentoProps {
  triggerSpiderSense: (msg?: string) => void;
}

const SKILLS = [
  { name: 'React 18/19', category: 'Frontend', level: 'Master', icon: Code2, color: '#61dafb' },
  { name: 'TypeScript', category: 'Language', level: 'Expert', icon: Code2, color: '#3178c6' },
  { name: 'Tailwind CSS', category: 'Styling', level: 'Expert', icon: Palette, color: '#06b6d4' },
  { name: 'Framer Motion', category: 'Animation', level: 'Master', icon: Sparkles, color: '#ef233c' },
  { name: 'Solana / Web3', category: 'Ecosystem', level: 'Advanced', icon: Zap, color: '#9945ff' },
  { name: 'Next.js', category: 'Fullstack', level: 'Advanced', icon: Layers, color: '#ffffff' },
  { name: 'Vite & Tooling', category: 'Workflow', level: 'Expert', icon: GitBranch, color: '#ffd62e' },
  { name: 'UI / UX Craft', category: 'Design', level: 'Master', icon: Palette, color: '#a855f7' },
];

const LEVEL_COLORS: Record<string, string> = {
  Master: '#ef233c',
  Expert: '#00d2ff',
  Advanced: '#a855f7',
};

export const AboutBento: React.FC<AboutBentoProps> = ({ triggerSpiderSense }) => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section id="about" className="relative py-24 px-4 max-w-6xl mx-auto">
      {/* Decorative background glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 bg-[#00d2ff]/8 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="flex flex-col items-center mb-14 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ef233c]/10 border border-[#ef233c]/30 text-[#ef233c] text-xs font-mono-tech mb-3 uppercase tracking-wider"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Origin Story</span>
        </motion.div>
        <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight">
          Every Hero Has An{' '}
          <span className="text-[#ef233c] font-comic tracking-normal">Origin</span>
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base max-w-xl mt-3 leading-relaxed">
          Behind every polished interface lies intense curiosity, precision engineering, and an obsession
          with tactile smoothness.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">

        {/* ── Card 1: Bio (wide) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="md:col-span-2 rounded-2xl glass-hud p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden hover:border-[#ef233c]/40 transition group"
        >
          {/* Corner halftone accent */}
          <div className="absolute -top-14 -right-14 w-44 h-44 comic-halftone rounded-full opacity-25 pointer-events-none" />

          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-[#ef233c]/15 border border-[#ef233c]/30 flex items-center justify-center text-[#ef233c]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold">The Design Engineer</h3>
                <p className="text-xs text-zinc-400 font-mono-tech">Crafting Tactile Digital Worlds</p>
              </div>
            </div>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-3">
              I'm <strong className="font-bold">Alqamar</strong>, a frontend engineer and
              interface designer bridging the gap between pure code and intuitive human emotion.
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Just like Spider-Man's web-shooters are engineered with millimeter accuracy, I build
              components that feel fast, organic, and physically satisfying to interact with — from
              high-frequency financial charts to spring-physics swipe gestures, I obsess over the
              60fps details.
            </p>
          </div>

          <div className="pt-5 mt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono-tech">
            <span className="flex items-center gap-1.5 text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-[#ef233c] shadow-[0_0_6px_rgba(239,35,60,0.8)]" />
              Superpower: Micro-Interactions
            </span>
            <span className="text-[#00d2ff]">Earth-616 Ready ✓</span>
          </div>
        </motion.div>

        {/* ── Card 2: Spider Creed Quote ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="rounded-2xl bg-gradient-to-br from-[#ef233c]/20 via-[#0d111a] to-[#07090e] border border-[#ef233c]/30 p-6 flex flex-col justify-between relative group hover:border-[#ef233c]/50 transition"
        >
          <div className="flex items-center justify-between">
            <span className="font-comic text-[11px] tracking-widest text-[#ef233c] uppercase">
              Core Creed
            </span>
            <Flame className="w-4 h-4 text-[#ef233c]" />
          </div>

          <div className="my-5">
            <span className="font-comic text-2xl sm:text-3xl tracking-wide block leading-tight mb-2">
              "WITH GREAT CODE COMES GREAT RESPONSIBILITY"
            </span>
            <span className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              — to ensure accessibility, lightning-fast rendering, and delight on every user touch.
            </span>
          </div>

          <div className="text-[11px] font-mono-tech text-zinc-500">
            Uncle Ben's Git Commit #001
          </div>
        </motion.div>

        {/* ── Card 3: Location ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="rounded-2xl glass-hud p-6 flex flex-col justify-between hover:border-[#00d2ff]/40 transition group"
        >
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-lg bg-[#00d2ff]/10 border border-[#00d2ff]/30 flex items-center justify-center text-[#00d2ff]">
              <Compass className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              ONLINE
            </span>
          </div>

          <div className="my-4">
            <div className="flex items-center gap-1.5 text-zinc-400 text-xs mb-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#ef233c]" />
              <span className="font-mono-tech">Base Coordinates</span>
            </div>
            <h4 className="font-heading text-2xl font-bold">India (IST)</h4>
            <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
              Seamlessly collaborating across US, EU, and SEA time zones.
            </p>
          </div>

          <div className="text-[11px] font-mono-tech text-zinc-500">
            Low Ping · Async-Friendly · No-friction
          </div>
        </motion.div>

        {/* ── Card 4: Web-Shooter Tech Arsenal (full width) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="md:col-span-3 lg:col-span-4 rounded-2xl glass-hud p-6 sm:p-8 hover:border-white/20 transition"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold">Web-Shooter Tech Arsenal</h3>
                <p className="text-xs text-zinc-400 font-mono-tech">Languages, Frameworks & Tools</p>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playThwip();
                triggerSpiderSense('ARSENAL FULLY ARMED!');
              }}
              className="self-start sm:self-auto text-xs font-mono-tech px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#ef233c] text-zinc-300 hover:text-white transition flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 text-[#ef233c]" />
              Calibrate Shooters
            </button>
          </div>

          {/* Skill Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {SKILLS.map((skill) => {
              const Icon = skill.icon;
              const isHovered = hoveredSkill === skill.name;
              return (
                <motion.div
                  key={skill.name}
                  onMouseEnter={() => { setHoveredSkill(skill.name); sound.playClick(); }}
                  onMouseLeave={() => setHoveredSkill(null)}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-[#ef233c]/35 transition-all cursor-default flex flex-col gap-2 relative overflow-hidden"
                >
                  {/* Level pip bottom bar */}
                  <div
                    className="absolute bottom-0 left-0 h-[2px] transition-all duration-500 rounded-b-xl"
                    style={{
                      width: isHovered ? '100%' : '0%',
                      backgroundColor: LEVEL_COLORS[skill.level] ?? '#ef233c',
                    }}
                  />
                  <div className="flex items-center justify-between">
                    <Icon className="w-4 h-4" style={{ color: skill.color }} />
                    <span
                      className="text-[10px] font-mono-tech px-1.5 py-0.5 rounded border transition-colors"
                      style={isHovered
                        ? { color: LEVEL_COLORS[skill.level], borderColor: `${LEVEL_COLORS[skill.level]}50`, backgroundColor: `${LEVEL_COLORS[skill.level]}12` }
                        : { color: '#71717a', borderColor: 'rgba(255,255,255,0.07)', backgroundColor: 'transparent' }
                      }
                    >
                      {skill.level}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-sm leading-tight">{skill.name}</div>
                    <div className="text-[10px] font-mono-tech text-zinc-500 uppercase tracking-wider mt-0.5">
                      {skill.category}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
