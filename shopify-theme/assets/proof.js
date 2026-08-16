/* ============================================================
   PROOF — moteur du thème, sans dépendance.

   Reprend, en JavaScript natif, ce que faisaient les composants
   React du site Next.js :
     Fx            → reveals, stagger, tracés, parallaxe
     CartProvider  → remplacé par le panier Shopify (Ajax API)
     CartDrawer    → tiroir + re-rendu par la Section Rendering API
     PdpGallery    → galerie fiche produit
     PdpBuyBox     → variantes, quantité, barre d'achat collante
     TechReveal    → fondu Deep Matrix en boucle
     RitualSteps   → stepper du rituel
     PdpResults    → onglets de résultats
     PdpRoutine    → défilement du filmstrip
     StoryDialog   → modale

   Tout est neutralisé par prefers-reduced-motion, et la page reste
   utilisable sans JavaScript (les formulaires postent nativement).
   ============================================================ */
(function () {
  'use strict';

  var CFG = window.PROOF || {};
  var ROUTES = CFG.routes || {};
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  };

  /* ---------- Devise ------------------------------------------------ */
  /* Reproduit le filtre `money` de Liquid à partir de shop.money_format. */
  function formatMoney(cents) {
    var format = CFG.moneyFormat || '${{amount}}';
    var value = Number(cents) || 0;

    function withDelimiters(number, precision, thousands, decimal) {
      number = (number / 100).toFixed(precision);
      var parts = number.split('.');
      var head = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands);
      return parts[1] ? head + decimal + parts[1] : head;
    }

    return format.replace(/\{\{\s*(\w+)\s*\}\}/, function (_, name) {
      switch (name) {
        case 'amount': return withDelimiters(value, 2, ',', '.');
        case 'amount_no_decimals': return withDelimiters(value, 0, ',', '.');
        case 'amount_with_comma_separator': return withDelimiters(value, 2, '.', ',');
        case 'amount_no_decimals_with_comma_separator': return withDelimiters(value, 0, '.', ',');
        case 'amount_with_space_separator': return withDelimiters(value, 2, ' ', ',');
        case 'amount_no_decimals_with_space_separator': return withDelimiters(value, 0, ' ', ',');
        default: return withDelimiters(value, 2, ',', '.');
      }
    });
  }

  /* ---------- FX : reveals, tracés, parallaxe ----------------------- */
  function initFx() {
    document.documentElement.classList.add('js');

    $$('[data-reveal-group]').forEach(function (group) {
      $$('[data-reveal]', group).forEach(function (el, i) {
        el.style.setProperty('--i', String(i));
      });
    });

    var pending = new Set();
    var reveal = function (el) {
      el.classList.add(el.hasAttribute('data-draw') ? 'is-drawn' : 'is-in');
    };

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          reveal(entry.target);
          io.unobserve(entry.target);
          pending.delete(entry.target);
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
    );

    $$('[data-reveal], [data-draw]').forEach(function (el) {
      if (el.classList.contains('is-in') || el.classList.contains('is-drawn')) return;
      io.observe(el);
      pending.add(el);
    });

    /* Filet de sécurité : un défilement très rapide peut faire manquer l'IO. */
    var sweepRaf = 0;
    var sweep = function () {
      sweepRaf = 0;
      var line = window.innerHeight * 0.92;
      pending.forEach(function (el) {
        if (el.getBoundingClientRect().top < line) {
          reveal(el);
          io.unobserve(el);
          pending.delete(el);
        }
      });
      if (pending.size === 0) window.removeEventListener('scroll', onSweep);
    };
    var onSweep = function () {
      if (!sweepRaf) sweepRaf = requestAnimationFrame(sweep);
    };
    window.addEventListener('scroll', onSweep, { passive: true });

    /* Parallaxe, transform uniquement */
    var layers = reduced ? [] : $$('[data-parallax]');
    if (!layers.length) return;
    var raf = 0;
    var paint = function () {
      raf = 0;
      var vh = window.innerHeight;
      layers.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        if (rect.bottom < -80 || rect.top > vh + 80) return;
        var p = (rect.top + rect.height / 2 - vh / 2) / (vh / 2);
        var strength = Number(el.dataset.parallax) || 6;
        el.style.transform = 'translate3d(0,' + (-p * strength).toFixed(3) + '%,0)';
      });
    };
    var onScroll = function () { if (!raf) raf = requestAnimationFrame(paint); };
    paint();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
  }

  /* ---------- PANIER ------------------------------------------------ */
  var Cart = {
    open: function () {
      var drawer = $('[data-cart-drawer]');
      if (!drawer) return;
      $('[data-cart-scrim]').classList.add('is-open');
      drawer.classList.add('is-open');
      drawer.removeAttribute('inert');
      drawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    },

    close: function () {
      var drawer = $('[data-cart-drawer]');
      if (!drawer) return;
      $('[data-cart-scrim]').classList.remove('is-open');
      drawer.classList.remove('is-open');
      drawer.setAttribute('inert', '');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    },

    /* Redemande la section du tiroir au serveur : Liquid reste la seule
       source de vérité du rendu, y compris après un appel Ajax. */
    refresh: function () {
      return fetch((ROUTES.root || '/') + '?sections=cart-drawer', {
        headers: { Accept: 'application/json' }
      })
        .then(function (r) { return r.json(); })
        .then(function (data) {
          var html = data['cart-drawer'];
          if (!html) return;
          var fresh = new DOMParser().parseFromString(html, 'text/html');
          var next = fresh.querySelector('#shopify-section-cart-drawer') || fresh.body;
          var current = document.querySelector('#shopify-section-cart-drawer');
          if (current && next) current.innerHTML = next.innerHTML;
        });
    },

    setCount: function (count) {
      $$('[data-cart-count]').forEach(function (el) {
        el.textContent = '(' + count + ')';
        el.classList.remove('is-pop');
        void el.offsetWidth; /* relance l'animation de ressort */
        el.classList.add('is-pop');
        setTimeout(function () { el.classList.remove('is-pop'); }, 500);
      });
    },

    add: function (formData, opts) {
      opts = opts || {};
      return fetch(ROUTES.cartAdd || '/cart/add.js', {
        method: 'POST',
        headers: { Accept: 'application/javascript' },
        body: formData
      })
        .then(function (r) {
          if (!r.ok) return r.json().then(function (e) { throw new Error(e.description || e.message); });
          return r.json();
        })
        .then(function () { return Cart.sync(opts.open !== false); });
    },

    change: function (line, quantity) {
      return fetch(ROUTES.cartChange || '/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/javascript' },
        body: JSON.stringify({ line: line, quantity: quantity })
      })
        .then(function (r) { return r.json(); })
        .then(function () { return Cart.sync(false); });
    },

    /* Recharge le compteur et le tiroir depuis l'état réel du panier. */
    sync: function (shouldOpen) {
      return fetch((ROUTES.cart || '/cart') + '.js', { headers: { Accept: 'application/json' } })
        .then(function (r) { return r.json(); })
        .then(function (cart) {
          Cart.setCount(cart.item_count);
          return Cart.refresh().then(function () {
            if (shouldOpen && CFG.cartDrawer !== false) Cart.open();
          });
        });
    }
  };

  function initCart() {
    /* Délégation : le tiroir est remplacé à chaque mise à jour, donc on
       n'attache jamais d'écouteur sur son contenu. */
    document.addEventListener('click', function (e) {
      var openBtn = e.target.closest('[data-cart-open]');
      if (openBtn && CFG.cartDrawer !== false) {
        e.preventDefault();
        Cart.open();
        return;
      }

      if (e.target.closest('[data-cart-close]') || e.target.closest('[data-cart-scrim]')) {
        var link = e.target.closest('a[data-cart-close]');
        Cart.close();
        if (!link) e.preventDefault();
        return;
      }

      var qtyBtn = e.target.closest('[data-cart-qty]');
      if (qtyBtn) {
        e.preventDefault();
        Cart.change(Number(qtyBtn.dataset.line), Number(qtyBtn.dataset.cartQty));
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') Cart.close();
    });

    /* Ajout au panier : on intercepte le POST natif du formulaire produit. */
    document.addEventListener('submit', function (e) {
      var form = e.target.closest('form[action*="/cart/add"]');
      if (!form || CFG.cartDrawer === false) return;
      e.preventDefault();
      var btn = form.querySelector('[data-add]');
      if (btn) btn.setAttribute('aria-busy', 'true');
      Cart.add(new FormData(form))
        .catch(function (err) { console.error('[proof] add to cart', err); })
        .then(function () { if (btn) btn.removeAttribute('aria-busy'); });
    });
  }

  /* ---------- FICHE PRODUIT ----------------------------------------- */
  function initProduct() {
    var form = $('#product-form');

    /* Galerie : crossfade entre les vues */
    var stage = $('.pdpg__stage');
    if (stage) {
      var slides = $$('.pdpg__slide', stage);
      $$('[data-pdpg-thumb]').forEach(function (thumb) {
        thumb.addEventListener('click', function () {
          var idx = Number(thumb.dataset.pdpgThumb);
          slides.forEach(function (s, i) {
            s.classList.toggle('is-active', i === idx);
            if (i === idx) s.removeAttribute('aria-hidden');
            else s.setAttribute('aria-hidden', 'true');
          });
          $$('[data-pdpg-thumb]').forEach(function (t, i) {
            t.classList.toggle('is-active', i === idx);
            t.setAttribute('aria-selected', i === idx ? 'true' : 'false');
          });
        });
      });
    }

    if (!form) return;

    var qtyInput = $('[data-qty-input]', form);
    var addBtn = $('[data-add]', form);

    function currentPrice() {
      var checked = form.querySelector('input[name="id"]:checked');
      var pack = checked && checked.closest('[data-pack]');
      if (pack) return Number(pack.dataset.price);
      var first = $('[data-pack]');
      return first ? Number(first.dataset.price) : null;
    }

    function render() {
      var unit = currentPrice();
      var qty = Math.max(1, Number(qtyInput && qtyInput.value) || 1);
      if (unit == null) return;

      $$('[data-price]').forEach(function (el) { el.textContent = formatMoney(unit); });
      var installment = $('[data-installment]');
      if (installment) installment.textContent = formatMoney(Math.round(unit / 4));

      var cta = addBtn ? addBtn.dataset.cta : '';
      $$('[data-add-label]').forEach(function (el) {
        el.textContent = cta + ' · ' + formatMoney(unit * qty);
      });
    }

    /* Conditionnement : les radios s'appellent `id`, donc la sélection
       part nativement au panier même sans JavaScript. */
    $$('[data-pack]').forEach(function (pack) {
      var input = pack.querySelector('input[name="id"]');
      if (!input) return;
      input.addEventListener('change', function () {
        $$('[data-pack]').forEach(function (p) { p.classList.remove('is-on'); });
        pack.classList.add('is-on');
        var note = $('[data-pack-note]');
        if (note) note.textContent = pack.dataset.note || '';
        render();
      });
    });

    /* Quantité */
    $$('[data-qty-step]', form).forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (!qtyInput) return;
        var next = (Number(qtyInput.value) || 1) + Number(btn.dataset.qtyStep);
        qtyInput.value = Math.min(99, Math.max(1, next));
        render();
      });
    });
    if (qtyInput) qtyInput.addEventListener('change', render);

    /* Barre d'achat collante : visible dès que le CTA sort du cadre */
    var bar = $('[data-buybar]');
    if (bar && addBtn) {
      new IntersectionObserver(
        function (entries) {
          var entry = entries[0];
          var show = !entry.isIntersecting && entry.boundingClientRect.top < 0;
          bar.classList.toggle('is-visible', show);
          bar.setAttribute('aria-hidden', show ? 'false' : 'true');
        },
        { threshold: 0 }
      ).observe(addBtn);

      var barAdd = $('[data-buybar-add]');
      if (barAdd) {
        barAdd.addEventListener('click', function () {
          if (typeof form.requestSubmit === 'function') form.requestSubmit();
          else form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        });
      }
    }

    render();
  }

  /* ---------- DEEP MATRIX : fondu en boucle -------------------------- */
  function initTechReveal() {
    var over = $('.tech__over');
    if (!over || reduced) return;
    var dwell = Number(over.dataset.dwell) || 5000;
    setInterval(function () { over.classList.toggle('is-active'); }, dwell);
  }

  /* ---------- STEPPER DU RITUEL -------------------------------------- */
  function initRitual() {
    var steps = $$('.rstep');
    if (!steps.length) return;
    var medias = $$('.ritual__media, .ritual__mobile-media');
    var inBand = new Set();

    function activate(idx) {
      steps.forEach(function (s, i) { s.classList.toggle('is-active', i === idx); });
      medias.forEach(function (media) {
        $$('img', media).forEach(function (img, i) {
          img.classList.toggle('is-active', i === idx);
        });
      });
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var idx = steps.indexOf(entry.target);
          if (idx < 0) return;
          if (entry.isIntersecting) inBand.add(idx);
          else inBand.delete(idx);
        });
        if (inBand.size) activate(Math.min.apply(null, Array.from(inBand)));
      },
      { rootMargin: '-42% 0px -42% 0px', threshold: 0 }
    );
    steps.forEach(function (s, i) {
      io.observe(s);
      s.addEventListener('click', function () { activate(i); });
    });
  }

  /* ---------- ONGLETS (résultats d'étude) ---------------------------- */
  function initTabs() {
    $$('[data-tabs]').forEach(function (group) {
      var tabs = $$('[data-tab]', group);
      var panels = $$('[data-panel]', group);
      tabs.forEach(function (tab, i) {
        tab.addEventListener('click', function () {
          tabs.forEach(function (t, j) {
            t.classList.toggle('is-on', i === j);
            t.setAttribute('aria-selected', i === j ? 'true' : 'false');
          });
          panels.forEach(function (p, j) { p.hidden = i !== j; });
        });
      });
    });
  }

  /* ---------- FILMSTRIP (routine) ------------------------------------ */
  function initRail() {
    $$('[data-rail]').forEach(function (rail) {
      var track = $('[data-rail-track]', rail);
      if (!track) return;
      var update = function () {
        rail.classList.toggle('is-start', track.scrollLeft < 8);
        rail.classList.toggle(
          'is-end',
          track.scrollLeft + track.clientWidth >= track.scrollWidth - 8
        );
      };
      $$('[data-rail-step]', rail).forEach(function (btn) {
        btn.addEventListener('click', function () {
          track.scrollBy({
            left: Number(btn.dataset.railStep) * track.clientWidth * 0.8,
            behavior: reduced ? 'auto' : 'smooth'
          });
        });
      });
      track.addEventListener('scroll', update, { passive: true });
      update();
    });
  }

  /* ---------- MODALE (story) ----------------------------------------- */
  function initDialog() {
    $$('[data-dialog-open]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var dlg = document.getElementById(btn.dataset.dialogOpen);
        if (dlg && typeof dlg.showModal === 'function') dlg.showModal();
      });
    });
    $$('[data-dialog-close]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var dlg = btn.closest('dialog');
        if (dlg) dlg.close();
      });
    });
  }

  /* ---------- Démarrage ---------------------------------------------- */
  function boot() {
    initFx();
    initCart();
    initProduct();
    initTechReveal();
    initRitual();
    initTabs();
    initRail();
    initDialog();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  /* Le theme editor recharge les sections à chaud : on relance le moteur. */
  document.addEventListener('shopify:section:load', boot);
})();
