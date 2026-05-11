/* =====================================================
   PAWCO — search.js
   Arama sayfası: ürünler, filtreler, sıralama, sayfalama
   ===================================================== */
const brands   = ['Royal Canin','Hill\'s','Pro Plan','Orijen','Acana','Brit Care','Felicia','Reflex','Whiskas','Pedigree','Wanpy','Felix','ND','Pro Choice'];
const brandIds = ['royal-canin','hills','pro-plan','orijen','acana','brit-care','felicia','reflex','whiskas','pedigree','wanpy','felix','nd','pro-choice'];
 
/* ── MOCK ÜRÜN VERİSİ ──────────────────────────────── */
const MOCK_PRODUCTS = generateMockProducts();

function generateMockProducts() {
   const types    = ['kuru-mama','yas-mama','odul','vitamin','oyuncak','aksesuar','bakim','kum'];
  const animals  = ['kedi','kopek','kus','balik','kemirgen'];
  const weights  = ['400g','1kg','2kg','4kg','8kg','15kg','85g','200g','400ml'];

  const productNames = [
    'Yetişkin Kedi Maması Somon & Ton Balıklı',
    'Sterilised Kısırlaştırılmış Kedi Maması',
    'Puppy Yavru Köpek Maması Tavuklu',
    'Indoor Adult Kedi Maması',
    'Original Yetişkin Köpek Maması',
    'Six Fish Balıklı Tahılsız Kedi Maması',
    'Cat Urinary Care Kedi Maması',
    'Tavuklu Yetişkin Kedi Konservesi',
    'Dog Adult Köpek Maması Biftek & Sebzeli',
    'Kitten Yavru Kedi Maması',
    'Senior Yaşlı Kedi Maması',
    'Sensitive Hassas Köpek Maması',
    'Crunchy & Soft Köpek Ödülü',
    'Dental Snack Kedi Ödülü',
    'Kedi Krema Ödülü Ton Balıklı',
    'Omega 3 & 6 Kedi Vitamini',
    'Interaktif Tüy Oyuncak',
    'Ahşap Kedi Tırmalama Tahtası',
    'Bentonit Kedi Kumu Topaklanan',
    'Silica Jel Kedi Kumu Parfümsüz',
    'Köpek Tasma Gezdirme Seti',
    'Kedi Bakım Tarağı',
    'Tahılsız Köpek Maması Kuzu & Patates',
    'Light Diyet Kedi Maması',
    'Hairball Tüy Yumağı Önleyici Mama',
    'Hypoallergenic Alerjik Köpek Maması',
    'Monoprotein Hindili Kedi Maması',
    'Wet Food Paket Yaş Mama 12x85g',
    'Köpek Şampuanı Oatmeal',
    'Kedi Taşıma Çantası Havalandırmalı',
    'Indoor Long Hair Uzun Tüylü Kedi Maması',
    'Tavuk & Pirinç Köpek Maması',
    'Sardine & Anchovy Akdeniz Serisi',
    'Renal Support Böbrek Kedi Maması',
    'Puppy Mini Küçük Irk Yavru Köpek',
    'Gastro Intestinal Sindirim Köpek',
    'Natural Recipe Doğal İçerikli Kedi',
    'Multi-Cat Çok Kedili Evler İçin',
    'Large Breed Büyük Irk Köpek Maması',
    'Kedi Çeşme Su Pınarı 2L',
    'Otomatik Besleyici Kedi Mama Kabı',
    'Kedi Evi Ahşap Tasarımlı',
    'Köpek Yatağı Ortopedik Memory Foam',
    'Kedi Vitamini Malt Macunu',
    'Dental Sticks Köpek Diş Çubuğu',
    'Probiyotik Kedi Takviyesi',
    'Kuş Yemi Muhabbet Karışım',
    'Hamster Yemi Premium Karışım',
    'Balık Yemi Pul Tropical',
    'Kedi Pisi Pisi Şampuanı',
  ];

  const images = [
    'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&auto=format&fit=crop',
  ];

  const products = [];
  for (let i = 0; i < 96; i++) {
    const brandIdx   = i % brands.length;
    const price      = Math.round((Math.random() * 800 + 80) * 10) / 10;
    const hasDisc    = Math.random() > 0.55;
    const discPct    = hasDisc ? Math.floor(Math.random() * 30 + 5) : 0;
    const oldPrice   = hasDisc ? Math.round(price / (1 - discPct / 100) * 10) / 10 : null;
    const rating     = Math.round((Math.random() * 1.5 + 3.5) * 10) / 10;
    const reviewCount= Math.floor(Math.random() * 2400 + 10);
    const animalIdx  = Math.floor(Math.random() * animals.length);
    const typeIdx    = Math.floor(Math.random() * types.length);
    const imgIdx     = i % images.length;
    const isNew      = Math.random() > 0.85;
    const isBest     = Math.random() > 0.8;
    const freeShip   = price > 300 || Math.random() > 0.6;

    products.push({
      id:         i + 1,
      name:       productNames[i % productNames.length],
      brand:      brands[brandIdx],
      brandId:    brandIds[brandIdx],
      price,
      oldPrice,
      discPct,
      rating,
      reviewCount,
      animal:     animals[animalIdx],
      type:       types[typeIdx],
      weight:     weights[Math.floor(Math.random() * weights.length)],
      img:        images[imgIdx],
      isNew,
      isBest,
      freeShip,
      inStock:    Math.random() > 0.05,
    });
  }
  return products;
}

/* ── STATE ─────────────────────────────────────────── */
const state = {
  query:       '',
  sort:        'relevance',
  page:        1,
  perPage:     24,
  view:        'grid',
  filters:     {
    animal:   [],
    brand:    [],
    type:     [],
    rating:   [],
    campaign: [],
    priceMin: 0,
    priceMax: 5000,
  },
  wishlist:    new Set(),
  cart:        [],
};

/* ── INIT ───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  readUrlParams();
  initSearchBar();
  initFilters();
  initPriceSlider();
  initMobileFilter();
  initBrandSearch();
  render();
});

const params = new URLSearchParams(window.location.search);
const brandParam = params.get("brand");

if (brandParam) {

  const checkbox = document.querySelector(
    `input[data-filter="brand"][value="${brandParam}"]`
  );

  if (checkbox) {

    // checkbox işaretle
    checkbox.checked = true;

    // state'e ekle
    state.filters.brand = [brandParam];

    // event tetikle
    checkbox.dispatchEvent(new Event("change"));

    // ürünleri yeniden çiz
    renderProducts();
  }
}

/* ── URL PARAMS ─────────────────────────────────────── */
function readUrlParams() {
  const params = new URLSearchParams(window.location.search);
  state.query  = params.get('q') || params.get('k') || '';
  if (state.query) {
    const inp = document.getElementById('searchInput');
    if (inp) inp.value = state.query;
    document.title = `"${state.query}" - Pawco 🐾`;
    document.getElementById('breadcrumbQuery').textContent = `"${state.query}"`;
  }
}

function updateUrl() {
  const params = new URLSearchParams();
  if (state.query) params.set('q', state.query);
  if (state.page > 1) params.set('page', state.page);
  if (state.sort !== 'relevance') params.set('sort', state.sort);
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState({}, '', newUrl);
}

/* ── SEARCH BAR ─────────────────────────────────────── */
function initSearchBar() {
  const input = document.getElementById('searchInput');
  const suggestions = document.getElementById('searchSuggestions');
  if (!input) return;

  const popularSearches = [
    'somon kedi maması','royal canin','hill\'s sterilised','pro plan yavru',
    'kedi kumu topaklanan','köpek ödül','kedi oyuncak','tahılsız mama',
    'orijen kedi','acana köpek','bentonit kumu','kedi vitamini'
  ];

  input.addEventListener('input', () => {
    const val = input.value.trim().toLowerCase();
    if (!val) { hideSuggestions(); return; }
    const matches = popularSearches.filter(s => s.includes(val)).slice(0, 6);
    if (!matches.length) { hideSuggestions(); return; }
    suggestions.innerHTML = matches.map(s =>
      `<div class="suggestion-item" onclick="selectSuggestion('${s}')">
        <span class="suggestion-icon">🔍</span>${s}
       </div>`
    ).join('');
    suggestions.classList.add('visible');
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.search-bar')) hideSuggestions();
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') handleSearch();
  });
}

function hideSuggestions() {
  const s = document.getElementById('searchSuggestions');
  if (s) s.classList.remove('visible');
}

function selectSuggestion(text) {
  const input = document.getElementById('searchInput');
  if (input) input.value = text;
  hideSuggestions();
  state.query = text;
  state.page  = 1;
  render();
}

function handleSearch() {
  const input = document.getElementById('searchInput');
  if (!input) return;
  state.query = input.value.trim();
  state.page  = 1;
  hideSuggestions();
  render();
  updateUrl();
}

/* ── FILTERS ────────────────────────────────────────── */
function initFilters() {
  // Collapsible groups
  document.querySelectorAll('.filter-group-title').forEach(title => {
    title.addEventListener('click', () => {
      const group = title.closest('.filter-group');
      group.classList.toggle('collapsed');
    });
  });

  // Checkboxes
  document.querySelectorAll('input[data-filter]').forEach(cb => {
    cb.addEventListener('change', () => {
      const key = cb.dataset.filter;
      const val = cb.value;
      if (cb.checked) {
        if (!state.filters[key].includes(val)) state.filters[key].push(val);
      } else {
        state.filters[key] = state.filters[key].filter(v => v !== val);
      }
      state.page = 1;
      render();
      updateActiveFilterChips();
      updateActiveFilterCount();
    });
  });

  // Clear all
  document.getElementById('clearAllFilters')?.addEventListener('click', clearAllFilters);
}

function clearAllFilters() {
  Object.keys(state.filters).forEach(k => {
    if (Array.isArray(state.filters[k])) state.filters[k] = [];
  });
  state.filters.priceMin = 0;
  state.filters.priceMax = 5000;
  document.querySelectorAll('input[data-filter]').forEach(cb => cb.checked = false);
  document.getElementById('priceMin').value = '';
  document.getElementById('priceMax').value = '';
  document.getElementById('rangeMin').value = 0;
  document.getElementById('rangeMax').value = 5000;
  updatePriceFill();
  document.querySelectorAll('.price-preset-btn').forEach(b => b.classList.remove('active'));
  state.page = 1;
  render();
  updateActiveFilterChips();
  updateActiveFilterCount();
}

/* ── PRICE SLIDER ───────────────────────────────────── */
function initPriceSlider() {
  const rMin   = document.getElementById('rangeMin');
  const rMax   = document.getElementById('rangeMax');
  const iMin   = document.getElementById('priceMin');
  const iMax   = document.getElementById('priceMax');
  const applyBtn = document.getElementById('applyPriceBtn');
  if (!rMin) return;

  rMin.addEventListener('input', () => {
    if (+rMin.value > +rMax.value - 100) rMin.value = +rMax.value - 100;
    iMin.value = rMin.value;
    updatePriceFill();
  });
  rMax.addEventListener('input', () => {
    if (+rMax.value < +rMin.value + 100) rMax.value = +rMin.value + 100;
    iMax.value = rMax.value;
    updatePriceFill();
  });

  iMin.addEventListener('change', () => {
    const v = Math.max(0, Math.min(+iMin.value, +rMax.value - 100));
    iMin.value = v; rMin.value = v;
    updatePriceFill();
  });
  iMax.addEventListener('change', () => {
    const v = Math.min(5000, Math.max(+iMax.value, +rMin.value + 100));
    iMax.value = v; rMax.value = v;
    updatePriceFill();
  });

  applyBtn?.addEventListener('click', () => {
    state.filters.priceMin = +rMin.value;
    state.filters.priceMax = +rMax.value;
    state.page = 1;
    render();
    updateActiveFilterChips();
    updateActiveFilterCount();
  });

  document.querySelectorAll('.price-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.price-preset-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const mn = +btn.dataset.min, mx = +btn.dataset.max;
      rMin.value = mn; rMax.value = mx;
      iMin.value = mn; iMax.value = mx;
      updatePriceFill();
      state.filters.priceMin = mn;
      state.filters.priceMax = mx;
      state.page = 1;
      render();
      updateActiveFilterChips();
      updateActiveFilterCount();
    });
  });

  updatePriceFill();
}

function updatePriceFill() {
  const rMin  = document.getElementById('rangeMin');
  const rMax  = document.getElementById('rangeMax');
  const fill  = document.getElementById('priceFill');
  if (!rMin || !fill) return;
  const mn = +rMin.value, mx = +rMax.value, total = 5000;
  fill.style.left  = (mn / total * 100) + '%';
  fill.style.right = (100 - mx / total * 100) + '%';
}

/* ── BRAND SEARCH ───────────────────────────────────── */
function initBrandSearch() {
  const inp  = document.getElementById('brandSearch');
  const list = document.getElementById('brandList');
  if (!inp || !list) return;

  inp.addEventListener('input', () => {
    const q = inp.value.toLowerCase();
    list.querySelectorAll('.filter-check').forEach(label => {
      const text = label.querySelector('span').textContent.toLowerCase();
      label.classList.toggle('filter-brand-item-hidden', !text.includes(q));
    });
  });
}

/* ── MOBILE FILTER ──────────────────────────────────── */
function initMobileFilter() {
  const toggleBtn  = document.getElementById('mobileFilterToggle');
  const panel      = document.getElementById('filterPanel');
  const overlay    = document.getElementById('filterOverlay');
  const closeBtn   = document.getElementById('filterCloseBtn');
  const applyBtn   = document.getElementById('applyFiltersMobile');

  const open  = () => { panel.classList.add('open'); overlay.classList.add('visible'); document.body.style.overflow = 'hidden'; };
  const close = () => { panel.classList.remove('open'); overlay.classList.remove('visible'); document.body.style.overflow = ''; };

  toggleBtn?.addEventListener('click', open);
  overlay?.addEventListener('click', close);
  closeBtn?.addEventListener('click', close);
  applyBtn?.addEventListener('click', close);
}

/* ── SORT ───────────────────────────────────────────── */
function handleSort(val) {
  state.sort = val;
  state.page = 1;
  render();
  updateUrl();
}

/* ── VIEW ───────────────────────────────────────────── */
function setView(type) {
  state.view = type;
  const grid    = document.getElementById('productsGrid');
  const gridBtn = document.getElementById('gridViewBtn');
  const listBtn = document.getElementById('listViewBtn');
  if (type === 'list') {
    grid.classList.add('list-view');
    gridBtn.classList.remove('active');
    listBtn.classList.add('active');
  } else {
    grid.classList.remove('list-view');
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
  }
}

/* ── FILTER & SORT PRODUCTS ─────────────────────────── */
function getFilteredProducts() {
  let products = [...MOCK_PRODUCTS];

  // Query
  if (state.query) {
    const q = state.query.toLowerCase();
    products = products.filter(p =>
      p.name.toLowerCase().includes(q)   ||
      p.brand.toLowerCase().includes(q)  ||
      p.type.includes(q)                 ||
      p.animal.includes(q)
    );
  }

  // Animal filter
  if (state.filters.animal.length)
    products = products.filter(p => state.filters.animal.includes(p.animal));

  // Brand filter
  if (state.filters.brand.length)
    products = products.filter(p => state.filters.brand.includes(p.brandId));

  // Type filter
  if (state.filters.type.length)
    products = products.filter(p => state.filters.type.includes(p.type));

  // Rating filter
  if (state.filters.rating.length) {
    const minRating = Math.min(...state.filters.rating.map(Number));
    products = products.filter(p => p.rating >= minRating);
  }

  // Campaign filter
  if (state.filters.campaign.length) {
    products = products.filter(p => {
      return state.filters.campaign.every(c => {
        if (c === 'indirimli')     return p.discPct > 0;
        if (c === 'ucretsiz-kargo') return p.freeShip;
        if (c === 'yeni')          return p.isNew;
        if (c === 'cok-satan')     return p.isBest;
        return true;
      });
    });
  }

  // Price filter
  products = products.filter(p =>
    p.price >= state.filters.priceMin && p.price <= state.filters.priceMax
  );

  // Sort
  switch (state.sort) {
    case 'price-asc':   products.sort((a,b) => a.price - b.price); break;
    case 'price-desc':  products.sort((a,b) => b.price - a.price); break;
    case 'rating':      products.sort((a,b) => b.rating - a.rating); break;
    case 'newest':      products.sort((a,b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
    case 'bestseller':  products.sort((a,b) => (b.isBest ? 1 : 0) - (a.isBest ? 1 : 0)); break;
    default: break; // relevance
  }

  return products;
}

/* ── RENDER ─────────────────────────────────────────── */
function render() {
  const filtered = getFilteredProducts();
  const total    = filtered.length;
  const start    = (state.page - 1) * state.perPage;
  const pageItems= filtered.slice(start, start + state.perPage);

  renderResultsHeader(total);
  renderProducts(pageItems, total);
  renderPagination(total);
}

function renderResultsHeader(total) {
  const title = document.getElementById('resultsTitle');
  const count = document.getElementById('resultsCount');
  if (title) title.textContent = state.query ? `"${state.query}" için sonuçlar` : 'Tüm Ürünler';
  if (brandParam) {
   const index = brandIds.indexOf(brandParam);

  if (index !== -1) {
    title.textContent = brands[index];
  }
  }
  if (count) count.textContent = `${total.toLocaleString('tr-TR')} ürün bulundu`;
}

function renderProducts(items, total) {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  if (state.view === 'list') grid.classList.add('list-view');
  else grid.classList.remove('list-view');

  if (!items.length) {
    grid.innerHTML = `
      <div class="no-results">
        <div class="no-results-icon">🔍</div>
        <h3>"${state.query || 'Bu filtreler'}" için sonuç bulunamadı</h3>
        <p>Farklı anahtar kelimeler deneyebilir ya da filtreleri değiştirebilirsiniz.</p>
        <div class="no-results-suggestions">
          <a href="?q=kedi+maması">Kedi Maması</a>
          <a href="?q=köpek+maması">Köpek Maması</a>
          <a href="?q=kedi+kumu">Kedi Kumu</a>
          <a href="?q=royal+canin">Royal Canin</a>
        </div>
      </div>`;
    return;
  }

  grid.innerHTML = items.map((p, i) => productCardHTML(p, i)).join('');
}

function productCardHTML(p, delay) {
  const starsHtml = renderStars(p.rating);
  const badges    = buildBadges(p);
  const style     = `animation-delay:${delay * 30}ms`;

  return `
  <div class="product-card" style="${style}" onclick="viewProduct(${p.id})">
    <div class="product-badges">${badges}</div>
    <button class="wishlist-btn ${state.wishlist.has(p.id) ? 'active' : ''}"
      onclick="toggleWishlist(event,${p.id})">
      ${state.wishlist.has(p.id) ? '❤️' : '🤍'}
    </button>
    <div class="product-img-wrap">
      <img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/300x300?text=Ürün'"/>
    </div>
    <div class="product-info">
      <div class="product-brand">${p.brand}</div>
      <div class="product-name">${p.name}</div>
      <div class="product-weight">${p.weight}</div>
      <div class="product-rating">
        <span class="stars">${starsHtml}</span>
        <span class="rating-count">(${p.reviewCount.toLocaleString('tr-TR')})</span>
      </div>
      <div class="product-price-row">
        <span class="product-price">${formatPrice(p.price)}</span>
        ${p.oldPrice ? `<span class="product-old-price">${formatPrice(p.oldPrice)}</span>` : ''}
        ${p.discPct  ? `<span class="product-discount-pct">-%${p.discPct}</span>` : ''}
      </div>
      ${p.freeShip ? '<div class="product-cargo-tag">🚚 Ücretsiz Kargo</div>' : ''}
      <button class="product-cart-btn" onclick="addToCart(event,${p.id})">
        🛒 Sepete Ekle
      </button>
    </div>
  </div>`;
}

function buildBadges(p) {
  const out = [];
  if (p.discPct)  out.push(`<span class="badge badge-discount">-%${p.discPct}</span>`);
  if (p.isNew)    out.push(`<span class="badge badge-new">Yeni</span>`);
  if (p.isBest)   out.push(`<span class="badge badge-bestseller">Çok Satan</span>`);
  if (p.freeShip && !p.discPct && !p.isNew && !p.isBest)
                  out.push(`<span class="badge badge-free-cargo">Ücretsiz Kargo</span>`);
  return out.slice(0,2).join('');
}

function renderStars(rating) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

function formatPrice(price) {
  return price.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ₺';
}

/* ── PAGINATION ─────────────────────────────────────── */
function renderPagination(total) {
  const pag     = document.getElementById('pagination');
  if (!pag) return;
  const pages   = Math.ceil(total / state.perPage);
  if (pages <= 1) { pag.innerHTML = ''; return; }

  const current = state.page;
  let html = '';

  html += `<button class="page-btn" onclick="goPage(${current-1})" ${current===1?'disabled':''}>‹ Önceki</button>`;

  const range = getPageRange(current, pages);
  let prev = null;
  for (const pg of range) {
    if (prev !== null && pg - prev > 1)
      html += `<span class="page-ellipsis">…</span>`;
    html += `<button class="page-btn ${pg===current?'active':''}" onclick="goPage(${pg})">${pg}</button>`;
    prev = pg;
  }

  html += `<button class="page-btn" onclick="goPage(${current+1})" ${current===pages?'disabled':''}>Sonraki ›</button>`;
  pag.innerHTML = html;
}

function getPageRange(current, total) {
  const delta = 2;
  const range = new Set([1, total]);
  for (let i = Math.max(2, current-delta); i <= Math.min(total-1, current+delta); i++)
    range.add(i);
  return Array.from(range).sort((a,b)=>a-b);
}

function goPage(page) {
  const total  = getFilteredProducts().length;
  const pages  = Math.ceil(total / state.perPage);
  if (page < 1 || page > pages) return;
  state.page = page;
  render();
  updateUrl();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ── ACTIVE FILTER CHIPS ────────────────────────────── */
function updateActiveFilterChips() {
  const container = document.getElementById('activeFilters');
  if (!container) return;

  const chips = [];
  const labels = {
    animal:   { kedi:'Kedi',kopek:'Köpek',kus:'Kuş',balik:'Balık',kemirgen:'Kemirgen' },
    brand:    { 'royal-canin':'Royal Canin','hills':'Hill\'s','pro-plan':'Pro Plan','orijen':'Orijen','acana':'Acana','brit-care':'Brit Care','farmina':'Farmina N&D','reflex':'Reflex','whiskas':'Whiskas','pedigree':'Pedigree','wanpy':'Wanpy','felix':'Felix' },
    type:     { 'kuru-mama':'Kuru Mama','yas-mama':'Yaş Mama','odul':'Ödül','vitamin':'Vitamin','oyuncak':'Oyuncak','aksesuar':'Aksesuar','bakim':'Bakım','kum':'Kedi Kumu' },
    campaign: { 'indirimli':'İndirimli','ucretsiz-kargo':'Ücretsiz Kargo','yeni':'Yeni','cok-satan':'Çok Satan' },
    rating:   { '5':'5★ ve üzeri','4':'4★ ve üzeri','3':'3★ ve üzeri' },
  };

  ['animal','brand','type','campaign','rating'].forEach(key => {
    state.filters[key].forEach(val => {
      const label = labels[key]?.[val] || val;
      chips.push({ key, val, label });
    });
  });

  if (state.filters.priceMin > 0 || state.filters.priceMax < 5000) {
    chips.push({ key:'price', val:'price', label: `₺${state.filters.priceMin} – ₺${state.filters.priceMax}` });
  }

  container.innerHTML = chips.map(c =>
    `<span class="filter-chip" onclick="removeFilterChip('${c.key}','${c.val}')">
      ${c.label} <span class="chip-close">✕</span>
    </span>`
  ).join('');
}

function removeFilterChip(key, val) {
  if (key === 'price') {
    state.filters.priceMin = 0;
    state.filters.priceMax = 5000;
    document.getElementById('rangeMin').value = 0;
    document.getElementById('rangeMax').value = 5000;
    document.getElementById('priceMin').value = '';
    document.getElementById('priceMax').value = '';
    updatePriceFill();
    document.querySelectorAll('.price-preset-btn').forEach(b=>b.classList.remove('active'));
  } else {
    state.filters[key] = state.filters[key].filter(v => v !== val);
    const cb = document.querySelector(`input[data-filter="${key}"][value="${val}"]`);
    if (cb) cb.checked = false;
  }
  state.page = 1;
  render();
  updateActiveFilterChips();
  updateActiveFilterCount();
}

function updateActiveFilterCount() {
  const count = document.getElementById('activeFilterCount');
  if (!count) return;
  const total = ['animal','brand','type','campaign','rating']
    .reduce((s,k) => s + state.filters[k].length, 0)
    + (state.filters.priceMin > 0 || state.filters.priceMax < 5000 ? 1 : 0);
  if (total > 0) {
    count.textContent = total;
    count.style.display = 'inline-flex';
  } else {
    count.style.display = 'none';
  }
}

/* ── PRODUCT ACTIONS ────────────────────────────────── */
function viewProduct(id) {
  // Gerçek projede ürün detay sayfasına yönlendirir
  console.log('Ürün görüntüleniyor:', id);
}

function toggleWishlist(e, id) {
  e.stopPropagation();
  if (state.wishlist.has(id)) state.wishlist.delete(id);
  else state.wishlist.add(id);
  render();
}

function addToCart(e, id) {
  e.stopPropagation();
  const product = MOCK_PRODUCTS.find(p => p.id === id);
  if (!product) return;

  const btn = e.currentTarget;
  btn.textContent = '✓ Eklendi!';
  btn.style.background = '#2d9e6a';
  setTimeout(() => {
    btn.innerHTML = '🛒 Sepete Ekle';
    btn.style.background = '';
  }, 1400);

  state.cart.push(id);
  const cartCount = document.querySelector('.cart-count');
  if (cartCount) cartCount.textContent = state.cart.length;
}

/* ── GLOBAL EXPORTS ─────────────────────────────────── */
window.handleSearch   = handleSearch;
window.handleSort     = handleSort;
window.setView        = setView;
window.goPage         = goPage;
window.toggleWishlist = toggleWishlist;
window.addToCart      = addToCart;
window.viewProduct    = viewProduct;
window.removeFilterChip = removeFilterChip;
window.selectSuggestion = selectSuggestion;