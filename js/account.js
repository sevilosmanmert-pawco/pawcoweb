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

window.openReturnModal    = openReturnModal;
window.closeReturnModal   = closeReturnModal;
window.submitReturnForm   = submitReturnForm;
window.handleReturnFiles  = handleReturnFiles;
window.cancelAppointment  = cancelAppointment;

/* ── GLOBAL ─────────────────────────────────────────── */
window.activateTab = activateTab;