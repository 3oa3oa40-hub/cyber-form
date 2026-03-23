const features = [
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="28" stroke="#00ff88" strokeWidth="2"/>
        <path d="M32 16v16l12 12" stroke="#00ff88" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="32" cy="32" r="4" fill="#00ff88"/>
      </svg>
    ),
    title: 'تحليل الثغرات',
    description: 'فحص وتحليل الأنظمة لاكتشاف الثغرات الأمنية المحتملة وتقييم المخاطر'
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="16" width="48" height="32" rx="4" stroke="#00d4ff" strokeWidth="2"/>
        <path d="M16 24h32M16 32h24M16 40h16" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="48" cy="24" r="2" fill="#00d4ff"/>
      </svg>
    ),
    title: 'اختبار الاختراق',
    description: 'محاكاة الهجمات الإلكترونية لتقييم قوة الدفاعات وتحديد نقاط الضعف'
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 20h40v32H12V20z" stroke="#ff3366" strokeWidth="2"/>
        <path d="M20 20V12a12 12 0 0124 0v8" stroke="#ff3366" strokeWidth="2"/>
        <circle cx="32" cy="36" r="6" stroke="#ff3366" strokeWidth="2"/>
        <path d="M32 36v-4" stroke="#ff3366" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'الاستجابة للحوادث',
    description: 'التحقيق في الحوادث الأمنية وتحليل البرمجيات الخبيثة والاستجابة السريعة'
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 8L52 20v24L32 56 12 44V20L32 8z" stroke="#ffaa00" strokeWidth="2"/>
        <path d="M32 24v16M24 32h16" stroke="#ffaa00" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="32" cy="32" r="4" stroke="#ffaa00" strokeWidth="2"/>
      </svg>
    ),
    title: 'التوعية الأمنية',
    description: 'نشر الوعي حول الأمن الرقمي وتقديم ورش عمل تدريبية للمجتمع'
  }
]

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">من نحن</span>
          <h2 className="section-title">عن الفريق</h2>
          <div className="section-line"></div>
        </div>
        
        <div className="about-content">
          <div className="about-text">
            <p className="about-description">
              فريق <strong>Activity Cyber-Department</strong> هو وحدة الأمن السيبراني التطوعية التابعة لمركز <strong>اكتيڤيتي</strong> التابع لاتحاد بشبابها. نحن مجموعة من المهتمين بالأمن الرقمي والتقنية، نعمل على تطوير المهارات الامنية و توعية شباب و اجيال المستقبل لاهمية الامن السيبراني و الثغرات الأمنية وحماية البنية التحتية الرقمية.
            </p>
            <p className="about-description">
              نقدم بيئة احترافية للتعلم والممارسة، حيث نعمل على مشاريع حقيقية ونحاول مساعدة شباب المستقبل لتعلم الامن السيبراني.
            </p>
          </div>
          
          <div className="about-features">
            {features.map((feature, index) => (
              <div 
                className="feature-card" 
                key={index}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
