/* ============================================
   STELLAS — JAVASCRIPT
   ============================================ */

/* ---- SCROLL FADE IN ---- */
const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.bento-card, .review-card, .pricing-card, .video-card, .screenshot-slide').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  observer.observe(el);
});

/* ---- SLIDER ---- */
let currentSlide = 0;
const track = document.getElementById('screenshots-track');
const slides = document.querySelectorAll('.screenshot-slide');
const totalSlides = slides.length;
const dotsContainer = document.getElementById('slider-dots');

// Create dots
slides.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.className = 'dot' + (i === 0 ? ' active' : '');
  dot.onclick = () => goToSlide(i);
  dotsContainer.appendChild(dot);
});

function goToSlide(index) {
  currentSlide = (index + totalSlides) % totalSlides;
  const slideWidth = slides[0].offsetWidth + 20; // gap
  track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;

  document.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('active', i === currentSlide);
  });
}

function slideChange(dir) {
  goToSlide(currentSlide + dir);
}

// Auto-slide
setInterval(() => slideChange(1), 4000);

// Touch / drag support
let startX = 0;
const slider = document.getElementById('screenshots-slider');

slider.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
slider.addEventListener('touchend', e => {
  const diff = startX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) slideChange(diff > 0 ? 1 : -1);
});

/* ---- NAVBAR SCROLL STYLE ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.style.background = 'rgba(0, 0, 0, 0.88)';
  } else {
    navbar.style.background = 'rgba(0, 0, 0, 0.7)';
  }
}, { passive: true });

/* ---- HERO PARALLAX ---- */
const heroMockup = document.querySelector('.hero-mockup');
window.addEventListener('scroll', () => {
  if (!heroMockup) return;
  const scrolled = window.scrollY;
  if (scrolled < window.innerHeight) {
    heroMockup.style.transform = `translateY(${scrolled * 0.08}px)`;
  }
}, { passive: true });

/* ---- SMOOTH ACTIVE NAV LINKS ---- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY + 100 >= section.offsetTop) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    link.style.color = link.href.includes(current) ? '#f5f5f7' : '';
  });
}, { passive: true });

/* ---- STAGGERED BENTO CARD ANIMATIONS ---- */
const bentoCards = document.querySelectorAll('.bento-card');
bentoCards.forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.07}s`;
});

const reviewCards = document.querySelectorAll('.review-card');
reviewCards.forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.08}s`;
});

const pricingCards = document.querySelectorAll('.pricing-card');
pricingCards.forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.1}s`;
});

/* ---- CURSOR GLOW EFFECT on HERO ---- */
const hero = document.querySelector('.hero');
if (hero) {
  hero.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    hero.style.setProperty('--mouse-x', x + 'px');
    hero.style.setProperty('--mouse-y', y + 'px');
  });
}

console.log('%c🇩🇪 Stellas Platform — Landing Page', 'color: #2997ff; font-size: 16px; font-weight: bold;');
