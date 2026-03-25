import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  AdditiveBlending,
  Color,
  DoubleSide,
  DynamicDrawUsage,
  MathUtils,
  Vector3
} from 'three';

const NODE_DEFINITIONS = [
  {
    id: 'apex-top',
    layer: 'shell',
    sensitive: 0.4,
    base: [0.04, 1.48, 0.16],
    aligned: [0, 1.24, 0.04],
    wobble: [0.04, 0.05, 0.03],
    phase: 0.15,
    scale: 0.08
  },
  {
    id: 'shoulder-right',
    layer: 'shell',
    sensitive: 1,
    base: [1.06, 0.8, 0.58],
    aligned: [0.9, 0.68, 0.22],
    wobble: [0.05, 0.04, 0.03],
    phase: 0.65,
    scale: 0.07
  },
  {
    id: 'shoulder-left',
    layer: 'shell',
    sensitive: 1,
    base: [-1.12, 0.72, 0.46],
    aligned: [-0.9, 0.68, 0.22],
    wobble: [0.05, 0.04, 0.03],
    phase: 0.98,
    scale: 0.07
  },
  {
    id: 'wing-right',
    layer: 'shell',
    sensitive: 0.75,
    base: [1.48, 0.08, -0.24],
    aligned: [1.14, 0.04, 0.02],
    wobble: [0.05, 0.03, 0.05],
    phase: 1.22,
    scale: 0.064
  },
  {
    id: 'wing-left',
    layer: 'shell',
    sensitive: 0.75,
    base: [-1.56, -0.02, -0.18],
    aligned: [-1.14, 0.02, 0.02],
    wobble: [0.05, 0.03, 0.05],
    phase: 1.42,
    scale: 0.064
  },
  {
    id: 'lower-right',
    layer: 'shell',
    sensitive: 0.92,
    base: [1.02, -0.82, 0.42],
    aligned: [0.82, -0.7, 0.18],
    wobble: [0.04, 0.05, 0.03],
    phase: 1.72,
    scale: 0.068
  },
  {
    id: 'lower-left',
    layer: 'shell',
    sensitive: 0.92,
    base: [-1.08, -0.88, 0.5],
    aligned: [-0.82, -0.7, 0.18],
    wobble: [0.04, 0.05, 0.03],
    phase: 1.98,
    scale: 0.068
  },
  {
    id: 'apex-bottom',
    layer: 'shell',
    sensitive: 0.45,
    base: [0.02, -1.52, 0.14],
    aligned: [0, -1.24, 0.02],
    wobble: [0.04, 0.05, 0.03],
    phase: 2.22,
    scale: 0.078
  },
  {
    id: 'back-upper',
    layer: 'shell',
    sensitive: 0.55,
    base: [0.22, 0.56, -1.02],
    aligned: [0.22, 0.42, -0.82],
    wobble: [0.04, 0.04, 0.05],
    phase: 2.68,
    scale: 0.06
  },
  {
    id: 'back-lower',
    layer: 'shell',
    sensitive: 0.55,
    base: [-0.18, -0.68, -1.14],
    aligned: [-0.22, -0.44, -0.84],
    wobble: [0.04, 0.04, 0.05],
    phase: 2.94,
    scale: 0.06
  },
  {
    id: 'bridge-top',
    layer: 'lattice',
    sensitive: 0.85,
    base: [0.02, 0.74, 0.08],
    aligned: [0, 0.76, 0.04],
    wobble: [0.03, 0.03, 0.03],
    phase: 3.1,
    scale: 0.058
  },
  {
    id: 'bridge-front',
    layer: 'lattice',
    sensitive: 1,
    base: [0.02, 0.18, 0.98],
    aligned: [0, 0.2, 0.76],
    wobble: [0.03, 0.03, 0.03],
    phase: 3.36,
    scale: 0.062
  },
  {
    id: 'bridge-bottom',
    layer: 'lattice',
    sensitive: 0.85,
    base: [0.02, -0.62, 0.1],
    aligned: [0, -0.66, 0.02],
    wobble: [0.03, 0.03, 0.03],
    phase: 3.62,
    scale: 0.058
  },
  {
    id: 'bridge-back',
    layer: 'lattice',
    sensitive: 0.86,
    base: [0.04, 0.02, -0.72],
    aligned: [0, 0, -0.54],
    wobble: [0.03, 0.03, 0.03],
    phase: 3.88,
    scale: 0.06
  },
  {
    id: 'brace-right',
    layer: 'lattice',
    sensitive: 0.66,
    base: [0.82, 0.02, 0.22],
    aligned: [0.64, 0.04, 0.16],
    wobble: [0.03, 0.02, 0.03],
    phase: 4.14,
    scale: 0.054
  },
  {
    id: 'brace-left',
    layer: 'lattice',
    sensitive: 0.66,
    base: [-0.82, -0.02, 0.18],
    aligned: [-0.64, 0.02, 0.16],
    wobble: [0.03, 0.02, 0.03],
    phase: 4.38,
    scale: 0.054
  },
  {
    id: 'core-top',
    layer: 'core',
    sensitive: 0.5,
    base: [0, 0.3, 0.02],
    aligned: [0, 0.36, 0.02],
    wobble: [0.02, 0.02, 0.02],
    phase: 4.72,
    scale: 0.05
  },
  {
    id: 'core-front-right',
    layer: 'core',
    sensitive: 0.55,
    base: [0.28, 0.1, 0.26],
    aligned: [0.24, 0.12, 0.18],
    wobble: [0.02, 0.02, 0.02],
    phase: 4.96,
    scale: 0.046
  },
  {
    id: 'core-front-left',
    layer: 'core',
    sensitive: 0.55,
    base: [-0.3, 0.08, 0.24],
    aligned: [-0.24, 0.12, 0.18],
    wobble: [0.02, 0.02, 0.02],
    phase: 5.24,
    scale: 0.046
  },
  {
    id: 'core-back-right',
    layer: 'core',
    sensitive: 0.55,
    base: [0.22, -0.08, -0.28],
    aligned: [0.2, -0.1, -0.18],
    wobble: [0.02, 0.02, 0.02],
    phase: 5.48,
    scale: 0.046
  },
  {
    id: 'core-back-left',
    layer: 'core',
    sensitive: 0.55,
    base: [-0.24, -0.1, -0.3],
    aligned: [-0.2, -0.1, -0.18],
    wobble: [0.02, 0.02, 0.02],
    phase: 5.74,
    scale: 0.046
  },
  {
    id: 'core-bottom',
    layer: 'core',
    sensitive: 0.5,
    base: [0, -0.34, 0],
    aligned: [0, -0.38, 0],
    wobble: [0.02, 0.02, 0.02],
    phase: 5.96,
    scale: 0.05
  }
];

const SHELL_EDGES = [
  [0, 1],
  [0, 2],
  [0, 8],
  [1, 3],
  [2, 4],
  [1, 10],
  [2, 10],
  [1, 11],
  [2, 11],
  [3, 5],
  [4, 6],
  [3, 8],
  [4, 8],
  [5, 7],
  [6, 7],
  [5, 9],
  [6, 9],
  [7, 9],
  [5, 12],
  [6, 12]
];

const LATTICE_EDGES = [
  [10, 11],
  [11, 12],
  [12, 13],
  [13, 10],
  [10, 14],
  [10, 15],
  [12, 14],
  [12, 15],
  [14, 3],
  [15, 4],
  [14, 11],
  [15, 11],
  [14, 13],
  [15, 13],
  [8, 13],
  [9, 13],
  [3, 11],
  [4, 11],
  [5, 14],
  [6, 15]
];

const CORE_EDGES = [
  [16, 17],
  [16, 18],
  [17, 18],
  [17, 19],
  [18, 20],
  [19, 20],
  [19, 21],
  [20, 21],
  [16, 13],
  [21, 12],
  [17, 11],
  [18, 11]
];

const ALL_EDGES = [...SHELL_EDGES, ...LATTICE_EDGES, ...CORE_EDGES];
const CORE_INDICES = [16, 17, 18, 19, 20, 21];
const SENSITIVE_INDICES = [1, 2, 5, 6, 10, 11, 12, 13];

const MODULE_DEFINITIONS = [
  {
    nodeIndex: 10,
    baseOffset: [0.34, 0.08, 0.12],
    alignedOffset: [0.42, 0, 0.04],
    baseRotation: [0.46, 0.38, 0.18],
    alignedRotation: [0.14, 0.04, 0.52],
    size: [0.36, 0.06, 0.18]
  },
  {
    nodeIndex: 11,
    baseOffset: [-0.28, 0.12, 0.2],
    alignedOffset: [-0.38, 0.02, 0.1],
    baseRotation: [0.32, -0.48, 0.24],
    alignedRotation: [0.12, 0.06, -0.42],
    size: [0.28, 0.05, 0.16]
  },
  {
    nodeIndex: 12,
    baseOffset: [0.26, -0.06, 0.14],
    alignedOffset: [0.34, -0.02, 0.02],
    baseRotation: [-0.26, 0.3, 0.36],
    alignedRotation: [0.1, -0.04, 0.38],
    size: [0.26, 0.05, 0.15]
  },
  {
    nodeIndex: 13,
    baseOffset: [-0.22, 0.02, -0.22],
    alignedOffset: [-0.3, 0, -0.12],
    baseRotation: [0.38, 0.22, -0.34],
    alignedRotation: [0.08, 0.18, 0.12],
    size: [0.3, 0.05, 0.14]
  },
  {
    nodeIndex: 14,
    baseOffset: [0.18, 0.12, 0.18],
    alignedOffset: [0.24, 0.04, 0.1],
    baseRotation: [0.18, 0.56, 0.24],
    alignedRotation: [0.08, 0.14, 0.56],
    size: [0.22, 0.04, 0.12]
  },
  {
    nodeIndex: 15,
    baseOffset: [-0.18, -0.08, 0.2],
    alignedOffset: [-0.24, 0.04, 0.1],
    baseRotation: [-0.28, -0.5, -0.18],
    alignedRotation: [0.06, -0.16, -0.54],
    size: [0.22, 0.04, 0.12]
  }
];

function createDustField(count, spread) {
  const positions = new Float32Array(count * 3);

  for (let index = 0; index < count; index += 1) {
    const radius = spread * (0.45 + Math.random() * 0.7);
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[index * 3 + 1] = radius * Math.cos(phi) * 0.76;
    positions[index * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
  }

  return positions;
}

function buildGraphDepths(count, edges) {
  const adjacency = Array.from({ length: count }, () => []);

  edges.forEach(([from, to]) => {
    adjacency[from].push(to);
    adjacency[to].push(from);
  });

  return Array.from({ length: count }, (_, start) => {
    const depths = new Array(count).fill(Infinity);
    const queue = [start];
    depths[start] = 0;

    while (queue.length) {
      const current = queue.shift();
      const currentDepth = depths[current];

      adjacency[current].forEach((next) => {
        if (depths[next] !== Infinity) {
          return;
        }

        depths[next] = currentDepth + 1;
        queue.push(next);
      });
    }

    return depths;
  });
}

const GRAPH_DEPTHS = buildGraphDepths(NODE_DEFINITIONS.length, ALL_EDGES);

function writeEdgeBuffers({ edges, positions, charges, posArray, colorArray, opacityBias, palette }) {
  const edgeColor = new Color();

  edges.forEach(([from, to], index) => {
    const fromPosition = positions[from];
    const toPosition = positions[to];
    const vertexIndex = index * 6;
    const colorIndex = index * 6;
    const energy =
      (charges[from] + charges[to]) * 0.5 +
      (NODE_DEFINITIONS[from].layer === 'core' || NODE_DEFINITIONS[to].layer === 'core' ? 0.16 : 0);

    posArray[vertexIndex] = fromPosition.x;
    posArray[vertexIndex + 1] = fromPosition.y;
    posArray[vertexIndex + 2] = fromPosition.z;
    posArray[vertexIndex + 3] = toPosition.x;
    posArray[vertexIndex + 4] = toPosition.y;
    posArray[vertexIndex + 5] = toPosition.z;

    edgeColor.copy(palette.base).lerp(palette.hot, Math.min(1, energy * 0.72 + opacityBias));

    colorArray[colorIndex] = edgeColor.r;
    colorArray[colorIndex + 1] = edgeColor.g;
    colorArray[colorIndex + 2] = edgeColor.b;
    colorArray[colorIndex + 3] = edgeColor.r;
    colorArray[colorIndex + 4] = edgeColor.g;
    colorArray[colorIndex + 5] = edgeColor.b;
  });
}

function StaticAura() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/20 blur-[86px]" />
      <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-cobalt/25 bg-cobalt/6 rotate-12" />
      <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-[1.6rem] border border-white/10 -rotate-12" />
      <div className="absolute inset-[16%] border border-white/[0.06] [clip-path:polygon(50%_0%,88%_22%,100%_54%,74%_100%,26%_100%,0%_54%,12%_22%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_35%),radial-gradient(circle_at_38%_28%,rgba(130,121,255,0.18),transparent_24%),radial-gradient(circle_at_68%_44%,rgba(55,168,255,0.16),transparent_22%)]" />
    </div>
  );
}

function ResonanceLattice({ compact, interaction }) {
  const rootRef = useRef(null);
  const dustRef = useRef(null);
  const nodeCoreRefs = useRef([]);
  const nodeGlowRefs = useRef([]);
  const nodeMaterials = useRef([]);
  const nodeGlowMaterials = useRef([]);
  const moduleRefs = useRef([]);
  const moduleMaterials = useRef([]);
  const chamberRef = useRef(null);
  const chamberPlaneMaterials = useRef([]);
  const shellPositionRef = useRef(null);
  const shellColorRef = useRef(null);
  const latticePositionRef = useRef(null);
  const latticeColorRef = useRef(null);
  const corePositionRef = useRef(null);
  const coreColorRef = useRef(null);
  const shellMaterialRef = useRef(null);
  const latticeMaterialRef = useRef(null);
  const coreMaterialRef = useRef(null);
  const [dust] = useState(() => createDustField(compact ? 110 : 180, compact ? 5.6 : 6.8));
  const [shellPositions] = useState(() => new Float32Array(SHELL_EDGES.length * 6));
  const [shellColors] = useState(() => new Float32Array(SHELL_EDGES.length * 6));
  const [latticePositions] = useState(() => new Float32Array(LATTICE_EDGES.length * 6));
  const [latticeColors] = useState(() => new Float32Array(LATTICE_EDGES.length * 6));
  const [corePositions] = useState(() => new Float32Array(CORE_EDGES.length * 6));
  const [coreColors] = useState(() => new Float32Array(CORE_EDGES.length * 6));
  const nodePositionsRef = useRef(NODE_DEFINITIONS.map(() => new Vector3()));
  const focusRef = useRef({
    primary: -1,
    secondary: -1,
    primaryStrength: 0,
    secondaryStrength: 0
  });
  const anchorsRef = useRef([]);
  const systemRef = useRef({
    memory: 0,
    memoryTarget: 0,
    structured: 0,
    chamber: 0,
    phaseFlash: 0,
    coreUnlocked: false
  });
  const tempVector = useMemo(() => new Vector3(), []);

  useEffect(() => {
    [
      shellPositionRef,
      shellColorRef,
      latticePositionRef,
      latticeColorRef,
      corePositionRef,
      coreColorRef
    ].forEach((ref) => ref.current?.setUsage(DynamicDrawUsage));
  }, []);

  useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime();
    const pointer = interaction.current;
    const system = systemRef.current;
    const positions = nodePositionsRef.current;

    pointer.currentX = MathUtils.lerp(pointer.currentX, pointer.targetX, 0.075);
    pointer.currentY = MathUtils.lerp(pointer.currentY, pointer.targetY, 0.075);
    pointer.speed = MathUtils.damp(pointer.speed, 0, 3.6, delta);
    pointer.field = MathUtils.lerp(pointer.field, pointer.inside ? 1 : 0, 0.05);
    pointer.dragX = MathUtils.damp(
      pointer.dragX,
      pointer.dragging ? pointer.dragTargetX : 0,
      5.2,
      delta
    );
    pointer.dragY = MathUtils.damp(
      pointer.dragY,
      pointer.dragging ? pointer.dragTargetY : 0,
      5.2,
      delta
    );
    pointer.dragTargetX = MathUtils.damp(pointer.dragTargetX, 0, 5.8, delta);
    pointer.dragTargetY = MathUtils.damp(pointer.dragTargetY, 0, 5.8, delta);

    system.memoryTarget = Math.max(0, system.memoryTarget - delta * 0.043);
    system.memory = MathUtils.damp(system.memory, system.memoryTarget, 2.8, delta);
    system.phaseFlash = Math.max(0, system.phaseFlash - delta * 1.05);

    const probe = tempVector.set(pointer.currentX * 1.8, pointer.currentY * 1.22, 0.2);
    const charges = new Array(NODE_DEFINITIONS.length).fill(0);

    anchorsRef.current = anchorsRef.current
      .map((anchor) => {
        const nextAge = anchor.age + delta;
        const strength = Math.max(0, 1 - nextAge / anchor.life);

        return {
          ...anchor,
          age: nextAge,
          strength,
          pulse: Math.max(0, anchor.pulse - delta * 1.45)
        };
      })
      .filter((anchor) => anchor.strength > 0.01);

    const activeAnchors = anchorsRef.current;

    if (pointer.clickQueue.length) {
      const queue = [...pointer.clickQueue];
      pointer.clickQueue.length = 0;

      queue.forEach((click) => {
        const allowCore = system.chamber > 0.54 && Math.hypot(click.x, click.y) < 0.42;
        let targetNode = focusRef.current.primary;
        let coreAnchor = false;

        if (allowCore) {
          coreAnchor = true;
          targetNode = CORE_INDICES.reduce((best, nodeIndex) => {
            const candidate = positions[nodeIndex];
            const distance = Math.hypot(candidate.x - click.x * 1.8, candidate.y - click.y * 1.22);
            const bestDistance = Math.hypot(
              positions[best].x - click.x * 1.8,
              positions[best].y - click.y * 1.22
            );

            return distance < bestDistance ? nodeIndex : best;
          }, CORE_INDICES[0]);
        } else if (targetNode < 0) {
          targetNode = SENSITIVE_INDICES.reduce((best, nodeIndex) => {
            const candidate = positions[nodeIndex];
            const distance = Math.hypot(candidate.x - click.x * 1.8, candidate.y - click.y * 1.22);
            const bestDistance = Math.hypot(
              positions[best].x - click.x * 1.8,
              positions[best].y - click.y * 1.22
            );

            return distance < bestDistance ? nodeIndex : best;
          }, SENSITIVE_INDICES[0]);
        }

        if (targetNode >= 0) {
          const existing = activeAnchors.find((anchor) => anchor.nodeIndex === targetNode);

          if (existing) {
            existing.age = 0;
            existing.strength = 1;
            existing.pulse = 1;
            existing.core = existing.core || coreAnchor;
            existing.life = coreAnchor ? 15 : 10.5;
          } else {
            activeAnchors.unshift({
              nodeIndex: targetNode,
              strength: 1,
              age: 0,
              pulse: 1,
              life: coreAnchor ? 15 : 10.5,
              core: coreAnchor
            });
          }

          if (activeAnchors.length > 4) {
            activeAnchors.length = 4;
          }

          system.memoryTarget = Math.min(1, system.memoryTarget + (coreAnchor ? 0.34 : 0.18));
          system.phaseFlash = Math.min(1, system.phaseFlash + (coreAnchor ? 0.9 : 0.45));
        }
      });
    }

    const pointerPresence = Math.max(pointer.field * 0.55, Math.min(pointer.speed * 1.1, 0.45));
    const anchorPresence = activeAnchors.reduce(
      (sum, anchor) => sum + anchor.strength * (anchor.core ? 0.22 : 0.16),
      0
    );
    const anchorCoreActive = activeAnchors.some((anchor) => anchor.core);
    const structuredTarget = Math.min(
      1,
      system.memory * 0.84 + anchorPresence * 0.68 + (anchorCoreActive ? 0.24 : 0)
    );
    const chamberTarget = MathUtils.clamp((structuredTarget - 0.34) / 0.4, 0, 1);

    system.structured = MathUtils.damp(system.structured, structuredTarget, 2.6, delta);
    system.chamber = MathUtils.damp(system.chamber, chamberTarget, 2.2, delta);
    system.coreUnlocked = system.chamber > 0.48;

    let bestIndex = -1;
    let bestScore = 0;
    let secondIndex = -1;
    let secondScore = 0;

    NODE_DEFINITIONS.forEach((node, index) => {
      const base = node.base;
      const wobbleX = Math.sin(elapsed * 0.72 + node.phase) * node.wobble[0];
      const wobbleY = Math.cos(elapsed * 0.68 + node.phase * 1.1) * node.wobble[1];
      const pointerDistance = Math.hypot(base[0] + wobbleX - probe.x, base[1] + wobbleY - probe.y);
      const localFocus = Math.max(0, 1 - pointerDistance / (node.layer === 'core' ? 0.5 : 0.82));
      const selectiveFocus =
        localFocus *
        node.sensitive *
        (node.layer === 'core' ? MathUtils.clamp((system.chamber - 0.36) / 0.5, 0, 1) : 1);

      if (selectiveFocus > bestScore) {
        secondScore = bestScore;
        secondIndex = bestIndex;
        bestScore = selectiveFocus;
        bestIndex = index;
      } else if (selectiveFocus > secondScore) {
        secondScore = selectiveFocus;
        secondIndex = index;
      }

      let graphCharge = selectiveFocus * 0.75;

      activeAnchors.forEach((anchor) => {
        const depth = GRAPH_DEPTHS[anchor.nodeIndex][index];

        if (depth === Infinity) {
          return;
        }

        const falloff = Math.exp(-depth * (anchor.core ? 0.58 : 0.84));
        graphCharge += anchor.strength * falloff * (anchor.core ? 1.18 : 0.84);
      });

      charges[index] = graphCharge;
    });

    focusRef.current.primary = bestIndex;
    focusRef.current.secondary = secondIndex;
    focusRef.current.primaryStrength = bestScore;
    focusRef.current.secondaryStrength = secondScore;

    NODE_DEFINITIONS.forEach((node, index) => {
      const charge = charges[index];
      const base = node.base;
      const aligned = node.aligned;
      const wobbleX = Math.sin(elapsed * 0.72 + node.phase) * node.wobble[0];
      const wobbleY = Math.cos(elapsed * 0.68 + node.phase * 1.1) * node.wobble[1];
      const wobbleZ = Math.sin(elapsed * 0.58 + node.phase * 1.3) * node.wobble[2];
      const basePosition = positions[index];
      const structureMix =
        node.layer === 'core'
          ? system.chamber
          : node.layer === 'lattice'
            ? system.structured * 0.88
            : system.structured * 0.58;
      const targetX = MathUtils.lerp(base[0] + wobbleX, aligned[0], structureMix);
      const targetY = MathUtils.lerp(base[1] + wobbleY, aligned[1], structureMix);
      const targetZ = MathUtils.lerp(base[2] + wobbleZ, aligned[2], structureMix);
      const pullX = (probe.x - targetX) * Math.min(0.16, charge * 0.05) * node.sensitive;
      const pullY = (probe.y - targetY) * Math.min(0.16, charge * 0.05) * node.sensitive;
      const ripple = Math.sin(elapsed * 3.2 + node.phase + charge * 1.4) * 0.03 * Math.min(1, charge);
      const chamberVisibility = node.layer === 'core' ? system.chamber : 1;
      const finalX = targetX + pullX + ripple * 0.8;
      const finalY = targetY + pullY + ripple;
      const finalZ = targetZ + ripple * 0.45 + (node.layer === 'core' ? chamberVisibility * 0.08 : 0);

      basePosition.set(finalX, finalY, finalZ);

      const coreMesh = nodeCoreRefs.current[index];
      const glowMesh = nodeGlowRefs.current[index];
      const material = nodeMaterials.current[index];
      const glowMaterial = nodeGlowMaterials.current[index];
      const visibleEnergy = Math.min(1, charge * 0.72 + pointerPresence * 0.26 + system.phaseFlash * 0.3);
      const baseScale =
        node.scale * (node.layer === 'core' ? 1 + system.chamber * 0.28 : 1 + system.structured * 0.08);
      const scale = baseScale * (1 + visibleEnergy * 0.72);

      if (coreMesh && material) {
        coreMesh.position.copy(basePosition);
        coreMesh.scale.setScalar(scale);
        coreMesh.visible = chamberVisibility > 0.04;
        material.opacity = (node.layer === 'core' ? 0.18 + system.chamber * 0.7 : 0.65) * chamberVisibility;
        material.emissiveIntensity =
          (node.layer === 'core' ? 0.34 + system.chamber * 0.52 : 0.24) +
          visibleEnergy * 0.54;
      }

      if (glowMesh && glowMaterial) {
        glowMesh.position.copy(basePosition);
        glowMesh.scale.setScalar(scale * (node.layer === 'core' ? 2.8 : 2.35));
        glowMesh.visible = chamberVisibility > 0.04;
        glowMaterial.opacity =
          (node.layer === 'core' ? 0.08 + system.chamber * 0.14 : 0.05) +
          visibleEnergy * 0.12;
      }
    });

    MODULE_DEFINITIONS.forEach((module, index) => {
      const mesh = moduleRefs.current[index];
      const material = moduleMaterials.current[index];
      const nodePosition = positions[module.nodeIndex];

      if (!mesh || !material) {
        return;
      }

      const charge = charges[module.nodeIndex];
      const align = MathUtils.clamp(system.structured * 1.12, 0, 1);
      const offsetX = MathUtils.lerp(module.baseOffset[0], module.alignedOffset[0], align);
      const offsetY = MathUtils.lerp(module.baseOffset[1], module.alignedOffset[1], align);
      const offsetZ = MathUtils.lerp(module.baseOffset[2], module.alignedOffset[2], align);

      mesh.position.set(nodePosition.x + offsetX, nodePosition.y + offsetY, nodePosition.z + offsetZ);
      mesh.rotation.x = MathUtils.lerp(module.baseRotation[0], module.alignedRotation[0], align) + charge * 0.16;
      mesh.rotation.y = MathUtils.lerp(module.baseRotation[1], module.alignedRotation[1], align) + charge * 0.1;
      mesh.rotation.z = MathUtils.lerp(module.baseRotation[2], module.alignedRotation[2], align) + charge * 0.08;
      mesh.scale.setScalar(1 + charge * 0.26 + system.phaseFlash * 0.12);
      mesh.visible = !compact || index < 4;

      material.opacity = 0.08 + align * 0.16 + charge * 0.12;
      material.emissiveIntensity = 0.08 + charge * 0.2 + system.phaseFlash * 0.12;
    });

    if (rootRef.current) {
      rootRef.current.rotation.x = MathUtils.damp(
        rootRef.current.rotation.x,
        pointer.dragY * 0.38 + pointer.currentY * 0.12 + Math.sin(elapsed * 0.24) * 0.06,
        4.2,
        delta
      );
      rootRef.current.rotation.y = MathUtils.damp(
        rootRef.current.rotation.y,
        pointer.dragX * 0.48 + pointer.currentX * 0.16 + Math.cos(elapsed * 0.22) * 0.08,
        4.2,
        delta
      );
      rootRef.current.rotation.z = MathUtils.damp(
        rootRef.current.rotation.z,
        Math.sin(elapsed * 0.18) * 0.04 + system.phaseFlash * 0.08,
        3.2,
        delta
      );
      rootRef.current.position.y = MathUtils.damp(
        rootRef.current.position.y,
        0.08 + Math.sin(elapsed * 0.64) * 0.04,
        3.6,
        delta
      );
    }

    if (chamberRef.current) {
      chamberRef.current.rotation.y += delta * (0.18 + system.chamber * 0.26);
      chamberRef.current.rotation.x = MathUtils.damp(
        chamberRef.current.rotation.x,
        0.18 + pointer.currentY * 0.08,
        3.2,
        delta
      );
      chamberRef.current.visible = system.chamber > 0.04;
      chamberRef.current.scale.setScalar(0.82 + system.chamber * 0.34 + system.phaseFlash * 0.12);
    }

    chamberPlaneMaterials.current.forEach((material, index) => {
      if (!material) {
        return;
      }

      material.opacity = 0.02 + system.chamber * (index === 0 ? 0.11 : 0.08) + system.phaseFlash * 0.05;
    });

    if (dustRef.current) {
      dustRef.current.rotation.y = elapsed * 0.025;
      dustRef.current.rotation.x = Math.sin(elapsed * 0.18) * 0.03;
      dustRef.current.position.x = MathUtils.lerp(dustRef.current.position.x, -pointer.currentX * 0.18, 0.05);
      dustRef.current.position.y = MathUtils.lerp(dustRef.current.position.y, -pointer.currentY * 0.12, 0.05);
    }

    writeEdgeBuffers({
      edges: SHELL_EDGES,
      positions,
      charges,
      posArray: shellPositions,
      colorArray: shellColors,
      opacityBias: 0.08 + system.structured * 0.12,
      palette: {
        base: new Color('#6d67ff'),
        hot: new Color('#bdefff')
      }
    });

    writeEdgeBuffers({
      edges: LATTICE_EDGES,
      positions,
      charges,
      posArray: latticePositions,
      colorArray: latticeColors,
      opacityBias: 0.14 + system.structured * 0.18,
      palette: {
        base: new Color('#4f94ff'),
        hot: new Color('#d8f4ff')
      }
    });

    writeEdgeBuffers({
      edges: CORE_EDGES,
      positions,
      charges,
      posArray: corePositions,
      colorArray: coreColors,
      opacityBias: 0.22 + system.chamber * 0.28,
      palette: {
        base: new Color('#8f78ff'),
        hot: new Color('#f6fbff')
      }
    });

    if (shellPositionRef.current) {
      shellPositionRef.current.needsUpdate = true;
    }

    if (shellColorRef.current) {
      shellColorRef.current.needsUpdate = true;
    }

    if (latticePositionRef.current) {
      latticePositionRef.current.needsUpdate = true;
    }

    if (latticeColorRef.current) {
      latticeColorRef.current.needsUpdate = true;
    }

    if (corePositionRef.current) {
      corePositionRef.current.needsUpdate = true;
    }

    if (coreColorRef.current) {
      coreColorRef.current.needsUpdate = true;
    }

    if (shellMaterialRef.current) {
      shellMaterialRef.current.opacity = 0.16 + pointerPresence * 0.16 + system.structured * 0.14;
    }

    if (latticeMaterialRef.current) {
      latticeMaterialRef.current.opacity = 0.22 + pointerPresence * 0.16 + system.structured * 0.2;
    }

    if (coreMaterialRef.current) {
      coreMaterialRef.current.opacity = 0.04 + system.chamber * 0.38 + system.phaseFlash * 0.08;
    }
  });

  return (
    <>
      <ambientLight intensity={0.9} />
      <pointLight position={[2.8, 1.9, 3.2]} intensity={18} color="#5f93ff" />
      <pointLight position={[-3, -1.8, 2]} intensity={14} color="#8a63ff" />
      <pointLight position={[0, 0.5, 2.5]} intensity={8} color="#e6f3ff" />
      <spotLight position={[0, 2.6, 3.8]} intensity={12} angle={0.44} penumbra={0.85} color="#86d7ff" />

      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={dust} count={dust.length / 3} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          color="#b6ddff"
          size={compact ? 0.022 : 0.028}
          transparent
          opacity={0.22}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      <group ref={rootRef}>
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute
              ref={shellPositionRef}
              attach="attributes-position"
              array={shellPositions}
              count={shellPositions.length / 3}
              itemSize={3}
            />
            <bufferAttribute
              ref={shellColorRef}
              attach="attributes-color"
              array={shellColors}
              count={shellColors.length / 3}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            ref={shellMaterialRef}
            vertexColors
            transparent
            opacity={0.2}
            depthWrite={false}
            blending={AdditiveBlending}
          />
        </lineSegments>

        <lineSegments>
          <bufferGeometry>
            <bufferAttribute
              ref={latticePositionRef}
              attach="attributes-position"
              array={latticePositions}
              count={latticePositions.length / 3}
              itemSize={3}
            />
            <bufferAttribute
              ref={latticeColorRef}
              attach="attributes-color"
              array={latticeColors}
              count={latticeColors.length / 3}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            ref={latticeMaterialRef}
            vertexColors
            transparent
            opacity={0.28}
            depthWrite={false}
            blending={AdditiveBlending}
          />
        </lineSegments>

        <lineSegments>
          <bufferGeometry>
            <bufferAttribute
              ref={corePositionRef}
              attach="attributes-position"
              array={corePositions}
              count={corePositions.length / 3}
              itemSize={3}
            />
            <bufferAttribute
              ref={coreColorRef}
              attach="attributes-color"
              array={coreColors}
              count={coreColors.length / 3}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            ref={coreMaterialRef}
            vertexColors
            transparent
            opacity={0.08}
            depthWrite={false}
            blending={AdditiveBlending}
          />
        </lineSegments>

        <group ref={chamberRef}>
          {[0, 1].map((planeIndex) => (
            <mesh
              key={planeIndex}
              rotation={planeIndex === 0 ? [Math.PI / 3.2, Math.PI / 4.3, 0.12] : [-Math.PI / 2.7, -Math.PI / 5.2, -0.18]}
            >
              <planeGeometry args={[1.26, 0.76]} />
              <meshBasicMaterial
                ref={(material) => {
                  chamberPlaneMaterials.current[planeIndex] = material;
                }}
                color={planeIndex === 0 ? '#82d6ff' : '#9778ff'}
                transparent
                opacity={0.04}
                blending={AdditiveBlending}
                depthWrite={false}
                side={DoubleSide}
              />
            </mesh>
          ))}
        </group>

        {MODULE_DEFINITIONS.map((module, index) => (
          <mesh
            key={`module-${index}`}
            ref={(element) => {
              moduleRefs.current[index] = element;
            }}
          >
            <boxGeometry args={module.size} />
            <meshPhysicalMaterial
              ref={(material) => {
                moduleMaterials.current[index] = material;
              }}
              color={index % 2 === 0 ? '#82d6ff' : '#9b7eff'}
              emissive={index % 2 === 0 ? '#2f92ff' : '#6e4cff'}
              emissiveIntensity={0.12}
              metalness={0.18}
              roughness={0.2}
              clearcoat={1}
              clearcoatRoughness={0.08}
              transparent
              opacity={0.14}
            />
          </mesh>
        ))}

        {NODE_DEFINITIONS.map((node, index) => (
          <group key={node.id}>
            <mesh
              ref={(element) => {
                nodeGlowRefs.current[index] = element;
              }}
            >
              <sphereGeometry args={[1, 18, 18]} />
              <meshBasicMaterial
                ref={(material) => {
                  nodeGlowMaterials.current[index] = material;
                }}
                color={node.layer === 'core' ? '#a48aff' : '#7fdcff'}
                transparent
                opacity={0.08}
                depthWrite={false}
                blending={AdditiveBlending}
              />
            </mesh>

            <mesh
              ref={(element) => {
                nodeCoreRefs.current[index] = element;
              }}
            >
              {node.layer === 'core' ? (
                <octahedronGeometry args={[1, 0]} />
              ) : node.layer === 'lattice' ? (
                <icosahedronGeometry args={[1, 0]} />
              ) : (
                <sphereGeometry args={[1, 14, 14]} />
              )}
              <meshStandardMaterial
                ref={(material) => {
                  nodeMaterials.current[index] = material;
                }}
                color={node.layer === 'core' ? '#dfd6ff' : '#edf4ff'}
                emissive={node.layer === 'core' ? '#7d5cff' : '#2799ff'}
                emissiveIntensity={0.28}
                roughness={0.22}
                metalness={0.12}
                transparent
                opacity={0.72}
              />
            </mesh>
          </group>
        ))}
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
    field: 0,
    dragX: 0,
    dragY: 0,
    dragTargetX: 0,
    dragTargetY: 0,
    dragging: false,
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

    if (pointer.dragging) {
      const deltaX = x - pointer.lastPointerX;
      const deltaY = y - pointer.lastPointerY;

      pointer.dragTargetX = MathUtils.clamp(pointer.dragTargetX + deltaX * 0.9, -1, 1);
      pointer.dragTargetY = MathUtils.clamp(pointer.dragTargetY + deltaY * 0.8, -1, 1);
    }

    pointer.targetX = x;
    pointer.targetY = y;
    pointer.speed = Math.min(
      1.2,
      Math.hypot(x - pointer.lastPointerX, y - pointer.lastPointerY) * 2.2
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
    pointer.dragging = false;
    updateSpotlight(50, 50, 0);
  };

  const handlePointerDown = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    const pointer = interactionRef.current;

    pointer.dragging = true;
    pointer.lastPointerX = x;
    pointer.lastPointerY = y;
    pointer.clickQueue.push({ x, y });
  };

  const handlePointerUp = () => {
    interactionRef.current.dragging = false;
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
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <Canvas
        dpr={mode.compact ? [1, 1.2] : [1, 1.7]}
        camera={{ position: [0, 0, 6.7], fov: mode.compact ? 42 : 34 }}
      >
        <ResonanceLattice
          key={mode.compact ? 'compact' : 'full'}
          compact={mode.compact}
          interaction={interactionRef}
        />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_26%,rgba(7,11,24,0.52)_100%)]" />
    </div>
  );
}
