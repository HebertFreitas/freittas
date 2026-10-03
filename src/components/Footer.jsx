import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { booking, brand, contact, copy, hours, nav } from '../config/site'
import { motionTokens, springs } from '../lib/motion-tokens'
import { IconChevronUp, IconClock, IconInstagram, IconPhone, IconPin, IconWhatsApp } from './Icons'
import { StoreButtons } from './ui'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer__tagline">{brand.tagline}</p>
        <div className="footer__grid">
          <div>
            <h3>Redes sociais</h3>
            <a className="footer__social" href={contact.instagram} target="_blank" rel="noreferrer"><IconInstagram width={18} height={18} />Instagram</a>
            <a className="footer__social" href={contact.whatsapp} target="_blank" rel="noreferrer"><IconWhatsApp width={18} height={18} />WhatsApp</a>
          </div>
          <div>
            <h3>Navegação</h3>
            <ul>{nav.map(([id, label]) => <li key={id}><a href={`#${id}`}>{label}</a></li>)}</ul>
          </div>
          {hours.length > 0 && <div>
            <h3>Horário</h3>
            <p className="footer__line"><IconClock width={16} height={16} /><span>{hours.map(([d, h]) => <span key={d}>{d}: {h}</span>)}</span></p>
          </div>}
          <div>
            <h3>{copy.visit.addressTitle ?? 'Endereço'}</h3>
            <p className="footer__line"><IconPin width={16} height={16} /><span>{contact.address.map((l) => <span key={l}>{l}</span>)}</span></p>
            <a className="footer__line" href={contact.phoneHref}><IconPhone width={16} height={16} />{contact.phoneLabel}</a>
          </div>
        </div>
        {booking.mode === 'app' && (
          <div className="footer__apps">
            <p>{copy.app.footerText}</p>
            <StoreButtons tone="light" />
          </div>
        )}
        <p className="footer__legal">© {new Date().getFullYear()} {brand.fullName}. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}

export function FloatingActions() {
  const { scrollY, scrollYProgress } = useScroll()
  const [showTop, setShowTop] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => setShowTop(y > 700))

  return (
    <>
      <motion.div className="progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
      <AnimatePresence>
        {showTop && (
          <motion.button
            key="to-top"
            className="fab fab--top"
            type="button"
            aria-label="Voltar ao topo"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, scale: motionTokens.scale.press, y: motionTokens.distance.sm }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: motionTokens.scale.press, y: motionTokens.distance.sm }}
            whileHover={{ y: -3 }}
            transition={springs.snappy}
          >
            <IconChevronUp />
          </motion.button>
        )}
      </AnimatePresence>
      <motion.a
        className="fab fab--whatsapp"
        href={contact.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label={`Falar com a ${brand.name} no WhatsApp`}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: motionTokens.scale.pop * 1.03 }}
        whileTap={{ scale: motionTokens.scale.press }}
        transition={{ ...springs.snappy, delay: 1.2 }}
      >
        <IconWhatsApp width={28} height={28} />
      </motion.a>
    </>
  )
}
