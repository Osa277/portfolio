// Enhanced About Page JavaScript with Advanced Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileNavigation();
    initSkillAnimations();
    initParallaxEffects();
    initTypingAnimation();
    initScrollAnimations();
    initStatsCounters();
    initInteractiveStats();
    initTimelineAnimations();
    initFactCards();
    initSkillCategories();
    initCertificationHover();

    // Mobile Navigation
    function initMobileNavigation() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (mobileToggle && navLinks) {
            mobileToggle.addEventListener('click', function() {
                this.classList.toggle('active');
                navLinks.classList.toggle('mobile-active');
                document.body.classList.toggle('nav-open');
                
                // Animate hamburger menu
                const spans = this.querySelectorAll('span');
                spans.forEach((span, index) => {
                    if (this.classList.contains('active')) {
                        if (index === 0) span.style.transform = 'rotate(45deg) translateY(8px)';
                        if (index === 1) span.style.opacity = '0';
                        if (index === 2) span.style.transform = 'rotate(-45deg) translateY(-8px)';
                    } else {
                        span.style.transform = '';
                        span.style.opacity = '';
                    }
                });
            });

            // Close menu when clicking on links
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileToggle.classList.remove('active');
                    navLinks.classList.remove('mobile-active');
                    document.body.classList.remove('nav-open');
                    
                    const spans = mobileToggle.querySelectorAll('span');
                    spans.forEach(span => {
                        span.style.transform = '';
                        span.style.opacity = '';
                    });
                });
            });
        }
    }

    // Enhanced Skill Progress Animations
    function initSkillAnimations() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBar = entry.target;
                    const width = skillBar.getAttribute('data-width');
                    
                    setTimeout(() => {
                        skillBar.style.width = width + '%';
                        skillBar.style.opacity = '1';
                        
                        // Add shimmer effect
                        skillBar.classList.add('shimmer-effect');
                        
                        // Remove shimmer after animation
                        setTimeout(() => {
                            skillBar.classList.remove('shimmer-effect');
                        }, 2000);
                    }, Math.random() * 500);
                }
            });
        }, observerOptions);

        skillBars.forEach(bar => {
            skillObserver.observe(bar);
        });
    }

    // Enhanced Parallax Effects
    function initParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.hero-section, .floating-element');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            
            parallaxElements.forEach(element => {
                if (element.classList.contains('hero-section')) {
                    element.style.transform = `translateY(${rate}px)`;
                }
            });
        });

        // Floating elements animation
        const floatingElements = document.querySelectorAll('.floating-element');
        floatingElements.forEach((element, index) => {
            element.style.animationDelay = `${index * 0.5}s`;
        });
    }

    // Advanced Typing Animation
    function initTypingAnimation() {
        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (!heroSubtitle) return;

        const texts = [
            'Passionate Developer & Creative Problem Solver',
            'Full Stack Engineer & Tech Innovator',
            'Code Artist & Digital Solution Architect',
            'Software Craftsman & Technology Enthusiast'
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function typeWriter() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                heroSubtitle.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                heroSubtitle.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }

            setTimeout(typeWriter, typeSpeed);
        }

        // Start typing animation after a delay
        setTimeout(typeWriter, 1000);
    }

    // Enhanced Scroll Animations
    function initScrollAnimations() {
        const animateElements = document.querySelectorAll('.section-header, .service-card, .timeline-item, .fact-card, .skill-category, .overview-card, .highlight-card');
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Add staggered animation for child elements
                    const children = entry.target.querySelectorAll('.skill-item, .timeline-content, .fact-content');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animate-in');
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);

        animateElements.forEach(element => {
            scrollObserver.observe(element);
        });
    }

    // Enhanced Stats Counters
    function initStatsCounters() {
        const statNumbers = document.querySelectorAll('.hero-stats .stat-number');
        let hasAnimated = false;

        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;
                    animateStats();
                }
            });
        });

        if (statNumbers.length > 0) {
            statsObserver.observe(statNumbers[0].closest('.hero-stats'));
        }

        function animateStats() {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent.replace(/[^0-9]/g, ''));
                const suffix = stat.textContent.replace(/[0-9]/g, '');
                let current = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        stat.textContent = target + suffix;
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(current) + suffix;
                    }
                }, 50);
            });
        }
    }

    // Interactive Stats Animation
    function initInteractiveStats() {
        const interactiveStats = document.querySelectorAll('.interactive-stats .stat-item');
        
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statItem = entry.target;
                    const numberElement = statItem.querySelector('.stat-number');
                    const targetCount = parseInt(statItem.getAttribute('data-count'));
                    
                    animateCounter(numberElement, targetCount);
                    statsObserver.unobserve(statItem);
                }
            });
        }, { threshold: 0.5 });

        interactiveStats.forEach(stat => {
            statsObserver.observe(stat);
        });

        function animateCounter(element, target) {
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    element.textContent = target.toLocaleString();
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current).toLocaleString();
                }
            }, 20);
        }
    }

    // Timeline Animations
    function initTimelineAnimations() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-timeline');
                    
                    // Add achievement animations
                    const achievements = entry.target.querySelectorAll('.achievement');
                    achievements.forEach((achievement, index) => {
                        setTimeout(() => {
                            achievement.classList.add('animate-achievement');
                        }, (index + 1) * 200);
                    });
                }
            });
        }, { threshold: 0.3 });

        timelineItems.forEach(item => {
            timelineObserver.observe(item);
        });
    }

    // Enhanced Fact Cards
    function initFactCards() {
        const factCards = document.querySelectorAll('.fact-card');
        
        factCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px) scale(1.02)';
                this.style.boxShadow = '0 20px 40px rgba(102, 126, 234, 0.25)';
                
                // Add glow effect
                this.classList.add('card-glow');
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                this.classList.remove('card-glow');
            });

            // Click animation
            card.addEventListener('click', function() {
                this.style.animation = 'pulse 0.6s ease-in-out';
                setTimeout(() => {
                    this.style.animation = '';
                }, 600);
            });
        });

        // Initialize category tabs
        initCategoryTabs();

        // Quirky stats hover effects
        const quirkyItems = document.querySelectorAll('.quirky-item');
        quirkyItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1) rotate(5deg)';
                this.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                this.style.color = 'white';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotate(0deg)';
                this.style.background = '';
                this.style.color = '';
            });
        });
    }

    // Category Tabs Functionality
    function initCategoryTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const factCards = document.querySelectorAll('.fact-card');
        
        // Hide category-specific cards initially
        factCards.forEach(card => {
            if (card.classList.contains('personality-fact') || 
                card.classList.contains('hobbies-fact') || 
                card.classList.contains('tech-fact') || 
                card.classList.contains('random-fact')) {
                card.style.display = 'none';
            }
        });
        
        // Show personality facts by default
        showFactsByCategory('personality');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                tabButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get category from data attribute
                const category = this.getAttribute('data-category');
                
                // Show facts for selected category
                showFactsByCategory(category);
                
                // Add click animation
                this.style.animation = 'pulse 0.3s ease-in-out';
                setTimeout(() => {
                    this.style.animation = '';
                }, 300);
            });
        });
    }
    
    function showFactsByCategory(category) {
        const factCards = document.querySelectorAll('.fact-card');
        
        factCards.forEach(card => {
            const isAlwaysVisible = !card.classList.contains('personality-fact') && 
                                   !card.classList.contains('hobbies-fact') && 
                                   !card.classList.contains('tech-fact') && 
                                   !card.classList.contains('random-fact');
            
            if (isAlwaysVisible) {
                // Always show cards without category classes
                card.style.display = 'block';
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            } else if (card.classList.contains(`${category}-fact`)) {
                // Show cards matching the selected category
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 100);
            } else {
                // Hide other category cards
                card.style.opacity = '0';
                card.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
        
        // Animate the grid reorganization
        const factsGrid = document.querySelector('.facts-grid');
        if (factsGrid) {
            factsGrid.style.animation = 'fadeIn 0.5s ease-in-out';
            setTimeout(() => {
                factsGrid.style.animation = '';
            }, 500);
        }
    }

    // Skill Categories Enhancement
    function initSkillCategories() {
        const skillCategories = document.querySelectorAll('.skill-category');
        
        skillCategories.forEach(category => {
            const badge = category.querySelector('.category-badge');
            
            category.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                if (badge) {
                    badge.style.animation = 'pulse 2s infinite';
                }
            });
            
            category.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                if (badge) {
                    badge.style.animation = '';
                }
            });
        });

        // Skill details hover
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                const details = this.querySelector('.skill-details');
                if (details) {
                    details.style.opacity = '1';
                    details.style.transform = 'translateY(0)';
                }
            });
        });
    }

    // Certification Hover Effects
    function initCertificationHover() {
        const certItems = document.querySelectorAll('.cert-item');
        
        certItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
                this.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                this.style.color = 'white';
                this.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.3)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.background = '';
                this.style.color = '';
                this.style.boxShadow = '';
            });
        });
    }

    // Philosophy Cards Animation
    const philosophyCards = document.querySelectorAll('.philosophy-card');
    philosophyCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.03)';
            this.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            this.style.color = 'white';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.background = '';
            this.style.color = '';
        });
    });

    // Overview Cards Animation
    const overviewCards = document.querySelectorAll('.overview-card');
    overviewCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 15px 35px rgba(102, 126, 234, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });

    // Development Items Animation
    const developmentItems = document.querySelectorAll('.development-item');
    developmentItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.background = 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.background = '';
        });
    });

    // Navbar scroll effect
    function initNavbarScroll() {
        const navbar = document.querySelector('.nav-bar');
        if (!navbar) return;
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(20px)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.backdropFilter = 'blur(10px)';
            }
        });
    }
    
    initNavbarScroll();

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading animations
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Trigger initial animations
        setTimeout(() => {
            document.querySelector('.hero-section')?.classList.add('animate-in');
        }, 300);
    });

    // Performance optimization: Throttle scroll events
    let ticking = false;
    function updateScrollEffects() {
        // Update any scroll-based effects here
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });
});

// Add CSS animations for enhanced effects
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    @keyframes shimmer-effect {
        0% { background-position: -200px 0; }
        100% { background-position: calc(200px + 100%) 0; }
    }
    
    .shimmer-effect {
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
        background-size: 200px 100%;
        animation: shimmer-effect 2s ease-in-out;
    }
    
    .card-glow {
        box-shadow: 0 0 30px rgba(102, 126, 234, 0.3) !important;
    }
    
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .animate-timeline {
        opacity: 1;
        transform: translateX(0);
    }
    
    .animate-achievement {
        opacity: 1;
        transform: translateX(0);
    }
`;
document.head.appendChild(style);
