import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { copy, heroSlides } from '../config/site'
import { motionTokens, staggerContainer } from '../lib/motion-tokens'
import { useAppModal } from '../lib/overlays'
import { PillButton } from './ui'

const line = {
  hidden: { opacity: 0, y: '0.6em' },
  visible: { opacity: 1, y: 0, transition: { duration: motionTokens.duration.cinematic, ease: motionTokens.easing.smooth } },
}

export function Hero() {
  const ref = useRef(null)
  const openApp = useAppModal()
  const reduce = useReducedMotion()
  const [slide, setSlide] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  useEffect(() => {
    if (reduce) return
    const id = setTimeout(() => setSlide((s) => (s + 1) % heroSlides.length), motionTokens.duration.slide * 1000)
    return () => clearTimeout(id)
  }, [reduce, slide])

  return (
    <section className="hero" id="inicio" ref={ref}>
      <motion.div className="hero__media" style={{ y }} aria-hidden="true">
        <AnimatePresence initial={false}>
          <motion.img
            key={heroSlides[slide].src}
            src={heroSlides[slide].src}
            alt=""
            style={{ objectPosition: heroSlides[slide].focus ?? 'center' }}
            initial={{ opacity: 0, scale: motionTokens.scale.zoom }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: motionTokens.duration.cinematic * 1.5 }, scale: { duration: motionTokens.duration.slide + 2, ease: 'linear' } }}
          />
        </AnimatePresence>
      </motion.div>
      <div className="hero__shade" aria-hidden="true" />

      <motion.div className="container hero__content" style={{ opacity: fade }}>
        <motion.div variants={staggerContainer(motionTokens.stagger.loose, 0.35)} initial="hidden" animate="visible">
          <motion.span className="hero__rule" aria-hidden="true" variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: motionTokens.duration.slow, ease: motionTokens.easing.smooth } } }} />
          <h1>
            <span className="hero__line"><motion.span variants={line}>{copy.hero.line1}</motion.span></span>
            <span className="hero__line hero__line--em">
              <motion.em variants={line}>{copy.hero.line2}</motion.em>
              <svg className="hero__swash" viewBox="0 0 300 14" preserveAspectRatio="none" aria-hidden="true">
                <motion.path
                  d="M2 9 C 60 3, 120 12, 180 7 S 270 4, 298 8"
                  variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1, transition: { duration: motionTokens.duration.cinematic, ease: motionTokens.easing.inOut, delay: 0.5 } } }}
                />
              </svg>
            </span>
          </h1>
          <motion.p className="hero__text" variants={line}>
            {copy.hero.text}
          </motion.p>
          <motion.div className="hero__actions" variants={line}>
            <PillButton onClick={openApp} tone="light">{copy.cta}</PillButton>
            <a className="hero__link" href={copy.hero.linkHref ?? '#experiencia'}>{copy.hero.link}</a>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="hero__dots" role="tablist" aria-label={copy.hero.slidesLabel}>
        {heroSlides.map((s, i) => (
          <button key={s.src} type="button" role="tab" aria-selected={i === slide} aria-label={s.alt} onClick={() => setSlide(i)}>
            {i === slide && <motion.span layoutId="hero-dot" className="hero__dot-fill" />}
          </button>
        ))}
      </div>
    </section>
  )
}
