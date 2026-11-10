(() => {
'use strict';
const dl = (window.dataLayer = window.dataLayer || []);
const corps = document.body;
const q = new URLSearchParams(location.search);
const interne = ['utm_source', 'url_source'].some((k) => (q.get(k) || '').trim().toLowerCase() === 'interne');
const lire = (s, k) => { try { return JSON.parse(window[s].getItem(k)); } catch { return null; } };
const ecrire = (s, k, v) => { try { window[s].setItem(k, JSON.stringify(v)); } catch { } };
const effacer = (s, k) => { try { window[s].removeItem(k); } catch { } };
const PROV = 'bitwip_provenance', LEAD = 'bitwip_lead', CTA = 'bitwip_cta';
const pousser = (event, p) => dl.push({ event, ...p });
const zone = (el) => (el.closest('[data-nav], [data-menu]') ? 'entete' : el.closest('footer, [data-pied-revele]') ? 'pied' : 'contenu');
const PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'gbraid', 'wbraid', 'fbclid', 'li_fat_id', 'ttclid', 'msclkid', 'utm_id'];
const avecParams = (p) => !!p && PARAMS.some((k) => p[k]);
const externe = () => {
try {
const u = new URL(document.referrer);
return u.hostname === location.hostname || /(^|\.)bitwip\.fr$/.test(u.hostname) ? '' : (u.origin + u.pathname).slice(0, 500);
} catch { return ''; }
};
if (!interne) {
try { sessionStorage.setItem('bitwip_pages', String((+sessionStorage.getItem('bitwip_pages') || 0) + 1)); } catch { }
const url = Object.fromEntries(PARAMS.map((k) => [k, (q.get(k) || '').trim().slice(0, 200)]).filter(([, v]) => v));
const session = lire('sessionStorage', PROV);
if (!session) {
ecrire('sessionStorage', PROV, { ...url, page_entree: location.pathname.slice(0, 500), referent: externe(), date_premiere_visite: new Date().toISOString().slice(0, 10) });
} else if (!avecParams(session) && avecParams(url)) {
ecrire('sessionStorage', PROV, { ...session, ...url });
}
}
const publicite = () => !window.CookieConsent || CookieConsent.acceptedCategory('publicite');
const copie = () => {
if (!window.CookieConsent || !CookieConsent.acceptedCategory('publicite')) return effacer('localStorage', PROV);
const s = lire('sessionStorage', PROV);
if (!s) return;
const l = lire('localStorage', PROV);
const visites = ((l && l.expire > Date.now() && l.visites) || 0) + (s.compte ? 0 : 1);
if (!s.compte) ecrire('sessionStorage', PROV, { ...s, compte: 1 });
const premier = (l && l.expire > Date.now() && l.premier) || { source: source(s), campagne: s.utm_campaign || '', date: s.date_premiere_visite || '' };
if (avecParams(s)) ecrire('localStorage', PROV, { ...s, premier, visites, expire: Date.now() + 90 * 864e5 });
else if (l && l.expire > Date.now()) ecrire('localStorage', PROV, { ...l, premier, visites });
else ecrire('localStorage', PROV, { premier, visites, expire: Date.now() + 90 * 864e5 });
};
addEventListener('cc:onConsent', copie);
addEventListener('cc:onChange', copie);
const retenue = () => {
const s = lire('sessionStorage', PROV);
if (avecParams(s)) return s;
const l = lire('localStorage', PROV);
if (l && l.expire > Date.now() && publicite() && avecParams(l)) return l;
return s || {};
};
const source = (p) => {
const src = (p.utm_source || '').toLowerCase(), med = (p.utm_medium || '').toLowerCase();
const payant = /^(cpc|ppc|paid|display|cpm|sponsored|social-paid|paid-social|paidsocial)/.test(med);
if (p.gclid || p.gbraid || p.wbraid || (payant && /^google/.test(src))) return 'Google Ads';
if (payant && (p.fbclid || /^(facebook|fb|instagram|ig|meta)/.test(src))) return 'Meta Ads';
if (p.li_fat_id || (payant && /^linkedin/.test(src))) return 'LinkedIn Ads';
if (p.ttclid || (payant && /^tiktok/.test(src))) return 'TikTok Ads';
if (p.msclkid || (payant && /^(bing|microsoft)/.test(src))) return 'Microsoft Ads';
if (/^(chatgpt|openai|perplexity|claude|gemini|copilot|mistral)/.test(src)) return 'IA : ' + src.split(/[.\s]/)[0];
if (/mail|newsletter/.test(med) || /newsletter|brevo|sendinblue/.test(src)) return 'Newsletter';
if (/^linkedin/.test(src)) return 'LinkedIn';
if (p.fbclid || /^(facebook|fb|instagram|ig|meta)/.test(src)) return 'Facebook/Instagram';
const h = (p.referent || '').replace(/^https?:\/\//, '').split('/')[0].replace(/^www\./, '');
if (!h) return 'Accès direct';
const ia = h.match(/^(chatgpt\.com|chat\.openai\.com|perplexity\.ai|claude\.ai|gemini\.google\.com|copilot\.microsoft\.com|chat\.mistral\.ai)$/);
if (ia) return 'IA : ' + ia[1].replace(/^chat\./, '').split('.')[0];
if (/(^|\.)google\./.test(h)) return 'Google naturel';
if (/(^|\.)bing\.com$/.test(h)) return 'Bing naturel';
if (/(^|\.)(linkedin\.com|lnkd\.in)$/.test(h)) return 'LinkedIn';
if (/(^|\.)(facebook\.com|fb\.com|instagram\.com)$/.test(h)) return 'Facebook/Instagram';
return ('Site référent : ' + h).slice(0, 200);
};
const premierContact = (p) => {
const l = publicite() ? lire('localStorage', PROV) : null;
const pr = (l && l.expire > Date.now() && l.premier) || { source: source(p), campagne: p.utm_campaign || '', date: p.date_premiere_visite || '' };
const jours = pr.date ? Math.max(0, Math.floor((Date.now() - Date.parse(pr.date)) / 864e5)) : '';
let pages = '';
try { pages = sessionStorage.getItem('bitwip_pages') || ''; } catch { }
return {
source_premier_contact: pr.source, campagne_premier_contact: pr.campagne, date_premier_contact: pr.date,
jours_depuis_premier_contact: String(jours), nombre_visites: String((l && l.expire > Date.now() && l.visites) || 1), pages_vues: pages,
};
};
const provenance = () => {
const p = retenue();
return {
...Object.fromEntries(PARAMS.map((k) => [k, p[k] || ''])),
page_entree: p.page_entree || '', referent: p.referent || '', date_premiere_visite: p.date_premiere_visite || '',
source_acquisition: source(p), page_formulaire: location.pathname.slice(0, 500),
...premierContact(p),
};
};
const sha256 = async (t) => [...new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(t)))]
.map((x) => x.toString(16).padStart(2, '0')).join('');
const aleatoire = () => (crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2, 12));
const typeLead = (form, formulaire, projet) => form.dataset.typeLead
|| (['offre-du-moment', 'offre-audit-une-heure'].includes(formulaire) ? 'offre' : corps.dataset.outil ? 'demo_outil'
: lire('sessionStorage', CTA) === 'prendre-rendez-vous' ? 'rendez_vous'
: corps.dataset.landing ? 'landing' : projet ? 'devis' : 'contact');
const lead = ({ form, formulaire, besoins, budget }) => {
const l = {
type_lead: typeLead(form, formulaire, budget !== undefined), formulaire, landing: corps.dataset.landing || '', outil: corps.dataset.outil || '',
besoins: (besoins || []).join(','), budget: budget || '', lead_id: aleatoire(),
};
return {
champs: { ...provenance(), lead_id: l.lead_id, type_lead: l.type_lead, landing: l.landing, outil: l.outil },
async enregistrer(email) {
let em = '';
try { em = await sha256(email.toLowerCase().replace(/\s/g, '')); } catch { }
ecrire('sessionStorage', LEAD, { ...l, em });
},
};
};
window.bitwipMesure = { provenance, lead };
if (corps.dataset.typePage === 'merci') {
const l = lire('sessionStorage', LEAD);
effacer('sessionStorage', LEAD);
const navigation = (performance.getEntriesByType('navigation')[0] || {}).type;
let depuisFillout = false;
try { depuisFillout = new URL(document.referrer).hostname === 'forms.bitwip.fr'; } catch { }
const envoyer = () => {
if (l) {
const { em, ...p } = l;
pousser('generate_lead', { ...p, ...(em && { user_data: { sha256_email_address: em } }) });
} else if (depuisFillout && navigation === 'navigate') {
pousser('generate_lead', { formulaire: 'fillout', landing: '', outil: '', lead_id: aleatoire() });
}
};
let fait = false;
const une = () => { if (!fait) { fait = true; envoyer(); } };
if (!/(^|;\s*)bitwip_consentement=/.test(document.cookie)) une();
addEventListener('cc:onConsent', () => setTimeout(une, 0), { once: true });
setTimeout(une, 3000);
}
const OUTILS = [
[/^chronos\.bitwip\.fr$/, '', 'chronos', 'site'],
[/^carbon\.bitwip\.fr$/, '', 'calculateur-carbone', 'site'],
[/^github\.com$/, '/Bitwip/bitwip-extension-chrome-bouncer-meet', 'bouncer', 'site'],
[/^chromewebstore\.google\.com$/, '', 'extension-chrome', 'telechargement'],
[/(^|\.)bitwip\.ai$/, '', 'bitwip-ai', 'site'],
[/(^|\.)morpho\.pro$/, '', 'morpho', 'site'],
];
const outilDuLien = (a) => {
let u;
try { u = new URL(a.href, location.href); } catch { return null; }
if (a.dataset.outil) return [a.dataset.outil, a.dataset.action || 'site'];
const o = OUTILS.find(([h, c]) => h.test(u.hostname) && u.pathname.startsWith(c));
if (o) return [o[2], a.dataset.action || o[3]];
if (u.hostname === location.hostname && /^(\/en)?\/kazad\/?$/.test(u.pathname) && u.pathname !== location.pathname) {
return ['kazad', a.dataset.action || (u.hash === '#demo' ? 'demo' : 'site')];
}
return null;
};
const versContact = (a) => { try { return /^(\/en)?\/contact\/?$/.test(new URL(a.href, location.href).pathname); } catch { return false; } };
document.addEventListener('click', (e) => {
const a = e.target.closest && e.target.closest('a[href], [data-cta]');
if (!a) return;
const href = a.getAttribute('href') || '';
const z = zone(a);
if (/^tel:/i.test(href)) return pousser('clic_telephone', { zone: z });
if (/^mailto:/i.test(href)) {
return pousser('clic_email', { zone: z, motif: a.dataset.motif || (/^mailto:jobs@|subject=(candidature|application)/i.test(href) ? 'candidature' : 'contact') });
}
const cta = a.dataset.cta || (a.matches('.btn') && versContact(a) ? 'contact' : '');
if (cta) {
ecrire('sessionStorage', CTA, cta);
return pousser('clic_cta', { cta, zone: z, outil: a.dataset.outil || corps.dataset.outil || '' });
}
const o = a.matches('a') && outilDuLien(a);
if (o) pousser('clic_outil', { outil: o[0], action: o[1] });
});
const commences = new WeakSet();
document.addEventListener('input', (e) => {
const f = e.target.form;
if (!f || !f.dataset.formulaire || interne || e.target.name === 'piege' || commences.has(f)) return;
commences.add(f);
pousser('form_start', { formulaire: f.dataset.formulaire });
});
})();
