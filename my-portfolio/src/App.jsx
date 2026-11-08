import { useEffect, useState } from 'react'
import CinematicScrollProvider from './components/CinematicScrollProvider'
import HorizontalTrack from './components/HorizontalTrack'
import Navbar from './components/Navbar'
import Hero from './components/sections/Hero'
import Projects from './components/sections/Projects'
import About from './components/sections/About'
import Contact from './components/sections/Contact'
import Footer from './components/Footer'

export default function App() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(min-width: 1024px)').matches
      : false
  )

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const media = window.matchMedia('(min-width: 1024px)')
    const handleChange = (e) => setIsDesktop(e.matches)

    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [])

  const handleNavigate = (href) => {
    const id = href?.replace(/^#/, '')
    if (!id) return

    const target = document.getElementById(id)
    if (!target) return

    if (!isDesktop) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }

    const track = document.querySelector('[data-horizontal-track] > div')
    const trigger = document.querySelector('[data-horizontal-track]')
    if (!track || !trigger) return

    const panels = Array.from(track.children)
    const panelIndex = panels.findIndex((panel) => panel.contains(target))
    if (panelIndex < 0 || panels.length <= 1) return

    const horizontalDistance = track.scrollWidth - trigger.clientWidth
    const targetScroll = trigger.offsetTop + (horizontalDistance * panelIndex) / (panels.length - 1)
    window.scrollTo({ top: targetScroll, behavior: 'smooth' })
  }

  return (
    <CinematicScrollProvider>
      <div className="horimiya-canvas relative z-0 min-h-screen text-[var(--ink-main)]">
        <Navbar onNavigate={handleNavigate} />

        <main className="relative z-10">
          {isDesktop ? (
            <HorizontalTrack>
              <section className="h-screen w-screen shrink-0">
                <Hero variant="panel" />
              </section>
              <section className="h-screen w-screen shrink-0">
                <Projects variant="panel" />
              </section>
              <section className="h-screen w-screen shrink-0">
                <About variant="panel" />
              </section>
              <section className="h-screen w-screen shrink-0">
                <Contact variant="panel" />
              </section>
            </HorizontalTrack>
          ) : (
            <>
              <Hero />
              <Projects />
              <About />
              <Contact />
            </>
          )}
        </main>

        <Footer />
      </div>
    </CinematicScrollProvider>
  )
}


 