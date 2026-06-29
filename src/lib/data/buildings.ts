/**
 * 建築 Seed Data · v1
 *
 * 67 棟代表作，id / 設計者反推自 architects.ts 的 buildings[] 引用，
 * 其餘欄位（年代、地點、座標、類型、簡介）為 bootstrap。
 * lat/lng 為地標級精度，供 Map 圖釘使用。
 *
 * bodyText 為精簡版（60–120 字）、未來由 AI 擴充。
 * 規格見 docs/04-頁面設計/buildings-timeline.md、docs/05-內容架構/word-count-rules.md
 */

import type { Building } from "@/types/entity";

export const BUILDINGS: Building[] = [
  // Le Corbusier
  {
    id: "villa-savoye", type: "building",
    name: { zh: "薩伏伊別墅", en: "Villa Savoye" },
    architect: "le-corbusier", movement: "purism",
    year: { design: 1928, completed: 1931 },
    location: { country: "FR", city: "Poissy", lat: 48.9242, lng: 2.0277 },
    buildingType: "residential", importance: 5, wordCount: 300,
    tags: ["five-points", "white-villa"], relatedIds: [],
    bodyText: "柯比意純粹主義盛期的代表作，完整體現底層架空、自由平面、橫向長窗、自由立面與屋頂花園五項原則。白色量體懸浮於纖細柱列之上，被視為現代主義住宅的宣言。",
  },
  {
    id: "ronchamp", type: "building",
    name: { zh: "廊香教堂", en: "Notre Dame du Haut" },
    architect: "le-corbusier", movement: "brutalism",
    year: { completed: 1955 },
    location: { country: "FR", city: "Ronchamp", lat: 47.7042, lng: 6.6206 },
    buildingType: "religious", importance: 5, wordCount: 300,
    tags: ["concrete-shell", "pilgrimage"], relatedIds: [],
    bodyText: "柯比意戰後轉向的關鍵作。彎曲的厚牆、上揚的混凝土屋頂與不規則開窗，捨棄機械理性、改以塑性與光線經營朝聖空間，展現他晚期的雕塑性語言。",
  },
  {
    id: "unite-marseille", type: "building",
    name: { zh: "馬賽公寓", en: "Unité d'Habitation" },
    architect: "le-corbusier", movement: "brutalism",
    year: { completed: 1952 },
    location: { country: "FR", city: "Marseille", lat: 43.2598, lng: 5.3960 },
    buildingType: "residential", importance: 5, wordCount: 300,
    tags: ["beton-brut", "vertical-city"], relatedIds: [],
    bodyText: "將集合住宅構想為「垂直村落」，內含商店街與屋頂公共設施。未修飾的清水混凝土與模矩人體尺度（Modulor），成為粗獷主義與戰後公共住宅的原型。",
  },

  // Mies van der Rohe
  {
    id: "farnsworth-house", type: "building",
    name: { zh: "范斯沃斯宅", en: "Farnsworth House" },
    architect: "mies-van-der-rohe", movement: "international-style",
    year: { completed: 1951 },
    location: { country: "US", city: "Plano", lat: 41.6356, lng: -88.5360 },
    buildingType: "residential", importance: 4, wordCount: 300,
    tags: ["glass-box", "less-is-more"], relatedIds: [],
    bodyText: "懸浮於河畔的白色鋼骨玻璃盒，內外以全玻璃牆消融界線。密斯以極度精簡的結構與通用空間，將「Less is more」推向住宅的極致。",
  },
  {
    id: "seagram-building", type: "building",
    name: { zh: "西格拉姆大廈", en: "Seagram Building" },
    architect: "mies-van-der-rohe", movement: "international-style",
    year: { completed: 1958 },
    location: { country: "US", city: "New York", lat: 40.7587, lng: -73.9719 },
    buildingType: "commercial", importance: 5, wordCount: 300,
    tags: ["curtain-wall", "plaza"], relatedIds: [],
    bodyText: "青銅與茶色玻璃帷幕的辦公塔，退縮出前廣場讓出都市公共空間。其比例與細部成為戰後企業總部的範本，定義了國際樣式的摩天樓語言。",
  },
  {
    id: "barcelona-pavilion", type: "building",
    name: { zh: "巴塞隆納德國館", en: "Barcelona Pavilion" },
    architect: "mies-van-der-rohe", movement: "international-style",
    year: { completed: 1929 },
    location: { country: "ES", city: "Barcelona", lat: 41.3704, lng: 2.1500 },
    buildingType: "cultural", importance: 5, wordCount: 300,
    tags: ["flowing-space", "marble"], relatedIds: [],
    bodyText: "1929 年世界博覽會的德國館，以自由佇立的大理石牆面與水池界定連續流動的空間。雖為臨時建築，卻成為現代主義空間觀的經典，後於 1986 年重建。",
  },

  // Frank Lloyd Wright
  {
    id: "fallingwater", type: "building",
    name: { zh: "落水山莊", en: "Fallingwater" },
    architect: "frank-lloyd-wright", movement: "organic",
    year: { design: 1935, completed: 1937 },
    location: { country: "US", city: "Mill Run", lat: 39.9064, lng: -79.4681 },
    buildingType: "residential", importance: 5, wordCount: 300,
    tags: ["cantilever", "nature-integration"], relatedIds: [],
    bodyText: "懸挑於瀑布之上的住宅，水平混凝土平台層層出挑、與岩盤和溪流交織。萊特有機建築思想的極致演出，將結構、地景與居住融為連續整體。",
  },
  {
    id: "guggenheim-ny", type: "building",
    name: { zh: "紐約古根漢美術館", en: "Guggenheim Museum" },
    architect: "frank-lloyd-wright", movement: "organic",
    year: { completed: 1959 },
    location: { country: "US", city: "New York", lat: 40.7830, lng: -73.9590 },
    buildingType: "cultural", importance: 5, wordCount: 300,
    tags: ["spiral-ramp", "continuous"], relatedIds: [],
    bodyText: "以連續螺旋坡道串起展覽動線的白色量體，參觀者沿斜坡盤旋而下。萊特晚年對連續空間的實驗，是紐約最具辨識度的現代主義地標之一。",
  },
  {
    id: "robie-house", type: "building",
    name: { zh: "羅比之家", en: "Robie House" },
    architect: "frank-lloyd-wright", movement: "prairie-style",
    year: { completed: 1910 },
    location: { country: "US", city: "Chicago", lat: 41.7896, lng: -87.5959 },
    buildingType: "residential", importance: 4, wordCount: 200,
    tags: ["horizontal", "prairie"], relatedIds: [],
    bodyText: "草原學派的成熟之作，深長出挑的屋簷、連續的帶狀窗與水平磚牆，將建築與中西部平坦地景緊密呼應，開放平面圍繞中央壁爐展開。",
  },

  // Louis Kahn
  {
    id: "kimbell-art-museum", type: "building",
    name: { zh: "金貝爾美術館", en: "Kimbell Art Museum" },
    architect: "louis-kahn", movement: "monumental-modernism",
    year: { completed: 1972 },
    location: { country: "US", city: "Fort Worth", lat: 32.7488, lng: -97.3650 },
    buildingType: "cultural", importance: 5, wordCount: 300,
    tags: ["cycloid-vault", "natural-light"], relatedIds: [],
    bodyText: "以連續擺線拱頂與頂部細縫引入柔和天光，混凝土與洞石的素樸質感映照在展品上。康對自然光與紀念性的探索，被視為美術館建築的標竿。",
  },
  {
    id: "salk-institute", type: "building",
    name: { zh: "沙克生物研究所", en: "Salk Institute" },
    architect: "louis-kahn", movement: "monumental-modernism",
    year: { completed: 1965 },
    location: { country: "US", city: "La Jolla", lat: 32.8872, lng: -117.2455 },
    buildingType: "educational", importance: 5, wordCount: 300,
    tags: ["symmetry", "pacific"], relatedIds: [],
    bodyText: "兩排實驗室夾出一道朝向太平洋的對稱中庭，一線水渠指向地平線。清水混凝土與柚木構件的精準細部，使科學殿堂兼具靜謐與紀念性。",
  },
  {
    id: "dhaka-parliament", type: "building",
    name: { zh: "達卡國會大廈", en: "Jatiyo Sangsad Bhaban" },
    architect: "louis-kahn", movement: "monumental-modernism",
    year: { completed: 1982 },
    location: { country: "BD", city: "Dhaka", lat: 23.7625, lng: 90.3783 },
    buildingType: "public", importance: 4, wordCount: 300,
    tags: ["geometric-openings", "civic"], relatedIds: [],
    bodyText: "孟加拉國會建築群，巨大的幾何開口切入厚重混凝土量體，引入光線並抵禦酷熱。康逝世後完工，是其紀念性語言與光線哲學的集大成。",
  },

  // Philip Johnson
  {
    id: "glass-house", type: "building",
    name: { zh: "玻璃屋", en: "Glass House" },
    architect: "philip-johnson", movement: "international-style",
    year: { completed: 1949 },
    location: { country: "US", city: "New Canaan", lat: 41.1437, lng: -73.5043 },
    buildingType: "residential", importance: 4, wordCount: 200,
    tags: ["transparency", "miesian"], relatedIds: [],
    bodyText: "強生的自宅，四面全玻璃、僅以磚砌圓柱收納設備。受密斯影響、與范斯沃斯宅呼應，將通透住宅與周圍地景視為一體的展示。",
  },
  {
    id: "att-building", type: "building",
    name: { zh: "AT&T 大樓", en: "AT&T Building" },
    architect: "philip-johnson", movement: "postmodernism",
    year: { completed: 1984 },
    location: { country: "US", city: "New York", lat: 40.7607, lng: -73.9719 },
    buildingType: "commercial", importance: 4, wordCount: 200,
    tags: ["chippendale-top", "historicism"], relatedIds: [],
    bodyText: "頂部山牆形如齊本德爾家具的辦公塔，公然引用歷史裝飾，成為後現代主義摩天樓的標誌，宣告國際樣式單一美學的鬆動。",
  },

  // Luis Barragán
  {
    id: "casa-barragan", type: "building",
    name: { zh: "巴拉岡自宅", en: "Casa Barragán" },
    architect: "luis-barragan", movement: "emotional-architecture",
    year: { completed: 1948 },
    location: { country: "MX", city: "Mexico City", lat: 19.4116, lng: -99.1920 },
    buildingType: "residential", importance: 4, wordCount: 200,
    tags: ["color", "light"], relatedIds: [],
    bodyText: "巴拉岡的住宅兼工作室，以厚牆、木梁與引入光線的天井經營靜謐。鮮明色面與樸素材料交織出內省而詩意的空間，是情感建築的核心範例。",
  },
  {
    id: "torres-satelite", type: "building",
    name: { zh: "衛星城塔", en: "Torres de Satélite" },
    architect: "luis-barragan", movement: "emotional-architecture",
    year: { completed: 1958 },
    location: { country: "MX", city: "Naucalpan", lat: 19.5095, lng: -99.2370 },
    buildingType: "memorial", importance: 3, wordCount: 200,
    tags: ["color", "urban-sculpture"], relatedIds: [],
    bodyText: "巴拉岡與 Goeritz 合作的五座三角彩色高塔，矗立於公路中央作為都市地標。純粹的色彩與量體，將雕塑、建築與情感建築宣言結合為公共經驗。",
  },

  // I.M. Pei
  {
    id: "louvre-pyramid", type: "building",
    name: { zh: "羅浮宮金字塔", en: "Louvre Pyramid" },
    architect: "ieoh-ming-pei", movement: "late-modernism",
    year: { completed: 1989 },
    location: { country: "FR", city: "Paris", lat: 48.8611, lng: 2.3358 },
    buildingType: "cultural", importance: 5, wordCount: 300,
    tags: ["glass-geometry", "intervention"], relatedIds: [],
    bodyText: "羅浮宮中庭的玻璃鋼構金字塔，作為地下大廳的採光入口。以純粹幾何回應古典宮殿，曾引發爭議，如今成為巴黎最知名的現代介入。",
  },
  {
    id: "bank-of-china-tower", type: "building",
    name: { zh: "中銀大廈", en: "Bank of China Tower" },
    architect: "ieoh-ming-pei", movement: "late-modernism",
    year: { completed: 1990 },
    location: { country: "HK", city: "Hong Kong", lat: 22.2783, lng: 114.1614 },
    buildingType: "commercial", importance: 4, wordCount: 200,
    tags: ["triangulated", "structure"], relatedIds: [],
    bodyText: "以三角形稜柱層層上收的摩天樓，外露的結構斜撐將風力高效傳遞至基座。幾何的純粹與結構的誠實，是貝聿銘晚期現代主義的代表。",
  },
  {
    id: "tunghai-luce-chapel", type: "building",
    name: { zh: "東海大學路思義教堂", en: "Luce Memorial Chapel" },
    architect: "ieoh-ming-pei", movement: "late-modernism",
    year: { completed: 1963 },
    location: { country: "TW", city: "Taichung", lat: 24.1817, lng: 120.5942 },
    buildingType: "religious", importance: 4, wordCount: 200,
    tags: ["hyperbolic-shell", "taiwan"], relatedIds: [],
    bodyText: "四片彎曲薄殼相互倚靠形成的教堂，頂部留出一線天光。貝聿銘與陳其寬合作，以雙曲面結構回應台灣氣候與在地工藝，是戰後台灣現代建築的地標。",
  },

  // Richard Meier
  {
    id: "getty-center", type: "building",
    name: { zh: "蓋蒂中心", en: "Getty Center" },
    architect: "richard-meier", movement: "white-architecture",
    year: { completed: 1997 },
    location: { country: "US", city: "Los Angeles", lat: 34.0780, lng: -118.4741 },
    buildingType: "cultural", importance: 4, wordCount: 200,
    tags: ["travertine", "white"], relatedIds: [],
    bodyText: "盤踞洛杉磯山丘的白色建築群，以洞石與金屬板交織出明晰的幾何秩序。邁耶將純粹主義語彙放大為整座文化園區，光線與量體經營得一絲不苟。",
  },
  {
    id: "ara-pacis-museum", type: "building",
    name: { zh: "和平祭壇博物館", en: "Ara Pacis Museum" },
    architect: "richard-meier", movement: "white-architecture",
    year: { completed: 2006 },
    location: { country: "IT", city: "Rome", lat: 41.9061, lng: 12.4753 },
    buildingType: "cultural", importance: 3, wordCount: 200,
    tags: ["white", "intervention"], relatedIds: [],
    bodyText: "為保護古羅馬和平祭壇而建的玻璃與白牆展館，是二戰後羅馬歷史中心的首件當代建築，引入光線的同時也引發關於介入古城的爭論。",
  },

  // Kenzo Tange
  {
    id: "hiroshima-peace-memorial", type: "building",
    name: { zh: "廣島和平紀念資料館", en: "Hiroshima Peace Memorial Museum" },
    architect: "kenzo-tange", movement: "monumental-modernism",
    year: { completed: 1955 },
    location: { country: "JP", city: "Hiroshima", lat: 34.3914, lng: 132.4530 },
    buildingType: "memorial", importance: 4, wordCount: 200,
    tags: ["pilotis", "axis"], relatedIds: [],
    bodyText: "架空於底層柱列上的長條量體，與紀念碑、原爆圓頂共構紀念軸線。丹下健三戰後成名作，將現代主義與日本紀念性結合，奠定其國際地位。",
  },
  {
    id: "yoyogi-gym", type: "building",
    name: { zh: "代代木競技場", en: "Yoyogi National Gymnasium" },
    architect: "kenzo-tange", movement: "metabolism",
    year: { completed: 1964 },
    location: { country: "JP", city: "Tokyo", lat: 35.6672, lng: 139.7000 },
    buildingType: "public", importance: 5, wordCount: 300,
    tags: ["suspension", "olympics"], relatedIds: [],
    bodyText: "為 1964 東京奧運而建，以懸索結構撐起流暢曲線的屋頂。丹下健三將現代結構技術與日本傳統屋頂意象融合，是代謝派時期的傑作。",
  },
  {
    id: "fuji-tv-building", type: "building",
    name: { zh: "富士電視台大樓", en: "Fuji TV Building" },
    architect: "kenzo-tange", movement: "metabolism",
    year: { completed: 1996 },
    location: { country: "JP", city: "Tokyo", lat: 35.6266, lng: 139.7740 },
    buildingType: "commercial", importance: 3, wordCount: 200,
    tags: ["megastructure", "sphere"], relatedIds: [],
    bodyText: "台場的格狀巨型結構，中央懸著一顆銀色球體觀景台。丹下晚期作品，延續代謝派對巨型框架與可置入單元的構想，成為臨海副都心的地標。",
  },

  // Oscar Niemeyer
  {
    id: "brasilia-national-congress", type: "building",
    name: { zh: "巴西利亞國會大廈", en: "National Congress of Brazil" },
    architect: "oscar-niemeyer", movement: "monumental-modernism",
    year: { completed: 1960 },
    location: { country: "BR", city: "Brasília", lat: -15.7997, lng: -47.8645 },
    buildingType: "public", importance: 5, wordCount: 300,
    tags: ["dome-and-bowl", "capital"], relatedIds: [],
    bodyText: "新首都的政治核心，一仰一覆的兩座碗形議事廳搭配雙塔。尼邁耶以雕塑般的曲面混凝土，賦予國家建築輕盈而象徵性的紀念感。",
  },
  {
    id: "niteroi-museum", type: "building",
    name: { zh: "尼泰羅伊當代藝術館", en: "Niterói Contemporary Art Museum" },
    architect: "oscar-niemeyer", movement: "monumental-modernism",
    year: { completed: 1996 },
    location: { country: "BR", city: "Niterói", lat: -22.9069, lng: -43.1265 },
    buildingType: "cultural", importance: 3, wordCount: 200,
    tags: ["flying-saucer", "curves"], relatedIds: [],
    bodyText: "立於海岬之上的飛碟形展館，單柱支撐、環形坡道盤旋而上。尼邁耶晚年的曲線詩學，將美術館本身化為俯瞰瓜納巴拉灣的雕塑。",
  },

  // Frank Gehry
  {
    id: "bilbao-guggenheim", type: "building",
    name: { zh: "畢爾包古根漢美術館", en: "Guggenheim Museum Bilbao" },
    architect: "frank-gehry", movement: "deconstructivism",
    year: { completed: 1997 },
    location: { country: "ES", city: "Bilbao", lat: 43.2687, lng: -2.9340 },
    buildingType: "cultural", importance: 5, wordCount: 300,
    tags: ["titanium", "bilbao-effect"], relatedIds: [],
    bodyText: "鈦金屬包覆的自由曲面量體沿河岸翻捲，以數位建模放樣而成。其帶動城市再生的「畢爾包效應」，使解構主義與地標經濟成為全球話題。",
  },
  {
    id: "walt-disney-concert-hall", type: "building",
    name: { zh: "華特迪士尼音樂廳", en: "Walt Disney Concert Hall" },
    architect: "frank-gehry", movement: "deconstructivism",
    year: { completed: 2003 },
    location: { country: "US", city: "Los Angeles", lat: 34.0553, lng: -118.2498 },
    buildingType: "cultural", importance: 4, wordCount: 200,
    tags: ["stainless-steel", "acoustics"], relatedIds: [],
    bodyText: "不鏽鋼曲面如風帆般展開的音樂廳，內部木質殼體為聲學精心調校。蓋瑞延續畢爾包的曲面語言，成為洛杉磯市中心的文化地標。",
  },

  // Aldo Rossi
  {
    id: "san-cataldo-cemetery", type: "building",
    name: { zh: "聖卡達多公墓", en: "San Cataldo Cemetery" },
    architect: "aldo-rossi", movement: "neo-rationalism",
    year: { design: 1971, completed: 1978 },
    location: { country: "IT", city: "Modena", lat: 44.6470, lng: 10.9250 },
    buildingType: "memorial", importance: 3, wordCount: 200,
    tags: ["typology", "archetype"], relatedIds: [],
    bodyText: "以骨架般的紅色立方、規律窗洞與中軸序列構成的公墓擴建。羅西用最簡的原型幾何喚起集體記憶與死亡的靜默，是新理性主義的宣言式作品。",
  },
  {
    id: "il-teatro-del-mondo", type: "building",
    name: { zh: "世界劇場", en: "Teatro del Mondo" },
    architect: "aldo-rossi", movement: "neo-rationalism",
    year: { completed: 1979 },
    location: { country: "IT", city: "Venice", lat: 45.4300, lng: 12.3400 },
    buildingType: "cultural", importance: 3, wordCount: 200,
    tags: ["floating", "biennale"], relatedIds: [],
    bodyText: "為威尼斯雙年展打造的漂浮木造劇場，可隨船拖行於潟湖。羅西以簡單幾何重訪威尼斯的歷史類型，將臨時建築化為城市記憶的寓言。",
  },

  // Robert Venturi
  {
    id: "vanna-venturi-house", type: "building",
    name: { zh: "母親之家", en: "Vanna Venturi House" },
    architect: "robert-venturi", movement: "postmodernism",
    year: { completed: 1964 },
    location: { country: "US", city: "Philadelphia", lat: 40.0700, lng: -75.2100 },
    buildingType: "residential", importance: 4, wordCount: 200,
    tags: ["gable", "complexity"], relatedIds: [],
    bodyText: "范裘利為母親設計的住宅，以斷裂的山牆與刻意的矛盾構圖回應《建築的複雜與矛盾》。被視為後現代主義的開端，向現代主義的純粹發出挑戰。",
  },
  {
    id: "sainsbury-wing", type: "building",
    name: { zh: "國家美術館塞恩斯伯里翼", en: "Sainsbury Wing" },
    architect: "robert-venturi", movement: "postmodernism",
    year: { completed: 1991 },
    location: { country: "GB", city: "London", lat: 51.5089, lng: -0.1295 },
    buildingType: "cultural", importance: 3, wordCount: 200,
    tags: ["contextual", "classical"], relatedIds: [],
    bodyText: "倫敦國家美術館的擴建，立面以漸變的古典壁柱呼應原館卻又刻意失序。范裘利夫婦以引用與反諷處理歷史脈絡，是後現代脈絡主義的代表。",
  },

  // Álvaro Siza
  {
    id: "leca-swimming-pools", type: "building",
    name: { zh: "萊薩海水游泳池", en: "Leça Swimming Pools" },
    architect: "alvaro-siza", movement: "critical-regionalism",
    year: { completed: 1966 },
    location: { country: "PT", city: "Matosinhos", lat: 41.2080, lng: -8.7180 },
    buildingType: "public", importance: 3, wordCount: 200,
    tags: ["landscape", "concrete"], relatedIds: [],
    bodyText: "嵌入礁岩海岸的混凝土泳池，低矮的牆面順應地形、引導動線而不破壞地貌。西薩以克制的手法回應場所，是批判性地域主義的早期典範。",
  },
  {
    id: "iberê-camargo-foundation", type: "building",
    name: { zh: "伊貝拉·卡馬戈基金會", en: "Iberê Camargo Foundation" },
    architect: "alvaro-siza", movement: "critical-regionalism",
    year: { completed: 2008 },
    location: { country: "BR", city: "Porto Alegre", lat: -30.0850, lng: -51.2440 },
    buildingType: "cultural", importance: 3, wordCount: 200,
    tags: ["white-concrete", "ramps"], relatedIds: [],
    bodyText: "臨河而立的白色混凝土美術館，懸挑的封閉坡道在量體外側來回穿梭。西薩以雕塑般的純白量體與精準採光，延續其對光線與動線的長期探索。",
  },

  // Fumihiko Maki
  {
    id: "spiral-tokyo", type: "building",
    name: { zh: "螺旋大廈", en: "Spiral Building" },
    architect: "fumihiko-maki", movement: "post-metabolism",
    year: { completed: 1985 },
    location: { country: "JP", city: "Tokyo", lat: 35.6650, lng: 139.7120 },
    buildingType: "cultural", importance: 3, wordCount: 200,
    tags: ["collage", "facade"], relatedIds: [],
    bodyText: "表參道的複合文化設施，立面拼貼幾何元素、內部以螺旋坡道串連。槙文彥以細膩的層次與拼接，體現其「群造形」與後代謝的都市觀。",
  },
  {
    id: "4-wtc", type: "building",
    name: { zh: "世貿中心四號大樓", en: "4 World Trade Center" },
    architect: "fumihiko-maki", movement: "post-metabolism",
    year: { completed: 2013 },
    location: { country: "US", city: "New York", lat: 40.7115, lng: -74.0119 },
    buildingType: "commercial", importance: 3, wordCount: 200,
    tags: ["minimal", "glass"], relatedIds: [],
    bodyText: "世貿重建中最內斂的一棟，極簡玻璃量體隨角度反射天空、近乎消隱。槙文彥以低調的精準，回應紀念場域中的克制與尊重。",
  },

  // Tadao Ando
  {
    id: "church-of-the-light", type: "building",
    name: { zh: "光之教堂", en: "Church of the Light" },
    architect: "tadao-ando", movement: "minimalism",
    year: { completed: 1989 },
    location: { country: "JP", city: "Ibaraki", lat: 34.8516, lng: 135.5670 },
    buildingType: "religious", importance: 5, wordCount: 300,
    tags: ["light-cross", "concrete"], relatedIds: [],
    bodyText: "清水混凝土盒體的端牆切出十字開口，光線化為發亮的十字架。安藤以最極簡的元素——混凝土、光與虛空，營造強烈的精神場域。",
  },
  {
    id: "sumiyoshi-row-house", type: "building",
    name: { zh: "住吉長屋", en: "Row House in Sumiyoshi" },
    architect: "tadao-ando", movement: "critical-regionalism",
    year: { completed: 1976 },
    location: { country: "JP", city: "Osaka", lat: 34.6100, lng: 135.5000 },
    buildingType: "residential", importance: 4, wordCount: 200,
    tags: ["courtyard", "minimal"], relatedIds: [],
    bodyText: "插入舊町連棟之間的混凝土住宅，中央的露天中庭迫使居者與天候相處。安藤的成名作，以嚴格的幾何與材料節制回應都市與自然。",
  },

  // Rafael Moneo
  {
    id: "roman-museum-merida", type: "building",
    name: { zh: "國立羅馬藝術博物館", en: "National Museum of Roman Art" },
    architect: "rafael-moneo", movement: "critical-regionalism",
    year: { completed: 1986 },
    location: { country: "ES", city: "Mérida", lat: 38.9160, lng: -6.3380 },
    buildingType: "cultural", importance: 3, wordCount: 200,
    tags: ["brick-arches", "archaeology"], relatedIds: [],
    bodyText: "以羅馬式紅磚拱列構成的展館，疊置於古羅馬遺址之上。莫內歐用當代手法重述古典營造邏輯，讓建築與考古現場相互闡釋。",
  },
  {
    id: "kursaal-san-sebastian", type: "building",
    name: { zh: "庫薩爾會議中心", en: "Kursaal Congress Centre" },
    architect: "rafael-moneo", movement: "critical-regionalism",
    year: { completed: 1999 },
    location: { country: "ES", city: "San Sebastián", lat: 43.3230, lng: -1.9790 },
    buildingType: "cultural", importance: 3, wordCount: 200,
    tags: ["glass-cubes", "coast"], relatedIds: [],
    bodyText: "海濱的兩座半透明玻璃量體，如「兩塊擱淺的礁石」般微微傾斜。莫內歐以發光的曲面玻璃回應海與光，夜裡成為城市的燈籠。",
  },

  // Renzo Piano
  {
    id: "pompidou-center", type: "building",
    name: { zh: "龐畢度中心", en: "Centre Pompidou" },
    architect: "renzo-piano", coArchitects: ["richard-rogers"], movement: "high-tech",
    year: { completed: 1977 },
    location: { country: "FR", city: "Paris", lat: 48.8607, lng: 2.3522 },
    buildingType: "cultural", importance: 5, wordCount: 300,
    tags: ["inside-out", "services"], relatedIds: [],
    bodyText: "皮亞諾與羅傑斯將結構、管線與電扶梯全部翻到立面外，騰出完全彈性的室內。鮮明的彩色管線使其成為高科技建築的開山之作。",
  },
  {
    id: "the-shard", type: "building",
    name: { zh: "碎片大廈", en: "The Shard" },
    architect: "renzo-piano", movement: "high-tech",
    year: { completed: 2012 },
    location: { country: "GB", city: "London", lat: 51.5045, lng: -0.0865 },
    buildingType: "commercial", importance: 4, wordCount: 200,
    tags: ["spire", "fractured-glass"], relatedIds: [],
    bodyText: "西歐最高樓之一，向上收束的碎玻璃尖塔由不完全密合的玻璃斜面構成。皮亞諾以「垂直城市」構想，將辦公、旅館與觀景台疊合於泰晤士河畔。",
  },
  {
    id: "menil-collection", type: "building",
    name: { zh: "梅尼爾收藏館", en: "The Menil Collection" },
    architect: "renzo-piano", movement: "high-tech",
    year: { completed: 1987 },
    location: { country: "US", city: "Houston", lat: 29.7375, lng: -95.3980 },
    buildingType: "cultural", importance: 3, wordCount: 200,
    tags: ["daylight", "leaf-louvers"], relatedIds: [],
    bodyText: "低矮的展館以鑄鐵「葉片」天花過濾自然光，讓藝術品在均質日光下展出。皮亞諾以精緻構造與克制尺度，示範了高科技手法的柔性一面。",
  },

  // Norman Foster
  {
    id: "hsbc-hong-kong", type: "building",
    name: { zh: "香港滙豐總行大廈", en: "HSBC Building" },
    architect: "norman-foster", movement: "high-tech",
    year: { completed: 1985 },
    location: { country: "HK", city: "Hong Kong", lat: 22.2800, lng: 114.1590 },
    buildingType: "commercial", importance: 4, wordCount: 200,
    tags: ["suspension", "atrium"], relatedIds: [],
    bodyText: "以外露的桁架懸吊樓層、騰空底層作為公共穿越空間的銀行總部。福斯特將結構與機能高度精密化，是高科技建築的旗艦之作。",
  },
  {
    id: "gherkin", type: "building",
    name: { zh: "小黃瓜", en: "30 St Mary Axe" },
    architect: "norman-foster", movement: "high-tech",
    year: { completed: 2003 },
    location: { country: "GB", city: "London", lat: 51.5145, lng: -0.0803 },
    buildingType: "commercial", importance: 4, wordCount: 200,
    tags: ["diagrid", "aerodynamic"], relatedIds: [],
    bodyText: "子彈形的斜交網格玻璃塔，螺旋上升的通風中庭降低能耗。福斯特以空氣動力造型與環境策略，成為倫敦金融城最具辨識度的天際線。",
  },
  {
    id: "apple-park", type: "building",
    name: { zh: "Apple Park", en: "Apple Park" },
    architect: "norman-foster", movement: "high-tech",
    year: { completed: 2017 },
    location: { country: "US", city: "Cupertino", lat: 37.3349, lng: -122.0090 },
    buildingType: "commercial", importance: 4, wordCount: 200,
    tags: ["ring", "curved-glass"], relatedIds: [],
    bodyText: "直徑近一公里的環形總部，外牆為世界最大的曲面玻璃板，圍繞中央庭園。福斯特與 Apple 將精密製造的精神延伸到建築尺度。",
  },

  // Rem Koolhaas / OMA
  {
    id: "cctv-headquarters", type: "building",
    name: { zh: "央視總部大樓", en: "CCTV Headquarters" },
    architect: "rem-koolhaas", firm: "oma", movement: "bigness",
    year: { completed: 2012 },
    location: { country: "CN", city: "Beijing", lat: 39.9150, lng: 116.4640 },
    buildingType: "commercial", importance: 5, wordCount: 300,
    tags: ["loop", "structure"], relatedIds: [],
    bodyText: "兩座傾斜塔樓在高空與底部相連、形成連續迴圈的巨型結構。庫哈斯以此挑戰摩天樓「越高越好」的邏輯，是「Bigness」理論的具現。",
  },
  {
    id: "seattle-central-library", type: "building",
    name: { zh: "西雅圖中央圖書館", en: "Seattle Central Library" },
    architect: "rem-koolhaas", firm: "oma", movement: "deconstructivism",
    year: { completed: 2004 },
    location: { country: "US", city: "Seattle", lat: 47.6067, lng: -122.3325 },
    buildingType: "public", importance: 4, wordCount: 200,
    tags: ["book-spiral", "diagrid"], relatedIds: [],
    bodyText: "依機能重組為錯位堆疊的玻璃量體，連續的「書籍螺旋」串起藏書。庫哈斯以圖解式設計重新定義圖書館的空間秩序與公共性。",
  },

  // Herzog & de Meuron
  {
    id: "tate-modern", type: "building",
    name: { zh: "泰特現代美術館", en: "Tate Modern" },
    architect: "herzog-de-meuron", movement: "material-architecture",
    year: { completed: 2000 },
    location: { country: "GB", city: "London", lat: 51.5076, lng: -0.0994 },
    buildingType: "cultural", importance: 4, wordCount: 200,
    tags: ["adaptive-reuse", "turbine-hall"], relatedIds: [],
    bodyText: "由河畔發電廠改造的美術館，巨大的渦輪廳成為標誌性的公共大廳。赫佐格與德穆隆以克制的介入保留工業量體，重新定義了再利用的可能。",
  },
  {
    id: "beijing-national-stadium", type: "building",
    name: { zh: "北京國家體育場", en: "Beijing National Stadium" },
    architect: "herzog-de-meuron", movement: "material-architecture",
    year: { completed: 2008 },
    location: { country: "CN", city: "Beijing", lat: 39.9928, lng: 116.3975 },
    buildingType: "public", importance: 5, wordCount: 300,
    tags: ["birds-nest", "lattice"], relatedIds: [],
    bodyText: "因鋼構交織如鳥巢而得名的奧運主場館，結構與外觀合而為一。赫佐格與德穆隆（與艾未未合作）將表皮、結構與意象融為一體的代表作。",
  },
  {
    id: "elbphilharmonie", type: "building",
    name: { zh: "易北愛樂廳", en: "Elbphilharmonie" },
    architect: "herzog-de-meuron", movement: "material-architecture",
    year: { completed: 2017 },
    location: { country: "DE", city: "Hamburg", lat: 53.5413, lng: 9.9841 },
    buildingType: "cultural", importance: 4, wordCount: 200,
    tags: ["glass-wave", "on-warehouse"], relatedIds: [],
    bodyText: "波浪狀玻璃量體疊放於舊倉庫之上的音樂廳，曲面玻璃映照港灣天空。赫佐格與德穆隆將歷史磚體與當代表皮並置，成為漢堡的新地標。",
  },

  // Glenn Murcutt
  {
    id: "magney-house", type: "building",
    name: { zh: "麥格尼宅", en: "Magney House" },
    architect: "glenn-murcutt", movement: "vernacular-modernism",
    year: { completed: 1984 },
    location: { country: "AU", city: "Bingie", lat: -35.9000, lng: 150.1500 },
    buildingType: "residential", importance: 3, wordCount: 200,
    tags: ["corrugated-roof", "climate"], relatedIds: [],
    bodyText: "面海的長條住宅，單斜的金屬屋頂順應日照與集水。墨卡特「輕觸大地」的代表作，以在地材料與被動式設計回應澳洲氣候與地景。",
  },
  {
    id: "marie-short-house", type: "building",
    name: { zh: "瑪麗·蕭宅", en: "Marie Short House" },
    architect: "glenn-murcutt", movement: "vernacular-modernism",
    year: { completed: 1975 },
    location: { country: "AU", city: "Kempsey", lat: -31.0800, lng: 152.8400 },
    buildingType: "residential", importance: 3, wordCount: 200,
    tags: ["timber", "verandah"], relatedIds: [],
    bodyText: "兩座可錯動的木造棚屋，以可調百葉與通風回應亞熱帶氣候。墨卡特早期的鄉土現代主義作品，奠定其輕量、在地、貼近自然的設計語言。",
  },

  // Zaha Hadid
  {
    id: "maxxi-museum", type: "building",
    name: { zh: "MAXXI 國立 21 世紀藝術博物館", en: "MAXXI Museum" },
    architect: "zaha-hadid", movement: "parametricism",
    year: { completed: 2010 },
    location: { country: "IT", city: "Rome", lat: 41.9280, lng: 12.4670 },
    buildingType: "cultural", importance: 4, wordCount: 200,
    tags: ["flowing", "concrete-streams"], relatedIds: [],
    bodyText: "如河流般交織彎曲的混凝土展廊，動線連續流動、模糊樓層界線。哈蒂將其「流體空間」概念落實於羅馬，是參數化主義成熟期的代表。",
  },
  {
    id: "guangzhou-opera-house", type: "building",
    name: { zh: "廣州大劇院", en: "Guangzhou Opera House" },
    architect: "zaha-hadid", movement: "parametricism",
    year: { completed: 2010 },
    location: { country: "CN", city: "Guangzhou", lat: 23.1190, lng: 113.3210 },
    buildingType: "cultural", importance: 4, wordCount: 200,
    tags: ["twin-boulders", "fluid"], relatedIds: [],
    bodyText: "如珠江畔被沖刷的兩塊巨石，傾斜的量體與連續表皮一氣呵成。哈蒂以參數化手法統合結構與造型，將自然意象轉化為都市文化地標。",
  },
  {
    id: "heydar-aliyev-center", type: "building",
    name: { zh: "阿利耶夫文化中心", en: "Heydar Aliyev Center" },
    architect: "zaha-hadid", movement: "parametricism",
    year: { completed: 2012 },
    location: { country: "AZ", city: "Baku", lat: 40.3960, lng: 49.8670 },
    buildingType: "cultural", importance: 4, wordCount: 200,
    tags: ["continuous-surface", "fluid"], relatedIds: [],
    bodyText: "地面如波浪般揚起、化為連續流動的白色表皮，消解牆與屋頂的分界。哈蒂以無接縫的曲面，將「連續性」推向極致的參數化宣言。",
  },

  // Peter Zumthor
  {
    id: "therme-vals", type: "building",
    name: { zh: "瓦爾斯溫泉浴場", en: "Therme Vals" },
    architect: "peter-zumthor", movement: "phenomenology",
    year: { completed: 1996 },
    location: { country: "CH", city: "Vals", lat: 46.6190, lng: 9.1810 },
    buildingType: "public", importance: 5, wordCount: 300,
    tags: ["local-stone", "atmosphere"], relatedIds: [],
    bodyText: "以在地片麻岩層層砌成、半嵌入山坡的溫泉浴場，光、水、石與溫度共構沉靜的氛圍。卒姆托建築現象學的代表，主張身體在場的知覺經驗。",
  },
  {
    id: "bruder-klaus-chapel", type: "building",
    name: { zh: "克勞斯兄弟田野禮拜堂", en: "Bruder Klaus Field Chapel" },
    architect: "peter-zumthor", movement: "phenomenology",
    year: { completed: 2007 },
    location: { country: "DE", city: "Mechernich", lat: 50.5430, lng: 6.6760 },
    buildingType: "religious", importance: 3, wordCount: 200,
    tags: ["rammed-concrete", "burnt-formwork"], relatedIds: [],
    bodyText: "農田中的小禮拜堂，內模以樹幹堆成、澆置混凝土後焚燒移除，留下焦黑而中空的洞穴。卒姆托以材料與工法本身，營造原始而動人的精神空間。",
  },

  // SANAA
  {
    id: "21st-century-museum-kanazawa", type: "building",
    name: { zh: "金澤 21 世紀美術館", en: "21st Century Museum of Contemporary Art" },
    architect: "sanaa", movement: "minimalism",
    year: { completed: 2004 },
    location: { country: "JP", city: "Kanazawa", lat: 36.5610, lng: 136.6580 },
    buildingType: "cultural", importance: 4, wordCount: 200,
    tags: ["circular", "transparency"], relatedIds: [],
    bodyText: "無正背面的圓形玻璃美術館，展間如散落的盒子漂浮其中，四面皆可進入。SANAA 以極致的通透與輕盈，模糊建築與公園、藝術與日常的界線。",
  },
  {
    id: "rolex-learning-center", type: "building",
    name: { zh: "勞力士學習中心", en: "Rolex Learning Center" },
    architect: "sanaa", movement: "minimalism",
    year: { completed: 2010 },
    location: { country: "CH", city: "Lausanne", lat: 46.5186, lng: 6.5680 },
    buildingType: "educational", importance: 4, wordCount: 200,
    tags: ["undulating-slab", "continuous"], relatedIds: [],
    bodyText: "一片連續起伏的樓板托起的學習空間，沒有樓梯與隔牆、以緩坡與孔洞界定區域。SANAA 將極簡推向地景化，創造流動而開放的校園心臟。",
  },

  // Wang Shu
  {
    id: "ningbo-museum", type: "building",
    name: { zh: "寧波博物館", en: "Ningbo History Museum" },
    architect: "wang-shu", movement: "material-architecture",
    year: { completed: 2008 },
    location: { country: "CN", city: "Ningbo", lat: 29.8180, lng: 121.5520 },
    buildingType: "cultural", importance: 4, wordCount: 200,
    tags: ["recycled-tiles", "wapan"], relatedIds: [],
    bodyText: "外牆以拆遷舊村回收的磚瓦砌成「瓦爿牆」，山體般的量體裂出縫隙與通道。王澍以在地材料與工法，將消逝的城市記憶封存於當代建築之中。",
  },
  {
    id: "china-academy-of-art-xiangshan", type: "building",
    name: { zh: "中國美術學院象山校區", en: "China Academy of Art, Xiangshan Campus" },
    architect: "wang-shu", movement: "critical-regionalism",
    year: { completed: 2007 },
    location: { country: "CN", city: "Hangzhou", lat: 30.1840, lng: 120.1150 },
    buildingType: "educational", importance: 3, wordCount: 200,
    tags: ["tiled-roofs", "landscape"], relatedIds: [],
    bodyText: "依山就勢、以回收瓦片與夯土營造的校園，建築隨地形蜿蜒、與農田水系交織。王澍以中國園林與鄉土營造的智慧，回應現代校園的尺度。",
  },

  // Toyo Ito
  {
    id: "sendai-mediatheque", type: "building",
    name: { zh: "仙台媒體中心", en: "Sendai Mediatheque" },
    architect: "toyo-ito", movement: "late-modernism",
    year: { completed: 2001 },
    location: { country: "JP", city: "Sendai", lat: 38.2620, lng: 140.8720 },
    buildingType: "public", importance: 4, wordCount: 200,
    tags: ["tube-structure", "transparency"], relatedIds: [],
    bodyText: "以搖曳如海草的格狀鋼管取代傳統柱與核，撐起通透的玻璃量體。伊東豐雄消解結構與隔間的界線，重新想像資訊時代的公共空間。",
  },
  {
    id: "taichung-opera-house", type: "building",
    name: { zh: "臺中國家歌劇院", en: "National Taichung Theater" },
    architect: "toyo-ito", movement: "late-modernism",
    year: { completed: 2016 },
    location: { country: "TW", city: "Taichung", lat: 24.1626, lng: 120.6400 },
    buildingType: "cultural", importance: 4, wordCount: 200,
    tags: ["curved-walls", "catenoid"], relatedIds: [],
    bodyText: "由連續曲面牆構成的「壺中居」，空間如洞窟般彼此貫通、沒有直角。伊東豐雄以複雜曲面結構，創造流動而有機的表演藝術空間。",
  },

  // Shigeru Ban
  {
    id: "paper-cathedral-christchurch", type: "building",
    name: { zh: "紙教堂", en: "Cardboard Cathedral" },
    architect: "shigeru-ban", movement: "sustainable",
    year: { completed: 2013 },
    location: { country: "NZ", city: "Christchurch", lat: -43.5340, lng: 172.6420 },
    buildingType: "religious", importance: 3, wordCount: 200,
    tags: ["paper-tubes", "disaster-relief"], relatedIds: [],
    bodyText: "震後為基督城重建的臨時主教座堂，以紙管構成 A 字形屋架。坂茂以可回收、易組裝的紙結構回應災後重建，展現低成本建築的尊嚴。",
  },
  {
    id: "centre-pompidou-metz", type: "building",
    name: { zh: "龐畢度梅斯中心", en: "Centre Pompidou-Metz" },
    architect: "shigeru-ban", movement: "sustainable",
    year: { completed: 2010 },
    location: { country: "FR", city: "Metz", lat: 49.1095, lng: 6.1820 },
    buildingType: "cultural", importance: 3, wordCount: 200,
    tags: ["timber-lattice", "membrane"], relatedIds: [],
    bodyText: "編織如帽的木構屋頂覆以半透明膜，下方展廊如長盒交錯穿出。坂茂以木格網結構與輕盈薄膜，將工程精度與自然意象結合於美術館分館。",
  },

  // Francis Kéré
  {
    id: "gando-primary-school", type: "building",
    name: { zh: "甘多小學", en: "Gando Primary School" },
    architect: "francis-kere", movement: "sustainable",
    year: { completed: 2001 },
    location: { country: "BF", city: "Gando", lat: 11.1800, lng: -0.7800 },
    buildingType: "educational", importance: 4, wordCount: 200,
    tags: ["clay", "passive-cooling"], relatedIds: [],
    bodyText: "凱雷為家鄉社區興建的小學，以在地黏土磚與架高的雙層屋頂達成被動式通風。社區參與營造、低成本而舒適，是永續與在地建築的典範。",
  },
  {
    id: "serpentine-pavilion-2017", type: "building",
    name: { zh: "蛇形藝廊涼亭 2017", en: "Serpentine Pavilion 2017" },
    architect: "francis-kere", movement: "sustainable",
    year: { completed: 2017 },
    location: { country: "GB", city: "London", lat: 51.5045, lng: -0.1750 },
    buildingType: "cultural", importance: 3, wordCount: 200,
    tags: ["tree-canopy", "community"], relatedIds: [],
    bodyText: "以家鄉樹下聚會為靈感的臨時涼亭，藍色弧牆圍出開放中庭、中央漏斗承接雨水。凱雷將西非的社群與氣候智慧帶入倫敦肯辛頓花園。",
  },
];

/** 依 slug 取建築 */
export function getBuildingBySlug(slug: string): Building | undefined {
  return BUILDINGS.find((b) => b.id === slug);
}

/** 取某建築師的代表作 */
export function getBuildingsByArchitect(architectId: string): Building[] {
  return BUILDINGS.filter((b) => b.architect === architectId);
}

/** 依完工十年分組（年表用），由舊到新 */
export function getBuildingsByDecade(): Array<{ decade: number; buildings: Building[] }> {
  const groups = new Map<number, Building[]>();
  for (const b of BUILDINGS) {
    const decade = Math.floor(b.year.completed / 10) * 10;
    const list = groups.get(decade) ?? [];
    list.push(b);
    groups.set(decade, list);
  }
  return [...groups.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([decade, buildings]) => ({
      decade,
      buildings: buildings.sort((a, b) => a.year.completed - b.year.completed),
    }));
}
