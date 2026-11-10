(function () {
'use strict';
const EN = document.documentElement.lang === 'en';
const avance = (tz, d) => {
const p = {};
new Intl.DateTimeFormat('en-US', { timeZone: tz, year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' })
.formatToParts(d).forEach(o => { p[o.type] = +o.value; });
return (Date.UTC(p.year, p.month - 1, p.day, p.hour % 24, p.minute) - d.getTime()) / 60000;
};
document.querySelectorAll('[data-decalage-tz]').forEach(el => {
try {
const d = new Date(); d.setSeconds(0, 0);
const m = Math.round(avance(el.dataset.decalageTz, d) + d.getTimezoneOffset());
const b = el.querySelector('b');
if (!m || !b) return;
const h = Math.floor(Math.abs(m) / 60), mn = Math.abs(m) % 60;
b.textContent = (m < 0 ? '−' : '+') + h + (EN ? 'h' : ' h') + (mn ? (EN ? '' : ' ') + String(mn).padStart(2, '0') : '');
el.hidden = false;
} catch (err) { }
});
const melanger = l => {
for (let n = l.length - 1; n > 0; n--) { const j = Math.floor(Math.random() * (n + 1)); [l[n], l[j]] = [l[j], l[n]]; }
return l;
};
document.querySelectorAll('[data-tirage]').forEach(g => {
const cartes = Array.from(g.children).filter(c => c.hasAttribute('data-tir'));
const fixes = Array.from(g.children).filter(c => !c.hasAttribute('data-tir'));
const voulu = parseInt(g.dataset.qr, 10) || 0;
if (!cartes.length || !voulu) return;
const groupes = cartes.map(c => c.dataset.tir).filter((x, n, l) => l.indexOf(x) === n).sort();
const tirees = groupes.reduce((l, x) => l.concat(melanger(cartes.filter(c => c.dataset.tir === x))), []).slice(0, voulu);
cartes.forEach(c => { c.hidden = tirees.indexOf(c) < 0; });
const pied = fixes.length ? fixes[0] : null;
tirees.forEach(c => g.insertBefore(c, pied));
});
})();
