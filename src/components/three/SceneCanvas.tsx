"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import GlassPolyhedra from "./GlassPolyhedra";
import ParticleDust from "./ParticleDust";
import MouseParallax from "./MouseParallax";

export default function SceneCanvas() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <GlassPolyhedra />
        <ParticleDust />
        <MouseParallax />
      </Suspense>
    </Canvas>
  );
}
