/* =====================================================
   PAWCO — salon.js
   Pet Salon sayfası: slider, subnav, randevu
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initServicesSlider();
  initReelsSlider();
  initSubnav();
});

/* ── HİZMETLER SLIDER ─────────────────────────────── */
function initServicesSlider() {
  const track   = document.getElementById('servicesTrack');
  const prevBtn = document.getElementById('servPrev');
  const nextBtn = document.getElementById('servNext');
  if (!track) return;

  const cardW  = 220 + 16; // genişlik + gap
  let current  = 0;
  const cards  = track.querySelectorAll('.service-card');
  const visible = getVisibleCount();
  const max     = Math.max(0, cards.length - visible);

  function getVisibleCount() {
    const ow = track.parentElement.offsetWidth;
    return Math.floor(ow / cardW) || 1;
  }

  function slide(dir) {
    const vis = getVisibleCount();
    const mx  = Math.max(0, cards.length - vis);
    current = Math.max(0, Math.min(current + dir, mx));
    track.style.transform = `translateX(-${current * cardW}px)`;
  }

  prevBtn?.addEventListener('click', () => slide(-1));
  nextBtn?.addEventListener('click', () => slide(1));
}

/* ── REELS SLIDER ─────────────────────────────────── */
function initReelsSlider() {
  const track   = document.getElementById('reelsTrack');
  const prevBtn = document.getElementById('reelPrev');
  const nextBtn = document.getElementById('reelNext');
  if (!track) return;

  const cardW  = 200 + 16;
  let current  = 0;
  const cards  = track.querySelectorAll('.reel-card');

  function slide(dir) {
    const vis = Math.floor(track.parentElement.offsetWidth / cardW) || 1;
    const mx  = Math.max(0, cards.length - vis);
    current = Math.max(0, Math.min(current + dir, mx));
    track.style.transform = `translateX(-${current * cardW}px)`;
  }

  prevBtn?.addEventListener('click', () => slide(-1));
  nextBtn?.addEventListener('click', () => slide(1));

  // Play butonları
  track.querySelectorAll('.reel-play-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      alert('Video oynatıcı açılıyor... (Backend entegrasyonu gerektirir)');
    });
  });
}

/* ── SUBNAV AKTİF BÖLÜM ───────────────────────────── */
function initSubnav() {
  const links    = document.querySelectorAll('.salon-subnav-link');
  const sections = ['hero','hizmetler','magazalar','randevu','galeri','reels','neden'];

  // Smooth scroll
  links.forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        const target = document.getElementById(href.slice(1));
        if (target) {
          const offset = 100; // header + subnav yüksekliği
          const top    = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // Scroll spy
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(l => {
          const sec = l.dataset.section;
          l.classList.toggle('active', sec === id);
        });
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}

/* ── RANDEVU FORM ─────────────────────────────────── */
function openAppointmentForm() {
  const form = document.getElementById('appointmentForm');
  if (!form) return;
  const isOpen = form.style.display !== 'none';
  form.style.display = isOpen ? 'none' : 'block';
  if (!isOpen) {
    setTimeout(() => {
      form.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  }
}

function submitAppointment() {
  const btn = document.querySelector('.appt-submit-btn');
  if (!btn) return;
  btn.textContent = '✓ Randevu Alındı! Sizi arayacağız.';
  btn.style.background = '#2d9e6a';
  setTimeout(() => {
    btn.textContent = 'Randevuyu Onayla ✓';
    btn.style.background = '';
    document.getElementById('appointmentForm').style.display = 'none';
  }, 3500);
}

window.openAppointmentForm = openAppointmentForm;
window.submitAppointment   = submitAppointment;