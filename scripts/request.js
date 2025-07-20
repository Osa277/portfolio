// Request Form JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeRequestForm();
    initializeNavigation();
    initializeButtonEffects();
});

function initializeNavigation() {
    // Create mobile menu button if it doesn't exist
    const navContainer = document.querySelector('.nav-container');
    if (navContainer && !document.querySelector('.mobile-menu-btn')) {
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        navContainer.appendChild(mobileMenuBtn);
    }
    
    // Add click handlers for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    // Add brand click handler
    const navBrand = document.querySelector('.nav-brand');
    if (navBrand) {
        navBrand.addEventListener('click', () => {
            window.location.href = '../index.html';
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        const navLinks = document.querySelector('.nav-links');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        
        if (navLinks && navLinks.classList.contains('mobile-open') && 
            !navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            navLinks.classList.remove('mobile-open');
            updateMobileMenuIcon(false);
        }
    });
}

function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const isOpen = navLinks.classList.contains('mobile-open');
    
    if (isOpen) {
        navLinks.classList.remove('mobile-open');
    } else {
        navLinks.classList.add('mobile-open');
    }
    
    updateMobileMenuIcon(!isOpen);
}

function updateMobileMenuIcon(isOpen) {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn i');
    if (mobileMenuBtn) {
        mobileMenuBtn.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
    }
}

function handleNavClick(e) {
    const link = e.currentTarget;
    
    // Add click animation
    link.style.transform = 'scale(0.95)';
    setTimeout(() => {
        link.style.transform = '';
    }, 150);
    
    // Close mobile menu if open
    const navLinks = document.querySelector('.nav-links');
    if (navLinks && navLinks.classList.contains('mobile-open')) {
        navLinks.classList.remove('mobile-open');
        updateMobileMenuIcon(false);
    }
}

function initializeButtonEffects() {
    // Add ripple effect to all buttons
    const buttons = document.querySelectorAll('.btn-submit, .btn-reset, .btn-primary, .contact-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', createRippleEffect);
        button.classList.add('btn-ripple');
    });
    
    // Enhanced form submission
    const submitBtn = document.querySelector('.btn-submit');
    if (submitBtn) {
        submitBtn.addEventListener('click', handleSubmitClick);
    }
    
    // Reset button functionality
    const resetBtn = document.querySelector('.btn-reset');
    if (resetBtn) {
        resetBtn.addEventListener('click', handleResetClick);
    }
    
    // Contact button effects
    const contactBtns = document.querySelectorAll('.contact-btn');
    contactBtns.forEach(btn => {
        btn.addEventListener('click', handleContactClick);
    });
}

function createRippleEffect(e) {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    const existingRipple = button.querySelector('.ripple');
    if (existingRipple) {
        existingRipple.remove();
    }
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function handleSubmitClick(e) {
    const button = e.currentTarget;
    
    // Add loading state
    if (!button.disabled) {
        button.classList.add('btn-loading');
        button.disabled = true;
        
        // Reset after animation
        setTimeout(() => {
            button.classList.remove('btn-loading');
            button.disabled = false;
        }, 2000);
    }
}

function handleResetClick(e) {
    e.preventDefault();
    
    const confirmation = confirm('Are you sure you want to reset all form data? This action cannot be undone.');
    
    if (confirmation) {
        const form = document.getElementById('requestForm');
        form.reset();
        clearAllErrors();
        
        // Show success message
        showToast('Form reset successfully', 'info');
    }
}

function handleContactClick(e) {
    const button = e.currentTarget;
    const href = button.getAttribute('href');
    
    if (href.startsWith('tel:')) {
        showToast('Opening phone dialer...', 'info');
    } else if (href.startsWith('mailto:')) {
        showToast('Opening email client...', 'info');
    }
}

function showToast(message, type = 'success') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create new toast
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'exclamation' : 'info'}-circle toast-icon"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Hide toast
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

function initializeRequestForm() {
    const form = document.getElementById('requestForm');
    form.addEventListener('submit', handleFormSubmission);
    
    // Add real-time validation
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
    
    // Project type change handler
    const projectType = document.getElementById('projectType');
    projectType.addEventListener('change', handleProjectTypeChange);
}

function handleFormSubmission(e) {
    e.preventDefault();
    
    if (validateForm()) {
        submitRequest();
    }
}

function validateForm() {
    const requiredFields = [
        'firstName', 'lastName', 'email', 
        'projectType', 'projectTitle', 'projectDescription'
    ];
    
    let isValid = true;
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    clearFieldError(field);
    
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    // Specific validations
    switch (field.type) {
        case 'email':
            if (value && !isValidEmail(value)) {
                showFieldError(field, 'Please enter a valid email address');
                return false;
            }
            break;
        case 'tel':
            if (value && !isValidPhone(value)) {
                showFieldError(field, 'Please enter a valid phone number');
                return false;
            }
            break;
    }
    
    // Field-specific validations
    if (field.id === 'projectDescription' && value.length < 10) {
        showFieldError(field, 'Please provide a more detailed description (at least 10 characters)');
        return false;
    }
    
    return true;
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    if (typeof field === 'object' && field.target) {
        field = field.target;
    }
    
    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

function handleProjectTypeChange(e) {
    const projectType = e.target.value;
    const featuresField = document.getElementById('features');
    
    // Provide suggestions based on project type
    let placeholder = 'List the key features you need...';
    
    switch (projectType) {
        case 'website':
            placeholder = 'e.g., Contact form, photo gallery, blog, responsive design...';
            break;
        case 'mobile-app':
            placeholder = 'e.g., User authentication, push notifications, offline mode...';
            break;
        case 'ecommerce':
            placeholder = 'e.g., Product catalog, cart system, payment integration...';
            break;
        case 'web-app':
            placeholder = 'e.g., User dashboard, data visualization, real-time updates...';
            break;
        case 'api':
            placeholder = 'e.g., REST endpoints, authentication, rate limiting...';
            break;
    }
    
    featuresField.placeholder = placeholder;
}

function submitRequest() {
    const form = document.getElementById('requestForm');
    const formData = new FormData(form);
    
    // Convert form data to object
    const requestData = {};
    for (let [key, value] of formData.entries()) {
        if (requestData[key]) {
            // Handle multiple values (like checkboxes)
            if (Array.isArray(requestData[key])) {
                requestData[key].push(value);
            } else {
                requestData[key] = [requestData[key], value];
            }
        } else {
            requestData[key] = value;
        }
    }
    
    // Get selected technologies
    const technologies = [];
    const techCheckboxes = document.querySelectorAll('input[name="technologies"]:checked');
    techCheckboxes.forEach(checkbox => {
        technologies.push(checkbox.value);
    });
    requestData.technologies = technologies;
    
    // Show loading state
    showLoadingState();
    
    // Simulate API call
    setTimeout(() => {
        hideLoadingState();
        showSuccessModal();
        
        // Store request data (in real app, this would go to server)
        const requests = JSON.parse(localStorage.getItem('projectRequests') || '[]');
        requestData.id = Date.now();
        requestData.submittedAt = new Date().toISOString();
        requestData.status = 'pending';
        requests.push(requestData);
        localStorage.setItem('projectRequests', JSON.stringify(requests));
        
        // Reset form
        form.reset();
        clearAllErrors();
        
    }, 2000);
}

function showLoadingState() {
    const submitBtn = document.querySelector('.btn-submit');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
}

function hideLoadingState() {
    const submitBtn = document.querySelector('.btn-submit');
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Request';
}

function clearAllErrors() {
    const errorFields = document.querySelectorAll('.error');
    errorFields.forEach(field => {
        field.classList.remove('error');
    });
    
    const errorMessages = document.querySelectorAll('.field-error');
    errorMessages.forEach(message => {
        message.remove();
    });
}

function showSuccessModal() {
    document.getElementById('successModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('successModal').style.display = 'none';
}

// File upload handling
const fileInput = document.getElementById('files');
if (fileInput) {
    fileInput.addEventListener('change', handleFileSelection);
}

function handleFileSelection(e) {
    const files = e.target.files;
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png', 'gif'];
    
    let validFiles = [];
    let errors = [];
    
    for (let file of files) {
        if (file.size > maxSize) {
            errors.push(`${file.name} is too large (max 10MB)`);
            continue;
        }
        
        const extension = file.name.split('.').pop().toLowerCase();
        if (!allowedTypes.includes(extension)) {
            errors.push(`${file.name} has an unsupported file type`);
            continue;
        }
        
        validFiles.push(file);
    }
    
    if (errors.length > 0) {
        alert('File errors:\n' + errors.join('\n'));
    }
    
    // Update file input to only include valid files
    if (validFiles.length !== files.length) {
        const dt = new DataTransfer();
        validFiles.forEach(file => dt.items.add(file));
        fileInput.files = dt.files;
    }
}

// Form auto-save functionality
function autoSaveForm() {
    const form = document.getElementById('requestForm');
    const formData = new FormData(form);
    const autoSaveData = {};
    
    for (let [key, value] of formData.entries()) {
        autoSaveData[key] = value;
    }
    
    localStorage.setItem('requestFormDraft', JSON.stringify(autoSaveData));
}

// Load auto-saved data
function loadAutoSavedData() {
    const savedData = localStorage.getItem('requestFormDraft');
    if (savedData) {
        const data = JSON.parse(savedData);
        
        for (let [key, value] of Object.entries(data)) {
            const field = document.getElementById(key);
            if (field) {
                field.value = value;
            }
        }
        
        // Show notification
        showNotification('Draft restored from previous session', 'info');
    }
}

// Auto-save every 30 seconds
setInterval(autoSaveForm, 30000);

// Load auto-saved data on page load
document.addEventListener('DOMContentLoaded', loadAutoSavedData);

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-info-circle"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}
