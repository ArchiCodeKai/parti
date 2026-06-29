# Fallingwater Three.js Card Model Design

Date: 2026-06-18

## Goal

Add a low-poly, grayscale Fallingwater-inspired 3D model inside the Buildings landing card.

This model should make the Buildings chapter feel architectural and materially precise without replacing the existing GSAP / Lenis scroll-linked chapter system.

## Visual Thesis

A near-white architectural study model: cantilevered concrete slabs, a vertical stone core, thin glass bands, stepped rock, and a quiet water fall rendered as grayscale linework and soft shadows.

## Scope

In scope:

- A procedural Three.js model inside the Buildings card.
- Orthographic camera for architectural drawing / axonometric feeling.
- Pointer drag rotation and wheel zoom inside the model surface.
- Reduced-motion fallback to a static, readable angle.
- Static SVG Fallingwater diagram remains as fallback and motif language.

Out of scope:

- Full photoreal Fallingwater reconstruction.
- External GLB / Blender asset pipeline.
- Colored materials or raster photos.
- Replacing DOM labels, chapter navigation, or the GSAP timeline.
- Page-level WebGL background.

## Model Grammar

The model is constructed from simple primitives rather than AI-generated imagery.

| Part | Geometry | Purpose |
|---|---|---|
| Cantilever slabs | Thin boxes | Main Fallingwater identity: long horizontal concrete planes |
| Stone core | Tall stacked boxes | Vertical anchor and chimney / masonry mass |
| Glass bands | Transparent thin boxes | Window ribbons between slabs |
| Terrain | Low stepped boxes | Rock ledge under the building |
| Water lines | Curved / segmented lines | Waterfall cue without realistic fluid simulation |
| Edge lines | EdgesGeometry over boxes | Architectural line-drawing quality |

## Interaction

- Left pointer drag rotates the model within a limited yaw / pitch range.
- Wheel zoom adjusts orthographic camera zoom within tight bounds.
- No middle-click requirement; browser middle-click auto-scroll is unreliable.
- No pan controls; the card should remain composed.
- On `prefers-reduced-motion`, controls still render a static model but continuous motion is disabled.

## Performance Constraints

- Dynamic import `three` only inside the client component.
- Keep draw calls low by reusing geometries and materials.
- Use no textures, no large particle systems, no post-processing.
- Renderer pixel ratio is capped at `1.5`.
- Pause animation when the component is unmounted and dispose geometry, materials, controls, and renderer.

## Integration

The model lives in:

- `src/lib/landing/fallingwaterModel.ts` for model data and interaction constants.
- `src/components/landing/FallingwaterModelCanvas.tsx` for Three.js setup.
- `src/components/landing/LandingSections.tsx` for placement inside the Buildings card.

The existing SVG `FallingwaterDiagram` remains in the DOM as fallback and as a quiet graphic motif.

