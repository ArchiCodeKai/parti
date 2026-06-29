# PARTI · Claude Design Brief

> 相容入口：過去文件與 prompt 會引用 `CLAUDE_DESIGN_BRIEF.md`。
> 目前實際 master brief 內容維護在 `DESIGN_BRIEF.md`。

## Source of Truth

請以同資料夾的 `DESIGN_BRIEF.md` 為唯一權威版本。

使用 Claude Design 時，請把以下兩份一起提供：

- `src/design-reference/DESIGN_BRIEF.md`
- 對應頁面的 `src/design-reference/page-briefs/*.md`

## Why This File Exists

`page-briefs/01-landing.md` 與 `prototypes/README.md` 仍使用 `CLAUDE_DESIGN_BRIEF.md` 這個檔名。為了避免後續 agent 或 Claude Design 找不到檔案，先保留此相容入口。

後續若要統一命名，建議二選一：

1. 將 `DESIGN_BRIEF.md` 重新命名為 `CLAUDE_DESIGN_BRIEF.md`。
2. 批次更新所有引用，統一改成 `DESIGN_BRIEF.md`。

目前先不重新命名，避免造成不必要的 diff 與引用斷裂。

