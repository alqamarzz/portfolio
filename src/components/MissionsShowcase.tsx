import React, { useState } from 'react';
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

  const handleTabChange = (targetTab: ShowcaseTabId) => {
    if (targetTab === activeTab) return;
    const nextIndex = TABS.findIndex((t) => t.id === targetTab);
    setSlideDirection(nextIndex > currentIndex ? 1 : -1);
    setActiveTab(targetTab);
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-8 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono-tech mb-3 uppercase tracking-wider backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#ef233c]" />
          <span className="text-zinc-300">Classified Missions Database</span>
          <span className="text-zinc-500 font-semibold">· Tabbed Control Deck</span>
        </motion.div>

        <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight">
          Shipped <span className="text-[#ef233c] font-comic">Missions</span> & Craft
        </h2>

        <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mt-2 leading-relaxed">
          Switch horizontally between tactile UI components, fullstack real-time platforms, and Web3 hackathon protocols.
        </p>

        {/* ── Segmented Horizontal Switcher Bar ── */}
        <div className="mt-8 w-full max-w-3xl flex items-center justify-between gap-2 p-1.5 rounded-2xl glass-hud border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          
          {/* Quick Prev Button */}
          <button
            onClick={handlePrev}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors hidden sm:flex items-center justify-center cursor-pointer"
            title="Previous domain"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Tab Buttons */}
          <div className="grid grid-cols-3 gap-1.5 flex-1">
            {TABS.map((tab, idx) => {
              const isActive = tab.id === activeTab;
              const Icon = tab.icon;

              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`relative py-2.5 px-2 sm:px-4 rounded-xl flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2.5 transition-all duration-200 cursor-pointer text-center sm:text-left ${
                    isActive
                      ? 'text-white font-bold'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]'
                  }`}
                >
                  {/* Active sliding background */}
                  {isActive && (
                    <motion.div
                      layoutId="activeShowcaseTab"
                      className="absolute inset-0 rounded-xl bg-white/10 border shadow-lg backdrop-blur-md -z-10"
                      style={{
                        borderColor: `${tab.accentColor}60`,
                        boxShadow: `0 0 20px ${tab.accentColor}25`,
                      }}
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.45 }}
                    />
                  )}

                  <div
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors"
                    style={{
                      backgroundColor: isActive ? `${tab.accentColor}25` : 'rgba(255,255,255,0.05)',
                      color: isActive ? tab.accentColor : 'inherit',
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                      <span className="text-[11px] sm:text-xs font-heading font-extrabold truncate">
                        {tab.label}
                      </span>
                      <span
                        className="text-[9px] font-mono-tech px-1.5 py-0.2 rounded-full hidden md:inline-block uppercase font-bold"
                        style={{
                          backgroundColor: `${tab.accentColor}20`,
                          color: tab.accentColor,
                        }}
                      >
                        {tab.countBadge}
                      </span>
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-mono-tech text-zinc-400 truncate hidden xs:block">
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
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors hidden sm:flex items-center justify-center cursor-pointer"
            title="Next domain"
          >
            <ChevronRight className="w-4 h-4" />
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
