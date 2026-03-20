const benefits = [
  {
    number: '01',
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <path d="M24 4L4 14v20l20 10 20-10V14L24 4z" stroke="#00ff88" strokeWidth="2"/>
        <path d="M24 24v20M24 24L4 14M24 24l20-10" stroke="#00ff88" strokeWidth="2"/>
      </svg>
    ),
    title: 'تطوير مهارات عملية',
    description: 'تعلم من خلال الممارسة الفعلية مع أدوات احترافية وبيئات مختبرية متقدمة'
  },
  {
    number: '02',
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="16" r="8" stroke="#00d4ff" strokeWidth="2"/>
        <path d="M8 40c0-8.8 7.2-16 16-16s16 7.2 16 16" stroke="#00d4ff" strokeWidth="2"/>
      </svg>
    ),
    title: 'العمل ضمن فريق احترافي',
    description: 'انضم إلى نخبة من المتخصصين وطور مهارات العمل الجماعي في بيئة تنافسية'
  },
  {
    number: '03',
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <rect x="8" y="8" width="32" height="32" rx="4" stroke="#ff3366" strokeWidth="2"/>
        <path d="M16 24l6 6 12-12" stroke="#ff3366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'مشاريع حقيقية',
    description: 'شارك في اختبارات اختراق حقيقية وتحديات الأمن السيبراني العالمية'
  },
  {
    number: '04',
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <path d="M24 4L6 14v20l18 10 18-10V14L24 4z" stroke="#ffaa00" strokeWidth="2"/>
        <path d="M18 22l6 6 12-12" stroke="#ffaa00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: ' المشاركة في عمل تطوعي',
    description: 'المشاركة في عمل تطوعي تضيف قيمة لسيرتك الذاتية في سوق العمل'
  }
]

const WhyJoin = () => {
  return (
    <section id="why-join" className="why-join">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">المميزات</span>
          <h2 className="section-title">لماذا تنضم إلينا؟</h2>
          <div className="section-line"></div>
        </div>
        
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div 
              className="benefit-card" 
              key={index}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="card-border"></div>
              <div className="card-content">
                <div className="card-number">{benefit.number}</div>
                <div className="card-icon">
                  {benefit.icon}
                </div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
              <div className="card-glow"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyJoin
