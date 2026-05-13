/* =====================================================
   PAWCO — account.js
   Üyelik paneli: sekme geçişi, minimal etkileşimler
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initFavButtons();
  initFormValidation();
  readTabFromUrl();
});

/* ── SEKME GEÇİŞİ ─────────────────────────────────── */
function initTabs() {
  const links = document.querySelectorAll('.sidebar-link[data-tab]');

  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const tabId = link.dataset.tab;
      activateTab(tabId);
      // URL'e tab parametresini yaz (sayfayı yenilemez)
      const url = new URL(window.location);
      url.searchParams.set('tab', tabId);
      window.history.replaceState({}, '', url);
    });
  });
}

function activateTab(tabId) {
  // Tüm linkleri pasifleştir
  document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
  // Aktif olanı işaretle
  const activeLink = document.querySelector(`.sidebar-link[data-tab="${tabId}"]`);
  if (activeLink) activeLink.classList.add('active');

  // Tüm sekmeleri gizle
  document.querySelectorAll('.tab-section').forEach(s => s.classList.add('hidden'));
  // Hedef sekmeyi göster
  const target = document.getElementById(`tab-${tabId}`);
  if (target) {
    target.classList.remove('hidden');
    // Yumuşak geçiş animasyonu
    target.style.opacity = '0';
    target.style.transform = 'translateY(8px)';
    requestAnimationFrame(() => {
      target.style.transition = 'opacity .25s ease, transform .25s ease';
      target.style.opacity = '1';
      target.style.transform = 'translateY(0)';
    });
  }

  // Breadcrumb güncelle
  const tabNames = {
    orders:        'Siparişlerim',
    favorites:     'Favorilerim',
    addresses:     'Teslimat Adreslerim',
    cards:         'Kayıtlı Kartlarım',
    points:        'ParaPuanlarım',
    notifications: 'Bildirimlerim',
    messages:      'Mesajlarım',
    badges:        'Rozetlerim',
    pets:          'Petlerim',
    listings:      'Sahiplendirme İlanlarım',
    profile:       'Üyelik Bilgilerim',
    returns:       'İadelerim',
    appointments:  'Randevularım',
  };
  const bc = document.getElementById('bcActive');
  if (bc) bc.textContent = tabNames[tabId] || tabId;

  // Mobilde üste kaydır
  if (window.innerWidth <= 900) {
    document.querySelector('.panel-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function readTabFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const tab = params.get('tab');
  if (tab) activateTab(tab);
}

/* ── FAVORİ KARTLARI ──────────────────────────────── */
function initFavButtons() {
  // Favoriden çıkarma
  document.querySelectorAll('.fav-remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.fav-card');
      if (!card) return;
      card.style.transition = 'opacity .3s, transform .3s';
      card.style.opacity = '0';
      card.style.transform = 'scale(.9)';
      setTimeout(() => card.remove(), 300);
    });
  });

  // Sepete ekle
  document.querySelectorAll('.fav-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const orig = btn.textContent;
      btn.textContent = '✓ Eklendi!';
      btn.style.background = '#2d9e6a';
      const cartCount = document.querySelector('.cart-count');
      if (cartCount) cartCount.textContent = parseInt(cartCount.textContent || '0') + 1;
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = '';
      }, 1400);
    });
  });
}

/* ── FORM VALİDASYON ─────────────────────────────── */
function initFormValidation() {
  // Profil kaydet butonu
  document.querySelectorAll('.profile-section-card .btn-primary').forEach(btn => {
    btn.addEventListener('click', () => {
      const orig = btn.textContent;
      btn.textContent = '✓ Kaydedildi!';
      btn.style.background = '#2d9e6a';
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = '';
      }, 2000);
    });
  });

  // Adres sil
  document.querySelectorAll('.address-card-actions .btn-del').forEach(btn => {
    btn.addEventListener('click', () => {
      if (confirm('Bu adresi silmek istediğinizden emin misiniz?')) {
        const card = btn.closest('.address-card');
        card.style.transition = 'opacity .3s, transform .3s';
        card.style.opacity = '0';
        card.style.transform = 'scale(.95)';
        setTimeout(() => card.remove(), 300);
      }
    });
  });

  // Pet sil
  document.querySelectorAll('.pet-actions .btn-del').forEach(btn => {
    btn.addEventListener('click', () => {
      if (confirm('Bu peti silmek istediğinizden emin misiniz?')) {
        const card = btn.closest('.pet-card');
        card.style.transition = 'opacity .3s, transform .3s';
        card.style.opacity = '0';
        card.style.transform = 'scale(.95)';
        setTimeout(() => card.remove(), 300);
      }
    });
  });

  // Hesap silme uyarısı
  const deleteBtn = document.querySelector('.btn-danger');
  if (deleteBtn) {
    deleteBtn.addEventListener('click', () => {
      alert('Bu işlem backend onayı gerektirir. Gerçek uygulamada şifre doğrulaması istenir.');
    });
  }

  // Kargo takip butonu
  document.querySelectorAll('.order-actions .btn-primary').forEach(btn => {
    if (btn.textContent.includes('Kargo')) {
      btn.addEventListener('click', () => {
        alert('Kargo takip sayfasına yönlendiriliyorsunuz...\n(Backend entegrasyonu gerektirir)');
      });
    }
  });

  // Bildirimler — okundu işareti
  const markAllBtn = document.querySelector('#tab-notifications .btn-outline');
  if (markAllBtn) {
    markAllBtn.addEventListener('click', () => {
      document.querySelectorAll('.notif-unread').forEach(item => {
        item.classList.remove('notif-unread');
        item.querySelector('.notif-unread-dot')?.remove();
      });
      // Badge güncelle
      const badge = document.querySelector('[data-tab="notifications"] .sl-badge');
      if (badge) badge.remove();
    });
  }

  // Add address / add pet kartları
  document.querySelectorAll('.address-card--add, .pet-card--add').forEach(card => {
    card.addEventListener('click', () => {
      alert('Ekleme formu açılıyor... (Backend entegrasyonu gerektirir)');
    });
  });

  // Çıkış yap
  const logoutBtn = document.querySelector('.logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', e => {
      e.preventDefault();
      if (confirm('Çıkış yapmak istediğinizden emin misiniz?')) {
        window.location.href = 'index.html';
      }
    });
  }

   // Randevu iptal
  document.querySelectorAll('.appt-card .btn-outline').forEach(btn => {
    if (btn.textContent.includes('İptal Et')) {
      btn.addEventListener('click', () => {
        if (confirm('Randevuyu iptal etmek istediğinizden emin misiniz?')) {
          const card = btn.closest('.appt-card');
          card.classList.remove('appt-card--upcoming');
          card.classList.add('appt-card--cancelled');
          card.querySelector('.appt-badge').className = 'appt-badge appt-badge--cancelled';
          card.querySelector('.appt-badge').textContent = 'İptal Edildi';
          const price = card.querySelector('.appt-price');
          if (price) price.classList.add('appt-price--cancelled');
          btn.remove();
        }
      });
    }
  });

 
}

/* ── İADE MODAL ─────────────────────────────────── */
function openReturnModal() {
  document.getElementById('returnModalOverlay').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeReturnModal(e) {
  if (e && e.target !== document.getElementById('returnModalOverlay')) return;
  document.getElementById('returnModalOverlay').classList.add('hidden');
  document.body.style.overflow = '';
}

function submitReturnForm() {
  const order  = document.getElementById('rm-order').value;
  const reason = document.getElementById('rm-reason').value;
  if (!order || !reason) {
    alert('Lütfen sipariş ve iade nedenini seçin.');
    return;
  }
  const btn = document.querySelector('.return-modal-foot .btn-primary');
  const orig = btn.textContent;
  btn.textContent = '✓ Gönderildi!';
  btn.style.background = '#2d9e6a';
  setTimeout(() => {
    closeReturnModal();
    document.getElementById('rm-order').value   = '';
    document.getElementById('rm-reason').value  = '';
    document.getElementById('rm-note').value    = '';
    document.getElementById('rm-previews').innerHTML = '';
    btn.textContent = orig;
    btn.style.background = '';
    activateTab('returns');
  }, 1400);
}

let rmFiles = [];
function handleReturnFiles(files) {
  const remaining = 4 - rmFiles.length;
  Array.from(files).slice(0, remaining).forEach(file => {
    if (!file.type.startsWith('image/')) return;
    rmFiles.push(file);
    const reader = new FileReader();
    reader.onload = e => {
      const img = document.createElement('img');
      img.src = e.target.result;
      img.className = 'rm-preview-img';
      document.getElementById('rm-previews').appendChild(img);
    };
    reader.readAsDataURL(file);
  });
}

function cancelAppointment(btn) {
  if (!confirm('Randevuyu iptal etmek istediğinizden emin misiniz?')) return;
  const card = btn.closest('.appt-card');
  card.classList.remove('appt-card--upcoming');
  card.classList.add('appt-card--cancelled');
  const badge = card.querySelector('.appt-badge');
  badge.className = 'appt-badge appt-badge--cancelled';
  badge.textContent = 'İptal Edildi';
  const price = card.querySelector('.appt-price');
  if (price) price.classList.add('appt-price--cancelled');
  btn.closest('.order-actions').querySelector('.btn-outline:nth-child(2)')?.remove();
  btn.closest('.order-actions').querySelector('.btn-primary')?.remove();
  btn.textContent = 'Tekrar Randevu Al';
}

/* ══════════════════════════════════════════════════
   GENEL MODAL YARDIMCILARI
══════════════════════════════════════════════════ */
function openModal(id) {
  document.getElementById(id).classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}
function closeModal(id, e) {
  if (e && e.target !== document.getElementById(id)) return;
  document.getElementById(id).classList.add('hidden');
  document.body.style.overflow = '';
}
window.openModal  = openModal;
window.closeModal = closeModal;

/* ══════════════════════════════════════════════════
   DEĞERLENDİRME MODAL
══════════════════════════════════════════════════ */
let currentRating = 0;

function openReviewModal(btn) {
  const card = btn.closest('.appt-card');
  const name = card.querySelector('.appt-service-name')?.textContent || '';
  const date = card.querySelector('.appt-date-main')?.textContent || '';
  document.getElementById('revServiceName').textContent = name;
  document.getElementById('revServiceDate').textContent = date;
  document.getElementById('revText').value = '';
  currentRating = 0;
  setRating(0);
  openModal('reviewModalOverlay');
}

function setRating(val) {
  currentRating = val;
  const labels = ['Seçilmedi','Çok Kötü','Kötü','Orta','İyi','Mükemmel'];
  document.getElementById('revRatingText').textContent = labels[val] || 'Seçilmedi';
  document.querySelectorAll('.rev-star').forEach(s => {
    s.classList.toggle('active', parseInt(s.dataset.val) <= val);
  });
}

function submitReview() {
  if (!currentRating) { alert('Lütfen bir puan seçin.'); return; }
  const btn = document.querySelector('#reviewModalOverlay .ac-modal-foot .btn-primary');
  btn.textContent = '✓ Gönderildi!';
  btn.style.background = '#2d9e6a';
  setTimeout(() => {
    closeModal('reviewModalOverlay');
    btn.textContent = 'Gönder';
    btn.style.background = '';
    currentRating = 0;
  }, 1200);
}

window.openReviewModal = openReviewModal;
window.setRating       = setRating;
window.submitReview    = submitReview;

/* ══════════════════════════════════════════════════
   RANDEVU DÜZENLE MODAL
══════════════════════════════════════════════════ */
let editApptCard = null;

function openEditApptModal(btn) {
  editApptCard = btn.closest('.appt-card');
  // Tarih alanına bugünden 7 gün sonrasını varsayılan yaz
  const d = new Date();
  d.setDate(d.getDate() + 7);
  document.getElementById('editApptDate').value = d.toISOString().split('T')[0];
  document.getElementById('editApptNote').value = '';
  openModal('editApptModalOverlay');
}

function submitEditAppt() {
  const chips    = document.querySelectorAll('.edit-svc-chip');
  const location = document.getElementById('editApptLocation').value;
  const date     = document.getElementById('editApptDate').value;
  const time     = document.getElementById('editApptTime').value;

  if (!chips.length) { alert('Lütfen en az bir hizmet ekleyin.'); return; }
  if (!date)         { alert('Lütfen tarih seçin.'); return; }

  if (editApptCard) {
    const nameEl = editApptCard.querySelector('.appt-service-name');
    const subEl  = editApptCard.querySelector('.appt-service-sub');
    const dateEl = editApptCard.querySelector('.appt-date-main');
    const priceEl = editApptCard.querySelector('.appt-price');

    // Hizmet isimlerini birleştir
    const names = Array.from(chips).map(c => c.dataset.name);
    if (nameEl) nameEl.textContent = names.join(' + ');
    if (subEl)  subEl.textContent  = 'Pawco Grooming Salonu — ' + location;
    if (dateEl) {
      const [y,m,day] = date.split('-');
      dateEl.textContent = `${day}.${m}.${y} — ${time}`;
    }
    if (priceEl) priceEl.textContent = document.getElementById('editSvcTotal').textContent;
  }

  const btn = document.querySelector('#editApptModalOverlay .ac-modal-foot .btn-primary');
  btn.textContent = '✓ Kaydedildi!';
  btn.style.background = '#2d9e6a';
  setTimeout(() => {
    closeModal('editApptModalOverlay');
    btn.textContent = 'Kaydet';
    btn.style.background = '';
    editApptCard = null;
    clearServiceChips();
  }, 1100);
}

function addSelectedService() {
  const select = document.getElementById('editApptService');
  const val    = select.value;
  if (!val) return;

  const [name, price] = val.split('|');
  const chipId = 'chip-' + val.replace(/[^a-zA-Z0-9]/g, '');

  // Zaten ekliyse tekrar ekleme
  if (document.getElementById(chipId)) {
    select.value = '';
    return;
  }

  const chip = document.createElement('div');
  chip.className   = 'edit-svc-chip';
  chip.id          = chipId;
  chip.dataset.name  = name;
  chip.dataset.price = price;

  const nameSpan  = document.createElement('span');
  nameSpan.textContent = name;

  const priceSpan = document.createElement('span');
  priceSpan.className = 'edit-svc-chip-price';
  priceSpan.textContent = price;

  const removeBtn = document.createElement('button');
  removeBtn.className = 'edit-svc-chip-remove';
  removeBtn.type = 'button';
  removeBtn.textContent = '✕';
  removeBtn.onclick = () => {
    chip.remove();
    // Seçeneği dropdown'a geri aç
    const opt = select.querySelector(`option[value="${CSS.escape(val)}"]`);
    if (opt) opt.disabled = false;
    updateSvcTotal();
  };

  chip.appendChild(nameSpan);
  chip.appendChild(priceSpan);
  chip.appendChild(removeBtn);
  document.getElementById('editSvcChips').appendChild(chip);

  // Dropdown'da seçeneği devre dışı bırak
  const opt = select.querySelector(`option[value="${CSS.escape(val)}"]`);
  if (opt) opt.disabled = true;
  select.value = '';

  updateSvcTotal();
}

function updateSvcTotal() {
  const chips = document.querySelectorAll('.edit-svc-chip');
  const totalRow = document.getElementById('editSvcTotalRow');

  if (!chips.length) {
    totalRow.style.display = 'none';
    return;
  }

  let total = 0;
  chips.forEach(chip => {
    const raw = chip.dataset.price.replace(/\./g, '').replace(',', '.');
    total += parseFloat(raw) || 0;
  });

  // Türkçe format: 1.250,00 ₺
  const formatted = total.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ₺';
  document.getElementById('editSvcTotal').textContent = formatted;
  totalRow.style.display = 'flex';
}

function clearServiceChips() {
  const chips  = document.querySelectorAll('.edit-svc-chip');
  const select = document.getElementById('editApptService');
  chips.forEach(chip => {
    const val = chip.id.replace('chip-', '');
    chip.remove();
  });
  // Tüm disabled option'ları tekrar aktif et
  select.querySelectorAll('option[disabled]').forEach(o => o.disabled = false);
  select.value = '';
  document.getElementById('editSvcTotalRow').style.display = 'none';
}

window.addSelectedService = addSelectedService;
window.updateSvcTotal     = updateSvcTotal;

window.openEditApptModal = openEditApptModal;
window.submitEditAppt    = submitEditAppt;

/* ══════════════════════════════════════════════════
   İADE DETAY MODAL
══════════════════════════════════════════════════ */
function openReturnDetail(id, date, orderNo, reason, method, amount, txn, status) {
  document.getElementById('rdId').textContent      = 'İade #' + id;
  document.getElementById('rdDate').textContent    = date;
  document.getElementById('rdOrderNo').textContent = orderNo;
  document.getElementById('rdReason').textContent  = reason;
  document.getElementById('rdMethod').textContent  = method;
  document.getElementById('rdAmount').textContent  = amount;
  document.getElementById('rdTxn').textContent     = txn;

  // İncelenen iade için track bar'ı kısmen aktif yap
  const trackLines = document.querySelectorAll('#rdTrackBar .track-line');
  const trackSteps = document.querySelectorAll('#rdTrackBar .track-step');
  if (status === 'progress') {
    trackSteps[0].classList.add('done');    trackSteps[1].classList.add('done');
    trackSteps[2].classList.remove('done'); trackSteps[2].classList.add('active');
    trackSteps[3].classList.remove('done', 'active');
    trackLines[0].classList.add('done');    trackLines[1].classList.remove('done');
    trackLines[2].classList.remove('done');
    document.getElementById('rdStatus').className  = 'order-status status-shipping';
    document.getElementById('rdStatus').textContent = '⏳ İnceleniyor';
  } else {
    trackSteps.forEach(s => { s.classList.add('done'); s.classList.remove('active'); });
    trackLines.forEach(l => l.classList.add('done'));
    document.getElementById('rdStatus').className  = 'order-status status-delivered';
    document.getElementById('rdStatus').textContent = '✓ Tamamlandı';
  }

  openModal('returnDetailModalOverlay');
}

function cancelReturn(btn) {
  if (!confirm('İade talebini iptal etmek istediğinizden emin misiniz?')) return;
  const card = btn.closest('.return-card');
  card.style.transition = 'opacity .3s, transform .3s';
  card.style.opacity = '0';
  card.style.transform = 'scale(.97)';
  setTimeout(() => {
    card.remove();
    // Hiç return-card kalmadıysa boş durumu göster
    const remaining = document.querySelectorAll('#tab-returns .return-card');
    if (!remaining.length) {
      document.getElementById('returns-empty').style.display = '';
    }
  }, 300);
}

window.openReturnDetail = openReturnDetail;
window.cancelReturn     = cancelReturn;

/* ══════════════════════════════════════════════════
   DESTEK TALEBİ MODAL
══════════════════════════════════════════════════ */
function submitSupport() {
  const subject = document.getElementById('suppSubject').value;
  const message = document.getElementById('suppMessage').value.trim();
  if (!subject || !message) { alert('Lütfen konu ve mesaj alanlarını doldurun.'); return; }

  const btn = document.querySelector('#newSupportModalOverlay .ac-modal-foot .btn-primary');
  btn.textContent = '✓ Gönderildi!';
  btn.style.background = '#2d9e6a';
  setTimeout(() => {
    closeModal('newSupportModalOverlay');
    btn.textContent = 'Gönder';
    btn.style.background = '';
    document.getElementById('suppSubject').value  = '';
    document.getElementById('suppOrderNo').value  = '';
    document.getElementById('suppMessage').value  = '';
    // Mesajlar sekmesine geç
    activateTab('messages');
  }, 1200);
}
window.submitSupport = submitSupport;

/* ══════════════════════════════════════════════════
   PET EKLE MODAL
══════════════════════════════════════════════════ */
let petModalType = 'kedi';

function petModalSelectType(type) {
  petModalType = type;
  document.getElementById('petModalTypeCat').classList.toggle('active', type === 'kedi');
  document.getElementById('petModalTypeDog').classList.toggle('active', type === 'kopek');
}

function submitAddPet() {
  const name     = document.getElementById('petModalName').value.trim();
  const breed    = document.getElementById('petModalBreed').value.trim();
  const age      = document.getElementById('petModalAge').value.trim();
  const gender   = document.getElementById('petModalGender').value;
  const neutered = document.getElementById('petModalNeutered').value;
  if (!name) { alert('Lütfen pet adı girin.'); return; }

  const avatar   = petModalType === 'kedi' ? 'cat' : 'dog';
  const emoji    = petModalType === 'kedi' ? '🐱' : '🐶';
  const typeText = petModalType === 'kedi' ? 'Kedi' : 'Köpek';

  // Yeni pet kartı HTML'ini oluştur ve grid'e ekle (add kartından önce)
  const grid    = document.querySelector('.pets-grid');
  const addCard = document.querySelector('.pet-card--add');
  const newCard = document.createElement('div');
  newCard.className = 'pet-card';
  newCard.innerHTML = `
    <div class="pet-avatar pet-avatar--${avatar}">${emoji}</div>
    <div class="pet-info">
      <div class="pet-name">${name}</div>
      <div class="pet-detail"><span>Tür:</span> ${typeText}</div>
      ${breed    ? `<div class="pet-detail"><span>Irk:</span> ${breed}</div>` : ''}
      ${age      ? `<div class="pet-detail"><span>Yaş:</span> ${age}</div>` : ''}
      <div class="pet-detail"><span>Cinsiyet:</span> ${gender}</div>
      <div class="pet-detail"><span>Kısırlaştırıldı:</span> ${neutered}</div>
    </div>
    <div class="pet-actions">
      <button class="btn-outline btn-sm">✏️ Düzenle</button>
      <button class="btn-outline btn-sm btn-del">🗑️ Sil</button>
    </div>
  `;

  // Sil butonunu dinle
  newCard.querySelector('.btn-del').addEventListener('click', () => {
    if (confirm('Bu peti silmek istediğinizden emin misiniz?')) {
      newCard.style.transition = 'opacity .3s, transform .3s';
      newCard.style.opacity = '0';
      newCard.style.transform = 'scale(.95)';
      setTimeout(() => newCard.remove(), 300);
    }
  });

  grid.insertBefore(newCard, addCard);

  const btn = document.querySelector('#addPetModalOverlay .ac-modal-foot .btn-primary');
  btn.textContent = '✓ Eklendi!';
  btn.style.background = '#2d9e6a';
  setTimeout(() => {
    closeModal('addPetModalOverlay');
    btn.textContent = 'Ekle';
    btn.style.background = '';
    document.getElementById('petModalName').value = '';
    document.getElementById('petModalBreed').value = '';
    document.getElementById('petModalAge').value = '';
    petModalType = 'kedi';
    petModalSelectType('kedi');
  }, 1000);
}

/* ══════════════════════════════════════════════════
   PET DÜZENLE MODAL
══════════════════════════════════════════════════ */
let editPetCard = null;
let editPetType = 'kedi';

function openEditPetModal(btn) {
  editPetCard = btn.closest('.pet-card');

  // Mevcut verileri oku ve forma doldur
  const details = editPetCard.querySelectorAll('.pet-detail');
  const getName   = () => editPetCard.querySelector('.pet-name')?.textContent.trim() || '';
  const getDetail = (label) => {
    for (const d of details) {
      if (d.querySelector('span')?.textContent.includes(label)) {
        return d.textContent.replace(d.querySelector('span').textContent, '').trim();
      }
    }
    return '';
  };

  const isKedi = editPetCard.querySelector('.pet-avatar--cat') !== null;
  editPetType = isKedi ? 'kedi' : 'kopek';
  editPetSelectType(editPetType);

  document.getElementById('editPetName').value  = getName();
  document.getElementById('editPetBreed').value = getDetail('Irk:');
  document.getElementById('editPetAge').value   = getDetail('Yaş:');

  const gender   = getDetail('Cinsiyet:');
  const neutered = getDetail('Kısırlaştırıldı:');
  const genderSel   = document.getElementById('editPetGender');
  const neuteredSel = document.getElementById('editPetNeutered');
  for (const opt of genderSel.options)   opt.selected = gender.includes('Erkek') ? opt.value.includes('Erkek') : opt.value.includes('Dişi');
  for (const opt of neuteredSel.options) opt.selected = opt.value === neutered;

  openModal('editPetModalOverlay');
}

function editPetSelectType(type) {
  editPetType = type;
  document.getElementById('editPetTypeCat').classList.toggle('active', type === 'kedi');
  document.getElementById('editPetTypeDog').classList.toggle('active', type === 'kopek');
}

function submitEditPet() {
  const name     = document.getElementById('editPetName').value.trim();
  const breed    = document.getElementById('editPetBreed').value.trim();
  const age      = document.getElementById('editPetAge').value.trim();
  const gender   = document.getElementById('editPetGender').value;
  const neutered = document.getElementById('editPetNeutered').value;
  if (!name) { alert('Lütfen pet adı girin.'); return; }
  if (!editPetCard) return;

  // Kart üzerindeki verileri güncelle
  const nameEl = editPetCard.querySelector('.pet-name');
  if (nameEl) nameEl.textContent = name;

  // Avatar türünü güncelle
  const avatarEl = editPetCard.querySelector('.pet-avatar');
  if (avatarEl) {
    avatarEl.className = `pet-avatar pet-avatar--${editPetType === 'kedi' ? 'cat' : 'dog'}`;
    avatarEl.textContent = editPetType === 'kedi' ? '🐱' : '🐶';
  }

  // Detail satırlarını güncelle
  const detailMap = {
    'Tür:':            editPetType === 'kedi' ? 'Kedi' : 'Köpek',
    'Irk:':            breed,
    'Yaş:':            age,
    'Cinsiyet:':       gender,
    'Kısırlaştırıldı:': neutered
  };
  const details = editPetCard.querySelectorAll('.pet-detail');
  details.forEach(d => {
    const labelEl = d.querySelector('span');
    if (!labelEl) return;
    const label = labelEl.textContent;
    if (detailMap[label] !== undefined) {
      d.textContent = '';
      d.appendChild(labelEl);
      d.append(' ' + detailMap[label]);
    }
  });

  const btn = document.querySelector('#editPetModalOverlay .ac-modal-foot .btn-primary');
  btn.textContent = '✓ Kaydedildi!';
  btn.style.background = '#2d9e6a';
  setTimeout(() => {
    closeModal('editPetModalOverlay');
    btn.textContent = 'Kaydet';
    btn.style.background = '';
    editPetCard = null;
  }, 1000);
}

window.openEditPetModal  = openEditPetModal;
window.editPetSelectType = editPetSelectType;
window.submitEditPet     = submitEditPet;

window.petModalSelectType = petModalSelectType;
window.submitAddPet       = submitAddPet;

window.openReturnModal    = openReturnModal;
window.closeReturnModal   = closeReturnModal;
window.submitReturnForm   = submitReturnForm;
window.handleReturnFiles  = handleReturnFiles;
window.cancelAppointment  = cancelAppointment;

/* ── GLOBAL ─────────────────────────────────────────── */
window.activateTab = activateTab;