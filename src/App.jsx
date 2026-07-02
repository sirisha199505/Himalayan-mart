import { useEffect, useState } from 'react'
import Lenis from 'lenis'

import Navbar from './components/Navbar'
import CategoryPage from './components/CategoryPage'
import Hero from './components/Hero'
import Categories from './components/Categories'
import Collections from './components/Collections'
import ShopByRoom from './components/ShopByRoom'
import FeaturedProducts from './components/FeaturedProducts'
import WhyChooseUs from './components/WhyChooseUs'
import CommercialProjects from './components/CommercialProjects'
import Gallery from './components/Gallery'
import PremiumCollection from './components/PremiumCollection'
import Testimonials from './components/Testimonials'
import Brands from './components/Brands'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'

export default function App() {
  const [catSlug, setCatSlug] = useState(null)

  useEffect(() => {
    // Respect reduced-motion: skip smooth-scroll inertia entirely.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    let raf
    const loop = (time) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    // Route in-page anchor clicks through Lenis for smooth section jumps.
    const onClick = (e) => {
      const link = e.target.closest('a[href^="#"]')
      if (!link) return
      const id = link.getAttribute('href')
      if (id.length > 1) {
        const el = document.querySelector(id)
        if (el) {
          e.preventDefault()
          lenis.scrollTo(el, { offset: -80 })
        }
      }
    }
    document.addEventListener('click', onClick)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('click', onClick)
      lenis.destroy()
    }
  }, [])

  return (
    <div>
      <Navbar onOpenCategory={setCatSlug} />
      <main>
        <Hero />
        <Categories />
        <Collections onOpenCategory={setCatSlug} />
        <ShopByRoom />
        <FeaturedProducts />
        <WhyChooseUs />
        <CommercialProjects />
        <Gallery />
        <PremiumCollection />
        <Testimonials />
        <Brands />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <CategoryPage slug={catSlug} onClose={() => setCatSlug(null)} />
    </div>
  )
}
