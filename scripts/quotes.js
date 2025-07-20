// Quote Generator JavaScript

const quotes = {
    motivational: [
        {
            text: "The only way to do great work is to love what you do.",
            author: "Steve Jobs"
        },
        {
            text: "Don't watch the clock; do what it does. Keep going.",
            author: "Sam Levenson"
        },
        {
            text: "The future belongs to those who believe in the beauty of their dreams.",
            author: "Eleanor Roosevelt"
        },
        {
            text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
            author: "Winston Churchill"
        },
        {
            text: "The only impossible journey is the one you never begin.",
            author: "Tony Robbins"
        }
    ],
    success: [
        {
            text: "Success is not the key to happiness. Happiness is the key to success.",
            author: "Albert Schweitzer"
        },
        {
            text: "Don't be afraid to give up the good to go for the great.",
            author: "John D. Rockefeller"
        },
        {
            text: "The way to get started is to quit talking and begin doing.",
            author: "Walt Disney"
        },
        {
            text: "Success is walking from failure to failure with no loss of enthusiasm.",
            author: "Winston Churchill"
        }
    ],
    wisdom: [
        {
            text: "The only true wisdom is in knowing you know nothing.",
            author: "Socrates"
        },
        {
            text: "In the middle of difficulty lies opportunity.",
            author: "Albert Einstein"
        },
        {
            text: "Life is what happens to you while you're busy making other plans.",
            author: "John Lennon"
        },
        {
            text: "It does not matter how slowly you go as long as you do not stop.",
            author: "Confucius"
        }
    ],
    technology: [
        {
            text: "Technology is best when it brings people together.",
            author: "Matt Mullenweg"
        },
        {
            text: "The advance of technology is based on making it fit in so that you don't really even notice it.",
            author: "Bill Gates"
        },
        {
            text: "Innovation distinguishes between a leader and a follower.",
            author: "Steve Jobs"
        },
        {
            text: "The Internet is becoming the town square for the global village of tomorrow.",
            author: "Bill Gates"
        }
    ],
    creativity: [
        {
            text: "Creativity is intelligence having fun.",
            author: "Albert Einstein"
        },
        {
            text: "The secret to creativity is knowing how to hide your sources.",
            author: "Einstein"
        },
        {
            text: "Imagination is more important than knowledge.",
            author: "Albert Einstein"
        },
        {
            text: "You can't use up creativity. The more you use, the more you have.",
            author: "Maya Angelou"
        }
    ],
    leadership: [
        {
            text: "A leader is one who knows the way, goes the way, and shows the way.",
            author: "John C. Maxwell"
        },
        {
            text: "The greatest leader is not necessarily the one who does the greatest things.",
            author: "Ronald Reagan"
        },
        {
            text: "Leadership is not about being in charge. It's about taking care of those in your charge.",
            author: "Simon Sinek"
        }
    ]
};

let currentQuote = null;
let currentCategory = 'all';
let favorites = JSON.parse(localStorage.getItem('favoriteQuotes')) || [];
let stats = JSON.parse(localStorage.getItem('quoteStats')) || {
    viewed: 0,
    favorites: 0,
    shares: 0
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    generateNewQuote();
    updateDailyQuote();
    updateStats();
    displayFavorites();
    updateCurrentDate();
});

// Generate a new random quote
function generateNewQuote() {
    showLoading();
    
    setTimeout(() => {
        const allQuotes = getAllQuotes();
        const randomIndex = Math.floor(Math.random() * allQuotes.length);
        currentQuote = allQuotes[randomIndex];
        
        displayQuote(currentQuote);
        incrementStat('viewed');
        hideLoading();
    }, 500);
}

// Get all quotes from all categories
function getAllQuotes() {
    let allQuotes = [];
    for (const category in quotes) {
        allQuotes = allQuotes.concat(quotes[category]);
    }
    return allQuotes;
}

// Display a quote
function displayQuote(quote) {
    const quoteText = document.getElementById('quoteText');
    const quoteAuthor = document.getElementById('quoteAuthor');
    
    quoteText.style.opacity = '0';
    quoteAuthor.style.opacity = '0';
    
    setTimeout(() => {
        quoteText.textContent = quote.text;
        quoteAuthor.textContent = `- ${quote.author}`;
        
        quoteText.style.opacity = '1';
        quoteAuthor.style.opacity = '1';
    }, 200);
}

// Filter quotes by category
function filterQuotes(category) {
    currentCategory = category;
    
    // Update active category button
    document.querySelectorAll('.category-card').forEach(card => {
        card.classList.remove('active');
    });
    event.target.closest('.category-card').classList.add('active');
    
    // Generate quote from selected category
    generateQuoteFromCategory(category);
}

// Generate quote from specific category
function generateQuoteFromCategory(category) {
    showLoading();
    
    setTimeout(() => {
        const categoryQuotes = quotes[category];
        if (categoryQuotes && categoryQuotes.length > 0) {
            const randomIndex = Math.floor(Math.random() * categoryQuotes.length);
            currentQuote = categoryQuotes[randomIndex];
            displayQuote(currentQuote);
            incrementStat('viewed');
        }
        hideLoading();
    }, 300);
}

// Generate custom quote based on filters
function generateCustomQuote() {
    const length = document.getElementById('quoteLength').value;
    const category = document.getElementById('quoteCategory').value;
    
    showLoading();
    
    setTimeout(() => {
        let availableQuotes = [];
        
        if (category === 'all') {
            availableQuotes = getAllQuotes();
        } else {
            availableQuotes = quotes[category] || [];
        }
        
        // Filter by length if specified
        if (length !== 'any') {
            availableQuotes = availableQuotes.filter(quote => {
                const quoteLength = quote.text.length;
                switch (length) {
                    case 'short':
                        return quoteLength < 50;
                    case 'medium':
                        return quoteLength >= 50 && quoteLength <= 150;
                    case 'long':
                        return quoteLength > 150;
                    default:
                        return true;
                }
            });
        }
        
        if (availableQuotes.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableQuotes.length);
            currentQuote = availableQuotes[randomIndex];
            displayQuote(currentQuote);
            incrementStat('viewed');
        } else {
            showToast('No quotes found matching your criteria', 'warning');
        }
        
        hideLoading();
    }, 500);
}

// Copy quote to clipboard
function copyQuote() {
    if (!currentQuote) return;
    
    const quoteText = `"${currentQuote.text}" - ${currentQuote.author}`;
    
    navigator.clipboard.writeText(quoteText).then(() => {
        showToast('Quote copied to clipboard!', 'success');
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = quoteText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast('Quote copied to clipboard!', 'success');
    });
}

// Share quote
function shareQuote() {
    if (!currentQuote) return;
    
    const shareQuoteText = document.getElementById('shareQuoteText');
    const shareQuoteAuthor = document.getElementById('shareQuoteAuthor');
    
    shareQuoteText.textContent = `"${currentQuote.text}"`;
    shareQuoteAuthor.textContent = `- ${currentQuote.author}`;
    
    document.getElementById('shareModal').style.display = 'flex';
}

// Close share modal
function closeShareModal() {
    document.getElementById('shareModal').style.display = 'none';
}

// Share to social platforms
function shareToTwitter() {
    const text = `"${currentQuote.text}" - ${currentQuote.author}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    incrementStat('shares');
    closeShareModal();
}

function shareToFacebook() {
    const text = `"${currentQuote.text}" - ${currentQuote.author}`;
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    incrementStat('shares');
    closeShareModal();
}

function shareToLinkedIn() {
    const text = `"${currentQuote.text}" - ${currentQuote.author}`;
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&summary=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    incrementStat('shares');
    closeShareModal();
}

function copyQuoteLink() {
    const quoteText = `"${currentQuote.text}" - ${currentQuote.author}\n\nShared from: ${window.location.href}`;
    
    navigator.clipboard.writeText(quoteText).then(() => {
        showToast('Quote link copied!', 'success');
        incrementStat('shares');
        closeShareModal();
    });
}

// Daily quote functionality
function updateDailyQuote() {
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem('dailyQuoteDate');
    
    if (savedDate !== today) {
        // Generate new daily quote
        const allQuotes = getAllQuotes();
        const randomIndex = Math.floor(Math.random() * allQuotes.length);
        const dailyQuote = allQuotes[randomIndex];
        
        localStorage.setItem('dailyQuote', JSON.stringify(dailyQuote));
        localStorage.setItem('dailyQuoteDate', today);
        
        displayDailyQuote(dailyQuote);
    } else {
        // Load existing daily quote
        const savedQuote = JSON.parse(localStorage.getItem('dailyQuote'));
        if (savedQuote) {
            displayDailyQuote(savedQuote);
        }
    }
}

function displayDailyQuote(quote) {
    document.getElementById('dailyQuoteText').textContent = `"${quote.text}"`;
    document.getElementById('dailyQuoteAuthor').textContent = `- ${quote.author}`;
}

function updateCurrentDate() {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('currentDate').textContent = today.toLocaleDateString('en-US', options);
}

// Favorites functionality
function addToFavorites(quote) {
    if (!favorites.find(fav => fav.text === quote.text)) {
        favorites.push(quote);
        localStorage.setItem('favoriteQuotes', JSON.stringify(favorites));
        incrementStat('favorites');
        displayFavorites();
        showToast('Added to favorites!', 'success');
    }
}

function removeFromFavorites(index) {
    favorites.splice(index, 1);
    localStorage.setItem('favoriteQuotes', JSON.stringify(favorites));
    stats.favorites = Math.max(0, stats.favorites - 1);
    updateStats();
    displayFavorites();
    showToast('Removed from favorites', 'info');
}

function displayFavorites() {
    const favoritesList = document.getElementById('favoritesList');
    
    if (favorites.length === 0) {
        favoritesList.innerHTML = `
            <div class="empty-favorites">
                <i class="fas fa-heart"></i>
                <p>No favorite quotes yet. Click the heart icon on any quote to add it to your favorites!</p>
            </div>
        `;
        return;
    }
    
    favoritesList.innerHTML = favorites.map((quote, index) => `
        <div class="favorite-item">
            <div class="favorite-quote">
                <p class="favorite-text">"${quote.text}"</p>
                <p class="favorite-author">- ${quote.author}</p>
            </div>
            <div class="favorite-actions">
                <button onclick="copyFavorite(${index})" class="action-btn">
                    <i class="fas fa-copy"></i>
                </button>
                <button onclick="removeFromFavorites(${index})" class="action-btn remove">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function copyFavorite(index) {
    const quote = favorites[index];
    const quoteText = `"${quote.text}" - ${quote.author}`;
    
    navigator.clipboard.writeText(quoteText).then(() => {
        showToast('Quote copied!', 'success');
    });
}

function clearFavorites() {
    if (confirm('Are you sure you want to clear all favorites?')) {
        favorites = [];
        localStorage.setItem('favoriteQuotes', JSON.stringify(favorites));
        stats.favorites = 0;
        updateStats();
        displayFavorites();
        showToast('All favorites cleared', 'info');
    }
}

// Statistics
function incrementStat(type) {
    stats[type]++;
    localStorage.setItem('quoteStats', JSON.stringify(stats));
    updateStats();
}

function updateStats() {
    document.getElementById('quotesViewed').textContent = stats.viewed;
    document.getElementById('favoriteCount').textContent = stats.favorites;
    document.getElementById('sharesCount').textContent = stats.shares;
}

// UI Helper functions
function showLoading() {
    document.getElementById('loadingQuote').style.display = 'flex';
}

function hideLoading() {
    document.getElementById('loadingQuote').style.display = 'none';
}

function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    const toastIcon = document.querySelector('.toast-icon');
    const toastMessage = document.querySelector('.toast-message');
    
    // Set icon based on type
    let iconClass = 'fas fa-info-circle';
    if (type === 'success') iconClass = 'fas fa-check-circle';
    if (type === 'warning') iconClass = 'fas fa-exclamation-triangle';
    if (type === 'error') iconClass = 'fas fa-times-circle';
    
    toastIcon.className = `toast-icon ${iconClass}`;
    toastMessage.textContent = message;
    
    toast.className = `toast show ${type}`;
    
    setTimeout(() => {
        toast.className = 'toast';
    }, 3000);
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        generateNewQuote();
    } else if (e.key === 'c' || e.key === 'C') {
        copyQuote();
    } else if (e.key === 's' || e.key === 'S') {
        shareQuote();
    }
});

// Initialize page
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        generateNewQuote();
        updateDailyQuote();
        updateStats();
        displayFavorites();
        updateCurrentDate();
    });
} else {
    generateNewQuote();
    updateDailyQuote();
    updateStats();
    displayFavorites();
    updateCurrentDate();
}
