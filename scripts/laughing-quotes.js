// Laughing Quotes JavaScript Functionality

// Funny quotes database
const funnyQuotes = {
    'all': [
        { text: "I told my wife she was drawing her eyebrows too high. She looked surprised.", author: "Anonymous Dad" },
        { text: "Why don't scientists trust atoms? Because they make up everything!", author: "Science Comedian" },
        { text: "I haven't slept for ten days, because that would be too long.", author: "Mitch Hedberg" },
        { text: "I used to hate facial hair, but then it grew on me.", author: "Pun Master" },
        { text: "What do you call a fake noodle? An impasta!", author: "Kitchen Comedian" },
        { text: "I only know 25 letters of the alphabet. I don't know y.", author: "Letter Lover" },
        { text: "Why did the scarecrow win an award? He was outstanding in his field!", author: "Farm Jokester" },
        { text: "I would avoid the sushi if I was you. It's a little fishy.", author: "Restaurant Reviewer" },
        { text: "Want to hear a joke about construction? I'm still working on it.", author: "Builder Bob" },
        { text: "I lost my job at the bank. A woman asked me to check her balance, so I pushed her over.", author: "Ex-Banker" }
    ],
    'dad-jokes': [
        { text: "I'm afraid for the calendar. Its days are numbered.", author: "Dad Supreme" },
        { text: "Why don't eggs tell jokes? They'd crack each other up.", author: "Breakfast Dad" },
        { text: "Did you hear about the mathematician who's afraid of negative numbers? He'll stop at nothing to avoid them.", author: "Math Dad" },
        { text: "How do you organize a space party? You planet.", author: "Space Dad" },
        { text: "I don't trust stairs. They're always up to something.", author: "Cautious Dad" },
        { text: "What did the ocean say to the beach? Nothing, it just waved.", author: "Beach Dad" },
        { text: "Why don't skeletons fight each other? They don't have the guts.", author: "Spooky Dad" },
        { text: "I used to be a personal trainer. Then I gave my too weak notice.", author: "Gym Dad" },
        { text: "Why did the coffee file a police report? It got mugged.", author: "Caffeine Dad" },
        { text: "How does a penguin build its house? Igloos it together.", author: "Arctic Dad" }
    ],
    'puns': [
        { text: "I wondered why the baseball kept getting bigger. Then it hit me.", author: "Sports Punster" },
        { text: "A boiled egg is hard to beat.", author: "Kitchen Punster" },
        { text: "When the moon is out of orbit, it's really on its last quarter.", author: "Space Punster" },
        { text: "I'm reading a book about anti-gravity. It's impossible to put down!", author: "Physics Punster" },
        { text: "Time flies like an arrow. Fruit flies like a banana.", author: "Classic Punster" },
        { text: "I used to be a banker, but I lost interest.", author: "Finance Punster" },
        { text: "A bicycle can't stand on its own because it's two tired.", author: "Bike Punster" },
        { text: "What's the best thing about Switzerland? I don't know, but the flag is a big plus.", author: "Geography Punster" },
        { text: "I'm terrified of elevators, so I'm going to start taking steps to avoid them.", author: "Height Punster" },
        { text: "Did you hear about the guy who invented knock knock jokes? He won the 'No-bell' prize.", author: "Nobel Punster" }
    ],
    'one-liners': [
        { text: "I haven't slept for ten days, because that would be too long.", author: "Mitch Hedberg" },
        { text: "I used to think I was indecisive, but now I'm not so sure.", author: "Uncertain Comic" },
        { text: "My therapist says I have a preoccupation with vengeance. We'll see about that.", author: "Vengeful Comedian" },
        { text: "I told my cat a joke about dogs, but he didn't find it a-mew-sing.", author: "Pet Comedian" },
        { text: "I'm on a whiskey diet. I've lost three days already.", author: "Drinking Comedian" },
        { text: "I used to be addicted to soap, but I'm clean now.", author: "Clean Comedian" },
        { text: "Why did the invisible man turn down the job offer? He couldn't see himself doing it.", author: "Invisible Comedian" },
        { text: "I bought some shoes from a drug dealer. I don't know what he laced them with, but I've been tripping all day.", author: "Shoe Comedian" },
        { text: "My wife told me to stop singing 'Wonderwall.' I said maybe...", author: "Music Comedian" },
        { text: "I told my wife she should embrace her mistakes. She gave me a hug.", author: "Marriage Comedian" }
    ],
    'tech-humor': [
        { text: "There are only 10 types of people in the world: those who understand binary and those who don't.", author: "Binary Bob" },
        { text: "Why do programmers prefer dark mode? Because light attracts bugs!", author: "Code Comedian" },
        { text: "I would tell you a UDP joke, but you might not get it.", author: "Network Nerd" },
        { text: "Why do Java developers wear glasses? Because they can't C#!", author: "Programming Punster" },
        { text: "How many programmers does it take to change a light bulb? None, that's a hardware problem.", author: "Software Sage" },
        { text: "I'm not a robot, but I do appreciate a good algorithm.", author: "AI Aspirant" },
        { text: "Why was the JavaScript developer sad? Because he didn't Node how to Express himself!", author: "JS Jokester" },
        { text: "A SQL query goes into a bar, walks up to two tables and asks: 'Can I join you?'", author: "Database Dad" }
    ],
    'random': [
        { text: "I named my horse Mayo. Sometimes Mayo neighs.", author: "Horse Whisperer" },
        { text: "What do you call a sleeping bull? A bulldozer!", author: "Animal Comedian" },
        { text: "Why don't oysters donate? Because they are shellfish.", author: "Ocean Comedian" },
        { text: "What do you call a belt made of watches? A waist of time!", author: "Fashion Comedian" },
        { text: "Why did the cookie go to the doctor? Because it felt crumbly!", author: "Baking Comedian" },
        { text: "What's orange and sounds like a parrot? A carrot!", author: "Vegetable Comedian" },
        { text: "Why don't melons get married? Because they cantaloupe!", author: "Fruit Comedian" },
        { text: "What do you call a dinosaur that crashes his car? Tyrannosaurus Wrecks!", author: "Dino Comedian" },
        { text: "Why did the banana go to the doctor? It wasn't peeling well!", author: "Health Comedian" },
        { text: "What do you call a fish wearing a bowtie? Sofishticated!", author: "Aquatic Comedian" },
        { text: "Why don't elephants use computers? They're afraid of the mouse!", author: "Tech Phobe" },
        { text: "What do you call a cow with no legs? Ground beef!", author: "Meat Comedian" },
        { text: "Why did the tomato turn red? Because it saw the salad dressing!", author: "Salad Comedian" },
        { text: "What do you call a bear with no teeth? A gummy bear!", author: "Candy Comedian" },
        { text: "Why don't ants get sick? Because they have little anty-bodies!", author: "Bug Comedian" }
    ]
};

// App State
let currentQuoteIndex = 0;
let currentCategory = 'all';
let favorites = JSON.parse(localStorage.getItem('laughing-favorites')) || [];
let stats = JSON.parse(localStorage.getItem('laughing-stats')) || {
    totalQuotes: 0,
    laughsGenerated: 0,
    favoriteQuotes: 0,
    streakDays: 0,
    dailyChallenge: { completed: 0, target: 3, lastDate: '' }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    updateStats();
    updateMoodIndicator();
    startDailyChallengeTimer();
    initializeBackgroundAnimation();
    setupEventListeners();
});

// Initialize App
function initializeApp() {
    displayRandomQuote();
    updateFavoritesDisplay();
    checkDailyStreak();
    
    console.log('%cLaughing Quotes App Loaded! 😂', 'color: #ff6b6b; font-size: 16px; font-weight: bold;');
}

// Setup Event Listeners
function setupEventListeners() {
    // Category buttons
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            switchCategory(this.dataset.category);
        });
    });

    // Reaction buttons
    document.querySelectorAll('.reaction-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            addReaction(this.dataset.reaction);
        });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            getNewQuote();
        }
        if (e.key === 'f' || e.key === 'F') {
            e.preventDefault();
            toggleFavorite();
        }
        if (e.key === 's' || e.key === 'S') {
            e.preventDefault();
            shareQuote();
        }
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Category Management
function switchCategory(category) {
    currentCategory = category;
    currentQuoteIndex = 0;
    
    // Update UI
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
    
    displayRandomQuote();
    showToast(`Switched to ${category === 'all' ? 'All Jokes' : category} category! 🎯`);
}

// Quote Display
function displayRandomQuote() {
    const quotes = funnyQuotes[currentCategory];
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    
    currentQuoteIndex = randomIndex;
    
    // Update quote display
    document.getElementById('quoteText').textContent = quote.text;
    document.getElementById('quoteAuthor').textContent = `- ${quote.author}`;
    document.getElementById('categoryTag').textContent = getCategoryDisplayName(currentCategory);
    document.getElementById('quoteNumber').textContent = `#${String(randomIndex + 1).padStart(3, '0')}`;
    
    // Update favorite button
    updateFavoriteButton();
    
    // Reset reactions
    resetReactions();
    
    // Update stats
    stats.totalQuotes++;
    updateStats();
    saveStats();
    
    // Trigger quote animation
    animateQuoteChange();
}

function getCategoryDisplayName(category) {
    const names = {
        'all': 'All Jokes',
        'dad-jokes': 'Dad Jokes',
        'puns': 'Puns',
        'one-liners': 'One-Liners',
        'tech-humor': 'Tech Humor',
        'random': 'Random Fun'
    };
    return names[category] || category;
}

function getNewQuote() {
    displayRandomQuote();
    triggerLaughAnimation();
    updateMoodIndicator();
}

// Reactions
function addReaction(reactionType) {
    const btn = document.querySelector(`[data-reaction="${reactionType}"]`);
    const countSpan = btn.querySelector('span');
    let count = parseInt(countSpan.textContent);
    
    if (btn.classList.contains('active')) {
        btn.classList.remove('active');
        countSpan.textContent = Math.max(0, count - 1);
    } else {
        btn.classList.add('active');
        countSpan.textContent = count + 1;
        
        // Update stats for laugh reactions
        if (reactionType === 'laugh') {
            stats.laughsGenerated++;
            updateDailyChallenge();
        }
        
        // Show reaction animation
        showReactionAnimation(reactionType);
    }
    
    updateStats();
    saveStats();
}

function resetReactions() {
    document.querySelectorAll('.reaction-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.querySelector('span').textContent = '0';
    });
}

function showReactionAnimation(reactionType) {
    const emojis = {
        'laugh': '😂',
        'smile': '😊',
        'love': '😍',
        'mind-blown': '🤯'
    };
    
    createFloatingEmoji(emojis[reactionType]);
}

// Favorites Management
function toggleFavorite() {
    const currentQuote = getCurrentQuote();
    const quoteKey = `${currentCategory}-${currentQuoteIndex}`;
    
    if (favorites.includes(quoteKey)) {
        favorites = favorites.filter(fav => fav !== quoteKey);
        showToast('Removed from favorites 💔');
    } else {
        favorites.push(quoteKey);
        showToast('Added to favorites! 💖');
    }
    
    updateFavoriteButton();
    updateFavoritesDisplay();
    
    stats.favoriteQuotes = favorites.length;
    updateStats();
    saveStats();
    saveFavorites();
}

function updateFavoriteButton() {
    const btn = document.getElementById('favoriteBtn');
    const icon = btn.querySelector('i');
    const quoteKey = `${currentCategory}-${currentQuoteIndex}`;
    
    if (favorites.includes(quoteKey)) {
        icon.className = 'fas fa-heart';
        btn.classList.add('active');
    } else {
        icon.className = 'far fa-heart';
        btn.classList.remove('active');
    }
}

function updateFavoritesDisplay() {
    const favoritesSection = document.getElementById('favoritesSection');
    const favoritesGrid = document.getElementById('favoritesGrid');
    
    if (favorites.length === 0) {
        favoritesSection.style.display = 'none';
        return;
    }
    
    favoritesSection.style.display = 'block';
    favoritesGrid.innerHTML = '';
    
    favorites.forEach(fav => {
        const [category, index] = fav.split('-');
        const quote = funnyQuotes[category][parseInt(index)];
        
        if (quote) {
            const card = createFavoriteCard(quote, category, index);
            favoritesGrid.appendChild(card);
        }
    });
}

function createFavoriteCard(quote, category, index) {
    const card = document.createElement('div');
    card.className = 'favorite-card';
    card.innerHTML = `
        <div class="quote-content">
            <blockquote>${quote.text}</blockquote>
            <cite>- ${quote.author}</cite>
        </div>
        <div class="favorite-actions">
            <button onclick="loadFavoriteQuote('${category}', ${index})" class="action-btn">
                <i class="fas fa-play"></i> View
            </button>
            <button onclick="removeFavorite('${category}-${index}')" class="action-btn">
                <i class="fas fa-trash"></i> Remove
            </button>
        </div>
    `;
    return card;
}

function loadFavoriteQuote(category, index) {
    currentCategory = category;
    currentQuoteIndex = parseInt(index);
    
    const quote = funnyQuotes[category][index];
    document.getElementById('quoteText').textContent = quote.text;
    document.getElementById('quoteAuthor').textContent = `- ${quote.author}`;
    document.getElementById('categoryTag').textContent = getCategoryDisplayName(category);
    document.getElementById('quoteNumber').textContent = `#${String(index + 1).padStart(3, '0')}`;
    
    updateFavoriteButton();
    resetReactions();
    
    // Scroll to quote
    document.querySelector('.quote-display').scrollIntoView({ behavior: 'smooth' });
}

function removeFavorite(quoteKey) {
    favorites = favorites.filter(fav => fav !== quoteKey);
    updateFavoritesDisplay();
    updateFavoriteButton();
    
    stats.favoriteQuotes = favorites.length;
    updateStats();
    saveStats();
    saveFavorites();
    
    showToast('Removed from favorites');
}

// Share Functionality
function shareQuote() {
    const quote = getCurrentQuote();
    const shareText = `"${quote.text}" - ${quote.author}`;
    
    document.getElementById('sharePreview').textContent = shareText;
    document.getElementById('shareText').value = `Check out this hilarious quote! 😂\n\n${shareText}\n\n#LaughingQuotes #Humor`;
    
    showModal();
}

function shareToSocial(platform) {
    const quote = getCurrentQuote();
    const text = `"${quote.text}" - ${quote.author}`;
    const url = window.location.href;
    
    let shareUrl = '';
    
    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text + ' 😂')}&url=${encodeURIComponent(url)}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' 😂\n\n' + url)}`;
            break;
        case 'email':
            shareUrl = `mailto:?subject=Hilarious Quote!&body=${encodeURIComponent(text + '\n\nShared from: ' + url)}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
        closeModal();
        
        // Update daily challenge
        updateDailyChallenge();
        showToast(`Shared to ${platform}! 🚀`);
    }
}

function copyQuote() {
    const quote = getCurrentQuote();
    const text = `"${quote.text}" - ${quote.author}`;
    
    navigator.clipboard.writeText(text).then(() => {
        showToast('Quote copied to clipboard! 📋');
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast('Quote copied to clipboard! 📋');
    });
}

function copyShareText() {
    const shareText = document.getElementById('shareText').value;
    
    navigator.clipboard.writeText(shareText).then(() => {
        showToast('Share text copied! 📋');
    }).catch(() => {
        const textArea = document.createElement('textarea');
        textArea.value = shareText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast('Share text copied! 📋');
    });
}

// Modal Management
function showModal() {
    document.getElementById('shareModal').classList.add('active');
}

function closeModal() {
    document.getElementById('shareModal').classList.remove('active');
}

// Stats Management
function updateStats() {
    document.getElementById('totalQuotes').textContent = stats.totalQuotes;
    document.getElementById('laughsGenerated').textContent = stats.laughsGenerated;
    document.getElementById('favoriteQuotes').textContent = stats.favoriteQuotes;
    document.getElementById('streakDays').textContent = stats.streakDays;
}

function saveStats() {
    localStorage.setItem('laughing-stats', JSON.stringify(stats));
}

function saveFavorites() {
    localStorage.setItem('laughing-favorites', JSON.stringify(favorites));
}

// Daily Challenge
function updateDailyChallenge() {
    const today = new Date().toDateString();
    
    if (stats.dailyChallenge.lastDate !== today) {
        stats.dailyChallenge.completed = 0;
        stats.dailyChallenge.lastDate = today;
    }
    
    stats.dailyChallenge.completed++;
    
    const progress = Math.min((stats.dailyChallenge.completed / stats.dailyChallenge.target) * 100, 100);
    document.getElementById('challengeProgress').style.width = progress + '%';
    document.querySelector('.progress-text').textContent = `${stats.dailyChallenge.completed}/${stats.dailyChallenge.target} completed`;
    
    if (stats.dailyChallenge.completed >= stats.dailyChallenge.target) {
        showToast('Daily challenge completed! 🏆');
        confettiAnimation();
    }
    
    saveStats();
}

function startDailyChallengeTimer() {
    function updateTimer() {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        
        const timeLeft = tomorrow - now;
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        document.getElementById('challengeTimer').textContent = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    updateTimer();
    setInterval(updateTimer, 1000);
}

function checkDailyStreak() {
    const today = new Date().toDateString();
    const lastVisit = localStorage.getItem('lastVisitDate');
    
    if (lastVisit) {
        const lastDate = new Date(lastVisit);
        const currentDate = new Date(today);
        const daysDiff = Math.floor((currentDate - lastDate) / (1000 * 60 * 60 * 24));
        
        if (daysDiff === 1) {
            stats.streakDays++;
        } else if (daysDiff > 1) {
            stats.streakDays = 1;
        }
    } else {
        stats.streakDays = 1;
    }
    
    localStorage.setItem('lastVisitDate', today);
    updateStats();
    saveStats();
}

// Mood Management
function updateMoodIndicator() {
    const moods = [
        { emoji: '😐', text: 'Neutral Mode', threshold: 0 },
        { emoji: '🙂', text: 'Smile Mode', threshold: 5 },
        { emoji: '😊', text: 'Happy Mode', threshold: 15 },
        { emoji: '😄', text: 'Joyful Mode', threshold: 30 },
        { emoji: '🤣', text: 'Laughing Mode', threshold: 50 }
    ];
    
    let currentMood = moods[0];
    for (let mood of moods) {
        if (stats.laughsGenerated >= mood.threshold) {
            currentMood = mood;
        }
    }
    
    document.getElementById('moodIcon').textContent = currentMood.emoji;
    document.getElementById('moodText').textContent = currentMood.text;
}

// Animations
function triggerLaughAnimation() {
    const animation = document.getElementById('laughAnimation');
    animation.classList.remove('active');
    setTimeout(() => {
        animation.classList.add('active');
    }, 10);
}

function animateQuoteChange() {
    const quoteCard = document.getElementById('quoteCard');
    quoteCard.style.transform = 'scale(0.95)';
    quoteCard.style.opacity = '0.8';
    
    setTimeout(() => {
        quoteCard.style.transform = 'scale(1)';
        quoteCard.style.opacity = '1';
    }, 200);
}

function createFloatingEmoji(emoji) {
    const floatingEmoji = document.createElement('div');
    floatingEmoji.textContent = emoji;
    floatingEmoji.style.position = 'fixed';
    floatingEmoji.style.fontSize = '2rem';
    floatingEmoji.style.pointerEvents = 'none';
    floatingEmoji.style.zIndex = '9999';
    floatingEmoji.style.left = Math.random() * window.innerWidth + 'px';
    floatingEmoji.style.top = window.innerHeight + 'px';
    floatingEmoji.style.animation = 'floatUp 3s ease-out forwards';
    
    document.body.appendChild(floatingEmoji);
    
    setTimeout(() => {
        document.body.removeChild(floatingEmoji);
    }, 3000);
}

function confettiAnimation() {
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-10px';
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '10000';
            confetti.style.animation = 'fall 3s linear forwards';
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                if (document.body.contains(confetti)) {
                    document.body.removeChild(confetti);
                }
            }, 3000);
        }, i * 50);
    }
}

function initializeBackgroundAnimation() {
    const emojis = document.querySelectorAll('.floating-emoji');
    emojis.forEach((emoji, index) => {
        emoji.style.animationDelay = `${index * 2}s`;
        emoji.style.left = `${Math.random() * 100}%`;
    });
}

// Utility Functions
function getCurrentQuote() {
    return funnyQuotes[currentCategory][currentQuoteIndex];
}

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Add CSS for additional animations
const additionalCSS = `
@keyframes fall {
    to {
        transform: translateY(${window.innerHeight + 100}px) rotate(360deg);
    }
}
`;

const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Laughing Quotes loaded in ${loadTime.toFixed(2)}ms`);
});

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        saveStats();
        saveFavorites();
    }
});

// Auto-save every 30 seconds
setInterval(() => {
    saveStats();
    saveFavorites();
}, 30000);

// Touch gestures for mobile
let startX = 0;
let startY = 0;

document.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});

document.addEventListener('touchend', function(e) {
    if (!startX || !startY) return;
    
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    
    const diffX = startX - endX;
    const diffY = startY - endY;
    
    // Horizontal swipe for new quote
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        getNewQuote();
    }
    
    startX = 0;
    startY = 0;
});

// Console welcome message
console.log('%c🤣 Welcome to Laughing Quotes! 🤣', 'color: #ff6b6b; font-size: 24px; font-weight: bold;');
console.log('%cSwipe or press SPACE for new quotes!', 'color: #feca57; font-size: 16px;');
console.log('%cKeyboard shortcuts: SPACE=New Quote, F=Favorite, S=Share, ESC=Close', 'color: #48dbfb; font-size: 14px;');
