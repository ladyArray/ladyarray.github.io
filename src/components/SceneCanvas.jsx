import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MathUtils } from 'three';

function createParticleCloud(count, spread) {
  const positions = new Float32Array(count * 3);

  for (let index = 0; index < count; index += 1) {
    const radius = spread * (0.38 + Math.random() * 0.72);
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[index * 3 + 1] = radius * Math.cos(phi) * 0.72;
    positions[index * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
  }

  return positions;
}

function createFragments(count) {
  return Array.from({ length: count }, (_, index) => ({
    orbitX: 1.8 + Math.random() * 1.35,
    orbitY: 0.75 + Math.random() * 1.15,
    depth: -0.85 + Math.random() * 1.7,
    scale: 0.065 + Math.random() * 0.18,
    speed: 0.45 + Math.random() * 0.45,
    offset: index * 0.6 + Math.random()
  }));
}

function OrbitalField({ compact }) {
  const orbRef = useRef(null);
  const wireRef = useRef(null);
  const auraRef = useRef(null);
  const fragmentRefs = useRef([]);
  const ringsRef = useRef([]);
  const pointsRef = useRef(null);
  const [particles] = useState(() => createParticleCloud(compact ? 850 : 1450, compact ? 5.8 : 7.1));
  const [fragments] = useState(() => createFragments(compact ? 8 : 12));

  useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime();

    if (orbRef.current) {
      orbRef.current.rotation.x += delta * 0.18;
      orbRef.current.rotation.y += delta * 0.24;
      orbRef.current.position.x = MathUtils.lerp(orbRef.current.position.x, state.pointer.x * 0.4, 0.05);
      orbRef.current.position.y = MathUtils.lerp(orbRef.current.position.y, state.pointer.y * 0.28, 0.05);
      const pulse = 1 + Math.sin(elapsed * 1.35) * 0.028;
      orbRef.current.scale.setScalar(pulse);
    }

    if (wireRef.current) {
      wireRef.current.rotation.x -= delta * 0.12;
      wireRef.current.rotation.z += delta * 0.08;
    }

    if (auraRef.current) {
      auraRef.current.rotation.y += delta * 0.05;
      auraRef.current.scale.x = 1 + Math.sin(elapsed * 0.7) * 0.05;
      auraRef.current.scale.y = 1 + Math.cos(elapsed * 0.9) * 0.04;
    }

    ringsRef.current.forEach((ring, index) => {
      if (!ring) {
        return;
      }

      ring.rotation.x += delta * (0.06 + index * 0.025);
      ring.rotation.y += delta * (0.08 + index * 0.03);
      ring.rotation.z += delta * (0.02 + index * 0.018);
    });

    fragmentRefs.current.forEach((fragment, index) => {
      if (!fragment) {
        return;
      }

      const settings = fragments[index];
      const phase = elapsed * settings.speed + settings.offset;

      fragment.position.x = Math.cos(phase) * settings.orbitX;
      fragment.position.y = Math.sin(phase * 1.4) * settings.orbitY;
      fragment.position.z = Math.sin(phase * 0.85) * settings.depth;
      fragment.rotation.x += delta * (0.65 + index * 0.03);
      fragment.rotation.y += delta * (0.45 + index * 0.02);
    });

    if (pointsRef.current) {
      pointsRef.current.rotation.y = elapsed * 0.04;
      pointsRef.current.rotation.x = Math.sin(elapsed * 0.14) * 0.05;
    }
  });

  return (
    <>
      <ambientLight intensity={1.2} />
      <pointLight position={[2.8, 2.2, 3.5]} intensity={26} color="#4e82ff" />
      <pointLight position={[-3.5, -1.8, 1.4]} intensity={20} color="#9157ff" />
      <directionalLight position={[0, 0, 4]} intensity={1.7} color="#e6efff" />

      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={particles} count={particles.length / 3} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          color="#b9daff"
          size={compact ? 0.035 : 0.05}
          sizeAttenuation
          transparent
          opacity={0.74}
          depthWrite={false}
        />
      </points>

      <group position={[0, 0.15, 0]}>
        <mesh ref={auraRef} scale={[1.85, 1.5, 1.85]}>
          <sphereGeometry args={[1.05, 36, 36]} />
          <meshBasicMaterial color="#7c6cff" transparent opacity={0.08} />
        </mesh>

        <mesh ref={orbRef} scale={compact ? 1.08 : 1.22}>
          <icosahedronGeometry args={[1.18, 6]} />
          <meshPhysicalMaterial
            color="#7d6cff"
            emissive="#2a93ff"
            emissiveIntensity={0.46}
            roughness={0.16}
            metalness={0.12}
            clearcoat={1}
            clearcoatRoughness={0.08}
          />
        </mesh>

        <mesh ref={wireRef} scale={compact ? 1.48 : 1.72}>
          <icosahedronGeometry args={[1.12, 3]} />
          <meshBasicMaterial color="#8fe2ff" transparent opacity={0.16} wireframe />
        </mesh>

        {[0, 1, 2].map((ringIndex) => (
          <mesh
            key={ringIndex}
            ref={(element) => {
              ringsRef.current[ringIndex] = element;
            }}
            rotation={[0.65 + ringIndex * 0.36, 0.5 + ringIndex * 0.3, ringIndex * 0.24]}
            scale={1.45 + ringIndex * 0.18}
          >
            <torusGeometry args={[1.3, 0.014 + ringIndex * 0.006, 22, 220]} />
            <meshBasicMaterial
              color={ringIndex === 1 ? '#38b7ff' : '#9a78ff'}
              transparent
              opacity={ringIndex === 1 ? 0.42 : 0.32}
            />
          </mesh>
        ))}

        {fragments.map((fragment, index) => (
          <mesh
            key={index}
            ref={(element) => {
              fragmentRefs.current[index] = element;
            }}
            scale={fragment.scale}
          >
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color={index % 2 === 0 ? '#84d8ff' : '#b29aff'}
              emissive={index % 2 === 0 ? '#2f9fff' : '#6c45ff'}
              emissiveIntensity={0.4}
              roughness={0.22}
              metalness={0.18}
            />
          </mesh>
        ))}
      </group>
    </>
  );
}

function StaticAura() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/30 blur-[70px]" />
      <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cobalt/35 bg-cobalt/12" />
      <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_35%),radial-gradient(circle_at_35%_30%,rgba(130,121,255,0.18),transparent_25%),radial-gradient(circle_at_70%_40%,rgba(55,168,255,0.18),transparent_28%)]" />
    </div>
  );
}

export default function SceneCanvas() {
  const [mode, setMode] = useState({
    compact: false,
    reduced: false
  });

  useEffect(() => {
    const compactQuery = window.matchMedia('(max-width: 920px)');
    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateMode = () => {
      setMode({
        compact: compactQuery.matches,
        reduced: reducedQuery.matches
      });
    };

    updateMode();
    compactQuery.addEventListener('change', updateMode);
    reducedQuery.addEventListener('change', updateMode);

    return () => {
      compactQuery.removeEventListener('change', updateMode);
      reducedQuery.removeEventListener('change', updateMode);
    };
  }, []);

  if (mode.reduced) {
    return <StaticAura />;
  }

  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={mode.compact ? [1, 1.2] : [1, 1.7]}
        camera={{ position: [0, 0, 6.4], fov: mode.compact ? 40 : 34 }}
      >
        <OrbitalField compact={mode.compact} />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(7,11,24,0.55)_100%)]" />
    </div>
  );
}
