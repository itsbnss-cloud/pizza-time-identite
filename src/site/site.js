// Interactions du site de présentation Pizza Time (sans dépendance).
(() => {
  const doc = document.documentElement;
  doc.classList.add('js');
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Apparition au défilement
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach((el) => io.observe(el));
  } else reveals.forEach((el) => el.classList.add('is-in'));

  // Barre : visible après l'ouverture ; section courante
  const bar = $('#barre');
  const hero = $('#ouverture');
  const onScroll = () => bar.classList.toggle('is-visible', window.scrollY > hero.offsetHeight * 0.6);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  const links = $$('.bar__nav a');
  const targets = links.map((a) => $(a.getAttribute('href')));
  if ('IntersectionObserver' in window) {
    const so = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((a) => a.removeAttribute('aria-current'));
      const i = targets.indexOf(e.target);
      if (i > -1) links[i].setAttribute('aria-current', 'true');
    }), { rootMargin: '-45% 0px -50% 0px' });
    targets.forEach((t) => t && so.observe(t));
  }

  // Menu mobile
  const menuBtn = $('.bar__menu');
  const nav = $('#nav');
  const closeMenu = () => { nav.classList.remove('is-open'); menuBtn.setAttribute('aria-expanded', 'false'); };
  menuBtn.addEventListener('click', () => {
    const open = !nav.classList.contains('is-open');
    nav.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    if (open) links[0].focus();
  });
  links.forEach((a) => a.addEventListener('click', closeMenu));
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && nav.classList.contains('is-open')) { closeMenu(); menuBtn.focus(); } });

  // Comparaison avant / après
  $$('[data-compare]').forEach((box) => {
    const frame = $('.compare__frame', box);
    const range = $('[data-compare-range]', box);
    const set = (v) => { frame.style.setProperty('--pos', v + '%'); range.value = v; };
    range.addEventListener('input', () => set(range.value));
    let drag = false;
    const fromEvent = (e) => {
      const r = frame.getBoundingClientRect();
      set(Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100)).toFixed(1));
    };
    frame.addEventListener('pointerdown', (e) => { drag = true; frame.setPointerCapture(e.pointerId); fromEvent(e); });
    frame.addEventListener('pointermove', (e) => drag && fromEvent(e));
    frame.addEventListener('pointerup', () => { drag = false; });
    set(50);
  });

  // Versions horizontales
  $$('[data-horiz]').forEach((box) => {
    const stage = $('[data-horiz-stage]', box);
    const imgs = $$('.horiz-img', stage);
    const sw = $$('.swatch', box);
    const pick = (btn, focus) => {
      sw.forEach((b) => { b.setAttribute('aria-checked', String(b === btn)); b.tabIndex = b === btn ? 0 : -1; });
      imgs.forEach((im, i) => im.classList.toggle('is-on', String(i) === btn.dataset.i));
      stage.style.setProperty('--bg', `var(--${btn.dataset.bg})`);
      $('[data-horiz-label]', box).textContent = btn.dataset.label;
      $('[data-horiz-role]', box).textContent = btn.dataset.role;
      $('[data-horiz-usage]', box).textContent = btn.dataset.usage;
      $('[data-horiz-grounds]', box).textContent = btn.dataset.grounds;
      const svg = $('[data-horiz-svg]', box), png = $('[data-horiz-png]', box);
      svg.href = btn.dataset.svg; svg.setAttribute('download', btn.dataset.svg.split('/').pop());
      png.href = btn.dataset.png; png.setAttribute('download', btn.dataset.png.split('/').pop());
      if (focus) btn.focus();
    };
    sw.forEach((b, i) => {
      b.tabIndex = i === 0 ? 0 : -1;
      b.addEventListener('click', () => pick(b));
      b.addEventListener('keydown', (e) => {
        const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
        if (!d) return;
        e.preventDefault();
        pick(sw[(i + d + sw.length) % sw.length], true);
      });
    });
    pick(sw[0]);
  });

  // Logos sur les fonds
  $$('[data-grounds-box]').forEach((box) => {
    const sel = $('[data-grounds-select]', box);
    const update = () => {
      const opt = sel.selectedOptions[0];
      const ok = opt.dataset.grounds.split(' ');
      $$('[data-ground]', box).forEach((g) => {
        const yes = ok.includes(g.dataset.ground);
        g.classList.toggle('is-no', !yes);
        const im = $('img', g);
        im.src = opt.dataset.src;
        im.alt = `${opt.textContent} sur fond ${$('figcaption span', g).textContent.toLowerCase()}`;
        $('[data-flag]', g).textContent = yes ? 'Recommandé' : 'Déconseillé';
      });
    };
    sel.addEventListener('change', update);
    update();
  });

  // Pictogrammes : coloris
  $$('[data-icons]').forEach((box) => {
    const grid = $('[data-icons-grid]', box);
    const btns = $$('.way', box);
    btns.forEach((b, i) => b.addEventListener('click', () => {
      btns.forEach((x) => x.setAttribute('aria-checked', String(x === b)));
      grid.style.setProperty('--bg', `var(--${b.dataset.bg})`);
      $$('.icon', grid).forEach((im) => {
        const on = im.dataset.way === b.dataset.way;
        im.classList.toggle('is-on', on);
        im.alt = on ? im.closest('li').querySelector('span').textContent : '';
      });
    }));
  });

  // Copie des codes couleur
  const toast = $('[data-toast]');
  let tt;
  const say = (msg) => { toast.textContent = msg; toast.classList.add('is-on'); clearTimeout(tt); tt = setTimeout(() => toast.classList.remove('is-on'), 1800); };
  const copyText = async (text) => {
    try { await navigator.clipboard.writeText(text); return true; } catch {
      const ta = Object.assign(document.createElement('textarea'), { value: text });
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.append(ta); ta.select();
      const ok = document.execCommand('copy'); ta.remove(); return ok;
    }
  };
  $$('[data-copy]').forEach((b) => b.addEventListener('click', async () => {
    const ok = await copyText(b.dataset.copy);
    if (ok) { b.classList.add('is-copied'); setTimeout(() => b.classList.remove('is-copied'), 1600); say(`${b.dataset.copy} copié`); }
    else say('Copie impossible : sélectionnez la valeur manuellement');
  }));

  // Testeur typographique
  const tester = $('[data-tester]');
  if (tester) tester.addEventListener('input', () => {
    const v = tester.value.trim() || 'Pizza Time';
    $$('[data-tester-text]').forEach((s) => { s.textContent = v; });
  });
})();
