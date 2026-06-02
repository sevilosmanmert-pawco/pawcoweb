/* ============================================================
   PAWCO — hakkimizda.js
   Sayaç animasyonu + scroll reveal
   ============================================================ */

'use strict';

/* ── SCROLL REVEAL ───────────────────────────────────────── */
function initReveal() {
  // Reveal uygulanacak elemanlar
  const targets = [
    '.hk-stat-item',
    '.hk-story-img-col',
    '.hk-story-text-col',
    '.hk-value-card',
    '.hk-tl-card',
    '.hk-team-card',
    '.hk-press-logo',
    '.hk-shelter-text',
    '.hk-shelter-img-col',
  ];

  const allEls = document.querySelectorAll(targets.join(','));

  allEls.forEach(function (el, i) {
    el.classList.add('hk-reveal');
    // Kart gruplarında sıralı gecikme
    const delay = (i % 6);
    if (delay > 0) el.classList.add('hk-reveal-delay-' + Math.min(delay, 5));
  });

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  allEls.forEach(function (el) { observer.observe(el); });
}

/* ── SAYAÇ ANİMASYONU ────────────────────────────────────── */
function initCounters() {
  const counters = document.querySelectorAll('.hk-stat-num[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.target);
      animateCount(el, target);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(function (el) { observer.observe(el); });
}

function animateCount(el, target) {
  const duration = 2000;
  const start    = performance.now();

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // easeOutExpo
    const eased = 1 - Math.pow(2, -10 * progress);
    const val   = Math.round(eased * target);

    // Formatla
    if (target >= 1000000) {
      el.textContent = (val / 1000000).toFixed(1).replace('.', ',') + 'M';
    } else if (target >= 10000) {
      el.textContent = val.toLocaleString('tr-TR') + '+';
    } else {
      el.textContent = val.toLocaleString('tr-TR');
    }

    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

/* ── INIT ────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  initReveal();
  initCounters();
});