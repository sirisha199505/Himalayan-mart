import { BRANDS } from '../data'

export default function Brands() {
  // Duplicate the list so the -50% marquee loops seamlessly.
  const row = [...BRANDS, ...BRANDS]
  return (
    <section className="border-y border-ink/5 bg-mist py-14">
      <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.3em] text-ink-700">
        Brands We Work With
      </p>
      <div className="group relative overflow-hidden">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-mist to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-mist to-transparent" />
        <div className="flex w-max animate-marquee gap-16 group-hover:[animation-play-state:paused]">
          {row.map((brand, i) => (
            <span
              key={`${brand}-${i}`}
              className="whitespace-nowrap font-display text-2xl font-semibold text-ink/35 transition hover:text-ink"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
