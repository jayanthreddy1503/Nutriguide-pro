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

// Stat counter animation
function animateCount(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1800;
  const start = performance.now();
  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// Trigger stats when visible
const statNums = document.querySelectorAll('.stat-num');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCount(e.target);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
statNums.forEach(n => observer.observe(n));

// Animate hero ring stroke
const heroRing = document.getElementById('heroRing');
if (heroRing) {
  heroRing.style.strokeDashoffset = '502';
  setTimeout(() => {
    heroRing.style.transition = 'stroke-dashoffset 1.4s cubic-bezier(.4,0,.2,1)';
    heroRing.style.strokeDashoffset = '75';
  }, 400);
}
