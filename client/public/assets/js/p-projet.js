(function () {
'use strict';
var EN = document.documentElement.lang === 'en';
var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var IO = 'IntersectionObserver' in window;
document.querySelectorAll('[data-film]').forEach(function (fig) {
var video = fig.querySelector('video');
var btn = fig.querySelector('.film__btn');
var lbl = fig.querySelector('.film__l');
var barre = fig.querySelector('.film__barre > span');
if (!video || !btn) return;
var parole = fig.getAttribute('data-film') === 'parole';
video.removeAttribute('controls');
if (!parole) video.muted = true;
btn.hidden = false;
var cmd = document.createElement('button');
var sr = btn.querySelector('.sr-only');
var suite = sr ? sr.textContent : '';
cmd.type = 'button';
cmd.className = 'cmd cmd--lecture';
cmd.innerHTML = '<span class="cmd__p" aria-hidden="true">' + btn.querySelector('.film__ico').innerHTML
+ '<span class="cmd__l"><span></span></span></span>';
btn.after(cmd);
function dire(mot) {
lbl.textContent = mot;
cmd.querySelector('.cmd__l > span').textContent = mot;
cmd.setAttribute('aria-label', mot + suite);
}
dire(EN ? 'Play' : 'Lecture');
fig.classList.add('is-pret');
if (parole) {
var natif = function () {
fig.classList.add('is-parti', 'is-natif');
btn.hidden = cmd.hidden = true;
video.controls = true;
};
var lancer = function () {
natif();
var pr = video.play();
if (pr && pr.catch) pr.catch(function () { });
try { video.focus({ preventScroll: true }); } catch (e) { }
};
btn.addEventListener('click', lancer);
cmd.addEventListener('click', lancer);
video.addEventListener('play', natif);
video.addEventListener('click', function () {
if (video.controls) return;
var pr = video.play();
if (pr && pr.catch) pr.catch(natif);
});
if (IO) {
new IntersectionObserver(function (es) {
es.forEach(function (e) { if (!e.isIntersecting && !video.paused) video.pause(); });
}).observe(fig.querySelector('.film__cadre'));
}
return;
}
var choisi = reduce;
var vu = false, raf = 0;
function etat() {
var joue = !video.paused && !video.ended;
fig.classList.toggle('is-joue', joue);
dire(joue ? 'Pause' : EN ? 'Play' : 'Lecture');
btn.setAttribute('aria-pressed', joue ? 'true' : 'false');
}
function suivre() {
if (barre && video.duration) barre.style.transform = 'scaleX(' + (video.currentTime / video.duration).toFixed(4) + ')';
raf = !video.paused ? requestAnimationFrame(suivre) : 0;
}
function lire() {
if (video.preload === 'none') video.preload = 'auto';
var pr = video.play();
if (pr && pr.catch) pr.catch(function () { etat(); });
}
video.addEventListener('playing', function () { fig.classList.add('is-parti'); etat(); if (!raf) raf = requestAnimationFrame(suivre); });
video.addEventListener('pause', etat);
function basculer() {
if (video.paused) { choisi = false; lire(); } else { choisi = true; video.pause(); }
}
btn.addEventListener('click', basculer);
cmd.addEventListener('click', basculer);
video.addEventListener('click', basculer);
etat();
if (IO) {
new IntersectionObserver(function (es) {
es.forEach(function (e) {
vu = e.intersectionRatio >= 0.5;
if (vu && !choisi && video.paused) lire();
else if (!vu && !video.paused) video.pause();
});
}, { threshold: [0, 0.5] }).observe(fig.querySelector('.film__cadre'));
}
});
document.querySelectorAll('a[data-film-youtube][data-film-debut]').forEach(function (a) {
a.addEventListener('click', function () {
var f = document.querySelector('.visionneuse iframe');
var s = parseInt(a.getAttribute('data-film-debut'), 10);
if (f && s > 0 && f.src.indexOf('start=') < 0) f.src += '&start=' + s;
});
});
document.querySelectorAll('[data-gen]').forEach(function (fig) {
var bandes = [].slice.call(fig.querySelectorAll('.gen__voiles > span'));
if (!bandes.length) return;
if (reduce || !IO) { fig.classList.add('is-vu'); return; }
fig.classList.add('is-arme');
var io = new IntersectionObserver(function (es) {
var arrivent = es.filter(function (e) { return e.isIntersecting; })
.map(function (e) { return e.target; })
.sort(function (a, b) { return bandes.indexOf(a) - bandes.indexOf(b); });
arrivent.forEach(function (b, k) {
b.style.transitionDelay = (0.12 + k * 0.32).toFixed(2) + 's';
b.classList.add('is-parti');
io.unobserve(b);
});
}, { threshold: 0.55, rootMargin: '0px 0px -8% 0px' });
bandes.forEach(function (b) { io.observe(b); });
});
})();
(function () {
'use strict';
var EN = document.documentElement.lang === 'en';
var volets = [].slice.call(document.querySelectorAll('[data-pj-plus]')).map(function (btn) {
return { btn: btn, corps: document.getElementById(btn.getAttribute('aria-controls')), ouvert: false };
}).filter(function (v) { return v.corps; });
if (!volets.length) return;
var raf = 0;
function poser(v, replie) {
v.corps.classList.toggle('is-replie', replie);
v.btn.setAttribute('aria-expanded', replie ? 'false' : 'true');
v.btn.querySelector('.pj-plus__l').textContent = EN ? (replie ? 'Read more' : 'Show less') : replie ? 'Lire la suite' : 'Replier';
}
function evaluer() {
raf = 0;
volets.forEach(function (v) {
if (v.ouvert) return;
v.corps.classList.add('is-replie');
var ligne = parseFloat(getComputedStyle(v.corps).lineHeight) || 29;
var utile = v.corps.scrollHeight - v.corps.clientHeight >= 6 * ligne;
v.btn.hidden = !utile;
poser(v, utile);
});
}
function demander() { if (!raf) raf = requestAnimationFrame(evaluer); }
volets.forEach(function (v) {
v.btn.addEventListener('click', function () {
v.ouvert = !v.ouvert;
poser(v, !v.ouvert);
if (!v.ouvert && v.corps.getBoundingClientRect().top < 0) v.corps.scrollIntoView({ block: 'start' });
});
v.corps.addEventListener('focusin', function () {
if (v.corps.classList.contains('is-replie')) { v.ouvert = true; poser(v, false); }
});
});
evaluer();
if (document.fonts && document.fonts.ready) document.fonts.ready.then(demander);
window.addEventListener('resize', demander, { passive: true });
})();
