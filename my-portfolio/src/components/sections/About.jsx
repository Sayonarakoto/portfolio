import { useCallback, useEffect, useRef, useState } from 'react'
import SectionWrapper from '../SectionWrapper'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const timelineItems = [
  {
    title: 'Diploma in Computer Engineering',
    period: '2023 - 2026',
    org: "St. Mary's Institute of Technology & Science",
    category: 'Education',
    description: 'Focused on software architecture, problem solving, and practical engineering fundamentals.',
  },
  {
    title: 'Raspberry Pi Code Club Leader',
    period: 'Leadership',
    org: "St. Mary's Institute",
    category: 'Club',
    description: 'Mentored students in HTML, CSS, and JavaScript through hands-on build sessions.',
  },
  {
    title: 'INET-INFOTECH Internship (MERN)',
    period: 'Internship',
    org: 'MERN Stack Development',
    category: 'Internship',
    description: 'Built interactive React UI and improved component structure for maintainability.',
  },
  {
    title: 'AI Automation Workshop',
    period: 'Aug 2025 - Sep 2025',
    org: 'Entrepreneurship Lab (Skool)',
    category: 'Apprenticeship',
    description: 'Designed and deployed lightweight automation tools powered by LLM workflows.',
  },
]

function About({ variant = 'section', isActive = true, revealKey }) {
  const revealRef = useRef(null)
  const timelineCardRef = useRef(null)
  const timelineScrollRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)

  const shouldReduceMotion = usePrefersReducedMotion()
  const shouldReveal = isActive
  const replayKey = revealKey

  useGsapReveal(revealRef, shouldReveal, shouldReduceMotion, [
    { selector: '.about-reveal', delay: 0.05, stagger: 0.08 },
    { selector: '.about-card', delay: 0.14, stagger: 0.1 },
    { selector: '.about-timeline', delay: 0.18 },
    { selector: '.about-timeline-item', delay: 0.24, stagger: 0.09 },
  ], replayKey)

  const handleScroll = useCallback(() => {
    const el = timelineScrollRef.current
    if (!el) return
    const maxScroll = el.scrollWidth - el.clientWidth
    if (maxScroll <= 0) return

    const progress = Math.min(100, Math.max(0, (el.scrollLeft / maxScroll) * 100))
    setScrollProgress(progress)

    const index = Math.min(
      timelineItems.length - 1,
      Math.max(0, Math.round(el.scrollLeft / 280))
    )
    setActiveIndex(index)
  }, [])

  const handleWheel = useCallback((e) => {
    const el = timelineScrollRef.current
    if (!el) return
    const isHorizontalScroll = Math.abs(e.deltaX) > Math.abs(e.deltaY)
    if (!isHorizontalScroll) {
      el.scrollLeft += e.deltaY * 0.95
    }
  }, [])

  const scrollByAmount = (direction) => {
    const el = timelineScrollRef.current
    if (!el) return
    el.scrollBy({ left: direction * 300, behavior: 'smooth' })
  }

  useEffect(() => {
    const el = timelineScrollRef.current
    if (!el) return undefined
    el.addEventListener('scroll', handleScroll, { passive: true })
    return () => el.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    if (shouldReduceMotion || !timelineCardRef.current || !timelineScrollRef.current) return undefined

    const cardEl = timelineCardRef.current
    const scrollEl = timelineScrollRef.current

    const ctx = gsap.context(() => {
      const maxScroll = scrollEl.scrollWidth - scrollEl.clientWidth
      if (maxScroll <= 0) return

      gsap.to(scrollEl, {
        scrollLeft: maxScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: cardEl,
          start: 'top center-=50',
          end: () => `+=${maxScroll * 1.5}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = Math.min(100, Math.max(0, self.progress * 100))
            setScrollProgress(progress)
            const idx = Math.min(
              timelineItems.length - 1,
              Math.floor(self.progress * timelineItems.length)
            )
            setActiveIndex(idx)
          },
        },
      })
    }, cardEl)

    return () => ctx.revert()
  }, [shouldReduceMotion])

  return (
    <SectionWrapper id="about" className="bg-white" variant={variant}>
      <div ref={revealRef} className="space-y-8">
        <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <div className="about-reveal">
              <p className="mb-2 text-[10px] uppercase tracking-[0.4em] text-gray-400">Profile</p>
              <h2 className="font-heading text-4xl font-semibold leading-[0.9] tracking-[0.03em] text-[var(--ink-main)] md:text-5xl">
                About
              </h2>
            </div>

            <p className="max-w-xl text-lg leading-relaxed text-gray-600">
              I am eager to learn and passionate about acquiring core software engineering knowledge. I strive to continuously improve and cultivate a calm, strategic mindset to approach complex technical challenges with focus.
              <br /><br />
              I value self-discipline and analytical thinking. I apply structured logic to solve problems, optimize systems, and achieve reliable, high-quality results.
              <br /><br />
              My goal is to create lasting value, focusing on projects that demand deep problem-solving, intuitive user experiences, and an unyielding commitment to engineering excellence.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { cat: 'Programming', list: 'C, JavaScript, Python' },
              { cat: 'Web Stack', list: 'React, Vue, Express, Django, Node' },
              { cat: 'Tools', list: 'Git, GitHub Projects, Docker' },
              { cat: 'Strengths', list: 'Problem-Solving Under Pressure, UX Detail, Communication, Mental Flexibility' },
            ].map((item) => (
              <div key={item.cat} className="about-card ink-card rounded-2xl p-5">
                <h4 className="text-[11px] uppercase tracking-[0.2em] text-gray-500">{item.cat}</h4>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.list}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline positioned at the bottom of About */}
        <div ref={timelineCardRef} className="about-timeline ink-card-strong w-full rounded-[1.5rem] p-6 sm:p-8">
          <div className="flex items-center justify-between border-b border-[var(--paper-line)] pb-3">
            <div className="flex items-center gap-3">
              <h3 className="font-heading text-2xl font-semibold text-[var(--ink-main)] sm:text-3xl">
                Timeline & Journey
              </h3>
              <span className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-[10px] font-mono tracking-widest text-gray-600">
                0{activeIndex + 1} / 0{timelineItems.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollByAmount(-1)}
                aria-label="Scroll timeline left"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => scrollByAmount(1)}
                aria-label="Scroll timeline right"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="relative mt-2 h-[2px] w-full overflow-hidden bg-gray-100 rounded-full">
            <div
              className="h-full bg-gray-900 transition-all duration-200 ease-out"
              style={{ width: `${Math.max(15, scrollProgress)}%` }}
            />
          </div>

          <div
            ref={timelineScrollRef}
            onWheel={handleWheel}
            data-lenis-prevent="true"
            className="morph-timeline-h hide-scrollbar mt-4 cursor-grab active:cursor-grabbing"
          >
            <div className="morph-line-h" />
            {timelineItems.map((item, idx) => (
              <div key={`${item.title}-${item.period}`} className="about-timeline-item morph-item-h">
                <div className={`morph-dot-h transition-transform duration-300 ${idx === activeIndex ? 'scale-150 bg-gray-900' : 'bg-gray-400'}`} />
                <div className={`morph-content rounded-xl h-full flex flex-col justify-between p-5 transition-all duration-300 ${idx === activeIndex ? 'border-gray-400 shadow-md' : ''}`}>
                  <div>
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <span className="text-[10px] uppercase tracking-[0.14em] text-gray-500">{item.period}</span>
                      <span className="rounded-full border border-gray-200 bg-white/90 px-2 py-0.5 text-[9px] uppercase tracking-[0.18em] text-gray-500">
                        {item.category}
                      </span>
                    </div>
                    <h4 className="font-heading text-lg font-semibold leading-tight text-[var(--ink-main)]">{item.title}</h4>
                    <p className="mt-1 text-xs uppercase tracking-[0.15em] text-gray-400">{item.org}</p>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

export default About

