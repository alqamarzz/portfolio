import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './Icons';
import { 
  Radio, 
  Copy, 
  Check, 
  Send, 
  Mail, 
  ExternalLink
} from 'lucide-react';

interface ContactSectionProps {
  triggerSpiderSense: (msg?: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ triggerSpiderSense }) => {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const email = 'alqamarziaul12@gmail.com';
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mrpezvev';

  const copyEmail = () => {
    sound.playThwip();
    navigator.clipboard.writeText(email);
    setCopied(true);
    triggerSpiderSense('EMAIL COPIED! THWIP!');
    confetti({
      particleCount: 60,
      spread: 80,
      origin: { y: 0.7 },
      colors: ['#ef233c', '#ffffff', '#00d2ff'],
    });

    setTimeout(() => setCopied(false), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sound.playThwip();
    setSending(true);
    setErrorMessage('');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
        }),
      });

      if (response.ok) {
        setSentSuccess(true);
        setFormState({ name: '', email: '', message: '' });
        triggerSpiderSense('SIGNAL DELIVERED TO ALQAMAR!');
        confetti({
          particleCount: 75,
          spread: 90,
          origin: { y: 0.6 },
          colors: ['#ef233c', '#00d2ff', '#ffe600'],
        });
      } else {
        const data = await response.json().catch(() => ({}));
        setErrorMessage(data?.errors?.[0]?.message || 'Signal transmission failed. Please reach out directly via email.');
      }
    } catch {
      setErrorMessage('Network error while broadcasting signal. Please email alqamarziaul12@gmail.com directly.');
    } finally {
      setSending(false);
    }
  };

  const socials = [
    {
      name: 'GitHub',
      handle: 'alqamarzz',
      href: 'https://github.com/alqamarzz',
      icon: GithubIcon,
      color: '#ffffff',
    },
    {
      name: 'LinkedIn',
      handle: 'Alqamar Ziaul',
      href: 'https://linkedin.com',
      icon: LinkedinIcon,
      color: '#00d2ff',
    },
    {
      name: 'Twitter / X',
      handle: '@alqamarzz',
      href: 'https://x.com/alqamarzz',
      icon: TwitterIcon,
      color: '#1da1f2',
    },
    {
      name: 'Email Direct',
      handle: 'alqamarziaul12@gmail.com',
      href: `mailto:${email}`,
      icon: Mail,
      color: '#ef233c',
    },
  ];

  return (
    <section id="contact" className="relative py-24 px-4 max-w-5xl mx-auto overflow-hidden">
      {/* Spider-Signal Sky Spotlight Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-gradient-to-b from-[#ef233c]/20 via-[#00d2ff]/10 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="flex flex-col items-center mb-14 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ef233c]/10 border border-[#ef233c]/30 text-[#ef233c] text-xs font-mono-tech mb-3 uppercase tracking-wider"
        >
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>Spider-Signal Frequency</span>
        </motion.div>

        <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
          Activate The <span className="text-[#ef233c] font-comic">Spider-Signal</span>
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base max-w-lg mt-3">
          Have an ambitious project, a high-impact engineering role, or want to build something tactile together? Send a signal.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Quick Copy & Social Channels */}
        <div className="lg:col-span-5 space-y-4">
          {/* Quick Copy Email Card */}
          <div className="rounded-2xl glass-hud p-6 border border-white/10 hover:border-[#ef233c]/40 transition group">
            <span className="text-xs font-mono-tech text-zinc-400 uppercase tracking-wider block mb-2">
              Direct Comm Channel
            </span>
            <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-black/40 border border-white/10 mb-4">
              <span className="font-mono-tech text-xs sm:text-sm text-zinc-200 truncate select-all">
                {email}
              </span>
              <button
                onClick={copyEmail}
                className="p-2 rounded-lg bg-white/10 hover:bg-[#ef233c] text-white transition flex items-center gap-1 text-xs shrink-0"
                title="Copy Email"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Response time: Usually within a few hours. Available for freelance contracts, full-time engineering, and consulting.
            </p>
          </div>

          {/* Social Channels List */}
          <div className="rounded-2xl glass-hud p-5 border border-white/10 space-y-2">
            <span className="text-xs font-mono-tech text-zinc-400 uppercase tracking-wider block mb-2 px-1">
              Social Radar
            </span>
            {socials.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition group"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 border border-white/10"
                      style={{ color: item.color }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-semibold group-hover:text-[#ef233c] transition-colors">
                        {item.name}
                      </div>
                      <div className="text-[11px] font-mono-tech text-zinc-500">
                        {item.handle}
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-600 group-hover:text-white transition-colors" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Right Column: Transmission Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl glass-hud p-6 sm:p-8 border border-white/10 relative overflow-hidden"
          >
            {/* Top Comic Bar */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ef233c] animate-pulse" />
                <span className="font-comic text-sm tracking-wider uppercase">
                  Encrypted Transmission Terminal
                </span>
              </div>
              <span className="font-mono-tech text-[10px] text-zinc-500">SECURE 256-BIT</span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono-tech text-zinc-300 mb-1.5">
                  Your Identity / Alias
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Peter Parker / Sarah Conner"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#ef233c] transition placeholder:text-zinc-600"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-tech text-zinc-300 mb-1.5">
                  Return Frequency (Email)
                </label>
                <input
                  type="email"
                  required
                  placeholder="your.email@universe.com"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#ef233c] transition placeholder:text-zinc-600"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-tech text-zinc-300 mb-1.5">
                  Mission Brief / Details
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your project, mission timeline, or say hello..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#ef233c] transition placeholder:text-zinc-600 resize-none"
                />
              </div>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono-tech">
                  ⚠️ {errorMessage}
                </div>
              )}

              {sentSuccess ? (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                  <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold text-sm">
                    <Check className="w-5 h-5" />
                    <span>Signal Received At Spider-HQ!</span>
                  </div>
                  <p className="text-xs text-zinc-400">
                    Your transmission landed safely in my inbox. I'll get back to you shortly!
                  </p>
                  <button
                    type="button"
                    onClick={() => setSentSuccess(false)}
                    className="text-xs text-[#ef233c] hover:underline font-mono-tech pt-1"
                  >
                    + Send Another Transmission
                  </button>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#ef233c] to-[#d90429] hover:from-[#d90429] hover:to-[#ef233c] text-white font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#ef233c]/25 active:scale-[0.99] disabled:opacity-60 cursor-pointer"
                >
                  {sending ? (
                    <span className="flex items-center gap-2">
                      <Radio className="w-4 h-4 animate-pulse" />
                      Broadcasting Signal...
                    </span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Transmit Signal (Send Message)</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
