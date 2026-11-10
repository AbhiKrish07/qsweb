(() => {
'use strict';
const EN = document.documentElement.lang === 'en';
const root = document.querySelector('section[data-journal]');
if (!root) return;
const html = document.documentElement;
const liste = root.querySelector('[data-grille]');
const nav = root.querySelector('[data-pager-nav]');
const chips = Array.from(root.querySelectorAll('[data-filtre]'));
const vues = Array.from(root.querySelectorAll('[data-vue]'));
const posts = Array.from(root.querySelectorAll('[data-grille] .actu'));
const statut = root.querySelector('[data-statut]');
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const connu = c => chips.some(ch => ch.dataset.filtre === c);
const CLE = 'epure-actus-vue';
const PAR = { mosaique: 10, grille: 12 };
let vue = html.getAttribute('data-actus-vue') === 'grille' ? 'grille' : 'mosaique';
if (vue === 'grille' && window.matchMedia('(max-width:560px)').matches) { vue = 'mosaique'; html.removeAttribute('data-actus-vue'); }
const par = () => PAR[vue];
function rythmer(visibles) {
const GRANDES = { 0: 'g', 6: 'd' };
posts.forEach(p => p.removeAttribute('data-taille'));
if (vue !== 'mosaique') return;
visibles.forEach((p, i) => { if (GRANDES[i % 10]) p.dataset.taille = GRANDES[i % 10]; });
}
let pager = null, retire = null;
function nouveauPager() {
if (!window.epurePager || !nav) return null;
if (retire) { retire.actif = false; retire.tous.length = 0; if (retire.voix) retire.voix.remove(); }
nav.dataset.par = par();
const r = { actif: true, tous: posts.slice() };
const p = window.epurePager({
liste, nav, tous: r.tous,
items: () => (r.actif ? posts.filter(c => !c.hidden) : []),
apres: vis => { if (r.actif) rythmer(vis); },
});
r.voix = nav.nextElementSibling && nav.nextElementSibling.matches('p.sr-only[aria-live]') ? nav.nextElementSibling : null;
retire = r;
return p;
}
pager = nouveauPager();
function filtrer(cat, garder, initial) {
if (!connu(cat)) cat = 'tout';
chips.forEach(ch => ch.setAttribute('aria-pressed', String(ch.dataset.filtre === cat)));
let n = 0;
posts.forEach(p => {
const on = cat === 'tout' || p.dataset.cat === cat;
p.hidden = !on;
p.classList.remove('is-new');
if (!on) return;
if (!reduce && !initial) {
p.style.setProperty('--jd', (Math.min(n, 8) * 0.05).toFixed(2) + 's');
void p.offsetWidth;
p.classList.add('is-new');
}
n++;
});
if (statut) statut.textContent = n + (n > 1 ? ' articles' : ' article');
if (garder) history.replaceState(history.state, '', cat === 'tout' ? location.pathname + location.search : '#' + cat);
if (pager) pager.maj(!initial); else rythmer(posts.filter(p => !p.hidden));
}
function changerVue(v) {
if (v === vue) return;
const vis = posts.filter(c => !c.hidden && !c.classList.contains('is-hors-page'));
const tete = vis.length ? posts.filter(c => !c.hidden).indexOf(vis[0]) : 0;
vue = v;
if (v === 'grille') html.setAttribute('data-actus-vue', 'grille'); else html.removeAttribute('data-actus-vue');
try { if (v === 'grille') localStorage.setItem(CLE, v); else localStorage.removeItem(CLE); } catch (e) { }
vues.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.vue === v)));
try {
const u = new URL(window.location.href), n = Math.floor(Math.max(0, tete) / par()) + 1;
if (n > 1) u.searchParams.set('page', n); else u.searchParams.delete('page');
history.replaceState(history.state, '', u);
} catch (e) { }
pager = nouveauPager();
if (pager) pager.maj(false); else rythmer(posts.filter(p => !p.hidden));
if (statut) statut.textContent = EN ? (v === 'grille' ? 'Articles shown as a grid' : 'Articles shown as a mosaic') : v === 'grille' ? 'Articles affichés en grille' : 'Articles affichés en mosaïque';
}
function transition(maj) {
if (!document.startViewTransition || reduce) { maj(); return; }
posts.forEach((c, i) => { c.style.viewTransitionName = 'jr-' + i; });
document.documentElement.classList.add('vt-local');
const t = document.startViewTransition(maj);
t.finished.finally(() => { document.documentElement.classList.remove('vt-local'); posts.forEach(c => { c.style.viewTransitionName = ''; }); });
}
vues.forEach(b => {
b.setAttribute('aria-pressed', String(b.dataset.vue === vue));
b.addEventListener('click', () => transition(() => changerVue(b.dataset.vue)));
});
chips.forEach(ch => ch.addEventListener('click', () => filtrer(ch.dataset.filtre, true, false)));
const lire = () => decodeURIComponent(location.hash.slice(1));
filtrer(connu(lire()) ? lire() : 'tout', false, true);
window.addEventListener('hashchange', () => { if (connu(lire()) || !lire()) filtrer(lire(), false, false); });
})();
