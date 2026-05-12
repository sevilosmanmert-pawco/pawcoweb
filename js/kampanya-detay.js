/* =====================================================
   PAWCO — kampanya-detay.js
   Kampanya Detay sayfası: geri sayım, filtre, sepet,
   URL parametresi okuma, paylaşım
   ===================================================== */
'use strict';

/* ══════════════════════════════════════════════════════
   1. URL PARAMETRELERINDEN KAMPANYA VERİSİNİ OKU
   kampanya-detay.html?id=5&title=...&brand=...&discount=20&days=7&type=indirim&animal=kedi
══════════════════════════════════════════════════════ */
const urlParams  = new URLSearchParams(window.location.search);

const kampData = {
  title    : urlParams.get('title')    || 'Royal Canin Kedi Mamasında %20 İndirim!',
  brand    : urlParams.get('brand')    || 'Royal Canin',
  discount : parseInt(urlParams.get('discount') || '20'),
  days     : parseInt(urlParams.get('days')     || '7'),
  type     : urlParams.get('type')     || 'İndirim',
  animal   : urlParams.get('animal')   || 'Kedi',
  img      : urlParams.get('img')      || ''
};

/* ══════════════════════════════════════════════════════
   2. SAYFA YÜKLENINCE BAŞLAT
══════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  applyKampData();
  startCountdown(kampData.days);
  initScrollRevealProducts();
  updateVisibleCount();
});

/* ══════════════════════════════════════════════════════
   3. KAMPANYA VERİSİNİ DOM'A YANSIT
══════════════════════════════════════════════════════ */
function applyKampData() {
  setText('kd-hero-title',  kampData.title);
  setText('kd-hero-brand',  kampData.brand);
  setText('kd-meta-type',   kampData.type);
  setText('kd-meta-animal', kampData.animal);
  setText('kd-meta-days',   kampData.days + ' Gün');
  setText('kd-cd-pct',      '%' + kampData.discount);
  setText('kd-bc-title',    kampData.title);

  // Rozet güncelle
  const badgeWrap = document.getElementById('kd-hero-badges');
  if (badgeWrap) {
    badgeWrap.innerHTML = '';
    if (kampData.discount > 0) {
      badgeWrap.innerHTML += `<span class="kd-hbadge kd-hbadge--indirim">%${kampData.discount} İNDİRİM</span>`;
    }
    const sureClass = kampData.days <= 3 ? 'kd-hbadge--indirim' : 'kd-hbadge--sure';
    badgeWrap.innerHTML += `<span class="kd-hbadge ${sureClass}">Son ${kampData.days} Gün</span>`;
  }

  // Meta kalan süre rengi
  const daysEl = document.getElementById('kd-meta-days');
  if (daysEl && kampData.days <= 3) {
    daysEl.style.color = '#ff5722';
  }

  // Hero arka plan resmi (parametre varsa)
  if (kampData.img) {
    const bgImg = document.getElementById('kd-hero-img');
    if (bgImg) bgImg.src = decodeURIComponent(kampData.img);
  }
}

function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

/* ══════════════════════════════════════════════════════
   4. GERİ SAYIM
══════════════════════════════════════════════════════ */
function startCountdown(days) {
  // Bitiş tarihi: şu andan days gün sonrası
  const endTime = Date.now() + days * 24 * 60 * 60 * 1000;

  function tick() {
    const diff = endTime - Date.now();
    if (diff <= 0) {
      ['cd-gun','cd-saat','cd-dk','cd-sn'].forEach(id => setText(id, '00'));
      return;
    }
    const d  = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h  = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s  = Math.floor((diff % (1000 * 60)) / 1000);

    setText('cd-gun',  pad(d));
    setText('cd-saat', pad(h));
    setText('cd-dk',   pad(m));
    setText('cd-sn',   pad(s));

    // İlerleme çubuğu: toplam süre içindeki kullanılan oran
    const totalMs  = days * 24 * 60 * 60 * 1000;
    const usedPct  = Math.round(((totalMs - diff) / totalMs) * 100);
    const bar      = document.getElementById('kdBarFill');
    const barLabel = document.querySelector('.kd-cd-bar-label');
    if (bar)      bar.style.width = usedPct + '%';
    if (barLabel) barLabel.innerHTML = `Kampanyanın <strong>%${usedPct}'i</strong> kullanıldı`;
  }

  tick();
  setInterval(tick, 1000);
}

function pad(n) {
  return String(n).padStart(2, '0');
}

/* ══════════════════════════════════════════════════════
   5. ÜRÜN FİLTRELEME
══════════════════════════════════════════════════════ */
function filterProducts(btn, filter) {
  // Chip güncelle
  document.querySelectorAll('.kd-prod-chip').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // Kartları gizle/göster
  const cards = document.querySelectorAll('.kd-prod-card');
  cards.forEach((card, i) => {
    const cat   = card.dataset.cat || '';
    const show  = filter === 'tumu' || cat === filter;
    card.classList.toggle('hidden', !show);

    if (show) {
      // Animasyon yeniden tetikle
      card.style.animationDelay = '';
      card.style.animation = 'none';
      void card.offsetWidth;
      card.style.animation = '';
      card.style.animationDelay = (i * 0.04) + 's';
    }
  });

  updateVisibleCount();
}

function updateVisibleCount() {
  const visible = document.querySelectorAll('.kd-prod-card:not(.hidden)').length;
  const el      = document.getElementById('kd-visible-count');
  if (el) el.textContent = visible;
}

/* Dışarıdan çağrılabilir */
window.filterProducts = filterProducts;

/* ══════════════════════════════════════════════════════
   6. ÜRÜN SIRALAMA
══════════════════════════════════════════════════════ */
function sortProducts(select) {
  const grid  = document.getElementById('kdProdGrid');
  if (!grid) return;

  const cards = Array.from(grid.querySelectorAll('.kd-prod-card'));

  cards.sort((a, b) => {
    const pa = parseInt(a.dataset.price    || '0');
    const pb = parseInt(b.dataset.price    || '0');
    const da = parseInt(a.dataset.discount || '0');
    const db = parseInt(b.dataset.discount || '0');

    if (select.value === 'fiyat-artan')  return pa - pb;
    if (select.value === 'fiyat-azalan') return pb - pa;
    if (select.value === 'indirim')      return db - da;
    return 0;
  });

  // Toast'ı gizle önce
  const toast = document.getElementById('kdToast');
  if (toast) toast.classList.remove('show');

  // Kartları yeniden sırala
  cards.forEach(c => grid.appendChild(c));
}

window.sortProducts = sortProducts;

/* ══════════════════════════════════════════════════════
   7. SEPETE EKLE
══════════════════════════════════════════════════════ */
function addToCart(btn) {
  const card = btn.closest('.kd-prod-card');
  const name = card?.querySelector('.kd-prod-name')?.textContent?.trim() || 'Ürün';

  // Buton durumu
  btn.textContent = 'Eklendi';
  btn.classList.add('added');
  setTimeout(() => {
    btn.textContent = 'Sepete Ekle';
    btn.classList.remove('added');
  }, 2000);

  // Toast
  showToast(name + ' sepete eklendi');

  // Sepet sayacı (eğer main.js'deki global varsa güncelle)
  const countEl = document.querySelector('.cart-count');
  if (countEl) {
    const current = parseInt(countEl.textContent) || 0;
    countEl.textContent = current + 1;
  }
}

window.addToCart = addToCart;

function showToast(msg) {
  const toast = document.getElementById('kdToast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

/* ══════════════════════════════════════════════════════
   8. FAVORİ TOGGLE
══════════════════════════════════════════════════════ */
function toggleFav(el) {
  el.classList.toggle('active');
}

window.toggleFav = toggleFav;

/* ══════════════════════════════════════════════════════
   9. PAYLAŞ / KOPYALA
══════════════════════════════════════════════════════ */
function copyLink() {
  const btn = document.getElementById('kdCopyBtn');
  const url = window.location.href;

  if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(() => {
      showCopiedState(btn);
    }).catch(() => fallbackCopy(url, btn));
  } else {
    fallbackCopy(url, btn);
  }
}

function fallbackCopy(text, btn) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity  = '0';
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try { document.execCommand('copy'); } catch (e) {}
  document.body.removeChild(ta);
  showCopiedState(btn);
}

function showCopiedState(btn) {
  if (!btn) return;
  const orig = btn.textContent;
  btn.textContent = 'Bağlantı Kopyalandı';
  btn.classList.add('copied');
  setTimeout(() => {
    btn.textContent = orig;
    btn.classList.remove('copied');
  }, 2500);
}

window.copyLink = copyLink;

/* ══════════════════════════════════════════════════════
   10. SCROLL REVEAL — ÜRÜN KARTLARI
══════════════════════════════════════════════════════ */
function initScrollRevealProducts() {
  if (!('IntersectionObserver' in window)) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.10 });

  document.querySelectorAll('.kd-prod-card').forEach((card, i) => {
    card.style.opacity   = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity .35s ease ${i * 0.06}s, transform .35s ease ${i * 0.06}s`;
    obs.observe(card);
  });
}

/* ══════════════════════════════════════════════════════
   11. KAMPANYA KARTI TIKLAMA — kampanya.html'DEN GELİYOR
   kampanyalar.js içindeki openKampanya fonksiyonunu
   ezmek yerine, kampanya-detay.html'e yönlendir
══════════════════════════════════════════════════════ */
window.openKampanya = function(card) {
  const title    = encodeURIComponent(card.querySelector('.kamp-card-title')?.textContent?.trim() || '');
  const brand    = encodeURIComponent(card.querySelector('.kamp-brand-logo')?.textContent?.trim() || '');
  const discount = card.dataset.discount || '0';
  const days     = card.dataset.days     || '30';
  const type     = encodeURIComponent(card.querySelector('.kamp-card-type')?.textContent?.trim()  || 'İndirim');
  const animal   = encodeURIComponent(card.querySelector('.kamp-card-animal')?.textContent?.replace(/[^\w\s]/g,'').trim() || '');
  const img      = encodeURIComponent(card.querySelector('.kamp-card-img img')?.src || '');

  window.location.href =
    `kampanya-detay.html?title=${title}&brand=${brand}&discount=${discount}&days=${days}&type=${type}&animal=${animal}&img=${img}`;
};