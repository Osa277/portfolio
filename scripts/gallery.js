// Gallery JavaScript - Enhanced Functionality
let currentImageIndex = 0;
let filteredImages = [];
let allImages = [];
let currentView = 'grid';
let isAutoplay = false;
let autoplayInterval;
let currentTheme = 'light';
let totalViews = 2847;
let totalDownloads = 456;

// Initialize gallery on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeGallery();
    loadStats();
    updateDimensions();
});

// Initialize gallery functionality
function initializeGallery() {
    allImages = Array.from(document.querySelectorAll('.gallery-item'));
    filteredImages = [...allImages];
    
    // Add click events to images
    allImages.forEach((item, index) => {
        const img = item.querySelector('img');
        img.addEventListener('click', () => openLightbox(index));
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', handleKeyNavigation);
    
    // Add window resize handler
    window.addEventListener('resize', updateDimensions);
    
    console.log('Gallery initialized with', allImages.length, 'images');
}

// Filter gallery by category
function filterGallery(category) {
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-filter="${category}"]`).classList.add('active');
    
    // Show loading spinner
    showLoading();
    
    // Filter images with animation
    setTimeout(() => {
        allImages.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease-in';
            } else {
                item.style.display = 'none';
            }
        });
        
        // Update filtered images array
        filteredImages = allImages.filter(item => 
            category === 'all' || item.dataset.category === category
        );
        
        hideLoading();
    }, 300);
}

// Open lightbox with image
function openLightbox(index) {
    currentImageIndex = index;
    const item = filteredImages[index] || allImages[index];
    const img = item.querySelector('img');
    const title = item.querySelector('h3').textContent;
    const description = item.querySelector('p').textContent;
    
    document.getElementById('lightboxImage').src = img.src;
    document.getElementById('lightboxTitle').textContent = title;
    document.getElementById('lightboxDescription').textContent = description;
    document.getElementById('lightboxModal').style.display = 'flex';
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Update view count
    updateViewCount();
}

// Close lightbox
function closeLightbox() {
    document.getElementById('lightboxModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    
    if (isAutoplay) {
        stopAutoplay();
    }
}

// Navigate to previous image
function previousImage() {
    currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : filteredImages.length - 1;
    updateLightboxImage();
}

// Navigate to next image
function nextImage() {
    currentImageIndex = currentImageIndex < filteredImages.length - 1 ? currentImageIndex + 1 : 0;
    updateLightboxImage();
}

// Update lightbox image
function updateLightboxImage() {
    const item = filteredImages[currentImageIndex];
    const img = item.querySelector('img');
    const title = item.querySelector('h3').textContent;
    const description = item.querySelector('p').textContent;
    
    document.getElementById('lightboxImage').src = img.src;
    document.getElementById('lightboxTitle').textContent = title;
    document.getElementById('lightboxDescription').textContent = description;
}

// Download image
function downloadImage(index) {
    const item = allImages[index];
    const img = item.querySelector('img');
    const title = item.querySelector('h3').textContent;
    
    // Create download link
    const link = document.createElement('a');
    link.href = img.src;
    link.download = `${title.replace(/\s+/g, '_')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Update download count
    updateDownloadCount();
    
    // Show success message
    showMessage('Image downloaded successfully!', 'success');
}

// Download current image from lightbox
function downloadCurrentImage() {
    downloadImage(currentImageIndex);
}

// Share image
function shareImage(index) {
    const item = allImages[index];
    const img = item.querySelector('img');
    const title = item.querySelector('h3').textContent;
    
    if (navigator.share) {
        navigator.share({
            title: title,
            text: `Check out this beautiful nature photo: ${title}`,
            url: img.src
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(img.src).then(() => {
            showMessage('Image URL copied to clipboard!', 'info');
        });
    }
}

// Share current image from lightbox
function shareCurrentImage() {
    shareImage(currentImageIndex);
}

// Change view mode
function changeView(viewType) {
    currentView = viewType;
    const gallery = document.getElementById('galleryGrid');
    
    // Update view controls
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.closest('.view-btn').classList.add('active');
    
    // Apply view class
    gallery.className = `gallery-grid ${viewType}-view`;
    
    showMessage(`Switched to ${viewType} view`, 'info');
}

// Toggle fullscreen
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

// Toggle mobile menu
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const navToggle = document.querySelector('.nav-toggle');
    
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
}

// Toggle autoplay slideshow
function toggleAutoplay() {
    if (isAutoplay) {
        stopAutoplay();
    } else {
        startAutoplay();
    }
}

// Start autoplay
function startAutoplay() {
    isAutoplay = true;
    autoplayInterval = setInterval(() => {
        nextImage();
    }, 3000);
    
    document.querySelector('.control-btn .fa-play').className = 'fas fa-pause';
    showMessage('Slideshow started', 'info');
}

// Stop autoplay
function stopAutoplay() {
    isAutoplay = false;
    clearInterval(autoplayInterval);
    
    document.querySelector('.control-btn .fa-pause').className = 'fas fa-play';
    showMessage('Slideshow stopped', 'info');
}

// Toggle theme
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.classList.toggle('dark-theme');
    
    const themeIcon = document.querySelector('.control-btn .fa-moon, .control-btn .fa-sun');
    themeIcon.className = currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    
    showMessage(`Switched to ${currentTheme} theme`, 'info');
}

// Reset gallery
function resetGallery() {
    // Reset filters
    filterGallery('all');
    
    // Reset view
    changeView('grid');
    
    // Stop autoplay
    if (isAutoplay) stopAutoplay();
    
    // Close lightbox
    closeLightbox();
    
    showMessage('Gallery reset to default settings', 'success');
}

// Share on social media
function shareOn(platform) {
    const url = window.location.href;
    const text = 'Check out this amazing nature photography gallery!';
    
    let shareUrl;
    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
            break;
        case 'instagram':
            showMessage('Copy the link and share on Instagram!', 'info');
            navigator.clipboard.writeText(url);
            return;
        case 'pinterest':
            shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(text)}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

// Show license information
function showLicenseInfo() {
    const message = `
        Image Usage License:
        • Personal use: Free
        • Commercial use: Contact photographer
        • Attribution required for all uses
        • No redistribution without permission
    `;
    alert(message);
}

// Handle keyboard navigation
function handleKeyNavigation(e) {
    if (document.getElementById('lightboxModal').style.display === 'flex') {
        switch(e.key) {
            case 'ArrowLeft':
                previousImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
            case 'Escape':
                closeLightbox();
                break;
            case ' ':
                e.preventDefault();
                toggleAutoplay();
                break;
        }
    }
}

// Update view count
function updateViewCount() {
    totalViews++;
    document.getElementById('totalViews').textContent = totalViews.toLocaleString();
    localStorage.setItem('galleryViews', totalViews);
}

// Update download count
function updateDownloadCount() {
    totalDownloads++;
    document.getElementById('totalDownloads').textContent = totalDownloads.toLocaleString();
    localStorage.setItem('galleryDownloads', totalDownloads);
}

// Load stats from localStorage
function loadStats() {
    const savedViews = localStorage.getItem('galleryViews');
    const savedDownloads = localStorage.getItem('galleryDownloads');
    
    if (savedViews) {
        totalViews = parseInt(savedViews);
        document.getElementById('totalViews').textContent = totalViews.toLocaleString();
    }
    
    if (savedDownloads) {
        totalDownloads = parseInt(savedDownloads);
        document.getElementById('totalDownloads').textContent = totalDownloads.toLocaleString();
    }
}

// Show loading spinner
function showLoading() {
    document.getElementById('loadingSpinner').style.display = 'flex';
}

// Hide loading spinner
function hideLoading() {
    document.getElementById('loadingSpinner').style.display = 'none';
}

// Show message notification
function showMessage(message, type = 'info') {
    // Create message element if it doesn't exist
    let messageEl = document.getElementById('messageNotification');
    if (!messageEl) {
        messageEl = document.createElement('div');
        messageEl.id = 'messageNotification';
        messageEl.className = 'message-notification';
        document.body.appendChild(messageEl);
    }
    
    messageEl.textContent = message;
    messageEl.className = `message-notification ${type} show`;
    
    // Auto hide after 3 seconds
    setTimeout(() => {
        messageEl.classList.remove('show');
    }, 3000);
}

// Update gallery dimensions
function updateDimensions() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const containerWidth = document.querySelector('.gallery-grid').offsetWidth;
    
    // Responsive grid calculation
    let columns = 3;
    if (containerWidth < 768) columns = 1;
    else if (containerWidth < 1024) columns = 2;
    else if (containerWidth > 1400) columns = 4;
    
    const itemWidth = (containerWidth - (columns - 1) * 20) / columns;
    
    galleryItems.forEach(item => {
        item.style.width = `${itemWidth}px`;
        
        // Maintain aspect ratio
        const img = item.querySelector('img');
        if (img) {
            img.style.width = '100%';
            img.style.height = `${itemWidth * 0.75}px`;
            img.style.objectFit = 'cover';
        }
    });
}

// CSS Animation styles
const styles = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .message-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        z-index: 10000;
    }
    
    .message-notification.show {
        transform: translateX(0);
    }
    
    .message-notification.success { background: #4CAF50; }
    .message-notification.info { background: #2196F3; }
    .message-notification.warning { background: #FF9800; }
    .message-notification.error { background: #f44336; }
    
    .dark-theme {
        filter: invert(1) hue-rotate(180deg);
    }
    
    .nav-toggle.active span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
    .nav-toggle.active span:nth-child(2) { opacity: 0; }
    .nav-toggle.active span:nth-child(3) { transform: rotate(-45deg) translate(7px, -6px); }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

console.log('Gallery JavaScript loaded successfully!');
