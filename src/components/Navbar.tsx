import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/audio';
import { 
  Sparkles, 
  Send, 
  Sun, 
  Moon 
} from 'lucide-react';

interface NavbarProps {
  theme: 'classic' | 'miles' | '2099' | 'gwen';
  setTheme: (t: 'classic' | 'miles' | '2099' | 'gwen') => void;
  triggerSpiderSense: (msg?: string) => void;
  soundEnabled: boolean;
  setSoundEnabled: (v: boolean) => void;
  isLight: boolean;
  setIsLight: (v: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  setTheme,
  triggerSpiderSense,
  soundEnabled,
  setSoundEnabled,
  isLight,
  setIsLight,
}) => {
  const [activeTab, setActiveTab] = useState('hero');
  const [suitMenuOpen, setSuitMenuOpen] = useState(false);

  const navLinks = [
    { id: 'hero', label: 'Overview' },
    { id: 'about', label: 'Origin' },
    { id: 'projects', label: 'Missions' },
    { id: 'hackathons', label: 'Hackathons' },
    { id: 'experience', label: 'Patrol' },
    { id: 'contact', label: 'Signal' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    sound.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleThemeMode = () => {
    const nextMode = !isLight;
    setIsLight(nextMode);
    sound.playThwip();
    if (nextMode) {
      setTheme('gwen');
      triggerSpiderSense('LIGHT SUIT ONLINE!');
    } else {
      setTheme('classic');
      triggerSpiderSense('STEALTH DARK MODE!');
    }
  };

  const suitNames = {
    classic: { name: 'Peter Parker', badge: 'Classic Red & Blue', color: '#ef233c' },
    miles: { name: 'Miles Morales', badge: 'Spider-Verse Stealth', color: '#ff0055' },
    2099: { name: 'Miguel O\'Hara', badge: 'Cyber 2099 Neon', color: '#00e5ff' },
    gwen: { name: 'Ghost-Spider', badge: 'Future Foundation (Light)', color: '#e11d48' },
  };

  return (
    <header className="fixed top-2.5 sm:top-5 inset-x-0 z-40 flex justify-center px-2 sm:px-4 pointer-events-none">
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full glass-hud border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all max-w-[98vw]"
      >
        {/* Brand / Spidey Mask Avatar */}
        <button
          onClick={() => {
            sound.playThwip();
            triggerSpiderSense('WEB SLINGER ONLINE!');
            handleNavClick('hero');
          }}
          className="relative group p-1 sm:p-1.5 rounded-full hover:bg-white/5 transition flex items-center gap-2 cursor-pointer shrink-0"
          title="Spider-Man Protocol"
        >
          {/* Spidey Mask SVG Icon */}
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#ef233c] to-[#990011] flex items-center justify-center shadow-md relative overflow-hidden border border-white/20 shrink-0">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-white drop-shadow"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Spider Eyes */}
              <path d="M7 9C8.5 7 10 9 10 13C8 12.5 7 11 7 9Z" fill="white" stroke="#000" strokeWidth="1" />
              <path d="M17 9C15.5 7 14 9 14 13C16 12.5 17 11 17 9Z" fill="white" stroke="#000" strokeWidth="1" />
              {/* Web lines on mask */}
              <line x1="12" y1="3" x2="12" y2="21" stroke="rgba(0,0,0,0.4)" strokeWidth="0.8" />
              <line x1="3" y1="12" x2="21" y2="12" stroke="rgba(0,0,0,0.4)" strokeWidth="0.8" />
            </svg>
            <div className="absolute inset-0 bg-red-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="font-comic text-base tracking-wider hidden md:inline group-hover:text-[#ef233c] transition-colors">
            ALQAMAR<span className="text-[#ef233c]">.DEV</span>
          </span>
        </button>

        {/* Divider */}
        <div className="h-4 sm:h-5 w-[1px] bg-white/10 mx-0.5 sm:mx-1 hidden xs:block shrink-0" />

        {/* Navigation Tabs */}
        <div className="flex items-center gap-0.5 sm:gap-1 overflow-x-auto no-scrollbar py-0.5">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`relative px-2 sm:px-3 py-1 text-[11px] sm:text-sm font-medium rounded-full transition-all duration-200 cursor-pointer shrink-0 ${
                  isActive
                    ? 'font-semibold text-white'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-900/5'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabBadge"
                    className="absolute inset-0 bg-[#ef233c] rounded-full -z-10 shadow-[0_0_12px_rgba(239,35,60,0.5)]"
                    transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                  />
                )}
                {link.label}
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="h-5 w-[1px] bg-white/10 mx-1" />

        {/* Right Action Icons */}
        <div className="flex items-center gap-1">
          {/* Suit Switcher Button */}
          <div className="relative">
            <button
              onClick={() => {
                sound.playClick();
                setSuitMenuOpen(!suitMenuOpen);
              }}
              className={`p-1.5 rounded-full transition flex items-center gap-1.5 text-xs font-mono-tech cursor-pointer ${
                isLight ? 'text-slate-700 hover:bg-slate-900/5 hover:text-slate-900' : 'text-zinc-300 hover:bg-white/10 hover:text-white'
              }`}
              title="Switch Spider Suit"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#ef233c]" />
              <span className="hidden md:inline text-[11px] uppercase">
                {theme}
              </span>
            </button>

            <AnimatePresence>
              {suitMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className={`absolute right-0 mt-2 w-52 py-2 rounded-xl glass-hud border shadow-2xl z-50 text-xs ${
                    isLight ? 'border-slate-200 bg-white/95 text-slate-800' : 'border-white/10 text-zinc-300'
                  }`}
                >
                  <div className={`px-3 py-1 font-comic uppercase text-[11px] tracking-wider border-b ${
                    isLight ? 'text-slate-400 border-slate-200' : 'text-zinc-400 border-white/5'
                  }`}>
                    Select Spider Suit
                  </div>
                  {(['classic', 'miles', '2099', 'gwen'] as const).map((suit) => (
                    <button
                      key={suit}
                      onClick={() => {
                        setTheme(suit);
                        sound.playThwip();
                        if (suit === 'gwen') {
                          setIsLight(true);
                          triggerSpiderSense('Ghost-Spider Light Suit!');
                        } else {
                          setIsLight(false);
                          triggerSpiderSense(`${suitNames[suit].name} Suit Activated!`);
                        }
                        setSuitMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 flex items-center justify-between transition cursor-pointer ${
                        theme === suit
                          ? isLight
                            ? 'font-semibold text-slate-900 bg-slate-100'
                            : 'font-semibold text-white bg-white/5'
                          : isLight
                            ? 'text-slate-600 hover:bg-slate-100'
                            : 'text-zinc-400 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: suitNames[suit].color }}
                        />
                        <span>{suitNames[suit].name}</span>
                      </div>
                      {theme === suit && (
                        <span className="text-[10px] text-[#ef233c] font-mono-tech">ACTIVE</span>
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Prominent Light / Dark Mode Toggle Pill */}
          <button
            onClick={toggleThemeMode}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono-tech transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
            title={isLight ? 'Switch to Stealth Dark Mode' : 'Switch to Ghost-Spider Light Mode'}
          >
            {isLight ? (
              <>
                <Moon className="w-3.5 h-3.5 text-purple-600 fill-purple-600" />
                <span className="font-bold text-zinc-800">DARK</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span className="font-bold text-amber-300">LIGHT</span>
              </>
            )}
          </button>

          {/* Direct CTA */}
          <button
            onClick={() => {
              sound.playThwip();
              handleNavClick('contact');
            }}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ef233c] hover:bg-[#d90429] !text-white text-xs font-semibold shadow-sm transition hover:shadow-[0_0_15px_rgba(239,35,60,0.5)] cursor-pointer"
          >
            <Send className="w-3 h-3" />
            <span>Connect</span>
          </button>
        </div>
      </motion.nav>
    </header>
  );
};
