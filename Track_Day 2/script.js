// script.js - interactivity, animations, form handling, mobile toggle

// --- Intersection Observer for scroll-triggered animations ---
const animateObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      // Stagger children cards
      const cards = entry.target.querySelectorAll('.value-card, .track-card, .mission-card, .vision-card');
      cards.forEach((card, i) => {
        card.style.transitionDelay = `${i * 0.12}s`;
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            card.style.transition = `opacity 0.6s cubic-bezier(0.4,0,0.2,1), transform 0.6s cubic-bezier(0.4,0,0.2,1)`;
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        });
      });
      animateObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

// Observe all animate-on-scroll elements after DOM loads
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    animateObserver.observe(el);
  });

  // Header compact on scroll
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        header.style.padding = '0.5rem 0';
        header.style.boxShadow = '0 4px 40px rgba(0,0,0,0.25)';
      } else {
        header.style.padding = '';
        header.style.boxShadow = '';
      }
    }, { passive: true });
  }
});


document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle (class-based)
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.querySelector('.main-nav');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('mobile-open');
      // Toggle icon between bars and X
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
      }
    });
    // Close menu when a nav link is clicked (mobile UX)
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navMenu.classList.remove('mobile-open');
          const icon = mobileToggle.querySelector('i');
          if (icon) icon.className = 'fas fa-bars';
        }
      });
    });
    // Reset on resize to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        navMenu.classList.remove('mobile-open');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      }
    });
  }

  // SMOOTH SCROLL for Apply Now CTAs and track apply links
  const allApplyButtons = document.querySelectorAll('.cta-btn, .track-apply, .nav-apply');
  allApplyButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId.includes('#apply-cta')) {
        e.preventDefault();
        const applySection = document.getElementById('apply-cta');
        if (applySection) {
          applySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else if (targetId === '#') {
        // for main giant button we prevent default and scroll anyway
        e.preventDefault();
        const applyCta = document.getElementById('apply-cta');
        if (applyCta) applyCta.scrollIntoView({ behavior: 'smooth' });
      } else if (targetId && targetId !== '#') {
        // default anchor scroll
        const element = document.querySelector(targetId);
        if (element) {
          e.preventDefault();
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Form submission handler (simple demo)
  const form = document.getElementById('internApplyForm');
  const feedback = document.getElementById('formFeedback');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('applicantName')?.value.trim();
      const email = document.getElementById('applicantEmail')?.value.trim();
      const track = document.getElementById('trackSelect')?.value;
      if (!name || !email) {
        feedback.textContent = '❌ Please fill in name and email.';
        feedback.style.color = '#e11d48';
        return;
      }
      feedback.innerHTML = `✨ Thanks ${name}! Your interest in ${track} has been received. We'll reach out within 48h. 🚀`;
      feedback.style.color = '#10b981';
      form.reset();
      setTimeout(() => {
        feedback.textContent = '';
      }, 4000);
    });
  }
});