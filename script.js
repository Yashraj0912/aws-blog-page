/* ============================================================
   AWS Learning Portal - Main JavaScript
   Features:
   - Hamburger menu toggle (mobile)
   - Service card search/filter
   - Fade-in animations on scroll
   - Active nav link highlighting
   ============================================================ */

// ─── Wait for the DOM to be fully loaded ───────────────────
document.addEventListener('DOMContentLoaded', function () {

  /* ==========================================
     1. HAMBURGER MENU TOGGLE (Mobile Nav)
     ========================================== */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      // Toggle the 'open' class on both elements
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close the menu when any nav link is clicked (nice UX on mobile)
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }


  /* ==========================================
     2. ACTIVE NAVIGATION LINK HIGHLIGHT
        Marks the current page's link as active
     ========================================== */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const allNavLinks = document.querySelectorAll('.nav-links a');

  allNavLinks.forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });


  /* ==========================================
     3. SERVICE CARD SEARCH / FILTER
        Filters cards by name in real-time
     ========================================== */
  const searchInput = document.getElementById('serviceSearch');
  const serviceCards = document.querySelectorAll('.service-card');
  const noResults    = document.getElementById('noResults');

  if (searchInput && serviceCards.length > 0) {
    searchInput.addEventListener('input', function () {
      const query = this.value.trim().toLowerCase();
      let visibleCount = 0;

      serviceCards.forEach(function (card) {
        // Search inside the card's h3 (name) and p (description)
        const name = card.querySelector('h3') ? card.querySelector('h3').textContent.toLowerCase() : '';
        const desc = card.querySelector('p')  ? card.querySelector('p').textContent.toLowerCase()  : '';

        if (name.includes(query) || desc.includes(query)) {
          card.style.display = '';       // Show the card
          card.classList.add('fade-in', 'visible');
          visibleCount++;
        } else {
          card.style.display = 'none';  // Hide the card
        }
      });

      // Show "no results" message if nothing matches
      if (noResults) {
        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    });
  }

  // Also support the nav search bar on all pages
  const navSearchInput = document.getElementById('navSearchInput');
  if (navSearchInput) {
    navSearchInput.addEventListener('keydown', function (e) {
      // On Enter, redirect to home page with search term
      if (e.key === 'Enter' && this.value.trim()) {
        window.location.href = 'index.html#categories';
      }
    });
  }


  /* ==========================================
     4. FADE-IN ANIMATION ON SCROLL
        Cards fade up as they enter the viewport
     ========================================== */
  const fadeElements = document.querySelectorAll('.fade-in');

  // Use IntersectionObserver for efficient scroll detection
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Stop observing once visible (animation plays once)
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,        // Trigger when 12% of element is visible
      rootMargin: '0px 0px -30px 0px'  // Slight offset from bottom
    }
  );

  fadeElements.forEach(function (el) {
    observer.observe(el);
  });


  /* ==========================================
     5. STAGGERED CARD ANIMATION
        Adds slight delay to each card for
        a cascading reveal effect
     ========================================== */
  const cards = document.querySelectorAll('.service-card, .category-card');

  cards.forEach(function (card, index) {
    card.style.transitionDelay = (index * 0.05) + 's';  // 50ms stagger
    card.classList.add('fade-in');
    observer.observe(card);
  });

});
/* ─── End of script.js ─────────────────────────────────── */
