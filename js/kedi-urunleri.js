// ============================================================
// PAWCO — kedi-urunleri.js
// Sadece kedi-urunleri.html'e özgü etkileşimler.
// Genel işlevler (navbar, mobile-nav vs.) js/main.js'te.
// ============================================================

(function () {
  'use strict';

  // ── HERO BANNER SLIDER ────────────────────────────────────
  var heroSlides = document.querySelectorAll('.cat-hero-slide');
  var heroPrev   = document.getElementById('catHeroPrev');
  var heroNext   = document.getElementById('catHeroNext');
  var dotsWrap   = document.getElementById('catHeroDots');
  var current    = 0;
  var autoTimer  = null;

  function buildDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = '';
    heroSlides.forEach(function (_, i) {
      var d = document.createElement('button');
      d.className = 'dot' + (i === 0 ? ' active' : '');
      d.setAttribute('aria-label', 'Slayt ' + (i + 1));
      d.addEventListener('click', function () { goTo(i); });
      dotsWrap.appendChild(d);
    });
  }

  function goTo(index) {
    if (!heroSlides.length) return;
    heroSlides[current].classList.remove('active');
    current = (index + heroSlides.length) % heroSlides.length;
    heroSlides[current].classList.add('active');
    var dots = dotsWrap ? dotsWrap.querySelectorAll('.dot') : [];
    dots.forEach(function (d, i) { d.classList.toggle('active', i === current); });
  }

  function startAuto() {
    if (autoTimer) clearInterval(autoTimer);
    autoTimer = setInterval(function () { goTo(current + 1); }, 5000);
  }

  if (heroSlides.length) {
    buildDots();
    if (heroPrev) heroPrev.addEventListener('click', function () { goTo(current - 1); startAuto(); });
    if (heroNext) heroNext.addEventListener('click', function () { goTo(current + 1); startAuto(); });
    startAuto();

    // Swipe desteği
    var touchStartX = 0;
    var heroWrap = document.querySelector('.cat-hero-inner');
    if (heroWrap) {
      heroWrap.addEventListener('touchstart', function (e) {
        touchStartX = e.touches[0].clientX;
      }, { passive: true });
      heroWrap.addEventListener('touchend', function (e) {
        var diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) {
          goTo(diff > 0 ? current + 1 : current - 1);
          startAuto();
        }
      }, { passive: true });
    }
  }

  // ── SLIDER FACTORY (marka + blog + soru-cevap) ──────────
  function initSlider(trackId, prevId, nextId, gap) {
    var track   = document.getElementById(trackId);
    var prevBtn = document.getElementById(prevId);
    var nextBtn = document.getElementById(nextId);
    if (!track || !prevBtn || !nextBtn) return;
    if (!track.children.length) return;

    var index = 0;

    function cardWidth() {
      return track.children[0].offsetWidth + gap;
    }
    function visibleCount() {
      var w = track.parentElement.offsetWidth;
      var cw = cardWidth();
      return Math.max(1, Math.floor(w / cw));
    }
    function maxIndex() {
      return Math.max(0, track.children.length - visibleCount());
    }
    function update() {
      index = Math.min(index, maxIndex());
      track.style.transform = 'translateX(-' + (index * cardWidth()) + 'px)';
      prevBtn.disabled = index <= 0;
      nextBtn.disabled = index >= maxIndex();
    }

    prevBtn.addEventListener('click', function () { index = Math.max(0, index - 1); update(); });
    nextBtn.addEventListener('click', function () { index = Math.min(maxIndex(), index + 1); update(); });
    window.addEventListener('resize', function () { index = 0; update(); });
    update();
  }

  // ── SEO EXPAND ────────────────────────────────────────────
  function initExpand() {
    var btn     = document.getElementById('catExpandBtn');
    var content = document.getElementById('catSeoExpand');
    if (!btn || !content) return;
    var expanded = false;
    btn.addEventListener('click', function () {
      expanded = !expanded;
      content.classList.toggle('open', expanded);
      btn.textContent = expanded ? 'Daha Az Göster ▴' : 'Devamını Göster ▾';
    });
  }





    /* ── NAVBAR: kediurunler.html'e özgü, main.js'ten bağımsız ── */
    document.addEventListener('DOMContentLoaded', function () {
      var activeAnimal = null;

      function closeAll() {
        document.querySelectorAll('.nav-item[data-animal]').forEach(function (ni) {
          ni.classList.remove('active');
        });
        activeAnimal = null;
      }

      function showPanel(animalId, panelId) {
        var content = document.getElementById('content-' + animalId);
        if (!content) return;
        content.querySelectorAll('.cat-panel').forEach(function (p) {
          p.hidden = p.dataset.panel !== panelId;
        });
      }

      document.querySelectorAll('.nav-item[data-animal]').forEach(function (navItem) {
        var animalId = navItem.dataset.animal;
        var dropdown = document.getElementById('dropdown-' + animalId);
        var sidebar  = document.getElementById('sidebar-' + animalId);

        /* Hover → aç */
        navItem.addEventListener('mouseenter', function () {
          closeAll();
          activeAnimal = animalId;
          navItem.classList.add('active');

          /* Sidebar: ilk item aktif, panel göster */
          if (sidebar) {
            var items = sidebar.querySelectorAll('.sidebar-item');
            var first = sidebar.querySelector('.sidebar-item.active') || items[0];
            items.forEach(function (s) { s.classList.remove('active'); });
            if (first) {
              first.classList.add('active');
              showPanel(animalId, first.dataset.id);
            }

            /* Sidebar satırına hover → panel değiştir */
            items.forEach(function (item) {
              item.addEventListener('mouseenter', function () {
                items.forEach(function (s) { s.classList.remove('active'); });
                item.classList.add('active');
                showPanel(animalId, item.dataset.id);
              });
            });
          }
        });

        /* nav-item'dan dropdown'a geçince kapanmasın */
        navItem.addEventListener('mouseleave', function (e) {
          if (dropdown && dropdown.contains(e.relatedTarget)) return;
          closeAll();
        });
        if (dropdown) {
          dropdown.addEventListener('mouseleave', function (e) {
            if (navItem.contains(e.relatedTarget)) return;
            closeAll();
          });
        }
      });

      /* Dışarı tıklayınca kapat */
      document.addEventListener('click', function (e) {
        if (!e.target.closest('.nav-item')) closeAll();
      });
    });







  // ── INIT ──────────────────────────────────────────────────
  function init() {
    initSlider('catBrandsTrack', 'catBrandPrev',  'catBrandNext',  12);
    initSlider('catBlogSlider',  'catBlogPrev',   'catBlogNext',   16);
    initSlider('catQaSlider',    'catQaPrev',     'catQaNext',     16);
    initExpand();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();