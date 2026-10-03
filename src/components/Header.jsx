import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { brand, copy, nav } from '../config/site'
import { motionTokens, springs, staggerContainer } from '../lib/motion-tokens'
import { useAppModal } from '../lib/overlays'

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [ids])
  return active
}

const ids = nav.map(([id]) => id)

export function Header() {
  const openApp = useAppModal()
  const { scrollY } = useScroll()
  const [solid, setSolid] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection(ids)
  useMotionValueEvent(scrollY, 'change', (y) => setSolid(y > 40))

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', onKey) }
  }, [menuOpen])

  return (
    <>
      <motion.header
        className={`header ${solid || menuOpen ? 'header--solid' : ''}`}
        initial={{ y: -motionTokens.distance.xl, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: motionTokens.duration.slow, ease: motionTokens.easing.smooth, delay: 0.2 }}
      >
        <div className="container header__inner">
          <a className="brand" href="#inicio" aria-label={`${brand.fullName}, voltar ao início`} onClick={() => setMenuOpen(false)}>
            <img src={brand.logo} alt="" width="44" height="44" />
            <span className="brand__word">{brand.name}<small>{brand.kind}</small></span>
          </a>

          <nav className="header__nav" aria-label="Navegação principal">
            {nav.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={active === id ? 'is-active' : ''} aria-current={active === id ? 'true' : undefined}>
                {label}
                {active === id && <motion.span className="header__underline" layoutId="nav-underline" transition={springs.snappy} />}
              </a>
            ))}
          </nav>

          <div className="header__actions">
            <motion.button className="header__cta" type="button" onClick={openApp} whileHover={{ scale: motionTokens.scale.pop }} whileTap={{ scale: motionTokens.scale.press }} transition={springs.snappy}>
              {copy.cta}
            </motion.button>
            <button className={`burger ${menuOpen ? 'is-open' : ''}`} type="button" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen((o) => !o)}>
              <span /><span />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div key="menu" id="mobile-menu" className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: motionTokens.duration.fast }}>
            <motion.nav aria-label="Menu" variants={staggerContainer(motionTokens.stagger.tight, 0.08)} initial="hidden" animate="visible" exit="hidden">
              {nav.map(([id, label]) => (
                <motion.a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setMenuOpen(false)}
                  variants={{ hidden: { opacity: 0, x: -motionTokens.distance.md }, visible: { opacity: 1, x: 0, transition: springs.gentle } }}
                >
                  {label}
                </motion.a>
              ))}
              <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
                <button className="header__cta header__cta--block" type="button" onClick={() => { setMenuOpen(false); openApp() }}>{copy.cta}</button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
