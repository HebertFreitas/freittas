import { motion } from 'motion/react'
import { fadeUp, inViewOnce, motionTokens, springs } from '../lib/motion-tokens'
import { useLightbox } from '../lib/overlays'
import { apps } from '../config/site'
import { IconApple, IconArrowRight, IconExpand, IconGooglePlay } from './Icons'

const fill = {
  rest: { scale: 0, opacity: 0 },
  hover: { scale: 1, opacity: 1, transition: { duration: motionTokens.duration.normal, ease: motionTokens.easing.smooth } },
}
const arrow = {
  rest: { x: -6, opacity: 0, width: 0 },
  hover: { x: 0, opacity: 1, width: 'auto', transition: springs.snappy },
}

// Pill button with an ink fill that grows from the centre on hover.
export function PillButton({ children, href, onClick, tone = 'default', className = '' }) {
  const Tag = href ? motion.a : motion.button
  return (
    <Tag
      className={`pill pill--${tone} ${className}`}
      href={href}
      onClick={onClick}
      type={href ? undefined : 'button'}
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileFocus="hover"
      whileTap={{ scale: motionTokens.scale.press }}
    >
      <motion.span className="pill__fill" variants={fill} aria-hidden="true" />
      <span className="pill__label">{children}</span>
      <motion.span className="pill__arrow" variants={arrow} aria-hidden="true"><IconArrowRight width={16} height={16} /></motion.span>
    </Tag>
  )
}

export function SectionHeading({ first, second, align = 'left', label, tone, rule = true }) {
  return (
    <motion.div
      className={`heading heading--${align} ${tone === 'dark' ? 'heading--dark' : ''}`}
      initial="hidden"
      whileInView="visible"
      viewport={inViewOnce}
      variants={fadeUp}
    >
      {label && <p className="heading__label">{label}</p>}
      {!label && rule && (
        <motion.span
          className="heading__rule"
          aria-hidden="true"
          variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: motionTokens.duration.slow, ease: motionTokens.easing.smooth, delay: 0.15 } } }}
        />
      )}
      <h2>
        {first}
        {second && <em>{second}</em>}
      </h2>
    </motion.div>
  )
}

// Clickable photo. The frame shares a layoutId with the lightbox so the photo grows into place.
export function PhotoTile({ list, index, group, className = '', children, eager }) {
  const openLightbox = useLightbox()
  const photo = list[index]
  return (
    <motion.button
      type="button"
      className={`photo-tile ${className}`}
      onClick={() => openLightbox({ list, index, group })}
      aria-label={`Ampliar foto: ${photo.alt}`}
      variants={fadeUp}
    >
      <motion.span className="photo-tile__frame" layoutId={`${group}-${index}`} style={{ borderRadius: 10 }} transition={springs.layout}>
        <motion.span className="photo-tile__fill" layout transition={springs.layout}>
          <img src={photo.src} alt="" loading={eager ? 'eager' : 'lazy'} decoding="async" />
        </motion.span>
      </motion.span>
      <span className="photo-tile__panel" aria-hidden="true" />
      <span className="photo-tile__zoom" aria-hidden="true"><IconExpand width={16} height={16} /></span>
      {children}
    </motion.button>
  )
}

export function StoreButtons({ tone = 'dark', className = '' }) {
  const isAndroid = typeof navigator !== 'undefined' && /android/i.test(navigator.userAgent)
  const stores = [
    { key: 'ios', href: apps.ios, Icon: IconApple, small: 'Baixar na', big: 'App Store' },
    { key: 'android', href: apps.android, Icon: IconGooglePlay, small: 'Disponível no', big: 'Google Play' },
  ]
  if (isAndroid) stores.reverse()
  return (
    <div className={`stores stores--${tone} ${className}`}>
      {stores.map(({ key, href, Icon, small, big }) => (
        <motion.a
          key={key}
          className="store"
          href={href}
          target="_blank"
          rel="noreferrer"
          whileHover={{ y: -2 }}
          whileTap={{ scale: motionTokens.scale.press }}
          transition={springs.snappy}
        >
          <Icon width={22} height={22} />
          <span><small>{small}</small>{big}</span>
        </motion.a>
      ))}
    </div>
  )
}
