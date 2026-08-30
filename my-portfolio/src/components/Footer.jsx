function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white/95 py-8 text-center">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6">
        <p className="font-mono-tech text-[9px] uppercase tracking-[0.45em] text-gray-500">Thank You</p>
        <p className="text-[11px] uppercase tracking-[0.2em] text-gray-600">
          © 2026 <span className="text-gray-900 font-semibold">A B Najeeb Rahman</span> | Built with React + GSAP + Lenis
        </p>
        <div className="mt-0.5 flex flex-wrap justify-center gap-5">
          {[
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/a-b-najeeb-rahman',
            },
            { label: 'GitHub', href: 'https://github.com/Sayonarakoto' },
            { label: 'Email', href: 'mailto:naji03rahman@gmail.com' },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              className="font-tech text-[9px] uppercase tracking-[0.2em] text-gray-500 transition-colors hover:text-gray-900"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
