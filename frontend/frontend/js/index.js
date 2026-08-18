// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// Hamburger toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Animate hero ring stroke
const heroRing = document.getElementById('heroRing');
if (heroRing) {
  heroRing.style.strokeDashoffset = '502';
  setTimeout(() => {
    heroRing.style.transition = 'stroke-dashoffset 1.4s cubic-bezier(.4,0,.2,1)';
    heroRing.style.strokeDashoffset = '75';
  }, 400);
}
