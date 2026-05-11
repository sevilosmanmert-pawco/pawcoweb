// ============================================================
// PAWCO - Pet Shop JavaScript
// ============================================================

let siteData = null;
let activeAnimal = null;
let activeSidebarItem = null;
let mobileActiveAnimal = null;

// ── LOAD DATA ──────────────────────────────────────────────
function loadData() {
  siteData = (typeof PAWCO_DATA !== 'undefined') ? PAWCO_DATA : null;

  initNavbarEvents();
  setupEventListeners();

  if (siteData) {
    if (document.getElementById('animal-picks'))  renderAnimalPicks();
    if (document.getElementById('main-section'))  renderFeaturedSection();
    if (document.getElementById('mobile-nav'))    renderMobileNav();
    if (document.getElementById('hero'))          renderHero();
  }
}

// ── INIT (eski — artık kullanılmıyor, silinebilir) ──────────
function init() { loadData(); }

// ── TOP BAR ────────────────────────────────────────────────
function renderTopBar() {
  const bar = document.getElementById('top-bar');
  bar.innerHTML = `<span>🚚 <strong>150 TL ve üzeri</strong> ücretsiz kargo &nbsp;|&nbsp; 📞 Müşteri Hizmetleri: <strong>0850 123 45 67</strong></span>`;
}

// ── HEADER ─────────────────────────────────────────────────
function renderHeader() {
  const header = document.getElementById('header');
  header.innerHTML = `
    <div class="header-inner">
      <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Menü">☰</button>
      <a href="#" class="logo">
        <span class="logo-icon">🐾</span>
        <span class="logo-text">paw<span>co</span></span>
      </a>
      <div class="search-bar">
        <input type="text" id="searchInput" placeholder="Ne aramıştınız?..." autocomplete="off"/>
        <button class="search-btn" onclick="handleSearch()">🔍</button>
      </div>
      <div class="header-actions">
        <button class="header-action-btn" onclick="alert('Yardım sayfası açılıyor...')">
          <span class="btn-icon">🎧</span><span>Yardım</span>
        </button>
        <button class="header-action-btn" onclick="alert('Hesabınıza yönlendiriliyorsunuz...')">
          <span class="btn-icon">👤</span><span>Hesabım</span>
        </button>
        <button class="header-action-btn cart-btn" onclick="alert('Sepetiniz açılıyor...')">
          <span class="btn-icon">🛒</span><span>Sepetim</span>
          <span class="cart-count">0</span>
        </button>
      </div>
    </div>
  `;
}

// ── NAVBAR ─────────────────────────────────────────────────
// Navbar HTML'de yazılıdır. Bu fonksiyon yalnızca
// mouseenter/mouseleave ve dışarı-tıklama event'lerini bağlar.
// ── NAVBAR EVENT BINDING ────────────────────────────────────
// HTML'deki .nav-item[data-animal] elemanlarına bir kez bağlanır.
// Guard: zaten bağlandıysa tekrar bağlamaz.
function initNavbarEvents() {
  // Dışarı tıklayınca kapat (bir kez)
  if (!document._navOutsideClick) {
    document._navOutsideClick = true;
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-item')) closeAllDropdowns();
    });
  }

  document.querySelectorAll('.nav-item[data-animal]').forEach(navItem => {
    if (navItem._navBound) return;   // çift bağlamayı önle
    navItem._navBound = true;

    const animalId = navItem.dataset.animal;
    const dropdown = document.getElementById('dropdown-' + animalId);

    navItem.addEventListener('mouseenter', () => {
      closeAllDropdowns();
      activeAnimal = animalId;
      navItem.classList.add('active');
      initDropdownPanels(animalId);
    });

    // nav-item ya da dropdown dışına çıkınca kapat
    navItem.addEventListener('mouseleave', (e) => {
      if (dropdown && dropdown.contains(e.relatedTarget)) return;
      closeAllDropdowns();
    });

    if (dropdown) {
      dropdown.addEventListener('mouseleave', (e) => {
        if (navItem.contains(e.relatedTarget)) return;
        closeAllDropdowns();
      });
    }
  });
}

// Eski adı koruyalım — bazı çağrılar hâlâ renderNavbar() diyebilir
function renderNavbar() { initNavbarEvents(); }

// Sidebar item mouseenter → panel geçişi
// HTML'de yazılı dropdown için. Her dropdown için bir kez çalışır.
function initDropdownPanels(animalId) {
  const sidebar = document.getElementById('sidebar-' + animalId);

  if (!sidebar) {
    // index.html gibi data-driven sayfa — eski yöntem
    const dropdown = document.getElementById('dropdown-' + animalId);
    if (dropdown) renderDropdown(animalId, dropdown);
    return;
  }

  // İlk açılışta aktif paneli göster
  const activeItem = sidebar.querySelector('.sidebar-item.active')
                  || sidebar.querySelector('.sidebar-item');
  if (activeItem) {
    sidebar.querySelectorAll('.sidebar-item').forEach(s => s.classList.remove('active'));
    activeItem.classList.add('active');
    showPanel(animalId, activeItem.dataset.id);
  }

  // Daha önce bağlandıysa tekrar bağlama
  if (sidebar._panelsBound) return;
  sidebar._panelsBound = true;

  sidebar.querySelectorAll('.sidebar-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      sidebar.querySelectorAll('.sidebar-item').forEach(s => s.classList.remove('active'));
      item.classList.add('active');
      showPanel(animalId, item.dataset.id);
    });
  });
}

// HTML'deki .cat-panel'ler arasında geçiş — hidden attribute ile
function showPanel(animalId, panelId) {
  const contentArea = document.getElementById('content-' + animalId);
  if (!contentArea || !panelId) return;
  contentArea.querySelectorAll('.cat-panel').forEach(panel => {
    panel.hidden = (panel.dataset.panel !== panelId);
  });
}

function closeAllDropdowns() {
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  activeAnimal = null;
  activeSidebarItem = null;
}

// ── MEGA DROPDOWN ──────────────────────────────────────────
function renderDropdown(animalId, container) {
  const animal = siteData.animals[animalId];
  if (!animal) return;

  // Default: show first sidebar item's categories
  const firstSidebarItem = animal.sidebar[0];
  activeSidebarItem = firstSidebarItem.id;

  container.innerHTML = `
    <div class="dropdown-sidebar" id="sidebar-${animalId}">
      ${animal.sidebar.map(s => `
        <div class="sidebar-item ${s.id === activeSidebarItem ? 'active' : ''}"
             data-id="${s.id}" data-animal="${animalId}"
             onmouseenter="handleSidebarClick('${animalId}', '${s.id}', this)">
          <div class="sidebar-item-left">
            <span class="sidebar-icon">${s.icon}</span>
            <span>${s.label}</span>
          </div>
          ${s.hasChildren ? '<span class="sidebar-arrow">›</span>' : ''}
        </div>
      `).join('')}
    </div>
    <div class="dropdown-content" id="content-${animalId}">
      ${renderDropdownContent(animalId, activeSidebarItem)}
    </div>
  `;
}

function handleSidebarClick(animalId, itemId, el) {
  activeSidebarItem = itemId;
  // Update active state
  document.querySelectorAll(`#sidebar-${animalId} .sidebar-item`).forEach(s => s.classList.remove('active'));
  el.classList.add('active');
  // Re-render content
  const content = document.getElementById(`content-${animalId}`);
  content.innerHTML = renderDropdownContent(animalId, itemId);
}

function renderDropdownContent(animalId, itemId) {
  const animal = siteData.animals[animalId];
  const cats = animal.mainCategories;

  if (cats && cats[itemId]) {
    const cat = cats[itemId];
    return `
      <div class="cat-section-title">${cat.title}</div>
      <div class="category-grid">
        ${cat.items.map(item => `
          <a class="category-card" href="#" onclick="event.preventDefault(); handleCategoryClick('${item.label}')">
            <div class="cat-icon-wrap" style="background:${item.color || '#f0f0f0'}">
              <span style="font-size:26px">${item.icon}</span>
            </div>
            <span class="category-label">${item.label}</span>
          </a>
        `).join('')}
      </div>
      ${cat.related && cat.related.length ? `
        <div class="related-section">
          <div class="related-title">İlgili Kategoriler</div>
          <div class="related-grid">
            ${cat.related.map(r => `
              <div class="related-card" onclick="handleCategoryClick('${r.label}')">
                <span class="related-card-icon">${r.icon}</span>
                <span>${r.label}</span>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    `;
  }

  // Fallback: Generic message
  const sidebar = animal.sidebar.find(s => s.id === itemId);
  return `
    <div class="cat-section-title">${sidebar ? sidebar.label : 'Ürünler'}</div>
    <div style="padding:40px;text-align:center;color:var(--text-light);">
      <div style="font-size:48px;margin-bottom:12px">${sidebar ? sidebar.icon : '📦'}</div>
      <div style="font-family:var(--font-main);font-weight:700;font-size:15px;margin-bottom:6px">${sidebar ? sidebar.label : 'Ürünler'}</div>
      <div style="font-size:13px">Bu kategorideki ürünler yüklenecek...</div>
    </div>
  `;
}

function handleCategoryClick(label) {
  closeAllDropdowns();
 
}



function scrollToSection() {
  document.getElementById('main-section').scrollIntoView({ behavior: 'smooth' });
}

// ── ANIMAL PICKS ───────────────────────────────────────────
/*
function renderAnimalPicks() {
  const container = document.getElementById('animal-picks');
  const animals = Object.entries(siteData.animals);
  container.innerHTML = animals.map(([id, data]) => `
    <div class="animal-pick-card" data-animal="${id}" onclick="handleNavClick('${id}', true); document.querySelector('.navbar-inner').scrollIntoView({behavior:'smooth'})">
      <div class="animal-pick-emoji">${data.icon}</div>
      <div class="animal-pick-info">
        <div class="animal-pick-label">${data.label} Ürünleri</div>
        <div class="animal-pick-sub">${data.sidebar.length} kategori</div>
      </div>
      <div class="animal-pick-arrow">›</div>
    </div>
  `).join('');
}*/

// ── FEATURED SECTION ───────────────────────────────────────
function renderFeaturedSection() {
  const section = document.getElementById('main-section');
  section.innerHTML = `
    <div class="section-header">
      <h2 class="section-title">🔥 Popüler <span>Kategoriler</span></h2>
      <span class="see-all" >Tümü ›</span>
    </div>
    <div class="featured-grid" id="featured-grid"></div>
  `;
  renderFeatured();
}

function renderFeatured() {
  const grid = document.getElementById('featured-grid');
  const all = [];
  Object.entries(siteData.animals).forEach(([animalId, animalData]) => {
    animalData.sidebar.slice(0, 4).forEach(cat => {
      all.push({ icon: cat.icon, label: cat.label, animalId });
    });
  });
  grid.innerHTML = all.map(item => `
    <div class="featured-card" onclick="handleCategoryClick('${item.label}')">
      <span class="featured-emoji">${item.icon}</span>
      <span class="featured-name">${item.label}</span>
    </div>
  `).join('');
}

// ── CAMPAIGNS ──────────────────────────────────────────────


/* ===========================
   PAWCO - JAVASCRIPT
   =========================== */

(function () {
  'use strict';

  // ===== SLIDER FACTORY =====
  function initSlider(sliderId, prevId, nextId, visibleCount) {
    var slider = document.getElementById(sliderId);
    var prevBtn = document.getElementById(prevId);
    var nextBtn = document.getElementById(nextId);

    if (!slider || !prevBtn || !nextBtn) return;

    var items = slider.children;
    var total = items.length;
    var current = 0;

    function getVisible() {
      var w = window.innerWidth;
      if (w <= 480) return 1;
      if (w <= 768) return 2;
      if (w <= 1024) return 3;
      return visibleCount || 4;
    }

    function getItemWidth() {
      if (total === 0) return 0;
      var gap = 16;
      var visible = getVisible();
      var wrapperWidth = slider.parentElement.offsetWidth;
      return (wrapperWidth - gap * (visible - 1)) / visible;
    }

    function updateSlider() {
      var itemW = getItemWidth();
      var gap = 16;
      var offset = current * (itemW + gap);
      slider.style.transform = 'translateX(-' + offset + 'px)';

      // Update button visibility
      prevBtn.style.opacity = current === 0 ? '0.3' : '1';
      prevBtn.style.pointerEvents = current === 0 ? 'none' : 'auto';

      var maxIndex = total - getVisible();
      nextBtn.style.opacity = current >= maxIndex ? '0.3' : '1';
      nextBtn.style.pointerEvents = current >= maxIndex ? 'none' : 'auto';
    }

    function next() {
      var maxIndex = total - getVisible();
      if (current < maxIndex) {
        current++;
        updateSlider();
      }
    }

    function prev() {
      if (current > 0) {
        current--;
        updateSlider();
      }
    }

    nextBtn.addEventListener('click', next);
    prevBtn.addEventListener('click', prev);

    // Touch/swipe support
    var startX = 0;
    var isDragging = false;

    slider.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX;
      isDragging = true;
    }, { passive: true });

    slider.addEventListener('touchend', function (e) {
      if (!isDragging) return;
      var diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) next();
        else prev();
      }
      isDragging = false;
    }, { passive: true });

    window.addEventListener('resize', updateSlider);
    updateSlider();
  }

  // ===== SEO EXPAND =====
  function initExpand() {
    var btn = document.getElementById('expandBtn');
    var content = document.getElementById('seoExpand');
    if (!btn || !content) return;

    var expanded = false;

    btn.addEventListener('click', function () {
      expanded = !expanded;
      content.classList.toggle('open', expanded);
      btn.textContent = expanded ? 'Daha Az Göster ▴' : 'Devamını Göster ▾';
    });
  }

  // ===== INIT =====
  function init() {
    initSlider('blogSlider', 'blogPrev', 'blogNext', 4);
    initSlider('qaSlider', 'qaPrev', 'qaNext', 4);
    initExpand();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();


// hero

// ── HERO / SLIDER ──────────────────────────────────────────
let currentSlide = 0;
let heroAutoplayTimer = null;

const slides = [
  {
    badge: "Yeni Sezon",
    title: "Dostlarınız İçin <br> <span>En Sağlıklı</span> Seçimler",
    desc: "Özenle seçilmiş içeriklerle hazırlanan mamalar şimdi %20 indirimle.",
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800",
    bgColor: "#F3F5F7"
  },
  {
    badge: "Popüler",
    title: "Konforlu Bir <br> <span>Uyku</span> Deneyimi",
    desc: "Yumuşacık yataklar ve dinlenme alanlarında büyük fırsatları kaçırmayın.",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=800",
    bgColor: "#E9F0F4"
  },
  {
    badge: "Pawco Güvencesi",
    title: "Oyun Zamanı <br> <span>Eğlence</span> Garantili",
    desc: "En sevilen oyuncaklar ve aksesuarlar tek adreste, hızlı teslimatla kapınızda.",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800",
    bgColor: "#EDF5F0"
  }
];

function renderHero() {
  const hero = document.getElementById('hero');
  if (!hero) return;

  const slide = slides[currentSlide];

  hero.innerHTML = `
    <div class="hero-slider">
      <div class="slider-container" style="background-color: ${slide.bgColor}">

        <button class="slider-arrow prev" onclick="changeSlide(-1)" aria-label="Önceki">&#8592;</button>

        <div class="slider-content">
          <span class="badge">${slide.badge}</span>
          <h1>${slide.title}</h1>
          <p>${slide.desc}</p>
          <div class="slider-actions">
            <a href="#" class="btn-primary">Hemen İncele</a>
          </div>
        </div>

        <div class="slider-image">
          <img src="${slide.image}" alt="Slider Görseli">
        </div>

        <button class="slider-arrow next" onclick="changeSlide(1)" aria-label="Sonraki">&#8594;</button>

      </div>

      <div class="slider-dots">
        ${slides.map((_, index) => `
          <span class="dot ${index === currentSlide ? 'active' : ''}" onclick="goToSlide(${index})"></span>
        `).join('')}
      </div>
    </div>
  `;

  startHeroAutoplay();
}

function changeSlide(direction) {
  currentSlide = (currentSlide + direction + slides.length) % slides.length;
  renderHero();
}

function goToSlide(index) {
  currentSlide = index;
  renderHero();
}

function startHeroAutoplay() {
  if (heroAutoplayTimer) clearInterval(heroAutoplayTimer);
  heroAutoplayTimer = setInterval(function() {
    currentSlide = (currentSlide + 1) % slides.length;
    renderHero();
  }, 4500);
}

// ── MOBILE NAV ─────────────────────────────────────────────
function renderMobileNav() {
  const mobileNav = document.getElementById('mobile-nav');
  const animals = Object.entries(siteData.animals);
  mobileActiveAnimal = animals[0][0];

  mobileNav.innerHTML = `
    <div class="mobile-nav-header">
      <div class="logo">
        <span style="font-size:24px">🐾</span>
        <span class="logo-text" style="color:#fff;font-size:22px">paw<span style="color:var(--accent)">co</span></span>
      </div>
      <button class="mobile-close-btn" onclick="closeMobileNav()">✕</button>
    </div>
    <div class="mobile-search">
      <input type="text" placeholder="Ürün ara..." id="mobileSearchInput"/>
    </div>
    <div class="mobile-animal-tabs" id="mobile-animal-tabs">
      ${animals.map(([id, data], i) => `
        <button class="mobile-animal-tab ${i === 0 ? 'active' : ''}" data-animal="${id}" onclick="switchMobileAnimal('${id}', this)">
          <span class="tab-icon">${data.icon}</span>
          ${data.label}
        </button>
      `).join('')}
    </div>
    <div class="mobile-menu-items" id="mobile-menu-items">
      ${renderMobileMenuItems(mobileActiveAnimal)}
    </div>
  `;
}

function renderMobileMenuItems(animalId) {
  const animal = siteData.animals[animalId];
  return animal.sidebar.map(item => `
    <div class="mobile-menu-item" onclick="handleCategoryClick('${item.label}'); closeMobileNav()">
      <div class="mobile-menu-item-left">
        <span style="font-size:20px">${item.icon}</span>
        <span>${item.label}</span>
      </div>
      ${item.hasChildren ? '<span>›</span>' : ''}
    </div>
  `).join('');
}

function switchMobileAnimal(animalId, btn) {
  mobileActiveAnimal = animalId;
  document.querySelectorAll('.mobile-animal-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('mobile-menu-items').innerHTML = renderMobileMenuItems(animalId);
}

// ── EVENT LISTENERS ────────────────────────────────────────
function setupEventListeners() {
  // Mobile menu open
  document.getElementById('mobileMenuBtn')?.addEventListener('click', openMobileNav);

  // Overlay click to close
  document.getElementById('mobile-overlay')?.addEventListener('click', closeMobileNav);

  // Search on Enter
  document.getElementById('searchInput')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSearch();
  });
}

function openMobileNav() {
  document.getElementById('mobile-nav').classList.add('open');
  document.getElementById('mobile-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
  document.getElementById('mobile-nav').classList.remove('open');
  document.getElementById('mobile-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

function handleSearch() {
  const q = document.getElementById('searchInput').value.trim();
  if (q) window.location.href = `search.html?q=${encodeURIComponent(q)}`;
}

// ============================================================
// PAWCO - Site Verisi (JSON gömülü, fetch gerekmez)
// ============================================================

// ════════════════════════════════════════
// PAWCO — section.js
// main.js'in SONUNA ekle.
// Mevcut init() ile çakışmaz.
// ════════════════════════════════════════

// ── YILDIZ RENDER ──────────────────────
// Her .product-rating[data-score][data-count] elemanını doldurur.
function renderProductRatings() {
  document.querySelectorAll('.product-rating').forEach(function(el) {
    var score = parseFloat(el.dataset.score) || 0;
    var count = parseInt(el.dataset.count)   || 0;
    if (score === 0) return;

    var starsHtml = '<span class="product-rating__stars">';
    for (var i = 1; i <= 5; i++) {
      if (score >= i) {
        starsHtml += '<span class="product-rating__star">★</span>';
      } else if (score >= i - 0.5) {
        starsHtml += '<span class="product-rating__star" style="opacity:.4">★</span>';
      } else {
        starsHtml += '<span class="product-rating__star product-rating__star--empty">★</span>';
      }
    }
    starsHtml += '</span>';
    starsHtml += '<span class="product-rating__score">' + score.toFixed(1).replace('.', ',') + '</span>';
    if (count > 0) {
      starsHtml += '<span class="product-rating__count">(' + count + ')</span>';
    }
    el.innerHTML = starsHtml;
  });
}

// ── SLIDER FACTORY ─────────────────────
// trackId, prevId, nextId ve gap (px) alır.
function initSlider(trackId, prevId, nextId, gap) {
  var track   = document.getElementById(trackId);
  var prevBtn = document.getElementById(prevId);
  var nextBtn = document.getElementById(nextId);
  if (!track || !prevBtn || !nextBtn) return;
  if (!track.children.length) return;

  var index = 0;

  function cardWidth() {
    var firstCard = track.children[0];
    return firstCard.offsetWidth + gap;
  }
  function visibleCount() {
    var wrapWidth = track.parentElement.offsetWidth;
    if (!wrapWidth) return 1;
    var cw = cardWidth();
    if (!cw) return 1;
    return Math.max(1, Math.floor(wrapWidth / cw));
  }
  function totalCount() {
    return track.children.length;
  }
  function maxIndex() {
    return Math.max(0, totalCount() - visibleCount());
  }
  function update() {
    var capped = Math.min(index, maxIndex());
    if (capped !== index) index = capped;
    track.style.transform = 'translateX(-' + (index * cardWidth()) + 'px)';
    prevBtn.disabled = index <= 0;
    nextBtn.disabled = index >= maxIndex();
  }

  prevBtn.addEventListener('click', function() {
    index = Math.max(0, index - 1);
    update();
  });
  nextBtn.addEventListener('click', function() {
    index = Math.min(maxIndex(), index + 1);
    update();
  });
  window.addEventListener('resize', function() { index = 0; update(); });

  update();
}

// ── FAVORİ TOGGLE ──────────────────────
function initFavButtons() {
  document.querySelectorAll('.product-fav-btn').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      var on = btn.classList.toggle('active');
      btn.textContent = on ? '♥' : '♡';
    });
  });
}

// ── SEPETE EKLE ────────────────────────
function initCartButtons() {
  document.querySelectorAll('.product-cart-btn').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      if (btn.classList.contains('added')) return;
      btn.classList.add('added');
      btn.textContent = '✓';
      setTimeout(function() {
        btn.classList.remove('added');
        btn.textContent = '🛒';
      }, 1400);
    });
  });
}

// ── INIT ───────────────────────────────
// DOMContentLoaded zaten main.js tarafından bekleniyor.
// loadData → init() zinciri bitmeden bu da çalışabilsin diye
// ayrı bir listener açıyoruz.
document.addEventListener('DOMContentLoaded', function() {
  renderProductRatings();
  initSlider('brandsTrack',                 'brandPrev',        'brandNext',             12);
  initSlider('productsTrack',               'prodPrev',         'prodNext',              16);
  initSlider('viewedProductsTrack',         'viewedPrev',       'viewedNext',            16);
  initSlider('viewedProductsTrack2',        'viewedPrev2',      'viewedNext2',           16);
  initSlider('viewedProductsTrackBunu',     'viewedPrevBunu',   'viewedNextBunu',        16);
  initSlider('viewedProductsTrackGuvence',  'viewedPrevGuvence','viewedNextGuvence',     16);
  initFavButtons();
  initCartButtons();
});

const PAWCO_DATA = {
  "site": {
    "name": "Pawco",
    "tagline": "Evcil Dostların Dünyası",
    "logo": "🐾"
  },
  "nav": [
    { "id": "cat", "label": "Kedi Ürünleri", "icon": "" },
    { "id": "dog", "label": "Köpek Ürünleri", "icon": "" },
    { "id": "bird", "label": "Kuş Ürünleri", "icon": "" },
    { "id": "rodent", "label": "Kemirgen Ürünleri", "icon": "" },
    { "id": "campaigns", "label": "Kampanyalar", "icon": "" },
    { "id": "club", "label": "Pawco Salon", "icon": "" },
     { "id": "Rezervation", "label": "Randevu", "icon": "" },
  ],
  "animals": {
    "cat": {
      "label": "Kedi",
      "icon": "",
      "color": "#FF6B6B",
      "banner": "Kediniz İçin En İyi Ürünler",
      "sidebar": [
        { "id": "cat-food", "label": "Kedi Maması", "icon": "🥣", "hasChildren": true },
        { "id": "cat-wet", "label": "Kedi Konserve Maması", "icon": "🥫", "hasChildren": true },
        { "id": "cat-treat", "label": "Kedi Ödül Maması", "icon": "🎁", "hasChildren": true },
        { "id": "cat-litter", "label": "Kedi Kumu", "icon": "🪣", "hasChildren": true },
        { "id": "cat-vitamin", "label": "Vitaminler ve Ek Besinler", "icon": "💊", "hasChildren": true },
        { "id": "cat-toy", "label": "Kedi Oyuncağı", "icon": "🧶", "hasChildren": true },
        { "id": "cat-care", "label": "Bakım ve Temizlik", "icon": "✂️", "hasChildren": true },
        { "id": "cat-bowl", "label": "Kedi Mama ve Su Kabı", "icon": "🍽️", "hasChildren": true },
        { "id": "cat-toilet", "label": "Kedi Tuvaletleri ve Ekipmanları", "icon": "🚽", "hasChildren": true },
        { "id": "cat-brush", "label": "Kedi Tarağı ve Fırçası", "icon": "🪮", "hasChildren": false },
        { "id": "cat-scratch", "label": "Tırmalama Tahtası", "icon": "🪵", "hasChildren": false },
        { "id": "cat-collar", "label": "Kedi Tasması", "icon": "📿", "hasChildren": true },
        { "id": "cat-carrier", "label": "Kedi Taşıma Ekipmanları", "icon": "👜", "hasChildren": true },
        { "id": "cat-bed", "label": "Kedi Evleri ve Yatakları", "icon": "🏠", "hasChildren": true },
        { "id": "cat-door", "label": "Kedi Kapıları ve Güvenlik Ürünleri", "icon": "🚪", "hasChildren": true }
      ],
      "mainCategories": {
        "cat-food": {
          "title": "Kedi Maması Kategorileri",
          "items": [
            { "id": "cf-all", "label": "Tümünü Gör", "icon": "🔢", "color": "#f0f0f0" },
            { "id": "cf-neutered", "label": "Kısırlaştırılmış Kedi Maması", "icon": "🐱", "color": "#fff3cd" },
            { "id": "cf-adult", "label": "Yetişkin Kedi Maması", "icon": "🐈", "color": "#d4edda" },
            { "id": "cf-kitten", "label": "Yavru Kedi Maması", "icon": "🐱", "color": "#cce5ff" },
            { "id": "cf-light", "label": "Light Kedi Maması", "icon": "💚", "color": "#d1ecf1" },
            { "id": "cf-vet", "label": "Veteriner Diyet Maması", "icon": "🏥", "color": "#f8d7da" },
            { "id": "cf-senior", "label": "Yaşlı Kedi Maması", "icon": "🧓", "color": "#e2e3e5" },
            { "id": "cf-breed", "label": "Özel Irk Kedi Maması", "icon": "🏆", "color": "#fff3cd" },
            { "id": "cf-tester", "label": "Tester Kedi Mamaları", "icon": "🧪", "color": "#d4edda" }
          ],
          "related": [
            { "id": "cr-wet", "label": "Kedi Konserve Maması", "icon": "🥫" },
            { "id": "cr-vitamin", "label": "Vitaminler ve Ek Besinler", "icon": "💊" },
            { "id": "cr-treat", "label": "Kedi Ödül Maması", "icon": "🎁" },
            { "id": "cr-bowl", "label": "Kedi Mama ve Su Kabı", "icon": "🍽️" }
          ]
        },
        "cat-wet": {
          "title": "Kedi Konserve Kategorileri",
          "items": [
            { "id": "cw-all", "label": "Tümünü Gör", "icon": "🔢", "color": "#f0f0f0" },
            { "id": "cw-adult", "label": "Yetişkin Konserve", "icon": "🐈", "color": "#d4edda" },
            { "id": "cw-kitten", "label": "Yavru Konserve", "icon": "🐱", "color": "#cce5ff" },
            { "id": "cw-senior", "label": "Yaşlı Konserve", "icon": "🧓", "color": "#e2e3e5" },
            { "id": "cw-vet", "label": "Veteriner Diyet", "icon": "🏥", "color": "#f8d7da" },
            { "id": "cw-tuna", "label": "Ton Balıklı", "icon": "🐟", "color": "#d1ecf1" },
            { "id": "cw-chicken", "label": "Tavuklu", "icon": "🍗", "color": "#fff3cd" }
          ],
          "related": [
            { "id": "cr-food", "label": "Kedi Maması", "icon": "🥣" },
            { "id": "cr-treat", "label": "Kedi Ödül Maması", "icon": "🎁" },
            { "id": "cr-bowl", "label": "Kedi Mama ve Su Kabı", "icon": "🍽️" }
          ]
        },
        "cat-treat": {
          "title": "Kedi Ödül Maması Kategorileri",
          "items": [
            { "id": "ctr-all", "label": "Tümünü Gör", "icon": "🔢", "color": "#f0f0f0" },
            { "id": "ctr-stick", "label": "Stick Ödüller", "icon": "🥢", "color": "#fff3cd" },
            { "id": "ctr-cream", "label": "Krem Ödüller", "icon": "🍦", "color": "#f8d7da" },
            { "id": "ctr-crunch", "label": "Çıtır Ödüller", "icon": "🍪", "color": "#d4edda" },
            { "id": "ctr-dental", "label": "Dental Ödüller", "icon": "🦷", "color": "#cce5ff" }
          ],
          "related": [
            { "id": "cr-food", "label": "Kedi Maması", "icon": "🥣" },
            { "id": "cr-wet", "label": "Kedi Konserve Maması", "icon": "🥫" }
          ]
        },
        "cat-litter": {
          "title": "Kedi Kumu Kategorileri",
          "items": [
            { "id": "cl-all", "label": "Tümünü Gör", "icon": "🔢", "color": "#f0f0f0" },
            { "id": "cl-clump", "label": "Topaklanan Kum", "icon": "🪨", "color": "#d4edda" },
            { "id": "cl-crystal", "label": "Kristal Kum", "icon": "💎", "color": "#cce5ff" },
            { "id": "cl-plant", "label": "Bitkisel Kum", "icon": "🌿", "color": "#d4edda" },
            { "id": "cl-pine", "label": "Çam Pellet", "icon": "🌲", "color": "#d4edda" },
            { "id": "cl-scented", "label": "Kokulu Kum", "icon": "🌸", "color": "#f8d7da" }
          ],
          "related": [
            { "id": "cr-toilet", "label": "Kedi Tuvaletleri", "icon": "🚽" },
            { "id": "cr-care", "label": "Bakım ve Temizlik", "icon": "✂️" }
          ]
        },
        "cat-vitamin": {
          "title": "Vitamin ve Ek Besin Kategorileri",
          "items": [
            { "id": "cv-all", "label": "Tümünü Gör", "icon": "🔢", "color": "#f0f0f0" },
            { "id": "cv-paste", "label": "Malt ve Pasta", "icon": "🧴", "color": "#fff3cd" },
            { "id": "cv-tablet", "label": "Tablet Vitaminler", "icon": "💊", "color": "#d4edda" },
            { "id": "cv-liquid", "label": "Sıvı Vitaminler", "icon": "💧", "color": "#cce5ff" },
            { "id": "cv-omega", "label": "Omega 3 & Yağ Asitleri", "icon": "🐟", "color": "#d1ecf1" },
            { "id": "cv-joint", "label": "Eklem Destekleri", "icon": "🦴", "color": "#e2e3e5" }
          ],
          "related": [
            { "id": "cr-food", "label": "Kedi Maması", "icon": "🥣" },
            { "id": "cr-vet", "label": "Veteriner Diyet Maması", "icon": "🏥" }
          ]
        },
        "cat-toy": {
          "title": "Kedi Oyuncağı Kategorileri",
          "items": [
            { "id": "ct-all", "label": "Tümünü Gör", "icon": "🔢", "color": "#f0f0f0" },
            { "id": "ct-feather", "label": "Tüylü Oyuncaklar", "icon": "🪶", "color": "#fff3cd" },
            { "id": "ct-laser", "label": "Lazer Oyuncaklar", "icon": "🔴", "color": "#f8d7da" },
            { "id": "ct-tunnel", "label": "Tünel ve Çadırlar", "icon": "🎪", "color": "#d4edda" },
            { "id": "ct-mouse", "label": "Fare Oyuncaklar", "icon": "🐭", "color": "#cce5ff" },
            { "id": "ct-ball", "label": "Top Oyuncaklar", "icon": "⚽", "color": "#d1ecf1" },
            { "id": "ct-wand", "label": "Olta Oyuncaklar", "icon": "🎣", "color": "#e2e3e5" }
          ],
          "related": [
            { "id": "cr-scratch", "label": "Tırmalama Tahtası", "icon": "🪵" },
            { "id": "cr-bed", "label": "Kedi Evleri ve Yatakları", "icon": "🏠" }
          ]
        },
        "cat-care": {
          "title": "Bakım ve Temizlik Kategorileri",
          "items": [
            { "id": "cc-all", "label": "Tümünü Gör", "icon": "🔢", "color": "#f0f0f0" },
            { "id": "cc-shampoo", "label": "Kedi Şampuanı", "icon": "🧴", "color": "#cce5ff" },
            { "id": "cc-wipe", "label": "Islak Mendil", "icon": "🧻", "color": "#d4edda" },
            { "id": "cc-dental", "label": "Diş Bakımı", "icon": "🦷", "color": "#fff3cd" },
            { "id": "cc-eye", "label": "Göz ve Kulak", "icon": "👁️", "color": "#d1ecf1" },
            { "id": "cc-flea", "label": "Pire ve Kene", "icon": "🪲", "color": "#f8d7da" }
          ],
          "related": [
            { "id": "cr-brush", "label": "Kedi Tarağı ve Fırçası", "icon": "🪮" },
            { "id": "cr-litter", "label": "Kedi Kumu", "icon": "🪣" }
          ]
        },
        "cat-bowl": {
          "title": "Mama ve Su Kabı Kategorileri",
          "items": [
            { "id": "cb-all", "label": "Tümünü Gör", "icon": "🔢", "color": "#f0f0f0" },
            { "id": "cb-ceramic", "label": "Seramik Kaplar", "icon": "🏺", "color": "#fff3cd" },
            { "id": "cb-stainless", "label": "Paslanmaz Çelik", "icon": "⚙️", "color": "#e2e3e5" },
            { "id": "cb-plastic", "label": "Plastik Kaplar", "icon": "🪣", "color": "#cce5ff" },
            { "id": "cb-fountain", "label": "Su Çeşmesi", "icon": "⛲", "color": "#d1ecf1" },
            { "id": "cb-auto", "label": "Otomatik Besleyici", "icon": "🤖", "color": "#d4edda" }
          ],
          "related": [
            { "id": "cr-food", "label": "Kedi Maması", "icon": "🥣" },
            { "id": "cr-wet", "label": "Kedi Konserve Maması", "icon": "🥫" }
          ]
        },
        "cat-toilet": {
          "title": "Tuvalet ve Ekipman Kategorileri",
          "items": [
            { "id": "cto-all", "label": "Tümünü Gör", "icon": "🔢", "color": "#f0f0f0" },
            { "id": "cto-open", "label": "Açık Tuvalet", "icon": "🟫", "color": "#d4edda" },
            { "id": "cto-closed", "label": "Kapalı Tuvalet", "icon": "🏠", "color": "#cce5ff" },
            { "id": "cto-auto", "label": "Otomatik Tuvalet", "icon": "🤖", "color": "#fff3cd" },
            { "id": "cto-scoop", "label": "Kürek ve Aksesuar", "icon": "🥄", "color": "#e2e3e5" }
          ],
          "related": [
            { "id": "cr-litter", "label": "Kedi Kumu", "icon": "🪣" },
            { "id": "cr-care", "label": "Bakım ve Temizlik", "icon": "✂️" }
          ]
        },
        "cat-collar": {
          "title": "Kedi Tasması Kategorileri",
          "items": [
            { "id": "cco-all", "label": "Tümünü Gör", "icon": "🔢", "color": "#f0f0f0" },
            { "id": "cco-basic", "label": "Standart Tasma", "icon": "📿", "color": "#fff3cd" },
            { "id": "cco-safety", "label": "Emniyet Tasması", "icon": "🔒", "color": "#d4edda" },
            { "id": "cco-gps", "label": "GPS Takip", "icon": "📍", "color": "#cce5ff" },
            { "id": "cco-flea", "label": "Pire Tasması", "icon": "🪲", "color": "#f8d7da" }
          ],
          "related": [
            { "id": "cr-carrier", "label": "Kedi Taşıma Ekipmanları", "icon": "👜" },
            { "id": "cr-care", "label": "Bakım ve Temizlik", "icon": "✂️" }
          ]
        },
        "cat-carrier": {
          "title": "Taşıma Ekipmanları Kategorileri",
          "items": [
            { "id": "cca-all", "label": "Tümünü Gör", "icon": "🔢", "color": "#f0f0f0" },
            { "id": "cca-hard", "label": "Sert Taşıma Çantası", "icon": "🧳", "color": "#e2e3e5" },
            { "id": "cca-soft", "label": "Kumaş Taşıma Çantası", "icon": "👜", "color": "#cce5ff" },
            { "id": "cca-bag", "label": "Sırt Çantası", "icon": "🎒", "color": "#d4edda" },
            { "id": "cca-stroller", "label": "Puset ve Araba", "icon": "🛒", "color": "#fff3cd" }
          ],
          "related": [
            { "id": "cr-collar", "label": "Kedi Tasması", "icon": "📿" },
            { "id": "cr-bed", "label": "Kedi Evleri ve Yatakları", "icon": "🏠" }
          ]
        },
        "cat-bed": {
          "title": "Ev ve Yatak Kategorileri",
          "items": [
            { "id": "cbe-all", "label": "Tümünü Gör", "icon": "🔢", "color": "#f0f0f0" },
            { "id": "cbe-bed", "label": "Kedi Yatakları", "icon": "🛏️", "color": "#cce5ff" },
            { "id": "cbe-house", "label": "Kedi Evleri", "icon": "🏠", "color": "#d4edda" },
            { "id": "cbe-tree", "label": "Kedi Tırmalama Ağacı", "icon": "🌳", "color": "#d4edda" },
            { "id": "cbe-hammock", "label": "Hamak", "icon": "🪢", "color": "#fff3cd" },
            { "id": "cbe-cave", "label": "Kedi Mağarası", "icon": "🕳️", "color": "#e2e3e5" }
          ],
          "related": [
            { "id": "cr-scratch", "label": "Tırmalama Tahtası", "icon": "🪵" },
            { "id": "cr-toy", "label": "Kedi Oyuncağı", "icon": "🧶" }
          ]
        },
        "cat-door": {
          "title": "Kapı ve Güvenlik Ürünleri",
          "items": [
            { "id": "cdo-all", "label": "Tümünü Gör", "icon": "🔢", "color": "#f0f0f0" },
            { "id": "cdo-flap", "label": "Kedi Kapısı", "icon": "🚪", "color": "#fff3cd" },
            { "id": "cdo-net", "label": "Balkon Filesi", "icon": "🕸️", "color": "#d4edda" },
            { "id": "cdo-fence", "label": "Güvenlik Çiti", "icon": "🔒", "color": "#cce5ff" }
          ],
          "related": [
            { "id": "cr-carrier", "label": "Kedi Taşıma Ekipmanları", "icon": "👜" },
            { "id": "cr-collar", "label": "Kedi Tasması", "icon": "📿" }
          ]
        }
      }
    },
    "dog": {
      "label": "Köpek",
      "icon": "",
      "color": "#4ECDC4",
      "banner": "Köpeğiniz İçin En İyi Ürünler",
      "sidebar": [
        { "id": "dog-food", "label": "Köpek Maması", "icon": "🥣", "hasChildren": true },
        { "id": "dog-wet", "label": "Köpek Konserve Maması", "icon": "🥫", "hasChildren": true },
        { "id": "dog-treat", "label": "Köpek Ödül Maması", "icon": "🦴", "hasChildren": true },
        { "id": "dog-vitamin", "label": "Vitaminler ve Ek Besinler", "icon": "💊", "hasChildren": true },
        { "id": "dog-toy", "label": "Köpek Oyuncağı", "icon": "🎾", "hasChildren": true },
        { "id": "dog-care", "label": "Bakım ve Temizlik", "icon": "✂️", "hasChildren": true },
        { "id": "dog-bowl", "label": "Köpek Mama ve Su Kabı", "icon": "🍽️", "hasChildren": true },
        { "id": "dog-brush", "label": "Köpek Tarağı ve Fırçası", "icon": "🪮", "hasChildren": false },
        { "id": "dog-collar", "label": "Köpek Tasması ve Gezdirme", "icon": "📿", "hasChildren": true },
        { "id": "dog-carrier", "label": "Köpek Taşıma Ekipmanları", "icon": "👜", "hasChildren": true },
        { "id": "dog-bed", "label": "Köpek Yatakları ve Evleri", "icon": "🏠", "hasChildren": true },
        { "id": "dog-clothes", "label": "Köpek Kıyafetleri", "icon": "👕", "hasChildren": true },
        { "id": "dog-health", "label": "Sağlık ve Hijyen", "icon": "🏥", "hasChildren": true }
      ],
      "mainCategories": {
        "dog-food": {
          "title": "Köpek Maması Kategorileri",
          "items": [
            { "id": "df-all", "label": "Tümünü Gör", "icon": "🔢", "color": "#f0f0f0" },
            { "id": "df-adult", "label": "Yetişkin Köpek Maması", "icon": "🐕", "color": "#d4edda" },
            { "id": "df-puppy", "label": "Yavru Köpek Maması", "icon": "🐶", "color": "#cce5ff" },
            { "id": "df-senior", "label": "Yaşlı Köpek Maması", "icon": "🧓", "color": "#e2e3e5" },
            { "id": "df-small", "label": "Küçük Irk Maması", "icon": "🐩", "color": "#fff3cd" },
            { "id": "df-large", "label": "Büyük Irk Maması", "icon": "🦮", "color": "#d1ecf1" },
            { "id": "df-vet", "label": "Veteriner Diyet Maması", "icon": "🏥", "color": "#f8d7da" },
            { "id": "df-light", "label": "Light Köpek Maması", "icon": "💚", "color": "#d1ecf1" },
            { "id": "df-grain", "label": "Tahılsız Mama", "icon": "🌾", "color": "#fff3cd" }
          ],
          "related": [
            { "id": "dr-wet", "label": "Köpek Konserve Maması", "icon": "🥫" },
            { "id": "dr-treat", "label": "Köpek Ödül Maması", "icon": "🦴" },
            { "id": "dr-vitamin", "label": "Vitaminler ve Ek Besinler", "icon": "💊" },
            { "id": "dr-bowl", "label": "Köpek Mama ve Su Kabı", "icon": "🍽️" }
          ]
        },
        "dog-wet": {
          "title": "Köpek Konserve Kategorileri",
          "items": [
            { "id": "dw-all", "label": "Tümünü Gör", "icon": "🔢", "color": "#f0f0f0" },
            { "id": "dw-adult", "label": "Yetişkin Konserve", "icon": "🐕", "color": "#d4edda" },
            { "id": "dw-puppy", "label": "Yavru Konserve", "icon": "🐶", "color": "#cce5ff" },
            { "id": "dw-senior", "label": "Yaşlı Konserve", "icon": "🧓", "color": "#e2e3e5" },
            { "id": "dw-beef", "label": "Biftekli", "icon": "🥩", "color": "#f8d7da" },
            { "id": "dw-chicken", "label": "Tavuklu", "icon": "🍗", "color": "#fff3cd" },
            { "id": "dw-lamb", "label": "Kuzulu", "icon": "🐑", "color": "#d1ecf1" }
          ],
          "related": [
            { "id": "dr-food", "label": "Köpek Maması", "icon": "🥣" },
            { "id": "dr-treat", "label": "Köpek Ödül Maması", "icon": "🦴" }
          ]
        },
        "dog-treat": {
          "title": "Köpek Ödül Maması Kategorileri",
          "items": [
            { "id": "dtr-all", "label": "Tümünü Gör", "icon": "🔢", "color": "#f0f0f0" },
            { "id": "dtr-bone", "label": "Kemik Ödüller", "icon": "🦴", "color": "#fff3cd" },
            { "id": "dtr-strip", "label": "Et Şeritler", "icon": "🥩", "color": "#f8d7da" },
            { "id": "dtr-biscuit", "label": "Bisküvi Ödüller", "icon": "🍪", "color": "#d4edda" },
            { "id": "dtr-dental", "label": "Dental Ödüller", "icon": "🦷", "color": "#cce5ff" },
            { "id": "dtr-training", "label": "Eğitim Ödülleri", "icon": "🏆", "color": "#d1ecf1" }
          ],
          "related": [
            { "id": "dr-food", "label": "Köpek Maması", "icon": "🥣" },
            { "id": "dr-toy", "label": "Köpek Oyuncağı", "icon": "🎾" }
          ]
        },
        "dog-toy": {
          "title": "Köpek Oyuncağı Kategorileri",
          "items": [
            { "id": "dt-all", "label": "Tümünü Gör", "icon": "🔢", "color": "#f0f0f0" },
            { "id": "dt-ball", "label": "Top Oyuncaklar", "icon": "🎾", "color": "#fff3cd" },
            { "id": "dt-rope", "label": "İp Oyuncaklar", "icon": "🧵", "color": "#d4edda" },
            { "id": "dt-chew", "label": "Çiğneme Oyuncakları", "icon": "🦴", "color": "#cce5ff" },
            { "id": "dt-squeaky", "label": "Sesli Oyuncaklar", "icon": "🔊", "color": "#f8d7da" },
            { "id": "dt-fetch", "label": "Getir Oyuncakları", "icon": "🥏", "color": "#d1ecf1" },
            { "id": "dt-puzzle", "label": "Zeka Oyuncakları", "icon": "🧩", "color": "#e2e3e5" }
          ],
          "related": [
            { "id": "dr-collar", "label": "Köpek Tasması ve Gezdirme", "icon": "📿" },
            { "id": "dr-care", "label": "Bakım ve Temizlik", "icon": "✂️" }
          ]
        },
        "dog-collar": {
          "title": "Tasma ve Gezdirme Kategorileri",
          "items": [
            { "id": "dc-all", "label": "Tümünü Gör", "icon": "🔢", "color": "#f0f0f0" },
            { "id": "dc-collar", "label": "Köpek Tasması", "icon": "📿", "color": "#fff3cd" },
            { "id": "dc-leash", "label": "Gezdirme Kayışı", "icon": "🔗", "color": "#d4edda" },
            { "id": "dc-harness", "label": "Göğüs Tasması", "icon": "🦺", "color": "#cce5ff" },
            { "id": "dc-retract", "label": "Uzayan Kayış", "icon": "📏", "color": "#d1ecf1" },
            { "id": "dc-gps", "label": "GPS Takip", "icon": "📍", "color": "#f8d7da" }
          ],
          "related": [
            { "id": "dr-care", "label": "Bakım ve Temizlik", "icon": "✂️" },
            { "id": "dr-carrier", "label": "Köpek Taşıma Ekipmanları", "icon": "👜" }
          ]
        },
        "dog-bed": {
          "title": "Yatak ve Ev Kategorileri",
          "items": [
            { "id": "db-all", "label": "Tümünü Gör", "icon": "🔢", "color": "#f0f0f0" },
            { "id": "db-bed", "label": "Köpek Yatakları", "icon": "🛏️", "color": "#cce5ff" },
            { "id": "db-house", "label": "Köpek Kulübesi", "icon": "🏠", "color": "#d4edda" },
            { "id": "db-crate", "label": "Kafes ve Kasa", "icon": "📦", "color": "#e2e3e5" },
            { "id": "db-mat", "label": "Paspas ve Mat", "icon": "🪣", "color": "#fff3cd" }
          ],
          "related": [
            { "id": "dr-carrier", "label": "Köpek Taşıma Ekipmanları", "icon": "👜" },
            { "id": "dr-toy", "label": "Köpek Oyuncağı", "icon": "🎾" }
          ]
        },
        "dog-clothes": {
          "title": "Köpek Kıyafetleri Kategorileri",
          "items": [
            { "id": "dkl-all", "label": "Tümünü Gör", "icon": "🔢", "color": "#f0f0f0" },
            { "id": "dkl-sweater", "label": "Kazak ve Süveter", "icon": "🧥", "color": "#cce5ff" },
            { "id": "dkl-raincoat", "label": "Yağmurluk", "icon": "🌂", "color": "#d1ecf1" },
            { "id": "dkl-shoes", "label": "Köpek Ayakkabısı", "icon": "👟", "color": "#fff3cd" },
            { "id": "dkl-costume", "label": "Kostüm", "icon": "🎭", "color": "#f8d7da" }
          ],
          "related": [
            { "id": "dr-care", "label": "Bakım ve Temizlik", "icon": "✂️" },
            { "id": "dr-collar", "label": "Tasma ve Gezdirme", "icon": "📿" }
          ]
        },
        "dog-health": {
          "title": "Sağlık ve Hijyen Kategorileri",
          "items": [
            { "id": "dh-all", "label": "Tümünü Gör", "icon": "🔢", "color": "#f0f0f0" },
            { "id": "dh-pee", "label": "Tuvalet Pedi", "icon": "🟦", "color": "#cce5ff" },
            { "id": "dh-bag", "label": "Kaka Torbası", "icon": "🛍️", "color": "#d4edda" },
            { "id": "dh-flea", "label": "Pire ve Kene", "icon": "🪲", "color": "#f8d7da" },
            { "id": "dh-dental", "label": "Diş Bakımı", "icon": "🦷", "color": "#fff3cd" },
            { "id": "dh-deodor", "label": "Koku Giderici", "icon": "🌸", "color": "#d1ecf1" }
          ],
          "related": [
            { "id": "dr-care", "label": "Bakım ve Temizlik", "icon": "✂️" },
            { "id": "dr-vitamin", "label": "Vitaminler ve Ek Besinler", "icon": "💊" }
          ]
        }
      }
    },
    "bird": {
      "label": "Kuş",
      "icon": "",
      "color": "#45B7D1",
      "banner": "Kuşunuz İçin En İyi Ürünler",
      "sidebar": [
        { "id": "bird-food", "label": "Kuş Yemi", "icon": "🌾", "hasChildren": true },
        { "id": "bird-treat", "label": "Kuş Ödül Yemi", "icon": "🎁", "hasChildren": true },
        { "id": "bird-cage", "label": "Kafes ve Aksesuarlar", "icon": "🏠", "hasChildren": true },
        { "id": "bird-toy", "label": "Kuş Oyuncağı", "icon": "🎠", "hasChildren": true },
        { "id": "bird-vitamin", "label": "Vitamin ve Mineraller", "icon": "💊", "hasChildren": true },
        { "id": "bird-perch", "label": "Tünek ve Duraklar", "icon": "🎋", "hasChildren": false },
        { "id": "bird-bath", "label": "Kuş Banyosu", "icon": "🛁", "hasChildren": false },
        { "id": "bird-care", "label": "Bakım Ürünleri", "icon": "✂️", "hasChildren": true },
        { "id": "bird-nest", "label": "Yuva ve Barınak", "icon": "🪺", "hasChildren": false },
        { "id": "bird-sand", "label": "Kum ve Zemin Malzemeleri", "icon": "🪨", "hasChildren": false }
      ],
      "mainCategories": {
        "bird-food": {
          "title": "Kuş Yemi Kategorileri",
          "items": [
            { "id": "bf-all", "label": "Tümünü Gör", "icon": "🔢", "color": "#f0f0f0" },
            { "id": "bf-canary", "label": "Kanarya Yemi", "icon": "🐤", "color": "#fff3cd" },
            { "id": "bf-budgie", "label": "Muhabbet Kuşu Yemi", "icon": "🐦", "color": "#d4edda" },
            { "id": "bf-parrot", "label": "Papağan Yemi", "icon": "🦜", "color": "#cce5ff" },
            { "id": "bf-finch", "label": "İspinoz Yemi", "icon": "🐦", "color": "#d1ecf1" },
            { "id": "bf-mixed", "label": "Karışık Yem", "icon": "🌾", "color": "#e2e3e5" },
            { "id": "bf-pellet", "label": "Pelet Yem", "icon": "⚫", "color": "#f8d7da" }
          ],
          "related": [
            { "id": "br-treat", "label": "Kuş Ödül Yemi", "icon": "🎁" },
            { "id": "br-vitamin", "label": "Vitamin ve Mineraller", "icon": "💊" },
            { "id": "br-cage", "label": "Kafes ve Aksesuarlar", "icon": "🏠" }
          ]
        },
        "bird-treat": {
          "title": "Kuş Ödül Yemi Kategorileri",
          "items": [
            { "id": "bt-all", "label": "Tümünü Gör", "icon": "🔢", "color": "#f0f0f0" },
            { "id": "bt-stick", "label": "Ballı Stick", "icon": "🍯", "color": "#fff3cd" },
            { "id": "bt-mineral", "label": "Mineral Taşı", "icon": "🪨", "color": "#e2e3e5" },
            { "id": "bt-cuttlebone", "label": "Mürekkep Balığı Kemiği", "icon": "🦑", "color": "#d1ecf1" },
            { "id": "bt-fruit", "label": "Meyve Ödüller", "icon": "🍎", "color": "#f8d7da" }
          ],
          "related": [
            { "id": "br-food", "label": "Kuş Yemi", "icon": "🌾" },
            { "id": "br-vitamin", "label": "Vitamin ve Mineraller", "icon": "💊" }
          ]
        },
        "bird-cage": {
          "title": "Kafes ve Aksesuar Kategorileri",
          "items": [
            { "id": "bc-all", "label": "Tümünü Gör", "icon": "🔢", "color": "#f0f0f0" },
            { "id": "bc-small", "label": "Küçük Kafesler", "icon": "🏠", "color": "#cce5ff" },
            { "id": "bc-large", "label": "Büyük Kafesler", "icon": "🏛️", "color": "#d4edda" },
            { "id": "bc-feeder", "label": "Yemlik ve Suluklar", "icon": "🍽️", "color": "#fff3cd" },
            { "id": "bc-cover", "label": "Kafes Örtüleri", "icon": "🛏️", "color": "#e2e3e5" },
            { "id": "bc-stand", "label": "Kafes Ayakları", "icon": "🪑", "color": "#d1ecf1" }
          ],
          "related": [
            { "id": "br-perch", "label": "Tünek ve Duraklar", "icon": "🎋" },
            { "id": "br-toy", "label": "Kuş Oyuncağı", "icon": "🎠" }
          ]
        },
        "bird-toy": {
          "title": "Kuş Oyuncağı Kategorileri",
          "items": [
            { "id": "bto-all", "label": "Tümünü Gör", "icon": "🔢", "color": "#f0f0f0" },
            { "id": "bto-swing", "label": "Salıncak", "icon": "🎡", "color": "#fff3cd" },
            { "id": "bto-mirror", "label": "Ayna Oyuncaklar", "icon": "🪞", "color": "#d1ecf1" },
            { "id": "bto-bell", "label": "Çıngıraklı Oyuncaklar", "icon": "🔔", "color": "#f8d7da" },
            { "id": "bto-ladder", "label": "Merdiven", "icon": "🪜", "color": "#d4edda" },
            { "id": "bto-rope", "label": "İp Oyuncaklar", "icon": "🧵", "color": "#e2e3e5" }
          ],
          "related": [
            { "id": "br-perch", "label": "Tünek ve Duraklar", "icon": "🎋" },
            { "id": "br-cage", "label": "Kafes ve Aksesuarlar", "icon": "🏠" }
          ]
        },
        "bird-vitamin": {
          "title": "Vitamin ve Mineral Kategorileri",
          "items": [
            { "id": "bv-all", "label": "Tümünü Gör", "icon": "🔢", "color": "#f0f0f0" },
            { "id": "bv-liquid", "label": "Sıvı Vitamin", "icon": "💧", "color": "#cce5ff" },
            { "id": "bv-powder", "label": "Toz Vitamin", "icon": "🧂", "color": "#e2e3e5" },
            { "id": "bv-calcium", "label": "Kalsiyum", "icon": "🦴", "color": "#d4edda" },
            { "id": "bv-feather", "label": "Tüy Sağlığı", "icon": "🪶", "color": "#fff3cd" }
          ],
          "related": [
            { "id": "br-food", "label": "Kuş Yemi", "icon": "🌾" },
            { "id": "br-treat", "label": "Kuş Ödül Yemi", "icon": "🎁" }
          ]
        },
        "bird-care": {
          "title": "Bakım Ürünleri Kategorileri",
          "items": [
            { "id": "bca-all", "label": "Tümünü Gör", "icon": "🔢", "color": "#f0f0f0" },
            { "id": "bca-spray", "label": "Tüy Spreyi", "icon": "💦", "color": "#d1ecf1" },
            { "id": "bca-beak", "label": "Gaga Bakımı", "icon": "🪨", "color": "#e2e3e5" },
            { "id": "bca-claw", "label": "Tırnak Bakımı", "icon": "✂️", "color": "#fff3cd" }
          ],
          "related": [
            { "id": "br-bath", "label": "Kuş Banyosu", "icon": "🛁" },
            { "id": "br-vitamin", "label": "Vitamin ve Mineraller", "icon": "💊" }
          ]
        }
      }
    },
    "rodent": {
      "label": "Kemirgen",
      "icon": "",
      "color": "#96CEB4",
      "banner": "Kemirgenlerin Dünyası",
      "sidebar": [
        { "id": "rod-food", "label": "Kemirgen Yemi", "icon": "🌾", "hasChildren": true },
        { "id": "rod-treat", "label": "Ödül Yemi", "icon": "🎁", "hasChildren": true },
        { "id": "rod-cage", "label": "Kafes ve Teraryum", "icon": "🏠", "hasChildren": true },
        { "id": "rod-toy", "label": "Oyuncak ve Aktivite", "icon": "🎡", "hasChildren": true },
        { "id": "rod-bedding", "label": "Altlık ve Talaş", "icon": "🪵", "hasChildren": true },
        { "id": "rod-vitamin", "label": "Vitamin ve Mineral", "icon": "💊", "hasChildren": true },
        { "id": "rod-wheel", "label": "Koşu Tekeri", "icon": "⭕", "hasChildren": false },
        { "id": "rod-nest", "label": "Yuva ve Barınak", "icon": "🪺", "hasChildren": false },
        { "id": "rod-tube", "label": "Tünel ve Borular", "icon": "🔄", "hasChildren": false },
        { "id": "rod-water", "label": "Su Şişesi ve Besleyici", "icon": "💧", "hasChildren": false }
      ],
      "mainCategories": {
        "rod-food": {
          "title": "Kemirgen Yemi Kategorileri",
          "items": [
            { "id": "rf-all", "label": "Tümünü Gör", "icon": "🔢", "color": "#f0f0f0" },
            { "id": "rf-hamster", "label": "Hamster Yemi", "icon": "🐹", "color": "#fff3cd" },
            { "id": "rf-rabbit", "label": "Tavşan Yemi", "icon": "🐰", "color": "#f8d7da" },
            { "id": "rf-guinea", "label": "Guinea Pig Yemi", "icon": "🐾", "color": "#d4edda" },
            { "id": "rf-rat", "label": "Rat ve Fare Yemi", "icon": "🐭", "color": "#e2e3e5" },
            { "id": "rf-chinchilla", "label": "Çinçilla Yemi", "icon": "🦔", "color": "#cce5ff" },
            { "id": "rf-hay", "label": "Saman ve Ot", "icon": "🌿", "color": "#d4edda" }
          ],
          "related": [
            { "id": "rr-treat", "label": "Ödül Yemi", "icon": "🎁" },
            { "id": "rr-bedding", "label": "Altlık ve Talaş", "icon": "🪵" },
            { "id": "rr-vitamin", "label": "Vitamin ve Mineral", "icon": "💊" }
          ]
        },
        "rod-treat": {
          "title": "Kemirgen Ödül Yemi Kategorileri",
          "items": [
            { "id": "rt-all", "label": "Tümünü Gör", "icon": "🔢", "color": "#f0f0f0" },
            { "id": "rt-stick", "label": "Tahıl Çubukları", "icon": "🌾", "color": "#fff3cd" },
            { "id": "rt-dried", "label": "Kurutulmuş Meyve", "icon": "🍎", "color": "#f8d7da" },
            { "id": "rt-mineral", "label": "Mineral Taşı", "icon": "🪨", "color": "#e2e3e5" },
            { "id": "rt-biscuit", "label": "Bisküvi Ödüller", "icon": "🍪", "color": "#d4edda" }
          ],
          "related": [
            { "id": "rr-food", "label": "Kemirgen Yemi", "icon": "🌾" },
            { "id": "rr-vitamin", "label": "Vitamin ve Mineral", "icon": "💊" }
          ]
        },
        "rod-cage": {
          "title": "Kafes ve Teraryum Kategorileri",
          "items": [
            { "id": "rc-all", "label": "Tümünü Gör", "icon": "🔢", "color": "#f0f0f0" },
            { "id": "rc-hamster", "label": "Hamster Kafesi", "icon": "🏠", "color": "#fff3cd" },
            { "id": "rc-rabbit", "label": "Tavşan Kafesi", "icon": "🐰", "color": "#f8d7da" },
            { "id": "rc-guinea", "label": "Guinea Pig Kafesi", "icon": "🐾", "color": "#d4edda" },
            { "id": "rc-terrarium", "label": "Teraryum", "icon": "🌿", "color": "#cce5ff" },
            { "id": "rc-starter", "label": "Başlangıç Kitleri", "icon": "📦", "color": "#d1ecf1" }
          ],
          "related": [
            { "id": "rr-wheel", "label": "Koşu Tekeri", "icon": "⭕" },
            { "id": "rr-toy", "label": "Oyuncak ve Aktivite", "icon": "🎡" }
          ]
        },
        "rod-toy": {
          "title": "Oyuncak ve Aktivite Kategorileri",
          "items": [
            { "id": "rto-all", "label": "Tümünü Gör", "icon": "🔢", "color": "#f0f0f0" },
            { "id": "rto-wheel", "label": "Koşu Tekeri", "icon": "⭕", "color": "#d4edda" },
            { "id": "rto-ball", "label": "Yürüme Topu", "icon": "⚽", "color": "#cce5ff" },
            { "id": "rto-tunnel", "label": "Tünel ve Boru", "icon": "🔄", "color": "#fff3cd" },
            { "id": "rto-chew", "label": "Çiğneme Oyuncakları", "icon": "🪵", "color": "#e2e3e5" },
            { "id": "rto-swing", "label": "Salıncak", "icon": "🎡", "color": "#f8d7da" }
          ],
          "related": [
            { "id": "rr-cage", "label": "Kafes ve Teraryum", "icon": "🏠" },
            { "id": "rr-nest", "label": "Yuva ve Barınak", "icon": "🪺" }
          ]
        },
        "rod-bedding": {
          "title": "Altlık ve Talaş Kategorileri",
          "items": [
            { "id": "rb-all", "label": "Tümünü Gör", "icon": "🔢", "color": "#f0f0f0" },
            { "id": "rb-wood", "label": "Ahşap Talaş", "icon": "🪵", "color": "#fff3cd" },
            { "id": "rb-paper", "label": "Kağıt Altlık", "icon": "📄", "color": "#e2e3e5" },
            { "id": "rb-hemp", "label": "Kenevir Altlık", "icon": "🌿", "color": "#d4edda" },
            { "id": "rb-cotton", "label": "Pamuk Yuva", "icon": "☁️", "color": "#cce5ff" }
          ],
          "related": [
            { "id": "rr-cage", "label": "Kafes ve Teraryum", "icon": "🏠" },
            { "id": "rr-nest", "label": "Yuva ve Barınak", "icon": "🪺" }
          ]
        },
        "rod-vitamin": {
          "title": "Vitamin ve Mineral Kategorileri",
          "items": [
            { "id": "rv-all", "label": "Tümünü Gör", "icon": "🔢", "color": "#f0f0f0" },
            { "id": "rv-liquid", "label": "Sıvı Vitamin", "icon": "💧", "color": "#cce5ff" },
            { "id": "rv-calcium", "label": "Kalsiyum Takviyesi", "icon": "🦴", "color": "#d4edda" },
            { "id": "rv-probiotic", "label": "Probiyotik", "icon": "🦠", "color": "#d1ecf1" },
            { "id": "rv-mineral", "label": "Mineral Taşı", "icon": "🪨", "color": "#e2e3e5" }
          ],
          "related": [
            { "id": "rr-food", "label": "Kemirgen Yemi", "icon": "🌾" },
            { "id": "rr-treat", "label": "Ödül Yemi", "icon": "🎁" }
          ]
        }
      }
    }
  }
};

// ── START ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', loadData);