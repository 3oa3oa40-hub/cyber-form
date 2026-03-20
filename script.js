/**
 * Activity Cyber Security - Recruitment Website
 * Interactive JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initNavigation();
    initParticles();
    initScrollAnimations();
    initForm();
    initCounters();
    initBinaryRain();
});

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link
        updateActiveNavLink();
    });

    // Mobile menu toggle
    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ============================================
// PARTICLE ANIMATION
// ============================================
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    let isActive = true;

    // Resize canvas
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    // Particle class
    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.color = Math.random() > 0.5 ? '#00ff88' : '#00d4ff';
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width ||
                this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    // Create particles
    const particleCount = window.innerWidth < 768 ? 30 : 60;
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Draw connections
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = particles[i].color;
                    ctx.globalAlpha = (1 - distance / 120) * 0.15;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            }
        }
    }

    // Animation loop
    function animate() {
        if (!isActive) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        drawConnections();

        animationId = requestAnimationFrame(animate);
    }

    // Visibility check
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            isActive = false;
            cancelAnimationFrame(animationId);
        } else {
            isActive = true;
            animate();
        }
    });

    animate();
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.aosDelay || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
}

// ============================================
// FORM HANDLING
// ============================================
function initForm() {
    const form = document.getElementById('application-form');
    const statusSelect = document.getElementById('status');
    const studentFields = document.getElementById('student-fields');
    const graduateFields = document.getElementById('graduate-fields');
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('cv');
    const fileInfo = document.getElementById('file-info');
    const fileName = document.getElementById('file-name');
    const removeFile = document.getElementById('remove-file');
    const successMessage = document.getElementById('success-message');
    const resetBtn = document.getElementById('reset-btn');
    const submitBtn = document.getElementById('submit-btn');

    // Status change handler
    statusSelect?.addEventListener('change', () => {
        const status = statusSelect.value;

        // Hide all conditional fields
        studentFields?.classList.remove('active');
        graduateFields?.classList.remove('active');

        // Show relevant fields
        if (status === 'student') {
            studentFields?.classList.add('active');
            setRequired(studentFields, true);
            setRequired(graduateFields, false);
        } else if (status === 'graduate') {
            graduateFields?.classList.add('active');
            setRequired(studentFields, false);
            setRequired(graduateFields, true);
        } else {
            setRequired(studentFields, false);
            setRequired(graduateFields, false);
        }

        // Clear errors
        clearErrors();
    });

    // File upload handlers
    uploadArea?.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea?.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });

    uploadArea?.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    });

    fileInput?.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    });

    removeFile?.addEventListener('click', () => {
        fileInput.value = '';
        fileInfo?.classList.remove('show');
        clearError('cv');
    });

    function handleFile(file) {
        const validTypes = ['application/pdf', 'application/msword', 
                          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!validTypes.includes(file.type)) {
            showError('cv', 'يرجى رفع ملف بصيغة PDF أو DOC أو DOCX فقط');
            return;
        }

        if (file.size > maxSize) {
            showError('cv', 'حجم الملف يجب أن لا يتجاوز 5 ميجابايت');
            return;
        }

        fileName.textContent = file.name;
        fileInfo?.classList.add('show');
        clearError('cv');
    }

    // Form submission
    form?.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        // Show loading
        submitBtn.classList.add('loading');

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Show success
        submitBtn.classList.remove('loading');
        form.style.display = 'none';
        successMessage?.classList.add('show');

        // Reset form
        form.reset();
        studentFields?.classList.remove('active');
        graduateFields?.classList.remove('active');
        fileInfo?.classList.remove('show');
    });

    // Reset button
    resetBtn?.addEventListener('click', () => {
        successMessage?.classList.remove('show');
        form.style.display = 'block';
        form.reset();
        studentFields?.classList.remove('active');
        graduateFields?.classList.remove('active');
        fileInfo?.classList.remove('show');
        clearErrors();
    });

    // Real-time validation
    const inputs = form?.querySelectorAll('input, select');
    inputs?.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateField(input);
            }
        });
    });
}

function setRequired(container, required) {
    if (!container) return;
    const inputs = container.querySelectorAll('input, select');
    inputs.forEach(input => {
        if (required) {
            input.setAttribute('required', '');
        } else {
            input.removeAttribute('required');
        }
    });
}

function validateForm() {
    let isValid = true;
    const form = document.getElementById('application-form');
    const requiredInputs = form?.querySelectorAll('[required]');

    requiredInputs?.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    return isValid;
}

function validateField(input) {
    const name = input.name;
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';

    switch (name) {
        case 'fullName':
            if (!value) {
                errorMessage = 'الاسم الكامل مطلوب';
                isValid = false;
            } else if (value.length < 3) {
                errorMessage = 'الاسم يجب أن يكون 3 أحرف على الأقل';
                isValid = false;
            }
            break;

        case 'phone':
            if (!value) {
                errorMessage = 'رقم الهاتف مطلوب';
                isValid = false;
            } else if (!/^\d{10,15}$/.test(value.replace(/\s/g, ''))) {
                errorMessage = 'رقم الهاتف غير صالح';
                isValid = false;
            }
            break;

        case 'email':
            if (!value) {
                errorMessage = 'البريد الإلكتروني مطلوب';
                isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                errorMessage = 'البريد الإلكتروني غير صالح';
                isValid = false;
            }
            break;

        case 'status':
            if (!value) {
                errorMessage = 'الحالة مطلوبة';
                isValid = false;
            }
            break;

        case 'university':
            if (!value && isStudentFieldVisible()) {
                errorMessage = 'اسم الجامعة مطلوب';
                isValid = false;
            }
            break;

        case 'faculty':
            if (!value && isStudentFieldVisible()) {
                errorMessage = 'اسم الكلية مطلوب';
                isValid = false;
            }
            break;

        case 'year':
            if (!value && isStudentFieldVisible()) {
                errorMessage = 'السنة الدراسية مطلوبة';
                isValid = false;
            }
            break;

        case 'graduationYear':
            if (!value && isGraduateFieldVisible()) {
                errorMessage = 'سنة التخرج مطلوبة';
                isValid = false;
            } else if (value) {
                const year = parseInt(value);
                const currentYear = new Date().getFullYear();
                if (year < 2000 || year > currentYear) {
                    errorMessage = 'سنة التخرج غير صالحة';
                    isValid = false;
                }
            }
            break;
    }

    if (isValid) {
        clearError(name);
    } else {
        showError(name, errorMessage);
    }

    return isValid;
}

function isStudentFieldVisible() {
    const studentFields = document.getElementById('student-fields');
    return studentFields?.classList.contains('active');
}

function isGraduateFieldVisible() {
    const graduateFields = document.getElementById('graduate-fields');
    return graduateFields?.classList.contains('active');
}

function showError(fieldName, message) {
    const errorElement = document.getElementById(`error-${fieldName}`);
    const inputElement = document.querySelector(`[name="${fieldName}"]`);

    if (errorElement) {
        errorElement.textContent = message;
    }

    if (inputElement) {
        inputElement.classList.add('error');
        inputElement.style.borderColor = '#ff3366';
    }
}

function clearError(fieldName) {
    const errorElement = document.getElementById(`error-${fieldName}`);
    const inputElement = document.querySelector(`[name="${fieldName}"]`);

    if (errorElement) {
        errorElement.textContent = '';
    }

    if (inputElement) {
        inputElement.classList.remove('error');
        inputElement.style.borderColor = '';
    }
}

function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    const errorInputs = document.querySelectorAll('.error');

    errorMessages.forEach(el => el.textContent = '');
    errorInputs.forEach(el => {
        el.classList.remove('error');
        el.style.borderColor = '';
    });
}

// ============================================
// COUNTER ANIMATION
// ============================================
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

// ============================================
// BINARY RAIN EFFECT
// ============================================
function initBinaryRain() {
    const container = document.querySelector('.binary-rain');
    if (!container) return;

    const chars = '01';
    const columns = Math.floor(window.innerWidth / 20);

    for (let i = 0; i < columns; i++) {
        const column = document.createElement('div');
        column.style.cssText = `
            position: absolute;
            top: -100%;
            left: ${i * 20}px;
            font-family: monospace;
            font-size: 14px;
            color: var(--neon-green);
            opacity: 0.3;
            writing-mode: vertical-rl;
            text-orientation: mixed;
            animation: binaryColumn ${5 + Math.random() * 5}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        column.textContent = Array(20).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join('');
        container.appendChild(column);
    }

    // Add keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes binaryColumn {
            0% { transform: translateY(-100%); opacity: 0; }
            10% { opacity: 0.3; }
            90% { opacity: 0.3; }
            100% { transform: translateY(100vh); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// GLITCH EFFECT
// ============================================
function initGlitchEffect() {
    const glitchElements = document.querySelectorAll('.glitch');

    glitchElements.forEach(el => {
        setInterval(() => {
            el.style.animation = 'none';
            setTimeout(() => {
                el.style.animation = '';
            }, 10);
        }, 5000 + Math.random() * 5000);
    });
}

// Add glitch keyframes
const glitchStyle = document.createElement('style');
glitchStyle.textContent = `
    @keyframes glitch {
        0%, 100% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
    }

    .glitch {
        animation: glitch 0.3s ease-in-out infinite;
        animation-play-state: paused;
    }

    .glitch:hover {
        animation-play-state: running;
    }
`;
document.head.appendChild(glitchStyle);
