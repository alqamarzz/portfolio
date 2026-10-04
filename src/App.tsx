import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutBento } from './components/AboutBento';
import { ProjectsSection } from './components/ProjectsSection';
import { AchievementsSection } from './components/AchievementsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { InteractiveWebCanvas } from './components/InteractiveWebCanvas';
import { SpiderSense } from './components/SpiderSense';
import { ScrollWebProgress } from './components/ScrollWebProgress';
import { WebCursor } from './components/WebCursor';
import { SpideyToast, useSpideyToast } from './components/SpideyToast';

export function App() {
  const [theme, setTheme] = useState<'classic' | 'miles' | '2099'>('classic');
  const [spiderSense, setSpiderSense] = useState<{ active: boolean; message: string }>({
    active: false,
    message: '',
  });
  const [soundEnabled, setSoundEnabled] = useState(true);
  const { toastState, showToast } = useSpideyToast();

  const triggerSpiderSense = (msg: string = 'SPIDER-SENSE TINGLING!') => {
    setSpiderSense({ active: true, message: msg });
    showToast(msg, 'spidey');
    setTimeout(() => {
      setSpiderSense((prev) => ({ ...prev, active: false }));
    }, 1800);
  };

  const getThemeClass = () => {
    switch (theme) {
      case 'miles':  return 'theme-miles text-zinc-100 bg-[#06070a]';
      case '2099':   return 'theme-2099 text-zinc-100 bg-[#04060c]';
      default:       return 'theme-classic text-zinc-100 bg-[#07090e]';
    }
  };

  return (
    <div
      className={`relative min-h-screen transition-colors duration-700 selection:bg-[#ef233c] selection:text-white ${getThemeClass()}`}
    >
      {/* Custom web-thread cursor */}
      <WebCursor theme={theme} />

      {/* Animated web-strand on side */}
      <ScrollWebProgress />

      {/* Physics web background */}
      <InteractiveWebCanvas theme={theme} />

      {/* Spider-Sense comic overlay */}
      <SpiderSense active={spiderSense.active} message={spiderSense.message} />

      {/* Toast notifications */}
      <SpideyToast
        message={toastState.message}
        visible={toastState.visible}
        type={toastState.type}
      />

      {/* Floating HUD Navbar */}
      <Navbar
        theme={theme}
        setTheme={setTheme}
        triggerSpiderSense={triggerSpiderSense}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      {/* Page Sections */}
      <main className="relative z-10">
        <Hero triggerSpiderSense={triggerSpiderSense} />
        <AboutBento triggerSpiderSense={triggerSpiderSense} />
        <ProjectsSection triggerSpiderSense={triggerSpiderSense} />
        <AchievementsSection />
        <ExperienceSection />
        <ContactSection triggerSpiderSense={triggerSpiderSense} />
      </main>

      <Footer />
    </div>
  );
}

export default App;
