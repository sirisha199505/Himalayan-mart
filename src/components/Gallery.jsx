import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from './Reveal'
import { GALLERY } from '../data'

export default function Gallery() {
  const [active, setActive] = useState(null) // index of open image, or null
  const isOpen = active !== null

  const close = useCallback(() => setActive(null), [])
  const step = useCallback(
    (dir) => setActive((i) => (i === null ? i : (i + dir + GALLERY.length) % GALLERY.length)),
    [],
  )

  // Keyboard controls + scroll lock while the lightbox is open.
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, close, step])

  return (
    <section id="gallery" className="scroll-mt-24 py-16">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold">Gallery</p>
          <h2 className="font-display text-4xl font-semibold text-ink md:text-5xl">A Look at Our Work</h2>
          <p className="mt-4 text-ink-700">Tap any image to view it up close.</p>
        </Reveal>

        {/* Masonry via CSS columns */}
        <div className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
          {GALLERY.map((g, i) => (
            <Reveal key={g.caption} delay={(i % 4) * 0.05}>
              <button
                onClick={() => setActive(i)}
                className="group relative block w-full overflow-hidden rounded-2xl shadow-md ring-1 ring-ink/5"
              >
                <img
                  src={g.image}
                  alt={g.caption}
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="absolute bottom-0 left-0 p-4 text-left font-display text-lg font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
                  {g.caption}
                </span>
                <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink opacity-0 transition-opacity group-hover:opacity-100">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <button
              aria-label="Close"
              onClick={close}
              className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-white/30 text-white transition hover:border-white"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>

            <button
              aria-label="Previous"
              onClick={(e) => { e.stopPropagation(); step(-1) }}
              className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/30 text-white transition hover:border-white md:left-8"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              aria-label="Next"
              onClick={(e) => { e.stopPropagation(); step(1) }}
              className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/30 text-white transition hover:border-white md:right-8"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <motion.figure
              key={active}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="max-h-[85vh] max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={GALLERY[active].image}
                alt={GALLERY[active].caption}
                className="max-h-[80vh] w-auto rounded-xl object-contain"
              />
              <figcaption className="mt-3 text-center font-display text-lg text-white">
                {GALLERY[active].caption}
                <span className="ml-2 text-sm text-white/50">{active + 1} / {GALLERY.length}</span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
