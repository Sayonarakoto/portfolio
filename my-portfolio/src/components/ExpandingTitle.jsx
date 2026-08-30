import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ExpandingTitle({ text, className = '' }) {
  const textRef = useRef(null)

  useEffect(() => {
    if (!textRef.current) return undefined
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        {
          letterSpacing: '0.05em',
          opacity: 0.4,
          filter: 'blur(4px)',
        },
        {
          letterSpacing: '0.28em',
          opacity: 1,
          filter: 'blur(0px)',
          ease: 'power2.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 85%',
            end: 'top 40%',
            scrub: 1,
          },
        }
      );
    }, textRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={textRef}
      className={`font-tech text-3xl font -extrabold uppercase tracking-[0.25em] text-[var(--ink-main)] sm:text-4xl md:text-5xl select-none ${className}`}
    >
      {text}
    </div>
  )
}

ExpandingTitle.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
}
