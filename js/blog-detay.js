/* ============================================================
   PAWCO — blog-detay.js
   Blog detay sayfası etkileşimleri:
   - Otomatik İçindekiler oluşturma
   - Aktif başlık takibi (scroll spy)
   - Okuma ilerleme çubuğu
   - Paylaş butonları
   - Bülten aboneliği
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', function () {
  buildTOC();
  initProgressBar();
  initScrollSpy();
  setKargoDeadline();
});

/* ── İÇİNDEKİLER (TOC) ─────────────────────────────────── */
function buildTOC() {
  var content = document.getElementById('bdContent');
  var toc     = document.getElementById('bdToc');
  if (!content || !toc) return;

  var headings = content.querySelectorAll('h2, h3');
  if (headings.length < 2) {
    var card = document.getElementById('tocCard');
    if (card) card.style.display = 'none';
    return;
  }

  headings.forEach(function (h, i) {
    // ID ata
    if (!h.id) {
      h.id = 'bd-h-' + i;
    }

    var link = document.createElement('a');
    link.href      = '#' + h.id;
    link.className = 'bd-toc-item' + (h.tagName === 'H3' ? ' bd-toc-item--h3' : '');
    link.textContent = h.textContent;
    link.dataset.target = h.id;

    link.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.getElementById(h.id);
      if (!target) return;
      var offset = 90; // sticky header yüksekliği
      var top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });

    toc.appendChild(link);
  });
}

/* ── SCROLL SPY ─────────────────────────────────────────── */
function initScrollSpy() {
  var content = document.getElementById('bdContent');
  if (!content) return;

  var headings = Array.from(content.querySelectorAll('h2, h3'));
  if (!headings.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var id   = entry.target.id;
      var link = document.querySelector('.bd-toc-item[data-target="' + id + '"]');
      if (!link) return;

      if (entry.isIntersecting) {
        document.querySelectorAll('.bd-toc-item').forEach(function (l) {
          l.classList.remove('bd-toc-item--active');
        });
        link.classList.add('bd-toc-item--active');

        // Toc içinde görünür tut
        link.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    });
  }, {
    rootMargin: '-80px 0px -60% 0px',
    threshold: 0
  });

  headings.forEach(function (h) {
    if (h.id) observer.observe(h);
  });
}

/* ── OKUMA İLERLEME ÇUBUĞU ─────────────────────────────── */
function initProgressBar() {
  var bar = document.getElementById('bdProgressBar');
  if (!bar) return;

  window.addEventListener('scroll', function () {
    var docH    = document.documentElement.scrollHeight - window.innerHeight;
    var scrolled = window.scrollY;
    var pct     = docH > 0 ? (scrolled / docH) * 100 : 0;
    bar.style.width = Math.min(100, pct) + '%';
  }, { passive: true });
}

/* ── PAYLAŞ ─────────────────────────────────────────────── */
function shareArticle(platform) {
  var url   = encodeURIComponent(window.location.href);
  var title = encodeURIComponent(document.title);
  var shareUrl = '';

  if (platform === 'facebook') {
    shareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + url;
  } else if (platform === 'twitter') {
    shareUrl = 'https://twitter.com/intent/tweet?url=' + url + '&text=' + title;
  } else if (platform === 'whatsapp') {
    shareUrl = 'https://wa.me/?text=' + title + '%20' + url;
  }

  if (shareUrl) window.open(shareUrl, '_blank', 'width=600,height=400');
}

function copyLink() {
  var url = window.location.href;

  if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(function () {
      showCopyFeedback();
    });
  } else {
    // Fallback
    var ta = document.createElement('textarea');
    ta.value = url;
    ta.style.position = 'fixed';
    ta.style.opacity  = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showCopyFeedback();
  }
}

function showCopyFeedback() {
  ['copyBtn', 'copyBtn2'].forEach(function (id) {
    var btn = document.getElementById(id);
    if (!btn) return;
    var orig = btn.textContent;
    btn.textContent = '✓ Kopyalandı!';
    btn.style.color = '#16a34a';
    setTimeout(function () {
      btn.textContent = orig;
      btn.style.color = '';
    }, 2000);
  });
}

/* ── BÜLTEN ─────────────────────────────────────────────── */
function subscribeNewsletter() {
  var input = document.querySelector('.bd-newsletter-input');
  var msg   = document.getElementById('newsletterMsg');
  if (!input || !msg) return;

  var email = input.value.trim();

  if (!email || !email.includes('@') || !email.includes('.')) {
    msg.textContent = '⚠️ Geçerli bir e-posta adresi girin.';
    msg.style.color = '#f87171';
    input.focus();
    return;
  }

  // Simülasyon (gerçekte API çağrısı yapılır)
  input.disabled = true;
  document.querySelector('.bd-newsletter-btn').disabled = true;
  msg.textContent = '🎉 Abone oldunuz! Teşekkürler.';
  msg.style.color = '#4ade80';
}

/* ── KARGO TARİHİ ───────────────────────────────────────── */
function setKargoDeadline() {
  var el = document.getElementById('kargoDeadline');
  if (!el) return;
  var now    = new Date();
  var cutoff = new Date(now);
  cutoff.setHours(18, 0, 0, 0);

  var days = ['Pazar','Pazartesi','Salı','Çarşamba','Perşembe','Cuma','Cumartesi'];
  var months = ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran',
                'Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];

  if (now > cutoff) cutoff.setDate(cutoff.getDate() + 1);

  el.textContent = days[cutoff.getDay()] + ', ' + cutoff.getDate() + ' ' +
                   months[cutoff.getMonth()] + ' 18:00\'a kadar';
}