// Enhanced JavaScript with smooth animations and improved UX
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initThemeToggle();
    initNavbarScroll();
    initCarousels();
    initSmoothScrolling();
    initLazyLoading();
    initScrollAnimations();
    initButtonInteractions();
    initAuthEnhancements();
    initFormValidations();
    
    console.log('🔥 Instituto Fire - Site carregado com todas as melhorias premium!');
});

// Theme Toggle with Smooth Transition
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use OS preference
    const currentTheme = localStorage.getItem('theme') || 
                        (prefersDarkScheme.matches ? 'dark' : 'light');
    
    if (currentTheme === 'dark') {
        document.documentElement.classList.add('dark');
    }
    
    themeToggle.addEventListener('click', function() {
        document.documentElement.classList.add('theme-transition');
        document.documentElement.classList.toggle('dark');
        
        const theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        
        // Remove transition class after animation completes
        setTimeout(() => {
            document.documentElement.classList.remove('theme-transition');
        }, 600);
    });
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateNavbar() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
            
            // Hide/show navbar on scroll
            if (window.scrollY > lastScrollY && window.scrollY > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = window.scrollY;
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Enhanced Carousel with Smooth Transitions
class PremiumCarousel {
    constructor(container) {
        this.container = container;
        this.track = container.querySelector('.carousel-track');
        this.slides = Array.from(container.querySelectorAll('.carousel-slide'));
        this.dots = Array.from(container.querySelectorAll('.dot'));
        this.prevBtn = container.querySelector('.carousel-prev');
        this.nextBtn = container.querySelector('.carousel-next');
        
        this.currentIndex = 0;
        this.isTransitioning = false;
        this.autoPlayInterval = null;
        this.touchStartX = 0;
        this.touchEndX = 0;
        
        this.init();
    }
    
    init() {
        // Event Listeners
        this.prevBtn?.addEventListener('click', () => this.prev());
        this.nextBtn?.addEventListener('click', () => this.next());
        
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Keyboard Navigation
        document.addEventListener('keydown', (e) => {
            if (this.container.contains(document.activeElement)) {
                if (e.key === 'ArrowLeft') this.prev();
                if (e.key === 'ArrowRight') this.next();
            }
        });
        
        // Auto-play
        this.startAutoPlay();
        
        // Pause on hover
        this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.container.addEventListener('mouseleave', () => this.startAutoPlay());
        
        // Touch support for mobile
        this.addTouchSupport();
    }
    
    addTouchSupport() {
        this.track.addEventListener('touchstart', (e) => {
            this.touchStartX = e.touches[0].clientX;
            this.stopAutoPlay();
        });
        
        this.track.addEventListener('touchmove', (e) => {
            this.touchEndX = e.touches[0].clientX;
        });
        
        this.track.addEventListener('touchend', () => {
            this.handleSwipe();
            this.startAutoPlay();
        });
    }
    
    handleSwipe() {
        const swipeThreshold = 50;
        const diff = this.touchStartX - this.touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.next();
            } else {
                this.prev();
            }
        }
    }
    
    goToSlide(index) {
        if (this.isTransitioning || index === this.currentIndex) return;
        
        this.isTransitioning = true;
        
        // Update active states
        this.slides[this.currentIndex]?.classList.remove('active');
        this.dots[this.currentIndex]?.classList.remove('active');
        
        this.currentIndex = index;
        
        this.slides[this.currentIndex]?.classList.add('active');
        this.dots[this.currentIndex]?.classList.add('active');
        
        // Smooth transition
        if (this.track) {
            this.track.style.transform = `translateX(-${this.currentIndex * 100}%)`;
        }
        
        setTimeout(() => {
            this.isTransitioning = false;
        }, 800);
    }
    
    next() {
        const nextIndex = (this.currentIndex + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }
    
    prev() {
        const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }
    
    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => this.next(), 5000);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

function initCarousels() {
    const carouselContainers = document.querySelectorAll('.carousel-container');
    carouselContainers.forEach(container => {
        new PremiumCarousel(container);
    });
}

// Smooth Scrolling for Anchor Links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Lazy Loading for Images
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (!lazyImages.length) return;
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                
                // Add loaded class for fade-in effect
                img.addEventListener('load', () => {
                    img.classList.add('image-loaded');
                });
                
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
    });
    
    lazyImages.forEach(img => {
        // Add loading state
        img.classList.add('image-loading');
        imageObserver.observe(img);
    });
}

// Scroll Animations
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.feature-card, .testimonial-card, .course-card-large, .course-card');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                // Unobserve after animation
                setTimeout(() => {
                    fadeObserver.unobserve(entry.target);
                }, 1000);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        fadeObserver.observe(el);
    });
}

// Enhanced Button Interactions
function initButtonInteractions() {
    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });
    });

    // Add hover effects to course cards
    document.querySelectorAll('.course-card, .feature-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

function createRippleEffect(event, element) {
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Auth Page Enhancements
function initAuthEnhancements() {
    createAuthParticles();
    enhanceAuthForms();
}

function createAuthParticles() {
    const authContainer = document.querySelector('.auth-container');
    if (!authContainer) return;

    // Remove existing particles
    const existingParticles = authContainer.querySelector('.auth-particles');
    if (existingParticles) {
        existingParticles.remove();
    }

    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'auth-particles';
    
    // Create multiple particles
    for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 4 + 2;
        const left = Math.random() * 100;
        const animationDelay = Math.random() * -20;
        const animationDuration = Math.random() * 10 + 15;
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            top: ${Math.random() * 100}%;
            left: ${left}%;
            animation-delay: ${animationDelay}s;
            animation-duration: ${animationDuration}s;
            opacity: ${Math.random() * 0.08 + 0.02};
            background: var(--primary);
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    authContainer.appendChild(particlesContainer);
}

function enhanceAuthForms() {
    const forms = document.querySelectorAll('.auth-form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input[type="email"], input[type="password"], input[type="text"]');
        
        inputs.forEach(input => {
            // Add focus effects
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
                if (this.value) {
                    this.parentElement.classList.add('has-value');
                } else {
                    this.parentElement.classList.remove('has-value');
                }
            });
            
            // Check initial value
            if (input.value) {
                input.parentElement.classList.add('has-value');
            }
        });
        
        // Real-time password validation for signup forms
        if (form.id === 'signupForm') {
            const passwordInput = form.querySelector('input[type="password"]');
            const confirmPasswordInput = form.querySelector('#confirmPassword');
            
            if (passwordInput && confirmPasswordInput) {
                [passwordInput, confirmPasswordInput].forEach(input => {
                    input.addEventListener('input', validatePassword);
                });
            }
        }
    });
}

// Form Validations
function initFormValidations() {
    // Email validation
    document.querySelectorAll('input[type="email"]').forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !isValidEmail(this.value)) {
                this.classList.add('error');
                showInputError(this, 'Por favor, insira um email válido');
            } else {
                this.classList.remove('error');
                clearInputError(this);
            }
        });
    });
    
    // Password strength validation
    document.querySelectorAll('input[type="password"]').forEach(input => {
        if (input.id !== 'confirmPassword') {
            input.addEventListener('input', function() {
                validatePasswordStrength(this);
            });
        }
    });
}

function validatePassword() {
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const feedback = document.getElementById('passwordMatch');
    
    if (!password || !confirmPassword || !feedback) return;
    
    if (confirmPassword.value && password.value !== confirmPassword.value) {
        feedback.textContent = 'As senhas não coincidem';
        feedback.className = 'password-feedback error';
        confirmPassword.classList.add('error');
    } else if (confirmPassword.value) {
        feedback.textContent = 'Senhas coincidem';
        feedback.className = 'password-feedback success';
        confirmPassword.classList.remove('error');
    } else {
        feedback.textContent = '';
        confirmPassword.classList.remove('error');
    }
}

function validatePasswordStrength(input) {
    const value = input.value;
    const strengthIndicator = input.parentElement.querySelector('.password-strength');
    
    if (!strengthIndicator) {
        const indicator = document.createElement('div');
        indicator.className = 'password-strength';
        input.parentElement.appendChild(indicator);
    }
    
    let strength = 0;
    let feedback = '';
    
    if (value.length >= 8) strength++;
    if (/[A-Z]/.test(value)) strength++;
    if (/[0-9]/.test(value)) strength++;
    if (/[^A-Za-z0-9]/.test(value)) strength++;
    
    switch (strength) {
        case 0:
        case 1:
            feedback = 'Senha fraca';
            break;
        case 2:
        case 3:
            feedback = 'Senha média';
            break;
        case 4:
            feedback = 'Senha forte';
            break;
    }
    
    if (strengthIndicator) {
        strengthIndicator.textContent = feedback;
        strengthIndicator.className = `password-strength strength-${strength}`;
    }
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showInputError(input, message) {
    let errorElement = input.parentElement.querySelector('.input-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'input-error';
        input.parentElement.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

function clearInputError(input) {
    const errorElement = input.parentElement.querySelector('.input-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Enhanced scroll effects with debouncing
const debouncedScroll = debounce(() => {
    // Parallax effect for hero section
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.course-hero');
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Add global CSS styles
const globalStyles = document.createElement('style');
globalStyles.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .fade-in-visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .theme-transition {
        transition: all 0.6s ease !important;
    }
    
    .image-loading {
        opacity: 0;
        transition: opacity 0.6s ease;
    }
    
    .image-loaded {
        opacity: 1;
    }
    
    .ripple-effect {
        z-index: 1;
    }
    
    .input-error {
        color: #dc2626;
        font-size: 0.8rem;
        margin-top: 0.25rem;
    }
    
    .password-strength {
        font-size: 0.8rem;
        margin-top: 0.25rem;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        text-align: center;
    }
    
    .strength-0, .strength-1 {
        background: #fee2e2;
        color: #dc2626;
    }
    
    .strength-2, .strength-3 {
        background: #fef3c7;
        color: #d97706;
    }
    
    .strength-4 {
        background: #d1fae5;
        color: #059669;
    }
    
    .form-group.focused label {
        color: var(--primary);
        transform: translateY(-2px);
    }
    
    .form-group.has-value label {
        color: var(--primary);
    }
    
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;

document.head.appendChild(globalStyles);

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PremiumCarousel,
        createRippleEffect,
        validatePassword,
        isValidEmail
    };
}