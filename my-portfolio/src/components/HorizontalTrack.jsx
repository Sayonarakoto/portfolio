import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HorizontalTrack({ children }) {
  const triggerRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const triggerEl = triggerRef.current
    const trackEl = trackRef.current
    if (!triggerEl || !trackEl) return undefined

    const sections = Array.from(trackEl.children)
    const totalSections = sections.length
    if (totalSections <= 1) return undefined

    const ctx = gsap.context(() => {
      gsap.to(trackEl, {
        xPercent: -100 * (totalSections - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: triggerEl,
          pin: true,
          scrub: 1, // Smooth momentum scrubbing
          end: () => `+=${trackEl.offsetWidth * (totalSections - 1)}`,
          invalidateOnRefresh: true,
        },
      })
    }, triggerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={triggerRef} className="relative overflow-hidden">
      <div ref={trackRef} className="flex h-screen w-max">
        {children}
      </div>
    </div>
  )
}

HorizontalTrack.propTypes = {
  children: PropTypes.node.isRequired,
}
