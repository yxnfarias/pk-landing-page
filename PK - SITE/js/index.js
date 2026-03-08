/* ============================================================
   INDEX.JS — JavaScript exclusivo da página index.html
   ============================================================ */

(function () {
  'use strict';

  /* ── LOADER ── */
  // LOADER
  window.addEventListener('load', () => {
    setTimeout(() => { document.getElementById('loader').classList.add('hidden'); }, 2000);
  });

  /* ── FAQ — accordion ── */
  // FAQ
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* ── HERO BG PHOTO ── */
  (function() {
    const el = document.getElementById('hero-bg-photo');
    if (el) el.style.backgroundImage = "url('img/fotos/PK%20-%20BG.jpg')";
  })();

  /* ── COUNTER ANIMATION ── */
  // COUNTER ANIMATION — generic helper
  function animateCounter(numEl) {
    const target = parseInt(numEl.getAttribute('data-target'));
    const suffix = numEl.getAttribute('data-suffix') || '';
    if (isNaN(target)) return;
    let start = 0;
    const duration = 1600; // ms
    const steps = 60;
    const interval = duration / steps;
    const increment = Math.ceil(target / steps);
    numEl.textContent = '0' + suffix;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { start = target; clearInterval(timer); }
      numEl.textContent = start + suffix;
    }, interval);
  }

  // Impact section counters ("Resultados de Verdade")
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        el.classList.add('active');
        el.querySelectorAll('.impact-counter-num').forEach(num => {
          // derive suffix from label
          const label = num.closest('.impact-counter')?.querySelector('.impact-counter-label')?.textContent || '';
          const suffix = label.startsWith('%') ? '%' : '+';
          num.setAttribute('data-suffix', suffix);
          animateCounter(num);
        });
        counterObs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  const impactTitle = document.querySelector('.impact-title');
  const impactCounters = document.querySelector('.impact-counters');
  if (impactTitle)   counterObs.observe(impactTitle);
  if (impactCounters) counterObs.observe(impactCounters);

  // About-stats counters (foto do coach)
  const aboutStatsObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.about-stat-num').forEach(animateCounter);
        aboutStatsObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });

  const aboutStats = document.getElementById('about-stats');
  if (aboutStats) aboutStatsObs.observe(aboutStats);

})();
