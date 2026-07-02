import { motion } from 'framer-motion'
import { CONTACT } from '../data'

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href={CONTACT.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: 'spring', stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/50" />
      <svg viewBox="0 0 24 24" className="relative h-7 w-7" fill="currentColor">
        <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.6 4.7-1.2A10 10 0 1 0 12 2zm5.1 13.9c-.2.6-1.3 1.1-1.8 1.1-.5.1-1 .1-3-.6-2.5-1-4.1-3.6-4.2-3.8-.1-.2-1-1.3-1-2.6s.7-1.8.9-2.1c.2-.3.5-.4.7-.4h.5c.2 0 .4 0 .5.4l.7 1.7c.1.1.1.3 0 .4l-.3.5-.4.5c-.1.1-.2.3-.1.5.2.3.7 1.1 1.5 1.8 1 .9 1.8 1.2 2.1 1.3.2.1.4.1.5-.1l.7-.9c.1-.2.3-.2.5-.1l1.4.7c.4.2.6.3.6.4.1.1.1.6-.1 1.1z" />
      </svg>
    </motion.a>
  )
}
