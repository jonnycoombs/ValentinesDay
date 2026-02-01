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
        const container = document.querySelector('.question-content');
        const containerRect = container.getBoundingClientRect();
        
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

const gameCanvas = document.getElementById('game-canvas');
const scoreDisplay = document.getElementById('score');
const startGameBtn = document.getElementById('start-game');

startGameBtn.addEventListener('click', () => {
    if (!gameActive) {
        startGame();
    }
});

function startGame() {
    gameActive = true;
    score = 0;
    scoreDisplay.textContent = score;
    startGameBtn.disabled = true;
    startGameBtn.textContent = 'Playing...';
    
    // Clear any existing hearts
    gameCanvas.innerHTML = '';
    
    // Spawn hearts every 1 second
    heartInterval = setInterval(() => {
        if (gameActive) {
            spawnHeart();
        }
    }, 1000);
    
    // Game duration: 20 seconds
    gameInterval = setTimeout(() => {
        endGame();
    }, 20000);
}

function spawnHeart() {
    const heart = document.createElement('div');
    heart.className = 'falling-heart';
    heart.textContent = ['💕', '💖', '💗', '💘'][Math.floor(Math.random() * 4)];
    heart.style.left = Math.random() * (gameCanvas.offsetWidth - 40) + 'px';
    heart.style.top = '-40px';
    
    const fallDuration = Math.random() * 2 + 2; // 2-4 seconds
    heart.style.animationDuration = fallDuration + 's';
    
    gameCanvas.appendChild(heart);
    
    // Click handler
    heart.addEventListener('click', () => {
        score++;
        scoreDisplay.textContent = score;
        heart.style.animation = 'none';
        heart.textContent = '✨';
        setTimeout(() => heart.remove(), 200);
    });
    
    // Remove after animation
    setTimeout(() => {
        if (heart.parentNode) {
            heart.remove();
        }
    }, fallDuration * 1000);
}

function endGame() {
    gameActive = false;
    clearInterval(heartInterval);
    clearTimeout(gameInterval);
    
    startGameBtn.disabled = false;
    startGameBtn.textContent = score > 10 ? '🎉 Play Again!' : 'Try Again';
    
    // Show score message
    const message = document.createElement('div');
    message.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 2rem;
        color: var(--color-gold);
        text-align: center;
        font-family: var(--font-display);
        animation: floatIn 0.5s ease-out;
        pointer-events: none;
    `;
    
    if (score >= 15) {
        message.innerHTML = `Amazing! 🎉<br>You caught ${score} hearts!`;
    } else if (score >= 10) {
        message.innerHTML = `Well done! 💖<br>You caught ${score} hearts!`;
    } else {
        message.innerHTML = `Good try! 💕<br>You caught ${score} hearts!`;
    }
    
    gameCanvas.appendChild(message);
    
    setTimeout(() => {
        if (message.parentNode) {
            message.remove();
        }
    }, 3000);
}

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
