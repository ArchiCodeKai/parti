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
    // T3.4 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText: "柯比意「新建築五點」最完整的實現，1928 年設計、1931 年落成於巴黎近郊的普瓦西。純白的方形量體以一圈纖細的底層架空柱懸浮於草坡之上，讓車道與地面在建築下方自由穿行；室內以一道貫穿剖面的坡道取代樓梯，串起一段連續上升的「建築漫步」，橫向長窗把四周的田野裁成連續的畫框，屋頂花園則補回被建築佔去的綠地。它把自由平面、自由立面、底層架空與量體的輕盈同時推到極致，是純粹主義盛期與國際樣式的空間宣言。二戰期間曾遭佔用而殘破，戰後一度面臨拆除，經搶救與修復後列入世界遺產，至今仍是現代主義住宅無可取代的原型，也是後世建築師與學生反覆造訪、研究的朝聖對象，濃縮了柯比意早期對機器美學與新生活方式的全部主張。",
  },
  {
    id: "ronchamp", type: "building",
    name: { zh: "廊香教堂", en: "Notre Dame du Haut" },
    architect: "le-corbusier", movement: "brutalism",
    year: { completed: 1955 },
    location: { country: "FR", city: "Ronchamp", lat: 47.7042, lng: 6.6206 },
    buildingType: "religious", importance: 5, wordCount: 300,
    tags: ["concrete-shell", "pilgrimage"], relatedIds: [],
    // T3.4 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText: "柯比意戰後最具詩性的作品，1955 年落成於法國東部的孚日山區。他一反早期的機械理性與白色純粹，改以彎曲的厚牆、上翹如船底的深色混凝土屋頂與不規則散布的採光小窗，塑造出一座近乎雕塑的朝聖教堂。南牆深陷的窗洞嵌著彩色玻璃，光線經過厚牆的漏斗被拉長、染色後灑入昏暗的室內；牆與屋頂之間刻意留出一道細縫，使沉重的屋頂彷彿漂浮於空中。塑性的混凝土量體與手工粗糙的白牆，讓它成為粗獷主義感性一面的先聲，也標誌著現代主義從普世理性轉向地方、身體與精神經驗的重要一步，深刻影響了戰後宗教與紀念性建築對光線、氛圍與雕塑造型的處理，至今仍是朝聖者與建築人共同嚮往的目的地。",
  },
  {
    id: "unite-marseille", type: "building",
    name: { zh: "馬賽公寓", en: "Unité d'Habitation" },
    architect: "le-corbusier", movement: "brutalism",
    year: { completed: 1952 },
    location: { country: "FR", city: "Marseille", lat: 43.2598, lng: 5.3960 },
    buildingType: "residential", importance: 5, wordCount: 300,
    tags: ["beton-brut", "vertical-city"], relatedIds: [],
    // T3.4 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText: "柯比意「居住單元」構想的首次實現，1952 年落成於馬賽，是一座容納三百餘戶的垂直社區。整棟建築以粗大的底層架空柱撐起，量體依他自創的「模矩」人體比例系統設計；內部的公寓以剖面交錯的方式相互咬合，讓每戶都擁有跨越兩層的挑高與東西向的採光。中段樓層安插了一條室內商店街，屋頂則設有跑道、幼兒園與雕塑般的通風管與淺水池，把一整座小鎮的機能疊進單一的樓體。裸露的清水混凝土保留了模板的木紋與粗糙質感，成為粗獷主義的直接源頭，也是二十世紀集合住宅最具影響力的原型之一，其屋頂平台如今仍是市民與遊客俯瞰馬賽與地中海的去處。",
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
    // T3.4 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText: "密斯「通用空間」理念的極致，1951 年落成於伊利諾州的河畔草地。整棟住宅由八根白色工字鋼柱托起兩片水平樓板，四面以通透的落地玻璃圍合，室內幾乎不設隔間，只以一組居中的核心體區分機能，讓空間向四周的自然完全敞開。它把住宅還原為一個漂浮於地面之上、近乎透明的純粹幾何盒子，精確的節點與比例體現了「少即是多」與「神在細節裡」。這件作品因造價超支與隱私問題引發業主與建築師的著名訴訟，卻也成為現代主義玻璃住宅無可迴避的原型，深刻影響了戰後對居住與透明性的想像，也讓建築與自然之間的界線成為持續被討論的課題；如今它作為博物館對外開放。",
  },
  {
    id: "seagram-building", type: "building",
    name: { zh: "西格拉姆大廈", en: "Seagram Building" },
    architect: "mies-van-der-rohe", movement: "international-style",
    year: { completed: 1958 },
    location: { country: "US", city: "New York", lat: 40.7587, lng: -73.9719 },
    buildingType: "commercial", importance: 5, wordCount: 300,
    tags: ["curtain-wall", "plaza"], relatedIds: [],
    // T3.4 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText: "密斯與菲利普·強生合作，1958 年落成於紐約公園大道，是國際樣式辦公摩天樓的典範。深褐色的青銅帷幕與古銅色玻璃構成嚴謹而莊重的立面，外露的工字型豎框強化了垂直的韻律；建築刻意自街道退縮，在前方留出一方對稱的花崗岩廣場，為擁擠的曼哈頓創造了難得的公共空間。這種以退縮換取開放的手法後來被納入紐約的分區獎勵法規，影響了無數後繼的高層。它以極簡的元素與近乎古典的比例，證明了帷幕牆高層也能具備紀念性，成為戰後企業建築競相模仿的範本；一樓的四季餐廳室內同樣由密斯與強生設計，長年是紐約現代設計的地標，讓這棟辦公塔從街道到室內都成為都市中的紀念物。",
  },
  {
    id: "barcelona-pavilion", type: "building",
    name: { zh: "巴塞隆納德國館", en: "Barcelona Pavilion" },
    architect: "mies-van-der-rohe", movement: "international-style",
    year: { completed: 1929 },
    location: { country: "ES", city: "Barcelona", lat: 41.3704, lng: 2.1500 },
    buildingType: "cultural", importance: 5, wordCount: 300,
    tags: ["flowing-space", "marble"], relatedIds: [],
    // T3.4 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText: "密斯為 1929 年巴塞隆納世界博覽會設計的德國館，是流動空間的空間宣言。獨立的牆板在平面上自由錯落，不再圍合出封閉的房間，而是引導視線與身體在室內外之間連續穿行；一道縞瑪瑙牆、八根鍍鉻的十字鋼柱與兩方倒映天光的水池，把貴重材料的質感與精確的比例推到極致。展館本身並無明確的機能，而是一件供人漫步體驗的建築。原館在博覽會結束後隨即拆除，1986 年依原始圖檔在原址重建，讓後世得以親身驗證這件現代主義最重要的空間實驗，也印證了密斯早期語言的持久影響力；為展館設計的巴塞隆納椅也一併成為現代設計的經典，至今仍在世界各地持續生產、廣受收藏。",
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
    // T3.4 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText: "萊特有機建築最著名的證明，1935 年設計、1937 年落成於賓州的熊奔溪畔。他大膽地把鋼筋混凝土的水平陽台層層懸挑於瀑布正上方，讓建築直接凌空於流水，而非退到安全的對岸觀景；室內的壁爐與地板保留了基地原生的巨岩，粗獷的石牆與懸浮的樓板形成垂直與水平的張力。建築與地景在此互為結構、彼此滲透，實現了他所主張的「建築應從基地內部生長出來」。作為一棟週末別墅，它把居住、地形與流水編織成一體，成為二十世紀最廣為人知的住宅，也把有機建築的理念推向了世界；懸挑樓板日後出現的結構隱憂，讓它同時成為保存與修復技術的重要案例，如今作為博物館對外開放。",
  },
  {
    id: "guggenheim-ny", type: "building",
    name: { zh: "紐約古根漢美術館", en: "Guggenheim Museum" },
    architect: "frank-lloyd-wright", movement: "organic",
    year: { completed: 1959 },
    location: { country: "US", city: "New York", lat: 40.7830, lng: -73.9590 },
    buildingType: "cultural", importance: 5, wordCount: 300,
    tags: ["spiral-ramp", "continuous"], relatedIds: [],
    // T3.4 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText: "萊特晚年最激進的作品，1959 年落成於紐約第五大道，也在他辭世後不久開幕。他以一道連續螺旋上升的坡道取代傳統的分層展廳，訪客搭電梯直上頂端，再沿著緩坡一路下行看展，讓觀展成為一次不間斷的空間漫步；中央挑空的圓形中庭由頂部的天窗灑下自然光，整棟白色的量體在方正的曼哈頓街廓中宛如一件放大的雕塑。這種以建築本身主導觀看動線的手法在當時引發爭議，卻徹底改寫了美術館的類型，成為有機建築在都市尺度上的大膽宣言，至今仍是紐約最具辨識度的地標之一；儘管有人質疑螺旋牆面與傾斜地板不利於掛畫，它作為建築本身所提供的空間體驗卻無可取代。",
  },
  {
    id: "robie-house", type: "building",
    name: { zh: "羅比之家", en: "Robie House" },
    architect: "frank-lloyd-wright", movement: "prairie-style",
    year: { completed: 1910 },
    location: { country: "US", city: "Chicago", lat: 41.7896, lng: -87.5959 },
    buildingType: "residential", importance: 4, wordCount: 200,
    tags: ["horizontal", "prairie"], relatedIds: [],
    // T3.4 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText: "萊特草原式住宅的集大成，1910 年落成於芝加哥南區。低緩的屋頂以誇張深遠的出簷向兩側水平延伸，緊貼中西部的地平線；室內圍繞一座中央壁爐展開開放的平面，取消了傳統房間的隔閡，連續的窗帶與精心設計的鑲嵌玻璃把光線與外部的綠意引入。磚造的水平線條、懸挑的陽台與整體設計的家具，共同體現了他讓建築與地景融為一體的主張，是草原學派最成熟的範例，也預示了現代開放式住宅的空間觀。",
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
    // T3.4 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText: "路易斯·康對自然光最精妙的回應，1972 年落成於德州沃斯堡。美術館以一系列平行的清水混凝土擺線拱殼構成，每道拱頂中央開有一道狹長的天窗，光線經由弧形的鋁製反射板漫射到拱面，再柔和地灑落展廳，讓室內始終沐浴在銀色而均勻的自然光中。康以「靜謐與光明」概括這種追求，把展覽空間安置在近乎神殿的秩序裡；混凝土、洞石與玻璃的節制搭配，讓材料本身說話。它被公認為二十世紀最完美的美術館之一，成為後世處理博物館採光與尺度的參照原型；2013 年在其一旁增建的新館，也刻意以謙遜的姿態向這件經典致敬，印證了它歷久不衰的地位，也讓它被公認為現代美術館採光設計的巔峰。",
  },
  {
    id: "salk-institute", type: "building",
    name: { zh: "沙克生物研究所", en: "Salk Institute" },
    architect: "louis-kahn", movement: "monumental-modernism",
    year: { completed: 1965 },
    location: { country: "US", city: "La Jolla", lat: 32.8872, lng: -117.2455 },
    buildingType: "educational", importance: 5, wordCount: 300,
    tags: ["symmetry", "pacific"], relatedIds: [],
    // T3.4 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText: "路易斯·康為疫苗學家沙克設計的研究機構，1965 年落成於加州拉霍亞的太平洋岸。兩列對稱的清水混凝土實驗室量體夾出一方完全清空的石砌廣場，一道細窄的水渠沿中軸筆直伸向海平線，把整個場所的視線導向天與海。實驗樓層之間安插整層的服務夾層，體現他對「服務與被服務空間」的區分；面向中庭的一間間書房則以柚木斜牆迎向海景。康刻意以近乎修道院的空曠與秩序安置科學研究，讓建築同時承載沉思與莊嚴，被視為現代主義紀念性建築的高峰之一；那道指向太平洋、把天與海框成一體的空曠中軸，至今仍是建築攝影中最著名的一景，也讓無數訪客在此久久駐足。",
  },
  {
    id: "dhaka-parliament", type: "building",
    name: { zh: "達卡國會大廈", en: "Jatiyo Sangsad Bhaban" },
    architect: "louis-kahn", movement: "monumental-modernism",
    year: { completed: 1982 },
    location: { country: "BD", city: "Dhaka", lat: 23.7625, lng: 90.3783 },
    buildingType: "public", importance: 4, wordCount: 300,
    tags: ["geometric-openings", "civic"], relatedIds: [],
    // T3.4 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText: "路易斯·康晚年最宏大的作品，為新生的孟加拉設計的國會建築群，1982 年在他辭世八年後才告落成。主體以厚重的清水混凝土砌成，外牆嵌著圓形、三角與長方的巨大幾何開口，既遮擋南亞的烈日、又把光篩入內部的迴廊；中央的議事廳被層層的服務空間與水池環抱，如同一座被護城河圍繞的城堡。康以恆常的幾何與紀念性的尺度，為一個貧困而年輕的國家鑄造出超越時代的公共象徵。儘管工期漫長，它仍被視為二十世紀最重要的公共建築之一，也是康建築思想的集大成；在一個資源匱乏的年輕國度，它以磚石與混凝土完成了近乎永恆的公共尺度，被許多人視為當代最動人的民主空間之一。",
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
    // T3.4 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText: "菲利普·強生為自己設計的自宅，1949 年落成於康乃狄克州新迦南的一片林地。整棟住宅是一個四面全透明的玻璃盒，僅以一座磚砌的圓柱收納壁爐與浴室，其餘機能全數敞開，讓周圍的樹林與草坡成為唯一的「牆」。它明顯受到密斯范斯沃斯宅的啟發，卻更早落成，率先把通透住宅與自然合一的理念付諸實現。強生在同一片莊園中陸續增建多座風格各異的建築，玻璃屋則始終是這座私人建築公園的核心，如今作為博物館對外開放。",
  },
  {
    id: "att-building", type: "building",
    name: { zh: "AT&T 大樓", en: "AT&T Building" },
    architect: "philip-johnson", movement: "postmodernism",
    year: { completed: 1984 },
    location: { country: "US", city: "New York", lat: 40.7607, lng: -73.9719 },
    buildingType: "commercial", importance: 4, wordCount: 200,
    tags: ["chippendale-top", "historicism"], relatedIds: [],
    // T3.4 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText: "菲利普·強生與約翰·伯奇合作的辦公摩天樓，1984 年落成於紐約。它以石材貼面取代當時流行的玻璃帷幕，頂部更冠上一個形如齊本德爾式家具、中央開圓缺口的巨大山牆，公然引用歷史裝飾。這個大膽的頂冠打破了現代主義對裝飾的禁忌，宣告國際樣式單一美學的鬆動，成為後現代主義進入企業摩天樓最著名的宣言。它當年引發激烈爭論，如今則被視為後現代建築的代表作之一。",
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
    // T3.4 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText: "路易斯·巴拉岡的住宅兼工作室，1948 年落成於墨西哥城。樸素的外牆不動聲色，內部卻以厚實的粉色、黃色與紫色實牆、木梁天花與狹縫天光，把日常的居所轉化為沉思的場所。他以有限的幾種顏色、一方庭園與精確控制的光線經營靜謐與孤獨，讓空間喚起情感與記憶，而非僅供機能使用。這件作品是他情感建築理念最完整的自我陳述，也在他辭世後列入世界遺產，成為後世追求氛圍與物質性的建築師反覆造訪的聖地。",
  },
  {
    id: "torres-satelite", type: "building",
    name: { zh: "衛星城塔", en: "Torres de Satélite" },
    architect: "luis-barragan", movement: "emotional-architecture",
    year: { completed: 1958 },
    location: { country: "MX", city: "Naucalpan", lat: 19.5095, lng: -99.2370 },
    buildingType: "memorial", importance: 3, wordCount: 200,
    tags: ["color", "urban-sculpture"], relatedIds: [],
    // T3.4 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText: "路易斯·巴拉岡與雕塑家戈里茲、畫家雷耶斯合作的都市地標，1958 年立於墨西哥城郊衛星城的高速公路分隔島上。五座高低不一、塗上紅、黃、白等純色的三稜柱高塔向天空聳立，在車流之間形成一組隨速度與視角不斷變化的抽象雕塑。它沒有任何實用機能，純粹以色彩與量體標示新社區的入口，把建築、雕塑與公共藝術融為一體，是現代主義公共藝術的重要里程碑，也成為墨西哥現代都市意象的象徵。",
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
    // T3.4 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText: "貝聿銘為羅浮宮擴建設計的地下大廳入口，1989 年落成於拿破崙中庭的正中央。他以一座透明的玻璃與鋼構金字塔統合原本分散的參觀動線，讓自然光灑入地下的接待大廳，訪客由此進入、再分流至三翼展區。以純粹的幾何量體置入古典宮殿的中庭，這個決定在當時的法國引發激烈爭論，許多人認為它破壞了歷史的莊嚴。然而落成之後，透明的錐體與古典立面的對照逐漸被接受，成為新舊對話的典範，如今更是巴黎最知名的現代介入與觀光地標之一，也印證了貝聿銘在敏感歷史脈絡中操作幾何的功力。金字塔入口徹底改善了羅浮宮原本壅塞的動線，讓這座全球參觀人次最多的美術館得以承載龐大的人流。",
  },
  {
    id: "bank-of-china-tower", type: "building",
    name: { zh: "中銀大廈", en: "Bank of China Tower" },
    architect: "ieoh-ming-pei", movement: "late-modernism",
    year: { completed: 1990 },
    location: { country: "HK", city: "Hong Kong", lat: 22.2783, lng: 114.1614 },
    buildingType: "commercial", importance: 4, wordCount: 200,
    tags: ["triangulated", "structure"], relatedIds: [],
    // T3.4 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText: "貝聿銘為中國銀行設計的香港總部，1990 年落成，曾是香港與亞洲當時最高的建築。整棟塔樓以數個三角形稜柱層層向上收分，外露的巨型斜撐把風力與重量高效地傳遞到四角的基座，讓超高層得以用更少的鋼材達成穩定。銳利的幾何量體在維多利亞港畔切割出鮮明的天際線輪廓。結構的誠實與造型的純粹在此合而為一，是貝聿銘晚期現代主義的代表作，也是香港最具辨識度的摩天樓之一。",
  },
  {
    id: "tunghai-luce-chapel", type: "building",
    name: { zh: "東海大學路思義教堂", en: "Luce Memorial Chapel" },
    architect: "ieoh-ming-pei", movement: "late-modernism",
    year: { completed: 1963 },
    location: { country: "TW", city: "Taichung", lat: 24.1817, lng: 120.5942 },
    buildingType: "religious", importance: 4, wordCount: 200,
    tags: ["hyperbolic-shell", "taiwan"], relatedIds: [],
    // T3.4 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText: "貝聿銘與台灣建築師陳其寬合作設計的大學教堂，1963 年落成於台中東海大學校園。四片彎曲的鋼筋混凝土雙曲面薄殼相互倚靠、向上收攏成尖，殼與殼之間留出一線天窗，讓光沿著屋脊灑落室內。這種以曲面薄殼取代樑柱的結構，既回應了台灣多地震、多颱風的氣候，也以有限的在地工藝完成了輕盈而莊嚴的形式。它是戰後台灣現代建築最重要的地標之一，至今仍是東海校園的精神象徵。",
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
    // T3.4 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText: "理查·邁爾為蓋蒂信託設計的文化園區，歷時十餘年、1997 年落成於洛杉磯的一座山丘上。整座建築群以白色金屬板與粗獷的義大利石灰華交織，透過格線、方圓的幾何與精心計算的天光，把純粹主義的語言放大為一整座俯瞰全城的城市。訪客搭乘纜車登上山頂，在建築、庭園與加州陽光之間漫步。它是邁耶理性主義美學規模最大的實現，也讓白色建築成為當代文化機構的一種象徵，至今是洛杉磯最受歡迎的去處之一。",
  },
  {
    id: "ara-pacis-museum", type: "building",
    name: { zh: "和平祭壇博物館", en: "Ara Pacis Museum" },
    architect: "richard-meier", movement: "white-architecture",
    year: { completed: 2006 },
    location: { country: "IT", city: "Rome", lat: 41.9061, lng: 12.4753 },
    buildingType: "cultural", importance: 3, wordCount: 200,
    tags: ["white", "intervention"], relatedIds: [],
    // T3.4 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText: "理查·邁爾為保護古羅馬「和平祭壇」而設計的展館，2006 年落成於羅馬歷史中心的台伯河畔，是二戰後這片古城區的第一件當代建築。他以白牆、石灰華與大面玻璃圍出一座明亮通透的盒子，讓自然光灑在奧古斯都時代的古祭壇上。這個把現代語言直接置入羅馬古城的決定引發激烈爭論，一度成為政治話題，卻也奠定了他在歷史城市中堅持現代性的立場，是討論當代建築如何介入歷史脈絡時無法迴避的案例。",
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
    // T3.4 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText: "丹下健三戰後成名的作品，1955 年落成於廣島。長條形的展館以一排底層架空的混凝土柱撐起、懸浮於地面之上，並與慰靈碑、原爆圓頂連成一條筆直的紀念軸線，把參觀者的視線導向那片被原子彈摧毀的遺址。丹下以現代主義的簡潔語言承載集體的哀悼與記憶，讓建築成為和平的宣示，也讓戰後的日本正式進入國際建築的對話。這件作品奠定了他的聲望，是二十世紀最重要的紀念性建築之一。",
  },
  {
    id: "yoyogi-gym", type: "building",
    name: { zh: "代代木競技場", en: "Yoyogi National Gymnasium" },
    architect: "kenzo-tange", movement: "metabolism",
    year: { completed: 1964 },
    location: { country: "JP", city: "Tokyo", lat: 35.6672, lng: 139.7000 },
    buildingType: "public", importance: 5, wordCount: 300,
    tags: ["suspension", "olympics"], relatedIds: [],
    // T3.4 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText: "丹下健三為 1964 年東京奧運設計的體育館，是二十世紀結構表現主義的傑作。兩座場館以巨大的鋼纜從高聳的支柱懸吊出流動而下垂的曲面屋頂，宛如張力被凝結的瞬間；懸索結構讓室內得以擺脫柱子，創造出開闊而向心的競技空間，而向上捲起的屋脊又隱隱呼應了日本傳統神社的意象。丹下在此把最先進的結構工程與民族的空間記憶熔於一爐，向世界宣告戰後日本的重建與自信。它被公認為二十世紀最優美的體育建築之一，也是丹下代謝派時期的巔峰之作。2021 年東京再度舉辦奧運時，它也作為場館之一被重新啟用，跨越半個世紀，依然是東京最受喜愛的現代建築之一。",
  },
  {
    id: "fuji-tv-building", type: "building",
    name: { zh: "富士電視台大樓", en: "Fuji TV Building" },
    architect: "kenzo-tange", movement: "metabolism",
    year: { completed: 1996 },
    location: { country: "JP", city: "Tokyo", lat: 35.6266, lng: 139.7740 },
    buildingType: "commercial", importance: 3, wordCount: 200,
    tags: ["megastructure", "sphere"], relatedIds: [],
    // T3.4 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText: "丹下健三晚年的作品，1996 年落成於東京臨海副都心的台場。方正的巨型鋼構框架以格狀的量體與空橋組成，中央則懸著一顆直徑約三十公尺的銀色球體觀景台，成為整棟建築的視覺焦點。這種以巨型框架容納可置換單元的構想，延續了他早年代謝派對城市如生命體般生長的思考。作為一座電視台總部，它以醒目的科幻造型成為台場的地標，也是日本泡沫經濟時期大規模都市開發的象徵。",
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
    // T3.4 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText: "尼邁耶為巴西新首都設計的政治核心，1960 年落成，坐落於規劃師科斯塔所擘劃的紀念軸線端點。他把兩座議事廳化為極簡的幾何：眾議院是一只向上敞開的碗，參議院則是一頂倒扣的圓頂，兩者並置於一片開闊的平台之上，後方再豎起兩片相連的高聳板樓作為辦公空間。以雕塑般的曲面混凝土與純白的量體，尼邁耶賦予國家建築一種輕盈、樂觀而象徵性的紀念感，與嚴肅的古典政府建築截然不同。它是二十世紀最具野心的都市烏托邦之一，也讓巴西利亞整座城市列入世界遺產。國會大廈的碗與圓頂如今印在巴西的貨幣與郵票上，成為巴西國家認同最鮮明的視覺符號之一。",
  },
  {
    id: "niteroi-museum", type: "building",
    name: { zh: "尼泰羅伊當代藝術館", en: "Niterói Contemporary Art Museum" },
    architect: "oscar-niemeyer", movement: "monumental-modernism",
    year: { completed: 1996 },
    location: { country: "BR", city: "Niterói", lat: -22.9069, lng: -43.1265 },
    buildingType: "cultural", importance: 3, wordCount: 200,
    tags: ["flying-saucer", "curves"], relatedIds: [],
    // T3.4 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText: "尼邁耶晚年最著名的作品，1996 年落成於里約對岸的尼泰羅伊海岬之上。整座美術館宛如一只白色的飛碟，以單一的中央柱撐起向外綻放的圓盤量體，一道鮮紅的環形坡道盤旋而上，把訪客引向懸浮於海灣之上的展廳。透過連續的環窗，瓜納巴拉灣與里約的天際線成為展品的背景。尼邁耶以極簡的曲線把美術館本身化為一件俯瞰海灣的雕塑，證明了他年近九十仍不減的造型想像力，也成為尼泰羅伊最鮮明的城市象徵。",
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
    // T3.4 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText: "法蘭克·蓋瑞最著名的作品，1997 年落成於西班牙北部沒落的工業城市畢爾包。層層翻捲的鈦金屬曲面沿著河岸起伏，在陽光下閃爍變化，宛如一艘停靠的巨船或一朵金屬的花；這些過去難以放樣的複雜曲面，靠航太業的數位建模軟體才得以精確建造。這座美術館不僅震撼了建築界，更以一己之力帶動整座城市的觀光與經濟復甦，催生出所謂的「畢爾包效應」，讓世界各地的城市爭相以標誌性建築作為再生的槓桿。它把解構主義推上國際舞台，也重新定義了二十一世紀美術館作為都市地標與經濟引擎的角色，是當代最具影響力、也最常被討論的建築之一。開館二十餘年來，它仍持續吸引大量遊客湧入這座曾經沒落的城市。",
  },
  {
    id: "walt-disney-concert-hall", type: "building",
    name: { zh: "華特迪士尼音樂廳", en: "Walt Disney Concert Hall" },
    architect: "frank-gehry", movement: "deconstructivism",
    year: { completed: 2003 },
    location: { country: "US", city: "Los Angeles", lat: 34.0553, lng: -118.2498 },
    buildingType: "cultural", importance: 4, wordCount: 200,
    tags: ["stainless-steel", "acoustics"], relatedIds: [],
    // T3.4 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText: "法蘭克·蓋瑞為洛杉磯愛樂設計的音樂廳，2003 年落成於市中心。不鏽鋼的曲面外殼如一組被風鼓起的船帆向外綻放，在加州的陽光下閃閃發亮，成為市中心最醒目的地標；內部則以溫暖的木質殼體包裹觀眾席，為交響樂的聲響精心調校。它延續了畢爾包的曲面語言，卻把重心放在聽覺的品質上，被公認為當代最出色的音樂廳之一。這座建築也為長年缺乏市中心焦點的洛杉磯，提供了一處鮮明的文化聚點。",
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
    // T3.4 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText: "羅西為義大利摩德納既有公墓設計的擴建，1971 年起分期建造。他以立方體、圓錐與骨架般的方格量體，把窗、柱、山牆這些恆常的原型抽離成近乎抽象的幾何，排列出一座沉默而莊嚴的死者之城。橘紅色的方形骨灰龕大樓沒有屋頂與樓板，只留下規律的空窗，讓生與死、記憶與遺忘在秩序中並置。這件作品把他在《城市建築學》中提出的類型學化為可見的形式，是新理性主義最具宣言性質的作品，也深刻影響了後現代對歷史與記憶的重新關注。",
  },
  {
    id: "il-teatro-del-mondo", type: "building",
    name: { zh: "世界劇場", en: "Teatro del Mondo" },
    architect: "aldo-rossi", movement: "neo-rationalism",
    year: { completed: 1979 },
    location: { country: "IT", city: "Venice", lat: 45.4300, lng: 12.3400 },
    buildingType: "cultural", importance: 3, wordCount: 200,
    tags: ["floating", "biennale"], relatedIds: [],
    // T3.4 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText: "羅西為 1980 年威尼斯建築雙年展設計的漂浮劇場，1979 年建成。這是一座架在駁船上、可隨水路拖行的木構小劇場，方正的塔狀量體頂著一個小尖頂，造型直接援引威尼斯歷史上臨時搭建的水上劇場與燈塔。它停泊於運河與潟湖之間，把城市的臨時性、記憶與詩意濃縮在一個可移動的建築裡。雖然只是短暫存在的臨時構築，卻成為羅西類型學思想最動人的體現，也是後現代建築中關於城市與記憶最著名的寓言之一。",
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
    // T3.4 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText: "文丘里為母親凡娜設計的住宅，1964 年落成於費城郊區，被視為後現代主義的開山之作。正面是一片看似對稱、卻在中央斷裂的大山牆，門、窗與線腳都被刻意錯置，製造出曖昧與矛盾——這正是他在同年出版的《建築的複雜與矛盾》中所主張的。他以這棟小住宅的正面挑戰現代主義對純粹、機能與一致的信條，宣告「少即是無趣」。儘管規模不大，它卻是二十世紀最具影響力的住宅之一，開啟了建築重新擁抱歷史、象徵與日常複雜性的一整個時代。",
  },
  {
    id: "sainsbury-wing", type: "building",
    name: { zh: "國家美術館塞恩斯伯里翼", en: "Sainsbury Wing" },
    architect: "robert-venturi", movement: "postmodernism",
    year: { completed: 1991 },
    location: { country: "GB", city: "London", lat: 51.5089, lng: -0.1295 },
    buildingType: "cultural", importance: 3, wordCount: 200,
    tags: ["contextual", "classical"], relatedIds: [],
    // T3.4 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText: "文丘里與妻子丹妮絲·斯科特·布朗合作設計的倫敦國家美術館擴建翼，1991 年落成於特拉法加廣場旁。面對莊嚴的古典舊館，他們沒有選擇對比或複製，而是讓立面的古典壁柱在靠近舊館處密集、遠離處逐漸稀疏甚至消失，以一種帶著反諷的引用回應歷史脈絡。內部則以幽暗的迴廊與精心安排的視線，襯托文藝復興早期的畫作。這件作品是後現代脈絡主義的代表，示範了新建築如何在不失自我的前提下，謙遜地與歷史對話。",
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
    // T3.4 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText: "西薩早期的傑作，1966 年落成於葡萄牙波多近郊的大西洋岸。他沒有在礁岩海灘上蓋一座顯眼的建築，而是以低矮的混凝土牆順著地形延展，把更衣室、通道與泳池巧妙地嵌進岩石與海水之間，讓人工的構築與天然的潮間帶幾乎無縫接合。訪客沿著牆與坡道緩緩下行，視線被刻意引導，最後才在礁岩之間遇見大海。這種對場所地形與光線的細膩尊重，讓它成為批判性地域主義最早的典範之一，也奠定了西薩一生的設計態度。",
  },
  {
    id: "iberê-camargo-foundation", type: "building",
    name: { zh: "伊貝拉·卡馬戈基金會", en: "Iberê Camargo Foundation" },
    architect: "alvaro-siza", movement: "critical-regionalism",
    year: { completed: 2008 },
    location: { country: "BR", city: "Porto Alegre", lat: -30.0850, lng: -51.2440 },
    buildingType: "cultural", importance: 3, wordCount: 200,
    tags: ["white-concrete", "ramps"], relatedIds: [],
    // T3.4 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText: "西薩跨海為巴西畫家伊貝拉·卡馬戈的基金會設計的美術館，2008 年落成於阿雷格里港的湖岸陡坡上。純白的混凝土量體緊貼山壁，內部圍繞一個明亮的中庭層層上升，而幾道封閉的坡道則像手臂般懸挑於量體之外、在立面上來回穿梭，把觀展的動線化為建築外部的雕塑。他以精確控制的天光與蜿蜒的動線，在看似簡單的白盒中安排出複雜的空間經驗。這件晚期作品把他長年鑽研的雕塑性現代主義推向新的尺度，也是他在南美最重要的作品。",
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
    // T3.4 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText: "槙文彥在東京表參道設計的複合文化設施，1985 年落成，是日本後現代時期的代表作。立面刻意以不同的幾何元素——方格、圓、圓錐與斜線——拼貼組合，看似鬆散卻經過精密的比例控制；建築之名則來自內部那道連接各層藝廊、商店與活動空間的螺旋坡道。槙文彥藉此體現他長年主張的「群造形」概念：都市不是單一巨大的形體，而是由許多細碎的元素在時間中漸進地拼組而成。它以優雅而內斂的手法，展現了後代謝派對都市與尺度的細膩思考。",
  },
  {
    id: "4-wtc", type: "building",
    name: { zh: "世貿中心四號大樓", en: "4 World Trade Center" },
    architect: "fumihiko-maki", movement: "post-metabolism",
    year: { completed: 2013 },
    location: { country: "US", city: "New York", lat: 40.7115, lng: -74.0119 },
    buildingType: "commercial", importance: 3, wordCount: 200,
    tags: ["minimal", "glass"], relatedIds: [],
    // T3.4 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText: "槙文彥為紐約世貿中心重建設計的辦公塔，2013 年落成，是這片紀念場域中最內斂的一棟。極簡的深色玻璃量體幾乎沒有任何多餘的裝飾，隨著角度與天候反射出天空與雲的變化，在特定的光線下彷彿消隱於背景之中。面對承載著巨大傷痛與象徵意義的基地，槙文彥選擇以最低調、最克制的姿態回應，讓建築退到紀念本身之後。這種近乎謙卑的精準，體現了他對場所與尺度一貫的敏感，也與周遭喧囂的重建計畫形成鮮明對比。",
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
    // T3.4 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText: "安藤忠雄最著名的作品，1989 年落成於大阪茨木的一處住宅區。這是一座極小的清水混凝土箱體，安藤在祭壇後方的端牆上切出一道貫穿的十字形開口，當光線從縫隙湧入昏暗的室內，一個發亮的十字架便懸浮於黑暗之中，隨著一天的時辰與天候不斷變化。他刻意壓低採光、簡化一切材料與裝飾，只留下混凝土、光與虛空，讓最平凡的元素凝聚成強烈的精神場域。以近乎苦行的節制，安藤證明了神聖不必來自華麗的裝飾，而可以從光與陰影本身生長出來。它成為當代宗教建築最常被援引的案例之一，也是他極簡美學的極致；教堂雖然規模極小、造價低廉，卻在世界各地擁有難以計數的追隨者與朝聖者。",
  },
  {
    id: "sumiyoshi-row-house", type: "building",
    name: { zh: "住吉長屋", en: "Row House in Sumiyoshi" },
    architect: "tadao-ando", movement: "critical-regionalism",
    year: { completed: 1976 },
    location: { country: "JP", city: "Osaka", lat: 34.6100, lng: 135.5000 },
    buildingType: "residential", importance: 4, wordCount: 200,
    tags: ["courtyard", "minimal"], relatedIds: [],
    // T3.4 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText: "安藤忠雄的成名作，1976 年落成於大阪，是一棟插進舊市區連棟長屋之間的小型混凝土住宅。他把僅有的狹長基地切成三段，中央刻意留出一方沒有屋頂的露天中庭，使居住者即使在同一棟房子裡移動，也必須穿過中庭、直接面對風雨與四季。素樸的清水混凝土牆隔絕了外部的喧囂，把生活收攏進一個內向而寧靜的世界。這種近乎嚴苛的空間安排，體現了他對都市、自然與居住關係的思考，也預示了他日後以混凝土與光經營精神性空間的一貫路線。",
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
    // T3.4 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText: "莫內奧的成名作，1986 年落成於西班牙梅里達的古羅馬遺址之上。他以一系列高聳的紅磚拱牆平行排列，直接援引古羅馬的營造邏輯與材料，讓新建的博物館彷彿是古城的自然延續；地下層則保留了原址出土的道路與地基，讓參觀者在同一棟建築中同時穿越當代與古代。厚重的磚拱在天光下投出深邃的陰影，使展出的羅馬雕塑與建築本身相互闡釋。莫內奧以當代的手法重述古典，證明了尊重歷史脈絡與建築的原創性可以並存，這件作品也奠定了他的國際聲望。",
  },
  {
    id: "kursaal-san-sebastian", type: "building",
    name: { zh: "庫薩爾會議中心", en: "Kursaal Congress Centre" },
    architect: "rafael-moneo", movement: "critical-regionalism",
    year: { completed: 1999 },
    location: { country: "ES", city: "San Sebastián", lat: 43.3230, lng: -1.9790 },
    buildingType: "cultural", importance: 3, wordCount: 200,
    tags: ["glass-cubes", "coast"], relatedIds: [],
    // T3.4 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText: "莫內奧在西班牙聖塞巴斯提安海灣邊設計的會議中心與音樂廳，1999 年落成。他把量體處理成兩塊微微傾斜、半透明的玻璃立方，形容它們是「兩塊擱淺在河口的礁石」，刻意不與周圍的城市街廓對齊，而是回應海、光與地景。曲面的乳白玻璃在白天像溫潤的石頭，到了夜裡則從內部透出光來，成為海岸邊的兩盞巨大燈籠。莫內奧以抽象而詩意的量體回應了場所的自然力量，展現他處理當代大型公共建築的能力，這件作品也成為聖塞巴斯提安的新地標。",
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
