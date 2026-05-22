# Sticker 連結設計（mad.ac 風格）

## 設計目的

PARTI 有兩種連結樣式：

| 樣式 | 用途 |
|---|---|
| `.parti-link` | **內文連結**（建築師名 / 建築物 / 流派 在段落中）— hover 底線從左畫到右 |
| `.sticker` | **二級導覽連結**（footer、nav、tags）— hover 才出現「貼貼紙」效果 |

本檔規範 `.sticker`。`.parti-link` 規範見 `animation-system.md`。

## 視覺概念

參考：`https://mad.ac/approach` 網站底部標籤群。

預設：純文字、跟周圍背景一樣、看起來很普通。
Hover：突然出現一張歪斜的小貼紙包住文字、像有人臨時貼上去的。

## 實作（從 theme.css 摘要）

```css
.sticker {
  position: relative;
  display: inline-block;
  cursor: none;
  text-decoration: none;
  color: inherit;
  padding: 4px 2px;
  z-index: 1;
  transition: transform var(--duration-mid) var(--ease-emphasized),
              color    var(--duration-base) var(--ease-out);
}

.sticker::before {
  content: "";
  position: absolute;
  inset: -2px -10px;
  background: var(--bg-page);
  border: 1px solid rgba(15, 15, 15, 0.85);
  border-radius: var(--r-pill);
  box-shadow:
    0 1px 0 rgba(255,255,255,0.6) inset,
    0 8px 22px -10px rgba(15,15,15,0.18);
  transform: scale(0.55) rotate(var(--sticker-rot, -4deg))
             translate(var(--sticker-x, -4px), var(--sticker-y, 2px));
  opacity: 0;
  z-index: -1;
  transition: transform var(--duration-mid) var(--ease-emphasized),
              opacity  var(--duration-base) var(--ease-out);
}

.sticker:hover {
  transform: translate(var(--sticker-x, -2px), var(--sticker-y, 1px))
             rotate(var(--sticker-rot, -3deg));
}

.sticker:hover::before {
  opacity: 1;
  transform: scale(1) rotate(0deg) translate(0, 0);
}
```

## 每張貼紙不一樣（重要）

每個 `.sticker` 用 inline CSS variable 設不同的旋轉角、避免「一排貼紙都歪同方向」的單調感：

```jsx
<a className="sticker" style={{ "--sticker-rot": "-3deg" }}>About</a>
<a className="sticker" style={{ "--sticker-rot": "2deg" }}>Methodology</a>
<a className="sticker" style={{ "--sticker-rot": "-2deg" }}>Credits</a>
<a className="sticker" style={{ "--sticker-rot": "3deg" }}>GitHub</a>
<a className="sticker" style={{ "--sticker-rot": "-4deg" }}>RSS</a>
<a className="sticker" style={{ "--sticker-rot": "2deg" }}>Newsletter</a>
```

建議的旋轉角範圍：`-5deg ~ +5deg`、不要超過。

## 使用情境

### ✓ 該用 `.sticker`：
- Footer 連結（About / Methodology / Credits / GitHub / RSS / Newsletter / Email / License）
- 二級導覽（個人頁底部「相關流派」chips）
- Tag 群（「Brutalism / Modernism / Purism」標籤）
- 流派頁底部「進一步閱讀」連結

### ✘ 不該用 `.sticker`：
- 內文中的詞條連結（用 `.parti-link`）
- 主導覽 nav（用普通 link + hover 顏色）
- CTA 按鈕（用 `.button-primary`）
- Cmd+K 內結果（用普通 list item）

## 響應式

### Desktop
- 完整效果

### Mobile (< 768px)
- Touch device 沒 hover、改為 tap 時短暫顯示（200ms 後恢復）
- 旋轉角降為一半（避免移動裝置上太 jittery）

```css
@media (hover: none) {
  .sticker::before {
    transform: scale(0.9) rotate(calc(var(--sticker-rot, -4deg) / 2));
  }
}
```

## 性能

- 同畫面 `.sticker` 不超過 **12 個**
- 全部用 CSS transform、不會引發 reflow
- 沒 hover 時 `opacity: 0` 等於不繪製

## 動畫時長

- Hover trigger: 220ms (`--duration-base`)
- 貼紙浮現曲線: ease-emphasized

## 不要做的

- ✘ 寫死 rotate 值（必須用 inline `--sticker-rot`）
- ✘ 用 transform: scale > 1 hover 放大（會破壞貼紙感）
- ✘ 加 box-shadow blur > 22px（不像真貼紙）
- ✘ 改 `.sticker::before` 的背景為彩色（要跟 page 同色）
- ✘ 同畫面所有 sticker rotate 同方向

## 範例：完整 footer 元件

```jsx
<footer className="parti-footer">
  <div className="footer-stickers">
    <a className="sticker" style={{ "--sticker-rot": "-3deg" }} href="/about">About</a>
    <a className="sticker" style={{ "--sticker-rot": "2deg" }} href="/methodology">Methodology</a>
    <a className="sticker" style={{ "--sticker-rot": "-2deg" }} href="/credits">Credits</a>
    <a className="sticker" style={{ "--sticker-rot": "3deg" }} href="https://github.com/...">GitHub</a>
    <a className="sticker" style={{ "--sticker-rot": "-4deg" }} href="/rss">RSS</a>
  </div>
</footer>
```
