import { useState, useEffect, useCallback, useRef } from 'react'
import { supabase } from '../lib/supabase'

const STORAGE_KEY = 'activity_form_data'

const ApplicationForm = () => {
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : {
      fullName: '',
      phone: '',
      email: '',
      status: '',
      university: '',
      faculty: '',
      year: '',
      graduationYear: '',
      track: '',
      customTrack: '',
      governorate: '',
      currentResidence: '',
      strength: '',
      experienceLevel: '',
      question: '',
      cv: null
    }
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [fileName, setFileName] = useState('')
  const [touched, setTouched] = useState({})
  const [isDragOver, setIsDragOver] = useState(false)

  // Auto-save to localStorage
  useEffect(() => {
    const dataToSave = { ...formData, cv: null }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
  }, [formData])

  const validate = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'الرجاء إدخال الاسم الكامل'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'الرجاء إدخال رقم الهاتف'
    } else if (!/^\d{11}$/.test(formData.phone)) {
      newErrors.phone = 'رقم الهاتف يجب أن يكون 11 رقماً يبدأ بـ 0'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'الرجاء إدخال البريد الإلكتروني'
    } else if (!/^[^؀-ۿ\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'الرجاء إدخال بريد إلكتروني صحيح (بدون أحرف عربية)'
    }

    if (!formData.status) {
      newErrors.status = 'الرجاء اختيار الحالة'
    }

    if (formData.status === 'student') {
      if (!formData.university.trim()) {
        newErrors.university = 'الرجاء إدخال اسم الجامعة'
      }
      if (!formData.faculty.trim()) {
        newErrors.faculty = 'الرجاء إدخال اسم الكلية'
      }
      if (!formData.year) {
        newErrors.year = 'الرجاء اختيار السنة الدراسية'
      }
    }

    if (formData.status === 'graduate') {
      if (!formData.graduationYear) {
        newErrors.graduationYear = 'الرجاء إدخال سنة التخرج'
      }
    }

    if (!formData.track) {
      newErrors.track = 'الرجاء اختيار مجالك'
    }

    if (formData.track === 'other' && !formData.customTrack?.trim()) {
      newErrors.customTrack = 'الرجاء تحديد مجالك'
    }

    if (!formData.experienceLevel) {
      newErrors.experienceLevel = 'الرجاء اختيار مستوي خبرتك'
    }

    if (!formData.governorate.trim()) {
      newErrors.governorate = 'الرجاء إدخال المحافظة'
    }

    if (!formData.currentResidence.trim()) {
      newErrors.currentResidence = 'الرجاء إدخال محل الإقامة الحالي'
    }

    if (formData.strength === 'other' && !formData.customStrength?.trim()) {
      newErrors.customStrength = 'الرجاء تحديد نقطة قوتك'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Debounce timer for real-time duplicate check
  const debounceRef = useRef(null)

  const checkDuplicate = async (name, value) => {
    if (!value.trim()) return
    const { data: existing } = await supabase
      .from('applications')
      .select('id, email, phone')
      .eq(name, value.trim())
      .limit(1)

    if (existing && existing.length > 0) {
      setErrors(prev => ({
        ...prev,
        [name]: name === 'email' 
          ? 'هذا البريد الإلكتروني مسجل بالفعل' 
          : 'هذا رقم الهاتف مسجل بالفعل'
      }))
    } else {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    let formattedValue = value

    // Phone number formatting - only digits, auto-add 0, max 11 digits (0 + 10)
    if (name === 'phone') {
      formattedValue = formatPhoneNumber(value)
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }))
    
    if (errors[name] && name !== 'email' && name !== 'phone') {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }

    // Real-time duplicate check for email/phone
    if (name === 'email' || name === 'phone') {
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => {
        checkDuplicate(name, formattedValue)
      }, 500)
    }
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
  }

  // Phone number formatter - only digits, starts with 0, total 11 chars (0 + 10 digits)
  const formatPhoneNumber = (value) => {
    // Remove all non-digits
    let cleaned = value.replace(/\D/g, '')
    
    // Limit to max 11 digits
    cleaned = cleaned.slice(0, 11)
    
    // If starts with 2 (from +20), remove it
    if (cleaned.startsWith('20') && cleaned.length > 1) {
      cleaned = cleaned.slice(2)
    }
    
    // If doesn't start with 0, add it
    if (cleaned.length > 0 && !cleaned.startsWith('0')) {
      cleaned = '0' + cleaned
    }
    
    // Re-apply max 11 digits after adding 0
    cleaned = cleaned.slice(0, 11)
    
    return cleaned
  }

  // File validation helper
  const validateFile = (file) => {
    if (file.size > 5 * 1024 * 1024) {
      return 'حجم الملف يجب أن يكون أقل من 5MB'
    }
    const validTypes = ['.pdf', '.doc', '.docx']
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase()
    if (!validTypes.includes(fileExtension)) {
      return 'يجب أن يكون الملف PDF, DOC, أو DOCX'
    }
    return null
  }

  // Handle file from input or drop
  const processFile = (file) => {
    const error = validateFile(file)
    if (error) {
      setErrors(prev => ({ ...prev, cv: error }))
      return false
    }
    setFormData(prev => ({ ...prev, cv: file }))
    setFileName(file.name)
    setErrors(prev => ({ ...prev, cv: '' }))
    return true
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      processFile(file)
    }
  }

  // Drag and drop handlers
  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
    
    const file = e.dataTransfer.files[0]
    if (file) {
      processFile(file)
    }
  }, [])

  const removeFile = () => {
    setFormData(prev => ({ ...prev, cv: null }))
    setFileName('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validate()) return

    setIsSubmitting(true)

    try {
      // Check for duplicate email or phone
      const { data: existing } = await supabase
        .from('applications')
        .select('id, email, phone')
        .or(`email.eq.${formData.email},phone.eq.${formData.phone}`)
        .limit(1)

      if (existing && existing.length > 0) {
        const existingUser = existing[0]
        const newErrors = {}
        if (existingUser.email === formData.email) {
          newErrors.email = 'هذا البريد الإلكتروني مسجل بالفعل'
        }
        if (existingUser.phone === formData.phone) {
          newErrors.phone = 'هذا رقم الهاتف مسجل بالفعل'
        }
        setErrors(newErrors)
        setIsSubmitting(false)
        return
      }

      // Prepare data for Supabase
      const submissionData = {
        full_name: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        status: formData.status,
        university: formData.university || null,
        faculty: formData.faculty || null,
        year: formData.year || null,
        graduation_year: formData.graduationYear || null,
        track: formData.track,
        custom_track: formData.customTrack || null,
        experience_level: formData.experienceLevel,
        governorate: formData.governorate,
        current_residence: formData.currentResidence,
        strength: formData.strength || null,
        custom_strength: formData.customStrength || null,
        question: formData.question || null,
        cv_url: null
      }

      // Upload CV if present
      if (formData.cv) {
        const fileExt = formData.cv.name.split('.').pop()
        const fileName = `${Date.now()}_${formData.fullName.replace(/\s+/g, '_')}.${fileExt}`
        const filePath = `cvs/${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('applicants')
          .upload(filePath, formData.cv)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
          .from('applicants')
          .getPublicUrl(filePath)

        submissionData.cv_url = publicUrl
      }

      // Insert into database
      const { error: insertError } = await supabase
        .from('applications')
        .insert([submissionData])

      if (insertError) throw insertError

      setIsSuccess(true)
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.error('Error submitting application:', error)
      setErrors(prev => ({ 
        ...prev, 
        submit: 'حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.' 
      }))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      status: '',
      university: '',
      faculty: '',
      year: '',
      graduationYear: '',
      track: '',
      customTrack: '',
      governorate: '',
      currentResidence: '',
      strength: '',
      experienceLevel: '',
      customStrength: '',
      question: '',
      cv: null
    })
    setErrors({})
    setFileName('')
    setTouched({})
    setIsSuccess(false)
    localStorage.removeItem(STORAGE_KEY)
  }

  if (isSuccess) {
    return (
      <section id="apply" className="application">
        <div className="container">
          <div className="form-container">
            <div className="form-glass">
              <div className="success-message show">
                <div className="success-icon">
                  <svg viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="32" r="28" stroke="#00ff88" strokeWidth="2"/>
                    <path d="M20 32l8 8 16-16" stroke="#00ff88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>تم إرسال طلبك بنجاح!</h3>
                <p>سنقوم بمراجعة طلبك والتواصل معك قريباً. شكراً لاهتمامك بالانضمام إلى فريق Activity.</p>
                <button type="button" className="reset-btn" onClick={handleReset}>
                  تقديم طلب آخر
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="apply" className="application">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">انضم إلينا</span>
          <h2 className="section-title">تقديم طلب الانضمام</h2>
          <div className="section-line"></div>
        </div>

        <div className="form-container">
          <div className="form-glass">
            <form id="application-form" className="cyber-form" onSubmit={handleSubmit} noValidate>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="fullName">
                    <span className="label-text">الاسم الكامل</span>
                    <span className="required">*</span>
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={touched.fullName && errors.fullName ? 'error' : touched.fullName ? 'valid' : ''}
                      required
                    />
                    <div className="input-line"></div>
                    <div className="input-glow"></div>
                  </div>
                  {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">
                    <span className="label-text">رقم الهاتف</span>
                    <span className="required">*</span>
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="+20xxxxxxxxx"
                      className={touched.phone && errors.phone ? 'error' : touched.phone ? 'valid' : ''}
                      required
                    />
                    <div className="input-line"></div>
                    <div className="input-glow"></div>
                  </div>
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    <span className="label-text">البريد الإلكتروني</span>
                    <span className="required">*</span>
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={touched.email && errors.email ? 'error' : touched.email ? 'valid' : ''}
                      required
                    />
                    <div className="input-line"></div>
                    <div className="input-glow"></div>
                  </div>
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="status">
                    <span className="label-text">الحالة</span>
                    <span className="required">*</span>
                  </label>
                  <div className="input-wrapper select-wrapper">
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      required
                    >
                      <option value="">اختر الحالة</option>
                      <option value="student">طالب</option>
                      <option value="graduate">خريج</option>
                    </select>
                    <div className="select-arrow">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
                    </div>
                    <div className="input-line"></div>
                    <div className="input-glow"></div>
                  </div>
                  {errors.status && <span className="error-message">{errors.status}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="track">
                    <span className="label-text">مجالك</span>
                    <span className="required">*</span>
                  </label>
                  <div className="input-wrapper select-wrapper">
                    <select
                      id="track"
                      name="track"
                      value={formData.track}
                      onChange={handleChange}
                      required
                    >
                      <option value="">اختر مجالك</option>
                      <option value="penetration-testing">اختبار الاختراق (Penetration Testing)</option>
                      <option value="network-security">أمان الشبكات (Network Security)</option>
                      <option value="malware-analysis">تحليل البرمجيات الخبيثة (Malware Analysis)</option>
                      <option value="incident-response">الاستجابة للحوادث (Incident Response)</option>
                      <option value="digital-forensics">التحقيق الجنائي الرقمي (Digital Forensics)</option>
                      <option value="web-security">أمان تطبيقات الويب (Web Application Security)</option>
                      <option value="cryptography">التشفير (Cryptography)</option>
                      <option value="security-awareness">التوعية الأمنية (Security Awareness)</option>
                      <option value="other">أخرى</option>
                    </select>
                    <div className="select-arrow">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
                    </div>
                    <div className="input-line"></div>
                    <div className="input-glow"></div>
                  </div>
                  {errors.track && <span className="error-message">{errors.track}</span>}
                </div>

                {formData.track === 'other' && (
                  <div className="form-group">
                    <label htmlFor="customTrack">
                      <span className="label-text">حدد مجالك</span>
                      <span className="required">*</span>
                    </label>
                    <div className="input-wrapper">
                      <input
                        type="text"
                        id="customTrack"
                        name="customTrack"
                        value={formData.customTrack || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="اكتب مجالك هنا"
                        className={touched.customTrack && errors.customTrack ? 'error' : touched.customTrack ? 'valid' : ''}
                        required
                      />
                      <div className="input-line"></div>
                      <div className="input-glow"></div>
                    </div>
                    {errors.customTrack && <span className="error-message">{errors.customTrack}</span>}
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="experienceLevel">
                    <span className="label-text">مستوي خبرتك في المجال</span>
                    <span className="required">*</span>
                  </label>
                  <div className="input-wrapper select-wrapper">
                    <select
                      id="experienceLevel"
                      name="experienceLevel"
                      value={formData.experienceLevel}
                      onChange={handleChange}
                      required
                    >
                      <option value="">اختر مستوي الخبرة</option>
                      <option value="beginner">مبتدئ - أقل من 1 سنة</option>
                      <option value="intermediate">متوسط - 1-2 سنة</option>
                      <option value="advanced">متقدم - 2-3 سنوات</option>
                      <option value="expert">خبير - أكثر من 3 سنوات</option>
                    </select>
                    <div className="select-arrow">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
                    </div>
                    <div className="input-line"></div>
                    <div className="input-glow"></div>
                  </div>
                  {errors.experienceLevel && <span className="error-message">{errors.experienceLevel}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="governorate">
                    <span className="label-text">المحافظة</span>
                    <span className="required">*</span>
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      id="governorate"
                      name="governorate"
                      value={formData.governorate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={touched.governorate && errors.governorate ? 'error' : touched.governorate ? 'valid' : ''}
                      required
                    />
                    <div className="input-line"></div>
                    <div className="input-glow"></div>
                  </div>
                  {errors.governorate && <span className="error-message">{errors.governorate}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="currentResidence">
                    <span className="label-text">محل الإقامة الحالي</span>
                    <span className="required">*</span>
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      id="currentResidence"
                      name="currentResidence"
                      value={formData.currentResidence}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={touched.currentResidence && errors.currentResidence ? 'error' : touched.currentResidence ? 'valid' : ''}
                      required
                    />
                    <div className="input-line"></div>
                    <div className="input-glow"></div>
                  </div>
                  {errors.currentResidence && <span className="error-message">{errors.currentResidence}</span>}
                </div>
              </div>

              {formData.status === 'student' && (
                <div className="conditional-fields form-grid active">
                  <div className="form-group">
                    <label htmlFor="university">
                      <span className="label-text">اسم الجامعة</span>
                      <span className="required">*</span>
                    </label>
                    <div className="input-wrapper">
                      <input
                        type="text"
                        id="university"
                        name="university"
                        value={formData.university}
                        onChange={handleChange}
                      />
                      <div className="input-line"></div>
                      <div className="input-glow"></div>
                    </div>
                    {errors.university && <span className="error-message">{errors.university}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="faculty">
                      <span className="label-text">اسم الكلية</span>
                      <span className="required">*</span>
                    </label>
                    <div className="input-wrapper">
                      <input
                        type="text"
                        id="faculty"
                        name="faculty"
                        value={formData.faculty}
                        onChange={handleChange}
                      />
                      <div className="input-line"></div>
                      <div className="input-glow"></div>
                    </div>
                    {errors.faculty && <span className="error-message">{errors.faculty}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="year">
                      <span className="label-text">السنة الدراسية</span>
                      <span className="required">*</span>
                    </label>
                    <div className="input-wrapper select-wrapper">
                      <select
                        id="year"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                      >
                        <option value="">اختر السنة</option>
                        <option value="1">سنة أولى</option>
                        <option value="2">سنة ثانية</option>
                        <option value="3">سنة ثالثة</option>
                        <option value="4">سنة رابعة</option>
                        <option value="5">سنة خامسة</option>
                      </select>
                      <div className="select-arrow">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M6 9l6 6 6-6"/>
                        </svg>
                      </div>
                      <div className="input-line"></div>
                      <div className="input-glow"></div>
                    </div>
                    {errors.year && <span className="error-message">{errors.year}</span>}
                  </div>
                </div>
              )}

              {formData.status === 'graduate' && (
                <div className="conditional-fields form-grid active">
                  <div className="form-group">
                    <label htmlFor="graduationYear">
                      <span className="label-text">سنة التخرج</span>
                      <span className="required">*</span>
                    </label>
                    <div className="input-wrapper">
                      <input
                        type="number"
                        id="graduationYear"
                        name="graduationYear"
                        min="2000"
                        max="2030"
                        value={formData.graduationYear}
                        onChange={handleChange}
                      />
                      <div className="input-line"></div>
                      <div className="input-glow"></div>
                    </div>
                    {errors.graduationYear && <span className="error-message">{errors.graduationYear}</span>}
                  </div>
                </div>
              )}

              {/* Optional Fields */}
              <div className="form-group full-width">
                <label htmlFor="strength">
                  <span className="label-text">ايه نقطة قوتك؟</span>
                  <span className="optional">(اختياري)</span>
                </label>
                <div className="input-wrapper select-wrapper">
                  <select
                    id="strength"
                    name="strength"
                    value={formData.strength}
                    onChange={handleChange}
                  >
                    <option value="">اختر نقطة قوتك</option>
                    <option value="communication">Communication Skills</option>
                    <option value="presentation">Presentation</option>
                    <option value="coding">Coding</option>
                    <option value="other">أخرى</option>
                  </select>
                  <div className="select-arrow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </div>
                  <div className="input-line"></div>
                  <div className="input-glow"></div>
                </div>
              </div>

              {formData.strength === 'other' && (
                <div className="form-group full-width">
                  <label htmlFor="customStrength">
                    <span className="label-text">حدد نقطة قوتك</span>
                    <span className="required">*</span>
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      id="customStrength"
                      name="customStrength"
                      value={formData.customStrength || ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="اكتب نقطة قوتك هنا"
                      className={touched.customStrength && errors.customStrength ? 'error' : touched.customStrength ? 'valid' : ''}
                      required
                    />
                    <div className="input-line"></div>
                    <div className="input-glow"></div>
                  </div>
                  {errors.customStrength && <span className="error-message">{errors.customStrength}</span>}
                </div>
              )}

              <div className="form-group full-width">
                <label htmlFor="question">
                  <span className="label-text">عندك سؤال؟</span>
                  <span className="optional">(اختياري)</span>
                </label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="question"
                    name="question"
                    value={formData.question}
                    onChange={handleChange}
                    placeholder="اكتب سؤالك هنا..."
                  />
                  <div className="input-line"></div>
                  <div className="input-glow"></div>
                </div>
              </div>

              <div 
                className={`form-group full-width ${isDragOver ? 'drag-over' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <label>
                  <span className="label-text">السيرة الذاتية</span>
                  <span className="optional">(اختياري)</span>
                </label>
                <div className="upload-area">
                  <input
                    type="file"
                    id="cv"
                    name="cv"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                  />
                  <div className="upload-content">
                    <div className="upload-icon">
                      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M24 8v24M16 16l8-8 8 8"/>
                        <path d="M12 32h24"/>
                      </svg>
                    </div>
                    <p className="upload-text">اسحب الملف هنا أو اضغط للاختيار</p>
                    <p className="upload-hint">PDF, DOC, DOCX (الحد الأقصى 5MB)</p>
                  </div>
                  <div className="upload-glow"></div>
                </div>
                {fileName && (
                  <div className="file-info show">
                    <span className="file-name">{fileName}</span>
                    <button type="button" className="remove-file" onClick={removeFile}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>
                )}
                {errors.cv && <span className="error-message">{errors.cv}</span>}
              </div>

              <div className="honeypot">
                <input type="text" name="website" tabIndex="-1" autoComplete="off" />
              </div>

              <div className="form-submit">
                <button type="submit" className={`submit-btn ${isSubmitting ? 'loading' : ''}`} id="submit-btn">
                  <span className="btn-content">
                    <span className="btn-text">إرسال الطلب</span>
                    <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </span>
                  <div className="btn-loading">
                    <div className="spinner"></div>
                    <span>جاري الإرسال...</span>
                  </div>
                  <div className="btn-glow-effect"></div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ApplicationForm
