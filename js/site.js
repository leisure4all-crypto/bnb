// 화면을 그립니다. 문구·가격·영업시간은 js/site-data.js에서 고칩니다.

// 메뉴 탭 순서입니다. site-data.js의 category 값과 같아야 합니다.
const TAB_ORDER = ["브런치", "밥·포케", "파스타", "커피", "음료"];

const HERO_SCENE =
  '<div class="hero__sun" aria-hidden="true"></div>' +
  '<svg class="hero__lake" viewBox="0 0 1440 260" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">' +
  '<path fill="#d3ddf0" d="M0 150C120 110 200 60 300 95C380 120 430 70 520 40C600 15 650 60 720 90C800 125 880 95 960 70C1060 40 1120 85 1200 110C1290 135 1370 100 1440 85L1440 260L0 260Z"/>' +
  '<path fill="#b3c4e3" d="M0 190C100 160 190 150 280 165C380 182 450 140 560 130C660 122 740 170 840 175C960 182 1040 135 1150 140C1260 146 1350 175 1440 165L1440 260L0 260Z"/>' +
  '<path fill="#dfe6f4" d="M0 208L1440 208L1440 260L0 260Z"/>' +
  '<g fill="none" stroke="#2a4a9a" stroke-opacity=".28" stroke-width="2" stroke-linecap="round">' +
  '<path d="M120 220h90M330 228h140M610 221h100M860 229h160M1130 222h110M1290 230h80"/>' +
  '<path d="M40 236h70M240 240h110M520 237h90M760 241h120M1040 238h90M1230 242h140"/>' +
  '</g>' +
  '<path fill="#fbfbf8" d="M0 247C240 237 480 257 720 247C960 237 1200 257 1440 247L1440 260L0 260Z"/>' +
  "</svg>" +
  '<div class="hero__mist hero__mist--b" aria-hidden="true"></div>' +
  '<div class="hero__mist hero__mist--a" aria-hidden="true"></div>' +
  '<div class="hero__fog" aria-hidden="true"></div>';

const FOOTER_RIDGE =
  '<svg class="footer__ridge" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">' +
  '<path fill="#2a3a66" d="M0 70C140 40 240 20 340 48C440 76 520 30 640 18C760 6 820 52 940 60C1060 68 1140 28 1260 34C1340 38 1400 56 1440 50L1440 100L0 100Z"/>' +
  '<path fill="#172447" d="M0 88C160 66 280 62 400 76C520 90 600 60 720 58C860 56 940 92 1080 88C1200 84 1320 64 1440 72L1440 100L0 100Z"/>' +
  "</svg>";

(function () {
  const app = document.getElementById("app");
  if (!app) return;

  if (typeof SITE_DATA === "undefined") {
    app.textContent = "js/site-data.js를 찾지 못했습니다.";
    return;
  }

  try {
    render(app, SITE_DATA);
    bindTabs(app);
  } catch (error) {
    app.textContent = "페이지를 표시하지 못했습니다. js/site-data.js 내용을 확인해 주세요.";
    console.error(error);
  }
})();


function esc(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function won(n) {
  return Number(n).toLocaleString("ko-KR");
}

function hoursText(h) {
  if (!h.open) return h.days + " " + h.openPending;
  return h.days + " " + h.open + "–" + h.close;
}

function ext(href, label, cls) {
  return '<a class="' + cls + '" href="' + esc(href) + '" target="_blank" rel="noopener noreferrer">' + esc(label) + "</a>";
}

function photo(src, alt, cls) {
  if (!src) return "";
  return '<img class="' + cls + '" src="' + esc(src) + '" alt="' + esc(alt) + '" loading="lazy" decoding="async" />';
}

function render(app, d) {
  const tel = "tel:" + d.phone;
  app.innerHTML = [
    header(d, tel),
    '<main id="main" tabindex="-1">',
    hero(d, tel),
    about(d),
    menu(d),
    group(d, tel),
    space(d),
    reviews(d),
    visit(d, tel),
    "</main>",
    footer(d),
    dock(d, tel),
  ].join("");
}

function header(d, tel) {
  return [
    '<header class="header" id="top"><div class="wrap header__inner">',
    '<a class="logo" href="#top">' + esc(d.name) + '<span class="logo__yolk" aria-hidden="true"></span></a>',
    '<nav class="nav" aria-label="주요 메뉴"><ul>',
    '<li><a href="#menu">메뉴</a></li>',
    '<li><a href="#group">단체 도시락</a></li>',
    '<li><a href="#space">공간</a></li>',
    '<li><a href="#reviews">후기</a></li>',
    '<li><a href="#visit">찾아오시는 길</a></li>',
    "</ul></nav>",
    '<a class="btn btn--yolk header__cta" href="' + esc(tel) + '">' + esc(d.phone) + "</a>",
    "</div></header>",
  ].join("");
}

function hero(d, tel) {
  const h = d.hero;
  const sub = String(h.title).replace(/\n/g, " ");
  const notices = (d.notices || []).map((n) => "<li>" + esc(n) + "</li>").join("");
  return [
    '<section class="hero" aria-labelledby="hero-title">' + HERO_SCENE + '<div class="wrap hero__grid">',
    '<div class="hero__copy">',
    '<h1 id="hero-title" class="hero__name">' + esc(d.name) + "</h1>",
    '<p class="hero__sub">' + esc(sub) + "</p>",
    '<p class="hero__intro">' + esc(h.intro) + "</p>",
    '<div class="hero__actions"><a class="btn btn--navy" href="#menu">메뉴 보기</a>',
    ext(d.links.naverMap, "네이버 지도에서 보기", "btn btn--line"),
    "</div></div>",
    '<div class="hero__stage">',
    '<img class="hero__photo" src="images/menu-brunch.jpg" alt="' + esc(h.alt || "바비 좋아! 브런치 세트") + '" fetchpriority="high" />',
    '<aside class="ticket" aria-label="영업 안내">',
    '<div class="ticket__head"><p class="ticket__title">영업 안내</p>' +
      '<p class="ticket__state">' + esc(d.hours.closed) + "</p></div>",
    '<dl class="ticket__list">',
    "<div><dt>영업시간</dt><dd>" + esc(hoursText(d.hours)) + "</dd></div>",
    "<div><dt>위치</dt><dd>후석로46번길 8, 1층<br />" + esc(d.locationNote) + "</dd></div>",
    '<div><dt>전화</dt><dd><a href="' + esc(tel) + '">' + esc(d.phone) + "</a></dd></div>",
    "</dl>",
    notices ? '<ul class="ticket__tags">' + notices + "</ul>" : "",
    "</aside>",
    "</div>",
    "</div></section>",
  ].join("");
}

function about(d) {
  const a = d.about;
  if (!a || !a.paragraphs || !a.paragraphs.length) return "";
  const paras = a.paragraphs.slice();
  const last = paras.pop();
  return [
    '<section class="section about" aria-labelledby="about-title"><div class="wrap about__grid">',
    '<h2 id="about-title" class="section-title">' + esc(a.title) + "</h2>",
    '<div class="about__text">',
    paras.map((p) => "<p>" + esc(p) + "</p>").join(""),
    '<p class="about__close">' + esc(last) + "</p>",
    "</div></div></section>",
  ].join("");
}

function splitNote(name) {
  const m = String(name).match(/^(.*?)\(([^)]+)\)\s*$/);
  return m ? { main: m[1], note: m[2] } : { main: name, note: "" };
}

function menuRow(item) {
  const n = splitNote(item.name);
  const thumb = item.image
    ? photo(item.image, item.alt || item.name, "row__img")
    : '<span class="row__img row__img--empty" aria-hidden="true"></span>';
  return [
    '<li class="row">',
    thumb,
    '<div class="row__body"><div class="row__line">',
    '<h3 class="row__name">' + esc(n.main) + (n.note ? ' <span class="row__note">' + esc(n.note) + "</span>" : "") + "</h3>",
    '<span class="row__dots" aria-hidden="true"></span>',
    '<data class="row__price" value="' + esc(item.price) + '">' + won(item.price) + "원</data>",
    "</div></div></li>",
  ].join("");
}

function menu(d) {
  const groups = {};
  d.menu.forEach((it) => {
    const c = it.category || "음료";
    (groups[c] = groups[c] || []).push(it);
  });
  const tabs = TAB_ORDER.filter((c) => groups[c]).concat(Object.keys(groups).filter((c) => TAB_ORDER.indexOf(c) < 0));
  const tabBtns = tabs
    .map(
      (c, i) =>
        '<button class="tab" type="button" role="tab" id="tab-' + i + '" aria-controls="panel-' + i + '" aria-selected="' + (i === 0) +
        '" tabindex="' + (i === 0 ? 0 : -1) + '">' + esc(c) + ' <span class="tab__count">' + groups[c].length + "</span></button>"
    )
    .join("");
  const panels = tabs
    .map(
      (c, i) =>
        '<ul class="rows" role="tabpanel" id="panel-' + i + '" aria-labelledby="tab-' + i + '"' + (i === 0 ? "" : " hidden") + ">" +
        groups[c].map(menuRow).join("") + "</ul>"
    )
    .join("");
  return [
    '<section class="section menu" id="menu" aria-labelledby="menu-title"><div class="wrap">',
    '<h2 id="menu-title" class="section-title">메뉴</h2>',
    '<div class="tabs" role="tablist" aria-label="메뉴 분류">' + tabBtns + "</div>",
    panels,
    "</div></section>",
  ].join("");
}

function group(d, tel) {
  const g = d.group;
  if (!g) return "";
  const paras = (g.paragraphs || []).map((p) => "<p>" + esc(p) + "</p>").join("");
  const imgs = (g.images || [])
    .map(
      (it) =>
        '<figure class="lunch__item">' + photo(it.image, it.alt || it.name, "lunch__img") + "<figcaption>" + esc(it.name) + "</figcaption></figure>"
    )
    .join("");
  return [
    '<section class="group" id="group" aria-labelledby="group-title"><div class="wrap group__grid">',
    '<div class="group__copy"><h2 id="group-title" class="section-title">' + esc(g.title) + "</h2>",
    paras,
    g.priceNote ? '<p class="group__price">' + esc(g.priceNote) + "</p>" : "",
    '<div class="hero__actions"><a class="btn btn--yolk" href="' + esc(tel) + '">' + esc(g.phoneLabel) + "</a>",
    ext(d.links.daangn, g.daangnLabel, "btn btn--ghost-light"),
    "</div></div>",
    '<div class="lunch">' + imgs + "</div>",
    "</div></section>",
  ].join("");
}

function space(d) {
  const items = (d.spaces || [])
    .map(
      (s, i) =>
        '<figure class="room room--' + (i + 1) + '">' + photo(s.image, s.alt || s.name, "room__img") + "<figcaption>" + esc(s.name) + "</figcaption></figure>"
    )
    .join("");
  return [
    '<section class="section space" id="space" aria-labelledby="space-title"><div class="wrap">',
    '<h2 id="space-title" class="section-title">공간</h2>',
    '<div class="rooms">' + items + "</div>",
    "</div></section>",
  ].join("");
}

function monthOf(text) {
  const m = String(text || "").match(/(\d{4})년\s*(\d{1,2})월/);
  return m ? m[1] + "년 " + m[2] + "월" : text || "";
}

function reviews(d) {
  const r = d.reviews;
  if (!r) return "";
  const picked = (r.items || []).filter((it) => it.text && it.text.length >= 30).slice(0, 6);
  const cards = picked
    .map(
      (it) =>
        '<blockquote class="quote"><p>' + esc(it.text) + "</p><footer>" +
        esc(it.author) + "님, " + esc(it.source) + ", " + esc(monthOf(it.date)) + "</footer></blockquote>"
    )
    .join("");
  return [
    '<section class="section reviews" id="reviews" aria-labelledby="reviews-title"><div class="wrap">',
    '<h2 id="reviews-title" class="section-title">' + esc(r.title) + "</h2>",
    '<div class="quotes">' + cards + "</div>",
    '<div class="hero__actions">',
    ext(r.naverUrl, "네이버 후기 전체 보기", "btn btn--navy"),
    ext(r.daangnUrl, "당근 후기 보기", "btn btn--line"),
    "</div></div></section>",
  ].join("");
}

function visit(d, tel) {
  const rows = [
    ["영업시간", hoursText(d.hours)],
    ["휴무", d.hours.closed],
    ["주소", d.address],
    ["위치 안내", d.locationNote],
    ["주차", d.parking && d.parking.dedicated ? d.parking.dedicated + ", " + d.parking.nearby : d.parking && d.parking.nearby],
    ["단체석", d.groupSeats],
  ]
    .filter((r) => r[1])
    .map((r) => "<div><dt>" + esc(r[0]) + "</dt><dd>" + esc(r[1]) + "</dd></div>")
    .join("");
  const alley = (d.spaces || []).find((s) => s.icon === "alley");
  return [
    '<section class="section visit" id="visit" aria-labelledby="visit-title"><div class="wrap visit__grid">',
    '<div><h2 id="visit-title" class="section-title">찾아오시는 길</h2>',
    '<dl class="facts">' + rows + '<div><dt>전화</dt><dd><a href="' + esc(tel) + '">' + esc(d.phone) + "</a></dd></div></dl>",
    '<div class="hero__actions">' + ext(d.links.naverMap, "네이버 지도 열기", "btn btn--navy") +
      '<a class="btn btn--line" href="' + esc(tel) + '">전화하기</a></div></div>',
    alley ? '<figure class="visit__photo">' + photo(alley.image, alley.alt, "visit__img") + "<figcaption>골목 입구에서 이 간판을 찾으세요.</figcaption></figure>" : "",
    "</div></section>",
  ].join("");
}

function footer(d) {
  const links = [
    ["인스타그램", d.links.instagram],
    ["당근", d.links.daangn],
    ["페이스북", d.links.facebook],
    ["네이버 지도", d.links.naverMap],
  ]
    .filter((l) => l[1])
    .map((l) => "<li>" + ext(l[1], l[0], "footer__link") + "</li>")
    .join("");
  return [
    '<footer class="footer">' + FOOTER_RIDGE + '<div class="wrap footer__inner">',
    '<p class="footer__name">' + esc(d.name) + "</p>",
    '<p class="footer__address">' + esc(d.address) + ", " + esc(d.locationNote) + "</p>",
    '<ul class="footer__links">' + links + "</ul>",
    "</div></footer>",
  ].join("");
}

function dock(d, tel) {
  return [
    '<nav class="dock" aria-label="바로 연결">',
    '<a class="btn btn--yolk" href="' + esc(tel) + '">전화하기</a>',
    ext(d.links.naverMap, "지도 열기", "btn btn--ghost-light"),
    "</nav>",
  ].join("");
}

function bindTabs(app) {
  const tabs = Array.from(app.querySelectorAll(".tab"));
  const panels = Array.from(app.querySelectorAll(".rows"));
  function select(i, focus) {
    tabs.forEach((t, j) => {
      t.setAttribute("aria-selected", String(i === j));
      t.tabIndex = i === j ? 0 : -1;
      panels[j].hidden = i !== j;
    });
    if (focus) tabs[i].focus();
  }
  tabs.forEach((t, i) => {
    t.addEventListener("click", () => select(i, false));
    t.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); select((i + 1) % tabs.length, true); }
      if (e.key === "ArrowLeft") { e.preventDefault(); select((i - 1 + tabs.length) % tabs.length, true); }
    });
  });
}
