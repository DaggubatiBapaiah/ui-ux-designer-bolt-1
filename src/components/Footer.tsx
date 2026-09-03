import { ArrowUpRight, Linkedin, Instagram, Dribbble, ArrowUp } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <a href="#hero" className="font-display text-3xl font-bold tracking-tight">Maya<span className="text-accent-600 dark:text-accent-400">.</span></a>
            <p className="mt-3 text-sm text-[var(--text-muted)]">Senior UI/UX designer · Brooklyn, NY</p>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" data-cursor="Open" className="flex items-center gap-2 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"><Linkedin size={16} /> LinkedIn <ArrowUpRight size={13} /></a>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer" data-cursor="Open" className="flex items-center gap-2 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"><Instagram size={16} /> Instagram <ArrowUpRight size={13} /></a>
            <a href="https://dribbble.com" target="_blank" rel="noreferrer" data-cursor="Open" className="flex items-center gap-2 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"><Dribbble size={16} /> Dribbble <ArrowUpRight size={13} /></a>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} data-cursor="Top" aria-label="Back to top" className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] transition-colors hover:border-[var(--text)]"><ArrowUp size={16} /></button>
          </div>
        </div>
        <div className="mt-10 flex flex-col justify-between gap-2 border-t border-[var(--border)] pt-6 text-xs text-[var(--text-muted)] md:flex-row">
          <span>© 2026 Maya Chen. All rights reserved.</span>
          <span>Designed with intention, built with care.</span>
        </div>
      </div>
    </footer>
  );
}
