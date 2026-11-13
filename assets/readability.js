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
   {"project": "오늘도 무사히", "title": "귀갓길의 걱정을 추격·속도·타이밍으로", "question": "추억에 공감하지 않아도 바로 즐길 재미는 무엇일까?", "decision": "혼날까 봐 서두르는 마음을 분노와 부모님 추격으로 바꿨습니다. 자동 전진의 속도와 예고를 읽고 피하는 타이밍을 중심에 두고, 의상과 가족의 기억은 그 위에 쌓이는 장기 보상으로 설계했습니다.", "output": "감각적 재미 → 판단 → 수집 → 이야기", "target": "runner-discover", "image": "assets/today-safely/run.webp", "alt": "동네를 달리며 장애물을 피하는 기본 플레이", "source": "runner"},
   {project:'Let Me Escape from Bloxity · Stage A',title:'오래 걷는 구간보다, 사건이 이어지는 구간',question:'주거단지에서 이동하는 동안 무엇을 발견하고 판단하게 할까?',decision:'초기 맵의 넓은 외곽 구간을 확인하고, 주요 건물과 사건을 남기는 방향으로 범위를 줄였습니다. 이동 거리보다 탐색·전투·상호작용의 밀도를 기준으로 삼았습니다.',output:'맵 범위와 동선의 개선 기준',source:'exit4',target:'case-map',imageSelector:'#case-map img',alt:'Stage A 맵 구성 비교 자료'}]},
  '02':{title:'판단이 실제 규칙과 진행 조건으로 이어지게 설계합니다',body:'어떤 행동을 하면 다음 목표가 열리는지, 보상은 다음 플레이와 어떻게 연결되는지 구체화했습니다.',chips:'규칙 설계 · 진행 조건 · 보상 연결',items:[
   {"project": "오늘도 무사히", "title": "한 판의 성과가 다음 목표로 이어지게", "question": "달리기가 끝난 다음 무엇을 하고 싶게 만들까?", "decision": "코인은 다음 판의 소모품, 열쇠는 원하는 보스와 의상, 디스크는 다음 가족의 기억으로 연결했습니다. 의상은 능력치 대신 세트 동작으로 보상하고, 10화 감상은 함께 귀가하는 엔딩으로 이어집니다.", "output": "준비 → 달리기 → 결과 → 보상 → 다음 준비", "target": "runner-design", "image": "assets/today-safely/wardrobe.webp", "alt": "취향에 따라 의상을 고르는 옷장", "source": "runner"},
   {project:'Let Me Escape from Bloxity · Stage A',title:'목표 달성의 결과로 다음 길이 열리도록',question:'전투와 탐색이 끊어진 과제가 아니라 하나의 진행으로 느껴지게 하려면?',decision:'철판 약탈자를 처치하면 봉쇄가 풀리고, 발전기 3차 방어를 마치면 보스 문이 열립니다. 편의점에서는 구급품 보급 또는 탈출로 안내를 선택하게 해 전투 사이에 목표 선택을 배치했습니다.',output:'11개 장면의 진행 순서와 퀘스트 분기',source:'exit4',target:'case-flow',imageSelector:'#case-branch img',alt:'Stage A 퀘스트 선택과 분기 자료'}]},
  '03':{title:'문서의 규칙을 플레이 장면과 대조합니다',body:'실제 화면과 플레이 영상으로 의도한 행동이 어떻게 드러나는지 확인할 수 있게 정리했습니다. 별도의 사용자 테스트 성과를 의미하지는 않습니다.',chips:'실제 플레이 화면 · 조작과 규칙 대조 · 플레이 영상',items:[
   {"project": "오늘도 무사히", "title": "완성 기준을 세우고 경험 단위로 구현하기", "question": "혼자 만드는 게임을 끝까지 완성하려면 어떻게 나눠야 할까?", "decision": "시작·플레이·결과·다시하기가 이어지는 빌드를 기준으로 계획했습니다. 한 세션에 하나의 경험을 확인하고, 새 기능이 기존 아이템이나 보스와 역할이 겹치는지 먼저 비교했습니다.", "output": "완성 기준 · 단계별 구현 · 중복 역할 점검", "target": "runner-prototype", "image": "assets/today-safely/bag.webp", "alt": "기존 보스와 다른 반격 방식으로 설계한 책가방 보스", "source": "runner"},
   {project:'Let Me Escape from Bloxity · Stage A',title:'예고를 읽고, 피하고, 반격하는 보스전',question:'공격을 피할 정보와 반격할 틈이 플레이에서 읽히는가?',decision:'3점사는 사격선을 보고 엄폐하고, 방패 돌진은 측면으로 이탈하며, 화염병은 원형 경고 밖으로 이동합니다. 패턴별 예고·대응·반격 장면을 상세 자료와 영상에 나란히 정리했습니다.',output:'철문 보스 패턴별 플레이 장면',source:'exit4',target:'case-boss',imageSelector:'#case-boss .boss-pattern-case-photos img',alt:'철문 보스의 공격 예고와 대응 장면'}]},
  '04':{title:'발견한 문제를 다음 진행과 경험의 개선으로 연결합니다',body:'두 프로젝트에서 확인한 입력·안내·동선 문제를, 문서에 기록된 규칙과 변경 이유에 연결했습니다. 확인되지 않은 테스트 성과는 덧붙이지 않았습니다.',chips:'문제 발견 → 수정 방향 → 진행 확인',items:[
   {"project": "오늘도 무사히", "title": "플레이의 불편을 원인과 규칙으로 바꾸기", "question": "쉽다·버벅인다·피할 수 없다는 느낌을 어떻게 수정할까?", "decision": "기다리는 보스는 접근하도록, 순간 입력만 보는 반격은 입력 기억과 동작 중 판정으로 바꿨습니다. 발판 높이와 스프링 대기를 조정하고, 콘텐츠 확장에 맞춰 60초 코스를 끝없는 달리기로 전환했습니다.", "output": "직접 플레이 → 원인 분석 → 규칙 수정", "target": "runner-improve", "image": "assets/today-safely/paper.webp", "alt": "반격 판정과 회피 동선을 다듬은 종이 괴물 보스", "source": "runner"},
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
