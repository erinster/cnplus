// =====Header & Hero=====
export function initHeader(debounce) {
    const navbar = document.querySelector('.navbar');
    const ctaMenu = document.querySelector('.cta-menu');
    const heroSection = document.querySelector('#hero-section');

    let triggerPoint = 0;
    let ticking = false;
    let lastScrollTop = 0;
    let isFloatMode = true;
    let hasExitedFloatMode = false;
    let isInitialDelayActive = false;

    // Trigger Point Logic
    function setTriggerPoint() {
    if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        triggerPoint = heroHeight * 0.85;
    } else {
        triggerPoint = window.innerHeight * 0.85;
    }
    }

    setTriggerPoint();

    window.addEventListener('resize', debounce(() => {
    setTriggerPoint();
    }, 200));

    // Resize Handler untuk CTA Button
    window.addEventListener('resize', () => {
    const ctaButton = document.querySelector('.cta-button');
    if (!ctaButton) return;

    const viewportWidth = window.innerWidth;
    const buttonWidth = ctaButton.offsetWidth;

    if (ctaButton.offsetLeft + buttonWidth > viewportWidth) {
        ctaButton.style.right = `${viewportWidth - buttonWidth}px`;
    }
    });

    // Scroll Logic
    function onScroll() {
    const currentScroll = window.scrollY;

    if (currentScroll > triggerPoint) {
        navbar.classList.remove('float');
        ctaMenu.classList.add('show');
        isFloatMode = false;
        navbar.style.top = '0';

        // Delayed hide for mobile
        if (!hasExitedFloatMode && isMobileView()) {
        isInitialDelayActive = true;

        setTimeout(() => {
            navbar.style.top = '-80px';
            hasExitedFloatMode = true;
            isInitialDelayActive = false;
        }, 3000); // Delay 3 detik untuk efek awal
        }
    } else {
        navbar.classList.add('float');
        ctaMenu.classList.remove('show');
        isFloatMode = true;
        navbar.style.top = '1rem';
        hasExitedFloatMode = false;
        isInitialDelayActive = false;
        lastScrollTop = Math.max(currentScroll, 0);
    }
    // Handle animasi hide/show
    handleHeaderAnimation();
    }

    function isMobileView() {
    return window.matchMedia(
        '(max-width: 768px) or (max-height: 500px) or (max-aspect-ratio: 13/9)'
    ).matches;
    }

    // Animasi header hide/show pada mobile
    function handleHeaderAnimation() {
    const currentScroll = window.scrollY;
    const navLinks = document.querySelector('.nav-links');
    const hamburgerInput = document.querySelector('.hamburger input');

    // Hanya jalankan jika di mobile
    if (!isMobileView()) return;

    // Skip selama delay awal berlangsung
    if (isInitialDelayActive || isFloatMode) return;

    if (currentScroll > lastScrollTop) {
        // Scroll ke bawah → sembunyikan header
        navbar.style.top = '-80px';
        // Tutup hamburger menu jika sedang terbuka
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
        if (hamburgerInput && hamburgerInput.checked) {
            hamburgerInput.checked = false; // Uncheck checkbox
        }

        
    } else if (lastScrollTop > currentScroll) {
        // Scroll ke atas → tampilkan header
        navbar.style.top = '0';
    }

    lastScrollTop = Math.max(currentScroll, 0);
    }

    // Scroll Event Listener
    window.addEventListener('scroll', debounce(() => {
    if (!ticking) {
        requestAnimationFrame(() => {
        onScroll();
        ticking = false;
        });
        ticking = true;
    }
    }, 50));
}

document.addEventListener('click', function (e) {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger input');

    if (
        navLinks &&
        navLinks.classList.contains('active') &&
        !e.target.closest('.nav-links') &&
        !e.target.closest('.hamburger')
    ) {
        navLinks.classList.remove('active');
        if (hamburger) hamburger.checked = false;
    }
});