import { useEffect } from 'react';
import { CustomCursor } from '@/components/CustomCursor';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Recognition } from '@/components/Recognition';
import { SelectedWork } from '@/components/SelectedWork';
import { Process } from '@/components/Process';
import { Testimonials } from '@/components/Testimonials';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { useReveal } from '@/hooks/useReveal';
import { useTheme } from '@/hooks/useTheme';

function App() {
  const { theme, toggle } = useTheme();
  const revealRef = useReveal<HTMLDivElement>();

  useEffect(() => {
    document.body.classList.add('grain');
    return () => document.body.classList.remove('grain');
  }, []);

  return (
    <div ref={revealRef} className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <CustomCursor />
      <Navbar theme={theme} onToggleTheme={toggle} />
      <main>
        <Hero />
        <About />
        <Recognition />
        <SelectedWork />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
