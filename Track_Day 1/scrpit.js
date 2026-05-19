// script.js - interactivity, apply now scroll, form handling, mobile toggle

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle (simple)
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.querySelector('.main-nav');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      if (navMenu.style.display === 'flex') {
        navMenu.style.display = 'none';
      } else {
        navMenu.style.display = 'flex';
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '70px';
        navMenu.style.left = '0';
        navMenu.style.width = '100%';
        navMenu.style.backgroundColor = '#0A1628';
        navMenu.style.padding = '1.5rem';
        navMenu.style.gap = '1rem';
      }
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        navMenu.style.display = '';
        navMenu.style.position = '';
      } else if (navMenu.style.display !== 'flex') {
        navMenu.style.display = '';
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