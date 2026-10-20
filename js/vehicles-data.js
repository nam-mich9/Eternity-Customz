// Single source of truth for the homepage gallery cars.
// Edit this list to add, remove, or reorder vehicles; the marquee duplicate set
// is generated automatically so the scrolling loop stays seamless.
const VEHICLES = [
  {
    title: 'Chevrolet Corvette',
    service: 'Full Vinyl Wrap',
    detail: 'Full satin-black vinyl wrap with precision panel coverage for a factory-smooth finish.',
    image: 'images/blackVette.jpeg',
    alt: 'Black Corvette full wrap',
  },
  {
    title: 'Chevrolet Corvette',
    service: 'Full Vinyl Wrap',
    detail: 'Side-profile wrap showcasing seamless edges along the doors and rocker panels.',
    image: 'images/blackVetteSide.jpeg',
    alt: 'Corvette side profile wrap',
  },
  {
    title: 'Custom Build',
    service: 'Colour Change Wrap',
    detail: 'Gloss blue colour-change wrap for a bold, head-turning transformation.',
    image: 'images/blue-vinyl.jpeg',
    alt: 'Blue vinyl wrap',
  },
  {
    title: 'Full Wrap Build',
    service: 'Full Colour Wrap',
    detail: 'Complete colour change with full coverage across every painted panel.',
    image: 'images/full_wrap.jpeg',
    alt: 'Full colour wrap',
  },
  {
    title: 'Accent Build',
    service: 'Partial Wrap',
    detail: 'Partial wrap on the hood, roof and mirrors to accent the factory paint.',
    image: 'images/partial_wrap.jpeg',
    alt: 'Partial wrap accents',
  },
  {
    title: 'Chevrolet Corvette',
    service: 'Paint Protection Film',
    detail: 'Clear PPF applied to the front end to guard against rock chips and scratches.',
    image: 'images/blackVetteCorner.jpeg',
    alt: 'Corvette front corner wrap',
  },
];

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function vehicleCard(vehicle, duplicate) {
  const alt = duplicate ? '' : escapeHtml(vehicle.alt || vehicle.title);
  const hidden = duplicate ? ' aria-hidden="true"' : '';
  return `
    <button class="vehicle-card"${hidden} data-title="${escapeHtml(vehicle.title)}" data-service="${escapeHtml(vehicle.service)}" data-detail="${escapeHtml(vehicle.detail)}">
      <img src="${escapeHtml(vehicle.image)}" alt="${alt}" />
    </button>`;
}

function renderVehicleGallery() {
  const track = document.getElementById('vehicle-track');
  if (!track) return;

  // Second (aria-hidden) set mirrors the first so the -50% marquee loops cleanly.
  const originals = VEHICLES.map((vehicle) => vehicleCard(vehicle, false)).join('');
  const duplicates = VEHICLES.map((vehicle) => vehicleCard(vehicle, true)).join('');
  track.innerHTML = originals + duplicates;
}

renderVehicleGallery();
