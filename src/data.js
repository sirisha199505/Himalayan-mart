// ============================================================================
// Himalayan Furniture Mart — content & image registry
// ----------------------------------------------------------------------------
// LOCAL photos live in /public and are the client's real imagery.
// UNSPLASH urls are curated placeholders — swap each for owned product
// photography before launch. Everything the site renders is defined here so
// content edits never require touching component code.
// ============================================================================

// Client-supplied photos (in /public)
export const LOCAL = {
  livingLux: '/image1.jpg',   // luxury living room, gold-accent sofas
  office: '/image2.jpg',      // modern executive office
  bedroomLux: '/image3.jpg',  // luxury bedroom + wardrobe
  restaurant: '/image4.jpg',  // restaurant tufted booths
}

// Downloaded furniture photography, stored locally in /public/products.
// Each key is mapped to a file that was VISUALLY VERIFIED to show that subject
// (several source files were mislabelled, so mapping is by actual content).
// Replace any of these with owned product photography before launch.
export const STOCK = {
  dining: '/products/dining.jpg',            // dining room, green velvet chairs
  diningSet: '/products/dining.jpg',         // (reuse — real dining set)
  kitchen: '/products/kitchen.jpg',          // white modern kitchen
  homeOffice: '/products/home-office.jpg',   // office lounge seating
  wardrobe: '/products/wardrobe.jpg',        // wooden wardrobe
  tvUnit: '/products/storage.jpg',           // warm living w/ media wall
  sofa: '/products/sofa.jpg',                // grey tufted sofa
  orangeSofa: '/products/tv-unit.jpg',       // burnt-orange sofa
  designerBed: '/products/designer-bed.jpg', // tufted upholstered bed
  conference: '/products/reception.jpg',     // conference table, pink chairs
  reception: '/products/conference.jpg',     // office lobby / storage wall
  workstation: '/products/workstation.jpg',  // counter workspace by windows
  hotel: '/products/hotel.jpg',              // warm hotel suite
  cafe: '/products/cafe.jpg',                // cafe table w/ coffee press
  storage: '/products/conference.jpg',       // office storage shelving
  cafeteria: '/products/cafeteria.jpg',      // bar / cafeteria seating
  imported: '/products/imported.jpg',        // bright designer sectional
  warmLiving: '/products/storage.jpg',       // warm living room, leather ottomans
}

export const CONTACT = {
  phone: '+91 89773 92288',
  phoneHref: 'tel:+918977392288',
  whatsapp: 'https://wa.me/918977392288',
  email: 'himalayanfurnituremart@gmail.com',
  address: 'H, 490/25, opp. Hotel City Diamond, Huda Colony, Asif Nagar, Hyderabad, Telangana 500028',
  mapsHref: 'https://maps.google.com/?q=Himalayan+Furniture+Mart+Huda+Colony+Asif+Nagar+Hyderabad',
}

// ── Hero carousel slides ────────────────────────────────────────────────────
// Warm, editorial luxury photography — living / bedroom / dining / office / interior.
export const HERO_SLIDES = [
  { image: LOCAL.livingLux, heading: 'Crafted to Perfection', sub: 'Luxury furniture designed for modern living.' },
  { image: LOCAL.bedroomLux, heading: 'Rest in Refined Comfort', sub: 'Bedrooms that turn everyday rest into ritual.' },
  { image: STOCK.dining, heading: 'Gather in Grand Style', sub: 'Dining spaces made for memorable evenings.' },
  { image: LOCAL.office, heading: 'Work in Elegance', sub: 'Commercial furniture that commands presence.' },
  { image: STOCK.warmLiving, heading: 'Interiors, Reimagined', sub: 'End-to-end furnishing for every space you own.' },
]

// ── Full catalogue — one entry per sub-category, each with its own image ────
// Every entry gets a slug; the "Shop by Category" section renders an anchored
// image tile (id=`cat-<slug>`) for each, and the mega-menu links point to them,
// so clicking any menu item scrolls to a real image tile.
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export const CATALOG = [
  // Residential
  { name: 'Living Room', group: 'Residential', image: STOCK.imported },
  { name: 'Bedroom', group: 'Residential', image: LOCAL.bedroomLux },
  { name: 'Dining Room', group: 'Residential', image: STOCK.dining },
  { name: 'Kitchen Furniture', group: 'Residential', image: STOCK.kitchen },
  { name: 'Home Office', group: 'Residential', image: STOCK.homeOffice },
  { name: 'Wardrobes', group: 'Residential', image: STOCK.wardrobe },
  { name: 'TV Units', group: 'Residential', image: STOCK.warmLiving },
  { name: 'Study Tables', group: 'Residential', image: STOCK.workstation },
  // Commercial
  { name: 'Office Workstations', group: 'Commercial', image: STOCK.workstation },
  { name: 'Executive Tables', group: 'Commercial', image: LOCAL.office },
  { name: 'Conference Tables', group: 'Commercial', image: STOCK.conference },
  { name: 'Reception Furniture', group: 'Commercial', image: STOCK.reception },
  { name: 'Storage Solutions', group: 'Commercial', image: STOCK.wardrobe },
  { name: 'Cafeteria Furniture', group: 'Commercial', image: STOCK.cafeteria },
  // Premium Collection
  { name: 'Luxury Sofas', group: 'Premium Collection', image: LOCAL.livingLux },
  { name: 'Imported Furniture', group: 'Premium Collection', image: STOCK.warmLiving },
  { name: 'Designer Beds', group: 'Premium Collection', image: STOCK.designerBed },
  { name: 'Premium Dining Sets', group: 'Premium Collection', image: STOCK.diningSet },
  { name: 'Luxury Office Furniture', group: 'Premium Collection', image: LOCAL.office },
].map((c) => ({ ...c, slug: slugify(c.name) }))

export const CATALOG_GROUPS = ['Residential', 'Commercial', 'Premium Collection']

// Mega-menu columns derived from CATALOG so menu ↔ section never drift.
const menuColumns = CATALOG_GROUPS.map((g) => ({
  title: g,
  links: CATALOG.filter((c) => c.group === g).map((c) => ({ label: c.name, slug: c.slug })),
}))

// Category-page helpers -------------------------------------------------------
export const categoryBySlug = (slug) => CATALOG.find((c) => c.slug === slug) || null

const GROUP_BLURB = {
  Residential: 'Thoughtfully crafted pieces that bring warmth, comfort and function to your home.',
  Commercial: 'Durable, professional furniture engineered for demanding modern workspaces.',
  'Premium Collection': 'Imported materials and designer silhouettes for the most discerning eye.',
}
export const categoryBlurb = (cat) => (cat ? GROUP_BLURB[cat.group] : '')

const PRODUCT_POOL = [
  STOCK.sofa, STOCK.designerBed, STOCK.dining, STOCK.wardrobe, STOCK.homeOffice,
  STOCK.imported, STOCK.warmLiving, STOCK.kitchen, LOCAL.livingLux, LOCAL.bedroomLux,
  LOCAL.office, STOCK.hotel,
]

// Generates a small product set for a category (placeholder catalogue —
// swap for real SKUs later). Leads with the category's own image.
export function productsForCategory(cat) {
  if (!cat) return []
  const imgs = [cat.image]
  for (const p of PRODUCT_POOL) {
    if (imgs.length >= 6) break
    if (!imgs.includes(p)) imgs.push(p)
  }
  const tiers = ['Signature', 'Classic', 'Deluxe', 'Premium', 'Heritage', 'Studio']
  return imgs.map((image, i) => ({
    name: `${cat.name} — ${tiers[i % tiers.length]}`,
    price: `₹ ${((42 + i * 27) * 1000).toLocaleString('en-IN')}`,
    image,
  }))
}

// ── Nav / mega-menu ─────────────────────────────────────────────────────────
export const NAV = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Products', href: '#collections', columns: menuColumns },
  { label: 'Projects', href: '#projects' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

// ── Category groups ───────────────────────────────────────────────────────
export const CATEGORY_GROUPS = [
  {
    key: 'residential',
    title: 'Residential',
    blurb: 'Everyday elegance for living rooms, bedrooms & beyond.',
    image: LOCAL.livingLux,
    items: ['Living Room', 'Bedroom', 'Dining Room', 'Kitchen Furniture', 'Home Office', 'Wardrobes', 'TV Units', 'Study Tables'],
  },
  {
    key: 'commercial',
    title: 'Commercial',
    blurb: 'Workspaces engineered for productivity and presence.',
    image: LOCAL.office,
    items: ['Office Workstations', 'Executive Tables', 'Conference Tables', 'Reception Furniture', 'Storage Solutions', 'Cafeteria Furniture'],
  },
  {
    key: 'premium',
    title: 'Premium Collection',
    blurb: 'Imported and designer pieces for the discerning eye.',
    image: LOCAL.bedroomLux,
    items: ['Luxury Sofas', 'Imported Furniture', 'Designer Beds', 'Premium Dining Sets', 'Luxury Office Furniture'],
  },
]

// ── Shop by room ─────────────────────────────────────────────────────────
export const ROOMS = [
  { name: 'Living Room', image: LOCAL.livingLux },
  { name: 'Bedroom', image: LOCAL.bedroomLux },
  { name: 'Dining', image: STOCK.diningSet },
  { name: 'Office', image: LOCAL.office },
  { name: 'Hotel', image: STOCK.hotel },
  { name: 'Restaurant', image: LOCAL.restaurant },
  { name: 'Cafe', image: STOCK.cafe },
]

// ── Featured products ─────────────────────────────────────────────────────
export const FEATURED = [
  { name: 'Aurelia Gold-Trim Sofa Set', category: 'Luxury Sofas', price: '₹ 2,45,000', image: LOCAL.livingLux, tag: 'Bestseller' },
  { name: 'Regalia Upholstered Bed', category: 'Designer Beds', price: '₹ 1,18,000', image: LOCAL.bedroomLux, tag: 'New' },
  { name: 'Meridian Executive Desk', category: 'Office', price: '₹ 68,500', image: LOCAL.office, tag: null },
  { name: 'Sienna Marble Dining Set', category: 'Premium Dining', price: '₹ 1,95,000', image: STOCK.diningSet, tag: 'Limited' },
  { name: 'Nordic Home Office Suite', category: 'Home Office', price: '₹ 54,000', image: STOCK.homeOffice, tag: null },
  { name: 'Cambridge Wardrobe', category: 'Wardrobes', price: '₹ 89,000', image: STOCK.wardrobe, tag: null },
  { name: 'Belmont Conference Table', category: 'Conference', price: '₹ 1,32,000', image: STOCK.conference, tag: null },
  { name: 'Velluto Chesterfield Booth', category: 'Hospitality', price: '₹ 76,000', image: LOCAL.restaurant, tag: 'Popular' },
]

// ── Why choose us — animated counters ───────────────────────────────────────
export const STATS = [
  { value: 10000, suffix: '+', label: 'Products' },
  { value: 5000, suffix: '+', label: 'Happy Customers' },
  { value: 15, suffix: '+', label: 'Years Experience' },
  { value: 100, suffix: '%', label: 'Pan-India Delivery' },
]

// ── Commercial projects ─────────────────────────────────────────────────────
export const PROJECTS = [
  { title: 'Corporate Offices', desc: 'Turnkey workstations & executive suites', image: LOCAL.office, span: 'lg:col-span-2 lg:row-span-2' },
  { title: 'Hotels', desc: 'Lobby, suite & banquet furnishing', image: STOCK.hotel, span: '' },
  { title: 'Restaurants', desc: 'Booths, tables & bar seating', image: LOCAL.restaurant, span: '' },
  { title: 'Schools', desc: 'Durable classroom & library furniture', image: STOCK.storage, span: '' },
  { title: 'Hospitals', desc: 'Waiting, ward & consultation furniture', image: STOCK.reception, span: '' },
]

// ── Premium collection (dark section) ───────────────────────────────────────
export const PREMIUM = [
  { name: 'Luxury Sofa Collection', desc: 'Hand-finished frames, imported upholstery', image: LOCAL.livingLux },
  { name: 'Premium Beds', desc: 'Statement headboards in velvet & gold', image: LOCAL.bedroomLux },
  { name: 'Imported Furniture', desc: 'Sourced from Italy, Turkey & beyond', image: STOCK.imported },
]

// ── Testimonials ─────────────────────────────────────────────────────────
export const TESTIMONIALS = [
  { name: 'Ananya Rao', role: 'Homeowner, Bengaluru', quote: 'The living room set transformed our home. Craftsmanship and finish are simply unmatched.', rating: 5 },
  { name: 'Vikram Mehta', role: 'Director, Nexus Corp', quote: 'They furnished three floors of our office ahead of schedule. Truly professional end to end.', rating: 5 },
  { name: 'Priya Nair', role: 'Owner, The Copper Spoon', quote: 'Our restaurant seating gets complimented daily. Comfort and durability in equal measure.', rating: 5 },
  { name: 'Rahul Desai', role: 'Interior Architect', quote: 'My go-to for premium and imported pieces. The catalogue depth is remarkable.', rating: 5 },
]

// ── Gallery ────────────────────────────────────────────────────────────────
export const GALLERY = [
  { image: LOCAL.livingLux, caption: 'Luxury Living Room' },
  { image: STOCK.designerBed, caption: 'Designer Bed' },
  { image: LOCAL.office, caption: 'Executive Office' },
  { image: STOCK.dining, caption: 'Modern Dining' },
  { image: LOCAL.bedroomLux, caption: 'Premium Bedroom Suite' },
  { image: STOCK.hotel, caption: 'Hotel Suite' },
  { image: STOCK.sofa, caption: 'Living Room Sofa' },
  { image: STOCK.kitchen, caption: 'Modern Kitchen' },
  { image: LOCAL.restaurant, caption: 'Restaurant Seating' },
  { image: STOCK.wardrobe, caption: 'Wooden Wardrobe' },
  { image: STOCK.warmLiving, caption: 'Warm Living Space' },
  { image: STOCK.cafe, caption: 'Café Corner' },
  { image: STOCK.imported, caption: 'Imported Collection' },
  { image: STOCK.workstation, caption: 'Workspace' },
]

// ── Brands ───────────────────────────────────────────────────────────────
export const BRANDS = ['Featherlite', 'Godrej Interio', 'Durian', 'Nilkamal', 'Wipro Furniture', 'Zuari', 'Wooden Street', 'HNI']
