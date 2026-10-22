// Canonical list of services for Eternity Customz.
// This is the single source of truth shared by index.html, quote.html and
// services.html. Update a service here and every page stays in sync.
//

/**
 * Services Page for Eternity Customz 
 * 1. Vinyl Wrap
 *   - Full Wrap
 *   - Partial Wrap
 *   - Livery/Decals
 *   - Chrome Delete
 * 2. Tint
 * 3. PPF
 *   - Clear bra
 * 4. Ceramic Coating
 * 5. Paint Correction
 * 6. Detailing
 *   - Interior and exterior
 * 7. After-Market Cosmetic Installation (hrly)
 */
const SERVICE_CATEGORIES = [
  {
    id: 'vinyl-wrap',
    title: 'Vinyl Wrap',
    shortDesc: 'Premium cast-film color changes and accents.',
    longDesc:
      'Premium cast-film color changes and accents installed with precision panel coverage for a factory-smooth finish.',
    image: 'images/nardoQ.jpeg',
    options: [
      { name: 'Full Color Wrap', image: 'images/full-wrap.jpeg', desc: 'Complete panel-off color change in premium cast film.' },
      { name: 'Partial Wrap', image: 'images/partial-wrap.jpeg' , desc: 'Roof, hood, mirrors or accent panels.' },
      { name: 'Chrome Delete', image: 'images/chrome-delete.jpeg', desc: 'Gloss or satin black trim conversion.' },
      { name: 'Livery/Decals', image: 'images/decal-wrap.jpeg', desc: 'Custom graphics and decals for your vehicle.' },
    ],
  },
  { 
    id: 'ppf',
    title: 'Paint Protection Film',
    shortDesc: 'Self-healing clear film that guards your paint.',
    longDesc:
      'Self-healing clear film that guards your paint against rock chips, scratches, and road debris.',
    image: 'images/red-supra.jpeg',
    options: [
      { name: 'Clear Bra', image: 'images/clear-bra.jpeg', desc: 'Transparent protective film for the front of your vehicle.' },
      { name: 'Full Body', image: 'images/full-wrap.jpeg', desc: 'Complete coverage on every painted panel.' },
      { name: 'Custom Panels', image: 'images/partial-wrap.jpeg', desc: 'Tailored coverage for specific areas of your vehicle.' }
    ],
  },
  {
    id: 'tint',
    title: 'Window Tinting',
    shortDesc: 'High-quality window tinting for privacy and UV protection.',
    longDesc: 'High-quality window tinting that enhances privacy, reduces glare, and protects your interior from harmful UV rays.',
    image: 'images/shiny-vette.jpeg',
    options: [
      { name: 'Full Tint', image: 'images/full-tint.jpg', desc: 'Windshield, front windows, and rear windows' },
      { name: 'Front Windows Tint', image: 'images/front-tint.jpg', desc: 'Driver side and passenger side front windows' },
      { name: 'Rear Windows Tint', image: 'images/rear-tint.jpg', desc: 'Driver side and passenger side rear windows' },
    ],
  },
  {
    id: 'ceramic-coating',
    title: 'Ceramic Coating',
    shortDesc: 'Hydrophobic coatings for lasting gloss and protection.',
    longDesc: 'Hydrophobic coatings that lock in lasting gloss and make washing effortless.',
    image: 'images/rainy-vette.png',
    options: [
      { name: '1-Year Coating', desc: 'Entry-level shine and protection.' },
      { name: '5-Year Coating', desc: 'Long-lasting hydrophobic protection.' },
      { name: '9H Graphene', desc: 'Our hardest, most durable finish.' },
    ],
  },
  {
    id: 'detailing',
    title: 'Detailing',
    shortDesc: 'Interior and exterior restoration services.',
    longDesc:
      'Interior and exterior restoration services that bring your vehicle back to showroom condition.',
    image: 'images/interior-vette.jpg',
    options: [
      { name: 'Interior Detail', desc: 'Deep clean and condition of the cabin.' },
      { name: 'Exterior Detail', desc: 'Wash, decontamination and seal.' },
      { name: 'Paint Correction', desc: 'Multi-stage swirl and scratch removal.' },
    ],
  },
  {
    id: 'paint-correction',
    title: 'Paint Correction',
    shortDesc: 'Restore your paint to flawless condition.',
    longDesc:
      'Multi-stage process to remove swirls, scratches, and imperfections, bringing your paint back to a showroom finish.',
    image: 'images/eternityboys-accent.jpeg',
    options: [
      { name: 'Single-Stage Correction', desc: 'Removes light swirls and scratches.' },
      { name: 'Multi-Stage Correction', desc: 'Comprehensive paint restoration for deeper imperfections.' },
      { name: 'Full Correction', desc: 'Complete paint correction for a flawless finish.' },
    ],
  },
  {
    id: 'after-market',
    title: 'After-Market Cosmetic Installation',
    shortDesc: 'Professional installation of aftermarket cosmetic enhancements.',
    longDesc:
      'Expert installation of aftermarket cosmetic parts to enhance the appearance of your vehicle. Due to the custom nature of these installations, this service is hourly based. Please contact us to know more.',
    image: 'images/blue-supra-accent.jpeg',
  },
];

// Homepage "Our Services" overview cards.
function renderHomeServices() {
  const grid = document.getElementById('home-services');
  if (!grid) return;
  grid.innerHTML = SERVICE_CATEGORIES.map((service) => {
    const options = service.options || [];
    const optionList = options.length
      ? `<span class="service-card__options">${options
          .map((option) => `<span class="service-card__option">${option.name}</span>`)
          .join('')}</span>`
      : '';
    return `
    <article class="service-card">
      <span class="service-card__head">
        <span class="service-card__title">${service.title}</span>
      </span>
      <span class="service-card__desc">${service.shortDesc}</span>
      ${optionList}
    </article>`;
  }).join('');
}

// Quote form service picker: each category is a card listing its options as checkboxes.
function renderQuoteServices() {
  const grid = document.getElementById('quote-services');
  if (!grid) return;
  const optionCheckbox = (value, name, desc) => `
        <label class="service-option">
          <input type="checkbox" name="service-type" value="${value}" />
          <span class="service-option__check" aria-hidden="true"></span>
          <span class="service-option__text">
            <span class="service-option__name">${name}</span>
            <span class="service-option__desc">${desc}</span>
          </span>
        </label>`;
  grid.innerHTML = SERVICE_CATEGORIES.map((service) => {
    const options = service.options || [];
    const items = options.length
      ? options.map((option) => optionCheckbox(`${service.title} \u2013 ${option.name}`, option.name, option.desc)).join('')
      : optionCheckbox(service.title, service.title, service.shortDesc);
    return `
    <div class="service-card service-card--group">
      <button type="button" class="service-card__trigger" aria-expanded="false">
        <span class="service-card__head">
          <span class="service-card__title">${service.title}</span>
          <span class="service-card__chevron" aria-hidden="true"></span>
        </span>
        <span class="service-card__desc">${service.shortDesc}</span>
      </button>
      <div class="service-card__panel">
        <div class="service-options">${items}</div>
      </div>
    </div>`;
  }).join('');
}

// Services page cards that open the details modal (title, image, sub-options).
function renderServiceCards() {
  const grid = document.getElementById('service-cards');
  if (!grid) return;
  grid.innerHTML = SERVICE_CATEGORIES.map((service) => `
    <article class="service-card" id="${service.id}">
      <button type="button" class="service-card__toggle" aria-haspopup="dialog"
        data-service-title="${service.title}"
        data-service-desc="${service.longDesc}"
        data-service-img="${service.image}">
        <span class="service-card__media">
          <img src="${service.image}" alt="${service.title} service" />
        </span>
        <span class="service-card__head">
          <span class="service-card__title">${service.title}</span>
        </span>
        <span class="service-card__desc">${service.shortDesc}</span>
      </button>
      <template class="service-card__options">
        ${(service.options || []).map((option) => `<li>
          <img class="service-modal__option-img" src="${option.image}" alt="" />
          <span class="service-modal__option-name">${option.name}</span>
          <span class="service-modal__option-desc">${option.desc}</span>
        </li>`).join('')}
      </template>
    </article>`).join('');
}

// Services dropdown in the site header (called after the header is injected).
function renderServiceNav() {
  const menu = document.querySelector('.nav-services-dropdown');
  if (!menu) return;
  menu.innerHTML = SERVICE_CATEGORIES.map((service) =>
    `<a href="services.html#${service.id}">${service.title}</a>`
  ).join('');
}

// Render synchronously so main.js can wire up the cards it finds afterwards.
renderHomeServices();
renderQuoteServices();
renderServiceCards();
