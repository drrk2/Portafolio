// 1. INTERSECTION OBSERVER CON STAGGER EFFECT
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('services-grid') || entry.target.classList.contains('projects-grid')) {
                const cards = entry.target.querySelectorAll('.reveal-element');
                cards.forEach((card, index) => {
                    setTimeout(() => { card.classList.add('reveal-active'); }, index * 150);
                });
            } else {
                entry.target.classList.add('reveal-active');
            }
            
            // Start counter animation if it's a stat section
            if (entry.target.classList.contains('grid-stats')) {
                const numbers = entry.target.querySelectorAll('.stat-number');
                numbers.forEach(num => {
                    const target = parseInt(num.getAttribute('data-target'));
                    animateCounter(num, target);
                });
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-element, .services-grid, .projects-grid, .grid-stats').forEach(el => observer.observe(el));

// 2. PARALLAX DINÁMICO ATADO AL SCROLL
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    const sphere = document.querySelector('.sphere');
    if(sphere) {
        sphere.style.transform = `translateY(${scrolled * 0.15}px) rotate(${scrolled * 0.02}deg)`;
    }
    
    const heroGlow = document.querySelector('.hero-glow');
    if(heroGlow) {
        heroGlow.style.transform = `translateY(${scrolled * 0.05}px)`;
    }
    
    const navbar = document.querySelector('.navbar');
    if(scrolled > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 3. MAGNETIC GLOW EN CARDS
document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
    });
});

// 4. CURSOR "GLOW BLOB"
const cursorGlow = document.querySelector('.cursor-glow');
let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Scale up glow if hovering interactive elements
    if (e.target.closest('a, button, .glass-card')) {
        cursorGlow.style.opacity = '1';
        cursorGlow.style.width = '200px';
        cursorGlow.style.height = '200px';
    } else {
        cursorGlow.style.opacity = '0.5';
        cursorGlow.style.width = '400px';
        cursorGlow.style.height = '400px';
    }
});

function animateCursor() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    if(cursorGlow) {
        cursorGlow.style.left = `${glowX}px`;
        cursorGlow.style.top = `${glowY}px`;
    }
    requestAnimationFrame(animateCursor);
}
animateCursor();

// 5. COUNTER ANIMATION
function animateCounter(element, target, duration = 2000) {
    let startTime = null;
    const startValue = 0;
    
    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const currentValue = Math.floor(progress * (target - startValue) + startValue);
        
        element.textContent = currentValue + (target === 99 ? '%' : '+');
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    }
    
    window.requestAnimationFrame(step);
}

// 6. PARTICLES (SIMPLE VERSION)
const particlesContainer = document.querySelector('.particles-container');
if (particlesContainer) {
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = 'var(--primary-300)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.opacity = Math.random() * 0.3;
        particle.style.pointerEvents = 'none';
        
        // Simple float animation
        particle.animate([
            { transform: 'translateY(0) translateX(0)', opacity: 0 },
            { transform: 'translateY(-100px) translateX(20px)', opacity: 0.5 },
            { transform: 'translateY(-200px) translateX(-20px)', opacity: 0 }
        ], {
            duration: 10000 + Math.random() * 5000,
            iterations: Infinity,
            delay: Math.random() * 5000
        });
        
        particlesContainer.appendChild(particle);
    }
}
