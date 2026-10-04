import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const experiences = [
    {
      role: 'Frontend & Design Engineer',
      organization: 'Independent / Contract Labs',
      period: '2024 — Present',
      location: 'Remote · Worldwide',
      badge: 'Active Patrol',
      points: [
        'Architected and delivered interactive component libraries and motion-driven web applications for Web3 and fintech founders.',
        'Engineered 60fps gesture-driven components, custom canvas renderers, and responsive multi-touch swipe systems.',
        'Crafted design tokens, micro-interactions, and accessible UI kits reducing development turnaround time for client projects by 40%.',
      ],
    },
    {
      role: 'Web3 & Interface Specialist',
      organization: 'Solana Ecosystem Projects',
      period: '2023 — 2024',
      location: 'Decentralized Community',
      badge: 'Ecosystem',
      points: [
        'Developed real-time token charting utilities and wallet connection interfaces with zero-latency visual feedback.',
        'Collaborated with open-source contributors on frictionless onboarding and tactile trading workflows.',
        'Integrated RPC state synchronization, transaction status toasts, and gas optimization monitors.',
      ],
    },
    {
      role: 'Creative Developer & UI Craftsman',
      organization: 'Frontend Experiments & Labs',
      period: '2022 — 2023',
      location: 'Open Source',
      badge: 'Genesis',
      points: [
        'Built skeuomorphic 3D digital elements using CSS perspective transforms and Framer Motion spring physics.',
        'Published reusable React hooks for gesture handling, responsive layouts, and SVG path drawing animations.',
      ],
    },
  ];

  return (
    <section id="experience" className="relative py-24 px-4 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ef233c]/10 border border-[#ef233c]/30 text-[#ef233c] text-xs font-mono-tech mb-3 uppercase tracking-wider"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Patrol History</span>
        </motion.div>

        <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight">
          Battle-Tested <span className="text-[#ef233c] font-comic">Experience</span>
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base max-w-lg mt-2">
          Tracking patrol records, missions completed, and production products shipped.
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative border-l-2 border-white/10 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
        <div className="absolute top-0 bottom-0 left-[-2px] w-[2px] bg-gradient-to-b from-[#ef233c] via-[#00d2ff] to-transparent pointer-events-none" />

        {experiences.map((exp, idx) => (
          <motion.div
            key={exp.role + exp.period}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="relative group"
          >
            {/* Timeline Node */}
            <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-6 h-6 rounded-full bg-[#0d111a] border-2 border-[#ef233c] flex items-center justify-center shadow-[0_0_10px_rgba(239,35,60,0.6)] group-hover:scale-125 transition-transform">
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>

            {/* Experience Card */}
            <div className="rounded-2xl glass-hud p-6 sm:p-7 border border-white/10 group-hover:border-[#ef233c]/40 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div>
                  <h3 className="font-heading text-xl font-bold group-hover:text-[#ef233c] transition-colors">
                    {exp.role}
                  </h3>
                  <div className="text-zinc-300 text-sm font-medium mt-0.5">
                    {exp.organization}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="text-[11px] font-mono-tech px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-[#00d2ff]" />
                    <span>{exp.period}</span>
                  </span>
                  <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded-full bg-[#ef233c]/15 text-[#ef233c] border border-[#ef233c]/30 font-semibold uppercase">
                    {exp.badge}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs text-zinc-500 font-mono-tech mb-4">
                <MapPin className="w-3 h-3" />
                <span>{exp.location}</span>
              </div>

              {/* Bullet Points */}
              <ul className="space-y-2.5 text-zinc-400 text-xs sm:text-sm leading-relaxed">
                {exp.points.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#ef233c] mt-0.5 shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
