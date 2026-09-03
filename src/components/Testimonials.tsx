import { useState } from 'react';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { testimonials } from '@/data/portfolio';

export function Testimonials() {
  const [active, setActive] = useState(0);
  const current = testimonials[active];

  const go = (direction: number) => {
    setActive((index) => (index + direction + testimonials.length) % testimonials.length);
  };

  return (
    <section className="relative overflow-hidden border-y border-[var(--border)] py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-4">
            <div className="reveal mb-8 flex items-center gap-4">
              <span className="text-sm font-medium uppercase tracking-ultra-wide text-accent-600 dark:text-accent-400">
                Kind words
              </span>
              <span className="h-px flex-1 bg-[var(--border)]" />
            </div>
            <h2 className="reveal font-display text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.05] tracking-tight">
              Don't just take my{' '}
              <span className="font-serif italic font-normal text-accent-600 dark:text-accent-400">word</span>
              {' '}for it.
            </h2>
            <div className="reveal mt-10 flex items-center gap-3">
              <button
                onClick={() => go(-1)}
                data-cursor=""
                aria-label="Previous testimonial"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] transition-colors hover:border-[var(--text)]"
              >
                <ArrowLeft size={17} />
              </button>
              <button
                onClick={() => go(1)}
                data-cursor=""
                aria-label="Next testimonial"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] transition-colors hover:border-[var(--text)]"
              >
                <ArrowRight size={17} />
              </button>
              <span className="ml-3 text-sm text-[var(--text-muted)]">
                {String(active + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          <div className="reveal reveal-delay-2 lg:col-span-7 lg:col-start-6">
            <Quote size={40} className="mb-8 text-accent-600 dark:text-accent-400" strokeWidth={1.5} />
            <blockquote className="font-serif text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.1] text-[var(--text)]">
              “{current.quote}”
            </blockquote>
            <div className="mt-10 flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-600/15 font-display text-sm font-bold text-accent-700 dark:bg-accent-400/15 dark:text-accent-300">
                {current.author.split(' ').map((name) => name[0]).join('')}
              </div>
              <div>
                <div className="text-sm font-medium">{current.author}</div>
                <div className="mt-1 text-sm text-[var(--text-muted)]">{current.title}, {current.company}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
