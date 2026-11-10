(() => {
'use strict';
const EN = document.documentElement.lang === 'en';
const root = document.querySelector('[data-rea]');
if (!root) return;
const html = document.documentElement;
const ORDRE = ['', 'conseil-strategie', 'direction-artistique', 'web-innovation', 'activation-gestion-de-campagnes'];
const rang = b => { const i = ORDRE.indexOf(b.dataset.v); return i < 0 ? ORDRE.length : i; };
const exp = Array.from(root.querySelectorAll('[data-f="exp"]'));
if (exp.length > 1) exp[0].parentNode.append(...exp.slice().sort((a, b) => rang(a) - rang(b)));
const liste = root.querySelector('[data-liste]');
const nav = root.querySelector('[data-pager-nav]');
const cards = Array.from(root.querySelectorAll('[data-projet]'));
const illus0 = cards.filter(c => !c.hasAttribute('data-res'));
const res0 = cards.filter(c => c.hasAttribute('data-res'));
const chips = Array.from(root.querySelectorAll('[data-f]'));
const nom = b => Array.from(b.childNodes).filter(n => n.nodeType === 3).map(n => n.textContent).join('').trim();
const razLigne = document.createElement('p');
razLigne.className = 'rea-raz';
razLigne.hidden = true;
razLigne.innerHTML = '<button class="lnk" type="button" data-raz>' + (EN ? 'Reset' : 'Réinitialiser') + '</button>';
const filtres = root.querySelector('.rea-filtres');
if (filtres) filtres.append(razLigne);
razLigne.firstChild.addEventListener('click', () => rendreFocus(menus.find(m => m.b.offsetParent)));
const CHEVRON = '<svg viewBox="0 0 10 6" fill="none" aria-hidden="true"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5"/></svg>';
const CROIX = '<svg viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M1 1l8 8M9 1L1 9" stroke="currentColor" stroke-width="1.5"/></svg>';
const bouton = (cls, contenu) => { const b = document.createElement('button'); b.type = 'button'; b.className = cls; b.innerHTML = contenu; return b; };
const boutonMenu = (cls, n) => bouton(cls, '<span class="rea-menu__n">' + n + '<span class="rea-menu__c"></span></span><span class="rea-menu__v"></span>' + CHEVRON);
const compter = (b, n) => { b.querySelector('.rea-menu__c').textContent = n ? ' · ' + n : ''; b.classList.toggle('is-actif', n > 0); };
const menus = Array.from(root.querySelectorAll('.rea-filtres__g')).map(g => {
const k = g.querySelector('.rea-filtres__k'), p = g.querySelector('.chips'), c = g.querySelector('[data-f]');
if (!k || !p || !c) return null;
const b = boutonMenu('rea-menu__b', k.textContent);
p.id = 'rea-menu-' + c.dataset.f;
b.setAttribute('aria-controls', p.id);
b.setAttribute('aria-expanded', 'false');
k.after(b);
return { g, b, p, f: c.dataset.f, nom: k.textContent };
}).filter(Boolean);
const ouvrir = (m, on) => { m.g.classList.toggle('is-ouvert', on); m.b.setAttribute('aria-expanded', String(on)); };
const fermer = sauf => menus.forEach(m => { if (m !== sauf) ouvrir(m, false); });
const flottant = m => getComputedStyle(m.p).position === 'absolute';
menus.forEach(m => {
m.b.addEventListener('click', () => { fermer(m); ouvrir(m, m.b.getAttribute('aria-expanded') !== 'true'); });
m.g.addEventListener('keydown', e => {
if (!m.b.offsetParent) return;
const bas = e.key === 'ArrowDown';
if (e.key === 'Escape' && m.g.classList.contains('is-ouvert')) { e.stopPropagation(); ouvrir(m, false); m.b.focus(); }
else if (bas || e.key === 'ArrowUp') {
e.preventDefault();
ouvrir(m, true);
const o = Array.from(m.g.querySelectorAll('[data-f]:not(:disabled)')), i = o.indexOf(document.activeElement);
o[i < 0 ? (bas ? 0 : o.length - 1) : (i + (bas ? 1 : o.length - 1)) % o.length].focus();
}
});
m.g.addEventListener('focusout', e => { if (e.relatedTarget && !m.g.contains(e.relatedTarget) && flottant(m)) ouvrir(m, false); });
});
document.addEventListener('pointerdown', e => { if (!e.target.closest('.rea-filtres__g')) menus.forEach(m => { if (flottant(m)) ouvrir(m, false); }); });
const filtrer = boutonMenu('rea-menu__b rea-filtrer', EN ? 'Filter' : 'Filtrer');
filtrer.setAttribute('aria-expanded', 'false');
const actifs = document.createElement('div');
actifs.className = 'rea-actifs';
const tout = bouton('rea-tout lnk', EN ? 'Reset' : 'Réinitialiser');
const VIDE = () => ({ exp: [], sect: [], terr: [] });
const rendreFocus = m => (m && m.b.offsetParent ? m.b : filtrer.offsetParent ? filtrer : menus[0].b).focus();
if (filtres && menus.length) {
const plier = on => { filtres.classList.toggle('is-ouvert', on); filtrer.setAttribute('aria-expanded', String(on)); };
menus[0].g.before(filtrer);
menus[menus.length - 1].g.after(actifs);
filtrer.addEventListener('click', () => plier(filtrer.getAttribute('aria-expanded') !== 'true'));
filtres.addEventListener('keydown', e => {
if (e.key === 'Escape' && filtrer.offsetParent && filtrer.getAttribute('aria-expanded') === 'true') { plier(false); filtrer.focus(); }
});
tout.addEventListener('click', () => { rendreFocus(); choisir(VIDE()); });
const voir = bouton('btn btn--papaye btn--sm rea-voir', (EN ? 'View projects' : 'Voir les projets') + '<span class="btn__arrow" aria-hidden="true">'
+ '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" stroke-width="1.6"/></svg></span>');
actifs.after(voir);
voir.addEventListener('click', () => { plier(false); liste.focus({ preventScroll: true }); liste.scrollIntoView({ block: 'start' }); });
}
const vues = Array.from(root.querySelectorAll('[data-vue]'));
const vide = root.querySelector('[data-vide]');
const statut = document.createElement('p');
statut.className = 'sr-only';
statut.setAttribute('aria-live', 'polite');
root.append(statut);
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
const PARAM = { exp: 'expertise', sect: 'secteur', terr: 'territoire' };
const PAR = { liste: 8, grille: 12 };
const PLACE = 4;
const CLE = 'epure-rea-vue';
const etat = VIDE();
let vue = html.getAttribute('data-rea-vue') === 'grille' ? 'grille' : 'liste';
const DEFAUT = 'liste';
const garde = (c, s) => Object.keys(s).every(g => !s[g].length || s[g].some(v => c.dataset[g].split(' ').includes(v)));
function rythme(illus, res, par) {
illus = illus.slice(); res = res.slice();
const out = [];
while (illus.length || res.length) {
const pages = Math.ceil((illus.length + res.length) / par);
const k = Math.min(res.length, Math.ceil(res.length / pages));
const m = Math.min(illus.length, par - k);
const pi = illus.splice(0, m), pr = res.splice(0, k);
const pos = k === 1 ? [Math.min(PLACE, m)] : Array.from({ length: k }, (_, t) => Math.floor((t + 1) * m / (k + 1) + .5));
for (let i = 0; i <= m; i++) {
while (pos.length && pos[0] === i) { pos.shift(); out.push(pr.shift()); }
if (i < m) out.push(pi[i]);
}
out.push(...pr);
}
return out;
}
const MQ2 = window.matchMedia('(max-width:1100px)'), MQ1 = window.matchMedia('(max-width:600px)');
const colonnes = () => (vue !== 'grille' || MQ1.matches ? 0 : MQ2.matches ? 2 : 3);
function zigzag(seq, par, cols) {
if (!cols) return seq;
const out = [];
let j = 0;
for (let a = 0; a < seq.length; a += par) {
const page = seq.slice(a, a + par), n = page.length;
const res = [], pro = [];
page.forEach((c, i) => (c.hasAttribute('data-res') ? res.push(i) : pro.push(c)));
const place = new Array(n);
let rang = -1, prec = -1;
res.forEach((o, t) => {
const p = j++ % (2 * cols - 2), col = p < cols ? p : 2 * cols - 2 - p;
let r = Math.max(Math.floor(o / cols), rang + 1), i = r * cols + col;
while (i >= n && r > rang + 1) i = --r * cols + col;
i = Math.max(Math.min(i, n - (res.length - t)), prec + 1);
place[i] = page[o]; rang = Math.floor(i / cols); prec = i;
});
for (let i = 0; i < n; i++) out.push(place[i] || pro.shift());
}
return out;
}
function rangees(illus, res, cols) {
illus = illus.slice(); res = res.slice();
const out = [];
for (let j = 0; res.length; j++) {
const p = j % (2 * cols - 2), col = p < cols ? p : 2 * cols - 2 - p;
const rang = illus.splice(0, cols - 1);
rang.splice(Math.min(col, rang.length), 0, res.shift());
out.push(...rang);
}
return out.concat(illus);
}
[MQ2, MQ1].forEach(m => m.addEventListener('change', () => {
if (vue !== 'grille') return;
ranger();
if (pager) pager.maj(false);
}));
const deplacer = (c, ref) => (liste.moveBefore ? liste.moveBefore(c, ref) : liste.insertBefore(c, ref));
function poser(seq, qui) {
const dedans = new Set(seq);
for (let i = seq.length - 1; i >= 0; i--) {
const c = seq[i], apres = seq[i + 1] || null;
if (!qui(c)) continue;
let n = c.nextElementSibling;
while (n && !dedans.has(n)) n = n.nextElementSibling;
if (n !== apres) deplacer(c, apres);
}
}
let ordre = cards.slice();
function ranger() {
const on = c => !c.hidden;
const cols = colonnes();
const seq = cols ? rangees(illus0.filter(on), res0.filter(on), cols) : rythme(illus0.filter(on), res0.filter(on), PAR[vue]);
ordre = seq.concat(cards.filter(c => c.hidden));
const chiffree = c => c.hasAttribute('data-res');
poser(seq.filter(c => !chiffree(c)), () => true);
poser(seq, chiffree);
}
const alterner = () => Array.from(liste.children).filter(c => c.classList.contains('rq') && !c.hidden && c.offsetParent !== null)
.forEach((c, i) => c.classList.toggle('rq--inverse', vue === 'liste' && i % 2 === 1));
let pager = null, retire = null, entier = null;
function nouveauPager() {
if (!window.epurePager || !nav) return null;
if (retire) { retire.actif = false; retire.tous.length = 0; if (retire.voix) retire.voix.remove(); }
nav.dataset.par = entier ? cards.length : PAR[vue];
const r = { actif: true, tous: cards.slice() };
const p = window.epurePager({
liste, nav, tous: r.tous,
items: () => (r.actif ? ordre.filter(c => !c.hidden) : []),
apres: vis => { if (r.actif) alterner(vis); },
});
r.voix = nav.nextElementSibling && nav.nextElementSibling.matches('p.sr-only[aria-live]') ? nav.nextElementSibling : null;
retire = r;
return p;
}
function adresse() {
try {
const u = new URL(window.location.href);
Object.keys(PARAM).forEach(g => (etat[g].length ? u.searchParams.set(PARAM[g], etat[g].join(',')) : u.searchParams.delete(PARAM[g])));
u.search = u.searchParams.toString().replace(/%2C/g, ',');
history.replaceState(history.state, '', u);
} catch (e) { }
}
const pastille = (g, v) => chips.find(b => b.dataset.f === g && b.dataset.v === v);
function rendre(reset) {
let n = 0;
cards.forEach(c => {
const on = garde(c, etat);
c.hidden = !on;
if (on) n++;
});
chips.forEach(b => {
const g = b.dataset.f, v = b.dataset.v;
b.setAttribute('aria-pressed', String(v ? etat[g].includes(v) : !etat[g].length));
if (v) b.disabled = !etat[g].includes(v) && b !== document.activeElement && !cards.some(c => garde(c, { ...etat, [g]: [v] }));
});
const pris = menus.flatMap(m => etat[m.f].map(v => [m, v]));
razLigne.hidden = !pris.length;
menus.forEach(m => {
compter(m.b, etat[m.f].length);
m.b.querySelector('.rea-menu__v').textContent = (etat[m.f].length ? etat[m.f] : ['']).map(v => nom(pastille(m.f, v))).join(', ');
});
compter(filtrer, pris.length);
actifs.replaceChildren(...pris.map(([m, v]) => {
const c = pastille(m.f, v);
const x = bouton('rea-actif', c.innerHTML + CROIX);
x.setAttribute('aria-label', (EN ? 'Remove filter ' + m.nom + ': ' : 'Retirer le filtre ' + m.nom + ' : ') + nom(c));
x.addEventListener('click', () => { rendreFocus(m); choisir({ [m.f]: etat[m.f].filter(y => y !== v) }); });
return x;
}), ...(pris.length ? [tout] : []));
if (vide) vide.hidden = n > 0;
if (reset) {
const noms = pris.map(([m, v]) => nom(pastille(m.f, v)));
statut.textContent = !n && vide ? vide.textContent.trim() : (noms.length ? (EN ? 'Filtered projects: ' : 'Projets filtrés : ') + noms.join(', ') : EN ? 'All projects' : 'Tous les projets');
}
adresse();
ranger();
const e = pris.length > 0;
if (e !== entier) { entier = e; pager = nouveauPager(); }
if (pager) pager.maj(reset || entier); else alterner(ordre.filter(c => !c.hidden));
if (reset) {
const neuves = cards.filter(c => !c.hidden && !c.classList.contains('is-hors-page') && !c.classList.contains('is-in'));
neuves.forEach(c => { c.style.transition = 'none'; c.classList.add('is-in'); });
void liste.offsetWidth;
neuves.forEach(c => { c.style.transition = ''; });
}
}
function transition(maj) {
if (!document.startViewTransition || reduce.matches) { maj(); return; }
cards.forEach((c, i) => { c.style.viewTransitionName = 'rea-' + i; c.style.viewTransitionClass = 'rea-c'; });
document.documentElement.classList.add('vt-local');
const t = document.startViewTransition(maj);
t.finished.finally(() => { document.documentElement.classList.remove('vt-local'); cards.forEach(c => { c.style.viewTransitionName = ''; c.style.viewTransitionClass = ''; }); });
}
function choisir(maj) {
Object.assign(etat, maj);
rendre(true);
}
function changerVue(v) {
if (v === vue) return;
const vis = ordre.filter(c => !c.hidden && !c.classList.contains('is-hors-page'));
vue = v;
if (v === 'grille') html.setAttribute('data-rea-vue', 'grille'); else html.removeAttribute('data-rea-vue');
try { if (v !== DEFAUT) localStorage.setItem(CLE, v); else localStorage.removeItem(CLE); } catch (e) { }
vues.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.vue === v)));
adresse();
ranger();
const tete = vis.length ? ordre.filter(c => !c.hidden).indexOf(vis[0]) : 0;
try {
const u = new URL(window.location.href), n = Math.floor(Math.max(0, tete) / PAR[v]) + 1;
if (n > 1) u.searchParams.set('page', n); else u.searchParams.delete('page');
history.replaceState(history.state, '', u);
} catch (e) { }
pager = nouveauPager();
if (pager) pager.maj(false); else alterner(ordre.filter(c => !c.hidden));
statut.textContent = EN ? (v === 'grille' ? 'Projects shown as a grid' : 'Projects shown as a list') : v === 'grille' ? 'Projets affichés en grille' : 'Projets affichés en liste';
}
chips.forEach(b => b.addEventListener('click', () => {
const g = b.dataset.f, v = b.dataset.v;
choisir({ [g]: !v ? [] : etat[g].includes(v) ? etat[g].filter(x => x !== v) : etat[g].concat(v) });
}));
vues.forEach(b => {
b.setAttribute('aria-pressed', String(b.dataset.vue === vue));
b.addEventListener('click', () => transition(() => changerVue(b.dataset.vue)));
});
root.querySelectorAll('[data-raz]').forEach(raz => raz.addEventListener('click', () => choisir(VIDE())));
const q = new URLSearchParams(window.location.search);
Object.keys(PARAM).forEach(g => (q.get(PARAM[g]) || '').split(',').forEach(v => {
const b = v && chips.find(b => b.dataset.f === g && b.dataset.v && (b.dataset.v === v || (b.dataset.anciens || '').split(' ').includes(v)));
if (b && !etat[g].includes(b.dataset.v)) etat[g].push(b.dataset.v);
}));
rendre(false);
})();
