import { FormEvent, useState } from 'react';
import { ArrowUpRight, Check, Mail, MapPin } from 'lucide-react';

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('sending');

    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setForm({ name: '', email: '', message: '' });
    setStatus('success');
  };

  return (
    <section id="contact" className="relative py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="reveal mb-8 flex items-center gap-4">
              <span className="text-sm font-medium uppercase tracking-ultra-wide text-accent-600 dark:text-accent-400">Contact</span>
              <span className="h-px flex-1 bg-[var(--border)]" />
            </div>
            <h2 className="reveal font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.95] tracking-tight">
              Let's make something people{' '}
              <span className="font-serif italic font-normal text-accent-600 dark:text-accent-400">feel.</span>
            </h2>
            <p className="reveal reveal-delay-1 mt-8 max-w-md text-lg leading-relaxed text-[var(--text-muted)]">
              Have a product, brand, or idea that deserves more? Tell me a little about it and I’ll get back to you within two business days.
            </p>
            <div className="reveal reveal-delay-2 mt-10 space-y-5">
              <a href="mailto:hello@mayachen.design" className="flex items-center gap-3 text-sm text-[var(--text-muted)] transition-colors hover:text-accent-600 dark:hover:text-accent-400">
                <Mail size={17} /> hello@mayachen.design
              </a>
              <div className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
                <MapPin size={17} /> Brooklyn, NY · Working worldwide
              </div>
            </div>
          </div>

          <div className="reveal reveal-delay-2 lg:col-span-6 lg:col-start-7">
            {status === 'success' ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-accent-600/30 bg-accent-600/5 p-8 text-center dark:border-accent-400/30 dark:bg-accent-400/5">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent-600 text-[var(--bg)] dark:bg-accent-400 dark:text-[var(--text)]"><Check size={28} /></div>
                <h3 className="font-display text-3xl font-bold">Message received.</h3>
                <p className="mt-3 max-w-sm leading-relaxed text-[var(--text-muted)]">Thanks for reaching out. I’ll be in touch soon to hear more about your project.</p>
                <button onClick={() => setStatus('idle')} className="mt-8 text-sm font-medium text-accent-600 underline underline-offset-4 dark:text-accent-400">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-3xl border border-[var(--border)] p-6 md:p-10">
                <div className="grid gap-8 md:grid-cols-2">
                  <label className="group block">
                    <span className="mb-3 block text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">Your name</span>
                    <input required type="text" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Jane Smith" className="w-full border-b border-[var(--border)] bg-transparent pb-3 text-base outline-none transition-colors placeholder:text-[var(--text-muted)]/50 focus:border-accent-600 dark:focus:border-accent-400" />
                  </label>
                  <label className="group block">
                    <span className="mb-3 block text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">Email address</span>
                    <input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="jane@company.com" className="w-full border-b border-[var(--border)] bg-transparent pb-3 text-base outline-none transition-colors placeholder:text-[var(--text-muted)]/50 focus:border-accent-600 dark:focus:border-accent-400" />
                  </label>
                </div>
                <label className="mt-10 block">
                  <span className="mb-3 block text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">Tell me about the project</span>
                  <textarea required rows={5} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder="What are you working on? What would success look like?" className="w-full resize-none border-b border-[var(--border)] bg-transparent pb-3 text-base leading-relaxed outline-none transition-colors placeholder:text-[var(--text-muted)]/50 focus:border-accent-600 dark:focus:border-accent-400" />
                </label>
                {status === 'error' && <p className="mt-5 text-sm text-red-600 dark:text-red-400">Something went wrong while sending your message. Please try again or email me directly.</p>}
                <button disabled={status === 'sending'} type="submit" data-cursor="Send" className="mt-10 flex items-center gap-2 rounded-full bg-[var(--text)] px-7 py-3.5 text-sm font-medium text-[var(--bg)] transition-transform hover:scale-[1.03] disabled:cursor-wait disabled:opacity-60">
                  {status === 'sending' ? 'Sending...' : 'Send inquiry'}
                  <ArrowUpRight size={15} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
