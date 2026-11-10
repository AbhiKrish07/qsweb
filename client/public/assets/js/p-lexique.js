(() => {
'use strict';
const EN = document.documentElement.lang === 'en';
const root = document.querySelector('[data-lexique]');
if (!root) return;
const champ = root.querySelector('#lx-q');
const vider = root.querySelector('.lx__vider');
const statut = root.querySelector('[data-statut]');
const vide = root.querySelector('[data-vide]');
const lettres = Array.from(root.querySelectorAll('.lx-l'));
const termes = Array.from(root.querySelectorAll('.lx-t'));
const az = new Map(Array.from(root.querySelectorAll('[data-az]')).map(a => [a.dataset.az, a]));
const lettreCourante = root.querySelector('[data-courante]');
const total = termes.length;
const tout = root.querySelector('.lx-az__tout');
const mqTel = matchMedia('(max-width: 900px)');
const enFiltre = () => !!tout && mqTel.matches;
let filtre = null;
const pluriel = n => n + (EN ? (n > 1 ? ' definitions' : ' definition') : n > 1 ? ' définitions' : ' définition');
const cle = s => s.replace(/œ/g, 'oe').replace(/Œ/g, 'Oe').replace(/æ/g, 'ae').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’']/g, ' ').toLowerCase()
.replace(/[^a-z0-9]+/g, ' ').trim();
const index = termes.map(el => ({ el, nom: ' ' + el.dataset.lx + ' ', def: ' ' + el.dataset.lxDef + ' ' }));
function chercher() {
const q = cle(champ.value);
const mots = q ? q.split(' ') : [];
let n = 0;
index.forEach(t => {
const dans = s => mots.every(m => s.includes(' ' + m));
const on = !mots.length || dans(t.nom) || dans(t.def);
t.el.hidden = !on;
if (on) n++;
});
lettres.forEach(l => {
const on = l.querySelector('.lx-t:not([hidden])') !== null;
l.hidden = !on || (filtre !== null && l.dataset.lettre !== filtre);
const a = az.get(l.dataset.lettre);
if (!a) return;
if (on) { a.removeAttribute('aria-disabled'); a.removeAttribute('tabindex'); }
else { a.setAttribute('aria-disabled', 'true'); a.setAttribute('tabindex', '-1'); }
});
vider.hidden = !champ.value;
vide.hidden = n > 0;
const choisie = filtre && lettres.find(l => l.dataset.lettre === filtre);
const saisi = champ.value.trim(), cite = EN ? '“' + saisi + '”' : '« ' + saisi + ' »';
statut.textContent = choisie ? (EN ? 'Letter ' : 'Lettre ') + filtre.toUpperCase() + (EN ? ': ' : '\u202f: ') + pluriel(choisie.querySelectorAll('.lx-t').length)
: !mots.length ? ''
: n ? pluriel(n) + (EN ? ' for ' : ' pour ') + cite
: (EN ? 'No definition for ' : 'Aucune définition pour ') + cite;
}
function remettre() {
if (!champ.value && filtre === null) return;
champ.value = '';
filtrer(null);
}
function filtrer(c) {
filtre = c;
if (tout) tout.setAttribute('aria-pressed', c === null ? 'true' : 'false');
if (enFiltre()) az.forEach((a, k) => a.setAttribute('aria-pressed', k === c ? 'true' : 'false'));
chercher();
}
function regler() {
const on = enFiltre();
if (tout) tout.parentElement.hidden = !on;
az.forEach(a => {
if (on) { a.setAttribute('role', 'button'); a.setAttribute('aria-pressed', 'false'); }
else { a.removeAttribute('role'); a.removeAttribute('aria-pressed'); }
});
filtrer(null);
}
if (tout) {
tout.addEventListener('click', () => filtrer(null));
(mqTel.addEventListener ? mqTel.addEventListener('change', regler) : mqTel.addListener(regler));
regler();
}
if (champ) {
champ.addEventListener('input', () => (filtre !== null ? filtrer(null) : chercher()));
champ.addEventListener('keydown', e => { if (e.key === 'Escape' && champ.value) { e.preventDefault(); remettre(); } });
vider.addEventListener('click', () => { remettre(); champ.focus(); });
if (champ.value) chercher();
}
root.addEventListener('keydown', e => {
const a = e.key === ' ' && e.target.closest && e.target.closest('a[data-az][role="button"]');
if (a) { e.preventDefault(); a.click(); }
});
root.addEventListener('click', e => {
const a = e.target.closest('a[href^="#"]');
if (!a) return;
if (a.dataset.az && enFiltre()) {
e.preventDefault();
if (a.getAttribute('aria-disabled') !== 'true') filtrer(a.dataset.az);
return;
}
const cible = document.getElementById(decodeURIComponent(a.getAttribute('href').slice(1)));
if (cible && (cible.hidden || cible.closest('[hidden]'))) remettre();
if (a.classList.contains('lx-t__lien') && navigator.clipboard && window.isSecureContext) {
const url = location.href.split('#')[0] + a.getAttribute('href');
navigator.clipboard.writeText(url).then(() => {
statut.textContent = EN ? 'Link to “' + a.textContent.trim() + '” copied' : 'Lien vers « ' + a.textContent.trim() + ' » copié';
document.dispatchEvent(new CustomEvent('curseur:dire', { detail: { mot: EN ? 'Link copied' : 'Lien copié' } }));
}).catch(() => {});
}
});
if ('IntersectionObserver' in window) {
const vues = new Set();
let courante = null;
const marquer = () => {
const l = lettres.filter(x => vues.has(x) && !x.hidden)[0];
const c = l ? l.dataset.lettre : null;
if (c === courante) return;
if (courante && az.get(courante)) { az.get(courante).classList.remove('is-on'); az.get(courante).removeAttribute('aria-current'); }
courante = c;
if (c && az.get(c)) { az.get(c).classList.add('is-on'); az.get(c).setAttribute('aria-current', 'location'); }
if (c && lettreCourante) {
lettreCourante.textContent = c.toUpperCase();
lettreCourante.classList.remove('is-change');
void lettreCourante.offsetWidth;
lettreCourante.classList.add('is-change');
}
};
const io = new IntersectionObserver(entries => {
entries.forEach(en => (en.isIntersecting ? vues.add(en.target) : vues.delete(en.target)));
marquer();
}, { rootMargin: '-30% 0px -60% 0px' });
lettres.forEach(l => io.observe(l));
}
})();
