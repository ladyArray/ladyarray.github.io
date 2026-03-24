import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { AdditiveBlending, DynamicDrawUsage, MathUtils } from 'three';

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
    orbitX: 1.76 + Math.random() * 1.3,
    orbitY: 0.7 + Math.random() * 1.05,
    depth: 0.45 + Math.random() * 1.4,
    scale: 0.06 + Math.random() * 0.16,
    speed: 0.42 + Math.random() * 0.42,
    offset: index * 0.62 + Math.random()
  }));
}

function createNodes(count) {
  return Array.from({ length: count }, (_, index) => ({
    radius: 1.4 + Math.random() * 1.2,
    height: 0.38 + Math.random() * 0.82,
    depth: -0.95 + Math.random() * 1.9,
    speed: 0.34 + Math.random() * 0.24,
    scale: 0.032 + Math.random() * 0.035,
    offset: index * 0.84 + Math.random() * 2
  }));
}

function OrbitalField({ compact, interaction }) {
  const orbRef = useRef(null);
  const wireRef = useRef(null);
  const auraRef = useRef(null);
  const pulseOuterRef = useRef(null);
  const pulseInnerRef = useRef(null);
  const captureRef = useRef(null);
  const pointsRef = useRef(null);
  const pointsMaterialRef = useRef(null);
  const fragmentRefs = useRef([]);
  const nodeRefs = useRef([]);
  const ringRefs = useRef([]);
  const linkMaterialRef = useRef(null);
  const linkAttributeRef = useRef(null);
  const [particles] = useState(() => createParticleCloud(compact ? 760 : 1220, compact ? 5.6 : 6.9));
  const [fragments] = useState(() => createFragments(compact ? 7 : 11));
  const [nodes] = useState(() => createNodes(compact ? 5 : 7));
  const [linkPositions] = useState(() => new Float32Array((compact ? 5 : 7) * 6));

  useEffect(() => {
    linkAttributeRef.current?.setUsage(DynamicDrawUsage);
  }, []);

  useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime();
    const pointer = interaction.current;

    pointer.currentX = MathUtils.lerp(pointer.currentX, pointer.targetX, 0.065);
    pointer.currentY = MathUtils.lerp(pointer.currentY, pointer.targetY, 0.065);
    pointer.speed = MathUtils.damp(pointer.speed, 0, 3.8, delta);
    pointer.field = MathUtils.lerp(pointer.field, pointer.inside ? 1 : 0, 0.05);
    pointer.orbHover = MathUtils.lerp(pointer.orbHover, pointer.orbHoverTarget, 0.08);
    pointer.pulse = Math.max(0, pointer.pulse - delta * 0.72);

    const focus = Math.max(pointer.field * 0.6, pointer.orbHover, Math.min(pointer.speed * 1.25, 1));
    const pulseWave = 1 - pointer.pulse;
    const pulseStrength = Math.sin(pulseWave * Math.PI);
    const pointerX = pointer.currentX;
    const pointerY = pointer.currentY;
    const baseOrbScale = compact ? 1.08 : 1.22;

    if (orbRef.current) {
      const targetX = pointerX * 0.54;
      const targetY = pointerY * 0.38;
      const orb = orbRef.current;

      orb.position.x = MathUtils.lerp(orb.position.x, targetX, 0.08);
      orb.position.y = MathUtils.lerp(orb.position.y, targetY, 0.08);
      orb.rotation.x += delta * (0.18 + focus * 0.22);
      orb.rotation.y += delta * (0.24 + focus * 0.28 + pointer.pulse * 0.4);
      orb.rotation.z = MathUtils.lerp(orb.rotation.z, pointerX * 0.18 + Math.sin(elapsed * 0.44) * 0.06, 0.06);

      const pulseScale = 1 + Math.sin(elapsed * 1.3) * 0.024 + focus * 0.045 + pulseStrength * 0.14;
      const scaleX = baseOrbScale * (pulseScale + pointerX * 0.018);
      const scaleY = baseOrbScale * (1 + Math.cos(elapsed * 1.18) * 0.022 + focus * 0.026 - pointer.speed * 0.015);
      const scaleZ = baseOrbScale * (1 + pulseStrength * 0.08 + Math.abs(pointerY) * 0.02);

      orb.scale.set(scaleX, scaleY, scaleZ);
      orb.material.emissiveIntensity = 0.46 + focus * 0.34 + pulseStrength * 0.45;
    }

    if (wireRef.current) {
      const wire = wireRef.current;
      const wireScale = (compact ? 1.48 : 1.72) * (1 + focus * 0.03 + pulseStrength * 0.08);

      wire.rotation.x -= delta * (0.12 + focus * 0.08);
      wire.rotation.y += delta * (0.08 + focus * 0.06);
      wire.rotation.z += delta * (0.06 + pointer.pulse * 0.14);
      wire.scale.setScalar(wireScale);
      wire.material.opacity = 0.16 + focus * 0.1 + pulseStrength * 0.12;
    }

    if (auraRef.current) {
      const aura = auraRef.current;

      aura.rotation.y += delta * (0.05 + focus * 0.04);
      aura.scale.x = 1 + Math.sin(elapsed * 0.68) * 0.04 + focus * 0.05;
      aura.scale.y = 1 + Math.cos(elapsed * 0.9) * 0.04 + pulseStrength * 0.12;
      aura.material.opacity = 0.08 + focus * 0.06 + pulseStrength * 0.08;
    }

    ringRefs.current.forEach((ring, index) => {
      if (!ring) {
        return;
      }

      const baseScale = 1.45 + index * 0.18;
      const ringScale = baseScale * (1 + Math.sin(elapsed * (0.84 + index * 0.08) + index) * 0.015 + focus * 0.018 + pulseStrength * (0.08 - index * 0.014));

      ring.rotation.x += delta * (0.05 + index * 0.02 + focus * 0.05);
      ring.rotation.y += delta * (0.08 + index * 0.028 + focus * 0.08 + pointer.pulse * 0.14);
      ring.rotation.z += delta * (0.02 + index * 0.015 + pulseStrength * 0.05);
      ring.position.x = pointerX * (0.1 + index * 0.02);
      ring.position.y = pointerY * (0.08 + index * 0.015);
      ring.scale.setScalar(ringScale);
      ring.material.opacity = (index === 1 ? 0.42 : 0.32) + focus * 0.12 + pulseStrength * 0.12;
    });

    fragmentRefs.current.forEach((fragment, index) => {
      if (!fragment) {
        return;
      }

      const settings = fragments[index];
      const phase = elapsed * settings.speed + settings.offset;
      const baseX = Math.cos(phase) * settings.orbitX;
      const baseY = Math.sin(phase * 1.4) * settings.orbitY;
      const baseZ = Math.sin(phase * 0.85) * settings.depth;
      const cursorX = pointerX * 1.85;
      const cursorY = pointerY * 1.2;
      const distance = Math.hypot(baseX - cursorX, baseY - cursorY);
      const repel = Math.max(0, 1 - distance / (1.75 + focus * 0.85));
      const repelStrength = pointer.speed * 0.38 + pointer.pulse * 1.05;

      fragment.position.x = baseX + (baseX - cursorX) * repel * repelStrength;
      fragment.position.y = baseY + (baseY - cursorY) * repel * (repelStrength * 0.8);
      fragment.position.z = baseZ + repel * (0.24 + pointer.pulse * 0.75);
      fragment.rotation.x += delta * (0.65 + index * 0.03 + focus * 0.18);
      fragment.rotation.y += delta * (0.45 + index * 0.02 + focus * 0.16);
      fragment.material.emissiveIntensity = 0.4 + repel * 0.24 + pulseStrength * 0.35;
    });

    if (pointsRef.current) {
      pointsRef.current.rotation.y = elapsed * 0.04 + pointerX * 0.14;
      pointsRef.current.rotation.x = Math.sin(elapsed * 0.14) * 0.05 + pointerY * 0.08;
      pointsRef.current.position.x = MathUtils.lerp(pointsRef.current.position.x, -pointerX * 0.22, 0.05);
      pointsRef.current.position.y = MathUtils.lerp(pointsRef.current.position.y, -pointerY * 0.16, 0.05);
    }

    if (pointsMaterialRef.current) {
      pointsMaterialRef.current.opacity = 0.68 + focus * 0.08 + pulseStrength * 0.1;
      pointsMaterialRef.current.size = compact ? 0.036 + focus * 0.008 : 0.05 + focus * 0.012;
    }

    nodes.forEach((node, index) => {
      const nodeMesh = nodeRefs.current[index];

      if (!nodeMesh) {
        return;
      }

      const phase = elapsed * node.speed + node.offset;
      const x = Math.cos(phase) * node.radius + pointerX * (0.22 + index * 0.02);
      const y = Math.sin(phase * 1.28) * node.height + pointerY * (0.15 + index * 0.015);
      const z = Math.sin(phase * 0.9) * node.depth;
      const shimmer = 1 + Math.sin(elapsed * 2.8 + index) * 0.08 + focus * 0.16;
      const lineIndex = index * 6;

      nodeMesh.position.set(x, y, z);
      nodeMesh.scale.setScalar(node.scale * shimmer * (1 + pulseStrength * 0.35));
      nodeMesh.material.opacity = 0.56 + focus * 0.18 + pulseStrength * 0.18;

      linkPositions[lineIndex] = MathUtils.lerp(0, pointerX * 1.05, focus);
      linkPositions[lineIndex + 1] = MathUtils.lerp(0, pointerY * 0.8, focus);
      linkPositions[lineIndex + 2] = 0;
      linkPositions[lineIndex + 3] = x;
      linkPositions[lineIndex + 4] = y;
      linkPositions[lineIndex + 5] = z;
    });

    if (linkAttributeRef.current) {
      linkAttributeRef.current.needsUpdate = true;
    }

    if (linkMaterialRef.current) {
      linkMaterialRef.current.opacity = 0.08 + focus * 0.2 + pulseStrength * 0.24;
    }

    if (pulseOuterRef.current) {
      pulseOuterRef.current.visible = pointer.pulse > 0.01;
      pulseOuterRef.current.scale.setScalar(1.08 + pulseWave * 1.8);
      pulseOuterRef.current.rotation.z += delta * 0.12;
      pulseOuterRef.current.material.opacity = Math.pow(pointer.pulse, 1.55) * 0.46;
    }

    if (pulseInnerRef.current) {
      pulseInnerRef.current.visible = pointer.pulse > 0.01;
      pulseInnerRef.current.scale.setScalar(0.96 + pulseWave * 1.15);
      pulseInnerRef.current.rotation.x += delta * 0.16;
      pulseInnerRef.current.rotation.y -= delta * 0.1;
      pulseInnerRef.current.material.opacity = Math.pow(pointer.pulse, 1.35) * 0.28;
    }
  });

  return (
    <>
      <ambientLight intensity={1.22} />
      <pointLight position={[2.8, 2.2, 3.5]} intensity={26} color="#4e82ff" />
      <pointLight position={[-3.5, -1.8, 1.4]} intensity={20} color="#9157ff" />
      <pointLight position={[0, 0, 2.8]} intensity={10} color="#dcebff" />
      <directionalLight position={[0, 0, 4]} intensity={1.7} color="#e6efff" />

      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={particles} count={particles.length / 3} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          ref={pointsMaterialRef}
          color="#b9daff"
          size={compact ? 0.036 : 0.05}
          sizeAttenuation
          transparent
          opacity={0.74}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </points>

      <group position={[0, 0.15, 0]}>
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute
              ref={linkAttributeRef}
              attach="attributes-position"
              array={linkPositions}
              count={linkPositions.length / 3}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            ref={linkMaterialRef}
            color="#92ddff"
            transparent
            opacity={0.16}
            blending={AdditiveBlending}
            depthWrite={false}
          />
        </lineSegments>

        <mesh ref={auraRef} scale={[1.86, 1.52, 1.86]}>
          <sphereGeometry args={[1.05, 40, 40]} />
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

        <mesh
          ref={captureRef}
          scale={compact ? 1.66 : 1.84}
          onPointerOver={(event) => {
            event.stopPropagation();
            interaction.current.orbHoverTarget = 1;
          }}
          onPointerOut={() => {
            interaction.current.orbHoverTarget = 0;
          }}
          onPointerDown={(event) => {
            event.stopPropagation();
            interaction.current.pulse = 1;
          }}
        >
          <sphereGeometry args={[1.08, 24, 24]} />
          <meshBasicMaterial transparent opacity={0.01} depthWrite={false} />
        </mesh>

        <mesh ref={wireRef} scale={compact ? 1.48 : 1.72}>
          <icosahedronGeometry args={[1.12, 3]} />
          <meshBasicMaterial color="#8fe2ff" transparent opacity={0.16} wireframe />
        </mesh>

        {[0, 1, 2].map((ringIndex) => (
          <mesh
            key={ringIndex}
            ref={(element) => {
              ringRefs.current[ringIndex] = element;
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

        <mesh ref={pulseOuterRef} visible={false} rotation={[Math.PI / 2.4, 0.2, 0]}>
          <torusGeometry args={[1.24, 0.018, 18, 220]} />
          <meshBasicMaterial color="#7de2ff" transparent opacity={0.35} />
        </mesh>

        <mesh ref={pulseInnerRef} visible={false} rotation={[0.5, Math.PI / 2.2, 0]}>
          <torusGeometry args={[1.02, 0.012, 18, 180]} />
          <meshBasicMaterial color="#9a78ff" transparent opacity={0.22} />
        </mesh>

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

        {nodes.map((node, index) => (
          <mesh
            key={`node-${index}`}
            ref={(element) => {
              nodeRefs.current[index] = element;
            }}
            scale={node.scale}
          >
            <sphereGeometry args={[1, 18, 18]} />
            <meshBasicMaterial
              color={index % 2 === 0 ? '#7de2ff' : '#ae96ff'}
              transparent
              opacity={0.58}
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
  const shellRef = useRef(null);
  const interactionRef = useRef({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
    speed: 0,
    pulse: 0,
    inside: false,
    field: 0,
    orbHover: 0,
    orbHoverTarget: 0
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

  const updateSpotlight = (x, y, opacity) => {
    if (!shellRef.current) {
      return;
    }

    shellRef.current.style.setProperty('--hero-pointer-x', `${x.toFixed(2)}%`);
    shellRef.current.style.setProperty('--hero-pointer-y', `${y.toFixed(2)}%`);
    shellRef.current.style.setProperty('--hero-pointer-opacity', opacity.toString());
  };

  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    const deltaX = x - interactionRef.current.targetX;
    const deltaY = y - interactionRef.current.targetY;

    interactionRef.current.targetX = x;
    interactionRef.current.targetY = y;
    interactionRef.current.speed = Math.min(1.2, Math.hypot(deltaX, deltaY) * 2.1);
    interactionRef.current.inside = true;

    updateSpotlight(((x + 1) / 2) * 100, ((1 - y) / 2) * 100, 1);
  };

  const handlePointerLeave = () => {
    interactionRef.current.targetX = 0;
    interactionRef.current.targetY = 0;
    interactionRef.current.inside = false;
    interactionRef.current.orbHoverTarget = 0;
    updateSpotlight(50, 50, 0);
  };

  const handlePointerDown = () => {
    interactionRef.current.pulse = 1;
  };

  if (mode.reduced) {
    return <StaticAura />;
  }

  return (
    <div
      ref={shellRef}
      className="scene-shell"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
    >
      <Canvas
        dpr={mode.compact ? [1, 1.2] : [1, 1.7]}
        camera={{ position: [0, 0, 6.4], fov: mode.compact ? 40 : 34 }}
      >
        <OrbitalField
          key={mode.compact ? 'compact' : 'full'}
          compact={mode.compact}
          interaction={interactionRef}
        />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(7,11,24,0.55)_100%)]" />
    </div>
  );
}
