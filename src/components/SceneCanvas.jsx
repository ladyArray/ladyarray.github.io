import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  AdditiveBlending,
  DoubleSide,
  DynamicDrawUsage,
  MathUtils,
  Vector3
} from 'three';

const FRAME_OUTLINE = new Float32Array([
  -0.5, -0.5, 0,
  0.5, -0.5, 0,
  0.5, -0.5, 0,
  0.5, 0.5, 0,
  0.5, 0.5, 0,
  -0.5, 0.5, 0,
  -0.5, 0.5, 0,
  -0.5, -0.5, 0
]);

const ANCHOR_VISUAL_SLOTS = 4;
const CORE_GROUP_INDEX = 5;

const TONE_PALETTE = {
  violet: {
    surface: '#8b7cff',
    outline: '#bfa9ff',
    accent: '#cec6ff',
    emissive: '#6f62ff'
  },
  cobalt: {
    surface: '#76c9ff',
    outline: '#a7e6ff',
    accent: '#d6f4ff',
    emissive: '#2f98ff'
  },
  ice: {
    surface: '#d8f3ff',
    outline: '#f2fbff',
    accent: '#ffffff',
    emissive: '#8fd8ff'
  }
};

const GROUP_DEFINITIONS = [
  { id: 'north', target: [0.02, 1.12, 0.26], radius: 0.92 },
  { id: 'east', target: [1.16, 0.22, 0.34], radius: 0.9 },
  { id: 'west', target: [-1.18, 0.18, 0.28], radius: 0.9 },
  { id: 'south', target: [0.02, -1.02, 0.18], radius: 0.94 },
  { id: 'rear', target: [0.12, -0.06, -0.92], radius: 0.88 },
  { id: 'core', target: [0.02, 0.06, 0.32], radius: 0.72 }
];

const TRACE_LINKS = [
  { from: 0, to: 5, tone: 'ice', revealWeight: 0.08 },
  { from: 1, to: 5, tone: 'cobalt', revealWeight: 0.1 },
  { from: 2, to: 5, tone: 'cobalt', revealWeight: 0.1 },
  { from: 3, to: 5, tone: 'ice', revealWeight: 0.08 },
  { from: 4, to: 5, tone: 'violet', revealWeight: 0.12 },
  { from: 0, to: 1, tone: 'cobalt', revealWeight: 0.02 },
  { from: 0, to: 2, tone: 'cobalt', revealWeight: 0.02 },
  { from: 3, to: 1, tone: 'violet', revealWeight: 0.04 },
  { from: 3, to: 2, tone: 'violet', revealWeight: 0.04 }
];

const FRAGMENT_DEFINITIONS = [
  {
    id: 'rear-frame',
    kind: 'frame',
    group: 4,
    tone: 'violet',
    size: [2.74, 3.18, 0.06],
    scatterPosition: [-1.24, 0.34, -1.24],
    assembledPosition: [0.08, 0.02, -0.72],
    scatterRotation: [0.62, -0.6, 0.36],
    assembledRotation: [0.18, -0.16, 0.08],
    sensitivity: 0.58,
    assemblyWeight: 0.38,
    revealWeight: 0.06,
    phase: 0.12,
    scatterScale: 0.96,
    assembledScale: 1
  },
  {
    id: 'mid-frame',
    kind: 'frame',
    group: 5,
    tone: 'cobalt',
    size: [2.08, 2.46, 0.05],
    scatterPosition: [1.02, -0.16, 0.88],
    assembledPosition: [0.06, 0.04, -0.12],
    scatterRotation: [-0.5, 0.76, -0.28],
    assembledRotation: [-0.12, 0.12, -0.06],
    sensitivity: 0.82,
    assemblyWeight: 0.46,
    revealWeight: 0.12,
    phase: 0.34,
    scatterScale: 0.94,
    assembledScale: 1
  },
  {
    id: 'inner-frame',
    kind: 'frame',
    group: 5,
    tone: 'ice',
    size: [1.46, 1.82, 0.04],
    scatterPosition: [0.44, 1.06, 1.02],
    assembledPosition: [0.02, 0.06, 0.52],
    scatterRotation: [0.44, -0.26, 0.48],
    assembledRotation: [0.1, 0.18, 0.2],
    sensitivity: 0.88,
    assemblyWeight: 0.52,
    revealWeight: 0.22,
    phase: 0.58,
    scatterScale: 0.9,
    assembledScale: 1
  },
  {
    id: 'north-plate',
    kind: 'plate',
    group: 0,
    tone: 'ice',
    size: [1.18, 0.28, 0.04],
    scatterPosition: [-0.46, 1.48, 0.44],
    assembledPosition: [0.02, 1.12, 0.22],
    scatterRotation: [0.28, 0.42, -0.42],
    assembledRotation: [0.04, 0.1, -0.04],
    sensitivity: 0.72,
    assemblyWeight: 0.3,
    revealWeight: 0.04,
    phase: 0.86,
    scatterScale: 0.92,
    assembledScale: 1
  },
  {
    id: 'south-plate',
    kind: 'plate',
    group: 3,
    tone: 'ice',
    size: [1.06, 0.24, 0.04],
    scatterPosition: [0.74, -1.34, 0.72],
    assembledPosition: [0, -1.04, 0.16],
    scatterRotation: [-0.26, -0.52, 0.34],
    assembledRotation: [-0.04, -0.08, 0.02],
    sensitivity: 0.72,
    assemblyWeight: 0.3,
    revealWeight: 0.04,
    phase: 1.08,
    scatterScale: 0.92,
    assembledScale: 1
  },
  {
    id: 'east-fin',
    kind: 'plate',
    group: 1,
    tone: 'cobalt',
    size: [0.42, 1.24, 0.04],
    scatterPosition: [1.62, 0.58, -0.22],
    assembledPosition: [1.06, 0.02, 0.3],
    scatterRotation: [0.36, -0.62, 0.18],
    assembledRotation: [0.08, -0.12, 0.14],
    sensitivity: 0.86,
    assemblyWeight: 0.34,
    revealWeight: 0.06,
    phase: 1.34,
    scatterScale: 0.9,
    assembledScale: 1
  },
  {
    id: 'west-fin',
    kind: 'plate',
    group: 2,
    tone: 'cobalt',
    size: [0.42, 1.32, 0.04],
    scatterPosition: [-1.58, -0.42, 0.62],
    assembledPosition: [-1.08, -0.02, 0.26],
    scatterRotation: [-0.34, 0.58, -0.22],
    assembledRotation: [-0.08, 0.14, -0.16],
    sensitivity: 0.86,
    assemblyWeight: 0.34,
    revealWeight: 0.06,
    phase: 1.58,
    scatterScale: 0.9,
    assembledScale: 1
  },
  {
    id: 'rear-slice',
    kind: 'plate',
    group: 4,
    tone: 'violet',
    size: [1.02, 0.44, 0.04],
    scatterPosition: [0.44, -0.74, -1.46],
    assembledPosition: [0.12, -0.16, -0.94],
    scatterRotation: [0.52, 0.18, 0.5],
    assembledRotation: [0.14, 0.04, 0.06],
    sensitivity: 0.66,
    assemblyWeight: 0.32,
    revealWeight: 0.08,
    phase: 1.84,
    scatterScale: 0.9,
    assembledScale: 1
  },
  {
    id: 'front-slice',
    kind: 'plate',
    group: 5,
    tone: 'ice',
    size: [0.84, 0.36, 0.04],
    scatterPosition: [-0.14, 0.28, 1.3],
    assembledPosition: [0, 0.14, 0.82],
    scatterRotation: [-0.22, -0.12, 0.3],
    assembledRotation: [0.02, 0.02, -0.04],
    sensitivity: 0.78,
    assemblyWeight: 0.36,
    revealWeight: 0.18,
    phase: 2.08,
    scatterScale: 0.88,
    assembledScale: 1
  },
  {
    id: 'east-prism',
    kind: 'prism',
    group: 1,
    tone: 'cobalt',
    size: [0.24, 0.84, 0.18],
    scatterPosition: [1.88, -0.18, 0.92],
    assembledPosition: [0.84, 0.3, 0.54],
    scatterRotation: [0.72, -0.2, 0.58],
    assembledRotation: [0.18, -0.12, 0.24],
    sensitivity: 0.86,
    assemblyWeight: 0.38,
    revealWeight: 0.12,
    phase: 2.32,
    scatterScale: 0.88,
    assembledScale: 1
  },
  {
    id: 'west-prism',
    kind: 'prism',
    group: 2,
    tone: 'cobalt',
    size: [0.24, 0.76, 0.18],
    scatterPosition: [-1.9, 0.22, -0.42],
    assembledPosition: [-0.84, 0.28, 0.46],
    scatterRotation: [-0.66, 0.22, -0.54],
    assembledRotation: [-0.16, 0.12, -0.22],
    sensitivity: 0.86,
    assemblyWeight: 0.38,
    revealWeight: 0.12,
    phase: 2.56,
    scatterScale: 0.88,
    assembledScale: 1
  },
  {
    id: 'south-prism',
    kind: 'prism',
    group: 3,
    tone: 'violet',
    size: [0.2, 0.92, 0.18],
    scatterPosition: [0.16, -1.82, -0.32],
    assembledPosition: [0.04, -0.74, 0.42],
    scatterRotation: [0.28, -0.66, 0.2],
    assembledRotation: [0.06, -0.1, 0.14],
    sensitivity: 0.78,
    assemblyWeight: 0.34,
    revealWeight: 0.08,
    phase: 2.82,
    scatterScale: 0.9,
    assembledScale: 1
  },
  {
    id: 'north-prism',
    kind: 'prism',
    group: 0,
    tone: 'violet',
    size: [0.18, 0.72, 0.16],
    scatterPosition: [-0.72, 1.86, -0.12],
    assembledPosition: [0, 0.86, 0.42],
    scatterRotation: [-0.2, 0.6, -0.28],
    assembledRotation: [-0.04, 0.1, -0.16],
    sensitivity: 0.78,
    assemblyWeight: 0.34,
    revealWeight: 0.08,
    phase: 3.06,
    scatterScale: 0.9,
    assembledScale: 1
  },
  {
    id: 'right-strut',
    kind: 'slat',
    group: 1,
    tone: 'ice',
    size: [0.92, 0.06, 0.08],
    scatterPosition: [1.34, 0.92, -0.74],
    assembledPosition: [0.62, 0.12, 0.02],
    scatterRotation: [0.12, -0.38, 0.64],
    assembledRotation: [0.02, 0.06, 0.24],
    sensitivity: 0.72,
    assemblyWeight: 0.3,
    revealWeight: 0.04,
    phase: 3.28,
    scatterScale: 0.94,
    assembledScale: 1
  },
  {
    id: 'left-strut',
    kind: 'slat',
    group: 2,
    tone: 'ice',
    size: [0.88, 0.06, 0.08],
    scatterPosition: [-1.44, -0.9, 0.96],
    assembledPosition: [-0.58, 0.04, 0.02],
    scatterRotation: [-0.14, 0.34, -0.62],
    assembledRotation: [-0.02, -0.06, -0.22],
    sensitivity: 0.72,
    assemblyWeight: 0.3,
    revealWeight: 0.04,
    phase: 3.54,
    scatterScale: 0.94,
    assembledScale: 1
  },
  {
    id: 'rear-needle',
    kind: 'slat',
    group: 4,
    tone: 'violet',
    size: [0.08, 1.12, 0.08],
    scatterPosition: [0.82, 0.76, -1.8],
    assembledPosition: [0.22, 0.14, -0.44],
    scatterRotation: [0.42, 0.18, -0.28],
    assembledRotation: [0.08, 0.02, -0.04],
    sensitivity: 0.62,
    assemblyWeight: 0.28,
    revealWeight: 0.04,
    phase: 3.78,
    scatterScale: 0.9,
    assembledScale: 1
  }
];

function createDustField(count, spread) {
  const positions = new Float32Array(count * 3);

  for (let index = 0; index < count; index += 1) {
    const radius = spread * (0.5 + Math.random() * 0.72);
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[index * 3 + 1] = radius * Math.cos(phi) * 0.82;
    positions[index * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
  }

  return positions;
}

function buildGroupDistances(groups) {
  return groups.map((group) =>
    groups.map((other) =>
      Math.hypot(
        group.target[0] - other.target[0],
        group.target[1] - other.target[1],
        group.target[2] - other.target[2]
      )
    )
  );
}

const GROUP_DISTANCES = buildGroupDistances(GROUP_DEFINITIONS);

function StaticAura() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-[2.7rem] bg-violet/16 blur-[90px]" />
      <div className="absolute left-1/2 top-1/2 h-56 w-44 -translate-x-1/2 -translate-y-1/2 rotate-6 rounded-[2.3rem] border border-white/10" />
      <div className="absolute left-1/2 top-1/2 h-44 w-60 -translate-x-1/2 -translate-y-1/2 -rotate-[10deg] rounded-[2rem] border border-cobalt/25" />
      <div className="absolute left-[28%] top-[26%] h-36 w-24 rotate-12 rounded-[1.2rem] border border-white/[0.08] bg-white/[0.02]" />
      <div className="absolute right-[24%] top-[34%] h-28 w-20 -rotate-[14deg] rounded-[1rem] border border-cobalt/20 bg-cobalt/[0.06]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_38%),radial-gradient(circle_at_34%_26%,rgba(130,121,255,0.16),transparent_24%),radial-gradient(circle_at_69%_41%,rgba(55,168,255,0.14),transparent_22%)]" />
    </div>
  );
}

function AssemblyField({ compact, interaction }) {
  const rootRef = useRef(null);
  const dustRef = useRef(null);
  const fragmentGroupRefs = useRef([]);
  const surfaceMaterialRefs = useRef([]);
  const outlineMaterialRefs = useRef([]);
  const accentMaterialRefs = useRef([]);
  const tracePositionRefs = useRef([]);
  const traceMaterialRefs = useRef([]);
  const anchorGroupRefs = useRef([]);
  const anchorOutlineRefs = useRef([]);
  const anchorCrossRefs = useRef([]);
  const anchorPlaneRefs = useRef([]);
  const revealGroupRef = useRef(null);
  const revealFrameRef = useRef(null);
  const revealFrameSecondaryRef = useRef(null);
  const revealPlaneMaterials = useRef([]);
  const revealCoreRef = useRef(null);
  const revealCoreMaterialRef = useRef(null);
  const revealBraceRefs = useRef([]);
  const revealBraceMaterials = useRef([]);
  const revealLightRef = useRef(null);
  const fragmentPositionsRef = useRef(FRAGMENT_DEFINITIONS.map(() => new Vector3()));
  const groupCentersRef = useRef(
    GROUP_DEFINITIONS.map((group) => new Vector3(group.target[0], group.target[1], group.target[2]))
  );
  const systemRef = useRef({
    memory: 0,
    memoryTarget: 0,
    assembly: 0,
    reveal: 0,
    phaseLift: 0
  });
  const anchorsRef = useRef([]);
  const [dust] = useState(() => createDustField(compact ? 90 : 140, compact ? 5.6 : 6.6));
  const [traceBuffers] = useState(() => TRACE_LINKS.map(() => new Float32Array(6)));
  const tempProbe = useMemo(() => new Vector3(), []);
  const tempVector = useMemo(() => new Vector3(), []);

  useEffect(() => {
    tracePositionRefs.current.forEach((attribute) => attribute?.setUsage(DynamicDrawUsage));
  }, []);

  useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime();
    const pointer = interaction.current;
    const system = systemRef.current;

    pointer.currentX = MathUtils.lerp(pointer.currentX, pointer.targetX, 0.08);
    pointer.currentY = MathUtils.lerp(pointer.currentY, pointer.targetY, 0.08);
    pointer.speed = MathUtils.damp(pointer.speed, 0, 3.2, delta);

    const probe = tempProbe.set(pointer.currentX * 1.92, pointer.currentY * 1.28, 0.2);

    system.memoryTarget = Math.max(0, system.memoryTarget - delta * 0.028);
    system.memory = MathUtils.damp(system.memory, system.memoryTarget, 2.2, delta);
    system.phaseLift = Math.max(0, system.phaseLift - delta * 0.82);

    anchorsRef.current = anchorsRef.current
      .map((anchor) => {
        const nextAge = anchor.age + delta;
        const strength = Math.max(0, 1 - nextAge / anchor.life);
        const settle = Math.max(0, 1 - nextAge / 2.8);

        return {
          ...anchor,
          age: nextAge,
          strength,
          settle
        };
      })
      .filter((anchor) => anchor.strength > 0.02);

    const activeAnchors = anchorsRef.current;

    if (pointer.clickQueue.length) {
      const queue = [...pointer.clickQueue];
      pointer.clickQueue.length = 0;

      queue.forEach((click) => {
        const clickProbe = tempVector.set(click.x * 1.92, click.y * 1.28, 0.2);
        const candidates = GROUP_DEFINITIONS.map((group, groupIndex) => ({
          groupIndex,
          distance: Math.hypot(group.target[0] - clickProbe.x, group.target[1] - clickProbe.y)
        })).sort((left, right) => right.distance - left.distance).reverse();
        const picked =
          candidates.find(
            (candidate) => candidate.groupIndex !== CORE_GROUP_INDEX || system.assembly > 0.44
          ) ?? candidates[0];
        const existing = activeAnchors.find((anchor) => anchor.groupIndex === picked.groupIndex);

        if (existing) {
          existing.age = 0;
          existing.strength = 1;
          existing.settle = 1;
          existing.life = picked.groupIndex === CORE_GROUP_INDEX ? 12.5 : 9.2;
        } else {
          activeAnchors.unshift({
            groupIndex: picked.groupIndex,
            age: 0,
            strength: 1,
            settle: 1,
            life: picked.groupIndex === CORE_GROUP_INDEX ? 12.5 : 9.2
          });
        }

        if (activeAnchors.length > ANCHOR_VISUAL_SLOTS) {
          activeAnchors.length = ANCHOR_VISUAL_SLOTS;
        }

        system.memoryTarget = Math.min(
          1,
          system.memoryTarget + (picked.groupIndex === CORE_GROUP_INDEX ? 0.14 : 0.22)
        );
        system.phaseLift = Math.min(1, system.phaseLift + 0.56);
      });
    }

    const groupPointer = GROUP_DEFINITIONS.map((group) => {
      const distance = Math.hypot(group.target[0] - probe.x, group.target[1] - probe.y);
      return Math.max(0, 1 - distance / group.radius);
    });

    const groupAnchorBoost = GROUP_DEFINITIONS.map((_, groupIndex) => {
      let boost = 0;

      activeAnchors.forEach((anchor) => {
        const distance = GROUP_DISTANCES[anchor.groupIndex][groupIndex];
        const falloff = Math.exp(-distance * (anchor.groupIndex === groupIndex ? 0.2 : 1.18));
        boost += anchor.strength * falloff * (anchor.groupIndex === groupIndex ? 1.08 : 0.62);
      });

      return Math.min(1.2, boost);
    });

    const activeGroups = new Set(
      activeAnchors
        .filter((anchor) => anchor.groupIndex !== CORE_GROUP_INDEX)
        .map((anchor) => anchor.groupIndex)
    ).size;
    const pointerSweep =
      [...groupPointer]
        .sort((left, right) => right - left)
        .slice(0, 2)
        .reduce((sum, value) => sum + value, 0) / 2;
    const anchorSweep = Math.min(
      1,
      groupAnchorBoost.reduce((sum, value) => sum + value, 0) * 0.16
    );
    const assemblyTarget = Math.min(
      1,
      system.memory * 0.62 + pointerSweep * 0.28 + anchorSweep * 0.58 + activeGroups * 0.06
    );
    const revealTarget = MathUtils.clamp(
      (assemblyTarget - 0.56) / 0.22 + Math.max(0, activeGroups - 2) * 0.16,
      0,
      1
    );

    system.assembly = MathUtils.damp(system.assembly, assemblyTarget, 2.3, delta);
    system.reveal = MathUtils.damp(system.reveal, revealTarget, 2.05, delta);

    const groupSums = GROUP_DEFINITIONS.map(() => new Vector3());
    const groupCounts = GROUP_DEFINITIONS.map(() => 0);
    const groupState = GROUP_DEFINITIONS.map((_, groupIndex) =>
      Math.min(
        1,
        groupPointer[groupIndex] * 0.56 +
          groupAnchorBoost[groupIndex] * 0.82 +
          system.assembly * (groupIndex === CORE_GROUP_INDEX ? 0.34 : 0.24)
      )
    );

    FRAGMENT_DEFINITIONS.forEach((fragment, index) => {
      const group = GROUP_DEFINITIONS[fragment.group];
      const groupFocus = groupPointer[fragment.group];
      const anchorFocus = groupAnchorBoost[fragment.group];
      const localDistance = Math.hypot(
        fragment.assembledPosition[0] - probe.x,
        fragment.assembledPosition[1] - probe.y
      );
      const localFocus = Math.max(
        0,
        1 - localDistance / (group.radius * (fragment.kind === 'frame' ? 1.2 : 0.94))
      );
      const alignTarget = MathUtils.clamp(
        localFocus * fragment.sensitivity * 0.7 +
          groupFocus * 0.34 +
          anchorFocus * 0.74 +
          system.assembly * fragment.assemblyWeight +
          system.reveal * fragment.revealWeight,
        0,
        1
      );
      const drift =
        fragment.kind === 'frame' ? 0.08 : fragment.kind === 'plate' ? 0.06 : 0.05;
      const scatterX =
        fragment.scatterPosition[0] +
        Math.sin(elapsed * (0.42 + fragment.phase * 0.02) + fragment.phase * 4.2) * drift;
      const scatterY =
        fragment.scatterPosition[1] +
        Math.cos(elapsed * (0.38 + fragment.phase * 0.018) + fragment.phase * 2.8) *
          drift *
          0.82;
      const scatterZ =
        fragment.scatterPosition[2] +
        Math.sin(elapsed * (0.34 + fragment.phase * 0.016) + fragment.phase * 3.1) *
          drift *
          0.74;
      const assembledX =
        fragment.assembledPosition[0] +
        Math.sin(elapsed * 0.72 + fragment.phase * 5.8) * 0.016 * (1 - alignTarget * 0.4);
      const assembledY =
        fragment.assembledPosition[1] +
        Math.cos(elapsed * 0.68 + fragment.phase * 3.8) * 0.014 * (1 - alignTarget * 0.4);
      const assembledZ =
        fragment.assembledPosition[2] +
        Math.sin(elapsed * 0.6 + fragment.phase * 2.6) * 0.012 * (1 - alignTarget * 0.5);
      const fieldOffsetX = pointer.currentX * (fragment.group === CORE_GROUP_INDEX ? 0.04 : 0.08);
      const fieldOffsetY = pointer.currentY * (fragment.group === CORE_GROUP_INDEX ? 0.03 : 0.06);
      const finalX = MathUtils.lerp(scatterX, assembledX, alignTarget) + fieldOffsetX * (1 - alignTarget);
      const finalY = MathUtils.lerp(scatterY, assembledY, alignTarget) + fieldOffsetY * (1 - alignTarget);
      const finalZ =
        MathUtils.lerp(scatterZ, assembledZ, alignTarget) +
        (system.reveal * 0.05 + system.phaseLift * 0.02) * (fragment.group === CORE_GROUP_INDEX ? 1 : 0.35);
      const rotationX = MathUtils.lerp(
        fragment.scatterRotation[0],
        fragment.assembledRotation[0],
        alignTarget
      );
      const rotationY = MathUtils.lerp(
        fragment.scatterRotation[1],
        fragment.assembledRotation[1],
        alignTarget
      );
      const rotationZ = MathUtils.lerp(
        fragment.scatterRotation[2],
        fragment.assembledRotation[2],
        alignTarget
      );
      const scale =
        MathUtils.lerp(fragment.scatterScale, fragment.assembledScale, alignTarget) +
        system.reveal * 0.02 +
        localFocus * 0.03;
      const groupRef = fragmentGroupRefs.current[index];
      const surfaceMaterial = surfaceMaterialRefs.current[index];
      const outlineMaterial = outlineMaterialRefs.current[index];
      const accentMaterial = accentMaterialRefs.current[index];

      fragmentPositionsRef.current[index].set(finalX, finalY, finalZ);
      groupSums[fragment.group].x += finalX;
      groupSums[fragment.group].y += finalY;
      groupSums[fragment.group].z += finalZ;
      groupCounts[fragment.group] += 1;

      if (groupRef) {
        groupRef.position.set(finalX, finalY, finalZ);
        groupRef.rotation.x = MathUtils.damp(groupRef.rotation.x, rotationX, 4.4, delta);
        groupRef.rotation.y = MathUtils.damp(groupRef.rotation.y, rotationY, 4.4, delta);
        groupRef.rotation.z = MathUtils.damp(groupRef.rotation.z, rotationZ, 4.4, delta);
        groupRef.scale.setScalar(scale);
      }

      if (surfaceMaterial) {
        const baseOpacity =
          fragment.kind === 'frame' ? 0.045 : fragment.kind === 'plate' ? 0.08 : 0.12;
        surfaceMaterial.opacity =
          baseOpacity +
          alignTarget * (fragment.kind === 'frame' ? 0.15 : fragment.kind === 'plate' ? 0.2 : 0.22) +
          system.reveal * 0.08;
        surfaceMaterial.emissiveIntensity =
          0.1 + alignTarget * 0.26 + groupFocus * 0.14 + system.reveal * 0.14;
      }

      if (outlineMaterial) {
        outlineMaterial.opacity =
          0.04 +
          alignTarget * (fragment.kind === 'frame' ? 0.42 : 0.22) +
          groupFocus * 0.08 +
          system.reveal * 0.05;
      }

      if (accentMaterial) {
        accentMaterial.opacity =
          0.05 +
          alignTarget * (fragment.kind === 'slat' ? 0.3 : 0.16) +
          anchorFocus * 0.08 +
          system.phaseLift * 0.04;
        accentMaterial.emissiveIntensity =
          0.08 + alignTarget * 0.18 + anchorFocus * 0.12 + system.reveal * 0.08;
      }
    });

    GROUP_DEFINITIONS.forEach((group, groupIndex) => {
      const center = groupCentersRef.current[groupIndex];

      if (groupCounts[groupIndex]) {
        center.set(
          groupSums[groupIndex].x / groupCounts[groupIndex],
          groupSums[groupIndex].y / groupCounts[groupIndex],
          groupSums[groupIndex].z / groupCounts[groupIndex]
        );
      } else {
        center.set(group.target[0], group.target[1], group.target[2]);
      }
    });

    TRACE_LINKS.forEach((link, index) => {
      const positionAttribute = tracePositionRefs.current[index];
      const material = traceMaterialRefs.current[index];
      const from = groupCentersRef.current[link.from];
      const to = groupCentersRef.current[link.to];
      const strength =
        Math.min(groupState[link.from], groupState[link.to]) * 0.52 +
        system.assembly * 0.12 +
        system.reveal * link.revealWeight;
      const positionArray = traceBuffers[index];

      positionArray[0] = from.x;
      positionArray[1] = from.y;
      positionArray[2] = from.z;
      positionArray[3] = to.x;
      positionArray[4] = to.y;
      positionArray[5] = to.z;

      if (positionAttribute) {
        positionAttribute.needsUpdate = true;
      }

      if (material) {
        material.opacity = compact ? strength * 0.18 : strength * 0.24;
      }
    });

    for (let slot = 0; slot < ANCHOR_VISUAL_SLOTS; slot += 1) {
      const anchor = activeAnchors[slot];
      const groupRef = anchorGroupRefs.current[slot];
      const outlineMaterial = anchorOutlineRefs.current[slot];
      const crossMaterial = anchorCrossRefs.current[slot];
      const planeMaterial = anchorPlaneRefs.current[slot];

      if (!groupRef || !outlineMaterial || !crossMaterial || !planeMaterial) {
        continue;
      }

      if (!anchor) {
        groupRef.visible = false;
        continue;
      }

      const center = groupCentersRef.current[anchor.groupIndex];
      const size = anchor.groupIndex === CORE_GROUP_INDEX ? 0.42 : 0.62;

      groupRef.visible = true;
      groupRef.position.copy(center);
      groupRef.rotation.x = Math.sin(elapsed * 0.24 + slot) * 0.18;
      groupRef.rotation.y = elapsed * 0.24 * (slot % 2 === 0 ? 1 : -1);
      groupRef.rotation.z = elapsed * 0.16 + slot * 0.14;
      groupRef.scale.setScalar(size + anchor.settle * 0.22 + anchor.strength * 0.06);
      outlineMaterial.opacity = 0.08 + anchor.strength * 0.22 + anchor.settle * 0.08;
      crossMaterial.opacity = 0.05 + anchor.strength * 0.14;
      planeMaterial.opacity = 0.02 + anchor.strength * 0.08;
    }

    if (revealGroupRef.current) {
      revealGroupRef.current.visible = system.reveal > 0.03;
      revealGroupRef.current.rotation.y += delta * (0.12 + system.reveal * 0.24);
      revealGroupRef.current.rotation.x = MathUtils.damp(
        revealGroupRef.current.rotation.x,
        0.18 + pointer.currentY * 0.06,
        3.2,
        delta
      );
      revealGroupRef.current.scale.setScalar(0.68 + system.reveal * 0.44 + system.phaseLift * 0.08);
      revealGroupRef.current.position.y = MathUtils.damp(
        revealGroupRef.current.position.y,
        0.04 + Math.sin(elapsed * 0.72) * 0.02,
        3.4,
        delta
      );
    }

    if (revealFrameRef.current) {
      revealFrameRef.current.material.opacity = 0.04 + system.reveal * 0.38;
    }

    if (revealFrameSecondaryRef.current) {
      revealFrameSecondaryRef.current.material.opacity = 0.03 + system.reveal * 0.22;
    }

    revealPlaneMaterials.current.forEach((material, index) => {
      if (!material) {
        return;
      }

      material.opacity =
        0.02 + system.reveal * (index === 0 ? 0.12 : 0.09) + system.phaseLift * 0.04;
    });

    if (revealCoreRef.current) {
      revealCoreRef.current.rotation.x += delta * (0.34 + system.reveal * 0.6);
      revealCoreRef.current.rotation.y += delta * (0.28 + system.reveal * 0.46);
      revealCoreRef.current.scale.setScalar(0.16 + system.reveal * 0.28 + system.phaseLift * 0.04);
    }

    if (revealCoreMaterialRef.current) {
      revealCoreMaterialRef.current.opacity = 0.08 + system.reveal * 0.24;
      revealCoreMaterialRef.current.emissiveIntensity = 0.18 + system.reveal * 0.44;
    }

    revealBraceRefs.current.forEach((brace, index) => {
      const material = revealBraceMaterials.current[index];

      if (!brace || !material) {
        return;
      }

      brace.rotation.z += delta * (index === 0 ? 0.26 : -0.22);
      brace.scale.setScalar(0.76 + system.reveal * 0.12);
      material.opacity = 0.03 + system.reveal * 0.16;
    });

    if (revealLightRef.current) {
      revealLightRef.current.intensity = 0.2 + system.reveal * 5.6 + system.phaseLift * 1.4;
    }

    if (rootRef.current) {
      rootRef.current.rotation.x = MathUtils.damp(
        rootRef.current.rotation.x,
        pointer.currentY * 0.1 + Math.sin(elapsed * 0.18) * 0.04,
        3.6,
        delta
      );
      rootRef.current.rotation.y = MathUtils.damp(
        rootRef.current.rotation.y,
        pointer.currentX * 0.14 + Math.cos(elapsed * 0.16) * 0.06,
        3.6,
        delta
      );
      rootRef.current.rotation.z = MathUtils.damp(
        rootRef.current.rotation.z,
        Math.sin(elapsed * 0.14) * 0.03 + system.reveal * 0.06,
        3.2,
        delta
      );
      rootRef.current.position.y = MathUtils.damp(
        rootRef.current.position.y,
        0.08 + Math.sin(elapsed * 0.52) * 0.04,
        3.2,
        delta
      );
      rootRef.current.scale.setScalar(1 + system.reveal * 0.03 + system.phaseLift * 0.02);
    }

    if (dustRef.current) {
      dustRef.current.rotation.y = elapsed * 0.018;
      dustRef.current.rotation.x = Math.sin(elapsed * 0.16) * 0.02;
      dustRef.current.position.x = MathUtils.lerp(dustRef.current.position.x, -pointer.currentX * 0.1, 0.04);
      dustRef.current.position.y = MathUtils.lerp(dustRef.current.position.y, -pointer.currentY * 0.08, 0.04);
    }
  });

  return (
    <>
      <ambientLight intensity={0.78} />
      <pointLight position={[3.2, 1.6, 3.6]} intensity={14} color="#5f95ff" />
      <pointLight position={[-3.1, -1.8, 2.2]} intensity={10} color="#8d67ff" />
      <spotLight position={[0, 2.8, 4.4]} intensity={9} angle={0.44} penumbra={0.9} color="#a6eaff" />

      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={dust} count={dust.length / 3} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          color="#d6efff"
          size={compact ? 0.018 : 0.024}
          transparent
          opacity={0.16}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      <group ref={rootRef}>
        {TRACE_LINKS.map((link, index) => (
          <lineSegments key={`trace-${link.from}-${link.to}`}>
            <bufferGeometry>
              <bufferAttribute
                ref={(attribute) => {
                  tracePositionRefs.current[index] = attribute;
                }}
                attach="attributes-position"
                array={traceBuffers[index]}
                count={2}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial
              ref={(material) => {
                traceMaterialRefs.current[index] = material;
              }}
              color={TONE_PALETTE[link.tone].outline}
              transparent
              opacity={0.08}
              blending={AdditiveBlending}
              depthWrite={false}
            />
          </lineSegments>
        ))}

        {FRAGMENT_DEFINITIONS.map((fragment, index) => {
          const palette = TONE_PALETTE[fragment.tone];

          return (
            <group
              key={fragment.id}
              ref={(element) => {
                fragmentGroupRefs.current[index] = element;
              }}
            >
              {fragment.kind === 'frame' && (
                <>
                  <mesh scale={[fragment.size[0] * 0.92, fragment.size[1] * 0.92, 1]}>
                    <planeGeometry args={[1, 1]} />
                    <meshPhysicalMaterial
                      ref={(material) => {
                        surfaceMaterialRefs.current[index] = material;
                      }}
                      color={palette.surface}
                      emissive={palette.emissive}
                      emissiveIntensity={0.16}
                      metalness={0.12}
                      roughness={0.2}
                      clearcoat={1}
                      clearcoatRoughness={0.08}
                      transparent
                      opacity={0.1}
                      side={DoubleSide}
                    />
                  </mesh>
                  <lineSegments scale={[fragment.size[0], fragment.size[1], 1]}>
                    <bufferGeometry>
                      <bufferAttribute
                        attach="attributes-position"
                        array={FRAME_OUTLINE}
                        count={FRAME_OUTLINE.length / 3}
                        itemSize={3}
                      />
                    </bufferGeometry>
                    <lineBasicMaterial
                      ref={(material) => {
                        outlineMaterialRefs.current[index] = material;
                      }}
                      color={palette.outline}
                      transparent
                      opacity={0.18}
                      depthWrite={false}
                      blending={AdditiveBlending}
                    />
                  </lineSegments>
                  <mesh position={[0, 0, 0.014]} scale={[fragment.size[0] * 0.08, fragment.size[1] * 0.84, fragment.size[2]]}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshPhysicalMaterial
                      ref={(material) => {
                        accentMaterialRefs.current[index] = material;
                      }}
                      color={palette.accent}
                      emissive={palette.emissive}
                      emissiveIntensity={0.12}
                      metalness={0.1}
                      roughness={0.22}
                      clearcoat={1}
                      clearcoatRoughness={0.08}
                      transparent
                      opacity={0.08}
                    />
                  </mesh>
                </>
              )}

              {fragment.kind === 'plate' && (
                <>
                  <mesh scale={[fragment.size[0], fragment.size[1], 1]}>
                    <planeGeometry args={[1, 1]} />
                    <meshPhysicalMaterial
                      ref={(material) => {
                        surfaceMaterialRefs.current[index] = material;
                      }}
                      color={palette.surface}
                      emissive={palette.emissive}
                      emissiveIntensity={0.14}
                      metalness={0.1}
                      roughness={0.22}
                      clearcoat={1}
                      clearcoatRoughness={0.08}
                      transparent
                      opacity={0.12}
                      side={DoubleSide}
                    />
                  </mesh>
                  <lineSegments scale={[fragment.size[0] * 0.88, fragment.size[1] * 0.88, 1]}>
                    <bufferGeometry>
                      <bufferAttribute
                        attach="attributes-position"
                        array={FRAME_OUTLINE}
                        count={FRAME_OUTLINE.length / 3}
                        itemSize={3}
                      />
                    </bufferGeometry>
                    <lineBasicMaterial
                      ref={(material) => {
                        outlineMaterialRefs.current[index] = material;
                      }}
                      color={palette.outline}
                      transparent
                      opacity={0.12}
                      depthWrite={false}
                      blending={AdditiveBlending}
                    />
                  </lineSegments>
                  <mesh position={[0, 0, 0.012]} scale={[fragment.size[0] * 0.78, fragment.size[1] * 0.08, fragment.size[2]]}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshPhysicalMaterial
                      ref={(material) => {
                        accentMaterialRefs.current[index] = material;
                      }}
                      color={palette.accent}
                      emissive={palette.emissive}
                      emissiveIntensity={0.1}
                      metalness={0.08}
                      roughness={0.24}
                      clearcoat={1}
                      clearcoatRoughness={0.08}
                      transparent
                      opacity={0.08}
                    />
                  </mesh>
                </>
              )}

              {fragment.kind === 'prism' && (
                <>
                  <mesh scale={fragment.size}>
                    <cylinderGeometry args={[0.5, 0.5, 1, 4]} />
                    <meshPhysicalMaterial
                      ref={(material) => {
                        surfaceMaterialRefs.current[index] = material;
                      }}
                      color={palette.surface}
                      emissive={palette.emissive}
                      emissiveIntensity={0.16}
                      metalness={0.14}
                      roughness={0.18}
                      clearcoat={1}
                      clearcoatRoughness={0.08}
                      transparent
                      opacity={0.14}
                    />
                  </mesh>
                  <lineSegments scale={[fragment.size[0] * 1.36, fragment.size[1] * 0.42, 1]} rotation={[0, 0, Math.PI / 4]}>
                    <bufferGeometry>
                      <bufferAttribute
                        attach="attributes-position"
                        array={FRAME_OUTLINE}
                        count={FRAME_OUTLINE.length / 3}
                        itemSize={3}
                      />
                    </bufferGeometry>
                    <lineBasicMaterial
                      ref={(material) => {
                        outlineMaterialRefs.current[index] = material;
                      }}
                      color={palette.outline}
                      transparent
                      opacity={0.08}
                      depthWrite={false}
                      blending={AdditiveBlending}
                    />
                  </lineSegments>
                  <mesh position={[0, 0, 0.016]} scale={[fragment.size[0] * 0.52, fragment.size[1] * 0.18, fragment.size[2] * 1.1]}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshPhysicalMaterial
                      ref={(material) => {
                        accentMaterialRefs.current[index] = material;
                      }}
                      color={palette.accent}
                      emissive={palette.emissive}
                      emissiveIntensity={0.12}
                      metalness={0.08}
                      roughness={0.22}
                      clearcoat={1}
                      clearcoatRoughness={0.08}
                      transparent
                      opacity={0.1}
                    />
                  </mesh>
                </>
              )}

              {fragment.kind === 'slat' && (
                <>
                  <mesh scale={fragment.size}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshPhysicalMaterial
                      ref={(material) => {
                        surfaceMaterialRefs.current[index] = material;
                      }}
                      color={palette.surface}
                      emissive={palette.emissive}
                      emissiveIntensity={0.12}
                      metalness={0.1}
                      roughness={0.22}
                      clearcoat={1}
                      clearcoatRoughness={0.08}
                      transparent
                      opacity={0.14}
                    />
                  </mesh>
                  <mesh position={[0, 0, 0.02]} scale={[fragment.size[0] * 0.4, fragment.size[1] * 0.78, fragment.size[2] * 1.08]}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshPhysicalMaterial
                      ref={(material) => {
                        accentMaterialRefs.current[index] = material;
                      }}
                      color={palette.accent}
                      emissive={palette.emissive}
                      emissiveIntensity={0.1}
                      metalness={0.08}
                      roughness={0.2}
                      clearcoat={1}
                      clearcoatRoughness={0.08}
                      transparent
                      opacity={0.1}
                    />
                  </mesh>
                </>
              )}
            </group>
          );
        })}

        {Array.from({ length: ANCHOR_VISUAL_SLOTS }).map((_, slot) => (
          <group
            key={`anchor-${slot}`}
            ref={(element) => {
              anchorGroupRefs.current[slot] = element;
            }}
          >
            <lineSegments>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  array={FRAME_OUTLINE}
                  count={FRAME_OUTLINE.length / 3}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial
                ref={(material) => {
                  anchorOutlineRefs.current[slot] = material;
                }}
                color="#e3f7ff"
                transparent
                opacity={0.14}
                depthWrite={false}
                blending={AdditiveBlending}
              />
            </lineSegments>
            <lineSegments rotation={[Math.PI / 2.9, 0, slot % 2 === 0 ? 0.18 : -0.18]} scale={[0.7, 0.7, 1]}>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  array={FRAME_OUTLINE}
                  count={FRAME_OUTLINE.length / 3}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial
                ref={(material) => {
                  anchorCrossRefs.current[slot] = material;
                }}
                color="#8ecfff"
                transparent
                opacity={0.1}
                depthWrite={false}
                blending={AdditiveBlending}
              />
            </lineSegments>
            <mesh scale={[0.72, 0.42, 1]}>
              <planeGeometry args={[1, 1]} />
              <meshBasicMaterial
                ref={(material) => {
                  anchorPlaneRefs.current[slot] = material;
                }}
                color={slot % 2 === 0 ? '#7a6dff' : '#6cc7ff'}
                transparent
                opacity={0.04}
                depthWrite={false}
                blending={AdditiveBlending}
                side={DoubleSide}
              />
            </mesh>
          </group>
        ))}

        <group ref={revealGroupRef}>
          <pointLight ref={revealLightRef} position={[0, 0, 0.1]} intensity={0.2} distance={3.6} color="#dff7ff" />

          <lineSegments ref={revealFrameRef} scale={[1.1, 1.5, 1]}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                array={FRAME_OUTLINE}
                count={FRAME_OUTLINE.length / 3}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial
              color="#effbff"
              transparent
              opacity={0.16}
              depthWrite={false}
              blending={AdditiveBlending}
            />
          </lineSegments>

          <lineSegments ref={revealFrameSecondaryRef} rotation={[0, 0, Math.PI / 10]} scale={[0.72, 0.98, 1]}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                array={FRAME_OUTLINE}
                count={FRAME_OUTLINE.length / 3}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial
              color="#8fd9ff"
              transparent
              opacity={0.12}
              depthWrite={false}
              blending={AdditiveBlending}
            />
          </lineSegments>

          {[0, 1].map((planeIndex) => (
            <mesh
              key={`reveal-plane-${planeIndex}`}
              rotation={
                planeIndex === 0
                  ? [Math.PI / 3.2, Math.PI / 4.3, 0.14]
                  : [-Math.PI / 2.8, -Math.PI / 5.1, -0.18]
              }
            >
              <planeGeometry args={planeIndex === 0 ? [1.16, 0.66] : [0.82, 1.04]} />
              <meshBasicMaterial
                ref={(material) => {
                  revealPlaneMaterials.current[planeIndex] = material;
                }}
                color={planeIndex === 0 ? '#8fd8ff' : '#957dff'}
                transparent
                opacity={0.04}
                blending={AdditiveBlending}
                depthWrite={false}
                side={DoubleSide}
              />
            </mesh>
          ))}

          <mesh ref={revealCoreRef}>
            <cylinderGeometry args={[0.24, 0.18, 1, 6]} />
            <meshPhysicalMaterial
              ref={revealCoreMaterialRef}
              color="#edf7ff"
              emissive="#8f78ff"
              emissiveIntensity={0.24}
              metalness={0.14}
              roughness={0.16}
              clearcoat={1}
              clearcoatRoughness={0.08}
              transparent
              opacity={0.16}
            />
          </mesh>

          {[0, 1].map((braceIndex) => (
            <mesh
              key={`reveal-brace-${braceIndex}`}
              ref={(element) => {
                revealBraceRefs.current[braceIndex] = element;
              }}
              position={braceIndex === 0 ? [0, 0.24, 0.12] : [0, -0.22, 0.08]}
              rotation={braceIndex === 0 ? [0, 0, Math.PI / 5.8] : [0, 0, -Math.PI / 6.2]}
            >
              <boxGeometry args={[0.78, 0.04, 0.12]} />
              <meshBasicMaterial
                ref={(material) => {
                  revealBraceMaterials.current[braceIndex] = material;
                }}
                color={braceIndex === 0 ? '#c7f1ff' : '#a190ff'}
                transparent
                opacity={0.08}
                depthWrite={false}
                blending={AdditiveBlending}
              />
            </mesh>
          ))}
        </group>
      </group>
    </>
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
    inside: false,
    lastPointerX: 0,
    lastPointerY: 0,
    clickQueue: []
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
    const pointer = interactionRef.current;

    pointer.targetX = x;
    pointer.targetY = y;
    pointer.speed = Math.min(
      1,
      Math.hypot(x - pointer.lastPointerX, y - pointer.lastPointerY) * 2.1
    );
    pointer.lastPointerX = x;
    pointer.lastPointerY = y;
    pointer.inside = true;

    updateSpotlight(((x + 1) / 2) * 100, ((1 - y) / 2) * 100, 1);
  };

  const handlePointerLeave = () => {
    const pointer = interactionRef.current;

    pointer.targetX = 0;
    pointer.targetY = 0;
    pointer.inside = false;
    updateSpotlight(50, 50, 0);
  };

  const handlePointerDown = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    const pointer = interactionRef.current;

    pointer.lastPointerX = x;
    pointer.lastPointerY = y;
    pointer.clickQueue.push({ x, y });
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
        dpr={mode.compact ? [1, 1.15] : [1, 1.65]}
        camera={{ position: [0, 0, 7.2], fov: mode.compact ? 42 : 34 }}
      >
        <AssemblyField key={mode.compact ? 'compact' : 'full'} compact={mode.compact} interaction={interactionRef} />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_28%,rgba(7,11,24,0.52)_100%)]" />
    </div>
  );
}
