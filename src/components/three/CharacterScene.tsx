import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial, Sphere, Stars, Trail } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

// ── Animated geometric character ──────────────────────────
function CharacterCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state: import("@react-three/fiber").RootState) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.3;
      meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.2;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.5;
      innerRef.current.rotation.z = t * 0.3;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = t * 0.8;
      ringRef.current.rotation.z = t * 0.4;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <group>
        {/* Outer distort sphere */}
        <Sphere ref={meshRef} args={[1.2, 64, 64]}>
          <MeshDistortMaterial
            color="#00ffe6"
            emissive="#003d38"
            emissiveIntensity={0.5}
            roughness={0.1}
            metalness={0.9}
            distort={0.35}
            speed={2}
            transparent
            opacity={0.85}
          />
        </Sphere>

        {/* Inner core */}
        <Sphere ref={innerRef} args={[0.7, 32, 32]}>
          <MeshDistortMaterial
            color="#7b2fff"
            emissive="#3d007a"
            emissiveIntensity={0.8}
            roughness={0}
            metalness={1}
            distort={0.6}
            speed={3}
          />
        </Sphere>

        {/* Orbit ring */}
        <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.8, 0.02, 8, 64]} />
          <meshBasicMaterial color="#ff2d6b" />
        </mesh>

        {/* Second orbit ring */}
        <mesh rotation={[0.5, 0, Math.PI / 4]}>
          <torusGeometry args={[2.2, 0.015, 8, 64]} />
          <meshBasicMaterial color="#00ffe6" transparent opacity={0.5} />
        </mesh>
      </group>
    </Float>
  );
}

// ── Orbiting trail particles ───────────────────────────────
function OrbitalParticle({ radius, speed, offset, color }: {
  radius: number;
  speed: number;
  offset: number;
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }: import("@react-three/fiber").RootState) => {
    const t = clock.getElapsedTime() * speed + offset;
    if (meshRef.current) {
      meshRef.current.position.x = Math.cos(t) * radius;
      meshRef.current.position.z = Math.sin(t) * radius;
      meshRef.current.position.y = Math.sin(t * 0.5) * 0.5;
    }
  });

  return (
    <Trail width={0.5} length={6} color={color} attenuation={(t: number) => t * t}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </Trail>
  );
}

// ── Particle field ─────────────────────────────────────────
function ParticleField() {
  const COUNT = 1200;
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const accentColors = [
      new THREE.Color('#00ffe6'),
      new THREE.Color('#7b2fff'),
      new THREE.Color('#ff2d6b'),
      new THREE.Color('#ffffff'),
    ];

    for (let i = 0; i < COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const r = 3 + Math.random() * 8;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const c = accentColors[Math.floor(Math.random() * accentColors.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, []);

  const pointsRef = useRef<THREE.Points>(null);
  useFrame(({ clock }: import("@react-three/fiber").RootState) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

// ── Grid floor ────────────────────────────────────────────
function GridFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
      <planeGeometry args={[20, 20, 20, 20]} />
      <meshBasicMaterial color="#00ffe6" wireframe transparent opacity={0.07} />
    </mesh>
  );
}

// ── Main Scene ────────────────────────────────────────────
export default function CharacterScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        {/* Lights */}
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} intensity={2} color="#00ffe6" />
        <pointLight position={[-5, -5, -5]} intensity={1.5} color="#7b2fff" />
        <pointLight position={[0, 5, -5]} intensity={1} color="#ff2d6b" />

        {/* Character */}
        <CharacterCore />

        {/* Orbital particles */}
        <OrbitalParticle radius={2.5} speed={0.8} offset={0} color="#00ffe6" />
        <OrbitalParticle radius={3} speed={-0.6} offset={2} color="#ff2d6b" />
        <OrbitalParticle radius={2.8} speed={1.1} offset={4} color="#7b2fff" />

        {/* Environment */}
        <ParticleField />
        <GridFloor />
        <Stars radius={40} depth={50} count={2000} factor={4} saturation={0} fade />

        {/* Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.4}
          maxPolarAngle={Math.PI * 0.65}
          minPolarAngle={Math.PI * 0.35}
        />

        {/* Post-processing */}
        <EffectComposer>
          <Bloom
            intensity={1.2}
            luminanceThreshold={0.3}
            luminanceSmoothing={0.9}
            blendFunction={BlendFunction.ADD}
          />
          <ChromaticAberration
            offset={new THREE.Vector2(0.001, 0.001)}
            blendFunction={BlendFunction.NORMAL}
            radialModulation={false}
            modulationOffset={0}
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
