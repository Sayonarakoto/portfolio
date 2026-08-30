import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import gsap from 'gsap'

export default function EditorialTitle({ text, className = '' }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return undefined
    const letters = containerRef.current.querySelectorAll('.char')
    if (!letters.length) return undefined

    const ctx = gsap.context(() => {
      gsap.fromTo(
        letters,
        {
          yPercent: 120,
          rotateX: -40,
          opacity: 0,
        },
        {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          stagger: 0.035,
          duration: 0.9,
          ease: 'power4.out',
          delay: 0.15,
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [text])

  return (
    <h1
      ref={containerRef}
      className={`font-mono-name text-4xl font-bold tracking-tight text-[var(--ink-main)] sm:text-6xl lg:text-7xl flex flex-wrap overflow-hidden py-2 ${className}`}
    >
      {text.split('').map((char, index) => (
        <span key={`${char}-${index}`} className="inline-block overflow-hidden">
          <span className="char inline-block">
            {char === ' ' ? '\u00A0' : char}
          </span>
        </span>
      ))}
    </h1>
  )
}

EditorialTitle.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
}
