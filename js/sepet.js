/* ============================================================
   PAWCO — sepet.js
   Sepet etkileşimleri: miktar, silme, fiyat güncelleme,
   kupon, slider'lar, checkout yönlendirmesi.
   ============================================================ */

'use strict';

// ── SEPET VERİSİ ──────────────────────────────────────
// Backend bağlandığında bu veri API'den gelecek.
const cartItems = {
  1: { name: "Hill's SCIENCE PLAN Kedi Maması 3kg", price: 1529, qty: 1 }
};

// ── MİKTAR DEĞİŞTİR ──────────────────────────────────
function changeQty(id, delta) {
  if (!cartItems[id]) return;

  const newQty = cartItems[id].qty + delta;
  if (newQty < 1) {
    if (confirm('Bu ürünü sepetten kaldırmak istiyor musunuz?')) {
      removeItem(id);
    }
    return;
  }

  cartItems[id].qty = newQty;
  document.getElementById('qty-' + id).textContent = newQty;
  updatePriceDisplay(id);
  updateSummary();
}

function updatePriceDisplay(id) {
  const item = cartItems[id];
  const total = item.price * item.qty;
  document.getElementById('price-' + id).textContent = formatPrice(total);
}

// ── ÜRÜN SİL ─────────────────────────────────────────
function removeItem(id) {
  const row = document.querySelector('.sepet-item[data-id="' + id + '"]');
  if (!row) return;

  row.style.transition = 'opacity .3s, transform .3s';
  row.style.opacity    = '0';
  row.style.transform  = 'translateX(40px)';

  setTimeout(() => {
    row.remove();
    delete cartItems[id];
    updateSummary();
    checkEmpty();
  }, 300);
}

function checkEmpty() {
  const items = document.getElementById('sepetItems');
  if (!items || items.children.length > 0) return;

  items.innerHTML = `
    <div class="empty-cart">
      <div class="empty-cart-icon">🛒</div>
      <h2>Sepetiniz Boş</h2>
      <p>Harika ürünler sizi bekliyor!</p>
      <a href="index.html" class="empty-cart-btn">Alışverişe Başla</a>
    </div>
  `;
  document.querySelector('.sepet-kargo-row').style.display = 'none';
  document.getElementById('continueBtn')?.setAttribute('disabled', '');
}

// ── FAVORİLERE EKLE ───────────────────────────────────
function addToFav(id) {
  const btn = document.querySelector('.sepet-item[data-id="' + id + '"] .sepet-item-fav');
  if (!btn) return;
  const isAdded = btn.textContent === '♥';
  btn.textContent = isAdded ? '♡' : '♥';
  btn.style.color = isAdded ? '' : '#e11d48';
}

// ── ÖZET GÜNCELLE ─────────────────────────────────────
function updateSummary() {
  let subtotal = 0;
  let count    = 0;

  Object.values(cartItems).forEach(item => {
    subtotal += item.price * item.qty;
    count    += item.qty;
  });

  const subtotalEl = document.getElementById('ozet-subtotal');
  const totalEl    = document.getElementById('ozet-total');
  const countEl    = document.getElementById('sepetCount');
  const badgeEl    = document.getElementById('cartCountBadge');

  if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
  if (totalEl)    totalEl.textContent    = formatPrice(subtotal);
  if (countEl)    countEl.textContent    = '(' + count + ' Ürün)';
  if (badgeEl)    badgeEl.textContent    = count;

  // Ürün sayısına göre özet satır metnini güncelle
  const ozetRow = document.querySelector('.ozet-row .ozet-val');
  if (ozetRow) ozetRow.textContent = formatPrice(subtotal);
}

// ── SEPETİ TAMAMEN TEMİZLE ────────────────────────────
function clearCart() {
  if (!confirm('Sepetteki tüm ürünleri kaldırmak istiyor musunuz?')) return;
  Object.keys(cartItems).forEach(id => delete cartItems[id]);
  document.getElementById('sepetItems').innerHTML = '';
  updateSummary();
  checkEmpty();
}

// ── CHECKOUT ─────────────────────────────────────────
function goCheckout() {
  if (Object.keys(cartItems).length === 0) {
    alert('Sepetiniz boş!');
    return;
  }
  window.location.href = 'odeme.html';
}

// ── KUPON ─────────────────────────────────────────────
const VALID_COUPONS = {
  'PAWCO10': 10,
  'HOSGELDIN': 15,
  'KEDI20':   20,
};

function applyCoupon() {
  const input = document.getElementById('couponInput');
  const msg   = document.getElementById('couponMsg');
  const code  = input.value.trim().toUpperCase();

  if (!code) {
    showCouponMsg('Lütfen bir kod girin.', true);
    return;
  }

  if (VALID_COUPONS[code]) {
    const disc = VALID_COUPONS[code];
    showCouponMsg('🎉 ' + disc + '% indirim uygulandı!', false);
    input.disabled = true;
    document.querySelector('.coupon-apply-btn').disabled = true;
    applyDiscount(disc);
  } else {
    showCouponMsg('Geçersiz veya süresi dolmuş kod.', true);
    input.focus();
  }
}

function showCouponMsg(text, isErr) {
  const msg = document.getElementById('couponMsg');
  msg.textContent = text;
  msg.className   = 'coupon-msg' + (isErr ? ' coupon-msg--err' : '');
}

function applyDiscount(pct) {
  let subtotal = 0;
  Object.values(cartItems).forEach(i => subtotal += i.price * i.qty);
  const discounted = subtotal * (1 - pct / 100);
  const totalEl = document.getElementById('ozet-total');
  if (totalEl) totalEl.textContent = formatPrice(discounted);
}

// ── ÖNERİ SLİDERLAR ──────────────────────────────────
const sliderState = {};

function slideRec(trackId, prevId, nextId, dir) {
  const track   = document.getElementById(trackId);
  const prevBtn = document.getElementById(prevId);
  const nextBtn = document.getElementById(nextId);
  if (!track) return;

  if (!sliderState[trackId]) sliderState[trackId] = 0;

  const card        = track.children[0];
  const cardW       = card ? card.offsetWidth + 14 : 194;
  const visible     = Math.floor(track.parentElement.offsetWidth / cardW);
  const max         = Math.max(0, track.children.length - visible);

  sliderState[trackId] = Math.min(max, Math.max(0, sliderState[trackId] + dir));
  track.style.transform = 'translateX(-' + (sliderState[trackId] * cardW) + 'px)';

  if (prevBtn) prevBtn.disabled = sliderState[trackId] <= 0;
  if (nextBtn) nextBtn.disabled = sliderState[trackId] >= max;
}

// ── YARDİMCİLAR ───────────────────────────────────────
function formatPrice(n) {
  return n.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' TL';
}

// ── SEPET KART BUTONLARI (öneriler) ───────────────────
function initRecButtons() {
  document.querySelectorAll('.rec-cart-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (btn.classList.contains('added')) return;
      btn.classList.add('added');
      const orig = btn.textContent;
      btn.textContent = '✓';
      btn.style.background = '#16a34a';

      const badge = document.getElementById('cartCountBadge');
      if (badge) badge.textContent = parseInt(badge.textContent || 0) + 1;

      setTimeout(() => {
        btn.classList.remove('added');
        btn.textContent   = orig;
        btn.style.background = '';
      }, 1400);
    });
  });
}

// ── INIT ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initRecButtons();
  updateSummary();

  // İlk slider durumu
  ['viewedPrev','togetherPrev','forYouPrev'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.disabled = true;
  });
});