import { useState, useEffect } from 'react'
import type { Page } from '../App'

interface NavbarProps {
  currentPage: Page
  navigate: (p: Page) => void
}

const LINKS: { label: string; page: Page }[] = [
  { label: 'Home',   page: 'home'   },
  { label: 'Encode', page: 'encode' },
  { label: 'Verify', page: 'verify' },
  { label: 'About',  page: 'about'  },
]

export default function Navbar({ currentPage, navigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 h-[68px] bg-bg/85 backdrop-blur-md transition-all duration-200
      ${scrolled ? 'border-b border-border shadow-sm' : 'border-b border-transparent'}`}>

      <div className="max-w-[1100px] mx-auto px-7 h-full flex items-center gap-8">

        {/* Logo */}
        <button onClick={() => navigate('home')}
          className="flex items-center gap-2 font-body font-semibold text-[15px] text-primary shrink-0 hover:opacity-70 transition-opacity">
          <span className="text-accent">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <rect x="1" y="1" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.8"/>
              <path d="M6 11h10M11 6v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              <circle cx="11" cy="11" r="2.5" fill="currentColor"/>
            </svg>
          </span>
          WaterGuard
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1 ml-auto list-none">
          {LINKS.map(({ label, page }) => (
            <li key={page}>
              <button onClick={() => navigate(page)}
                className={`px-3 py-1.5 rounded-lg text-[13.5px] font-medium transition-all duration-150
                  ${currentPage === page
                    ? 'text-primary bg-subtle'
                    : 'text-secondary hover:text-primary hover:bg-subtle'}`}>
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Burger */}
        <button onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden ml-auto flex flex-col gap-[5px] p-1" aria-label="Menu">
          <span className={`block w-[22px] h-0.5 bg-primary rounded transition-transform duration-200 ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`block w-[22px] h-0.5 bg-primary rounded transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-[22px] h-0.5 bg-primary rounded transition-transform duration-200 ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-1 px-5 pb-5 pt-3 border-t border-border bg-card">
          {LINKS.map(({ label, page }) => (
            <button key={page} onClick={() => { navigate(page); setMenuOpen(false) }}
              className={`text-left px-3 py-2.5 rounded-lg text-[14px]
                ${currentPage === page ? 'text-primary bg-subtle font-medium' : 'text-secondary hover:text-primary hover:bg-subtle'}`}>
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}