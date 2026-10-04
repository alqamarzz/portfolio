import React from 'react';
import { motion } from 'framer-motion';
import { sound } from '../utils/audio';
import { 
  Zap, 
  MapPin, 
  Sparkles, 
  Cpu, 
  Compass, 
  Flame
} from 'lucide-react';

interface AboutBentoProps {
  triggerSpiderSense: (msg?: string) => void;
}

export const AboutBento: React.FC<AboutBentoProps> = ({ triggerSpiderSense }) => {
  const skills = [
    { name: 'React 18/19', category: 'Frontend', level: 'Master' },
    { name: 'TypeScript', category: 'Language', level: 'Expert' },
    { name: 'Tailwind CSS', category: 'Styling', level: 'Expert' },
    { name: 'Framer Motion', category: 'Animation', level: 'Master' },
    { name: 'Solana / Web3', category: 'Ecosystem', level: 'Advanced' },
    { name: 'Next.js', category: 'Fullstack', level: 'Advanced' },
    { name: 'Vite & Tooling', category: 'Workflow', level: 'Expert' },
    { name: 'UI / UX Craft', category: 'Design', level: 'Master' },
  ];

  return (
    <section id="about" className="relative py-24 px-4 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center mb-14 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ef233c]/10 border border-[#ef233c]/30 text-[#ef233c] text-xs font-mono-tech mb-3 uppercase tracking-wider"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Origin & Arsenal</span>
        </motion.div>

        <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Every Hero Has An <span className="text-[#ef233c] font-comic tracking-normal">Origin</span>
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base max-w-xl mt-3">
          Behind every polished interface lies intense curiosity, precision engineering, and an obsession with tactile smoothness.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Card 1: Bio / Origin Story (Col span 2) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="md:col-span-2 rounded-2xl glass-hud p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-[#ef233c]/40 transition"
        >
          {/* Subtle Halftone Corner Accent */}
          <div className="absolute -top-12 -right-12 w-40 h-40 comic-halftone rounded-full opacity-30 pointer-events-none" />

          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#ef233c]/15 border border-[#ef233c]/30 flex items-center justify-center text-[#ef233c]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-white">The Design Engineer</h3>
                <p className="text-xs text-zinc-400 font-mono-tech">Crafting Tactile Digital Worlds</p>
              </div>
            </div>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-4">
              I’m <strong className="text-white">Alqamar</strong>, a frontend engineer and interface designer who bridges the gap between pure code and intuitive human emotion.
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Just like Spider-Man relies on web-shooters engineered with millimeter accuracy, I build web components that feel fast, organic, and physically satisfying to interact with. Whether it's high-frequency financial charts or swipe gestures, I obsess over the 60fps details.
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono-tech text-zinc-400">
            <span className="flex items-center gap-1.5 text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-[#ef233c]" />
              Superpower: Micro-Interactions
            </span>
            <span className="text-[#00d2ff]">Earth-616 Ready</span>
          </div>
        </motion.div>

        {/* Card 2: Spider Philosophy Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="rounded-2xl bg-gradient-to-br from-[#ef233c]/20 via-[#0d111a] to-[#07090e] border border-[#ef233c]/30 p-6 flex flex-col justify-between relative group"
        >
          <div className="flex items-center justify-between">
            <span className="font-comic text-xs tracking-widest text-[#ef233c] uppercase">Core Creed</span>
            <Flame className="w-4 h-4 text-[#ef233c]" />
          </div>

          <div className="my-6">
            <span className="font-comic text-3xl sm:text-4xl text-white tracking-wide block leading-none mb-2">
              "WITH GREAT CODE"
            </span>
            <span className="text-zinc-300 text-xs sm:text-sm font-medium leading-normal">
              comes great responsibility to ensure accessibility, lightning-fast rendering, and delight on every user touch.
            </span>
          </div>

          <div className="text-[11px] font-mono-tech text-zinc-500">
            Uncle Ben’s Git Commit #001
          </div>
        </motion.div>

        {/* Card 3: Location / Multiverse Node */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="rounded-2xl glass-hud p-6 flex flex-col justify-between hover:border-[#00d2ff]/40 transition group"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-[#00d2ff]/10 border border-[#00d2ff]/30 flex items-center justify-center text-[#00d2ff]">
              <Compass className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              ONLINE
            </span>
          </div>

          <div className="my-4">
            <div className="flex items-center gap-1.5 text-zinc-400 text-xs mb-1">
              <MapPin className="w-3.5 h-3.5 text-[#ef233c]" />
              <span>Base Coordinates</span>
            </div>
            <h4 className="font-heading text-xl font-bold text-white">India (IST)</h4>
            <p className="text-xs text-zinc-400 mt-1">
              Collaborating across US, Europe, and global remote teams seamlessly.
            </p>
          </div>

          <div className="text-[11px] font-mono-tech text-zinc-500 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>Low Ping Worldwide</span>
          </div>
        </motion.div>

        {/* Card 4: Web-Shooter Arsenal / Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="md:col-span-3 lg:col-span-4 rounded-2xl glass-hud p-6 sm:p-8 hover:border-white/20 transition"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-white">
                  Web-Shooter Tech Arsenal
                </h3>
                <p className="text-xs text-zinc-400 font-mono-tech">
                  Languages, Frameworks, and Tools in my Belt
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playThwip();
                triggerSpiderSense('ARSENAL ARMED & READY!');
              }}
              className="self-start sm:self-auto text-xs font-mono-tech px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#ef233c] text-zinc-300 hover:text-white transition flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 text-[#ef233c]" />
              <span>Calibrate Web-Shooters</span>
            </button>
          </div>

          {/* Grid of Skill Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {skills.map((skill) => (
              <div
                key={skill.name}
                onMouseEnter={() => sound.playClick()}
                className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.05] hover:border-[#ef233c]/30 transition group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-wider font-mono-tech text-zinc-400 group-hover:text-[#ef233c] transition-colors">
                    {skill.category}
                  </span>
                  <span className="text-[10px] font-mono-tech px-1.5 py-0.5 rounded bg-white/5 text-zinc-400">
                    {skill.level}
                  </span>
                </div>
                <div className="font-medium text-white text-sm group-hover:translate-x-0.5 transition-transform">
                  {skill.name}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
