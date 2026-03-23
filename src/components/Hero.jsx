import { useEffect, useState, useRef } from 'react'

const Hero = () => {
  const [counts, setCounts] = useState({ vulnerabilities: 0, members: 0, awards: 0 })
  const [currentImage, setCurrentImage] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)
  const statsRef = useRef(null)
  const hasAnimated = useRef(false)

  const images = [
    {
      src: "/Untitled%20design%20(1).png",
      alt: "Activity Cyber Security",
      text: "Activity Beni Suef Cyber-Department"
    },
    {
      src: "/Activity.png",
      alt: "Activity Beni Seuf",
      text: "Activity Beni Seuf"
    },
    {
      src: "/اتحاد%20بشبابها.jpg",
      alt: "Union of Be-Shababha",
      text: "اتحاد بشبابها"
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true
            animateCounters()
          }
        })
      },
      { threshold: 0.5 }
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const animateCounters = () => {
    const duration = 2000
    const steps = 60
    const interval = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps
      const easeOut = 1 - Math.pow(1 - progress, 3)

      setCounts({
        vulnerabilities: Math.floor(500 * easeOut),
        members: Math.floor(50 * easeOut),
        awards: Math.floor(20 * easeOut)
      })

      if (step >= steps) {
        clearInterval(timer)
      }
    }, interval)
  }

  const handleCtaClick = (e) => {
    e.preventDefault()
    const element = document.querySelector('#apply')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleNextImage = () => {
    if (isFlipping) return
    setIsFlipping(true)
    setCurrentImage((prev) => (prev + 1) % images.length)
    setTimeout(() => setIsFlipping(false), 600)
  }

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        {/* Image Carousel Container */}
        <div style={{ position: 'relative', display: 'inline-block', marginBottom: '2rem' }}>
          <div 
            onClick={handleNextImage}
            style={{
              position: 'relative',
              width: '550px',
              height: '480px',
              cursor: 'pointer',
              perspective: '1000px'
            }}
          >
            {images.map((img, index) => (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: currentImage === index ? 1 : 0,
                  transform: currentImage === index ? 'rotateY(0deg) scale(1)' : 'rotateY(90deg) scale(0.8)',
                  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                  backfaceVisibility: 'hidden',
                  pointerEvents: currentImage === index ? 'auto' : 'none',
                  zIndex: currentImage === index ? 10 : 0
                }}
              >
                <img 
                  src={img.src}
                  alt={img.alt}
                  style={{
                    height: '400px',
                    width: index === 2 ? '400px' : 'auto',
                    objectFit: index === 2 ? 'cover' : undefined,
                    borderRadius: index === 2 ? '12px' : undefined,
                    filter: 'drop-shadow(0 0 30px rgba(0, 255, 156, 0.3))',
                    boxShadow: index === 2 ? '0 0 30px rgba(0, 255, 156, 0.2)' : undefined
                  }}
                />
                <span style={{
                  color: '#00ff9c',
                  fontSize: index === 2 ? '1.1rem' : '0.9rem',
                  fontWeight: 600,
                  marginTop: '5px',
                  textShadow: '0 0 10px rgba(0, 255, 156, 0.5)'
                }}>{img.text}</span>
              </div>
            ))}
          </div>
          
          {/* Click Me Indicator - Arrow Style */}
          <div style={{
            position: 'absolute',
            top: '25%',
            right: '-70px',
            background: 'transparent',
            border: '1px solid #00ff9c',
            borderRadius: '8px',
            padding: '10px 14px',
            cursor: 'pointer'
          }} onClick={handleNextImage}>
            <span style={{
              color: '#00ff9c',
              fontSize: '0.8rem',
              fontWeight: 500
            }}>Click me</span>
            {/* Arrow pointing left */}
            <div style={{
              position: 'absolute',
              left: '-6px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '0',
              height: '0',
              borderTop: '6px solid transparent',
              borderBottom: '6px solid transparent',
              borderRight: '6px solid #00ff9c'
            }} />
          </div>

          {/* Image Indicators */}
          <div style={{
            position: 'absolute',
            bottom: '-30px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '8px'
          }}>
            {images.map((_, index) => (
              <div
                key={index}
                onClick={() => setCurrentImage(index)}
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: currentImage === index ? '#00ff9c' : 'rgba(0, 255, 156, 0.3)',
                  cursor: 'pointer',
                  transition: 'background 0.3s'
                }}
              />
            ))}
          </div>
        </div>
        
        <h1 className="hero-title">
          <span className="glitch" data-text="انضم إلى فريق" style={{ fontSize: '0.7em' }}>انضم إلى فريق </span>
          <span className="highlight" style={{ fontSize: '0.9em' }}>
            <span style={{
              animation: 'typing 3s steps(8) infinite'
            }}>اكتيڤيتي</span>
          </span>
          <span className="glitch" data-text="للأمن السيبراني" style={{ fontSize: '0.7em' }}> للأمن السيبراني </span>
        </h1>
        
        <p className="hero-subtitle">
          نحن نبني الدفاع الرقمي للمستقبل. انضم إلى نخبة من المحللين والباحثين في الأمن السيبراني.
        </p>
        
        <div className="hero-stats" ref={statsRef}>
          <div className="stat-item">
            <span className="stat-number">{counts.vulnerabilities}</span>
            <span className="stat-label">ثغرة تم اكتشافها</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{counts.members}</span>
            <span className="stat-label">عضو نشط</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{counts.awards}</span>
            <span className="stat-label">جائزة عالمية</span>
          </div>
        </div>
        
        <a href="#apply" className="cta-button" onClick={handleCtaClick}>
          <span className="btn-text">قدّم الآن</span>
          <span className="btn-glow"></span>
          <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
      
      <div className="hero-decoration">
        <div className="cyber-ring"></div>
        <div className="cyber-ring"></div>
        <div className="cyber-ring"></div>
      </div>
      
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.7; }
        }
        @keyframes typing {
          0%, 100% { width: 0; }
          50% { width: 100%; }
        }
      `}</style>
    </section>
  )
}

export default Hero
