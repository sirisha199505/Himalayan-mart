import { motion } from 'framer-motion'
import Reveal from './Reveal'
import { PROJECTS } from '../data'

export default function CommercialProjects() {
  return (
    <section id="projects" className="py-16">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold">Our Work</p>
            <h2 className="font-display text-4xl font-semibold text-ink md:text-5xl">Commercial Projects</h2>
          </div>
          <p className="max-w-sm text-ink-700">
            Corporate offices, hotels, restaurants, schools and hospitals furnished across India.
          </p>
        </Reveal>

        {/* Bento project grid — first tile spans 2x2 */}
        <div className="grid auto-rows-[220px] grid-cols-2 gap-4 lg:grid-cols-4">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={(i % 4) * 0.08} className={p.span}>
              <motion.a
                href="#contact"
                whileHover={{ scale: 0.985 }}
                className="group relative flex h-full items-end overflow-hidden rounded-2xl"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />
                <div className="relative p-5">
                  <h3 className="font-display text-2xl font-semibold text-white">{p.title}</h3>
                  <p className="mt-1 text-sm text-white/70">{p.desc}</p>
                </div>
              </motion.a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
