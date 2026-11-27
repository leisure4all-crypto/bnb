// 바비앤밥 홈페이지에서 고치는 내용입니다.
// 이 파일을 저장한 뒤 브라우저를 새로고침하면 화면에 반영됩니다.
// 사진 파일은 images 폴더에 넣고, 아래 image 경로와 파일명을 맞춥니다.
//
// 비워 두면 화면에 나오지 않는 항목:
// hours.open, parking.dedicated, groupSeats, about.ownerName, about.openedYear, about.story

const SITE_DATA = {
  name: "바비앤밥",
  phone: "033-910-2018",
  address: "강원특별자치도 춘천시 후석로46번길 8, 1층",
  locationNote: "석사동 행정복지센터 뒤편",

  // 개점 시각이 확정되면 open에 "10:00"처럼 넣습니다.
  // open이 비어 있으면 openPending 문구가 표시됩니다.
  hours: {
    days: "월~토",
    open: "",
    close: "20:00",
    closed: "매주 일요일 휴무",
    openPending: "개점 시간 확인 후 입력",
  },

  parking: {
    nearby: "인근 석사노외주차장(벌말공원)",
    // 매장 전용 주차가 확정되면 한 줄로 입력합니다. 예: "매장 앞 2대"
    dedicated: "",
  },

  // 단체석 인원이 확정되면 입력합니다. 예: "8명"
  groupSeats: "",

  links: {
    naverMap: "https://map.naver.com/p/entry/place/1602365930",
    instagram: "https://www.instagram.com/barbie_and_bob/",
    daangn: "https://www.daangn.com/kr/local-profile/바비앤밥-drmvd9xzzhk3/",
    facebook: "https://www.facebook.com/profile.php?id=100013673626427",
  },

  // 아래 사진 파일은 네이버 플레이스 바비앤밥에 매장이 올린 메뉴·매장 사진입니다.
  // 창가 사진은 당근에 매장이 올린 커튼 창 사진입니다.
  hero: {
    image: "images/hero-bg.jpg",
    alt: "창가 테이블의 브런치와 아이스커피",
    title: "춘천 석사동,\n브런치 한 접시",
    intro:
      "스크램블에그와 라이스커틀릿을 곁들인 브런치, 파스타와 든든한 밥 메뉴도 준비합니다.",
  },

  // 네이버 플레이스 메뉴 순서입니다. 봉골레파스타만 당근 가격표에 있어 파스타 뒤에 두었습니다.
  // 봉골레 사진은 없어서 image를 비워 두었습니다. 파일을 넣으면 빈 자리가 사라집니다.
  menu: [
    {
      name: "바비 좋아! 브런치~세트",
      price: 14900,
      image: "images/menu-brunch.jpg",
      alt: "바비 좋아! 브런치~세트",
    },
    {
      name: "바비 좋아! 브런치~",
      price: 12900,
      image: "images/menu-brunch-plate.jpg",
      alt: "바비 좋아! 브런치~",
    },
    {
      name: "아보카도명란비빔밥",
      price: 11900,
      image: "images/menu-avocado-bibimbap.jpg",
      alt: "아보카도명란비빔밥",
    },
    {
      name: "새우포케",
      price: 11900,
      image: "images/menu-shrimp-poke.jpg",
      alt: "새우포케",
    },
    {
      name: "닭가슴살포케",
      price: 11900,
      image: "images/menu-chicken-poke.jpg",
      alt: "닭가슴살포케",
    },
    {
      name: "새우알리오올리오",
      price: 12900,
      image: "images/menu-shrimp-aglio.jpg",
      alt: "새우알리오올리오",
    },
    {
      name: "미트소스파스타",
      price: 12900,
      image: "images/menu-meat-pasta.jpg",
      alt: "미트소스파스타",
    },
    {
      name: "크림파스타",
      price: 12900,
      image: "images/menu-cream-pasta.jpg",
      alt: "크림파스타",
    },
    {
      name: "봉골레파스타",
      price: 12900,
      image: "",
      alt: "봉골레파스타",
    },
    {
      name: "해물볶음밥",
      price: 10900,
      image: "images/menu-seafood-rice.jpg",
      alt: "해물볶음밥",
    },
    {
      name: "김치볶음밥",
      price: 7900,
      image: "images/menu-kimchi-rice.jpg",
      alt: "김치볶음밥",
    },
    {
      name: "오늘의스프",
      price: 5900,
      image: "images/menu-soup.jpg",
      alt: "오늘의스프",
    },
    {
      name: "아메리카노(HOT&ICE)",
      price: 3500,
      image: "images/menu-americano.jpg",
      alt: "아메리카노(HOT&ICE)",
    },
    {
      name: "헤이즐럿(HOT&ICE)",
      price: 4000,
      image: "images/menu-hazelnut.jpg",
      alt: "헤이즐럿(HOT&ICE)",
    },
    {
      name: "카푸치노",
      price: 4000,
      image: "images/menu-cappuccino.jpg",
      alt: "카푸치노",
    },
    {
      name: "카페라떼(HOT&ICE)",
      price: 4000,
      image: "images/menu-latte.jpg",
      alt: "카페라떼(HOT&ICE)",
    },
    {
      name: "돌체(연유)라떼(HOT&ICE)",
      price: 4500,
      image: "images/menu-dolce-latte.jpg",
      alt: "돌체(연유)라떼(HOT&ICE)",
    },
    {
      name: "바닐라라떼(HOT&ICE)",
      price: 4500,
      image: "images/menu-vanilla-latte.jpg",
      alt: "바닐라라떼(HOT&ICE)",
    },
    {
      name: "카라멜마끼아또(HOT&ICE)",
      price: 4500,
      image: "images/menu-caramel-macchiato.jpg",
      alt: "카라멜마끼아또(HOT&ICE)",
    },
    {
      name: "카페모카(HOT&ICE)",
      price: 5000,
      image: "images/menu-mocha.jpg",
      alt: "카페모카(HOT&ICE)",
    },
    {
      name: "식혜",
      price: 4000,
      image: "images/menu-sikhye.jpg",
      alt: "식혜",
    },
    {
      name: "수박주스",
      price: 6000,
      image: "images/menu-watermelon-juice.jpg",
      alt: "수박주스",
    },
    {
      name: "패션후르츠에이드",
      price: 6000,
      image: "images/menu-passion-ade.jpg",
      alt: "패션후르츠에이드",
    },
    {
      name: "자몽에이드(착즙)",
      price: 6000,
      image: "images/menu-grapefruit-ade.jpg",
      alt: "자몽에이드(착즙)",
    },
    {
      name: "청귤에이드(수제청)",
      price: 6000,
      image: "images/menu-green-tangerine-ade.jpg",
      alt: "청귤에이드(수제청)",
    },
    {
      name: "레몬에이드(수제청)",
      price: 6000,
      image: "images/menu-lemon-ade.jpg",
      alt: "레몬에이드(수제청)",
    },
    {
      name: "딸기에이드(수제청)",
      price: 6000,
      image: "images/menu-strawberry-ade.jpg",
      alt: "딸기에이드(수제청)",
    },
    {
      name: "딸기라떼(수제청)",
      price: 6000,
      image: "images/menu-strawberry-latte.jpg",
      alt: "딸기라떼(수제청)",
    },
    {
      name: "청포도에이드",
      price: 6000,
      image: "images/menu-green-grape-ade.jpg",
      alt: "청포도에이드",
    },
    {
      name: "복숭아아이스티",
      price: 4000,
      image: "images/menu-peach-tea.jpg",
      alt: "복숭아아이스티",
    },
    {
      name: "레몬차(수제청)",
      price: 5000,
      image: "images/menu-lemon-tea.jpg",
      alt: "레몬차(수제청)",
    },
    {
      name: "청귤차(수제청)",
      price: 5000,
      image: "images/menu-green-tangerine-tea.jpg",
      alt: "청귤차(수제청)",
    },
    {
      name: "유자차",
      price: 4000,
      image: "images/menu-yuja-tea.jpg",
      alt: "유자차",
    },
    {
      name: "핫초코",
      price: 4500,
      image: "images/menu-hot-chocolate.jpg",
      alt: "핫초코",
    },
  ],

  spaces: [
    {
      name: "창가",
      image: "images/space-window.jpg",
      alt: "커튼을 친 창가",
      icon: "window",
    },
    {
      name: "매장 전경",
      image: "images/space-interior.jpg",
      alt: "매장 전경",
      icon: "store",
    },
    {
      name: "내부",
      image: "images/space-room.jpg",
      alt: "매장 내부",
      icon: "store",
    },
    {
      name: "홀",
      image: "images/space-hall.jpg",
      alt: "테이블과 카운터가 있는 홀",
      icon: "store",
    },
    {
      name: "골목 입구",
      image: "images/space-alley.jpg",
      alt: "바비앤밥 입구",
      icon: "alley",
    },
  ],

  notices: ["반려동물 동반 가능", "포장·예약 문의"],

  // 메뉴 바로 아래. 당근 소식에 매장이 쓴 단체 도시락 안내입니다. 가격은 구성마다 달라 비워 둡니다.
  group: {
    title: "단체 도시락 주문",
    paragraphs: [
      "원하시는 구성으로 단체 도시락을 주문할 수 있습니다.",
      "15인 이상은 춘천시내 기준 무료배달이 됩니다.",
      "소규모 모임은 한 팀만 쓰는 공간으로, 메뉴와 가격을 조율해 문의할 수 있습니다.",
    ],
    phoneLabel: "전화로 주문",
    daangnLabel: "당근에서 주문",
    // 확정 가격이 있으면 적습니다. 비어 있으면 숨깁니다.
    priceNote: "",
    // 당근 단체 도시락 소식에 매장이 올린 사진입니다. 따로 적힌 메뉴명·가격은 없습니다.
    images: [
      { name: "샌드위치 도시락", image: "images/lunch-sandwich.jpg", alt: "샌드위치와 김밥 도시락" },
      { name: "모둠 도시락", image: "images/lunch-set.jpg", alt: "샌드위치, 김밥, 튀김이 담긴 도시락" },
      { name: "김밥 도시락", image: "images/lunch-gimbap.jpg", alt: "김밥과 샌드위치가 담긴 도시락" },
      { name: "브런치 도시락", image: "images/lunch-brunch.jpg", alt: "소시지와 마늘빵이 담긴 도시락" },
      { name: "간식 도시락", image: "images/lunch-snack.jpg", alt: "샌드위치와 음료가 담긴 도시락" },
      { name: "볶음밥 도시락", image: "images/lunch-rice.jpg", alt: "볶음밥 도시락" },
      { name: "한식 도시락", image: "images/lunch-korean.jpg", alt: "밥과 반찬이 담긴 도시락" },
    ],
  },

  // 네이버 방문자 리뷰와 당근 후기입니다. 글이 비어 있으면 카드가 나오지 않습니다.
  reviews: {
    title: "후기",
    naverUrl: "https://m.place.naver.com/restaurant/1602365930/review/visitor",
    daangnUrl: "https://www.daangn.com/kr/local-profile/바비앤밥-drmvd9xzzhk3/",
    items: [
      {
        source: "네이버 방문자 리뷰",
        author: "여의도깍쟁이",
        rating: "5",
        date: "2026년 11월 6일",
        text: "고구마라떼 맛잇어요 🤎🤎🤎",
      },
      {
        source: "네이버 방문자 리뷰",
        author: "gpf****",
        rating: "5",
        date: "2026년 10월 30일",
        text: "라떼가 정말 맛있어요♡",
      },
      {
        source: "네이버 방문자 리뷰",
        author: "스완구",
        rating: "5",
        date: "2026년 10월 16일",
        text: "매장도 쾌적하고 음식도 맛있고 사장님 친절하세요 ㅎㅎ 즐거운 식사시간이었습니다!",
      },
      {
        source: "네이버 방문자 리뷰",
        author: "ke****",
        rating: "5",
        date: "2026년 8월 4일",
        text: "요즘 무겁지 않으면서도 포만감 있는 브런치를 찾다가 정말 맛있는 포케집을 발견했어요. 평소 샐러드는 금방 배가 꺼져서 아쉬웠는데, 이곳의 닭가슴살 포케는 비주얼부터 맛까지 아주 훌륭했습니다. 무엇보다 매장이 깔끔하고 오픈 키친이라 위생적으로 더 믿음이 가더라고요 분위기도 편안하고 쾌적해서 혼밥하기에 좋았어요 맛있게잘먹었습니다",
      },
      {
        source: "네이버 방문자 리뷰",
        author: "he****",
        rating: "5",
        date: "2026년 6월 16일",
        text: "다이어트중이라 포케먹으러 또재방문했어요 여기 파스타랑 김치볶음밥도 맛도리인데 살빼야하는일인으로 쫌만 참쟈참쟈ㅠㅠ 친구는 샌드위치 전 닭가슴산포케 주문했는데 역시 야채들신선하고 양도 듬뿍 아쥬 만족스런 한끼였어요 사장님들도 넘나리 친절하셔서 올때마다 기분좋게 먹고갑니다 젤리 서비스도 감동",
      },
      {
        source: "네이버 방문자 리뷰",
        author: "he****",
        rating: "5",
        date: "2026년 5월 22일",
        text: "다이어트중이라 닭가슴살포케 포장해왔어요 가격도 저렴하고 양도 푸짐 야채도 신선하고 소스도 3가지나 챙겨주셔서 너무 맛있게 먹었어요~ 살도 덜찌는데 맛까지 있으니 좋아요^^",
      },
      {
        source: "네이버 방문자 리뷰",
        author: "전국구맛집탐방",
        rating: "5",
        date: "2026년 4월 27일",
        text: "매장 전체가 깔끔하고 혼밥하기에도 좋은 것 같아요~ 오픈키친 느낌이라 위생도 깔끔하게 신경쓰시는 것 같고 오늘의 스프도 매번 바뀌는 거 같아요 길 찾기도 어렵지 않았어용",
      },
      {
        source: "네이버 방문자 리뷰",
        author: "박희진9",
        rating: "5",
        date: "2026년 6월 16일",
        text: "근처왔다가 혼밥하러왔어요 기분이 별로 좋지 않았는데 편안한분위기에 위안삼고 맛나게 먹고갑니다",
      },
      {
        source: "네이버 방문자 리뷰",
        author: "hye****",
        rating: "4.5",
        date: "2026년 5월 20일",
        text: "재료가 너무 신선하고 맛있었던 포케~~ 친절하신 사장님의 프레첼 서비스까지 너무 기분 좋게 식사를 마쳤어요^^ 자주 올께요!!",
      },
      {
        source: "당근 후기",
        author: "신난다",
        rating: "5",
        date: "2026년 1월 2일",
        text: "친절하고 음식또한 맛있어요~",
      },
      {
        source: "당근 후기",
        author: "보고싶은쪼꼬미",
        rating: "5",
        date: "2025년 12월 22일",
        text: "붕어빵 맛집이네요. 주문받고 바로 구워줘서 바삭하고 맛있어요~",
      },
      {
        source: "당근 후기",
        author: "시나몬",
        rating: "3",
        date: "2025년 11월 30일",
        text: "커피도 맛있고 브런치도 맛집",
      },
    ],
  },

  // 페이지 맨 위, 첫 화면 앞에 나옵니다. paragraphs의 문장을 고치거나 줄을 빼면 화면에 반영됩니다.
  about: {
    title: "바비앤밥 소개",
    paragraphs: [
      "석사동 행정복지센터 뒤편 골목의 브런치 카페입니다.",
      "스크램블에그와 라이스커틀릿을 곁들인 브런치를 준비하고, 파스타와 밥 메뉴도 함께 냅니다.",
      "반려동물과 함께 오셔도 되고, 포장과 소규모 모임, 단체 도시락은 전화나 당근으로 문의하실 수 있습니다.",
      "잠시 편안하게 머물다 가실 수 있도록 준비합니다.",
    ],
    // 확인된 뒤에만 입력합니다. 비어 있으면 숨깁니다.
    // openedYear는 연도만 적습니다. 예: "2019"
    ownerName: "",
    openedYear: "",
    story: "",
  },
};
