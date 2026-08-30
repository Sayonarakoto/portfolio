import { useEffect, useRef, createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const LenisContext = createContext(null)

export const useLenis = () => useContext(LenisContext)

export default function CinematicScrollProvider({ children }) {
  const lenisRef = useRef(null)
  const [lenisInstance, setLenisInstance] = useState(null)

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,             // Weighted inertia for anime-promotional feel
      wheelMultiplier: 0.9,   // Smooth mouse-wheel dampening
      touchMultiplier: 1.5,
      smoothWheel: true,
    })
    lenisRef.current = lenis
    setLenisInstance(lenis)

    // Connect Lenis frame updates to GSAP's ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    const updateTicker = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(updateTicker)
    gsap.ticker.lagSmoothing(0) // Disables lag smoothing for frame-accurate lock

    return () => {
      gsap.ticker.remove(updateTicker)
      lenis.destroy()
    }
  }, [])

  return (
    <LenisContext.Provider value={lenisInstance}>
      {children}
    </LenisContext.Provider>
  )
}

CinematicScrollProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
