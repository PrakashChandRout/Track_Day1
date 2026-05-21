// script.js - WeIntern interactivity, animations, form handling, mobile nav

// ========== AOS INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    duration: 600,
    easing: 'ease-out-cubic',
    once: true,
    offset: 60,
    disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
  });
});

// ========== SCROLL PROGRESS BAR ==========
const scrollProgress = document.getElementById('scrollProgress');
if (scrollProgress) {
  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = pct + '%';
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

// ========== BACK TO TOP BUTTON ==========
document.addEventListener('DOMContentLoaded', () => {
  const backToTop = document.getElementById('backToTop');
  if (!backToTop) return;

  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// ========== STICKY HEADER: add .scrolled class on scroll ==========
const header = document.getElementById('siteHeader');
if (header) {
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}

// ========== HAMBURGER / MOBILE NAV ==========
document.addEventListener('DOMContentLoaded', () => {
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('mainNav');

  if (mobileToggle && navMenu) {
    const openMenu = () => {
      navMenu.classList.add('mobile-open');
      mobileToggle.classList.add('open');
      mobileToggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('noscroll');
    };

    const closeMenu = () => {
      navMenu.classList.remove('mobile-open');
      mobileToggle.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('noscroll');
    };

    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('mobile-open');
      isOpen ? closeMenu() : openMenu();
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) closeMenu();
      });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) closeMenu();
    }, { passive: true });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target) && navMenu.classList.contains('mobile-open')) {
        closeMenu();
      }
    });
  }
});

// ========== SMOOTH SCROLL for all anchor links ==========
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerH = document.getElementById('siteHeader')?.offsetHeight || 70;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH - 12;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
});

// ========== ACTIVE NAV LINK on scroll ==========
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

  const activateLink = () => {
    const scrollY = window.scrollY + 100;
    let current = '';
    sections.forEach(section => {
      if (section.offsetTop <= scrollY) {
        current = '#' + section.id;
      }
    });
    navLinks.forEach(link => {
      link.style.color = '';
      if (link.getAttribute('href') === current && !link.classList.contains('nav-apply')) {
        link.style.color = 'var(--gold)';
      }
    });
  };

  window.addEventListener('scroll', activateLink, { passive: true });
  activateLink();
});

// ========== HELPERS for form validation ==========
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function showError(inputEl, errorEl, message) {
  inputEl.classList.add('error');
  inputEl.classList.remove('valid');
  errorEl.textContent = message;
}

function showValid(inputEl, errorEl) {
  inputEl.classList.remove('error');
  inputEl.classList.add('valid');
  errorEl.textContent = '';
}

function clearState(inputEl, errorEl) {
  inputEl.classList.remove('error', 'valid');
  errorEl.textContent = '';
}

// ========== QUICK EXPRESSION OF INTEREST FORM ==========
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('internApplyForm');
  const successBox = document.getElementById('quickFormSuccess');
  const successMsg = document.getElementById('quickSuccessMsg');

  if (!form) return;

  const nameInput  = document.getElementById('applicantName');
  const emailInput = document.getElementById('applicantEmail');
  const trackSel   = document.getElementById('trackSelect');
  const nameErr    = document.getElementById('nameError');
  const emailErr   = document.getElementById('emailError');
  const trackErr   = document.getElementById('trackError');

  // Real-time validation
  nameInput.addEventListener('blur', () => validateName(nameInput, nameErr));
  emailInput.addEventListener('blur', () => validateEmail(emailInput, emailErr));
  trackSel.addEventListener('change', () => validateSelect(trackSel, trackErr, 'Please select a track'));

  nameInput.addEventListener('input', () => {
    if (nameInput.classList.contains('error')) validateName(nameInput, nameErr);
  });
  emailInput.addEventListener('input', () => {
    if (emailInput.classList.contains('error')) validateEmail(emailInput, emailErr);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const n = validateName(nameInput, nameErr);
    const em = validateEmail(emailInput, emailErr);
    const t = validateSelect(trackSel, trackErr, 'Please select a track');

    if (!n || !em || !t) return;

    const name = nameInput.value.trim();
    const track = trackSel.value;

    form.style.display = 'none';
    successMsg.textContent = `Thanks ${name}! Your interest in "${track}" has been received.`;
    successBox.style.display = 'flex';
  });
});

// ========== CONTACT FORM ==========
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const successBox = document.getElementById('contactSuccess');
  const resetBtn = document.getElementById('resetContactForm');
  const msgArea = document.getElementById('contactMessage');
  const charCount = document.getElementById('charCount');
  const charCounter = charCount?.parentElement;

  if (!form) return;

  const nameInput   = document.getElementById('contactName');
  const emailInput  = document.getElementById('contactEmail');
  const domainSel   = document.getElementById('contactDomain');
  const nameErr     = document.getElementById('cNameError');
  const emailErr    = document.getElementById('cEmailError');
  const domainErr   = document.getElementById('cDomainError');
  const msgErr      = document.getElementById('cMessageError');

  // Character counter for message
  if (msgArea && charCount) {
    msgArea.addEventListener('input', () => {
      const len = msgArea.value.length;
      charCount.textContent = len;
      charCounter.classList.remove('warn', 'over');
      if (len >= 450) charCounter.classList.add('warn');
      if (len >= 500) charCounter.classList.add('over');
    });
  }

  // Real-time validation
  nameInput.addEventListener('blur', () => validateName(nameInput, nameErr));
  emailInput.addEventListener('blur', () => validateEmail(emailInput, emailErr));
  domainSel.addEventListener('change', () => validateSelect(domainSel, domainErr, 'Please select a domain'));
  msgArea.addEventListener('blur', () => validateMessage(msgArea, msgErr));

  nameInput.addEventListener('input', () => {
    if (nameInput.classList.contains('error')) validateName(nameInput, nameErr);
  });
  emailInput.addEventListener('input', () => {
    if (emailInput.classList.contains('error')) validateEmail(emailInput, emailErr);
  });
  msgArea.addEventListener('input', () => {
    if (msgArea.classList.contains('error')) validateMessage(msgArea, msgErr);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const n  = validateName(nameInput, nameErr);
    const em = validateEmail(emailInput, emailErr);
    const d  = validateSelect(domainSel, domainErr, 'Please select a domain');
    const m  = validateMessage(msgArea, msgErr);

    if (!n || !em || !d || !m) return;

    form.style.display = 'none';
    successBox.style.display = 'flex';
    successBox.style.flexDirection = 'column';
  });

  // Reset button
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      [nameInput, emailInput, domainSel, msgArea].forEach(el => clearState(el, { textContent: '' }));
      nameErr.textContent = '';
      emailErr.textContent = '';
      domainErr.textContent = '';
      msgErr.textContent = '';
      if (charCount) charCount.textContent = '0';
      if (charCounter) charCounter.classList.remove('warn', 'over');
      successBox.style.display = 'none';
      form.style.display = 'block';
    });
  }
});

// ========== VALIDATION HELPERS ==========
function validateName(input, errorEl) {
  const val = input.value.trim();
  if (!val) {
    showError(input, errorEl, 'Full name is required.');
    return false;
  }
  if (val.length < 2) {
    showError(input, errorEl, 'Name must be at least 2 characters.');
    return false;
  }
  if (val.length > 80) {
    showError(input, errorEl, 'Name must be under 80 characters.');
    return false;
  }
  showValid(input, errorEl);
  return true;
}

function validateEmail(input, errorEl) {
  const val = input.value.trim();
  if (!val) {
    showError(input, errorEl, 'Email address is required.');
    return false;
  }
  if (!EMAIL_REGEX.test(val)) {
    showError(input, errorEl, 'Please enter a valid email (e.g. you@example.com).');
    return false;
  }
  showValid(input, errorEl);
  return true;
}

function validateSelect(select, errorEl, msg) {
  if (!select.value) {
    showError(select, errorEl, msg);
    return false;
  }
  showValid(select, errorEl);
  return true;
}

function validateMessage(textarea, errorEl) {
  const val = textarea.value.trim();
  if (!val) {
    showError(textarea, errorEl, 'Please write a message.');
    return false;
  }
  if (val.length < 10) {
    showError(textarea, errorEl, 'Message must be at least 10 characters.');
    return false;
  }
  if (val.length > 500) {
    showError(textarea, errorEl, 'Message must not exceed 500 characters.');
    return false;
  }
  showValid(textarea, errorEl);
  return true;
}
