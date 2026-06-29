import { PyramidHero } from "@/components/landing/PyramidHero";
import { LandingSections } from "@/components/landing/LandingSections";

export default function HomePage() {
  return (
    <main className="landing-page">
      <PyramidHero />
      <LandingSections />
    </main>
  );
}
