/* Trip editorial data. Times, prices, and GPS are planning estimates, not live bookings. */
window.TRIP = {
  title: 'GUANGZHOU ↔ SHENZHEN',
  subtitle: 'The girls’ city guide',
  dates: '2026.10.17 — 10.20',
  hotel: {
    name: '总统府邸（广州岗顶地铁站太古汇店）',
    en: 'Presidential Mansion · Gangding',
    address: '广东省广州市天河区天河路586号A座13楼',
    phone: '+86 20 6280 8118 / +86 20 6280 3688',
    note: '예약 바우처의 전화번호와 실제 숙소명을 최종 대조하세요. 같은 주소의 总统大酒店와 혼동 주의.',
    lat:23.1350,lng:113.3425
  },
  days:[
    {
      number:1,date:'SAT 17 OCT',dateFull:'10월 17일 · 토요일',city:'GUANGZHOU',title:'골목에서 노을까지',label:'동산커우 · 마늘바지락 · MINISO LAND · 황유여면빵집 · 야경',theme:'peach',photo:'https://commons.wikimedia.org/wiki/Special:FilePath/Canton_Tower_at_night_01.jpg?width=1000',photoLabel:'CANTON TOWER · PHOTO CC0',
      intro:'동산커우에서 사진 찍고 마늘 바지락을 먹은 뒤, 정자광장의 MINISO LAND와 천환광장의 BUTTERFUL&CREAMOROUS에서 쇼핑! 호텔에 쇼핑백을 두고 광저우타워 야경을 보러 가요.',
      notice:'토요일 + 광저우 박람회 기간 · 정자광장·천환광장 쇼핑 후 호텔 경유가 필수! 광저우타워는 20:30 이후 입장을 기준으로 예약 가능한지 확인하세요.',
      itinerary:[
        {time:'11:30',name:'광저우 바이윈공항 T2 도착',desc:'KE867 · 입국심사/수하물 약 60~90분',id:'airport'},
        {time:'13:00',name:'호텔 이동·합류',desc:'디디 또는 지하철 · 짐 맡기기',id:'hotel'},
        {time:'15:30',name:'동산커우 감성 시티워크',desc:'묘전서가, 배정로, 휼고원로, 카페',id:'dong'},
        {time:'17:00',name:'마늘 바지락 냄비요리',desc:'식당 미정 · 18:00까지 저녁 목표',id:'clams'},
        {time:'18:20',name:'MINISO LAND · 정자광장',desc:'正佳广场 1~2층 · 캐릭터 굿즈·포토스팟',id:'miniso'},
        {time:'18:50',name:'BUTTERFUL&CREAMOROUS · 빵 쇼핑 ♡',desc:'옆 쇼핑몰 天环广场 B1 B145a · 밤에 먹을 베이커리',id:'dessertRun'},
        {time:'19:35',name:'호텔에 쇼핑백 내려놓기',desc:'강딩 숙소로 이동 · 짐 보관하고 곧바로 출발',id:'hotelDrop'},
        {time:'20:30~',name:'광저우타워 야경',desc:'버블트램 또는 늦은 주강 유람선 · 사전예매 확인',id:'tower'},
        {time:'23:00~',name:'호텔에서 디저트 돼지파티 ♡',desc:'낮에 사둔 간식·음료 꺼내서 밤에 먹기',id:'dessertParty'},
        {time:'선택',name:'캐주얼 칵테일 바',desc:'이날은 시간·체력이 남을 때만',id:'bar'}
      ],
      routes:[
        ['바이윈공항 T2 → 호텔','디디 45~75분','¥110~180 / 차','지하철 65~90분 · 약 ¥8~12/인'],
        ['호텔 → 동산커우','20~35분','¥20~40 / 차','주말 혼잡 여유 필요'],
        ['동산커우 저녁 → 정자광장 MINISO LAND','15~35분','¥20~45 / 차','저녁 식당이 동산커우 근처라는 가정'],
        ['정자광장 MINISO → 천환광장 빵집','도보 약 5~12분','무료','서로 다른 쇼핑몰! 正佳广场 → 天环广场 B1'],
        ['천환광장 → 강딩 호텔 (짐 보관)','15~30분','¥18~40 / 차','주말 톈허 상권 정체 주의'],
        ['호텔 → 광저우타워','25~45분','¥30~60 / 차','버블트램 입장시간·대기 고려'],
        ['광저우타워 → 호텔','20~40분','¥25~55 / 차','야간 할증 가능']
      ],
      sections:[
        {title:'01 · LAND & CHECK-IN',subtitle:'호텔과 공항 이동',items:['airport','hotel']},
        {title:'02 · DONGSHANKOU PHOTO WALK',subtitle:'SNS 감성 스팟 · 편집숍 · 카페 · 젤라또는 정자광장 쇼핑 중 보이면 자유롭게',items:['dong','miao','peizheng','xugu','holiday']},
        {title:'03 · GARLIC CLAM POT',subtitle:'첫날 저녁은 마늘 바지락 냄비요리 하나만',items:['clams']},
        {title:'04 · MINISO LAND & BUTTERFUL',subtitle:'정자광장의 MINISO LAND → 바로 이웃 천환광장 B1의 황유여면빵집',items:['miniso','dessertRun']},
        {title:'05 · HOTEL PIT STOP',subtitle:'쇼핑백을 객실에 내려놓고 가볍게 야경 보러 출발',items:['hotelDrop']},
        {title:'06 · NIGHT VIEW & SWEET PARTY',subtitle:'20:30 이후 광저우타워 → 호텔 야식 / 칵테일 바는 선택',items:['tower','cruise','dessertParty','bar']}
      ]
    },
    {
      number:2,date:'SUN 18 OCT',dateFull:'10월 18일 · 일요일',city:'SHENZHEN',title:'미래 도시에서 피크닉',label:'건축 · 비키니시티 · 전자상가 · 휴식',theme:'sage',photo:'assets/qianhai-reference.webp',photoLabel:'SHENZHEN PICNIC REFERENCE · USER PROVIDED',
      intro:'핑산의 건축을 보고 푸톈의 쇼핑·스폰지밥 팝업·전자제품을 체험합니다. 마지막은 피크닉 또는 마사지 중 선택.',
      notice:'선전 자연사박물관의 건물이 친구가 원하는 건축물과 같은지 최종 대조가 필요합니다. 피크닉을 고르면 귀환 시간이 늦어집니다.',
      itinerary:[
        {time:'06:20',name:'호텔 → 광저우남역',desc:'열차시간 확정 전의 출발 목표',id:'rail'},
        {time:'~09:30',name:'선전핑산역 → 자연사박물관',desc:'핑산 윈바(云巴) 또는 디디',id:'museum'},
        {time:'10:00',name:'자연사박물관 외관 사진',desc:'유선형 지붕과 수변 건축',id:'museum'},
        {time:'12:15',name:'점심 · 아직 미정',desc:'각자 식당 링크/메모 추가 · 원애비뉴 근처',id:'lunch2'},
        {time:'13:15',name:'원애비뉴 · 비키니시티',desc:'쇼핑과 스폰지밥 포토스팟',id:'one'},
        {time:'14:30',name:'코코파크 둘러보기',desc:'푸톈 도심 쇼핑',id:'coco'},
        {time:'15:00',name:'화창베이 전자제품 체험',desc:'AI 기기 · 로봇 · 드론 · SEG',id:'electronics'},
        {time:'16:15',name:'피크닉 또는 마사지',desc:'첸하이 공연예술공원 / Taishi SPA',id:'picnic'},
        {time:'19:00~',name:'고속철도 → 광저우 귀환',desc:'귀환역과 실제 표 시간에 따라 달라짐',id:'returnrail'},
        {time:'21:30~',name:'호텔 배달음식 파티',desc:'홍미창펀 또는 메이퇀 배달',id:'delivery'}
      ],
      routes:[
        ['호텔 → 광저우남역','45~75분','¥65~110 / 차','철도 탑승 30~45분 전 도착 권장'],
        ['선전핑산역 → 박물관','15~25분','¥20~40 / 차','윈바 약 20분·¥3 대안'],
        ['박물관 → 원애비뉴','55~90분','¥100~160 / 차','도시 동쪽 → 푸톈'],
        ['원애비뉴 → 코코파크','5~15분','¥12~25 / 차','도보 이동도 가능'],
        ['코코파크 → 화창베이','15~30분','¥20~40 / 차','SEG 상가 위주'],
        ['화창베이 → 마사지','15~30분','¥20~40 / 차','약 80~100분 코스'],
        ['화창베이 → 첸하이 피크닉','40~70분','¥65~110 / 차','서쪽으로 이동, 사진 우선'],
        ['첸하이 → 선전북역','35~65분','¥65~120 / 차','실제 예매 열차역 확인']
      ],
      sections:[
        {title:'01 · TRAIN & ARCHITECTURE',subtitle:'광저우 ↔ 선전 교통 · 건축 사진',items:['rail','museum']},
        {title:'02 · LUNCH & BIKINI BOTTOM',subtitle:'점심 미정 · 모두가 SNS 맛집 링크를 남길 수 있어요',items:['lunch2','one','bikini']},
        {title:'03 · FUTURISTIC SHENZHEN',subtitle:'코코파크와 화창베이 전자기기',items:['coco','electronics']},
        {title:'04 · YOUR CHOICE',subtitle:'친구들과 선택하기 · 잔디 피크닉 vs 태국 마사지',items:['picnic','spa']},
        {title:'05 · BACK TO GUANGZHOU',subtitle:'열차표 예약과 호텔 야식',items:['returnrail','delivery']}
      ]
    },
    {
      number:3,date:'MON 19 OCT',dateFull:'10월 19일 · 월요일',city:'GUANGZHOU',title:'느리게 걷는 올드타운',label:'마트 · 천자츠 · 융칭팡 · 사면도 · 베이징루',theme:'butter',photo:'https://commons.wikimedia.org/wiki/Special:FilePath/Yongqingfang.jpg?width=1000',photoLabel:'YONGQINGFANG · WIKIMEDIA COMMONS CC BY-SA 4.0',
      intro:'오전에 마트에서 과자와 생활용품을 사고, 린난 건축·복고풍 골목·사면도 카페를 거쳐 대불사 야경으로 마무리.',
      notice:'월요일은 광저우 성심대성당 내부 관람이 어렵습니다. 천자츠는 월요일 관람 가능 일정이나 당일 운영 변경을 확인하세요.',
      itinerary:[
        {time:'08:30',name:'융후이 마트 쇼핑',desc:'과자·생필품 → 숙소에 짐 놓기',id:'mart'},
        {time:'10:35',name:'천자츠',desc:'대칭 건축·지붕 장식·전통 공예',id:'chen'},
        {time:'12:00',name:'융칭팡',desc:'달다리 · 기루 골목 · 서점',id:'yong'},
        {time:'13:00',name:'점심식사 · 미정',desc:'각자 링크/메모 올린 뒤 현장에서 선택',id:'lunch'},
        {time:'14:25',name:'사면도 포토워크',desc:'유럽풍 거리 · 루르드 성당',id:'shamian'},
        {time:'15:40',name:'사면도 카페 · 미정',desc:'친구들이 가고 싶은 카페 링크 올리기',id:'cafe'},
        {time:'16:40',name:'선택 · 성심대성당',desc:'월요일 외관만 · 친구들 의사에 따라',id:'cathedral'},
        {time:'17:30',name:'저녁식사 · 미정',desc:'베이징루 근처 · 후보 링크 모으기',id:'dinner'},
        {time:'19:00',name:'베이징루·대불사 야경',desc:'황금빛 절·천년 옛길·쇼핑',id:'beijing'}
      ],
      routes:[
        ['호텔 ↔ 융후이마트','도보 약 5~10분','무료','마트 개점시간 확인'],
        ['호텔 → 천자츠','30~50분','¥35~60 / 차','시내 교통 고려'],
        ['천자츠 → 융칭팡','10~20분','¥12~28 / 차','골목 입구 하차'],
        ['융칭팡 → 사면도','12~25분','¥14~30 / 차','사면도 중심은 도보'],
        ['사면도 → 대성당(선택)','15~25분','¥15~30 / 차','월요일 실내 휴관'],
        ['대성당 → 베이징루','12~25분','¥12~28 / 차','선택 이동'],
        ['베이징루 → 호텔','20~40분','¥25~50 / 차','늦은 저녁 주의']
      ],
      sections:[
        {title:'01 · MORNING MARKET',subtitle:'쇼핑해서 숙소에 두고 출발',items:['mart']},
        {title:'02 · CULTURE & ALLEYS',subtitle:'천자츠와 융칭팡 인생샷',items:['chen','yong']},
        {title:'03 · LUNCH CLUB',subtitle:'점심 미정 · 링크/메모 제안 받는 중',items:['lunch']},
        {title:'04 · SHAMIAN PHOTO WALK',subtitle:'유럽풍 섬 · 카페 미정 (SNS 링크를 등록해 주세요)',items:['shamian','cafe']},
        {title:'05 · OPTIONAL & NIGHT',subtitle:'대성당(선택) · 저녁 미정 · 베이징루 야경',items:['cathedral','dinner','beijing','dafo']}
      ]
    },
    {number:4,date:'TUE 20 OCT',dateFull:'10월 20일 · 화요일',city:'GUANGZHOU → SEOUL',title:'마지막 한 장의 사진',label:'호텔 체크아웃 · 광저우 출국',theme:'sky',photo:'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1300&q=80',photoLabel:'HOMEBOUND / MOOD IMAGE',intro:'귀국편은 점심 출발. 쇼핑은 전날 끝내고 공항 이동에 집중하는 날.',notice:'대한항공 KE868 · 광저우 바이윈공항 T2 12:40 출발 / 인천 T2 17:15 도착.',itinerary:[
      {time:'07:00',name:'기상·최종 짐 정리',desc:'액체류·배터리·여권 확인',id:'packing'},
      {time:'07:45',name:'호텔 체크아웃·공항 출발',desc:'박람회 교통변수 반영',id:'hotel'},
      {time:'09:00',name:'바이윈공항 T2 도착 목표',desc:'위탁 수하물과 출국 수속',id:'airport'},
      {time:'12:40',name:'KE868 출발',desc:'광저우 → 인천',id:'flight'},
      {time:'17:15',name:'인천 T2 도착',desc:'한국시간',id:'flight'}],routes:[['호텔 → 바이윈공항 T2','45~80분','¥110~180 / 차','체크인에 여유를 두세요']],sections:[{title:'GOOD BYE, GUANGZHOU',subtitle:'귀국 체크리스트',items:['packing','airport','flight']} ]}
  ]
};
const G=window.TRIP.hotel;
const p=(id,title,cn,category,lat,lng,desc,extra={})=>({id,title,cn,category,lat,lng,desc,...extra});
window.SPOTS={
  airport:p('airport','광저우 바이윈공항 T2','广州白云国际机场2号航站楼','교통',23.3860,113.2998,'대한항공 국제선 도착 및 귀국 터미널.',{tips:['공항 디디 탑승 위치는 网约车 안내를 따라 이동','출국은 T2, 출발 약 3시간 전 도착 목표'],price:'공항 → 호텔 디디 ¥110~180/차'}),
  hotel:p('hotel','프레지덴셜 맨션','总统府邸 广州岗顶地铁站太古汇店','숙소',G.lat,G.lng,'동산커우 이동 전 짐을 놓고 쉬기 좋은 강딩역 인근 숙소.',{address:G.address,tips:['A동 13층 체크인 장소 확인','总统大酒店와 혼동 주의','전화번호는 숙소 바우처와 대조'],price:'1박 가격은 숙소 예약 내역 참고'}),
  dong:p('dong','동산커우 감성 시티워크','东山口','포토워크',23.1221,113.2941,'홍벽돌 주택, 편집숍, 카페, 복고풍 골목을 가볍게 걸어보는 지역.',{tips:['도보 이동·골목 차량 주의','카페 영업은 매장별 상이','야인선생 젤라또(野人先生)는 쇼핑 일정 중 正佳广场 1층 지점을 발견하면 자유롭게 방문 · 정식 일정 아님','사진은 지나가는 사람의 통행 방해 없이'],photoTips:['골목 양편 오래된 주택을 프레임으로 활용','인물은 건물과 조금 떨어져 배치'] ,duration:'60~90분',image:'https://commons.wikimedia.org/wiki/Special:FilePath/Dongshankou.jpg?width=1000',imageCredit:'Wikimedia Commons · Amber Zou · CC BY-SA 4.0',imageSource:'https://commons.wikimedia.org/wiki/File:Dongshankou.jpg',imageStatus:'실제 장소 사진'}),
  miao:p('miao','묘전서가 편집숍 거리','庙前西街','쇼핑·포토',23.121924,113.293016,'동산커우의 대표 편집숍 골목. 동산커우와 별도 지역이 아닙니다.',{photoTips:['쇼윈도·독립 브랜드 간판 앞 스냅','거리 반대편에서 인물 전신 촬영'],tips:['주말 인파 많음','매장 촬영 전 직원에게 문의'],duration:'20~40분',image:'https://commons.wikimedia.org/wiki/Special:FilePath/Dongshankou.jpg?width=1000',imageCredit:'Wikimedia Commons · Amber Zou · CC BY-SA 4.0',imageSource:'https://commons.wikimedia.org/wiki/File:Dongshankou.jpg',imageStatus:'실제 장소 사진 · 인접 지역 풍경'}),
  peizheng:p('peizheng','배정로 오래된 노란 건물','培正路 培正东街','포토',23.120719,113.297728,'색감 있는 오래된 주택과 큰 나무가 이어지는 동산커우 사진 골목.',{photoTips:['코너 건물과 인물을 함께','2배 줌으로 오래된 건물 배경 압축'],duration:'15~20분'}),
  xugu:p('xugu','휼고원로 붉은 벽돌 주택','恤孤院路 新河浦','포토',23.119284,113.296670,'붉은 벽돌과 아치형 창문, 리틀 유럽 분위기의 거리.',{photoTips:['건물 앞 걸어가는 뒷모습','붉은 벽돌의 반복 패턴을 배경으로'],duration:'15~20분',tips:['주거지이므로 주민 프라이버시·사유지 출입 주의']}),
  holiday:p('holiday','holiday table 카페','holiday table 假日餐桌 东山口','카페 후보',23.123,113.295,'고덕지도에 저장했던 카페 후보. 정확한 지점과 영업시간은 앱에서 확인하세요.',{price:'메뉴별 상이',tips:['카페는 오후 17~19시 사이 일찍 문 닫는 곳도 있음','SNS 링크로 저장해 두기']}),
  clams:p('clams','마늘 바지락 냄비요리','蒜蓉花甲煲 东山口','식사 · 매장 미확정',23.1221,113.2941,'마늘과 바지락·당면을 넣어 먹는 요리. 식당 이름이 아니라 메뉴명이므로 정확한 식당을 선택해야 합니다.',{image:'https://images.unsplash.com/photo-1555126634-323283e090fa?w=1000&q=80',imgNote:'음식 무드 참고 · 실제 메뉴 사진 아님',price:'식당·메뉴에 따라 다름',tips:['고덕지도에서 蒜蓉花甲煲 东山口 검색','有蒜蓉花甲煲吗? (마늘 바지락 냄비 있나요?)','매장이 정해지면 주소·디디 구간 업데이트 필요'],badge:'장소 확정 전'}),
  seafoodalt:p('seafoodalt','대안 · 성룽항 해산물','成隆行 68年靓蟹老字号 东山口店','식당 대안',23.1218,113.2925,'묘전서가 부근 게 요리·해산물 식당. 원래 원했던 마늘 바지락 냄비는 아닙니다.',{price:'약 ¥100~160/인',tips:['바지락 메뉴 대체일 뿐 동일 음식이 아님','실제 예약·운영 확인']}),
  gelato:p('gelato','야인선생 젤라또 · 발견하면 들르기','野人先生现做冰淇淋 正佳广场店','디저트 · 자유 방문',23.1327,113.3273,'MINISO LAND가 있는 正佳广场 F1층 F154 · D1108-01호로 등록된 젤라또 지점. 정식 일정에는 포함하지 않았습니다.',{address:'广州市天河区天河路228号 正佳广场 F1层F154、D1108-01',price:'약 ¥20~40/인',tips:['MINISO LAND와 같은 쇼핑몰이지만 매장 위치는 다름','사람이 많거나 보이지 않으면 패스! 정해진 순서에 포함하지 않음'],duration:'선택 10~20분',links:[{label:'매장 정보·위치 확인',url:'https://www.openrice.com.cn/zh-cn/guangzhou/restaurants?landmarkId=30301&regionId=3'}]}),
  miniso:p('miniso','MINISO LAND · 광저우 1호점','MINISO LAND广州壹号店 正佳广场','쇼핑·포토',23.132961,113.326873,'정자광장(正佳广场) 1~2층에 2026년 문을 연 대형 IP 굿즈 플래그십. 컬러풀한 포토스팟과 쇼핑을 함께!',{address:'广州市天河区天河路228号 正佳广场 一楼北街 (F1~F2)',price:'굿즈 구매별 상이',duration:'25~40분',tips:['B&C 빵집이 있는 天环广场와는 다른 쇼핑몰입니다 · 두 건물은 같은 톈허 상권','귀여운 캐릭터 굿즈와 인테리어 사진 스팟이 많은 매장','야인선생 젤라또 野人先生는 같은 正佳广场 1층 F154 지점으로 등록 · 발견하면 선택 방문, 시간표에는 제외','이후 도보로 天环广场 B1 빵집 이동'],links:[{label:'미니소 정자광장 고덕지도',url:'https://www.amap.com/place/B0LKKANSKE'},{label:'MINISO LAND 실제 매장 사진 · 디자이너',url:'https://www.xl-muse.com/index.php?ac=article&at=read&did=449'}],photoTips:['매장 중앙 컬러풀한 아치와 원형 진열대','키치한 캐릭터 IP 존에서 전신 사진'] ,image:'https://www.xl-muse.com/upfile/2026/05/06/20260506153853_958.jpg',imageCredit:'© 唯想国际 X+Living · 실제 MINISO LAND',imageSource:'https://www.xl-muse.com/index.php?ac=article&at=read&did=449',imageStatus:'2026 매장 실경 · 공개 재사용 권리 확인 필요'}),
  dessertRun:p('dessertRun','BUTTERFUL&CREAMOROUS · 디저트 장보기','BUTTERFUL&CREAMOROUS 黄油与面包 广州天环店','베이커리·디저트',23.132289,113.324674,'기억하신 바로 그 빵집! 天环广场(Parc Central) B1층 B145a호에 있는 광저우 첫 지점. 밤에 호텔에서 먹을 페이스트리와 빵을 고릅니다.',{address:'广州市天河区天河路218号 天环广场 B1层 B145a号',price:'메뉴별 상이',duration:'25~40분',tips:['빵집 개별 영업시간: 매일 12:00~22:00 · 쇼핑몰 전체 시간과 다름','MINISO LAND는 옆 正佳广场에 위치 · 같은 쇼핑몰이 아닙니다','유명 베이커리라 대기·인기빵 품절 가능','생크림·치즈 제품은 호텔에서 냉장 보관 확인','디저트 외 마트·간식은 주변 쇼핑몰에서 유동적으로 구매'],links:[{label:'쇼핑몰 공식 입점·층·영업시간',url:'https://www.parccentral.com.hk/en/shop/467'},{label:'빵집 고덕지도 검색',url:'https://uri.amap.com/search?keyword=BUTTERFUL%26CREAMOROUS%20%E9%BB%84%E6%B2%B9%E4%B8%8E%E9%9D%A2%E5%8C%85%20%E5%A4%A9%E7%8E%AF%E5%BA%97&city=%E5%B9%BF%E5%B7%9E'}],photoTips:['골드 로고가 있는 유럽풍 빵집 외관','빛나는 쇼케이스와 빵 진열대'] ,image:'https://ak-d.tripcdn.com/images/1mi4q224x95ae2iub6083.jpg?proc=source%2Ftrip',imageCredit:'© 원본 여행자 사진 / Trip.com',imageSource:'https://th.trip.com/moments/detail/guangzhou-152-136318135/',imageStatus:'실제 B&C 광저우점 참고 · 공개 이용권 확인 필요'}),
  hotelDrop:p('hotelDrop','호텔에 쇼핑백 내려놓기','总统府邸 广州岗顶地铁站太古汇店','숙소·경유',G.lat,G.lng,'짐만 잠깐 놓고 바로 광저우타워로 출발. 저녁에 먹을 디저트는 객실에 보관합니다.',{address:G.address,duration:'10~15분',tips:['A동 13층 객실 확인','생크림 케이크·유제품은 냉장보관','디디에서 호텔 출발 픽업 지점을 다시 설정','광저우타워 예약 시간에 늦지 않도록 오래 쉬지 않기']}),
  dessertParty:p('dessertParty','호텔 디저트 돼지파티 ♡','总统府邸 广州 岗顶 夜宵 甜品','디저트·숙소',G.lat,G.lng,'광저우타워 야경을 보고 돌아와 미리 사놓은 디저트·음료·과자를 펼쳐놓고 먹는 밤의 마무리!',{duration:'자유롭게',tips:['스푼·물티슈·음료·얼음도 함께 구매하면 편리','숙소 규정·소음 주의','배달 추가 주문을 할 경우 객실/건물 입구 수령 위치 확인'],badge:'오늘 밤의 피날레'}),
  tower:p('tower','광저우타워 버블트램','广州塔 460米摩天轮','야경 · 예약',23.1064,113.3244,'460m 높이에서 유리 캡슐을 타는 전망 체험. 날씨·대기시간에 민감합니다.',{price:'상품 예시 약 ¥315~323/인',duration:'탑승 약 20분 + 입장·대기 45~90분 이상 여유',tips:['460米摩天轮 포함된 티켓인지 확인','사전 예매 권장 · 날짜/시각 선택','주말 입장 줄 길 수 있음'],links:[{label:'타워 공식 홈페이지',url:'https://www.cantontower.com/'}],image:'https://commons.wikimedia.org/wiki/Special:FilePath/Canton_Tower_at_night_01.jpg?width=1000',imageCredit:'Wikimedia Commons · Shujianyang · CC0',imageSource:'https://commons.wikimedia.org/wiki/File:Canton_Tower_at_night_01.jpg',imageStatus:'실제 장소 사진'}),
  cruise:p('cruise','대안 · 주강 야경 유람선','珠江夜游 广州塔财富码头','야경 · 옵션',23.1055,113.3267,'배에서 광저우타워와 주강 야경을 보는 코스. 버블트램 대신 선택.',{price:'약 ¥98~188/인 · 선종별 상이',duration:'약 60~80분 항해',tips:['토요일 밤은 사전 예매 권장','여권 실명 승선 · 30분 전 승선장 도착','출항 부두에 따라 목적지 다름'],links:[{label:'승선장 검색',url:'https://uri.amap.com/search?keyword=%E5%B9%BF%E5%B7%9E%E5%A1%94%E8%B4%A2%E5%AF%8C%E7%A0%81%E5%A4%B4&city=%E5%B9%BF%E5%B7%9E'}],imageStatus:'실제 장소 사진 · 인접 지역 풍경',image:'https://www.cantontower.com/Uploads/20230221110940_107644.jpg',imageCredit:'© 광저우타워 공식 · 주강 유람선',imageSource:'https://www.cantontower.com/pearlriver/dock/',imageStatus:'공식 유람선 실경 · 공개 재사용 권리 확인 필요'}),
  bar:p('bar','칵테일 바 후보','琶醍 酒吧 Hope & Sesame innER','나이트라이프',23.1079,113.3283,'캐주얼하게 한 잔 하려면 주강변 琶醍; 독특한 칵테일이라면 동산커우 Hope & Sesame / innER.',{price:'약 ¥70~150/잔 · 매장별 상이',tips:['동산커우 바는 타워 이후 역방향 이동이 될 수 있음','드레스코드·주문최소금액·늦은 영업시간 확인'],links:[{label:'Hope & Sesame 공식',url:'https://hopeandsesame.cn/home/hope-sesame-guangzhou/'}]}),
  rail:p('rail','광저우 → 선전 고속철도','广州南站 → 深圳坪山站','교통',22.9903,113.2698,'박물관 먼저 간다면 선전핑산역(深圳坪山站) 도착편을 우선 검토. 광저우남역까지의 시내 이동을 잊지 마세요.',{price:'고속철 2등석 예시 약 ¥90~110/인',duration:'열차 약 1~1.5시간 + 광저우남역 접근',tips:['广州南과 广州东은 완전히 다른 역','12306 실명 여권 예매','탑승 최소 30~45분 전 역 도착','역/운임/잔여석은 실제 예약시 재확인'],links:[{label:'12306 공식',url:'https://www.12306.cn/index/'}]}),
  museum:p('museum','선전 자연사박물관 · 건축 구경','深圳自然博物馆','건축 · 촬영',22.704,114.342,'핑산구의 유선형 건축과 수변을 감상할 목적. 친구가 원하는 건물과 동일한지 공식 사진 대조가 필요합니다.',{badge:'건물 최종 대조 필요',price:'외부 공용구역 사진: 일반적으로 무료 · 내부 전시는 별도 확인',duration:'외관 사진 60~75분',photoTips:['수변 건물 전경 0.5배 광각','곡선 지붕을 겹치게 담는 2배 줌','인물을 작게 세워 건축 규모를 강조'],tips:['외관 접근 가능 구역과 옥상 출입 조건은 별개','실내 입장 시 여권·사전예약 확인','월요일 휴관 정보가 있어 일요일 방문 선택'],links:[{label:'실제 건물 사진 · 선전시 공식 페이지',url:'https://www.sz.gov.cn/en_szgov/aboutsz/photos/content/post_12915075.html'},{label:'공식 홈페이지',url:'https://www.sznhmuseum.org.cn/'}],image:'https://www.chinadailyhk.com/upload/main/image/2026/07/27/d10b772cb6ee9ad9e782c8647d7881c6.jpg',imageCredit:'© China Daily · 2026년 박물관 실경',imageSource:'https://www.chinadailyasia.com/article/637013',imageStatus:'2026 완공 건축물 · 공개 재사용 권리 확인 필요'}),
  one:p('one','원애비뉴 · 원몰 쇼핑','卓悦中心 One Avenue','쇼핑 · 점심',22.5414,114.0624,'선전 푸톈 중심부의 대형 복합 쇼핑시설. 점심, 비키니시티 팝업, 편집숍을 함께.',{duration:'점심 포함 90~140분',tips:['东区/西区/中央大街 등 구역별 이동 동선 확인','현재 입점 매장은 고덕지도 최종 확인'],image:'https://cdn.orangenews.hk/common/2023/12/15/5e969aede4134c73a9db3663cd671a3d.jpg?x-oss-process=style%2Fw960',imageCredit:'© Orange News · 원애비뉴 현장',imageSource:'https://www.orangenews.hk/',imageStatus:'원애비뉴 현장 참고 · 재사용 권리 확인 필요'}),
  lunch2:p('lunch2','점심식사 · 미정','深圳 卓悦中心 附近 美食','점심 · 미정',22.5414,114.0624,'아직 정한 식당이 없어요. 친구들이 먹고 싶은 메뉴, SNS 릴스, 샤오홍슈 맛집 링크를 아래 Notes에 자유롭게 모아 주세요.',{badge:'미정 · 후보 등록',duration:'약 60분 예정',tips:['추천 식당을 미리 정하지 않았습니다','아래 Notes에서 SNS 링크·후보 이름·메모를 추가하세요','모인 링크를 보고 친구들과 현장에서 선택합니다']}),
  fei:p('fei','점심 A · 페이다추','费大厨辣椒炒肉 卓悦中心店','점심 옵션',22.5415,114.0622,'후난식 고추돼지고기볶음과 흰쌀밥. 맵고 든든한 식사.',{price:'약 ¥40~100/인',tips:['대표 메뉴 辣椒炒肉','점심 피크 타임 대기 가능']}),
  taotao:p('taotao','점심 B · 타오타오쥐','陶陶居酒家 卓悦中心店','점심 옵션',22.5418,114.062,'홍미창펀, 새우딤섬, 파인애플번. 홍미창펀을 선전에서 먼저 먹을 수 있는 선택지.',{price:'약 ¥100~150/인',tips:['红米肠 메뉴 실제 판매 여부 확인','점심에 인기가 많아 대기 가능']}),
  coconut:p('coconut','점심 C · 코코넛 치킨','四季椰林海南椰子鸡 卓悦中心店','점심 옵션',22.5420,114.0619,'코코넛물 베이스의 맑은 치킨 훠궈. 맵지 않고 천천히 먹기 좋습니다.',{price:'약 ¥100~150/인',tips:['식사 시간이 60분 넘게 걸릴 수 있음']}),
  goose:p('goose','점심 D · 차오산 거위조림','陈鹏鹏卤鹅饭店 卓悦中心店','점심 옵션',22.5416,114.0623,'차오산식 거위조림과 밥. 운영 확인이 더 필요한 후보.',{price:'약 ¥70~120/인',badge:'매장 운영 재확인',tips:['정확한 입점과 영업시간 고덕지도 재확인']}),
  bikini:p('bikini','비키니시티 · 스폰지밥 팝업','比奇堡的居民们 卓悦中心','SNS 팝업',22.5414,114.0624,'스폰지밥 세계관 비키니시티를 꾸민 포토스팟. 원애비뉴 안팎 여러 구역에 설치.',{price:'무료 · 예약 불필요',duration:'40~60분',tips:['행사 안내 기간 2026.09.09~11.01 · 출발 전 재확인','中央大街 海岛假日公园: 대형 집게사장·배','东区 L1 户外阶梯: 바닷속 열차·물고기','西区 B2 中庭: 굿즈 팝업'],photoTips:['중앙 거리 조형물을 광각으로','캐릭터 옆에 서서 크기 대비를 살리기'],image:'https://cdn3.am730.com.hk/processed/2026-09/1054518/block/multiple_image/3217400/df/01M33Y8H2H3GG6BB0T3FJB60HJ.jpg?updatedAt=1790060262',imageCredit:'© am730 · 2026 원애비뉴 비키니시티',imageSource:'https://www.am730.com.hk/生活/1054518/',imageStatus:'실제 행사 사진 · 공개 재사용 권리 확인 필요'}),
  coco:p('coco','코코파크','星河COCO Park 福田店','쇼핑',22.5351,114.0527,'식사와 쇼핑을 겸할 수 있는 푸톈 대표 상업시설. GAP 매장은 계획에서 제외.',{duration:'30~45분',tips:['쇼핑몰 실내에서 다리 쉬어가기','관심 브랜드를 고덕지도에서 먼저 확인'],image:'https://commons.wikimedia.org/wiki/Special:FilePath/SZ_Shenzhen_Futian_Galaxy_CoCo_Park_Shopping_mall_PangAn_IFC_facade_July_2025_R12S.jpg?width=1000',imageCredit:'Monsai Coralmei 2A822 · CC0',imageSource:'https://commons.wikimedia.org/wiki/File:SZ_Shenzhen_Futian_Galaxy_CoCo_Park_Shopping_mall_PangAn_IFC_facade_July_2025_R12S.jpg',imageStatus:'실제 장소 사진'}),
  electronics:p('electronics','화창베이 · AI 전자기기 찍먹','华强北 赛格电子市场','전자기기',22.5453,114.0862,'SEG·화창전자세계에서 AI 안경, 로봇, 드론, 신기한 모바일 액세서리를 구경.',{price:'구경 무료 · 기기 구매 별도',duration:'45~75분',tips:['브랜드 제품과 비브랜드 상품이 섞여 있음','구매 전 한국어 지원, 정품 여부, 보증, 배터리 규정 확인','체험은 매장 직원에게 먼저 물어보기'],photoTips:['AI 안경·로봇 체험 순간 짧은 영상','좁은 판매대 촬영 시 점주 허락'] ,links:[{label:'화창전자세계 고덕 검색',url:'https://uri.amap.com/search?keyword=%E5%8D%8E%E5%BC%BA%E7%94%B5%E5%AD%90%E4%B8%96%E7%95%8C&city=%E6%B7%B1%E5%9C%B3'}],image:'https://commons.wikimedia.org/wiki/Special:FilePath/Inside_view_of_Shenzhen_Huaqiang_Electronic_World.JPG?width=1000',imageCredit:'そらみみ · CC BY-SA 4.0',imageSource:'https://commons.wikimedia.org/wiki/File:Inside_view_of_Shenzhen_Huaqiang_Electronic_World.JPG',imageStatus:'실제 장소 사진'}),
  picnic:p('picnic','첸하이 공연예술공원 · 피크닉','前海演艺公园','피크닉 · 오후 선택',22.5317,113.8925,'첨부해주신 잔디밭·야자수·대관람차 프레임과 일치하는 유력 공원. 선전만공원 일출극장과 다릅니다.',{image:'assets/qianhai-reference.webp',imgNote:'사용자 제공 SNS 참고 이미지 · 재배포 전 저작권 확인',price:'무료 · 공원 방문',duration:'일몰 17:00~18:30 권장',photoTips:['큰 잔디밭에서 湾区之光摩天轮 배경으로 인물 촬영','앉아있는 뒷모습과 대관람차를 한 프레임에','일몰빛이 들어오는 17시대 추천'],tips:['푸톈에서 멀기 때문에 마사지 대신 선택','돗자리 허용·출입 구역은 현장 규정 확인','사용자 이미지의 공개 게시 저작권은 별도로 확인'] ,links:[{label:'샤오홍슈 공원 사진 검색',url:'https://www.xiaohongshu.com/search_result?keyword=%E5%89%8D%E6%B5%B7%E6%BC%94%E8%89%BA%E5%85%AC%E5%9B%AD%20%E6%91%A9%E5%A4%A9%E8%BD%AE%20%E8%8D%89%E5%9D%AA'}]}),
  spa:p('spa','Taishi SPA · 태국 마사지','泰适SPA 卓悦中心岗厦城店','마사지 · 오후 선택',22.5424,114.0637,'원애비뉴 근처 강샤청 A동 18층 1803호. 친구가 보내준 인스타 릴스의 마사지.',{price:'가격은 코스·예약처별 확인',duration:'80~100분 코스 + 이동',tips:['유명 쇼핑몰 자체 매장과 입구 다름 · A동 18층 확인','사전 예약과 외국인 결제방법 문의'],links:[{label:'친구가 공유한 인스타 릴스',url:'https://www.instagram.com/reel/Dd306dzMCAQ/?utm_source=ig_web_copy_link&vrfl=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA=='},{label:'Klook 상품 예시',url:'https://www.klook.com/zh-CN/activity/171132-taishi-spa-essential-oil-massage-foot-massage-joyoung-center-ga/'}]}),
  returnrail:p('returnrail','선전 → 광저우 귀환 열차','深圳北站 福田站 → 广州','교통',22.6093,114.0298,'귀환은 반드시 실제 출발역과 시간으로 예매. 일요일 저녁 당일 구매만 믿지 않기.',{price:'노선·열차별 상이',tips:['피크닉은 서쪽, SPA는 푸톈이라 최적 출발역이 다름','선전북역/푸톈역 출발편 중 광저우 숙소까지 합산시간 비교','12306 또는 Trip.com에서 15일 이내 예매','열차 변경은 좌석과 운임규정에 좌우'],links:[{label:'12306 열차 예매',url:'https://www.12306.cn/index/'}]}),
  delivery:p('delivery','호텔에서 배달음식 파티','点都德 红米肠 美团外卖','배달 · 저녁',G.lat,G.lng,'호텔로 돌아와 홍미창펀/딤섬 혹은 꼬치와 간식을 배달 시켜 먹는 마지막 코스.',{price:'메뉴 주문별 상이',tips:['메이퇀 주소에 A동 13층과 숙소명 기재','늦은 시간 점도덕 배달·메뉴 품절 가능','미리 음식 주문 전 귀환시간 먼저 확인']}),
  mart:p('mart','융후이 슈퍼마켓 · 강딩','永辉超市 天娱广场店','마트',23.1346,113.346,'숙소 인근 톈위광장 지하의 마트. 중국 과자·음료·생필품을 사고 호텔에 두고 이동.',{price:'구매품에 따라 상이',duration:'40~50분',tips:['아침 08:30 전후 개점 정보 사전 확인','肉류 함유 즉석식품 등 한국 반입 제한 주의','免税 여부와 반입 제한은 상품별 확인']}),
  chen:p('chen','천자츠 · 진가사','陈家祠 广东民间工艺博物馆','전통 건축',23.1240,113.2428,'정교한 지붕 조각과 안뜰이 있는 광둥 전통 건축. 화려한 린난 미감을 사진으로 남기기.',{price:'입장료 예시 ¥10/인',duration:'60~75분',photoTips:['정문 정면의 대칭 구도','중정 가운데 세워 프레임 안에 인물 배치','지붕 장식을 2배 줌으로 촬영'],tips:['월요일 운영·최종 입장시간 재확인','실내 촬영 제한·통행 방해 주의'],image:'https://commons.wikimedia.org/wiki/Special:FilePath/Chen_Clan_Ancestral_Hall_2025.06_02.jpg?width=1000',imageCredit:'Wikimedia Commons · Shujianyang · CC BY-SA 4.0',imageSource:'https://commons.wikimedia.org/wiki/File:Chen_Clan_Ancestral_Hall_2025.06_02.jpg',imageStatus:'실제 장소 사진'}),
  yong:p('yong','융칭팡 · 달다리와 골목','永庆坊 月亮桥','골목·포토',23.1149,113.2355,'달다리, 은닝로 기루 건물, 서점, 전통 주택이 이어지는 광저우 구시가지.',{duration:'60~75분',photoTips:['月亮桥: 물에 비치는 반원과 함께 촬영','恩宁路: 아케이드 처마 아래 사선 구도','钟书阁: 거울·계단 대칭 사진'],tips:['달다리의 완전한 원형 야경은 낮 방문에선 다르게 보임','골목 주민과 관광객 통행 주의','광둥 오페라 예술박물관은 월요일 휴관 가능'] ,image:'https://commons.wikimedia.org/wiki/Special:FilePath/Yongqingfang.jpg?width=1000',imageCredit:'Wikimedia Commons · 钉钉 · CC BY-SA 4.0',imageSource:'https://commons.wikimedia.org/wiki/File:Yongqingfang.jpg',imageStatus:'실제 장소 사진'}),
  lunch:p('lunch','점심식사 · 미정','上下九 第十甫路 广州餐厅','식사 선택',23.1140,113.2393,'아직 점심 메뉴와 식당을 정하지 않았어요. 친구들이 원하는 맛집이나 참고 SNS 링크를 이 카드에 등록한 뒤 결정합니다.',{badge:'미정 · 링크 모집 중',duration:'약 60분 예정',tips:['융칭팡 주변 맛집으로 동선 고려','Notes에 식당 링크·메뉴·대기 여부를 남기세요']}),
  taolunch:p('taolunch','점심 A · 타오타오쥐 본점','陶陶居酒家 第十甫路总店','점심 옵션',23.1142,113.2398,'홍미창펀, 새우딤섬, 구운 거위, 다양한 광둥요리.',{price:'약 ¥80~130/인',tips:['第十甫路20号','대기시간 감안'] }),
  gzrestaurant:p('gzrestaurant','점심 B · 광저우주가','广州酒家 文昌总店','점심 옵션',23.1136,113.2410,'전통 광둥요리와 구운 거위, 각종 딤섬.',{price:'약 ¥90~130/인',tips:['文昌南路2号'] }),
  chentianji:p('chentianji','점심 C · 천톈지','陈添记 祖传爽鱼皮','점심 옵션',23.1130,113.2378,'생선껍질 무침, 뗏목죽, 창펀 등 광저우 로컬 간식.',{price:'약 ¥25~45/인',tips:['간단한 식사에 적합','골목 안 매장 위치 확인']}),
  panxi:p('panxi','점심 D · 판시주가','泮溪酒家 荔枝湾店','점심 옵션',23.1267,113.2277,'고풍스러운 정원과 수변 공간이 있는 광둥식 음식점.',{price:'약 ¥80~120/인',tips:['가장 우회가 큼 · 일정 여유 있을 때 선택'] }),
  shamian:p('shamian','사면도 · 유럽풍 골목','沙面岛 露德圣母堂','포토워크',23.1090,113.2427,'큰 가로수, 크림색 양옥, 루르드 성모성당, 구 HSBC 건물 등이 있는 산책 구역.',{duration:'60~75분',photoTips:['露德圣母堂: 노란 성당 측면과 전신 인물','沙面大街: 가로수와 가로등 길게 찍기','汇丰银行旧址: 기둥 사이 대칭 구도'],tips:['일부 건물은 현재 업무시설 · 내부 출입 제한','공유 자전거 및 통행 차량 주의'],image:'https://commons.wikimedia.org/wiki/Special:FilePath/Shamian%20island.jpg?width=1000',imageCredit:'Wikimedia Commons · Rc1959 · CC BY-SA 4.0',imageSource:'https://commons.wikimedia.org/wiki/File:Shamian%20island.jpg',imageStatus:'실제 장소 사진'}),
  cafe:p('cafe','카페 · 미정','沙面 咖啡','카페 선택',23.1085,113.242,'사면도에서 쉴 카페는 아직 미정입니다. 사진이 예쁜 카페와 원하는 메뉴 링크를 Notes에 남겨 주세요.',{duration:'50~60분',badge:'미정 · 링크 모집 중',tips:['사면도와 도보 동선인지 확인','SNS 사진/카페 링크를 Notes에 모아주세요']}),
  laihui:p('laihui','카페 A · 라이후이 커피','来回咖啡 沙面店','카페 옵션',23.1086,113.2422,'예쁜 베이커리와 커피를 즐길 수 있는 사면도의 감성 카페.',{price:'약 ¥44/인',tips:['沙面大街39号','평일 운영시간 재확인']}),
  starbucks:p('starbucks','카페 B · 스타벅스 리저브','星巴克臻选 沙面店','카페 옵션',23.107387,113.243850,'오래된 양옥 외관이 예쁜 카페. 사진 찍고 쉬기 좋습니다.',{price:'약 ¥30~55/잔',tips:['沙面大街50–52号','체인점이어도 건물 외관이 포토스팟']}),
  cathedral:p('cathedral','광저우 성심대성당 · 선택','石室圣心大教堂','선택 · 건축',23.1120,113.2594,'고딕 양식 쌍첨탑을 가진 성당. 친구들이 가고 싶으면 외관만 잠깐.',{photoTips:['정문에서 첨탑 둘 다 들어오게','건물 아래 인물을 작게 세워 규모감 표현'],tips:['월요일 내부 관람 불가 안내','정문 주변 외관 접근 가능 여부도 현장 확인','예배 장소 존중'],duration:'15~25분',image:'https://commons.wikimedia.org/wiki/Special:FilePath/Sacred_Heart_Cathedral_of_Guangzhou.jpg?width=1000',imageCredit:'Wikimedia Commons · 钉钉 · CC BY-SA 4.0',imageSource:'https://commons.wikimedia.org/wiki/File:Sacred_Heart_Cathedral_of_Guangzhou.jpg',imageStatus:'실제 장소 사진'}),
  dinner:p('dinner','저녁식사 · 미정','北京路 粤菜 点心','저녁 선택',23.1208,113.2678,'저녁 식당은 아직 미정입니다. 베이징루 주변을 우선으로 SNS 링크나 먹고 싶은 메뉴를 모아 선택하세요.',{duration:'60~90분',badge:'미정 · 링크 모집 중',tips:['베이징루까지 이동하기 좋은 위치인지 확인','SNS 링크/메모를 남기면 친구들과 비교하기 편합니다']}),
  xiaobing:p('xiaobing','저녁 A · 샤오빙성','小炳胜 北京路店','저녁 옵션',23.1210,113.2680,'흑차슈·광둥식 닭요리·여러 볶음요리를 셋이 나누어 먹기 좋습니다.',{price:'약 ¥80~110/인'}),
  taodinner:p('taodinner','저녁 B · 타오타오쥐','陶陶居酒家 北京路店','저녁 옵션',23.1205,113.2685,'홍미창펀과 새우딤섬, 구운 거위.',{price:'약 ¥80~130/인'}),
  diandude:p('diandude','저녁 C · 점도덕 베이징루','点都德 北京路贰店','저녁 옵션',23.1242,113.2678,'홍미창펀과 여러 종류의 광둥식 딤섬.',{price:'약 ¥60~90/인',tips:['홍미창펀 주문 가능 여부 확인']}),
  jufulou:p('jufulou','저녁 D · 점도덕 쥐푸러우','点都德 聚福楼店','저녁 옵션',23.1196,113.2668,'관광지 내에서 딤섬을 편하게 즐기는 대안.',{price:'약 ¥60~90/인',tips:['영업 종료시간 확인']}),
  beijing:p('beijing','베이징루 보행자거리','北京路步行街','야경·쇼핑',23.1215,113.2675,'상점과 길거리 음식이 가득한 광저우 야간 관광거리.',{photoTips:['네온 간판과 거리 인파를 함께','보행자거리 천년 고도 유리 바닥 구역 촬영'],tips:['저녁 혼잡 · 소지품 주의','거리 바닥 유적 구역은 사진 찍는 관광객 많음'] ,duration:'60~120분',image:'https://commons.wikimedia.org/wiki/Special:FilePath/20250222_Street_scene_of_Beijing_Road_01.jpg?width=1000',imageCredit:'Wikimedia Commons · Windmemories · CC BY-SA 4.0',imageSource:'https://commons.wikimedia.org/wiki/File:20250222_Street_scene_of_Beijing_Road_01.jpg',imageStatus:'실제 장소 사진'}),
  dafo:p('dafo','대불사 · 황금빛 야경','大佛寺 广州','야경 포토',23.1201,113.2669,'밤에 조명 켜진 웅장한 절. 베이징루의 대표적인 SNS 야경 스팟.',{photoTips:['건물 전체가 나오게 멀리서 0.5배','인물은 하단 중앙에 작게','조명이 켜지는 시간은 당일 확인'],tips:['종교시설이므로 내부 촬영 규칙 존중','유명 포토스팟은 혼잡'],image:'https://commons.wikimedia.org/wiki/Special:FilePath/Front_of_the_Great_Buddha_Temple_in_Guangzhou%2C_at_night.jpg?width=1000',imageCredit:'Wikimedia Commons · xiquinhosilva · CC BY 2.0',imageSource:'https://commons.wikimedia.org/wiki/File:Front_of_the_Great_Buddha_Temple_in_Guangzhou%2C_at_night.jpg',imageStatus:'실제 장소 사진'}),
  packing:p('packing','출발 전 짐 정리','广州 酒店 退房','체크리스트',G.lat,G.lng,'여권·짐·전날 구매한 간식·배터리 기내 반입 조건 확인.',{tips:['호텔 체크아웃 후 공항 직행','액체류와 수하물 무게 점검']}),
  flight:p('flight','대한항공 KE868','广州白云国际机场T2 → 仁川机场T2','항공편',23.3860,113.2998,'2026.10.20 12:40 광저우 출발 → 17:15 인천 도착.',{tips:['항공편 시간은 제공된 예약 내역 기준','사전 웹 체크인 가능 시 이용','국제선 공항 도착 3시간 전 목표']})
};
