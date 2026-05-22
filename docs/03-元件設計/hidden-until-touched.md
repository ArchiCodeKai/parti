# Hidden-until-Touched UX 哲學

## 核心信念

> **「Default = 冷靜到無聊 / Interactive = 色彩爆發」**

PARTI 預設畫面冷靜到接近無趣 — 讓使用者專注閱讀內文。
所有「裝飾、tag、輔助元素」預設**完全隱藏**、需要時才出現。

這是 Stripe / Linear / Apple / read.cv 真正在做的事、比典型「滿屏資訊」設計高一階。

## 4 種觸發模式

| 觸發 | 顯示元素 | 隱藏時機 |
|---|---|---|
| **頁面載入 800ms** | 一次性 peek（短暫顯示 1.5s 後淡出）| 1.5s 後 |
| **滑鼠移動** | 該區域元素淡入 | 滑鼠停止 3 秒後 |
| **Scroll 進入 viewport** | stagger 飛入 | 元素出 viewport 後淡出 |
| **Hover 進入區塊** | 該區域 tag 飛入 | Hover 離開 3 秒後 |

## 預設隱藏的元素類型

| 元素 | 預設狀態 | 觸發顯示 |
|---|---|---|
| 個人頁 tag bar (流派標籤) | `opacity: 0` | Hover hero 或 scroll viewport 60% |
| 個人頁 pullquote | 摺疊為單行 hint | scroll viewport 40% |
| 個人頁 related sidebar | 摺疊為紅點 hint「Scroll to expand」| scroll 18% 或 hover |
| Landing eyebrow / meta | `opacity: 0` | 載入後 800ms peek、之後 hover/scroll |
| Filter bar 副資訊 | `opacity: 0` | Hover filter bar 區塊 |
| 卡片 hover 反饋（朱紅點 / 邊框） | `opacity: 0` | Hover 卡片 |
| 構成主義靜態裝飾 | **完全移除**（不再使用）| — |

## 實作（pseudo code）

```typescript
// hooks/useHiddenUntilTouched.ts
function useHiddenUntilTouched(options: {
  initialPeekMs?: number;      // 載入後 peek 時間
  hideAfterIdleMs?: number;    // 停止互動多久後隱藏
  triggerOnScroll?: boolean;
  triggerOnHover?: boolean;
  scrollThresholdPercent?: number;
}) {
  const [visible, setVisible] = useState(false);
  const idleTimerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Initial peek
    if (options.initialPeekMs) {
      setVisible(true);
      setTimeout(() => setVisible(false), options.initialPeekMs);
    }
  }, []);

  const onActivity = useCallback(() => {
    setVisible(true);
    clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(
      () => setVisible(false),
      options.hideAfterIdleMs ?? 3000
    );
  }, [options.hideAfterIdleMs]);

  return { visible, onActivity };
}
```

## 動畫規範

### Fade in（觸發顯示）
```css
.huk-hidden {
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 320ms var(--ease-out),
              transform 320ms var(--ease-emphasized);
}

.huk-hidden.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

### Stagger（多元素依序）
```css
.huk-hidden:nth-child(1).is-visible { transition-delay: 0ms; }
.huk-hidden:nth-child(2).is-visible { transition-delay: 80ms; }
.huk-hidden:nth-child(3).is-visible { transition-delay: 160ms; }
.huk-hidden:nth-child(4).is-visible { transition-delay: 240ms; }
```

### Fade out（停止互動）
```css
.huk-hidden.is-fading {
  opacity: 0;
  transition: opacity 500ms var(--ease-out);
}
```

## 各頁面的 Hidden-until-Touched 設定

### Landing
- Hero eyebrow（"PARTI · 01 / ATLAS"）：載入 800ms peek、之後 hover/scroll 觸發
- 4 大入口卡片內的副資訊：hover 卡片才顯示
- 隨機 10 條的「→ OPEN ENTRY」CTA：hover row 才出現

### `/architects` 馬賽克
- Filter chip 數量提示：hover filter bar 才出現
- 卡片右上角 ⊕「加入比較」icon：hover 卡片才出現
- 卡片副資訊（生卒、流派 badge）：預設只看名字、hover 才完整顯示

### `/architects/[slug]` 個人頁
- 流派標籤 bar（"MODERNISM · PURISM · BRUTALISM · CIAM"）：scroll viewport 60% 或 hover hero 觸發
- Pullquote：scroll viewport 40% 觸發上下撐開
- Related sidebar：摺疊為紅點 hint、scroll 18% 或 hover 展開
- 短頁 fallback：1.2 秒後仍在 viewport 內 → 自動展開

### `/movements/[slug]` 流派頁
- 該派人物 list 副資訊：hover row 才顯示
- 傳承樹線條：scroll viewport 30% 觸發 path drawing

### `/map`
- Marker 名稱 label：hover marker 才出現
- 篩選 panel：hover 地圖左上角才展開

### Cmd+K
- 結果列表：輸入字元後 200ms 才顯示（避免空狀態雜訊）

## Idle 行為（背景）

當用戶完全停止互動（3 秒無滑鼠移動、無 scroll、無鍵盤）：

- 所有 huk 元素 fade out
- 自訂 cursor 縮回靜止狀態
- 背景 ambient 動畫繼續（不停）

當用戶再次互動：
- huk 元素淡入
- Idle timer 重置

## 不要做的

- ✘ 過度使用（每個元素都 hidden = 用戶找不到東西）
- ✘ 隱藏關鍵導覽（Header nav / Cmd+K 永遠可見）
- ✘ Idle 時間 < 2 秒（太短、用戶才剛看到就消失）
- ✘ Idle 時間 > 5 秒（太長、失去「冷靜」的氣質）
- ✘ 沒 fallback（短頁面要有自動展開）

## 給 AI 寫 code 的快速 reference

```jsx
// 用 hook
const { visible, onActivity } = useHiddenUntilTouched({
  initialPeekMs: 800,
  hideAfterIdleMs: 3000,
});

return (
  <div
    className={`huk-hidden ${visible ? "is-visible" : ""}`}
    onMouseMove={onActivity}
  >
    [內容]
  </div>
);
```

## 哲學總結

> 看書的時候、紙上沒有 banner、沒有 tooltip、沒有閃光廣告。
> 想看註腳、翻頁查。想知道誰寫的、看書背。
>
> PARTI 是線上版的書 — 預設只有內文、其他東西要找的時候才出現。
