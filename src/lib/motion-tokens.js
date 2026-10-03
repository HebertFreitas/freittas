export const motionTokens = {
  distance: { sm: 18, md: 28, lg: 42, xl: 80 },
  scale: { subtle: 0.98, press: 0.97, pop: 1.03, zoom: 1.08 },
  duration: { fast: 0.22, normal: 0.5, slow: 0.72, cinematic: 1.2, slide: 7, spin: 1.8 },
  easing: { smooth: [0.22, 1, 0.36, 1], inOut: [0.65, 0, 0.35, 1] },
  stagger: { tight: 0.06, base: 0.08, loose: 0.1 },
}

export const springs = {
  gentle: { type: 'spring', stiffness: 80, damping: 18 },
  snappy: { type: 'spring', stiffness: 360, damping: 24 },
  layout: { type: 'spring', stiffness: 260, damping: 30 },
}

export const fadeUp = {
  hidden: { opacity: 0, y: motionTokens.distance.md },
  visible: { opacity: 1, y: 0, transition: { duration: motionTokens.duration.slow, ease: motionTokens.easing.smooth } },
}

export const staggerContainer = (stagger = motionTokens.stagger.base, delay = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
})

export const inViewOnce = { once: true, margin: '-80px' }
