import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { sound } from '../utils/audio';

interface ThemeToggleFloatProps {
  isLight: boolean;
  setIsLight: (v: boolean) => void;
  setTheme: (t: 'classic' | 'miles' | '2099' | 'gwen') => void;
  triggerSpiderSense: (msg?: string) => void;
}

export const ThemeToggleFloat: React.FC<ThemeToggleFloatProps> = ({
  isLight,
  setIsLight,
  setTheme,
  triggerSpiderSense,
}) => {
  const toggle = () => {
    const next = !isLight;
    setIsLight(next);
    sound.playThwip();
    if (next) {
      setTheme('gwen');
      triggerSpiderSense('GHOST-SPIDER LIGHT SUIT!');
    } else {
      setTheme('classic');
      triggerSpiderSense('STEALTH DARK SUIT!');
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <button
        onClick={toggle}
        className="flex items-center gap-2.5 px-3.5 py-2 rounded-full glass-hud border border-white/20 shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer group"
        title={isLight ? 'Switch to Dark Mode (Stealth)' : 'Switch to Light Mode (Ghost-Spider)'}
      >
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors shadow-sm ${
            isLight
              ? 'bg-purple-100 text-purple-700'
              : 'bg-amber-500/20 text-amber-400'
          }`}
        >
          {isLight ? (
            <Moon className="w-4 h-4 fill-purple-600" />
          ) : (
            <Sun className="w-4 h-4 fill-amber-400" />
          )}
        </div>
        <div className="text-left font-mono-tech leading-tight pr-1">
          <div className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold">
            Theme Mode
          </div>
          <div className="text-xs font-black">
            {isLight ? (
              <span className="text-purple-600">🌙 DARK</span>
            ) : (
              <span className="text-amber-400">☀️ LIGHT</span>
            )}
          </div>
        </div>
      </button>
    </div>
  );
};
