'use strict';
// Preserve the existing site's Google Analytics property.
window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
gtag('js',new Date());
gtag('config','G-W1Q1QV5JE6');
document.addEventListener('click',event => {
  const plan=event.target.closest('[data-plan]');
  const pkg=event.target.closest('[data-package]');
  const order=event.target.closest('#order-whatsapp');
  if(plan)gtag('event','select_plan',{plan_id:plan.dataset.plan});
  if(pkg)gtag('event','select_isp_package',{package_id:pkg.dataset.package});
  if(order)gtag('event','order_contact_click',{contact_method:'whatsapp'});
});
