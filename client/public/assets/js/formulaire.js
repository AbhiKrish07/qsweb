(() => {
'use strict';
const form = document.getElementById('fm');
if (!form) return;
const tpl = form.querySelector('#fm-messages').content;
const message = (k) => tpl.querySelector('[data-m="' + k + '"]');
const val = (n) => (form.elements[n].value || '').trim();
const en = document.documentElement.lang === 'en';
const echec = form.querySelector('.fm__echec');
const bouton = form.querySelector('[type="submit"]');
const origine = form.dataset.origine;
const q = new URLSearchParams(location.search);
let tente = false;
const gabarit = document.getElementById('fm-interne');
const interne = !!gabarit && ['utm_source', 'url_source'].some((k) => (q.get(k) || '').trim().toLowerCase() === 'interne');
let fait;
if (interne) {
const g = gabarit.content;
const listes = JSON.parse(g.querySelector('script').textContent);
const defaut = { ...listes.defauts, ...(q.get('utm_campaign') && { apporteur_affaire: q.get('utm_campaign') }) };
g.querySelectorAll('select').forEach((s) => s.append(...listes[s.name].map((x) => {
const [l, v] = typeof x === 'string' ? [x, x] : [x.libelle, x.valeur];
return new Option(l, v, v === defaut[s.name], v === defaut[s.name]);
})));
form.querySelector('.fm__t').replaceWith(g.querySelector('[data-titre]'));
form.querySelector('.fm__g').before(g.querySelector('[data-g="affaire"]'));
form.elements.structure.closest('.fm__champ').after(g.querySelector('[data-champ="secteur"]'));
form.elements.budget[0].closest('.fm__g').replaceWith(g.querySelector('[data-g="projet"]'));
tpl.append(...g.querySelectorAll('[data-m]'));
fait = g.querySelector('.fm__fait');
form.after(fait);
}
const projet = form.elements.budget;
const INDICATIFS = Object.fromEntries(('AD376 AE971 AF93 AG1268 AI1264 AL355 AM374 AO244 AR54 AS1684 AT43 AU61 AW297 AX358 '
+ 'AZ994 BA387 BB1246 BD880 BE32 BF226 BG359 BH973 BI257 BJ229 BL590 BM1441 BN673 BO591 BQ599 BR55 BS1242 BT975 BW267 '
+ 'BY375 BZ501 CA1 CD243 CF236 CG242 CH41 CI225 CK682 CL56 CM237 CN86 CO57 CR506 CU53 CV238 CW599 CY357 CZ420 DE49 '
+ 'DJ253 DK45 DM1767 DO1809 DZ213 EC593 EE372 EG20 ER291 ES34 ET251 FI358 FJ679 FK500 FM691 FO298 FR33 GA241 GB44 '
+ 'GD1473 GE995 GF594 GG44 GH233 GI350 GL299 GM220 GN224 GP590 GQ240 GR30 GT502 GU1671 GW245 GY592 HK852 HN504 HR385 '
+ 'HT509 HU36 ID62 IE353 IL972 IM44 IN91 IQ964 IR98 IS354 IT39 JE44 JM1876 JO962 JP81 KE254 KG996 KH855 KI686 KM269 '
+ 'KN1869 KP850 KR82 KW965 KY1345 KZ7 LA856 LB961 LC1758 LI423 LK94 LR231 LS266 LT370 LU352 LV371 LY218 MA212 MC377 '
+ 'MD373 ME382 MF590 MG261 MH692 MK389 ML223 MM95 MN976 MO853 MP1670 MQ596 MR222 MS1664 MT356 MU230 MV960 MW265 MX52 '
+ 'MY60 MZ258 NA264 NC687 NE227 NG234 NI505 NL31 NO47 NP977 NR674 NU683 NZ64 OM968 PA507 PE51 PF689 PG675 PH63 PK92 '
+ 'PL48 PM508 PR1787 PS970 PT351 PW680 PY595 QA974 RE262 RO40 RS381 RU7 RW250 SA966 SB677 SC248 SD249 SE46 SG65 SH290 '
+ 'SI386 SK421 SL232 SM378 SN221 SO252 SR597 SS211 ST239 SV503 SX1721 SY963 SZ268 TC1649 TD235 TG228 TH66 TJ992 TL670 '
+ 'TM993 TN216 TO676 TR90 TT1868 TV688 TW886 TZ255 UA380 UG256 US1 UY598 UZ998 VA39 VC1784 VE58 VG1284 VI1340 VN84 '
+ 'VU678 WF681 WS685 XK383 YE967 YT262 ZA27 ZM260 ZW263').split(' ').map((x) => [x.slice(0, 2), x.slice(2)]));
const choix = form.elements.indicatif;
const indAffiche = choix && choix.previousElementSibling;
const afficher = () => { indAffiche.textContent = '+' + INDICATIFS[choix.value]; };
if (choix) {
const langue = en ? 'en' : 'fr';
let noms = (k) => k;
try { const dn = new Intl.DisplayNames([langue], { type: 'region' }); noms = (k) => dn.of(k); } catch (_) { }
const nom = (k) => (k === 'GF' && !en ? 'Guyane' : noms(k));
const tete = ['FR', 'GP', 'GF', 'MQ', 'RE', 'YT'];
const reste = Object.keys(INDICATIFS).filter((k) => !tete.includes(k)).sort((a, b) => nom(a).localeCompare(nom(b), langue));
let fuseau = '';
try { fuseau = Intl.DateTimeFormat().resolvedOptions().timeZone.split('/').pop(); } catch (_) { }
const region = (navigator.language || '').split('-')[1]?.toUpperCase();
const defaut = { Paris: 'FR', Cayenne: 'GF', Guadeloupe: 'GP', Martinique: 'MQ', Reunion: 'RE', Mayotte: 'YT', St_Barthelemy: 'BL',
Marigot: 'MF', Miquelon: 'PM', Tahiti: 'PF', Noumea: 'NC', Brussels: 'BE', Zurich: 'CH', Luxembourg: 'LU',
Monaco: 'MC', Paramaribo: 'SR' }[fuseau] || (INDICATIFS[region] ? region : 'FR');
const option = (k) => new Option(nom(k) + ' (+' + INDICATIFS[k] + ')', k, k === defaut, k === defaut);
const trait = new Option('──────────', '');
trait.disabled = true;
choix.replaceChildren(...tete.map(option), trait, ...reste.map(option));
afficher();
choix.addEventListener('change', () => {
afficher();
if (tente || form.elements.telephone.hasAttribute('aria-invalid')) verifier('telephone');
});
}
const pays = () => (choix ? choix.value : 'FR');
const chiffres = (v) => v.replace(/\s/g, '');
const REGLES = Object.fromEntries(Object.entries({
prenom: (v) => !v && 'prenom',
nom: (v) => !v && 'nom',
email: (v) => !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) && 'email',
telephone: (v) => (!v ? 'tel-vide' : (!/^[\d\s+().\/\u2010-\u2015-]+$/.test(nettoyer(v)) || !normaliser(v, pays())[1]) && 'tel'),
structure: (v) => !v && 'structure',
structure_secteur: (v) => !v && 'secteur',
devis_type: (v) => !v && 'type',
territoire: (v) => !v && 'territoire',
montant: (v) => !/^\d{1,9}([.,]\d{1,2})?$/.test(chiffres(v)) && 'montant',
budget: (v) => !v && 'budget',
message: (v) => !v && 'message',
}).filter(([n]) => form.querySelector('[name="' + n + '"][required]')));
const verifier = (n) => {
const cle = REGLES[n](val(n));
document.getElementById('fm-e-' + n).textContent = cle ? message(cle).textContent : '';
form.querySelectorAll('[name="' + n + '"]').forEach((c) => (cle ? c.setAttribute('aria-invalid', 'true') : c.removeAttribute('aria-invalid')));
return !cle;
};
const PLAN = { FR: '33', GP: '590', BL: '590', MF: '590', GF: '594', MQ: '596', RE: '262', YT: '262' };
const territoire = (n) => (/^0(590|69[01])/.test(n) ? 'GP' : /^0(594|694)/.test(n) ? 'GF' : /^0(596|69[67])/.test(n) ? 'MQ'
: /^0(269|639)/.test(n) ? 'YT' : /^0(26[23]|69[23])/.test(n) ? 'RE' : 'FR');
const PRINCIPAL = { 1: 'US', 7: 'RU', 39: 'IT', 44: 'GB', 47: 'NO', 61: 'AU', 212: 'MA', 290: 'SH', 358: 'FI', 599: 'CW' };
const LONGUEURS = Object.fromEntries(('BE8-9 CH9 ES9 PT9 NL9 GB9-10 IT6-11 BR10-11 SR6-7 GY7 HT8 VE10 CO10 MA9 DZ8-9 TN8 IN10 '
+ 'SN9 CI10 CM9 MG9 MU7-8 KM7 SC7 PF8 NC6 WF6 PM6').split(' ').map((x) => [x.slice(0, 2), x.slice(2).split('-').map(Number)]));
const longueurOk = (p, n) => !LONGUEURS[p] || (n.length >= LONGUEURS[p][0] && n.length <= LONGUEURS[p].at(-1));
const GARDE0 = ['IT', 'SM', 'VA', 'CI', 'CG', 'BJ'];
const nettoyer = (v) => v.replace(/[​-‏‪-‮⁦-⁩﻿]/g, '');
const normaliser = (v, pays) => {
const d = nettoyer(v).replace(/\(0\)/g, '').replace(/[^\d+]/g, '').replace(/^00/, '+'), ind = INDICATIFS[pays];
const fr = d.match(/^\+(?:33|590|594|596|262)0?([1-9]\d{8})$/) || (PLAN[pays] && d.match(/^(?:(?:33|590|594|596|262)0?|0)?([1-9]\d{8})$/));
if (fr) {
const t = territoire('0' + fr[1]), p = PLAN[t] === PLAN[pays] ? pays : t;
return [p, '+' + PLAN[p] + fr[1]];
}
if (/^\+(33|590|594|596|262)/.test(d) || (PLAN[pays] && d[0] !== '+')) return [pays, ''];
let p = pays, e;
if (d[0] === '+') {
const code = Object.values(INDICATIFS).filter((c) => d.startsWith('+' + c)).sort((a, b) => b.length - a.length)[0];
if (!code) return [pays, ''];
if (code !== ind) p = PRINCIPAL[code] || Object.keys(INDICATIFS).find((k) => INDICATIFS[k] === code);
const n = GARDE0.includes(p) ? d.slice(1 + code.length) : d.slice(1 + code.length).replace(/^0/, '');
if (!longueurOk(p, n)) return [p, ''];
e = '+' + code + n;
} else if (ind[0] === '1') {
const n = d.replace(/^1(?=\d{10}$)/, '').replace(new RegExp('^' + ind.slice(1) + '(?=\\d{7}$)'), '');
e = '+' + (n.length === 10 ? '1' : ind) + n;
} else {
const garde = GARDE0.includes(pays);
let n = garde ? d : d.replace(/^0/, '');
if (['RU', 'KZ'].includes(pays)) n = n.replace(/^8(?=\d{10}$)/, '');
if (d[0] !== '0' && n.startsWith(ind)) {
const sans = garde ? n.slice(ind.length) : n.slice(ind.length).replace(/^0/, '');
if (LONGUEURS[pays] ? !longueurOk(pays, n) && longueurOk(pays, sans) : sans.length >= 8) n = sans;
}
if (!longueurOk(pays, n)) return [pays, ''];
e = '+' + ind + n;
}
return [p, (e.startsWith('+1') ? /^\+1[2-9]\d{9}$/ : /^\+[2-9]\d{7,14}$/).test(e) ? e : ''];
};
const suivre = () => {
if (!choix) return;
const [p, e] = normaliser(val('telephone'), pays());
if (e && p !== choix.value) choix.value = p;
afficher();
};
addEventListener('pageshow', suivre);
const horodatage = () => {
const d = new Date(), o = -d.getTimezoneOffset(), a = Math.abs(o), z = (n) => String(n).padStart(2, '0');
return new Date(d.getTime() + o * 6e4).toISOString().slice(0, 19) + (o < 0 ? '-' : '+') + z((a / 60) | 0) + ':' + z(a % 60);
};
const libelle = (c) => c.closest('label').textContent.replace(/\s+/g, ' ').trim();
q.getAll('besoin').join(',').toLowerCase().split(',').forEach((k) => {
const c = form.querySelector('[name="besoins"][value="' + k.trim().split('-')[0] + '"]');
if (c) c.checked = true;
});
form.addEventListener('focusout', (e) => {
const n = e.target.name;
if (REGLES[n] && e.target.type !== 'radio' && (tente || e.target.value.trim())) verifier(n);
if (n === 'telephone') suivre();
});
form.addEventListener('input', (e) => {
const n = e.target.name;
if (n === 'telephone') suivre();
if (REGLES[n] && (tente || e.target.hasAttribute('aria-invalid'))) verifier(n);
});
form.addEventListener('submit', async (e) => {
e.preventDefault();
if (form.hasAttribute('aria-busy')) return;
tente = true;
suivre();
const fautes = Object.keys(REGLES).filter((n) => !verifier(n));
if (fautes.length) {
form.querySelector('[name="' + fautes[0] + '"]').focus();
return;
}
const besoins = [...form.querySelectorAll('[name="besoins"]:checked')];
const budget = form.querySelector('[name="budget"]:checked');
const donnees = {
...(origine && { origine }),
formulaire: interne ? 'contact-interne' : origine || 'contact-site', version: 1, envoye_le: horodatage(), langue: en ? 'en' : 'fr',
prenom: val('prenom'), nom: val('nom'), email: val('email'),
telephone: val('telephone'), telephone_e164: normaliser(val('telephone'), pays())[1], structure: val('structure'),
...(REGLES.territoire && { territoire: val('territoire') }),
...(projet && {
besoins: besoins.map((c) => c.value), besoins_libelles: besoins.map(libelle),
budget: budget.value, budget_libelle: libelle(budget),
}),
...(form.elements.message && { message: val('message') }),
...(interne && {
apporteur_affaire: val('apporteur_affaire'), source_acquisition: val('source_acquisition'),
structure_secteur: val('structure_secteur'), devis_type: val('devis_type'),
montant: Number(chiffres(val('montant')).replace(',', '.')), message: val('message'),
}),
actualites: form.elements.actualites.checked,
page: location.href, referent: document.referrer,
};
['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'url_source'].forEach((k) => (donnees[k] = q.get(k) || ''));
const lead = interne ? null : window.bitwipMesure?.lead({ form, formulaire: donnees.formulaire, besoins: donnees.besoins, budget: donnees.budget });
if (lead) Object.assign(donnees, lead.champs);
donnees.piege = form.elements.piege.value;
donnees.duree_s = Math.round(performance.now() / 1000);
form.setAttribute('aria-busy', 'true');
bouton.disabled = true;
echec.replaceChildren();
try {
const r = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(donnees) });
if (!r.ok) throw new Error('réponse ' + r.status);
if (interne) {
fait.querySelector('[data-qui]').textContent = donnees.prenom + ' ' + donnees.nom + ' · ' + donnees.structure;
form.hidden = true;
fait.hidden = false;
fait.focus();
return;
}
await lead?.enregistrer(donnees.email);
(window.dataLayer = window.dataLayer || []).push({
event: 'contact_envoye', formulaire: donnees.formulaire, langue: donnees.langue,
...(projet && { budget: donnees.budget, besoins: donnees.besoins }),
});
location.assign(en ? '/en/thank-you' : '/merci');
} catch (err) {
console.warn('Formulaire de contact :', err.message);
echec.replaceChildren(message('echec').cloneNode(true));
form.removeAttribute('aria-busy');
bouton.disabled = false;
}
});
fait?.querySelector('button').addEventListener('click', () => {
form.reset();
if (choix) afficher();
tente = false;
form.removeAttribute('aria-busy');
bouton.disabled = false;
fait.hidden = true;
form.hidden = false;
form.elements[0].focus();
});
bouton.disabled = false;
})();
