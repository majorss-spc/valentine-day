// State
let musicPlaying = false;
const music = new Audio('https://cdn.pixabay.com/download/audio/2022/11/22/audio_febc508520.mp3'); // Romantic background music
music.loop = true;

// DOM Elements
const pages = document.querySelectorAll('.page');
const musicBtn = document.getElementById('music-toggle');
const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const reactionContainer = document.getElementById('reaction-container');
const nextBtnPage1 = document.getElementById('next-btn-page1');

// Navigation
function navigateTo(pageId) {
    pages.forEach(page => {
        page.classList.remove('active');
    });
    const target = document.getElementById(pageId);
    if (target) {
        target.classList.add('active');
        window.scrollTo(0, 0);
        
        // Special effect for page 4
        if (pageId === 'page4') {
            document.body.style.background = 'var(--bg-starry)';
            startShootingStars();
        } else {
            document.body.style.background = 'var(--bg-gradient)';
        }
    }
}

// Music Toggle
function toggleMusic() {
    if (musicPlaying) {
        music.pause();
        musicBtn.textContent = '🔇';
    } else {
        music.play().catch(e => console.log("Audio play failed:", e));
        musicBtn.textContent = '🎵 Music Playing';
    }
    musicPlaying = !musicPlaying;
}

// Auto-play music on first interaction
document.body.addEventListener('click', () => {
    if (!musicPlaying) {
        music.play().then(() => {
            musicPlaying = true;
            musicBtn.textContent = '🎵 Music Playing';
        }).catch(e => console.log("Auto-play blocked:", e));
    }
}, { once: true });

// Floating Hearts Background
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.innerHTML = '💖';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 2 + 's';
    heart.style.fontSize = Math.random() * 20 + 10 + 'px';
    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 5000);
}

setInterval(createHeart, 300);

// Page 1: Logic
if (noBtn) {
    noBtn.addEventListener('mouseover', () => {
        const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
        const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
        noBtn.style.position = 'absolute';
        noBtn.style.left = `${x}px`;
        noBtn.style.top = `${y}px`;
    });
    
    // Fallback for mobile touch
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent click
        const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
        const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
        noBtn.style.position = 'absolute';
        noBtn.style.left = `${x}px`;
        noBtn.style.top = `${y}px`;
    });
}

if (yesBtn) {
    yesBtn.addEventListener('click', () => {
        // Confetti
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });

        // Show reaction
        reactionContainer.classList.remove('hidden');
        yesBtn.classList.add('hidden');
        noBtn.classList.add('hidden');
        document.querySelector('.question-text').textContent = "WOWWWWWW 😭💖 I’M SO LUCKY!!!";
    });
}

// Scroll Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
});

document.querySelectorAll('.animate-on-scroll').forEach((el) => {
    observer.observe(el);
});

// Shooting stars for Page 4
function startShootingStars() {
    // Add simple star logic if needed, or rely on CSS background
}
