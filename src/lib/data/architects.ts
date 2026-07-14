/**
 * 30 位 Pritzker 建築師 Seed Data · v1
 *
 * bodyText 為精簡版（80–150 字）、未來由 AI 擴充至 500 字。
 * 規格見 docs/05-內容架構/word-count-rules.md
 */

import type { Architect } from "@/types/entity";

export const ARCHITECTS: Architect[] = [
  {
    id: "le-corbusier",
    type: "architect",
    name: { en: "Le Corbusier", zh: "柯比意", native: "Charles-Édouard Jeanneret" },
    lifespan: [1887, 1965],
    nationality: ["CH", "FR"],
    movements: [
      { id: "purism", period: [1918, 1928], weight: "primary" },
      { id: "international-style", period: [1925, 1945], weight: "primary" },
      { id: "brutalism", period: [1947, 1965], weight: "primary" },
    ],
    buildings: ["villa-savoye", "ronchamp", "unite-marseille"],
    books: ["vers-une-architecture"],
    isPritzker: false,
    wordCount: 800,
    importance: 5,
    tags: ["modernist-pioneer", "five-points", "ciam-founder"],
    relatedIds: [],
    // T3.2 草稿 · 待人審（依 content-checklist.md 流程產出、年份對齊資料檔）
    bodyText:
      "瑞士裔法籍建築師（1887–1965），二十世紀現代主義最具影響力的人物。本名 Charles-Édouard Jeanneret，生於瑞士鐘錶小鎮拉紹德封，1920 年代起以筆名柯比意活躍於巴黎，1930 年入籍法國。他同時是建築師、都市計畫者、畫家與論戰者，建築史視他為現代建築理論的奠基人。青年時期未受正規學院訓練，在家鄉美術學校習藝後靠旅行與實務自學：1908 年進入巴黎佩雷事務所接觸鋼筋混凝土構造，1910 年赴柏林於貝倫斯事務所短暫工作，與葛羅培斯、密斯同門；1911 年的東方之旅使他在雅典衛城與地中海民居中確立對幾何與光的信念。1914 年提出多米諾系統，以板柱結構解放牆體，為日後的自由平面奠定構造基礎。1918 年與畫家歐贊凡共同發起純粹主義，1920 年創辦《新精神》雜誌，1923 年出版《邁向建築》，提出「住宅是居住的機器」，主張以工業時代的邏輯重建建築學。1926 年歸納「新建築五點」：底層架空、屋頂花園、自由平面、橫向長窗、自由立面。1928 年共同創立國際現代建築會議，1933 年主導雅典憲章，將城市機能劃分為居住、工作、遊憩與交通四項。薩伏伊別墅（1928 年設計、1931 年落成）是五點原則最完整的實現，白色量體架空於草坡之上，坡道貫穿剖面形成連續的建築漫步；戰後的馬賽公寓（1952）以模矩的人體尺度組織三百餘戶的垂直社區，粗獷的清水混凝土成為粗獷主義的先聲；廊香教堂（1955）以厚牆、曲面與光的縫隙走向雕塑性表現，修正了他早年的機械理性。1951 年起主持印度昌迪加爾新城與議會建築群，把晚期語彙推向紀念性尺度。他貫穿純粹主義、國際樣式與粗獷主義三個階段，參與定義了現代主義的每一次轉向；其推平重建式的都市計畫思想也招致後世批判，成為檢討現代主義城市的起點。1965 年於地中海游泳時辭世。從住宅原型到城市憲章，柯比意留下一套至今仍被引用與反駁的完整體系。",
  },
  {
    id: "mies-van-der-rohe",
    type: "architect",
    name: { en: "Mies van der Rohe", zh: "密斯", native: "Ludwig Mies van der Rohe" },
    lifespan: [1886, 1969],
    nationality: ["DE", "US"],
    movements: [
      { id: "international-style", period: [1925, 1969], weight: "primary" },
    ],
    buildings: ["farnsworth-house", "seagram-building", "barcelona-pavilion"],
    isPritzker: false,
    wordCount: 800,
    importance: 5,
    tags: ["less-is-more", "bauhaus-director"],
    relatedIds: [],
    // T3.2 草稿 · 待人審（依 content-checklist.md 流程產出、年份對齊資料檔）
    bodyText:
      "德裔美籍建築師（1886–1969），與柯比意、萊特並列的現代主義巨匠，以「少即是多」濃縮了整個時代的美學信條。生於德國亞琛的石匠家庭，未受正規建築教育，年少時在父親的石作坊與營造現場習得對材料與構造的直覺；1908 年進入柏林貝倫斯事務所，與葛羅培斯共事，同時吸收辛克爾的新古典比例訓練與工業建築的理性。1920 年代初，他以玻璃摩天樓與混凝土辦公樓等紙上方案震動柏林前衛圈，主張建築是「時代意志的空間表達」；1927 年主持斯圖加特白院聚落住宅展，匯集歐洲現代主義者的集體實驗；1930 年出任包浩斯末代校長，1933 年在納粹壓力下關閉學校，1938 年流亡美國，主持伊利諾理工學院建築系並規劃其校園，把歐洲的前衛理念轉譯為美國的鋼構文法；校園核心的克朗廳以大跨度鋼構撐出無柱的通用空間，是其教學理念最直接的呈現。1930 年完成於布爾諾的圖根哈特宅，已把流動空間帶入日常居住，也預告了他對貴重材料與精準節點的一貫執著。巴塞隆納德國館（1929）以獨立牆板、十字鍍鉻鋼柱與縞瑪瑙牆面讓空間第一次自由流動，成為國際樣式的空間宣言；范斯沃斯宅（1951）把住宅還原為漂浮於草地上的一片玻璃與八根白色鋼柱，通用空間的理念在此走到極致；西格拉姆大廈（1958）以青銅帷幕與退縮廣場為戰後摩天樓確立近乎古典的莊嚴文法，「神在細節裡」的信念落實於每一根工字樑的轉角；為德國館設計的巴塞隆納椅，也同樣成為現代設計的經典。他讓鋼與玻璃取得了石造建築才有的紀念性，帷幕牆高層自此成為全球城市的通用語言；批評者則指其晚期作品陷入完美的自我重複，這場爭論本身即是他影響力的證明。1969 年逝於芝加哥。密斯留下的不是可以模仿的形式，而是一套關於結構、比例與省略的紀律。",
  },
  {
    id: "frank-lloyd-wright",
    type: "architect",
    name: { en: "Frank Lloyd Wright", zh: "萊特" },
    lifespan: [1867, 1959],
    nationality: ["US"],
    movements: [
      { id: "organic", period: [1900, 1959], weight: "primary" },
      { id: "prairie-style", period: [1900, 1920], weight: "primary" },
    ],
    buildings: ["fallingwater", "guggenheim-ny", "robie-house"],
    isPritzker: false,
    wordCount: 800,
    importance: 5,
    tags: ["organic-architecture", "prairie-school"],
    relatedIds: [],
    // T3.2 草稿 · 待人審（依 content-checklist.md 流程產出、年份對齊資料檔）
    bodyText:
      "美國建築師（1867–1959），有機建築的創始人，美國本土現代主義最重要的源頭。生於威斯康辛州鄉間，幼年由母親以福祿貝爾積木啟蒙空間感，短暫就讀州立大學土木工程後前往芝加哥，1888 年進入阿德勒與蘇利文事務所成為蘇利文的得意門生，將「形式追隨機能」的教誨轉化為「形式與機能合一」的有機命題。1893 年自立門戶後，他在橡樹園發展出草原式住宅：低緩的出簷、綿延的水平線、環繞壁爐的開放平面，讓住宅第一次貼伏於中西部的地平線之上，羅比之家（1910）是這一時期的集大成。1923 年落成的東京帝國飯店在同年關東大地震中倖存，使他獲得國際聲望。1911 年起他以威斯康辛的塔里耶森為據點，後又在亞利桑那沙漠建立西塔里耶森，以師徒共同生活的學社制度延續實踐；1930 年代提出美國風住宅，以簡化構造與地板輻射採暖壓低造價，探索中產家庭的平價建築原型，並以廣畝城市的構想回應美國的城市擴張。落水山莊（1935 年設計、1937 年落成）將鋼筋混凝土懸臂樓板層層挑出於熊奔溪的瀑布之上，壁爐直接坐落於基地原生的巨岩，建築與地景互為結構，成為有機建築最著名的證明；紐約古根漢美術館（1959）以連續螺旋坡道取代分層展廳，讓觀展成為一次不間斷的下行漫步，徹底改寫了美術館類型；這兩件晚期傑作相隔二十餘年，卻同樣以單一空間概念統攝全局。他一生建成作品逾五百件，橫跨草原式、美國風與晚期的幾何實驗，始終堅持建築應從基地、材料與生活內部生長出來，而非套用歐洲的歷史樣式；歐洲現代主義者視他為先知，他則終生與國際樣式保持距離，走一條屬於美洲大陸的路。1959 年逝世於紐約古根漢落成前夕。萊特證明了現代建築可以同時是機能的、浪漫的，並且與土地不可分割。",
  },
  {
    id: "louis-kahn",
    type: "architect",
    name: { en: "Louis Kahn", zh: "路易斯·康", native: "Itze-Leib Schmuilowsky" },
    lifespan: [1901, 1974],
    nationality: ["EE", "US"],
    movements: [
      { id: "monumental-modernism", period: [1950, 1974], weight: "primary" },
    ],
    buildings: ["kimbell-art-museum", "salk-institute", "dhaka-parliament"],
    isPritzker: false,
    wordCount: 800,
    importance: 5,
    tags: ["self-styled", "monumental", "natural-light"],
    relatedIds: [],
    // T3.2 草稿 · 待人審（依 content-checklist.md 流程產出、年份對齊資料檔）
    bodyText:
      "愛沙尼亞裔美籍建築師（1901–1974），二十世紀後半紀念性現代主義的代表，讓現代建築重新學會沉默與光。生於愛沙尼亞的猶太家庭，本名 Itze-Leib Schmuilowsky，五歲隨家人移民費城，在貧困中成長；賓州大學的布雜訓練給了他古典的構圖紀律，1924 年畢業後長期經手集合住宅與都市規劃案，事業平淡，直到五十歲前後才以耶魯大學美術館迎來遲到的突破。此後他長期任教於耶魯與賓州大學，理查茲醫學研究大樓（1960）首次把服務與被服務空間的區分化為塔樓群的形體。他相信建築始於「房間」，主張區分服務與被服務空間，向磚發問「你想成為什麼」，而磚回答「拱」；1950 年代初在羅馬的進修使他把古代廢墟的厚重、秩序與光帶回現代語彙，以清水混凝土與磚石對抗輕薄的帷幕牆時代；晚年更以「靜謐與光明」概括其思想——靜謐是尚未成形的意志，光是使萬物成形的給予者。沙克生物研究所（1965）以兩列對稱的實驗室量體夾出一方面向太平洋的空白廣場，一道細水渠筆直指向海平線，科學研究被安置在近乎修道院的靜謐裡；金貝爾美術館（1972）以連續的擺線拱殼配上狹縫天光，銀色的自然光沿弧面均勻流下，成為後世美術館採光的參照原型；達卡國會大廈（1982）以巨大的幾何開口與同心配置的集會空間，為新生的孟加拉鑄造國家尺度的紀念碑，在他身後八年才告落成；三件晚期作品分別重新定義了實驗室、美術館與議會建築的類型原型。他在現代主義的機能語言之外，重建了紀念性、物質感與精神性的維度，影響了安藤忠雄、博塔等一整代後輩。1974 年心臟病發猝逝於紐約賓州車站，身後負債累累，聲名卻與日俱增。康留下的問題——建築想成為什麼——至今仍是這門學科的核心提問。",
  },
  {
    id: "philip-johnson",
    type: "architect",
    name: { en: "Philip Johnson", zh: "菲利普·強生" },
    lifespan: [1906, 2005],
    nationality: ["US"],
    movements: [
      { id: "international-style", period: [1932, 1965], weight: "primary" },
      { id: "postmodernism", period: [1975, 1995], weight: "primary" },
      { id: "deconstructivism", period: [1988, 1995], weight: "secondary" },
    ],
    buildings: ["glass-house", "att-building"],
    awards: [{ id: "pritzker", year: 1979 }],
    isPritzker: true,
    wordCount: 500,
    importance: 4,
    tags: ["first-pritzker", "moma-curator"],
    relatedIds: [],
    // T3.3 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText:
      "美國建築師、評論家與策展人（1906–2005），二十世紀美國建築界最具影響力的品味仲裁者，1979 年首屆普利茲克獎得主。哈佛出身，早年不以設計而以論述聞名：1930 年他協助紐約現代美術館成立建築部門，1932 年更與希區考克在該館共同策劃「國際樣式」展，替這場歐洲運動命名，並將現代主義正式引入美國。他長年以策展人、顧問與贊助者的身分左右館方的展覽與收藏，而自身的設計則橫跨數個時代且不斷轉向。於康乃狄克新迦南為自己建造的玻璃屋（1949）以四面透明玻璃與鋼構將密斯的語言推向極致，成為國際樣式的住宅標本；他在同一片莊園數十年間陸續添建畫廊與地下美術館，使之成為記錄其風格流變的私人建築博物館。AT&T 大樓（1984）則以一個齊本德爾式的山牆頂冠打破現代主義對裝飾的禁忌，成為後現代主義進入企業摩天樓的宣言。1988 年他再度於現代美術館策劃「解構主義建築」展，把蓋瑞、札哈與庫哈斯等人推上國際舞台。作為策展人、業主與人脈中樞，他長期左右美國建築的話語權；批評者指他缺乏一以貫之的信念、隨風格更迭而變。他證明了建築師也能是時代風向的定義者。",
  },
  {
    id: "luis-barragan",
    type: "architect",
    name: { en: "Luis Barragán", zh: "路易斯·巴拉岡" },
    lifespan: [1902, 1988],
    nationality: ["MX"],
    movements: [
      { id: "emotional-architecture", period: [1940, 1988], weight: "primary" },
    ],
    buildings: ["casa-barragan", "torres-satelite"],
    awards: [{ id: "pritzker", year: 1980 }],
    isPritzker: true,
    wordCount: 500,
    importance: 4,
    tags: ["color", "mexican-modernism"],
    relatedIds: [],
    // T3.3 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText:
      "墨西哥建築師（1902–1988），以色彩、光影與寧靜著稱的情感建築代表，1980 年普利茲克獎得主。他在瓜達拉哈拉受工程訓練，早年遊歷地中海與北非，深受摩洛哥民居、阿爾罕布拉宮的庭園與法國造園家巴克的花園啟發，逐漸把現代主義的抽象幾何與墨西哥的鄉土色彩、天主教的靜謐感結合起來。他反對純機能的國際樣式，主張建築應喚起情感、記憶與神祕，並以「情感建築」一詞概括自己的追求。位於墨西哥城的巴拉岡自宅（1948）以粉紅、土黃與深紫的實牆、狹縫天光與內庭水池，把日常住宅轉化為近乎修道院的冥想空間，後來列入世界遺產。1958 年他與雕塑家戈里茲合作的衛星城塔，以五座高聳的彩色三稜柱矗立於城市入口的高速公路旁，是現代主義公共藝術的重要里程碑。他的空間往往以一道高牆圍出與外界隔絕的內庭，再以有限的幾種顏色、一方水池與精確的日光創造沉思的氛圍，靜謐與孤獨是他刻意經營的主題。他一生作品不多，卻以牆、水、光與色的精煉語彙自成一格。他的影響遠超墨西哥，讓極簡得以與地域、情感共存，成為後世追求氛圍與物質性的建築師反覆援引的源頭。",
  },
  {
    id: "ieoh-ming-pei",
    type: "architect",
    name: { en: "I.M. Pei", zh: "貝聿銘", native: "貝聿銘" },
    lifespan: [1917, 2019],
    nationality: ["CN", "US"],
    movements: [
      { id: "late-modernism", period: [1955, 2019], weight: "primary" },
    ],
    buildings: ["louvre-pyramid", "bank-of-china-tower", "tunghai-luce-chapel"],
    awards: [{ id: "pritzker", year: 1983 }],
    isPritzker: true,
    wordCount: 500,
    importance: 4,
    tags: ["chinese-american", "louvre", "geometric-clarity"],
    relatedIds: [],
    // T3.3 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText:
      "華裔美籍建築師（1917–2019），現代主義晚期最具公共聲望的實踐者，1983 年普利茲克獎得主。生於廣州、成長於蘇州望族，青年時期赴美就讀麻省理工與哈佛，於哈佛師從包浩斯創辦人葛羅培斯，將現代主義的理性訓練與他對幾何、光線與石材的敏感結合，發展出清晰而莊重的形式語言。他早年在紐約的開發公司歷練，累積了處理大型都市案的實務能力，後自立門戶，逐漸以公共與文化建築確立聲望。他一生擅長在敏感的歷史與文化脈絡中置入純粹的現代幾何。羅浮宮金字塔（1989）以透明玻璃與鋼構在拿破崙中庭中央立起一座現代入口，在法國輿論的激烈爭議中最終成為新舊對話的典範。香港中銀大廈（1990）以三角剖面的稜柱結構層層收分，撐起當時亞洲最高的樓體，改寫了香港的天際線。早年在台灣與陳其寬合作的東海大學路思義教堂（1963）則以一片雙曲面薄殼構成向上收攏的祈禱空間，是戰後台灣現代建築的代表作。他相信建築應同時尊重基地的文脈與幾何的永恆，而光線是讓空間產生生命的關鍵。他讓現代主義在東西方不同的文化語境中都找到得體而莊重的表達，被視為跨越東西方的建築外交家，2019 年以一百零二歲辭世。",
  },
  {
    id: "richard-meier",
    type: "architect",
    name: { en: "Richard Meier", zh: "理查·邁爾" },
    lifespan: [1934, 2025],
    nationality: ["US"],
    movements: [
      { id: "white-architecture", period: [1965, 2010], weight: "primary" },
    ],
    buildings: ["getty-center", "ara-pacis-museum"],
    awards: [{ id: "pritzker", year: 1984 }],
    isPritzker: true,
    wordCount: 500,
    importance: 3,
    tags: ["new-york-five", "white"],
    relatedIds: [],
    // T3.3 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText:
      "美國建築師（1934–2025），以純白幾何量體與對光的精確操作聞名，1984 年普利茲克獎得主。1970 年代他與艾森曼等人並列「紐約五人組」，共同回歸柯比意 1920 年代的純粹主義語言，主張以白色、格線與量體的清晰邏輯對抗當時興起的後現代折衷。1960 與 70 年代的一系列白色獨棟住宅為他奠定名聲，把柯比意的語言更新為對光影與透明性的精密操作。白色琺瑯板、通透的樓板與經過計算的天光，是他數十年不變的字彙；他主張白色並非中性，而是最能登錄光影變化與四季色溫的顏色，陰影因此在白牆上顯得格外清晰。蓋蒂中心（1997）坐落於洛杉磯山頂，以白色金屬板與義大利石灰華砌成的建築群俯瞰全城，是他理性主義美學規模最大的實現。羅馬的和平祭壇博物館（2006）以一座現代玻璃盒緊鄰奧古斯都時代的古祭壇，一度引發激烈爭議，卻也奠定他在歷史城市中堅持現代語言的立場。他的作品高度一致，幾乎可視為單一理念的持續變奏；支持者讚其純粹，批評者則指其缺乏變化。他證明了一套嚴格的形式紀律足以支撐起整個建築生涯。",
  },
  {
    id: "kenzo-tange",
    type: "architect",
    name: { en: "Kenzo Tange", zh: "丹下健三", native: "丹下健三" },
    lifespan: [1913, 2005],
    nationality: ["JP"],
    movements: [
      { id: "metabolism", period: [1960, 1975], weight: "primary" },
      { id: "brutalism", period: [1955, 1975], weight: "secondary" },
    ],
    buildings: ["hiroshima-peace-memorial", "yoyogi-gym", "fuji-tv-building"],
    awards: [{ id: "pritzker", year: 1987 }],
    isPritzker: true,
    wordCount: 500,
    importance: 4,
    tags: ["metabolism-founder", "tokyo-olympics-1964"],
    relatedIds: [],
    // T3.3 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText:
      "日本建築師（1913–2005），戰後日本現代建築的奠基者與教父，1987 年普利茲克獎得主。他在東京大學受教育並長期任教，早年深受柯比意影響，畢生致力於把西方現代主義與日本傳統的結構、尺度與空間觀念融合為一種屬於日本的現代語言。他的第一件重要作品廣島和平紀念資料館（1955）以一座架空的混凝土長廊面向原爆遺址，讓現代建築承擔起集體記憶與哀悼的責任，也使日本正式進入國際建築的對話。1964 年為東京奧運設計的代代木競技場以巨大的懸吊鋼纜張拉出流動的曲面屋頂，把結構的力學轉化為近乎神社的莊嚴造型，被視為二十世紀結構表現主義的傑作。他也是代謝派的精神領袖，1960 年提出東京灣的巨型都市計畫，構想城市如生命體般在海上生長；1970 年他更主持大阪萬國博覽會的總體規劃，把日本當代建築推上國際舞台。晚年的富士電視台大樓（1996）延續他對巨型結構與都市地標的興趣。作為東大教授，他培育出磯崎新、黑川紀章與槙文彥等多位下一代大師，深刻形塑了戰後日本建築的走向。他讓日本現代建築在世界舞台上取得了核心的位置。",
  },
  {
    id: "oscar-niemeyer",
    type: "architect",
    name: { en: "Oscar Niemeyer", zh: "尼邁耶" },
    lifespan: [1907, 2012],
    nationality: ["BR"],
    movements: [
      { id: "modernism", period: [1935, 2012], weight: "primary" },
    ],
    buildings: ["brasilia-national-congress", "niteroi-museum"],
    awards: [{ id: "pritzker", year: 1988 }],
    isPritzker: true,
    wordCount: 500,
    importance: 4,
    tags: ["brazilian-modernism", "curve-master"],
    relatedIds: [],
    // T3.3 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText:
      "巴西建築師（1907–2012），現代主義曲線詩學的大師，1988 年普利茲克獎得主。他曾表示直角與直線是人造的產物，真正吸引他的是山巒、河流與女性身體那種自由流動的曲線，並以鋼筋混凝土的塑性把這份信念化為建築。他認為建築應該美麗、自由而令人驚喜，並不諱言造型往往先於機能，主張美感本身就是一種社會承諾。1940 年代起他與規劃師科斯塔合作，也曾作為巴西代表參與紐約聯合國總部的設計團隊。他一生最雄心的舞台是新首都巴西利亞：科斯塔規劃出飛機形的城市軸線，尼邁耶則為其設計主要建築，巴西利亞國會大廈（1960）以一仰一俯的兩座碗形議場與並立雙塔，成為二十世紀最具紀念性的都市烏托邦意象。晚年的尼泰羅伊當代藝術館（1996）以獨腳托起的飛碟狀量體懸浮於海灣之上，延續他對曲線的終身迷戀。身為共產黨員，他在軍政府時期流亡巴黎近二十年，在歐洲、非洲與中東留下多件作品，1980 年代才返國，一生創作橫跨八十餘年。他讓現代主義在南半球長出一種輕盈、感性而樂觀的樣貌，活到一百零四歲。",
  },
  {
    id: "frank-gehry",
    type: "architect",
    name: { en: "Frank Gehry", zh: "蓋瑞" },
    lifespan: [1929, 2099],
    nationality: ["CA", "US"],
    movements: [
      { id: "late-modernism", period: [1965, 1985], weight: "primary" },
      { id: "deconstructivism", period: [1985, 2000], weight: "primary" },
      { id: "digital-freeform", period: [2000, 2024], weight: "primary" },
    ],
    buildings: ["bilbao-guggenheim", "walt-disney-concert-hall"],
    awards: [{ id: "pritzker", year: 1989 }],
    isPritzker: true,
    wordCount: 500,
    importance: 5,
    tags: ["deconstructivism", "titanium-curves"],
    relatedIds: [],
    // T3.3 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText:
      "加拿大裔美籍建築師（1929 年生），解構主義最著名的代表，也是把數位技術帶入建築造型的先驅，1989 年普利茲克獎得主。他在洛杉磯成長與執業，早年以廉價的鐵絲網、膠合板與浪板等日常材料進行實驗，1978 年改造自宅時把碎裂、傾斜與未完成的美學公諸於世，奠定了他的個人語言。他的作品打破了牆、屋頂與樓板的正交秩序，讓建築彷彿凝結中的動態雕塑。畢爾包古根漢美術館（1997）以層疊翻捲的鈦金屬曲面矗立於工業河岸，不僅震撼世界，更以一座建築重振了整座沒落城市的經濟，催生出所謂的「畢爾包效應」，改寫了二十一世紀美術館的角色與語彙。洛杉磯的華特迪士尼音樂廳（2003）以不鏽鋼的曲面外殼成為城市的新地標，內部則以木質音場包裹出溫暖的聽覺空間。為了實現這些複雜曲面，他的事務所引入航太業的數位建模軟體，改變了當代建築的設計與營造流程，也讓過去難以建造的複雜曲面成為可能。他生於加拿大多倫多，後移居加州發展，作品始終在藝術與建築的邊界之間游走。他讓建築成為一種自由奔放、情感外顯的藝術形式。",
  },
  {
    id: "aldo-rossi",
    type: "architect",
    name: { en: "Aldo Rossi", zh: "羅西" },
    lifespan: [1931, 1997],
    nationality: ["IT"],
    movements: [
      { id: "tendenza", period: [1965, 1997], weight: "primary" },
      { id: "neo-rationalism", period: [1965, 1997], weight: "primary" },
    ],
    buildings: ["san-cataldo-cemetery", "il-teatro-del-mondo"],
    books: ["the-architecture-of-the-city"],
    awards: [{ id: "pritzker", year: 1990 }],
    isPritzker: true,
    wordCount: 500,
    importance: 4,
    tags: ["italian-tendenza", "urban-memory"],
    relatedIds: [],
    // T3.3 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText:
      "義大利建築師與理論家（1931–1997），新理性主義與 Tendenza 運動的領袖，1990 年普利茲克獎得主。1966 年出版的《城市建築學》是戰後最具影響力的建築理論之一：他主張建築不是孤立的物件，而是城市集體記憶的承載者，城市透過紀念物與類型在時間中累積自身。他把這套思想稱為「類比城市」，主張新建築應從既有的城市形式中類推而來。他反對純機能主義，回到窗、柱、山牆這些恆常的原型，以近乎形而上的靜謐構圖重新賦予建築歷史的重量。摩德納的聖卡達多公墓（1971 年設計）以立方體、圓錐與骨架般的方格量體，排列出一座沉默的死者之城，把類型學推向紀念性的極致。為 1980 年威尼斯建築雙年展設計的世界劇場（1979）則是一座可漂浮於潟湖上的木構小劇場，把城市的臨時與詩意並置。除了建築，他的鋼筆繪圖與為義大利廠牌設計的家用器物同樣廣為流傳；他長年於米蘭、威尼斯與美國任教，其類型學思想成為 1970 年代後歐美建築界的共同語彙，也預示了後現代主義對歷史與記憶的重新關注。1997 年因車禍辭世。",
  },
  {
    id: "robert-venturi",
    type: "architect",
    name: { en: "Robert Venturi", zh: "文丘里" },
    lifespan: [1925, 2018],
    nationality: ["US"],
    movements: [
      { id: "postmodernism", period: [1962, 2018], weight: "primary" },
    ],
    buildings: ["vanna-venturi-house", "sainsbury-wing"],
    books: ["complexity-and-contradiction", "learning-from-las-vegas"],
    awards: [{ id: "pritzker", year: 1991 }],
    isPritzker: true,
    wordCount: 500,
    importance: 5,
    tags: ["less-is-bore", "postmodernism-founder"],
    relatedIds: [],
    // T3.3 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText:
      "美國建築師與理論家（1925–2018），後現代主義的理論奠基者，1991 年普利茲克獎得主。他在普林斯頓受教育，曾赴羅馬進修，深受歷史建築的複雜與矛盾吸引，逐漸對現代主義的純粹與教條感到不滿。1966 年出版的《建築的複雜與矛盾》把密斯的「少即是多」翻轉為「少即是無趣」，主張建築應容納曖昧、多義與日常的雜訊，被視為後現代主義的理論起點。1972 年他與妻子暨長期合夥人丹妮絲·斯科特·布朗合著《向拉斯維加斯學習》，正面研究商業招牌與大眾符號，提出「裝飾的棚屋」概念，替通俗與象徵性平反。他為母親設計的母親之家（1964）以一面看似對稱卻處處錯位的山牆立面，把這些理論化為可見的形式，成為後現代主義的開山之作。晚年他與斯科特·布朗合作的國家美術館塞恩斯伯里翼（1991）在倫敦的古典脈絡中以反諷而細膩的手法回應歷史。他的著作影響力甚至超過其建築，讓一整代建築師得以擺脫現代主義的單一教條，重新打開了建築與歷史、符號與大眾文化的對話；多年來他也堅持與斯科特·布朗共享一切榮譽。",
  },
  {
    id: "alvaro-siza",
    type: "architect",
    name: { en: "Álvaro Siza", zh: "西薩" },
    lifespan: [1933, 2099],
    nationality: ["PT"],
    movements: [
      { id: "critical-regionalism", period: [1960, 2024], weight: "primary" },
    ],
    buildings: ["leca-swimming-pools", "iberê-camargo-foundation"],
    awards: [{ id: "pritzker", year: 1992 }],
    isPritzker: true,
    wordCount: 500,
    importance: 4,
    tags: ["portuguese", "school-of-porto"],
    relatedIds: [],
    // T3.3 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText:
      "葡萄牙建築師（1933 年生），批判性地域主義與波多學派的代表，1992 年普利茲克獎得主。他師承波多的費爾南多·塔沃拉，一生的實踐大多圍繞這座城市及其周邊展開，作品看似樸素，實則對地形與光線有精密的回應。他的作品始終扎根於基地的地形、光線與在地營造傳統，卻同時具備現代主義的普世精確，被視為以地方回應全球化的典範。早期在故鄉波多一帶的作品便展現這種特質：萊薩海水游泳池（1966）沿著大西洋岸的礁岩鋪陳混凝土牆與階梯，讓人工的泳池與天然的潮間帶幾乎無縫接合，成為地景建築的早期傑作。他擅長以白色的量體、精心裁切的開口與蜿蜒的動線，在看似簡單的形式中安排複雜的空間經驗。晚年跨海完成的巴西伊貝拉·卡馬戈基金會（2008）以彎曲的白色坡道盤旋於陡坡之上，把他長年鑽研的雕塑性現代主義推向新的尺度。1970 年代葡萄牙革命後，他投入大量平價國民住宅的規劃，證明地域性的精緻也能服務於公共與集體。他終身保持手繪的習慣，設計往往從一枝鉛筆的速寫開始。作為波多學派的精神支柱，他影響了南歐與拉美的多位後輩建築師。",
  },
  {
    id: "fumihiko-maki",
    type: "architect",
    name: { en: "Fumihiko Maki", zh: "槙文彥", native: "槙文彦" },
    lifespan: [1928, 2024],
    nationality: ["JP"],
    movements: [
      { id: "metabolism", period: [1960, 1975], weight: "primary" },
      { id: "late-modernism", period: [1980, 2020], weight: "primary" },
    ],
    buildings: ["spiral-tokyo", "4-wtc"],
    awards: [{ id: "pritzker", year: 1993 }],
    isPritzker: true,
    wordCount: 500,
    importance: 4,
    tags: ["metabolism", "japan-modernism"],
    relatedIds: [],
    // T3.3 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText:
      "日本建築師（1928–2024），代謝派的創始成員之一，也是戰後日本現代主義最沉穩內斂的代表，1993 年普利茲克獎得主。他在東京大學隨丹下健三學習，後赴美就讀克蘭布魯克與哈佛，長期往返日美之間任教與執業，把現代主義的理性與日本傳統對空間層次、材料細節的敏感融合起來。1960 年他與黑川紀章等人共同發表代謝派宣言，主張建築與城市應如生物般可生長、可代謝；相較於同儕的巨型結構空想，他更關注群體形式如何在時間中漸進地累積。他在東京代官山主持的一組低層集合建築群，前後歷時二十五年分期完成，示範了這種細膩的都市編織。螺旋大廈（1985）以錯位的幾何量體與中庭坡道，把商業、藝廊與活動空間縫合成一座垂直的都市片段。晚年他跨海設計的世貿中心四號大樓（2013）以極簡的玻璃稜柱，為紐約九一一原址獻上一座沉靜克制的紀念性建築。他終身反對浮誇的造型，追求精確、輕盈與恰如其分的空間品質，並以教學影響了數個世代的日本建築師。他證明了現代主義也能是一種安靜而持久的修養。",
  },
  {
    id: "tadao-ando",
    type: "architect",
    name: { en: "Tadao Ando", zh: "安藤忠雄", native: "安藤忠雄" },
    lifespan: [1941, 2099],
    nationality: ["JP"],
    movements: [
      { id: "critical-regionalism", period: [1975, 2024], weight: "primary" },
      { id: "minimalism", period: [1975, 2024], weight: "primary" },
    ],
    buildings: ["church-of-the-light", "sumiyoshi-row-house"],
    awards: [{ id: "pritzker", year: 1995 }],
    isPritzker: true,
    wordCount: 500,
    importance: 4,
    tags: ["self-taught", "concrete", "japanese-minimalism"],
    relatedIds: [],
    // T3.3 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText:
      "日本建築師（1941 年生），以清水混凝土與對光的操作著稱的自學者，1995 年普利茲克獎得主。他沒有正規的建築學歷，年輕時當過職業拳擊手，靠自學與親赴歐洲、看柯比意與古典建築起家，這段非典型的養成使他的作品帶著一種近乎修行的專注。他把冷硬平滑的清水混凝土、幾何的量體與精心引入的自然光，結合成一種當代的禪意空間，屬於批判性地域主義與極簡主義的交會，也延續了日本傳統對陰翳、留白與空寂的美學。位於大阪茨木的光之教堂（1989）在一片素樸的混凝土牆上切出一道十字形的開口，光從縫隙湧入昏暗的室內，把最簡單的元素化為神聖的場景，成為當代宗教建築的經典。早期的住吉長屋（1976）則在密集的都市街屋中央嵌入一方露天中庭，強迫居住者在日常中直接面對風雨與四季。他一生設計了大量美術館、教堂與住宅，晚年更以直島一系列與地形結合的地下美術館，把建築融入瀨戶內海的地景，也積極投入公共植樹與建築教育。他以最有限的材料與元素，證明了建築也能創造出深邃、近乎宗教的精神性空間。",
  },
  {
    id: "rafael-moneo",
    type: "architect",
    name: { en: "Rafael Moneo", zh: "莫內奧" },
    lifespan: [1937, 2099],
    nationality: ["ES"],
    movements: [
      { id: "critical-regionalism", period: [1970, 2024], weight: "primary" },
    ],
    buildings: ["roman-museum-merida", "kursaal-san-sebastian"],
    awards: [{ id: "pritzker", year: 1996 }],
    isPritzker: true,
    wordCount: 500,
    importance: 3,
    tags: ["spanish", "context-sensitive"],
    relatedIds: [],
    // T3.3 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText:
      "西班牙建築師與理論家（1937 年生），以對歷史脈絡的細膩回應著稱，1996 年普利茲克獎得主。他成長於馬德里，早年曾赴丹麥與羅馬歷練，深受義大利對城市與紀念性思考的影響，逐漸發展出一種既現代又尊重場所記憶的設計態度。他反對套用單一風格，主張每一件建築都應從基地的歷史、材料與尺度中長出自己的形式。梅里達的國立羅馬藝術博物館（1986）以厚重的磚砌拱廊呼應鄰近的羅馬遺跡，讓新建築彷彿是古城的延續，奠定他的國際聲望。聖塞巴斯提安的庫薩爾會議中心（1999）則以兩座半透明的玻璃量體矗立於海灣邊，白日像礁石、夜裡如燈籠，展現他處理當代大型公共建築的能力。除了設計，他長年於馬德里與哈佛任教，曾任哈佛設計研究院建築系主任，是當代最具影響力的建築教育者之一，其對類型、脈絡與構造的論述廣為引用。他堅持建築沒有放諸四海的公式，每個問題都有其獨特的解答，因而拒絕發展出可複製的招牌樣式。他的作品沒有一眼可辨的個人標記，卻始終在新與舊、地方與普世之間維持精準的平衡。他證明了謙遜地回應場所，本身就是一種強大的建築立場。",
  },
  {
    id: "renzo-piano",
    type: "architect",
    name: { en: "Renzo Piano", zh: "皮亞諾" },
    lifespan: [1937, 2099],
    nationality: ["IT"],
    movements: [
      { id: "high-tech", period: [1970, 2024], weight: "primary" },
    ],
    buildings: ["pompidou-center", "the-shard", "menil-collection"],
    awards: [{ id: "pritzker", year: 1998 }],
    isPritzker: true,
    wordCount: 500,
    importance: 4,
    tags: ["high-tech", "renaissance"],
    relatedIds: [],
    // T3.3 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText:
      "義大利建築師（1937 年生），高科技建築的代表，卻以對光線與輕盈的終身追求超越了這個標籤，1998 年普利茲克獎得主。他出身熱那亞的營造世家，自幼在工地間長大，對材料、結構與工藝有近乎本能的理解。1971 年他與理查·羅傑斯合作贏得巴黎的競圖，龐畢度中心（1977）把結構、電扶梯與各式管線全部翻到外牆，讓建築像一部坦露的機器，徹底顛覆了美術館的形象，也一舉奠定兩人的名聲。此後他成立自己的工作室，作品遍及各大洲，卻始終圍繞一個母題：如何讓沉重的構造顯得輕盈，如何把自然光細膩地引入室內。休士頓的梅尼爾收藏館（1987）以精密的葉片狀天窗過濾德州烈日，成為美術館採光的典範。倫敦的碎片大廈（2012）以逐漸收攏的玻璃錐體成為西歐當時最高的建築。他的事務所以嚴謹的技術整合與人文關懷著稱，作品橫跨機場、音樂廳、報社與博物館。他把事務所命名為「建築工作坊」，強調設計是集體的手工勞動，並常說自己追求的是讓建築幾乎消失、只留下光與空間本身。他讓高科技建築從機械的炫技，走向一種關於光、透明與細節的詩學。",
  },
  {
    id: "norman-foster",
    type: "architect",
    name: { en: "Norman Foster", zh: "福斯特" },
    lifespan: [1935, 2099],
    nationality: ["GB"],
    movements: [
      { id: "high-tech", period: [1970, 2024], weight: "primary" },
    ],
    buildings: ["hsbc-hong-kong", "gherkin", "apple-park"],
    awards: [{ id: "pritzker", year: 1999 }],
    isPritzker: true,
    wordCount: 500,
    importance: 4,
    tags: ["high-tech", "sustainability"],
    relatedIds: [],
    // T3.3 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText:
      "英國建築師（1935 年生），高科技建築的旗手，也是當代規模最大的建築事務所之一的創辦人，1999 年普利茲克獎得主。他出身曼徹斯特的工人家庭，靠獎學金就讀曼徹斯特大學與耶魯，早年曾與理查·羅傑斯組成「四人小組」，共同奠定英國高科技運動的基礎。他相信建築應以最精簡的結構達成最大的效能，並把工業技術、預製構件與環境性能整合為一種清晰而優雅的語言。香港滙豐總行大廈（1985）把主結構懸吊在外部的巨型桁架上，釋放出通透無柱的室內大廳，是高科技建築的里程碑。倫敦的小黃瓜（2003）以螺旋上升的曲面玻璃塔與自然通風系統，成為生態高層的象徵。晚年他為蘋果設計的 Apple Park（2017）以一環形的巨型量體與大面積綠地，實現了賈伯斯生前對總部的構想。他的事務所長期投入節能、材料與結構創新，作品類型從橋樑、機場、辦公樓到議會建築橫跨全球，規模在建築界名列前茅。他相信良好的設計能同時提升效能、使用體驗與環境表現，把建築視為一門以理性解決複雜問題的工程，也長期倡議都市密度與大眾運輸。他讓高科技建築與永續、都市尺度的公共責任結合起來。",
  },
  {
    id: "rem-koolhaas",
    type: "architect",
    name: { en: "Rem Koolhaas", zh: "庫哈斯" },
    lifespan: [1944, 2099],
    nationality: ["NL"],
    movements: [
      { id: "deconstructivism", period: [1980, 1995], weight: "secondary" },
      { id: "bigness", period: [1995, 2024], weight: "primary" },
    ],
    buildings: ["cctv-headquarters", "seattle-central-library"],
    books: ["delirious-new-york", "s-m-l-xl"],
    awards: [{ id: "pritzker", year: 2000 }],
    isPritzker: true,
    wordCount: 500,
    importance: 4,
    tags: ["oma", "theory-and-practice"],
    relatedIds: [],
    // T3.3 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText:
      "荷蘭建築師與理論家（1944 年生），大都會建築事務所（OMA）的主持人，2000 年普利茲克獎得主。他早年曾是記者與電影編劇，這段經歷讓他一生把建築當成分析當代社會、經濟與都市現象的媒介，論述往往先於形式。1978 年出版的《狂譫紐約》以「曼哈頓主義」重新詮釋摩天樓與擁擠的文化，1995 年與布魯斯·茅合著的巨冊《S,M,L,XL》則把設計、理論與統計拼貼成一部當代建築思想的百科，兩書都成為經典。他提出「大」的概念，主張當建築達到一定規模，便會產生自身的邏輯，超越傳統的構圖法則。西雅圖中央圖書館（2004）以錯動堆疊的玻璃量體重新組織了圖書館的機能與動線。北京的央視總部大樓（2012）以一個連續彎折、懸臂相接的環狀結構挑戰重力與常規，成為當代最具爭議也最具話題的地標之一。他透過 OMA 與智庫 AMO 同時進行建造與研究，把出版、策展與設計視為一體，2014 年也曾擔任威尼斯建築雙年展的總策展人。他深刻影響了當代建築的思考方式，門下走出多位獨當一面的建築師。",
  },
  {
    id: "herzog-de-meuron",
    type: "architect",
    name: { en: "Herzog & de Meuron", zh: "赫爾佐格與德梅隆" },
    lifespan: [1950, 2099],
    nationality: ["CH"],
    movements: [
      { id: "material-architecture", period: [1980, 2024], weight: "primary" },
    ],
    buildings: ["tate-modern", "beijing-national-stadium", "elbphilharmonie"],
    awards: [{ id: "pritzker", year: 2001 }],
    isPritzker: true,
    wordCount: 500,
    importance: 4,
    tags: ["swiss", "material-experiment", "duo"],
    relatedIds: [],
    // T3.3 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText:
      "瑞士建築事務所，由雅克·赫爾佐格與皮耶·德梅隆（皆 1950 年生）於巴塞爾共同主持，2001 年普利茲克獎得主。兩人自幼相識、於蘇黎世聯邦理工學院同窗，1978 年合組事務所，以對材料、表面與構造的持續實驗聞名，作品沒有固定的形式風格，卻總在建築的皮層上找到出人意料的表現。他們讓混凝土、石材、玻璃、金屬網與印刷圖案都成為可經營的材料語言。倫敦泰特現代美術館（2000）把一座廢棄的河畔發電廠改造為當代最重要的美術館之一，保留巨大渦輪廳的手法重新定義了工業遺產的再利用。北京國家體育場（2008）以交織纏繞的鋼構外殼形成「鳥巢」的意象，是二〇〇八奧運最具辨識度的地標，設計過程並有藝術家艾未未參與。漢堡的易北愛樂廳（2017）在一座舊倉庫之上疊起一頂波浪狀的玻璃冠，成為城市的新象徵，也是當代最受矚目的音樂廳之一。他們長年與藝術家跨界合作，也在巴塞爾設立研究機構，把都市與材料的調查納入設計。他們證明了嚴謹的材料研究本身，就足以支撐起一種不斷更新、難以被單一風格定義的當代建築。",
  },
  {
    id: "glenn-murcutt",
    type: "architect",
    name: { en: "Glenn Murcutt", zh: "穆卡特" },
    lifespan: [1936, 2099],
    nationality: ["AU"],
    movements: [
      { id: "critical-regionalism", period: [1975, 2024], weight: "primary" },
      { id: "sustainable", period: [1975, 2024], weight: "primary" },
    ],
    buildings: ["magney-house", "marie-short-house"],
    awards: [{ id: "pritzker", year: 2002 }],
    isPritzker: true,
    wordCount: 500,
    importance: 4,
    tags: ["australian", "one-man-practice", "sustainable"],
    relatedIds: [],
    // T3.3 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText:
      "澳洲建築師（1936 年生），以獨力經營的小型事務所與對土地的敏感聞名，2002 年普利茲克獎得主。他終身堅持一人執業、不設分所、不接海外委託，親手完成每一件設計，作品幾乎全數落在澳洲的鄉野，且以獨棟住宅為主。他常引用一句原住民諺語「輕輕觸碰大地」概括自己的信條，主張建築應以最小的干預回應基地的氣候、地形與生態。他細緻研究澳洲的日照、季風、雨水與野火，把這些條件轉化為建築的形式：架高的地板、可調節的百葉、深遠的出簷與捕捉氣流的剖面。瑪麗·蕭宅（1975）以簡單的長條平面與波浪狀鋁屋頂，示範了如何以輕量的木構與金屬順應鄉間地景。麥格尼宅（1984）則以一道單斜的金屬屋頂收集雨水、導引通風，成為氣候回應設計的教科書案例。他的作品造價不高、技術不繁複，卻在比例、光線與細節上極為講究。他親手繪圖、案量極少，往往花數年打磨一件住宅；每年他也主持一場面向各國年輕建築師的大師營，把觀察氣候、順應地形的方法傳承下去。他以一種近乎手工藝的方式，證明了地域性、永續與現代建築的精緻可以合而為一。",
  },
  {
    id: "zaha-hadid",
    type: "architect",
    name: { en: "Zaha Hadid", zh: "札哈·哈蒂" },
    lifespan: [1950, 2016],
    nationality: ["IQ", "GB"],
    movements: [
      { id: "deconstructivism", period: [1983, 2000], weight: "primary" },
      { id: "parametricism", period: [2000, 2016], weight: "primary" },
    ],
    buildings: ["maxxi-museum", "guangzhou-opera-house", "heydar-aliyev-center"],
    awards: [{ id: "pritzker", year: 2004 }],
    isPritzker: true,
    wordCount: 500,
    importance: 4,
    tags: ["first-female-pritzker", "parametricism"],
    relatedIds: [],
    // T3.3 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText:
      "伊拉克裔英國建築師（1950–2016），首位獲普利茲克獎的女性（2004），也是參數化設計最具代表性的人物。她生於巴格達，先在貝魯特攻讀數學，後赴倫敦建築聯盟學院學習建築，早年以極具動能的繪畫式方案聞名，那些看似無法建造的傾斜、爆裂構圖，把俄國前衛的至上主義與構成主義推向新的維度，也重新定義了建築繪圖本身。長達十餘年她的設計多停留在紙上與競圖，直到數位技術成熟才逐一化為真實的曲面。她的建築追求連續、流動而無稜角的空間，彷彿由速度與力場塑形而成。羅馬的 MAXXI 國立 21 世紀藝術博物館（2010）以交纏分岔的長廊打破了美術館的傳統動線。廣州大劇院（2010）以兩塊被江水沖刷過的巨石為意象，把流動的造型帶入中國。巴庫的阿利耶夫文化中心（2012）則以一片連綿起伏、幾乎沒有直角的白色表面，把地面、牆與屋頂融為一體，成為參數化美學的巔峰。她的事務所在她驟然離世後仍持續運作，把參數化的探索延續下去。她拓寬了建築造型的可能，也為女性在這個長期由男性主導的行業，樹立了難以忽視的存在。",
  },
  {
    id: "peter-zumthor",
    type: "architect",
    name: { en: "Peter Zumthor", zh: "卒姆托" },
    lifespan: [1943, 2099],
    nationality: ["CH"],
    movements: [
      { id: "phenomenology", period: [1985, 2024], weight: "primary" },
      { id: "minimalism", period: [1985, 2024], weight: "primary" },
    ],
    buildings: ["therme-vals", "bruder-klaus-chapel"],
    books: ["thinking-architecture", "atmospheres"],
    awards: [{ id: "pritzker", year: 2009 }],
    isPritzker: true,
    wordCount: 500,
    importance: 4,
    tags: ["material-poetics", "atmospheres"],
    relatedIds: [],
    // T3.3 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText:
      "瑞士建築師（1943 年生），以材料的質感與空間氛圍著稱的現象學代表，2009 年普利茲克獎得主。他出身木匠家庭，早年受過家具細木工的訓練，後轉向古蹟保存工作，養成對材料、工法與場所歷史的細膩敏感，也讓他終生保持工匠般的實作態度。他刻意把事務所維持在極小的規模，每次只承接一兩個案子，親自推敲每一處接縫、光線與觸感，追求建築被身體感知時所喚起的氛圍。瓦爾斯溫泉浴場（1996）以當地開採的片麻岩層層砌築，在幽暗與蒸氣中安排水、光與石的序列，把沐浴轉化為一場近乎儀式的空間經驗，成為當代建築教育反覆援引的案例。克勞斯兄弟田野禮拜堂（2007）則以在圓木堆上澆灌混凝土、再將內部木材燒盡的方式，留下一個帶著焦痕與孔洞的神祕內部。他刻意遠離媒體與潮流，長年在瑞士山區的小鎮工作。他也以《建築思考》與《氛圍》等文字闡述創作理念，主張建築的核心在於真實材料所激起的情感與記憶。他讓現象學的空間思考成為當代最具影響力的取向之一，影響了無數追求氛圍與觸感的年輕建築師。",
  },
  {
    id: "sanaa",
    type: "architect",
    name: { en: "SANAA", zh: "妹島和世與西澤立衛", native: "妹島和世 + 西澤立衛" },
    lifespan: [1956, 2099],
    nationality: ["JP"],
    movements: [
      { id: "minimalism", period: [1995, 2024], weight: "primary" },
      { id: "post-metabolism", period: [1995, 2024], weight: "primary" },
    ],
    buildings: ["21st-century-museum-kanazawa", "rolex-learning-center"],
    awards: [{ id: "pritzker", year: 2010 }],
    isPritzker: true,
    wordCount: 500,
    importance: 4,
    tags: ["japanese-duo", "transparency", "minimalism"],
    relatedIds: [],
    // T3.3 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText:
      "日本建築事務所，由妹島和世（1956 年生）與西澤立衛（1966 年生）於 1995 年共同創立，2010 年普利茲克獎得主。妹島早年任職於伊東豊雄事務所，兩人的合作以極致的輕盈、透明與白色構成一種近乎消失的建築，試圖抹去牆體的重量與界線，讓空間流動、模糊內外。他們常以纖細的柱、通透的玻璃與柔和的曲線，創造出既開放又親密的場所感。金澤 21 世紀美術館（2004）以一個巨大的圓形玻璃量體收納多個大小不一的展廳，取消了美術館單向的動線，讓觀眾自由地在通透的空間中穿行。瑞士洛桑的勞力士學習中心（2010）則以一片連續起伏的樓板構成單一的開放空間，地形般的坡度取代了牆與門，讓建築成為可自由漫遊的地景。他們的作品看似簡單，實則對結構、環境與人的行為有極為精密的計算。除了共同的事務所，兩人也各自執業並培育後進，作品從住宅、美術館到大學建築遍及日本、歐洲與美國。他們以極為精密的計算換取看似輕描淡寫的結果，使人幾乎察覺不到結構的存在，把日本現代建築推向一種前所未有的透明與輕盈。",
  },
  {
    id: "wang-shu",
    type: "architect",
    name: { en: "Wang Shu", zh: "王澍", native: "王澍" },
    lifespan: [1963, 2099],
    nationality: ["CN"],
    movements: [
      { id: "critical-regionalism", period: [2000, 2024], weight: "primary" },
    ],
    buildings: ["ningbo-museum", "china-academy-of-art-xiangshan"],
    awards: [{ id: "pritzker", year: 2012 }],
    isPritzker: true,
    wordCount: 500,
    importance: 4,
    tags: ["chinese", "tile-reuse", "amateur-architecture"],
    relatedIds: [],
    // T3.3 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText:
      "中國建築師（1963 年生），首位獲普利茲克獎的中國人（2012），任教於中國美術學院。他與妻子陸文宇共同主持的事務所取名「業餘建築工作室」，以此姿態對抗中國快速都市化下標準化、規模化的營造暴政，主張建築應保留手工、時間與地方的記憶。他大量使用回收的舊磚與瓦片，發展出一種名為「瓦爿牆」的砌法，把被拆除的老建築材料重新編織進新的牆體，讓歷史在拆遷的浪潮中得以留存。寧波博物館（2008）以起伏的量體與拼貼著數十萬片舊瓦與磚石的立面，形成一座彷彿從江南水土中長出的建築。他親自參與規劃的中國美術學院象山校區（2007）則以手作的磚瓦、木構與蜿蜒的動線，回應了江南的山水傳統、園林意境與書院精神，讓校園本身成為一片可漫步的山水。他的作品刻意保留粗糙與不完美的痕跡，強調時間、自然與工匠雙手的參與。他也是一位教育者，長年在中國美術學院推動強調動手實作的實驗建築教育，並曾主持該校的建築學院。他為高速現代化、大量拆除重建的中國，示範了另一條扎根於在地文化、山水意境與傳統工藝的建築道路。",
  },
  {
    id: "toyo-ito",
    type: "architect",
    name: { en: "Toyo Ito", zh: "伊東豊雄", native: "伊東豊雄" },
    lifespan: [1941, 2099],
    nationality: ["JP"],
    movements: [
      { id: "post-metabolism", period: [1980, 2024], weight: "primary" },
    ],
    buildings: ["sendai-mediatheque", "taichung-opera-house"],
    awards: [{ id: "pritzker", year: 2013 }],
    isPritzker: true,
    wordCount: 500,
    importance: 4,
    tags: ["fluid", "japanese-modernism"],
    relatedIds: [],
    // T3.3 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText:
      "日本建築師（1941 年生），以流動而輕盈的空間探索著稱，2013 年普利茲克獎得主。他早年任職於菊竹清訓事務所，深受代謝派影響，卻逐漸走向一種更柔軟、更接近自然的建築觀，試圖打破現代主義的網格與均質，讓建築像水、風或樹木般具有流動與生長的秩序。他長年思考如何以新的結構與幾何，回應資訊時代人與環境變動不居的關係，早年便以輕質、臨時感的作品探索電子時代的建築。仙台媒體中心（2001）以十三根宛如水草搖曳的樹狀鋼管貫穿七層樓板，取消了傳統的柱牆體系，創造出通透而自由的公共空間，被視為二十一世紀公共建築的里程碑。臺中國家歌劇院（2016）則以連續彎曲的曲牆構成所謂「美聲涵洞」，讓牆、地與天花板連為一體，是他晚期結構與空間實驗的集大成。他也長期投入災後重建與建築教育，311 大地震後在災區推動名為「大家的家」的木造公共聚會空間，並培育出妹島和世、藤本壯介等下一代建築師。他讓日本現代建築在丹下健三所奠定的基礎上，走向一種更輕盈、更接近自然、更具生命感的新方向。",
  },
  {
    id: "shigeru-ban",
    type: "architect",
    name: { en: "Shigeru Ban", zh: "坂茂", native: "坂茂" },
    lifespan: [1957, 2099],
    nationality: ["JP"],
    movements: [
      { id: "sustainable", period: [1990, 2024], weight: "primary" },
      { id: "paper-architecture", period: [1990, 2024], weight: "primary" },
    ],
    buildings: ["paper-cathedral-christchurch", "centre-pompidou-metz"],
    awards: [{ id: "pritzker", year: 2014 }],
    isPritzker: true,
    wordCount: 500,
    importance: 4,
    tags: ["disaster-relief", "paper-tubes"],
    relatedIds: [],
    // T3.3 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText:
      "日本建築師（1957 年生），以紙管等平凡材料的結構實驗與長年的災後重建工作聞名，2014 年普利茲克獎得主。他在美國師從約翰·海杜克等人受建築教育，深受構造與幾何訓練的影響，早年便開始研究紙管作為建築構件的可能，發現這種廉價、易得又可回收的材料，經過處理後足以承擔真實的結構。1995 年阪神大地震後，他以紙管為失去家園的災民搭建臨時教堂與住宅，此後將這套方法帶往盧安達、土耳其、海地、中國與紐西蘭等災區，成立志願建築師網絡，讓建築成為人道救援的一環。他並不把救災與正規實踐分開：紐西蘭基督城地震後（2013）他以紙管與貨櫃建成一座可容數百人的紙教堂，證明臨時材料也能構成莊嚴而耐久的公共空間。法國的龐畢度梅斯中心（2010）則以一張受編織斗笠啟發的木構曲面屋頂覆蓋整座美術館，展現他在大型文化建築上的結構想像力。他也持續探索木材、竹子與可回收材料的可能，並設計可拆解、可搬遷的展覽空間，讓建築擺脫永久與紀念的迷思。他讓建築師的社會責任與形式創新並行不悖，重新定義了材料、臨時性與尊嚴之間的關係。",
  },
  {
    id: "francis-kere",
    type: "architect",
    name: { en: "Francis Kéré", zh: "凱雷", native: "Diébédo Francis Kéré" },
    lifespan: [1965, 2099],
    nationality: ["BF", "DE"],
    movements: [
      { id: "vernacular-modernism", period: [2000, 2024], weight: "primary" },
      { id: "sustainable", period: [2000, 2024], weight: "primary" },
    ],
    buildings: ["gando-primary-school", "serpentine-pavilion-2017"],
    awards: [{ id: "pritzker", year: 2022 }],
    isPritzker: true,
    wordCount: 500,
    importance: 4,
    tags: ["african-first", "community-architecture"],
    relatedIds: [],
    // T3.3 草稿 · 待人審（依 content-checklist.md、年份對齊資料檔）
    bodyText:
      "布吉納法索裔德國建築師（1965 年生），首位獲普利茲克獎的非洲人（2022）。他生於布吉納法索的甘多村，是村長之子，也是村裡第一個上學的孩子；後來獲獎學金赴柏林工業大學就讀，成為建築師後選擇把資源帶回家鄉。他主張以在地的材料、氣候智慧與社區的雙手來建造，反對把西方的形式與空調技術直接移植到非洲。甘多小學（2001）是他的第一件作品，也是這套理念的宣言：以壓製土磚砌牆蓄熱、抬高的雙層屋頂促進通風，全村參與施工，讓一座低成本的學校在酷熱氣候中保持涼爽，並贏得國際肯定。此後他在西非各地設計學校、醫院與公共建築，並以明亮的色彩與遮蔭的公共空間回應當地的生活；他成立基金會，把每一件工程都當成社區培力與職業訓練的機會。他也活躍於歐洲舞台：倫敦的蛇形藝廊涼亭（2017）以一棵樹的樹蔭為靈感，用木構與藍色牆板圍出一處收集雨水的聚會場所。他讓建築回到最根本的問題——如何為缺乏資源的社群提供尊嚴、涼爽而美麗的空間，證明永續與美感可以從匱乏與在地智慧中生長出來，而非依賴進口的技術。",
  },
];

/** 依 slug 查找建築師 */
export function getArchitectBySlug(slug: string): Architect | undefined {
  return ARCHITECTS.find((a) => a.id === slug);
}

/** 取所有 Pritzker 得主 */
export function getPritzkerLaureates(): Architect[] {
  return ARCHITECTS.filter((a) => a.isPritzker);
}

/** 按 importance 排序 */
export function getArchitectsByImportance(): Architect[] {
  return [...ARCHITECTS].sort((a, b) => b.importance - a.importance);
}
