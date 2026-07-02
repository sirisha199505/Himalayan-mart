import { motion } from 'framer-motion'
import Reveal from './Reveal'
import { ROOMS } from '../data'

export default function ShopByRoom() {
  return (
    <section id="rooms" className="py-16">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold">Shop by Room</p>
            <h2 className="font-display text-4xl font-semibold text-ink md:text-5xl">Find Your Setting</h2>
          </div>
          <p className="max-w-sm text-ink-700">
            From cozy living rooms to full-scale hospitality fit-outs — pick a space and see it furnished.
          </p>
        </Reveal>

        {/* Horizontal scroll rail on mobile, grid on desktop */}
        <div className="grid grid-flow-col auto-cols-[75%] gap-5 overflow-x-auto pb-4 thin-scroll sm:auto-cols-[45%] md:grid-flow-row md:auto-cols-auto md:grid-cols-4 md:overflow-visible lg:grid-cols-7">
          {ROOMS.map((room, i) => (
            <Reveal key={room.name} delay={(i % 7) * 0.06}>
              <motion.a
                href="#categories"
                whileHover={{ y: -6 }}
                className="group relative flex h-64 items-end overflow-hidden rounded-2xl"
              >
                <img
                  src={room.image}
                  alt={room.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
                <div className="relative p-4">
                  <h3 className="font-display text-xl font-semibold text-white">{room.name}</h3>
                  <span className="mt-1 flex items-center gap-1 text-xs font-medium text-gold opacity-0 transition-opacity group-hover:opacity-100">
                    View collection →
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
