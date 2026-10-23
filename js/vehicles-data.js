// Single source of truth for the homepage gallery cars.
// Edit this list to add, remove, or reorder vehicles; the marquee duplicate set
// is generated automatically so the scrolling loop stays seamless.
const VEHICLES = [
  {
    title: 'Chevrolet C8 Corvette',
    service: 'Full Vinyl Wrap',
    detail: 'Matte Black Wrap',
    image: 'images/black-vette.jpg',
    alt: 'Black Corvette full wrap',
  },
  {
    title: 'Lexus RCF',
    service: 'Full Vinyl Wrap and Chrome Delete',
    detail: 'Gloss Metallic Porche Ice Blue Wrap',
    image: 'images/blue-lexus.jpeg',
    alt: 'Blue Lexus Wrap',
  },
  {
    title: 'Toyota MK5 Supra',
    service: 'Full Vinyl Wrap',
    detail: 'Sky Blue (Vinyl Frogs)',
    image: 'images/blue-supra.jpeg',
    alt: 'Blue Supra Wrap',
  },
  {
    title: 'Chevrolet C8 Corvette',
    service: 'Full Vinyl Wrap',
    detail: 'Matte Chrome Wrap',
    image: 'images/chrome-vette.jpeg',
    alt: 'Chrome Corvette Full Wrap',
  },
  {
    title: 'Ford Mustang',
    service: 'Full Vinyl Wrap',
    detail: 'Matte Chrome Green Wrap',
    image: 'images/green-stang.jpeg',
    alt: 'Green Mustang Full Wrap',
  },
  {
    title: 'Infiniti Q50',
    service: 'Full Vinyl Wrap',
    detail: 'Gloss Metallic Emerald Green Wrap',
    image: 'images/greenQ.jpeg',
    alt: 'Green Q50 Full Wrap',
  },
  {
    title: 'Kia K5 GT',
    service: 'Full Vinyl Wrap',
    detail: 'Matte Metallic Charcoal Grey Wrap',
    image: 'images/nardo-kia.jpeg',
    alt: 'Matte Grey K5 Full Wrap',
  },
  {
    title: 'Infiniti Q60',
    service: 'Full Vinyl Wrap',
    detail: 'Glossy Nardo Grey Wrap',
    image: 'images/nardo-q.jpeg',
    alt: 'Matte Grey K5 Full Wrap',
  },
  {
    title: 'Audi A4',
    service: 'Full Vinyl Wrap',
    detail: 'Black to Purple Gradient Wrap',
    image: 'images/purple-shift-audi.jpeg',
    alt: 'Black/Purple Gradient Full Wrap',
  },
  {
    title: 'Ford F150 Coyote 5.0',
    service: 'Full Vinyl Wrap',
    detail: 'Gloss Midnight Purple Wrap',
    image: 'images/purple-truck.jpeg',
    alt: 'Purple F150 Full Wrap',
  },
  {
    title: 'Toyota A90 Supra',
    service: 'Full Vinyl Wrap',
    detail: 'Rupeelite Purple Wrap',
    image: 'images/red-supra.jpeg',
    alt: 'Purple A90 Supra Full Wrap',
  },
  {
    title: 'BMW M235i',
    service: 'Full Vinyl Wrap',
    detail: 'Gloss Metallic Pagoda Red',
    image: 'images/violet-bmw.jpeg',
    alt: 'Red BMW Full Wrap',
  },
  {
    title: 'Subaru WRX Hatch',
    service: 'Full Vinyl Wrap',
    detail: 'Gloss Sunflower Yellow',
    image: 'images/yellow-side-blur.jpeg',
    alt: 'Yellow WRX Full Wrap',
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
