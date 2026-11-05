/* 화면을 그리는 코드입니다. 내용은 config.js 에서 고치세요. */
(function () {
  var D = CFG.date;
  var DOW = ["일", "월", "화", "수", "목", "금", "토"];
  var wd = new Date(Date.UTC(D.y, D.m - 1, D.d)).getUTCDay();
  var ampm = D.h < 12 ? "오전" : "오후";
  var h12 = D.h % 12 || 12;
  var timeStr = ampm + " " + h12 + "시" + (D.min ? " " + D.min + "분" : "");
  var dateStr = D.y + "년 " + D.m + "월 " + D.d + "일 " + DOW[wd] + "요일";
  var pad = function (n) { return String(n).padStart(2, "0"); };
  var $ = function (id) { return document.getElementById(id); };

  /* 글자 채우기 */
  $("roleGroom").textContent = CFG.groom;
  $("roleBride").textContent = CFG.bride;
  $("names").innerHTML = CFG.groom + ' <i>&amp;</i> ' + CFG.bride;
  $("coverWhen").textContent = dateStr + " " + timeStr;
  $("coverWhere").textContent = CFG.venue + " " + CFG.hall;
  $("cerWhen").innerHTML = dateStr + "<br>" + timeStr;
  $("cerHall").textContent = CFG.venue + " " + CFG.hall;
  $("venueName").textContent = CFG.venue;
  $("venueAddr").textContent = CFG.address;
  $("venuePhone").textContent = "예식장 문의 " + CFG.phone;
  $("endNames").textContent = CFG.groomFull + " · " + CFG.brideFull + " 드림";

  $("greeting").innerHTML = CFG.greeting.map(function (t) {
    return t === "" ? '<span class="gap"></span>' : "<span>" + t + "</span>";
  }).join("");

  $("families").innerHTML =
    '<div class="fam"><p class="role">신랑</p><p>' + CFG.groomParents.join(" · ") + "의 " + CFG.groomRole + "<b>" + CFG.groom + "</b></p></div>" +
    '<div class="fam"><p class="role">신부</p><p>' + CFG.brideParents.join(" · ") + "의 " + CFG.brideRole + "<b>" + CFG.bride + "</b></p></div>";

  if (CFG.formUrl) {
    $("rsvp").innerHTML = '<a class="btn-main" href="' + CFG.formUrl + '" target="_blank" rel="noopener">참석 여부 전해주기</a>';
  }

  /* 달력 */
  var first = new Date(Date.UTC(D.y, D.m - 1, 1)).getUTCDay();
  var days = new Date(Date.UTC(D.y, D.m, 0)).getUTCDate();
  var cal = '<p class="cal-head">' + D.y + "." + pad(D.m) + '</p><div class="cal-grid">';
  DOW.forEach(function (n) { cal += '<span class="dow">' + n + "</span>"; });
  for (var i = 0; i < first; i++) cal += "<span></span>";
  for (var d = 1; d <= days; d++) {
    var w = (first + d - 1) % 7;
    var cls = d === D.d ? "on" : (w === 0 ? "sun" : (w === 6 ? "sat" : ""));
    cal += '<span class="' + cls + '">' + d + "</span>";
  }
  $("cal").innerHTML = cal + "</div>";

  /* 카운트다운 */
  var target = Date.UTC(D.y, D.m - 1, D.d, D.h - 9, D.min);
  function tick() {
    var diff = Math.max(0, target - Date.now());
    var s = Math.floor(diff / 1000);
    $("cd-d").textContent = pad(Math.floor(s / 86400));
    $("cd-h").textContent = pad(Math.floor(s % 86400 / 3600));
    $("cd-m").textContent = pad(Math.floor(s % 3600 / 60));
    $("cd-s").textContent = pad(s % 60);
    var left = Math.ceil(diff / 86400000);
    $("ddayNote").innerHTML = diff > 0
      ? CFG.groom + " · " + CFG.bride + "의 결혼식이 <b>" + left + "일</b> 남았습니다."
      : "함께해 주셔서 감사합니다.";
  }
  tick(); setInterval(tick, 1000);

  /* 지도 링크 */
  var q = encodeURIComponent(CFG.venue);
  $("maps").innerHTML =
    '<a href="https://map.naver.com/p/search/' + q + '" target="_blank" rel="noopener">네이버 지도</a>' +
    '<a href="https://map.kakao.com/?q=' + q + '" target="_blank" rel="noopener">카카오맵</a>' +
    '<a href="https://tmap.life/" target="_blank" rel="noopener">티맵</a>';

  /* 갤러리 + 크게 보기 */
  $("gallery").innerHTML = CFG.photos.map(function (p, i) {
    return '<button type="button" data-i="' + i + '" class="' + (p.wide ? "wide" : "") + '" style="aspect-ratio:' + p.ratio +
      '" aria-label="사진 ' + (i + 1) + ' 크게 보기"><img src="' + p.src + '" alt="사진 ' + (i + 1) + '" loading="lazy"></button>';
  }).join("");

  var cur = 0, lb = $("lb");
  function show(i) {
    cur = (i + CFG.photos.length) % CFG.photos.length;
    $("lbStage").innerHTML = '<img src="' + CFG.photos[cur].src + '" alt="사진 ' + (cur + 1) + '">';
    $("lbCount").textContent = (cur + 1) + " / " + CFG.photos.length;
  }
  function open(i) { show(i); lb.classList.add("open"); $("lbClose").focus(); }
  function close() { lb.classList.remove("open"); }
  $("gallery").addEventListener("click", function (e) {
    var b = e.target.closest("button[data-i]");
    if (b) open(+b.dataset.i);
  });
  $("lbClose").onclick = close;
  $("lbPrev").onclick = function () { show(cur - 1); };
  $("lbNext").onclick = function () { show(cur + 1); };
  lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
  document.addEventListener("keydown", function (e) {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(cur - 1);
    if (e.key === "ArrowRight") show(cur + 1);
  });
  var sx = null;
  lb.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", function (e) {
    if (sx === null) return;
    var dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 40) show(cur + (dx < 0 ? 1 : -1));
    sx = null;
  });

  /* 계좌 */
  function accHTML(title, list, first) {
    return '<details class="acc' + (first ? " first" : "") + '"><summary>' + title + '</summary><div class="acc-body">' +
      list.map(function (a) {
        return '<div class="row"><div><span class="who">' + a.who + '</span><span class="num">' + a.bank + " " + a.num +
          '</span></div><button type="button" class="chip-btn" data-copy="' + a.bank + " " + a.num + '">복사</button></div>';
      }).join("") + "</div></details>";
  }
  $("accounts").innerHTML = accHTML("신랑측 계좌번호", CFG.accounts.groom, true) + accHTML("신부측 계좌번호", CFG.accounts.bride, false);

  /* 마무리 사진 */
  /* (ending 사진은 index.html 에 직접 들어 있습니다) */

  /* 복사 */
  var toastT;
  function toast(msg) {
    var t = $("toast"); t.textContent = msg; t.classList.add("show");
    clearTimeout(toastT); toastT = setTimeout(function () { t.classList.remove("show"); }, 1800);
  }
  function copy(text, msg) {
    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) {}
      document.body.removeChild(ta);
      toast(ok ? msg : "길게 눌러 직접 복사해 주세요");
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { toast(msg); }, fallback);
    } else { fallback(); }
  }
  $("copyAddr").onclick = function () { copy(CFG.address, "주소가 복사되었습니다"); };
  $("copyLink").onclick = function () { copy(location.href, "링크가 복사되었습니다"); };
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-copy]");
    if (b) copy(b.dataset.copy, "계좌번호가 복사되었습니다");
  });

  /* 배경음악: assets/background.mp3 가 있을 때만 버튼이 나타납니다 */
  var bgm = $("bgm"), mbtn = $("musicBtn");
  bgm.addEventListener("loadedmetadata", function () { mbtn.hidden = false; mbtn.classList.add("off"); });
  mbtn.onclick = function () {
    if (bgm.paused) { bgm.play(); mbtn.classList.remove("off"); }
    else { bgm.pause(); mbtn.classList.add("off"); }
  };
  if (bgm.getAttribute("src")) bgm.load();

  /* 스크롤하면 나타나는 효과: 화면 아래쪽에 있는 것만 숨겼다가 보이게 함 */
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.remove("pre"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".rv").forEach(function (el) {
      if (el.getBoundingClientRect().top > innerHeight) { el.classList.add("pre"); io.observe(el); }
    });
  }
})();
