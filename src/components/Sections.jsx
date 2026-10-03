import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, animate, motion, useInView, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ambient, appPerks, brand, contact, copy, features, hours, prices, process, reviews, sections, stats, team } from '../config/site'
import { fadeUp, inViewOnce, motionTokens, springs, staggerContainer } from '../lib/motion-tokens'
import { useAppModal } from '../lib/overlays'
import { IconCheck, IconChevronLeft, IconChevronRight, IconClock, IconPin, IconStar } from './Icons'
import { PhotoTile, PillButton, SectionHeading, StoreButtons } from './ui'

const numberFormat = (decimals) => new Intl.NumberFormat('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })

function CountUp({ value, decimals = 0, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduce = useReducedMotion()
  const format = useMemo(() => numberFormat(decimals), [decimals])
  const [display, setDisplay] = useState(format.format(0))

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: reduce ? 0 : motionTokens.duration.cinematic * 1.4,
      ease: motionTokens.easing.smooth,
      onUpdate: (v) => setDisplay(format.format(v)),
    })
    return () => controls.stop()
  }, [inView, reduce, value, format])

  return <span ref={ref}>{display}{suffix}</span>
}

export function Intro() {
  const listRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 55%'] })
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section className="section section--base" id="experiencia">
      <div className="container">
        <motion.dl className="stats" variants={staggerContainer()} initial="hidden" whileInView="visible" viewport={inViewOnce}>
          {stats.map((s) => (
            <motion.div key={s.label} variants={fadeUp}>
              <dt>{s.label}</dt>
              <dd><CountUp {...s} /></dd>
            </motion.div>
          ))}
        </motion.dl>

        <div className="intro">
          <div>
            <SectionHeading first={copy.intro.first} second={copy.intro.second} />
            <motion.p className="lead" variants={fadeUp} initial="hidden" whileInView="visible" viewport={inViewOnce}>
              {copy.intro.text}
            </motion.p>
          </div>

          <div className="steps">
            <p className="steps__label">{copy.intro.stepsLabel}</p>
            <ol ref={listRef}>
              <span className="steps__track" aria-hidden="true"><motion.span style={{ scaleY: progress }} /></span>
              {process.map(([title, text], i) => (
                <motion.li key={title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={inViewOnce} transition={{ delay: i * motionTokens.stagger.base }}>
                  <span className="steps__num">{i + 1}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

const featurePhotos = features.map((f) => f.photo)

export function Features() {
  return (
    <section className="section section--surface section--tight">
      <div className="container">
        <SectionHeading first={copy.features.first} second={copy.features.second} />
        <motion.div className="bento" variants={staggerContainer()} initial="hidden" whileInView="visible" viewport={inViewOnce}>
          {features.map((f, i) => (
            <PhotoTile key={f.title} list={featurePhotos} index={i} group="features" className={`bento__item ${f.size ? `bento__item--${f.size}` : ''}`}>
              <span className="bento__copy">
                <span className="bento__tag">{f.tag}</span>
                <span className="bento__title">{f.title}</span>
                <span className="bento__text">{f.text}</span>
              </span>
            </PhotoTile>
          ))}
        </motion.div>
        {sections.pricing && (
          <div className="center-action">
            <PillButton href="#servicos">{copy.features.action}</PillButton>
          </div>
        )}
      </div>
    </section>
  )
}

export function Team() {
  return (
    <section className="section section--base" id="equipe">
      <div className="container">
        <SectionHeading label={copy.team.label} first={copy.team.title} align="center" />
        <motion.div className="team" variants={staggerContainer()} initial="hidden" whileInView="visible" viewport={inViewOnce}>
          {team.map((p) => (
            <motion.article key={p.name} className="member" variants={fadeUp}>
              <div className="member__photo"><img src={p.photo} alt={`${copy.team.photoAlt}: ${p.role.toLowerCase()}`} loading="lazy" /></div>
              <p className="member__role">{p.role}</p>
              <h3>{p.name}</h3>
              <p>{p.text}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export function Pricing() {
  const openApp = useAppModal()
  return (
    <section className="section section--surface section--tight" id="servicos">
      <div className="container container--narrow">
        <SectionHeading first={copy.pricing.title} align="center" rule={false} />
        <motion.ul className="prices" variants={staggerContainer(motionTokens.stagger.tight)} initial="hidden" whileInView="visible" viewport={inViewOnce}>
          {prices.map((p) => (
            <motion.li key={p.name} className={p.featured ? 'is-featured' : ''} variants={fadeUp}>
              <div>
                <span className="prices__name">{p.name}</span>
                <span className="prices__time">{p.time}</span>
              </div>
              <span className="prices__value">{p.price}</span>
            </motion.li>
          ))}
        </motion.ul>
        <div className="center-action">
          <PillButton onClick={openApp}>{copy.ctaShort}</PillButton>
        </div>
      </div>
    </section>
  )
}

export function Ambient() {
  return (
    <section className="section section--base" id="ambiente">
      <div className="container">
        <SectionHeading first={copy.ambient.first} second={copy.ambient.second} />
        <motion.div className="mosaic" variants={staggerContainer(motionTokens.stagger.tight)} initial="hidden" whileInView="visible" viewport={inViewOnce}>
          {ambient.map((photo, i) => (
            <PhotoTile key={photo.src} list={ambient} index={i} group="ambient" className={`mosaic__item mosaic__item--${i + 1}`}>
              <span className="mosaic__caption">{photo.alt}</span>
            </PhotoTile>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export function Reviews() {
  const [[index, dir], setState] = useState([0, 1])
  const go = (d) => setState(([i]) => [(i + d + reviews.length) % reviews.length, d])
  const review = reviews[index]

  return (
    <section className="section section--surface" aria-roledescription="carrossel" aria-label="Depoimentos">
      <div className="container container--narrow reviews">
        <SectionHeading label={copy.reviews.label} first={copy.reviews.title} align="center" />
        <div className="reviews__stars" aria-label="Nota 5 de 5">
          {Array.from({ length: 5 }, (_, i) => <IconStar key={i} width={18} height={18} />)}
        </div>
        <div className="reviews__stage">
          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <motion.figure
              key={index}
              custom={dir}
              variants={{
                enter: (d) => ({ opacity: 0, x: d * motionTokens.distance.lg }),
                center: { opacity: 1, x: 0 },
                exit: (d) => ({ opacity: 0, x: d * -motionTokens.distance.lg }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: motionTokens.duration.normal, ease: motionTokens.easing.smooth }}
              aria-live="polite"
            >
              <blockquote>“{review.text}”</blockquote>
              <figcaption><strong>{review.name}</strong>{review.when}, {copy.reviews.source}</figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
        <div className="reviews__controls">
          <motion.button type="button" onClick={() => go(-1)} aria-label="Depoimento anterior" whileTap={{ scale: motionTokens.scale.press }}><IconChevronLeft width={18} height={18} /></motion.button>
          <div className="reviews__dots">
            {reviews.map((r, i) => (
              <button key={r.name} type="button" className={i === index ? 'is-active' : ''} aria-label={`Depoimento ${i + 1} de ${reviews.length}`} aria-current={i === index} onClick={() => setState([i, i > index ? 1 : -1])}>
                {i === index && <motion.span layoutId="review-dot" transition={springs.snappy} />}
              </button>
            ))}
          </div>
          <motion.button type="button" onClick={() => go(1)} aria-label="Próximo depoimento" whileTap={{ scale: motionTokens.scale.press }}><IconChevronRight width={18} height={18} /></motion.button>
        </div>
      </div>
    </section>
  )
}

export function AppSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rearPhoneY = useTransform(scrollYProgress, [0, 1], [motionTokens.distance.lg, -motionTokens.distance.lg])
  const rearPhoneRotate = useTransform(scrollYProgress, [0, 1], [-7, -2])
  const frontPhoneY = useTransform(scrollYProgress, [0, 1], [motionTokens.distance.xl, -motionTokens.distance.xl])
  const frontPhoneRotate = useTransform(scrollYProgress, [0, 1], [4, -2])

  return (
    <section className="section section--dark app" id="app" ref={ref}>
      <div className="container app__grid">
        <motion.div variants={staggerContainer()} initial="hidden" whileInView="visible" viewport={inViewOnce}>
          <SectionHeading first={copy.app.first} second={copy.app.second} tone="dark" />
          <motion.p className="lead lead--dark" variants={fadeUp}>{copy.app.text}</motion.p>
          <motion.ul className="app__perks" variants={staggerContainer()}>
            {appPerks.map((perk) => (
              <motion.li key={perk} variants={fadeUp}><IconCheck width={18} height={18} />{perk}</motion.li>
            ))}
          </motion.ul>
          <motion.div variants={fadeUp}><StoreButtons tone="light" /></motion.div>
        </motion.div>

        <div className="phones" aria-hidden="true">
          <motion.div className="phone phone--rear" style={{ y: rearPhoneY, rotate: rearPhoneRotate }}>
            <div className="phone__screen">
              <img src={copy.app.screens[0]} alt="" />
            </div>
          </motion.div>
          <motion.div className="phone phone--front" style={{ y: frontPhoneY, rotate: frontPhoneRotate }}>
            <div className="phone__screen">
              <img src={copy.app.screens[1]} alt="" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export function Visit() {
  const openApp = useAppModal()
  return (
    <section className="section section--base" id="contato">
      <div className={`container visit ${contact.mapsEmbed ? '' : 'visit--no-map'}`}>
        <div className="visit__info">
          <SectionHeading first={copy.visit.first} second={copy.visit.second} />
          <motion.div className="visit__details" variants={staggerContainer()} initial="hidden" whileInView="visible" viewport={inViewOnce}>
            <motion.div variants={fadeUp}>
              <span className="icon-box"><IconPin /></span>
              <div>
                <h3>{copy.visit.addressTitle ?? 'Endereço'}</h3>
                <p>{contact.address.map((l) => <span key={l}>{l}</span>)}</p>
                {contact.mapsLink && <a className="text-link" href={contact.mapsLink} target="_blank" rel="noreferrer">{copy.visit.mapsAction}</a>}
              </div>
            </motion.div>
            {hours.length > 0 && (
              <motion.div variants={fadeUp}>
                <span className="icon-box"><IconClock /></span>
                <div>
                  <h3>{copy.visit.hoursTitle ?? 'Horário'}</h3>
                  <p>{hours.map(([d, h]) => <span key={d}>{d}: {h}</span>)}</p>
                </div>
              </motion.div>
            )}
          </motion.div>
          <PillButton onClick={openApp}>{copy.ctaShort}</PillButton>
        </div>
        {contact.mapsEmbed && <motion.div className="visit__map" initial={{ opacity: 0, scale: motionTokens.scale.subtle }} whileInView={{ opacity: 1, scale: 1 }} viewport={inViewOnce} transition={{ duration: motionTokens.duration.slow, ease: motionTokens.easing.smooth }}>
          <iframe title={`Mapa com a localização da ${brand.fullName}`} src={contact.mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </motion.div>}
      </div>
    </section>
  )
}
