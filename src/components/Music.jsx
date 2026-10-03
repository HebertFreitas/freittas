import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useAnimationFrame, useMotionValue, useReducedMotion } from 'motion/react'
import { copy, tracks } from '../config/site'
import { fadeUp, inViewOnce, motionTokens, springs, staggerContainer } from '../lib/motion-tokens'
import { IconPause, IconPlay, IconSkipBack, IconSkipForward, IconSpotify } from './Icons'
import { SectionHeading } from './ui'

const numberFormat = new Intl.NumberFormat('pt-BR')
const clock = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`
const spotifyTrack = (id) => `https://open.spotify.com/track/${id}`
const BARS = 48

// Real frequency bars from the <audio> element (the previews are served with CORS).
function useVisualizer(audioRef, canvasRef, playing) {
  const graph = useRef(null)

  const connect = useCallback(() => {
    if (graph.current || !audioRef.current) return
    const Ctx = window.AudioContext || window.webkitAudioContext
    if (!Ctx) return
    const ctx = new Ctx()
    const source = ctx.createMediaElementSource(audioRef.current)
    const analyser = ctx.createAnalyser()
    analyser.fftSize = 256
    analyser.smoothingTimeConstant = 0.78
    source.connect(analyser)
    analyser.connect(ctx.destination)
    graph.current = { ctx, analyser, data: new Uint8Array(analyser.frequencyBinCount) }
  }, [audioRef])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const draw2d = canvas.getContext('2d')
    const styles = getComputedStyle(canvas)
    const from = styles.getPropertyValue('--accent-light').trim()
    const to = styles.getPropertyValue('--neon').trim()
    let frame
    let idle = 0

    const render = () => {
      const { width, height } = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      if (canvas.width !== Math.round(width * dpr)) { canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr) }
      draw2d.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw2d.clearRect(0, 0, width, height)
      const gradient = draw2d.createLinearGradient(0, 0, width, 0)
      gradient.addColorStop(0, from)
      gradient.addColorStop(1, to)
      draw2d.fillStyle = gradient

      const g = graph.current
      if (g && playing) g.analyser.getByteFrequencyData(g.data)
      idle += 0.04
      const gap = 3
      const bar = (width - gap * (BARS - 1)) / BARS
      for (let i = 0; i < BARS; i++) {
        const level = g && playing
          ? g.data[Math.floor((i / BARS) * g.data.length * 0.72)] / 255
          : 0.06 + 0.04 * Math.sin(idle + i * 0.35)
        const h = Math.max(3, level * height)
        draw2d.beginPath()
        draw2d.roundRect(i * (bar + gap), (height - h) / 2, bar, h, bar / 2)
        draw2d.fill()
      }
      frame = requestAnimationFrame(render)
    }
    render()
    return () => cancelAnimationFrame(frame)
  }, [canvasRef, playing])

  useEffect(() => () => graph.current?.ctx.close(), [])
  return { connect, resume: () => graph.current?.ctx.resume() }
}

function Equalizer({ playing }) {
  const reduce = useReducedMotion()
  return (
    <span className="eq" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <motion.span
          key={i}
          animate={playing && !reduce ? { scaleY: [0.3, 1, 0.45, 0.85, 0.3] } : { scaleY: 0.3 }}
          transition={playing && !reduce ? { duration: motionTokens.duration.cinematic * (0.7 + i * 0.15), repeat: Infinity, ease: 'easeInOut' } : { duration: motionTokens.duration.fast }}
        />
      ))}
    </span>
  )
}

export function Music() {
  const audioRef = useRef(null)
  const canvasRef = useRef(null)
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [length, setLength] = useState(30)
  const reduce = useReducedMotion()
  const { connect, resume } = useVisualizer(audioRef, canvasRef, playing)
  const track = tracks[index]
  const indexRef = useRef(index)
  useEffect(() => { indexRef.current = index }, [index])

  // The vinyl keeps its angle when paused and speeds up / slows down smoothly.
  const rotate = useMotionValue(0)
  const speed = useRef(0)
  useAnimationFrame((_, delta) => {
    const target = playing && !reduce ? 360 / (motionTokens.duration.spin * 1000) : 0
    speed.current += (target - speed.current) * Math.min(1, delta / 400)
    if (speed.current > 0.0001) rotate.set((rotate.get() + speed.current * delta) % 360)
  })

  const play = useCallback(async () => {
    const audio = audioRef.current
    connect()
    resume()
    try { await audio.play() } catch { setPlaying(false) }
  }, [connect, resume])

  const select = (i) => {
    const audio = audioRef.current
    if (i === index) { if (audio.paused) play(); else audio.pause(); return }
    setIndex(i)
    setTime(0)
    audio.src = tracks[i].preview
    play()
  }
  const step = (d) => select((index + d + tracks.length) % tracks.length)
  const toggle = () => (audioRef.current.paused ? play() : audioRef.current.pause())

  useEffect(() => {
    const audio = audioRef.current
    const onEnd = () => {
      const next = (indexRef.current + 1) % tracks.length
      audio.src = tracks[next].preview
      setIndex(next)
      setTime(0)
      play()
    }
    audio.addEventListener('ended', onEnd)
    return () => audio.removeEventListener('ended', onEnd)
  }, [play])

  return (
    <section className="section section--dark music" id="musicas">
      <div className="music__glow" aria-hidden="true">
        <motion.span animate={playing && !reduce ? { scale: [1, 1.25, 1], opacity: [0.5, 0.85, 0.5] } : { scale: 1, opacity: 0.4 }} transition={{ duration: motionTokens.duration.cinematic * 2, repeat: playing ? Infinity : 0 }} />
        <motion.span animate={playing && !reduce ? { scale: [1.2, 1, 1.2], opacity: [0.7, 0.4, 0.7] } : { scale: 1, opacity: 0.3 }} transition={{ duration: motionTokens.duration.cinematic * 2.6, repeat: playing ? Infinity : 0 }} />
      </div>

      <div className="container">
        <SectionHeading label={copy.music.label} first={copy.music.first} second={copy.music.second} tone="dark" />

        <div className="music__grid">
          <motion.div className="deck" variants={fadeUp} initial="hidden" whileInView="visible" viewport={inViewOnce}>
            <div className="deck__stage">
              <motion.div
                className="deck__vinyl"
                role="img"
                aria-label={copy.music.vinylLabel}
                animate={{ x: playing ? '22%' : '6%' }}
                transition={springs.gentle}
              >
                <motion.div className="deck__disc" style={{ rotate }}>
                  <img src={track.cover.src} alt="" className="deck__label" />
                </motion.div>
              </motion.div>
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.img
                  key={track.cover.src}
                  className="deck__sleeve"
                  src={track.cover.src}
                  alt={track.cover.alt}
                  initial={{ opacity: 0, x: -motionTokens.distance.lg, rotate: -6 }}
                  animate={{ opacity: 1, x: 0, rotate: 0 }}
                  exit={{ opacity: 0, x: motionTokens.distance.lg, rotate: 6 }}
                  transition={springs.gentle}
                />
              </AnimatePresence>
              <motion.span className="deck__arm" aria-hidden="true" animate={{ rotate: playing ? 24 : 0 }} transition={springs.gentle} />
            </div>

            <div className="deck__meta" aria-live="polite">
              <p className="deck__kicker">{copy.music.nowPlaying}</p>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={track.spotify} initial={{ opacity: 0, y: motionTokens.distance.sm }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -motionTokens.distance.sm }} transition={{ duration: motionTokens.duration.fast }}>
                  <h3>{track.title}</h3>
                  <p>{track.artists}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <canvas ref={canvasRef} className="deck__viz" role="img" aria-label={copy.music.visualizerLabel} />

            <div className="deck__progress">
              <span>{clock(time)}</span>
              <input
                type="range"
                min="0"
                max={length}
                step="0.1"
                value={time}
                aria-label={copy.music.progressLabel}
                style={{ '--p': `${(time / length) * 100}%` }}
                onChange={(e) => { audioRef.current.currentTime = Number(e.target.value); setTime(Number(e.target.value)) }}
              />
              <span>{clock(length)}</span>
            </div>

            <div className="deck__controls">
              <motion.button type="button" aria-label={copy.music.prev} onClick={() => step(-1)} whileTap={{ scale: motionTokens.scale.press }}><IconSkipBack /></motion.button>
              <motion.button type="button" className="deck__play" aria-label={playing ? copy.music.pause : copy.music.play} onClick={toggle} whileHover={{ scale: motionTokens.scale.pop }} whileTap={{ scale: motionTokens.scale.press }} transition={springs.snappy}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span key={playing ? 'pause' : 'play'} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: motionTokens.duration.fast }}>
                    {playing ? <IconPause width={26} height={26} /> : <IconPlay width={26} height={26} />}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
              <motion.button type="button" aria-label={copy.music.next} onClick={() => step(1)} whileTap={{ scale: motionTokens.scale.press }}><IconSkipForward /></motion.button>
            </div>

            <p className="deck__note">
              {copy.music.previewNote}{' '}
              <a href={spotifyTrack(track.spotify)} target="_blank" rel="noreferrer"><IconSpotify width={16} height={16} />{copy.music.listen}</a>
            </p>

            <audio
              ref={audioRef}
              src={tracks[0].preview}
              crossOrigin="anonymous"
              preload="none"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
              onLoadedMetadata={(e) => setLength(e.currentTarget.duration || 30)}
            />
          </motion.div>

          <motion.ol className="tracks" aria-label={copy.music.listLabel} variants={staggerContainer(motionTokens.stagger.tight)} initial="hidden" whileInView="visible" viewport={inViewOnce}>
            {tracks.map((t, i) => {
              const active = i === index
              return (
                <motion.li key={t.spotify} variants={fadeUp}>
                  <button type="button" className={`track ${active ? 'is-active' : ''}`} onClick={() => select(i)} aria-current={active ? 'true' : undefined} aria-label={`${active && playing ? copy.music.pause : copy.music.play}: ${t.title}`}>
                    {active && <motion.span className="track__bg" layoutId="track-active" transition={springs.layout} aria-hidden="true" />}
                    <span className="track__num">{active ? <Equalizer playing={playing} /> : i + 1}</span>
                    <img className="track__cover" src={t.cover.src} alt="" loading="lazy" />
                    <span className="track__info">
                      <span className="track__title">{t.title}</span>
                      <span className="track__artists">
                        {t.explicit && <abbr className="track__explicit" title={copy.music.explicit}>{copy.music.explicitShort}</abbr>}
                        {t.artists}
                      </span>
                    </span>
                    <span className="track__plays">{t.plays ? `${numberFormat.format(t.plays)} ${copy.music.plays}` : ''}</span>
                    <span className="track__time">{t.duration}</span>
                  </button>
                </motion.li>
              )
            })}
          </motion.ol>
        </div>

        <div className="center-action">
          <a className="music__spotify" href={copy.music.spotifyArtist} target="_blank" rel="noreferrer"><IconSpotify />{copy.music.listen}</a>
        </div>
      </div>
    </section>
  )
}
