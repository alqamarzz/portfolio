import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/audio';
import { ComponentsSection } from './ComponentsSection';
import { FullstackSection } from './FullstackSection';
import { HackathonsSection } from './HackathonsSection';
import {
  Layers,
  Server,
  Trophy,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Cpu
} from 'lucide-react';

export type ShowcaseTabId = 'components' | 'fullstack' | 'hackathons';

interface MissionsShowcaseProps {
  activeTab: ShowcaseTabId;
  setActiveTab: (tab: ShowcaseTabId) => void;
  triggerSpiderSense: (msg?: string) => void;
  isLight?: boolean;
}

interface TabConfig {
  id: ShowcaseTabId;
  label: string;
  countBadge: string;
  shortDesc: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
}

const TABS: TabConfig[] = [
  {
    id: 'components',
    label: 'Components',
    countBadge: '7 Items',
    shortDesc: 'Tactile UI & Spring Physics',
    icon: Layers,
    accentColor: '#ef233c',
  },
  {
    id: 'fullstack',
    label: 'Fullstack Projects',
    countBadge: 'Nexus Chat + MERN',
    shortDesc: 'Real-Time WebSockets & Gemini AI',
    icon: Server,
    accentColor: '#38bdf8',
  },
  {
    id: 'hackathons',
    label: 'Hackathons',
    countBadge: '2 Protocols',
    shortDesc: 'Solana Monolith Offline Crypto',
    icon: Trophy,
    accentColor: '#14F195',
  },
];

export const MissionsShowcase: React.FC<MissionsShowcaseProps> = ({
  activeTab,
  setActiveTab,
  triggerSpiderSense,
  isLight,
}) => {
  const currentIndex = TABS.findIndex((t) => t.id === activeTab);
  const [slideDirection, setSlideDirection] = useState<number>(1);
  const [hoverActive, setHoverActive] = useState<ShowcaseTabId>(activeTab);

  // Sync hoverActive when activeTab changes
  useEffect(() => {
    setHoverActive(activeTab);
  }, [activeTab]);

  const handleTabChange = (targetTab: ShowcaseTabId) => {
    if (targetTab === activeTab) return;
    const nextIndex = TABS.findIndex((t) => t.id === targetTab);
    setSlideDirection(nextIndex > currentIndex ? 1 : -1);
    setActiveTab(targetTab);
    setHoverActive(targetTab);
    sound.playClick();
    triggerSpiderSense(`SWITCHED TO ${targetTab.toUpperCase()} LAB`);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + TABS.length) % TABS.length;
    handleTabChange(TABS[prevIndex].id);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % TABS.length;
    handleTabChange(TABS[nextIndex].id);
  };

  const activeConfig = TABS[currentIndex] || TABS[0];

  return (
    <section id="showcase" className="relative py-20 overflow-hidden">
      {/* Anchor links for deep navigation & navbar matching */}
      <div id="projects" className="absolute -top-20" />
      <div id="components" className="absolute -top-20" />
      <div id="fullstack" className="absolute -top-20" />
      <div id="hackathons" className="absolute -top-20" />

      {/* Ambient background glows mapped to active tab accent */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full blur-[130px] opacity-15 pointer-events-none transition-all duration-700 -z-10"
        style={{ backgroundColor: activeConfig.accentColor }}
      />

      {/* ── Section Header ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-mono-tech mb-4 uppercase tracking-wider backdrop-blur-md ${
            isLight
              ? 'bg-[#F2ECE1] border-[#E2D9CB] text-stone-700'
              : 'bg-white/5 border-white/10 text-zinc-300'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#ef233c]" />
          <span>Classified Missions Database</span>
          <span className={`font-semibold ${isLight ? 'text-stone-400' : 'text-zinc-500'}`}>· Dynamic Bubble Dock</span>
        </motion.div>

        <h2 className={`font-heading text-4xl sm:text-6xl font-extrabold tracking-tight ${isLight ? 'text-stone-900' : ''}`}>
          Shipped <span className="text-[#ef233c] font-comic">Missions</span> & Craft
        </h2>

        <p className={`text-sm sm:text-base max-w-xl mt-3 leading-relaxed ${isLight ? 'text-stone-600' : 'text-zinc-400'}`}>
          Switch horizontally between tactile UI components, fullstack real-time platforms, and Web3 hackathon protocols.
        </p>

        {/* ── Dynamic Bubble Pill Dock (Inspired by Bubble Navbar) ── */}
        <div
          onMouseLeave={() => setHoverActive(activeTab)}
          className={`mt-10 w-full max-w-3xl flex items-center justify-between gap-2 p-2 rounded-full border transition-all duration-300 ${
            isLight
              ? 'bg-[#FAF7F2]/90 border-[#E5DDD0] shadow-[0_15px_35px_rgba(140,120,95,0.12),inset_0_1px_1px_rgba(255,255,255,0.8)] backdrop-blur-xl'
              : 'bg-neutral-900/70 border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.65),inset_0_1px_1px_rgba(255,255,255,0.18)] backdrop-blur-xl'
          }`}
        >
          
          {/* Quick Prev Button */}
          <button
            onClick={handlePrev}
            className={`p-2.5 rounded-full transition-colors hidden sm:flex items-center justify-center cursor-pointer ${
              isLight
                ? 'text-stone-500 hover:text-stone-900 hover:bg-stone-200/50'
                : 'text-zinc-400 hover:text-white hover:bg-white/10'
            }`}
            title="Previous domain"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Tab Buttons with Dynamic Dual-Bubble Springs */}
          <div className="grid grid-cols-3 gap-1.5 flex-1 relative">
            {TABS.map((tab) => {
              const isActive = tab.id === activeTab;
              const isHovered = tab.id === hoverActive;
              const Icon = tab.icon;

              return (
                <button
                  key={tab.id}
                  onMouseEnter={() => setHoverActive(tab.id)}
                  onClick={() => handleTabChange(tab.id)}
                  className={`relative py-3 px-2 sm:px-4 rounded-full flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 transition-colors duration-200 cursor-pointer text-center sm:text-left ${
                    isActive
                      ? isLight ? 'text-stone-900 font-bold' : 'text-white font-bold'
                      : isLight
                        ? 'text-stone-600 hover:text-stone-900'
                        : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {/* Bubble Layer 1: Magnetic Hover Bubble */}
                  {isHovered && (
                    <motion.div
                      layoutId="missions-bubble-hover"
                      className={`absolute inset-0 rounded-full -z-10 ${
                        isLight
                          ? 'bg-stone-900/5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]'
                          : 'bg-white/10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)]'
                      }`}
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 35,
                      }}
                    />
                  )}

                  {/* Bubble Layer 2: Click-Active Elastic Specular Bubble */}
                  {isActive && (
                    <motion.div
                      layoutId="missions-bubble-active"
                      className={`absolute inset-0 rounded-full -z-10 ${
                        isLight
                          ? 'bg-[#FFFDF9] border border-[#DDD6C8] shadow-[0_4px_16px_rgba(140,120,95,0.15),inset_0_1.5px_2px_rgba(255,255,255,0.9)]'
                          : 'bg-white/15 border border-white/25 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.3)]'
                      }`}
                      style={{
                        borderColor: isLight ? undefined : `${tab.accentColor}80`,
                        boxShadow: isLight
                          ? undefined
                          : `0 0 24px ${tab.accentColor}35, inset 0 1.5px 2px rgba(255,255,255,0.25)`,
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}

                  <div
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 transition-colors shadow-xs"
                    style={{
                      backgroundColor: isActive
                        ? `${tab.accentColor}25`
                        : isLight
                        ? 'rgba(120,100,80,0.08)'
                        : 'rgba(255,255,255,0.06)',
                      color: isActive ? tab.accentColor : isLight ? '#78716C' : 'inherit',
                    }}
                  >
                    <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  </div>

                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                      <span className={`text-xs sm:text-sm font-heading font-extrabold truncate ${isLight && !isActive ? 'text-stone-700' : ''}`}>
                        {tab.label}
                      </span>
                      <span
                        className="text-[9px] sm:text-[10px] font-mono-tech px-2 py-0.5 rounded-full hidden md:inline-block uppercase font-bold"
                        style={{
                          backgroundColor: `${tab.accentColor}20`,
                          color: tab.accentColor,
                        }}
                      >
                        {tab.countBadge}
                      </span>
                    </div>
                    <span className={`text-[10px] sm:text-[11px] font-mono-tech truncate hidden xs:block ${isLight ? 'text-stone-500' : 'text-zinc-400'}`}>
                      {tab.shortDesc}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Next Button */}
          <button
            onClick={handleNext}
            className={`p-2.5 rounded-full transition-colors hidden sm:flex items-center justify-center cursor-pointer ${
              isLight
                ? 'text-stone-500 hover:text-stone-900 hover:bg-stone-200/50'
                : 'text-zinc-400 hover:text-white hover:bg-white/10'
            }`}
            title="Next domain"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ── Active Tab Content With Smooth Horizontal Slide ── */}
      <div className="relative min-h-[480px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: slideDirection * 45 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: slideDirection * -45 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            {activeTab === 'components' && (
              <ComponentsSection
                triggerSpiderSense={triggerSpiderSense}
                isEmbedded={true}
              />
            )}

            {activeTab === 'fullstack' && (
              <FullstackSection
                triggerSpiderSense={triggerSpiderSense}
                isEmbedded={true}
                isLight={isLight}
              />
            )}

            {activeTab === 'hackathons' && (
              <HackathonsSection
                triggerSpiderSense={triggerSpiderSense}
                isEmbedded={true}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
