const $ = (s, r=document) => r.querySelector(s);
const p=window.portfolio;
const escapeHTML=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const tags=items=>items.map(t=>`<span class="tag">${escapeHTML(t)}</span>`).join('');
const caseInline=text=>String(text).split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map(part=>part.startsWith('**')&&part.endsWith('**')?`<strong>${escapeHTML(part.slice(2,-2))}</strong>`:part.startsWith('`')&&part.endsWith('`')?`<code>${escapeHTML(part.slice(1,-1))}</code>`:escapeHTML(part)).join('');
function caseBlocks(blocks,sectionId){
 const output=[];
 for(let i=0;i<blocks.length;i++){
  const block=blocks[i];
  if(block.type==='heading'&&blocks[i+1]?.type==='image'&&blocks[i+2]?.type==='paragraph'){
   const figures=[];
   while(blocks[i]?.type==='heading'&&blocks[i+1]?.type==='image'&&blocks[i+2]?.type==='paragraph'){
    const heading=blocks[i],picture=blocks[i+1],caption=blocks[i+2];
    figures.push(`<figure class="case-screenshot"><a class="case-image-link" href="${escapeHTML(picture.src)}" target="_blank" rel="noopener noreferrer" aria-label="Open ${escapeHTML(picture.alt)} at full resolution"><img src="${escapeHTML(picture.src)}" alt="${escapeHTML(picture.alt)}" loading="lazy" decoding="async"><span aria-hidden="true">↗</span></a><figcaption><h3>${caseInline(heading.text)}</h3><p>${caseInline(caption.text)}</p></figcaption></figure>`);
    i+=3;
   }
   i--;
   output.push(`<div class="screenshot-gallery">${figures.slice(0,2).join('')}</div>${figures.length>2?`<details class="supporting-diagrams additional-screenshots"><summary>More application screenshots (${figures.length-2})</summary><div class="screenshot-gallery">${figures.slice(2).join('')}</div></details>`:''}`);
   continue;
  }
  if(block.type==='resource'){
   const resources=[];
   while(blocks[i]?.type==='resource'){
    const resource=blocks[i];
    resources.push(`<a href="${escapeHTML(resource.url)}" ${resource.url.startsWith('#')?`data-case-target="${resource.url.slice(1)}"`:'target="_blank" rel="noopener noreferrer"'}><div>${caseInline(resource.label)}<p>${caseInline(resource.description)}</p></div><span aria-hidden="true">↗</span></a>`);
    i++;
   }
   i--;
   output.push(`<div class="case-resources">${resources.join('')}</div>`);
   continue;
  }
  if(block.type==='paragraph'&&/^\*\*.*\*\*$/.test(block.text)&&block.text.includes('→')){
   output.push(caseFlowDiagram(block.text));
   continue;
  }
  if(block.type==='paragraph'&&/^\*\*.*\*\*$/.test(block.text)){
   output.push(`<p>${caseInline(block.text)}</p>`);
   continue;
  }
  output.push(renderBlock(block));
 }
 return output.join('');
 function renderBlock(block){
  if(block.type==='code')return `<pre><code class="language-${escapeHTML(block.language)}">${escapeHTML(block.text)}</code></pre>`;
  if(block.type==='heading')return `<h3>${caseInline(block.text)}</h3>`;
  if(block.type==='image')return `<a href="${escapeHTML(block.src)}" target="_blank" rel="noopener noreferrer"><img src="${escapeHTML(block.src)}" alt="${escapeHTML(block.alt)}" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;border-radius:12px"></a>`;
  if(block.type==='list')return `<ul>${block.items.map(item=>`<li>${caseInline(item)}</li>`).join('')}</ul>`;
  if(block.type==='table')return `<div class="case-table-wrap"><table><thead><tr>${block.headers.map(value=>`<th scope="col">${caseInline(value)}</th>`).join('')}</tr></thead><tbody>${block.rows.map(row=>`<tr>${row.map(value=>`<td>${caseInline(value)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  if(block.type==='link')return `<a class="button secondary small" href="${block.url?escapeHTML(block.url):'#'+sectionId}" ${block.url?'target="_blank" rel="noopener noreferrer"':`data-expand-screens="${sectionId}"`}>${caseInline(block.text)}</a>`;
  if(block.type==='resource')return `<p><a href="${escapeHTML(block.url)}" ${block.url.startsWith('#')?`data-case-target="${block.url.slice(1)}"`:'target="_blank" rel="noopener noreferrer"'}>${caseInline(block.label)}</a><br>${caseInline(block.description)}</p>`;
  return `<p>${caseInline(block.text)}</p>`;
 }
}
function caseFlowDiagram(text){
 const labels=text.slice(2,-2).split('→').map(label=>label.trim());
 return `<div class="case-flow-diagram" role="group" aria-label="${escapeHTML(text.slice(2,-2))}" style="--flow-steps:${labels.length}">${labels.map((label,i)=>`<div class="case-flow-step"><div class="case-flow-node">${caseInline(label)}</div>${i<labels.length-1?'<span class="case-flow-connector" aria-hidden="true"> → </span>':''}</div>`).join('')}</div>`;
}
// Presentation-only evidence: approved narrative blocks remain in data.js unchanged.
const caseEvidence={
 'express-bnb':{
  'System Overview':[{src:'assets/express-bnb/class-overview.webp',label:'Original domain model'}],
  'Engineering Challenge: Booking State & Capacity':[{src:'assets/express-bnb/layered-state.webp',label:'Original booking-state diagram'}]
 },
 'stockshark':{
  'Architecture':[{src:'assets/stockshark/business-concept.png',label:'Original business-concept model'}],
  'Engineering Challenge: Reusing Persisted Market Data':[{src:'assets/stockshark/database-model.png',label:'Original database relationships'}]
 },
 'fitxchange':{
  'Engineering Challenge: Modelling the Rental Domain':[{src:'assets/fitxchange/entity-relationships.png',label:'Original entity-relationship diagram'}]
 },
 'library-management':{
  'Engineering Challenge: Date-Based Fine Calculation':[{src:'assets/library/account-fines.webp',label:'Original account and fines interface'}]
 },
 'footballer-skills':{
  'Engineering Challenge: Turning Ratings into Consistent Results':[{src:'assets/football-evaluator/rating-workflow.svg',label:'Supporting evaluation workflow'}]
 },
 'cinema-database':{
  'Database Design':[{src:'assets/cinema-database/physical-model.webp',label:'Original physical data model'}],
  'Sample Data & Implementation':[{src:'assets/cinema-database/schema-tables.webp',label:'Original implemented table inventory'},{src:'assets/cinema-database/payment-methods.webp',label:'Original transaction-linked payment records'}]
 },
 'assembly-calculator':{
  'Overview':[{src:'assets/assembly-calculator/repository-cover.webp',label:'Original repository overview'}]
 }
};
function supportingEvidence(items){
 if(!items?.length)return '';
 return `<details class="supporting-diagrams"><summary>View supporting images (${items.length})</summary><div class="diagram-gallery">${items.map(item=>`<figure class="evidence-figure diagram-figure"><a class="case-image-link" href="${escapeHTML(item.src)}" target="_blank" rel="noopener noreferrer" aria-label="Open ${escapeHTML(item.label)} at full resolution"><img src="${escapeHTML(item.src)}" alt="${escapeHTML(item.label)}" loading="lazy" decoding="async"><span class="image-expand">Open full size ↗</span></a><figcaption>${escapeHTML(item.label)}</figcaption></figure>`).join('')}</div></details>`;
}
const caseDocuments={
 'express-bnb':{'System Overview':[['assets/express-bnb/class-diagram.pdf','Open full class diagram PDF']],'Testing & Validation':[['assets/express-bnb/engineering-report.pdf','Engineering report']]},
 'stockshark':{'My Role':[['assets/stockshark/research-and-requirements.pdf','Open original research & requirements material']],'Architecture':[['assets/stockshark/architecture-diagrams.pdf','Open original architecture diagrams']],'Architecture as a Team Coordination Tool':[['assets/stockshark/presentation.pdf','Architecture presentation']],'Reflection':[['assets/stockshark/project-reflection.pdf','Project reflection']]},
 'fitxchange':{'System Overview':[['assets/fitxchange/architecture-diagrams.pdf','Open original UML & data-model diagrams']],'Software Engineering & Team Delivery':[['assets/fitxchange/presentation.pdf','Project presentation']],'Reflection':[['assets/fitxchange/project-reflection.pdf','Project reflection']]},
 'library-management':{'Testing & Validation':[['assets/library/engineering-report.pdf','Engineering report']]},
 'footballer-skills':{'System Overview':[['assets/football-evaluator/original-flowcharts.pdf','Open original workflow diagrams']]},
 'cinema-database':{'Database Design':[['assets/cinema-database/architecture-diagrams.pdf','Open original ERD & physical model']]}
};
function documentReferences(items){
 return (items||[]).map(([url,label])=>`<a class="button secondary small evidence-document" href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(label)} ↗</a>`).join('');
}
function capabilityIcon(name){
 const shapes={
  code:'<path d="m8 6-6 6 6 6m8-12 6 6-6 6m-3-14-2 16"/>',
  testing:'<path d="M9 3h6m-5 0v6l-6 10a1.3 1.3 0 0 0 1.1 2h13.8a1.3 1.3 0 0 0 1.1-2L14 9V3M8 14h8m-6 3 1.5 1.5L15 15"/>',
  tools:'<path d="M14.5 6.5a5 5 0 0 0-6.2-5.2l3 3-3 3-3-3a5 5 0 0 0 5.2 6.2L19 19a2.1 2.1 0 0 0 3-3Z"/>',
  chip:'<rect x="5" y="5" width="14" height="14" rx="3"/><path d="M9 1v4m6-4v4M9 19v4m6-4v4M1 9h4m-4 6h4m14-6h4m-4 6h4"/><circle cx="10" cy="10" r="1"/><circle cx="14" cy="14" r="1"/><path d="m11 11 2 2"/>',
  workplace:'<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12a24 24 0 0 0 18 0m-9 0v3"/>'
 };
 return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${shapes[name]||shapes.code}</svg>`;
}
function projectVisual(x, large=false){
 if(!x.image)return '<div class="visual real-project-visual">Project preview coming soon</div>';
 const customCover=!large&&x.cardImage;
 return `<div class="visual real-project-visual ${large?'large':''} ${customCover?'custom-project-cover':''}"><img src="${escapeHTML(customCover?x.cardImage:x.image)}" alt="${escapeHTML(customCover?x.cardImageAlt:x.imageAlt)}" width="1255" height="816" ${large?'fetchpriority="high"':'loading="lazy"'} decoding="async"><span class="screenshot-label">${escapeHTML(customCover?x.cardVisualLabel:(x.visualLabel || "PROJECT EVIDENCE"))}</span></div>`;
}
function evidenceFigure(item,diagram=false){
 return `<figure class="evidence-figure ${diagram?'diagram-figure':''}"><a href="${escapeHTML(item.src)}" target="_blank" rel="noopener noreferrer" aria-label="Open ${escapeHTML(item.title)} at full resolution"><img src="${escapeHTML(item.src)}" alt="${escapeHTML(item.title)}" loading="lazy" decoding="async"><span class="image-expand">Open full size ↗</span></a><figcaption><strong>${escapeHTML(item.title)}</strong><p>${escapeHTML(item.caption)}</p></figcaption></figure>`;
}
function renderCaseStudy(x){
 if(!$('#projects'))home();
 document.title=`${x.title} · Evan Balson`;
 const galleryIndex=x.sections.findIndex(section=>section.title==='Application Screenshots'||(['Results','Outcome'].includes(section.title)&&section.gallery?.length));
 const targetIndex=galleryIndex>=0?galleryIndex:x.sections.findIndex(section=>section.title==='Architecture');
 const targetId=`case-section-${Math.max(targetIndex,0)+1}`;
 const targetLabel=x.heroActionLabel || (galleryIndex>=0?(x.galleryLabel || 'View project screenshots'):'Explore the design');
 const heroAction=x.hideHeroAction?'':`<a class="button" href="${x.heroActionUrl?escapeHTML(x.heroActionUrl):'#'+targetId}" ${x.heroActionUrl?'target="_blank" rel="noopener noreferrer"':`data-case-target="${targetId}"`}>${escapeHTML(targetLabel)} ↗</a>`;
 const sections=x.sections.map((section,i)=>{
  const id=`case-section-${i+1}`;
  const style=section.title==='Application Screenshots'?'screenshots':section.title==='Evidence'?'evidence':section.title==='What I Would Improve'?'improvements':section.title==='Reflection'?'reflection':section.title.startsWith('Engineering Challenge')||section.title.startsWith('Architecture Decision')?'engineering':section.title.startsWith('Self-Directed')?'extension':'narrative';
  return `<section id="${id}" class="case-section case-section-${style}"><div class="section-heading"><h2>${escapeHTML(section.title)}</h2></div>
   ${section.blocks?caseBlocks(section.blocks,id):''}
   ${supportingEvidence(caseEvidence[x.id]?.[section.title])}
   ${documentReferences(caseDocuments[x.id]?.[section.title])}
   ${(section.paragraphs||[]).map(text=>`<p>${escapeHTML(text)}</p>`).join('')}
   ${section.processSteps?`<div class="engineering-process"><h3>How I worked through the SDLC</h3><ol>${section.processSteps.map(step=>`<li><strong>${escapeHTML(step.title)}</strong><p>${escapeHTML(step.text)}</p></li>`).join('')}</ol></div>`:''}
   ${section.principles?`<div class="engineering-principles"><h3>Principles behind the design</h3><div>${section.principles.map(principle=>`<article><h4>${escapeHTML(principle.title)}</h4><p>${escapeHTML(principle.text)}</p></article>`).join('')}</div></div>`:''}
   ${section.experiment?`<aside class="cnn-experiment"><p class="eyebrow">SELF-DIRECTED EXPERIMENT</p><h3>${escapeHTML(section.experiment.title)}</h3><p>${escapeHTML(section.experiment.intro)}</p><ol>${section.experiment.steps.map(step=>`<li>${escapeHTML(step)}</li>`).join('')}</ol><p>${escapeHTML(section.experiment.reflection)}</p></aside>`:''}
   ${section.bullets?`<ul>${section.bullets.map(text=>`<li>${escapeHTML(text)}</li>`).join('')}</ul>`:''}
   ${section.flow?`<div class="architecture">${section.flow.map((text,j)=>`<div><span>0${j+1}</span>${escapeHTML(text)}</div>${j<section.flow.length-1?'<b aria-hidden="true">→</b>':''}`).join('')}</div>`:''}
   ${section.decisions?`<div class="decision-list">${section.decisions.map(d=>`<article><h3>${escapeHTML(d.title)}</h3><p>${escapeHTML(d.reason)}</p><p class="decision-tradeoff"><strong>Tradeoff</strong> ${escapeHTML(d.tradeoff)}</p></article>`).join('')}</div>`:''}
   ${section.code?`<div class="code-example"><p>${escapeHTML(section.code.language)}</p><pre><code>${escapeHTML(section.code.text)}</code></pre></div>`:''}
   ${section.diagrams?`${section.collapsibleDiagrams?`<details class="supporting-diagrams"><summary>View supporting UML (${section.diagrams.length})</summary>`:''}<div class="diagram-gallery">${section.diagrams.map(d=>evidenceFigure(d,true)).join('')}</div>${section.collapsibleDiagrams?'</details>':''}`:''}
   ${section.document?`<a class="button secondary small evidence-document" href="${escapeHTML(section.document.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(section.document.label)} ↗</a>`:''}
   ${section.gallery?`<div class="screenshot-gallery">${section.gallery.map(d=>evidenceFigure(d)).join('')}</div>`:''}
   ${section.stackGroups?`<div class="case-stack">${section.stackGroups.map(group=>`<div><h3>${escapeHTML(group.label)}</h3><div class="tags">${tags(group.items)}</div></div>`).join('')}</div>`:''}
   ${section.resources?`<div class="case-resources">${section.resources.map(resource=>{const index=resource.section?x.sections.findIndex(section=>section.title===resource.section):-1;const target=index>=0?`case-section-${index+1}`:null;return `<a href="${target?'#'+target:escapeHTML(resource.url)}" ${target?`data-case-target="${target}"`:'target="_blank" rel="noopener noreferrer"'}><div><strong>${escapeHTML(resource.label)}</strong><p>${escapeHTML(resource.description)}</p></div><span aria-hidden="true">${target?'↓':'↗'}</span></a>`;}).join('')}</div>`:''}
  </section>`;
 }).join('');
 $('#project-detail').classList.toggle('portfolio-case',x.layout==='portfolio');
 $('#project-detail').innerHTML=`<div class="project-dialog-top"><a class="back" href="#projects">← Back to projects</a><button class="project-close" type="button" aria-label="Close project details">×</button></div><section class="case-hero"><div class="container"><div class="case-hero-grid"><div class="case-heading"><p class="eyebrow">${escapeHTML(x.headerEyebrow || 'COMPLETED PROJECT / '+x.category.toUpperCase())}</p><h1 id="project-dialog-title">${escapeHTML(x.title)}</h1><p>${escapeHTML(x.tagline)}</p><div class="case-badges">${x.headerMeta?`<span>${escapeHTML(x.headerMeta)}</span>`:`<span>${escapeHTML(x.date)}</span><span>${escapeHTML(x.status)}</span>`}</div><div class="tags">${tags(x.headerStack?x.headerStack.split('·').map(item=>item.trim()).filter(Boolean):x.tech)}</div>${heroAction}</div>${projectVisual(x,true)}</div></div></section>${x.quickFacts?`<dl class="container case-quick-facts">${x.quickFacts.map(fact=>`<div><dt>${escapeHTML(fact.label)}</dt><dd>${escapeHTML(fact.value)}</dd></div>`).join('')}</dl>`:''}<div class="container case-layout"><article class="case-content">${sections}<a class="button secondary" href="#projects">← All projects</a></article><aside class="case-sidebar"><div><h3>Project details</h3><dl><dt>Type</dt><dd>${escapeHTML(x.type)}</dd><dt>Period</dt><dd>${escapeHTML(x.date)}</dd><dt>Status</dt><dd>${escapeHTML(x.status)}</dd><dt>Evidence</dt><dd>${escapeHTML(x.evidenceLabel)}</dd></dl>${x.github?`<button class="text-button repository" data-id="${x.id}">GitHub repository ↗</button>`:''}</div><nav aria-label="Case study sections">${x.sections.map((section,i)=>`<a href="#case-section-${i+1}" data-case-target="case-section-${i+1}">${escapeHTML(section.title)} ↓</a>`).join('')}</nav></aside></div>`;
 const dialog=$('#project-dialog');
 if(!dialog.open){dialog.showModal();document.body.classList.add('project-open');}
 dialog.scrollTop=0;
 $('.project-close').onclick=closeProject;

 bindCommon();
 document.querySelectorAll('[data-case-target]').forEach(a=>a.onclick=e=>{e.preventDefault();document.getElementById(a.dataset.caseTarget)?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})});
 document.querySelectorAll('[data-expand-screens]').forEach(a=>a.onclick=e=>{
  e.preventDefault();
  const section=document.getElementById(a.dataset.expandScreens);
  const details=section?.querySelector('.additional-screenshots');
  if(details){details.open=true;details.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
 });
 const sectionLinks=[...document.querySelectorAll('.case-sidebar nav a')];
 const caseSections=[...document.querySelectorAll('.case-content>.case-section')];
 const updateCurrentSection=()=>{
  const boundary=dialog.getBoundingClientRect().top+130;
  const current=caseSections.filter(section=>section.getBoundingClientRect().top<=boundary).at(-1)||caseSections[0];
  sectionLinks.forEach(link=>{
   if(link.dataset.caseTarget===current?.id)link.setAttribute('aria-current','location');
   else link.removeAttribute('aria-current');
  });
 };
 let sectionUpdatePending=false;
 dialog.onscroll=()=>{
  if(sectionUpdatePending)return;
  sectionUpdatePending=true;
  requestAnimationFrame(()=>{updateCurrentSection();sectionUpdatePending=false;});
 };
 dialog.scrollTop=0;
 updateCurrentSection();
}
function card(x,i){return `<article class="project-card" data-category="${escapeHTML((x.categories || [x.category]).join("|"))}"><a class="visual-link" href="#project/${x.id}" aria-label="Read ${escapeHTML(x.title)} case study">${projectVisual(x)}<span class="project-category">${escapeHTML(x.category)}</span><span class="project-status">${x.real ? "Completed project" : "Illustrative concept"}</span><span class="visual-hover">Explore case study ↗</span></a><div class="card-content"><div class="card-meta"><span>${String(i+1).padStart(2,'0')} / ${escapeHTML(x.date)}</span><span>↗</span></div><a class="card-title" href="#project/${x.id}"><h3>${escapeHTML(x.title)}</h3></a><p>${escapeHTML(x.description)}</p><div class="tags">${tags(x.tech)}</div><ul class="highlights">${x.highlights.map(h=>`<li>${escapeHTML(h)}</li>`).join('')}</ul><div class="card-footer"><a class="card-open" href="#project/${x.id}">Case study <span>↗</span></a>${x.github || !x.real ? `<button class="text-button repository" data-id="${x.id}">GitHub ↗</button>` : `<span class="card-evidence">${escapeHTML(x.evidenceLabel)}</span>`}</div></div></article>`}
const sectionTitle=(n,title,desc='')=>`<div class="section-heading"><p class="eyebrow"><span>${n}</span> / ${title.toUpperCase()}</p><h2>${title}</h2>${desc?`<p>${desc}</p>`:''}</div>`;
const projectView={category:'All projects',sort:'featured'};
function projectDate(project){
 const years=project.date.match(/\b(?:19|20)\d{2}\b/g);
 if(!years)return 0;
 const year=Math.max(...years.map(Number));
 const monthNames=['january','february','march','april','may','june','july','august','september','october','november','december'];
 const month=monthNames.findIndex(month=>project.date.toLowerCase().includes(month));
 return year*12+(month<0?0:month);
}
function visibleProjects(){
 const projects=p.projects.filter(project=>projectView.category==='All projects'||(project.categories||[project.category]).includes(projectView.category));
 if(projectView.sort==='name')projects.sort((a,b)=>a.title.localeCompare(b.title));
 if(projectView.sort==='newest')projects.sort((a,b)=>projectDate(b)-projectDate(a));
 if(projectView.sort==='oldest')projects.sort((a,b)=>projectDate(a)-projectDate(b));
 return projects;
}
function applyProjectControls(){
 const projects=visibleProjects();
 $('.project-grid').innerHTML=projects.map(project=>card(project,p.projects.indexOf(project))).join('');
 $('.project-results').textContent=`${projects.length} project${projects.length===1?'':'s'}`;
 $('.project-filter-toggle').classList.toggle('has-filters',projectView.category!=='All projects'||projectView.sort!=='featured');
 bindCommon();
}
function setProjectControls(open){
 const panel=$('#project-controls');if(!panel)return;
 panel.hidden=!open;
 $('.project-filter-toggle').setAttribute('aria-expanded',String(open));
}
function home(){
 $('#main').innerHTML=` <section id="projects" class="container section projects-section"><div class="heading-row">${`<div class="section-heading"><h1><span class="hero-greeting">Hi, I’m Evan</span><br>and I like making<br><span>complex things work.</span></h1><p>Take a look at what I’ve been building and how I bring ideas to life.</p></div>`}</div><div class="project-toolbar"><nav class="project-menu" aria-label="Main navigation"><a href="#projects" class="active" aria-current="location">Projects</a><a href="#skills">Skills</a><a href="#about">About</a><a href="#contact">Contact</a></nav><div class="project-filter-wrap"><button class="project-filter-toggle" type="button" aria-label="Filter and sort projects" aria-expanded="false" aria-controls="project-controls"><svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h16l-6 7v6l-4 2v-8z"/></svg></button><div id="project-controls" class="project-controls" hidden><label for="project-category">Category</label><select id="project-category">${['All projects',...new Set(p.projects.flatMap(x=>x.categories || [x.category]))].map(category=>`<option value="${escapeHTML(category)}">${escapeHTML(category)}</option>`).join('')}</select><label for="project-sort">Sort by</label><select id="project-sort"><option value="featured">Featured order</option><option value="newest">Newest first</option><option value="oldest">Oldest first</option><option value="name">Name (A–Z)</option></select><div class="project-controls-footer"><span class="project-results" role="status"></span><button class="project-controls-reset" type="button">Reset</button></div></div></div></div><div class="project-grid">${p.projects.map(card).join('')}</div></section>
 <section id="skills" class="container section">${sectionTitle('02','Technical capabilities','Software development, problem-solving and hardware-connected testing in professional engineering environments.')}<div class="capabilities-profile"><p>Hands-on experience across embedded systems, full-stack development, UI/UX, automation, build systems and real-time applications, including RF measurement software and hardware–software integration.</p><p>Strong focus on architecture, backend development, debugging complex codebases and code validation. Experienced in cloud AI services, AI-enabled applications, model inference, evaluation workflows and responsible AI-assisted development.</p><p>Technically adept and adaptable, with project management experience and a commitment to continuous improvement.</p></div><div class="skills-grid">${p.capabilities.map(group=>`<article class="skill-group"><span class="skill-icon" aria-hidden="true">${capabilityIcon(group.icon)}</span><h3>${escapeHTML(group.title)}</h3><div class="tags">${tags(group.items)}</div></article>`).join('')}</div></section>
 <section id="about" class="container section about-section"><div>${sectionTitle('03','An engineering mindset')}<p>Alongside studying Software Engineering at the University of Roehampton, I’ve worked at Rohde &amp; Schwarz on commercial engineering software used with real RF instruments. My role has spanned C++ development, automated testing, Web UI work and hardware–software integration, giving me experience moving between code, architecture, instrumentation and validation rather than staying in one layer of the stack.</p><p>I enjoy getting into unfamiliar code, understanding how different parts of a product influence one another, and figuring out where a change can make a meaningful impact.</p><div class="education"><span>↗</span><div><h3>University of Roehampton</h3><p>BEng Software Engineering · Expected 2027</p><small>Projected First-Class Honours</small></div></div></div><aside class="interests"><p class="eyebrow">LOOKING AHEAD</p><h3>Areas I’m exploring</h3>${['Backend & systems engineering','Software architecture','Developer tooling & automation','AI-enabled applications','Hardware/software integration','Reliable and testable systems'].map((x,i)=>`<div><span>0${i+1}</span>${x}<span>↗</span></div>`).join('')}</aside></section>
 <section id="contact" class="contact-section"><div class="container"><h2>Let’s build<br><span>something useful.</span></h2><p>Interested in graduate software engineering opportunities<br>and conversations about meaningful engineering work.</p></div></section>`;
 bindCommon();
 $('#project-category').value=projectView.category;
 $('#project-sort').value=projectView.sort;
 $('#project-category').onchange=$('#project-sort').onchange=()=>{
  projectView.category=$('#project-category').value;
  projectView.sort=$('#project-sort').value;
  applyProjectControls();
 };
 $('.project-filter-toggle').onclick=()=>setProjectControls($('#project-controls').hidden);
 $('.project-controls-reset').onclick=()=>{
  projectView.category='All projects';projectView.sort='featured';
  $('#project-category').value=projectView.category;$('#project-sort').value=projectView.sort;
  applyProjectControls();
 };
 applyProjectControls();
}
function detail(id){
 const x=p.projects.find(x=>x.id===id);
 if(!x){home();notice('Project not found','Choose a project from the gallery.');return;}
 renderCaseStudy(x);
}
function notice(title,message){$('#notice-title').textContent=title;$('#notice-text').textContent=message;$('#notice').showModal()}
function safeURL(value){try{const u=new URL(value,location.href);return ['http:','https:'].includes(u.protocol)?u.href:null}catch{return null}}
function bindCommon(){document.querySelectorAll('.profile-link').forEach(b=>b.onclick=()=>{const key=b.dataset.profile;if(key==='email'&&p.email){location.href=`mailto:${encodeURIComponent(p.email)}`;return}const url=p[key]&&safeURL(p[key]);if(url)window.open(url,'_blank','noopener,noreferrer');else notice(key==='email'?'Contact details coming soon':`${key==='github'?'GitHub':'LinkedIn'} profile coming soon`,'This portfolio is awaiting the owner’s contact details.')});document.querySelectorAll('.repository').forEach(b=>b.onclick=()=>{const x=p.projects.find(x=>x.id===b.dataset.id);const url=x?.github&&safeURL(x.github);if(url)window.open(url,'_blank','noopener,noreferrer');else notice('Repository not linked','This project has no repository attached yet. Add its repository URL in data.js.')})}
let observer;
function closeProject(){location.hash='#projects';}
function route(){
 observer?.disconnect();
 const hash=location.hash;
 if(hash.startsWith('#project/'))detail(hash.slice(9));
 else{
  const dialog=$('#project-dialog');
  const returning=dialog.open;
  if(returning){dialog.close();document.body.classList.remove('project-open');}
  if(!$('#projects'))home();
  document.title='Evan Balson · Software Engineer';
  const target=hash&&document.getElementById(hash.slice(1));
  if(target&&!returning)requestAnimationFrame(()=>target.scrollIntoView());
  observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)document.querySelectorAll('.project-menu a').forEach(a=>{const active=a.hash==='#'+e.target.id;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');})})},{rootMargin:'-15% 0px -60% 0px'});
  document.querySelectorAll('main>section[id]').forEach(s=>observer.observe(s));
 }
 setProjectControls(false);
}
$('#project-dialog').addEventListener('cancel',event=>{event.preventDefault();closeProject();});
$('#project-dialog').addEventListener('click',event=>{
 if(event.target!==$('#project-dialog'))return;
 const rect=event.target.getBoundingClientRect();
 if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)closeProject();
});
document.addEventListener('click',event=>{
 const panel=$('#project-controls');
 if(panel&&!panel.hidden&&!event.target.closest('.project-filter-wrap'))setProjectControls(false);
});
document.addEventListener('keydown',event=>{
 const panel=$('#project-controls');
 if(event.key==='Escape'&&panel&&!panel.hidden){setProjectControls(false);$('.project-filter-toggle').focus();}
});
$('.close').onclick=$('.close-notice').onclick=()=>$('#notice').close();$('#notice').onclick=e=>{if(e.target===$('#notice')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close()}};
$('#year').textContent=new Date().getFullYear();$('.person-name').textContent=p.name;window.addEventListener('hashchange',route);route();bindCommon();
