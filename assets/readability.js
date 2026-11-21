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
   {"project":"Let Me Escape from Bloxity · Stage A","title":"안내선을 줄이고, 둘러볼 이유를 만들기","question":"길을 잃지 않게 하는 안내가 탐험의 재미를 없애지는 않을까?","decision":"첫 스테이지라 안내선을 강조했지만 팀에서는 “너무 튜토리얼 같다”는 의견을 받았습니다. 안내선 대신 표지판·쪽지로 단서를 남기고, 배회하는 감염 주민과 보급 상자를 배치했습니다. 철판 약탈자도 철판을 줍는 행동으로 등장하게 바꿨습니다.","output":"팀 피드백 → 진행 방식 변경 · 기획서 p.10","target":"case-direction","imageSelector":"#case-map img","alt":"탐색과 상호작용이 이어지는 Stage A 주거단지 구성","source":"exit4"}]},
  '02':{title:'판단이 실제 규칙과 진행 조건으로 이어지게 설계합니다',body:'어떤 행동을 하면 다음 목표가 열리는지, 보상은 다음 플레이와 어떻게 연결되는지 구체화했습니다.',chips:'규칙 설계 · 진행 조건 · 보상 연결',items:[
   {"project": "오늘도 무사히", "title": "한 판의 성과가 다음 목표로 이어지게", "question": "달리기가 끝난 다음 무엇을 하고 싶게 만들까?", "decision": "코인은 다음 판의 소모품, 열쇠는 원하는 보스와 의상, 디스크는 다음 가족의 기억으로 연결했습니다. 의상은 능력치 대신 세트 동작으로 보상하고, 10화 감상은 함께 귀가하는 엔딩으로 이어집니다.", "output": "준비 → 달리기 → 결과 → 보상 → 다음 준비", "target": "runner-design", "image": "assets/today-safely/wardrobe.webp", "alt": "취향에 따라 의상을 고르는 옷장", "source": "runner"},
   {"project":"Let Me Escape from Bloxity · Stage A","title":"익힌 대응을 다음 전투에서 다시 쓰게","question":"첫 스테이지의 전투 난이도를 어떻게 한 단계씩 올릴까?","decision":"일반 몬스터 3종은 피하기·옆으로 돌기·자리 옮기기를 하나씩 요구하게 했습니다. 발전기 방어는 앞 무리를 모두 처치해야 다음으로 이어지고 셔터가 1/3씩 열립니다. 보스전에서는 앞서 익힌 대응에 엄폐와 반격을 더해 종합하도록 설계했습니다.","output":"일반 적 → 방어전 → 보스의 학습 흐름 · 기획서 p.13, 18–24","target":"case-enemies","imageSelector":"#case-enemies img","alt":"첫 스테이지에서 회피와 거리 조절을 익히게 하는 감염 주민","source":"exit4"}]},
  '03':{title:'작은 단위로 구현하고, 직접 플레이하며 확인합니다',body:'AI와 역할을 나누고 한 번에 확인할 경험을 좁혔습니다. 단계마다 플레이한 뒤 다음 구현과 수정 방향을 정했습니다.',chips:'역할 분담 · 단계별 구현 · 직접 플레이테스트',items:[
   {"project": "오늘도 무사히", "title": "완성 기준을 세우고 경험 단위로 구현하기", "question": "혼자 만드는 게임을 끝까지 완성하려면 어떻게 나눠야 할까?", "decision": "시작·플레이·결과·다시하기가 이어지는 빌드를 기준으로 계획했습니다. 한 세션에 하나의 경험을 확인하고, 새 기능이 기존 아이템이나 보스와 역할이 겹치는지 먼저 비교했습니다.", "output": "완성 기준 · 단계별 구현 · 중복 역할 점검", "target": "runner-prototype", "image": "assets/today-safely/bag.webp", "alt": "기존 보스와 다른 반격 방식으로 설계한 책가방 보스", "source": "runner"},
   {"project":"Let Me Escape from Bloxity · Stage A","title":"AI에는 작게 맡기고, 판단은 직접","question":"구현 도움을 받으면서도 기획 의도와 팀의 작업 범위를 어떻게 지킬까?","decision":"기획·수정 방향·채택 여부는 직접 판단하고, Gemini는 구상, Codex는 구현·자체 테스트·공유 문서를 보조하게 했습니다. 사건을 작게 나누고 매 단계 직접 플레이했습니다. 변경 전 백업과 Stage A 한정 수정 원칙을 두고, 복사본을 합칠 때는 팀 양식의 몬스터 표와 변경 기록을 남겼습니다.","output":"작은 작업 단위 · 직접 확인 · 팀 이식 자료 · 기획서 p.35–37","target":"case-ai","imageSelector":"#case-boss .boss-pattern-case-photos img","alt":"직접 플레이하며 공격 예고와 대응을 확인한 철문 보스전","source":"exit4"}]},
  '04':{title:'발견한 문제를 다음 진행과 경험의 개선으로 연결합니다',body:'직접 플레이하며 느낀 불편을 입력·안내·동선의 원인으로 나눴습니다. 규칙과 수치를 조정하고, 방향이 어긋난 변경은 되돌린 뒤 다시 시도했습니다.',chips:'문제 발견 → 수정 방향 → 진행 확인',items:[
   {"project": "오늘도 무사히", "title": "플레이의 불편을 원인과 규칙으로 바꾸기", "question": "쉽다·버벅인다·피할 수 없다는 느낌을 어떻게 수정할까?", "decision": "기다리는 보스는 접근하도록, 순간 입력만 보는 반격은 입력 기억과 동작 중 판정으로 바꿨습니다. 발판 높이와 스프링 대기를 조정하고, 콘텐츠 확장에 맞춰 60초 코스를 끝없는 달리기로 전환했습니다.", "output": "직접 플레이 → 원인 분석 → 규칙 수정", "target": "runner-improve", "image": "assets/today-safely/paper.webp", "alt": "반격 판정과 회피 동선을 다듬은 종이 괴물 보스", "source": "runner"},
   {"project":"Let Me Escape from Bloxity · Stage A","title":"두 번 되돌린 뒤, 핵심 장소를 남겨 맵 축소","question":"빈 이동을 줄이려던 변경이 사건 배치와 길을 무너뜨린다면?","decision":"맵을 한 번에 절반으로 줄이자 장소가 겹치고 길이 끊겼고, 사건을 일괄 이동한 시도도 의도와 달라 각각 복원했습니다. 세 번째에는 사건 위치를 먼저 확인한 뒤 핵심 장소를 남기고 외곽만 줄였습니다. 잘린 경계는 바리케이드로 정리했습니다.","output":"일괄 변경 → 복원 → 확인 순서 분리 · 기획서 p.11","target":"case-map","imageSelector":"#case-map img","alt":"핵심 장소를 유지하며 외곽 이동 구간을 압축한 맵 구성","source":"exit4"},
   {"project":"Let Me Escape from Bloxity · Stage A","title":"보스의 대응은 지키고, 기다림과 압박은 줄이기","question":"단조로운 보스와 지루한 대기를 다른 방식으로 고칠 수 있을까?","decision":"보스는 2단계에서 3단계로 바꾼 뒤 너무 어렵다는 의견을 받아 체력·마지막 단계 속도·피해량·불길 지속 시간을 낮췄습니다. 예고와 공격 종류는 유지했습니다. 통신 방어는 15초에서 10초로 줄이고 적을 모두 잡으면 즉시 끝내, 잘한 만큼 빨리 넘어가게 했습니다.","output":"예고를 유지한 난이도 조정 · 대기 단축 · 기획서 p.29, 32–33","target":"case-review","source":"exit4"}]}
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
