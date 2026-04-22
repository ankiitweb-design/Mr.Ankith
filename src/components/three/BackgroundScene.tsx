import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FloatingCrystals({ count = 20 }: { count?: number }) {
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
  const data = useMemo(() => {
    return Array.from({ length: count }, (_item, _idx) => ({
      position: [
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15 - 5,
      ] as [number, number, number],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
      scale: 0.1 + Math.random() * 0.4,
      speed: 0.2 + Math.random() * 0.5,
      offset: Math.random() * Math.PI * 2,
      color: ['#00ffe6', '#7b2fff', '#ff2d6b', '#f5c842'][Math.floor(Math.random() * 4)],
    }));
  }, [count]);

  useFrame(({ clock }: import("@react-three/fiber").RootState) => {
    const t = clock.getElapsedTime();
    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const d = data[i];
      mesh.rotation.x = d.rotation[0] + t * d.speed * 0.3;
      mesh.rotation.y = d.rotation[1] + t * d.speed * 0.5;
      mesh.position.y = d.position[1] + Math.sin(t * d.speed + d.offset) * 0.8;
    });
  });

  return (
    <>
      {data.map((d, i) => (
        <mesh
          key={i}
          ref={(el) => { meshRefs.current[i] = el; }}
          position={d.position}
          rotation={d.rotation}
          scale={d.scale}
        >
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={d.color}
            emissive={d.color}
            emissiveIntensity={0.3}
            roughness={0.1}
            metalness={0.9}
            transparent
            opacity={0.3}
            wireframe={Math.random() > 0.6}
          />
        </mesh>
      ))}
    </>
  );
}

function MovingGrid() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }: import("@react-three/fiber").RootState) => {
    if (ref.current) {
      ref.current.position.z = (clock.getElapsedTime() * 0.5) % 2;
    }
  });

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -6, 0]}>
      <planeGeometry args={[60, 60, 30, 30]} />
      <meshBasicMaterial color="#00ffe6" wireframe transparent opacity={0.04} />
    </mesh>
  );
}

export default function BackgroundScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 60 }}
      gl={{ antialias: false, alpha: true }}
      dpr={1}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        background: '#060608',
      }}
    >
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#00ffe6" />
      <FloatingCrystals count={18} />
      <MovingGrid />
    </Canvas>
  );
}
