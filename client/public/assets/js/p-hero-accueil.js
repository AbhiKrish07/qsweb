(() => {
const hh = document.querySelector('.hh');
if (!hh) return;
const DEBUT = 0, FIN = 63.0;
const boucler = (v) => {
const garde = () => { if (v.currentTime >= FIN || v.currentTime < DEBUT - .05) v.currentTime = DEBUT; };
v.addEventListener('timeupdate', garde);
if (!v.requestVideoFrameCallback) return;
let suivi = false;
const image = () => { garde(); suivi = v.currentTime > FIN - 1; if (suivi) v.requestVideoFrameCallback(image); };
v.addEventListener('timeupdate', () => { if (!suivi && v.currentTime > FIN - 1) { suivi = true; v.requestVideoFrameCallback(image); } });
v.addEventListener('loadstart', () => { suivi = false; });
};
const q = (s) => hh.querySelector(s);
const scene = q('.hh__scene'), carte = q('.hh__carte'), reel = q('.hh__reel'), voile = q('.hh__voile');
const titre = q('.hh__titre'), cadreTitre = q('.mj__cadre--titre'), fuseaux = q('.hh__fuseaux'), plaques = [...hh.querySelectorAll('.mj__plaque')];
boucler(reel);
const rideau = q('.hh__rideau');
const oter = () => { rideau.remove(); dispatchEvent(new Event('scroll')); };
if (rideau) Promise.all(rideau.getAnimations({ subtree: true }).map((an) => an.finished)).then(oter, oter);
const reduit = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduit) {
const partir = () => reel.play().catch(() => {});
if (document.readyState !== 'loading') partir(); else addEventListener('DOMContentLoaded', partir, { once: true });
}
let a = 0, course = 1;
const ouvert = () => 1 - Math.min(1, Math.max(0, (scrollY - a) / (course * .1)));
const ressort = (couches, cible, prend, LIBRE = 160) => {
const ELAN = 3000, cs = couches.map((c) => ({ f: 1, K: 260, C: 10.5, etire: 0, ...c, x: 0, y: 0, vx: 0, vy: 0 })), tete = cs[0];
let prise = null, rq = 0, t0 = 0, gx = 0, gy = 0;
const elastique = (v) => Math.abs(v) <= LIBRE ? v : Math.sign(v) * (LIBRE + (Math.abs(v) - LIBRE) * .3);
tete.el.classList.add('is-glissable');
const poser = (c) => {
const ici = Math.abs(c.x) + Math.abs(c.y) > .05;
c.el.style.translate = ici ? `${c.x.toFixed(1)}px ${c.y.toFixed(1)}px` : '';
if (c.etire) c.el.style.scale = ici ? `${(1 + Math.min(.06, Math.abs(c.x) * c.etire)).toFixed(3)} ${(1 + Math.min(.06, Math.abs(c.y) * c.etire)).toFixed(3)}` : '';
};
const pas = (t) => {
const dt = t0 ? Math.min(.034, Math.max(.004, (t - t0) / 1000)) : .016;
t0 = t;
let vif = false;
for (const c of cs) {
const tx = elastique(gx) * c.f, ty = elastique(gy) * c.f;
if (prise) {
const ax = tx - c.x, ay = ty - c.y;
c.vx = ax / dt; c.vy = ay / dt; c.x = tx; c.y = ty;
if (Math.abs(ax) + Math.abs(ay) > .04) vif = true;
} else {
const cc = reduit ? 2 * Math.sqrt(c.K) : c.C, h = dt / 4;
for (let i = 0; i < 4; i++) { c.vx += (c.K * (tx - c.x) - cc * c.vx) * h; c.vy += (c.K * (ty - c.y) - cc * c.vy) * h; c.x += c.vx * h; c.y += c.vy * h; }
if (Math.abs(c.x - tx) < .4 && Math.abs(c.y - ty) < .4 && Math.hypot(c.vx, c.vy) < 8) { c.x = tx; c.y = ty; c.vx = c.vy = 0; } else vif = true;
}
poser(c);
}
rq = vif ? requestAnimationFrame(pas) : 0;
if (!rq) t0 = 0;
};
const lancer = () => { if (!rq) rq = requestAnimationFrame(pas); };
cible.addEventListener('pointerdown', (e) => {
if (prise || (e.pointerType === 'mouse' && e.button) || !prend(e)) return;
e.preventDefault();
prise = { id: e.pointerId, x0: e.clientX - gx, y0: e.clientY - gy, tenu: false };
tete.el.classList.add('is-prise');
});
cible.addEventListener('pointermove', (e) => {
if (!prise || e.pointerId !== prise.id) return;
const dx = e.clientX - prise.x0, dy = e.clientY - prise.y0;
if (!prise.tenu) {
if (Math.hypot(dx - gx, dy - gy) < 4) return;
prise.tenu = true; cible.setPointerCapture(e.pointerId); tete.el.classList.add('is-tenu');
}
gx = dx; gy = dy;
lancer();
});
const lacher = (e) => {
if (!prise || e.pointerId !== prise.id) return;
const tenu = prise.tenu, v = Math.hypot(tete.vx, tete.vy), m = reduit ? 0 : Math.min(1, ELAN / (v || 1));
prise = null;
tete.el.classList.remove('is-prise');
if (!tenu) return;
tete.el.classList.remove('is-tenu');
gx = gy = 0;
for (const c of cs) { c.vx *= m; c.vy *= m; }
lancer();
};
['pointerup', 'pointercancel', 'lostpointercapture'].forEach((nm) => cible.addEventListener(nm, lacher));
};
const souris = matchMedia('(hover: hover) and (pointer: fine)').matches;
const chutes = [...hh.querySelectorAll('.mj__chute')].sort((p, q2) => p.style.getPropertyValue('--k') - q2.style.getPropertyValue('--k'));
if (chutes.length === 6 && souris)
ressort(chutes.map((el, k) => ({ el, f: 1 - k / 6, C: 18, etire: k ? 0 : 1 / 2400 })),
carte, (e) => e.pointerType === 'mouse' && scrollY - a < course * .4, Infinity);
const etoile = q('.hh__titre .mj__etoile');
if (etoile) {
const pres = (e) => {
const r = etoile.getBoundingClientRect();
return Math.hypot(e.clientX - r.left - r.width / 2, e.clientY - r.top - r.height / 2) < Math.max(r.width * .6, 30);
};
ressort([{ el: etoile }], scene, pres);
scene.addEventListener('touchstart', (e) => { if (e.touches.length === 1 && pres(e.touches[0])) e.preventDefault(); }, { passive: false });
}
if (reduit) return;
let pencher = null;
{
const TX = 1.02, TY = 1.43, ROT = .26, MAX = 40, LISSE = .1;
const PENTE = 10;
const couches = [[carte, 1.6, 1.2], ...[...plaques].reverse().map((el, i) => [el, [.95, .8, .65, .5, .35][i], [1.15, 1.12, 1.09, 1.06, 1.03][i]])]
.map(([el, f, d]) => ({ el, f, d, ox: 0, oy: 0, x: 0, y: 0 }));
let sx = null, sy = 0, px = 0, py = 0, rq = 0, incl = null;
const B = (v) => Math.max(-MAX, Math.min(MAX, v));
const pas = () => {
if (chutes[0]?.classList.contains('is-prise')) { px = sx; py = sy; rq = requestAnimationFrame(pas); return; }
const k = ouvert();
const vx = B(incl ? incl[0] * PENTE : sx - px) * k, vy = B(incl ? incl[1] * PENTE : sy - py) * k;
px = sx; py = sy;
let vif = !incl && (vx !== 0 || vy !== 0);
for (const c of couches) {
c.ox += (vx * c.f - c.ox) * LISSE * c.d; c.oy += (vy * c.f - c.oy) * LISSE * c.d;
c.x += (c.ox - c.x) * LISSE; c.y += (c.oy - c.y) * LISSE;
const n = Math.abs(c.x) + Math.abs(c.y) + Math.abs(c.ox) + Math.abs(c.oy);
if (n < .02) { c.x = c.y = c.ox = c.oy = 0; c.el.style.translate = c.el.style.rotate = ''; continue; }
vif = vif || !incl || Math.abs(vx * c.f - c.x) + Math.abs(vy * c.f - c.y) > .02;
const r = ROT * Math.hypot(c.x, c.y);
c.el.style.translate = `${(TX * c.x).toFixed(2)}px ${(TY * c.y).toFixed(2)}px`;
c.el.style.rotate = r > .01 ? `${c.x.toFixed(3)} ${c.y.toFixed(3)} 0 ${r.toFixed(2)}deg` : '';
}
rq = vif ? requestAnimationFrame(pas) : 0;
};
if (souris) addEventListener('pointermove', (e) => {
if (e.pointerType !== 'mouse') return;
if (sx === null) { px = e.clientX; py = e.clientY; }
sx = e.clientX; sy = e.clientY;
if (!rq) rq = requestAnimationFrame(pas);
}, { passive: true });
else pencher = (x, y) => { incl = [x, y]; if (!rq) rq = requestAnimationFrame(pas); };
}
hh.dataset.effet = '1';
const mots = [...hh.querySelectorAll('.hh__w')];
const bis = document.createElement('video');
bis.className = 'hh__bis';
bis.muted = bis.loop = bis.playsInline = true;
bis.preload = 'none';
bis.setAttribute('aria-hidden', 'true');
carte.insertBefore(bis, voile);
boucler(bis);
const place = (el) => { let x = 0, y = 0; for (; el && el !== scene; el = el.offsetParent) { x += el.offsetLeft; y += el.offsetTop; } return { x, y }; };
let H = 1, ax1 = 1, ay1 = 1, dx = 0, dy = 0, portrait = false, sortie = 1, r = 0;
const tel = matchMedia('(max-width: 900px)');
const mesurer = () => {
const W = scene.clientWidth, F = carte.offsetWidth;
r = parseFloat(getComputedStyle(carte).borderTopLeftRadius) || 0;
const c = place(carte), t = place(titre);
H = scene.clientHeight;
sortie = t.y + titre.offsetHeight + 24;
ax1 = (W + 2) / (F - .64 * r); ay1 = (H + 2) / (F - .64 * r);
dx = W / 2 - c.x - F / 2; dy = H / 2 - c.y - F / 2;
portrait = W < H;
a = hh.getBoundingClientRect().top + scrollY;
const ms = getComputedStyle(scene);
course = Math.max(1, hh.offsetHeight - H - (parseFloat(ms.marginTop) || 0) - (parseFloat(ms.marginBottom) || 0));
};
const B = (v) => Math.min(1, Math.max(0, v)), S = (t) => t * t * (3 - 2 * t), n = (v) => +v.toFixed(4);
const montee = (p) => S(B(p / .55));
const cadre = (e) => `translate(${n(dx * e)}px,${n(dy * e)}px) rotate(${n(4 * (1 - e))}deg) scale(${n(1 + (ax1 - 1) * e)},${n(1 + (ay1 - 1) * e)})`;
const contre = (e, kx, ky) => {
const ax = 1 + (ax1 - 1) * e, ay = 1 + (ay1 - 1) * e, v = Math.max(ax * kx, ay * ky);
return `scale(${n(v / ax)},${n(v / ay)})`;
};
const MONTEE = [...Array(12).keys()].map((i) => i * .05);
const coins = (e) => {
const R = r * (1 - e), sx = 1 + (ax1 - 1) * e, sy = 1 + (ay1 - 1) * e;
return { borderRadius: `${n(R / sx)}px / ${n(R / sy)}px` };
};
const pistes = () => [
[carte, MONTEE, (p) => ({ transform: cadre(montee(p)) })],
...[carte, ...plaques].map((el) => [el, MONTEE, (p) => (tel.matches ? coins(montee(p)) : {})]),
[reel, MONTEE, (p) => ({ transform: contre(montee(p), 1, 1) })],
[bis, MONTEE, (p) => ({ transform: 'translate(-50%,-50%) ' + contre(montee(p), portrait ? 1 : 9 / 16, portrait ? 9 / 16 : 1),
opacity: n(B((montee(p) - .08) / (tel.matches ? .06 : .25))) })],
...plaques.map((el) => [el, MONTEE, (p) => ({ transform: cadre(montee(p)) })]),
[cadreTitre, [0, .14, .2, .26, .32, .38, .44, .5], (p) => { const t = S(B((p - .14) / .36)); return { transform: `translateY(${n(-sortie * t)}px)`, opacity: n(B(3 * (1 - t))) }; }],
[fuseaux, [0, .06, .12, .18], (p) => { const t = S(B(p / .18)); return { transform: `translateY(${n(.05 * H * t)}px)`, opacity: n(1 - t) }; }],
[voile, [.42, .52, .62], (p) => ({ opacity: n(.56 * S(B((p - .42) / .2))) })],
...mots.map((el, i) => {
const d = .58 + .3 * i / mots.length;
return [el, [d, d + .04, d + .08], (p) => { const t = S(B((p - d) / .08)); return { transform: `translateY(${n(45 * (1 - t))}%)`, opacity: n(t) }; }];
}),
];
let format = '', relaye = false;
const FILMS = {
paysage: { av1: '/assets/video/showreel-bitwip-agence-communication-paysage-av1.mp4',
hevc: '/assets/video/showreel-bitwip-agence-communication-paysage-hevc.mp4', h264: '/assets/video/showreel-bitwip-agence-communication-paysage.mp4' },
portrait: { av1: '/assets/video/showreel-bitwip-agence-communication-portrait-av1.mp4',
hevc: '/assets/video/showreel-bitwip-agence-communication-portrait-hevc.mp4', h264: '/assets/video/showreel-bitwip-agence-communication-portrait.mp4' },
};
const charger = () => {
const f = portrait ? 'portrait' : 'paysage';
if (format === f) return;
const src = (reel.currentSrc || reel.querySelector('source:last-of-type').src).split('#')[0];
format = bis.dataset.format = f;
bis.classList.remove('is-pret');
let codec = src.match(/-(av1|hevc)\.mp4$/)?.[1] ?? 'h264';
if (portrait && codec === 'av1') codec = bis.canPlayType('video/mp4; codecs="hvc1.1.6.L93.B0"') ? 'hevc' : 'h264';
bis.src = FILMS[f][codec];
bis.currentTime = reel.currentTime + .2;
};
const ecart = () => {
const t = FIN - DEBUT, d = reel.currentTime - bis.currentTime;
return d > t / 2 ? d - t : d < -t / 2 ? d + t : d;
};
reel.addEventListener('timeupdate', () => {
if (!bis.src || bis.paused || bis.readyState < 3 || bis.seeking) return;
const d = ecart();
if (Math.abs(d) > .6) return void (bis.currentTime = reel.currentTime + .2);
bis.playbackRate = 1 + Math.max(-.15, Math.min(.15, d));
if (Math.abs(d) < .12 && !bis.classList.contains('is-pret')) { bis.classList.add('is-pret'); relais(); }
});
const relais = () => {
const e = montee(B((scrollY - a) / course));
if (e > 0) charger();
if (!bis.src) return;
if (e === 0) {
if (!bis.paused) { bis.pause(); bis.classList.remove('is-pret'); }
} else if (bis.paused && !relaye) { bis.currentTime = reel.currentTime + .2; bis.play().catch(() => {}); }
if (e > .5 && bis.classList.contains('is-pret')) { if (!relaye) { relaye = true; reel.pause(); } }
else if (relaye && e <= .5) { relaye = false; reel.currentTime = bis.currentTime; reel.play().catch(() => {}); }
};
let tout;
if (window.ScrollTimeline) {
const racine = document.documentElement, tl = new ScrollTimeline({ source: racine, axis: 'block' }), anims = new Map();
const hauteur = () => {
const m = racine.scrollHeight - racine.clientHeight, t = tl.currentTime?.value, v = scrollY * 100 / t;
return scrollY > 50 && t > 0 && Math.abs(v / m - 1) < .1 ? v : m;
};
let M = 0, attente = 0;
const construire = () => {
M = hauteur();
const o = (p) => B((a + p * course) / M);
pistes().forEach(([el, pts, f], i) => {
const kf = [{ offset: 0, ...f(pts[0]) }, ...pts.map((p) => ({ offset: o(p), ...f(p) })), { offset: 1, ...f(pts.at(-1)) }];
const an = anims.get(i);
if (an) an.effect.setKeyframes(kf);
else anims.set(i, el.animate(kf, { timeline: tl, fill: 'both' }));
});
};
tout = () => { mesurer(); construire(); relais(); };
const verifier = () => { attente = 0; if (Math.abs(hauteur() - M) > 1) construire(); };
const planifier = () => { clearTimeout(attente); attente = setTimeout(verifier, scrollY > a + course + innerHeight ? 0 : 200); };
new ResizeObserver(planifier).observe(document.body);
addEventListener('scroll', () => { relais(); if (attente) planifier(); }, { passive: true });
} else {
let image = 0, liste = [];
const peindre = () => {
image = 0;
const p = B((scrollY - a) / course);
for (const [el, , f] of liste) Object.assign(el.style, f(p));
relais();
};
tout = () => { mesurer(); liste = pistes(); peindre(); };
addEventListener('scroll', () => { if (!image) image = requestAnimationFrame(peindre); }, { passive: true });
}
let ecran = '';
const taille = () => innerWidth + 'x' + scene.clientHeight;
addEventListener('resize', () => { if (taille() !== ecran) { ecran = taille(); tout(); } });
addEventListener('load', tout);
if (document.fonts) document.fonts.ready.then(tout);
ecran = taille();
tout();
let mx = -1e4, my = -1e4;
const boucle = (pas) => { let rq = 0; const tour = () => { rq = pas() ? requestAnimationFrame(tour) : 0; }; return () => { if (!rq) rq = requestAnimationFrame(tour); }; };
const reveils = [], reveiller = () => reveils.forEach((r) => r());
const visible = () => mx > -1e3 && scrollY < a + course + scene.clientHeight;
let incliner = null;
if (souris) {
addEventListener('pointermove', (e) => { if (e.pointerType !== 'mouse') return; mx = e.clientX; my = e.clientY; reveiller(); }, { passive: true });
addEventListener('scroll', () => { if (visible()) reveiller(); }, { passive: true });
}
(() => {
const gl = [...hh.querySelectorAll('.hh__titre .mj__l2 .mj__c')].map((el) => ({ el, s: 0 })), l2 = q('.hh__titre .mj__l2');
const reveil = boucle(() => {
const r = l2.getBoundingClientRect(), cy = r.top + r.height / 2, k = visible() ? 1 : 0;
let vif = false;
for (const g of gl) {
const b = g.el.getBoundingClientRect(), dx = (mx - b.left - b.width / 2) / (r.height * .55), dy = (my - cy) / (r.height * .75);
const cible = k * Math.exp(-dx * dx - dy * dy);
g.s += (cible - g.s) * .16;
if (Math.abs(cible - g.s) < .003 && g.s < .003) g.s = 0; else vif = true;
g.el.style.scale = g.s ? `${(1 + .07 * g.s).toFixed(3)} ${(1 + .22 * g.s).toFixed(3)}` : '';
}
return vif;
});
reveils.push(reveil);
})();
(() => {
const fantome = q('.mj__fantome');
const lignes = [...hh.querySelectorAll('.hh__titre :is(.mj__l1,.mj__l2)')], accroche = q('.hh__titre .mj__lead');
let rx = 0, ry = 0, ix = null, iy = 0;
const borne = (v) => Math.max(-1, Math.min(1, v));
const reveil = boucle(() => {
if (chutes[0]?.classList.contains('is-prise')) return true;
const r = scene.getBoundingClientRect(), k = (ix !== null ? scrollY < a + course + scene.clientHeight : visible()) ? 1 : 0;
const nx = ix ?? borne((mx - r.left - r.width / 2) / (r.width / 2)), ny = ix !== null ? iy : borne((my - r.top - r.height / 2) / (r.height / 2));
const fort = ix !== null ? 1.5 : 1;
const tx = 7 * fort * nx * k, ty = -5 * fort * ny * k;
ry += (tx - ry) * .07; rx += (ty - rx) * .07;
const fin = Math.abs(tx - ry) + Math.abs(ty - rx) < .01;
if (fin && !k) rx = ry = 0;
const pose = (el, f) => { const a = Math.hypot(rx, ry) * f; el.style.rotate = a > .01 ? `${rx.toFixed(4)} ${ry.toFixed(4)} 0 ${a.toFixed(3)}deg` : ''; };
pose(titre, 1);
pose(fantome, ouvert());
if (ix !== null) {
const d = (f) => (rx || ry ? `${(-.9 * f * ry).toFixed(2)}px ${(.9 * f * rx).toFixed(2)}px` : '');
titre.style.translate = d(1);
accroche.style.translate = d(.25);
lignes.forEach((el) => pose(el, .5));
}
return !fin;
});
incliner = () => {
titre.style.perspective = '1600px';
let x0 = null, y0 = 0, angle0 = 0;
addEventListener('deviceorientation', (e) => {
if (e.beta == null || e.gamma == null) return;
const angle = screen.orientation ? screen.orientation.angle : (window.orientation || 0);
const [x, y] = angle === 90 ? [e.beta, -e.gamma] : angle === 270 || angle === -90 ? [-e.beta, e.gamma] : angle === 180 ? [-e.gamma, -e.beta] : [e.gamma, e.beta];
if (x0 === null || angle !== angle0) { x0 = x; y0 = y; angle0 = angle; }
x0 += (x - x0) * .0005; y0 += (y - y0) * .0005;
ix = borne((x - x0) / 11); iy = borne((y - y0) / 11);
reveil();
if (pencher) pencher(ix, iy);
});
};
reveils.push(reveil);
})();
const DO = window.DeviceOrientationEvent;
if (!souris && DO && typeof DO.requestPermission !== 'function') incliner();
else if (!souris && DO) {
const CLE = 'bitwip-inclinaison';
const lu = () => { try { return sessionStorage.getItem(CLE) || (localStorage.getItem(CLE) === 'oui' ? 'oui' : null); } catch { return null; } };
const note = (v) => { try { (v === 'oui' ? localStorage : sessionStorage).setItem(CLE, v); } catch { } };
const accorde = (etat) => { if (etat === 'granted') { note('oui'); incliner(); return true; } note('non'); return false; };
const montrer = () => {
const b = document.createElement('button');
b.type = 'button';
b.className = 'cmd cmd--incl';
const mot = document.documentElement.lang.startsWith('en') ? 'Tilt your phone' : 'Inclinez votre téléphone';
b.setAttribute('aria-label', mot);
b.innerHTML = '<span class="cmd__p" aria-hidden="true"><svg viewBox="0 0 14 12" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">'
+ '<rect x="4.4" y="1" width="5.2" height="10" rx="1.2" transform="rotate(-20 7 6)"/><path d="M1.2 8.6a6 6 0 0 1 .3-4.4M12.8 3.4a6 6 0 0 1-.3 4.4"/></svg>'
+ `<span class="cmd__l"><span>${mot}</span></span></span>`;
b.addEventListener('click', () => {
const fin = () => b.remove();
DO.requestPermission().then((etat) => { fin(); accorde(etat); }, () => { fin(); note('non'); });
});
const loin = () => b.classList.toggle('is-loin', ouvert() < 1);
addEventListener('scroll', loin, { passive: true });
loin();
carte.append(b);
};
if (lu() === 'oui') DO.requestPermission().then((etat) => accorde(etat), montrer);
else if (lu() !== 'non') montrer();
}
(() => {
const mot = q('.hh__titre .mj__l1 > .mj__m');
if (!mot) return;
const lettresMot = [...mot.textContent];
mot.innerHTML = lettresMot.map((c) => `<span class="mj__g">${c}</span>`).join('');
const gl = [...mot.children], SIGNES = '01<>/{}_;#=';
let dedans = false, enCours = false, prochain = 0;
const decoder = () => {
enCours = true;
prochain = performance.now() + 30000;
mot.style.height = mot.offsetHeight + 'px';
gl.forEach((g) => { g.style.width = g.offsetWidth + 'px'; });
let debut = 0;
const tour = (t) => {
debut ||= t;
const dt = t - debut;
let reste = -1;
gl.forEach((g, i) => {
if (dt < 220 + i * 150) {
if (reste < 0) reste = i;
if (!g.dataset.t || t - g.dataset.t > 45) { g.dataset.t = t; g.textContent = SIGNES[Math.floor(Math.random() * SIGNES.length)]; }
g.classList.add('is-code');
} else if (g.classList.contains('is-code')) { g.classList.remove('is-code'); g.textContent = lettresMot[i]; }
});
gl.forEach((g, i) => g.classList.toggle('is-curseur', i === (reste < 0 ? gl.length - 1 : reste)));
if (reste >= 0) return requestAnimationFrame(tour);
setTimeout(() => { gl.forEach((g) => { g.classList.remove('is-curseur'); g.style.width = ''; delete g.dataset.t; }); mot.style.height = ''; enCours = false; }, 1000);
};
requestAnimationFrame(tour);
};
reveils.push(() => {
const r = mot.getBoundingClientRect(), ici = visible() && mx >= r.left && mx <= r.right && my >= r.top && my <= r.bottom;
if (ici && !dedans && !enCours && performance.now() >= prochain) decoder();
dedans = ici;
});
})();
if (souris && !reduit) {
const fond = (mot) => document.dispatchEvent(new CustomEvent('curseur:fond', { detail: { mot, fleche: true, zone: '.hh' } }));
let t = 0;
const signe = () => {
if (rideau && rideau.isConnected) t = setTimeout(signe, 500);
else if (ouvert() === 1) fond(document.documentElement.lang.startsWith('en') ? 'Scroll' : 'Défiler');
};
const fin = () => { if (ouvert() < 1) { clearTimeout(t); fond(''); removeEventListener('scroll', fin); } };
t = setTimeout(signe, 3000);
addEventListener('scroll', fin, { passive: true });
}
})();
