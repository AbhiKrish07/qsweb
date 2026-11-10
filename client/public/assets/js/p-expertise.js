(() => {
'use strict';
const liste = document.querySelector('[data-prestations]');
const btns = liste ? Array.from(liste.querySelectorAll('.exc-of__btn')) : [];
const corps = btns.map(b => document.getElementById(b.getAttribute('aria-controls')));
const projets = corps.map(c => c.nextElementSibling);
let voulu = -1;
const choisir = (i, garder) => {
const fermer = !garder && btns[i].getAttribute('aria-expanded') === 'true';
btns.forEach((b, k) => {
const on = k === i && !fermer;
b.setAttribute('aria-expanded', String(on));
corps[k].classList.toggle('is-on', on);
if (!on) projets[k].classList.remove('is-ouvert');
});
voulu = fermer ? -1 : i;
if (fermer) return;
Promise.resolve().then(() => {
if (voulu !== i) return;
projets.forEach((p, k) => {
if (k !== i && p.classList.contains('is-on')) {
p.classList.add('is-sort');
setTimeout(() => p.classList.remove('is-sort'), 450);
}
p.classList.toggle('is-on', k === i);
});
projets[i].classList.remove('is-sort');
projets[i].classList.add('is-ouvert');
});
};
if (btns.length) {
btns.forEach((b, i) => {
b.addEventListener('click', () => choisir(i));
b.addEventListener('keydown', e => {
const n = btns.length;
const j = { ArrowDown: i + 1, ArrowUp: i - 1 + n, Home: 0, End: n - 1 }[e.key];
if (j === undefined) return;
e.preventDefault();
btns[j % n].focus();
});
});
liste.classList.add('is-pret');
choisir(0, true);
}
const ouvrir = () => {
let id = '';
try { id = decodeURIComponent(location.hash.slice(1)); } catch (e) { return; }
const d = id && document.getElementById(id);
if (!d || d.tagName !== 'DETAILS') return;
d.open = true;
const i = btns.findIndex(b => b.id === id.replace(/^presta-/, 'exc-p-'));
if (i < 0) return;
choisir(i, true);
btns[i].scrollIntoView({ block: 'center' });
};
addEventListener('hashchange', ouvrir);
ouvrir();
})();
