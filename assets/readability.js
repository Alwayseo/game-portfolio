(() => {
 const filters=[...document.querySelectorAll('[data-filter]')];
 const cards=[...document.querySelectorAll('.project-card[data-tags]')];
 const match={unity:['Unity'],roblox:['Roblox'],system:['System'],level:['Level','Level Design'],quest:['Quest Design'],content:['Content','Event Flow']};
 cards.forEach(card=>{const engine=card.dataset.tags.includes('unity')?'Unity':'Roblox';const badge=document.createElement('span');badge.textContent=engine;card.querySelector('.project-inline-tags')?.prepend(badge)});
 filters.forEach(button=>button.addEventListener('click',()=>{
  const tag=button.dataset.filter!=='all'&&button.getAttribute('aria-pressed')==='true'?'all':button.dataset.filter;
  const selected=filters.find(b=>b.dataset.filter===tag);
  filters.forEach(b=>b.setAttribute('aria-pressed',String(b===selected)));
  cards.forEach(card=>{card.hidden=tag!=='all'&&!card.dataset.tags.split(' ').includes(tag);card.classList.add('is-visible');card.querySelectorAll('.project-inline-tags span').forEach(t=>t.classList.toggle('is-filter-match',(match[tag]||[]).includes(t.textContent.trim())))});
  document.querySelector('.filter-status').textContent=`${selected.textContent} 프로젝트 ${cards.filter(c=>!c.hidden).length}개`;
 }));
 const nav=[...document.querySelectorAll('.desktop-nav a,.mobile-menu a,.nav-contact')];
 const sections=[...document.querySelectorAll('main>section[id]')];
 let pending=false;
 function sync(){let current=sections[0]?.id;for(const section of sections){if(section.getBoundingClientRect().top<=160)current=section.id}nav.forEach(a=>{const active=a.hash==='#'+current;a.classList.toggle('is-active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')});pending=false}
 window.addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(sync)}},{passive:true});window.addEventListener('resize',sync);sync();
 const steps=[...document.querySelectorAll('[data-process]')];
 steps.forEach((button,i)=>{button.setAttribute('aria-controls','process-insight');button.addEventListener('click',()=>{document.querySelector('.process-progress span').style.width=`${(i+1)*25}%`;document.querySelector('.process-position').textContent=`${button.dataset.process} / 04 · ${button.querySelector('small').textContent}`});button.addEventListener('keydown',e=>{if(['ArrowDown','ArrowRight','ArrowUp','ArrowLeft','Home','End'].includes(e.key)){e.preventDefault();let next=e.key==='Home'?0:e.key==='End'?steps.length-1:(i+(['ArrowDown','ArrowRight'].includes(e.key)?1:-1)+steps.length)%steps.length;steps[next].focus();steps[next].click()}})});
})();

// Concrete process examples, grounded in the existing project case studies.
(() => {
 const panel=document.querySelector('#process-insight');
 if(!panel)return;
 const cases={
  '01':{title:'먼저, 플레이어가 어떤 판단을 하게 할지 묻습니다',body:'프로젝트 상세에 담긴 문제와 목표를 기획 질문으로 정리했습니다.',chips:'기획 질문 · 문제 정의 · 경험 목표',items:[
   {project:'오늘도 무사히',title:'같은 조작 안에서 읽는 정보를 다르게',question:'점프와 슬라이드만으로도 달리는 동안 다른 판단을 만들 수 있을까?',decision:'장애물을 높이·예고와 시점·지면의 길이·착지 후 재도약으로 나누었습니다. 피버는 도약·선별 수집·배달 타이밍으로 성공 조건을 바꾸고, 여러 판에 걸친 의상과 기억 수집을 연결했습니다.',output:'핵심 재미 3가지와 장애물 4분류 · 기획서 p. 9, 27, 43',source:'runner',target:'runner-discover',image:'assets/today-safely/parcel.webp',alt:'착지 후 다시 점프하는 택배차 연속 상자 구간'},
   {project:'Let Me Escape from Bloxity · Stage A',title:'오래 걷는 구간보다, 사건이 이어지는 구간',question:'주거단지에서 이동하는 동안 무엇을 발견하고 판단하게 할까?',decision:'초기 맵의 넓은 외곽 구간을 확인하고, 주요 건물과 사건을 남기는 방향으로 범위를 줄였습니다. 이동 거리보다 탐색·전투·상호작용의 밀도를 기준으로 삼았습니다.',output:'맵 범위와 동선의 개선 기준',source:'exit4',target:'case-map',imageSelector:'#case-map img',alt:'Stage A 맵 구성 비교 자료'}]},
  '02':{title:'판단이 실제 규칙과 진행 조건으로 이어지게 설계합니다',body:'어떤 행동을 하면 다음 목표가 열리는지, 보상은 다음 플레이와 어떻게 연결되는지 구체화했습니다.',chips:'규칙 설계 · 진행 조건 · 보상 연결',items:[
   {project:'오늘도 무사히',title:'보스 보상과 수집을 다음 판의 이유로',question:'한 번의 달리기를 마친 뒤에도 다시 시작할 동기는 무엇일까?',decision:'열쇠로 보스에 도전하고 의상 1부위를 얻습니다. 같은 세트 4부위를 모두 착용하면 고유 동작이 나타나고, 디스크로 순서대로 연 가족의 기억 10화는 함께 귀가하는 엔딩으로 이어집니다.',output:'재화·의상 착용·기억 해금의 연결 · 기획서 p. 14, 58, 62–65',source:'runner',target:'runner-design',image:'assets/today-safely/wardrobe.webp',alt:'부위별 의상과 세트를 확인하는 옷장 화면'},
   {project:'Let Me Escape from Bloxity · Stage A',title:'목표 달성의 결과로 다음 길이 열리도록',question:'전투와 탐색이 끊어진 과제가 아니라 하나의 진행으로 느껴지게 하려면?',decision:'철판 약탈자를 처치하면 봉쇄가 풀리고, 발전기 3차 방어를 마치면 보스 문이 열립니다. 편의점에서는 구급품 보급 또는 탈출로 안내를 선택하게 해 전투 사이에 목표 선택을 배치했습니다.',output:'11개 장면의 진행 순서와 퀘스트 분기',source:'exit4',target:'case-flow',imageSelector:'#case-branch img',alt:'Stage A 퀘스트 선택과 분기 자료'}]},
  '03':{title:'문서의 규칙을 플레이 장면과 대조합니다',body:'실제 화면과 플레이 영상으로 의도한 행동이 어떻게 드러나는지 확인할 수 있게 정리했습니다. 별도의 사용자 테스트 성과를 의미하지는 않습니다.',chips:'실제 플레이 화면 · 조작과 규칙 대조 · 플레이 영상',items:[
   {project:'오늘도 무사히',title:'배달 타이밍을 익힌 뒤 도약 높이를 더하기',question:'하나의 피버 안에서도 판단을 단계적으로 넓히려면?',decision:'겨울 배달은 지상 우편함 두 곳에서 초록 링에 맞춰 입력을 놓는 과제부터 시작합니다. 다음에는 높은 집에 점프해 배달하며, 점프 표지판을 지상 집에서 떨어뜨려 두 입력이 겹치지 않게 했습니다.',output:'지상 100점 × 2 → 높은 집 150점 · 기획서 p. 47',source:'runner',target:'runner-prototype',image:'assets/today-safely/delivery.webp',alt:'겨울 배달 피버의 실제 플레이 화면'},
   {project:'Let Me Escape from Bloxity · Stage A',title:'예고를 읽고, 피하고, 반격하는 보스전',question:'공격을 피할 정보와 반격할 틈이 플레이에서 읽히는가?',decision:'3점사는 사격선을 보고 엄폐하고, 방패 돌진은 측면으로 이탈하며, 화염병은 원형 경고 밖으로 이동합니다. 패턴별 예고·대응·반격 장면을 상세 자료와 영상에 나란히 정리했습니다.',output:'철문 보스 패턴별 플레이 장면',source:'exit4',target:'case-boss',imageSelector:'#case-boss .boss-pattern-case-photos img',alt:'철문 보스의 공격 예고와 대응 장면'}]},
  '04':{title:'발견한 문제를 다음 진행과 경험의 개선으로 연결합니다',body:'두 프로젝트에서 확인한 입력·안내·동선 문제를, 문서에 기록된 규칙과 변경 이유에 연결했습니다. 확인되지 않은 테스트 성과는 덧붙이지 않았습니다.',chips:'문제 발견 → 수정 방향 → 진행 확인',items:[
   {project:'오늘도 무사히',title:'입력과 위험 신호가 의도한 행동으로 이어지도록',question:'점프 입력과 위험·과제 안내가 플레이에서 분명하게 전달되는가?',decision:'착지 직전 점프 입력을 0.12초 기억하고, 분수는 물줄기만 위험으로 읽히도록 앞선 표지와 굵은 표현을 사용했습니다. 도전 스탬프는 현황 UI와 장애물 표시로 3개 연속 회피 과제를 분명히 했습니다.',output:'입력 보정·분수 가독성·스탬프 UI · 기획서 p. 17, 21, 34',source:'runner',target:'runner-improve',image:'assets/today-safely/fountain.webp',alt:'물줄기의 높이를 읽고 슬라이드하는 호수공원 분수 구간'},
   {project:'Let Me Escape from Bloxity · Stage A',title:'빈 이동 구간을 사건 중심으로 압축',question:'주요 건물과 이벤트 사이의 이동만 길어지는 문제',decision:'주요 장소를 남기며 외곽 범위를 축소하고, 각 장소가 다음 사건으로 이어지도록 동선을 조정했습니다. 초기 구성과 압축한 구성을 비교해 변경 이유를 남겼습니다.',output:'초기 맵과 수정 맵의 비교',source:'exit4',target:'case-map',imageSelector:'#case-map img',alt:'주거단지 초기 구성과 압축된 맵의 비교 자료'},
   {project:'Let Me Escape from Bloxity · Stage A',title:'전투가 끝난 뒤 다음 구간을 방해하지 않도록',question:'발전기 웨이브 종료 후 화염 효과가 남는 문제',decision:'방어전 종료 뒤 남는 화염 효과를 점검하고 다음 진행을 방해하지 않도록 조정했습니다. 보스는 초기 2페이즈 구상에서 탐색·압박·분노의 3단계로 확장해 전투 압박의 변화를 구성했습니다.',output:'방어전 종료 처리와 단계별 보스 구성',source:'exit4',target:'case-review'}]}
 };
 const grid=document.createElement('div');grid.className='process-evidence-grid';panel.append(grid);
 const note=document.createElement('p');note.className='process-source-note';note.textContent='프로젝트 상세에 기록된 기획 의도와 실제 장면을 단계별로 묶었습니다. 근거 보기를 누르면 해당 상세 항목이 열립니다.';panel.append(note);
 function render(key){
  const data=cases[key];if(!data)return;
  panel.querySelector('#insight-title').textContent=data.title;panel.querySelector('#insight-body').textContent=data.body;panel.querySelector('#insight-chips').textContent=data.chips;
  grid.replaceChildren();
  data.items.forEach(item=>{
   const article=document.createElement('article');article.className='process-evidence-card';
   const label=document.createElement('p');label.className='process-evidence-project';label.textContent=item.project;article.append(label);
   const title=document.createElement('h3');title.textContent=item.title;article.append(title);
   let image;if(item.image){image=document.createElement('img');image.src=item.image}else if(item.imageSelector){image=document.querySelector(item.imageSelector)?.cloneNode(true)}
   if(image){image.removeAttribute('id');image.alt=item.alt;image.loading='lazy';image.className='process-evidence-image';article.append(image)}
   const dl=document.createElement('dl');[['질문·문제',item.question],['기획 판단',item.decision],['남긴 결과물',item.output]].forEach(([term,value])=>{const wrap=document.createElement('div'),dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=term;dd.textContent=value;wrap.append(dt,dd);dl.append(wrap)});article.append(dl);
   const source=document.createElement('button');source.type='button';source.className='process-source-button';source.textContent='프로젝트 상세에서 근거 보기 ↗';source.setAttribute('aria-label',`${item.project} ${item.title} 근거 보기`);
   source.addEventListener('click',()=>{const trigger=document.querySelector(item.source==='runner'?'[data-runner]':'[data-exit4]');const dialog=document.querySelector(item.source==='runner'?'#runner-dialog':'#exit4-dialog');trigger?.click();const target=document.getElementById(item.target);if(target&&dialog?.open){requestAnimationFrame(()=>target.scrollIntoView({block:'start',behavior:'instant'}))}});article.append(source);grid.append(article);
  });
 }
 document.querySelectorAll('[data-process]').forEach(button=>button.addEventListener('click',()=>render(button.dataset.process)));
 render(document.querySelector('[data-process][aria-pressed="true"]')?.dataset.process||'01');
})();
