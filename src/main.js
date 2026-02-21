import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initThreeCore } from './modules/threeCore';
import { syncGitHubContent } from './modules/githubApi';
import { initTelemetry } from './modules/telemetry';

gsap.registerPlugin(ScrollTrigger);

// Initialize Evolution Modules
window.addEventListener('load', () => {
    // Hide Preloader
    const loader = document.getElementById('loader');
    if (loader) {
        gsap.to(loader, { opacity: 0, duration: 1, onComplete: () => loader.remove() });
    }

    // 1. Entrance Telemetry
    initTelemetry();

    // 2. 3D Mastery
    initThreeCore('#three-canvas', '#three-container');

    // 3. Automated Content
    syncGitHubContent();

    // 4. Cinematic Orchestration
    initCinematicAnimations();

    // 5. Legacy Interactions (Refactored)
    initBaseInteractions();

    // 6. Professional Console Greeting
    console.log("%c DRRK2 ENGINEERING PROTOCOL V2.0 ", "background: #AE9775; color: #09090B; font-weight: bold; padding: 4px; border-radius: 4px;");
    console.log("Systems Operational. Welcome to the core.");
});

function initCinematicAnimations() {
    const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1.5 } });

    tl.to('.hero-title', { opacity: 1, y: 0, stagger: 0.2 })
        .to('.hero-subtitle', { opacity: 1, y: 0 }, "-=1")
        .to('.hero-btns', { opacity: 1, y: 0 }, "-=1")
        .from('.navbar', { y: -100, opacity: 0 }, "-=1.5");
}

function initBaseInteractions() {
    // Magnetic Mouse for Buttons & Cards
    document.querySelectorAll('.glass-card, .service-card-flip, .btn, .hero-title').forEach(el => {
        el.addEventListener('mousemove', e => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            el.style.setProperty('--x', `${x}px`);
            el.style.setProperty('--y', `${y}px`);

            if (el.classList.contains('btn') || el.classList.contains('hero-title')) {
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const deltaX = (x - centerX) * 0.15;
                const deltaY = (y - centerY) * 0.15;
                gsap.to(el, { x: deltaX, y: deltaY, duration: 0.4, ease: "power2.out" });
            }
        });

        el.addEventListener('mouseleave', () => {
            if (el.classList.contains('btn') || el.classList.contains('hero-title')) {
                gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
            }
        });

        if (el.classList.contains('service-card-flip')) {
            el.addEventListener('click', () => {
                el.classList.toggle('is-flipped');
            });
        }
    });

    // Custom Cursor Interpolation
    const cursorGlow = document.querySelector('.cursor-glow');
    let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (e.target.closest('a, button, .glass-card, .service-card-flip')) {
            gsap.to(cursorGlow, { width: 150, height: 150, opacity: 1, duration: 0.4 });
        } else {
            gsap.to(cursorGlow, { width: 400, height: 400, opacity: 0.3, duration: 0.4 });
        }
    });

    function animateCursor() {
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;
        if (cursorGlow) {
            cursorGlow.style.left = `${glowX}px`;
            cursorGlow.style.top = `${glowY}px`;
        }
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
}

// Global reveal logic for other sections
gsap.utils.toArray('.reveal-element').forEach(el => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none"
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
});

// Dynamic Tab Title
const originalTitle = document.title;
window.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.title = "🛡️ Protocol Paused...";
    } else {
        document.title = originalTitle;
    }
});
