import { useState } from 'react'

const CTASection = () => {
  const [isRegistrationClosed] = useState(true)

  return (
    <section className="cta-section" id="cta">
      <div className="cta-section-content">
        {/* Badge */}
        <div className="cta-badge">
          <svg className="cta-badge-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
            <path d="M19 10l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" />
            <path d="M5 14l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" />
          </svg>
          <span>ابدأ رحلتك</span>
        </div>

        {/* Heading */}
        <h2 className="cta-heading">
          جاهز تبدأ رحلتك؟
        </h2>

        {/* Subtitle */}
        <p className="cta-subtitle">
          سجل الآن وانضم إلينا في  <span className="cta-highlight">Activity Cyber-Department</span>
        </p>
      </div>

      <style>{`
        .cta-section {
          min-height: 60vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 6rem 2rem;
          background: linear-gradient(180deg, var(--primary-bg) 0%, rgba(20, 20, 35, 0.8) 50%, var(--primary-bg) 100%);
          overflow: hidden;
        }

        .cta-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(ellipse at center, rgba(0, 255, 136, 0.03) 0%, transparent 70%);
          pointer-events: none;
        }

        .cta-section-content {
          text-align: center;
          max-width: 700px;
          z-index: 2;
        }

        .cta-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1.25rem;
          background: rgba(0, 255, 136, 0.1);
          border: 1px solid rgba(0, 255, 136, 0.3);
          border-radius: 50px;
          color: var(--neon-green);
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 1.5rem;
        }

        .cta-badge-icon {
          color: var(--neon-green);
        }

        .cta-heading {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        .cta-subtitle {
          font-size: clamp(1.1rem, 2.5vw, 1.4rem);
          color: var(--text-secondary);
          margin-bottom: 2.5rem;
          line-height: 1.6;
        }

        .cta-highlight {
          color: var(--neon-green);
          font-weight: 600;
        }

        .cta-button-large {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 1rem 2.5rem;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50px;
          color: var(--text-muted);
          font-family: var(--font-primary);
          font-size: 1.1rem;
          font-weight: 600;
          cursor: not-allowed;
          transition: all 0.3s ease;
        }

        .cta-button-large.closed {
          opacity: 0.7;
        }

        .cta-button-large:not(.closed) {
          background: var(--neon-green);
          border-color: var(--neon-green);
          color: var(--primary-bg);
          cursor: pointer;
        }

        .cta-button-large:not(.closed):hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0, 255, 136, 0.3);
        }

        @media (max-width: 768px) {
          .cta-section {
            padding: 4rem 1.5rem;
          }
        }
      `}</style>
    </section>
  )
}

export default CTASection
