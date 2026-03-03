(() => {
  document.documentElement.classList.add('js');

  document.addEventListener('DOMContentLoaded', () => {
    initYear();
    initLogoToInstagram();
    initSmartVideoAutoplay();
    initRevealOnScroll();
    initYouTubeDirect();
  });

  function initYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  function initLogoToInstagram() {
    const brand = document.querySelector('.brand');
    const logo = brand?.querySelector('img');
    if (!logo) return;
    logo.style.cursor = 'pointer';
    logo.addEventListener('click', () => {
      window.open('https://instagram.com/unikists', '_blank', 'noopener');
    });
  }

  function initSmartVideoAutoplay() {
    const videos = document.querySelectorAll('.marquee video');
    if (!videos.length) return;

    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !('IntersectionObserver' in window)) return;

    videos.forEach(v => {
      v.setAttribute('playsinline', '');
      v.setAttribute('muted', '');
      v.setAttribute('loop', '');
      v.preload = 'metadata';
    });

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const v = entry.target;
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      });
    }, { threshold: 0.25 });

    videos.forEach(v => io.observe(v));
  }

  function initRevealOnScroll() {
    const revealEls = document.querySelectorAll('.reveal');
    if (!revealEls.length) return;

    if (!('IntersectionObserver' in window)) {
      revealEls.forEach(el => el.classList.add('is-visible'));
      return;
    }

    const ro = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          ro.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(el => ro.observe(el));
  }

  function initYouTubeDirect() {
    const thumbs = document.querySelectorAll('.yt-thumb[data-yt]');
    if (!thumbs.length) return;

    thumbs.forEach(thumb => {
      thumb.style.cursor = 'pointer';
      thumb.addEventListener('click', () => {
        const raw = thumb.dataset.yt?.trim();
        if (!raw) return;

        let url = raw;
        if (raw.includes('/embed/')) {
          const id = raw.split('/embed/')[1]?.split(/[?&]/)[0];
          if (id) url = `https://www.youtube.com/watch?v=${id}`;
        }

        window.open(url, '_blank', 'noopener');
      });
    });
  }
})();
