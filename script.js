// DOM Elements
const landingScreen = document.getElementById('landingScreen');
const noResponse = document.getElementById('noResponse');
const surpriseSection = document.getElementById('surpriseSection');
const mainContent = document.getElementById('mainContent');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const backBtn = document.getElementById('backBtn');
const nextBtn = document.getElementById('nextBtn');
const replayBtn = document.getElementById('replayBtn');
const backgroundMusic = document.getElementById('backgroundMusic');
const audioControls = document.getElementById('audioControls');
const playPauseBtn = document.getElementById('playPauseBtn');
const volumeSlider = document.getElementById('volumeSlider');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Set music volume to low by default
    backgroundMusic.volume = 0.1;
    
    // Show audio controls when main content is displayed
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                if (mainContent.style.display === 'block') {
                    audioControls.style.display = 'flex';
                } else {
                    audioControls.style.display = 'none';
                }
            }
        });
    });
    
    observer.observe(mainContent, { attributes: true, attributeFilter: ['style'] });
});

// No button functionality - make the button run away
let noClickCount = 0;
noBtn.addEventListener('mouseover', function() {
    // Move the button to a random position when hovered
    if (noClickCount < 5) {
        const containerRect = document.querySelector('.container').getBoundingClientRect();
        const maxX = window.innerWidth - this.offsetWidth;
        const maxY = window.innerHeight - this.offsetHeight;
        
        // Ensure the button stays within viewport
        const newX = Math.random() * (maxX - 20) + 10; // Add padding
        const newY = Math.random() * (maxY - 20) + 10; // Add padding
        
        this.style.position = 'fixed';
        this.style.left = newX + 'px';
        this.style.top = newY + 'px';
    }
});

noBtn.addEventListener('click', function() {
    noClickCount++;
    
    if (noClickCount >= 5) {
        // After 5 attempts, just show the no response screen
        landingScreen.style.display = 'none';
        noResponse.style.display = 'block';
    } else {
        // Move the button to a new position when clicked
        const container = document.querySelector('.container');
        const maxX = container.clientWidth - this.offsetWidth;
        const maxY = window.innerHeight - this.offsetHeight;
        
        const newX = Math.random() * maxX;
        const newY = Math.random() * maxY;
        
        this.style.position = 'fixed';
        this.style.left = newX + 'px';
        this.style.top = newY + 'px';
    }
});

// Back button functionality
backBtn.addEventListener('click', function() {
    noResponse.style.display = 'none';
    landingScreen.style.display = 'block';
    // Reset the no button position
    noBtn.style.position = '';
    noBtn.style.left = '';
    noBtn.style.top = '';
    noClickCount = 0;
});

// Yes button functionality
yesBtn.addEventListener('click', function() {
    landingScreen.style.display = 'none';
    surpriseSection.style.display = 'block';
});

// Next button functionality
nextBtn.addEventListener('click', function() {
    surpriseSection.style.display = 'none';
    mainContent.style.display = 'block';
    
    // Start quote animations
    setTimeout(() => {
        document.getElementById('quote1').classList.add('visible');
    }, 500);
    
    setTimeout(() => {
        document.getElementById('quote2').classList.add('visible');
    }, 1500);
    
    setTimeout(() => {
        document.getElementById('quote3').classList.add('visible');
    }, 2500);
    
    // Show audio controls and play background music
    audioControls.style.display = 'flex';
    backgroundMusic.play().catch(e => console.log("Audio play prevented by browser autoplay policy"));
});

// Replay functionality
replayBtn.addEventListener('click', function() {
    // Reset all elements
    mainContent.style.display = 'none';
    landingScreen.style.display = 'block';
    
    // Remove visible class from quotes
    document.getElementById('quote1').classList.remove('visible');
    document.getElementById('quote2').classList.remove('visible');
    document.getElementById('quote3').classList.remove('visible');
    
    // Pause music
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    audioControls.style.display = 'none';
    
    // Reset the no button position
    noBtn.style.position = '';
    noBtn.style.left = '';
    noBtn.style.top = '';
    noClickCount = 0;
});

// Add some interactive effects
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add sparkle effect to the page
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'fixed';
    sparkle.style.left = Math.random() * window.innerWidth + 'px';
    sparkle.style.top = '-20px';
    sparkle.style.fontSize = (Math.random() * 20 + 10) + 'px';
    sparkle.style.opacity = '0.8';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '1000';
    sparkle.style.animation = 'fall ' + (Math.random() * 3 + 2) + 's linear forwards';
    
    document.body.appendChild(sparkle);
    
    // Add CSS for falling animation
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fall {
            to {
                transform: translateY(${window.innerHeight + 50}px);
                opacity: 0;
            }
        }
    `;
    
    if (!document.querySelector('#fall-style')) {
        style.id = 'fall-style';
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        sparkle.remove();
    }, 5000);
}

// Create sparkles periodically
setInterval(createSparkle, 300);

// Add click effect to the body
document.body.addEventListener('click', function(e) {
    // Create a small animation at the click position
    const clickEffect = document.createElement('div');
    clickEffect.innerHTML = '💖';
    clickEffect.style.position = 'fixed';
    clickEffect.style.left = e.clientX + 'px';
    clickEffect.style.top = e.clientY + 'px';
    clickEffect.style.fontSize = '20px';
    clickEffect.style.pointerEvents = 'none';
    clickEffect.style.zIndex = '1000';
    clickEffect.style.animation = 'clickEffect 1s ease-out forwards';
    
    document.body.appendChild(clickEffect);
    
    // Add CSS for click effect
    const clickStyle = document.createElement('style');
    clickStyle.innerHTML = `
        @keyframes clickEffect {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            50% {
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) scale(2);
                opacity: 0;
            }
        }
    `;
    
    if (!document.querySelector('#click-effect-style')) {
        clickStyle.id = 'click-effect-style';
        document.head.appendChild(clickStyle);
    }
    
    setTimeout(() => {
        clickEffect.remove();
    }, 1000);
});

// Audio controls functionality
playPauseBtn.addEventListener('click', function() {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        playPauseBtn.innerHTML = '⏸️';
    } else {
        backgroundMusic.pause();
        playPauseBtn.innerHTML = '▶️';
    }
});

volumeSlider.addEventListener('input', function() {
    backgroundMusic.volume = volumeSlider.value;
});