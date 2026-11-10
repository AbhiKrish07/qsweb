(() => {
'use strict';
const form = document.getElementById('kz-demo');
if (!form) return;
const tpl = document.getElementById('kz-demo-messages').content;
const message = (k) => tpl.querySelector('[data-m="' + k + '"]');
const val = (n) => form.elements[n].value.trim();
const en = document.documentElement.lang === 'en';
const echec = form.querySelector('.kz-fm__echec');
const bouton = form.querySelector('[type="submit"]');
let tente = false;
const REGLES = {
prenom: (v) => !v && 'prenom',
nom: (v) => !v && 'nom',
email: (v) => !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) && 'email',
structure: (v) => !v && 'structure',
};
const verifier = (n) => {
const cle = REGLES[n](val(n));
document.getElementById('kz-e-' + n).textContent = cle ? message(cle).textContent : '';
if (cle) form.elements[n].setAttribute('aria-invalid', 'true');
else form.elements[n].removeAttribute('aria-invalid');
return !cle;
};
const horodatage = () => {
const d = new Date(), o = -d.getTimezoneOffset(), a = Math.abs(o), z = (n) => String(n).padStart(2, '0');
return new Date(d.getTime() + o * 6e4).toISOString().slice(0, 19) + (o < 0 ? '-' : '+') + z((a / 60) | 0) + ':' + z(a % 60);
};
form.addEventListener('focusout', (e) => {
const n = e.target.name;
if (REGLES[n] && (tente || e.target.value.trim())) verifier(n);
});
form.addEventListener('input', (e) => {
const n = e.target.name;
if (REGLES[n] && (tente || e.target.hasAttribute('aria-invalid'))) verifier(n);
});
form.addEventListener('submit', async (e) => {
e.preventDefault();
if (form.hasAttribute('aria-busy')) return;
tente = true;
const fautes = Object.keys(REGLES).filter((n) => !verifier(n));
if (fautes.length) {
form.elements[fautes[0]].focus();
return;
}
const q = new URLSearchParams(location.search);
const donnees = {
origine: 'kazad-demo', formulaire: 'kazad-demo', version: 1, envoye_le: horodatage(), langue: en ? 'en' : 'fr',
prenom: val('prenom'), nom: val('nom'), email: val('email'), structure: val('structure'), message: val('message'),
actualites: form.elements.actualites.checked,
page: location.href, referent: document.referrer,
};
['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'url_source'].forEach((k) => (donnees[k] = q.get(k) || ''));
const lead = window.bitwipMesure?.lead({ form, formulaire: 'kazad-demo' });
if (lead) Object.assign(donnees, lead.champs);
donnees.piege = form.elements.piege.value;
donnees.duree_s = Math.round(performance.now() / 1000);
form.setAttribute('aria-busy', 'true');
bouton.disabled = true;
echec.replaceChildren();
try {
const r = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(donnees) });
if (!r.ok) throw new Error('réponse ' + r.status);
await lead?.enregistrer(donnees.email);
(window.dataLayer = window.dataLayer || []).push({ event: 'contact_envoye', formulaire: 'kazad-demo', langue: donnees.langue });
location.assign(en ? '/en/thank-you' : '/merci');
} catch (err) {
console.warn('Demande de démonstration :', err.message);
echec.replaceChildren(message('echec').cloneNode(true));
form.removeAttribute('aria-busy');
bouton.disabled = false;
}
});
bouton.disabled = false;
})();
