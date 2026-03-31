import { useState, useEffect } from 'react'
import type { Page } from '../App'
import './Navbar.css'

interface NavbarProps {
  currentPage: Page
  navigate: (page: Page) => void
}

const NAV_LINKS: { label: string; page: Page }[] = [
  { label: 'Home',    page: 'home' },
  { label: 'Detect',  page: 'upload' },
  { label: 'Results', page: 'results' },
  { label: 'About',   page: 'about' },
]

export default function Navbar({ currentPage, navigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <button className="navbar__logo" onClick={() => navigate('home')}>
          <span className="logo-icon">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <rect x="1" y="1" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.8"/>
              <path d="M6 11h10M11 6v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              <circle cx="11" cy="11" r="2.5" fill="currentColor"/>
            </svg>
          </span>
          <span className="logo-text">WaterGuard</span>
        </button>

        <ul className="navbar__links">
          {NAV_LINKS.map(({ label, page }) => (
            <li key={page}>
              <button
                className={`nav-link ${currentPage === page ? 'nav-link--active' : ''}`}
                onClick={() => navigate(page)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        <button className="btn btn-accent btn-sm navbar__cta" onClick={() => navigate('upload')}>
          Try It Free
        </button>

        <button className="navbar__burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span className={menuOpen ? 'open' : ''}></span>
          <span className={menuOpen ? 'open' : ''}></span>
          <span className={menuOpen ? 'open' : ''}></span>
        </button>
      </div>

      {menuOpen && (
        <div className="navbar__mobile-menu">
          {NAV_LINKS.map(({ label, page }) => (
            <button key={page} className={`mobile-link ${currentPage === page ? 'mobile-link--active' : ''}`}
              onClick={() => { navigate(page); setMenuOpen(false) }}>
              {label}
            </button>
          ))}
          <button className="btn btn-accent" onClick={() => { navigate('upload'); setMenuOpen(false) }}>
            Try It Free
          </button>
        </div>
      )}
    </nav>
  )
}