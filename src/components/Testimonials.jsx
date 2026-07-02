import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from './Reveal'
import { TESTIMONIALS } from '../data'

function Stars({ n }) {
  return (
    <div className="flex gap-1 text-gold">
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
          <path d="M10 1l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9 4.8 17.6l1-5.8L1.5 7.7l5.9-.9L10 1z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setI((v) => (v + 1) % TESTIMONIALS.length), 5000)
    return () => clearInterval(id)
  }, [paused])

  const t = TESTIMONIALS[i]

  return (
    <section className="py-16">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <Reveal className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold">Testimonials</p>
          <h2 className="font-display text-4xl font-semibold text-ink md:text-5xl">Loved by Our Clients</h2>
        </Reveal>

        <div
          className="relative rounded-3xl bg-mist p-6 text-center shadow-inner sm:p-10 md:p-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <svg viewBox="0 0 24 24" className="mx-auto mb-6 h-10 w-10 text-gold/40" fill="currentColor">
            <path d="M7 7h4v10H3V11c0-2.2 1.8-4 4-4zm10 0h4v10h-8V11c0-2.2 1.8-4 4-4z" />
          </svg>

          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <p className="mx-auto max-w-2xl font-display text-2xl leading-relaxed text-ink md:text-3xl">
                “{t.quote}”
              </p>
              <div className="mt-7 flex flex-col items-center gap-2">
                <Stars n={t.rating} />
                <p className="font-semibold text-ink">{t.name}</p>
                <p className="text-sm text-ink-700">{t.role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="mt-8 flex justify-center gap-2">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Testimonial ${idx + 1}`}
                onClick={() => setI(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === i ? 'w-7 bg-gold' : 'w-2 bg-ink/20 hover:bg-ink/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
