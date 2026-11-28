# 바비앤밥

춘천 석사동 브런치 카페 **바비앤밥**의 한국어 원페이지입니다. 빌드 도구 없이 `index.html`을 브라우저에서 바로 엽니다.

휴대폰으로 들어온 손님이 대표 메뉴와 가격, 매장 분위기, 주소, 영업정보를 확인하고 네이버 지도로 이동할 수 있습니다. 포장·모임·단체 도시락은 전화와 당근으로 문의합니다.

## 파일

| 파일 | 역할 |
| --- | --- |
| `index.html` | 검색 제목, 설명, 공유 문구, 구조화 데이터 |
| `css/style.css` | 화면 모양 |
| `js/site-data.js` | 메뉴, 가격, 영업시간, 주소, 링크, 사진 경로 |
| `js/site.js` | 위 내용을 화면에 그리는 스크립트 |
| `images/` | 매장·음식 사진을 넣는 폴더 |

화면의 글과 가격은 이미지가 아니라 `js/site-data.js`의 글자입니다. 그 파일을 고치고 새로고침하면 됩니다.

## 소개 문구

첫 화면 바로 아래 ‘바비앤밥 소개’는 `js/site-data.js`의 `about.paragraphs`입니다. 문장을 고치거나 줄을 지우면 화면에 바로 반영됩니다.

메뉴 아래 ‘단체 도시락 주문’은 `group.paragraphs`와 `group.images`입니다. `group.priceNote`는 비어 있으면 나오지 않습니다. 도시락 사진은 첫 번째가 크게 나오고 나머지가 옆에 모입니다. 공간 사진은 첫 번째(창가)가 가장 크게 나오는 격자입니다. 창가 칸은 `images/space-window.jpg`입니다.

후기는 `reviews.items`입니다. `source`에는 네이버 방문자 리뷰 또는 당근 후기를 적고, `text`가 비어 있으면 그 후기는 숨깁니다. 글이 30자 이상인 후기 중 앞의 6개만 화면에 나옵니다.

`about.ownerName`, `about.openedYear`, `about.story`는 비어 있으면 나오지 않습니다. 확인된 내용이 있을 때만 채웁니다.

## 로컬에서 보기

파일을 그대로 열 수 있습니다.

1. `index.html`을 더블클릭합니다.
2. 또는 이 폴더에서 아래를 실행한 뒤 브라우저로 `http://127.0.0.1:8080`을 엽니다.

```bash
python3 -m http.server 8080
```

## 메뉴와 가격 바꾸기

`js/site-data.js`의 `menu` 배열을 수정합니다. `price`는 숫자만 적습니다. 화면에는 `14,900원`처럼 표시됩니다.

```javascript
{
  name: "바비 좋아! 브런치 세트",
  category: "브런치",
  price: 14900,
  image: "images/menu-brunch.jpg",
  alt: "바비 좋아! 브런치 세트"
}
```

메뉴를 늘리거나 빼려면 중괄호 묶음을 추가하거나 삭제합니다. 쉼표를 빠뜨리지 않도록 합니다.

`category`는 메뉴 탭을 정합니다. 값은 `브런치`, `밥·포케`, `파스타`, `커피`, `음료` 중 하나로 적습니다. 탭 순서는 `js/site.js` 위쪽의 `TAB_ORDER`에서 바꿉니다. 새 분류를 쓰려면 `TAB_ORDER`에도 같은 이름을 넣어야 순서대로 나옵니다. 이름 끝에 `(HOT&ICE)`나 `(수제청)`처럼 괄호를 붙이면 화면에서 작은 글씨로 따로 표시됩니다.

지금 목록은 네이버 플레이스 메뉴 순서이고, 네이버 메뉴에 없는 봉골레파스타만 당근 가격표에 있어 파스타 뒤에 넣어 두었습니다. 봉골레 사진은 공개된 메뉴 사진이 없어 빈 자리입니다.

## 영업시간 바꾸기

같은 파일의 `hours`를 수정합니다.

```javascript
hours: {
  days: "월~토",
  open: "11:10",
  close: "20:00",
  closed: "매주 일요일 휴무",
  openPending: "개점 시간 확인 후 입력"
}
```

- 지금 개점 시각은 `"11:10"`이고 화면에는 `월~토 11:10–20:00`으로 나옵니다. 개점 시각이 바뀌면 `open`을 고칩니다. 비워 두면 화면에 `openPending` 문구가 나오므로 비우지 않습니다.
- 검색 결과용 영업시간은 `index.html`의 JSON-LD(`openingHoursSpecification`)에 따로 있습니다. 시간을 바꾸면 거기도 함께 고칩니다.
- 마감만 바꿀 때는 `close`를 고칩니다.
- 휴무 문구는 `closed`를 고칩니다. 비우면 정기휴무 줄이 숨겨집니다.

## 주소, 전화, 링크

`js/site-data.js` 윗부분의 `phone`, `address`, `locationNote`, `links`를 수정합니다.

당근 주소는 한글이 그대로 있어도 됩니다. 페이지가 링크를 만들 때 주소의 한글을 인코딩합니다. 현재 값은 아래와 같이 연결됩니다.

`https://www.daangn.com/kr/local-profile/%EB%B0%94%EB%B9%84%EC%95%A4%EB%B0%A5-drmvd9xzzhk3/`

외부 링크(네이버 지도, 인스타그램, 당근, 페이스북)는 새 탭에서 열리고 `rel="noopener noreferrer"`가 붙습니다. 전화 버튼은 `tel:033-910-2018`로 연결됩니다.

검색결과와 카카오톡·페이스북 공유 문구는 화면 데이터와 따로입니다. 소개 문장을 바꾸면 `index.html`의 `<title>`, `description`, Open Graph, JSON-LD, `<noscript>`도 함께 맞춥니다. 자바스크립트를 끈 브라우저에는 `<noscript>` 내용이 보입니다.

## 비워 두면 숨겨지는 항목

확정되지 않은 정보는 지어 넣지 않습니다. 아래는 값이 비어 있으면 화면에 나오지 않습니다.

| 키 | 넣을 내용 |
| --- | --- |
| `parking.dedicated` | 매장 전용 주차. 예: `"매장 앞 2대"` |
| `groupSeats` | 단체석 인원. 예: `"8명"` |

주차 안내로 지금 나오는 문구는 `parking.nearby`입니다. 기본값은 `인근 석사노외주차장(벌말공원)`입니다.

## 사진 바꾸기

음식이나 매장 사진 자리는 `images/`의 정해진 파일로 바꿔 끼웁니다. 메뉴 사진이 비어 있으면 접시 모양 빈칸이 나옵니다. 파일을 넣고 `image` 경로를 맞추면 사진으로 바뀝니다.

지금 들어 있는 사진은 네이버 플레이스 바비앤밥에 매장이 올린 것입니다. 대표 메뉴 세 장과 첫 화면은 메뉴 사진이고, 매장 전경과 입구는 매장 사진입니다. 창가 자리는 같은 출처에 해당하는 사진이 없어 비어 있습니다. 방문자 리뷰 사진은 넣지 않았습니다.

1. 실제 매장·음식 사진을 준비합니다.
2. 아래 파일명 그대로 `images/`에 저장합니다. 확장자를 바꾸려면 `js/site-data.js`의 `image`도 같은 경로로 고칩니다.
3. 브라우저를 새로고침합니다. 사진이 남으면 강력 새로고침을 합니다.
4. 대체 텍스트는 각 항목의 `alt`를 사진에 맞게 고칩니다.

| 자리 | 파일명 |
| --- | --- |
| 첫 화면, 창가의 브런치 | `images/hero.jpg` |
| 바비 좋아! 브런치 세트 | `images/menu-brunch.jpg` |
| 새우 알리오 올리오 | `images/menu-shrimp-aglio.jpg` |
| 아보카도 명란비빔밥 | `images/menu-avocado-bibimbap.jpg` |
| 창가 | `images/space-window.jpg` |
| 매장 전경 | `images/space-interior.jpg` |
| 골목 입구 | `images/space-alley.jpg` |

다른 파일명을 쓰고 싶으면 `image` 값만 바꾸면 됩니다. 예: `images/space-alley.webp`

권장 크기는 긴 변 2000px 안쪽의 JPG 또는 WebP입니다. 너무 큰 파일은 휴대폰에서 늦게 열립니다.

이 저장소에는 매장 사진을 넣어 두지 않았습니다. 다른 가게의 사진이나 생성된 이미지를 실제 매장 사진처럼 올리지 마세요.

## 모바일

화면 너비 900px 미만에서는 하단에 **전화하기**와 **지도 열기**(네이버 지도)가 고정됩니다. 본문 아래에 여백이 있어 마지막 링크가 버튼에 가리지 않습니다.

## GitHub Pages로 배포

이 저장소는 사이트 루트에 `index.html`이 있고 `.nojekyll` 파일이 있습니다. Jekyll을 거치지 않고 파일을 그대로 배포합니다. 경로가 `css/`, `js/`, `images/`처럼 상대 경로라 저장소 주소 아래에서도 동작합니다.

1. GitHub에서 이 저장소를 엽니다.
2. **Settings → Pages**로 이동합니다.
3. **Build and deployment**의 Source를 **Deploy from a branch**로 둡니다.
4. Branch는 `main`, 폴더는 `/ (root)`를 선택하고 저장합니다.
5. 1–2분 뒤 `https://leisure4all-crypto.github.io/bnb/` 로 접속합니다.
6. 배포 주소가 다르면 `index.html`의 `canonical`과 `og:url`을 그 주소로 바꿉니다.

`main`에 올린 수정은 Pages가 다시 배포할 때 반영됩니다. 사진만 바꾼 경우에도 `images` 파일을 커밋하고 푸시하면 됩니다.

## 디자인 메모

- 색과 글꼴은 `css/tokens.css` 변수입니다. 미색 종이(`--color-paper`), 먹색 글자(`--color-ink`), 남색 버튼(`--color-accent`)이 기본입니다. `css/base.css`는 공통 기본값이고, 화면 배치는 `css/style.css`에 있습니다.
- 글꼴은 Google Fonts의 나눔명조(제목·가격)와 IBM Plex Sans KR(본문)입니다. 인터넷 연결이 없으면 시스템 글꼴로 대신 나옵니다.
- 첫 화면의 호수·산·해·안개는 `js/site.js`의 `HERO_SCENE`(SVG)와 `css/style.css`의 `.hero__*` 규칙입니다. 안개 움직임은 OS에서 움직임 줄이기를 켜면 멈춥니다.
- 푸터 위 산 능선은 `FOOTER_RIDGE`입니다.
