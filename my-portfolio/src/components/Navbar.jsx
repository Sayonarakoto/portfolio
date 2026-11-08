import { useEffect, useState } from 'react'
import { Menu, X, House, FolderKanban, UserRound, Mail } from 'lucide-react'
import cvPdf from '../assets/OUR CV (3).pdf'
import { NAV_LINKS } from '../constants/links'

const navIconMap = {
  Home: House,
  Projects: FolderKanban,
  About: UserRound,
  Contact: Mail,
}

function Navbar({ onNavigate }) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavigate = (event, href) => {
    if (!onNavigate || !href?.startsWith('#')) return
    event.preventDefault()
    onNavigate(href)
  }

  return (
    <>
      <header
        className={`fixed left-1/2 top-6 z-50 w-[calc(100%-1.5rem)] max-w-5xl -translate-x-1/2 rounded-3xl border border-gray-200/80 bg-white/92 px-5 py-3 backdrop-blur-xl transition-all duration-500 sm:px-6 ${
          scrolled ? 'scale-[0.98] shadow-[0_12px_34px_rgba(17,24,39,0.08)]' : 'scale-100 shadow-[0_8px_24px_rgba(17,24,39,0.05)]'
        }`}
      >
        <nav className="flex items-center justify-between gap-4">
          <a
            href="#home"
            onClick={(event) => handleNavigate(event, '#home')}
            className="select-none bg-gradient-to-b from-gray-900 to-gray-700 bg-clip-text text-lg font-black tracking-[0.18em] text-transparent sm:text-xl"
          >
            ABN
          </a>

          <div className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => handleNavigate(event, item.href)}
                className="nav-link group relative text-xs font-medium uppercase tracking-[0.3em] text-gray-700 transition-colors hover:text-gray-900"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href={cvPdf}
              download
              className="rounded-xl border border-gray-300/80 bg-white/90 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-900"
            >
              Resume
            </a>
            <a
              href="#contact"
              onClick={(event) => handleNavigate(event, '#contact')}
              className="rounded-xl border border-[var(--accent-lavender-dark)] bg-[var(--accent-lavender)] px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--ink-main)] transition-transform duration-200 hover:scale-[1.04] hover:bg-[var(--accent-lavender-dark)] active:scale-[0.98]"
            >
              Let&apos;s Talk
            </a>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white/90 text-gray-800 transition-colors hover:bg-gray-50 md:hidden"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </header>

      <div
        className={`fixed right-4 top-24 z-40 w-72 rounded-2xl border border-gray-200/80 bg-white/98 p-6 shadow-[0_16px_36px_rgba(17,24,39,0.08)] backdrop-blur-xl transition-all duration-300 md:hidden ${
          isOpen ? 'pointer-events-auto translate-x-0 opacity-100' : 'pointer-events-none translate-x-6 opacity-0'
        }`}
      >
        <div className="space-y-3">
          {NAV_LINKS.map((item) => {
            const Icon = navIconMap[item.label] ?? House
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => {
                  handleNavigate(event, item.href)
                  setIsOpen(false)
                }}
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100/70 hover:text-gray-900"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-gray-100 to-gray-200">
                  <Icon size={16} />
                </span>
                {item.label}
              </a>
            )
          })}

          <a
            href={cvPdf}
            download
            onClick={() => setIsOpen(false)}
            className="mt-2 block rounded-xl border border-gray-300 bg-white px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-gray-700"
          >
            Resume
          </a>

          <a
            href="#contact"
            onClick={(event) => {
              handleNavigate(event, '#contact')
              setIsOpen(false)
            }}
            className="block rounded-xl border border-[var(--accent-lavender-dark)] bg-[var(--accent-lavender)] px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ink-main)]"
          >
            Let&apos;s Talk
          </a>
        </div>
      </div>
    </>
  )
}

export default Navbar
