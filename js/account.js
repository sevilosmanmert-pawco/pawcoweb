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
  /*
  document.querySelectorAll('.address-card--add, .pet-card--add').forEach(card => {
    card.addEventListener('click', () => {
      alert('Ekleme formu açılıyor... (Backend entegrasyonu gerektirir)');
    });
  });*/

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
/* ══════════════════════════════════════════════════
   ADRES EKLE
══════════════════════════════════════════════════ */
let addAddrType = '🏠 Ev';

function selectAddrType(btn) {
  document.querySelectorAll('#addAddressModalOverlay .addr-type-btn')
    .forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  addAddrType = btn.dataset.type;
}

function submitAddAddress() {
  const name     = document.getElementById('addrName').value.trim();
  const phone    = document.getElementById('addrPhone').value.trim();
  const city     = document.getElementById('addrCity').value.trim();
  const district = document.getElementById('addrDistrict').value.trim();
  const full     = document.getElementById('addrFull').value.trim();
  const isDefault = document.getElementById('addrDefault').checked;

  if (!name || !phone || !city || !district || !full) {
    alert('Lütfen zorunlu alanları doldurun.');
    return;
  }

  // Yeni address-card DOM'a ekle
  const grid    = document.querySelector('.addresses-grid');
  const addCard = document.querySelector('.address-card--add');
  const card    = document.createElement('div');
  card.className = isDefault ? 'address-card address-card--default' : 'address-card';

  // Başlık satırı
  const head = document.createElement('div');
  head.className = 'address-card-head';

  const badge = document.createElement('div');
  badge.className = 'address-type-badge';
  badge.textContent = addAddrType;
  head.appendChild(badge);

  if (isDefault) {
    const defBadge = document.createElement('span');
    defBadge.className = 'default-badge';
    defBadge.textContent = 'Varsayılan';
    head.appendChild(defBadge);
  }

  const nameEl = document.createElement('div');
  nameEl.className = 'address-name';
  nameEl.textContent = name;

  const phoneEl = document.createElement('div');
  phoneEl.className = 'address-phone';
  phoneEl.textContent = phone;

  const textEl = document.createElement('div');
  textEl.className = 'address-text';
  textEl.textContent = full + ', ' + district + ' / ' + city;

  const actions = document.createElement('div');
  actions.className = 'address-card-actions';

  const editBtn = document.createElement('button');
  editBtn.className = 'btn-outline btn-sm';
  editBtn.textContent = '✏️ Düzenle';
  editBtn.onclick = function() { openEditAddressModal(editBtn); };

  const delBtn = document.createElement('button');
  delBtn.className = 'btn-outline btn-sm btn-del';
  delBtn.textContent = '🗑️ Sil';
  delBtn.onclick = function() {
    if (confirm('Bu adresi silmek istediğinizden emin misiniz?')) {
      card.style.transition = 'opacity .3s, transform .3s';
      card.style.opacity = '0';
      card.style.transform = 'scale(.95)';
      setTimeout(() => card.remove(), 300);
    }
  };

  if (!isDefault) {
    const defBtn = document.createElement('button');
    defBtn.className = 'btn-outline btn-sm';
    defBtn.textContent = '⭐ Varsayılan Yap';
    actions.appendChild(editBtn);
    actions.appendChild(delBtn);
    actions.appendChild(defBtn);
  } else {
    actions.appendChild(editBtn);
    actions.appendChild(delBtn);
  }

  card.appendChild(head);
  card.appendChild(nameEl);
  card.appendChild(phoneEl);
  card.appendChild(textEl);
  card.appendChild(actions);
  grid.insertBefore(card, addCard);

  // Formu temizle ve kapat
  const btn = document.querySelector('#addAddressModalOverlay .ac-modal-foot .btn-primary');
  btn.textContent = '✓ Kaydedildi!';
  btn.style.background = '#2d9e6a';
  setTimeout(() => {
    closeModal('addAddressModalOverlay');
    btn.textContent = 'Kaydet';
    btn.style.background = '';
    document.getElementById('addrName').value = '';
    document.getElementById('addrPhone').value = '';
    document.getElementById('addrCity').value = '';
    document.getElementById('addrDistrict').value = '';
    document.getElementById('addrFull').value = '';
    document.getElementById('addrDefault').checked = false;
    addAddrType = '🏠 Ev';
    document.querySelectorAll('#addAddressModalOverlay .addr-type-btn')
      .forEach((b,i) => b.classList.toggle('active', i === 0));
  }, 1000);
}

window.selectAddrType   = selectAddrType;
window.submitAddAddress = submitAddAddress;

/* ══════════════════════════════════════════════════
   ADRES DÜZENLE
══════════════════════════════════════════════════ */
let editAddrCard = null;
let editAddrType = '🏠 Ev';

function openEditAddressModal(btn) {
  editAddrCard = btn.closest('.address-card');

  // Mevcut değerleri oku
  const typeBadge = editAddrCard.querySelector('.address-type-badge')?.textContent.trim() || '🏠 Ev';
  const name      = editAddrCard.querySelector('.address-name')?.textContent.trim() || '';
  const phone     = editAddrCard.querySelector('.address-phone')?.textContent.trim() || '';
  const fullText  = editAddrCard.querySelector('.address-text')?.textContent.trim() || '';

  // Şehir/ilçe parse et (son kısım "İlçe / Şehir")
  const parts    = fullText.split(',');
  const lastPart = parts[parts.length - 1]?.trim() || '';
  const cityParts = lastPart.split('/');
  const district  = cityParts[0]?.trim() || '';
  const city      = cityParts[1]?.trim() || '';
  const addrBody  = parts.slice(0, -1).join(',').trim();

  editAddrType = typeBadge;

  // Tip butonlarını senkronize et
  document.querySelectorAll('#editAddressModalOverlay .addr-type-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.type === typeBadge);
  });

  document.getElementById('editAddrName').value     = name;
  document.getElementById('editAddrPhone').value    = phone;
  document.getElementById('editAddrCity').value     = city;
  document.getElementById('editAddrDistrict').value = district;
  document.getElementById('editAddrFull').value     = addrBody;

  openModal('editAddressModalOverlay');
}

function selectEditAddrType(btn) {
  document.querySelectorAll('#editAddressModalOverlay .addr-type-btn')
    .forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  editAddrType = btn.dataset.type;
}

function submitEditAddress() {
  const name     = document.getElementById('editAddrName').value.trim();
  const phone    = document.getElementById('editAddrPhone').value.trim();
  const city     = document.getElementById('editAddrCity').value.trim();
  const district = document.getElementById('editAddrDistrict').value.trim();
  const full     = document.getElementById('editAddrFull').value.trim();

  if (!name || !phone || !city || !district || !full) {
    alert('Lütfen zorunlu alanları doldurun.');
    return;
  }

  if (editAddrCard) {
    editAddrCard.querySelector('.address-type-badge').textContent = editAddrType;
    editAddrCard.querySelector('.address-name').textContent       = name;
    editAddrCard.querySelector('.address-phone').textContent      = phone;
    editAddrCard.querySelector('.address-text').textContent       = full + ', ' + district + ' / ' + city;
  }

  const btn = document.querySelector('#editAddressModalOverlay .ac-modal-foot .btn-primary');
  btn.textContent = '✓ Kaydedildi!';
  btn.style.background = '#2d9e6a';
  setTimeout(() => {
    closeModal('editAddressModalOverlay');
    btn.textContent = 'Kaydet';
    btn.style.background = '';
    editAddrCard = null;
  }, 1000);
}

window.openEditAddressModal  = openEditAddressModal;
window.selectEditAddrType    = selectEditAddrType;
window.submitEditAddress     = submitEditAddress;

/* ══════════════════════════════════════════════════
   KART EKLE
══════════════════════════════════════════════════ */
function formatCardNumber(input) {
  let v = input.value.replace(/\D/g, '').substring(0, 16);
  input.value = v.replace(/(.{4})/g, '$1 ').trim();
}

function formatCardExp(input) {
  let v = input.value.replace(/\D/g, '').substring(0, 4);
  if (v.length >= 2) v = v.substring(0,2) + '/' + v.substring(2);
  input.value = v;
}

function updateCardPreview() {
  const num  = document.getElementById('cardNumber').value || '';
  const name = document.getElementById('cardName').value.trim().toUpperCase() || 'AD SOYAD';
  const exp  = document.getElementById('cardExp').value || '';
  const preview = document.getElementById('cardPreview');

  // Numara
  const padded = num.padEnd(19, '•').replace(/ /g, '').replace(/(.{4})/g, '$1 ').trim();
  document.getElementById('previewNumber').textContent = padded || '•••• •••• •••• ••••';
  document.getElementById('previewName').textContent   = name;
  document.getElementById('previewExp').textContent    = exp || 'MM/YY';

  // Marka algıla
  const raw = num.replace(/\s/g, '');
  const brandEl = document.getElementById('previewBrand');
  if (raw.startsWith('4')) {
    brandEl.textContent = 'VISA';
    preview.className = 'card-preview preview--visa';
  } else if (raw.startsWith('5') || raw.startsWith('2')) {
    brandEl.textContent = 'MC';
    preview.className = 'card-preview preview--mc';
  } else {
    brandEl.textContent = '?';
    preview.className = 'card-preview';
  }
}

function submitAddCard() {
  const num  = document.getElementById('cardNumber').value.trim();
  const name = document.getElementById('cardName').value.trim();
  const exp  = document.getElementById('cardExp').value.trim();
  const cvv  = document.getElementById('cardCvv').value.trim();
  const isDefault = document.getElementById('cardDefault').checked;

  if (!num || !name || !exp || !cvv) {
    alert('Lütfen tüm kart bilgilerini doldurun.');
    return;
  }
  if (num.replace(/\s/g,'').length < 16) {
    alert('Geçerli bir kart numarası girin.');
    return;
  }

  // Son 4 hane
  const last4 = num.replace(/\s/g,'').slice(-4);
  const raw   = num.replace(/\s/g,'');
  const isMC  = raw.startsWith('5') || raw.startsWith('2');
  const brand = raw.startsWith('4') ? 'VISA' : (isMC ? 'MC' : '?');
  const visClass = raw.startsWith('4') ? 'card-visual--visa' : (isMC ? 'card-visual--mc' : '');

  // Yeni kart DOM elemanı oluştur
  const list    = document.querySelector('.cards-list');
  const newCard = document.createElement('div');
  newCard.className = 'saved-card';

  const visual = document.createElement('div');
  visual.className = 'card-visual ' + visClass;

  const chip = document.createElement('div');
  chip.className = 'card-chip';
  chip.textContent = '▪▪▪';

  const number = document.createElement('div');
  number.className = 'card-number';
  number.textContent = '•••• •••• •••• ' + last4;

  const footRow = document.createElement('div');
  footRow.className = 'card-footer-row';

  const ownerDiv = document.createElement('div');
  const ownerLabel = document.createElement('div');
  ownerLabel.className = 'card-label';
  ownerLabel.textContent = 'Kart Sahibi';
  const ownerVal = document.createElement('div');
  ownerVal.className = 'card-value';
  ownerVal.textContent = name.toUpperCase();
  ownerDiv.appendChild(ownerLabel);
  ownerDiv.appendChild(ownerVal);

  const expDiv = document.createElement('div');
  const expLabel = document.createElement('div');
  expLabel.className = 'card-label';
  expLabel.textContent = 'Son Kullanma';
  const expVal = document.createElement('div');
  expVal.className = 'card-value';
  expVal.textContent = exp;
  expDiv.appendChild(expLabel);
  expDiv.appendChild(expVal);

  const brandDiv = document.createElement('div');
  brandDiv.className = 'card-brand-logo' + (isMC ? ' mc-logo' : '');
  brandDiv.textContent = brand;

  footRow.appendChild(ownerDiv);
  footRow.appendChild(expDiv);
  footRow.appendChild(brandDiv);

  visual.appendChild(chip);
  visual.appendChild(number);
  visual.appendChild(footRow);

  const meta = document.createElement('div');
  meta.className = 'saved-card-meta';

  if (isDefault) {
    const defBadge = document.createElement('span');
    defBadge.className = 'default-badge';
    defBadge.textContent = 'Varsayılan';
    meta.appendChild(defBadge);
  }

  const metaActions = document.createElement('div');
  metaActions.className = 'saved-card-actions';

  if (!isDefault) {
    const defBtn = document.createElement('button');
    defBtn.className = 'btn-outline btn-sm';
    defBtn.textContent = '⭐ Varsayılan Yap';
    metaActions.appendChild(defBtn);
  }

  const delBtn = document.createElement('button');
  delBtn.className = 'btn-outline btn-sm btn-del';
  delBtn.textContent = '🗑️ Sil';
  delBtn.onclick = function() {
    if (confirm('Bu kartı silmek istediğinizden emin misiniz?')) {
      newCard.style.transition = 'opacity .3s, transform .3s';
      newCard.style.opacity = '0';
      newCard.style.transform = 'scale(.95)';
      setTimeout(() => newCard.remove(), 300);
    }
  };

  metaActions.appendChild(delBtn);
  meta.appendChild(metaActions);

  newCard.appendChild(visual);
  newCard.appendChild(meta);
  list.appendChild(newCard);

  // Temizle ve kapat
  const btn = document.querySelector('#addCardModalOverlay .ac-modal-foot .btn-primary');
  btn.textContent = '✓ Kaydedildi!';
  btn.style.background = '#2d9e6a';
  setTimeout(() => {
    closeModal('addCardModalOverlay');
    btn.textContent = 'Kartı Kaydet';
    btn.style.background = '';
    document.getElementById('cardNumber').value = '';
    document.getElementById('cardName').value   = '';
    document.getElementById('cardExp').value    = '';
    document.getElementById('cardCvv').value    = '';
    document.getElementById('cardDefault').checked = false;
    updateCardPreview();
  }, 1000);
}

window.formatCardNumber = formatCardNumber;
window.formatCardExp    = formatCardExp;
window.updateCardPreview = updateCardPreview;
window.submitAddCard    = submitAddCard;

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