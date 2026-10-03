import './App.css'
import { useCallback, useState } from 'react'
import { MotionConfig } from 'motion/react'
import { AppModalContext, LightboxContext } from './lib/overlays'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Ambient, AppSection, Features, Intro, Pricing, Reviews, Team, Visit } from './components/Sections'
import { Music } from './components/Music'
import { ContactPhones } from './components/Contact'
import { FloatingActions, Footer } from './components/Footer'
import { Lightbox } from './components/Lightbox'
import { AppModal } from './components/AppModal'
import { booking, contact, sections } from './config/site'

// Where every booking button leads when there is no app (see booking in site.js).
const bookingUrl = booking.mode === 'whatsapp' ? contact.whatsapp : booking.url

function App() {
  const [lightbox, setLightbox] = useState(null)
  const [appOpen, setAppOpen] = useState(false)
  const openLightbox = useCallback(({ list, index, group }) => setLightbox({ list, index, group, origin: index, dir: 1, navigated: false }), [])
  const openApp = useCallback(() => {
    if (booking.mode === 'app') setAppOpen(true)
    else window.open(bookingUrl, '_blank', 'noopener')
  }, [])
  const closeApp = useCallback(() => setAppOpen(false), [])

  return (
    <MotionConfig reducedMotion="user">
      <AppModalContext.Provider value={openApp}>
        <LightboxContext.Provider value={openLightbox}>
          <Header />
          <main>
            <Hero />
            {sections.intro && <Intro />}
            {sections.music && <Music />}
            {sections.features && <Features />}
            {sections.team && <Team />}
            {sections.pricing && <Pricing />}
            {sections.ambient && <Ambient />}
            {sections.reviews && <Reviews />}
            {sections.app && <AppSection />}
            {sections.visit && <Visit />}
            {sections.contact && <ContactPhones />}
          </main>
          <Footer />
          <FloatingActions />
          <Lightbox state={lightbox} setState={setLightbox} />
          {booking.mode === 'app' && <AppModal open={appOpen} onClose={closeApp} />}
        </LightboxContext.Provider>
      </AppModalContext.Provider>
    </MotionConfig>
  )
}

export default App
