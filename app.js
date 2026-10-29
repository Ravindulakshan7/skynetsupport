'use strict';

// Edit the package catalogue here. Prices and restrictions are supplied by SKYNET,
// not fetched from providers. A slash price deliberately remains unassigned to a duration.
const networks = [
  {id:'all',name:'All networks'},
  {id:'slt-post',name:'SLT Postpaid',label:'SLT POSTPAID · WIFI',color:'#f47b80'},
  {id:'slt-pre',name:'SLT Prepaid',label:'SLT PREPAID · WIFI',color:'#f47b80'},
  {id:'mobitel',name:'Mobitel SIM',label:'MOBITEL · SIM',color:'#73d9ab'},
  {id:'dialog-router',name:'Dialog Router',label:'DIALOG · ROUTER',color:'#77b3ff'},
  {id:'dialog-sim',name:'Dialog SIM',label:'DIALOG · SIM',color:'#77b3ff'},
  {id:'airtel',name:'Airtel',label:'AIRTEL · SIM',color:'#f47b80'},
  {id:'hutch',name:'Hutch',label:'HUTCH · SIM',color:'#73d9ab'}
];
const packages = [
  {id:'slt-meet-max',network:'slt-post',name:'Meet Max Add-on',price:'490',amount:490,limit:'100GB limit',note:'SLT Postpaid WiFi add-on.'},
  {id:'slt-meet-lite',network:'slt-post',name:'Meet Lite Add-on',price:'195',amount:195,limit:'30GB limit',note:'SLT Postpaid WiFi add-on.'},
  {id:'slt-flash',network:'slt-post',name:'Flash 5 / 10 / 25',price:null,limit:'No add-on required',note:'ඔබගේ Flash package ගාස්තුව වෙනම අදාළයි. Exact package එක support සමඟ තහවුරු කරන්න.'},
  {id:'slt-entertainment',network:'slt-post',name:'Entertainment Unlimited',price:'1,990',amount:1990,limit:'Unlimited package',note:'ISP conditions සහ speed restrictions ගැන තහවුරු කරගන්න.'},
  {id:'slt-pre-zoom',network:'slt-pre',name:'30GB Zoom Package',price:'235',amount:235,limit:'30GB limit',note:'SLT Prepaid WiFi සඳහා.'},
  {id:'mobitel-zoom25',network:'mobitel',name:'25GB Zoom Package',price:'222',amount:222,limit:'25GB limit',note:'Mobitel SIM සඳහා.'},
  {id:'mobitel-zoom50',network:'mobitel',name:'50GB Zoom Package',price:'874',amount:874,limit:'50GB limit',note:'Mobitel SIM සඳහා.'},
  {id:'dialog-router-724',network:'dialog-router',name:'Work & Learn Lite',price:'724',amount:724,limit:'Limit: confirm with support',note:'Dialog router සඳහා. Package conditions මුලින් තහවුරු කරන්න.'},
  {id:'dialog-router-298',network:'dialog-router',name:'Work & Learn Lite',price:'298',amount:298,limit:'30GB limit',note:'Dialog router සඳහා.'},
  {id:'dialog-video',network:'dialog-sim',name:'Video Conferencing',price:'724 / 224',sortPrice:224,limit:'Test before buying',test:true,note:'මිලදී ගැනීමට පෙර test කරන්න. මිල විකල්ප සහ validity support සමඟ තහවුරු කරන්න.'},
  {id:'dialog-tiktok',network:'dialog-sim',name:'TikTok Unlimited',price:'997 / 297',sortPrice:297,limit:'2Mbps speed limit',speed:'2Mbps',note:'මිල විකල්ප සහ validity support සමඟ තහවුරු කරන්න.'},
  {id:'dialog-fun',network:'dialog-sim',name:'20GB Fun Blaster',price:'488 / 348',sortPrice:348,limit:'20GB limit',note:'Rs.348 option: Rs.350 reload කර #678# dial කර package එක activate කරන්න. Activation කිරීමට පෙර current option එක තහවුරු කරන්න.'},
  {id:'airtel-tiktok30',network:'airtel',name:'TikTok Unlimited',price:'997',amount:997,limit:'30 days',recommended:true,note:'ISP package conditions සහ අදාළ limits තහවුරු කරගන්න.'},
  {id:'airtel-tiktok7',network:'airtel',name:'TikTok Unlimited',price:'297',amount:297,limit:'7 days',recommended:true,note:'SKYNET plan එක මාසයක් වුවත් මෙම ISP package validity එක දින 7යි.'},
  {id:'airtel-youtube7',network:'airtel',name:'YouTube Package',price:'135',amount:135,limit:'7 days',oldSim:true,recommended:true,note:'Old SIM only. SKYNET monthly plan එකට වඩා ISP validity එක කෙටියි.'},
  {id:'airtel-youtube30',network:'airtel',name:'YouTube Package',price:'260',amount:260,limit:'30 days',oldSim:true,recommended:true,note:'Old SIM only. ඔබගේ SIM එකට package එක available ද කියලා තහවුරු කරන්න.'},
  {id:'airtel-zoom',network:'airtel',name:'Zoom Package',price:'215',amount:215,limit:'30GB limit',recommended:true,note:'Airtel Zoom package සඳහා.'},
  {id:'airtel-combo',network:'airtel',name:'498 / 909 / 1180 Packages',price:'498 / 909 / 1,180',sortPrice:498,limit:'1Mbps speed limit',speed:'1Mbps',recommended:true,note:'Exact package option සහ validity order කිරීමට පෙර තහවුරු කරන්න.'},
  {id:'hutch-work',network:'hutch',name:'Work & Learn',price:'224',amount:224,limit:'30GB limit',note:'Hutch network සඳහා.'}
];
const plans = [
  {id:'starter',name:'Starter',quota:'100 GB',price:200,description:'For lighter everyday use'},
  {id:'standard',name:'Standard',quota:'200 GB',price:300,description:'A little more room to explore'},
  {id:'plus',name:'Plus',quota:'300 GB',price:400,description:'For your connected routine'},
  {id:'unlimited',name:'Unlimited',quota:'Unlimited',price:500,description:'Ask us about usage conditions',featured:true}
];
const guides = {
  android:{name:'NetMod Syna',description:'Android · Config import & connection',download:'https://play.google.com/store/apps/details?id=com.netmod.syna',downloadLabel:'Get on Play Store ↗',video:'https://youtube.com/shorts/2T-agHHurWM?feature=share'},
  ios:{name:'NPV Tunnel',description:'iPhone / iPad · Config import & connection',download:'https://apps.apple.com/lk/app/npv-tunnel/id1629465476',downloadLabel:'Get on App Store ↗',video:'https://youtube.com/shorts/gu4WrwxZpY0'},
  windows:{name:'Windows setup',description:'NetMod client · Setup with SKYNET support',download:'https://wa.me/94763813667?text=Hello%20SKYNET%2C%20please%20send%20the%20current%20Windows%20client%20download%20and%20setup%20instructions.',downloadLabel:'Get Windows app link ↗',video:'https://youtu.be/i86weaU7_M8'}
};
const $ = selector => document.querySelector(selector);
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const money = value => `Rs.${Number(value).toLocaleString('en-LK')}`;
let filter = 'all';
let selectedPackage = '';
let selectedPlan = plans[0];
let toastTimer;
let lastOrderTrigger;
const networkFor = pkg => networks.find(network => network.id === pkg.network);

function renderFilters(){
  $('#network-filters').innerHTML = networks.map(network => `<button class="filter-chip" data-network="${network.id}" aria-pressed="${filter === network.id}">${network.name}${network.id === 'airtel' ? ' ★' : ''}</button>`).join('');
}
function renderPackages(){
  const query = $('#package-search').value.toLowerCase().trim();
  const sort = $('#package-sort').value;
  let visible = packages.filter(pkg => (filter === 'all' || pkg.network === filter) && `${networkFor(pkg).name} ${pkg.name} ${pkg.price || ''} ${pkg.limit} ${pkg.note} ${pkg.oldSim ? 'old sim' : ''}`.toLowerCase().includes(query));
  if(sort === 'price') visible.sort((a,b) => (a.amount ?? a.sortPrice ?? Infinity) - (b.amount ?? b.sortPrice ?? Infinity));
  if(sort === 'name') visible.sort((a,b) => a.name.localeCompare(b.name));
  $('#package-count').textContent = `${String(visible.length).padStart(2,'0')} packages · ${networks.find(network => network.id === filter).name}`;
  $('#empty-state').hidden = visible.length !== 0;
  $('#package-grid').innerHTML = visible.map(pkg => {
    const network = networkFor(pkg);
    return `<article class="package-card" style="--network-color:${network.color}"><div class="package-top"><span class="network-name"><span class="network-dot"></span>${network.label}</span>${pkg.test ? '<span class="badge warning">TEST FIRST</span>' : pkg.recommended ? '<span class="badge">RECOMMENDED</span>' : ''}</div><h3>${pkg.name}</h3><div class="package-price">${pkg.price ? `Rs.${pkg.price} <small>ISP fee</small>` : 'Existing plan <small>ISP fee applies</small>'}</div><div class="package-details"><span class="detail-tag">${pkg.limit}</span>${pkg.oldSim ? '<span class="detail-tag">Old SIM only</span>' : ''}</div><details class="package-extra"><summary>Package details</summary><p class="package-note">${pkg.note}</p></details><button class="package-select" data-package="${pkg.id}" aria-pressed="${selectedPackage === pkg.id}" aria-label="Select ${escapeHTML(network.name+' '+pkg.name+' '+(pkg.price || 'existing plan'))}"><span>${selectedPackage === pkg.id ? '✓ Selected · Plans' : 'Select package'}</span><span aria-hidden="true">↗</span></button></article>`;
  }).join('');
}
function selectPackage(id){
  selectedPackage = id;
  const pkg = packages.find(item => item.id === id);
  $('#selected-package-text').textContent = pkg ? `${networkFor(pkg).name} · ${pkg.name} · ${pkg.price ? 'Rs.'+pkg.price : 'Existing ISP plan'} · ${pkg.limit}` : 'Not sure about your ISP package? Check with us before buying.';
  $('#order-package').value = selectedPackage;
  renderPackages();
}
function renderPlans(){
  $('#plan-grid').innerHTML = plans.map(plan => `<article class="plan-card ${plan.featured ? 'featured' : ''}">${plan.featured ? '<span class="plan-badge">MORE ROOM TO CONNECT</span>' : ''}<div class="plan-name">${plan.name}</div><div class="plan-quota">${plan.quota}</div><div class="plan-period">SKYNET service · 1 month</div><div class="plan-price"><small>Rs.</small>${plan.price}</div><div class="plan-subtext">${plan.description}</div><ul class="plan-features"><li>${plan.featured ? 'Confirm usage conditions' : plan.quota+' service quota'}</li><li>Config setup guidance</li><li>WhatsApp / Telegram help</li></ul><button class="button ${plan.featured ? 'primary' : ''}" data-plan="${plan.id}" aria-label="Order ${plan.quota} SKYNET plan for Rs.${plan.price}">Choose ${plan.name} ↗</button></article>`).join('');
}
function renderGuide(device){
  const guide = guides[device];
  document.querySelectorAll('[data-device]').forEach(button => {
    const active = button.dataset.device === device;
    button.setAttribute('aria-selected',String(active));
    button.tabIndex = active ? 0 : -1;
  });
  $('#setup-content').setAttribute('aria-labelledby',`tab-${device}`);
  $('#setup-content').innerHTML = `<h3>${guide.name}</h3><p class="setup-description">${guide.description}</p><ol class="setup-steps"><li>ඔබගේ device එකට අදාළ app එක install කර open කරන්න.</li><li>SKYNET වෙතින් ලැබුණු config / subscription එක copy කර app එකේ import option එකෙන් ඇතුළත් කරන්න. App version එක අනුව option නම වෙනස් විය හැක.</li><li>අදාළ profile එක තෝරා connect කරන්න. ඉල්ලන VPN permission එක ලබාදී connection එක check කරන්න.</li></ol><div class="setup-buttons"><a class="button primary" href="${guide.download}" target="_blank" rel="noopener noreferrer">${guide.downloadLabel}</a><a class="button" href="${guide.video}" target="_blank" rel="noopener noreferrer">Watch tutorial ↗</a></div><p class="setup-caution">${device === 'windows' ? 'Current Windows download link එක support හරහා ලබාගන්න.' : 'Store listing එකේ app name සහ developer details install කිරීමට පෙර check කරන්න.'}</p>`;
}
function orderSummary(){
  const pkg = packages.find(item => item.id === $('#order-package').value);
  return [
    'Hello SKYNET! I would like to order a V2Ray plan.',
    `SKYNET plan: ${selectedPlan.name} / ${selectedPlan.quota} / 1 month`,
    `SKYNET service fee: ${money(selectedPlan.price)}`,
    `ISP network: ${pkg ? networkFor(pkg).name : 'Please help me choose'}`,
    `ISP package: ${pkg ? pkg.name : 'Not selected'}`,
    ...(pkg ? [`ISP fee: ${pkg.price ? 'Rs.'+pkg.price : 'Existing plan fee; confirm'}`,`Package details: ${pkg.limit}${pkg.oldSim ? '; Old SIM only' : ''}`,`Package note: ${pkg.note}`] : []),
    `Device: ${$('#order-device').value}`,
    'Please confirm compatibility, package validity, activation time, usage conditions and refund/replacement terms before payment.'
  ].join('\n');
}
function updateOrder(){
  const pkg = packages.find(item => item.id === $('#order-package').value);
  $('#order-plan').innerHTML = `<span>${selectedPlan.quota} <small> / 1 month</small></span><strong>${money(selectedPlan.price)}</strong>`;
  if(pkg && typeof pkg.amount === 'number'){
    $('#order-total').innerHTML = `SKYNET ${money(selectedPlan.price)} + ISP ${money(pkg.amount)}<strong>${money(selectedPlan.price+pkg.amount)} combined listed cost</strong><span>Separate payments. ISP renewal frequency may differ from your monthly SKYNET plan.</span>`;
  }else{
    $('#order-total').innerHTML = `SKYNET service fee<strong>${money(selectedPlan.price)} + separate ISP fee</strong><span>${pkg?.price ? 'ISP price options: Rs.'+pkg.price+'. Confirm the exact option.' : 'Confirm your ISP package and its cost with support.'}</span>`;
  }
  const notes = pkg ? [pkg.limit,pkg.oldSim ? 'Old SIM only' : '',pkg.test ? 'Test before buying' : '',pkg.limit === '7 days' ? 'ISP validity is only 7 days; repeat activation costs are not included above.' : ''].filter(Boolean) : ['Select your exact ISP package or ask support for help.'];
  $('#order-warning').textContent = [...new Set(notes)].join(' · ');
  $('#order-whatsapp').href = `https://wa.me/94763813667?text=${encodeURIComponent(orderSummary())}`;
}
function openOrder(id,trigger){
  selectedPlan = plans.find(plan => plan.id === id) || plans[0];
  lastOrderTrigger = trigger;
  $('#order-package').value = selectedPackage;
  updateOrder();
  $('#order-dialog').showModal();
  document.body.classList.add('modal-open');
}
function showToast(message){
  clearTimeout(toastTimer);
  $('#toast').textContent = message;
  $('#toast').hidden = false;
  toastTimer = setTimeout(() => { $('#toast').hidden = true; },4000);
}
const issues = {
  timeout:{name:'Connection timeout',tip:'ISP package එක active ද, config expiry එක අවසන් ද සහ නිවැරදි profile එක select කර තිබේද බලන්න. Config එක වෙනස් කිරීමට පෙර support අමතන්න.'},
  slow:{name:'Slow connection',tip:'Signal strength, remaining quota සහ package speed limit check කරන්න. අනෙක් downloads නවත්වා නැවත බලන්න.'},
  import:{name:'Cannot import config',tip:'ලැබුණු config එක සම්පූර්ණයෙන් copy කළාද සහ නිවැරදි import option එක භාවිතා කරනවාද බලන්න. Screenshot එකක් support වෙත එවන්න; config එක public කරන්න එපා.'},
  renew:{name:'Renew my plan',tip:'දැනට භාවිතා කරන plan එක සහ account reference එක private support chat එකට යවන්න. Payment details නැවත තහවුරු කරගන්න.'}
};
function updateIssue(){
  const issue = issues[$('#issue-select').value];
  $('#issue-tip').textContent = issue.tip;
  $('#issue-link').href = `https://wa.me/94763813667?text=${encodeURIComponent('Hello SKYNET, I need help: '+issue.name+'\nNetwork / ISP package: \nDevice / app: \nError or expiry details: ')}`;
}

$('#order-package').innerHTML = '<option value="">Help me choose / Not sure yet</option>'+networks.filter(network => network.id !== 'all').map(network => `<optgroup label="${network.name}">${packages.filter(pkg => pkg.network === network.id).map(pkg => `<option value="${pkg.id}">${escapeHTML(pkg.name)} · ${pkg.price ? 'Rs.'+pkg.price : 'Existing plan'} · ${pkg.limit}</option>`).join('')}</optgroup>`).join('');
renderFilters();renderPackages();renderPlans();renderGuide('android');updateIssue();
document.querySelectorAll('[data-quick-network]').forEach(link => link.addEventListener('click',() => {
  filter=link.dataset.quickNetwork;
  $('#package-search').value='';
  $('#package-sort').value='default';
  renderFilters();renderPackages();
}));
$('#year').textContent = new Date().getFullYear();
$('#network-filters').addEventListener('click',event => {const button=event.target.closest('[data-network]');if(!button)return;filter=button.dataset.network;renderFilters();renderPackages();});
$('#package-search').addEventListener('input',renderPackages);
$('#package-sort').addEventListener('change',renderPackages);
$('#reset-filters').addEventListener('click',() => {filter='all';$('#package-search').value='';$('#package-sort').value='default';renderFilters();renderPackages();});
$('#package-grid').addEventListener('click',event => {const button=event.target.closest('[data-package]');if(!button)return;selectPackage(button.dataset.package);location.hash='plans';showToast('Package selected. Choose your SKYNET plan below.');$('#plans').setAttribute('tabindex','-1');$('#plans').focus({preventScroll:true});});
$('#plan-grid').addEventListener('click',event => {const button=event.target.closest('[data-plan]');if(button)openOrder(button.dataset.plan,button);});
$('#order-package').addEventListener('change',() => {selectPackage($('#order-package').value);updateOrder();});
$('#order-device').addEventListener('change',updateOrder);
$('#issue-select').addEventListener('change',updateIssue);
document.querySelectorAll('[data-device]').forEach(button => {
  button.addEventListener('click',() => renderGuide(button.dataset.device));
  button.addEventListener('keydown',event => {
    const keys=['ArrowRight','ArrowDown','ArrowLeft','ArrowUp','Home','End'];
    if(!keys.includes(event.key))return;
    event.preventDefault();
    const devices=Object.keys(guides),index=devices.indexOf(button.dataset.device);
    const next=event.key==='Home'?0:event.key==='End'?devices.length-1:(index+(['ArrowLeft','ArrowUp'].includes(event.key)?-1:1)+devices.length)%devices.length;
    renderGuide(devices[next]);$(`[data-device="${devices[next]}"]`).focus();
  });
});
$('#order-dialog').addEventListener('close',() => {document.body.classList.remove('modal-open');lastOrderTrigger?.focus();});
$('#order-dialog').addEventListener('click',event => {const box=event.currentTarget.getBoundingClientRect();if(event.target===event.currentTarget&&(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom))event.currentTarget.close();});
$('#copy-order').addEventListener('click',async () => {
  try{
    if(navigator.clipboard && window.isSecureContext){await navigator.clipboard.writeText(orderSummary());}
    else{
      const field=document.createElement('textarea');field.value=orderSummary();field.style.position='fixed';field.style.opacity='0';$('#order-dialog').append(field);field.select();const success=document.execCommand('copy');field.remove();if(!success)throw new Error('Clipboard unavailable');
    }
    $('#copy-order').textContent='✓ Summary copied';setTimeout(() => {$('#copy-order').textContent='Copy order summary';},3000);
  }catch{ $('#copy-order').textContent='Copy unavailable — use WhatsApp'; }
});
const menu=$('.menu-toggle');
const contactDialog=$('#contact-dialog');
let lastContactTrigger;
document.querySelectorAll('[data-open-contact]').forEach(trigger=>trigger.addEventListener('click',()=>{
  lastContactTrigger=trigger;
  closeMenu();
  contactDialog.showModal();
  document.body.classList.add('modal-open');
}));
contactDialog.addEventListener('close',()=>{
  if(!document.querySelector('dialog[open]'))document.body.classList.remove('modal-open');
  lastContactTrigger?.focus();
});
contactDialog.addEventListener('click',event=>{
  if(event.target.closest('.contact-option')){contactDialog.close();return;}
  const box=contactDialog.getBoundingClientRect();
  if(event.target===contactDialog&&(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom))contactDialog.close();
});
function closeMenu(){menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');$('#navigation').classList.remove('open');}
menu.addEventListener('click',() => {const expanded=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(expanded));menu.setAttribute('aria-label',expanded?'Close navigation':'Open navigation');$('#navigation').classList.toggle('open',expanded);});
$('#navigation').addEventListener('click',event => {if(event.target.closest('a'))closeMenu();});
document.addEventListener('keydown',event => {if(event.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});
document.addEventListener('click',event => {if(!event.target.closest('.header'))closeMenu();});
// Store navigation is managed by the page router in store.js.

// Carousel pauses for keyboard focus, mouse hover, hidden pages and reduced motion.
const carousel=$('.hero-slider');
if(carousel){
  const slides=[...carousel.querySelectorAll('[data-slide]')];
  const dots=[...carousel.querySelectorAll('[data-slide-to]')];
  const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
  let current=0,paused=motion.matches,hovered=false,focused=false,slideTimer,pointerStart;
  function setSlide(index){
    current=(index+slides.length)%slides.length;
    slides.forEach((slide,i)=>{slide.hidden=i!==current;slide.classList.toggle('is-active',i===current);});
    dots.forEach((dot,i)=>dot.setAttribute('aria-pressed',String(i===current)));
    $('.slide-counter').textContent=`${String(current+1).padStart(2,'0')} / ${String(slides.length).padStart(2,'0')}`;
  }
  function schedule(){
    clearTimeout(slideTimer);
    if(!paused&&!hovered&&!focused&&!document.hidden&&!motion.matches){slideTimer=setTimeout(()=>{setSlide(current+1);schedule();},6500);}
  }
  function navigate(index){setSlide(index);schedule();}
  function syncPause(){
    $('#slide-pause').disabled=motion.matches;
    $('#slide-pause').setAttribute('aria-pressed',String(paused||motion.matches));
    $('#slide-pause').setAttribute('aria-label',motion.matches?'Slideshow paused: reduced motion':paused?'Play slideshow':'Pause slideshow');
    $('#slide-pause').textContent=paused||motion.matches?'▷':'Ⅱ';
    schedule();
  }
  dots.forEach(dot=>dot.addEventListener('click',()=>navigate(Number(dot.dataset.slideTo))));
  $('#slide-prev').addEventListener('click',()=>navigate(current-1));
  $('#slide-next').addEventListener('click',()=>navigate(current+1));
  $('#slide-pause').addEventListener('click',()=>{paused=!paused;syncPause();});
  carousel.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse'){hovered=true;schedule();}});
  carousel.addEventListener('pointerleave',()=>{hovered=false;schedule();});
  carousel.addEventListener('focusin',()=>{focused=true;schedule();});
  carousel.addEventListener('focusout',event=>{focused=carousel.contains(event.relatedTarget);schedule();});
  carousel.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();navigate(current+(event.key==='ArrowLeft'?-1:1));}});
  carousel.addEventListener('pointerdown',event=>{if(event.pointerType==='touch')pointerStart={x:event.clientX,y:event.clientY};});
  carousel.addEventListener('pointerup',event=>{
    if(!pointerStart||event.pointerType!=='touch')return;
    const dx=event.clientX-pointerStart.x,dy=event.clientY-pointerStart.y;
    pointerStart=null;
    if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy))navigate(current+(dx<0?1:-1));
  });
  carousel.addEventListener('pointercancel',()=>{pointerStart=null;});
  document.addEventListener('visibilitychange',schedule);
  motion.addEventListener('change',()=>{paused=motion.matches;syncPause();});
  setSlide(0);syncPause();
}
