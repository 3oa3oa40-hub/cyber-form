import { useState, useEffect } from 'react'

const NeonEntrance = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    // Phase 1: Neon text appears
    const phase1 = setTimeout(() => setPhase(1), 100)
    // Phase 2: Text glow intensifies
    const phase2 = setTimeout(() => setPhase(2), 1500)
    // Phase 3: Fade out and remove
    const phase3 = setTimeout(() => setPhase(3), 2500)
    // Remove component
    const remove = setTimeout(() => setIsVisible(false), 3200)

    return () => {
      clearTimeout(phase1)
      clearTimeout(phase2)
      clearTimeout(phase3)
      clearTimeout(remove)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className={`neon-entrance ${phase >= 3 ? 'fade-out' : ''}`}>
      {/* 3D Floating Icons */}
      <div className={`neon-icon icon-1 ${phase >= 1 ? 'show' : ''}`}>
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M32 4L8 16v20c0 16 10 24 24 32 14-8 24-16 24-32V16L32 4z"/>
          <path d="M20 30l8 8 16-16"/>
        </svg>
      </div>
      
      <div className={`neon-icon icon-2 ${phase >= 1 ? 'show' : ''}`}>
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="32" cy="28" r="12"/>
          <path d="M16 48c0-8 7-16 16-16s16 8 16 16"/>
          <path d="M32 20v8l6 6"/>
        </svg>
      </div>
      
      <div className={`neon-icon icon-3 ${phase >= 1 ? 'show' : ''}`}>
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 28h40v24H12z"/>
          <circle cx="32" cy="40" r="6"/>
          <path d="M20 28v-8a12 12 0 0124 0v8"/>
        </svg>
      </div>
      
      <div className={`neon-icon icon-4 ${phase >= 1 ? 'show' : ''}`}>
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M8 20h48v32H8z"/>
          <path d="M16 28h32"/>
          <path d="M20 36h24"/>
          <path d="M24 44h16"/>
        </svg>
      </div>
      
      <div className={`neon-icon icon-5 ${phase >= 1 ? 'show' : ''}`}>
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M32 8v48M8 32h48"/>
          <circle cx="32" cy="32" r="8"/>
        </svg>
      </div>
      
      <div className={`neon-icon icon-6 ${phase >= 1 ? 'show' : ''}`}>
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 52V20l20-12 20 12v32"/>
          <circle cx="32" cy="36" r="8"/>
        </svg>
      </div>

      <div className="neon-content">
        <h1 className={`neon-title ${phase >= 1 ? 'show' : ''} ${phase >= 2 ? 'glow' : ''}`}>
          <span className="neon-line">ACTIVITY</span>
          <span className="neon-line">CYBER</span>
          <span className="neon-line">SECURITY</span>
        </h1>
        <div className={`neon-subtitle ${phase >= 2 ? 'show' : ''}`}>
          Building Digital Defense
        </div>
      </div>
      <div className="neon-grid-overlay"></div>
      <div className="neon-scanline"></div>
    </div>
  )
}

export default NeonEntrance
