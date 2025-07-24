// Resume Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeResumePage();
});

function initializeResumePage() {
    initializeMobileMenu();
    initializePDFControls();
    initializeSmoothScrolling();
    initializeAnimations();
    initializeProjectInteractions();
    initializeContactLinks();
}

// Mobile Menu Functionality
function initializeMobileMenu() {
    console.log('Initializing mobile menu...');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    console.log('Mobile menu button found:', !!mobileMenuBtn);
    console.log('Nav links found:', !!navLinks);

    if (mobileMenuBtn && navLinks) {
        console.log('Both elements found, adding event listeners');
        
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Mobile menu button clicked');
            
            navLinks.classList.toggle('active');
            console.log('Menu is now:', navLinks.classList.contains('active') ? 'open' : 'closed');
            
            // Animate hamburger menu icon
            const icon = this.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.className = 'fas fa-times';
                this.setAttribute('aria-label', 'Close menu');
            } else {
                icon.className = 'fas fa-bars';
                this.setAttribute('aria-label', 'Open menu');
            }
        });

        // Close menu when clicking on a link
        const navLinkItems = navLinks.querySelectorAll('a');
        console.log('Found nav link items:', navLinkItems.length);
        
        navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                console.log('Nav link clicked, closing menu');
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.className = 'fas fa-bars';
                mobileMenuBtn.setAttribute('aria-label', 'Open menu');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.className = 'fas fa-bars';
                mobileMenuBtn.setAttribute('aria-label', 'Open menu');
            }
        });
    } else {
        console.log('Mobile menu elements not found!');
        if (!mobileMenuBtn) console.log('Missing: .mobile-menu-btn');
        if (!navLinks) console.log('Missing: .nav-links');
    }
}

// PDF Controls
function initializePDFControls() {
    const viewPDFBtn = document.querySelector('.view-btn');
    const pdfEmbedSection = document.querySelector('.pdf-embed-section');
    const pdfViewer = document.querySelector('#pdf-viewer');
    const pdfIframe = document.querySelector('#pdf-iframe');
    const fullscreenBtn = document.querySelector('.fullscreen-btn');
    const downloadBtn = document.querySelector('.download-btn');
    const hideBtn = document.querySelector('.hide-btn');

    // Make togglePdfView function global
    window.togglePdfView = function() {
        const pdfViewer = document.querySelector('#pdf-viewer');
        const toggleText = document.querySelector('#pdf-toggle-text');
        
        if (pdfViewer) {
            if (pdfViewer.style.display === 'none') {
                pdfViewer.style.display = 'block';
                if (toggleText) toggleText.textContent = 'Hide PDF';
            } else {
                pdfViewer.style.display = 'none';
                if (toggleText) toggleText.textContent = 'Show PDF';
            }
        }
    };

    // Show PDF viewer
    if (viewPDFBtn && pdfEmbedSection) {
        viewPDFBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Show the PDF section
            pdfEmbedSection.style.display = 'block';
            
            // Smooth scroll to PDF section
            pdfEmbedSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });

            // Load PDF if not already loaded
            if (pdfIframe && !pdfIframe.src) {
                pdfIframe.src = '../assets/Asiyanbi-full-stack-cv.pdf';
            }

            // Add loading animation
            pdfViewer.innerHTML = `
                <div class="pdf-loading">
                    <div class="loading-spinner"></div>
                    <p>Loading CV...</p>
                </div>
            `;

            // Simulate loading and then show iframe
            setTimeout(() => {
                pdfViewer.innerHTML = `
                    <iframe id="pdf-iframe" src="../assets/Asiyanbi-full-stack-cv.pdf" width="100%" height="800"></iframe>
                `;
            }, 1500);
        });
    }

    // Hide PDF viewer
    if (hideBtn && pdfEmbedSection) {
        hideBtn.addEventListener('click', function(e) {
            e.preventDefault();
            pdfEmbedSection.style.display = 'none';
            
            // Scroll back to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Fullscreen functionality
    if (fullscreenBtn && pdfViewer) {
        fullscreenBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (pdfViewer.requestFullscreen) {
                pdfViewer.requestFullscreen();
            } else if (pdfViewer.webkitRequestFullscreen) {
                pdfViewer.webkitRequestFullscreen();
            } else if (pdfViewer.msRequestFullscreen) {
                pdfViewer.msRequestFullscreen();
            }
        });
    }

    // Download functionality
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create download link
            const link = document.createElement('a');
            link.href = '../assets/Asiyanbi-full-stack-cv.pdf';
            link.download = 'Asiyanbi-Olalekan-Samuel-Resume.pdf';
            link.click();
            
            // Show download notification
            showNotification('CV download started!', 'success');
        });
    }
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll Animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe resume sections
    const resumeSections = document.querySelectorAll('.resume-section');
    resumeSections.forEach(section => {
        section.classList.add('animate-on-scroll');
        observer.observe(section);
    });

    // Observe project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.classList.add('animate-on-scroll');
        observer.observe(card);
    });
}

// Project Interactions
function initializeProjectInteractions() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const links = card.querySelectorAll('.project-links a');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                // Add click animation
                this.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    this.style.transform = 'scale(1.1)';
                }, 100);
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
            });
        });

        // Hover effects for project cards
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px)';
        });
    });
}

// Contact Links Functionality
function initializeContactLinks() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        const link = item.querySelector('a');
        
        if (link) {
            // Add click tracking
            link.addEventListener('click', function() {
                const contactType = this.parentElement.querySelector('i').className;
                console.log(`Contact clicked: ${contactType}`);
                
                // Show notification for email/phone
                if (contactType.includes('envelope')) {
                    showNotification('Opening email client...', 'info');
                } else if (contactType.includes('phone')) {
                    showNotification('Phone number copied to clipboard!', 'success');
                    copyToClipboard(this.textContent);
                }
            });
        }
        
        // Hover animations
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = '';
            }
        });
    });
}

// Utility Functions
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
}

function getNotificationIcon(type) {
    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    return colors[type] || colors.info;
}

function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Text copied to clipboard');
        }).catch(() => {
            fallbackCopyToClipboard(text);
        });
    } else {
        fallbackCopyToClipboard(text);
    }
}

function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        console.log('Text copied to clipboard (fallback)');
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
    
    document.body.removeChild(textArea);
}

// Skills Animation
function animateSkills() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach((tag, index) => {
        setTimeout(() => {
            tag.style.opacity = '0';
            tag.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                tag.style.transition = 'all 0.5s ease';
                tag.style.opacity = '1';
                tag.style.transform = 'translateY(0)';
            }, 100);
        }, index * 100);
    });
}

// Initialize skill animations when skills section is visible
function initializeSkillsAnimation() {
    const skillsSection = document.querySelector('#skills');
    
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(skillsSection);
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeResumePage();
    initializeSkillsAnimation();
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .animate-on-scroll.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .pdf-loading {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 400px;
        color: #666;
    }
    
    .loading-spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #667eea;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 1rem;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: auto;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .notification-close:hover {
        opacity: 0.7;
    }
    
    @media (max-width: 768px) {
        .nav-links.active {
            display: flex;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            flex-direction: column;
            padding: 1rem;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            border-radius: 0 0 16px 16px;
        }
        
        .notification {
            right: 10px !important;
            left: 10px !important;
            max-width: none !important;
        }
    }
`;
document.head.appendChild(style);
