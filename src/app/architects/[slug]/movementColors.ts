/**
 * 流派色彩映射（server / client 共用）
 *
 * TODO T2.3 — 收斂至 movements.ts 的 colorTheme 單一來源
 */

const MOVEMENT_COLORS: Record<string, string> = {
  purism: "#E63B2E",
  "international-style": "#0F0F0F",
  brutalism: "#5B7A82",
  organic: "#4A6B4D",
  "prairie-style": "#A8A8A0",
  modernism: "#3A3A3A",
  "monumental-modernism": "#444",
  postmodernism: "#D4B66C",
  deconstructivism: "#4B6B7A",
  parametricism: "#6A6B6F",
  "critical-regionalism": "#6E8478",
  minimalism: "#C5C0B5",
  metabolism: "#A8A8A0",
  "high-tech": "#5B7A82",
  sustainable: "#4A6B4D",
  default: "#7A7A7A",
};

export function colorFor(movementId: string): string {
  return MOVEMENT_COLORS[movementId] ?? MOVEMENT_COLORS.default;
}
