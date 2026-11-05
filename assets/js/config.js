/* ─────────────────────────────────────────────
   청첩장 내용은 이 파일만 고치면 됩니다.
   (따옴표 안의 글자만 바꾸세요. 쉼표와 따옴표는 지우지 마세요.)
   "예시"라고 적힌 값은 실제 정보로 바꿔야 합니다.
   ───────────────────────────────────────────── */
var CFG = {
  /* 신랑·신부 (표지에 크게 나오는 이름) */
  groom: "정석",
  bride: "선영",
  groomFull: "이정석",
  brideFull: "장선영",

  /* 예식 일시: 월은 1~12, 시간은 24시간제 (오후 3시 30분 = 15, 30) */
  date: { y: 2026, m: 12, d: 20, h: 15, min: 30 },

  /* 예식장 */
  venue: "더채플앳논현",
  hall: "라메르홀",
  address: "서울특별시 강남구 논현로 549",
  phone: "02-562-1121",

  /* 혼주 표기: 부모님 성함과 "아들/딸" 또는 "장남/장녀" */
  groomParents: ["이기봉", "강전순"], groomRole: "아들",
  brideParents: ["장금영", "박영단"], brideRole: "딸",

  /* 인사말: 따옴표 한 쌍이 한 줄이고, 빈 따옴표("")는 문단 사이 빈 줄입니다 */
  greeting: [
    "서로의 이름을 부르는 일이",
    "어느새 가장 편안한 일이 되었습니다.",
    "",
    "나무 지붕 아래에서",
    "저희 두 사람, 함께 걸어가려 합니다.",
    "",
    "귀한 걸음으로 자리해 주시면",
    "더없는 기쁨으로 간직하겠습니다."
  ],

  /* 갤러리: 화면에 나오는 순서대로. wide:true 는 가로로 긴 사진 */
  photos: [
    { src: "assets/images/gallery/gallery_01.jpg", ratio: "2 / 3" },
    { src: "assets/images/gallery/gallery_02.jpg", ratio: "2 / 3" },
    { src: "assets/images/gallery/gallery_03.jpg", ratio: "2 / 3" },
    { src: "assets/images/gallery/gallery_04.jpg", ratio: "2 / 3" },
    { src: "assets/images/gallery/gallery_05.jpg", ratio: "3 / 2", wide: true },
    { src: "assets/images/gallery/gallery_06.jpg", ratio: "2 / 3" },
    { src: "assets/images/gallery/gallery_07.jpg", ratio: "2 / 3" },
    { src: "assets/images/gallery/gallery_08.jpg", ratio: "3 / 2", wide: true }
  ],

  /* 계좌번호 (예시: 실제 번호로 바꿔주세요) */
  accounts: {
    groom: [
      { who: "신랑 이정석", bank: "신한은행", num: "110-219-731054" },
      { who: "신랑측 혼주 이기봉", bank: "우리은행", num: "1002-781-590300" },
      { who: "신랑측 혼주 강전순", bank: "국은행", num: "098-24-0357-296" }
    ],
    bride: [
      { who: "신부 장선영", bank: "NH농협", num: "302-2572-1161-41" },
      { who: "신부측 혼주 장금영", bank: "NH농협", num: "010-12-007935" }
    ]
  },

  /* 참석 여부 받기: 구글 폼 주소를 넣으면 버튼이 나타납니다 (비워두면 숨김) */
  formUrl: ""
};
