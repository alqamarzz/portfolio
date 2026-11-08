import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Bot,
  Send,
  Zap,
  CheckCheck,
  Smile,
  Paperclip,
  Flame,
  ThumbsUp,
  Heart,
  Radio,
  Lock,
  User,
  Hash
} from 'lucide-react';

interface SimulatedMessage {
  id: string;
  sender: 'user' | 'ai' | 'teammate';
  senderName: string;
  avatarColor: string;
  text: string;
  codeSnippet?: string;
  time: string;
  reactions?: { emoji: string; count: number }[];
}

const CHAT_SCRIPT: SimulatedMessage[] = [
  {
    id: 'm1',
    sender: 'user',
    senderName: 'Alqamar (You)',
    avatarColor: 'from-[#ef233c] to-[#990011]',
    text: 'Nexus AI, verify my Supabase Realtime + RLS policies for 1-on-1 DM privacy.',
    time: '12:42 PM',
  },
  {
    id: 'm2',
    sender: 'ai',
    senderName: 'Nexus AI · Gemini 1.5 Flash',
    avatarColor: 'from-[#38bdf8] to-[#6366f1]',
    text: 'RLS policies verified! Private DMs are locked with PostgreSQL auth.uid() membership checks. Sub-50ms WebSocket broadcast active.',
    codeSnippet: 'CREATE POLICY "dm_guard" ON messages FOR SELECT USING (auth.uid() IN (SELECT user_id FROM conversation_members));',
    time: '12:42 PM',
    reactions: [
      { emoji: '⚡', count: 5 },
      { emoji: '🔥', count: 3 },
      { emoji: '🛡️', count: 4 },
    ],
  },
  {
    id: 'm3',
    sender: 'teammate',
    senderName: 'Sarah K.',
    avatarColor: 'from-[#ec4899] to-[#8b5cf6]',
    text: 'Just tested the live sync from mobile — messages deliver instantly! 🚀',
    time: '12:43 PM',
    reactions: [{ emoji: '❤️', count: 2 }],
  },
];

export const NexusChatSimulation: React.FC<{ isLight?: boolean }> = ({ isLight }) => {
  const [messages, setMessages] = useState<SimulatedMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [scriptStep, setScriptStep] = useState(0);
  const [activeChannel, setActiveChannel] = useState<'ai' | 'dev'>('ai');

  useEffect(() => {
    // Reset and start script
    setMessages([CHAT_SCRIPT[0]]);
    setIsTyping(true);

    const t1 = setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, CHAT_SCRIPT[1]]);
    }, 1800);

    const t2 = setTimeout(() => {
      setMessages((prev) => [...prev, CHAT_SCRIPT[2]]);
    }, 3800);

    // Loop script every 10 seconds
    const interval = setInterval(() => {
      setMessages([CHAT_SCRIPT[0]]);
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, CHAT_SCRIPT[1]]);
      }, 1800);
      setTimeout(() => {
        setMessages((prev) => [...prev, CHAT_SCRIPT[2]]);
      }, 3800);
    }, 10000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={`w-full h-full rounded-2xl flex flex-col font-sans overflow-hidden border shadow-2xl transition-colors duration-300 ${
      isLight
        ? 'bg-[#FAF8F5] border-[#E8E2D9] text-stone-800'
        : 'bg-[#0b0d14] border-white/10 text-zinc-100'
    }`}>
      {/* ── Window Chrome Top Header ── */}
      <div className={`px-4 py-2.5 flex items-center justify-between border-b shrink-0 ${
        isLight ? 'bg-[#F2ECE1] border-[#E5DDD0]' : 'bg-[#08090e] border-white/10'
      }`}>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ef233c]/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#10b981]/80" />
          <span className={`text-[10px] font-mono-tech ml-2 font-semibold ${
            isLight ? 'text-stone-600' : 'text-zinc-400'
          }`}>
            nexus-chat.app · <span className="text-[#38bdf8]">live simulation</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-mono-tech font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>WebSockets &lt;50ms</span>
          </div>
        </div>
      </div>

      {/* ── Chat Shell ── */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Compact Sidebar */}
        <div className={`w-28 sm:w-36 border-r flex flex-col p-2 gap-2 shrink-0 ${
          isLight ? 'bg-[#F5EFE6] border-[#E5DDD0]' : 'bg-[#07080c] border-white/5'
        }`}>
          <div className="text-[9px] font-mono-tech uppercase tracking-wider text-zinc-500 px-1 font-bold">
            Channels
          </div>

          <button
            onClick={() => setActiveChannel('ai')}
            className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-left text-[11px] font-medium transition-all cursor-pointer ${
              activeChannel === 'ai'
                ? isLight
                  ? 'bg-white text-stone-900 shadow-sm border border-stone-200'
                  : 'bg-white/10 text-white font-bold'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Sparkles className="w-3 h-3 text-[#38bdf8] shrink-0" />
            <span className="truncate">Nexus AI</span>
          </button>

          <button
            onClick={() => setActiveChannel('dev')}
            className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-left text-[11px] font-medium transition-all cursor-pointer ${
              activeChannel === 'dev'
                ? isLight
                  ? 'bg-white text-stone-900 shadow-sm border border-stone-200'
                  : 'bg-white/10 text-white font-bold'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Hash className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="truncate">dev-team</span>
          </button>

          <div className="text-[9px] font-mono-tech uppercase tracking-wider text-zinc-500 px-1 pt-2 font-bold">
            Presence
          </div>
          <div className="flex items-center gap-1.5 px-1 text-[10px] text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="truncate">Sarah (Online)</span>
          </div>
          <div className="flex items-center gap-1.5 px-1 text-[10px] text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="truncate">Gemini 1.5</span>
          </div>
        </div>

        {/* Message View Area */}
        <div className="flex-1 flex flex-col justify-between p-3 overflow-hidden">
          {/* Active channel header */}
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-black/5 dark:border-white/5 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#38bdf8] to-[#6366f1] flex items-center justify-center text-white shadow-xs">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-xs font-bold leading-tight flex items-center gap-1">
                  <span>Nexus AI Assistant</span>
                  <span className="text-[9px] font-mono-tech text-[#38bdf8] px-1 py-0.2 rounded bg-[#38bdf8]/15 font-semibold">
                    v1.5 Flash
                  </span>
                </p>
                <p className="text-[9px] text-emerald-500 font-mono-tech leading-none">
                  ● Realtime Stream Connected
                </p>
              </div>
            </div>

            <span className="text-[9px] font-mono-tech text-zinc-400 hidden xs:inline">
              PostgreSQL RLS Protected
            </span>
          </div>

          {/* Messages list */}
          <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 no-scrollbar">
            <AnimatePresence>
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-1.5 mb-1 px-1">
                    <span className="text-[10px] font-bold text-zinc-400">
                      {m.senderName}
                    </span>
                    <span className="text-[9px] text-zinc-500 font-mono-tech">
                      {m.time}
                    </span>
                  </div>

                  <div
                    className={`max-w-[85%] p-2.5 rounded-2xl text-[11px] leading-relaxed shadow-xs ${
                      m.sender === 'user'
                        ? 'bg-gradient-to-r from-[#ef233c] to-[#d90429] text-white rounded-tr-xs'
                        : m.sender === 'ai'
                        ? isLight
                          ? 'bg-[#EFEAE1] border border-[#DDD6C8] text-stone-900 rounded-tl-xs'
                          : 'bg-[#151924] border border-white/10 text-zinc-100 rounded-tl-xs'
                        : isLight
                        ? 'bg-white border border-stone-200 text-stone-900 rounded-tl-xs'
                        : 'bg-white/5 border border-white/10 text-zinc-200 rounded-tl-xs'
                    }`}
                  >
                    <p>{m.text}</p>

                    {m.codeSnippet && (
                      <div className={`mt-2 p-2 rounded-lg font-mono-tech text-[9px] overflow-x-auto ${
                        isLight ? 'bg-[#E5DFD4] text-stone-900' : 'bg-black/50 text-[#38bdf8]'
                      }`}>
                        <code>{m.codeSnippet}</code>
                      </div>
                    )}
                  </div>

                  {/* Reaction chips */}
                  {m.reactions && (
                    <div className="flex items-center gap-1 mt-1 px-1">
                      {m.reactions.map((r, ri) => (
                        <span
                          key={ri}
                          className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-mono-tech border ${
                            isLight
                              ? 'bg-white border-stone-200 text-stone-700'
                              : 'bg-white/5 border-white/10 text-zinc-300'
                          }`}
                        >
                          <span>{r.emoji}</span>
                          <span className="font-bold">{r.count}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* AI Typing indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-1.5 text-zinc-400 text-[10px] font-mono-tech px-2 py-1"
              >
                <Bot className="w-3 h-3 text-[#38bdf8] animate-spin" />
                <span>Nexus AI is thinking with Gemini...</span>
                <span className="inline-flex gap-1 ml-1">
                  <span className="w-1 h-1 rounded-full bg-[#38bdf8] animate-bounce" />
                  <span className="w-1 h-1 rounded-full bg-[#38bdf8] animate-bounce delay-100" />
                  <span className="w-1 h-1 rounded-full bg-[#38bdf8] animate-bounce delay-200" />
                </span>
              </motion.div>
            )}
          </div>

          {/* Simulated Input Bar */}
          <div className={`mt-2 p-1.5 rounded-xl border flex items-center gap-2 shrink-0 ${
            isLight ? 'bg-white border-[#E0D7CA]' : 'bg-[#0f121a] border-white/10'
          }`}>
            <Paperclip className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <span className="text-[10px] text-zinc-400 font-mono-tech flex-1 truncate">
              Ask Nexus AI or type message...
            </span>
            <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-[#ef233c] to-[#38bdf8] flex items-center justify-center text-white shrink-0 shadow-xs cursor-pointer">
              <Send className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
