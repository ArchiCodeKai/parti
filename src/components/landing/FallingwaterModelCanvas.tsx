"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

import {
  FALLINGWATER_INTERACTION,
  FALLINGWATER_MODEL_PARTS,
} from "@/lib/landing/fallingwaterModel";

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export function FallingwaterModelCanvas() {
  const containerRef = useRef<HTMLSpanElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    let cancelled = false;
    let animationFrame = 0;
    let cleanupThree: (() => void) | undefined;

    void (async () => {
      const THREE = await import("three");

      if (cancelled || !containerRef.current) {
        return;
      }

      const host = containerRef.current;
      const scene = new THREE.Scene();
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
      const model = new THREE.Group();
      const disposableGeometries: Array<{ dispose: () => void }> = [];
      const disposableMaterials: Array<{ dispose: () => void }> = [];
      const defaultRotation = FALLINGWATER_INTERACTION.defaultRotation;
      const currentRotation: { x: number; y: number } = {
        x: defaultRotation[0],
        y: defaultRotation[1],
      };
      const targetRotation: { x: number; y: number } = {
        x: defaultRotation[0],
        y: defaultRotation[1],
      };
      const dragState = {
        active: false,
        pointerId: -1,
        startX: 0,
        startY: 0,
        startRotationX: 0,
        startRotationY: 0,
      };
      let isVisible = true;

      renderer.setClearColor(0xffffff, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      host.appendChild(renderer.domElement);
      renderer.domElement.className = "fallingwater-model-canvas__surface";

      camera.position.set(4.2, 2.7, 4.8);
      camera.lookAt(0, 0, 0);
      camera.zoom = 1.05;

      scene.add(new THREE.AmbientLight(0xffffff, 1.8));

      const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
      keyLight.position.set(3.8, 5.2, 4.4);
      scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0xffffff, 1.1);
      fillLight.position.set(-3.6, 2.4, -2.8);
      scene.add(fillLight);

      model.rotation.set(currentRotation.x, currentRotation.y, 0);
      scene.add(model);

      const edgeMaterial = new THREE.LineBasicMaterial({
        color: 0x202020,
        transparent: true,
        opacity: 0.22,
      });
      disposableMaterials.push(edgeMaterial);

      const createBoxMaterial = (tone: number, opacity = 1) => {
        const color = new THREE.Color(tone, tone, tone);
        const material = new THREE.MeshStandardMaterial({
          color,
          roughness: 0.86,
          metalness: 0,
          transparent: opacity < 1,
          opacity,
        });
        disposableMaterials.push(material);
        return material;
      };

      const createGlassMaterial = (tone: number, opacity = 0.32) => {
        const material = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color(tone, tone, tone),
          roughness: 0.18,
          metalness: 0,
          transmission: 0.38,
          thickness: 0.1,
          transparent: true,
          opacity,
          depthWrite: false,
        });
        disposableMaterials.push(material);
        return material;
      };

      FALLINGWATER_MODEL_PARTS.boxes.forEach((part) => {
        const geometry = new THREE.BoxGeometry(part.size[0], part.size[1], part.size[2]);
        const material = part.kind === "glass-band"
          ? createGlassMaterial(part.tone, part.opacity)
          : createBoxMaterial(part.tone, part.opacity);
        const mesh = new THREE.Mesh(geometry, material);
        const edges = new THREE.EdgesGeometry(geometry, 24);
        const edgeLines = new THREE.LineSegments(edges, edgeMaterial);

        mesh.position.set(part.position[0], part.position[1], part.position[2]);
        edgeLines.position.copy(mesh.position);

        model.add(mesh);
        model.add(edgeLines);
        disposableGeometries.push(geometry, edges);
      });

      FALLINGWATER_MODEL_PARTS.lines.forEach((part) => {
        const geometry = new THREE.BufferGeometry().setFromPoints(
          part.points.map((point) => new THREE.Vector3(point[0], point[1], point[2])),
        );
        const material = new THREE.LineBasicMaterial({
          color: new THREE.Color(part.tone, part.tone, part.tone),
          transparent: true,
          opacity: part.opacity ?? 0.38,
        });
        const line = new THREE.Line(geometry, material);

        model.add(line);
        disposableGeometries.push(geometry);
        disposableMaterials.push(material);
      });

      const resize = () => {
        const rect = host.getBoundingClientRect();
        const width = Math.max(1, rect.width);
        const height = Math.max(1, rect.height);
        const aspect = width / height;
        const frustum = width < 420 ? 4.8 : 4.35;

        camera.left = (-frustum * aspect) / 2;
        camera.right = (frustum * aspect) / 2;
        camera.top = frustum / 2;
        camera.bottom = -frustum / 2;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
      };

      const render = () => {
        renderer.render(scene, camera);
      };

      const requestRenderLoop = () => {
        if (!animationFrame && isVisible) {
          animationFrame = window.requestAnimationFrame(animate);
        }
      };

      const animate = () => {
        animationFrame = 0;

        if (cancelled) {
          return;
        }

        if (!isVisible) {
          return;
        }

        if (!shouldReduceMotion) {
          currentRotation.x += (targetRotation.x - currentRotation.x) * 0.12;
          currentRotation.y += (targetRotation.y - currentRotation.y) * 0.12;
        } else {
          currentRotation.x = targetRotation.x;
          currentRotation.y = targetRotation.y;
        }

        model.rotation.set(currentRotation.x, currentRotation.y, 0);
        render();
        requestRenderLoop();
      };

      const onPointerDown = (event: PointerEvent) => {
        if (event.button !== 0) {
          return;
        }

        dragState.active = true;
        dragState.pointerId = event.pointerId;
        dragState.startX = event.clientX;
        dragState.startY = event.clientY;
        dragState.startRotationX = targetRotation.x;
        dragState.startRotationY = targetRotation.y;
        renderer.domElement.setPointerCapture(event.pointerId);
        requestRenderLoop();
      };

      const onPointerMove = (event: PointerEvent) => {
        if (!dragState.active || event.pointerId !== dragState.pointerId) {
          return;
        }

        const rect = renderer.domElement.getBoundingClientRect();
        const deltaX = (event.clientX - dragState.startX) / Math.max(1, rect.width);
        const deltaY = (event.clientY - dragState.startY) / Math.max(1, rect.height);

        targetRotation.y = clamp(
          dragState.startRotationY + deltaX * 1.9,
          -FALLINGWATER_INTERACTION.maxYaw,
          FALLINGWATER_INTERACTION.maxYaw,
        );
        targetRotation.x = clamp(
          dragState.startRotationX + deltaY * 1.1,
          -FALLINGWATER_INTERACTION.maxPitch,
          FALLINGWATER_INTERACTION.maxPitch,
        );
        requestRenderLoop();
      };

      const endDrag = (event: PointerEvent) => {
        if (!dragState.active || event.pointerId !== dragState.pointerId) {
          return;
        }

        dragState.active = false;
        dragState.pointerId = -1;
      };

      const onWheel = (event: WheelEvent) => {
        event.preventDefault();
        camera.zoom = clamp(
          camera.zoom - event.deltaY * 0.0009,
          FALLINGWATER_INTERACTION.minZoom,
          FALLINGWATER_INTERACTION.maxZoom,
        );
        camera.updateProjectionMatrix();
        requestRenderLoop();
      };

      const resizeObserver = new ResizeObserver(resize);
      const intersectionObserver = new IntersectionObserver(([entry]) => {
        isVisible = entry?.isIntersecting ?? true;

        if (isVisible) {
          requestRenderLoop();
        } else {
          window.cancelAnimationFrame(animationFrame);
          animationFrame = 0;
        }
      });
      resizeObserver.observe(host);
      intersectionObserver.observe(host);
      resize();
      render();

      renderer.domElement.addEventListener("pointerdown", onPointerDown);
      renderer.domElement.addEventListener("pointermove", onPointerMove);
      renderer.domElement.addEventListener("pointerup", endDrag);
      renderer.domElement.addEventListener("pointercancel", endDrag);
      renderer.domElement.addEventListener("wheel", onWheel, { passive: false });

      requestRenderLoop();

      cleanupThree = () => {
        window.cancelAnimationFrame(animationFrame);
        resizeObserver.disconnect();
        intersectionObserver.disconnect();
        renderer.domElement.removeEventListener("pointerdown", onPointerDown);
        renderer.domElement.removeEventListener("pointermove", onPointerMove);
        renderer.domElement.removeEventListener("pointerup", endDrag);
        renderer.domElement.removeEventListener("pointercancel", endDrag);
        renderer.domElement.removeEventListener("wheel", onWheel);
        disposableGeometries.forEach((geometry) => geometry.dispose());
        disposableMaterials.forEach((material) => material.dispose());
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(animationFrame);
      cleanupThree?.();
    };
  }, [shouldReduceMotion]);

  return (
    <span
      ref={containerRef}
      className="fallingwater-model-canvas"
      aria-hidden="true"
    />
  );
}
