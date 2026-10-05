'use client';

import React, { type FC, Suspense, useRef, useLayoutEffect, useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree, invalidate } from '@react-three/fiber';
import { OrbitControls, useGLTF, useProgress, Html, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import ThinkPadT14Model from './ThinkPadT14Model';

export interface ViewerProps {
  url: string;
  width?: number | string;
  height?: number | string;
  modelXOffset?: number;
  modelYOffset?: number;
  defaultRotationX?: number;
  defaultRotationY?: number;
  defaultZoom?: number;
  minZoomDistance?: number;
  maxZoomDistance?: number;
  enableMouseParallax?: boolean;
  enableManualRotation?: boolean;
  enableHoverRotation?: boolean;
  enableManualZoom?: boolean;
  ambientIntensity?: number;
  keyLightIntensity?: number;
  fillLightIntensity?: number;
  rimLightIntensity?: number;
  environmentPreset?: 'city' | 'sunset' | 'night' | 'dawn' | 'studio' | 'apartment' | 'forest' | 'park' | 'none';
  autoFrame?: boolean;
  placeholderSrc?: string;
  showScreenshotButton?: boolean;
  fadeIn?: boolean;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  onModelLoaded?: () => void;
  className?: string;
}

const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
const deg2rad = (d: number) => (d * Math.PI) / 180;
const DECIDE = 8;
const ROTATE_SPEED = 0.0055;
const INERTIA = 0.93;
const PARALLAX_MAG = 0.04;
const PARALLAX_EASE = 0.12;
const HOVER_MAG = deg2rad(5);
const HOVER_EASE = 0.14;

const Loader: FC<{ placeholderSrc?: string }> = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="font-mono text-xs px-3 py-1.5 rounded-full border border-hairline bg-bg-raised/85 backdrop-blur-md text-muted select-none whitespace-nowrap shadow-sm">
        Loading 3D ThinkPad {Math.round(progress)}%
      </div>
    </Html>
  );
};

const DesktopControls: FC<{
  pivot: THREE.Vector3;
  min: number;
  max: number;
  zoomEnabled: boolean;
}> = ({ pivot, min, max, zoomEnabled }) => {
  const ref = useRef<any>(null);
  useFrame(() => ref.current?.target.copy(pivot));
  return (
    <OrbitControls
      ref={ref}
      makeDefault
      enablePan={false}
      enableRotate={false}
      enableZoom={zoomEnabled}
      minDistance={min}
      maxDistance={max}
    />
  );
};

interface ModelInnerProps {
  xOff: number;
  yOff: number;
  pivot: THREE.Vector3;
  initYaw: number;
  initPitch: number;
  minZoom: number;
  maxZoom: number;
  enableMouseParallax: boolean;
  enableManualRotation: boolean;
  enableHoverRotation: boolean;
  enableManualZoom: boolean;
  fadeIn: boolean;
  autoRotate: boolean;
  autoRotateSpeed: number;
  onLoaded?: () => void;
  onDragStateChange?: (dragging: boolean) => void;
}

/**
 * Prominently Enlarged ThinkPad T14 Gen 2 Inner Model.
 * Scaled and centered to fill ~80-85% of the frame (like the car model in React Bits).
 */
const ThinkPadInner: FC<ModelInnerProps> = ({
  xOff,
  yOff,
  pivot,
  initYaw,
  initPitch,
  enableMouseParallax,
  enableManualRotation,
  enableHoverRotation,
  fadeIn,
  autoRotate,
  autoRotateSpeed,
  onLoaded,
  onDragStateChange
}) => {
  const outer = useRef<THREE.Group>(null!);
  const inner = useRef<THREE.Group>(null!);
  const { camera, gl } = useThree();

  const isDragging = useRef(false);
  const vel = useRef({ x: 0, y: 0 });
  const tPar = useRef({ x: 0, y: 0 });
  const cPar = useRef({ x: 0, y: 0 });
  const tHov = useRef({ x: 0, y: 0 });
  const cHov = useRef({ x: 0, y: 0 });

  const pivotW = useRef(new THREE.Vector3());

  useLayoutEffect(() => {
    const g = inner.current;
    if (!g) return;
    g.updateWorldMatrix(true, true);

    const sphere = new THREE.Box3().setFromObject(g).getBoundingSphere(new THREE.Sphere());
    // Prominent enlarged scale factor: fills ~80-85% of the view heroically
    const targetSize = 1.72;
    const s = targetSize / (sphere.radius * 2);
    g.position.set(-sphere.center.x * s, -sphere.center.y * s, -sphere.center.z * s);
    g.scale.setScalar(s);

    g.traverse((o: any) => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
        if (fadeIn) {
          o.material.transparent = true;
          o.material.opacity = 0;
        }
      }
    });

    g.getWorldPosition(pivotW.current);
    pivot.copy(pivotW.current);
    outer.current.rotation.set(initPitch, initYaw, 0);

    if (fadeIn) {
      let t = 0;
      const id = setInterval(() => {
        t += 0.06;
        const v = Math.min(t, 1);
        g.traverse((o: any) => {
          if (o.isMesh) o.material.opacity = v;
        });
        invalidate();
        if (v === 1) {
          clearInterval(id);
          onLoaded?.();
        }
      }, 16);
      return () => clearInterval(id);
    } else {
      onLoaded?.();
    }
  }, [fadeIn, initPitch, initYaw, onLoaded, pivot]);

  // Desktop Pointer Drag Interaction
  useEffect(() => {
    if (!enableManualRotation || isTouch) return;
    const el = gl.domElement;
    let drag = false;
    let lx = 0, ly = 0;

    const up = () => {
      if (!drag) return;
      drag = false;
      isDragging.current = false;
      onDragStateChange?.(false);
      window.removeEventListener('pointerup', up);
    };

    const down = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
      drag = true;
      isDragging.current = true;
      onDragStateChange?.(true);
      lx = e.clientX;
      ly = e.clientY;
      window.addEventListener('pointerup', up);
    };

    const move = (e: PointerEvent) => {
      if (!drag) return;
      const dx = e.clientX - lx;
      const dy = e.clientY - ly;
      lx = e.clientX;
      ly = e.clientY;

      outer.current.rotation.y += dx * ROTATE_SPEED;
      // Clamp pitch so the laptop stays right side up
      const nextPitch = outer.current.rotation.x + dy * ROTATE_SPEED;
      outer.current.rotation.x = Math.max(-0.65, Math.min(0.75, nextPitch));

      vel.current = { x: dx * ROTATE_SPEED, y: dy * ROTATE_SPEED * 0.4 };
      invalidate();
    };

    el.addEventListener('pointerdown', down);
    window.addEventListener('pointermove', move);
    return () => {
      el.removeEventListener('pointerdown', down);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
  }, [gl, enableManualRotation, onDragStateChange]);

  // Mobile Touch Swipe Interaction
  useEffect(() => {
    if (!isTouch) return;
    const el = gl.domElement;
    const pts = new Map<number, { x: number; y: number }>();
    let mode: 'idle' | 'decide' | 'rotate' = 'idle';
    let sx = 0, sy = 0, lx = 0, ly = 0;

    const up = (e: PointerEvent) => {
      pts.delete(e.pointerId);
      if (mode === 'rotate' && pts.size === 0) {
        mode = 'idle';
        isDragging.current = false;
        onDragStateChange?.(false);
      }
    };

    const down = (e: PointerEvent) => {
      if (e.pointerType !== 'touch') return;
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pts.size === 1) {
        mode = 'decide';
        sx = lx = e.clientX;
        sy = ly = e.clientY;
      }
      invalidate();
    };

    const move = (e: PointerEvent) => {
      const p = pts.get(e.pointerId);
      if (!p) return;
      p.x = e.clientX;
      p.y = e.clientY;

      if (mode === 'decide') {
        const dx = e.clientX - sx;
        const dy = e.clientY - sy;
        if (Math.abs(dx) > DECIDE || Math.abs(dy) > DECIDE) {
          if (enableManualRotation && Math.abs(dx) > Math.abs(dy)) {
            mode = 'rotate';
            isDragging.current = true;
            onDragStateChange?.(true);
            el.setPointerCapture(e.pointerId);
          } else {
            mode = 'idle';
            pts.clear();
          }
        }
      }

      if (mode === 'rotate') {
        e.preventDefault();
        const dx = e.clientX - lx;
        const dy = e.clientY - ly;
        lx = e.clientX;
        ly = e.clientY;

        outer.current.rotation.y += dx * ROTATE_SPEED;
        const nextPitch = outer.current.rotation.x + dy * ROTATE_SPEED;
        outer.current.rotation.x = Math.max(-0.65, Math.min(0.75, nextPitch));

        vel.current = { x: dx * ROTATE_SPEED, y: dy * ROTATE_SPEED * 0.4 };
        invalidate();
      }
    };

    el.addEventListener('pointerdown', down, { passive: true });
    window.addEventListener('pointermove', move, { passive: false });
    window.addEventListener('pointerup', up, { passive: true });
    window.addEventListener('pointercancel', up, { passive: true });
    return () => {
      el.removeEventListener('pointerdown', down);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
    };
  }, [gl, enableManualRotation, onDragStateChange]);

  // Mouse Hover & Parallax Tilt
  useEffect(() => {
    if (isTouch) return;
    const mm = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      if (enableMouseParallax) tPar.current = { x: -nx * PARALLAX_MAG, y: -ny * PARALLAX_MAG };
      if (enableHoverRotation) tHov.current = { x: ny * HOVER_MAG, y: nx * HOVER_MAG };
      invalidate();
    };
    window.addEventListener('pointermove', mm);
    return () => window.removeEventListener('pointermove', mm);
  }, [enableMouseParallax, enableHoverRotation]);

  useFrame((_, dt) => {
    let need = false;
    cPar.current.x += (tPar.current.x - cPar.current.x) * PARALLAX_EASE;
    cPar.current.y += (tPar.current.y - cPar.current.y) * PARALLAX_EASE;
    const phx = cHov.current.x;
    const phy = cHov.current.y;
    cHov.current.x += (tHov.current.x - cHov.current.x) * HOVER_EASE;
    cHov.current.y += (tHov.current.y - cHov.current.y) * HOVER_EASE;

    const ndc = pivotW.current.clone().project(camera);
    ndc.x += xOff + cPar.current.x;
    ndc.y += yOff + cPar.current.y;
    outer.current.position.copy(ndc.unproject(camera));

    outer.current.rotation.x += cHov.current.x - phx;
    outer.current.rotation.y += cHov.current.y - phy;

    // Auto-rotate only when not dragging
    if (autoRotate && !isDragging.current) {
      outer.current.rotation.y += autoRotateSpeed * dt;
      need = true;
    }

    // Smooth inertia coasting
    outer.current.rotation.y += vel.current.x;
    outer.current.rotation.x += vel.current.y;
    vel.current.x *= INERTIA;
    vel.current.y *= INERTIA;
    if (Math.abs(vel.current.x) > 1e-4 || Math.abs(vel.current.y) > 1e-4) need = true;

    if (
      Math.abs(cPar.current.x - tPar.current.x) > 1e-4 ||
      Math.abs(cPar.current.y - tPar.current.y) > 1e-4 ||
      Math.abs(cHov.current.x - tHov.current.x) > 1e-4 ||
      Math.abs(cHov.current.y - tHov.current.y) > 1e-4
    ) {
      need = true;
    }

    if (need) invalidate();
  });

  return (
    <group ref={outer}>
      <group ref={inner}>
        <ThinkPadT14Model />
      </group>
    </group>
  );
};

/**
 * Fallback GLTF loader for external URL models.
 */
const GLTFInner: FC<ModelInnerProps & { url: string }> = ({
  url,
  xOff,
  yOff,
  pivot,
  initYaw,
  initPitch,
  fadeIn,
  autoRotate,
  autoRotateSpeed,
  onLoaded
}) => {
  const outer = useRef<THREE.Group>(null!);
  const inner = useRef<THREE.Group>(null!);
  const { camera } = useThree();

  const gltf = useGLTF(url);
  const content = useMemo(() => gltf.scene.clone(), [gltf]);
  const pivotW = useRef(new THREE.Vector3());

  useLayoutEffect(() => {
    if (!content) return;
    const g = inner.current;
    g.updateWorldMatrix(true, true);

    const sphere = new THREE.Box3().setFromObject(g).getBoundingSphere(new THREE.Sphere());
    const targetSize = 1.72;
    const s = targetSize / (sphere.radius * 2);
    g.position.set(-sphere.center.x * s, -sphere.center.y * s, -sphere.center.z * s);
    g.scale.setScalar(s);

    g.traverse((o: any) => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });

    g.getWorldPosition(pivotW.current);
    pivot.copy(pivotW.current);
    outer.current.rotation.set(initPitch, initYaw, 0);
    onLoaded?.();
  }, [content, initPitch, initYaw, onLoaded, pivot]);

  useFrame((_, dt) => {
    if (autoRotate) {
      outer.current.rotation.y += autoRotateSpeed * dt;
      invalidate();
    }
  });

  if (!content) return null;
  return (
    <group ref={outer}>
      <group ref={inner}>
        <primitive object={content} />
      </group>
    </group>
  );
};

const ModelViewer: FC<ViewerProps> = ({
  url,
  width = '100%',
  height = '100%',
  modelXOffset = 0,
  modelYOffset = 0,
  defaultRotationX = -18,
  defaultRotationY = 22,
  defaultZoom = 2.5,
  minZoomDistance = 1.5,
  maxZoomDistance = 5.0,
  enableMouseParallax = true,
  enableManualRotation = true,
  enableHoverRotation = true,
  enableManualZoom = false,
  ambientIntensity = 0.9,
  keyLightIntensity = 1.6,
  fillLightIntensity = 0.8,
  rimLightIntensity = 1.0,
  environmentPreset = 'city',
  placeholderSrc,
  showScreenshotButton = false,
  fadeIn = true,
  autoRotate = true,
  autoRotateSpeed = 0.32,
  onModelLoaded,
  className = ''
}) => {
  const [mounted, setMounted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const pivot = useRef(new THREE.Vector3()).current;
  const contactRef = useRef<THREE.Mesh | null>(null);

  const initYaw = deg2rad(defaultRotationX);
  const initPitch = deg2rad(defaultRotationY);
  const camZ = Math.min(Math.max(defaultZoom, minZoomDistance), maxZoomDistance);

  const isThinkPad = !url || url === 'thinkpad-t14' || url.includes('thinkpad');

  if (!mounted) {
    return (
      <div
        style={{ width, height }}
        className={`relative flex items-center justify-center bg-transparent ${className}`}
      />
    );
  }

  return (
    <div
      style={{
        width,
        height,
        touchAction: 'pan-y pinch-zoom'
      }}
      className={`relative bg-transparent overflow-visible select-none ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      } ${className}`}
    >
      <Canvas
        shadows
        frameloop="demand"
        gl={{ preserveDrawingBuffer: true, antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
        camera={{ fov: 42, position: [0, 0.12, camZ], near: 0.01, far: 100 }}
        style={{ touchAction: 'pan-y pinch-zoom', width: '100%', height: '100%', background: 'transparent' }}
      >
        {environmentPreset !== 'none' && <Environment preset={environmentPreset as any} background={false} />}

        <ambientLight intensity={ambientIntensity} />
        <directionalLight position={[4, 7, 5]} intensity={keyLightIntensity} castShadow />
        <directionalLight position={[-5, 3, 4]} intensity={fillLightIntensity} />
        <directionalLight position={[0, 4, -5]} intensity={rimLightIntensity} />

        {/* Soft, authentic floor shadow underneath the laptop chassis */}
        <ContactShadows
          ref={contactRef as any}
          position={[0, -0.42, 0]}
          opacity={0.5}
          scale={5.2}
          blur={1.6}
          far={2.5}
        />

        <Suspense fallback={<Loader placeholderSrc={placeholderSrc} />}>
          {isThinkPad ? (
            <ThinkPadInner
              xOff={modelXOffset}
              yOff={modelYOffset}
              pivot={pivot}
              initYaw={initYaw}
              initPitch={initPitch}
              minZoom={minZoomDistance}
              maxZoom={maxZoomDistance}
              enableMouseParallax={enableMouseParallax}
              enableManualRotation={enableManualRotation}
              enableHoverRotation={enableHoverRotation}
              enableManualZoom={enableManualZoom}
              fadeIn={fadeIn}
              autoRotate={autoRotate}
              autoRotateSpeed={autoRotateSpeed}
              onLoaded={onModelLoaded}
              onDragStateChange={setIsDragging}
            />
          ) : (
            <GLTFInner
              url={url}
              xOff={modelXOffset}
              yOff={modelYOffset}
              pivot={pivot}
              initYaw={initYaw}
              initPitch={initPitch}
              minZoom={minZoomDistance}
              maxZoom={maxZoomDistance}
              enableMouseParallax={enableMouseParallax}
              enableManualRotation={enableManualRotation}
              enableHoverRotation={enableHoverRotation}
              enableManualZoom={enableManualZoom}
              fadeIn={fadeIn}
              autoRotate={autoRotate}
              autoRotateSpeed={autoRotateSpeed}
              onLoaded={onModelLoaded}
            />
          )}
        </Suspense>

        {!isTouch && (
          <DesktopControls pivot={pivot} min={minZoomDistance} max={maxZoomDistance} zoomEnabled={enableManualZoom} />
        )}
      </Canvas>
    </div>
  );
};

export default ModelViewer;
