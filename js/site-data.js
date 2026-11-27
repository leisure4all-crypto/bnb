// 바비앤밥 홈페이지에서 고치는 내용입니다.
// 이 파일을 저장한 뒤 브라우저를 새로고침하면 화면에 반영됩니다.
// 사진 파일은 images 폴더에 넣고, 아래 image 경로와 파일명을 맞춥니다.
//
// 비워 두면 화면에 나오지 않는 항목: hours.open, parking.dedicated, groupSeats

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

  menu: [
    {
      name: "바비 좋아! 브런치 세트",
      price: 14900,
      image: "images/menu-brunch.jpg",
      alt: "바비 좋아! 브런치 세트",
    },
    {
      name: "새우 알리오 올리오",
      price: 12900,
      image: "images/menu-shrimp-aglio.jpg",
      alt: "새우 알리오 올리오",
    },
    {
      name: "아보카도 명란비빔밥",
      price: 11900,
      image: "images/menu-avocado-bibimbap.jpg",
      alt: "아보카도 명란비빔밥",
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
};
