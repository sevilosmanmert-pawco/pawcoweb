/* =====================================================
   PAWCO — kampanyalar.js
   Kampanyalar sayfası: filtre, sıralama, animasyon
   ===================================================== */
'use strict';

// ── AKTİF FİLTRE DURUMU ────────────────────────────
let activeFilter = 'tumu';
let activeSort   = 'varsayilan';

// ── INIT ───────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  applyFilter(activeFilter);
  updateCount();
  initScrollReveal();
});

// ── FİLTRE ─────────────────────────────────────────
function filterKampanya(btn, type) {
  activeFilter = type;

  // Chip butonlarını güncelle
  document.querySelectorAll('.kamp-filter-chip').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // Hero tag'leri senkronize et
  document.querySelectorAll('.kamp-hero-tag').forEach(b => {
    b.classList.toggle('active', b.dataset.filter === type);
  });

  applyFilter(type);
  updateCount();
}

function filterFromHero(btn, type) {
  activeFilter = type;

  // Hero tag aktif
  document.querySelectorAll('.kamp-hero-tag').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // Chip'leri senkronize et
  document.querySelectorAll('.kamp-filter-chip').forEach(b => {
    b.classList.toggle('active', b.dataset.filter === type);
  });

  applyFilter(type);
  updateCount();
}

function applyFilter(type) {
  const cards = document.querySelectorAll('.kamp-card:not(.kamp-full-banner)');
  let visible = 0;

  cards.forEach((card, i) => {
    const cardType = card.dataset.type || '';
    const show = type === 'tumu' || cardType === type;

    if (show) {
      card.classList.remove('hidden');
      card.style.animationDelay = (visible * 0.05) + 's';
      card.style.animation = 'none';
      // Reflow trick to restart animation
      void card.offsetWidth;
      card.style.animation = '';
      visible++;
    } else {
      card.classList.add('hidden');
    }
  });

  // Boş durum
  let empty = document.getElementById('kampEmpty');
  if (visible === 0) {
    if (!empty) {
      empty = document.createElement('div');
      empty.id = 'kampEmpty';
      empty.className = 'kamp-empty';
      empty.innerHTML = `
        <div class="kamp-empty-icon">🔍</div>
        <h3>Bu kategoride kampanya bulunamadı</h3>
        <p>Başka bir kategori seçmeyi deneyin.</p>
      `;
      document.getElementById('kampGrid').appendChild(empty);
    }
    empty.style.display = '';
  } else {
    if (empty) empty.style.display = 'none';
  }
}

function updateCount() {
  const total   = document.querySelectorAll('.kamp-card:not(.kamp-full-banner):not(.hidden)').length;
  const countEl = document.getElementById('kampCount');
  if (countEl) countEl.textContent = total;
}

// ── SIRALA ─────────────────────────────────────────
function sortKampanya(select) {
  activeSort = select.value;
  const grid  = document.getElementById('kampGrid');
  const cards = Array.from(grid.querySelectorAll('.kamp-card:not(.kamp-full-banner)'));

  cards.sort((a, b) => {
    if (activeSort === 'indirim-yuksek') {
      return (parseInt(b.dataset.discount) || 0) - (parseInt(a.dataset.discount) || 0);
    }
    if (activeSort === 'indirim-dusuk') {
      return (parseInt(a.dataset.discount) || 0) - (parseInt(b.dataset.discount) || 0);
    }
    if (activeSort === 'sure-bitiyor') {
      return (parseInt(a.dataset.days) || 99) - (parseInt(b.dataset.days) || 99);
    }
    return (parseInt(a.dataset.order) || 0) - (parseInt(b.dataset.order) || 0);
  });

  // Tam banner'ı yerinde bırakarak kartları yeniden sırala
  const fullBanners = Array.from(grid.querySelectorAll('.kamp-full-banner'));
  const loadMore    = grid.querySelector('.kamp-load-more');

  // Grid'i temizle
  grid.innerHTML = '';

  // İlk 6 kartı ekle → tam banner → geri kalanlar
  cards.slice(0, 6).forEach(c => grid.appendChild(c));
  if (fullBanners[0]) grid.appendChild(fullBanners[0]);
  cards.slice(6).forEach(c => grid.appendChild(c));
  if (fullBanners[1]) grid.appendChild(fullBanners[1]);
  if (loadMore) grid.appendChild(loadMore);
}

// ── SCROLL REVEAL ───────────────────────────────────
function initScrollReveal() {
  if (!('IntersectionObserver' in window)) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.kamp-card').forEach(card => {
    obs.observe(card);
  });
}

// ── KART TIKLAMA ───────────────────────────────────
function openKampanya(card) {
  const title = card.querySelector('.kamp-card-title')?.textContent || 'Kampanya';
  // Gerçekte kampanya detay sayfasına gider
  alert('📦 ' + title + '\n\nKampanya detay sayfasına yönlendiriliyorsunuz…');
}

// ── GLOBAL EXPORT ──────────────────────────────────
window.filterKampanya  = filterKampanya;
window.filterFromHero  = filterFromHero;
window.sortKampanya    = sortKampanya;
window.openKampanya    = openKampanya;