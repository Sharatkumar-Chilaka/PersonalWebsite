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

document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks?.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

// Section-scroll active state — only on the home page, where nav links use anchor hrefs
const isHomePage = document.querySelector('.hero#home') !== null;
if (isHomePage) {
  const sections = document.querySelectorAll('section[id]');
  const linkMap = new Map();
  document.querySelectorAll('.nav-link').forEach((link) => {
    const href = link.getAttribute('href') || '';
    if (href.startsWith('#')) linkMap.set(href.slice(1), link);
  });

  if (linkMap.size > 0) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            const link = id ? linkMap.get(id) : null;
            if (link) {
              document.querySelectorAll('.nav-link').forEach((l) => l.classList.remove('active'));
              link.classList.add('active');
            }
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => sectionObserver.observe(s));
  }
}

// Reveal-on-scroll animation (covers home + sub-pages)
const revealTargets = document.querySelectorAll(
  '.about-text, .about-image, .feature-card, .cta-band h2, .cta-band p, .cta-band .btn, ' +
  '.timeline-item, .blog-card, .gallery-item, .page-hero-content'
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

// Filter chips (blog + photography pages)
const filterChips = document.querySelectorAll('.filter-chip');
if (filterChips.length > 0) {
  filterChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const filter = chip.getAttribute('data-filter');
      const scope = chip.closest('.page-section') || document;
      filterChips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');

      const items = scope.querySelectorAll('[data-category]');
      items.forEach((item) => {
        const category = item.getAttribute('data-category');
        const show = filter === 'all' || category === filter;
        item.style.display = show ? '' : 'none';
      });
    });
  });
}

// Set current year in footer copyright
const copyright = document.querySelector('.copyright');
if (copyright) {
  copyright.textContent = `© ${new Date().getFullYear()} Sharatkumar Chilaka. All rights reserved.`;
}
