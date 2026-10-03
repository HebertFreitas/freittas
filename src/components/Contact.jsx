import { useRef } from 'react'
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { brand, contact, copy, tracks } from '../config/site'
import { fadeUp, inViewOnce, motionTokens, springs, staggerContainer } from '../lib/motion-tokens'
import { IconArrowRight, IconChevronLeft, IconPin, IconPlay, IconSpotify, IconWhatsApp } from './Icons'
import { SectionHeading } from './ui'

const numberFormat = new Intl.NumberFormat('pt-BR')
const bubble = {
  hidden: { opacity: 0, y: motionTokens.distance.sm, scale: motionTokens.scale.subtle },
  visible: { opacity: 1, y: 0, scale: 1, transition: springs.snappy },
}

// Front phone: a WhatsApp chat that types itself when the section comes into view.
function WhatsAppScreen() {
  const ref = useRef(null)
  const inView = useInView(ref, inViewOnce)
  const reduce = useReducedMotion()
  const c = copy.contact.chat
  return (
    <div className="wa" ref={ref}>
      <div className="wa__bar">
        <IconChevronLeft />
        <img src={brand.logo} alt="" />
        <span><strong>{brand.name}</strong><small>{c.status}</small></span>
      </div>
      <motion.div className="wa__chat" variants={staggerContainer(motionTokens.duration.slow, motionTokens.duration.normal)} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
        <motion.p className="wa__day" variants={bubble}>{c.day}</motion.p>
        {c.messages.map(([from, text]) => (
          <motion.p key={text} className={`wa__msg wa__msg--${from}`} variants={bubble}>{text}<small>{c.time}</small></motion.p>
        ))}
        <motion.span className="wa__typing" variants={bubble}>
          {[0, 1, 2].map((i) => (
            <motion.i key={i} animate={reduce ? undefined : { y: [0, -3, 0], opacity: [0.4, 1, 0.4] }} transition={{ duration: motionTokens.duration.slow * 1.4, repeat: Infinity, delay: i * motionTokens.stagger.loose * 2 }} />
          ))}
        </motion.span>
      </motion.div>
      <div className="wa__input"><span>{c.placeholder}</span><i><IconArrowRight /></i></div>
    </div>
  )
}

// Rear phone: the artist page on Spotify, with the most played tracks.
function SpotifyScreen() {
  const s = copy.contact.spotify
  const top = [...tracks].filter((t) => t.plays).sort((a, b) => b.plays - a.plays).slice(0, 4)
  return (
    <div className="sp">
      <div className="sp__cover" style={{ backgroundImage: `url(${s.image})` }}>
        <span><strong>{brand.name}</strong><small>{s.listeners}</small></span>
      </div>
      <div className="sp__actions">
        <span className="sp__follow">{s.follow}</span>
        <span className="sp__play"><IconPlay /></span>
      </div>
      <p className="sp__title">{s.popular}</p>
      <ol className="sp__list">
        {top.map((t, i) => (
          <li key={t.spotify}>
            <span>{i + 1}</span>
            <img src={t.cover.src} alt="" />
            <span><strong>{t.title}</strong><small>{numberFormat.format(t.plays)}</small></span>
          </li>
        ))}
      </ol>
    </div>
  )
}

export function ContactPhones() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rearY = useTransform(scrollYProgress, [0, 1], [motionTokens.distance.lg, -motionTokens.distance.lg])
  const rearRotate = useTransform(scrollYProgress, [0, 1], [-7, -2])
  const frontY = useTransform(scrollYProgress, [0, 1], [motionTokens.distance.xl, -motionTokens.distance.xl])
  const frontRotate = useTransform(scrollYProgress, [0, 1], [4, -2])
  const t = copy.contact

  const actions = [
    { key: 'whatsapp', href: contact.whatsapp, Icon: IconWhatsApp, title: t.whatsappTitle, text: contact.phoneLabel },
    { key: 'spotify', href: copy.music.spotifyArtist, Icon: IconSpotify, title: t.spotifyTitle, text: t.spotifyText },
  ]

  return (
    <section className="section section--dark app contact" id="contato" ref={ref}>
      <div className="container app__grid">
        <motion.div variants={staggerContainer()} initial="hidden" whileInView="visible" viewport={inViewOnce}>
          <SectionHeading first={t.first} second={t.second} tone="dark" />
          <motion.p className="lead lead--dark" variants={fadeUp}>{t.text}</motion.p>
          <motion.div className="contact__actions" variants={staggerContainer()}>
            {actions.map(({ key, href, Icon, title, text }) => (
              <motion.a key={key} className={`contact__card contact__card--${key}`} href={href} target="_blank" rel="noreferrer" variants={fadeUp} whileHover={{ y: -4 }} whileTap={{ scale: motionTokens.scale.press }}>
                <span className="contact__icon"><Icon width={24} height={24} /></span>
                <span><strong>{title}</strong><small>{text}</small></span>
                <IconArrowRight className="contact__arrow" />
              </motion.a>
            ))}
          </motion.div>
          <motion.p className="contact__where" variants={fadeUp}><IconPin width={18} height={18} />{contact.address.join(' · ')}</motion.p>
        </motion.div>

        <div className="phones" aria-hidden="true">
          <motion.a className="phone phone--rear" href={copy.music.spotifyArtist} target="_blank" rel="noreferrer" tabIndex={-1} style={{ y: rearY, rotate: rearRotate }}>
            <div className="phone__screen"><SpotifyScreen /></div>
          </motion.a>
          <motion.a className="phone phone--front" href={contact.whatsapp} target="_blank" rel="noreferrer" tabIndex={-1} style={{ y: frontY, rotate: frontRotate }}>
            <div className="phone__screen"><WhatsAppScreen /></div>
          </motion.a>
        </div>
      </div>
    </section>
  )
}
