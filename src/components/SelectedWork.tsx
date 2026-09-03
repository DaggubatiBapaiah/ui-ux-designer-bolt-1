import { useEffect, useState } from 'react';
import { projects, type Project } from '@/data/portfolio';
import { ArrowUpRight, X, Calendar, User, Clock, Briefcase } from 'lucide-react';

export function SelectedWork() {
  const [selected, setSelected] = useState<Project | null>(null);

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section id="work" className="relative py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section label */}
        <div className="reveal mb-12 flex items-center gap-4">
          <span className="text-sm font-medium uppercase tracking-ultra-wide text-accent-600 dark:text-accent-400">
            Selected Work
          </span>
          <span className="h-px flex-1 bg-[var(--border)]" />
        </div>

        <h2 className="reveal mb-20 font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.05] tracking-tight">
          A few projects I'm{' '}
          <span className="font-serif italic font-normal text-accent-600 dark:text-accent-400">
            proud of
          </span>
        </h2>

        {/* Project grid */}
        <div className="flex flex-col gap-8 lg:gap-12">
          {projects.map((project, i) => (
            <button
              key={project.id}
              onClick={() => setSelected(project)}
              data-cursor="Open"
              className={`reveal group relative block w-full overflow-hidden rounded-3xl border border-[var(--border)] text-left transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 hover:border-accent-600/50 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_40px_-15px_rgba(255,255,255,0.05)] ${`reveal-delay-${(i % 4) + 1}`}`}
            >
              <div className="grid lg:grid-cols-12">
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden lg:col-span-7 lg:aspect-auto">
                  <div
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                    style={{
                      backgroundImage: `url(${project.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ backgroundColor: `${project.color}30` }}
                  />
                  {/* Number badge */}
                  <div className="absolute left-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/30 text-sm font-medium text-white backdrop-blur-md">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between p-8 lg:col-span-5 lg:p-10">
                  <div>
                    <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-[var(--text-muted)]">
                      <span>{project.category}</span>
                      <span>·</span>
                      <span>{project.year}</span>
                    </div>
                    <h3 className="mt-4 font-display text-3xl font-bold tracking-tight lg:text-4xl">
                      {project.title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-[var(--text-muted)]">
                      {project.brief}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--text-muted)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] transition-all duration-300 group-hover:border-accent-600 group-hover:bg-accent-600 group-hover:text-[var(--bg)] dark:group-hover:border-accent-400 dark:group-hover:bg-accent-400">
                      <ArrowUpRight size={18} />
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto bg-black/60 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative my-0 min-h-screen w-full max-w-5xl rounded-none bg-[var(--bg)] shadow-2xl md:my-8 md:min-h-0 md:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelected(null)}
              data-cursor="Close"
              className="fixed right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg)] transition-colors hover:border-accent-600 hover:text-accent-600 dark:hover:border-accent-400 dark:hover:text-accent-400 md:absolute"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {/* Hero image */}
            <div className="relative h-64 overflow-hidden rounded-t-3xl md:h-80">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${selected.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(to bottom, transparent, var(--bg))` }}
              />
            </div>

            <div className="px-6 py-10 md:px-12 md:py-14">
              {/* Header */}
              <div className="mb-12">
                <div className="flex items-center gap-3 text-sm uppercase tracking-wider text-[var(--text-muted)]">
                  <span>{selected.category}</span>
                  <span>·</span>
                  <span>{selected.year}</span>
                </div>
                <h3 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
                  {selected.title}
                </h3>
              </div>

              {/* Meta grid */}
              <div className="mb-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] md:grid-cols-4">
                {[
                  { icon: Briefcase, label: 'Client', value: selected.client },
                  { icon: User, label: 'Role', value: selected.role },
                  { icon: Clock, label: 'Duration', value: selected.duration },
                  { icon: Calendar, label: 'Year', value: selected.year },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="bg-[var(--bg)] p-5">
                    <Icon size={16} className="text-[var(--text-muted)]" />
                    <div className="mt-3 text-xs uppercase tracking-wider text-[var(--text-muted)]">
                      {label}
                    </div>
                    <div className="mt-1 text-sm font-medium">{value}</div>
                  </div>
                ))}
              </div>

              {/* Brief */}
              <div className="mb-10">
                <h4 className="mb-3 text-sm font-medium uppercase tracking-wider text-accent-600 dark:text-accent-400">
                  The Brief
                </h4>
                <p className="text-xl leading-relaxed font-serif italic text-[var(--text)]">
                  {selected.brief}
                </p>
              </div>

              {/* Problem */}
              <div className="mb-10">
                <h4 className="mb-3 text-sm font-medium uppercase tracking-wider text-accent-600 dark:text-accent-400">
                  The Problem
                </h4>
                <p className="text-base leading-relaxed text-[var(--text-muted)]">
                  {selected.problem}
                </p>
              </div>

              {/* Process */}
              <div className="mb-10">
                <h4 className="mb-6 text-sm font-medium uppercase tracking-wider text-accent-600 dark:text-accent-400">
                  The Process
                </h4>
                <div className="space-y-4">
                  {selected.process.map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[var(--border)] font-display text-sm font-bold text-accent-600 dark:text-accent-400">
                        {i + 1}
                      </span>
                      <p className="pt-1 text-base leading-relaxed text-[var(--text-muted)]">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Solution */}
              <div className="mb-10">
                <h4 className="mb-3 text-sm font-medium uppercase tracking-wider text-accent-600 dark:text-accent-400">
                  The Solution
                </h4>
                <p className="text-base leading-relaxed text-[var(--text-muted)]">
                  {selected.solution}
                </p>
              </div>

              {/* Outcome */}
              <div className="rounded-2xl border border-accent-600/20 bg-accent-600/5 p-6 dark:border-accent-400/20 dark:bg-accent-400/5">
                <h4 className="mb-3 text-sm font-medium uppercase tracking-wider text-accent-600 dark:text-accent-400">
                  The Outcome
                </h4>
                <p className="text-lg leading-relaxed text-[var(--text)]">
                  {selected.outcome}
                </p>
              </div>

              {/* Tags */}
              <div className="mt-8 flex flex-wrap gap-2">
                {selected.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[var(--border)] px-4 py-1.5 text-xs text-[var(--text-muted)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
