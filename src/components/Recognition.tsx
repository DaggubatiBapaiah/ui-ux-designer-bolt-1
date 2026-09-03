import { recognition } from '@/data/portfolio';

export function Recognition() {
  return (
    <section className="border-y border-[var(--border)] py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="reveal mb-10 text-center text-xs font-medium uppercase tracking-ultra-wide text-[var(--text-muted)]">
          Recognized by
        </p>
        <div className="reveal reveal-delay-1 flex flex-wrap items-center justify-center gap-x-10 gap-y-5 lg:gap-x-16">
          {recognition.map((name) => (
            <span
              key={name}
              data-cursor=""
              className="font-display text-lg font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--text)] lg:text-2xl"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
