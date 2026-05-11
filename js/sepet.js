/* =====================================================
   PAWCO – sepet.js
   ===================================================== */

/* ---------- CART STATE ---------- */
const SHIPPING_COST = 79;
const FREE_SHIPPING_THRESHOLD = 799;

let cart = [
  { id: 1, qty: 1, price: 43 }
];

/* ---------- TOAST ---------- */
let toastTimer;
function showToast(msg, type = 'success') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = `toast ${type}`;
  void t.offsetWidth;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
}

/* ---------- HELPERS ---------- */
function fmtTL(n) {
  return n.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' TL';
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getTotalQty() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function getShipping() {
  const total = getCartTotal();
  return total >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
}

/* ---------- UPDATE SUMMARY ---------- */
function updateSummary() {
  const itemTotal  = getCartTotal();
  const shipping   = getShipping();
  const grandTotal = itemTotal + shipping;
  const qty        = getTotalQty();

  document.getElementById('summaryItemLabel').textContent  = `${qty} Adet Ürün`;
  document.getElementById('summaryItemPrice').textContent  = fmtTL(itemTotal);
  document.getElementById('summaryShipping').textContent   = shipping === 0 ? 'Ücretsiz 🎉' : fmtTL(shipping);
  document.getElementById('summaryTotal').textContent      = fmtTL(grandTotal);
  document.getElementById('cartCountLabel').textContent    = `(${qty} Ürün)`;
  document.getElementById('shippingLabel').textContent     = shipping === 0 ? 'Ücretsiz 🎉' : fmtTL(shipping);

  // Update free-shipping banner
  const remaining = FREE_SHIPPING_THRESHOLD - itemTotal;
  const banner = document.querySelector('.banner-shipping span');
  if (banner) {
    if (remaining <= 0) {
      banner.innerHTML = '🎉 Kargo <strong class="highlight" style="color:var(--green)">Ücretsiz</strong>! Tebrikler!';
    } else {
      banner.innerHTML = `Sepetinize <strong>${remaining.toLocaleString('tr-TR', {minimumFractionDigits: 2})} TL</strong> daha ürün eklerseniz <strong class="highlight">kargo bedava</strong> olur!`;
    }
  }
}

/* ---------- UPDATE ITEM DISPLAY ---------- */
function updateItemDisplay(id) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  const qtyEl   = document.getElementById(`qty-${id}`);
  const priceEl = document.getElementById(`price-${id}`);
  if (qtyEl)   qtyEl.textContent   = item.qty;
  if (priceEl) priceEl.textContent = fmtTL(item.price * item.qty);
}

/* ---------- CHANGE QUANTITY ---------- */
function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  const newQty = item.qty + delta;

  if (newQty < 1) {
    removeItem(id);
    return;
  }

  item.qty = newQty;
  updateItemDisplay(id);
  updateSummary();
  showToast(delta > 0 ? 'Miktar artırıldı ✅' : 'Miktar azaltıldı', 'success');
}

/* ---------- REMOVE ITEM ---------- */
function removeItem(id) {
  cart = cart.filter(i => i.id !== id);
  const row = document.querySelector(`.cart-item[data-id="${id}"]`);
  if (row) {
    row.style.transition = 'opacity .3s, transform .3s';
    row.style.opacity    = '0';
    row.style.transform  = 'translateX(-20px)';
    setTimeout(() => {
      row.remove();
      renderCartEmpty();
      updateSummary();
    }, 300);
  }
  showToast('Ürün sepetten kaldırıldı 🗑️', 'error');
}

/* ---------- CLEAR CART ---------- */
function clearCart() {
  if (!confirm('Sepeti tamamen temizlemek istiyor musunuz?')) return;
  cart = [];
  document.getElementById('cartItems').innerHTML = '';
  renderCartEmpty();
  updateSummary();
  showToast('Sepet temizlendi 🗑️', 'error');
}

/* ---------- RENDER EMPTY STATE ---------- */
function renderCartEmpty() {
  const container = document.getElementById('cartItems');
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <p style="font-size:2.5rem;margin-bottom:10px">🛒</p>
        <p style="font-weight:700;margin-bottom:6px">Sepetiniz boş!</p>
        <a href="#" style="color:var(--brand);font-weight:800;font-size:.9rem">Alışverişe Devam Et →</a>
      </div>`;
  }
}

/* ---------- DISCOUNT CODE ---------- */
function applyDiscount() {
  const input = document.querySelector('.discount-input');
  const code  = input.value.trim().toUpperCase();
  const valid = { 'PAWCO10': .10, 'KEDI20': .20, 'WELCOME': .15 };

  if (!code) {
    showToast('Lütfen bir indirim kodu girin.', 'error');
    return;
  }
  if (valid[code]) {
    const pct     = valid[code];
    const itemTotal = getCartTotal();
    const discount  = itemTotal * pct;
    showToast(`%${pct * 100} indirim uygulandı! −${fmtTL(discount)} 🎉`, 'success');
    input.value = '';
    input.placeholder = `✅ ${code} uygulandı`;
    input.disabled = true;
  } else {
    showToast('Geçersiz indirim kodu ❌', 'error');
    input.style.borderColor = 'var(--brand)';
    setTimeout(() => input.style.borderColor = '', 1200);
  }
}

/* ---------- FAVOURITE TOGGLE ---------- */
document.addEventListener('click', e => {
  if (e.target.classList.contains('fav-btn')) {
    e.target.classList.toggle('active');
    const isActive = e.target.classList.contains('active');
    e.target.textContent = isActive ? '♥' : '♡';
    showToast(isActive ? 'Favorilere eklendi ♥' : 'Favorilerden çıkarıldı', 'success');
  }
});

/* ---------- INIT ---------- */
document.addEventListener('DOMContentLoaded', () => {
  updateSummary();
});