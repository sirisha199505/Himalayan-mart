import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HERO_SLIDES } from '../data'

const AUTOPLAY_MS = 5000

// Content stagger — heading (1s), subheading (+0.3s), buttons (+0.6s), all Fade-In-Up.
const container = { animate: { transition: { staggerChildren: 0.3 } } }
const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4 } },
}

export default function Hero() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = HERO_SLIDES.length

  const go = useCallback((n) => setIndex((n + count) % count), [count])
  const next = useCallback(() => go(index + 1), [go, index])
  const prev = useCallback(() => go(index - 1), [go, index])

  // Autoplay (pauses on hover / reduced-motion).
  const [reduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  useEffect(() => {
    if (paused || reduced) return
    const id = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [paused, reduced, count])

  const slide = HERO_SLIDES[index]

  return (
    <section
      id="home"
      className="relative h-screen min-h-[600px] w-full overflow-hidden bg-ink"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides — crossfade + Ken Burns zoom */}
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
        >
          <motion.img
            src={slide.image}
            alt={slide.heading}
            className="h-full w-full object-cover"
            initial={{ scale: 1.02 }}
            animate={reduced ? {} : { scale: 1.16 }}
            transition={{ duration: (AUTOPLAY_MS + 2000) / 1000, ease: 'linear' }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark gradient overlay, left → right, ~45-60% */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/45 to-black/25" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              variants={container}
              initial="initial"
              animate="animate"
              exit="exit"
              className="max-w-2xl"
            >
              <motion.p
                variants={fadeUp}
                className="mb-4 text-sm font-medium uppercase tracking-[0.4em] text-[--color-rust]"
                style={{ color: 'var(--color-rust)' }}
              >
                Himalayan Furniture Mart
              </motion.p>
              <motion.h1
                variants={fadeUp}
                className="font-display font-semibold leading-[1.04] text-white"
                style={{ fontSize: 'clamp(2.5rem, 7vw, 6.25rem)' }}
              >
                {slide.heading}
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="mt-6 max-w-xl font-serif text-xl text-white/85 md:text-2xl"
              >
                {slide.sub}
              </motion.p>
              <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-4">
                <a
                  href="#categories"
                  className="rounded-full bg-gold px-8 py-4 text-sm font-semibold text-ink shadow-lg transition hover:-translate-y-0.5 hover:bg-gold-dark"
                >
                  Explore Collection
                </a>
                <a
                  href="#gallery"
                  className="rounded-full border border-white/50 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-ink"
                >
                  View Gallery
                </a>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Arrows */}
      <button
        aria-label="Previous slide"
        onClick={prev}
        className="absolute left-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/30 text-white backdrop-blur-sm transition hover:border-white sm:grid md:left-8"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        aria-label="Next slide"
        onClick={next}
        className="absolute right-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/30 text-white backdrop-blur-sm transition hover:border-white sm:grid md:right-8"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Pagination */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => go(i)}
            className="h-2.5 rounded-full transition-all duration-300"
            style={{
              width: i === index ? '2.5rem' : '0.625rem',
              backgroundColor: i === index ? 'var(--color-rust)' : 'rgba(255,255,255,0.5)',
            }}
          />
        ))}
      </div>
    </section>
  )
}
