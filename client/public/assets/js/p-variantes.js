(() => {
const vh = document.querySelector('.vh--reel');
if (!vh || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
vh.dataset.effet = '1';
const cadre = vh.querySelector('.vh__cadre'), film = vh.querySelector('.vh__film'), plein = film.querySelector('.vh__plein');
const reel = vh.querySelector('.vh__reel');
const textes = [['.vh__t', -14, 2.2], ['.vh__p', -9, 2.6], ['.vh__fuseaux', 6, 3]].map(([s, d, k]) => [vh.querySelector(s), d, k]);
let a = 0, course = 1, format = '', ecran = '';
let W = 1, H = 1, F = 1, dx = 0, dy = 0, s0 = 1, k0 = 1, r = 0, svh = 0, X = 1, Y = 1;
const sonde = document.createElement('div');
sonde.style.cssText = 'position:absolute;visibility:hidden;width:var(--m)';
vh.append(sonde);
let h0 = 0, D = 0;
const bis = document.createElement('video');
bis.className = 'vh__bis';
bis.muted = bis.loop = bis.playsInline = true;
bis.preload = 'none';
bis.setAttribute('aria-hidden', 'true');
plein.append(bis);
const ecart = () => {
const t = reel.duration || 73.2, d = reel.currentTime - bis.currentTime;
return d > t / 2 ? d - t : d < -t / 2 ? d + t : d;
};
reel.addEventListener('timeupdate', () => {
if (!bis.src || bis.readyState < 3 || bis.seeking) return;
const d = ecart();
if (Math.abs(d) > .6) return void (bis.currentTime = reel.currentTime + .2);
bis.playbackRate = 1 + Math.max(-.15, Math.min(.15, d));
if (Math.abs(d) < .12) bis.classList.add('is-pret');
});
const charger = () => {
if (bis.dataset.format === format) return;
const src = reel.currentSrc || reel.querySelector('source:last-of-type').src;
bis.dataset.format = format;
bis.classList.remove('is-pret');
bis.src = src.replace(/[^/]*$/, (format === 'paysage' ? 'showreel-bitwip-agence-communication-paysage' : 'showreel-bitwip-agence-communication-portrait') + (src.match(/-(av1|hevc)\.mp4$/)?.[0] ?? '.mp4'));
bis.currentTime = reel.currentTime + .2;
bis.play().catch(() => {});
};
const mesurer = () => {
const rv = vh.getBoundingClientRect(), haut = rv.top + scrollY, cs = getComputedStyle(vh), pt = parseFloat(cs.paddingTop);
H = plein.offsetHeight; W = plein.offsetWidth;
const st = Math.min(pt, H - cadre.offsetHeight);
const c = cadre.getBoundingClientRect(), f = film.getBoundingClientRect();
const x = f.left - c.left, y = f.top - c.top + st;
F = f.width; dx = x + F / 2 - W / 2; dy = y + F / 2 - H / 2;
format = W > H ? 'paysage' : 'portrait';
const L = format === 'paysage' ? Math.max(W, H * 16 / 9) * 9 / 16 : Math.max(W, H * 9 / 16);
s0 = F / Math.max(W, H); k0 = F / L;
r = parseFloat(cs.getPropertyValue('--r')) || 0;
X = 1 - 2 * sonde.offsetWidth / W; Y = 1 - 2 * sonde.offsetWidth / H;
vh.style.setProperty('--st', st.toFixed(2) + 'px');
h0 = haut; D = pt - st;
vh.style.setProperty('--d', D.toFixed(2) + 'px');
a = haut + pt - st;
const piste = parseFloat(getComputedStyle(vh, '::after').height);
svh = piste / 120;
course = piste + H * .4;
};
const borne = v => Math.min(1, Math.max(0, v)), n = v => v.toFixed(4);
const coins = [];
const etat = p => {
const g = borne(p / .47), e = g * g * (3 - 2 * g), f = borne((p - .625) / .375), z = 1 - f * .08, u = 1 - e;
const sx = X - (X - F / W) * u, sy = Y - (Y - F / H) * u, c = 1;
const s = s0 + (1 - s0) * e, k = k0 + (1 - k0) * e;
return { rayon: c * r ? `${(c * r / sx).toFixed(2)}px / ${(c * r / sy).toFixed(2)}px` : '0', els: [
[plein, { transform: `translate(${(dx * u * z).toFixed(2)}px,${(dy * u * z).toFixed(2)}px) scale(${n(z * sx)},${n(z * sy)})` }],
[reel, { transform: `translate(-50%,-50%) scale(${n(s / sx)},${n(s / sy)})` }],
[bis, { transform: `translate(-50%,-50%) scale(${n(k / sx)},${n(k / sy)})`, opacity: n(borne((e - .1) / .3)) }],
...textes.map(([el, d, v]) => [el, { transform: `translateY(${(e * d * svh).toFixed(2)}px)`, opacity: n(borne(1 - e * v)) }]),
...coins.map(el => [el, { transform: `scale(${n(c / sx)},${n(c / sy)})` }])
] };
};
let tout;
if (!window.ScrollTimeline) {
let image = 0, dernier = -1, rattrape = '';
const peindre = () => {
image = 0;
const sy0 = scrollY, p = borne((sy0 - a) / course);
if (sy0 > 0) charger();
const t = D ? borne((sy0 - h0) / (2 * D)) : 0, tr = D ? `translateY(${(-D * t * (2 - t)).toFixed(2)}px)` : '';
if (tr !== rattrape) cadre.style.transform = rattrape = tr;
if (p === dernier) return;
dernier = p;
const { rayon, els } = etat(p);
plein.style.borderRadius = rayon;
for (const [el, s] of els) Object.assign(el.style, s);
};
tout = () => { mesurer(); dernier = -1; peindre(); };
addEventListener('scroll', () => { if (!image) image = requestAnimationFrame(peindre); }, { passive: true });
} else {
const racine = document.documentElement, tl = new ScrollTimeline({ source: racine, axis: 'block' }), anims = [];
for (const c of ['hg', 'hd', 'bg', 'bd']) {
const el = document.createElement('div');
el.className = 'vh__coin'; el.dataset.c = c;
coins.push(plein.appendChild(el));
}
for (let el = vh, c; el; el = el.parentElement) {
if ((c = getComputedStyle(el).backgroundColor) !== 'rgba(0, 0, 0, 0)') { vh.style.setProperty('--fond', c); break; }
}
const S = g => g * g * (3 - 2 * g), dS = g => 6 * g * (1 - g), gDe = e => .5 - Math.sin(Math.asin(1 - 2 * e) / 3);
const DIX = [...Array(10).keys()].map(i => i / 9);
const points = [[0, 1], DIX, [...DIX, .1, .4], ...textes.map(([, , v]) => [0, 1 / v, 1]), ...coins.map(() => DIX)];
const fixe = (j, p, offset) => ({ offset, ...etat(p).els[j][1] });
const hauteur = () => {
const m = racine.scrollHeight - racine.clientHeight, t = tl.currentTime?.value, v = scrollY * 100 / t;
return scrollY > 50 && t > 0 && Math.abs(v / m - 1) < .1 ? v : m;
};
let M = 0, attente = 0;
const construire = () => {
M = hauteur();
const o = p => Math.min(1, (a + p * course) / M);
etat(0).els.forEach(([el], j) => {
const gs = [...new Set(points[j])].sort((x, y) => x - y).map(gDe);
const kf = gs.map((g, i) => {
const k = fixe(j, .47 * g, o(.47 * g)), h = gs[i + 1] - g, d = S(gs[i + 1]) - S(g);
if (h > 0) k.easing = `cubic-bezier(${1 / 3},${(dS(g) * h / d / 3).toFixed(5)},${2 / 3},${(1 - dS(gs[i + 1]) * h / d / 3).toFixed(5)})`;
return k;
});
kf.unshift(fixe(j, 0, 0));
kf.push(fixe(j, .625, o(.625)), fixe(j, 1, o(1)), fixe(j, 1, 1));
if (anims[j]) anims[j].effect.setKeyframes(kf);
else anims[j] = el.animate(kf, { timeline: tl, fill: 'both' });
});
const kc = [{ offset: 0, transform: 'none' }, { offset: Math.min(1, h0 / M), transform: 'none', easing: `cubic-bezier(${1 / 3},${2 / 3},${2 / 3},1)` },
{ offset: Math.min(1, (h0 + 2 * D) / M), transform: `translateY(${(-D).toFixed(2)}px)` }, { offset: 1, transform: `translateY(${(-D).toFixed(2)}px)` }];
if (cadre.rattrape) cadre.rattrape.effect.setKeyframes(kc);
else if (D) cadre.rattrape = cadre.animate(kc, { timeline: tl, fill: 'both' });
};
tout = () => { mesurer(); construire(); if (scrollY > 0) charger(); };
const verifier = () => { attente = 0; if (Math.abs(hauteur() - M) > 1) construire(); };
const planifier = () => { clearTimeout(attente); attente = setTimeout(verifier, scrollY > a + course + innerHeight ? 0 : 200); };
new ResizeObserver(planifier).observe(document.body);
addEventListener('resize', planifier);
addEventListener('scroll', () => { if (scrollY > 0) charger(); if (attente) planifier(); }, { passive: true });
}
addEventListener('resize', () => {
const t = innerWidth + 'x' + plein.offsetHeight;
if (t !== ecran) { ecran = t; tout(); }
});
addEventListener('load', tout);
if (document.fonts) document.fonts.ready.then(tout);
ecran = innerWidth + 'x' + plein.offsetHeight;
tout();
})();
(() => {
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const DUREE = 4500;
document.querySelectorAll('[data-xvb]').forEach(v => {
const projets = [...v.querySelectorAll('.xvit__projet')], barres = [...v.querySelectorAll('.xvb__b')];
if (projets.length < 2 || barres.length !== projets.length) return;
let i = 0, t0 = 0, pause = false, vu = false;
const aller = n => {
i = (n + projets.length) % projets.length;
[i, (i + 1) % projets.length].forEach(m => projets[m].classList.add('is-vu'));
projets.forEach((p, m) => p.classList.toggle('is-on', m === i));
barres.forEach((b, m) => { b.setAttribute('aria-pressed', String(m === i)); b.style.setProperty('--p', m < i ? 1 : 0); });
t0 = performance.now();
};
const tic = t => {
if (!reduce && !pause && vu && !document.hidden) {
const p = Math.min(1, (t - t0) / DUREE);
barres[i].style.setProperty('--p', p.toFixed(3));
if (p >= 1) aller(i + 1);
} else t0 = t - (parseFloat(barres[i].style.getPropertyValue('--p')) || 0) * DUREE;
requestAnimationFrame(tic);
};
barres.forEach((b, m) => {
b.addEventListener('click', () => aller(m));
b.addEventListener('keydown', e => {
if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
e.preventDefault();
aller(i + (e.key === 'ArrowRight' ? 1 : -1));
barres[i].focus();
});
});
v.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') pause = true; });
v.addEventListener('pointerleave', () => { pause = false; });
v.addEventListener('focusin', () => { pause = true; });
v.addEventListener('focusout', e => { pause = v.contains(e.relatedTarget); });
if ('IntersectionObserver' in window) new IntersectionObserver(en => { vu = en[en.length - 1].isIntersecting; }, { threshold: .4 }).observe(v);
else vu = true;
aller(0);
requestAnimationFrame(tic);
});
})();
(() => {
const bloc = document.querySelector('[data-defile]'), piste = bloc && bloc.querySelector('.carte');
if (!piste) return;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const items = [...piste.querySelectorAll('.carte__item')].filter(it => getComputedStyle(it).display !== 'none');
if (items.length < 2) return;
items.forEach((it, n) => it.setAttribute('aria-label', `${n + 1} sur ${items.length}`));
bloc.tabIndex = 0;
const io = new IntersectionObserver(es => {
if (!es.some(e => e.isIntersecting)) return;
io.disconnect();
piste.querySelectorAll('img[loading="lazy"]').forEach(i => { i.loading = 'eager'; });
}, { rootMargin: '100% 0px' });
io.observe(piste);
const bord = () => parseFloat(getComputedStyle(piste).scrollPaddingLeft) || 0;
const ici = () => {
if (piste.scrollLeft + piste.clientWidth >= piste.scrollWidth - 2) return items.length - 1;
const x = piste.scrollLeft + bord();
return items.reduce((b, it, n) => (Math.abs(it.offsetLeft - x) < Math.abs(items[b].offsetLeft - x) ? n : b), 0);
};
const aller = n => piste.scrollTo({ left: items[n].offsetLeft - bord(), behavior: reduce ? 'auto' : 'smooth' });
const lire = n => Math.min(15000, Math.max(8000, items[n].querySelector('.carte__q').textContent.trim().split(/\s+/).length * 180));
let reste = lire(0), cible = 0, jusqua = 0;
const relancer = () => { reste = lire(performance.now() < jusqua ? cible : ici()); };
const pas = d => {
const k = ((performance.now() < jusqua ? cible : ici()) + d + items.length) % items.length;
aller(k);
cible = k; jusqua = performance.now() + 700; reste = lire(k);
};
piste.addEventListener('scroll', relancer, { passive: true });
bloc.addEventListener('keydown', e => {
if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
e.preventDefault();
pas(e.key === 'ArrowRight' ? 1 : -1);
});
const nav = document.querySelector('[data-defile-nav]');
if (nav) nav.querySelectorAll('[data-defile-go]').forEach(b => b.addEventListener('click', () => pas(Number(b.dataset.defileGo))));
if (reduce) return;
const arret = new Set(['ecran']);
const tenir = (cle, oui) => { if (oui) arret.add(cle); else { arret.delete(cle); relancer(); } };
const zones = [bloc, nav].filter(Boolean);
zones.forEach(z => {
z.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') tenir('survol', true); });
z.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') tenir('survol', false); });
z.addEventListener('focusin', e => { if (e.target.matches(':focus-visible')) tenir('focus', true); });
z.addEventListener('focusout', e => { if (!zones.some(y => y.contains(e.relatedTarget))) tenir('focus', false); });
});
bloc.addEventListener('touchstart', () => tenir('doigt', true), { passive: true });
['touchend', 'touchcancel'].forEach(t => bloc.addEventListener(t, () => tenir('doigt', false), { passive: true }));
new IntersectionObserver(es => tenir('ecran', es[es.length - 1].intersectionRatio < .5), { threshold: [0, .5] }).observe(piste);
setInterval(() => {
if (arret.size || document.hidden || document.documentElement.classList.contains('visionneuse-ouverte')) return;
if ((reste -= 250) <= 0) pas(1);
}, 250);
})();
(() => {
const rail = document.querySelector('.vx--allegee [data-piste-rail]');
const intro = rail && rail.parentElement.querySelector(':scope > .piste__intro');
if (!intro || !window.MutationObserver) return;
const K = .7, R = .08;
let L = 0, avant = '';
addEventListener('resize', () => { L = 0; });
new MutationObserver(() => {
const t = rail.style.transform, d = Math.max(0, -parseFloat(t.slice(t.indexOf('(') + 1)) || 0);
const q = d && Math.min(1, d / (L ||= intro.offsetWidth));
const tr = q ? `translate3d(${(-K * Math.min(d, L)).toFixed(1)}px,0,0) scale(${(1 - R * q).toFixed(4)})` : '';
if (tr === avant) return;
avant = tr;
intro.style.transform = tr;
intro.style.opacity = q ? (1 - q).toFixed(3) : '';
intro.style.visibility = q === 1 ? 'hidden' : '';
}).observe(rail, { attributes: true, attributeFilter: ['style'] });
})();
(() => {
if (document.body.dataset.variante !== 'allegee' || !matchMedia('(hover: hover) and (pointer: fine)').matches
|| matchMedia('(prefers-reduced-motion: reduce)').matches) return;
const DELAI = 600, PLAN = 480;
const CADRES = ['50% 50%', '20% 30%', '80% 25%', '30% 80%', '70% 70%', '50% 15%'];
document.querySelectorAll('[data-galerie], [data-montage]').forEach(c => {
if (!(c.dataset.galerie || c.dataset.montage)) return;
const media = c.querySelector('.case__media, .qr__media, .actu__media') || c;
let show = null, imgs = [], cur = null, k = 0, t = 0, attente = 0;
const prets = new Set();
const suivante = () => {
const i = imgs.indexOf(cur);
for (let d = 1; d <= imgs.length; d++) { const im = imgs[(i + d) % imgs.length]; if (prets.has(im)) return im; }
return null;
};
const coupe = () => {
const im = suivante();
if (im && im !== cur) {
im.style.objectPosition = CADRES[(k * 7) % CADRES.length];
im.style.setProperty('--z', (1.04 + ((k * 3) % 5) * .05).toFixed(2));
im.classList.add('is-on');
if (cur) cur.classList.remove('is-on');
cur = im;
k++;
}
if (cur) c.classList.add('is-show');
t = setTimeout(coupe, PLAN);
};
c.addEventListener('pointerenter', e => {
e.stopImmediatePropagation();
if (!show) {
show = document.createElement('span');
show.className = 'case__show';
show.setAttribute('aria-hidden', 'true');
show.innerHTML = (c.dataset.galerie || c.dataset.montage).split(' ').map(s => '<img src="' + s + '" alt="" decoding="async">').join('');
media.append(show);
imgs = [...show.querySelectorAll('img')];
imgs.forEach(im => im.decode().then(() => { if (im.naturalWidth) prets.add(im); }, () => {}));
}
clearTimeout(attente);
attente = setTimeout(() => { if (c.matches(':hover')) { clearTimeout(t); coupe(); } }, DELAI);
}, true);
c.addEventListener('pointerleave', e => {
e.stopImmediatePropagation();
clearTimeout(attente); clearTimeout(t); c.classList.remove('is-show');
}, true);
});
})();
