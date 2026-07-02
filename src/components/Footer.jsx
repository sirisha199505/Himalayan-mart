import { NAV, CONTACT } from '../data'

export default function Footer() {
  return (
    <footer className="bg-ink text-white/70">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-4 md:px-8">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-gold/60 text-gold">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M3 21V10l9-6 9 6v11" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 21v-6h6v6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="font-display text-xl font-semibold leading-tight text-white">
              Himalayan Furniture <span style={{ color: 'var(--color-rust)' }}>Mart</span>
            </span>
          </div>
          <p className="mt-5 text-sm leading-relaxed">
            Premium residential, commercial and imported furniture — crafted in-house and delivered across India.
          </p>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-white">Explore</h4>
          <ul className="space-y-2 text-sm">
            {NAV.map((n) => (
              <li key={n.label}>
                <a href={n.href} className="transition hover:text-gold">{n.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-white">Collections</h4>
          <ul className="space-y-2 text-sm">
            {['Living Room', 'Bedroom', 'Office', 'Premium Collection', 'Hospitality'].map((c) => (
              <li key={c}>
                <a href="#categories" className="transition hover:text-gold">{c}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-white">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li><a href={CONTACT.phoneHref} className="transition hover:text-gold">{CONTACT.phone}</a></li>
            <li><a href={`mailto:${CONTACT.email}`} className="transition hover:text-gold">{CONTACT.email}</a></li>
            <li className="leading-relaxed">{CONTACT.address}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-white/50 md:flex-row md:px-8">
          <p>© {new Date().getFullYear()} Himalayan Furniture Mart. All rights reserved.</p>
          <p>Designed for premium living.</p>
        </div>
      </div>
    </footer>
  )
}
