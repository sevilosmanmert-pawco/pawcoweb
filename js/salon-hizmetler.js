/* =====================================================
   PAWCO — salon-hizmetler.js
   5 adımlı randevu wizard'ı:
     0. Evcil Dost bilgileri
     1. Hizmet seçimi
     2. Lokasyon seçimi
     3. Tarih & saat seçimi
     4. Randevu onayı
   ===================================================== */

'use strict';

// ── KAYITLI EVCİL HAYVANLAR (hesap profili verisi) ───
// Gerçek projede bu veri API'den ya da localStorage'dan gelir.
const SAVED_PETS = [
  {
    id: 'pet_1',
    type: 'kedi',
    name: 'Pamuk',
    breed: 'Van Kedisi',
    age: '2 yaş',
    weight: '3.8',
    phone: '05321234567',
    note: '',
    emoji: '🐱',
    bg: '#fff4ef',
  },
  {
    id: 'pet_2',
    type: 'kopek',
    name: 'Karamel',
    breed: 'Golden Retriever',
    age: '4 yaş',
    weight: '28.5',
    phone: '05321234567',
    note: 'Yabancılardan biraz çekiniyor, nazik davranılsın.',
    emoji: '🐶',
    bg: '#f0fdf4',
  },
];

// ── DURUM ────────────────────────────────────────────
const state = {
  step:            0,
  petType:         'kedi',
  petName:         '',
  petBreed:        '',
  petAge:          '',
  petWeight:       '',
  petNote:         '',
  ownerPhone:      '',
  services:        new Set(),
  location:        null,
  date:            null,
  time:            null,
  selectedSavedPet: null,   // null → yeni ekleme, string id → kayıtlı hayvan
};

// ── INIT ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initFilterGroups();
  initFilterCheckboxes();
  initMobileFilter();
  initPetDropdown();          // ← Kayıtlı hayvan dropdown'ı
  showStep(0);
  renderWizardBar();
});

// ── ADIM GÖSTERİMİ ───────────────────────────────────
function showStep(n) {
  for (let i = 0; i <= 4; i++) {
    const el = document.getElementById('step-' + i);
    if (el) el.style.display = (i === n) ? '' : 'none';
  }
}

// ── WIZARD ADIM GEÇİŞ ───────────────────────────────
function goToStep(n) {
  state.step = n;
  showStep(n);
  if (n === 1) applyPetLayout();
  if (n === 3) renderCalendar();
  if (n === 4) fillSummary();
  renderWizardBar();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function wizNext() {
  if (!canAdvance()) return;
  if (state.step === 0) collectPetInfo();
  if (state.step < 4) goToStep(state.step + 1);
}

function wizBack() {
  if (state.step === 0) {
    window.location.href = 'salon.html';
  } else {
    goToStep(state.step - 1);
  }
}

function canAdvance() {
  if (state.step === 0) {
    const name  = document.getElementById('petName0')?.value.trim();
    const phone = document.getElementById('ownerPhone0')?.value.trim();
    return !!(name && phone);
  }
  if (state.step === 1) return state.services.size > 0;
  if (state.step === 2) return state.location !== null;
  if (state.step === 3) return state.date !== null && state.time !== null;
  return false;
}

function collectPetInfo() {
  state.petType    = document.querySelector('.wiz-pet-type.active')?.dataset.pet || 'kedi';
  state.petName    = document.getElementById('petName0')?.value.trim()    || '';
  state.petBreed   = document.getElementById('petBreed0')?.value.trim()   || '';
  state.petAge     = document.getElementById('petAge0')?.value.trim()     || '';
  state.petWeight  = document.getElementById('petWeight0')?.value.trim()  || '';
  state.petNote    = document.getElementById('petNote0')?.value.trim()    || '';
  state.ownerPhone = document.getElementById('ownerPhone0')?.value.trim() || '';

  // Yeni hayvan kaydedilecekse listeye ekle
  if (!state.selectedSavedPet && document.getElementById('savePetCheck')?.checked) {
    const newPet = {
      id: 'pet_' + Date.now(),
      type:   state.petType,
      name:   state.petName,
      breed:  state.petBreed,
      age:    state.petAge,
      weight: state.petWeight,
      phone:  state.ownerPhone,
      note:   state.petNote,
      emoji:  state.petType === 'kedi' ? '🐱' : '🐶',
      bg:     state.petType === 'kedi' ? '#fff4ef' : '#f0fdf4',
    };
    SAVED_PETS.push(newPet);
    renderSavedPetList();
    updateSavedPetCount();
  }
}

function onPetFormInput() {
  renderWizardBar();
}

function renderWizardBar() {
  for (let i = 0; i <= 4; i++) {
    const dot = document.getElementById('wiz-step-dot-' + i);
    if (!dot) continue;
    dot.classList.toggle('appt-step--active', i === state.step);
    dot.classList.toggle('appt-step--done',   i < state.step);
  }

  const btn = document.getElementById('continueBtn');
  if (!btn) return;

  if (state.step === 4) {
    btn.style.display = 'none';
  } else {
    btn.style.display = '';
    btn.textContent   = 'Devam Et \u2192';
    btn.disabled      = !canAdvance();
  }

  const backBtn = document.getElementById('wizBackBtn');
  if (backBtn) backBtn.textContent = state.step === 0 ? '\u2190 Geri D\u00f6n' : '\u2190 Geri';
}

// ── PET TİPİ SEÇİMİ ──────────────────────────────────
function selectPetType(btn, type) {
  state.petType = type;
  document.querySelectorAll('.wiz-pet-type').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  // Step 1 layout'u da güncelle (eğer step 1'deyse)
  applyPetLayout();
}

// Kedi/köpek layout'unu göster/gizle
function applyPetLayout() {
  const kl = document.getElementById('kedi-layout');
  const kol = document.getElementById('kopek-layout');
  if (!kl || !kol) return;
  if (state.petType === 'kedi') {
    kl.style.display  = '';
    kol.style.display = 'none';
    // Kedi sol menüde ilk kategoriyi aktif et
    const firstCat = kl.querySelector('.hs-cat-btn');
    if (firstCat) switchHizmetCat(firstCat, 'kedi', firstCat.dataset.cat);
  } else {
    kl.style.display  = 'none';
    kol.style.display = '';
    const firstCat = kol.querySelector('.hs-cat-btn');
    if (firstCat) switchHizmetCat(firstCat, 'kopek', firstCat.dataset.cat);
  }
}

// ── ADIM 1: KATEGORİ GEÇİŞİ ─────────────────────────
function switchHizmetCat(btn, scope, cat) {
  // Sol menüde aktif buton güncelle (sadece aynı scope içinde)
  const layout = document.getElementById(scope + '-layout');
  if (!layout) return;
  layout.querySelectorAll('.hs-cat-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // Sağdaki panelleri gizle, seçileni göster
  layout.querySelectorAll('.hs-panel').forEach(p => p.style.display = 'none');
  const target = document.getElementById(scope + '-panel-' + cat);
  if (target) target.style.display = '';
}

// ── ADIM 1: HİZMET KART SEÇİMİ ──────────────────────
function toggleSvc(card) {
  const svc = card.dataset.svc;
  if (card.classList.contains('selected')) {
    card.classList.remove('selected');
    state.services.delete(svc);
  } else {
    card.classList.add('selected');
    state.services.add(svc);
  }
  updateStep1UI();
}

function updateStep1UI() {
  // Köpek bilgi satırı
  const info     = document.getElementById('selectionInfo');
  const infoText = document.getElementById('selectionText');
  // Kedi bilgi satırı
  const infoK    = document.getElementById('selectionInfo-kedi');
  const infoKTxt = document.getElementById('selectionText-kedi');

  const count = state.services.size;
  const label = count + ' hizmet seçildi';

  if (info) {
    info.style.display   = count > 0 ? 'flex' : 'none';
    if (infoText) infoText.textContent = label;
  }
  if (infoK) {
    infoK.style.display   = count > 0 ? 'flex' : 'none';
    if (infoKTxt) infoKTxt.textContent = label;
  }

  // Sol özet paneli
  updateSummaryPanel('kopek');
  updateSummaryPanel('kedi');

  renderWizardBar();
}

function updateSummaryPanel(scope) {
  const summary = document.getElementById(scope + '-summary');
  const list    = document.getElementById(scope + '-summary-list');
  if (!summary || !list) return;

  // Hangi svc'ler bu scope'a ait? — prefix ile anlıyoruz
  const prefix = scope === 'kopek' ? 'k-' : 'ke-';
  const mine   = [...state.services].filter(s => s.startsWith(prefix));

  if (mine.length === 0) {
    summary.style.display = 'none';
    return;
  }
  summary.style.display = '';

  // Kart isimlerini bul
  list.innerHTML = mine.map(svc => {
    const card = document.querySelector(`.hs-card[data-svc="${svc}"]`);
    const name = card ? card.querySelector('.hs-card-name')?.textContent : svc;
    return `<div style="display:flex;align-items:center;gap:5px">
      <span style="color:#e85d04">✓</span>
      <span>${name}</span>
    </div>`;
  }).join('');
}

function clearSelection() {
  state.services.clear();
  document.querySelectorAll('.hs-card.selected').forEach(c => c.classList.remove('selected'));
  updateStep1UI();
}

function selectCategory() {} // eski fonksiyon — artık kullanılmıyor, boş bırak
function syncCheckboxes()  {} // eski — boş


function clearSelection() {
  state.services.clear();
  document.querySelectorAll('.hizmet-card.selected').forEach(c => c.classList.remove('selected'));
  document.querySelectorAll('.hf-check input').forEach(cb => cb.checked = false);
  updateStep1UI();
}

function syncCheckboxes(cat) {
  const isSelected = state.services.has(cat);
  document.querySelectorAll('.hf-check input[data-cat="' + cat + '"]').forEach(cb => {
    cb.checked = isSelected;
  });
}

// ── FİLTRE GRUPLARI ──────────────────────────────────
function initFilterGroups() {
  document.querySelectorAll('.hf-group-head').forEach(head => {
    head.addEventListener('click', () => toggleFilterGroup(head));
  });
}

function toggleFilterGroup(head) {
  const group = head.closest('.hf-group');
  const body  = group.querySelector('.hf-group-body');
  const arrow = head.querySelector('.hf-arrow');
  const isOpen = group.classList.contains('hf-group--open');
  group.classList.toggle('hf-group--open', !isOpen);
  body.style.display = isOpen ? 'none' : 'flex';
  arrow.textContent  = isOpen ? '\u203a' : '\u25be';
}

function initFilterCheckboxes() {
  document.querySelectorAll('.hf-check input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', () => {
      const cat  = cb.dataset.cat;
      const card = document.querySelector('.hizmet-card[data-cat="' + cat + '"]');
      if (!card) return;
      if (cb.checked) {
        card.classList.add('selected');
        state.services.add(cat);
      } else {
        const anyChecked = document.querySelectorAll(
          '.hf-check input[data-cat="' + cat + '"]:checked').length > 0;
        if (!anyChecked) {
          card.classList.remove('selected');
          state.services.delete(cat);
        }
      }
      updateStep1UI();
    });
  });
}

// ── MOBİL FİLTRE ─────────────────────────────────────
function initMobileFilter() {
  document.getElementById('hizmetFilterOverlay')?.addEventListener('click', closeMobileFilter);
}
function openMobileFilter() {
  document.querySelector('.hizmet-filter-panel')?.classList.add('mobile-open');
  document.getElementById('hizmetFilterOverlay')?.classList.add('visible');
  document.body.style.overflow = 'hidden';
}
function closeMobileFilter() {
  document.querySelector('.hizmet-filter-panel')?.classList.remove('mobile-open');
  document.getElementById('hizmetFilterOverlay')?.classList.remove('visible');
  document.body.style.overflow = '';
}

// ── ADIM 2: LOKASYON ─────────────────────────────────
function filterCity(btn, city) {
  document.querySelectorAll('.wiz-city-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.wiz-loc-card').forEach(card => {
    card.style.display = (city === 'all' || card.dataset.city === city) ? '' : 'none';
  });
}

function selectLocation(card, name) {
  document.querySelectorAll('.wiz-loc-card').forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');
  state.location = name;
  renderWizardBar();
}

// ── ADIM 3: TAKVİM ───────────────────────────────────
const TR_MONTHS = [
  'Ocak','Şubat','Mart','Nisan','Mayıs','Haziran',
  'Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'
];
let calView = new Date();

function renderCalendar() {
  const grid  = document.getElementById('calGrid');
  const label = document.getElementById('calMonthLabel');
  if (!grid || !label) return;
  grid.innerHTML = '';

  const year  = calView.getFullYear();
  const month = calView.getMonth();
  label.textContent = TR_MONTHS[month] + ' ' + year;

  let startOffset = new Date(year, month, 1).getDay() - 1;
  if (startOffset < 0) startOffset = 6;

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date(); today.setHours(0,0,0,0);

  for (let i = 0; i < startOffset; i++) {
    const empty = document.createElement('span');
    empty.className = 'wiz-cal-cell wiz-cal-cell--empty';
    grid.appendChild(empty);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const btn  = document.createElement('button');
    const date = new Date(year, month, d);
    date.setHours(0,0,0,0);

    btn.className   = 'wiz-cal-cell';
    btn.textContent = d;

    const isPast   = date < today;
    const isSunday = date.getDay() === 0;

    if (isPast || isSunday) {
      btn.disabled = true;
      btn.classList.add('wiz-cal-cell--disabled');
    } else {
      if (state.date &&
          state.date.getFullYear() === year &&
          state.date.getMonth()    === month &&
          state.date.getDate()     === d) {
        btn.classList.add('wiz-cal-cell--selected');
      }
      btn.addEventListener('click', () => pickDate(date, btn));
    }
    grid.appendChild(btn);
  }
}

function calShift(dir) {
  calView = new Date(calView.getFullYear(), calView.getMonth() + dir, 1);
  renderCalendar();
}

function pickDate(date, btn) {
  state.date = date;
  state.time = null;
  document.querySelectorAll('.wiz-cal-cell--selected')
    .forEach(c => c.classList.remove('wiz-cal-cell--selected'));
  btn.classList.add('wiz-cal-cell--selected');
  renderTimeSlots();
  renderWizardBar();
}

// ── ADIM 3: SAAT SLOTLARI ────────────────────────────
const ALL_SLOTS  = [
  '09:00','09:30','10:00','10:30','11:00','11:30',
  '12:00','12:30','13:00','13:30','14:00','14:30',
  '15:00','15:30','16:00','16:30','17:00','17:30',
  '18:00','18:30','19:00'
];
const BUSY_SLOTS = new Set(['10:00','11:30','14:00','15:30','17:00']);

function renderTimeSlots() {
  const grid  = document.getElementById('slotsGrid');
  const label = document.getElementById('timeSlotsLabel');
  if (!grid || !label) return;
  grid.innerHTML = '';

  const d    = state.date;
  const days = ['Pazar','Pazartesi','Salı','Çarşamba','Perşembe','Cuma','Cumartesi'];
  label.textContent = days[d.getDay()] + ', ' + d.getDate() + ' ' +
                      TR_MONTHS[d.getMonth()] + ' — Uygun saatler:';

  ALL_SLOTS.forEach(slot => {
    const btn = document.createElement('button');
    btn.className   = 'wiz-slot';
    btn.textContent = slot;
    if (BUSY_SLOTS.has(slot)) {
      btn.classList.add('wiz-slot--busy');
      btn.disabled = true;
      btn.title    = 'Dolu';
    } else {
      if (state.time === slot) btn.classList.add('wiz-slot--selected');
      btn.addEventListener('click', () => pickTime(slot, btn));
    }
    grid.appendChild(btn);
  });
}

function pickTime(slot, btn) {
  state.time = slot;
  document.querySelectorAll('.wiz-slot--selected').forEach(b => b.classList.remove('wiz-slot--selected'));
  btn.classList.add('wiz-slot--selected');
  renderWizardBar();
}

// ── ADIM 4: ÖZET & ONAY ──────────────────────────────
const CAT_NAMES = {
  banyo: 'Banyo & Fön',
  tirnak:'Tırnak Bakımı',
  sac:   'Saç Kesimi & Tıraş',
  kulak: 'Kulak & Göz Temizliği',
  dis:   'Diş Bakımı',
  tuy:   'Tüy Bakımı',
  paket: 'Full Bakım Paketleri',
  ozel:  'Özel Bakımlar',
};

function fillSummary() {
  const petLabel = (state.petType === 'kedi' ? '🐱 Kedi' : '🐶 Köpek') +
    (state.petName  ? ' — ' + state.petName  : '') +
    (state.petBreed ? ' (' + state.petBreed + ')' : '');
  document.getElementById('sumPet').textContent      = petLabel;
  document.getElementById('sumServices').textContent =
    Array.from(state.services).map(s => CAT_NAMES[s] || s).join(', ');
  document.getElementById('sumLocation').textContent = state.location || '—';

  if (state.date && state.time) {
    const days = ['Pazar','Pazartesi','Salı','Çarşamba','Perşembe','Cuma','Cumartesi'];
    document.getElementById('sumDateTime').textContent =
      days[state.date.getDay()] + ', ' + state.date.getDate() + ' ' +
      TR_MONTHS[state.date.getMonth()] + ' ' + state.date.getFullYear() +
      ' — ' + state.time;
  }
}

function confirmAppointment() {
  const kvkk = document.getElementById('kvkkCheck').checked;
  if (!kvkk) { alert('KVKK metnini kabul etmeniz gerekiyor.'); return; }

  document.querySelector('.wiz-summary-card').style.display = 'none';
  document.querySelector('.wiz-confirm-note').style.display = 'none';
  document.getElementById('confirmBtn').style.display       = 'none';
  document.getElementById('wizSuccess').style.display       = '';
  document.querySelector('.appt-wizard-bar').style.display  = 'none';

  const days = ['Pazar','Pazartesi','Salı','Çarşamba','Perşembe','Cuma','Cumartesi'];
  document.getElementById('wizSuccessDetail').textContent =
    state.petName + ' için ' + state.location + ' şubesinde ' +
    days[state.date.getDay()] + ', ' + state.date.getDate() + ' ' +
    TR_MONTHS[state.date.getMonth()] + ' ' + state.date.getFullYear() +
    ' tarihinde saat ' + state.time +
    ' randevunuz oluşturuldu. SMS ile bilgilendirme yapılacaktır.';
}

// ── KAYITLI HAYVAN DROPDOWN ──────────────────────────

function initPetDropdown() {
  renderSavedPetList();
  updateSavedPetCount();

  // Dropdown dışına tıklanınca kapat
  document.addEventListener('click', (e) => {
    const wrap = document.getElementById('petDropdownWrap');
    if (wrap && !wrap.contains(e.target)) closePetDropdown();
  });

  // Yeni ekleme modunu başlat (varsayılan)
  setNewPetMode();
}

function renderSavedPetList() {
  const list = document.getElementById('savedPetList');
  if (!list) return;

  if (SAVED_PETS.length === 0) {
    list.innerHTML = `<div style="padding:14px 16px;font-size:13px;color:#aaa;text-align:center">
      Henüz kayıtlı dostunuz yok.
    </div>`;
    return;
  }

  list.innerHTML = SAVED_PETS.map(pet => `
    <button
      class="pet-dropdown-item ${state.selectedSavedPet === pet.id ? 'selected' : ''}"
      onclick="selectSavedPet('${pet.id}')"
      type="button"
      data-pet-id="${pet.id}"
    >
      <div class="pdi-avatar" style="background:${pet.bg}">${pet.emoji}</div>
      <div class="pdi-info">
        <span class="pdi-name">${pet.name}</span>
        <span class="pdi-sub">${pet.type === 'kedi' ? 'Kedi' : 'Köpek'}${pet.breed ? ' · ' + pet.breed : ''}${pet.age ? ' · ' + pet.age : ''}${pet.weight ? ' · ' + pet.weight + ' kg' : ''}</span>
      </div>
      <div class="pdi-check">✓</div>
    </button>
  `).join('');
}

function updateSavedPetCount() {
  const el = document.getElementById('savedPetCount');
  if (el) el.textContent = SAVED_PETS.length + ' dost';
}

function togglePetDropdown() {
  const menu    = document.getElementById('petDropdownMenu');
  const trigger = document.getElementById('petDropdownTrigger');
  const isOpen  = menu.classList.contains('open');
  if (isOpen) {
    closePetDropdown();
  } else {
    menu.classList.add('open');
    trigger.classList.add('open');
    renderSavedPetList(); // listeyi taze render et
  }
}

function closePetDropdown() {
  document.getElementById('petDropdownMenu')?.classList.remove('open');
  document.getElementById('petDropdownTrigger')?.classList.remove('open');
}

function selectSavedPet(id) {
  closePetDropdown();

  if (id === '__new__') {
    state.selectedSavedPet = null;
    setNewPetMode();
    return;
  }

  const pet = SAVED_PETS.find(p => p.id === id);
  if (!pet) return;

  state.selectedSavedPet = id;

  // Trigger güncelle
  const trigger = document.getElementById('petDropdownTrigger');
  const icon    = document.getElementById('petDropdownIcon');
  const text    = document.getElementById('petDropdownText');
  if (icon) icon.textContent = pet.emoji;
  if (text) text.textContent = pet.name + (pet.breed ? ' — ' + pet.breed : '');
  trigger?.classList.add('has-value');

  // Banner göster
  const banner = document.getElementById('selectedPetBanner');
  const fields = document.getElementById('petFormFields');
  if (banner) {
    document.getElementById('spbAvatar').textContent = pet.emoji;
    document.getElementById('spbName').textContent   = pet.name;
    document.getElementById('spbSub').textContent    =
      (pet.type === 'kedi' ? 'Kedi' : 'Köpek') +
      (pet.breed  ? ' · ' + pet.breed  : '') +
      (pet.age    ? ' · ' + pet.age    : '') +
      (pet.weight ? ' · ' + pet.weight + ' kg' : '');
    banner.style.display = 'flex';
  }

  // Formu doldur ve readonly yap
  fillFormFromPet(pet);

  // "Kaydet" satırını gizle
  const saveRow = document.getElementById('savePetRow');
  if (saveRow) saveRow.style.display = 'none';

  // Autofill notu ekle/göster
  showAutofillNote();

  // Seçili item işaretle
  renderSavedPetList();

  renderWizardBar();
}

function fillFormFromPet(pet) {
  // Tür butonları
  document.querySelectorAll('.wiz-pet-type').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.pet === pet.type);
    btn.disabled = true;
  });

  setField('petName0',    pet.name,    true);
  setField('petBreed0',   pet.breed,   true);
  setField('petAge0',     pet.age,     true);
  setField('petWeight0',  pet.weight,  true);
  setField('ownerPhone0', pet.phone,   true);
  setField('petNote0',    pet.note,    false); // notu düzenlenebilir bırak

  state.petType = pet.type;
  onPetFormInput();
}

function setField(id, value, readonly) {
  const el = document.getElementById(id);
  if (!el) return;
  el.value    = value || '';
  el.readOnly = readonly;
  el.classList.toggle('readonly', readonly);
}

function showAutofillNote() {
  // Varsa eski notu kaldır
  document.querySelector('.pet-autofill-note')?.remove();
  const note = document.createElement('div');
  note.className = 'pet-autofill-note';
  note.innerHTML = '✅ Bilgiler kayıtlı dostunuzdan otomatik dolduruldu. Gerekirse notu düzenleyebilirsiniz.';
  const fields = document.getElementById('petFormFields');
  if (fields) fields.prepend(note);
}

function setNewPetMode() {
  state.selectedSavedPet = null;

  // Trigger sıfırla
  const icon = document.getElementById('petDropdownIcon');
  const text = document.getElementById('petDropdownText');
  if (icon) icon.textContent = '🐾';
  if (text) text.textContent = 'Kayıtlı bir dost seçin veya yeni ekleyin…';
  document.getElementById('petDropdownTrigger')?.classList.remove('has-value');

  // Banner gizle
  const banner = document.getElementById('selectedPetBanner');
  if (banner) banner.style.display = 'none';

  // Autofill notunu kaldır
  document.querySelector('.pet-autofill-note')?.remove();

  // Formu temizle ve aktif et
  document.querySelectorAll('.wiz-pet-type').forEach(btn => {
    btn.disabled = false;
    btn.classList.toggle('active', btn.dataset.pet === 'kedi');
  });
  ['petName0','petBreed0','petAge0','petWeight0','petNote0'].forEach(id => setField(id, '', false));
  setField('ownerPhone0', '', false);

  state.petType = 'kedi';

  // "Kaydet" satırını göster
  const saveRow = document.getElementById('savePetRow');
  if (saveRow) saveRow.style.display = '';

  renderSavedPetList();
  renderWizardBar();
}

function clearSelectedPet() {
  setNewPetMode();
}

// ── GLOBAL EXPORT ────────────────────────────────────
window.selectPetType      = selectPetType;
window.onPetFormInput     = onPetFormInput;
window.selectCategory     = selectCategory;
window.clearSelection     = clearSelection;
window.toggleFilterGroup  = toggleFilterGroup;
window.openMobileFilter   = openMobileFilter;
window.closeMobileFilter  = closeMobileFilter;
window.wizNext            = wizNext;
window.wizBack            = wizBack;
window.filterCity         = filterCity;
window.selectLocation     = selectLocation;
window.calShift           = calShift;
window.confirmAppointment = confirmAppointment;
// Kayıtlı hayvan dropdown
window.togglePetDropdown  = togglePetDropdown;
window.selectSavedPet     = selectSavedPet;
window.clearSelectedPet   = clearSelectedPet;
// Yeni hizmet sistemi
window.switchHizmetCat    = switchHizmetCat;
window.toggleSvc          = toggleSvc;