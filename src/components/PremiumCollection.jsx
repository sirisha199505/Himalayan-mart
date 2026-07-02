import { motion } from 'framer-motion'
import Reveal from './Reveal'
import { PREMIUM } from '../data'

export default function PremiumCollection() {
  return (
    <section
      id="premium"
      className="relative overflow-hidden py-20 text-white"
      style={{ background: 'linear-gradient(160deg,#050608 0%,#0F172A 55%,#0b0d12 100%)' }}
    >
      {/* Gold glow accents */}
      <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.4em] text-gold">The Premium Collection</p>
          <h2 className="font-display text-4xl font-semibold md:text-6xl">
            Where Luxury <span className="text-gold-gradient">Lives</span>
          </h2>
          <p className="mt-4 text-white/60">
            Imported materials, designer silhouettes and finishes reserved for our most exclusive line.
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {PREMIUM.map((item, i) => (
            <Reveal key={item.name} delay={i * 0.12}>
              <motion.a
                href="#contact"
                whileHover={{ y: -10 }}
                transition={{ type: 'spring', stiffness: 240, damping: 20 }}
                className="group relative block overflow-hidden rounded-3xl border border-gold/20"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover brightness-90 transition-all duration-700 group-hover:scale-110 group-hover:brightness-100"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <h3 className="font-display text-2xl font-semibold text-white">{item.name}</h3>
                  <p className="mt-1 text-sm text-white/65">{item.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold">
                    Discover
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
                <span className="absolute right-5 top-5 rounded-full border border-gold/40 px-3 py-1 text-[0.65rem] uppercase tracking-widest text-gold">
                  Exclusive
                </span>
              </motion.a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
