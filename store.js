'use strict';
// Catalogue supplied in the owner's reference images. Unpriced items use enquiries.
const subscriptionCategories = ['All','AI tools','Creative','Productivity','Entertainment','Security'];
const subscriptionProducts = [
  ['ChatGPT Plus','AI tools','GPT','#75d6b0',[[1150,'1 month']],'An AI companion for writing, brainstorming and everyday tasks.'],
  ['Gemini Pro','AI tools','✦','#8daaff',[[450,'1 month'],[999,'6 months'],[1990,'18 months']],'Explore an AI assistant for ideas, learning and productivity.'],
  ['Grok Supergrok','AI tools','Grok','#ddd5f3',[[1990,'1 month']],'Explore Grok’s AI tools. Ask us about the available access options.'],
  ['VEO 3 Ultra','AI tools','VEO','#a1c4ff',[],'Turn your creative ideas into AI video concepts.'],
  ['NotebookLM','AI tools','NLM','#bfb5ee',[[590,'1 month']],'An AI research workspace for your sources and notes.'],
  ['Replit Core','AI tools','Re','#f79b7f',[],'A workspace for turning ideas into software.'],
  ['Lovable AI Pro','AI tools','♥','#ffa8be',[],'Explore AI tools for bringing app and website ideas to life.'],
  ['Muse AI','AI tools','Muse','#c0a3fa',[],'Listed as free in the supplied catalogue. Ask for current access details.'],
  ['Stealth Writer','AI tools','Sw','#c7c7eb',[],'Writing tools for refining and editing your content.'],
  ['CapCut Pro','Creative','Cut','#f5f5f5',[[550,'1 month']],'Edit your next reel, story or video project.'],
  ['Canva Pro','Creative','Ca','#76e1ed',[[590,'1 year'],[1590,'Lifetime · listed offer']],'Design presentations, social posts and brand content.'],
  ['Adobe Creative Cloud Pro','Creative','Adobe','#ff969f',[[1990,'1 month']],'Creative tools for your next design, photo or video project.'],
  ['Lightroom Pro','Creative','Lr','#9ad5ff',[],'Photo editing tools for a more considered finish.'],
  ['Envato Elements','Creative','env','#bce687',[],'Creative assets for your content and design workflow.'],
  ['Motion Array Pro','Creative','MA','#c9a9ff',[],'Explore resources for video editing and motion projects.'],
  ['Freepik Premium','Creative','fp','#89b3ff',[],'Creative resources for design and visual storytelling.'],
  ['Figma','Creative','Fi','#c3a5fc',[[3449,'1 year']],'A collaborative space for interface and product design.'],
  ['Filmora','Creative','F','#80dbd2',[[990,'1 month']],'Video editing tools for your next creative story.'],
  ['Office 365 Pro','Productivity','365','#f5af90',[],'Everyday office tools for work, study and organisation.'],
  ['Office 2021','Productivity','O21','#a5d7b4',[[990,'1 year']],'Ask about the available edition, licence and device compatibility.'],
  ['Office 2024','Productivity','O24','#dcabdf',[[1590,'1 year']],'Ask about the available edition, licence and device compatibility.'],
  ['Windows 10/11 Pro Key','Productivity','⊞','#93bfff',[[990,'1 year · listed offer']],'Confirm the version, licence type and activation terms before ordering.'],
  ['Google Drive','Productivity','Drive','#dfcb84',[[1990,'1 year']],'Ask about the included storage capacity and account access.'],
  ['LinkedIn','Productivity','in','#95bded',[[2990,'3 months']],'Ask about the available membership tier and account requirements.'],
  ['Zoom','Productivity','zoom','#95b5ff',[[1499,'1 month']],'Ask about meeting limits, plan features and the available access type.'],
  ['QuillBot Premium','Productivity','Q','#9bd4a9',[],'Tools for rewriting, reviewing and refining your writing.'],
  ['Grammarly Premium','Productivity','Gr','#9de0c4',[],'Writing assistance for clearer everyday communication.'],
  ['WhatsApp Saver','Productivity','WS','#a6ddab',[],'Ask us about the available product, platform and features.'],
  ['Duolingo Super','Productivity','Duo','#beea81',[],'Give your language-learning routine a little extra support.'],
  ['Netflix','Entertainment','N','#ff777e',[[590,'1 month'],[990,'2 months']],'Find something to watch. Confirm the profile and device terms.'],
  ['YouTube Premium','Entertainment','▶','#ff9caa',[[449,'1 month'],[800,'2 months']],'Ask about available membership options and regional eligibility.'],
  ['Spotify','Entertainment','≋','#95d8a5',[[550,'1 month']],'A soundtrack for your everyday. Ask about the available plan.'],
  ['Prime Video','Entertainment','prime','#8cd5ee',[[550,'1 month'],[900,'2 months']],'Explore your next watch with the available membership options.'],
  ['HBO Max','Entertainment','max','#bcb1ff',[[599,'1 month']],'Ask about availability, supported regions and device access.'],
  ['Surfshark','Security','S','#95dbd9',[[550,'1 month']],'Explore VPN access options for your devices.'],
  ['HideMyAss VPN','Security','HMA','#e4c57c',[],'Ask about the available VPN plan and supported devices.']
].map((p,i)=>({id:'sub-'+i,name:p[0],category:p[1],mark:p[2],color:p[3],options:p[4],description:p[5]}));
const subGrid = document.querySelector('#subscription-grid');
let subscriptionCategory='All';
const safe = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const rupees = price => 'Rs. '+price.toLocaleString('en-LK');
function renderSubscriptions(){
  const query=document.querySelector('#subscription-search').value.trim().toLowerCase();
  const visible=subscriptionProducts.filter(p=>(subscriptionCategory==='All'||p.category===subscriptionCategory)&&`${p.name} ${p.category}`.toLowerCase().includes(query));
  document.querySelector('#subscription-tabs').innerHTML=subscriptionCategories.map(c=>`<button class="filter-chip" aria-pressed="${c===subscriptionCategory}" data-sub-category="${c}">${c}</button>`).join('');
  document.querySelector('#subscription-count').textContent=String(visible.length).padStart(2,'0')+' digital essentials · '+subscriptionCategory;
  document.querySelector('#subscription-empty').hidden=visible.length>0;
  subGrid.innerHTML=visible.map(p=>`<article class="subscription-card" style="--product-color:${p.color}"><div class="subscription-card-top"><span class="product-mark" aria-hidden="true">${p.mark}</span><span class="product-category">${p.category}</span></div><h3>${p.name}</h3><p>${p.description}</p><div class="subscription-card-bottom"><div>${p.options.length?`<small>${p.options.length>1?'FROM':'LISTED PRICE'}</small><strong>${rupees(Math.min(...p.options.map(o=>o[0])))}</strong><span>${p.options[0][1]}</span>`:'<small>LET’S FIND YOUR OPTION</small><strong class="ask-price">Ask for pricing</strong><span>Availability on enquiry</span>'}</div><button data-sub-product="${p.id}" aria-label="View ${p.name} options"><span aria-hidden="true">↗</span></button></div></article>`).join('');
}
document.querySelector('#subscription-tabs').addEventListener('click',e=>{const btn=e.target.closest('[data-sub-category]');if(btn){subscriptionCategory=btn.dataset.subCategory;renderSubscriptions();document.querySelector(`[data-sub-category="${subscriptionCategory}"]`).focus({preventScroll:true});}});
document.querySelector('#subscription-search').addEventListener('input',renderSubscriptions);
document.querySelector('#subscription-reset').addEventListener('click',()=>{subscriptionCategory='All';document.querySelector('#subscription-search').value='';renderSubscriptions();});
let lastSubscriptionTrigger;
const subscriptionDialog=document.querySelector('#subscription-dialog');
subGrid.addEventListener('click',e=>{
  const button=e.target.closest('[data-sub-product]');if(!button)return;
  const p=subscriptionProducts.find(p=>p.id===button.dataset.subProduct);
  lastSubscriptionTrigger=button;
  document.querySelector('#subscription-detail').innerHTML=`<span class="product-mark" style="--product-color:${p.color}" aria-hidden="true">${p.mark}</span><h2 id="subscription-title">${p.name}</h2><p>${p.description}</p>${p.options.length?`<label for="subscription-option">Choose your option</label><select id="subscription-option">${p.options.map((o,i)=>`<option value="${i}">${safe(o[1])} — ${rupees(o[0])}</option>`).join('')}</select>`:'<p class="subscription-unpriced">Ask us for current pricing and available durations.</p>'}<p class="subscription-terms">Confirm availability, account or profile access, device limits, activation, renewal and replacement terms with SKYNET before payment.${p.options.some(o=>o[1].includes('Lifetime'))?' “Lifetime” is the catalogue’s offer label; ask what access period and support it covers.':''}</p><a id="subscription-whatsapp" class="button primary full" target="_blank" rel="noopener noreferrer">Enquire on WhatsApp ↗</a><button class="text-link sub-copy" id="subscription-copy">Copy enquiry for Telegram</button><a class="sub-telegram" href="https://t.me/skynet_int" target="_blank" rel="noopener noreferrer">Open Telegram ↗</a>`;
  const message=()=>{const option=p.options[Number(document.querySelector('#subscription-option')?.value||0)];return `Hello SKYNET Store! I’m interested in ${p.name}.\n${option?`Option: ${option[1]} / ${rupees(option[0])}`:'Please send current pricing and duration options.'}\nPlease confirm availability, access type, supported devices, activation, renewal and replacement terms before payment.`;};
  const update=()=>{document.querySelector('#subscription-whatsapp').href='https://wa.me/94763813667?text='+encodeURIComponent(message());};
  document.querySelector('#subscription-option')?.addEventListener('change',update);update();
  document.querySelector('#subscription-copy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(message());showToast('Enquiry copied. Paste it into your Telegram chat.');}catch{showToast('Clipboard unavailable. Use WhatsApp to open the prepared enquiry.');}});
  subscriptionDialog.showModal();document.body.classList.add('modal-open');
});
subscriptionDialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');lastSubscriptionTrigger?.focus();});
subscriptionDialog.addEventListener('click',e=>{const r=subscriptionDialog.getBoundingClientRect();if(e.target===subscriptionDialog&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom))subscriptionDialog.close();});
document.querySelector('#web-enquiry-form').addEventListener('submit',e=>{
  e.preventDefault();
  const message=`Hello SKYNET Store! I would like to discuss a website.\nName / business: ${document.querySelector('#project-name').value.trim()}\nProject: ${document.querySelector('#project-type').value}\nDetails: ${document.querySelector('#project-details').value.trim()}\nPlease let me know the proposed scope, pricing and timeline.`;
  window.open('https://wa.me/94763813667?text='+encodeURIComponent(message),'_blank','noopener,noreferrer');
});
const pageTitles={home:'Connect. Create. Build.',v2ray:'V2Ray Plans & Setup',subscriptions:'Digital Subscriptions',web:'Custom Web Design',contact:'Contact Us'};
const v2Hashes=new Set(['packages','package-results','plans','setup','support']);
let activePage;
function routeStore(initial=false){
  const hash=decodeURIComponent(location.hash.slice(1))||'home';
  const page=v2Hashes.has(hash)?'v2ray':hash==='project-enquiry'?'web':Object.hasOwn(pageTitles,hash)?hash:'home';
  const changed=activePage!==page;
  document.querySelectorAll('[data-page]').forEach(el=>{el.hidden=el.dataset.page!==page;});
  document.querySelectorAll('#navigation a').forEach(a=>{const current=a.hash==='#'+page;a.classList.toggle('active',current);if(current)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
  document.title='SKYNET Store — '+pageTitles[page];
  document.body.dataset.currentPage=page;
  const mobilePrimary=document.querySelector('.mobile-actions a');
  mobilePrimary.href=page==='v2ray'?'#plans':page==='web'?'#project-enquiry':'#subscriptions';
  mobilePrimary.textContent=page==='v2ray'?'View plans ↗':page==='web'?'Start a project ↗':'Explore store ↗';
  activePage=page;
  if(changed&&!initial){window.scrollTo({top:0,behavior:'instant'});const heading=document.querySelector(`[data-page="${page}"] h1`);heading.setAttribute('tabindex','-1');heading.focus({preventScroll:true});}
  if(hash!==page){requestAnimationFrame(()=>document.getElementById(hash)?.scrollIntoView({behavior:initial?'instant':'smooth',block:'start'}));}
  window.dispatchEvent(new Event('resize'));
}
window.addEventListener('hashchange',()=>routeStore());
renderSubscriptions();routeStore(true);
