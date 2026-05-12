/* =====================================================
   PAWCO — destek-talebi.js
   Destek Talebi & SSS sayfası interaktif işlevler
   ===================================================== */

/* ── CAPTCHA ── */
let captchaVerified = false;

function toggleCaptcha() {
  const box = document.getElementById('captchaBox');
  const icon = document.getElementById('captchaIcon');
  captchaVerified = !captchaVerified;
  if (captchaVerified) {
    box.classList.add('verified');
    icon.style.display = 'block';
  } else {
    box.classList.remove('verified');
    icon.style.display = 'none';
  }
  checkFormReady();
}

/* ── FORM DOĞRULAMA & GÖNDER BUTONU ── */
function checkFormReady() {
  const fullName = document.getElementById('fullName').value.trim();
  const phone    = document.getElementById('phone').value.trim();
  const email    = document.getElementById('email').value.trim();
  const message  = document.getElementById('message').value.trim();
  const btn      = document.getElementById('dtSubmitBtn');

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const ready   = fullName && phone && emailOk && message && captchaVerified;

  btn.disabled = !ready;
}

/* ── FORM GÖNDERİMİ ── */
document.addEventListener('DOMContentLoaded', function () {

  /* Gerçek zamanlı doğrulama */
  ['fullName','phone','email','message'].forEach(function(id) {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', checkFormReady);
  });

  /* Form submit */
  const form = document.getElementById('dtForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      if (!captchaVerified) return;

      const btn = document.getElementById('dtSubmitBtn');
      btn.textContent = 'Gönderiliyor...';
      btn.disabled = true;

      /* Simüle edilmiş istek — gerçek API ile değiştirin */
      setTimeout(function() {
        showSuccessMessage();
      }, 1200);
    });
  }

  /* SSS Tab başlatma */
  initFaqTabs();
});

/* ── BAŞARI MESAJI ── */
function showSuccessMessage() {
  const card = document.querySelector('.dt-form-card');
  if (!card) return;
  card.innerHTML = `
    <div style="text-align:center;padding:40px 20px;">
      <div style="
        width:64px;height:64px;border-radius:50%;
        background:#e8f5e9;display:flex;align-items:center;
        justify-content:center;margin:0 auto 20px;
      ">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4caf50" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
      <h2 style="font-size:22px;font-weight:800;color:#1a1a1a;margin:0 0 12px;">
        Talebiniz Alındı!
      </h2>
      <p style="font-size:14px;color:#666;line-height:1.7;margin:0 0 24px;">
        Destek talebiniz başarıyla oluşturuldu.<br/>
        En kısa sürede size dönüş yapacağız.
      </p>
      <a href="index.html" style="
        display:inline-block;padding:12px 28px;
        background:#1a1a1a;color:#fff;border-radius:10px;
        font-size:14px;font-weight:700;text-decoration:none;
        transition:background .2s;
      " onmouseover="this.style.background='#e85d04'"
         onmouseout="this.style.background='#1a1a1a'">
        Ana Sayfaya Dön
      </a>
    </div>
  `;
}

/* ── ACCORDION ── */
function toggleAccordion(btn) {
  const item   = btn.closest('.dt-accordion-item');
  const body   = item.querySelector('.dt-accordion-body');
  const panel  = item.closest('.dt-faq-panel');
  const isOpen = btn.classList.contains('open');

  /* Aynı paneldeki diğerlerini kapat */
  panel.querySelectorAll('.dt-accordion-head.open').forEach(function(openBtn) {
    if (openBtn !== btn) {
      openBtn.classList.remove('open');
      openBtn.closest('.dt-accordion-item')
             .querySelector('.dt-accordion-body')
             .classList.remove('open');
    }
  });

  /* Bu öğeyi toggle et */
  btn.classList.toggle('open', !isOpen);
  body.classList.toggle('open', !isOpen);
}

/* ── SSS TABLAR ── */
function initFaqTabs() {
  const tabs = document.querySelectorAll('.dt-faq-tab');
  tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      const targetId = 'panel-' + tab.getAttribute('data-tab');

      /* Aktif tab */
      tabs.forEach(function(t) { t.classList.remove('active'); });
      tab.classList.add('active');

      /* Aktif panel */
      document.querySelectorAll('.dt-faq-panel').forEach(function(panel) {
        panel.classList.remove('active');
      });
      const target = document.getElementById(targetId);
      if (target) target.classList.add('active');
    });
  });
}

/* ── FOTOĞRAF YÜKLEME ── */
let uploadedFiles = [];

function handleFiles(files) {
  const remaining = 4 - uploadedFiles.length;
  const toAdd     = Array.from(files).slice(0, remaining);

  toAdd.forEach(function(file) {
    if (!file.type.startsWith('image/')) return;
    uploadedFiles.push(file);

    const reader = new FileReader();
    reader.onload = function(e) {
      renderPreview(e.target.result, uploadedFiles.length - 1);
    };
    reader.readAsDataURL(file);
  });

  /* 4 dosyaya ulaşıldıysa yükleme alanını gizle */
  const area = document.getElementById('uploadArea');
  if (area) area.style.display = uploadedFiles.length >= 4 ? 'none' : '';
}

function renderPreview(src, index) {
  const container = document.getElementById('uploadPreviews');
  if (!container) return;

  const wrap = document.createElement('div');
  wrap.className = 'dt-preview-wrap';
  wrap.dataset.index = index;

  const img = document.createElement('img');
  img.src = src;
  img.className = 'dt-preview-thumb';
  img.alt = 'Önizleme';

  const removeBtn = document.createElement('button');
  removeBtn.className = 'dt-preview-remove';
  removeBtn.innerHTML = '✕';
  removeBtn.title = 'Kaldır';
  removeBtn.onclick = function() { removePreview(index); };

  wrap.appendChild(img);
  wrap.appendChild(removeBtn);
  container.appendChild(wrap);
}

function removePreview(index) {
  uploadedFiles.splice(index, 1);

  /* Tüm önizlemeleri temizle ve yeniden çiz */
  const container = document.getElementById('uploadPreviews');
  if (container) container.innerHTML = '';

  /* Dosya input'unu sıfırla */
  const fileInput = document.getElementById('fileInput');
  if (fileInput) fileInput.value = '';

  /* Tüm kalan dosyaları tekrar render et */
  uploadedFiles.forEach(function(file, i) {
    const reader = new FileReader();
    reader.onload = function(e) { renderPreview(e.target.result, i); };
    reader.readAsDataURL(file);
  });

  /* Yükleme alanını tekrar göster */
  const area = document.getElementById('uploadArea');
  if (area) area.style.display = '';
}