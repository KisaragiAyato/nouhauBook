const maxNouhau = 21 ;

const charactors = [
  "真乃","灯織","めぐる","恋鐘","摩美々","咲耶","結華","霧子","果穂","智代子","樹里","凜世","夏葉","甘奈","甜花","千雪","あさひ","冬優子","愛依","透","円香","小糸","雛菜","にちか","美琴","ルカ","羽那","はるき","ルビー","かな","MEMちょ"
];
  
const charactorColor = [
  "#FF95BD", "#11376E", "#EDBD4B", 
  "#ED299C", "#9933ED", "#04593F" ,"#499BCC", "#9ECFED",
  "#D62F02", "#EE247D", "#FFA508", "#4EA6DF", "#63C433",
  "#F33D72", "#D630DC", "#E2DCDE",
  "#CE0C0B", "#59E824", "#DD15DA",
  "#2FC6C6", "#B61131", "#6556B6", "#FDCA50",
  "#6BA885", "#5D2524",
  "#010101", "#B397A9", "#C1B080",
  "#F175A3", "#DDE8FB"
];

const nouhau = [
  {
    name:"vocalUP(頭ノウハウ)",
    scenario:"everything",
    type:"頭ノウハウ",
    canHikitsugi:true
  },{
    name: "vocalUP+(頭ノウハウ)",
    scenario: "everything",
    type: "頭ノウハウ",
    canHikitsugi: true
  },
  {
    name: "vocalUP++(頭ノウハウ)",
    scenario: "everything",
    type: "頭ノウハウ",
    canHikitsugi: true
  },
  {
    name: "vocalUP+++(頭ノウハウ)",
    scenario: "everything",
    type: "頭ノウハウ",
    canHikitsugi: true
  },
  {
    name: "DanceUP(頭ノウハウ)",
    scenario: "everything",
    type: "頭ノウハウ",
    canHikitsugi: true
  },
  {
    name: "DanceUP+(頭ノウハウ)",
    scenario: "everything",
    type: "頭ノウハウ",
    canHikitsugi: true
  },
  {
    name: "DanceUP++(頭ノウハウ)",
    scenario: "everything",
    type: "頭ノウハウ",
    canHikitsugi: true
  },
  {
    name: "DanceUP+++(頭ノウハウ)",
    scenario: "everything",
    type: "頭ノウハウ",
    canHikitsugi: true
  },
  {
    name: "VisualUP(頭ノウハウ)",
    scenario: "everything",
    type: "頭ノウハウ",
    canHikitsugi: true
  },
  {
    name: "VisualUP+(頭ノウハウ)",
    scenario: "everything",
    type: "頭ノウハウ",
    canHikitsugi: true
  },
  {
    name: "VisualUP++(頭ノウハウ)",
    scenario: "everything",
    type: "頭ノウハウ",
    canHikitsugi: true
  },
  {
    name: "VisualUP+++(頭ノウハウ)",
    scenario: "everything",
    type: "頭ノウハウ",
    canHikitsugi: true
  },
  {
    name: "メンタルUP(頭ノウハウ)",
    scenario: "everything",
    type: "頭ノウハウ",
    canHikitsugi: true
  },
  {
    name: "メンタルUP+(頭ノウハウ)",
    scenario: "everything",
    type: "頭ノウハウ",
    canHikitsugi: true
  },{
    name: "メンタルUP++(頭ノウハウ)",
    scenario: "everything",
    type: "頭ノウハウ",
    canHikitsugi: true
  },
  {
    name: "メンタルUP+++(頭ノウハウ)",
    scenario: "everything",
    type: "頭ノウハウ",
    canHikitsugi: true
  },
  {
    name: "vocal上限UP(頭ノウハウ)",
    scenario: "everything",
    type: "頭ノウハウ",
    canHikitsugi: true
  }, {
    name: "vocal上限UP+(頭ノウハウ)",
    scenario: "everything",
    type: "頭ノウハウ",
    canHikitsugi: true
  },
  {
    name: "vocal上限UP++(頭ノウハウ)",
    scenario: "everything",
    type: "頭ノウハウ",
    canHikitsugi: true
  },
  {
    name: "vocal上限UP+++(頭ノウハウ)",
    scenario: "everything",
    type: "頭ノウハウ",
    canHikitsugi: true
  },
  {
    name: "Dance上限UP(頭ノウハウ)",
    scenario: "everything",
    type: "頭ノウハウ",
    canHikitsugi: true
  },
  {
    name: "Dance上限UP+(頭ノウハウ)",
    scenario: "everything",
    type: "頭ノウハウ",
    canHikitsugi: true
  },
  {
    name: "Dance上限UP++(頭ノウハウ)",
    scenario: "everything",
    type: "頭ノウハウ",
    canHikitsugi: true
  },
  {
    name: "Dance上限UP+++(頭ノウハウ)",
    scenario: "everything",
    type: "頭ノウハウ",
    canHikitsugi: true
  },
  {
    name: "Visual上限UP(頭ノウハウ)",
    scenario: "everything",
    type: "頭ノウハウ",
    canHikitsugi: true
  },
  {
    name: "Visual上限UP+(頭ノウハウ)",
    scenario: "everything",
    type: "頭ノウハウ",
    canHikitsugi: true
  },
  {
    name: "Visual上限UP++(頭ノウハウ)",
    scenario: "everything",
    type: "頭ノウハウ",
    canHikitsugi: true
  },
  {
    name: "Visual上限UP+++(頭ノウハウ)",
    scenario: "everything",
    type: "頭ノウハウ",
    canHikitsugi: true
  },
  {
    name: "メンタル上限UP(頭ノウハウ)",
    scenario: "everything",
    type: "頭ノウハウ",
    canHikitsugi: true
  },
  {
    name: "メンタル上限UP+(頭ノウハウ)",
    scenario: "everything",
    type: "頭ノウハウ",
    canHikitsugi: true
  }, {
    name: "メンタル上限UP++(頭ノウハウ)",
    scenario: "everything",
    type: "頭ノウハウ",
    canHikitsugi: true
  },
  {
    name: "メンタル上限UP+++(頭ノウハウ)",
    scenario: "everything",
    type: "頭ノウハウ",
    canHikitsugi: true
  },
  {
    name: "ファンの声援",
    scenario: "everything",
    type: "ファンの声援",
    canHikitsugi: true
  },
  {
    name: "ファンの声援+",
    scenario: "everything",
    type: "ファンの声援",
    canHikitsugi: true
  },
  {
    name: "ファンの声援++",
    scenario: "everything",
    type: "ファンの声援",
    canHikitsugi: true
  },
  {
    name: "SP獲得(+10)",
    scenario: "everything",
    type: "プロデュースアイテム",
    canHikitsugi: true
  },
  {
    name: "テンション+5",
    scenario: "everything",
    type: "プロデュースアイテム",
    canHikitsugi: true
  },
  {
    name: "思い出(ノウハウ)",
    scenario: "everything",
    type: "思い出(ノウハウ)",
    canHikitsugi: true
  },
  {
    name: "思い出(ノウハウ)+",
    scenario: "everything",
    type: "思い出(ノウハウ)",
    canHikitsugi: true
  },
  {
    name: "思い出(ノウハウ)++",
    scenario: "everything",
    type: "思い出(ノウハウ)",
    canHikitsugi: true
  },
  {
    name: "アピール値UP(トワコレ)",
    scenario: "everything",
    type: "トワコレ",
    canHikitsugi: false
  },
  {
    name: "思い出増加量UP&アピールUP(トワコレ)",
    scenario: "everything",
    type: "トワコレ",
    canHikitsugi: false
  },
  {
    name: "アピール値UP(+2%)",
    scenario: "everything",
    type: "プロデュースアイテム",
    canHikitsugi: true
  },
  {
    name: "思い出増加量UP(+2%)",
    scenario: "everything",
    type: "プロデュースアイテム",
    canHikitsugi: true
  },
  {
    name: "パーフェクトリティ(プロデュースアイテム)",
    scenario: "everything",
    type: "プロデュースアイテム",
    canHikitsugi: true
  },
  {
    name: "スペシャリスト(プロデュースアイテム)",
    scenario: "everything",
    type: "プロデュースアイテム",
    canHikitsugi: true
  },
  {
    name: "基礎能力値値UP(+3%)(プロデュースアイテム)",
    scenario: "everything",
    type: "プロデュースアイテム",
    canHikitsugi: true
  },
  {
    name: "基礎能力値値UP(+6%)(プロデュースアイテム)",
    scenario: "everything",
    type: "プロデュースアイテム",
    canHikitsugi: true
  },
  {
    name: "アピールUP(思い出高&低)(プロデュースアイテム)",
    scenario: "everything",
    type: "プロデュースアイテム",
    canHikitsugi: true
  },
  {
    name: "今がキラキラ!おもいッきりアイドル!(Vo)",
    scenario: "W.I.N.G.",
    type: "今がキラキラ!おもいッきりアイドル!",
    canHikitsugi: true
  },
  {
    name: "今がキラキラ!おもいッきりアイドル!(Da)",
    scenario: "W.I.N.G.",
    type: "今がキラキラ!おもいッきりアイドル!",
    canHikitsugi: true
  },
  {
    name: "今がキラキラ!おもいッきりアイドル!(Vi)",
    scenario: "W.I.N.G.",
    type: "今がキラキラ!おもいッきりアイドル!",
    canHikitsugi: true
  },
  {
    name: "おはよう街角の朝ごはん(Vo)",
    scenario: "W.I.N.G.",
    type: "おはよう街角の朝ごはん",
    canHikitsugi: true
  },
  {
    name: "おはよう街角の朝ごはん(Da)",
    scenario: "W.I.N.G.",
    type: "おはよう街角の朝ごはん",
    canHikitsugi: true
  },
  {
    name: "おはよう街角の朝ごはん(Vi)",
    scenario: "W.I.N.G.",
    type: "おはよう街角の朝ごはん",
    canHikitsugi: true
  },
  {
    name: "HOPPIN_JAM(Vo)",
    scenario: "W.I.N.G.",
    type: "HOPPIN_JAM",
    canHikitsugi: true
  },
  {
    name: "HOPPIN_JAM(Da)",
    scenario: "W.I.N.G.",
    type: "HOPPIN_JAM",
    canHikitsugi: true
  },
  {
    name: "HOPPIN_JAM(Vi)",
    scenario: "W.I.N.G.",
    type: "HOPPIN_JAM",
    canHikitsugi: true
  },
  {
    name: "エレぇベスト(Vo)",
    scenario: "W.I.N.G.",
    type: "エレぇベスト",
    canHikitsugi: true
  },
  {
    name: "エレぇベスト(Da)",
    scenario: "W.I.N.G.",
    type: "エレぇベスト",
    canHikitsugi: true
  },
  {
    name: "エレぇベスト(Vi)",
    scenario: "W.I.N.G.",
    type: "エレぇベスト",
    canHikitsugi: true
  },
  {
    name: "踊っていいとも?増刊号(Vo)",
    scenario: "W.I.N.G.",
    type: "踊っていいとも?増刊号",
    canHikitsugi: true
  },
  {
    name: "踊っていいとも?増刊号(Da)",
    scenario: "W.I.N.G.",
    type: "踊っていいとも?増刊号",
    canHikitsugi: true
  },
  {
    name: "踊っていいとも?増刊号(Vi)",
    scenario: "W.I.N.G.",
    type: "踊っていいとも?増刊号",
    canHikitsugi: true
  },
  {
    name: "めざせアイドルNo.1(SP)",
    scenario: "W.I.N.G.",
    type: "めざせアイドルNo.1",
    canHikitsugi: true
  },
  {
    name: "歌姫楽宴(Vo)",
    scenario: "W.I.N.G.",
    type: "歌姫楽宴",
    canHikitsugi: true
  },
  {
    name: "歌姫楽宴(Da)",
    scenario: "W.I.N.G.",
    type: "歌姫楽宴",
    canHikitsugi: true
  },
  {
    name: "歌姫楽宴(Vi)",
    scenario: "W.I.N.G.",
    type: "歌姫楽宴",
    canHikitsugi: true
  },
  {
    name: "今夜は帰りたくない!(親愛度)",
    scenario: "W.I.N.G.",
    type: "今夜は帰りたくない!",
    canHikitsugi: true
  },
  {
    name: "W.I.N.G.(Vo)",
    scenario: "W.I.N.G.",
    type: "W.I.N.G.引き継ぎ不可",
    canHikitsugi: false
  },
  {
    name: "W.I.N.G.(Vo)+",
    scenario: "W.I.N.G.",
    type: "W.I.N.G.引き継ぎ不可",
    canHikitsugi: false
  },
  {
    name: "W.I.N.G.(Vo)++",
    scenario: "W.I.N.G.",
    type: "W.I.N.G.引き継ぎ不可",
    canHikitsugi: false
  },
  {
    name: "W.I.N.G.(Da)",
    scenario: "W.I.N.G.",
    type: "W.I.N.G.引き継ぎ不可",
    canHikitsugi: false
  },
  {
    name: "W.I.N.G.(Da)+",
    scenario: "W.I.N.G.",
    type: "W.I.N.G.引き継ぎ不可",
    canHikitsugi: false
  },
  {
    name: "W.I.N.G.(Da)++",
    scenario: "W.I.N.G.",
    type: "W.I.N.G.引き継ぎ不可",
    canHikitsugi: false
  },
  {
    name: "W.I.N.G.(Vi)",
    scenario: "W.I.N.G.",
    type: "W.I.N.G.引き継ぎ不可",
    canHikitsugi: false
  },
  {
    name: "W.I.N.G.(Vi)+",
    scenario: "W.I.N.G.",
    type: "W.I.N.G.引き継ぎ不可",
    canHikitsugi: false
  },
  {
    name: "W.I.N.G.(Vi)++",
    scenario: "W.I.N.G.",
    type: "W.I.N.G.引き継ぎ不可",
    canHikitsugi: false
  },
  {
    name: "W.I.N.G.(Me)",
    scenario: "W.I.N.G.",
    type: "W.I.N.G.引き継ぎ不可",
    canHikitsugi: false
  },
  {
    name: "W.I.N.G.(Me)+",
    scenario: "W.I.N.G.",
    type: "W.I.N.G.引き継ぎ不可",
    canHikitsugi: false
  },
  {
    name: "W.I.N.G.(Me)++",
    scenario: "W.I.N.G.",
    type: "W.I.N.G.引き継ぎ不可",
    canHikitsugi: false
  },
  {
    name: "基礎能力値UP(+3%)(W.I.N.G.)",
    scenario: "W.I.N.G.",
    type: "W.I.N.G.アビリティ",
    canHikitsugi: true
  },
  {
    name: "WING優勝",
    scenario: "W.I.N.G.",
    type: "W.I.N.G.パッシブスキル",
    canHikitsugi: false
  },
  {
    name: "WING優勝+",
    scenario: "W.I.N.G.",
    type: "W.I.N.G.パッシブスキル",
    canHikitsugi: false
  },
  {
    name: "WING優勝++",
    scenario: "W.I.N.G.",
    type: "W.I.N.G.パッシブスキル",
    canHikitsugi: false
  },
  {
    name: "WING準決勝(Vo)",
    scenario: "W.I.N.G.",
    type: "W.I.N.G.ライブスキル",
    canHikitsugi: false
  },
  {
    name: "WING準決勝(Da)",
    scenario: "W.I.N.G.",
    type: "W.I.N.G.ライブスキル",
    canHikitsugi: false
  },
  {
    name: "WING準決勝(Vi)",
    scenario: "W.I.N.G.",
    type: "W.I.N.G.ライブスキル",
    canHikitsugi: false
  },
  {
    name: "ファン感謝祭クリア",
    scenario: "ファン感謝祭",
    type: "ファン感謝祭親愛度+",
    canHikitsugi: false
  },
  {
    name: "ファン感謝祭クリア+",
    scenario: "ファン感謝祭",
    type: "ファン感謝祭親愛度+",
    canHikitsugi: false
  },
  {
    name: "ファン感謝祭クリア++",
    scenario: "ファン感謝祭",
    type: "ファン感謝祭親愛度+",
    canHikitsugi: false
  },
  {
    name: "ファン感謝祭(Vo)",
    scenario: "ファン感謝祭",
    type: "ファン感謝祭引き継ぎ不可",
    canHikitsugi: false
  },
  {
    name: "ファン感謝祭(Vo)+",
    scenario: "ファン感謝祭",
    type: "ファン感謝祭引き継ぎ不可",
    canHikitsugi: false
  },
  {
    name: "ファン感謝祭(Vo)++",
    scenario: "ファン感謝祭",
    type: "ファン感謝祭引き継ぎ不可",
    canHikitsugi: false
  },
  {
    name: "ファン感謝祭(Da)",
    scenario: "ファン感謝祭",
    type: "ファン感謝祭引き継ぎ不可",
    canHikitsugi: false
  },
  {
    name: "ファン感謝祭(Da)+",
    scenario: "ファン感謝祭",
    type: "ファン感謝祭引き継ぎ不可",
    canHikitsugi: false
  },
  {
    name: "ファン感謝祭(Da)++",
    scenario: "ファン感謝祭",
    type: "ファン感謝祭引き継ぎ不可",
    canHikitsugi: false
  },
  {
    name: "ファン感謝祭(Vi)",
    scenario: "ファン感謝祭",
    type: "ファン感謝祭引き継ぎ不可",
    canHikitsugi: false
  },
  {
    name: "ファン感謝祭(Vi)+",
    scenario: "ファン感謝祭",
    type: "ファン感謝祭引き継ぎ不可",
    canHikitsugi: false
  },
  {
    name: "ファン感謝祭(Vi)++",
    scenario: "ファン感謝祭",
    type: "ファン感謝祭引き継ぎ不可",
    canHikitsugi: false
  },
  {
    name: "ファン感謝祭(Me)",
    scenario: "ファン感謝祭",
    type: "ファン感謝祭引き継ぎ不可",
    canHikitsugi: false
  },
  {
    name: "ファン感謝祭(Me)+",
    scenario: "ファン感謝祭",
    type: "ファン感謝祭引き継ぎ不可",
    canHikitsugi: false
  },
  {
    name: "ファン感謝祭(Me)++",
    scenario: "ファン感謝祭",
    type: "ファン感謝祭引き継ぎ不可",
    canHikitsugi: false
  },
  {
    name: "ファン感謝祭MVP",
    scenario: "ファン感謝祭",
    type: "ファン感謝祭引き継ぎ不可",
    canHikitsugi: false
  },
  {
    name: "ファン感謝祭MVP+",
    scenario: "ファン感謝祭",
    type: "ファン感謝祭引き継ぎ不可",
    canHikitsugi: false
  },
  {
    name: "ファン感謝祭MVP++",
    scenario: "ファン感謝祭",
    type: "ファン感謝祭引き継ぎ不可",
    canHikitsugi: false
  },
  {
    name: "【限定】Vocal適正UP(ファン感謝祭)",
    scenario: "ファン感謝祭",
    type: "ファン感謝祭期間限定",
    canHikitsugi: true
  },
  {
    name: "【限定】Dance適正UP(ファン感謝祭)",
    scenario: "ファン感謝祭",
    type: "ファン感謝祭期間限定",
    canHikitsugi: true
  },
  {
    name: "【限定】Visual適正UP(ファン感謝祭)",
    scenario: "ファン感謝祭",
    type: "ファン感謝祭期間限定",
    canHikitsugi: true
  },
  {
    name: "Vocal20%UP(ファン感謝祭)(VocalUP時)",
    scenario: "ファン感謝祭",
    type: "ファン感謝祭パッシブスキル",
    canHikitsugi: true
  },
  {
    name: "Vocal50%UP(ファン感謝祭)(VocalDOWN時)",
    scenario: "ファン感謝祭",
    type: "ファン感謝祭パッシブスキル",
    canHikitsugi: true
  },
  {
    name: "Vocal50%UP(ファン感謝祭)(DanceDOWN時)",
    scenario: "ファン感謝祭",
    type: "ファン感謝祭パッシブスキル",
    canHikitsugi: true
  },
  {
    name: "Dance20%UP(ファン感謝祭)(DanceUP時)",
    scenario: "ファン感謝祭",
    type: "ファン感謝祭パッシブスキル",
    canHikitsugi: true
  },
  {
    name: "Dance50%UP(ファン感謝祭)(DanceDOWN時)",
    scenario: "ファン感謝祭",
    type: "ファン感謝祭パッシブスキル",
    canHikitsugi: true
  },
  {
    name: "Dance50%UP(ファン感謝祭)(VisualDOWN時)",
    scenario: "ファン感謝祭",
    type: "ファン感謝祭パッシブスキル",
    canHikitsugi: true
  },
  {
    name: "Visual20%UP(ファン感謝祭)(VisuaiUP時)",
    scenario: "ファン感謝祭",
    type: "ファン感謝祭パッシブスキル",
    canHikitsugi: true
  },
  {
    name: "Visual50%UP(ファン感謝祭)(VisualDOWN時)",
    scenario: "ファン感謝祭",
    type: "ファン感謝祭パッシブスキル",
    canHikitsugi: true
  },
  {
    name: "Visual50%UP(ファン感謝祭)(VocalDOWN時)",
    scenario: "ファン感謝祭",
    type: "ファン感謝祭パッシブスキル",
    canHikitsugi: true
  },
  {
    name: "メンタル283回復(ファン感謝祭)(スター8以下時)",
    scenario: "ファン感謝祭",
    type: "ファン感謝祭パッシブスキル",
    canHikitsugi: true
  },
  {
    name: "メンタル283回復(ファン感謝祭)(スター3以下時)",
    scenario: "ファン感謝祭",
    type: "ファン感謝祭パッシブスキル",
    canHikitsugi: true
  },
  {
    name: "メンタル283回復(ファン感謝祭)(スター2以下時)",
    scenario: "ファン感謝祭",
    type: "ファン感謝祭パッシブスキル",
    canHikitsugi: true
  },
  {
    name: "メンタル283回復(ファン感謝祭)(メンタルダメージUP時)",
    scenario: "ファン感謝祭",
    type: "ファン感謝祭パッシブスキル",
    canHikitsugi: true
  },
  {
    name: "注目度283%DOWN(ファン感謝祭)",
    scenario: "ファン感謝祭",
    type: "ファン感謝祭パッシブスキル",
    canHikitsugi: true
  },
  {
    name: "G.R.A.D.予選",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.引き継ぎ不可",
    canHikitsugi: false
  },
  {
    name: "G.R.A.D.敗者復活",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.引き継ぎ不可",
    canHikitsugi: false
  },
  {
    name: "G.R.A.D.決勝",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.引き継ぎ不可",
    canHikitsugi: false
  },
  {
    name: "Leader適正○",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.アビリティ",
    canHikitsugi: true
  },
  {
    name: "Leader適正◎",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.アビリティ",
    canHikitsugi: true
  },
  {
    name: "Vocal適正○",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.アビリティ",
    canHikitsugi: true
  },
  {
    name: "Vocal適正◎",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.アビリティ",
    canHikitsugi: true
  },
  {
    name: "Center適正○",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.アビリティ",
    canHikitsugi: true
  },
  {
    name: "Center適正◎",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.アビリティ",
    canHikitsugi: true
  },
  {
    name: "Dance適正○",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.アビリティ",
    canHikitsugi: true
  },
  {
    name: "Dance適正◎",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.アビリティ",
    canHikitsugi: true
  },
  {
    name: "Visual適正○",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.アビリティ",
    canHikitsugi: true
  },
  {
    name: "Visual適正◎",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.アビリティ",
    canHikitsugi: true
  },
  {
    name: "オールラウンダー○",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.アビリティ",
    canHikitsugi: true
  },
  {
    name: "オールラウンダー◎",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.アビリティ",
    canHikitsugi: true
  },
  {
    name: "スペシャリスト(G.R.A.D.)",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.アビリティ",
    canHikitsugi: true
  },
  {
    name: "基礎能力値UP(+6%)(G.R.A.D.)",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.アビリティ",
    canHikitsugi: true
  },
  {
    name: "スロースターター",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.アビリティ",
    canHikitsugi: true
  },
  {
    name: "スタートダッシュ",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.アビリティ",
    canHikitsugi: true
  },
  {
    name: "アピールUP(思い出高)",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.アビリティ",
    canHikitsugi: true
  },
  {
    name: "アピールUP(思い出低)",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.アビリティ",
    canHikitsugi: true
  },
  {
    name: "アピールUP(思い出高&低)(G.R.A.D.)",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.アビリティ",
    canHikitsugi: true
  },
  {
    name: "パーフェクトリティ(G.R.A.D.)",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.アビリティ",
    canHikitsugi: true
  },
  {
    name: "人気者",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.アビリティ",
    canHikitsugi: true
  },
  {
    name: "物静か",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.アビリティ",
    canHikitsugi: true
  },
  {
    name: "Vocal上限+",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.アビリティ",
    canHikitsugi: true
  },
  {
    name: "Vocal上限++",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.アビリティ",
    canHikitsugi: true
  },
  {
    name: "Vocal上限+++",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.アビリティ",
    canHikitsugi: true
  },
  {
    name: "Dance上限+",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.アビリティ",
    canHikitsugi: true
  },
  {
    name: "Dance上限++",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.アビリティ",
    canHikitsugi: true
  },
  {
    name: "Dance上限+++",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.アビリティ",
    canHikitsugi: true
  },
  {
    name: "Visual上限+",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.アビリティ",
    canHikitsugi: true
  },
  {
    name: "Visual上限++",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.アビリティ",
    canHikitsugi: true
  },
  {
    name: "Visual上限+++",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.アビリティ",
    canHikitsugi: true
  },
  {
    name: "メンタル上限+",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.アビリティ",
    canHikitsugi: true
  },
  {
    name: "メンタル上限++",
    scenario: "G.R.A.D",
    type: "G.R.A.D.アビリティ",
    canHikitsugi: true
  },
  {
    name: "メンタル上限+++",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.アビリティ",
    canHikitsugi: true
  },
  {
    name: "ボーカルマスター",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.アビリティ",
    canHikitsugi: true
  },
  {
    name: "ダンスマスター",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.アビリティ",
    canHikitsugi: true
  },
  {
    name: "ビジュアルマスター",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.アビリティ",
    canHikitsugi: true
  },
  {
    name: "除去:メランコリー1",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.アビリティ",
    canHikitsugi: true
  },
  {
    name: "除去:メランコリー2",
    scenario: "G.R.A.D",
    type: "G.R.A.D.アビリティ",
    canHikitsugi: true
  },
  {
    name: "除去:リラックス1",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.アビリティ",
    canHikitsugi: true
  },
  {
    name: "除去:リラックス2",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.アビリティ",
    canHikitsugi: true
  },
  {
    name: "メンタル回復量+",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.アビリティ",
    canHikitsugi: true
  },
  {
    name: "メンタル回復量-",
    scenario: "G.R.A.D",
    type: "G.R.A.D.アビリティ",
    canHikitsugi: true
  },
  {
    name: "打たれ強い",
    scenario: "G.R.A.D",
    type: "G.R.A.D.アビリティ",
    canHikitsugi: true
  },
  {
    name: "打たれ弱い",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.アビリティ",
    canHikitsugi: true
  },
  {
    name: "注目の的",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.アビリティ",
    canHikitsugi: true
  },
  {
    name: "ひかえめ",
    scenario: "G.R.A.D",
    type: "G.R.A.D.アビリティ",
    canHikitsugi: true
  },
  {
    name: "G.R.A.D.(Vo)",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.(Vo)",
    canHikitsugi: false
  },
  {
    name: "G.R.A.D.(Vo)+",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.(Vo)",
    canHikitsugi: false
  },
  {
    name: "G.R.A.D.(Vo)++",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.(Vo)",
    canHikitsugi: false
  },{
    name: "G.R.A.D.(Da)",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.(Da)",
    canHikitsugi: false
  },
  {
    name: "G.R.A.D.(Da)+",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.(Da)",
    canHikitsugi: false
  },
  {
    name: "G.R.A.D.(Da)++",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.(Da)",
    canHikitsugi: false
  },{
    name: "G.R.A.D.(Vi)",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.(Vi)",
    canHikitsugi: false
  },
  {
    name: "G.R.A.D.(Vi)+",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.(Vi)",
    canHikitsugi: false
  },
  {
    name: "G.R.A.D.(Vi)++",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.(Vi)",
    canHikitsugi: false
  },{
    name: "G.R.A.D.(Le)",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.(Le)",
    canHikitsugi: false
  },
  {
    name: "G.R.A.D.(Le)+",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.(Le)",
    canHikitsugi: false
  },
  {
    name: "G.R.A.D.(Le)++",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.(Le)",
    canHikitsugi: false
  },{
    name: "G.R.A.D.(Ce)",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.(Ce)",
    canHikitsugi: false
  },
  {
    name: "G.R.A.D.(Ce)+",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.(Ce)",
    canHikitsugi: false
  },
  {
    name: "G.R.A.D.(Ce)++",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.(Ce)",
    canHikitsugi: false
  },
  {
    name: "【限定】Vocal適正UP(G.R.A.D.)",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.期間限定",
    canHikitsugi: true
  },
  {
    name: "【限定】Dance適正UP(G.R.A.D.)",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.期間限定",
    canHikitsugi: true
  },
  {
    name: "【限定】Visual適正UP(G.R.A.D.)",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.期間限定",
    canHikitsugi: true
  },
  {
    name: "Landing_Point大成功(SP)",
    scenario: "Landing_Point",
    type: "Landing_Point大成功",
    canHikitsugi: true
  },
  {
    name: "Landing_Point大成功(SP)+",
    scenario: "Landing_Point",
    type: "Landing_Point大成功",
    canHikitsugi: true
  },
  {
    name: "Landing_Point大成功(SP)++",
    scenario: "Landing_Point",
    type: "Landing_Point大成功",
    canHikitsugi: true
  },
  {
    name: "Landing_Point(Me)",
    scenario: "Landing_Point",
    type: "Landing_Point(Me)",
    canHikitsugi: false
  },
  {
    name: "Landing_Point(Me)+",
    scenario: "Landing_Point",
    type: "Landing_Point(Me)",
    canHikitsugi: false
  },
  {
    name: "Landing_Point(Me)++",
    scenario: "Landing_Point",
    type: "Landing_Point(Me)",
    canHikitsugi: false
  },
  {
    name: "Landing_Point大成功(アビリティ)",
    scenario: "Landing_Point",
    type: "Landing_Point大成功(アビリティ)",
    canHikitsugi: false
  },
  {
    name: "Landing_Point大成功(アビリティ)+",
    scenario: "Landing_Point",
    type: "Landing_Point大成功(アビリティ)",
    canHikitsugi: false
  },
  {
    name: "Landing_Point大成功(アビリティ)++",
    scenario: "Landing_Point",
    type: "Landing_Point大成功(アビリティ)",
    canHikitsugi: false
  },{
    name: "Landing_Point(Vo)",
    scenario: "Landing_Point",
    type: "Landing_Point(Vo)",
    canHikitsugi: false
  },
  {
    name: "Landing_Point(Vo)+",
    scenario: "Landing_Point",
    type: "Landing_Point(Vo)",
    canHikitsugi: false
  },
  {
    name: "Landing_Point(Vo)++",
    scenario: "Landing_Point",
    type: "Landing_Point(Vo)",
    canHikitsugi: false
  }, {
    name: "Landing_Point(Da)",
    scenario: "Landing_Point",
    type: "Landing_Point(Da)",
    canHikitsugi: false
  },
  {
    name: "Landing_Point(Da)+",
    scenario: "Landing_Point",
    type: "Landing_Point(Da)",
    canHikitsugi: false
  },
  {
    name: "Landing_Point(Da)++",
    scenario: "Landing_Point",
    type: "GLanding_Point(Da)",
    canHikitsugi: false
  }, {
    name: "Landing_Point(Vi)",
    scenario: "Landing_Point",
    type: "Landing_Point(Vi)",
    canHikitsugi: false
  },
  {
    name: "Landing_Point(Vi)+",
    scenario: "Landing_Point",
    type: "Landing_Point(Vi)",
    canHikitsugi: false
  },
  {
    name: "Landing_Point(Vi)++",
    scenario: "Landing_Point",
    type: "Landing_Point(Vi)",
    canHikitsugi: false
  },
  {
    name: "【限定】Vocal適正UP(Landing_Point)",
    scenario: "Landing_Point",
    type: "Landing_Point期間限定",
    canHikitsugi: true
  },
  {
    name: "【限定】Dance適正UP(Landing_Point)",
    scenario: "Landing_Point",
    type: "Landing_Point期間限定",
    canHikitsugi: true
  },
  {
    name: "【限定】Visual適正UP(Landing_Point)",
    scenario: "Landing_Point",
    type: "Landing_Point期間限定",
    canHikitsugi: true
  },
  {
    name: "エントリー目標達成(Vo)",
    scenario: "S.T.E.P.",
    type: "S.T.E.P.目標達成",
    canHikitsugi: true
  },
  {
    name: "エントリー目標達成(Da)",
    scenario: "S.T.E.P.",
    type: "S.T.E.P.目標達成",
    canHikitsugi: true
  },
  {
    name: "エントリー目標達成(Vi)",
    scenario: "S.T.E.P.",
    type: "S.T.E.P.目標達成",
    canHikitsugi: true
  },
  {
    name: "ノービス目標達成(Vo)",
    scenario: "S.T.E.P.",
    type: "S.T.E.P.目標達成",
    canHikitsugi: true
  },
  {
    name: "ノービス目標達成(Da)",
    scenario: "S.T.E.P.",
    type: "S.T.E.P.目標達成",
    canHikitsugi: true
  },
  {
    name: "ノービス目標達成(Vi)",
    scenario: "S.T.E.P.",
    type: "S.T.E.P.目標達成",
    canHikitsugi: true
  },
  {
    name: "ミドル目標達成(Vo)",
    scenario: "S.T.E.P.",
    type: "S.T.E.P.目標達成",
    canHikitsugi: true
  },
  {
    name: "ミドル目標達成(Da)",
    scenario: "S.T.E.P.",
    type: "S.T.E.P.目標達成",
    canHikitsugi: true
  },
  {
    name: "ミドル目標達成(Vi)",
    scenario: "S.T.E.P.",
    type: "S.T.E.P.目標達成",
    canHikitsugi: true
  },
  {
    name: "エキスパート目標達成(Vo)",
    scenario: "S.T.E.P.",
    type: "S.T.E.P.目標達成",
    canHikitsugi: true
  },
  {
    name: "エキスパート目標達成(Da)",
    scenario: "S.T.E.P.",
    type: "S.T.E.P.目標達成",
    canHikitsugi: true
  },
  {
    name: "エキスパート目標達成(Vi)",
    scenario: "S.T.E.P.",
    type: "S.T.E.P.目標達成",
    canHikitsugi: true
  },
  {
    name: "エキシビジョンマッチ",
    scenario: "S.T.E.P.",
    type: "S.T.E.P.エキシビジョンマッチ",
    canHikitsugi: true
  },
  {
    name: "エキシビジョンマッチ+",
    scenario: "S.T.E.P.",
    type: "S.T.E.P.エキシビジョンマッチ",
    canHikitsugi: true
  },
  {
    name: "エキシビジョンマッチ++",
    scenario: "S.T.E.P.",
    type: "S.T.E.P.エキシビジョンマッチ",
    canHikitsugi: true
  },
  {
    name: "ヒカリのdestination",
    scenario: "Landing_Point",
    type: "Fes_Tours専用",
    canHikitsugi: true
  },
  {
    name: "ヒカリのdestination+",
    scenario: "Landing_Point",
    type: "Fes_Tours専用",
    canHikitsugi: true
  },
  {
    name: "バベルシティ・グレイス",
    scenario: "Landing_Point",
    type: "Fes_Tours専用",
    canHikitsugi: true
  },
  {
    name: "バベルシティ・グレイス+",
    scenario: "Landing_Point",
    type: "Fes_Tours専用",
    canHikitsugi: true
  },
  {
    name: "夢咲きAfter_school",
    scenario: "Landing_Point",
    type: "Fes_Tours専用",
    canHikitsugi: true
  },
  {
    name: "夢咲きAfter_school+",
    scenario: "Landing_Point",
    type: "Fes_Tours専用",
    canHikitsugi: true
  },
  {
    name: "アルストロメリア",
    scenario: "Landing_Point",
    type: "Fes_Tours専用",
    canHikitsugi: true
  },
  {
    name: "アルストロメリア+",
    scenario: "Landing_Point",
    type: "Fes_Tours専用",
    canHikitsugi: true
  },
  {
    name: "Wandering_Dream_Chaser",
    scenario: "Landing_Point",
    type: "Fes_Tours専用",
    canHikitsugi: true
  },
  {
    name: "Wandering_Dream_Chaser+",
    scenario: "Landing_Point",
    type: "Fes_Tours専用",
    canHikitsugi: true
  },
  {
    name: "いつだって僕らは",
    scenario: "Landing_Point",
    type: "Fes_Tours専用",
    canHikitsugi: true
  },
  {
    name: "いつだって僕らは+",
    scenario: "Landing_Point",
    type: "Fes_Tours専用",
    canHikitsugi: true
  },
  {
    name: "OH_MY_GOD",
    scenario: "Landing_Point",
    type: "Fes_Tours専用",
    canHikitsugi: true
  },
  {
    name: "OH_MY_GOD+",
    scenario: "Landing_Point",
    type: "Fes_Tours専用",
    canHikitsugi: true
  },
  {
    name: "Spread_the_Wings!!",
    scenario: "Landing_Point",
    type: "Fes_Tours専用",
    canHikitsugi: true
  },
  {
    name: "Spread_the_Wings!!+",
    scenario: "Landing_Point",
    type: "Fes_Tours専用",
    canHikitsugi: true
  },
  {
    name: "SNOW_FLAKES_MEMORIES",
    scenario: "Landing_Point",
    type: "Fes_Tours専用",
    canHikitsugi: true
  },
  {
    name: "SNOW_FLAKES_MEMORIES+",
    scenario: "Landing_Point",
    type: "Fes_Tours専用",
    canHikitsugi: true
  },
  {
    name: "SWEET♡STEP",
    scenario: "Landing_Point",
    type: "Fes_Tours専用",
    canHikitsugi: true
  },
  {
    name: "SWEET♡STEP+",
    scenario: "Landing_Point",
    type: "Fes_Tours専用",
    canHikitsugi: true
  },
  {
    name: "シャイノグラフィ",
    scenario: "Landing_Point",
    type: "Fes_Tours専用",
    canHikitsugi: true
  },
  {
    name: "シャイノグラフィ+",
    scenario: "Landing_Point",
    type: "Fes_Tours専用",
    canHikitsugi: true
  },
  {
    name: "Resonance⁺",
    scenario: "Landing_Point",
    type: "Fes_Tours専用",
    canHikitsugi: true
  },
  {
    name: "Resonance⁺+",
    scenario: "Landing_Point",
    type: "Fes_Tours専用",
    canHikitsugi: true
  },
  {
    name: "虹の行方",
    scenario: "Landing_Point",
    type: "Fes_Tours専用",
    canHikitsugi: true
  },
  {
    name: "虹の行方+",
    scenario: "Landing_Point",
    type: "Fes_Tours専用",
    canHikitsugi: true
  },
  {
    name: "疲れにくい(Twinkle_way)",
    scenario: "Landing_Point",
    type: "Fes_Tours専用",
    canHikitsugi: true
  },
  {
    name: "疲れにくい(Twinkle_way)+",
    scenario: "Landing_Point",
    type: "Fes_Tours専用",
    canHikitsugi: true
  },
  {
    name: "疲れにくい(Black_Reverie)",
    scenario: "Landing_Point",
    type: "Fes_Tours専用",
    canHikitsugi: true
  },
  {
    name: "疲れにくい(Black_Reverie)+",
    scenario: "Landing_Point",
    type: "Fes_Tours専用",
    canHikitsugi: true
  },
  {
    name: "疲れにくい(五ツ座流星群)",
    scenario: "Landing_Point",
    type: "Fes_Tours専用",
    canHikitsugi: true
  },
  {
    name: "疲れにくい(五ツ座流星群)+",
    scenario: "Landing_Point",
    type: "Fes_Tours専用",
    canHikitsugi: true
  },
  {
    name: "疲れにくい(ダブル・インフェクト)",
    scenario: "Landing_Point",
    type: "Fes_Tours専用",
    canHikitsugi: true
  },
  {
    name: "疲れにくい(ダブル・インフェクト)+",
    scenario: "Landing_Point",
    type: "Fes_Tours専用",
    canHikitsugi: true
  },
  {
    name: "疲れにくい(Hide&Attack)",
    scenario: "Landing_Point",
    type: "Fes_Tours専用",
    canHikitsugi: true
  },
  {
    name: "疲れにくい(Hide&Attack)+",
    scenario: "Landing_Point",
    type: "Fes_Tours専用",
    canHikitsugi: true
  },
  {
    name: "疲れにくい(僕らだけの未来の空)",
    scenario: "Landing_Point",
    type: "Fes_Tours専用",
    canHikitsugi: true
  },
  {
    name: "疲れにくい(僕らだけの未来の空)+",
    scenario: "Landing_Point",
    type: "Fes_Tours専用",
    canHikitsugi: true
  },
  {
    name: "疲れにくい(Fashionable)",
    scenario: "Landing_Point",
    type: "Fes_Tours専用",
    canHikitsugi: true
  },
  {
    name: "疲れにくい(Fashionable)+",
    scenario: "Landing_Point",
    type: "Fes_Tours専用",
    canHikitsugi: true
  },
  {
    name: "ロマンチスト",
    scenario: "G.R.A.D.",
    type: "G.R.A.D.アビリティ",
    canHikitsugi: true
  }
  
];

const scenarios = ["everything","W.I.N.G.","ファン感謝祭","G.R.A.D.","Landing_Point","S.T.E.P."];

const nouhauTypes = [
  "頭ノウハウ","ファンの声援","プロデュースアイテム","思い出(ノウハウ)","トワコレ","プロデュースアイテム","今がキラキラ!おもいッきりアイドル!","おはよう街角の朝ごはん","HOPPIN_JAM","エレぇベスト","踊っていいとも?増刊号","めざせアイドルNo.1","歌姫楽宴","今夜は帰りたくない!","W.I.N.G.引き継ぎ不可","W.I.N.G.アビリティ","W.I.N.G.パッシブスキル",
    "W.I.N.G.ライブスキル","ファン感謝祭親愛度+","ファン感謝祭引き継ぎ不可",
    "ファン感謝祭期間限定","ファン感謝祭パッシブスキル","G.R.A.D.引き継ぎ不可",
    "G.R.A.D.アビリティ","G.R.A.D.(Vo)","G.R.A.D.(Da)","G.R.A.D.(Vi)","G.R.A.D.(Le)","G.R.A.D.(Ce)","G.R.A.D.期間限定","Landing_Point大成功","Landing_Point(Me)","Landing_Point大成功(アビリティ)","Landing_Point(Vo)","Landing_Point(Da)","Landing_Point(Vi)",
    "Landing_Point期間限定","S.T.E.P.目標達成","S.T.E.P.エキシビジョンマッチ","Fes_Tours専用"
  ];
  
const onlyNouhauTypes =[
  //同typeのノウハウを1つのノウハウブックに複数含むことができないtype
    "頭ノウハウ","ファンの声援","思い出(ノウハウ)","今がキラキラ!おもいッきりアイドル!","HOPPIN_JAM","エレぇベスト","踊っていいとも?増刊号","歌姫楽宴","ファン感謝祭親愛度+","G.R.A.D.(Vo)","G.R.A.D.(Da)","G.R.A.D.(Vi)","G.R.A.D.(Le)","G.R.A.D.(Ce)","LandingPoint大成功","Landing_Point(Me)","Landing_Point大成功(アビリティ)","Landing_Point(Vo)","Landing_Point(Da)","Landing_Point(Vi)","S.T.E.P.目標達成","S.T.E.P.エキシビジョンマッチ"
  ];
  

  
function nouhauSearchByName(_name){
  for (var i = 0; i < nouhau.length; i++) {
    
  }
}

const nouhauImages = [];
for (var i = 0; i < nouhau.length; i++) {
  let _num = i +1;
  if(_num >= 0 && _num <= 9)_num = "00" + _num;
  if(_num >= 10 && _num <= 99)_num = "0" + _num;
  let _img = new Image();
  _img.src = "./image/nouhau" + _num + ".png";
  nouhauImages.push(_img);
}


class Book {
  constructor(isSumple = 0) {
    this.charactor;
    this.date = [];
    this.tag = [];
    this.vo;
    this.da;
    this.vi;
    this.me;
    this.nouhau = [];

    if (isSumple != 0) {
      //サンプルを作成
      function randomNum(a, b) { //a以上b以下の乱数を返す a,bは整数
        return a + Math.floor(Math.random() * (b - a + 1));
      }
      this.charactor = randomNum(0, charactors.length - 1);
      this.date = [randomNum(2000, 2024), randomNum(1, 12), randomNum(1, 31)];
      this.vo = randomNum(10, 20) *10;
      this.da = randomNum(10, 20) *10;
      this.vi = randomNum(10, 20) *10;
      this.me = randomNum(10, 20) *10;
      this.nouhau.push([randomNum(0, 31), randomNum(1, 5)]);
      for (var i = 0; i < 20; i++) {
        let _nouhauNum = randomNum(32, nouhau.length - 1);
        let canget = true;
        for (var j = 0; j < this.nouhau.length; j++) {
          if (this.nouhau[j][0] == _nouhauNum) canget = false;
          if (onlyNouhauTypes.includes(nouhau[_nouhauNum].type)) {
            if (nouhau[this.nouhau[j][0]].type == nouhau[_nouhauNum].type) canget = false;
          }
        }
        if (canget == true) this.nouhau.push([_nouhauNum, randomNum(1, 5)]);
      }
      //ノウハウを順番になるように入れ換える
      let nouhauX = this.nouhau.length - 1;
      if (nouhauX > 0) {
        while (nouhauX > 0) {
          for (var i = 0; i < nouhauX; i++) {
            if (this.nouhau[this.nouhau.length - 1 - i][0] < this.nouhau[this.nouhau.length - 1 - i - 1][0]) {
              let karioki = [this.nouhau[this.nouhau.length - 1 - i][0], this.nouhau[this.nouhau.length - 1 - i][1]];
              this.nouhau[this.nouhau.length - 1 - i] = [this.nouhau[this.nouhau.length - 1 - i - 1][0], this.nouhau[this.nouhau.length - 1 - i - 1][1]];
              this.nouhau[this.nouhau.length - 1 - i - 1] = karioki;
            }
          }
          nouhauX--;
        }
      }
    }
  }


}

class User{
  constructor(sampleBooksuu = 0){
    this.tags = [];
    this.books = [];
    this.hyoujis = [
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      
    ];
    
    this.kyoyouNouhauSettei = [1,1,1,1];//頭、ファンの声援、S.T.E.P.目標達成,S.T.E.P.エキシビジョンマッチ
    
    let _sampleBookSuu = sampleBooksuu;
    for (var i = 0; i < _sampleBookSuu; i++) {
      this.addBook(new Book(1));
    }
    if(_sampleBookSuu > 0){
      for (var i = 0; i < 10; i++) {
        this.tags.push("sampleTag" + i);
      }
    }
  }
  addBook(_book){
    this.books.push(_book);
  }
}

let user = new User();
let userOkiba = []; //サンプルを利用時、現在のuserobjをおいておく
let monitorOkiba = [];

function sample(){
  let _con = window.confirm("サンプルモードにしますか?\nサンプルモード中にここでキャンセルを押すとサンプルモードを終えます。");
  if(_con == true){
    if(userOkiba.length == 0){
      userOkiba.push(user);
      monitorOkiba.push(monitor);
    }
    user = new User(16);
    monitor = new Monitor();
    monitor.gamen = [0, new Gamen2(), new Gamen3()];
    monitor.gamen[0] = new Gamen1();
    bookTourokuInputReset();
    tagHanei();
    monitor.bookReload(true);
  }else{
    if(userOkiba.length == 0)return;
    user = userOkiba[0];
    userOkiba = [];
    monitor = monitorOkiba[0];
    monitorOkiba = [];
    bookTourokuInputReset();
    tagHanei();
    monitor.bookReload(true);
  }
}



class BookTourokuJouhou{
  constructor(){
    this.tag =[];
    this.nouhau = [];
    this.nouhauNums = [];
  }
}
let bookTourokuJouhou = new BookTourokuJouhou();

