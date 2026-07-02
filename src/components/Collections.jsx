import { motion } from 'framer-motion'
import Reveal from './Reveal'
import { CATALOG, CATALOG_GROUPS } from '../data'

// Full catalogue grid. Clicking any tile opens that category's page.
export default function Collections({ onOpenCategory }) {
  return (
    <section id="collections" className="scroll-mt-24 py-16">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="mx-auto mb-10 max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold">Full Catalogue</p>
          <h2 className="font-display text-4xl font-semibold text-ink md:text-5xl">Shop by Category</h2>
          <p className="mt-4 text-ink-700">
            Explore every range across residential, commercial and premium collections.
          </p>
        </Reveal>

        {CATALOG_GROUPS.map((group) => (
          <div key={group} className="mb-12 last:mb-0">
            <Reveal className="mb-6 flex items-center gap-4">
              <h3 className="font-display text-2xl font-semibold text-ink">{group}</h3>
              <span className="h-px flex-1 bg-beige" />
            </Reveal>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {CATALOG.filter((c) => c.group === group).map((c, i) => (
                <Reveal key={c.slug} delay={(i % 4) * 0.06}>
                  <motion.button
                    onClick={() => onOpenCategory(c.slug)}
                    whileHover={{ y: -6 }}
                    className="group block w-full scroll-mt-28 text-left"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md ring-1 ring-ink/5">
                      <img
                        src={c.image}
                        alt={c.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
                        <h4 className="font-display text-lg font-semibold text-white">{c.name}</h4>
                        <span className="grid h-8 w-8 place-items-center rounded-full bg-gold text-ink opacity-0 transition-opacity group-hover:opacity-100">
                          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </motion.button>
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
