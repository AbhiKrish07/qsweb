(() => {
'use strict';
const EN = document.documentElement.lang === 'en';
const page = document.querySelector('[data-e404]');
const jeu = document.querySelector('[data-jeu]');
const jouer = document.querySelector('[data-jouer]');
if (!page || !jeu || !jouer || typeof jeu.showModal !== 'function') return;
const statut = jeu.querySelector('[data-jeu-statut]');
const croix = jeu.querySelector('[data-jeu-fermer]');
let origine = null;
const SRC = '/jeu/index.html';
let cadre = null;
let api = null;
let ouvert = false, historique = false, tCharge = 0;
const record = page.querySelector('[data-record]');
const recordN = page.querySelector('[data-record-n]');
const lireRecord = () => { try { return parseInt(localStorage.getItem('bitwip_best_score') || '0', 10) || 0; } catch (e) { return 0; } };
function majRecord(n) {
if (typeof n !== 'number' || !(n > 0)) return;
recordN.textContent = String(n).padStart(6, '0'); record.hidden = false;
}
majRecord(lireRecord());
jouer.hidden = false;
const gb = page.querySelector('[data-gb]');
const gbJouer = gb && gb.querySelector('.gb__jouer');
let video = null, visible = false, choisi = false;
const reduit = window.matchMedia('(prefers-reduced-motion: reduce)');
function majVideo() {
if (!video) return;
const marche = visible && !ouvert && !document.hidden && !reduit.matches && !choisi;
if (marche) {
if (!video.getAttribute('src')) video.src = '/assets/video/jeu-extrait.mp4';
const p = video.play();
if (p && p.catch) p.catch(() => { });
} else if (video.getAttribute('src')) video.pause();
}
if (gb) {
gb.hidden = false;
if (gbJouer) gbJouer.addEventListener('click', () => ouvrir(gbJouer));
video = gb.querySelector('video');
if (video) {
video.muted = true;
video.addEventListener('playing', () => video.classList.add('is-lit'));
if ('IntersectionObserver' in window) {
new IntersectionObserver(es => { visible = es[es.length - 1].isIntersecting; majVideo(); }).observe(gb);
} else { visible = true; majVideo(); }
document.addEventListener('visibilitychange', majVideo);
if (reduit.addEventListener) reduit.addEventListener('change', majVideo);
const pause = document.createElement('button');
pause.type = 'button';
pause.className = 'cmd cmd--lecture gb__pause';
pause.hidden = true;
pause.innerHTML = '<span class="cmd__p" aria-hidden="true"><svg viewBox="0 0 12 12"><path fill="currentColor"/></svg>'
+ '<span class="cmd__l"><span></span></span></span>';
const trace = pause.querySelector('path'), mot = pause.querySelector('.cmd__l > span');
const etat = () => {
const joue = !video.paused;
trace.setAttribute('d', joue ? 'M2.5 1.5h2.4v9H2.5zM7.1 1.5h2.4v9H7.1z' : 'M2.5 1.2l8.3 4.8-8.3 4.8z');
mot.textContent = joue ? 'Pause' : EN ? 'Play' : 'Lecture';
pause.setAttribute('aria-label', joue ? (EN ? 'Pause the game preview' : 'Mettre l’extrait du jeu en pause')
: EN ? 'Play the game preview' : 'Lire l’extrait du jeu');
pause.hidden = reduit.matches || !video.classList.contains('is-lit');
};
pause.addEventListener('click', () => { choisi = !video.paused; if (choisi) video.pause(); else majVideo(); });
['playing', 'pause'].forEach(e => video.addEventListener(e, etat));
if (reduit.addEventListener) reduit.addEventListener('change', etat);
gb.append(pause);
}
}
const ordre = nom => {
if (!api || typeof api[nom] !== 'function') return undefined;
try { return api[nom](); } catch (e) { return undefined; }
};
function ouvrir(par) {
if (ouvert) { donnerLaMain(); return; }
ouvert = true;
origine = par || gbJouer || jouer;
majVideo();
jeu.classList.remove('is-pret');
statut.textContent = EN ? 'Loading the game' : 'Chargement de la partie';
document.documentElement.classList.add('jeu-plein');
jeu.showModal();
cadre = document.createElement('iframe');
cadre.title = EN ? 'Super Bitwip Bros, a Bitwip platform game' : 'Super Bitwip Bros, jeu de plateforme de Bitwip';
cadre.setAttribute('allow', 'autoplay; gamepad');
cadre.addEventListener('load', pret);
cadre.src = SRC;
jeu.prepend(cadre);
try { history.pushState({ jeu404: true }, ''); historique = true; } catch (e) { historique = false; }
clearTimeout(tCharge);
tCharge = setTimeout(() => {
if (ouvert && !jeu.classList.contains('is-pret')) statut.textContent = EN ? 'The game is taking a while to load' : 'Le jeu met du temps à venir';
}, 12000);
}
function pret() {
if (!ouvert || !cadre) return;
if (!api) { try { api = cadre.contentWindow.BitwipJeu || null; } catch (e) { api = null; } }
if (jeu.classList.contains('is-pret')) return;
try {
const accueil = cadre.contentDocument.getElementById('home-btn');
if (accueil) accueil.remove();
cadre.contentWindow.addEventListener('keydown', e => {
if (e.key !== 'Escape' || (e.target && e.target.tagName === 'INPUT')) return;
e.preventDefault(); e.stopImmediatePropagation();
fermer(false);
}, true);
} catch (e) { }
clearTimeout(tCharge);
jeu.classList.add('is-pret');
statut.textContent = EN ? 'Game ready' : 'Partie prête';
donnerLaMain();
}
function donnerLaMain() {
if (!cadre) return;
try { cadre.focus({ preventScroll: true }); } catch (e) { }
try { cadre.contentWindow.focus(); } catch (e) { }
}
function fermer(depuisHistorique) {
if (!ouvert) return;
if (historique && !depuisHistorique) {
historique = false; history.back();
setTimeout(() => { if (ouvert) fermer(true); }, 400);
return;
}
historique = false;
ouvert = false;
majVideo();
clearTimeout(tCharge);
if (cadre) { cadre.remove(); cadre = null; api = null; }
if (jeu.open) jeu.close();
jeu.classList.remove('is-pret');
document.documentElement.classList.remove('jeu-plein');
majRecord(lireRecord());
(origine || jouer).focus({ preventScroll: true });
}
jouer.addEventListener('click', () => ouvrir(jouer));
if (croix) croix.addEventListener('click', () => fermer(false));
jeu.addEventListener('cancel', e => { e.preventDefault(); fermer(false); });
jeu.addEventListener('click', e => { if (e.target === jeu) donnerLaMain(); });
window.addEventListener('popstate', () => { if (ouvert) fermer(true); });
window.addEventListener('message', e => {
if (!cadre || e.source !== cadre.contentWindow || e.origin !== location.origin) return;
const d = e.data;
if (!d || d.source !== 'bitwip-jeu') return;
if (d.type === 'pret') { pret(); majRecord(d.meilleur); }
else if (d.type === 'etat') majRecord(d.meilleur);
else if (d.type === 'quitter') fermer(false);
});
document.addEventListener('visibilitychange', () => {
if (document.hidden && ouvert) { ordre('toutRelacher'); ordre('pause'); }
});
function parAncre() {
if (location.hash !== '#jeu') return;
try { history.replaceState(history.state, '', location.pathname + location.search); } catch (e) { }
ouvrir();
}
window.addEventListener('hashchange', parAncre);
parAncre();
})();
