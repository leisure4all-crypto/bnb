// 화면을 그립니다. 문구·가격·영업시간은 js/site-data.js에서 고칩니다.

// 메뉴 탭 순서입니다. site-data.js의 category 값과 같아야 합니다.
const TAB_ORDER = ["브런치", "밥·포케", "파스타", "커피", "음료"];

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
    hero(d),
    about(d),
    menu(d),
    group(d, tel),
    reviews(d),
    space(d),
    visit(d, tel),
    "</main>",
    footer(d),
    dock(d, tel),
  ].join("");
}

function header(d, tel) {
  return [
    '<header class="nav" id="top"><div class="container nav__inner">',
    '<a class="wordmark" href="#top" aria-label="' + esc(d.name) + ', 맨 위로">' + esc(d.name) + "</a>",
    '<nav aria-label="주요 메뉴"><ul class="nav__links">',
    '<li><a href="#menu">메뉴</a></li>',
    '<li><a href="#group">단체 도시락</a></li>',
    '<li><a href="#space">공간</a></li>',
    '<li><a href="#reviews">후기</a></li>',
    '<li><a href="#visit">찾아오시는 길</a></li>',
    "</ul></nav>",
    '<a class="nav__tel link" href="' + esc(tel) + '">' + esc(d.phone) + "</a>",
    "</div></header>",
  ].join("");
}

function hero(d) {
  const h = d.hero;
  const sub = String(h.title).replace(/\n/g, " ");
  const lead = (d.menu || [])[0];
  const cap = lead ? splitNote(lead.name).main.replace(/~/g, " ").trim() + ", " + won(lead.price) + "원" : "";
  return [
    '<section class="hero" aria-labelledby="hero-title"><div class="container hero__grid">',
    '<div class="hero__copy">',
    '<h1 id="hero-title">' + esc(d.name) + "</h1>",
    '<p class="lead hero__sub">' + esc(sub) + "</p>",
    '<div class="actions"><a class="btn" href="#menu">메뉴 보기</a>',
    ext(d.links.naverMap, "네이버 지도에서 보기", "link"),
    "</div>",
    '<p class="hero__hours">' + esc(hoursText(d.hours)) + ", " + esc(d.hours.closed) + "</p>",
    "</div>",
    '<figure class="hero__figure">',
    '<div class="photo photo--hero" data-slot="hero" data-alt="대표 메뉴 한 접시, 창가 자연광">' +
      '<img src="images/menu-brunch.jpg" width="1200" height="900" alt="' + esc(h.alt || "바비 좋아! 브런치 세트") + '" fetchpriority="high" decoding="async" /></div>',
    cap ? "<figcaption>" + esc(cap) + "</figcaption>" : "",
    "</figure>",
    "</div></section>",
  ].join("");
}

function about(d) {
  const a = d.about;
  if (!a || !a.paragraphs || !a.paragraphs.length) return "";
  const paras = a.paragraphs.slice();
  const last = paras.pop();
  const notices = (d.notices || []).map((n) => "<li>" + esc(n) + "</li>").join("");
  return [
    '<section class="section about" aria-labelledby="about-title"><div class="container about__grid">',
    '<div class="about__head"><h2 id="about-title">' + esc(a.title) + "</h2>",
    '<p class="about__close">' + esc(last) + "</p>",
    notices ? '<ul class="tags">' + notices + "</ul>" : "",
    "</div>",
    '<ol class="about__rows">' + paras.map((p) => "<li>" + esc(p) + "</li>").join("") + "</ol>",
    "</div></section>",
  ].join("");
}

function splitNote(name) {
  const m = String(name).match(/^(.*?)\(([^)]+)\)\s*$/);
  return m ? { main: m[1], note: m[2] } : { main: name, note: "" };
}

function menuRow(item) {
  const n = splitNote(item.name);
  const thumb = item.image
    ? '<img class="row__img" src="' + esc(item.image) + '" width="96" height="96" alt="" loading="lazy" decoding="async" />'
    : '<span class="row__img row__img--empty" aria-hidden="true"></span>';
  return [
    '<li class="row">',
    thumb,
    '<h3 class="row__name">' + esc(n.main) + (n.note ? ' <span class="row__note">' + esc(n.note) + "</span>" : "") + "</h3>",
    '<data class="row__price" value="' + esc(item.price) + '">' + won(item.price) + "원</data>",
    "</li>",
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
    '<section class="section menu" id="menu" aria-labelledby="menu-title"><div class="container">',
    '<div class="menu__head"><h2 id="menu-title">메뉴</h2>',
    '<div class="tabs" role="tablist" aria-label="메뉴 분류">' + tabBtns + "</div></div>",
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
        '<li><figure class="lunch">' +
        '<img class="lunch__img" src="' + esc(it.image) + '" width="600" height="800" alt="' + esc(it.alt || it.name) + '" loading="lazy" decoding="async" />' +
        "<figcaption>" + esc(it.name) + "</figcaption></figure></li>"
    )
    .join("");
  return [
    '<section class="section group" id="group" aria-labelledby="group-title"><div class="container group__head">',
    '<h2 id="group-title">' + esc(g.title) + "</h2>",
    '<div class="group__copy">' + paras,
    g.priceNote ? '<p class="group__price">' + esc(g.priceNote) + "</p>" : "",
    '<div class="actions"><a class="btn" href="' + esc(tel) + '">' + esc(g.phoneLabel) + "</a>",
    ext(d.links.daangn, g.daangnLabel, "link"),
    "</div></div></div>",
    '<ul class="rail" tabindex="0" aria-label="단체 도시락 사진">' + imgs + "</ul>",
    "</section>",
  ].join("");
}

function space(d) {
  const items = (d.spaces || [])
    .filter((s) => s.icon !== "alley")
    .map(
      (s, i) =>
        '<figure class="room room--' + (i + 1) + '">' +
        '<img class="room__img" src="' + esc(s.image) + '" width="1400" height="1050" alt="' + esc(s.alt || s.name) + '" loading="lazy" decoding="async" />' +
        "<figcaption>" + esc(s.name) + "</figcaption></figure>"
    )
    .join("");
  return [
    '<section class="section space" id="space" aria-labelledby="space-title"><div class="container">',
    '<h2 id="space-title">공간</h2>',
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
        '<li><blockquote class="quote"><p>' + esc(it.text) + "</p><footer>" +
        esc(it.author) + "님, " + esc(it.source) + ", " + esc(monthOf(it.date)) + "</footer></blockquote></li>"
    )
    .join("");
  return [
    '<section class="section reviews" id="reviews" aria-labelledby="reviews-title"><div class="container reviews__grid">',
    '<div class="reviews__head"><h2 id="reviews-title">' + esc(r.title) + "</h2>",
    '<div class="actions actions--stack">',
    ext(r.naverUrl, "네이버 후기 전체 보기", "link"),
    ext(r.daangnUrl, "당근 후기 보기", "link"),
    "</div></div>",
    '<ul class="quotes">' + cards + "</ul>",
    "</div></section>",
  ].join("");
}

function visit(d, tel) {
  const rows = [
    ["영업시간", hoursText(d.hours), "facts__lead"],
    ["휴무", d.hours.closed],
    ["주소", d.address],
    ["위치 안내", d.locationNote],
    ["주차", d.parking && d.parking.dedicated ? d.parking.dedicated + ", " + d.parking.nearby : d.parking && d.parking.nearby],
    ["단체석", d.groupSeats],
  ]
    .filter((r) => r[1])
    .map((r) => "<div" + (r[2] ? ' class="' + r[2] + '"' : "") + "><dt>" + esc(r[0]) + "</dt><dd>" + esc(r[1]) + "</dd></div>")
    .join("");
  const alley = (d.spaces || []).find((s) => s.icon === "alley");
  return [
    '<section class="section visit" id="visit" aria-labelledby="visit-title"><div class="container visit__grid">',
    '<div class="visit__body"><h2 id="visit-title">찾아오시는 길</h2>',
    '<dl class="facts">' + rows + '<div><dt>전화</dt><dd><a href="' + esc(tel) + '">' + esc(d.phone) + "</a></dd></div></dl>",
    '<div class="actions">' + ext(d.links.naverMap, "네이버 지도 열기", "btn") +
      '<a class="link" href="' + esc(tel) + '">전화하기</a></div></div>',
    alley
      ? '<figure class="visit__photo"><img class="visit__img" src="' + esc(alley.image) + '" width="1671" height="1800" alt="' + esc(alley.alt) +
        '" loading="lazy" decoding="async" /><figcaption>골목 입구에서 이 간판을 찾으세요.</figcaption></figure>'
      : "",
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
    '<footer class="footer"><div class="container footer__inner">',
    '<p class="footer__name">' + esc(d.name) + "</p>",
    '<p class="footer__address">' + esc(d.address) + ", " + esc(d.locationNote) + "</p>",
    '<ul class="footer__links">' + links + "</ul>",
    "</div></footer>",
  ].join("");
}

function dock(d, tel) {
  return [
    '<nav class="dock" aria-label="바로 연결">',
    '<a class="btn btn--dock" href="' + esc(tel) + '">전화하기</a>',
    ext(d.links.naverMap, "지도 열기", "btn btn--quiet"),
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
