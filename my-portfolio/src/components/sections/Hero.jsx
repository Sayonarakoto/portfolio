import { useEffect, useRef } from 'react'
import linkedinPhoto from '../../assets/linkedin.png'
import EditorialTitle from '../EditorialTitle'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function Hero({ variant = 'section', onNavigate, isActive = true, revealKey }) {
  const heroRef = useRef(null)
  const shouldReduceMotion = usePrefersReducedMotion()
  const isPanel = variant === 'panel'
  const shouldReveal = isActive
  const replayKey = revealKey

  const handleNavigate = (event, href) => {
    if (!onNavigate || !href?.startsWith('#')) return
    event.preventDefault()
    onNavigate(href)
  }

  useGsapReveal(
    heroRef,
    shouldReveal,
    shouldReduceMotion,
    [
      { selector: '.hero-copy', delay: 0.05, stagger: 0.08 },
      { selector: '.hero-namewrap', delay: 0.2 },
      { selector: '.hero-action', delay: 0.3, stagger: 0.08 },
      { selector: '.hero-meta', delay: 0.38 },
      { selector: '.hero-portrait', delay: 0.4, duration: 1.2 },
    ],
    replayKey
  )

  useEffect(() => {
    if (shouldReduceMotion || !heroRef.current) return undefined

    const ctx = gsap.context(() => {
      // Multi-depth parallax scrubbing: character portrait moves faster than background
      gsap.to('.hero-portrait', {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      gsap.to('.hero-copy', {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [shouldReduceMotion])

  return (
    <section
      id="home"
      ref={heroRef}
      className={`relative flex items-center overflow-hidden bg-white px-6 ${
        isPanel ? 'h-full w-screen' : 'min-h-screen pt-20 sm:pt-0'
      }`}
    >

      <div className="absolute left-[5%] top-[15%] h-[1px] w-32 rotate-12 bg-[var(--paper-line)] opacity-40 mix-blend-multiply" />
      <div className="absolute bottom-[20%] right-[10%] h-1.5 w-1.5 rounded-full bg-gray-400 opacity-15 mix-blend-multiply" />
      <div className="absolute bottom-[10%] left-[40%] h-[1px] w-64 -rotate-6 bg-[var(--paper-line-soft)] opacity-30 mix-blend-multiply" />

      <div className="mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-12 items-center gap-12">
          <div className="col-span-12 lg:col-span-8">
            <div className="space-y-10">
              <div className="hero-copy space-y-4">
                <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400">
                  Talented Technocrat
                </p>
                <p className="max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl">
                  Diploma graduate in Computer Engineering with a strong interest in software development.
                  Currently a fresher, actively building coding skills with a focus on practical learning and
                  problem-solving. Approaches programming as a continuous discovery process, with a mindset
                  oriented toward experimentation, logic building, and iterative improvement. Familiar with
                  core programming concepts and working toward applying them in real-world projects.
                </p>
              </div>

              <div className="hero-namewrap relative z-10 select-none bg-transparent">
                <EditorialTitle text="A B Najeeb Rahman" />
              </div>

              <div className="hero-action flex flex-wrap gap-5">
                <a href="#projects" onClick={(event) => handleNavigate(event, '#projects')} className="editorial-cta">
                  View Work
                </a>
                <a
                  href="#contact"
                  onClick={(event) => handleNavigate(event, '#contact')}
                  className="editorial-cta editorial-cta--secondary"
                >
                  Get in Touch
                </a>
              </div>

              <div className="hero-meta flex items-center gap-4">
                <div className="h-[1px] w-12 bg-gray-200" />
                <span className="text-[9px] uppercase tracking-[0.6em] text-gray-500">
                  Palakkad, Kerala
                </span>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4">
            <div
              className="hero-portrait paper-elevate character-mask character-glow relative mx-auto aspect-[3/4] w-4/5 max-w-[300px] overflow-hidden rounded-[2px] border border-gray-200 bg-white p-2 lg:ml-auto"
            >
              <div className="relative h-full w-full overflow-hidden bg-white">
                <img
                  src={linkedinPhoto}
                  alt="A B Najeeb Rahman portrait"
                  className="h-full w-full object-cover grayscale-[0.35] transition-transform duration-700 hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/30 to-transparent" />
              </div>

              <div className="absolute -right-4 top-1/4 translate-x-full">
                <p className="text-[8px] uppercase tracking-[0.5em] text-gray-500">
                  VER: 2026.04
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
