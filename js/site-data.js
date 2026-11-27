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
  // 창가 사진(images/space-window.jpg)은 공식 사진이 없어 비어 있습니다.
  hero: {
    image: "images/hero.jpg",
    alt: "바비 좋아! 브런치",
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
      alt: "창가",
      icon: "window",
    },
    {
      name: "매장 전경",
      image: "images/space-interior.jpg",
      alt: "매장 전경",
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

  group: {
    title: "소규모 모임·단체 도시락",
    text: "포장, 소규모 모임, 단체 도시락은 전화 또는 당근으로 문의해 주세요.",
    phoneLabel: "전화 문의",
    daangnLabel: "당근에서 문의",
  },

  // 하단 링크 바로 위에 나오는 소개입니다. paragraphs의 문장을 고치거나 줄을 빼면 화면에 반영됩니다.
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
