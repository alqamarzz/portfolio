import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutBento } from './components/AboutBento';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { InteractiveWebCanvas } from './components/InteractiveWebCanvas';
import { SpiderSense } from './components/SpiderSense';

export function App() {
  const [theme, setTheme] = useState<'classic' | 'miles' | '2099'>('classic');
  const [spiderSense, setSpiderSense] = useState<{ active: boolean; message: string }>({
    active: false,
    message: '',
  });
  const [soundEnabled, setSoundEnabled] = useState(true);

  const triggerSpiderSense = (msg: string = 'SPIDER-SENSE TINGLING!') => {
    setSpiderSense({ active: true, message: msg });
    setTimeout(() => {
      setSpiderSense((prev) => ({ ...prev, active: false }));
    }, 1800);
  };

  // Suit theme CSS class variations
  const getThemeClass = () => {
    switch (theme) {
      case 'miles':
        return 'theme-miles text-zinc-100 bg-[#06070a]';
      case '2099':
        return 'theme-2099 text-zinc-100 bg-[#04060c]';
      default:
        return 'theme-classic text-zinc-100 bg-[#07090e]';
    }
  };

  return (
    <div className={`relative min-h-screen transition-colors duration-700 selection:bg-[#ef233c] selection:text-white ${getThemeClass()}`}>
      {/* Spider-Web Canvas Physics Background */}
      <InteractiveWebCanvas theme={theme} />

      {/* Spider-Sense Comic Overlay */}
      <SpiderSense active={spiderSense.active} message={spiderSense.message} />

      {/* Floating HUD Navbar */}
      <Navbar
        theme={theme}
        setTheme={setTheme}
        triggerSpiderSense={triggerSpiderSense}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      {/* Main Content Layout */}
      <main className="relative z-10 flex flex-col gap-12 sm:gap-20">
        <Hero triggerSpiderSense={triggerSpiderSense} />
        <AboutBento triggerSpiderSense={triggerSpiderSense} />
        <ProjectsSection triggerSpiderSense={triggerSpiderSense} />
        <ExperienceSection />
        <ContactSection triggerSpiderSense={triggerSpiderSense} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
