import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { categoryBySlug, categoryBlurb, productsForCategory, CONTACT } from '../data'

// Full-screen category "page" shown as an overlay (no router needed).
// Opens when a category slug is selected; closes on back/Escape.
export default function CategoryPage({ slug, onClose }) {
  const cat = slug ? categoryBySlug(slug) : null
  const open = Boolean(cat)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    // Start the page at the top each time a category opens.
    const el = document.getElementById('category-scroll')
    if (el) el.scrollTop = 0
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, slug, onClose])

  const products = productsForCategory(cat)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="category-scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[70] overflow-y-auto bg-mist"
        >
          {/* Top bar */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-ink/10 bg-ink px-4 py-3 text-white sm:px-6">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-sm font-medium transition hover:text-gold"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to Home
            </button>
            <span className="font-display text-base font-semibold sm:text-lg">
              Himalayan Furniture <span style={{ color: 'var(--color-gold)' }}>Mart</span>
            </span>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full bg-gold px-4 py-2 text-xs font-semibold text-ink transition hover:bg-gold-dark sm:inline-block"
            >
              WhatsApp
            </a>
          </div>

          {/* Hero */}
          <div className="relative h-[42vh] min-h-[280px] w-full overflow-hidden">
            <motion.img
              key={cat.image}
              src={cat.image}
              alt={cat.name}
              className="h-full w-full object-cover"
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 6, ease: 'easeOut' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20" />
            <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-5 pb-8 sm:px-8">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-gold">{cat.group}</p>
              <h1 className="font-display text-4xl font-semibold text-white sm:text-5xl md:text-6xl">{cat.name}</h1>
              <p className="mt-3 max-w-xl text-sm text-white/80 sm:text-base">{categoryBlurb(cat)}</p>
            </div>
          </div>

          {/* Product grid */}
          <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
            <div className="mb-8 flex items-end justify-between">
              <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                {cat.name} Collection
              </h2>
              <span className="text-sm text-ink-700">{products.length} designs</span>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
              {products.map((p, i) => (
                <motion.article
                  key={p.name}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-ink/5"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <h3 className="font-display text-base font-semibold text-ink sm:text-lg">{p.name}</h3>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <span className="font-semibold text-ink">{p.price}</span>
                      <button
                        onClick={onClose}
                        className="rounded-full border border-ink/15 px-3 py-1.5 text-xs font-semibold text-ink transition hover:border-gold hover:bg-gold"
                      >
                        Enquire
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* CTA band */}
            <div className="mt-12 flex flex-col items-center gap-4 rounded-3xl bg-ink px-6 py-10 text-center text-white sm:flex-row sm:justify-between sm:text-left">
              <div>
                <h3 className="font-display text-2xl font-semibold">Can’t find the perfect piece?</h3>
                <p className="mt-1 text-white/70">Tell us your requirement — we build and source to order.</p>
              </div>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 rounded-full bg-gold px-7 py-3.5 font-semibold text-ink transition hover:bg-gold-dark"
              >
                Request a Quote
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
