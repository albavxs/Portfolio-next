"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function seededRandom(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function seededRange(seed: number, min: number, max: number) {
  return min + seededRandom(seed) * (max - min);
}

export default function ParticleDust() {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 300;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = seededRange(i + 1, -10, 10);
      pos[i + 1] = seededRange(i + 2, -7.5, 7.5);
      pos[i + 2] = seededRange(i + 3, -4, 4);
    }
    return pos;
  }, [count]);

  const velocities = useMemo(() => {
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      vel[i] = seededRange(i + 101, -0.001, 0.001);
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
