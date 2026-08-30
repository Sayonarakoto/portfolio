import { useRef } from 'react'
import SectionWrapper from '../SectionWrapper'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

const projects = [
  {
    title: 'GEN-C Resource Management',
    description:
      'MERN resource workflow that replaced manual logs with role approvals, live tracking, and accountable state updates.',
    stack: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    previewLink: 'https://gen-c-group1.vercel.app',
    sourceLink: 'https://github.com/Sayonarakoto/GEN-C_LOGIN',
  },
  {
    title: 'I-LEAVE Staff Portal',
    description:
      'Leave management platform with Django APIs, Vue interface, and MySQL-backed policy handling across teams.',
    stack: ['Django', 'Vue.js', 'MySQL', 'REST API'],
    previewLink: 'https://i-leave-zeta.vercel.app/',
    sourceLink: 'https://github.com/Sayonarakoto/ASM',
  },
]

function Projects({ variant = 'section', onNavigate, isActive = true, revealKey }) {
  const revealRef = useRef(null)
  const shouldReduceMotion = usePrefersReducedMotion()
  const shouldReveal = isActive
  const replayKey = revealKey

  useGsapReveal(revealRef, shouldReveal, shouldReduceMotion, [
    { selector: '.projects-reveal', delay: 0.05, stagger: 0.08 },
    { selector: '.project-card', delay: 0.15, stagger: 0.12 },
    { selector: '.projects-cta', delay: 0.18, stagger: 0.08 },
  ], replayKey)

  const handleNavigate = (event, href) => {
    if (!onNavigate || !href?.startsWith('#')) return
    event.preventDefault()
    onNavigate(href)
  }

  return (
    <SectionWrapper id="projects" className="bg-white" variant={variant}>
      <div ref={revealRef} className="space-y-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="projects-reveal space-y-2">
            <p className="ink-seal text-[10px] uppercase tracking-[0.4em] text-gray-400">Projects</p>
            <h2 className="font-heading text-4xl font-semibold leading-[0.9] tracking-[0.03em] text-[var(--ink-main)] md:text-5xl">
              Work
            </h2>
          </div>
          <a
            className="projects-cta text-xs uppercase tracking-[0.24em] text-gray-600 transition-colors hover:text-gray-900"
            href="#contact"
            onClick={(event) => handleNavigate(event, '#contact')}
          >
            Available for builds
          </a>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className="project-card ink-card group relative rounded-[1.25rem] p-7 shadow-sm shadow-gray-200 transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="ink-seal mb-6 inline-block text-[10px] uppercase tracking-[0.3em] text-gray-500">0{index + 1}</span>
              <h3 className="font-heading text-3xl font-semibold leading-tight text-[var(--ink-main)]">{project.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-gray-600">{project.description}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="ink-seal rounded-full border border-gray-200 bg-white/90 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-gray-500"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {project.previewLink && (
                  <a className="editorial-cta" href={project.previewLink} target="_blank" rel="noopener noreferrer">
                    Preview
                  </a>
                )}
                {project.sourceLink && (
                  <a className="editorial-cta editorial-cta--secondary" href={project.sourceLink} target="_blank" rel="noopener noreferrer">
                    Source
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

export default Projects


