import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowDown } from 'lucide-react';
import {
  portraitImage,
  cardLeftImage,
  cardLeftBackImage,
  cardRightImage,
  cardRightBackImage,
} from '@/data/portfolio';

type Phase = 'idle' | 'sliding' | 'flipping' | 'collision' | 'revealing' | 'done';

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  color: string;
}

function spawnSparks(x: number, y: number): Spark[] {
  const sparks: Spark[] = [];
  const colors = ['#ff6b1a', '#ffaa00', '#ff4400', '#ffdd44', '#ff8833', '#fff5cc', '#ff5500'];
  for (let i = 0; i < 150; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 9 + 3;
    sparks.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 4,
      size: Math.random() * 4 + 1.5,
      maxLife: Math.random() * 50 + 40,
      life: Math.random() * 50 + 40,
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  }
  return sparks;
}

interface FlipCardProps {
  side: 'left' | 'right';
  frontImage: string;
  backImage: string;
  phase: Phase;
}

function FlipCard({ side, frontImage, backImage, phase }: FlipCardProps) {
  const dir = side === 'left' ? -1 : 1;
  const off = 320;

  let containerTransform: string;
  let containerOpacity: number;
  let containerTransition: string | undefined;

  switch (phase) {
    case 'idle':
      containerTransform = `translate(-50%, -50%) translateX(${dir * off}px) rotate(${dir * -20}deg)`;
      containerOpacity = 0;
      break;
    case 'sliding':
      containerTransform = `translate(-50%, -50%) translateX(${dir * 15}px) rotate(${dir * -5}deg)`;
      containerOpacity = 1;
      containerTransition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease-out';
      break;
    case 'flipping':
      containerTransform = `translate(-50%, -50%) translateX(${dir * 8}px) rotate(${dir * -2}deg)`;
      containerOpacity = 1;
      containerTransition = 'transform 0.3s ease-out';
      break;
    case 'collision':
      containerTransform = 'translate(-50%, -50%) translateX(0) rotate(0deg) scale(0.92)';
      containerOpacity = 1;
      containerTransition = 'transform 0.15s ease-out';
      break;
    case 'revealing':
    case 'done':
      containerTransform = `translate(-50%, -50%) translateX(${dir * 250}px) rotate(${dir * -50}deg) scale(0.5)`;
      containerOpacity = 0;
      containerTransition = 'transform 0.7s cubic-bezier(0.55, 0.085, 0.68, 0.53), opacity 0.5s ease-in';
      break;
  }

  // Inner flip: 0deg during sliding, 180deg during flipping/collision/revealing
  const isFlipped = phase === 'flipping' || phase === 'collision' || phase === 'revealing' || phase === 'done';
  const innerRotateY = isFlipped ? 180 : 0;
  const innerTransition = phase === 'flipping' ? 'transform 0.3s ease-in' : 'transform 0.3s ease';

  const cardStyle: CSSProperties = {
    transform: containerTransform,
    opacity: containerOpacity,
    transition: containerTransition,
  };

  return (
    <div
      className="preserve-3d absolute left-1/2 top-1/2 z-20"
      style={{
        ...cardStyle,
        width: '11rem',
        height: '14rem',
        perspective: '1000px',
      }}
    >
      <div
        className="preserve-3d relative h-full w-full"
        style={{
          transform: `rotateY(${innerRotateY}deg)`,
          transition: innerTransition,
        }}
      >
        {/* Front face */}
        <div
          className="absolute inset-0 overflow-hidden rounded-2xl bg-white p-2 shadow-2xl"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          <div className="h-full w-full overflow-hidden rounded-xl">
            <img src={frontImage} alt="" className="h-full w-full object-cover" />
          </div>
        </div>
        {/* Back face */}
        <div
          className="absolute inset-0 overflow-hidden rounded-2xl bg-white p-2 shadow-2xl"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="h-full w-full overflow-hidden rounded-xl">
            <img src={backImage} alt="" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<Phase>('idle');
  const [flash, setFlash] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const rafRef = useRef(0);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const timers: ReturnType<typeof setTimeout>[] = [];

    timers.push(setTimeout(() => setPhase('sliding'), 500));
    // Cards flip to show back face
    timers.push(setTimeout(() => setPhase('flipping'), 1100));
    // Collision + sparks
    timers.push(
      setTimeout(() => {
        setPhase('collision');
        setFlash(true);
        setTimeout(() => setFlash(false), 500);

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;

        sparksRef.current = spawnSparks(rect.width / 2, rect.height / 2);

        const animate = () => {
          if (!ctx || !canvas) return;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          sparksRef.current = sparksRef.current.filter((s) => s.life > 0);
          for (const s of sparksRef.current) {
            s.x += s.vx;
            s.y += s.vy;
            s.vy += 0.2;
            s.vx *= 0.97;
            s.life--;
            const alpha = s.life / s.maxLife;
            ctx.globalAlpha = alpha;
            ctx.fillStyle = s.color;
            ctx.shadowBlur = 12;
            ctx.shadowColor = s.color;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.size * alpha, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.globalAlpha = 1;
          ctx.shadowBlur = 0;
          if (sparksRef.current.length > 0) {
            rafRef.current = requestAnimationFrame(animate);
          }
        };
        animate();
      }, 1400),
    );

    timers.push(setTimeout(() => setPhase('revealing'), 1700));
    timers.push(setTimeout(() => setPhase('done'), 2600));

    return () => {
      timers.forEach(clearTimeout);
      cancelAnimationFrame(rafRef.current);
    };
  }, [mounted]);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Ambient gradient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[10%] top-[15%] h-[500px] w-[500px] rounded-full bg-accent-600/10 blur-[120px] dark:bg-accent-500/15" />
        <div className="absolute right-[5%] bottom-[10%] h-[400px] w-[400px] rounded-full bg-sage-500/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6 pt-24 lg:px-10 lg:pt-0">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left: Text content */}
          <div className="flex flex-col gap-7 lg:col-span-7">
            {/* Status badge */}
            <div
              className={`flex items-center gap-2 transition-all duration-700 ${
                mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
              </span>
              <span className="text-sm font-medium tracking-wide text-[var(--text-muted)]">
                Available for select projects — Q1 2026
              </span>
            </div>

            {/* Main heading */}
            <h1 className="font-display text-[clamp(2.5rem,7vw,6rem)] font-bold leading-[0.95] tracking-tight">
              <span
                className={`block transition-all duration-1000 ${
                  mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: '0.15s' }}
              >
                Design that
              </span>
              <span
                className={`block transition-all duration-1000 ${
                  mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: '0.3s' }}
              >
                feels{' '}
                <span className="font-serif italic font-normal text-accent-600 dark:text-accent-400">
                  inevitable
                </span>
              </span>
            </h1>

            {/* Subtext */}
            <div
              className={`max-w-xl transition-all duration-1000 ${
                mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: '0.5s' }}
            >
              <p className="text-lg leading-relaxed text-[var(--text-muted)]">
                I'm{' '}
                <span className="font-medium text-[var(--text)]">Maya Chen</span>, a
                senior UI/UX designer with 8+ years crafting human-centered
                digital products. I turn complex problems into interfaces people
                love.
              </p>
            </div>

            {/* CTAs */}
            <div
              className={`flex flex-wrap items-center gap-4 transition-all duration-1000 ${
                mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: '0.7s' }}
            >
              <a
                href="#work"
                data-cursor="View"
                className="group flex items-center gap-2 rounded-full bg-[var(--text)] px-7 py-3.5 text-sm font-medium text-[var(--bg)] transition-all duration-300 hover:scale-[1.05] hover:-translate-y-1 hover:shadow-[0_10px_20px_-10px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_10px_20px_-10px_rgba(255,255,255,0.2)] active:scale-95"
              >
                View selected work
                <ArrowDown
                  size={15}
                  className="transition-transform group-hover:translate-y-0.5"
                />
              </a>
              <a
                href="#contact"
                data-cursor="Email"
                className="rounded-full border border-[var(--border)] px-7 py-3.5 text-sm font-medium text-[var(--text)] transition-colors hover:border-[var(--text)]"
              >
                Start a project
              </a>
            </div>
          </div>

          {/* Right: Collision animation */}
          <div className="perspective-1000 relative h-[380px] lg:col-span-5 lg:h-[560px]">
            {/* Decorative rings */}
            <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--border)] opacity-50 lg:h-96 lg:w-96" />
            <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--border)] opacity-30 lg:h-64 lg:w-64" />

            {/* Portrait (revealed after collision) */}
            <div
              className="absolute left-1/2 top-1/2 z-10 overflow-hidden rounded-3xl shadow-2xl"
              style={{
                width: '70%',
                height: '85%',
                opacity: phase === 'done' ? 1 : phase === 'revealing' ? 0.4 : 0,
                transform: `translate(-50%, -50%) scale(${phase === 'done' ? 1 : 0.85})`,
                transition:
                  'opacity 0.8s ease, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              <img
                src={portraitImage}
                alt="Maya Chen"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="font-display text-lg font-bold text-white">
                  Maya Chen
                </p>
                <p className="text-sm text-white/70">Senior UI/UX Designer</p>
              </div>
            </div>

            {/* Left flip card */}
            <FlipCard
              side="left"
              frontImage={cardLeftImage}
              backImage={cardLeftBackImage}
              phase={phase}
            />

            {/* Right flip card */}
            <FlipCard
              side="right"
              frontImage={cardRightImage}
              backImage={cardRightBackImage}
              phase={phase}
            />

            {/* Spark canvas */}
            <canvas
              ref={canvasRef}
              className="pointer-events-none absolute inset-0 z-30"
            />

            {/* Flash overlay */}
            {flash && (
              <div
                className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center"
                style={{
                  background:
                    'radial-gradient(circle, rgba(255,180,80,0.7) 0%, rgba(255,100,0,0.3) 30%, transparent 60%)',
                  animation: 'flashBurst 0.5s ease-out forwards',
                }}
              />
            )}
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-opacity duration-1000 ${
            mounted ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '1.2s' }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-ultra-wide text-[var(--text-muted)]">
              Scroll
            </span>
            <div className="h-12 w-px overflow-hidden bg-[var(--border)]">
              <div className="h-1/2 w-full animate-[pulseSoft_2s_ease-in-out_infinite] bg-accent-600 dark:bg-accent-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
