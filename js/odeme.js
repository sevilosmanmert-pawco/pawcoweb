/* =====================================================
   PAWCO — odeme.js
   Ödeme sayfası: adres → ödeme akışı
   ===================================================== */

'use strict';

// ── STATE ──────────────────────────────────────────────
const state = {
  currentStep: 'address', // 'address' | 'payment'
  address: {},
  couponApplied: false,
  paymentTab: 'kredi'     // 'kredi' | 'havale'
};

// ── İL-İLÇE VERİSİ ────────────────────────────────────
const districts = {
  istanbul: ['Adalar','Arnavutköy','Ataşehir','Avcılar','Bağcılar','Bahçelievler','Bakırköy',
    'Başakşehir','Bayrampaşa','Beşiktaş','Beykoz','Beylikdüzü','Beyoğlu','Büyükçekmece',
    'Çatalca','Çekmeköy','Esenler','Esenyurt','Eyüpsultan','Fatih','Gaziosmanpaşa',
    'Güngören','Kadıköy','Kağıthane','Kartal','Küçükçekmece','Maltepe','Pendik',
    'Sancaktepe','Sarıyer','Silivri','Sultanbeyli','Sultangazi','Şile','Şişli',
    'Tuzla','Ümraniye','Üsküdar','Zeytinburnu'],
  ankara: ['Akyurt','Altındağ','Ayaş','Bala','Beypazarı','Çamlıdere','Çankaya','Çubuk',
    'Elmadağ','Etimesgut','Evren','Gölbaşı','Güdül','Haymana','Kalecik','Kazan',
    'Keçiören','Kızılcahamam','Mamak','Nallıhan','Polatlı','Pursaklar','Şereflikoçhisar',
    'Sincan','Yenimahalle'],
  izmir: ['Aliağa','Balçova','Bayındır','Bayraklı','Bergama','Beydağ','Bornova','Buca',
    'Çeşme','Çiğli','Dikili','Foça','Gaziemir','Güzelbahçe','Karabağlar','Karaburun',
    'Karşıyaka','Kemalpaşa','Kınık','Kiraz','Konak','Menderes','Menemen','Narlıdere',
    'Ödemiş','Seferihisar','Selçuk','Tire','Torbalı','Urla'],
  bursa: ['Büyükorhan','Gemlik','Gürsu','Harmancık','İnegöl','İznik','Karacabey',
    'Keles','Kestel','Mudanya','Mustafakemalpaşa','Nilüfer','Orhaneli','Orhangazi',
    'Osmangazi','Yenişehir','Yıldırım'],
  antalya: ['Aksu','Alanya','Demre','Döşemealtı','Elmalı','Finike','Gazipaşa','Gündoğmuş',
    'İbradı','Kaş','Kemer','Kepez','Konyaaltı','Korkuteli','Kumluca','Manavgat',
    'Muratpaşa','Serik'],
  adana: ['Aladağ','Ceyhan','Çukurova','Feke','İmamoğlu','Karaisalı','Karataş','Kozan',
    'Pozantı','Saimbeyli','Sarıçam','Seyhan','Tufanbeyli','Yumurtalık','Yüreğir'],
  konya: ['Akören','Akşehir','Altınekin','Beyşehir','Bozkır','Cihanbeyli','Çeltik',
    'Çumra','Derbent','Derebucak','Doğanhisar','Emirgazi','Ereğli','Güneysınır',
    'Hadim','Halkapınar','Hüyük','Ilgın','Kadınhanı','Karapınar','Karatay','Kulu',
    'Meram','Sarayönü','Selçuklu','Seydişehir','Taşkent','Tuzlukçu','Yalıhüyük','Yunak'],
  gaziantep: ['Araban','İslahiye','Karkamış','Nurdağı','Oğuzeli','Şahinbey','Şehitkamil','Yavuzeli'],
  mersin: ['Akdeniz','Anamur','Aydıncık','Bozyazı','Çamlıyayla','Erdemli','Gülnar',
    'Mezitli','Mut','Silifke','Tarsus','Toroslar','Yenişehir'],
  kayseri: ['Akkışla','Bünyan','Develi','Felahiye','Hacılar','İncesu','Kocasinan',
    'Melikgazi','Özvatan','Pınarbaşı','Sarıoğlan','Sarız','Talas','Tomarza','Yahyalı','Yeşilhisar']
};

// ── INIT ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initAccordions();
  initInstallmentRadios();
  initCardSaveToggle();
  initContractToggle();
});

// ── ACCORDION ─────────────────────────────────────────
function initAccordions() {
  // Her co-card--accordion için head'e click ekle
  const pairs = [
    ['cartAccordionHead',  'cartAccordionBody',  'cartAccordionArrow'],
    ['cartAccordionHead2', 'cartAccordionBody2', 'cartAccordionArrow2'],
    ['notAccordionHead',   'notAccordionBody',   'notAccordionArrow'],
    ['sozlesmeHead',       'sozlesmeBody',       'sozlesmeArrow'],
  ];
  pairs.forEach(([headId, bodyId, arrowId]) => {
    const head  = document.getElementById(headId);
    const body  = document.getElementById(bodyId);
    const arrow = document.getElementById(arrowId);
    if (!head || !body) return;

    // sozlesme default open
    const defaultOpen = (headId === 'sozlesmeHead');
    if (!defaultOpen) body.style.display = 'none';

    head.addEventListener('click', () => {
      const open = body.style.display !== 'none';
      body.style.display = open ? 'none' : 'block';
      if (arrow) arrow.textContent = open ? '▾' : '▲';
    });
  });
}

// ── İLÇE YÜKLEMESİ ───────────────────────────────────
function loadDistricts(city) {
  const ilce = document.getElementById('ilce');
  ilce.innerHTML = '<option value="">İlçe seçin</option>';
  const list = districts[city] || [];
  list.forEach(d => {
    const opt = document.createElement('option');
    opt.value = d.toLowerCase().replace(/\s/g, '-');
    opt.textContent = d;
    ilce.appendChild(opt);
  });
}

// ── KART VİZÜEL ──────────────────────────────────────
function updateCardVisual() {
  const name   = (document.getElementById('cardName')?.value || '').toUpperCase() || 'AD SOYAD';
  const num    = document.getElementById('cardNumber')?.value || '';
  const month  = document.getElementById('cardMonth')?.value || 'AA';
  const year   = document.getElementById('cardYear')?.value?.slice(-2) || 'YY';

  const numDisplay = num.replace(/\s/g, '').padEnd(16, '•').replace(/(.{4})/g, '$1 ').trim();

  const el = {
    name:   document.getElementById('visualCardName'),
    number: document.getElementById('visualCardNumber'),
    exp:    document.getElementById('visualCardExp'),
    brand:  document.getElementById('visualCardBrand'),
    visual: document.getElementById('cardVisual'),
  };

  if (el.name)   el.name.textContent   = name || 'AD SOYAD';
  if (el.number) el.number.textContent = numDisplay || '•••• •••• •••• ••••';
  if (el.exp)    el.exp.textContent     = `${month}/${year}`;

  // Kart türü tespiti
  const rawNum = num.replace(/\s/g, '');
  let brand = '💳';
  let gradient = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)';
  if (/^4/.test(rawNum))            { brand = 'VISA';  gradient = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'; }
  else if (/^5[1-5]/.test(rawNum)) { brand = 'MC';    gradient = 'linear-gradient(135deg, #c94e03 0%, #7b2d00 100%)'; }
  else if (/^9/.test(rawNum))       { brand = 'TROY';  gradient = 'linear-gradient(135deg, #1d4e89 0%, #0d2b50 100%)'; }
  else if (/^6/.test(rawNum))       { brand = 'AMEX';  gradient = 'linear-gradient(135deg, #2c7873 0%, #052c3b 100%)'; }

  if (el.brand)  el.brand.textContent = brand;
  if (el.visual) el.visual.style.background = gradient;
}

// ── KART NUMARASI FORMATLAMA ──────────────────────────
function formatCardNumber(input) {
  let val = input.value.replace(/\D/g, '').slice(0, 16);
  input.value = val.replace(/(.{4})/g, '$1 ').trim();
}

// ── KART KAYDET TOGGLE ────────────────────────────────
function initCardSaveToggle() {
  const cb   = document.getElementById('saveCard');
  const info = document.getElementById('cardSaveInfo');
  if (!cb || !info) return;
  cb.addEventListener('change', () => {
    info.style.display = cb.checked ? 'block' : 'none';
  });
}

// ── SÖZLEŞMELERİ ONAY ────────────────────────────────
function initContractToggle() {
  const cb = document.getElementById('contractAccept');
  if (!cb) return;
  cb.addEventListener('change', () => {
    // onay butonunu aktif/pasif et
  });
}

// ── TAKSİT SEÇENEKLERİ ───────────────────────────────
function initInstallmentRadios() {
  document.querySelectorAll('.co-installment-item').forEach(item => {
    const radio = item.querySelector('input[type="radio"]');
    if (!radio) return;
    radio.addEventListener('change', () => {
      document.querySelectorAll('.co-installment-item').forEach(i => i.classList.remove('co-installment-item--selected'));
      item.classList.add('co-installment-item--selected');
    });
    item.addEventListener('click', () => radio.checked = true);
  });
}

// ── ÖDEME SEKMESI ─────────────────────────────────────
function switchPaymentTab(tab) {
  state.paymentTab = tab;
  document.getElementById('panelKredi').classList.toggle('hidden', tab !== 'kredi');
  document.getElementById('panelHavale').classList.toggle('hidden', tab !== 'havale');
  document.getElementById('tabKredi').classList.toggle('co-payment-tab--active', tab === 'kredi');
  document.getElementById('tabHavale').classList.toggle('co-payment-tab--active', tab === 'havale');
}

// ── ADRES DOĞRULAMA ───────────────────────────────────
function validateAddress() {
  let valid = true;
  const fields = [
    { id: 'adSoyad',    label: 'Ad Soyad' },
    { id: 'cepTelefonu',label: 'Cep Telefonu' },
    { id: 'sehir',      label: 'Şehir' },
    { id: 'ilce',       label: 'İlçe' },
    { id: 'acikAdres',  label: 'Açık Adres' },
  ];
  fields.forEach(f => {
    const el = document.getElementById(f.id);
    if (!el) return;
    // Temizle
    el.classList.remove('error');
    const existing = el.parentElement.querySelector('.co-field-error');
    if (existing) existing.remove();

    if (!el.value.trim()) {
      valid = false;
      el.classList.add('error');
      const msg = document.createElement('div');
      msg.className = 'co-field-error';
      msg.textContent = `${f.label} alanı zorunludur.`;
      el.parentElement.appendChild(msg);
    }
  });
  return valid;
}

// ── ÖDEME DOĞRULAMA ───────────────────────────────────
function validatePayment() {
  if (state.paymentTab === 'havale') return true;

  let valid = true;
  const fields = [
    { id: 'cardName',   label: 'Kart Sahibi Adı' },
    { id: 'cardNumber', label: 'Kart Numarası' },
    { id: 'cardMonth',  label: 'Son Kullanma Ayı' },
    { id: 'cardYear',   label: 'Son Kullanma Yılı' },
    { id: 'cardCvv',    label: 'Güvenlik Kodu' },
  ];
  fields.forEach(f => {
    const el = document.getElementById(f.id);
    if (!el) return;
    el.classList.remove('error');
    const existing = el.parentElement.querySelector('.co-field-error');
    if (existing) existing.remove();

    if (!el.value.trim()) {
      valid = false;
      el.classList.add('error');
      const msg = document.createElement('div');
      msg.className = 'co-field-error';
      msg.textContent = `${f.label} alanı zorunludur.`;
      el.parentElement.appendChild(msg);
    }
  });

  // Sözleşme
  const contract = document.getElementById('contractAccept');
  if (contract && !contract.checked) {
    valid = false;
    showToast('Lütfen satış sözleşmelerini kabul edin.');
  }
  return valid;
}

// ── ADRES → ÖDEME GEÇİŞİ ─────────────────────────────
function goToPayment() {
  if (!validateAddress()) {
    const firstError = document.querySelector('.co-input.error');
    if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  // Adres bilgilerini state'e al
  state.address = {
    adSoyad:    document.getElementById('adSoyad').value.trim(),
    telefon:    document.getElementById('cepTelefonu').value.trim(),
    sehir:      document.getElementById('sehir').options[document.getElementById('sehir').selectedIndex]?.text || '',
    ilce:       document.getElementById('ilce').options[document.getElementById('ilce').selectedIndex]?.text || '',
    mahalle:    document.getElementById('mahalle').value.trim(),
    acikAdres:  document.getElementById('acikAdres').value.trim(),
    baslik:     document.getElementById('adresBaslik').value.trim() || 'Ev Adresim',
  };

  // Ödeme adımında adresi göster
  const displayBaslik = document.getElementById('displayAdresBaslik');
  const displayAdres  = document.getElementById('displayAcikAdres');
  if (displayBaslik) displayBaslik.textContent = state.address.baslik;
  if (displayAdres)  displayAdres.textContent  =
    `${state.address.mahalle ? state.address.mahalle + ' ' : ''}${state.address.acikAdres}, ${state.address.ilce} / ${state.address.sehir}`;

  switchToStep('payment');
}

// ── ÖDEME → ADRES GEÇİŞİ ─────────────────────────────
function goToAddress() {
  switchToStep('address');
}

// ── ADIM GEÇİŞ MOTORU ────────────────────────────────
function switchToStep(step) {
  state.currentStep = step;

  // Paneller
  document.getElementById('panel-address').classList.toggle('hidden', step !== 'address');
  document.getElementById('panel-payment').classList.toggle('hidden', step !== 'payment');

  // Step bar
  const tab1 = document.getElementById('stepTab1');
  const tab2 = document.getElementById('stepTab2');
  if (step === 'address') {
    tab1.classList.add('checkout-step--active');
    tab1.classList.remove('checkout-step--done');
    tab2.classList.remove('checkout-step--active', 'checkout-step--done');
  } else {
    tab1.classList.remove('checkout-step--active');
    tab1.classList.add('checkout-step--done');
    tab1.querySelector('.cstep-num').textContent = '✓';
    tab2.classList.add('checkout-step--active');
  }

  // Breadcrumb
  const bc = document.getElementById('bcLabel');
  if (bc) bc.textContent = step === 'address' ? 'Adres ve İletişim Bilgileri' : 'Ödeme';

  // Aside buton
  const asideBtn = document.getElementById('asidePrimaryBtn');
  if (asideBtn) {
    asideBtn.textContent = step === 'address' ? 'Kaydet ve Devam Et' : 'Ödemeyi Onayla';
    asideBtn.onclick = step === 'address' ? goToPayment : confirmOrder;
  }

  // Sözleşme onay (sadece ödeme adımında)
  const contractCheck = document.getElementById('contractCheck');
  if (contractCheck) contractCheck.style.display = step === 'payment' ? 'block' : 'none';

  // Scroll top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── SİPARİŞ ONAYLA ───────────────────────────────────
function confirmOrder() {
  if (!validatePayment()) return;

  const btn = document.getElementById('btnConfirm');
  if (btn) {
    btn.disabled = true;
    btn.textContent = '⏳ İşleniyor...';
  }

  // Simüle gecikme (gerçekte API çağrısı)
  setTimeout(() => {
    document.getElementById('successOverlay')?.classList.remove('hidden');
    if (btn) {
      btn.disabled = false;
      btn.textContent = 'Ödemeyi Onayla';
    }
  }, 1800);
}

// ── KUPON ─────────────────────────────────────────────
function applyCoupon() {
  const input = document.getElementById('couponInput');
  const msg   = document.getElementById('couponMsg');
  if (!input || !msg) return;

  const code = input.value.trim().toUpperCase();
  if (!code) {
    msg.className = 'co-coupon-msg error';
    msg.textContent = 'Lütfen bir kupon kodu girin.';
    return;
  }

  // Mock kuponlar
  const coupons = {
    'PAWCO10': { discount: 0.10, label: '%10 indirim uygulandı!' },
    'ILKILK':  { discount: 0.15, label: '%15 ilk sipariş indirimi uygulandı!' },
    'KARGO':   { discount: 0,    label: 'Ücretsiz kargo kuponu (zaten ücretsiz).' },
  };

  if (state.couponApplied) {
    msg.className = 'co-coupon-msg error';
    msg.textContent = 'Yalnızca bir kupon kodu kullanabilirsiniz.';
    return;
  }

  const coupon = coupons[code];
  if (coupon) {
    state.couponApplied = true;
    msg.className = 'co-coupon-msg success';
    msg.textContent = coupon.label;
    input.disabled = true;

    if (coupon.discount > 0) {
      const base     = 1529;
      const discount = Math.round(base * coupon.discount * 100) / 100;
      const total    = base - discount;
      const row      = document.getElementById('discountRow');
      const val      = document.getElementById('discountVal');
      const totalEl  = document.querySelector('.co-total-price');
      if (row)    row.style.display = '';
      if (val)    val.textContent   = `-${discount.toLocaleString('tr-TR', {minimumFractionDigits:2})} ₺`;
      if (totalEl) totalEl.textContent = `${total.toLocaleString('tr-TR', {minimumFractionDigits:2})} ₺`;
    }
  } else {
    msg.className = 'co-coupon-msg error';
    msg.textContent = 'Geçersiz kupon kodu.';
  }
}

// ── TOAST ─────────────────────────────────────────────
function showToast(message) {
  const existing = document.querySelector('.co-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'co-toast';
  toast.textContent = message;
  toast.style.cssText = `
    position:fixed;bottom:24px;left:50%;transform:translateX(-50%);
    background:#1a1a1a;color:#fff;padding:12px 24px;border-radius:10px;
    font-size:13px;font-weight:600;z-index:9999;white-space:nowrap;
    box-shadow:0 4px 20px rgba(0,0,0,.25);
    animation:toastIn .25s ease both;
  `;
  document.body.appendChild(toast);

  const style = document.createElement('style');
  style.textContent = '@keyframes toastIn{from{opacity:0;transform:translate(-50%,20px)}to{opacity:1;transform:translate(-50%,0)}}';
  document.head.appendChild(style);

  setTimeout(() => toast.remove(), 3500);
}

// ── GLOBAL ────────────────────────────────────────────
window.goToPayment       = goToPayment;
window.goToAddress       = goToAddress;
window.confirmOrder      = confirmOrder;
window.applyCoupon       = applyCoupon;
window.switchPaymentTab  = switchPaymentTab;
window.loadDistricts     = loadDistricts;
window.formatCardNumber  = formatCardNumber;
window.updateCardVisual  = updateCardVisual;
window.asidePrimaryAction = function() {
  if (state.currentStep === 'address') goToPayment();
  else confirmOrder();
};