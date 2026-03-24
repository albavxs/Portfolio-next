"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function FloatingShape({
  position,
  scale,
  speed,
  offset,
  geometry,
}: {
  position: [number, number, number];
  scale: number;
  speed: number;
  offset: number;
  geometry: "icosahedron" | "octahedron";
}) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const t = performance.now() / 1000;
    meshRef.current.position.y += Math.sin(t * speed + offset) * 0.001;
    meshRef.current.rotation.x += delta * 0.05 * speed;
    meshRef.current.rotation.z += delta * 0.03 * speed;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {geometry === "icosahedron" ? (
        <icosahedronGeometry args={[1, 0]} />
      ) : (
        <octahedronGeometry args={[1, 0]} />
      )}
      <meshPhysicalMaterial
        color="#7D5C38"
        transparent
        opacity={0.15}
        roughness={0.1}
        metalness={0.1}
        envMapIntensity={0.5}
      />
    </mesh>
  );
}

export default function GlassPolyhedra() {
  const shapes = useMemo(() => {
    const items = [];
    const count = typeof window !== "undefined" && window.innerWidth < 768 ? 8 : 18;
    for (let i = 0; i < count; i++) {
      items.push({
        position: [
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 4 - 1,
        ] as [number, number, number],
        scale: 0.3 + Math.random() * 0.9,
        speed: 0.3 + Math.random() * 0.7,
        offset: Math.random() * Math.PI * 2,
        geometry: (Math.random() > 0.5 ? "icosahedron" : "octahedron") as
          | "icosahedron"
          | "octahedron",
      });
    }
    return items;
  }, []);

  return (
    <group>
      {shapes.map((props, i) => (
        <FloatingShape key={i} {...props} />
      ))}
    </group>
  );
}
