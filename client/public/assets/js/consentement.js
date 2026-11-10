(function () {
'use strict';
var GTM = 'GTM-KRNLN5CD';
var REVISION = 1;
var moi = document.currentScript && document.currentScript.src;
var base = moi ? moi.replace(/js\/consentement\.js.*$/, 'vendor/cookieconsent-3.1.0/') : '/assets/vendor/cookieconsent-3.1.0/';
var en = (document.documentElement.lang || '').slice(0, 2) === 'en';
var politique = en ? '/en/privacy-policy' : '/politique-de-confidentialite';
window.dataLayer = window.dataLayer || [];
var gtag = window.gtag || function () { window.dataLayer.push(arguments); };
function prefs(t) { return '<button type="button" data-cookies aria-haspopup="dialog">' + t + '</button>'; }
function appliquer() {
var mesure = CookieConsent.acceptedCategory('analytics');
var pub = CookieConsent.acceptedCategory('publicite');
var p = pub ? 'granted' : 'denied';
gtag('consent', 'update', { analytics_storage: mesure ? 'granted' : 'denied', ad_storage: p, ad_user_data: p, ad_personalization: p });
if (GTM && (mesure || pub) && !window.__gtm) {
window.__gtm = 1;
window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
var s = document.createElement('script');
s.async = true;
s.src = 'https://www.googletagmanager.com/gtm.js?id=' + GTM;
document.head.appendChild(s);
}
}
function lancer() {
CookieConsent.run({
revision: REVISION,
cookie: { name: 'bitwip_consentement', expiresAfterDays: 182 },
guiOptions: {
consentModal: { layout: 'box', position: 'bottom right', equalWeightButtons: true, flipButtons: false },
preferencesModal: { layout: 'box', equalWeightButtons: true, flipButtons: false }
},
categories: {
necessary: { enabled: true, readOnly: true },
analytics: { autoClear: { cookies: [{ name: /^_ga/ }] } },
publicite: { autoClear: { cookies: [{ name: /^_gcl/ }, { name: '_fbp' }] } }
},
onConsent: appliquer,
onChange: appliquer,
language: {
default: 'fr',
autoDetect: 'document',
translations: {
fr: {
consentModal: {
title: 'Vos cookies, votre choix',
description: 'Avec votre accord, nous mesurons l’audience du site et l’effet de nos campagnes. Sans accord, rien n’est déposé. Vous pouvez changer d’avis à tout moment, en bas de chaque page.',
acceptAllBtn: 'Tout accepter',
acceptNecessaryBtn: 'Tout refuser',
footer: '<a href="' + politique + '">Politique de confidentialité</a>' + prefs('Choisir par finalité')
},
preferencesModal: {
title: 'Paramètres des cookies',
acceptAllBtn: 'Tout accepter',
acceptNecessaryBtn: 'Tout refuser',
savePreferencesBtn: 'Enregistrer mes choix',
closeIconLabel: 'Fermer',
sections: [
{ description: 'Chaque finalité reste désactivée tant que vous ne l’activez pas. Votre choix est gardé six mois, puis nous vous le redemandons.' },
{ title: 'Nécessaires', description: 'Ils gardent votre choix de cookies et votre langue. Toujours actifs.', linkedCategory: 'necessary' },
{ title: 'Mesure d’audience', description: 'Google Analytics 4 nous dit quelles pages sont lues, pour améliorer le site.', linkedCategory: 'analytics' },
{ title: 'Publicité', description: 'Google Ads et Meta mesurent l’effet de nos campagnes et peuvent vous montrer nos annonces sur d’autres sites.', linkedCategory: 'publicite' },
{ description: 'Le détail est dans notre <a href="' + politique + '">politique de confidentialité</a>.' }
]
}
},
en: {
consentModal: {
title: 'Your cookies, your choice',
description: 'With your consent, we measure the site’s audience and the effect of our campaigns. Without it, nothing is stored. You can change your mind at any time, at the bottom of every page.',
acceptAllBtn: 'Accept all',
acceptNecessaryBtn: 'Reject all',
footer: '<a href="' + politique + '">Privacy policy</a>' + prefs('Choose by purpose')
},
preferencesModal: {
title: 'Cookie settings',
acceptAllBtn: 'Accept all',
acceptNecessaryBtn: 'Reject all',
savePreferencesBtn: 'Save my choices',
closeIconLabel: 'Close',
sections: [
{ description: 'Each purpose stays off until you turn it on. Your choice is kept for six months, then we ask again.' },
{ title: 'Necessary', description: 'They keep your cookie choice and your language. Always on.', linkedCategory: 'necessary' },
{ title: 'Audience measurement', description: 'Google Analytics 4 tells us which pages are read, so we can improve the site.', linkedCategory: 'analytics' },
{ title: 'Advertising', description: 'Google Ads and Meta measure the effect of our campaigns and may show you our ads on other sites.', linkedCategory: 'publicite' },
{ description: 'Details are in our <a href="' + politique + '">privacy policy</a>.' }
]
}
}
}
}
});
}
document.addEventListener('click', function (e) {
var b = e.target.closest && e.target.closest('[data-cookies]');
if (!b) return;
e.preventDefault();
if (window.CookieConsent) CookieConsent.showPreferences();
});
var css = base + 'cookieconsent.css';
var pre = document.createElement('link');
pre.rel = 'prefetch';
pre.as = 'style';
pre.href = css;
document.head.appendChild(pre);
function feuille(f) {
var l = document.createElement('link');
l.rel = 'stylesheet';
l.href = css;
l.onload = l.onerror = f;
document.head.appendChild(l);
}
function apresRideau(f) {
setTimeout(f, document.body && document.body.hasAttribute('data-entree') ? 4500 : 2500);
}
var s = document.createElement('script');
s.src = base + 'cookieconsent.umd.js';
s.onload = function () { apresRideau(function () { feuille(lancer); }); };
document.head.appendChild(s);
})();
