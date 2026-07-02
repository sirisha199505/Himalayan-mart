import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { NAV, CONTACT } from '../data'

export default function Navbar({ onOpenCategory }) {
  const [scrolled, setScrolled] = useState(false)
  const [openMenu, setOpenMenu] = useState(false) // desktop mega-menu
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-ink/95 backdrop-blur-md shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 sm:gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold/60 text-gold sm:h-11 sm:w-11">
            <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M3 21V10l9-6 9 6v11" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9 21v-6h6v6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="font-display text-[0.95rem] font-semibold leading-tight text-white sm:text-lg md:text-xl">
            Himalayan Furniture <span style={{ color: 'var(--color-gold)' }}>Mart</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <li
              key={item.label}
              className="relative"
              onMouseEnter={() => item.columns && setOpenMenu(true)}
              onMouseLeave={() => item.columns && setOpenMenu(false)}
            >
              <a
                href={item.href}
                className="flex items-center gap-1 text-sm font-medium text-white/85 transition hover:text-rust"
              >
                {item.label}
                {item.columns && (
                  <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5.5 7.5 10 12l4.5-4.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  </svg>
                )}
              </a>

              {/* Mega menu */}
              {item.columns && (
                <AnimatePresence>
                  {openMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      transition={{ duration: 0.22 }}
                      className="absolute left-1/2 top-full w-[640px] -translate-x-1/2 pt-5"
                    >
                      <div className="grid grid-cols-3 gap-6 rounded-2xl border border-rust/15 bg-white p-7 shadow-2xl">
                        {item.columns.map((col) => (
                          <div key={col.title}>
                            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-rust">
                              {col.title}
                            </p>
                            <ul className="space-y-2">
                              {col.links.map((l) => (
                                <li key={l.slug}>
                                  <button
                                    onClick={() => { onOpenCategory(l.slug); setOpenMenu(false) }}
                                    className="inline-block text-left text-sm text-ink-700 transition hover:translate-x-1 hover:text-gold-dark"
                                  >
                                    {l.label}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </li>
          ))}
        </ul>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-gold-dark md:inline-block"
          >
            Request a Quote
          </a>
          <button
            aria-label="Menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-lg text-white lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
              {mobileOpen ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-ink lg:hidden"
          >
            <ul className="space-y-1 px-6 py-5">
              {NAV.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-2 text-white/90 hover:text-rust"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="pt-3">
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-full bg-gold py-3 text-center font-semibold text-ink"
                >
                  Request a Quote
                </a>
              </li>
              <li className="flex gap-4 pt-3 text-sm text-white/70">
                <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
