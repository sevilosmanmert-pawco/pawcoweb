// ============================================================
// PAWCO — kopekurunler.js  (Ürün Detay Sayfası)
// main.js'deki PAWCO_DATA + navbar/mobile-nav render'ı kullanılır.
// Bu dosya yalnızca bu sayfaya özgü etkileşimleri yönetir.
// ============================================================

(function () {
  'use strict';

  // ── GALERİ ────────────────────────────────────────────────
  function initGallery() {
    var thumbs = document.querySelectorAll('.gallery-thumb');
    var mainImg = document.getElementById('mainImg');
    var prevBtn = document.getElementById('galleryPrev');
    var nextBtn = document.getElementById('galleryNext');
    var currentIndex = 0;

    if (!mainImg || thumbs.length === 0) return;

    function setActive(idx) {
      thumbs.forEach(function (t) { t.classList.remove('active'); });
      thumbs[idx].classList.add('active');
      var src = thumbs[idx].getAttribute('data-img');
      if (src) mainImg.src = src;
      currentIndex = idx;
    }

    thumbs.forEach(function (thumb, i) {
      thumb.addEventListener('click', function () { setActive(i); });
    });

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        var prev = (currentIndex - 1 + thumbs.length) % thumbs.length;
        setActive(prev);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        var next = (currentIndex + 1) % thumbs.length;
        setActive(next);
      });
    }
  }

  // ── FAVORİ (galeri) ────────────────────────────────────────
  function initFavButtons() {
    var favGallery = document.getElementById('favBtnGallery');
    if (favGallery) {
      favGallery.addEventListener('click', function () {
        var active = this.classList.toggle('active');
        this.textContent = active ? '♥ Favorilere Eklendi' : '♡ Favoriye Ekle';
      });
    }

    // Ürün kartlarındaki fav butonları (dinamik — delegation)
    document.addEventListener('click', function (e) {
      if (e.target.classList.contains('prod-fav')) {
        e.target.classList.toggle('active');
        e.target.textContent = e.target.classList.contains('active') ? '♥' : '♡';
      }
    });
  }

  // ── ADET SEÇİCİ ───────────────────────────────────────────
  function initQuantitySelectors() {
    var pairs = [
      { minus: 'qtyMinus', plus: 'qtyPlus', input: 'qtyInput' },
      { minus: 'stickyMinus', plus: 'stickyPlus', input: 'stickyQtyInput' }
    ];

    pairs.forEach(function (p) {
      var minusBtn = document.getElementById(p.minus);
      var plusBtn  = document.getElementById(p.plus);
      var input    = document.getElementById(p.input);
      if (!minusBtn || !plusBtn || !input) return;

      function getVal() { return parseInt(input.value, 10) || 1; }

      minusBtn.addEventListener('click', function () {
        var v = getVal();
        if (v > 1) {
          input.value = v - 1;
          sync(p.input, v - 1);
        }
      });
      plusBtn.addEventListener('click', function () {
        var v = getVal();
        if (v < 99) {
          input.value = v + 1;
          sync(p.input, v + 1);
        }
      });
    });

    // İki input'u senkron tut
    function sync(changedId, val) {
      var ids = ['qtyInput', 'stickyQtyInput'];
      ids.forEach(function (id) {
        if (id !== changedId) {
          var el = document.getElementById(id);
          if (el) el.value = val;
        }
      });
    }
  }

  // ── SEPETE EKLE ──────────────────────────────────────────
  function initAddToCart() {
    var cartCount = document.getElementById('cartCount');
    var count = 0;

    function addToCart(btn, qtyInputId) {
      if (!btn) return;
      btn.addEventListener('click', function () {
        var qty = parseInt(document.getElementById(qtyInputId).value, 10) || 1;
        count += qty;
        if (cartCount) cartCount.textContent = count;

        btn.classList.add('added');
        var orig = btn.textContent;
        btn.textContent = '✓ Sepete Eklendi';
        setTimeout(function () {
          btn.classList.remove('added');
          btn.textContent = orig;
        }, 1800);
      });
    }

    addToCart(document.getElementById('addToCartBtn'), 'qtyInput');
    addToCart(document.getElementById('stickyAddToCartBtn'), 'stickyQtyInput');

    // Ürün kartı sepet butonları
    document.addEventListener('click', function (e) {
      if (e.target.classList.contains('prod-cart-btn')) {
        count += 1;
        if (cartCount) cartCount.textContent = count;
        e.target.textContent = '✓';
        setTimeout(function () { e.target.textContent = '🛒'; }, 1200);
      }
    });
  }

  // ── ACCORDION ─────────────────────────────────────────────
  function initAccordions() {
    var btns = document.querySelectorAll('.accordion-btn');
    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var targetId = 'accordion-' + btn.getAttribute('data-accordion');
        var body = document.getElementById(targetId);
        if (!body) return;

        var isOpen = body.classList.contains('open');

        // Tüm accordion'ları kapat
        document.querySelectorAll('.accordion-body').forEach(function (b) {
          b.classList.remove('open');
        });
        document.querySelectorAll('.accordion-btn').forEach(function (b) {
          b.classList.remove('open');
        });

        if (!isOpen) {
          body.classList.add('open');
          btn.classList.add('open');
        }
      });
    });
  }

  // ── AÇIKLAMA EXPAND ───────────────────────────────────────
  function initDescExpand() {
    var btn = document.getElementById('descToggleBtn');
    var wrap = document.getElementById('descWrap');
    if (!btn || !wrap) return;

    var open = false;
    btn.addEventListener('click', function () {
      open = !open;
      wrap.classList.toggle('open', open);
      btn.textContent = open ? 'Daha Az Göster ▴' : 'Devamını Göster ▾';
    });
  }

  // ── SLİDER FABRİKASI ──────────────────────────────────────
  function initSlider(trackId, prevId, nextId, cardWidth) {
    var track = document.getElementById(trackId);
    var prev  = document.getElementById(prevId);
    var next  = document.getElementById(nextId);
    if (!track || !prev || !next) return;

    var gap = 12;
    var step = cardWidth + gap;
    var currentOffset = 0;
    var maxOffset = 0;

    function calcMax() {
      var wrap = track.parentElement;
      var wrapW = wrap ? wrap.offsetWidth : 0;
      var totalW = track.scrollWidth;
      maxOffset = Math.max(0, totalW - wrapW);
    }

    function update() {
      calcMax();
      currentOffset = Math.min(currentOffset, maxOffset);
      track.style.transform = 'translateX(-' + currentOffset + 'px)';
      prev.disabled = currentOffset <= 0;
      next.disabled = currentOffset >= maxOffset;
      prev.style.opacity = prev.disabled ? '0.3' : '1';
      next.style.opacity = next.disabled ? '0.3' : '1';
    }

    prev.addEventListener('click', function () {
      currentOffset = Math.max(0, currentOffset - step);
      update();
    });
    next.addEventListener('click', function () {
      currentOffset = Math.min(maxOffset, currentOffset + step);
      update();
    });

    // Touch support
    var startX = 0;
    track.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX;
    }, { passive: true });
    track.addEventListener('touchend', function (e) {
      var diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          currentOffset = Math.min(maxOffset, currentOffset + step);
        } else {
          currentOffset = Math.max(0, currentOffset - step);
        }
        update();
      }
    }, { passive: true });

    window.addEventListener('resize', update);
    update();
  }

  // ── TÜMÜ YORUMLAR ─────────────────────────────────────────
  function initAllReviews() {
    var btn = document.getElementById('allReviewsBtn');
    if (!btn) return;
    btn.addEventListener('click', function () {
      btn.textContent = 'Tüm yorumlar yükleniyor...';
      // Backend entegrasyonunda buraya fetch çağrısı gelir
      setTimeout(function () {
        btn.textContent = 'Tüm Yorumlar Yüklendi';
        btn.disabled = true;
        btn.style.opacity = '0.5';
      }, 800);
    });
  }

  // ── ARAMA ─────────────────────────────────────────────────
  // main.js'deki handleSearch() varsa kullanılır, yoksa fallback
  if (typeof handleSearch === 'undefined') {
    window.handleSearch = function () {
      var val = document.getElementById('searchInput');
      if (val && val.value.trim()) {
        alert('"' + val.value.trim() + '" için arama yapılıyor...');
      }
    };
  }

  // ── INIT ──────────────────────────────────────────────────
  function init() {
    initGallery();
    initFavButtons();
    initQuantitySelectors();
    initAddToCart();
    initAccordions();
    initDescExpand();
    initAllReviews();

    // Ürün sliderları — kart genişliği: 180px
    initSlider('togetherTrack',  'togetherPrev',  'togetherNext',  180);
    initSlider('similarTrack',   'similarPrev',   'similarNext',   180);
    initSlider('featuredTrack',  'featuredPrev',  'featuredNext',  180);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();