import { useEffect, useRef, useState } from 'react';
import { stats, skills, portraitImage } from '@/data/portfolio';

function CountUp({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const duration = 1800;
            const start = performance.now();
            const animate = (now: number) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setCount(Math.round(end * eased));
              if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function About() {
  return (
    <section id="about" className="relative py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section label */}
        <div className="reveal mb-16 flex items-center gap-4">
          <span className="text-sm font-medium uppercase tracking-ultra-wide text-accent-600 dark:text-accent-400">
            About
          </span>
          <span className="h-px flex-1 bg-[var(--border)]" />
        </div>

        <div className="grid gap-16 lg:grid-cols-12">
          {/* Left: Portrait image */}
          <div className="reveal lg:col-span-5">
            <div className="relative overflow-hidden rounded-3xl border border-[var(--border)]">
              <img
                src={portraitImage}
                alt="Maya Chen"
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-display text-2xl font-bold text-white">Maya Chen</p>
                <p className="mt-1 text-sm text-white/70">Brooklyn, NY · est. 2017</p>
              </div>
            </div>
          </div>

          {/* Right: Philosophy + Stats */}
          <div className="lg:col-span-7">
            <h2 className="reveal font-display text-[clamp(1.75rem,4vw,3.5rem)] font-bold leading-[1.1] tracking-tight">
              I believe great design is{' '}
              <span className="font-serif italic font-normal text-accent-600 dark:text-accent-400">
                invisible
              </span>
              —it just works.
            </h2>

            <div className="reveal reveal-delay-1 mt-8 space-y-6 text-lg leading-relaxed text-[var(--text-muted)]">
              <p>
                For the last 8 years, I've helped fintech startups, SaaS
                platforms, and e-commerce brands turn ambitious ideas into
                products people use every day. My work sits at the intersection
                of research, systems thinking, and craft.
              </p>
              <p>
                I don't start with screens. I start with people—interviews,
                journey maps, and the messy reality of how humans actually
                behave. Then I design systems that scale, not just one-off
                pages. Every component, token, and interaction has a reason.
              </p>
              <p>
                When I'm not designing, you'll find me sketching typography
                studies, mentoring junior designers, or hunting for the perfect
                espresso.
              </p>
            </div>

            {/* Stats */}
            <div className="reveal reveal-delay-2 mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)]">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`bg-[var(--bg)] p-6 lg:p-8 ${`reveal-delay-${i + 1}`}`}
                >
                  <div className="font-display text-4xl font-bold tracking-tight text-[var(--text)] lg:text-5xl">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="mt-2 text-sm text-[var(--text-muted)]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Skills marquee */}
      <div className="reveal mt-24 overflow-hidden border-y border-[var(--border)] py-6">
        <div className="flex w-max animate-marquee items-center gap-12 whitespace-nowrap">
          {[...skills, ...skills].map((skill, i) => (
            <span
              key={i}
              className="font-display text-2xl font-medium text-[var(--text-muted)] lg:text-3xl"
            >
              {skill}
              <span className="ml-12 text-accent-600 dark:text-accent-400">/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
