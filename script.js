// Enhanced Portfolio JavaScript with Error Handling and Performance Optimizations

// Utility Functions
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Error Logging
const logError = (error, context = 'Unknown') => {
    console.error(`[Portfolio Error - ${context}]:`, error);
    // In production, you might want to send this to an error tracking service
};

// Performance Monitoring
const performanceMetrics = {
    startTime: performance.now(),
    markEvent: (eventName) => {
        const time = performance.now();
        console.log(`[Performance] ${eventName}: ${(time - performanceMetrics.startTime).toFixed(2)}ms`);
    }
};

// Enhanced Button Interactions
function enhanceButtonInteractions() {
    try {
        // Add ripple effect to buttons
        const buttons = $$('.btn, .mobile-btn, .mobile-nav-item');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Create ripple effect
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                    z-index: 10;
                `;
                
                // Add ripple animation keyframes if not already added
                if (!document.querySelector('#ripple-styles')) {
                    const style = document.createElement('style');
                    style.id = 'ripple-styles';
                    style.textContent = `
                        @keyframes ripple {
                            to {
                                transform: scale(2);
                                opacity: 0;
                            }
                        }
                    `;
                    document.head.appendChild(style);
                }
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.parentNode.removeChild(ripple);
                    }
                }, 600);
            });
            
            // Add touch feedback
            button.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            button.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                }, 100);
            });
        });
        
        performanceMetrics.markEvent('Button interactions enhanced');
    } catch (error) {
        logError(error, 'Button Interactions');
    }
}

// Enhanced Navigation Active States
function enhanceNavigationStates() {
    try {
        const navLinks = $$('.nav-link, .mobile-nav-item');
        const sections = $$('section[id]');
        
        // Update active states on scroll
        const updateActiveStates = () => {
            const scrollPos = window.scrollY + 100;
            
            sections.forEach(section => {
                const top = section.offsetTop;
                const bottom = top + section.offsetHeight;
                const id = section.getAttribute('id');
                
                if (scrollPos >= top && scrollPos <= bottom) {
                    // Remove active class from all links
                    navLinks.forEach(link => link.classList.remove('active'));
                    
                    // Add active class to current section links
                    const currentLinks = $$(`[href="#${id}"], [href*="${id}"]`);
                    currentLinks.forEach(link => link.classList.add('active'));
                }
            });
        };
        
        // Throttled scroll listener
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) return;
            scrollTimeout = setTimeout(() => {
                updateActiveStates();
                scrollTimeout = null;
            }, 10);
        });
        
        // Initial update
        updateActiveStates();
        
        performanceMetrics.markEvent('Navigation states enhanced');
    } catch (error) {
        logError(error, 'Navigation States');
    }
}

// Enhanced Preloader with Error Handling
window.addEventListener('load', () => {
    try {
        const preloader = $('#preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
                document.body.style.overflow = 'visible';
                performanceMetrics.markEvent('Preloader Hidden');
            }, 500);
        }
        
        // Initialize enhancements after page load
        enhanceButtonInteractions();
        enhanceNavigationStates();
        initializeSmoothScrolling();
        
    } catch (error) {
        logError(error, 'Page Load');
    }
});

// Mobile Menu Overlay Functionality
// Enhanced Real-time Clock with Error Recovery
function updateTime() {
    try {
        const timeElement = $('#time');
        if (!timeElement) return;
        
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        hours = hours % 12;
        hours = hours ? hours : 12; // 0 should be 12
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        
        const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;
        timeElement.textContent = timeString;
    } catch (error) {
        logError(error, 'Clock Update');
        // Retry after a delay
        setTimeout(updateTime, 5000);
    }
}

// Update time every second with error handling
const clockInterval = setInterval(() => {
    try {
        updateTime();
    } catch (error) {
        logError(error, 'Clock Interval');
        clearInterval(clockInterval);
        // Restart clock after error
        setTimeout(() => {
            setInterval(updateTime, 1000);
        }, 5000);
    }
}, 1000);

updateTime(); // Initial call

// Enhanced Mobile Navigation with Accessibility
const initializeMobileNavigation = () => {
    try {
        const hamburger = $('.hamburger');
        const navMenu = $('.nav-menu');

        if (!hamburger || !navMenu) {
            console.warn('[Navigation] Mobile navigation elements not found');
            return;
        }

        // Add ARIA attributes for accessibility
        hamburger.setAttribute('aria-label', 'Toggle navigation menu');
        hamburger.setAttribute('aria-expanded', 'false');
        navMenu.setAttribute('aria-hidden', 'true');

        hamburger.addEventListener('click', (e) => {
            try {
                e.preventDefault();
                const isActive = hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                
                // Update ARIA attributes
                hamburger.setAttribute('aria-expanded', isActive.toString());
                navMenu.setAttribute('aria-hidden', (!isActive).toString());
                
                performanceMetrics.markEvent('Mobile Menu Toggled');
            } catch (error) {
                logError(error, 'Mobile Menu Toggle');
            }
        });

        // Close mobile menu when clicking on a link
        $$('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                try {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                    navMenu.setAttribute('aria-hidden', 'true');
                } catch (error) {
                    logError(error, 'Mobile Menu Link Click');
                }
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                try {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                    navMenu.setAttribute('aria-hidden', 'true');
                } catch (error) {
                    logError(error, 'Mobile Menu Escape');
                }
            }
        });

        performanceMetrics.markEvent('Mobile Navigation Initialized');
    } catch (error) {
        logError(error, 'Mobile Navigation Initialization');
    }
};

// Initialize mobile navigation
// initializeMobileNavigation(); // Moved to page load event

// Mobile form handling
function initMobileForms() {
    const mobileContactForm = document.getElementById('mobileContactForm');
    
    if (mobileContactForm) {
        mobileContactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(mobileContactForm);
            const data = Object.fromEntries(formData);
            
            // Show loading state
            const submitBtn = mobileContactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual submission logic)
            setTimeout(() => {
                alert('Thank you for your message! I\'ll get back to you soon.');
                mobileContactForm.reset();
                
                // Restore button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Touch gesture enhancements for mobile
function initTouchEnhancements() {
    // Add touch feedback to mobile buttons
    const mobileButtons = document.querySelectorAll('.mobile-btn, .mobile-nav-item, .mobile-portfolio-link');
    
    mobileButtons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Enhanced touch scrolling for mobile portfolio
    const mobilePortfolio = document.querySelector('.mobile-portfolio');
    if (mobilePortfolio) {
        let isScrolling = false;
        
        mobilePortfolio.addEventListener('touchstart', () => {
            isScrolling = true;
        });
        
        mobilePortfolio.addEventListener('touchend', () => {
            setTimeout(() => {
                isScrolling = false;
            }, 100);
        });
    }
}

// Device detection and responsive adjustments
function detectDevice() {
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
    
    // Add device classes to body
    document.body.classList.remove('mobile-device', 'tablet-device', 'desktop-device');
    
    if (isMobile) {
        document.body.classList.add('mobile-device');
    } else if (isTablet) {
        document.body.classList.add('tablet-device');
    } else {
        document.body.classList.add('desktop-device');
    }
    
    // Adjust viewport height for mobile browsers
    if (isMobile) {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
}

// Initialize responsive features
function initResponsiveFeatures() {
    detectDevice();
    
    // Re-detect on resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            detectDevice();
        }, 250);
    });
    
    // Initialize mobile-specific features only on mobile
    if (window.innerWidth <= 768) {
        initMobileNavigation();
        initMobileForms();
        initTouchEnhancements();
    }
}

// Active navigation highlighting
function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
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

// Enhanced Smooth Scrolling for all navigation links
function initializeSmoothScrolling() {
    try {
        // Get all navigation links (desktop and mobile)
        const allNavLinks = $$('a[href^="#"], .nav-link[href^="#"], .mobile-nav-item[href^="#"], .mobile-btn[href^="#"], .btn[href^="#"]');
        
        allNavLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Only handle internal links that start with #
                if (href && href.startsWith('#') && href !== '#') {
                    e.preventDefault();
                    
                    let targetId = href.substring(1);
                    let targetElement = document.getElementById(targetId);
                    
                    // If target not found, try mobile version
                    if (!targetElement && window.innerWidth <= 768) {
                        const mobileTargetId = `mobile-${targetId}`;
                        targetElement = document.getElementById(mobileTargetId);
                        if (targetElement) {
                            targetId = mobileTargetId;
                        }
                    }
                    
                    // If still not found, try desktop version when on mobile
                    if (!targetElement && window.innerWidth <= 768) {
                        // For mobile, map certain links to existing sections
                        const mobileMapping = {
                            'services': 'mobile-services',
                            'projects': 'mobile-projects', 
                            'contact': 'mobile-contact',
                            'home': 'about' // On mobile, home button goes to about since mobile hero is always visible
                        };
                        
                        if (mobileMapping[targetId]) {
                            targetElement = document.getElementById(mobileMapping[targetId]);
                            targetId = mobileMapping[targetId];
                        }
                    }
                    
                    // Final fallback - if target still not found, try common alternatives
                    if (!targetElement) {
                        const fallbackMapping = {
                            'work': 'projects',
                            'portfolio': 'projects',
                            'get-in-touch': 'contact',
                            'touch': 'contact'
                        };
                        
                        const fallbackTarget = fallbackMapping[targetId];
                        if (fallbackTarget) {
                            targetElement = document.getElementById(fallbackTarget);
                            if (!targetElement && window.innerWidth <= 768) {
                                // Try mobile version of fallback
                                targetElement = document.getElementById(`mobile-${fallbackTarget}`);
                            }
                        }
                    }
                    
                    if (targetElement) {
                        // Calculate header offset
                        const headerHeight = 80;
                        const elementPosition = targetElement.offsetTop;
                        const offsetPosition = elementPosition - headerHeight;
                        
                        // Smooth scroll to target
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                        
                        // Update active states for mobile navigation
                        const mobileNavItems = $$('.mobile-nav-item');
                        mobileNavItems.forEach(item => {
                            item.classList.remove('active');
                            // Match original href for active state
                            if (item.getAttribute('href') === href) {
                                item.classList.add('active');
                            }
                        });
                        
                        // Close mobile menu if open
                        const hamburger = $('.hamburger');
                        const navMenu = $('.nav-menu');
                        if (hamburger && navMenu) {
                            hamburger.classList.remove('active');
                            navMenu.classList.remove('active');
                        }
                        
                        performanceMetrics.markEvent(`Smooth scroll to ${targetId}`);
                    } else {
                        console.warn(`Target element not found: ${targetId}`);
                    }
                }
            });
        });
        
        performanceMetrics.markEvent('Smooth scrolling initialized');
    } catch (error) {
        logError(error, 'Smooth Scrolling Initialization');
    }
}

// Performance optimization: Debounce function
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

// Consolidated scroll event handler to prevent conflicts
const navbar = document.querySelector('.navbar');

const handleScroll = debounce(() => {
    const currentScroll = window.pageYOffset;
    
    // Navbar scroll effect
    if (navbar) {
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Back to top button visibility
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        if (currentScroll > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }
    
    // Active section highlighting
    highlightActiveSection();
    
    // Parallax effect for hero section
    const parallax = document.querySelector('.hero');
    if (parallax && currentScroll < window.innerHeight) {
        const speed = currentScroll * 0.2;
        parallax.style.transform = `translateY(${speed}px)`;
    }
}, 10);

// Single scroll event listener
window.addEventListener('scroll', handleScroll);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Counter animation for hero stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
            } else {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            }
        };
        
        updateCounter();
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Trigger counter animation for hero stats
            if (entry.target.classList.contains('hero')) {
                setTimeout(animateCounters, 500);
            }
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card, .about-container, .hero').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Portfolio filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            
            if (filterValue === 'all' || itemCategory === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Contact form handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        if (submitBtn) {
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');
            
            // Simulate form submission
            setTimeout(() => {
                showNotification('Thank you for your message! I will get back to you soon.', 'success');
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
            }, 2000);
        }
    });
}

// Newsletter form handling - fixed for div structure
const newsletterForms = document.querySelectorAll('.newsletter-form');

newsletterForms.forEach(form => {
    const submitBtn = form.querySelector('button[type="submit"]');
    const emailInput = form.querySelector('input[type="email"]');
    
    if (submitBtn && emailInput) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const email = emailInput.value;
            
            if (!email) {
                showNotification('Please enter your email address.', 'error');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            showNotification('Thank you for subscribing to our newsletter!', 'success');
            emailInput.value = '';
        });
    }
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#d1ecf1'};
        color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0c5460'};
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 400px;
        border-left: 4px solid ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
    `;
    
    // Style notification content
    const notificationContent = notification.querySelector('.notification-content');
    if (notificationContent) {
        notificationContent.style.cssText = `
            display: flex;
            align-items: center;
            gap: 0.75rem;
        `;
    }
    
    // Style close button
    const closeBtn = notification.querySelector('.notification-close');
    if (closeBtn) {
        closeBtn.style.cssText = `
            background: none;
            border: none;
            font-size: 1.2rem;
            cursor: pointer;
            color: inherit;
            margin-left: auto;
        `;
        
        // Close functionality
        closeBtn.addEventListener('click', () => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        });
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto close after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Back to top button functionality
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Lazy loading for images
const images = document.querySelectorAll('img[data-src]');

if (images.length > 0) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when hero section is in view
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !heroTitle.dataset.typed) {
                setTimeout(() => {
                    typeWriter(heroTitle, 'Asiyanbi Olalekan Samuel', 150);
                    heroTitle.dataset.typed = 'true';
                }, 1000);
            }
        });
    }, { threshold: 0.5 });

    heroObserver.observe(heroTitle);
}

// Skills animation
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Testimonials slider functionality
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.style.display = i === index ? 'block' : 'none';
    });
}

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
        
        // Close any open notifications
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => notification.remove());
    }
});

// Theme detection and handling
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark-theme');
}

// Handle theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (e.matches) {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
});

// Error handling for failed resource loads
window.addEventListener('error', (e) => {
    if (e.target && e.target.tagName === 'IMG') {
        e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
        e.target.alt = 'Image not found';
    }
});

// Initialize all functions when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initial setup
    highlightActiveSection();
    
    // Add smooth reveal animations to elements
    const elementsToAnimate = document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    console.log('Portfolio website initialized successfully!');
});

// Initialize all responsive features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initResponsiveFeatures();
});
