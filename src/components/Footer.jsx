import { useState } from 'react'

const Footer = () => {
  const [showConstruction, setShowConstruction] = useState(false)

  const handleConstructionClick = (e) => {
    e.preventDefault()
    setShowConstruction(true)
  }

  const closeConstruction = () => {
    setShowConstruction(false)
  }

  return (
    <>
      <footer className="footer">
      <div className="footer-background">
        <div className="footer-grid"></div>
      </div>
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <img src="/Untitled%20design%20(1).png" alt="Activity" className="footer-logo" />
            <p>فريق Activity للأمن السيبراني - نبني مستقبلاً رقمياً آمناً</p>
          </div>
          
          <div className="footer-contact">
            <h4>تواصل معنا</h4>
            <a href="#" className="contact-link" onClick={handleConstructionClick}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <path d="M22 6l-10 7L2 6"/>
              </svg>
              activity@beshababha.org
            </a>
          </div>
          
          <div className="footer-social">
            <h4>تابعنا</h4>
            <div className="social-links">
                <a href="#" className="social-link" aria-label="Twitter" onClick={handleConstructionClick}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
                <a href="#" className="social-link" aria-label="LinkedIn" onClick={handleConstructionClick}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
                <a href="#" className="social-link" aria-label="GitHub" onClick={handleConstructionClick}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p> 2026 Activity Cyber Security Team. جميع الحقوق محفوظة.</p>
          <p className="footer-credit">اتحاد بشبابها - انشاء هوية وطنية</p>
        </div>
      </div>
    </footer>

    {/* Construction Notice Modal */}
    {showConstruction && (
      <div className="construction-overlay" onClick={closeConstruction}>
        <div className="construction-modal" onClick={(e) => e.stopPropagation()}>
          <button className="close-btn" onClick={closeConstruction}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
          <div className="construction-images">
            <img src="/Untitled%20design%20(3).png" alt="Logo 1" className="construction-img img-position-1" />
            <img src="/8f1b9da7ca0afc96843183af03ae7ded.png" alt="Logo 2" className="construction-img img-position-2" />
          </div>
          <h2>قريباً!</h2>
          <p>Our Social platforms and Official Emails are still under construction.</p>
          <p className="stay-tuned">Stay Tuned!</p>
          <button className="back-btn" onClick={closeConstruction}>Back</button>
        </div>
      </div>
    )}
  </>
  )
}

export default Footer
