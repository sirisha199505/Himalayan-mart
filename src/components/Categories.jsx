import { motion } from 'framer-motion'
import Reveal from './Reveal'
import { CATEGORY_GROUPS } from '../data'

function SectionHead({ eyebrow, title, sub }) {
  return (
    <Reveal className="mx-auto mb-10 max-w-2xl text-center">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold">{eyebrow}</p>
      <h2 className="font-display text-4xl font-semibold text-ink md:text-5xl">{title}</h2>
      {sub && <p className="mt-4 text-ink-700">{sub}</p>}
    </Reveal>
  )
}

export default function Categories() {
  return (
    <section id="categories" className="py-16">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead
          eyebrow="Browse the Collection"
          title="Furniture for Every Space"
          sub="Hundreds of categories across residential, commercial and premium ranges — all under one roof."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {CATEGORY_GROUPS.map((cat, i) => (
            <Reveal key={cat.key} delay={i * 0.1}>
              <motion.a
                href="#collections"
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="group relative block h-[460px] overflow-hidden rounded-3xl shadow-lg"
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-7">
                  <h3 className="font-display text-3xl font-semibold text-white">{cat.title}</h3>
                  <p className="mt-1 text-sm text-white/70">{cat.blurb}</p>

                  {/* Item list — always shown on mobile, slides up on hover on desktop */}
                  <div className="mt-4 grid max-h-52 grid-cols-2 gap-x-4 gap-y-1.5 overflow-hidden opacity-100 transition-all duration-500 sm:max-h-0 sm:opacity-0 sm:group-hover:max-h-52 sm:group-hover:opacity-100">
                    {cat.items.map((it) => (
                      <span key={it} className="flex items-center gap-1.5 text-sm text-white/85">
                        <span className="h-1 w-1 rounded-full bg-gold" />
                        {it}
                      </span>
                    ))}
                  </div>

                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold">
                    Explore
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </motion.a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
