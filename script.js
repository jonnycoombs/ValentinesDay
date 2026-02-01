// ================================
// UTILITY FUNCTIONS
// ================================

function isMobile() {
    return window.matchMedia("(max-width: 768px)").matches || 
           !window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

// ================================
// STAR BACKGROUND
// ================================

function createStars() {
    const containers = document.querySelectorAll('.stars-container');
    containers.forEach(container => {
        // Create stars
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 3 + 's';
            star.style.animationDuration = (Math.random() * 2 + 2) + 's';
            container.appendChild(star);
        }
    });
}

// ================================
// QUESTION SCREEN LOGIC
// ================================

const questionScreen = document.getElementById('question-screen');
const mainScreen = document.getElementById('main-screen');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const noResponse = document.getElementById('no-response');
const celebration = document.getElementById('celebration');

// No button responses
const noResponses = [
    "Hmm… try again 😏",
    "That's not the right answer 💕",
    "Are you sure about that? 😊",
    "Think again, beautiful 💖",
    "My heart says you meant yes ❤️",
    "Impossible! Try again 😘"
];

let noClickCount = 0;

// Desktop: No button runs away from cursor
if (!isMobile()) {
    noBtn.addEventListener('mouseenter', (e) => {
        const btn = e.target;
        
        // Set to absolute position on first hover
        btn.style.position = 'absolute';
        
        // Calculate random position
        const maxX = window.innerWidth - btn.offsetWidth - 40;
        const maxY = window.innerHeight - btn.offsetHeight - 40;
        
        const newX = Math.random() * maxX;
        const newY = Math.random() * maxY;
        
        btn.style.left = newX + 'px';
        btn.style.top = newY + 'px';
        
        // Show playful message
        noResponse.textContent = noResponses[Math.floor(Math.random() * noResponses.length)];
    });
}

// Mobile: Show response and slightly move button on click
if (isMobile()) {
    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        noClickCount++;
        
        // Show playful response
        const responseIndex = Math.min(noClickCount - 1, noResponses.length - 1);
        noResponse.textContent = noResponses[responseIndex];
        
        // Shake animation
        noBtn.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            noBtn.style.animation = '';
        }, 500);
    });
}

// Shake animation for mobile
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// Yes button - trigger celebration
yesBtn.addEventListener('click', () => {
    triggerCelebration();
    
    setTimeout(() => {
        questionScreen.classList.remove('active');
        mainScreen.classList.add('active');
        createFloatingHearts();
        initScrollAnimations();
    }, 3000);
});

// ================================
// CELEBRATION (FIREWORKS)
// ================================

function triggerCelebration() {
    celebration.classList.add('active');
    const container = document.querySelector('.fireworks-container');
    
    // Create multiple firework bursts
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            createFirework(container);
        }, i * 300);
    }
}

function createFirework(container) {
    const colors = ['#FFB6C1', '#D4A5A5', '#D4AF77', '#FF69B4', '#FFC0CB'];
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * (window.innerHeight * 0.6) + window.innerHeight * 0.1;
    
    // Create 30 particles per firework
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        const angle = (Math.PI * 2 * i) / 30;
        const velocity = Math.random() * 100 + 50;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        particle.style.setProperty('--x', vx + 'px');
        particle.style.setProperty('--y', vy + 'px');
        
        container.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1000);
    }
}

// ================================
// FLOATING HEARTS (MAIN SCREEN)
// ================================

function createFloatingHearts() {
    const finalSection = document.querySelector('.floating-hearts-final');
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart-particle';
        heart.textContent = '💕';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.bottom = '-50px';
        heart.style.fontSize = (Math.random() * 1 + 1) + 'rem';
        
        finalSection.appendChild(heart);
        
        setTimeout(() => heart.remove(), 3000);
    }, 500);
}

// ================================
// SCROLL ANIMATIONS
// ================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'floatIn 0.8s ease-out forwards';
            }
        });
    }, observerOptions);
    
    // Observe sections
    document.querySelectorAll('.game-section, .reasons-section').forEach(section => {
        observer.observe(section);
    });
}

// ================================
// MINI GAME: CATCH THE HEARTS
// ================================

let gameActive = false;
let score = 0;
let gameInterval;
let heartInterval;
let spawnRate = 1000; // Start at 1 second
let activeHearts = [];

const gameCanvas = document.getElementById('game-canvas');
const scoreDisplay = document.getElementById('score');
const startGameBtn = document.getElementById('start-game');
const prizeReveal = document.getElementById('prize-reveal');

startGameBtn.addEventListener('click', () => {
    if (!gameActive) {
        startGame();
    }
});

function startGame() {
    gameActive = true;
    score = 0;
    activeHearts = [];
    spawnRate = 1000;
    scoreDisplay.textContent = score;
    startGameBtn.disabled = true;
    startGameBtn.textContent = 'Playing...';
    
    // Clear any existing hearts
    gameCanvas.innerHTML = '';
    
    // Start spawning hearts
    spawnHearts();
}

function spawnHearts() {
    if (!gameActive) return;
    
    // Determine how many hearts to spawn based on score
    let heartsToSpawn = 1;
    if (score >= 10 && score < 30) heartsToSpawn = 2;
    if (score >= 30) heartsToSpawn = 3;
    
    // Spawn hearts
    for (let i = 0; i < heartsToSpawn; i++) {
        setTimeout(() => {
            if (gameActive) spawnHeart();
        }, i * 250); // Slight stagger for better spacing
    }
    
    // Adjust spawn rate as game progresses (slower = easier)
    if (score >= 30) spawnRate = 900;
    else if (score >= 10) spawnRate = 1000;
    else spawnRate = 1100;
    
    // Schedule next spawn
    heartInterval = setTimeout(() => spawnHearts(), spawnRate);
}

function spawnHeart() {
    const heart = document.createElement('div');
    heart.className = 'falling-heart';
    heart.textContent = ['💕', '💖', '💗', '💘'][Math.floor(Math.random() * 4)];
    heart.style.left = Math.random() * (gameCanvas.offsetWidth - 40) + 'px';
    heart.style.top = '-40px';
    
    // Slower, more manageable fall speed
    let fallDuration = 4.0; // Start slower
    if (score >= 30) fallDuration = 3.0;
    else if (score >= 10) fallDuration = 3.5;
    
    heart.style.animationDuration = fallDuration + 's';
    
    gameCanvas.appendChild(heart);
    activeHearts.push(heart);
    
    let caught = false;
    
    // Larger click area - add padding around the heart
    const clickPadding = 20; // pixels of padding around heart
    
    // Click handler with larger hit area
    const handleClick = (e) => {
        if (!caught && gameActive) {
            const rect = heart.getBoundingClientRect();
            const clickX = e.clientX || e.touches?.[0]?.clientX;
            const clickY = e.clientY || e.touches?.[0]?.clientY;
            
            // Check if click is within padded area
            const inHitArea = clickX >= rect.left - clickPadding &&
                            clickX <= rect.right + clickPadding &&
                            clickY >= rect.top - clickPadding &&
                            clickY <= rect.bottom + clickPadding;
            
            if (inHitArea) {
                caught = true;
                score++;
                scoreDisplay.textContent = score;
                heart.style.animation = 'none';
                heart.textContent = '✨';
                
                // Remove from active hearts
                const index = activeHearts.indexOf(heart);
                if (index > -1) activeHearts.splice(index, 1);
                
                setTimeout(() => heart.remove(), 200);
                
                // Check for win condition
                if (score >= 50) {
                    winGame();
                }
            }
        }
    };
    
    heart.addEventListener('click', handleClick);
    heart.addEventListener('touchstart', handleClick);
    
    // Check if heart hit the ground (missed)
    setTimeout(() => {
        if (heart.parentNode && !caught && gameActive) {
            // Heart was missed - game over!
            failGame();
        }
    }, fallDuration * 1000);
}

function failGame() {
    gameActive = false;
    clearTimeout(heartInterval);
    
    // Clear all hearts
    activeHearts.forEach(heart => {
        if (heart.parentNode) heart.remove();
    });
    activeHearts = [];
    
    startGameBtn.disabled = false;
    startGameBtn.textContent = 'Try Again';
    
    // Show fail message
    const message = document.createElement('div');
    message.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 1.8rem;
        color: var(--color-accent);
        text-align: center;
        font-family: var(--font-display);
        animation: floatIn 0.5s ease-out;
        pointer-events: none;
        padding: 2rem;
        background: rgba(139, 21, 56, 0.9);
        border-radius: 20px;
        border: 2px solid var(--color-gold);
    `;
    
    message.innerHTML = `You missed a heart! 💔<br><span style="font-size: 1.3rem;">Score: ${score}/50</span><br><span style="font-size: 1.1rem; color: var(--color-secondary);">Try again!</span>`;
    
    gameCanvas.appendChild(message);
    
    setTimeout(() => {
        if (message.parentNode) {
            message.remove();
        }
    }, 3000);
}

function winGame() {
    gameActive = false;
    clearTimeout(heartInterval);
    
    // Clear all hearts
    activeHearts.forEach(heart => {
        if (heart.parentNode) heart.remove();
    });
    activeHearts = [];
    
    startGameBtn.disabled = false;
    startGameBtn.textContent = '🎉 You Won! Play Again?';
    
    // Show prize reveal
    setTimeout(() => {
        prizeReveal.classList.add('show');
        
        // Create confetti
        createConfetti();
    }, 500);
}

// Click anywhere on prize card to close it
if (prizeReveal) {
    prizeReveal.addEventListener('click', () => {
        prizeReveal.classList.remove('show');
    });
}

function createConfetti() {
    const colors = ['#FFB6C1', '#D4A5A5', '#D4AF77', '#FF69B4', '#FFC0CB'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                top: -10px;
                left: ${Math.random() * 100}%;
                opacity: 1;
                border-radius: 50%;
                z-index: 10001;
                animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
            `;
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 5000);
        }, i * 30);
    }
}

// Add confetti animation
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// ================================
// EASTER EGG: Click title 3 times
// ================================

const heroTitle = document.querySelector('.hero-title');
const easterEgg = document.getElementById('easter-egg');
let titleClickCount = 0;

heroTitle.addEventListener('click', () => {
    titleClickCount++;
    
    if (titleClickCount === 3) {
        easterEgg.classList.add('show');
        
        // Hide after 5 seconds
        setTimeout(() => {
            easterEgg.classList.remove('show');
            titleClickCount = 0;
        }, 5000);
    }
});

// Click anywhere to close easter egg
easterEgg.addEventListener('click', () => {
    easterEgg.classList.remove('show');
    titleClickCount = 0;
});

// ================================
// INITIALIZE ON LOAD
// ================================

document.addEventListener('DOMContentLoaded', () => {
    createStars();
});
