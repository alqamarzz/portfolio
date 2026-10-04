import React from 'react';
import { sound } from '../utils/audio';
import { ArrowUp, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    sound.playThwip();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 py-12 px-4 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-zinc-500 font-mono-tech">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#ef233c]/20 border border-[#ef233c]/40 flex items-center justify-center text-[#ef233c]">
          <Shield className="w-4 h-4" />
        </div>
        <div>
          <span className="text-zinc-300 font-semibold block text-sm">
            Alqamar Ziaul
          </span>
          <span className="text-zinc-500 text-[11px]">
            Friendly Neighborhood Design Engineer © {new Date().getFullYear()}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4 text-center">
        <span>Crafted with React, Framer Motion & tactile physics.</span>
      </div>

      {/* Back to top */}
      <button
        onClick={scrollToTop}
        className="p-2.5 rounded-xl glass-hud border border-white/10 hover:border-[#ef233c] text-zinc-300 hover:text-white transition flex items-center gap-2 group cursor-pointer"
        title="Web Sling to Top"
      >
        <span>Swing Up</span>
        <ArrowUp className="w-3.5 h-3.5 text-[#ef233c] group-hover:-translate-y-1 transition-transform" />
      </button>
    </footer>
  );
};
