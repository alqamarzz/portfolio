import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Zap, Award, Shield, Globe } from 'lucide-react';

export const AchievementsSection: React.FC = () => {
  const achievements = [
    {
      icon: Star,
      title: 'Open Source Contributor',
      desc: '10+ public repos; components used across projects by the community.',
      color: '#ffd166',
      badge: 'COMMUNITY',
    },
    {
      icon: Zap,
      title: 'Web3 Solana Builder',
      desc: 'Shipped real-time Solana DeFi charting tools for active traders.',
      color: '#00d2ff',
      badge: 'WEB3',
    },
    {
      icon: Shield,
      title: '60fps Physics Perfectionist',
      desc: 'Every component built to hit 60fps with Spring physics & GPU layers.',
      color: '#ef233c',
      badge: 'PERF',
    },
    {
      icon: Award,
      title: 'Design Engineering Hybrid',
      desc: 'Bridging the gap between pixel-perfect visual design and production code.',
      color: '#a855f7',
      badge: 'CRAFT',
    },
    {
      icon: Globe,
      title: 'Remote-First Collaborator',
      desc: 'Delivered projects across US, EU, SEA time zones without friction.',
      color: '#06d6a0',
      badge: 'GLOBAL',
    },
    {
      icon: Trophy,
      title: 'Shipped Over 15 Products',
      desc: 'From 0→1 MVPs and trading tools to interactive component libraries.',
      color: '#ff9f1c',
      badge: 'MILESTONE',
    },
  ];

  return (
    <section id="achievements" className="relative py-24 px-4 max-w-6xl mx-auto">
      {/* Left radial glow */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-[#ef233c]/8 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="flex flex-col items-center mb-14 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-mono-tech mb-3 uppercase tracking-wider"
        >
          <Trophy className="w-3.5 h-3.5" />
          <span>Badge Collection</span>
        </motion.div>

        <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Earned <span className="font-comic text-[#ef233c]">Badges</span> & Honours
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base max-w-lg mt-3">
          Notable achievements, superpowers unlocked, and missions completed that define the engineering profile.
        </p>
      </div>

      {/* Achievement Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {achievements.map((ach, idx) => {
          const Icon = ach.icon;
          return (
            <motion.div
              key={ach.title}
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.07 }}
              whileHover={{ y: -4 }}
              className="glass-hud rounded-2xl p-5 sm:p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Glow blob */}
              <div
                className="absolute -top-8 -right-8 w-28 h-28 rounded-full blur-2xl opacity-20 pointer-events-none group-hover:opacity-35 transition-opacity duration-500"
                style={{ backgroundColor: ach.color }}
              />

              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center border shadow-lg"
                  style={{
                    backgroundColor: `${ach.color}18`,
                    borderColor: `${ach.color}40`,
                    color: ach.color,
                  }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className="text-[10px] font-mono-tech font-bold px-2 py-0.5 rounded-full border"
                  style={{
                    backgroundColor: `${ach.color}12`,
                    borderColor: `${ach.color}30`,
                    color: ach.color,
                  }}
                >
                  {ach.badge}
                </span>
              </div>

              <h3 className="font-heading text-base sm:text-lg font-bold text-white mb-2 group-hover:text-white transition-colors">
                {ach.title}
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                {ach.desc}
              </p>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(to right, transparent, ${ach.color}, transparent)` }}
              />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
