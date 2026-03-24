"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function ParticleDust() {
  const pointsRef = useRef<THREE.Points>(null!);

  const count = typeof window !== "undefined" && window.innerWidth < 768 ? 80 : 300;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 20;
      pos[i + 1] = (Math.random() - 0.5) * 15;
      pos[i + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, [count]);

  const velocities = useMemo(() => {
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      vel[i] = (Math.random() - 0.5) * 0.002;
    }
    return vel;
  }, [count]);

  useFrame(() => {
    if (!pointsRef.current) return;
    const posArray = pointsRef.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < count * 3; i += 3) {
      posArray[i] += velocities[i];
      posArray[i + 1] += velocities[i + 1];
      posArray[i + 2] += velocities[i + 2];

      // Wrap around boundaries
      if (posArray[i] > 10) posArray[i] = -10;
      if (posArray[i] < -10) posArray[i] = 10;
      if (posArray[i + 1] > 7.5) posArray[i + 1] = -7.5;
      if (posArray[i + 1] < -7.5) posArray[i + 1] = 7.5;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#7D5C38"
        size={0.03}
        sizeAttenuation
        transparent
        opacity={0.6}
      />
    </points>
  );
}
