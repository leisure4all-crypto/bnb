// 화면을 그립니다. 문구·가격·영업시간은 js/site-data.js에서 고칩니다.

(function () {
  const app = document.getElementById("app");
  if (!app) return;

  if (typeof SITE_DATA === "undefined") {
    app.textContent = "js/site-data.js를 찾지 못했습니다.";
    return;
  }

  try {
    render(app, SITE_DATA);
    bindPhotos(app);
  } catch (error) {
    app.textContent = "페이지를 표시하지 못했습니다. js/site-data.js 내용을 확인해 주세요.";
    console.error(error);
  }
})();

function render(app, data) {
  const phoneHref = "tel:" + data.phone;

  app.innerHTML = [
    headerHtml(data),
    "<main id=\"main\" tabindex=\"-1\">",
    aboutHtml(data),
    heroHtml(data),
    menuHtml(data),
    groupHtml(data, phoneHref),
    spaceHtml(data),
    visitHtml(data, phoneHref),
    "</main>",
    footerHtml(data),
    dockHtml(data, phoneHref),
  ].join("");
}

function headerHtml(data) {
  return [
    '<header class="header" id="top">',
    '<div class="wrap header__inner">',
    '<a class="logo" href="#top"><span class="logo__dot" aria-hidden="true"></span>',
    escapeHtml(data.name),
    "</a>",
    '<nav class="nav" aria-label="주요 메뉴">',
    "<ul>",
    "<li><a href=\"#menu\">메뉴</a></li>",
    "<li><a href=\"#space\">공간</a></li>",
    "<li><a href=\"#visit\">찾아오시는 길</a></li>",
    "</ul>",
    "</nav>",
    externalLink(data.links.naverMap, "네이버 지도", "btn btn--solid header__cta"),
    "</div>",
    "</header>",
  ].join("");
}

function heroHtml(data) {
  const hero = data.hero;
  return [
    '<section class="hero section" aria-labelledby="hero-title">',
    '<div class="wrap hero__grid">',
    '<div class="hero__media">',
    photoFrame({ src: hero.image, alt: hero.alt, icon: "window", variant: "photo--hero" }),
    "</div>",
    '<div class="hero__copy">',
    '<h1 id="hero-title">',
    textToHtml(hero.title),
    "</h1>",
    '<p class="hero__intro">',
    textToHtml(hero.intro),
    "</p>",
    '<div class="hero__actions">',
    '<a class="btn btn--solid" href="#menu">메뉴 보기</a>',
    externalLink(data.links.naverMap, "네이버 지도", "btn btn--ghost"),
    "</div>",
    "</div>",
    "</div>",
    "</section>",
  ].join("");
}

function menuHtml(data) {
  const cards = (data.menu || [])
    .map(function (item) {
      return [
        "<li>",
        '<article class="menu-card">',
        photoFrame({ src: item.image, alt: item.alt || item.name, icon: "plate" }),
        '<div class="menu-card__body">',
        "<h3 class=\"menu-card__name\">",
        escapeHtml(item.name),
        "</h3>",
        '<data class="menu-card__price" value="',
        escapeAttr(item.price),
        '">',
        escapeHtml(formatPrice(item.price)),
        "</data>",
        "</div>",
        "</article>",
        "</li>",
      ].join("");
    })
    .join("");

  return [
    '<section class="section section--menu" id="menu" aria-labelledby="menu-title">',
    '<div class="wrap">',
    '<div class="section-head">',
    '<h2 id="menu-title" class="section-title">메뉴</h2>',
    '<p class="menu-hint">옆으로 넘겨 보세요.</p>',
    "</div>",
    '<ul class="menu-scroller" tabindex="0" aria-label="전체 메뉴. 옆으로 스크롤할 수 있습니다.">',
    cards,
    "</ul>",
    "</div>",
    "</section>",
  ].join("");
}

function spaceHtml(data) {
  const cards = (data.spaces || [])
    .map(function (item) {
      return [
        "<li>",
        "<figure class=\"space-card\">",
        photoFrame({
          src: item.image,
          alt: item.alt || item.name,
          icon: item.icon || "window",
          variant: "photo--tall",
        }),
        "<figcaption>",
        escapeHtml(item.name),
        "</figcaption>",
        "</figure>",
        "</li>",
      ].join("");
    })
    .join("");

  return [
    '<section class="section section--space" id="space" aria-labelledby="space-title">',
    '<div class="wrap">',
    '<div class="section-head">',
    '<h2 id="space-title" class="section-title">공간</h2>',
    '<p class="menu-hint">옆으로 넘겨 보세요.</p>',
    "</div>",
    '<ul class="space-scroller" tabindex="0" aria-label="공간 사진. 옆으로 스크롤할 수 있습니다.">',
    cards,
    "</ul>",
    noticesHtml(data.notices),
    "</div>",
    "</section>",
  ].join("");
}

function groupHtml(data, phoneHref) {
  const group = data.group || {};
  const lines = (group.paragraphs || [group.text])
    .map(function (line) {
      return String(line || "").trim();
    })
    .filter(Boolean);
  if (!lines.length && !group.phoneLabel && !group.daangnLabel && !(group.images || []).length) return "";

  const priceNote = String(group.priceNote || "").trim();
  if (priceNote) lines.push(priceNote);

  const body = lines
    .map(function (line) {
      return '<p class="group-panel__text">' + textToHtml(line) + "</p>";
    })
    .join("");

  const photos = (group.images || [])
    .filter(function (item) {
      return item && String(item.image || "").trim();
    })
    .map(function (item) {
      return [
        "<li>",
        '<article class="menu-card">',
        photoFrame({ src: item.image, alt: item.alt || item.name, icon: "plate" }),
        '<div class="menu-card__body">',
        '<h3 class="menu-card__name">',
        escapeHtml(item.name || ""),
        "</h3>",
        "</div>",
        "</article>",
        "</li>",
      ].join("");
    })
    .join("");

  const scroller = photos
    ? '<ul class="menu-scroller lunch-scroller" tabindex="0" aria-label="단체 도시락 사진. 옆으로 스크롤할 수 있습니다.">' +
      photos +
      "</ul>"
    : "";

  return [
    '<section class="section section--group" id="group" aria-labelledby="group-title">',
    '<div class="wrap">',
    '<div class="group-panel">',
    '<h2 id="group-title" class="section-title">',
    escapeHtml(group.title || "단체 도시락 주문"),
    "</h2>",
    scroller,
    body,
    '<div class="hero__actions">',
    '<a class="btn btn--solid" href="',
    escapeAttr(phoneHref),
    '">',
    escapeHtml(group.phoneLabel || "전화로 주문"),
    "</a>",
    externalLink(data.links.daangn, group.daangnLabel || "당근에서 주문", "btn btn--ghost"),
    "</div>",
    "</div>",
    "</div>",
    "</section>",
  ].join("");
}

function visitHtml(data, phoneHref) {
  const hours = data.hours || {};
  const parking = data.parking || {};
  const open = String(hours.open || "").trim();
  const close = String(hours.close || "").trim();
  const days = String(hours.days || "").trim();
  let hoursText = "";

  if (days && open && close) hoursText = days + " " + open + "~" + close;
  else if (days && close) hoursText = days + " " + close + "까지";
  else if (close) hoursText = close + "까지";

  const rows = [
    factRow("주소", escapeHtml(data.address)),
    factRow("위치", escapeHtml(data.locationNote)),
    factRow("영업시간", escapeHtml(hoursText)),
    open ? "" : factRow("개점", escapeHtml(hours.openPending)),
    factRow("정기휴무", escapeHtml(hours.closed)),
    factRow(
      "전화",
      '<a href="' + escapeAttr(phoneHref) + '">' + escapeHtml(data.phone) + "</a>"
    ),
    factRow("주차", escapeHtml(parking.nearby)),
    factRow("전용 주차", escapeHtml(parking.dedicated)),
    factRow("단체석", escapeHtml(data.groupSeats)),
  ].join("");

  return [
    '<section class="section section--visit" id="visit" aria-labelledby="visit-title">',
    '<div class="wrap visit__layout">',
    '<div class="section-head">',
    '<h2 id="visit-title" class="section-title">찾아오시는 길</h2>',
    "</div>",
    "<address>",
    '<dl class="facts">',
    rows,
    "</dl>",
    "</address>",
    "</div>",
    "</section>",
  ].join("");
}

function aboutHtml(data) {
  const about = data.about || {};
  const paragraphs = (about.paragraphs || [])
    .map(function (line) {
      return String(line || "").trim();
    })
    .filter(Boolean);
  const extras = [];
  const owner = String(about.ownerName || "").trim();
  const opened = String(about.openedYear || "").trim();
  const story = String(about.story || "").trim();

  if (owner) extras.push("사장님 " + owner);
  if (opened) extras.push(opened + "년 개업");
  if (story) extras.push(story);
  if (!paragraphs.length && !extras.length) return "";

  const body = paragraphs
    .concat(extras)
    .map(function (line) {
      return "<p>" + textToHtml(line) + "</p>";
    })
    .join("");

  return [
    '<section class="section section--about" id="about" aria-labelledby="about-title">',
    '<div class="wrap about__layout">',
    '<h2 id="about-title" class="section-title">',
    escapeHtml(about.title || "바비앤밥 소개"),
    "</h2>",
    '<div class="about__body">',
    body,
    "</div>",
    "</div>",
    "</section>",
  ].join("");
}

function footerHtml(data) {
  const links = [
    ["네이버 지도", data.links.naverMap],
    ["인스타그램", data.links.instagram],
    ["당근", data.links.daangn],
    ["페이스북", data.links.facebook],
  ];

  const items = links
    .map(function (pair) {
      return "<li>" + externalLink(pair[1], pair[0], "") + "</li>";
    })
    .join("");

  return [
    '<footer class="footer">',
    '<div class="wrap footer__inner">',
    "<div>",
    '<p class="footer__name">',
    escapeHtml(data.name),
    "</p>",
    '<p class="footer__address">',
    escapeHtml(data.address),
    "</p>",
    "</div>",
    '<ul class="footer__links">',
    items,
    "</ul>",
    "</div>",
    "</footer>",
  ].join("");
}

function dockHtml(data, phoneHref) {
  return [
    '<nav class="dock" aria-label="빠른 연락">',
    '<div class="dock__bar">',
    externalLink(data.links.naverMap, "길찾기", "btn btn--solid"),
    '<a class="btn btn--ghost" href="' + escapeAttr(phoneHref) + '">전화</a>',
    "</div>",
    "</nav>",
  ].join("");
}

function noticesHtml(items) {
  const list = (items || []).filter(function (item) {
    return String(item || "").trim();
  });
  if (!list.length) return "";

  return (
    '<ul class="notes">' +
    list
      .map(function (item) {
        return "<li>" + escapeHtml(item) + "</li>";
      })
      .join("") +
    "</ul>"
  );
}

function factRow(label, html) {
  if (html == null) return "";
  const probe = String(html)
    .replace(/<[^>]*>/g, "")
    .replace(/&[^;]+;/g, "x")
    .trim();
  if (!probe) return "";

  return (
    '<div class="fact"><dt>' +
    escapeHtml(label) +
    "</dt><dd>" +
    html +
    "</dd></div>"
  );
}

function photoFrame(options) {
  const src = String(options.src || "").trim();
  const alt = String(options.alt || "").trim();
  const variant = options.variant ? " " + options.variant : "";
  const img = src
    ? '<img class="photo__img" src="' +
      escapeAttr(src) +
      '" data-alt="' +
      escapeAttr(alt) +
      '" alt="" aria-hidden="true" />'
    : "";
  const file = src
    ? '<span class="photo__file" aria-hidden="true">' + escapeHtml(src) + "</span>"
    : "";

  return [
    '<div class="photo' + variant + '">',
    img,
    '<div class="photo__fallback">',
    '<span class="photo__icon" aria-hidden="true">',
    iconSvg(options.icon),
    "</span>",
    '<span class="photo__pending">사진 교체 예정</span>',
    file,
    "</div>",
    "</div>",
  ].join("");
}

function bindPhotos(root) {
  const images = root.querySelectorAll(".photo__img");
  images.forEach(function (img) {
    const markReady = function () {
      const frame = img.closest(".photo");
      img.alt = img.getAttribute("data-alt") || "";
      img.removeAttribute("aria-hidden");
      if (frame) frame.classList.add("is-ready");
    };
    const markMissing = function () {
      img.alt = "";
      img.setAttribute("aria-hidden", "true");
    };

    img.addEventListener("load", markReady);
    img.addEventListener("error", markMissing);

    if (img.complete) {
      if (img.naturalWidth > 0) markReady();
      else markMissing();
    }
  });
}

function iconSvg(name) {
  const common =
    'viewBox="0 0 64 64" width="52" height="52" aria-hidden="true" focusable="false"';
  if (name === "plate") {
    return (
      "<svg " +
      common +
      '><circle cx="32" cy="32" r="16" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="32" cy="32" r="8" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>'
    );
  }
  if (name === "store") {
    return (
      "<svg " +
      common +
      '><path d="M10 28 32 12l22 16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M16 27.5V50h32V27.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M28 50V38h8v12" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>'
    );
  }
  if (name === "alley") {
    return (
      "<svg " +
      common +
      '><path d="M14 50 26 14h12l12 36" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M32 24v12" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M12 50h40" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>'
    );
  }
  return (
    "<svg " +
    common +
    '><rect x="12" y="10" width="40" height="32" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M32 10v32M12 26h40" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M18 52h28" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>'
  );
}

function externalLink(href, label, className) {
  const cls = className ? ' class="' + escapeAttr(className) + '"' : "";
  return (
    "<a" +
    cls +
    ' href="' +
    escapeAttr(encodeURI(String(href || "").trim())) +
    '" target="_blank" rel="noopener noreferrer">' +
    escapeHtml(label) +
    '<span class="sr-only"> (새 창)</span></a>'
  );
}

function formatPrice(price) {
  if (typeof price === "number" && Number.isFinite(price)) {
    return new Intl.NumberFormat("ko-KR").format(price) + "원";
  }
  const text = String(price == null ? "" : price).trim();
  if (!text) return "";
  return text.endsWith("원") ? text : text + "원";
}

function textToHtml(value) {
  return escapeHtml(value == null ? "" : String(value)).replace(/\n/g, "<br />");
}

function escapeHtml(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttr(value) {
  return escapeHtml(value);
}
