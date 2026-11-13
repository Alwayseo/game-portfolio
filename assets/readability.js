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
  '01':{title:'먼저, 플레이어가 어떤 판단을 하게 할지 묻습니다',body:'플레이어가 느낄 재미와 선택을 먼저 정하고, 그 목표에 맞춰 진행 방향을 잡았습니다.',chips:'기획 질문 · 문제 정의 · 경험 목표',items:[
   {"project": "오늘도 무사히", "title": "귀갓길의 걱정을 추격·속도·타이밍으로", "question": "추억에 공감하지 않아도 바로 즐길 재미는 무엇일까?", "decision": "혼날까 봐 서두르는 마음을 분노와 부모님 추격으로 바꿨습니다. 자동 전진의 속도와 예고를 읽고 피하는 타이밍을 중심에 두고, 의상과 가족의 기억은 그 위에 쌓이는 장기 보상으로 설계했습니다.", "output": "감각적 재미 → 판단 → 수집 → 이야기", "target": "runner-discover", "image": "assets/today-safely/run.webp", "alt": "동네를 달리며 장애물을 피하는 기본 플레이", "source": "runner"},
   {"project": "Let Me Escape from Bloxity · Stage A", "title": "유도형 퀘스트에서 자유 탐험형으로", "question": "길을 알려 주는 안내가 오히려 탐험을 없애고 있지는 않을까?", "decision": "팀의 “튜토리얼 같다”는 피드백을 받고 바닥 유도선과 구역 안내 UI를 걷어냈습니다. 이벤트는 남기되 상주 감염주민·보급 상자·상호작용 오브젝트를 배치해, 플레이어가 탐색하다 사건에 들어가도록 바꿨습니다.", "output": "정보는 남기고 강제는 줄인 탐색 구조", "target": "case-direction", "imageSelector": "#case-map img", "alt": "탐색과 상호작용이 이어지는 Stage A 주거단지 구성", "source": "exit4"}]},
  '02':{title:'판단이 실제 규칙과 진행 조건으로 이어지게 설계합니다',body:'어떤 행동을 하면 다음 목표가 열리는지, 보상은 다음 플레이와 어떻게 연결되는지 구체화했습니다.',chips:'규칙 설계 · 진행 조건 · 보상 연결',items:[
   {"project": "오늘도 무사히", "title": "한 판의 성과가 다음 목표로 이어지게", "question": "달리기가 끝난 다음 무엇을 하고 싶게 만들까?", "decision": "코인은 다음 판의 소모품, 열쇠는 원하는 보스와 의상, 디스크는 다음 가족의 기억으로 연결했습니다. 의상은 능력치 대신 세트 동작으로 보상하고, 10화 감상은 함께 귀가하는 엔딩으로 이어집니다.", "output": "준비 → 달리기 → 결과 → 보상 → 다음 준비", "target": "runner-design", "image": "assets/today-safely/wardrobe.webp", "alt": "취향에 따라 의상을 고르는 옷장", "source": "runner"},
   {"project": "Let Me Escape from Bloxity · Stage A", "title": "행동의 결과가 다음 사건을 열도록", "question": "탐색·전투·탈출이 흩어진 과제 대신 하나의 경험으로 이어지려면?", "decision": "구급품 보급을 선택한 진행에서 11개 행동·사건을 연결했습니다. 철판 약탈자 처치는 봉쇄 해제로, 발전기 3웨이브 완료는 보스 구역 개방으로 이어집니다. 보스 이후에도 가스 차단·지도·통신을 거쳐 탈출하도록 결과와 다음 목표를 묶었습니다.", "output": "선택을 포함한 11단계의 원인–결과 진행", "target": "case-flow", "imageSelector": "#case-flow img", "alt": "아이템 습득에서 전투로 이어지는 Stage A 진행 장면", "source": "exit4"}]},
  '03':{title:'작은 단위로 구현하고, 직접 플레이하며 확인합니다',body:'AI와 역할을 나누고 한 번에 확인할 경험을 좁혔습니다. 단계마다 플레이한 뒤 다음 구현과 수정 방향을 정했습니다.',chips:'역할 분담 · 단계별 구현 · 직접 플레이테스트',items:[
   {"project": "오늘도 무사히", "title": "완성 기준을 세우고 경험 단위로 구현하기", "question": "혼자 만드는 게임을 끝까지 완성하려면 어떻게 나눠야 할까?", "decision": "시작·플레이·결과·다시하기가 이어지는 빌드를 기준으로 계획했습니다. 한 세션에 하나의 경험을 확인하고, 새 기능이 기존 아이템이나 보스와 역할이 겹치는지 먼저 비교했습니다.", "output": "완성 기준 · 단계별 구현 · 중복 역할 점검", "target": "runner-prototype", "image": "assets/today-safely/bag.webp", "alt": "기존 보스와 다른 반격 방식으로 설계한 책가방 보스", "source": "runner"},
   {"project": "Let Me Escape from Bloxity · Stage A", "title": "AI와 역할을 나누고 단계마다 직접 테스트", "question": "구현을 맡기면서도 플레이의 방향과 품질을 어떻게 지킬까?", "decision": "기획·채택·플레이테스트는 직접 맡고, Gemini는 초기 구상, Codex는 구현·자체 테스트·문서화를 보조하게 했습니다. 큰 요청을 이벤트 단위로 나누고, 변경 전 백업과 Stage A 한정 수정 규칙을 둔 뒤 직접 플레이하며 반영 또는 원상복구를 결정했습니다.", "output": "목표 전달 → 단계별 구현 → 직접 테스트 → 수정·채택", "target": "case-ai", "imageSelector": "#case-boss .boss-pattern-case-photos img", "alt": "직접 플레이하며 공격 예고와 대응을 확인한 철문 보스전", "source": "exit4"}]},
  '04':{title:'발견한 문제를 다음 진행과 경험의 개선으로 연결합니다',body:'직접 플레이하며 느낀 불편을 입력·안내·동선의 원인으로 나눴습니다. 규칙과 수치를 조정하고, 방향이 어긋난 변경은 되돌린 뒤 다시 시도했습니다.',chips:'문제 발견 → 수정 방향 → 진행 확인',items:[
   {"project": "오늘도 무사히", "title": "플레이의 불편을 원인과 규칙으로 바꾸기", "question": "쉽다·버벅인다·피할 수 없다는 느낌을 어떻게 수정할까?", "decision": "기다리는 보스는 접근하도록, 순간 입력만 보는 반격은 입력 기억과 동작 중 판정으로 바꿨습니다. 발판 높이와 스프링 대기를 조정하고, 콘텐츠 확장에 맞춰 60초 코스를 끝없는 달리기로 전환했습니다.", "output": "직접 플레이 → 원인 분석 → 규칙 수정", "target": "runner-improve", "image": "assets/today-safely/paper.webp", "alt": "반격 판정과 회피 동선을 다듬은 종이 괴물 보스", "source": "runner"},
   {"project": "Let Me Escape from Bloxity · Stage A", "title": "맵 축소 실패를 복원하고, 순서부터 다시 설계", "question": "맵을 줄인 결과 동선이 겹치고 이벤트가 흐트러졌다면?", "decision": "절반 일괄 축소와 이벤트 일괄 재배치가 의도대로 되지 않아 각각 원본으로 복원했습니다. 세 번째에는 이벤트 구동을 먼저 점검하고 핵심 구역은 유지한 채 외곽만 절단했습니다. L자 바리케이드 6구간으로 경계를 정리했습니다.", "output": "일괄 변경 실패 → 복원 → 구동 점검 → 단계적 절단", "target": "case-map", "imageSelector": "#case-map img", "alt": "핵심 장소를 유지하며 외곽 이동 구간을 압축한 맵 구성", "source": "exit4"},
   {"project": "Let Me Escape from Bloxity · Stage A", "title": "플레이 감각을 원인과 조정 값으로 번역", "question": "정신없는 웨이브와 어려운 보스를 어떻게 다듬을까?", "decision": "발전기는 적을 모두 처치해야 다음 웨이브로 넘어가고, 진행에 맞춰 셔터가 열리게 했습니다. 보스는 추적·예측 조준·패턴과 예고 시간을 유지하면서 체력을 600에서 540으로, 3단계 속도를 19에서 17로 낮춰 공격 압박을 완화했습니다.", "output": "웨이브 진행 조건 정리 · 보스 압박 수치 조정", "target": "case-review", "source": "exit4"}]}
 };
 const grid=document.createElement('div');grid.className='process-evidence-grid';panel.append(grid);
 const note=document.createElement('p');note.className='process-source-note';note.textContent='각 사례의 설계 판단과 플레이 장면은 프로젝트 상세에서 이어 볼 수 있습니다.';panel.append(note);
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
