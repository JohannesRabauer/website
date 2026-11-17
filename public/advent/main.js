// AI Advent Calendar 2026: doors, countdown, sound, snow and the scroll story.
// Everything readable works without this file; it only adds motion and convenience.
(() => {
  'use strict';
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const root = document.documentElement;
  // Nothing is stored in the browser (no cookies, no localStorage): every visit looks the same.

  // ---------- motion preference ----------
  const reduceQuery = matchMedia('(prefers-reduced-motion: reduce)');
  const motionOn = () => root.dataset.motion ? root.dataset.motion === 'on' : !reduceQuery.matches;
  const motionBtn = $('#motion-toggle');
  function paintMotion() {
    const on = motionOn();
    motionBtn.setAttribute('aria-pressed', String(on));
    motionBtn.querySelector('b').textContent = on ? 'on' : 'off';
  }
  motionBtn.addEventListener('click', () => {
    const on = !motionOn();
    root.dataset.motion = on ? 'on' : 'off'; // for this visit only
    paintMotion();
    on ? startMotion() : stopMotion();
  });
  reduceQuery.addEventListener?.('change', () => { if (!root.dataset.motion) { paintMotion(); motionOn() ? startMotion() : stopMotion(); } });
  paintMotion();

  // ---------- sound (opt-in, synthesised, no files) ----------
  let soundOn = false;
  let audio;
  const soundBtn = $('#sound-toggle');
  soundBtn.addEventListener('click', () => {
    soundOn = !soundOn;
    soundBtn.setAttribute('aria-pressed', String(soundOn));
    soundBtn.querySelector('b').textContent = soundOn ? 'on' : 'off';
    if (soundOn) chime(0.5);
  });
  // A small bell: a few inharmonic partials with a fast attack and a long decay.
  function chime(gain = 1) {
    if (!soundOn) return;
    audio ||= new (window.AudioContext || window.webkitAudioContext)();
    const t = audio.currentTime;
    const out = audio.createGain();
    out.gain.value = 0.18 * gain;
    out.connect(audio.destination);
    [[1318.5, 1, 1.8], [2637, 0.45, 1.1], [3561, 0.25, 0.7], [4776, 0.12, 0.45], [1975.5, 0.3, 1.4]].forEach(([f, a, d], i) => {
      [0, 0.32].forEach((offset, k) => {
        const o = audio.createOscillator();
        const g = audio.createGain();
        o.type = 'sine';
        o.frequency.value = f * (k ? 1.335 : 1); // second strike a fourth higher
        g.gain.setValueAtTime(0.0001, t + offset);
        g.gain.exponentialRampToValueAtTime(a * (k ? 0.7 : 1), t + offset + 0.006);
        g.gain.exponentialRampToValueAtTime(0.0001, t + offset + d);
        o.connect(g).connect(out);
        o.start(t + offset);
        o.stop(t + offset + d + 0.05);
      });
    });
  }

  // ---------- countdown ----------
  const counters = $$('.countdown[data-next]');
  if (counters.length) {
    const target = Date.parse(counters[0].dataset.next);
    const tick = () => {
      const ms = target - Date.now();
      for (const c of counters) {
        const t = $('.cd-time', c);
        if (ms <= 0) {
          $('.cd-label', c).textContent = `Door ${c.dataset.door} is open.`;
          t.innerHTML = '<a href="">Reload the page</a>';
          continue;
        }
        const s = Math.floor(ms / 1000);
        const d = Math.floor(s / 86400), h = Math.floor(s / 3600) % 24, m = Math.floor(s / 60) % 60, sec = s % 60;
        const p = (n) => String(n).padStart(2, '0');
        t.textContent = d > 0 ? `${d}d ${p(h)}h ${p(m)}m` : `${p(h)}:${p(m)}:${p(sec)}`;
      }
      if (ms > 0) setTimeout(tick, 1000 - (Date.now() % 1000));
    };
    tick();
  }

  // ---------- doors ----------
  const dialog = $('#door-dialog');
  const body = $('#dlg-body');
  const paper = $('#dlg-paper');
  let lastTrigger = null;

  function showDoor(n, trigger) {
    const tpl = document.getElementById(`door-tpl-${n}`);
    if (!tpl) return;
    body.replaceChildren(tpl.content.cloneNode(true));
    lastTrigger = trigger || null;
    if (!dialog.open) dialog.showModal();
    paper.scrollTop = 0; // the dialog is reused: always start at the top of the new door
    $('#dlg-close').focus({ preventScroll: true });
    // The address bar shows the door's short link (rabauer.dev/advent-1/), ready to share.
    history.replaceState(null, '', doorPath(n) + location.search);
  }
  // The calendar's own folder (from <base>, e.g. /advent/) and a door's short link next to it.
  const home = new URL(document.baseURI).pathname;
  const doorPath = (n) => `${home.replace(/\/$/, '')}-${n}/`;
  function openDoor(n, trigger) {
    const li = $(`.door-btn[data-door="${n}"]`)?.closest('.door');
    chime();
    if (li && motionOn() && trigger?.classList.contains('door-btn')) {
      // The door swings wide for a moment, then the dialog opens. Nothing is remembered.
      li.classList.add('is-swinging');
      setTimeout(() => { showDoor(n, trigger); setTimeout(() => li.classList.remove('is-swinging'), 300); }, 420);
    } else {
      showDoor(n, trigger);
    }
  }
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-door]');
    if (b) openDoor(b.dataset.door, b);
    const c = e.target.closest('.copy');
    if (c) copy(c);
    const sh = e.target.closest('.share');
    if (sh) share(sh);
  });
  // Closing a door brings the address bar back to the calendar (/advent/).
  const leaveDoor = () => history.replaceState(null, '', home + location.search);
  const closeDoor = () => { dialog.close(); leaveDoor(); };
  $('#dlg-close').addEventListener('click', closeDoor);
  dialog.addEventListener('click', (e) => { if (e.target === dialog) closeDoor(); });
  dialog.addEventListener('close', () => {
    leaveDoor();
    lastTrigger?.focus();
  });
  // A door page (advent-1/) opens its door on arrival; old #door-1 links still work too.
  const fromUrl = () => {
    const m = location.hash.match(/^#door-(\d{1,2})$/);
    const n = m ? +m[1] : +document.body.dataset.startDoor || 0;
    if (n && document.getElementById(`door-tpl-${n}`)) showDoor(n, $(`.door-btn[data-door="${n}"]`));
  };
  fromUrl();
  // <base> points at the calendar's folder, so in-page links (#doors) would leave a door page:
  // scroll to them here instead.
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    const target = a && document.getElementById(a.getAttribute('href').slice(1));
    if (!target) return;
    e.preventDefault();
    if (dialog.open) closeDoor();
    target.scrollIntoView({ behavior: motionOn() ? 'smooth' : 'auto' });
    if (target.tabIndex >= 0 || target.hasAttribute('tabindex')) target.focus({ preventScroll: true });
  });

  async function copy(btn) {
    const text = btn.dataset.copy;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = Object.assign(document.createElement('textarea'), { value: text });
      document.body.append(ta); ta.select(); document.execCommand('copy'); ta.remove();
    }
    const label = btn.firstChild;
    label.textContent = 'Copied';
    btn.classList.add('copied');
    setTimeout(() => { label.textContent = 'Copy'; btn.classList.remove('copied'); }, 1800);
  }

  // Share a door: the system share sheet where there is one, otherwise copy the link.
  async function share(btn) {
    const url = btn.dataset.share;
    if (navigator.share) {
      try { await navigator.share({ title: btn.dataset.title, url }); return; } catch (err) { if (err.name === 'AbortError') return; }
    }
    try { await navigator.clipboard.writeText(url); } catch { /* fall through to the label */ }
    const was = btn.textContent;
    btn.textContent = 'Link copied';
    setTimeout(() => { btn.textContent = was; }, 1800);
  }

  // ---------- easter eggs ----------
  const santa = $('#egg-santa');
  const bubble = $('#egg-santa-bubble');
  const santaLines = [
    'Excuse me, is this the North Pole office? No? Wrong building again.',
    'My map says “workshop, third hill on the left”. Which left?',
    'Tell the Christkind I said hello. I have never met them either.',
  ];
  let santaI = 0;
  santa.addEventListener('click', () => {
    bubble.textContent = santaLines[santaI++ % santaLines.length];
    bubble.hidden = false;
    clearTimeout(santa._t);
    santa._t = setTimeout(() => { bubble.hidden = true; }, 6000);
  });
  // Type "done" anywhere: the Wichtel pops up, a little too proud.
  const pop = $('#wichtel-pop');
  let typed = '';
  document.addEventListener('keydown', (e) => {
    if (e.target.closest('input, textarea, [contenteditable]') || e.key.length !== 1) return;
    typed = (typed + e.key.toLowerCase()).slice(-4);
    if (typed === 'done') {
      pop.classList.add('show');
      chime(0.4);
      setTimeout(() => pop.classList.remove('show'), 3500);
    }
  });
  $('#ring-bell')?.addEventListener('click', () => {
    const was = soundOn;
    soundOn = true; chime(); soundOn = was;
    if (motionOn() && window.gsap) gsap.fromTo('.finale-art', { rotate: -14 }, { rotate: 0, duration: 1.6, ease: 'elastic.out(1, 0.25)' });
  });

  // ---------- snow ----------
  const canvas = $('#snow');
  let snowRaf = 0, snowVisible = true, flakes = [];
  function snowStart() {
    if (!canvas || snowRaf) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const size = () => {
      canvas.width = canvas.clientWidth * dpr; canvas.height = canvas.clientHeight * dpr;
      const count = Math.round(Math.min(140, (canvas.clientWidth * canvas.clientHeight) / 9000));
      flakes = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        r: (Math.random() * 1.8 + 0.6) * dpr, s: (Math.random() * 0.5 + 0.25) * dpr, w: Math.random() * Math.PI * 2,
      }));
    };
    size();
    addEventListener('resize', size, { passive: true });
    const draw = () => {
      snowRaf = requestAnimationFrame(draw);
      if (!snowVisible) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(244,239,228,.85)';
      ctx.beginPath();
      for (const f of flakes) {
        f.y += f.s; f.w += 0.01; f.x += Math.sin(f.w) * 0.3 * dpr;
        if (f.y > canvas.height + 4) { f.y = -4; f.x = Math.random() * canvas.width; }
        ctx.moveTo(f.x + f.r, f.y); ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      }
      ctx.fill();
    };
    draw();
  }
  function snowStop() {
    cancelAnimationFrame(snowRaf); snowRaf = 0;
    canvas?.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  }
  if (canvas && 'IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => { snowVisible = e.isIntersecting; }).observe(canvas);
  }
  document.addEventListener('visibilitychange', () => { snowVisible = !document.hidden; });

  // ---------- scroll story (GSAP, only with motion on) ----------
  let gsapReady = null, ctx = null, mm = null;
  const load = (src) => new Promise((res, rej) => {
    const s = Object.assign(document.createElement('script'), { src, onload: res, onerror: rej });
    document.head.append(s);
  });
  function loadGsap() {
    gsapReady ||= load('vendor/gsap.min.js').then(() => load('vendor/ScrollTrigger.min.js')).then(() => gsap.registerPlugin(ScrollTrigger));
    return gsapReady;
  }

  function story() {
    // Hero parallax: back layers move slower than the front.
    [['.layer-sky', 6], ['.layer-village', 14], ['.layer-workshop', 26], ['.hero-copy', 18]].forEach(([sel, y]) => {
      gsap.to(sel, { yPercent: y, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.5 } });
    });
    gsap.to('.scroll-cue', { opacity: 0, scrollTrigger: { trigger: '.hero', start: 'top top', end: '15% top', scrub: true } });

    // The chime: one pinned beat on wider screens, a simple reveal on phones.
    mm.add('(min-width: 800px)', () => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: '.chime', start: 'top top', end: '+=120%', scrub: 1, pin: '.chime-pin' } });
      tl.from('.chime-art', { scale: 0.82, opacity: 0.2, duration: 1 })
        .from('.chime-copy .kicker, .chime-copy h2', { opacity: 0, y: 16, stagger: 0.1, duration: 0.4 }, 0.3)
        .from('.chime .beat', { opacity: 0, y: 16, stagger: 0.45, duration: 0.5 }, 0.6);
    });
    mm.add('(max-width: 799px)', () => {
      gsap.from('.chime-art, .chime-copy > *', { opacity: 0, y: 16, stagger: 0.12, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: '.chime', start: 'top 75%' } });
    });

    // Reveals for headings, cast cards, chapter art.
    ScrollTrigger.batch('.reveal', {
      start: 'top 88%',
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 14 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out', overwrite: true }),
    });
    // Notes drop in like paper.
    $$('.notes').forEach((list) => {
      gsap.from($$('.note', list), { opacity: 0, y: 24, rotate: (i) => (i % 2 ? 2 : -2), stagger: 0.07, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: list, start: 'top 85%' } });
    });
    // The wall: doors pop in with a small scale. Never from opacity 0: the doors must always be visible.
    gsap.from('.door', { scale: 0.92, duration: 0.45, ease: 'back.out(1.6)', stagger: { each: 0.02, from: 'random' }, scrollTrigger: { trigger: '.wall', start: 'top 85%' } });
    // Chapter art drifts a little against the scroll.
    $$('.chapter-art').forEach((el) => gsap.fromTo(el, { yPercent: 6 }, { yPercent: -6, ease: 'none', scrollTrigger: { trigger: el, scrub: 0.5 } }));
    // Small character loops, paused when off screen.
    const loop = (sel, vars) => {
      const t = gsap.to(sel, { ...vars, repeat: -1, yoyo: true, ease: 'sine.inOut', paused: true });
      ScrollTrigger.create({ trigger: sel, onToggle: (s) => (s.isActive ? t.play() : t.pause()) });
    };
    loop('.cast-wichtel .art', { y: -6, rotate: 1.5, duration: 0.35 });
    loop('.wichtel-says', { scale: 1.08, duration: 0.6 });
    loop('.cast-gremlin .art', { x: 6, duration: 1.6 });
    loop('.finale-art', { rotate: 5, duration: 1.4 });
    // Week 3 is a little colder: the sky dims as you read it.
    gsap.fromTo('.week-3 .chapter-sky', { opacity: 0.5 }, { opacity: 1, ease: 'none', scrollTrigger: { trigger: '.week-3', start: 'top bottom', end: 'center center', scrub: true } });
    ScrollTrigger.refresh();
  }

  function startMotion() {
    snowStart();
    loadGsap().then(() => {
      if (!motionOn()) return;
      ctx?.revert(); mm?.revert();
      mm = gsap.matchMedia();
      ctx = gsap.context(story);
    }).catch(() => { /* motion is optional */ });
  }
  function stopMotion() {
    snowStop();
    ctx?.revert(); mm?.revert(); ctx = null; mm = null;
  }
  if (motionOn()) startMotion();
})();
