// Navbar background on scroll
const navbar = document.getElementById('navbar');
const onScroll = () => {
  if (window.scrollY > 30) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');
menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close mobile menu when a nav link is clicked
document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

// Active nav link based on visible section
const sections = document.querySelectorAll('section[id]');
const linkMap = new Map();
document.querySelectorAll('.nav-link').forEach((link) => {
  const id = link.getAttribute('href')?.replace('#', '');
  if (id) linkMap.set(id, link);
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.nav-link').forEach((l) => l.classList.remove('active'));
        const id = entry.target.getAttribute('id');
        const link = id ? linkMap.get(id) : null;
        link?.classList.add('active');
      }
    });
  },
  { rootMargin: '-45% 0px -50% 0px' }
);
sections.forEach((s) => sectionObserver.observe(s));

// Reveal-on-scroll animation
const revealTargets = document.querySelectorAll(
  '.about-text, .about-image, .feature-card, .cta-band h2, .cta-band p, .cta-band .btn'
);
revealTargets.forEach((el) => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealTargets.forEach((el) => revealObserver.observe(el));

// Set current year in footer copyright
const copyright = document.querySelector('.copyright');
if (copyright) {
  copyright.textContent = `© ${new Date().getFullYear()} Sharatkumar Chilaka. All rights reserved.`;
}
