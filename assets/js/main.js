/* Power Night — scripts */
(function () {
  // Navigation : fond au défilement + menu mobile
  var nav = document.querySelector('.nav');
  var burger = document.querySelector('.burger');
  function onScroll() { if (nav) nav.classList.toggle('scrolled', window.scrollY > 20); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (burger) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open);
    });
    document.querySelectorAll('.nav-links a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); burger.setAttribute('aria-expanded', false); });
    });
  }

  // Compte à rebours — la date est lue dans data-target (heure de Paris incluse)
  var cd = document.querySelector('[data-countdown]');
  if (cd) {
    var target = new Date(cd.getAttribute('data-target')).getTime();
    var els = {
      d: cd.querySelector('[data-unit="d"]'),
      h: cd.querySelector('[data-unit="h"]'),
      m: cd.querySelector('[data-unit="m"]'),
      s: cd.querySelector('[data-unit="s"]')
    };
    var pad = function (n) { return String(n).padStart(2, '0'); };
    var tick = function () {
      var diff = target - Date.now();
      if (diff <= 0) {
        cd.innerHTML = '<p class="cd-done">⚡ C’est ce soir&nbsp;! L’événement a commencé.</p>';
        clearInterval(timer);
        return;
      }
      var s = Math.floor(diff / 1000);
      els.d.textContent = Math.floor(s / 86400);
      els.h.textContent = pad(Math.floor((s % 86400) / 3600));
      els.m.textContent = pad(Math.floor((s % 3600) / 60));
      els.s.textContent = pad(s % 60);
    };
    var timer = setInterval(tick, 1000);
    tick();
  }

  // Apparition des blocs au défilement
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Année du footer
  var y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();
})();
