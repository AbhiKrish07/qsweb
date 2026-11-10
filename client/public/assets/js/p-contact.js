(() => {
'use strict';
const mq = window.matchMedia('(min-width: 901px)');
document.querySelectorAll('[data-toc]').forEach(toc => {
const regler = () => { toc.open = mq.matches; };
regler();
mq.addEventListener('change', regler);
toc.addEventListener('click', e => {
if (e.target.closest('a') && !mq.matches) toc.open = false;
});
});
})();
