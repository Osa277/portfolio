// Checkout Page JavaScript
let currentStep = 1;
let orderData = {
    shipping: {},
    payment: {},
    items: []
};

// Initialize checkout
document.addEventListener('DOMContentLoaded', function() {
    initializeCheckout();
    loadCartItems();
    setupEventListeners();
    updateStepDisplay();
});

// Initialize checkout functionality
function initializeCheckout() {
    // Load cart data from localStorage or session
    const cartData = localStorage.getItem('cartItems');
    if (cartData) {
        orderData.items = JSON.parse(cartData);
    } else {
        // Demo items if no cart data
        orderData.items = [
            {
                id: 1,
                name: 'Premium Black Timberland®',
                price: 129.99,
                quantity: 1,
                size: '9',
                color: 'Black',
                image: 'https://via.placeholder.com/80x80?text=Product'
            }
        ];
    }
    
    updateOrderSummary();
}

// Setup event listeners
function setupEventListeners() {
    // Payment method selection
    const paymentMethods = document.querySelectorAll('.payment-method');
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            selectPaymentMethod(this.dataset.method);
        });
    });

    // Shipping option changes
    const shippingOptions = document.querySelectorAll('input[name="shipping"]');
    shippingOptions.forEach(option => {
        option.addEventListener('change', updateShippingCost);
    });

    // Form validation
    const forms = document.querySelectorAll('.checkout-form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearErrors);
        });
    });

    // Card number formatting
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', formatCardNumber);
    }

    // Expiry date formatting
    const expiryInput = document.getElementById('expiryDate');
    if (expiryInput) {
        expiryInput.addEventListener('input', formatExpiryDate);
    }

    // CVV validation
    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', validateCVV);
    }
}

// Navigation functions
function nextStep() {
    if (validateCurrentStep()) {
        saveCurrentStepData();
        currentStep++;
        updateStepDisplay();
        
        if (currentStep === 3) {
            populateReviewSection();
        }
    }
}

function prevStep() {
    currentStep--;
    updateStepDisplay();
}

function goToStep(step) {
    currentStep = step;
    updateStepDisplay();
}

// Update step display
function updateStepDisplay() {
    // Update step indicators
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        if (index + 1 <= currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });

    // Show current form section
    const sections = document.querySelectorAll('.form-section');
    sections.forEach((section, index) => {
        if (index + 1 === currentStep) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Validation functions
function validateCurrentStep() {
    switch (currentStep) {
        case 1:
            return validateShippingForm();
        case 2:
            return validatePaymentForm();
        default:
            return true;
    }
}

function validateShippingForm() {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zipCode'];
    let isValid = true;

    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field || !field.value.trim()) {
            showFieldError(field, 'This field is required');
            isValid = false;
        }
    });

    // Email validation
    const email = document.getElementById('email');
    if (email && email.value && !isValidEmail(email.value)) {
        showFieldError(email, 'Please enter a valid email address');
        isValid = false;
    }

    // Phone validation
    const phone = document.getElementById('phone');
    if (phone && phone.value && !isValidPhone(phone.value)) {
        showFieldError(phone, 'Please enter a valid phone number');
        isValid = false;
    }

    return isValid;
}

function validatePaymentForm() {
    const activeMethod = document.querySelector('.payment-method.active');
    if (!activeMethod) {
        alert('Please select a payment method');
        return false;
    }

    const method = activeMethod.dataset.method;
    
    if (method === 'card') {
        return validateCardForm();
    }
    
    return true; // PayPal and Apple Pay handled separately
}

function validateCardForm() {
    const cardNumber = document.getElementById('cardNumber');
    const cardName = document.getElementById('cardName');
    const expiryDate = document.getElementById('expiryDate');
    const cvv = document.getElementById('cvv');
    
    let isValid = true;

    if (!cardNumber.value || !isValidCardNumber(cardNumber.value)) {
        showFieldError(cardNumber, 'Please enter a valid card number');
        isValid = false;
    }

    if (!cardName.value.trim()) {
        showFieldError(cardName, 'Please enter the cardholder name');
        isValid = false;
    }

    if (!expiryDate.value || !isValidExpiryDate(expiryDate.value)) {
        showFieldError(expiryDate, 'Please enter a valid expiry date');
        isValid = false;
    }

    if (!cvv.value || !isValidCVV(cvv.value)) {
        showFieldError(cvv, 'Please enter a valid CVV');
        isValid = false;
    }

    return isValid;
}

function validateField(event) {
    const field = event.target;
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

    return true;
}

// Helper validation functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

function isValidCardNumber(cardNumber) {
    const cleanNumber = cardNumber.replace(/\s/g, '');
    return /^\d{13,19}$/.test(cleanNumber) && luhnCheck(cleanNumber);
}

function isValidExpiryDate(expiry) {
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!regex.test(expiry)) return false;
    
    const [month, year] = expiry.split('/');
    const expDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
    const today = new Date();
    
    return expDate > today;
}

function isValidCVV(cvv) {
    return /^\d{3,4}$/.test(cvv);
}

function luhnCheck(cardNumber) {
    let sum = 0;
    let isEven = false;
    
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber.charAt(i));
        
        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        
        sum += digit;
        isEven = !isEven;
    }
    
    return sum % 10 === 0;
}

// Error handling
function showFieldError(field, message) {
    clearFieldError(field);
    
    field.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

function clearErrors() {
    clearFieldError(this);
}

// Payment method selection
function selectPaymentMethod(method) {
    // Update active payment method
    document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('active'));
    document.querySelector(`[data-method="${method}"]`).classList.add('active');
    
    // Show appropriate form
    document.querySelectorAll('.payment-form').forEach(form => form.style.display = 'none');
    document.querySelector(`.${method}-form`).style.display = 'block';
}

// Formatting functions
function formatCardNumber(event) {
    let value = event.target.value.replace(/\s/g, '');
    let formattedValue = '';
    
    for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formattedValue += ' ';
        }
        formattedValue += value[i];
    }
    
    event.target.value = formattedValue;
}

function formatExpiryDate(event) {
    let value = event.target.value.replace(/\D/g, '');
    
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    
    event.target.value = value;
}

function validateCVV(event) {
    event.target.value = event.target.value.replace(/\D/g, '').substring(0, 4);
}

// Data management
function saveCurrentStepData() {
    switch (currentStep) {
        case 1:
            saveShippingData();
            break;
        case 2:
            savePaymentData();
            break;
    }
}

function saveShippingData() {
    const form = document.getElementById('shipping-form');
    const formData = new FormData(form);
    
    orderData.shipping = {};
    for (let [key, value] of formData.entries()) {
        orderData.shipping[key] = value;
    }
}

function savePaymentData() {
    const activeMethod = document.querySelector('.payment-method.active');
    orderData.payment.method = activeMethod.dataset.method;
    
    if (orderData.payment.method === 'card') {
        const cardNumber = document.getElementById('cardNumber').value;
        orderData.payment.cardLast4 = cardNumber.slice(-4);
        orderData.payment.cardName = document.getElementById('cardName').value;
    }
}

// Order summary updates
function updateOrderSummary() {
    updateSummaryItems();
    updateCalculations();
}

function updateSummaryItems() {
    const summaryItems = document.getElementById('summary-items');
    summaryItems.innerHTML = '';
    
    orderData.items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'summary-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h4>${item.name}</h4>
                <p>Size: ${item.size} | Color: ${item.color}</p>
                <p>Qty: ${item.quantity}</p>
            </div>
            <div class="item-price">$${(item.price * item.quantity).toFixed(2)}</div>
        `;
        summaryItems.appendChild(itemElement);
    });
}

function updateCalculations() {
    const subtotal = orderData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingCost = getShippingCost();
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shippingCost + tax;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('shipping-cost').textContent = shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`;
    document.getElementById('tax-amount').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total-amount').textContent = `$${total.toFixed(2)}`;
}

function getShippingCost() {
    const selectedShipping = document.querySelector('input[name="shipping"]:checked');
    if (!selectedShipping) return 0;
    
    switch (selectedShipping.value) {
        case 'standard':
            return 0;
        case 'express':
            return 9.99;
        case 'overnight':
            return 24.99;
        default:
            return 0;
    }
}

function updateShippingCost() {
    updateCalculations();
}

// Review section
function populateReviewSection() {
    populateShippingReview();
    populatePaymentReview();
    populateItemsReview();
}

function populateShippingReview() {
    const reviewElement = document.getElementById('review-shipping');
    const shipping = orderData.shipping;
    
    reviewElement.innerHTML = `
        <p><strong>${shipping.firstName} ${shipping.lastName}</strong></p>
        <p>${shipping.address}</p>
        <p>${shipping.city}, ${shipping.state} ${shipping.zipCode}</p>
        <p>Phone: ${shipping.phone}</p>
        <p>Email: ${shipping.email}</p>
        <p><strong>Shipping Method:</strong> ${getShippingMethodName()}</p>
    `;
}

function populatePaymentReview() {
    const reviewElement = document.getElementById('review-payment');
    const payment = orderData.payment;
    
    if (payment.method === 'card') {
        reviewElement.innerHTML = `
            <p><strong>Credit/Debit Card</strong></p>
            <p>**** **** **** ${payment.cardLast4}</p>
            <p>${payment.cardName}</p>
        `;
    } else {
        reviewElement.innerHTML = `
            <p><strong>${payment.method.charAt(0).toUpperCase() + payment.method.slice(1)}</strong></p>
        `;
    }
}

function populateItemsReview() {
    const reviewElement = document.getElementById('review-items');
    reviewElement.innerHTML = '';
    
    orderData.items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'review-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="review-item-details">
                <h4>${item.name}</h4>
                <p>Size: ${item.size} | Color: ${item.color}</p>
                <p>Quantity: ${item.quantity}</p>
            </div>
            <div class="review-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
        `;
        reviewElement.appendChild(itemElement);
    });
}

function getShippingMethodName() {
    const selectedShipping = document.querySelector('input[name="shipping"]:checked');
    if (!selectedShipping) return 'Standard Shipping';
    
    switch (selectedShipping.value) {
        case 'standard':
            return 'Standard Shipping (5-7 business days)';
        case 'express':
            return 'Express Shipping (2-3 business days)';
        case 'overnight':
            return 'Overnight Shipping (1 business day)';
        default:
            return 'Standard Shipping';
    }
}

// Promo code
function applyPromoCode() {
    const promoCode = document.getElementById('promoCode').value.toUpperCase();
    const discountRow = document.getElementById('discount-row');
    const discountAmount = document.getElementById('discount-amount');
    
    // Demo promo codes
    const promoCodes = {
        'SAVE10': 0.10,
        'WELCOME20': 0.20,
        'STUDENT': 0.15
    };
    
    if (promoCodes[promoCode]) {
        const subtotal = orderData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const discount = subtotal * promoCodes[promoCode];
        
        discountRow.style.display = 'flex';
        discountAmount.textContent = `-$${discount.toFixed(2)}`;
        
        // Update total
        updateCalculations();
        
        // Show success message
        showPromoSuccess(`Promo code applied! ${(promoCodes[promoCode] * 100)}% discount`);
    } else {
        showPromoError('Invalid promo code');
    }
}

function showPromoSuccess(message) {
    const promoInput = document.getElementById('promoCode');
    promoInput.style.borderColor = '#10b981';
    
    // Create or update message
    let messageEl = document.querySelector('.promo-message');
    if (!messageEl) {
        messageEl = document.createElement('div');
        messageEl.className = 'promo-message';
        promoInput.parentNode.appendChild(messageEl);
    }
    
    messageEl.textContent = message;
    messageEl.style.color = '#10b981';
    messageEl.style.fontSize = '0.9rem';
    messageEl.style.marginTop = '0.5rem';
}

function showPromoError(message) {
    const promoInput = document.getElementById('promoCode');
    promoInput.style.borderColor = '#ef4444';
    
    // Create or update message
    let messageEl = document.querySelector('.promo-message');
    if (!messageEl) {
        messageEl = document.createElement('div');
        messageEl.className = 'promo-message';
        promoInput.parentNode.appendChild(messageEl);
    }
    
    messageEl.textContent = message;
    messageEl.style.color = '#ef4444';
    messageEl.style.fontSize = '0.9rem';
    messageEl.style.marginTop = '0.5rem';
}

// Order placement
function placeOrder() {
    const acceptTerms = document.getElementById('acceptTerms');
    if (!acceptTerms.checked) {
        alert('Please accept the terms and conditions to continue.');
        return;
    }
    
    // Show loading
    showLoading();
    
    // Simulate order processing
    setTimeout(() => {
        hideLoading();
        showSuccessModal();
        
        // Clear cart
        localStorage.removeItem('cartItems');
        
        // Generate order number
        const orderNumber = generateOrderNumber();
        document.getElementById('orderNumber').textContent = orderNumber;
        
        // Set estimated delivery
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 5);
        document.getElementById('estimatedDelivery').textContent = deliveryDate.toLocaleDateString();
        
    }, 3000);
}

function generateOrderNumber() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `#ORD-${timestamp.toString().slice(-6)}-${random.toString().padStart(3, '0')}`;
}

function showLoading() {
    document.getElementById('loadingOverlay').classList.add('show');
}

function hideLoading() {
    document.getElementById('loadingOverlay').classList.remove('show');
}

function showSuccessModal() {
    document.getElementById('successModal').classList.add('show');
}

// Modal actions
function trackOrder() {
    alert('Order tracking functionality would be implemented here');
    window.location.href = '../index.html';
}

function continueShopping() {
    window.location.href = '../index.html';
}

// Cart loading
function loadCartItems() {
    // This would typically load from localStorage or API
    // For demo purposes, we'll use the initialized items
    updateOrderSummary();
}

// Initialize when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCheckout);
} else {
    initializeCheckout();
}
