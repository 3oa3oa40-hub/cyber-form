import { useState, useEffect } from 'react'

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('#home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Update active link based on scroll position
      const sections = ['#home', '#about', '#why-join', '#apply']
      for (const section of sections) {
        const element = document.querySelector(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveLink(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = (e, href) => {
    e.preventDefault()
    setActiveLink(href)
    setIsMenuOpen(false)
    document.body.style.overflow = ''
    
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    document.body.style.overflow = !isMenuOpen ? 'hidden' : ''
  }

  const navLinks = [
    { href: '#home', label: 'الرئيسية' },
    { href: '#about', label: 'عن الفريق' },
    { href: '#why-join', label: 'لماذا تنضم إلينا' },
    { href: '#apply', label: 'التقديم', isCta: true }
  ]

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="nav-container">
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`nav-link ${activeLink === link.href ? 'active' : ''} ${link.isCta ? 'nav-cta' : ''}`}
                onClick={(e) => handleLinkClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        
        <div className="nav-logos">
          <div className="nav-logo-circle">
            <img src="/اتحاد%20بشبابها.jpg" alt="Union Logo" />
          </div>
          <div className="nav-logo-circle" style={{ width: '80px', height: '80px' }}>
            <img src="/WhatsApp%20Image%202026-03-02%20at%2012.48.42%20AM.jpeg" alt="Activity Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="nav-logo-circle">
            <img src="/Untitled%20design%20(2).png" alt="Cyber Security" />
          </div>
        </div>
        
        <div 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`} 
          id="hamburger"
          onClick={toggleMenu}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
