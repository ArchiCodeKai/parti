# PARTI Landing Material Scroll Design Spec

> Status: Draft for implementation planning  
> Date: 2026-05-28  
> Scope: Landing page only. Do not expand into architects, compare, map, movements, or standalone HTML prototype.

## 1. Purpose

PARTI landing should remain visually quiet at first glance, but reveal depth through scroll-driven material changes.

The target is not a flashy animation site. The target is:

> A nearly white editorial atlas page whose surface quietly changes state as the user scrolls.

The page should feel like a restrained architectural object:

- extremely minimal when static
- precise and smooth when moving
- materially rich only after interaction
- never decorative for decoration's sake

This spec records the direction so future AI work does not drift into generic cards, loud transitions, gradients, or animation demos.

## 2. Current Audit Summary

The current landing already has a usable formal skeleton:

- `src/app/page.tsx`
- `src/components/landing/PyramidHero.tsx`
- `src/components/landing/LandingSections.tsx`
- `src/app/globals.css`

What works:

- The hero pyramid gives the page a recognizable identity.
- The white / black / red ratio mostly follows `Glass Editorial · Hidden-until-Touched`.
- Typography direction is aligned with the design brief: Inter Tight, PingFang TC, JetBrains Mono.
- The random picks list already feels closer to a quiet editorial database.

What needs refinement:

- The four-entry grid still feels like a dashboard card grid.
- The quadrant tiles expose too many layers at once: label, count, title, description, motif, arrow, hover border.
- Hover behavior is too UI-like: red border, scale, icon shift.
- Footer is serviceable but not quiet enough; it feels like a standard website footer rather than the back page of an atlas.
- Motion is still mostly component-level animation, not page-surface transformation.

## 3. Design Direction

### Chosen Direction: Material Scroll Prototype

Start with option B:

> Keep the landing structure, but prototype scroll-driven material transitions across the four-entry section and footer.

The implementation should first prove the visual language before adding heavy rendering technology.

Static page:

- almost flat
- mostly white
- few visible controls
- text and lines only

During scroll:

- the white surface changes material
- labels respond subtly to the surface
- geometry motifs appear through refraction, masking, or texture
- the page gains depth without becoming visually loud

## 4. Material States

Use these as conceptual states, not literal skeuomorphic effects.

### 4.1 Paper

Default landing surface.

Visual:

- warm near-white
- almost no texture
- extremely subtle fiber/noise if used
- black text remains crisp

Behavior:

- content is stable
- no floating
- no bounce

Use for:

- hero resting state
- default four-entry section
- footer base

### 4.2 Frosted Glass

The first elevated surface.

Visual:

- still white
- mild translucency
- faint blur
- slightly higher specular highlight
- no obvious drop shadow

Behavior:

- text may slide 2-4px as if the surface is slick
- motif lines may refract by 1-3px
- no large movement

Use for:

- four-entry section when it enters viewport
- active quadrant state

### 4.3 Water Film

A thin water layer, not a blue water effect.

Visual:

- still white / clear
- only distortion and caustic-like line shift
- no blue tint
- no big waves

Behavior:

- labels appear to sink 2-5px
- motif lines bend slightly
- surface shimmer should be slow and subtle

Use for:

- map quadrant
- scroll midpoint material transition

### 4.4 White Sand / Powder

A matte surface, not particle explosion.

Visual:

- still white
- tiny grain density
- edges feel lightly buried

Behavior:

- lower parts of labels can be softly masked
- description text should not appear unless touched
- no visible particle burst

Use for:

- movements quadrant
- later Three.js / shader stage

### 4.5 White Sphere / Buoyancy

Use only as a later interaction idea.

Visual:

- not actual balls across the page
- the feeling of buoyancy should be expressed through tiny vertical easing

Behavior:

- selected label can lift 3-8px and settle
- must not become playful or cartoon-like

Use for:

- optional future micro-interaction

### 4.6 Monochrome Material Override

Some chapters may need a stricter local color rule than the global PARTI accent system.

Buildings / 建築 is the first such chapter.

Rules:

- The Buildings stage, background architectural plate, glass/vellum material, chapter active marker, and custom cursor must temporarily become grayscale while Buildings is active.
- Do not use red, cyan, blue, warm tint, or any chromatic accent inside the Buildings material moment.
- Use only white, near-white, black, and alpha-based gray.
- Material depth must come from line weight, opacity, blur, mask, refraction-like offset, contact shadow, and grayscale surface grain.
- Do not duplicate the architectural line plate as a blurred/skewed second drawing. Refraction should come from a separate glass surface, mask, or specular wipe so the drawing itself stays crisp.
- This is a local landing override. It does not remove the global `--accent-red` identity from the rest of PARTI.

Target feeling:

> A nearly white architectural plate under frosted glass, where the drawing becomes visible through grayscale shadow, pressure, and refraction rather than color.

## 5. Four-Entry Section Redesign

The four-entry section should move away from "cards" and toward "index engraved into one continuous surface".

### Current Problem

`landing-entry-grid` visually reads as:

- one rounded glass container
- four dashboard tiles
- visible hover affordances

This is clean but not extremely minimal.

### Target Structure

Keep the four conceptual entries:

- 人物 / ARCHITECTS / 100+
- 建築 / BUILDINGS / 600+
- 運動 / MOVEMENTS / 20+
- 地圖 / MAP / WORLD

Remove or hide by default:

- description copy
- permanent arrow icon
- strong red hover border
- highly visible motif

Default state should show:

- large Chinese label
- small mono label
- small count
- hairline dividers

Touched / active state may reveal:

- description
- motif
- subtle material response
- route affordance

### Preferred Visual Composition

Desktop:

- one full-width section
- 2x2 index layout
- no heavy outer rounded card
- dividers are hairline, not framed cards
- quadrant labels should breathe more

Mobile:

- one-column vertical index
- each entry is a quiet band
- descriptions can be revealed by tap/focus

## 6. Footer Redesign

Footer should feel like the end matter of a printed atlas.

Reduce to:

```text
PARTI

一部建築圖鑑
ARCHITECTS   COMPARE   GITHUB                 © 2026
```

Guidelines:

- no glass card
- no decorative motif
- no heavy border
- links default to low opacity
- links become clear on hover/focus
- footer should be quiet enough that the page feels finished, not interrupted

## 7. Motion Principles

### 7.1 Surface First, Content Second

Do not animate every label independently as the main idea.

Instead:

1. surface changes
2. content responds by 2-8px
3. geometry/motif appears through the surface

This prevents the page from becoming a collection of unrelated micro-animations.

### 7.2 Hidden Complexity

The technical complexity can be high, but the visual output must remain quiet.

Allowed:

- tiny displacement
- masking
- refraction-like offset
- opacity shifts
- hairline path drawing
- slow material interpolation

Avoid:

- particle bursts
- visible physics toys
- bouncy UI
- big scale transforms
- red borders as the main interaction
- more than three moving focal elements at once

### 7.3 Scroll-Driven, Not Scroll-Overloaded

Scroll should guide material transitions, not force every pixel to move.

The ideal feeling:

- user scrolls
- page surface becomes slightly different
- content appears affected by the surface
- interaction feels expensive but not loud

## 8. Technical Direction

### 8.1 Lenis

Lenis is already installed in `package.json`.

Use Lenis for smooth scroll when the landing starts relying on scroll choreography.

Recommended baseline:

```ts
import Lenis from "lenis";

const lenis = new Lenis({
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 1.5,
});
```

Implementation notes:

- Respect `prefers-reduced-motion`.
- Do not break anchor navigation.
- Do not break keyboard tab flow.
- Keep one global Lenis controller, not one per section.
- Avoid applying smooth scroll to modal or internal scroll regions unless intentionally designed.

### 8.2 Lenis + GSAP ScrollTrigger

Lenis can be paired with GSAP ScrollTrigger.

Current repo status:

- `lenis` is installed.
- `gsap` is not currently listed in `package.json`.

If GSAP is added later, the likely pattern is:

```ts
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis();

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);
```

Use GSAP only when Framer Motion scroll progress becomes too limited.

Good reasons to add GSAP:

- pinned multi-step scroll scenes
- long timeline coordination
- material transition timeline across multiple sections
- ScrollTrigger markers/debugging during design

Bad reasons to add GSAP:

- simple fade in
- simple hover
- one-off transform
- because the page should "feel premium"

### 8.3 Framer Motion

Keep Framer Motion for:

- component-level transitions
- simple scroll progress transforms
- hero pyramid motion if already working
- reduced-motion variants

Do not duplicate the same scroll scene in both Framer Motion and GSAP.

### 8.4 Three.js Later Stage

Three.js should be reserved for later material depth, not first implementation.

Future use cases:

- shader-based white water film
- paper fiber displacement
- glass refraction field
- sand/powder mask field
- subtle physics field behind labels

Three.js should render the surface, not replace the UI.

The DOM remains responsible for:

- text
- links
- accessibility
- keyboard focus
- routing

Three.js / canvas is responsible for:

- material field
- displacement map
- subtle background response

## 9. Phased Plan

### Phase 1: Quiet Structure

Goal:

Make the landing more minimal without adding heavy technology.

Tasks:

- simplify four-entry section
- reduce visible descriptions
- reduce motif visibility
- remove dashboard-card feeling
- simplify footer
- keep current hero

Success criteria:

- static screenshot looks quieter
- less like SaaS cards
- still clearly communicates four entry points

### Phase 2: Material Scroll Prototype

Goal:

Introduce one scroll-driven material transition.

Recommended first prototype:

- four-entry section transitions from paper to frosted glass as it enters viewport
- active quadrant gains subtle refraction/mask
- labels move only 2-4px
- descriptions reveal only on active/touched state

Possible stack:

- Lenis for smooth scroll
- Framer Motion for scroll progress
- CSS masks / filters for first material layer

Do not add Three.js yet unless CSS/DOM cannot achieve the test.

### Phase 3: GSAP Scroll Timeline

Goal:

If Phase 2 needs tighter choreography, add GSAP ScrollTrigger.

Use when:

- one continuous section needs multiple material states
- pinning is required
- timeline debugging is needed

Avoid if:

- Framer Motion handles the scene cleanly
- the effect is only hover or simple reveal

### Phase 2.5: Pinned Material Index

Goal:

Turn the four-entry section into a short scroll-driven material introduction for the four main categories.

This phase exists because the first CSS/Framer material prototype may look too subtle on a white page. A white frosted surface on a white background has little visible contrast unless the section has a stronger scroll narrative.

The section should not feel like four static quadrants. It should feel like a quiet material scene that reveals:

- 人物
- 建築
- 運動
- 地圖

The intended balance is between:

- exhibition guidance: clear enough that users understand the four destinations
- premium title sequence: smooth and visually memorable

It must not become a long forced animation.

#### Duration

Total scroll length: about `4.6 viewport`.

Recommended desktop timeline:

| Range | Length | Purpose |
|---|---:|---|
| 0.0-0.5vh | 0.5 viewport | White surface enters and splits into four index regions |
| 0.5-1.4vh | 0.9 viewport | Architects / 人物 becomes active |
| 1.4-2.3vh | 0.9 viewport | Buildings / 建築 becomes active |
| 2.3-3.2vh | 0.9 viewport | Movements / 運動 becomes active |
| 3.2-4.1vh | 0.9 viewport | Map / 地圖 becomes active |
| 4.1-4.6vh | 0.5 viewport | Return to quiet four-entry index |

Mobile timeline:

- Reduce to `2.5-3 viewport`.
- Avoid trapping mobile users in a long pinned scene.
- Each category can be shorter and less cinematic.

#### Scene Model

The section should be `position: sticky` / GSAP pinned while the timeline plays.

Base layer:

- near-white page background
- subtle surface plane
- four hairline regions

DOM content layer:

- large Chinese labels
- small mono English labels
- small count metadata
- descriptions hidden until active/touched
- links remain real DOM anchors for accessibility

Material layer:

- CSS masks / pseudo-elements in Phase 2.5
- future Three.js canvas in Phase 4

Do not rasterize text into canvas.

#### Per-Category Motion

Each category should have one primary material behavior.

Architects / 人物:

- force graph motif appears under a glass layer
- graph lines shift by 1-3px as if refracted
- title moves forward subtly, no more than 6px

Buildings / 建築:

- line drawing appears like light passing across vellum or frosted glass
- surface feels harder and more architectural
- no heavy 3D model in this phase

Movements / 運動:

- geometric facets rearrange like white powder or paper fragments
- lower part of title may be softly masked by 1-3px
- do not create visible particle explosion

Map / 地圖:

- thin water-film distortion on map motif
- longitude/latitude line shifts very slightly
- no blue water tint

Return state:

- all four categories visible again
- surface calms down
- entry points are clickable
- no looping visual noise

#### Interaction Rules

The scene should be skippable by fast scrolling.

Do not:

- force a wait
- use long staggered text reveals
- animate every label separately
- require users to watch the full sequence before accessing links

Consider later:

- session-level shortening after first visit:

```ts
const hasSeenMaterialIndex = sessionStorage.getItem("parti:seen-material-index") === "true";
```

If already seen in the current session, the pinned range may be shortened or the intro segment may start closer to the quiet index state.

#### Reduced Motion

When `prefers-reduced-motion: reduce`:

- do not run long pinned choreography
- show the quiet four-entry index directly
- retain hover/focus accessibility states
- avoid scroll-linked material distortion

#### Implementation Stack

Recommended for Phase 2.5:

- Lenis: smooth scroll feel
- GSAP ScrollTrigger: pinned section and timeline
- CSS masks / transforms / opacity for the first material version

Do not add Three.js in Phase 2.5 unless the CSS/GSAP version cannot communicate the direction at all.

GSAP should own the pinned material scene.

Framer Motion should remain responsible for:

- hero pyramid if already working
- simple component transitions
- non-pinned interactions

Avoid controlling the same transform with both GSAP and Framer Motion.

### Phase 2.6: Perspective Deck Index

Goal:

Replace the flat four-quadrant grid with a scroll-linked perspective deck and a side chapter navigation.

Status update, 2026-06-01:

Phase 2.6 proved that a right-side chapter navigation and shortened pinned range can work, but the card deck model should not be the final direction.

Observed issues:

- The four cards still read too similarly because they share the same card body, opacity language, and depth motion.
- During scroll, users cannot confidently anticipate the next or next-next category from the main visual alone.
- The final `2x2` unfold can push cards toward the corners and create accidental cropping.
- Continuing to polish the deck risks making the section feel like a carousel instead of an architectural material sequence.

Decision:

- Do not continue deep-polishing the current perspective deck as the final model.
- Keep the side chapter nav concept.
- Replace the deck carousel with Phase 2.7 `Material Assembly Stage`.
- Replace the final `2x2` card unfold with Phase 2.8 `Four Material Swatches`.

This phase is the preferred refinement after the first pinned material index. The previous pinned version made the section more cinematic, but if the cards are already visible as a flat 2x2 grid, scroll can feel like it only highlights content that was already fully revealed.

The new model:

> The four categories behave like a small stack of architectural index cards. Scroll naturally brings each card to the foreground, while a right-side chapter navigation shows where the user is and lets them jump to any category.

#### Chosen Pattern

Use:

> Side chapter nav + scroll-linked deck

Do not use:

- hover + wheel hijack
- carousel state disconnected from scroll
- forced autoplay

Why:

- Scroll remains the source of truth.
- Chapter nav gives users fast access to previous/next categories.
- Users are not trapped if they want to jump from Map back to Architects.
- The interaction is familiar from longform product pages, editorial scrollytelling, and technical landing pages.

#### Duration

Reduce pinned length from Phase 2.5.

Recommended desktop timeline: about `2.8 viewport`.

| Range | Length | Purpose |
|---|---:|---|
| 0.00-0.35vh | 0.35 viewport | Deck enters from a quiet paper surface |
| 0.35-0.90vh | 0.55 viewport | Architects / 人物 card comes forward |
| 0.90-1.45vh | 0.55 viewport | Buildings / 建築 card comes forward |
| 1.45-2.00vh | 0.55 viewport | Movements / 運動 card comes forward |
| 2.00-2.55vh | 0.55 viewport | Map / 地圖 card comes forward |
| 2.55-2.85vh | 0.30 viewport | Cards unfold into final clickable index |

Mobile timeline:

- Avoid a full perspective deck.
- Use a shorter vertical stack or direct 2x2/1-column index.
- Do not pin longer than about `1.8-2.2 viewport`.

#### Visual Model

Default before scene:

- white editorial surface
- only a hint of the deck
- no four full quadrants visible yet

During pinned scene:

- four cards exist in the same spatial system
- one active card sits in foreground
- inactive cards sit behind, offset in z/depth, lower opacity
- active card has enough scale/depth to feel foregrounded
- side chapter nav indicates the active card

Final state:

- cards unfold into a quiet 2x2 index
- all links become clearly accessible
- no loop, no auto movement

#### Card Click Behavior

During the pinned deck:

- The active foreground card can be clicked.
- Inactive background cards should not be directly clickable.
- Inactive cards are visual context only.
- Side chapter nav is always clickable.
- Final unfolded index makes all cards clickable.

Rationale:

Clicking inactive background cards can create ambiguity because they are visually not the current focus. The side chapter nav is the correct way to jump to another category during the pinned scene.

#### Side Chapter Navigation

Desktop:

Show a right-side vertical chapter nav during the pinned deck.

Preferred visual:

```text
01  ARCHITECTS
02  BUILDINGS
03  MOVEMENTS
04  MAP
```

Rules:

- default opacity is low
- active chapter is black or near-black
- active marker may use one small red dot or one 1px line
- do not use large thumbnails in the first implementation
- do not make it look like a loud carousel control

Mobile:

- hide side chapter nav, or convert to minimal horizontal dots/labels.
- ensure touch targets remain at least 44px if interactive.

#### Chapter Nav Click Logic

Chapter nav clicks must move the scroll position, not only set React state.

Correct model:

```ts
scrollTo(sectionStart + targetProgress * pinnedDistance)
```

The visual state should then update because the ScrollTrigger timeline responds to the new scroll position.

Expected behavior:

- clicking `ARCHITECTS` scrolls to the Architects segment
- clicking `BUILDINGS` scrolls to the Buildings segment
- clicking `MOVEMENTS` scrolls to the Movements segment
- clicking `MAP` scrolls to the Map segment

Use Lenis `scrollTo()` when Lenis is active. Fall back to `window.scrollTo({ behavior: "smooth" })` only if Lenis is unavailable or disabled.

Do not:

- call `setActiveIndex()` as the only state change
- desynchronize nav state from scroll position
- trap wheel events over the cards

#### Title and Label Motion

The section needs continuous feedback during scroll.

Do not let users scroll multiple wheel steps while only the page stays pinned with no visible change.

At minimum:

- active card title changes position/scale/opacity every segment
- side chapter active state changes every segment
- background cards change depth/opacity every segment
- motif/material changes every segment

Title treatment:

- active Chinese title should feel like the card is coming forward
- English label and count remain small and editorial
- avoid slow per-character reveal
- use short clip/y/opacity changes if needed

#### Per-Card Material Cues

Keep the material cue restrained but readable:

Architects / 人物:

- glass graph, faint refraction
- network motif has the clearest line presence

Buildings / 建築:

- vellum/frosted architectural line drawing
- slightly sharper card surface

Movements / 運動:

- powder/paper-facet mask
- title may appear lightly embedded

Map / 地圖:

- thin water-film effect
- map motif has the most visible surface distortion

#### UX Safety

The section must still feel like normal scrolling.

Rules:

1. Do not intercept wheel events on hover.
2. Do not require clicking controls to proceed.
3. Do not block fast scroll.
4. Keep total desktop pinned length around `2.8 viewport`.
5. Keep reduced-motion as direct quiet index.
6. Keep all labels in real DOM.
7. Keep routes accessible via keyboard after the final unfold state.

#### Implementation Priority

Phase 2.6 should be implemented before further material polish.

Order:

1. Convert flat grid to deck structure.
2. Add side chapter nav.
3. Shorten ScrollTrigger range.
4. Wire chapter nav to scroll positions.
5. Animate deck depth and active card.
6. Unfold into final 2x2 index.
7. Add restrained material cues per card.

Do not start with complex material shaders.

### Phase 2.7: Material Assembly Stage

Goal:

Replace the card-carousel feeling with a single central assembly stage.

The four categories should no longer behave like four large cards rotating forward. Instead, each category occupies the same central stage and is assembled from its own material logic as the user scrolls.

Chosen direction:

> A quiet white architectural stage where each entry is constructed, dissolved, and reconstructed through its own material grammar.

This phase remains DOM/CSS/GSAP-based. It is not the Three.js shader phase yet.

#### Why This Replaces the Deck

The deck made the page more dynamic, but the interaction still reads as:

- card A goes back
- card B comes forward
- card C waits behind
- card D waits behind

That is mechanically clear but not semantically rich. The user sees "cards changing" before seeing "materials changing".

The assembly stage should make the category identity visible through the transition itself:

- 人物 is assembled by relationship lines and nodes
- 建築 is assembled by architectural linework and glass/vellum planes
- 運動 is assembled by powder, paper fragments, or shifting facets
- 地圖 is assembled by water-film distortion and contour/coordinate lines

#### Core Layout

Desktop:

- Keep one pinned section.
- Keep a right-side chapter nav.
- Replace stacked full cards with one central active stage.
- The stage may be a near-white plane, not a heavy card.
- Only the current category should be visually dominant.
- Previous/next categories may be implied through faint offstage fragments, but should not compete with the current category.

Mobile:

- Avoid complex pinned assembly if it feels heavy.
- Use a shorter vertical chapter sequence.
- Each category can appear as a compact material panel.
- Final material swatches should remain directly tappable.

#### Scroll Timeline

Desktop target: about `2.8-3.2 viewport`.

The timeline can be slightly longer than Phase 2.6 only if every scroll step creates visible progress. It must not feel like the wheel is stuck.

Recommended structure:

| Range | Length | Purpose |
|---|---:|---|
| 0.00-0.25vh | 0.25 viewport | Quiet surface enters, stage establishes |
| 0.25-0.85vh | 0.60 viewport | Architects assembles and settles |
| 0.85-1.45vh | 0.60 viewport | Buildings assembles and settles |
| 1.45-2.05vh | 0.60 viewport | Movements assembles and settles |
| 2.05-2.65vh | 0.60 viewport | Map assembles and settles |
| 2.65-3.05vh | 0.40 viewport | Collapse into Four Material Swatches |

Repeat visitor option:

- If `parti:seen-material-index` is present in `sessionStorage`, shorten to about `2.2-2.5 viewport`.
- Keep the chapter nav and final swatches available.

#### Chapter Nav Behavior

The right-side chapter nav remains the fast navigation mechanism.

Rules:

- Clicking a chapter scrolls directly to that chapter's settled state.
- Direct nav clicks should skip the full in-between assembly transition.
- After the scroll lands, the selected category should still show its ambient material behavior.
- The nav must update from scroll position, not from isolated React state.

Correct mental model:

```ts
chapterClick(index) -> scrollTo(chapterSettledProgress[index])
ScrollTrigger progress -> active category + material state
```

Do not:

- autoplay chapter transitions independent of scroll
- use hover + wheel hijacking
- require users to slowly reverse-scroll to access a previous category
- let nav clicks desynchronize the visible stage

#### Per-Category Assembly Grammar

Architects / 人物:

- Relationship nodes and lines enter from outside the stage.
- Lines lightly overshoot, then settle into a graph-like structure.
- The Chinese title should appear as if calibrated by the network.
- Material cue: clear glass with refracted graph lines.
- Avoid: noisy node cloud, dense social-network visualization.

Buildings / 建築:

- A grayscale Fallingwater / 落水山莊 architectural plate replaces the generic cube or abstract drafting grid.
- The plate must be a diagrammatic SVG-style line drawing, not a photo, not a traced stock image, and not decorative illustration.
- Key geometry: long horizontal cantilever slabs, a vertical stone/service core, thin waterfall or contour strokes, and light contact-shadow planes under slabs.
- A glass/vellum plane passes over the plate and makes the linework refract by a few pixels.
- When the Buildings card is settled, it may use a grayscale "glass wipe" every 1-2 seconds, like glass being briefly polished. The wipe should brighten the surface only; it must not smear or blur the Fallingwater linework.
- The title should feel measured and constructed.
- Material cue: frosted architectural film, sharper edges, grayscale-only pressure and shadow.
- While Buildings is active, the chapter nav active marker and custom cursor also become grayscale.
- Avoid: literal 3D building model in this phase, chromatic tint, red scan lines, blue/cyan glass, generic cube icon, heavy shadow, or a raster background image.

Movements / 運動:

- Powder, paper fragments, or geometric facets sweep across the stage.
- The stage reveals the title as if wind clears a matte surface.
- The motion can feel slightly more fragmented than other chapters, but still quiet.
- Material cue: white sand, paper grain, rough stone underlayer.
- Avoid: particle explosion, confetti, playful debris.

Map / 地圖:

- Water-film distortion expands first, then coordinate/contour lines settle.
- The title should feel like it is seen through a thin transparent layer.
- Material cue: clear water film, refractive map lines, no blue tint.
- Avoid: map UI, pins, blue water, satellite imagery.

#### Transition Rules

Scroll-driven transitions should feel like material replacement, not a slideshow.

Between chapters:

1. Current category loses structural integrity.
2. Its material field dissolves, folds, blows away, or refracts out.
3. Next category's material enters from offstage or from below the surface.
4. The next title and motif settle into the central stage.

Important:

- Do not animate every text character.
- Keep text in real DOM.
- Use CSS clip-path, masks, pseudo-elements, transforms, opacity, and GSAP timeline first.
- Keep at most three focal moving systems at once:
  1. active title/label
  2. material field
  3. motif/geometry

#### Accessibility and Reduced Motion

When `prefers-reduced-motion: reduce`:

- Skip the assembly sequence.
- Show the final Four Material Swatches directly.
- Keep each swatch as a real link/button target.
- Do not run scroll-driven distortion.

Keyboard:

- The current active route target should be focusable.
- Final swatches should all be focusable.
- Inactive offstage fragments should not be tab stops.

#### Implementation Order

1. Refactor current deck data model into "stage item" data.
2. Keep existing `entries` array and side chapter nav.
3. Replace `getDeckTarget()` with per-category stage targets.
4. Add a `materialStage` layer inside the section.
5. Implement one generic assemble/settle/disassemble rhythm.
6. Add category-specific material classes.
7. Replace the final 2x2 unfold with Phase 2.8 swatches.
8. Verify desktop first, then mobile fallback.

Do not add Three.js in this phase.

### Phase 2.8: Four Material Swatches Final

Goal:

Replace the final corner-spread `2x2` card index with a quieter, modern, clickable atlas index.

Chosen final state:

> Four horizontal material swatches.

The final state should feel like an index page in a printed architectural atlas, not a dashboard grid.

#### Visual Structure

Use four stacked horizontal strips:

```text
01  ARCHITECTS   人物      100+    network glass
02  BUILDINGS    建築      600+    drafting vellum
03  MOVEMENTS    運動      20+     powder paper
04  MAP          地圖      WORLD   water film
```

Each strip:

- spans most of the stage width
- has a hairline divider
- has one tiny material field area on the right
- is mostly white
- uses red only for one small active/hover indicator
- is fully clickable when the route exists

Do not:

- place the strips in four corners
- crop the final state
- use large card shadows
- make the swatches look like SaaS pricing rows
- make every strip equally animated forever

#### Swatch Material Language

Architects:

- faint graph line texture
- tiny nodes
- clear glass glint

Buildings:

- grayscale Fallingwater line plate
- cantilever slab hairlines
- frosted glass/vellum refraction
- no red marker inside the material field

Movements:

- powder grain
- small masked facets
- rougher matte edge

Map:

- contour/coordinate curves
- thin water highlight
- slight line refraction

#### Interaction

Default:

- all four swatches visible
- all available routes clickable
- unavailable routes can show `LATER` with disabled styling

Hover/focus:

- strip expands by a small amount, no more than 8-12px
- material field becomes slightly clearer
- small red marker appears
- text stays calm and readable

Click:

- navigates to the route if implemented
- does not replay the full assembly sequence

#### Why Swatches Beat 2x2 Cards

Swatches fit the PARTI direction better because:

- they read like an atlas table of contents
- they avoid cropped card corners
- they keep the page quiet and editorial
- they make all four options comparable without a dashboard layout
- they leave room for future material shaders on the right side of each strip

#### Implementation Order

1. Remove final `getFinalTarget()` 2x2 card spread.
2. Add a final class/state such as `.is-swatch-index`.
3. Animate the active stage into four horizontal strips.
4. Make every swatch visible and clickable.
5. Add material-specific right-side swatch texture.
6. Validate no cropping at desktop, tablet, and mobile widths.

### Phase 3.5: Three.js Readiness Reminder

Goal:

Create an explicit reminder point before entering Phase 4.

After Phase 2.7 and Phase 2.8 feel directionally correct, the AI agent should remind the user:

> The 2D/GSAP motion grammar is now stable enough. If you want deeper material realism, this is the right point to return to the Three.js material field phase.

Do not move to Three.js until these questions are answered:

1. Are the four chapter identities clear without reading the nav?
2. Does the scroll transition feel smooth and not trapped?
3. Does direct chapter navigation skip transitions correctly?
4. Does the final swatch index feel usable and uncropped?
5. Does mobile have a simpler fallback?

If the answer to any of these is no, continue refining Phase 2.7/2.8 first.

### Phase 4: Three.js Material Field

Goal:

Add real material depth while keeping the page visually minimal.

This is the later advanced version the project should return to after Phase 2.7/2.8 are stable.

The purpose of Phase 4 is not to redesign the landing again. It should deepen the already-approved material grammar:

- water film becomes a shader displacement field
- glass/vellum gains real refraction-like distortion
- powder/paper gains controlled particle or mask behavior
- rough stone/sand can be represented by procedural texture

Three.js should enhance the material field, not replace the DOM navigation.

Potential prototype:

- white plane shader behind four-entry section
- scroll progress drives displacement intensity
- active quadrant changes material uniform
- DOM labels sit above canvas
- labels receive tiny transform/mask response

Performance constraints:

- no large particle count
- pause or reduce animation offscreen
- degrade to CSS/static surface on mobile if needed
- respect reduced motion

## 10. AI Implementation Guardrails

Future AI agents must follow these rules:

1. Do not add a standalone `index.html` prototype for this direction.
2. Do not expand scope beyond landing page unless explicitly requested.
3. Do not turn the four entries into louder cards.
4. Do not use gradient backgrounds.
5. Do not use large shadows.
6. Do not make the page playful, bouncy, or cartoon-like.
7. Do not use red as a broad surface color.
8. Do not animate more than three focal elements at once.
9. Do not add Three.js before the CSS/Framer material prototype is evaluated.
10. Keep DOM text accessible; do not rasterize labels into canvas.
11. If implementing `Pinned Material Index`, do not make the pinned range longer than 5 viewport on desktop.
12. Do not trap repeat visitors in a slow intro; fast scroll and reduced-motion paths must remain usable.
13. If implementing `Perspective Deck Index`, do not hijack wheel events on card hover.
14. Side chapter nav clicks must scroll to timeline positions rather than only setting component state.
15. Do not continue polishing the perspective deck as the final model; it is now a superseded intermediate phase.
16. Implement `Material Assembly Stage` before attempting advanced Three.js materials.
17. Replace the final `2x2` card unfold with `Four Material Swatches`.
18. When Buildings is active, keep the entire Buildings material moment grayscale, including the chapter active marker and custom cursor.
19. Do not replace the Buildings material with a generic cube, colored scan line, or raster photo. Use a diagrammatic Fallingwater line plate until Phase 4 shaders are approved.
18. Direct chapter nav clicks should land on the selected chapter's settled state and skip the in-between assembly transition.
19. The final swatch index must never be cropped at the viewport edges.
20. Remind the user to revisit Phase 4 only after Phase 2.7/2.8 are visually and UX-stable.

## 11. Recommended Next Step

Phase 2.6 established useful pieces:

- shortened pinned range
- right-side chapter nav
- scroll-linked state
- CSS-only material cues

But the deck model should now be replaced.

Recommended next implementation step:

1. Implement Phase 2.7 as a landing-only refactor.
2. Convert the four-card deck into one central `Material Assembly Stage`.
3. Keep the existing `entries` data and side chapter nav.
4. Make each scroll chapter assemble the active category with a distinct material grammar.
5. Make side chapter nav clicks scroll directly to the settled state for that category.
6. Replace the final 2x2 unfold with Phase 2.8 `Four Material Swatches`.
7. Verify the final swatches are fully visible, clickable, and uncropped.

After that:

1. Review whether the four categories are recognizable from the main stage without relying only on the nav.
2. Tune material strength and transition duration.
3. Confirm mobile fallback.
4. Then, if the 2D grammar works, remind the user to revisit Phase 4 Three.js material fields.

Previous Phase 2.5 baseline:

1. Lenis + GSAP can own the pinned material scene.
2. ScrollTrigger should remain the source of truth.
3. GSAP / Lenis may be dynamically imported to protect initial bundle size.

Previous Phase 1/2 baseline:

1. Simplify four-entry section into a quieter index surface.
2. Simplify footer into atlas end matter.
3. Add one material scroll prototype: paper to frosted glass.
4. Keep Three.js material field documented but deferred.

Phase 4 trigger:

Only begin Three.js when Phase 2.7 and Phase 2.8 satisfy the readiness checklist in Phase 3.5.
