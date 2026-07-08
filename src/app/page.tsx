import { PyramidHero } from "@/components/landing/PyramidHero";
import {
  LandingSections,
  type LandingPick,
} from "@/components/landing/LandingSections";
import { ARCHITECTS } from "@/lib/data/architects";
import { BUILDINGS } from "@/lib/data/buildings";
import { MOVEMENTS } from "@/lib/data/movements";
import { getPrimaryMovement, formatLifespan } from "@/lib/utils";

const movementNameZh = (id?: string) =>
  MOVEMENTS.find((m) => m.id === id)?.name.zh;

// 精選詞條：從真實資料確定性取樣（4 位大師 + 3 棟地標 + 3 個流派）
// server 端算好傳 props、避免整包 data 進 client bundle
function buildPicks(): LandingPick[] {
  return [
    ...ARCHITECTS.filter((a) => a.importance === 5)
      .slice(0, 4)
      .map((a) => {
        const movement = movementNameZh(getPrimaryMovement(a));
        return {
          name: `${a.name.en} ${a.name.zh}`,
          meta: `${formatLifespan(a.lifespan)}${
            movement ? ` · ${movement}` : ""
          }`,
        };
      }),
    ...BUILDINGS.filter((b) => b.importance >= 4)
      .slice(0, 3)
      .map((b) => ({
        name: `${b.name.zh} ${b.name.en}`,
        meta: `${b.year.completed} · ${b.location.city}`,
      })),
    ...MOVEMENTS.filter((m) => m.importance >= 4)
      .slice(0, 3)
      .map((m) => ({
        name: `${m.name.en} ${m.name.zh}`,
        meta: `${m.era[0]}–${m.era[1]} · ${m.originLocation.city}`,
      })),
  ];
}

export default function HomePage() {
  return (
    <main className="landing-page">
      <PyramidHero />
      <LandingSections
        counts={{
          architects: ARCHITECTS.length,
          buildings: BUILDINGS.length,
          movements: MOVEMENTS.length,
        }}
        picks={buildPicks()}
        totalEntries={ARCHITECTS.length + BUILDINGS.length + MOVEMENTS.length}
      />
    </main>
  );
}
