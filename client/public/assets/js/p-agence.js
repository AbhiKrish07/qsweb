(() => {
'use strict';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const mqReduce = matchMedia('(prefers-reduced-motion: reduce)');
const fine = matchMedia('(hover: hover) and (pointer: fine)');
const ecouter = (mq, f) => (mq.addEventListener ? mq.addEventListener('change', f) : mq.addListener(f));
const frise = $('[data-frise]');
if (frise) {
const liste = $('ol', frise), lignes = $$('li', liste), big = $('[data-an-big]');
let centres = [], H = 1, cur = -2, vivant = false;
const regler = k => {
if (k === cur) return;
cur = k;
lignes.forEach((l, i) => { l.classList.toggle('is-lu', i <= k); l.classList.toggle('is-cur', i === k); });
const y = k < 0 ? 0 : centres[k];
frise.style.setProperty('--y', y.toFixed(1) + 'px');
frise.style.setProperty('--p', (y / H).toFixed(4));
frise.style.setProperty('--k', Math.max(0, k));
frise.classList.toggle('is-parti', k >= 0);
if (big) big.style.setProperty('--k', Math.max(0, k));
};
const maj = () => {
if (!vivant) return;
const repere = innerHeight * .58 - frise.getBoundingClientRect().top;
let k = -1;
centres.forEach((c, i) => { if (c <= repere) k = i; });
regler(k);
};
const mesurer = () => {
vivant = !mqReduce.matches;
frise.classList.toggle('is-vivant', vivant);
const haut = frise.getBoundingClientRect().top;
centres = lignes.map(l => { const r = l.getBoundingClientRect(); return r.top - haut + r.height / 2; });
H = Math.max(1, frise.offsetHeight);
cur = -2;
if (vivant) maj();
else regler(lignes.length - 1);
};
let tic = false;
window.addEventListener('scroll', () => { if (!tic) { tic = true; requestAnimationFrame(() => { tic = false; maj(); }); } }, { passive: true });
let attente;
window.addEventListener('resize', () => { clearTimeout(attente); attente = setTimeout(mesurer, 150); });
if (document.fonts && document.fonts.ready) document.fonts.ready.then(mesurer);
window.addEventListener('load', mesurer);
ecouter(mqReduce, mesurer);
mesurer();
}
const films = $$('video[data-eq-film]');
if (films.length) {
const ICO = '<span class="ag-membre__ico" aria-hidden="true"><svg viewBox="0 0 12 12"><path d="M2.5 1.2l8.3 4.8-8.3 4.8z" fill="currentColor"/></svg></span>';
let courant = null;
const etat = (m, e) => { m.b.dataset.etat = e; m.b.setAttribute('aria-pressed', e ? 'true' : 'false'); };
const CARTON = 2.1;
const saluer = m => {
const mot = m.v.currentTime >= CARTON && !(m.v.ended && !m.souris) ? m.salut : '';
if ((m.b.dataset.verbe || '') === mot) return;
if (mot) m.b.dataset.verbe = mot; else delete m.b.dataset.verbe;
document.dispatchEvent(new Event('curseur:relire'));
};
const arreter = m => {
const photo = m.v.parentElement;
clearTimeout(m.t);
m.v.pause();
m.v.muted = true;
photo.classList.remove('is-joue');
etat(m, '');
if (photo.contains(document.activeElement)) m.b.focus();
if (courant === m) courant = null;
saluer(m);
};
const lancer = (m, son) => {
if (courant && courant !== m) arreter(courant);
courant = m;
m.v.muted = !son;
const p = m.v.play(); if (p) p.catch(() => {});
etat(m, !son ? 'muet' : m.souris && !mqReduce.matches ? 'son' : 'clic');
};
const io = 'IntersectionObserver' in window && new IntersectionObserver(es => es.forEach(e => {
if (!e.isIntersecting && courant && courant.b === e.target) arreter(courant);
}));
films.forEach(v => {
const li = v.closest('[data-salut]');
const b = document.createElement('button'), m = { v, b, t: 0, souris: false, salut: li ? li.dataset.salut : '' };
b.type = 'button';
b.className = 'ag-membre__lire';
b.innerHTML = ICO;
b.setAttribute('aria-label', v.getAttribute('aria-label'));
etat(m, '');
v.after(b);
v.parentElement.addEventListener('pointerenter', e => {
if (e.pointerType !== 'mouse' || !b.offsetParent) return;
m.souris = true;
if (v.paused && !mqReduce.matches) m.t = setTimeout(() => lancer(m, false), 150);
});
v.parentElement.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') { m.souris = false; arreter(m); } });
b.addEventListener('click', () => {
clearTimeout(m.t);
if (v.paused) lancer(m, true);
else if (m.souris && !mqReduce.matches) v.muted = !v.muted;
else arreter(m);
});
v.addEventListener('volumechange', () => { if (/^(muet|son)$/.test(b.dataset.etat)) etat(m, v.muted ? 'muet' : 'son'); });
v.addEventListener('playing', () => { if (courant === m) v.parentElement.classList.add('is-joue'); });
v.addEventListener('timeupdate', () => saluer(m));
v.addEventListener('ended', () => arreter(m));
if (io) io.observe(b);
});
document.addEventListener('visibilitychange', () => { if (document.hidden && courant) arreter(courant); });
}
$$('#equipe [data-salut]').forEach(li => { $('.ag-membre__photo img', li).dataset.curseur = li.dataset.salut; });
})();
