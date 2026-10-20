// Shared site behavior

// Formspree endpoint that receives contact & quote submissions and emails them to you.
// Create a form at https://formspree.io and paste its endpoint here (e.g. https://formspree.io/f/abcdwxyz).
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/your-form-id';

// POST form data to Formspree; resolves true on success.
async function sendSubmission(payload) {
  const response = await fetch(FORMSPREE_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  });
  return response.ok;
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('header.html')
    .then(response => {
      if(!response.ok) {
        throw new Error('Could not load header');
      }
      return response.text();
    })
    .then(html => {
      document.getElementById('header-placeholder').innerHTML = html;
      initNav(); // wire up nav once the header markup exists
      if (typeof renderServiceNav === 'function') renderServiceNav();
    })
    .catch(error => {
      console.error('Error loading header:', error);
    });

  fetch('footer.html')
    .then(response => {
      if(!response.ok) {
        throw new Error('Could not load footer');
      }
      return response.text();
    })
    .then(html => {
      const placeholder = document.getElementById('footer-placeholder');
      if (placeholder) {
        placeholder.innerHTML = html;
        initFooter(); // set the year once the footer markup exists
      }
    })
    .catch(error => {
      console.error('Error loading footer:', error);
    });
});

// Set current year in footer
function initFooter() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

// Mobile navigation toggle (full-screen overlay menu)
function initNav() {
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');
  if (!navToggle || !navList) return;

  navToggle.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('active');
    document.documentElement.classList.toggle('nav-open', isOpen);
    document.body.classList.toggle('nav-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close the menu after choosing a link
  navList.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navList.classList.remove('active');
      document.documentElement.classList.remove('nav-open');
      document.body.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Contact form validation (client-side only)
const form = document.getElementById('contact-form');
if (form) {
  const status = document.getElementById('form-status');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    status.textContent = '';
    status.className = 'form-status';

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !message) {
      status.textContent = 'Please fill in all fields.';
      status.classList.add('error');
      return;
    }

    if (!emailPattern.test(email)) {
      status.textContent = 'Please enter a valid email address.';
      status.classList.add('error');
      return;
    }

    const submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;
    status.textContent = 'Sending…';

    try {
      const ok = await sendSubmission({
        _subject: `New message from ${name}`,
        name,
        email,
        message,
      });
      if (!ok) throw new Error('Submission failed');
      status.textContent = 'Thanks! Your message has been sent.';
      status.classList.add('success');
      form.reset();
    } catch (error) {
      status.textContent = 'Sorry, something went wrong. Please try again.';
      status.classList.add('error');
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
}

// Build Your Quote form validation (client-side only)
const quoteForm = document.getElementById('quote-form');
if (quoteForm) {
  const quoteStatus = document.getElementById('quote-status');

  quoteForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    quoteStatus.textContent = '';
    quoteStatus.className = 'form-status';

    const data = new FormData(quoteForm);
    const carType = data.get('car-type');
    const services = data.getAll('service-type');
    const color = data.get('color') || (data.get('custom-color') || '').trim();
    const fullName = (data.get('full-name') || '').trim();
    const email = (data.get('email') || '').trim();
    const phone = (data.get('phone') || '').trim();
    const vehicle = (data.get('vehicle') || '').trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const showError = (message) => {
      quoteStatus.textContent = message;
      quoteStatus.classList.add('error');
    };

    if (!carType) {
      return showError('Please select a vehicle class.');
    }
    if (services.length === 0) {
      return showError('Please select at least one service.');
    }
    if (!color) {
      return showError('Please select or enter a wrap colour.');
    }
    if (!fullName || !email || !phone || !vehicle) {
      return showError('Please fill in all required details.');
    }
    if (!emailPattern.test(email)) {
      return showError('Please enter a valid email address.');
    }

    const details = (data.get('details') || '').trim();
    const submitBtn = quoteForm.querySelector('[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;
    quoteStatus.textContent = 'Sending…';

    try {
      const ok = await sendSubmission({
        _subject: `Quote request from ${fullName}`,
        name: fullName,
        email,
        phone,
        vehicle,
        vehicleClass: carType,
        services: services.join(', '),
        wrapColour: color,
        details: details || '(none)',
      });
      if (!ok) throw new Error('Submission failed');
      quoteStatus.textContent = 'Thanks! Your quote request has been submitted.';
      quoteStatus.classList.add('success');
      quoteForm.reset();
    } catch (error) {
      quoteStatus.textContent = 'Sorry, something went wrong. Please try again.';
      quoteStatus.classList.add('error');
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
}

// Make wrap-colour palette groups collapsible
const paletteGroups = document.querySelectorAll('.palette-group');
paletteGroups.forEach((group) => {
  const label = group.querySelector('.palette-group__label');
  const grid = group.querySelector('.swatch-grid');
  if (!label || !grid) return;

  // Wrap the swatch grid so it can animate its height when collapsed
  const panel = document.createElement('div');
  panel.className = 'palette-group__panel';
  grid.parentNode.insertBefore(panel, grid);
  panel.appendChild(grid);

  // Turn the label into an accessible toggle button
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'palette-group__toggle';
  toggle.setAttribute('aria-expanded', 'false');
  label.parentNode.insertBefore(toggle, label);
  toggle.appendChild(label);

  const chevron = document.createElement('span');
  chevron.className = 'palette-group__chevron';
  chevron.setAttribute('aria-hidden', 'true');
  toggle.appendChild(chevron);

  // Start collapsed
  group.classList.add('is-collapsed');

  toggle.addEventListener('click', () => {
    const collapsed = group.classList.toggle('is-collapsed');
    toggle.setAttribute('aria-expanded', String(!collapsed));
  });
});

// Selecting the custom colour field also selects its radio option
const customColorInput = document.querySelector('.swatch-custom__input');
if (customColorInput) {
  const customRadio = customColorInput
    .closest('.swatch-custom')
    ?.querySelector('input[type="radio"]');
  if (customRadio) {
    const selectCustom = () => { customRadio.checked = true; };
    customColorInput.addEventListener('focus', selectCustom);
    customColorInput.addEventListener('input', selectCustom);
  }
}

// Vehicle gallery: open a fade-in modal with the clicked car's details
const vehicleModal = document.getElementById('vehicle-modal');
if (vehicleModal) {
  const modalImg = vehicleModal.querySelector('.vehicle-modal__img');
  const modalService = vehicleModal.querySelector('.vehicle-modal__service');
  const modalTitle = vehicleModal.querySelector('.vehicle-modal__title');
  const modalDetail = vehicleModal.querySelector('.vehicle-modal__detail');

  const openModal = (card) => {
    const img = card.querySelector('img');
    modalImg.src = img ? img.src : '';
    modalImg.alt = card.dataset.title || '';
    modalService.textContent = card.dataset.service || '';
    modalTitle.textContent = card.dataset.title || '';
    modalDetail.textContent = card.dataset.detail || '';
    vehicleModal.classList.add('is-open');
    vehicleModal.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('nav-open'); // reuse scroll lock
    document.body.classList.add('nav-open');
    document.querySelector('.vehicle-gallery')?.classList.add('is-paused');
  };

  const closeModal = () => {
    vehicleModal.classList.remove('is-open');
    vehicleModal.setAttribute('aria-hidden', 'true');
    document.documentElement.classList.remove('nav-open');
    document.body.classList.remove('nav-open');
    document.querySelector('.vehicle-gallery')?.classList.remove('is-paused');
  };

  document.querySelectorAll('.vehicle-card').forEach((card) => {
    card.addEventListener('click', () => openModal(card));
  });

  vehicleModal.querySelectorAll('[data-close]').forEach((el) => {
    el.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && vehicleModal.classList.contains('is-open')) {
      closeModal();
    }
  });
}

// Slide service cards into view as they scroll into the viewport
const revealTargets = document.querySelectorAll('.service-feature-info, .vinyl-feature-card, .service-card');
if (revealTargets.length) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  } else {
    revealTargets.forEach((el) => el.classList.add('reveal-on-scroll'));

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealTargets.forEach((el) => revealObserver.observe(el));
  }
}

// Service cards: click to open a popup with more information about the service
const serviceModal = document.getElementById('service-modal');
if (serviceModal) {
  const modalImg = serviceModal.querySelector('.service-modal__img');
  const modalTitle = serviceModal.querySelector('.service-modal__title');
  const modalDetail = serviceModal.querySelector('.service-modal__detail');
  const modalOptions = serviceModal.querySelector('.service-modal__options');

  const openServiceModal = (toggle) => {
    const img = toggle.dataset.serviceImg || '';
    modalImg.src = img;
    modalImg.alt = toggle.dataset.serviceTitle || '';
    modalTitle.textContent = toggle.dataset.serviceTitle || '';
    modalDetail.textContent = toggle.dataset.serviceDesc || '';

    modalOptions.innerHTML = '';
    const template = toggle.closest('.service-card')?.querySelector('.service-card__options');
    if (template) modalOptions.appendChild(template.content.cloneNode(true));

    serviceModal.classList.add('is-open');
    serviceModal.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('nav-open'); // reuse scroll lock
    document.body.classList.add('nav-open');
  };

  const closeServiceModal = () => {
    serviceModal.classList.remove('is-open');
    serviceModal.setAttribute('aria-hidden', 'true');
    document.documentElement.classList.remove('nav-open');
    document.body.classList.remove('nav-open');
  };

  document.querySelectorAll('.service-card__toggle').forEach((toggle) => {
    toggle.addEventListener('click', () => openServiceModal(toggle));
  });

  serviceModal.querySelectorAll('[data-close]').forEach((el) => {
    el.addEventListener('click', closeServiceModal);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && serviceModal.classList.contains('is-open')) {
      closeServiceModal();
    }
  });

  // Open a service's modal when the page is reached with a matching #hash
  const openServiceFromHash = () => {
    const id = decodeURIComponent(location.hash.slice(1));
    const toggle = id && document.getElementById(id)?.querySelector('.service-card__toggle');
    if (toggle) openServiceModal(toggle);
  };

  openServiceFromHash();
  window.addEventListener('hashchange', openServiceFromHash);
}

// Quote services: accordion dropdowns (one open at a time; closing clears its selections)
const quoteServiceGrid = document.getElementById('quote-services');
if (quoteServiceGrid) {
  const groups = quoteServiceGrid.querySelectorAll('.service-card--group');

  quoteServiceGrid.addEventListener('click', (event) => {
    const trigger = event.target.closest('.service-card__trigger');
    if (!trigger) return;

    const group = trigger.closest('.service-card--group');
    const willOpen = !group.classList.contains('is-open');

    groups.forEach((g) => {
      const open = g === group && willOpen;
      g.classList.toggle('is-open', open);
      g.querySelector('.service-card__trigger')?.setAttribute('aria-expanded', String(open));
      if (!open) {
        g.querySelectorAll('input[type="checkbox"]').forEach((cb) => { cb.checked = false; });
      }
    });
  });

  // Only one option may be selected at a time across every service
  quoteServiceGrid.addEventListener('change', (event) => {
    const input = event.target;
    if (input.name !== 'service-type' || !input.checked) return;
    quoteServiceGrid.querySelectorAll('input[name="service-type"]').forEach((cb) => {
      if (cb !== input) cb.checked = false;
    });
  });
}
