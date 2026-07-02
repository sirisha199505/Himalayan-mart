import { useState } from 'react'
import Reveal from './Reveal'
import { CONTACT, STOCK } from '../data'

const I = {
  phone: <path d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 2 6a2 2 0 0 1 2-2z" />,
  chat: <><path d="M21 11.5a8.5 8.5 0 0 1-12.5 7.5L3 21l2-5.5A8.5 8.5 0 1 1 21 11.5z" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  pin: <><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></>,
  send: <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" />,
}

function Svg({ path, className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {path}
    </svg>
  )
}

// Small contact cards. `accent` renders the highlighted (filled) WhatsApp card.
function InfoCard({ icon, label, value, href, external, accent }) {
  const inner = (
    <>
      <span
        className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${
          accent ? 'bg-white/20 text-white' : 'bg-gold/15 text-gold'
        }`}
      >
        <Svg path={icon} />
      </span>
      <span className="min-w-0">
        <span className={`block text-[0.7rem] font-semibold uppercase tracking-wider ${accent ? 'text-white/80' : 'text-ink-700'}`}>
          {label}
        </span>
        <span className={`block truncate font-semibold ${accent ? 'text-white' : 'text-ink'}`}>{value}</span>
      </span>
    </>
  )
  const cls = `flex items-center gap-3 rounded-2xl p-4 transition ${
    accent
      ? 'bg-gold text-white shadow-md hover:bg-gold-dark'
      : 'bg-white ring-1 ring-ink/5 hover:ring-gold/40'
  }`
  return href ? (
    <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} className={cls}>
      {inner}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  )
}

export default function Contact() {
  const [sent, setSent] = useState(false)

  return (
    <section id="contact" className="relative overflow-hidden py-16">
      {/* Background image + soft ivory scrim + gold glow */}
      <img src={STOCK.warmLiving} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-br from-mist/95 via-mist/90 to-mist/80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(201,162,39,0.14),transparent_45%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-8 px-5 md:px-8 lg:grid-cols-2 lg:gap-10">
        {/* Left — reach us */}
        <Reveal>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-gold">Reach Us</p>
          <h2 className="font-display text-4xl font-semibold text-ink md:text-5xl">Talk to our team</h2>

          <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <InfoCard icon={I.phone} label="Call Us" value={CONTACT.phone} href={CONTACT.phoneHref} />
            <InfoCard icon={I.chat} label="WhatsApp" value="Chat with us" href={CONTACT.whatsapp} external accent />
            <InfoCard icon={I.mail} label="Email" value={CONTACT.email} href={`mailto:${CONTACT.email}`} />
            <InfoCard icon={I.clock} label="Hours" value={CONTACT.hours} />
          </div>

          {/* Locations */}
          <div className="mt-6 rounded-2xl bg-white p-6 ring-1 ring-ink/5">
            <h3 className="font-display text-xl font-semibold text-ink">Our Locations</h3>
            <ul className="mt-4 space-y-4">
              {CONTACT.locations.map((loc) => (
                <li key={loc.city} className="flex gap-3">
                  <span className="mt-0.5 text-gold"><Svg path={I.pin} /></span>
                  <div>
                    <p className="font-semibold text-ink">{loc.city}</p>
                    <p className="text-sm text-ink-700">{loc.address}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Right — message form */}
        <Reveal delay={0.1}>
          <div className="rounded-3xl bg-white p-6 shadow-lux ring-1 ring-ink/5 sm:p-8 md:p-10">
            {sent ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <span className="mb-4 grid h-16 w-16 place-items-center rounded-full bg-gold/15 text-gold">
                  <Svg path={<path d="M5 13l4 4L19 7" />} className="h-8 w-8" />
                </span>
                <h3 className="font-display text-2xl font-semibold text-ink">Thank you!</h3>
                <p className="mt-2 text-ink-700">Our team will reach out within one business day.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="space-y-5">
                <div>
                  <h3 className="font-display text-2xl font-semibold text-ink">Send us a message</h3>
                  <p className="mt-1 text-sm text-ink-700">
                    Fill in the form and we’ll be in touch shortly — or reach us instantly on{' '}
                    <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="font-medium text-gold hover:underline">
                      WhatsApp
                    </a>.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full Name" name="name" placeholder="Your name" required />
                  <Field label="Phone" name="phone" type="tel" placeholder="+91 …" required />
                </div>
                <Field label="Email" name="email" type="email" placeholder="you@email.com" />

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink">Subject</label>
                  <select className="w-full rounded-xl border border-ink/15 bg-mist px-4 py-3 text-ink outline-none transition focus:border-gold">
                    <option>General Enquiry</option>
                    <option>Product Enquiry</option>
                    <option>Bulk / Project Order</option>
                    <option>Premium Collection</option>
                    <option>Support</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink">Message</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us how we can help…"
                    className="w-full resize-none rounded-xl border border-ink/15 bg-mist px-4 py-3 text-ink outline-none transition focus:border-gold"
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-gold py-4 font-semibold text-ink transition hover:bg-gold-dark"
                >
                  <Svg path={I.send} className="h-5 w-5" />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Field({ label, name, type = 'text', placeholder, required }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink">
        {label} {required && <span className="text-gold">*</span>}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-ink/15 bg-mist px-4 py-3 text-ink outline-none transition placeholder:text-ink/40 focus:border-gold"
      />
    </div>
  )
}
