import { useState } from 'react'
import { motion } from 'framer-motion'
import Reveal from './Reveal'
import { FEATURED } from '../data'

function Icon({ path }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.7">
      {path}
    </svg>
  )
}

function ProductCard({ p, index }) {
  const [wished, setWished] = useState(false)
  return (
    <Reveal delay={(index % 4) * 0.08}>
      <motion.article
        whileHover={{ y: -6 }}
        className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-ink/5"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={p.image}
            alt={p.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {p.tag && (
            <span className="absolute left-3 top-3 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-ink">
              {p.tag}
            </span>
          )}

          {/* Hover action bar */}
          <div className="absolute inset-x-0 bottom-0 flex translate-y-0 items-stretch gap-px bg-ink/10 backdrop-blur-sm transition-transform duration-300 sm:translate-y-full sm:group-hover:translate-y-0">
            <button className="flex flex-1 items-center justify-center gap-2 bg-white/90 py-3 text-xs font-semibold text-ink transition hover:bg-white">
              <Icon path={<><circle cx="11" cy="11" r="7" /><path d="m20 20-3-3" /></>} />
              Quick View
            </button>
            <button
              onClick={() => setWished((v) => !v)}
              aria-label="Wishlist"
              className="flex items-center justify-center bg-white/90 px-4 transition hover:bg-white"
            >
              <span className={wished ? 'text-gold' : 'text-ink'}>
                <Icon path={<path d="M12 21s-7-4.35-9.5-8.5C.5 9 2.5 5.5 6 5.5c2 0 3.2 1.2 4 2.3.8-1.1 2-2.3 4-2.3 3.5 0 5.5 3.5 3.5 7C19 16.65 12 21 12 21z" fill={wished ? 'currentColor' : 'none'} />} />
              </span>
            </button>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-gold">{p.category}</p>
          <h3 className="mt-1 font-display text-xl font-semibold text-ink">{p.name}</h3>
          <div className="mt-auto flex items-center justify-between pt-4">
            <span className="text-lg font-semibold text-ink">{p.price}</span>
            <a
              href="#contact"
              className="rounded-full border border-ink/15 px-4 py-2 text-xs font-semibold text-ink transition hover:border-gold hover:bg-gold hover:text-ink"
            >
              Enquire
            </a>
          </div>
        </div>
      </motion.article>
    </Reveal>
  )
}

export default function FeaturedProducts() {
  return (
    <section id="featured" className="py-16">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="mx-auto mb-10 max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold">Handpicked</p>
          <h2 className="font-display text-4xl font-semibold text-ink md:text-5xl">Featured Products</h2>
          <p className="mt-4 text-ink-700">A glimpse of our bestsellers and newest arrivals.</p>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED.map((p, i) => (
            <ProductCard key={p.name} p={p} index={i} />
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <a
            href="#categories"
            className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-8 py-4 text-sm font-semibold text-ink transition hover:border-gold hover:text-gold"
          >
            View All Products
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
