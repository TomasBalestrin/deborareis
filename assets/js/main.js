/* A Arte da Imagem: interações da página */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Cabeçalho fixo ---------- */
  var header = document.querySelector('.header');
  function onScroll() {
    header.classList.toggle('is-stuck', window.scrollY > 40);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Comparadores antes/depois ---------- */
  var PARES = [
    { n: 1, cap: 'Morena iluminada' },
    { n: 2, cap: 'Loiro com raiz trabalhada' },
    { n: 3, cap: 'Loiro iluminado e movimento' },
    { n: 4, cap: 'Comprimento com luz' },
    { n: 5, cap: 'Do liso ao caramelo' },
    { n: 6, cap: 'Do acinzentado ao mel' },
    { n: 7, cap: 'Forma e luz no castanho' },
    { n: 8, cap: 'Loiro com raiz esfumada' },
    { n: 9, cap: 'Loiro uniforme com franja' }
  ];

  var ba = document.getElementById('ba');
  if (ba) {
    PARES.forEach(function (p) {
      var fig = document.createElement('figure');
      fig.className = 'frame compare';
      fig.innerHTML =
        '<div class="frame__inner compare__stage">' +
          '<img src="assets/img/antes-' + p.n + '.jpg" alt="Antes: ' + p.cap + '" width="900" height="1200" loading="lazy">' +
          '<img class="compare__top" src="assets/img/depois-' + p.n + '.jpg" alt="Depois: ' + p.cap + '" width="900" height="1200" loading="lazy">' +
          '<span class="compare__tag compare__tag--a">Antes</span>' +
          '<span class="compare__tag compare__tag--b">Depois</span>' +
          '<input class="compare__range" type="range" min="0" max="100" value="50" step="0.1" ' +
                 'aria-label="Comparar antes e depois: ' + p.cap + '">' +
          '<span class="compare__bar"><span class="compare__knob" aria-hidden="true">◀ ▶</span></span>' +
        '</div>' +
        '<figcaption class="frame__cap">' + p.cap + '</figcaption>';

      var stage = fig.querySelector('.compare__stage');
      var top   = fig.querySelector('.compare__top');
      var bar   = fig.querySelector('.compare__bar');
      var range = fig.querySelector('.compare__range');

      function set(v) {
        v = Math.max(0, Math.min(100, v));
        top.style.clipPath = 'inset(0 0 0 ' + v + '%)';
        bar.style.left = v + '%';
      }

      range.addEventListener('input', function () { set(parseFloat(range.value)); });

      function fromPointer(e) {
        var r = stage.getBoundingClientRect();
        var v = ((e.clientX - r.left) / r.width) * 100;
        range.value = v;
        set(v);
      }
      var dragging = false;
      stage.addEventListener('pointerdown', function (e) {
        dragging = true;
        stage.setPointerCapture(e.pointerId);
        fromPointer(e);
      });
      stage.addEventListener('pointermove', function (e) { if (dragging) fromPointer(e); });
      stage.addEventListener('pointerup', function () { dragging = false; });
      stage.addEventListener('pointercancel', function () { dragging = false; });

      set(50);
      ba.appendChild(fig);
    });
  }

  /* ---------- Trilho de 12 lugares ---------- */
  var seats = document.getElementById('seats');
  if (seats) {
    var TOTAL = 12, DISPONIVEIS = 8;   // ajuste conforme a turma
    for (var i = 1; i <= TOTAL; i++) {
      var s = document.createElement('span');
      s.className = 'seat' + (i > DISPONIVEIS ? ' seat--taken' : '');
      s.textContent = i < 10 ? '0' + i : i;
      seats.appendChild(s);
    }
    seats.setAttribute('aria-label', DISPONIVEIS + ' de ' + TOTAL + ' vagas ainda disponíveis nesta edição');
  }

  /* ---------- Revelação no scroll ---------- */
  var alvos = document.querySelectorAll('.reveal');
  if (reduced || !('IntersectionObserver' in window)) {
    alvos.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-in');
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    alvos.forEach(function (el) { io.observe(el); });
  }
})();
