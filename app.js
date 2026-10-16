/* Built for GitHub Pages: no bundler, static hosting, optional Supabase. */
(() => {
  'use strict';
  const APP = document.getElementById('app');
  const TRIP = window.TRIP;
  const SPOTS = window.SPOTS;
  const cloudCfg = window.TRIP_CONFIG || {};
  const cloudEnabled = !!(cloudCfg.supabaseUrl && cloudCfg.supabaseAnonKey && window.supabase);
  const sb = cloudEnabled ? window.supabase.createClient(cloudCfg.supabaseUrl, cloudCfg.supabaseAnonKey) : null;
  const STORE = 'our_city_guide_notes_v2';
  const CHOICES_STORE = 'our_city_guide_choices_v2';
  const COVERS_STORE = 'cornies_cover_overrides_v1';
  const COVER_DB = 'cornies_local_photos_v1';
  const STATE = {
    day: parseDay(), filter:'all', noteForms:{}, noteEdits:{},
    localNotes:readStorage(STORE,[]), cloudNotes:[],
    choice:readStorage(CHOICES_STORE,{night:'tower',afternoon:'picnic'}),
    user:null, loadingCloud:false, isAdmin:false, editingCovers:false, showTools:false,
    localCovers:readStorage(COVERS_STORE,{}), cloudCovers:{}, photoBlobs:{}, coverModalMode:'upload'
  };
  let pastedCoverFile = null;
  let leafletMap = null;
  let toastTimeout;

  function readStorage(key, fallback) { try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; } catch { return fallback; } }
  function saveStorage(key, value){ try { localStorage.setItem(key,JSON.stringify(value)); return true; } catch { toast('이 브라우저의 저장 공간을 사용할 수 없습니다.'); return false; } }
  function escapeHTML(x){return String(x ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  function attr(x){return escapeHTML(x);}
  function safeURL(x) {try {const u=new URL(String(x)); return /^https?:$/.test(u.protocol) ? u.href : null;} catch {return null;} }
  function siteName(url){ try { return new URL(url).hostname.replace(/^www\./,''); } catch {return '외부 사이트'} }
  function socialLink(q){return 'https://www.xiaohongshu.com/search_result?keyword='+encodeURIComponent(q)}
  function amapLink(p){const kw=p.cn || p.title; const city=STATE.day===2?'深圳':'广州'; const c=(p.lat&&p.lng&&p.lng>113.7)?'深圳':city; return 'https://uri.amap.com/search?keyword='+encodeURIComponent(kw)+'&city='+encodeURIComponent(c)+'&view=map&src=tripguide&callnative=0';}
  function toast(t){const el=document.getElementById('toast');el.textContent=t;el.classList.add('visible');clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>el.classList.remove('visible'),3200);}
  function parseDay(){let m=location.hash.match(/day-([1-4])/);return m?Number(m[1]):1;}
  function imgSrc(p){return p?.image||'';}
  function iconFor(cat){ const s=cat||''; if(/사진|포토|골목|건축/.test(s))return '✦'; if(/교통|항공/.test(s))return '↗'; if(/식사|점심|저녁|식당/.test(s))return '◒'; if(/카페|디저트/.test(s))return '☼'; if(/숙소/.test(s))return '⌂'; if(/마트|쇼핑/.test(s))return '◈'; return '✦'; }
  function generateHead(day){ const heroUrl=/^assets\/[a-zA-Z0-9_.-]+$/.test(day.photo) ? day.photo : safeURL(day.photo); return `<section class="hero theme-${day.theme}">
    <div class="hero-copy"><div class="hero-day">THE CORNIES’ GETAWAY &nbsp;✦&nbsp; DAY 0${day.number} &nbsp;·&nbsp; ${escapeHTML(day.date)} &nbsp;·&nbsp; ${escapeHTML(day.city)}</div>
      <h1>${day.number===1?'Guangzhou':day.number===2?'Shenzhen':day.number===3?'Old town':'Homebound'} <em>diary.</em></h1>
      <div class="hero-kor">${escapeHTML(day.title)}</div><p class="hero-desc">${escapeHTML(day.intro)}</p>
      <div class="hero-chips"><span class="hero-chip">${escapeHTML(day.dateFull)}</span><span class="hero-chip">${escapeHTML(day.label)}</span></div>
    </div><div class="hero-media"><img src="${attr(heroUrl||'')}" alt="${attr(day.photoLabel)}" loading="eager" data-fallback="${day.number===1?'assets/canton-illustration.svg':day.number===3?'assets/oldtown-illustration.svg':day.number===2?'assets/spot-museum.svg':'assets/spot-flight.svg'}" onerror="if(this.src.indexOf(this.dataset.fallback)<0){this.src=this.dataset.fallback}else{this.style.display='none'}" /><div class="hero-overlay"><strong>The Cornies’ Getaway</strong><small>${escapeHTML(day.photoLabel)}</small></div></div>
  </section>`; }
  function normalizeItineraryItem(row){
    if(STATE.day===2 && row.id==='picnic'){
      return STATE.choice.afternoon==='picnic'?row:{...row, name:'Taishi SPA · 태국 마사지',desc:'강샤청 18층 · 마사지 80~100분',id:'spa'};
    }
    if(STATE.day===1 && row.id==='tower' && STATE.choice.night==='cruise') return {...row,time:'22:00 예시',name:'주강 야경 유람선',desc:'22시 출항 상품 기준 · 21:30까지 승선장 도착',id:'cruise'};
    if(STATE.day===1 && row.id==='dessertParty' && STATE.choice.night==='cruise') return {...row,time:'00:00~',desc:'늦은 유람선 뒤 호텔 도착 시점에 따라 시작'};
    return row;
  }
  function renderSchedule(day){return `<article class="surface schedule-panel"><div class="surface-head"><div><small>TIMETABLE</small><h3>오늘의 일정표</h3></div><span class="status-pill">${escapeHTML(day.dateFull)}</span></div>
      <div class="table-scroller"><table class="schedule" aria-label="${escapeHTML(day.dateFull)} 일정표"><tbody>${day.itinerary.map(raw=>{const row=normalizeItineraryItem(raw);return `<tr data-place="${attr(row.id||'')}" title="장소 카드로 이동"><td>${escapeHTML(row.time)}</td><td><div class="schedule-title">${escapeHTML(row.name)}</div><div class="schedule-desc">${escapeHTML(row.desc)}</div></td></tr>`;}).join('')}</tbody></table></div></article>`;}
  function renderMapPanel(){return `<article class="surface map-panel"><div class="surface-head"><div><small>ROUTE OVERVIEW</small><h3>오늘의 동선 지도</h3></div><a class="link-btn" target="_blank" rel="noopener noreferrer" href="https://www.amap.com/">고덕지도 ↗</a></div><div class="map-container"><div id="travel-map" class="map-inner" role="img" aria-label="스팟 방문 순서를 번호 핀과 연결선으로 표시한 지도"></div></div><div class="map-bottom-tip">⌖ <strong>스팟 순서별 상대 위치</strong> · 실제 도로 경로가 아닌 개략도 · 핀/장소를 누르면 고덕지도 검색</div><div class="map-stop-index">${mapStops(TRIP.days[STATE.day-1]).map((p,i)=>`<a href="${attr(amapLink(p))}" target="_blank" rel="noopener noreferrer" title="${attr(p.cn)}"><span>${i+1}</span>${escapeHTML(p.title.length>13?p.title.slice(0,13)+'…':p.title)}</a>`).join('')}</div></article>`; }
  function renderRoutes(day){return `<section class="route-box"><div class="section-minihead"><h2>Getting around <span style="font-size:20px;color:#9db29f">↗</span></h2><span>디디 편도 / 차량 1대 기준</span></div><div class="surface table-scroller"><table class="route-table"><thead><tr><th>이동 구간</th><th>예상 시간</th><th>디디 예상 요금</th></tr></thead><tbody>${day.routes.map(r=>`<tr><td>${escapeHTML(r[0])}<small>${escapeHTML(r[3])}</small></td><td>${escapeHTML(r[1])}</td><td>${escapeHTML(r[2])}</td></tr>`).join('')}</tbody></table></div><p class="line-note">* 금액은 실시간 요금 조회가 아닌 여행 예산용 추정치입니다. 차량 종류·교통·할증·통행료에 따라 달라집니다.</p></section>`;}
  function sectionHeader(s, i){return `<div class="day-title-rail"><span class="sec-num">0${i+1}</span><div><h2>${escapeHTML(s.title.replace(/^\d+ · /,''))}</h2><p>${escapeHTML(s.subtitle)}</p></div><span class="r-side">OUR LITTLE GUIDE</span></div>`;}
  function canEditCovers(){ return cloudEnabled ? !!(STATE.user && STATE.isAdmin) : true; }
  function coverFor(spot){
    const custom=cloudEnabled ? STATE.cloudCovers[spot.id] : STATE.localCovers[spot.id];
    const localBlob=STATE.photoBlobs[spot.id];
    const url=cloudEnabled ? custom?.image_url : (custom?.kind==='upload' ? localBlob : custom?.url);
    return {url:safeURL(url)||((url&&String(url).startsWith('blob:'))?url:''), custom:!!(url)};
  }
  function imagesMarkup(spot){
    const fallback='assets/spot-'+spot.id+'.svg';
    const cover=coverFor(spot);
    const src=cover.url||imgSrc(spot)||fallback;
    const credit=cover.custom ? (cloudEnabled?'선택한 대표 사진 · 공동 적용':'선택한 대표 사진 · 내 기기에 저장') : (spot.imageCredit || spot.imgNote || 'ILLUSTRATED CITY GUIDE');
    const source=(!cover.custom && spot.imageSource) ? safeURL(spot.imageSource) : '';
    const sourceMarkup=source ? `<a class="spot-photo-note photo-source" href="${attr(source)}" target="_blank" rel="noopener noreferrer" title="사진 원본 페이지 열기">${escapeHTML(credit)} ↗</a>` : `<span class="spot-photo-note">${escapeHTML(credit)}</span>`;
    const editor=STATE.editingCovers && canEditCovers() ? `<button type="button" class="cover-pencil" data-action="open-cover" data-spot="${attr(spot.id)}" aria-label="${attr(spot.title)} 대표 사진 변경" title="대표 사진 변경">✎ <span>사진 변경</span></button>` : '';
    return `<div class="spot-img"><img src="${attr(src)}" alt="${attr(spot.title)} 대표 이미지" loading="lazy" data-fallback="${attr(fallback)}" onerror="if(this.src.indexOf(this.dataset.fallback)<0){this.src=this.dataset.fallback;const caption=this.parentElement.querySelector('.spot-photo-note');if(caption){caption.textContent='사진 불러오기 실패 · 일러스트 표시'}}else{this.style.display='none'}"/><div class="spot-photo-placeholder" aria-hidden="true"><strong>${escapeHTML(spot.title)}</strong><small>${escapeHTML(spot.cn)}</small></div>${sourceMarkup}${editor}</div>`;
  }
  function renderNoteCard(n){const url=safeURL(n.url);const image=safeURL(n.image);const title=(n.title||siteName(url||'')); const creator=n.source==='cloud'?'공동 메모':'이 기기 메모';
    const canManage=n.source!=='cloud'||(STATE.user && STATE.user.id===n.created_by);
    return `<div class="note-card"><div class="note-card-head"><span>${escapeHTML(creator)} · ${escapeHTML(n.date||'')}</span>${canManage?`<span class="note-inline-actions"><button class="text-action" data-action="edit-note" data-note-id="${attr(n.id)}" data-spot="${attr(n.spot_id)}">수정</button><button class="text-action" data-action="delete-note" data-note-id="${attr(n.id)}" data-spot="${attr(n.spot_id)}">삭제</button></span>`:''}</div>
    ${n.memo?`<p class="note-body-text">${escapeHTML(n.memo)}</p>`:''}
    ${url?`<a class="note-preview" href="${attr(url)}" target="_blank" rel="noopener noreferrer">${image?`<img class="note-preview-img" src="${attr(image)}" loading="lazy" onerror="this.style.display='none'" alt="SNS 미리보기"/>`:`<div class="note-preview-img" style="display:grid;place-items:center;font:italic 28px var(--serif);color:#5b896f">↗</div>`}<span class="note-preview-body"><strong>${escapeHTML(title)}</strong><small>${escapeHTML(siteName(url))} · 열기 ↗</small></span></a>`:''}</div>`;}
  function notesFor(id){ const cloud=STATE.cloudNotes.filter(n=>n.spot_id===id).map(n=>({...n,source:'cloud'}));const local=STATE.localNotes.filter(n=>n.spot_id===id).map(n=>({...n,source:'local'}));return [...cloud,...local].sort((a,b)=>(b.created_at||'').localeCompare(a.created_at||'')); }
  function renderNotes(spot){const ns=notesFor(spot.id);const open=STATE.noteForms[spot.id];const editId=STATE.noteEdits[spot.id]||'';const edit=ns.find(n=>n.id===editId);
    return `<div class="spot-notes"><div class="note-head"><h4>Notes & inspiration</h4><button class="note-open-btn" data-action="toggle-note" data-spot="${attr(spot.id)}">${open?'닫기 −':(['lunch','lunch2','cafe','dinner'].includes(spot.id)?'+ 후보 링크 제안':'+ SNS 링크 / 메모')}</button></div><small style="font-size:10px;color:#9aac9d">친구들의 릴스·샤오홍슈 링크와 한 줄 팁을 저장</small><div class="notes-list">${ns.map(renderNoteCard).join('')}</div>
      ${!ns.length?`<div class="empty-notes">${['lunch','lunch2','cafe','dinner'].includes(spot.id)?'식당과 메뉴는 아직 미정! 각자 원하는 맛집 링크와 한 줄 이유를 남겨주세요.':'아직 메모가 없어요. 첫 번째 참고 링크를 남겨보세요.'}</div>`:''}
      ${open?`<form class="note-form" data-action="save-note" data-spot="${attr(spot.id)}"><label for="url-${spot.id}">SNS / 참고 URL (선택)</label><input type="url" id="url-${spot.id}" name="url" placeholder="https://www.instagram.com/reel/..." value="${attr(edit?.url||'')}" /><label for="memo-${spot.id}">메모 (선택)</label><textarea id="memo-${spot.id}" name="memo" placeholder="여기서 사진 꼭 찍기! 입구 왼편이 예쁘대요.">${escapeHTML(edit?.memo||'')}</textarea><div class="form-actions"><button class="mini-btn dark" type="submit">${edit?'변경 저장':'메모 저장'} ↗</button><button class="mini-btn" type="button" data-action="cancel-note" data-spot="${attr(spot.id)}">취소</button></div><small style="font-size:10px;color:#93a494">링크 대표 이미지는 공개된 페이지에 한해 자동 추출합니다. 인스타·샤오홍슈는 미리보기가 차단될 수 있습니다.</small></form>`:''}
    </div>`;}
  function tripStepTime(spot){const day=TRIP.days[STATE.day-1];const r=day.itinerary.find(x=>x.id===spot.id);return r?r.time:'';}
  function spotCard(spot,index){
    const tips=(spot.tips||[]).map(t=>`<li>${escapeHTML(t)}</li>`).join('');
    const photo=(spot.photoTips||[]).map(t=>`<li>${escapeHTML(t)}</li>`).join('');
    const links=(spot.links||[]).filter(l=>safeURL(l.url));
    const undecided=['lunch2','lunch','cafe','dinner'].includes(spot.id);
    const time=tripStepTime(spot);
    return `<article class="spot-card journey-stop ${undecided?'tbd-card':''}" id="spot-${attr(spot.id)}" data-category="${attr(spot.category)}">
      <div class="journey-marker"><span>${String(index+1).padStart(2,'0')}</span></div>
      <div class="spot-card-main">${imagesMarkup(spot)}<div class="spot-body"><div class="spot-upper"><span class="category">${escapeHTML(spot.category).toUpperCase()}</span>${time?`<span class="stop-time">${escapeHTML(time)}</span>`:''}</div>
      <h3>${escapeHTML(spot.title)}</h3><div class="spot-cn">${escapeHTML(spot.cn)}</div><p class="spot-desc">${escapeHTML(spot.desc)}</p>
      <div class="spot-meta">${undecided?`<span class="tag pending">✦ 친구들과 결정하기</span>`:''}${spot.price?`<span class="tag">${escapeHTML(spot.price)}</span>`:''}${spot.duration?`<span class="tag">◷ ${escapeHTML(spot.duration)}</span>`:''}${spot.badge&&!undecided?`<span class="tag warn">! ${escapeHTML(spot.badge)}</span>`:''}</div>
      ${spot.address?`<div class="notice-inline"><b>주소</b> ${escapeHTML(spot.address)}${spot.id==='hotel'?`<div style="margin-top:5px;font-size:11px">☎ ${escapeHTML(TRIP.hotel.phone)} · ${escapeHTML(TRIP.hotel.note)}</div>`:''}</div>`:''}
      ${tips?`<div class="spot-info"><div class="info-title">BEFORE YOU GO · 참고사항</div><ul class="tips-list">${tips}</ul></div>`:''}
      ${photo?`<div class="photo-tips"><div class="info-title">✦ PHOTO SPOTS · 사진 구도</div><ul class="tips-list">${photo}</ul></div>`:''}
      <div class="spot-linkrow"><a class="link-btn primary" href="${attr(amapLink(spot))}" target="_blank" rel="noopener noreferrer">⌖ 고덕지도</a>${undecided?'':`<a class="link-btn" href="${attr(socialLink(spot.cn+' 拍照 打卡'))}" target="_blank" rel="noopener noreferrer">✦ 샤오홍슈 사진</a>`}${spot.id==='hotel'?`<button type="button" class="link-btn" data-action="copy-address">주소 복사</button>`:''}</div>
      ${links.length?`<div class="reference-links">${links.map(l=>`<a href="${attr(l.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(l.label)} ↗</a>`).join('')}</div>`:''}
      </div></div>${renderNotes(spot)}</article>`;
  }
  function getGroups(spot){ const cat=spot.category;if(/식사|식당|점심|저녁|카페|디저트/.test(cat))return 'food';if(/교통|항공|숙소/.test(cat))return 'transport';if(/사진|포토|골목|건축|야경/.test(cat))return 'photo';if(/쇼핑|마트|전자|팝업/.test(cat))return 'shopping';return 'other'; }
  function renderChoiceCards(slot){
    if(slot==='night'){return `<div class="inline-choice"><div class="choice-heading"><span>CHOOSE YOUR NIGHT</span><strong>광저우 야경은 둘 중 하나 ✦</strong></div><div class="choice-panel">
      <button class="choice-card ${STATE.choice.night==='tower'?'selected':''}" data-action="choose-night" data-value="tower"><img src="assets/spot-tower.svg" alt="광저우타워 버블트램 일러스트"/><strong>① 버블트램</strong><small>460m 전망 체험 · 약 ¥315~323</small><span class="choice-ribbon">${STATE.choice.night==='tower'?'✓ 선택 중':'선택하기'}</span></button>
      <button class="choice-card ${STATE.choice.night==='cruise'?'selected':''}" data-action="choose-night" data-value="cruise"><img src="assets/spot-cruise.svg" alt="주강 유람선 일러스트"/><strong>② 주강 유람선</strong><small>22시 출항 후보 · 약 ¥98~188</small><span class="choice-ribbon">${STATE.choice.night==='cruise'?'✓ 선택 중':'선택하기'}</span></button>
    </div><p class="choice-status">선택하면 위 일정표와 이 아래 상세 카드가 함께 바뀝니다. 티켓 예약은 별도입니다.</p></div>`;}
    if(slot==='afternoon'){return `<div class="inline-choice"><div class="choice-heading"><span>THE LAST STOP</span><strong>마지막 오후, 피크닉 vs 마사지 ♡</strong></div><div class="choice-panel">
      <button class="choice-card ${STATE.choice.afternoon==='picnic'?'selected':''}" data-action="choose-afternoon" data-value="picnic"><img src="assets/qianhai-reference.webp" alt="잔디와 대관람차가 보이는 첸하이 피크닉"/><strong>① 첸하이 피크닉</strong><small>잔디·야자수·관람차 · 무료 · 이동 멂</small><span class="choice-ribbon">${STATE.choice.afternoon==='picnic'?'✓ 선택 중':'선택하기'}</span></button>
      <button class="choice-card ${STATE.choice.afternoon==='spa'?'selected':''}" data-action="choose-afternoon" data-value="spa"><img src="assets/spot-spa.svg" alt="태국 마사지 일러스트"/><strong>② Taishi SPA</strong><small>80~100분 · 편안한 휴식</small><span class="choice-ribbon">${STATE.choice.afternoon==='spa'?'✓ 선택 중':'선택하기'}</span></button>
    </div><p class="choice-status">두 일정은 대체 선택지입니다. 광저우행 열차 예매 전 결정해 주세요.</p></div>`;}
    return '';
  }
  function renderFilter(){return `<div class="filter-bar" aria-label="장소 필터">${[['all','전체'],['photo','사진 스팟'],['food','맛집·카페'],['shopping','쇼핑'],['transport','교통·숙소']].map(([key,label])=>`<button class="filter-chip ${STATE.filter===key?'selected':''}" data-action="filter" data-value="${key}">${label}</button>`).join('')}<span class="filter-description">필터는 스팟 카드에만 적용됩니다.</span></div>`;}
  function renderDaySections(day){
    let total=0;
    return `<div id="spots-section">${renderFilter()}<div class="journey-timeline">${day.sections.map((sec,i)=>{
      const ids=sec.items.filter(id=>SPOTS[id]).filter(id=>{if(STATE.day===1&&id==='cruise')return STATE.choice.night==='cruise';if(STATE.day===1&&id==='tower')return STATE.choice.night==='tower';if(STATE.day===2&&id==='spa')return STATE.choice.afternoon==='spa';if(STATE.day===2&&id==='picnic')return STATE.choice.afternoon==='picnic';return true;});
      const cards=ids.filter(id=>STATE.filter==='all'||getGroups(SPOTS[id])===STATE.filter).map(id=>spotCard(SPOTS[id],total++)).join('');
      let selector='';if(STATE.filter==='all'&&STATE.day===1&&sec.items.includes('tower'))selector=renderChoiceCards('night');
      if(STATE.filter==='all'&&STATE.day===2&&sec.items.includes('picnic'))selector=renderChoiceCards('afternoon');
      if(!cards&&!selector)return '';
      return `<section class="spot-group timeline-section">${sectionHeader(sec,i)}<div class="spots-grid journey-list">${selector}${cards}</div></section>`;
    }).join('')}</div></div>`;
  }
  function renderSite(){const day=TRIP.days[STATE.day-1];document.title=`DAY ${STATE.day} · ${day.title} | The Cornies’ Getaway`;
    APP.innerHTML=`<div class="layout"><aside class="rail"><div><div class="rail-logo">the cornies’<br>getaway <span style="font-size:19px">✦</span></div><div class="rail-label">Guangzhou · Shenzhen</div></div>
      <nav class="rail-menu" aria-label="날짜별 일정"><div class="rail-title">THE ITINERARY</div>${TRIP.days.map(d=>`<button class="nav-day ${d.number===STATE.day?'active':''}" data-action="day" data-value="${d.number}"><span class="nav-number">0${d.number}</span><span><small>${escapeHTML(d.date)}</small><strong>${escapeHTML(d.number===1?'도착 & 야경':d.number===2?'선전 당일치기':d.number===3?'구시가지 산책':'귀국')}</strong></span></button>`).join('')}</nav>
      <div class="rail-bottom"><div class="rail-stamp">the cornies’ getaway ♡</div><div class="rail-status"><strong>✦ ABOUT THIS GUIDE</strong>일정·요금·교통은 여행 전 계획안입니다. 예약 정보와 현지 영업 여부는 고덕지도에서 마지막으로 확인해주세요.</div><div class="rail-small">2026 · OCTOBER EDITION</div></div></aside>
      <main class="main"><header class="topbar"><div class="topbar-left"><span class="topbar-dot"></span><span class="topbar-meta">THE CORNIES’ GETAWAY &nbsp;/&nbsp; 2026 OCT</span></div><div class="top-actions"><span class="status-pill">${cloudEnabled?(STATE.user?'공동 메모 연결':'공동 메모 로그인 필요'):'기기별 메모 저장'}</span><button class="mini-btn keep" data-action="share">↗ 공유</button><div class="top-tools"><button type="button" class="mini-btn tools-trigger" data-action="toggle-tools" aria-expanded="${STATE.showTools}" aria-label="추가 기능 열기">···</button><div class="tools-popover" ${STATE.showTools?'':'hidden'}>${canEditCovers()?`<button data-action="toggle-cover-edit">✎ 대표 사진 편집</button>`:''}<button data-action="export">⇩ 메모 백업</button><button data-action="print">⎙ 인쇄</button></div></div>${STATE.editingCovers&&canEditCovers()?`<button class="mini-btn cover-mode-toggle active" data-action="toggle-cover-edit">✓ 편집 완료</button>`:''}${cloudEnabled?`<button class="mini-btn dark" data-action="auth">${STATE.user?'계정':'로그인'}</button>`:''}</div></header>
        <div class="content">${generateHead(day)}<div class="info-strip"><b>PLEASE NOTE ↗</b><span>${escapeHTML(day.notice)}</span></div>
        <div class="section-minihead"><h2>Today's itinerary</h2><span>첫 화면 · 일정표 + 위치 지도</span></div><div class="overview-grid">${renderSchedule(day)}${renderMapPanel()}</div>${renderRoutes(day)}<div class="section-minihead" style="margin-top:44px"><h2>Our little route, step by step</h2><span>방문 순서대로 · 이미지 · 팁 · SNS 메모</span></div>
        ${renderDaySections(day)}<div class="footer-panel"><div><h3>a little cornventure. ♡</h3><p>지도는 위치 참고용이며 직선이 실제 운전경로를 나타내지 않습니다. SNS 카드에는 공개 페이지의 대표 이미지만 표시됩니다. 메모는 기본적으로 각 기기에만 저장되며, Supabase 연동 시 허용된 친구 계정끼리 공동 메모를 공유합니다.</p></div><div class="footer-links"><a href="https://www.amap.com/" target="_blank" rel="noopener noreferrer">高德地图 ↗</a><a href="https://www.12306.cn/index/" target="_blank" rel="noopener noreferrer">12306 ↗</a><a href="https://www.xiaohongshu.com/" target="_blank" rel="noopener noreferrer">小红书 ↗</a></div></div>
        <div class="site-footer">THE CORNIES’ GETAWAY · GUANGZHOU × SHENZHEN · 17–20 OCT 2026</div></div></main>
      <nav class="mobile-nav" aria-label="날짜 이동">${TRIP.days.map(d=>`<button class="${d.number===STATE.day?'active':''}" data-action="day" data-value="${d.number}"><span>DAY 0${d.number}</span><small>${d.number===1?'광저우':d.number===2?'선전':d.number===3?'구시가지':'귀국'}</small></button>`).join('')}</nav></div>`;
    makeMap(day);
  }
  function mapStops(day){
    // Show the return-to-hotel detour on Day 1 explicitly. The airport is
    // omitted here so Guangzhou city-center stops remain legible.
    if(STATE.day===1) return ['hotel','dong','clams','miniso','dessertRun','hotelDrop',STATE.choice.night==='cruise'?'cruise':'tower'].map(id=>SPOTS[id]).filter(Boolean);
    let visited=new Set();return day.itinerary.map(normalizeItineraryItem).filter(row=>{
      if(STATE.day===2 && ['rail','delivery'].includes(row.id))return false;
      if(STATE.day===4 && ['packing','flight'].includes(row.id))return false;
      return row.id&&SPOTS[row.id]&&!visited.has(row.id)&&(visited.add(row.id),true);
    }).map(row=>SPOTS[row.id]).filter(s=>s.lat&&s.lng);
  }
  function svgRouteFallback(points){
    const unique=points.slice(0,12);
    if(!unique.length)return `<div class="map-fallback" style="position:relative;min-height:360px"><div><strong>our route</strong><span>고덕지도에서 실제 길찾기를 확인하세요.</span></div></div>`;
    const lngs=unique.map(p=>p.lng),lats=unique.map(p=>p.lat);
    let minX=Math.min(...lngs),maxX=Math.max(...lngs),minY=Math.min(...lats),maxY=Math.max(...lats);
    const spanX=Math.max(.04,maxX-minX),spanY=Math.max(.035,maxY-minY);
    const pts=unique.map((p,i)=>({p,i,x:62+((p.lng-minX)/spanX)*505,y:380-((p.lat-minY)/spanY)*305}));
    // Nudge tightly clustered markers so they remain readable at small widths.
    pts.forEach((c,i)=>{const near=pts.slice(0,i).filter(d=>Math.hypot(d.x-c.x,d.y-c.y)<52);if(near.length){c.x+=(near.length%2?25:-20);c.y+=(near.length%2?-23:18);}});
    const path=pts.map((pt,i)=>(i?'L':'M')+pt.x.toFixed(1)+','+pt.y.toFixed(1)).join(' ');
    return `<div class="map-graphic"><svg viewBox="0 0 640 440" role="img" aria-label="대략적인 상대 위치와 방문 순서를 보여주는 동선 개략도" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="route-paper" x2="1" y2="1"><stop stop-color="#e6efe2"/><stop offset="1" stop-color="#efe8d6"/></linearGradient><pattern id="route-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="1.1" fill="#a0bca6" opacity=".55"/></pattern></defs>
      <rect width="640" height="440" fill="url(#route-paper)"/><rect width="640" height="440" fill="url(#route-dots)"/>
      <path d="M-40 270Q180 190 240 285T690 165" stroke="#d2e2da" fill="none" stroke-width="44" opacity=".8"/><path d="M-40 270Q180 190 240 285T690 165" stroke="#edf7f0" fill="none" stroke-width="2" opacity=".9"/>
      <text x="29" y="38" font-family="Georgia,serif" font-size="29" font-style="italic" fill="#4b7864">our little route.</text><text x="30" y="56" font-family="sans-serif" font-size="9" letter-spacing="2" fill="#8a9c86">SCHEMATIC · NOT A ROAD MAP</text>
      <path d="${path}" fill="none" stroke="#3c705a" stroke-dasharray="6 10" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" opacity=".83"/>
      ${pts.map(c=>`<a href="${attr(amapLink(c.p))}" target="_blank"><circle cx="${c.x}" cy="${c.y}" r="16" fill="#265c42" stroke="#ffffff" stroke-width="3"/><text x="${c.x}" y="${c.y+4}" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="12" fill="#ffffff">${c.i+1}</text><text x="${c.x}" y="${c.y-22}" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle" fill="#325b46" paint-order="stroke" stroke="#eff4e6" stroke-width="5">${escapeHTML(({miniso:'MINISO LAND',dessertRun:'B&C 빵집',hotel:'호텔',hotelDrop:'호텔(짐)',dong:'동산커우',clams:'바지락',tower:'광저우타워',cruise:'주강 유람선'})[c.p.id]||c.p.title.slice(0,9))}</text></a>`).join('')}
      </svg></div>`;
  }
  function makeMap(day){
    const mapHost=document.getElementById('travel-map');if(!mapHost)return;
    mapHost.innerHTML=svgRouteFallback(mapStops(day));
  }
  function rerenderNotes(spotId){const card=document.getElementById('spot-'+spotId);if(!card)return;const prev=card.querySelector('.spot-notes');if(prev)prev.outerHTML=renderNotes(SPOTS[spotId]);}
  async function readPreview(url){let fallback={title:siteName(url),image:''};if(!url)return fallback;
    const abort=new AbortController();const t=setTimeout(()=>abort.abort(),6500);
    try{const resp=await fetch('https://api.microlink.io?url='+encodeURIComponent(url),{signal:abort.signal});if(!resp.ok)throw Error('preview unavailable');const j=await resp.json();const title=String(j?.data?.title||fallback.title).slice(0,220);const image=safeURL(j?.data?.image?.url)||'';return {title,image};}catch{return fallback;}finally{clearTimeout(t);}
  }
  function readDate(){return new Date().toLocaleDateString('ko-KR',{month:'2-digit',day:'2-digit'});}
  function newId(){return typeof crypto!=='undefined' && crypto.randomUUID ? crypto.randomUUID() : 'n'+Date.now().toString(36)+Math.random().toString(36).slice(2,9);}
  async function saveNote(spotId,url,memo){if(!url&&!memo){toast('SNS 링크나 메모를 하나 이상 입력해주세요.');return;}
    if(url&&!safeURL(url)){toast('http:// 또는 https:// 링크를 입력해주세요.');return;}
    const id=STATE.noteEdits[spotId];const editing=notesFor(spotId).find(x=>x.id===id);let meta=url ? await readPreview(url) : {title:'',image:''};
    const obj={id: id || newId(),spot_id:spotId,url,memo,title:meta.title,image:meta.image,date:readDate(),created_at:new Date().toISOString()};
    const cloudEdit=editing?.source==='cloud';
    if(sb && STATE.user){
      const body={id:obj.id,spot_id:spotId,url:obj.url,memo:obj.memo,title:obj.title,image:obj.image,created_by:STATE.user.id};
      const {data,error}=await sb.from('trip_notes').upsert(body,{onConflict:'id'}).select().single();
      if(error){toast('공동 메모 저장 실패: '+error.message);return;}
      STATE.cloudNotes=STATE.cloudNotes.filter(n=>n.id!==obj.id).concat([{...data,date:obj.date}]);
      if(editing?.source==='local'){STATE.localNotes=STATE.localNotes.filter(n=>n.id!==obj.id);saveStorage(STORE,STATE.localNotes);}
    } else {
      STATE.localNotes=STATE.localNotes.filter(n=>n.id!==obj.id).concat([obj]);saveStorage(STORE,STATE.localNotes);
    }
    STATE.noteForms[spotId]=false;delete STATE.noteEdits[spotId];rerenderNotes(spotId);toast(cloudEnabled&&STATE.user?'친구들과 공유할 메모를 저장했어요.':'이 기기에 메모를 저장했어요.');
  }
  async function deleteNote(spotId,id){const note=notesFor(spotId).find(n=>n.id===id);if(!note)return;
    if(!confirm('이 메모를 삭제할까요?'))return;
    if(note.source==='cloud' && sb){const {error}=await sb.from('trip_notes').delete().eq('id',id);if(error){toast('삭제 권한 또는 연결을 확인해주세요.');return;}STATE.cloudNotes=STATE.cloudNotes.filter(n=>n.id!==id);}
    else{STATE.localNotes=STATE.localNotes.filter(n=>n.id!==id);saveStorage(STORE,STATE.localNotes);}
    rerenderNotes(spotId);toast('메모를 삭제했습니다.');
  }
  function navigate(day){STATE.showTools=false;STATE.day=day;STATE.filter='all';STATE.noteForms={};STATE.noteEdits={};history.replaceState(null,'','#day-'+day);renderSite();scrollTo({top:0,behavior:'smooth'});}
  async function share(){const url=location.href;if(navigator.share){try{await navigator.share({title:'The Cornies’ Getaway · 광저우·선전 여행',url});return;}catch(e){if(e.name==='AbortError')return;}}
    try{await navigator.clipboard.writeText(url);toast('현재 날짜 페이지 링크를 복사했어요.');}catch{prompt('아래 URL을 복사해 친구들에게 보내세요:',url);}
  }
  function exportNotes(){const out={version:2,trip:'guangzhou-shenzhen-2026',exported_at:new Date().toISOString(),notes:STATE.localNotes};const blob=new Blob([JSON.stringify(out,null,2)],{type:'application/json'});const href=URL.createObjectURL(blob);const a=document.createElement('a');a.href=href;a.download='trip-notes-backup.json';a.click();setTimeout(()=>URL.revokeObjectURL(href),500);toast('로컬 메모 JSON을 저장했어요.');}
  function openCoverModal(spotId){
    if(!canEditCovers() || !SPOTS[spotId])return;
    closeModal(); pastedCoverFile=null; STATE.coverModalMode='upload'; const spot=SPOTS[spotId];
    const current=coverFor(spot);
    const fallback='assets/spot-'+spot.id+'.svg';
    const preview=current.url||spot.image||fallback;
    const backdrop=document.createElement('div');backdrop.className='modal-overlay';backdrop.id='modal-overlay';
    backdrop.innerHTML=`<div class="modal cover-modal" role="dialog" aria-modal="true" aria-labelledby="cover-dialog-title">
      <button class="modal-close" aria-label="닫기" data-action="close-modal">×</button>
      <div class="eyebrow">PHOTO EDITOR · THE CORNIES</div>
      <h2 id="cover-dialog-title">cover story. ✦</h2>
      <p class="cover-modal-help"><b>${escapeHTML(spot.title)}</b> · 대표 사진을 변경합니다. 노트의 SNS 링크는 그대로 남아요.</p>
      <div class="cover-modal-preview"><img id="cover-preview-img" src="${attr(preview)}" data-fallback="${attr(fallback)}" onerror="this.src=this.dataset.fallback" alt="대표 사진 미리보기" /></div>
      <div class="cover-mode-tabs" role="group" aria-label="사진 변경 방식">
        <button type="button" class="cover-tab active" data-action="cover-tab" data-value="upload">내 사진 업로드</button>
        <button type="button" class="cover-tab" data-action="cover-tab" data-value="url">이미지 주소 붙여넣기</button>
      </div>
      <form id="cover-form" data-action="save-cover" data-spot="${attr(spotId)}">
        <div class="cover-upload-pane"><label class="cover-dropzone" for="cover-upload">＋ 사진 선택 <small>또는 복사한 이미지를 ⌘V / Ctrl+V로 붙여넣기 · 10MB 이하</small></label><input id="cover-upload" type="file" name="photo" accept="image/jpeg,image/png,image/webp" class="cover-file-input" /><div id="cover-file-label" class="cover-file-label">선택된 사진이 없습니다</div></div>
        <div class="cover-url-pane" hidden><label for="cover-url" class="cover-url-label">이미지 직접 주소</label><input id="cover-url" type="url" name="url" placeholder="https://example.com/photo.jpg" /><small>인스타 게시물 주소가 아닌 JPG/PNG/WebP 등의 이미지 주소를 넣어주세요.</small></div>
        <div id="cover-editor-status" class="cover-editor-status" aria-live="polite"></div>
        <button type="submit" class="cover-save" id="cover-save-btn">대표 사진 저장 ↗</button>
      </form>
      <div class="cover-modal-footer"><button class="cover-reset" data-action="restore-cover" data-spot="${attr(spotId)}" ${current.custom?'':'disabled'}>↶ 기본 이미지로 복원</button><span>${cloudEnabled?'관리자 변경 · 모든 방문자에게 반영':'내 브라우저에서만 변경 · 친구와 공유되지 않음'}</span></div>
    </div>`;
    APP.appendChild(backdrop);
    backdrop.querySelector('.cover-tab')?.focus();
  }
  function coverMode(mode){
    STATE.coverModalMode=mode;
    const dialog=document.querySelector('.cover-modal');if(!dialog)return;
    dialog.querySelectorAll('.cover-tab').forEach(b=>b.classList.toggle('active',b.dataset.value===mode));
    dialog.querySelector('.cover-upload-pane').hidden=mode!=='upload';
    dialog.querySelector('.cover-url-pane').hidden=mode!=='url';
    const id=dialog.querySelector('#cover-form').dataset.spot;
    if(mode==='upload' && !dialog.querySelector('#cover-upload').files.length)dialog.querySelector('#cover-preview-img').src=coverFor(SPOTS[id]).url||SPOTS[id].image||('assets/spot-'+id+'.svg');
    if(mode==='url' && dialog.querySelector('#cover-url').value)dialog.querySelector('#cover-preview-img').src=dialog.querySelector('#cover-url').value;
  }
  function setCoverStatus(text){const e=document.getElementById('cover-editor-status');if(e)e.textContent=text;}
  async function openCoverDB(){return new Promise((resolve,reject)=>{
    if(!window.indexedDB){reject(new Error('이 브라우저에서는 사진 저장을 지원하지 않습니다.'));return;}
    const req=indexedDB.open(COVER_DB,1);
    req.onupgradeneeded=()=>{if(!req.result.objectStoreNames.contains('photos'))req.result.createObjectStore('photos');};
    req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);
  });}
  async function localBlobOp(method,spotId,blob){const db=await openCoverDB();try{return await new Promise((resolve,reject)=>{
    const tx=db.transaction('photos',method==='get'?'readonly':'readwrite');const store=tx.objectStore('photos');
    const req=method==='get'?store.get(spotId):method==='put'?store.put(blob,spotId):store.delete(spotId);
    req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);
  });}finally{db.close();}}
  async function loadLocalCovers(){for(const [id,cover] of Object.entries(STATE.localCovers)){
    if(cover?.kind!=='upload')continue;
    try{const blob=await localBlobOp('get',id);if(blob instanceof Blob)STATE.photoBlobs[id]=URL.createObjectURL(blob);}catch(e){console.warn('개인 사진 읽기 실패:',e);}
  }if(!cloudEnabled)renderSite();}
  function setLocalBlob(spotId,blob){if(STATE.photoBlobs[spotId])URL.revokeObjectURL(STATE.photoBlobs[spotId]);
    if(blob)STATE.photoBlobs[spotId]=URL.createObjectURL(blob);else delete STATE.photoBlobs[spotId];
  }
  async function normalizePhoto(file){
    if(!['image/jpeg','image/png','image/webp'].includes(file?.type))throw Error('JPG, PNG, WebP 파일만 선택해주세요.');
    if(file.size>10*1024*1024)throw Error('10MB 이하의 이미지만 업로드할 수 있습니다.');
    const src=URL.createObjectURL(file);
    try{const img=await new Promise((resolve,reject)=>{const i=new Image();i.onload=()=>resolve(i);i.onerror=()=>reject(Error('이미지를 열 수 없습니다.'));i.src=src;});
      const limit=1600,ratio=Math.min(1,limit/Math.max(img.naturalWidth,img.naturalHeight));
      const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(img.naturalWidth*ratio));canvas.height=Math.max(1,Math.round(img.naturalHeight*ratio));
      canvas.getContext('2d').drawImage(img,0,0,canvas.width,canvas.height);
      const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/webp',0.82));
      if(!(blob instanceof Blob))throw Error('사진을 변환하지 못했습니다.');return blob;
    }finally{URL.revokeObjectURL(src);}
  }
  async function uploadSharedPhoto(id,blob){const path=id+'/'+Date.now()+'-'+newId().replace(/[^a-z0-9-]/gi,'')+'.webp';
    const {error:uploadError}=await sb.storage.from('trip-covers').upload(path,blob,{cacheControl:'3600',contentType:'image/webp',upsert:false});
    if(uploadError)throw Error('사진 업로드 실패: '+uploadError.message);
    const {data:publicFile}=sb.storage.from('trip-covers').getPublicUrl(path);
    const url=publicFile?.publicUrl;
    if(!safeURL(url))throw Error('사진 주소를 생성하지 못했습니다.');
    try{await saveSharedCover(id,url,'upload');}catch(e){await sb.storage.from('trip-covers').remove([path]).catch(()=>{});throw e;}
  }
  async function saveSharedCover(id,url,kind){
    if(!STATE.isAdmin||!STATE.user)throw Error('관리자 계정으로 로그인해야 합니다.');
    const row={spot_id:id,image_url:url,source_type:kind,updated_by:STATE.user.id,updated_at:new Date().toISOString()};
    const {error}=await sb.from('trip_covers').upsert(row,{onConflict:'spot_id'});
    if(error)throw Error('공동 대표 사진 저장 실패: '+error.message);
    STATE.cloudCovers[id]=row;
  }
  async function saveCoverFromForm(form){
    const id=form.dataset.spot;if(!canEditCovers()||!SPOTS[id])return;
    const file=pastedCoverFile || form.querySelector('#cover-upload')?.files?.[0];
    const rawUrl=(form.querySelector('#cover-url')?.value||'').trim();
    const mode=STATE.coverModalMode;
    const btn=form.querySelector('button[type=submit]');btn.disabled=true;btn.textContent='사진 저장 중…';
    setCoverStatus('');
    try{
      if(mode==='upload'){
        if(!file)throw Error('업로드할 사진을 선택해주세요.');
        const blob=await normalizePhoto(file);
        if(cloudEnabled){await uploadSharedPhoto(id,blob);}
        else {await localBlobOp('put',id,blob);setLocalBlob(id,blob);STATE.localCovers[id]={kind:'upload'};saveStorage(COVERS_STORE,STATE.localCovers);}
      }else{
        const url=safeURL(rawUrl);if(!url)throw Error('http:// 또는 https://로 시작하는 이미지 주소를 입력해주세요.');
        if(cloudEnabled){await saveSharedCover(id,url,'url');}
        else {STATE.localCovers[id]={kind:'url',url};saveStorage(COVERS_STORE,STATE.localCovers);}
      }
      closeModal();renderSite();toast(cloudEnabled?'대표 사진을 변경했습니다. 방문자에게도 표시됩니다.':'이 기기의 대표 사진을 변경했습니다.');
    }catch(e){setCoverStatus(e.message||'사진 저장에 실패했습니다.');}
    finally{if(document.contains(btn)){btn.disabled=false;btn.textContent='대표 사진 저장 ↗';}}
  }
  async function restoreCover(id){if(!canEditCovers()||!SPOTS[id])return;
    if(!confirm('이 장소의 대표 사진을 기본 이미지로 복원할까요?'))return;
    try{if(cloudEnabled){const {error}=await sb.from('trip_covers').delete().eq('spot_id',id);if(error)throw Error(error.message);delete STATE.cloudCovers[id];}
    else {try{await localBlobOp('delete',id);}catch{}setLocalBlob(id,null);delete STATE.localCovers[id];saveStorage(COVERS_STORE,STATE.localCovers);}
    closeModal();renderSite();toast('기본 대표 사진으로 복원했습니다.');}catch(e){setCoverStatus('복원 실패: '+e.message);}
  }
  async function loadCloudCovers(){if(!sb)return;const {data,error}=await sb.from('trip_covers').select('spot_id,image_url,source_type');
    if(error){console.warn('공유 사진 불러오기:',error.message);return;}
    STATE.cloudCovers=Object.fromEntries((data||[]).map(row=>[row.spot_id,row]));renderSite();
  }
  async function checkCoverAdmin(){if(!sb||!STATE.user){STATE.isAdmin=false;STATE.editingCovers=false;return;}
    const {data,error}=await sb.from('trip_photo_admins').select('email').limit(1);
    STATE.isAdmin=!error&&Array.isArray(data)&&data.length>0;
    if(!STATE.isAdmin)STATE.editingCovers=false;
    renderSite();
  }
  function authUI(){const backdrop=document.createElement('div');backdrop.className='modal-overlay';backdrop.id='modal-overlay';const loggedIn=!!STATE.user;
    backdrop.innerHTML=`<div class="modal" role="dialog" aria-modal="true" aria-label="공동 메모 로그인"><button class="modal-close" aria-label="닫기" data-action="close-modal">×</button><div class="eyebrow">COLLABORATION · SHARED NOTES</div><h2>notes, together.</h2>
    ${loggedIn?`<p><b>${escapeHTML(STATE.user.email||'친구 계정')}</b>으로 로그인했습니다. 회원으로 허용된 계정은 서로의 SNS 메모를 볼 수 있어요.</p><div class="modal-form"><button class="mini-btn dark" data-action="sync-local">이 기기의 기존 메모 공동 공유</button><button class="mini-btn" data-action="logout">로그아웃</button></div>`:`<p>초대된 이메일로 로그인하면 친구들과 장소별 메모를 실시간으로 공유할 수 있습니다. 처음에는 메일로 로그인 링크를 받습니다. <b>Supabase에 미리 등록된 이메일만</b> 공동 메모에 접근할 수 있습니다.</p><form class="modal-form" id="auth-form"><input class="login-input" type="email" name="email" required placeholder="친구 이메일 주소" autocomplete="email"><button type="submit" class="mini-btn dark">이메일 로그인 링크 받기 →</button></form>`}
    <div class="notice-inline">사이트의 여행 일정은 공개 페이지입니다. 공동 메모만 로그인한 초대 멤버에게 제한됩니다.</div></div>`;
    APP.appendChild(backdrop);
  }
  async function login(email){if(!sb)return;const {error}=await sb.auth.signInWithOtp({email,options:{emailRedirectTo:location.origin+location.pathname+location.hash}});if(error){toast('로그인 이메일 전송 실패: '+error.message);}else{toast('받은 편지함에서 로그인 링크를 확인해주세요.');closeModal();}}
  function closeModal(){document.getElementById('modal-overlay')?.remove();}
  async function loadCloudNotes(){if(!sb||!STATE.user)return;STATE.loadingCloud=true;const {data,error}=await sb.from('trip_notes').select('id,spot_id,url,memo,title,image,created_at,created_by').order('created_at',{ascending:false}).limit(400);
    STATE.loadingCloud=false;if(error){console.error(error);toast('공동 메모 접근 권한이 없습니다. 초대 이메일 등록을 확인하세요.');return;}
    STATE.cloudNotes=data||[];renderSite();}
  async function syncLocalToCloud(){if(!sb||!STATE.user||!STATE.localNotes.length){toast('공유할 로컬 메모가 없습니다.');return;}
    const rows=STATE.localNotes.map(n=>({id:n.id,spot_id:n.spot_id,url:n.url||'',memo:n.memo||'',title:n.title||'',image:n.image||'',created_by:STATE.user.id}));
    const {error}=await sb.from('trip_notes').upsert(rows,{onConflict:'id'});
    if(error){toast('동기화 실패: '+error.message);return;}
    STATE.localNotes=[];saveStorage(STORE,[]);closeModal();await loadCloudNotes();toast('로컬 메모를 공동 메모로 이전했어요.');
  }
  function setupDelegation(){APP.addEventListener('click', async e=>{
    const ele=e.target.closest('[data-action]');if(!ele)return;const action=ele.dataset.action;
    if(action==='toggle-tools'){const menu=APP.querySelector('.tools-popover');STATE.showTools=!STATE.showTools;if(menu)menu.hidden=!STATE.showTools;ele.setAttribute('aria-expanded',String(STATE.showTools));return;}
    if(action==='toggle-cover-edit'){if(!canEditCovers())return;STATE.editingCovers=!STATE.editingCovers;STATE.showTools=false;renderSite();toast(STATE.editingCovers?'사진의 ✎ 버튼을 눌러 대표 이미지를 바꿀 수 있어요.':'사진 편집을 마쳤습니다.');return;}
    if(action==='open-cover'){openCoverModal(ele.dataset.spot);return;}
    if(action==='cover-tab'){coverMode(ele.dataset.value);return;}
    if(action==='restore-cover'){await restoreCover(ele.dataset.spot);return;}
    if(action==='day'){navigate(Number(ele.dataset.value));return;}
    if(action==='filter'){STATE.filter=ele.dataset.value;renderDaySectionsInPlace();return;}
    if(action==='share'){await share();return;}
    if(action==='print'){STATE.showTools=false;APP.querySelector('.tools-popover')?.setAttribute('hidden','');window.print();return;}
    if(action==='export'){exportNotes();STATE.showTools=false;APP.querySelector('.tools-popover')?.setAttribute('hidden','');return;}
    if(action==='auth'){authUI();return;}
    if(action==='close-modal'){closeModal();return;}
    if(action==='logout'){await sb?.auth.signOut();closeModal();return;}
    if(action==='sync-local'){await syncLocalToCloud();return;}
    if(action==='copy-address'){try{await navigator.clipboard.writeText(TRIP.hotel.address);toast('호텔 중국어 주소를 복사했어요.');}catch{prompt('복사할 주소',TRIP.hotel.address)}return;}
    if(action==='choose-afternoon'){STATE.choice.afternoon=ele.dataset.value;saveStorage(CHOICES_STORE,STATE.choice);renderSite();toast('18일 오후 선택이 일정표에 반영됐습니다.');return;}
    if(action==='choose-night'){STATE.choice.night=ele.dataset.value;saveStorage(CHOICES_STORE,STATE.choice);renderSite();toast('17일 야경 선택이 일정표에 반영됐습니다.');return;}
    const id=ele.dataset.spot;if(action==='toggle-note'&&id){STATE.noteForms[id]=!STATE.noteForms[id];delete STATE.noteEdits[id];rerenderNotes(id);return;}
    if(action==='cancel-note'&&id){STATE.noteForms[id]=false;delete STATE.noteEdits[id];rerenderNotes(id);return;}
    if(action==='edit-note'&&id){STATE.noteForms[id]=true;STATE.noteEdits[id]=ele.dataset.noteId;rerenderNotes(id);document.querySelector(`#spot-${id} .note-form`)?.scrollIntoView({block:'nearest',behavior:'smooth'});return;}
    if(action==='delete-note'&&id){await deleteNote(id,ele.dataset.noteId);return;}
  });
  APP.addEventListener('submit',async e=>{
    if(e.target.id==='cover-form'){e.preventDefault();await saveCoverFromForm(e.target);return;}
    if(e.target.id==='auth-form'){e.preventDefault();const f=new FormData(e.target);const email=String(f.get('email')||'').trim();if(email)await login(email);return;}
    const f=e.target.closest('form[data-action="save-note"]');if(!f)return;e.preventDefault();const id=f.dataset.spot;const formData=new FormData(f);const url=String(formData.get('url')||'').trim();const memo=String(formData.get('memo')||'').trim();const submit=f.querySelector('[type="submit"]');submit.disabled=true;submit.textContent='미리보기 확인·저장 중…';await saveNote(id,url,memo);if(document.body.contains(submit)){submit.disabled=false;submit.textContent='메모 저장 ↗';}
  });
  APP.addEventListener('change', e=>{
    if(e.target.id!=='cover-upload')return;
    const file=e.target.files?.[0]; pastedCoverFile=null;
    const label=document.getElementById('cover-file-label');if(label)label.textContent=file?file.name:'선택된 사진이 없습니다';
    if(!file)return;
    if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>10*1024*1024){setCoverStatus('JPG, PNG, WebP 파일만 10MB까지 선택할 수 있어요.');return;}
    setCoverStatus('');const objectURL=URL.createObjectURL(file);
    const preview=document.getElementById('cover-preview-img');if(preview)preview.src=objectURL;
    setTimeout(()=>URL.revokeObjectURL(objectURL),15000);
  });
  document.addEventListener('paste', e=>{
    const modal=document.querySelector('.cover-modal');
    if(!modal || !canEditCovers())return;
    const item=Array.from(e.clipboardData?.items||[]).find(x=>x.kind==='file' && x.type.startsWith('image/'));
    if(!item)return;
    e.preventDefault();
    const raw=item.getAsFile();
    if(!raw)return;
    if(!['image/jpeg','image/png','image/webp'].includes(raw.type) || raw.size>10*1024*1024){
      setCoverStatus('붙여넣은 사진은 JPG, PNG, WebP 형식, 10MB 이하만 가능합니다.');return;
    }
    pastedCoverFile=new File([raw], '붙여넣은-사진.'+(raw.type==='image/png'?'png':raw.type==='image/webp'?'webp':'jpg'),{type:raw.type});
    STATE.coverModalMode='upload';
    modal.querySelectorAll('.cover-tab').forEach(b=>b.classList.toggle('active',b.dataset.value==='upload'));
    modal.querySelector('.cover-upload-pane').hidden=false;
    modal.querySelector('.cover-url-pane').hidden=true;
    const input=modal.querySelector('#cover-upload');if(input)input.value='';
    const label=modal.querySelector('#cover-file-label');if(label)label.textContent='✓ 클립보드 사진이 준비되었습니다';
    const preview=modal.querySelector('#cover-preview-img');
    if(preview){const u=URL.createObjectURL(raw);preview.src=u;setTimeout(()=>URL.revokeObjectURL(u),15000);}
    setCoverStatus('붙여넣기 완료 · 아래 대표 사진 저장 버튼을 눌러주세요.');
  });
  APP.addEventListener('input',e=>{if(e.target.id==='cover-url'){
    const url=safeURL(e.target.value.trim());const preview=document.getElementById('cover-preview-img');
    if(url&&preview)preview.src=url;
  }});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});
  APP.addEventListener('click', e=>{const row=e.target.closest('tr[data-place]');if(!row||e.target.closest('a,button'))return;const id=row.dataset.place;if(!id)return;STATE.filter='all';renderDaySectionsInPlace();const card=document.getElementById('spot-'+id);if(card){card.scrollIntoView({behavior:'smooth',block:'start'});card.style.outline='2px solid #85ab96';setTimeout(()=>{if(card)card.style.outline='';},1700);} });
  window.addEventListener('hashchange',()=>{const d=parseDay();if(d!==STATE.day){STATE.day=d;renderSite();}});
  }
  function renderDaySectionsInPlace(){const el=document.getElementById('spots-section');if(el){el.outerHTML=renderDaySections(TRIP.days[STATE.day-1]);}}
  function initializeCloud(){if(!sb)return;
    sb.auth.onAuthStateChange((_event,session)=>{const oldId=STATE.user?.id||null;STATE.user=session?.user||null;if(STATE.user&&STATE.user.id!==oldId){setTimeout(()=>{loadCloudNotes();checkCoverAdmin();},0);}else if(!STATE.user&&oldId){STATE.cloudNotes=[];STATE.isAdmin=false;STATE.editingCovers=false;setTimeout(()=>renderSite(),0);} });
    sb.auth.getSession().then(({data})=>{if(data?.session?.user){STATE.user=data.session.user;loadCloudNotes();checkCoverAdmin();}}).catch(console.error);
  }
  setupDelegation();renderSite();initializeCloud();if(cloudEnabled)loadCloudCovers();else loadLocalCovers();
})();
