import type { ComponentType } from 'react';
import { processSteps } from '@/data/portfolio';
import { Search, Compass, PenTool, Rocket, type LucideProps } from 'lucide-react';

const iconMap: Record<string, ComponentType<LucideProps>> = {
  Search,
  Compass,
  PenTool,
  Rocket,
};

export function Process() {
  return (
    <section id="process" className="relative py-32 lg:py-40">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-600/5 blur-[150px] dark:bg-accent-500/10" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section label */}
        <div className="reveal mb-12 flex items-center gap-4">
          <span className="text-sm font-medium uppercase tracking-ultra-wide text-accent-600 dark:text-accent-400">
            Process
          </span>
          <span className="h-px flex-1 bg-[var(--border)]" />
        </div>

        <h2 className="reveal mb-20 max-w-3xl font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.05] tracking-tight">
          How I turn problems into{' '}
          <span className="font-serif italic font-normal text-accent-600 dark:text-accent-400">
            products
          </span>
        </h2>

        {/* Process steps */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => {
            const Icon = iconMap[step.icon];
            return (
              <div
                key={step.number}
                className={`reveal group relative rounded-2xl border border-[var(--border)] p-8 transition-all duration-500 hover:border-accent-600 dark:hover:border-accent-400 ${`reveal-delay-${i + 1}`}`}
              >
                {/* Hover glow */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-accent-600/0 opacity-0 transition-opacity duration-500 group-hover:bg-accent-600/5 group-hover:opacity-100 dark:group-hover:bg-accent-400/5" />

                <div className="relative">
                  <div className="mb-6 flex items-center justify-between">
                    <span className="font-display text-5xl font-bold text-[var(--border)] transition-colors duration-500 group-hover:text-accent-600 dark:group-hover:text-accent-400">
                      {step.number}
                    </span>
                    {Icon && (
                      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-muted)] transition-all duration-500 group-hover:border-accent-600 group-hover:text-accent-600 dark:group-hover:border-accent-400 dark:group-hover:text-accent-400">
                        <Icon size={20} />
                      </span>
                    )}
                  </div>
                  <h3 className="mb-3 font-display text-xl font-bold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                    {step.description}
                  </p>
                </div>

                {/* Connecting line */}
                {i < processSteps.length - 1 && (
                  <div className="absolute -right-3 top-1/2 hidden h-px w-6 bg-[var(--border)] lg:block" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
