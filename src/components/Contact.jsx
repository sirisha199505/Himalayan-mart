import { useState } from 'react'
import { CONTACT, STOCK } from '../data'

const DETAILS = [
  {
    label: 'Email',
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    icon: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  },
  {
    label: 'Phone',
    value: CONTACT.phone,
    href: CONTACT.phoneHref,
    icon: <path d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 2 6a2 2 0 0 1 2-2z" />,
  },
  {
    label: 'Address',
    value: CONTACT.address,
    href: CONTACT.mapsHref,
    icon: <><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></>,
  },
]

export default function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Wire to backend / CRM later; for now show confirmation.
    setSent(true)
  }

  return (
    <section id="contact" className="relative overflow-hidden">
      {/* Full-bleed background */}
      <img
        src={STOCK.warmLiving}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Dark gradient, left → right (keeps text readable) */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/20" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-20 md:px-8 lg:grid-cols-2 lg:gap-8 lg:py-28">
        {/* Left — heading + details */}
        <div className="text-white">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold">Get in Touch</p>
          <h2 className="font-display text-5xl font-semibold leading-none md:text-7xl">Contact Us</h2>
          <p className="mt-6 max-w-md text-white/75">
            Feel free to contact us with any questions or concerns. Use the form or reach us
            directly — we look forward to furnishing your space.
          </p>

          <div className="mt-10 space-y-6">
            {DETAILS.map((d) => (
              <div key={d.label} className="flex items-start gap-4">
                <span className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    {d.icon}
                  </svg>
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-gold">{d.label}</p>
                  <a
                    href={d.href}
                    target={d.label === 'Address' ? '_blank' : undefined}
                    rel="noreferrer"
                    className="mt-1 block max-w-sm text-white/85 transition hover:text-white"
                  >
                    {d.value}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
            >
              WhatsApp Us
            </a>
            <a
              href={CONTACT.phoneHref}
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:border-gold hover:text-gold"
            >
              Call Now
            </a>
          </div>
        </div>

        {/* Right — quote form card */}
        <div className="self-center rounded-3xl bg-white p-8 shadow-lux md:p-10">
          {sent ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <span className="mb-4 grid h-16 w-16 place-items-center rounded-full bg-gold/15 text-gold">
                <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <h3 className="font-display text-2xl font-semibold text-ink">Thank you!</h3>
              <p className="mt-2 text-ink-700">Our team will reach out within one business day.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-display text-2xl font-semibold text-ink">Request a Quote</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full Name" name="name" required />
                <Field label="Phone" name="phone" type="tel" required />
              </div>
              <Field label="Email" name="email" type="email" />
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink">Interested in</label>
                <select className="w-full rounded-xl border border-ink/15 bg-mist px-4 py-3 text-ink outline-none transition focus:border-gold">
                  <option>Residential Furniture</option>
                  <option>Commercial / Office</option>
                  <option>Premium Collection</option>
                  <option>Full Project / Fit-out</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink">Message</label>
                <textarea
                  rows={3}
                  className="w-full resize-none rounded-xl border border-ink/15 bg-mist px-4 py-3 text-ink outline-none transition focus:border-gold"
                  placeholder="Tell us what you're looking for…"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-gold py-4 font-semibold text-ink transition hover:bg-gold-dark"
              >
                Send Enquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function Field({ label, name, type = 'text', required }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink">
        {label} {required && <span className="text-gold">*</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl border border-ink/15 bg-mist px-4 py-3 text-ink outline-none transition focus:border-gold"
      />
    </div>
  )
}
