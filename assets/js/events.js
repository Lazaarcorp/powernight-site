/* Power Night — page « Éditions passées » : affichage + visionneuse */
(function () {
  var events = (window.POWER_NIGHT_EVENTS || []).slice().sort(function (a, b) {
    return b.date.localeCompare(a.date);
  });
  var list = document.getElementById('editions-list');
  var filters = document.getElementById('editions-filters');
  if (!list) return;

  var esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  var fmtDate = function (iso) {
    var d = new Date(iso + 'T12:00:00');
    var s = d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  var playIcon = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';

  function thumb(m, ei, mi) {
    var inner;
    if (m.type === 'photo') {
      inner = '<img src="' + esc(m.src) + '" alt="' + esc(m.alt) + '" loading="lazy">';
    } else if (m.type === 'video') {
      inner = (m.poster ? '<img src="' + esc(m.poster) + '" alt="' + esc(m.alt) + '" loading="lazy">'
                        : '<video src="' + esc(m.src) + '#t=0.5" muted preload="metadata"></video>') +
              '<span class="play">' + playIcon + '</span>';
    } else if (m.type === 'youtube') {
      inner = '<img src="https://i.ytimg.com/vi/' + esc(m.id) + '/hqdefault.jpg" alt="' + esc(m.alt) + '" loading="lazy">' +
              '<span class="play">' + playIcon + '</span>';
    } else return '';
    var wide = /affiche/i.test(m.src || '') || m.type === 'youtube' || m.wide;
    return '<button class="g-item' + (wide ? ' wide' : '') + '" data-e="' + ei + '" data-m="' + mi + '" aria-label="Agrandir : ' + esc(m.alt || 'média') + '">' + inner + '</button>';
  }

  function render(filter) {
    var shown = events.filter(function (e) { return !filter || e.date.slice(0, 4) === filter; });
    if (!shown.length) {
      list.innerHTML = '<p class="lead" style="text-align:center">Aucune édition pour le moment.</p>';
      return;
    }
    list.innerHTML = shown.map(function (e) {
      var ei = events.indexOf(e);
      var media = e.media || [];
      var photos = media.filter(function (m) { return m.type === 'photo'; }).length;
      var videos = media.length - photos;
      var gallery = media.length
        ? '<div class="gallery">' + media.map(function (m, mi) { return thumb(m, ei, mi); }).join('') + '</div>'
        : '<div class="gallery empty">' +
            '<div class="g-ph"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-8 8"/></svg>Photos à venir</div>' +
            '<div class="g-ph"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10l5-3v10l-5-3z"/></svg>Vidéos à venir</div>' +
            '<div class="g-ph hide-sm"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17" cy="9" r="2.5"/></svg>Moments forts</div>' +
          '</div>';
      return '' +
        '<article class="edition reveal" id="' + esc(e.slug) + '">' +
          '<div class="ed-head">' +
            '<div class="ed-date"><span>' + esc(e.date.slice(8, 10)) + '</span><small>' +
              esc(new Date(e.date + 'T12:00:00').toLocaleDateString('fr-FR', { month: 'short' }).replace('.', '')) + ' ' + esc(e.date.slice(0, 4)) + '</small></div>' +
            '<div class="ed-info">' +
              (e.theme ? '<span class="kicker">// ' + esc(e.theme) + '</span>' : '') +
              '<h2>' + esc(e.title) + '</h2>' +
              '<p class="ed-meta">' + esc(fmtDate(e.date)) + (e.time ? ' · ' + esc(e.time) : '') + (e.place ? ' · ' + esc(e.place) : '') + '</p>' +
              '<p class="lead">' + esc(e.summary) + '</p>' +
              ((e.partners && e.partners.length) ? '<div class="chips">' + e.partners.map(function (p) { return '<span class="chip">' + esc(p) + '</span>'; }).join('') + '</div>' : '') +
              '<p class="ed-count">' + [
                e.attendees ? e.attendees + ' participants' : '',
                media.length ? photos + ' photo' + (photos > 1 ? 's' : '') : '',
                videos ? videos + ' vidéo' + (videos > 1 ? 's' : '') : ''
              ].filter(Boolean).join(' · ') + '</p>' +
            '</div>' +
          '</div>' +
          gallery +
        '</article>';
    }).join('');
    observe();
  }

  // Filtres par année
  var years = events.map(function (e) { return e.date.slice(0, 4); })
    .filter(function (y, i, a) { return a.indexOf(y) === i; });
  if (filters && years.length > 1) {
    filters.innerHTML = '<button class="chip active" data-y="">Toutes</button>' +
      years.map(function (y) { return '<button class="chip" data-y="' + y + '">' + y + '</button>'; }).join('');
    filters.addEventListener('click', function (ev) {
      var b = ev.target.closest('button'); if (!b) return;
      filters.querySelectorAll('button').forEach(function (x) { x.classList.toggle('active', x === b); });
      render(b.getAttribute('data-y'));
    });
  }

  function observe() {
    var items = list.querySelectorAll('.reveal:not(.in)');
    if (!('IntersectionObserver' in window)) { items.forEach(function (el) { el.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  }

  render('');

  // ---------- Visionneuse (lightbox) ----------
  var lb = document.getElementById('lightbox');
  var stage = lb.querySelector('.lb-stage');
  var caption = lb.querySelector('.lb-caption');
  var cur = { e: 0, m: 0 };
  var lastFocus = null;

  function show() {
    var media = events[cur.e].media;
    var m = media[cur.m];
    var html;
    if (m.type === 'photo') html = '<img src="' + esc(m.src) + '" alt="' + esc(m.alt) + '">';
    else if (m.type === 'video') html = '<video src="' + esc(m.src) + '"' + (m.poster ? ' poster="' + esc(m.poster) + '"' : '') + ' controls autoplay playsinline></video>';
    else html = '<iframe src="https://www.youtube-nocookie.com/embed/' + esc(m.id) + '?autoplay=1&rel=0" title="' + esc(m.alt || 'Vidéo') + '" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>';
    stage.innerHTML = html;
    caption.textContent = (m.alt ? m.alt + ' — ' : '') + events[cur.e].title + ' · ' + (cur.m + 1) + '/' + media.length;
    lb.querySelector('.lb-prev').hidden = lb.querySelector('.lb-next').hidden = media.length < 2;
  }
  function open(e, m) {
    cur = { e: e, m: m }; lastFocus = document.activeElement;
    lb.hidden = false; document.body.style.overflow = 'hidden';
    show(); lb.querySelector('.lb-close').focus();
  }
  function close() {
    lb.hidden = true; stage.innerHTML = ''; document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  function step(d) {
    var n = events[cur.e].media.length;
    cur.m = (cur.m + d + n) % n; show();
  }

  list.addEventListener('click', function (ev) {
    var b = ev.target.closest('.g-item'); if (!b) return;
    open(+b.getAttribute('data-e'), +b.getAttribute('data-m'));
  });
  lb.querySelector('.lb-close').addEventListener('click', close);
  lb.querySelector('.lb-prev').addEventListener('click', function () { step(-1); });
  lb.querySelector('.lb-next').addEventListener('click', function () { step(1); });
  lb.addEventListener('click', function (ev) { if (ev.target === lb) close(); });
  document.addEventListener('keydown', function (ev) {
    if (lb.hidden) return;
    if (ev.key === 'Escape') close();
    if (ev.key === 'ArrowLeft') step(-1);
    if (ev.key === 'ArrowRight') step(1);
  });
  var x0 = null; // balayage sur mobile
  lb.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
    x0 = null;
  });
})();
