/* =====================================================
   PAWCO – script.js
   ===================================================== */

/* ---------- TAB SWITCHING ---------- */
function switchTab(tab) {
  const tabGiris   = document.getElementById('tab-giris');
  const tabUye     = document.getElementById('tab-uye');
  const formGiris  = document.getElementById('form-giris');
  const formUye    = document.getElementById('form-uye');
  const indicator  = document.getElementById('tabIndicator');

  if (tab === 'giris') {
    tabGiris.classList.add('active');
    tabUye.classList.remove('active');
    tabGiris.setAttribute('aria-selected', 'true');
    tabUye.setAttribute('aria-selected', 'false');
    formGiris.classList.add('active');
    formUye.classList.remove('active');
    indicator.classList.remove('right');
  } else {
    tabUye.classList.add('active');
    tabGiris.classList.remove('active');
    tabUye.setAttribute('aria-selected', 'true');
    tabGiris.setAttribute('aria-selected', 'false');
    formUye.classList.add('active');
    formGiris.classList.remove('active');
    indicator.classList.add('right');
  }
}

// Set initial indicator position (Üye Ol is active by default)
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('tabIndicator').classList.add('right');

   const hash = window.location.hash;

  if (hash === "#giris") {
    switchTab("giris");
  } else {
    switchTab("uye");
  }
});


 


/* ---------- PASSWORD TOGGLE ---------- */
function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  const isHidden = input.type === 'password';
  input.type = isHidden ? 'text' : 'password';
  btn.setAttribute('aria-label', isHidden ? 'Şifreyi gizle' : 'Şifreyi göster');

  // Swap icon appearance
  const icon = btn.querySelector('.eye-icon');
  if (isHidden) {
    // Show "eye-off" crossed line
    icon.innerHTML = `
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    `;
  } else {
    icon.innerHTML = `
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    `;
  }
}

/* ---------- TOAST NOTIFICATION ---------- */
let toastTimer;
function showToast(message, type = 'success') {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.className = `toast ${type}`;

  // Force reflow so transition plays
  void toast.offsetWidth;
  toast.classList.add('show');

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* ---------- VALIDATION HELPERS ---------- */
function markError(input, message) {
  input.classList.add('error');
  input.setAttribute('aria-invalid', 'true');
  // Shake animation
  input.style.animation = 'none';
  void input.offsetWidth;
  input.style.animation = 'shake .35s ease';
}

function clearError(input) {
  input.classList.remove('error');
  input.removeAttribute('aria-invalid');
}

// Inject shake keyframes once
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%,100%{transform:translateX(0)}
    20%    {transform:translateX(-6px)}
    40%    {transform:translateX(6px)}
    60%    {transform:translateX(-4px)}
    80%    {transform:translateX(4px)}
  }
`;
document.head.appendChild(shakeStyle);

// Live clear errors on input
document.querySelectorAll('.field').forEach(field => {
  field.addEventListener('input', () => clearError(field));
});

/* ---------- REGISTER FORM SUBMIT ---------- */
const formUye = document.getElementById('form-uye');
formUye.addEventListener('submit', function (e) {
  e.preventDefault();

  const ad          = document.getElementById('ad');
  const soyad       = document.getElementById('soyad');
  const eposta      = document.getElementById('eposta');
  const sifre       = document.getElementById('sifre');
  const sifreTekrar = document.getElementById('sifre-tekrar');
  const sozlesme    = document.getElementById('sozlesme');

  let valid = true;

  // Ad
  if (!ad.value.trim()) {
    markError(ad, 'Ad zorunludur.'); valid = false;
  }
  // Soyad
  if (!soyad.value.trim()) {
    markError(soyad, 'Soyad zorunludur.'); valid = false;
  }
  // E-posta
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(eposta.value.trim())) {
    markError(eposta, 'Geçerli bir e-posta girin.'); valid = false;
  }
  // Şifre
  if (sifre.value.length < 6) {
    markError(sifre, 'Şifre en az 6 karakter olmalıdır.'); valid = false;
  }
  // Şifre tekrar
  if (sifreTekrar.value !== sifre.value) {
    markError(sifreTekrar, 'Şifreler eşleşmiyor.'); valid = false;
  }
  // Sözleşme
  if (!sozlesme.checked) {
    showToast('Lütfen üyelik sözleşmesini kabul edin.', 'error');
    valid = false;
  }

  if (!valid) return;

  // Simulate loading
  const btn = document.getElementById('submitBtn');
  btn.disabled = true;
  btn.textContent = 'Kayıt yapılıyor…';

  setTimeout(() => {
    btn.disabled = false;
    btn.textContent = 'Üye Ol';
    showToast('🐾 Hoş geldin! Kaydın tamamlandı.', 'success');
    formUye.reset();
    // Reset floating labels
    document.querySelectorAll('#form-uye .field').forEach(f => clearError(f));
  }, 1600);
});

/* ---------- LOGIN FORM SUBMIT ---------- */
const formGiris = document.getElementById('form-giris');
formGiris.addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('giris-email');
  const sifre = document.getElementById('giris-sifre');
  let valid = true;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value.trim())) {
    markError(email); valid = false;
  }
  if (!sifre.value) {
    markError(sifre); valid = false;
  }

  if (!valid) {
    showToast('Lütfen tüm alanları doldurun.', 'error');
    return;
  }

  const btn = formGiris.querySelector('.btn-primary');
  btn.disabled = true;
  btn.textContent = 'Giriş yapılıyor…';

  setTimeout(() => {
    btn.disabled = false;
    btn.textContent = 'Giriş Yap';
    showToast('🐾 Giriş başarılı!', 'success');
    formGiris.reset();
  }, 1400);
});