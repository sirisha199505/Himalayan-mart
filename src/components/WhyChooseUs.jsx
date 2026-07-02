import Reveal from './Reveal'
import Counter from './Counter'
import { STATS } from '../data'

const FEATURES = [
  { title: 'In-house Craftsmanship', desc: 'Every piece built and quality-checked by our own artisans.' },
  { title: 'Turnkey Project Delivery', desc: 'From single rooms to entire commercial floors, end to end.' },
  { title: 'Pan-India Logistics', desc: 'Safe, insured delivery and installation across the country.' },
]

export default function WhyChooseUs() {
  return (
    <section id="about" className="relative overflow-hidden bg-ink py-16 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,0.12),transparent_50%)]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold">Why Choose Us</p>
          <h2 className="font-display text-4xl font-semibold md:text-5xl">
            Fifteen Years of <span className="text-gold-gradient">Trusted Craft</span>
          </h2>
        </Reveal>

        {/* Counters */}
        <div className="grid gap-8 border-y border-white/10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} className="text-center">
              <div className="font-display text-5xl font-semibold text-gold md:text-6xl">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-2 text-sm uppercase tracking-wider text-white/70">{s.label}</p>
            </Reveal>
          ))}
        </div>

        {/* Feature blurbs */}
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.1}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-7 transition hover:border-gold/40">
                <span className="mb-4 grid h-11 w-11 place-items-center rounded-full bg-gold/15 text-gold">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <h3 className="font-display text-xl font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-white/70">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
