import React from 'react';
import { motion } from 'framer-motion';
import { sound } from '../utils/audio';
import { GithubIcon } from './Icons';
import { 
  Trophy, 
  ExternalLink, 
  ShieldCheck, 
  WifiOff, 
  QrCode, 
  Fingerprint, 
  Lock, 
  Zap, 
  Radio,
  ArrowUpRight,
  Sparkles,
  Layers
} from 'lucide-react';

interface HackathonsSectionProps {
  triggerSpiderSense: (msg?: string) => void;
}

export const HackathonsSection: React.FC<HackathonsSectionProps> = ({ triggerSpiderSense }) => {
  const hackathonProjects = [
    {
      id: 'street-sign',
      title: 'StreetSign',
      subtitle: 'Offline P2P Payments on Solana',
      tagline: 'Crypto payments without internet. Enables buyers to sign SOL transfers completely offline and broadcast via seller QR/NFC handshakes.',
      event: 'Solana Monolith Hackathon',
      badge: 'Solana Offline Cryptography',
      accentColor: '#14F195',
      secondaryColor: '#9945FF',
      github: 'https://github.com/alqamarzz/street-sign',
      stack: ['Solana Devnet', 'Next.js 14', 'TypeScript', 'Ed25519', 'NFC / QR', 'Tailwind CSS'],
      highlights: [
        '🔐 Offline Transaction Signing – Build & sign Solana transactions with 0kb internet',
        '📱 Device-to-Device QR & NFC – Instant payment via camera scan or phone tap',
        '📦 Smart Offline Queue – Auto-broadcasts pending txs once connectivity returns',
        '🔄 Blockhash Caching – Maintains transaction validity with proactive refresh'
      ],
      diagram: {
        step1: 'Buyer signs offline',
        step2: 'Encodes to QR / NFC',
        step3: 'Seller broadcasts to Solana',
      }
    },
    {
      id: 'guardian-key',
      title: 'GuardianKey',
      subtitle: 'Sovereign Asset Protection for Solana',
      tagline: 'A decentralized, biometric-secured dead-man\'s switch protocol. Protects liquid treasury assets from compromised keys or physical incapacitation.',
      event: 'Solana Monolith Hackathon',
      badge: 'Biometric Security Protocol',
      accentColor: '#9945FF',
      secondaryColor: '#00d2ff',
      github: 'https://github.com/alqamarzz/guardian-key',
      stack: ['Solana Anchor', 'React Native / Expo', 'Rust', 'iOS FaceID / Android Biometrics', 'Phantom Deeplinks'],
      highlights: [
        '🫀 Biometric Liveness Heartbeat – Periodic proof-of-life checks via FaceID / Fingerprint',
        '🛡️ Self-Custodial PDA Vault – Assets remain 100% in your own Program Derived Address',
        '⚡ Zero Seed Phrase Exposure – All interactions signed via Phantom mobile deeplinks',
        '⛓️ On-Chain Anchor Program – Immutable smart contract recovery logic on Solana'
      ],
      diagram: {
        step1: 'Lock assets in PDA vault',
        step2: 'Periodic biometric heartbeat',
        step3: 'Auto-recovery on timeout',
      }
    }
  ];

  return (
    <section id="hackathons" className="relative py-24 px-4 max-w-6xl mx-auto overflow-hidden">
      {/* Background Glow Accents */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#9945FF]/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#14F195]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="flex flex-col items-center mb-14 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#9945FF]/15 via-[#14F195]/15 to-[#ef233c]/15 border border-[#9945FF]/30 text-xs font-mono-tech mb-4 uppercase tracking-wider"
        >
          <Trophy className="w-3.5 h-3.5 text-[#14F195]" />
          <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#9945FF] to-[#14F195]">
            Monolith Solana Hackathon
          </span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-heading text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight"
        >
          Hackathon <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9945FF] via-[#00d2ff] to-[#14F195] font-comic">Deployments</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-zinc-400 text-sm sm:text-base max-w-2xl mt-3 leading-relaxed"
        >
          Engineered under high-velocity constraints during the global{' '}
          <strong className="text-zinc-200">Solana Monolith Hackathon</strong> — pioneering offline transaction cryptography 
          and biometric dead-man's switch self-custody.
        </motion.p>
      </div>

      {/* 2 Hackathon Project Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {hackathonProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            className="rounded-3xl glass-hud p-6 sm:p-8 border border-white/10 hover:border-[#9945FF]/50 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden shadow-2xl"
          >
            {/* Top decorative gradient sheen */}
            <div 
              className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-2xl opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity"
              style={{ backgroundColor: project.accentColor }}
            />

            <div>
              {/* Header Badge Row */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono-tech px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: project.accentColor }} />
                  {project.event}
                </span>

                <span 
                  className="text-[11px] font-mono-tech px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor: `${project.accentColor}18`,
                    color: project.accentColor,
                    border: `1px solid ${project.accentColor}40`
                  }}
                >
                  {project.badge}
                </span>
              </div>

              {/* Title & Subtitle */}
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold group-hover:text-white transition-colors flex items-center gap-2">
                <span>{project.title}</span>
              </h3>
              <p className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-400 mt-1 mb-3">
                {project.subtitle}
              </p>

              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6">
                {project.tagline}
              </p>

              {/* Visual Pipeline Box */}
              <div className="rounded-2xl bg-black/40 border border-white/10 p-4 mb-6 relative overflow-hidden">
                <div className="text-[10px] font-mono-tech uppercase text-zinc-400 tracking-wider mb-2 flex items-center justify-between">
                  <span>Architecture Protocol</span>
                  <span className="text-[#14F195] flex items-center gap-1">
                    <Zap className="w-3 h-3" /> Live Architecture
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-mono-tech pt-1">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/5 flex flex-col items-center justify-center gap-1">
                    {project.id === 'street-sign' ? (
                      <WifiOff className="w-4 h-4 text-amber-400" />
                    ) : (
                      <Lock className="w-4 h-4 text-[#9945FF]" />
                    )}
                    <span className="text-zinc-300 leading-tight">{project.diagram.step1}</span>
                  </div>

                  <div className="p-2 rounded-lg bg-white/5 border border-white/5 flex flex-col items-center justify-center gap-1">
                    {project.id === 'street-sign' ? (
                      <QrCode className="w-4 h-4 text-[#14F195]" />
                    ) : (
                      <Fingerprint className="w-4 h-4 text-[#00d2ff]" />
                    )}
                    <span className="text-zinc-300 leading-tight">{project.diagram.step2}</span>
                  </div>

                  <div className="p-2 rounded-lg bg-white/5 border border-white/5 flex flex-col items-center justify-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span className="text-zinc-300 leading-tight">{project.diagram.step3}</span>
                  </div>
                </div>
              </div>

              {/* Key Features List */}
              <div className="space-y-2 mb-6">
                <span className="text-xs font-mono-tech text-zinc-400 uppercase tracking-wider block">
                  Core Innovations:
                </span>
                {project.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                    <span className="text-[#14F195] font-bold">›</span>
                    <span className="leading-snug">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Stack & GitHub Link */}
            <div>
              {/* Stack badges */}
              <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-white/5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono-tech px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    sound.playThwip();
                    triggerSpiderSense(`Opening ${project.title} on GitHub`);
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#9945FF] to-[#7928CA] hover:from-[#7928CA] hover:to-[#9945FF] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#9945FF]/25 hover:shadow-[0_0_20px_rgba(153,69,255,0.4)] transition-all active:scale-[0.98] cursor-pointer"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>Inspect on GitHub</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
