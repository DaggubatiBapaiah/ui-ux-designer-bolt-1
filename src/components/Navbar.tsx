import { useEffect, useState } from 'react';
import { Sun, Moon, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 backdrop-blur-xl bg-[var(--bg)]/80 border-b border-[var(--border)]'
          : 'py-6 bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
        <a
          href="#hero"
          data-cursor="Home"
          className="group flex items-center gap-2"
        >
          <span className="font-display text-xl font-bold tracking-tight">
            Maya<span className="text-accent-600 dark:text-accent-400">.</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              data-cursor=""
              className="group relative px-4 py-2 text-sm font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
            >
              {link.label}
              <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-accent-600 dark:bg-accent-400 transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onToggleTheme}
            data-cursor=""
            aria-label="Toggle theme"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-muted)] transition-colors hover:border-accent-600 hover:text-accent-600 dark:hover:border-accent-400 dark:hover:text-accent-400"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <a
            href="#contact"
            data-cursor="Hire"
            className="hidden items-center gap-1.5 rounded-full bg-[var(--text)] px-5 py-2.5 text-sm font-medium text-[var(--bg)] transition-transform hover:scale-[1.03] active:scale-95 md:flex"
          >
            Let's talk
            <ArrowUpRight size={14} />
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label="Menu"
          >
            <span
              className={`h-px w-5 bg-[var(--text)] transition-all ${menuOpen ? 'translate-y-[3px] rotate-45' : ''}`}
            />
            <span
              className={`h-px w-5 bg-[var(--text)] transition-all ${menuOpen ? '-translate-y-[3px] -rotate-45' : ''}`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-all duration-500 md:hidden ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="mx-6 mt-3 flex flex-col gap-1 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-base font-medium text-[var(--text-muted)] transition-colors hover:bg-[var(--bg)] hover:text-[var(--text)]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-2 flex items-center justify-center gap-1.5 rounded-xl bg-[var(--text)] px-4 py-3 text-base font-medium text-[var(--bg)]"
          >
            Let's talk
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </header>
  );
}
