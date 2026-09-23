/* 3P's Produções — interações */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const WA = '5521979223500';

  /* ---------------- dados ---------------- */
  const VIDEOS = [
    { id: 'J2Myn5_Ot88', t: 'Reels premium · Dra. Silvia Bretz', c: 'redes', v: true, feature: true },
    { id: 'QuIKmVMKgBY', t: 'Aftermovie · Integral Médica', c: 'eventos' },
    { id: 'YTT7JiTkgVI', t: 'Reels dinâmico · médico', c: 'redes', v: true },
    { id: '73AaKkBId6c', t: 'Filme institucional · Tree Intelligence', c: 'institucional' },
    { id: 'qcC0ONycFMU', t: 'Aftermovie · Smart Fit Praia do Flamengo', c: 'eventos' },
    { id: 'EYldMMQJSOI', t: 'Reels · Rodolfo Peres, Integral Médica', c: 'redes' },
    { id: 'F7gQcJjHaaA', t: 'Palestra · advogada Amanda Abou', c: 'palestras' },
    { id: '4V6Er4lU7Es', t: 'Curso online · Mulheres da Lei', c: 'cursos' },
    { id: 'GIixPEVeirw', t: 'Aftermovie · Rexya Conecta', c: 'eventos' },
    { id: 'qNbDFnVk_7U', t: 'Reels · Dr. Bragança, Integral Médica', c: 'redes' },
    { id: 'fsJEGUlxEYM', t: 'Videoclipe com IA · Mesmo no Vale há Vida', c: 'institucional' },
    { id: 'jJBAiHOzcqU', t: 'Evento de colaboradores · Smart Fit', c: 'eventos' },
    { id: 'KfKvsd7IzJw', t: 'Curso online · O Outro Lado da Bíblia', c: 'cursos' },
    { id: 'VlIFypQdP6I', t: 'Palestra · advogada Caroline Andrioli', c: 'palestras' },
    { id: 'P0aTGN6WkKo', t: 'Posicionamento · corretor de imóveis', c: 'redes' },
    { id: 'AjMUTQatoIw', t: 'Premiação dos colaboradores · Smart Fit', c: 'eventos' },
    { id: 'e1fGX7uMWVo', t: 'Treinamento · micropigmentação labial', c: 'cursos' },
    { id: 'BqqCMzVwD1s', t: 'Cobertura de evento · ANB Saúde', c: 'eventos' },
    { id: 'KLHUi5u3RAQ', t: 'Depoimento · Rexya Conecta', c: 'eventos' },
    { id: 'GKpz0rkjg6E', t: 'Ação promocional · Smart Fit', c: 'eventos' },
    { id: 'CkoStAs9m0I', t: 'Com direção: a diferença no resultado', c: 'redes' },
  ];
  const VCATS = { todos: 'Todos', redes: 'Redes sociais', eventos: 'Eventos', palestras: 'Palestras', cursos: 'Cursos', institucional: 'Institucional' };

  /* Galeria: grupo Pessoas (5 abas) + Gastronomia + Arquitetura.
     Para acrescentar fotos, salve em assets/photos/ e assets/thumbs/ como <categoria>-NN.webp e aumente o número abaixo. */
  const PHOTO_CATS = {
    estudio: { label: 'Estúdio', n: 12, group: 'Pessoas', alt: 'Retrato em estúdio' },
    prof: { label: 'Profissões', n: 12, group: 'Pessoas', alt: 'Profissional no ambiente de trabalho' },
    casuais: { label: 'Casuais', n: 12, group: 'Pessoas', alt: 'Ensaio fotográfico casual' },
    familia: { label: 'Família', n: 12, group: 'Pessoas', alt: 'Ensaio de família' },
    gestantes: { label: 'Gestantes', n: 12, group: 'Pessoas', alt: 'Ensaio gestante' },
    gastronomia: { label: 'Gastronomia', n: 12, alt: 'Fotografia de gastronomia' },
    arquitetura: { label: 'Arquitetura', n: 12, alt: 'Fotografia de arquitetura e interiores' },
  };
  const photos = cat => Array.from({ length: PHOTO_CATS[cat].n }, (_, i) => ({ n: `${cat}-${String(i + 1).padStart(2, '0')}` }));

  /* ---------------- whatsapp ---------------- */
  $$('[data-wa]').forEach(a => {
    a.href = `https://wa.me/${WA}?text=${encodeURIComponent(a.dataset.wa)}`;
    a.target = '_blank'; a.rel = 'noopener';
  });
  const yr = $('[data-year]'); if (yr) yr.textContent = new Date().getFullYear();

  /* ---------------- loader ---------------- */
  const done = () => root.classList.add('loaded');
  if (reduce) done(); else {
    window.addEventListener('load', () => setTimeout(done, 350));
    setTimeout(done, 2200); // nunca prende o visitante
  }

  /* ---------------- hero: reels, nenhum repetido ----------------
     yt: ID do YouTube (toca um trecho sem som) · local: arquivo em assets/reels/ */
  const reel = $('[data-reel]');
  if (reel) {
    const T = {
      yt: (id, a = 2, b = 17) => `<div class="reel-tile" data-ytbg="${id}:${a}:${b}"><img data-ytthumb="${id}" data-short alt=""></div>`,
      local: n => `<div class="reel-tile"><video src="assets/reels/${n}.mp4" poster="assets/reels/${n}.jpg" muted loop playsinline preload="none" data-auto></video></div>`,
    };
    // Cada vídeo aparece uma vez só; a distribuição em colunas se adapta à largura da tela.
    const CLIPS = ['angela', 'estudio-3', 'drive-01', 'estudio-1', 'jp', 'estudio-4', 'estudio-7', 'estudio-5', 'estudio-6', 'estudio-2'];
    const buildReel = () => {
      const n = matchMedia('(max-width: 900px)').matches ? 2 : 3;
      if (reel.dataset.cols == n) return;
      reel.dataset.cols = n;
      const cols = Array.from({ length: n }, () => []);
      CLIPS.forEach((c, i) => cols[i % n].push(T.local(c)));
      reel.innerHTML = cols.map(c => `<div class="reel-col">${c.join('')}</div>`).join('');
      $$('video[data-auto]', reel).forEach(v => window.__autoIO ? window.__autoIO.observe(v) : null);
    };
    buildReel();
    addEventListener('resize', () => { buildReel(); setShift(); });
    const setShift = () => $$('.reel-col', reel).forEach(c => c.style.setProperty('--shift', `${Math.max(0, c.scrollHeight - reel.clientHeight)}px`));
    setShift(); addEventListener('resize', setShift); addEventListener('load', setShift);
  }

  /* ---------------- vídeos que tocam só quando aparecem ---------------- */
  const autoIO = new IntersectionObserver(es => es.forEach(e => {
    const v = e.target;
    if (e.isIntersecting && !reduce) { if (v.preload === 'none') v.preload = 'auto'; v.play().catch(() => {}); }
    else v.pause();
  }), { threshold: 0.05 });
  window.__autoIO = autoIO;
  $$('video[data-auto]').forEach(v => autoIO.observe(v));

  /* ---------------- slideshow do card de fotografia ---------------- */
  $$('[data-slides]').forEach(box => {
    const imgs = $$('img', box); let k = 0; imgs[0].classList.add('on');
    if (!reduce && imgs.length > 1) setInterval(() => { imgs[k].classList.remove('on'); k = (k + 1) % imgs.length; imgs[k].classList.add('on'); }, 3200);
  });

  /* ---------------- capas do YouTube com reserva local ---------------- */
  const ytThumb = (img, id) => {
    const fallback = img.getAttribute('src');
    const tries = img.hasAttribute('data-short')
      ? [`https://i.ytimg.com/vi/${id}/oardefault.jpg`, `https://i.ytimg.com/vi/${id}/hqdefault.jpg`]
      : [`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`, `https://i.ytimg.com/vi/${id}/hqdefault.jpg`];
    const next = () => { const u = tries.shift(); if (u) img.src = u; else { img.onerror = img.onload = null; if (fallback) img.src = fallback; else img.parentElement.classList.add('noimg'); } };
    img.onerror = next;
    img.onload = () => { if (img.naturalWidth && img.naturalWidth < 200) next(); };
    next();
  };
  $$('img[data-ytthumb]').forEach(img => ytThumb(img, img.dataset.ytthumb));

  /* ---------------- vídeo do YouTube tocando no fundo do card ----------------
     data-ytbg="ID:início:fim,ID:início:fim" — trechos em segundos, tocam em sequência e repetem. */
  let apiReady = null;
  const loadAPI = () => apiReady || (apiReady = new Promise(res => {
    if (window.YT && window.YT.Player) return res();
    window.onYouTubeIframeAPIReady = res;
    const s = document.createElement('script'); s.src = 'https://www.youtube.com/iframe_api'; document.head.append(s);
  }));
  const ytBoxes = $$('[data-ytbg]');
  if (ytBoxes.length && !reduce) {
    const start = box => {
      if (box._yt) { box._yt.playVideo?.(); return; }
      const segs = box.dataset.ytbg.split(',').map(s => { const [id, a, b] = s.split(':'); return { videoId: id, startSeconds: +a || 0, endSeconds: +b || undefined }; });
      let k = 0;
      const holder = document.createElement('div'); holder.className = 'ytbg'; const inner = document.createElement('div'); holder.append(inner); box.append(holder);
      loadAPI().then(() => {
        box._yt = new YT.Player(inner, {
          host: 'https://www.youtube-nocookie.com', videoId: segs[0].videoId,
          playerVars: { autoplay: 1, mute: 1, controls: 0, disablekb: 1, fs: 0, iv_load_policy: 3, modestbranding: 1, playsinline: 1, rel: 0, start: segs[0].startSeconds, end: segs[0].endSeconds },
          events: {
            onReady: e => { e.target.mute(); if (box._visible) e.target.playVideo(); },
            onStateChange: e => {
              if (e.data === YT.PlayerState.PLAYING) box.classList.add('ytbg-on');
              if (e.data === YT.PlayerState.ENDED) { k = (k + 1) % segs.length; e.target.loadVideoById(segs[k]); }
            },
          },
        });
      });
    };
    const ytIO = new IntersectionObserver(es => es.forEach(e => {
      const box = e.target; box._visible = e.isIntersecting;
      if (e.isIntersecting) setTimeout(() => box._visible && start(box), (ytBoxes.indexOf(box) % 6) * 400); else box._yt?.pauseVideo?.();
    }), { threshold: 0.2 });
    ytBoxes.forEach(b => ytIO.observe(b));
  }

  /* ---------------- marcas: duplica a fila para o loop não ter emenda ---------------- */
  $$('.brands__row').forEach(r => { [...r.children].forEach(li => { const c = li.cloneNode(true); c.setAttribute('aria-hidden', 'true'); r.append(c); }); });

  /* ---------------- botão de som do vídeo do estúdio ---------------- */
  $$('[data-sound]').forEach(b => b.addEventListener('click', () => {
    const v = b.parentElement.querySelector('video'); if (!v) return;
    v.muted = !v.muted; if (!v.muted) { v.currentTime = 0; v.play().catch(() => {}); }
    b.setAttribute('aria-pressed', String(!v.muted));
    b.setAttribute('aria-label', v.muted ? 'Ativar som' : 'Desativar som');
    b.querySelector('span').textContent = v.muted ? 'Ouvir' : 'Silenciar';
  }));

  /* ---------------- timecode ---------------- */
  const tc = $('[data-timecode]');
  if (tc && !reduce) {
    const t0 = performance.now();
    const pad = n => String(n).padStart(2, '0');
    const tick = now => {
      const f = Math.floor((now - t0) / (1000 / 24));
      tc.textContent = `${pad(Math.floor(f / 86400))}:${pad(Math.floor(f / 1440) % 60)}:${pad(Math.floor(f / 24) % 60)}:${pad(f % 24)}`;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ---------------- header / menu ---------------- */
  const hdr = $('.hdr'), prog = $('.progress'), fab = $('.wa-fab');
  const burger = $('.burger');
  burger.addEventListener('click', () => {
    const open = root.classList.toggle('menu-open');
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  });
  $$('.mnav a').forEach(a => a.addEventListener('click', () => {
    root.classList.remove('menu-open'); burger.setAttribute('aria-expanded', false);
  }));

  /* nav ativa */
  const navLinks = $$('.nav a');
  const secObs = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) navLinks.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  navLinks.forEach(a => { const s = $(a.getAttribute('href')); if (s) secObs.observe(s); });

  /* ---------------- reveal ---------------- */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  $$('.rv, .rv-img').forEach(el => io.observe(el));

  /* ---------------- contadores ---------------- */
  const cio = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, end = +el.dataset.count, t0 = performance.now(), dur = reduce ? 1 : 1600;
    const step = now => {
      const p = Math.min(1, (now - t0) / dur), k = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.round(end * k).toLocaleString('pt-BR');
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step); cio.unobserve(el);
  }), { threshold: 0.6 });
  $$('[data-count]').forEach(el => cio.observe(el));

  /* ---------------- manifesto (palavras acendem) ---------------- */
  const scrub = $('[data-scrub]');
  let words = [];
  if (scrub) {
    const wrap = node => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) frag.append(part);
            else { const s = document.createElement('span'); s.className = 'w'; s.textContent = part; frag.append(s); }
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1) wrap(n);
      });
    };
    wrap(scrub);
    words = $$('.w', scrub);
  }

  /* ---------------- serviços: scroll horizontal ---------------- */
  const hs = $('[data-hs]'), track = $('[data-hs-track]'), hsBar = $('[data-hs-bar]'), hsNum = $('[data-hs-num]');
  const desktopHS = matchMedia('(min-width: 901px)');
  let hsDist = 0;
  const sizeHS = () => {
    if (!hs) return;
    if (desktopHS.matches) {
      hsDist = Math.max(0, track.scrollWidth - innerWidth);
      hs.style.height = `${innerHeight + hsDist}px`;
    } else { hs.style.height = ''; track.style.transform = ''; }
  };

  /* ---------------- parallax ---------------- */
  const par = $$('[data-speed]');

  /* ---------------- loop de scroll ---------------- */
  let lastY = scrollY, ticking = false;
  const onScroll = () => {
    const y = scrollY, H = document.documentElement.scrollHeight - innerHeight;
    prog.style.transform = `scaleX(${H > 0 ? y / H : 0})`;
    hdr.classList.toggle('is-scrolled', y > 40);
    hdr.classList.toggle('is-hidden', y > lastY && y > 400 && !root.classList.contains('menu-open'));
    fab.classList.toggle('on', y > innerHeight * .8);
    lastY = y;

    if (words.length && !reduce) {
      const r = scrub.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight * .85 - r.top) / (r.height + innerHeight * .35)));
      const lit = Math.floor(p * words.length * 1.05);
      words.forEach((w, i) => w.classList.toggle('on', i < lit));
    }

    if (hs && desktopHS.matches && hsDist) {
      const r = hs.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / (r.height - innerHeight)));
      track.style.transform = `translate3d(${-p * hsDist}px,0,0)`;
      hsBar.style.transform = `scaleX(${p})`;
      const n = track.children.length;
      hsNum.textContent = String(Math.min(n, 1 + Math.floor(p * n * .999))).padStart(2, '0');
    }

    if (!reduce) par.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > innerHeight + 200) return;
      const c = r.top + r.height / 2 - innerHeight / 2;
      el.style.translate = `0 ${c * +el.dataset.speed}px`;
    });
    ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  addEventListener('resize', () => { sizeHS(); onScroll(); });
  addEventListener('load', () => { sizeHS(); onScroll(); });
  sizeHS(); onScroll();

  /* ---------------- accordion (aprenda) ---------------- */
  $$('[data-accordion] .offer').forEach(o => {
    const b = $('.offer__btn', o);
    b.addEventListener('click', () => {
      const open = !o.classList.contains('open');
      $$('[data-accordion] .offer').forEach(x => { x.classList.remove('open'); $('.offer__btn', x).setAttribute('aria-expanded', false); });
      if (open) { o.classList.add('open'); b.setAttribute('aria-expanded', true); }
    });
  });

  /* ---------------- modais ---------------- */
  let lastFocus = null;
  const openModal = m => { lastFocus = document.activeElement; m.hidden = false; requestAnimationFrame(() => m.classList.add('on')); document.body.style.overflow = 'hidden'; $('[data-close]', m).focus(); };
  const closeModal = m => {
    m.classList.remove('on'); document.body.style.overflow = '';
    if (m === vmodal) stopPlayer();
    setTimeout(() => { m.hidden = true; if (m === vmodal) vframe.innerHTML = ''; }, 400);
    if (m === vmodal) $$('video', vframe).forEach(v => v.pause());
    if (lastFocus) lastFocus.focus();
  };
  $$('.modal').forEach(m => {
    $('[data-close]', m).addEventListener('click', () => closeModal(m));
    m.addEventListener('click', e => { if (e.target === m) closeModal(m); });
  });

  /* ---------------- player (YouTube, vídeo local ou imagem) ---------------- */
  const vmodal = $('[data-vmodal]'), vframe = $('[data-vframe]');
  const vtitle = $('[data-vtitle]');
  /* Player próprio: o vídeo do YouTube toca sem controles do YouTube e com uma camada por cima,
     então o visitante não consegue clicar no logo nem nas sugestões e sair do site. */
  let yp = null, ypTimer = 0;
  const fmt = s => { s = Math.max(0, Math.floor(s || 0)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; };
  const ICON = {
    play: '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',
    pause: '<svg viewBox="0 0 24 24"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>',
    vol: '<svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9H4zm12.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4z"/></svg>',
    mute: '<svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9H4zm15.6 3 2.1-2.1-1.4-1.4-2.1 2.1-2.1-2.1-1.4 1.4 2.1 2.1-2.1 2.1 1.4 1.4 2.1-2.1 2.1 2.1 1.4-1.4z"/></svg>',
    fs: '<svg viewBox="0 0 24 24"><path d="M5 5h5v2H7v3H5zm9 0h5v5h-2V7h-3zM5 14h2v3h3v2H5zm12 3v-3h2v5h-5v-2z"/></svg>',
  };
  const stopPlayer = () => { clearInterval(ypTimer); try { yp?.destroy(); } catch {} yp = null; };
  const buildPlayer = (id, startAt = 0) => {
    vframe.innerHTML = `
      <div class="yp">
        <div class="yp__video"><div data-yp-target></div></div>
        <button class="yp__shield" data-yp-toggle aria-label="Reproduzir ou pausar"><span class="yp__big">${ICON.play}</span></button>
        <div class="yp__end" data-yp-end hidden><button class="btn btn--solid" data-yp-replay>Assistir de novo</button></div>
        <div class="yp__bar">
          <button data-yp-toggle aria-label="Reproduzir ou pausar">${ICON.play}</button>
          <input type="range" min="0" max="1000" value="0" step="1" aria-label="Posição do vídeo" data-yp-seek>
          <span class="yp__time" data-yp-time>0:00</span>
          <button data-yp-mute aria-label="Som">${ICON.vol}</button>
          <button data-yp-fs aria-label="Tela cheia">${ICON.fs}</button>
        </div>
      </div>`;
    const box = $('.yp', vframe), seek = $('[data-yp-seek]', box), time = $('[data-yp-time]', box), end = $('[data-yp-end]', box);
    const togg = $$('[data-yp-toggle]', box), muteB = $('[data-yp-mute]', box);
    const setPlaying = on => { box.classList.toggle('is-playing', on); togg[1].innerHTML = on ? ICON.pause : ICON.play; };
    loadAPI().then(() => {
      yp = new YT.Player($('[data-yp-target]', box), {
        host: 'https://www.youtube-nocookie.com', videoId: id,
        playerVars: { autoplay: 1, controls: 0, disablekb: 1, fs: 0, iv_load_policy: 3, modestbranding: 1, playsinline: 1, rel: 0, start: startAt },
        events: {
          onReady: e => { e.target.playVideo(); clearInterval(ypTimer); ypTimer = setInterval(() => {
            if (!yp?.getDuration) return; const d = yp.getDuration() || 0, t = yp.getCurrentTime() || 0;
            if (!seek._drag && d) seek.value = Math.round(t / d * 1000);
            time.textContent = `${fmt(t)} / ${fmt(d)}`;
          }, 250); },
          onStateChange: e => {
            const S = YT.PlayerState;
            setPlaying(e.data === S.PLAYING || e.data === S.BUFFERING);
            end.hidden = e.data !== S.ENDED;
          },
        },
      });
    });
    togg.forEach(b => b.addEventListener('click', () => { if (!yp?.getPlayerState) return; yp.getPlayerState() === YT.PlayerState.PLAYING ? yp.pauseVideo() : yp.playVideo(); }));
    $('[data-yp-replay]', box).addEventListener('click', () => { yp?.seekTo(0, true); yp?.playVideo(); });
    seek.addEventListener('input', () => { seek._drag = true; });
    seek.addEventListener('change', () => { seek._drag = false; const d = yp?.getDuration?.() || 0; yp?.seekTo(seek.value / 1000 * d, true); });
    muteB.addEventListener('click', () => { if (!yp) return; if (yp.isMuted()) { yp.unMute(); muteB.innerHTML = ICON.vol; } else { yp.mute(); muteB.innerHTML = ICON.mute; } });
    $('[data-yp-fs]', box).addEventListener('click', () => {
      const el = box; const fsEl = document.fullscreenElement || document.webkitFullscreenElement;
      if (fsEl) (document.exitFullscreen || document.webkitExitFullscreen).call(document);
      else (el.requestFullscreen || el.webkitRequestFullscreen)?.call(el)?.catch?.(() => {});
    });
  };
  const openMedia = ({ type = 'yt', id, src, title = '', vertical = false, start = 0 }) => {
    stopPlayer();
    vframe.classList.toggle('vertical', !!vertical);
    if (type === 'yt') buildPlayer(id, start);
    else if (type === 'video') vframe.innerHTML = `<video src="${src}" controls autoplay playsinline controlslist="nodownload"></video>`;
    else vframe.innerHTML = `<img src="${src}" alt="${title}">`;
    vtitle.textContent = title;
    openModal(vmodal);
  };
  $$('[data-yt]').forEach(b => b.addEventListener('click', () =>
    openMedia({ id: b.dataset.yt, title: b.dataset.title, vertical: b.hasAttribute('data-vertical'), start: +b.dataset.start || 0 })));

  /* ---------------- portfólio: lê data/youtube.json (atualizado pelo GitHub) ---------------- */
  const vgrid = $('[data-vgrid]'), filters = $('[data-filters]');
  const guessCat = t => {
    const s = t.toLowerCase();
    if (/after ?movie|evento|cobertura|premia|a[cç][aã]o promo|depoimento|confer|congresso/.test(s)) return 'eventos';
    if (/palestra/.test(s)) return 'palestras';
    if (/curso|treinamento|aula|mentoria/.test(s)) return 'cursos';
    if (/institucional|manifesto|videoclipe|clipe|filme/.test(s)) return 'institucional';
    return 'redes';
  };
  const renderPortfolio = (list, cfg = {}) => {
    const hide = new Set(cfg.ocultar || []);
    const vids = list.filter(v => !hide.has(v.id)).map(v => ({ ...v, t: v.t || v.title, c: v.c || guessCat(v.t || v.title || ''), v: v.v ?? v.short }));
    const feat = cfg.destaque || vids[0]?.id;
    const counts = vids.reduce((a, v) => (a[v.c] = (a[v.c] || 0) + 1, a), {});
    filters.innerHTML = Object.entries(VCATS).filter(([k]) => k === 'todos' || counts[k]).map(([k, l]) =>
      `<button class="chip" data-f="${k}" aria-pressed="${k === 'todos'}">${l}<sup>${k === 'todos' ? vids.length : counts[k]}</sup></button>`).join('');
    vgrid.innerHTML = vids.map((v, i) => `
      <button class="vcard rv" data-i="${i}" data-c="${v.c}" data-d="${i % 3}">
        <span class="vthumb" data-initial="${(v.t || '·').charAt(0)}">
          <img data-ytthumb="${v.id}" alt="" loading="lazy">
          <span class="vfmt">${v.v ? 'Vertical' : VCATS[v.c]}</span>
          <span class="play" aria-hidden="true"></span>
        </span>
        <span class="vmeta"><small>${VCATS[v.c]}</small><strong>${v.t}</strong></span>
      </button>`).join('');
    $$('.vthumb img', vgrid).forEach(img => ytThumb(img, img.dataset.ytthumb));
    let LIMIT = 9;
    const moreBtn = $('[data-vmore]');
    let curF = 'todos';
    const apply = f => {
      curF = f; let shown = 0;
      $$('.vcard', vgrid).forEach(card => {
        const ok = f === 'todos' || card.dataset.c === f;
        const show = ok && (f !== 'todos' || shown < LIMIT);
        card.hidden = !show; if (show) { shown++; card.classList.add('in'); }
        card.classList.toggle('is-feature', f === 'todos' && vids[card.dataset.i].id === feat);
      });
      if (moreBtn) moreBtn.hidden = !(f === 'todos' && vids.length > LIMIT);
    };
    if (moreBtn) moreBtn.onclick = () => { LIMIT += 9; apply(curF); };
    apply('todos');
    filters.onclick = e => {
      const b = e.target.closest('.chip'); if (!b) return;
      $$('.chip', filters).forEach(c => c.setAttribute('aria-pressed', c === b));
      apply(b.dataset.f);
    };
    vgrid.onclick = e => {
      const card = e.target.closest('.vcard'); if (!card) return;
      const v = vids[card.dataset.i];
      openMedia({ id: v.id, title: v.t, vertical: v.v });
    };
  };
  if (vgrid) {
    Promise.all([
      fetch('data/youtube.json', { cache: 'no-cache' }).then(r => r.ok ? r.json() : Promise.reject()),
      fetch('data/portfolio-config.json', { cache: 'no-cache' }).then(r => r.ok ? r.json() : {}).catch(() => ({})),
    ]).then(([list, cfg]) => renderPortfolio(list.videos || list, cfg))
      .catch(() => renderPortfolio(VIDEOS, { destaque: 'J2Myn5_Ot88' }));
  }

  /* ---------------- nomes: clique abre o vídeo com som ---------------- */
  $$('[data-names] a[data-title]').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    if (a.dataset.type === 'img') openMedia({ type: 'img', src: a.dataset.peek, title: a.dataset.title, vertical: true });
    else openMedia({ type: 'video', src: a.dataset.full, title: a.dataset.title, vertical: true });
  }));

  /* ---------------- nomes: prévia que segue o cursor ---------------- */
  const peek = $('[data-peek-box]'), names = $('[data-names]');
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (names && peek && fine) {
    let px = 0, py = 0, tx = 0, ty = 0, raf = 0;
    const follow = () => { px += (tx - px) * .14; py += (ty - py) * .14; peek.style.left = px + 'px'; peek.style.top = py + 'px'; raf = requestAnimationFrame(follow); };
    $$('a[data-peek]', names).forEach(a => {
      a.addEventListener('mouseenter', e => {
        const src = a.dataset.peek;
        peek.innerHTML = a.dataset.type === 'img' ? `<img src="${src}" alt="">` : `<video src="${src}" muted autoplay loop playsinline></video>`;
        px = tx = e.clientX; py = ty = e.clientY; peek.classList.add('on');
        if (!raf) raf = requestAnimationFrame(follow);
      });
      a.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });
      a.addEventListener('mouseleave', () => { peek.classList.remove('on'); });
    });
    names.addEventListener('mouseleave', () => { cancelAnimationFrame(raf); raf = 0; });
  }
  /* no celular os vídeos pequenos tocam quando aparecem */
  if (!fine) $$('.name__thumb video').forEach(v => autoIO.observe(v));

  /* ---------------- galeria de fotos ---------------- */
  const tabs = $('[data-tabs]'), masonry = $('[data-masonry]'), lb = $('[data-lb]');
  let current = [], idx = 0;
  if (tabs) {
    let lastGroup = null;
    tabs.innerHTML = Object.entries(PHOTO_CATS).map(([k, c], i) => {
      let pre = '';
      if (c.group !== lastGroup) { pre = c.group ? `<span class="tabs__group" aria-hidden="true">${c.group}</span>` : (lastGroup ? '<span class="tabs__sep" aria-hidden="true"></span>' : ''); lastGroup = c.group; }
      return `${pre}<button class="tab" role="tab" id="tab-${k}" aria-selected="${i === 0}" aria-controls="gal" data-cat="${k}">${c.label}</button>`;
    }).join('');
    masonry.id = 'gal'; masonry.setAttribute('role', 'tabpanel');
    let activeCat = 'estudio';
    const show = cat => {
      activeCat = cat; current = photos(cat);
      masonry.setAttribute('aria-labelledby', 'tab-' + cat);
      masonry.innerHTML = current.map((p, i) =>
        `<button class="ph" data-i="${i}" style="animation-delay:${(i % 8) * 60}ms" aria-label="Ampliar foto ${i + 1} de ${PHOTO_CATS[cat].label}">
          <img src="assets/thumbs/${p.n}.webp" alt="${PHOTO_CATS[cat].alt}" loading="lazy" decoding="async"></button>`).join('');
    };
    show('estudio');
    tabs.addEventListener('click', e => {
      const b = e.target.closest('.tab'); if (!b) return;
      $$('.tab', tabs).forEach(t => t.setAttribute('aria-selected', t === b));
      show(b.dataset.cat);
    });
    tabs.addEventListener('keydown', e => {
      if (!['ArrowRight', 'ArrowLeft'].includes(e.key)) return;
      const all = $$('.tab', tabs), i = all.indexOf(document.activeElement);
      const n = all[(i + (e.key === 'ArrowRight' ? 1 : -1) + all.length) % all.length];
      n.focus(); n.click();
    });
    const lbImg = $('[data-lbimg]'), lbCount = $('[data-lbcount]');
    const setLB = i => {
      idx = (i + current.length) % current.length;
      lbImg.src = `assets/photos/${current[idx].n}.webp`;
      lbImg.alt = masonry.querySelectorAll('img')[idx]?.alt || '';
      lbCount.textContent = `${String(idx + 1).padStart(2, '0')} / ${current.length}`;
    };
    masonry.addEventListener('click', e => { const b = e.target.closest('.ph'); if (!b) return; current = photos(activeCat); setLB(+b.dataset.i); openModal(lb); });
    $('[data-prev]', lb).addEventListener('click', () => setLB(idx - 1));
    $('[data-next]', lb).addEventListener('click', () => setLB(idx + 1));
    $$('[data-open-photos]').forEach(b => b.addEventListener('click', () => {
      current = ['prof', 'estudio', 'casuais', 'gastronomia', 'arquitetura'].flatMap(c => photos(c).slice(0, 3));
      setLB(0); openModal(lb);
    }));
    let sx = 0;
    lb.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', e => { const d = e.changedTouches[0].clientX - sx; if (Math.abs(d) > 50) setLB(idx + (d < 0 ? 1 : -1)); });
  }
  addEventListener('keydown', e => {
    const open = $('.modal.on'); if (!open) return;
    if (e.key === 'Escape') closeModal(open);
    if (open === lb && e.key === 'ArrowRight') $('[data-next]', lb).click();
    if (open === lb && e.key === 'ArrowLeft') $('[data-prev]', lb).click();
  });

  /* ---------------- cursor ---------------- */
  const cur = $('.cursor');
  if (fine && !reduce && cur) {
    root.classList.add('has-cursor');
    let cx = innerWidth / 2, cy = innerHeight / 2, x = cx, y = cy;
    addEventListener('mousemove', e => { cx = e.clientX; cy = e.clientY; }, { passive: true });
    const loop = () => { x += (cx - x) * .22; y += (cy - y) * .22; cur.style.transform = `translate(${x}px,${y}px)`; requestAnimationFrame(loop); };
    loop();
    document.addEventListener('mouseover', e => {
      const t = e.target;
      cur.classList.toggle('play', !!t.closest('.vcard'));
      cur.classList.toggle('big', !t.closest('.vcard') && !!t.closest('a, button, .ph, summary'));
    });
  }
})();
