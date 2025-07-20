// Discount Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeDiscountPage();
});

function initializeDiscountPage() {
    setupMobileNavigation();
    setupCountdownTimer();
    setupFilters();
    setupProductInteractions();
}

function setupMobileNavigation() {
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

function setupCountdownTimer() {
    const timer = document.getElementById('countdownTimer');
    if (!timer) return;

    // Set end date (3 days from now for demo)
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 3);
    endDate.setHours(23, 59, 59, 999);

    function updateTimer() {
        const now = new Date().getTime();
        const distance = endDate.getTime() - now;

        if (distance < 0) {
            timer.innerHTML = '<div class="expired">Sale Ended!</div>';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

function setupFilters() {
    const discountFilter = document.getElementById('discountFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    const sortFilter = document.getElementById('sortFilter');

    if (discountFilter) {
        discountFilter.addEventListener('change', filterProducts);
    }
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterProducts);
    }
    if (sortFilter) {
        sortFilter.addEventListener('change', sortProducts);
    }
}

function filterProducts() {
    const discountFilter = document.getElementById('discountFilter').value;
    const categoryFilter = document.getElementById('categoryFilter').value;
    const products = document.querySelectorAll('.product-card');
    let visibleCount = 0;

    products.forEach(product => {
        const discount = parseInt(product.dataset.discount);
        const category = product.dataset.category;
        let showProduct = true;

        // Discount filter
        if (discountFilter !== 'all') {
            const [min, max] = discountFilter.split('-').map(Number);
            if (discount < min || (max && discount > max)) {
                showProduct = false;
            }
        }

        // Category filter
        if (categoryFilter !== 'all' && category !== categoryFilter) {
            showProduct = false;
        }

        product.style.display = showProduct ? 'block' : 'none';
        if (showProduct) visibleCount++;
    });

    updateResultsCount(visibleCount);
}

function sortProducts() {
    const sortValue = document.getElementById('sortFilter').value;
    const productsGrid = document.getElementById('productsGrid');
    const products = Array.from(productsGrid.querySelectorAll('.product-card'));

    products.sort((a, b) => {
        switch (sortValue) {
            case 'discount':
                return parseInt(b.dataset.discount) - parseInt(a.dataset.discount);
            case 'price-low':
                return parseFloat(a.querySelector('.sale-price').textContent.replace('$', '')) - 
                       parseFloat(b.querySelector('.sale-price').textContent.replace('$', ''));
            case 'price-high':
                return parseFloat(b.querySelector('.sale-price').textContent.replace('$', '')) - 
                       parseFloat(a.querySelector('.sale-price').textContent.replace('$', ''));
            case 'name':
                return a.querySelector('h3').textContent.localeCompare(b.querySelector('h3').textContent);
            default:
                return 0;
        }
    });

    products.forEach(product => productsGrid.appendChild(product));
}

function updateResultsCount(count) {
    const resultsCount = document.getElementById('resultsCount');
    if (resultsCount) {
        resultsCount.textContent = `${count} products found`;
    }
}

function setupProductInteractions() {
    // Add click events to buttons
    const addToCartBtns = document.querySelectorAll('.btn-add-to-cart');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', handleAddToCart);
    });

    const quickViewBtns = document.querySelectorAll('.btn-quick-view');
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', handleQuickView);
    });

    const wishlistBtns = document.querySelectorAll('.btn-wishlist');
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', handleWishlist);
    });
}

function handleAddToCart(e) {
    const button = e.currentTarget;
    const productCard = button.closest('.product-card');
    const productName = productCard.querySelector('h3').textContent;
    
    // Add loading state
    button.classList.add('loading');
    button.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        button.classList.remove('loading');
        button.disabled = false;
        
        // Show success message
        showToast(`${productName} added to cart!`, 'success');
        
        // Update button text temporarily
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Added!';
        button.style.background = '#28a745';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
        }, 2000);
    }, 1000);
}

function handleQuickView(e) {
    const button = e.currentTarget;
    const productCard = button.closest('.product-card');
    const productName = productCard.querySelector('h3').textContent;
    
    showToast(`Quick view for ${productName}`, 'info');
}

function handleWishlist(e) {
    const button = e.currentTarget;
    const icon = button.querySelector('i');
    const productCard = button.closest('.product-card');
    const productName = productCard.querySelector('h3').textContent;
    
    // Toggle wishlist state
    if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        button.style.color = '#ff6b6b';
        showToast(`${productName} added to wishlist!`, 'success');
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        button.style.color = '';
        showToast(`${productName} removed from wishlist`, 'info');
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
    
    // Add toast styles
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        transform: translateX(400px);
        transition: transform 0.3s ease;
        z-index: 10001;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        min-width: 300px;
        max-width: 400px;
    `;
    
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide toast
    setTimeout(() => {
        toast.style.transform = 'translateX(400px)';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Export functions for global access
window.quickView = function(id) {
    showToast(`Quick view for product ${id}`, 'info');
};

window.addToCart = function(id) {
    const button = document.querySelector(`[onclick="addToCart(${id})"]`);
    if (button) {
        handleAddToCart({ currentTarget: button });
    }
};

window.toggleWishlist = function(id) {
    const button = document.querySelector(`[onclick="toggleWishlist(${id})"]`);
    if (button) {
        handleWishlist({ currentTarget: button });
    }
};
