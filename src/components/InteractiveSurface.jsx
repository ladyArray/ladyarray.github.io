import { useRef } from 'react';

function composeHandlers(internalHandler, externalHandler) {
  return (event) => {
    internalHandler?.(event);
    externalHandler?.(event);
  };
}

function supportsFinePointer() {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

function setDefaults(node) {
  node.style.setProperty('--surface-rx', '0deg');
  node.style.setProperty('--surface-ry', '0deg');
  node.style.setProperty('--surface-lift', '0px');
  node.style.setProperty('--spotlight-x', '50%');
  node.style.setProperty('--spotlight-y', '50%');
  node.style.setProperty('--surface-glow', '0');
  node.dataset.engaged = 'false';
}

export default function InteractiveSurface({
  as: Tag = 'div',
  className = '',
  intensity = 12,
  lift = 10,
  children,
  onPointerMove,
  onPointerEnter,
  onPointerLeave,
  onPointerDown,
  onPointerUp,
  ...props
}) {
  const surfaceRef = useRef(null);

  const updateSurface = (event) => {
    if (!supportsFinePointer()) {
      return;
    }

    const node = surfaceRef.current;

    if (!node) {
      return;
    }

    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * intensity;
    const rotateX = (0.5 - y) * intensity;

    node.style.setProperty('--surface-rx', `${rotateX.toFixed(2)}deg`);
    node.style.setProperty('--surface-ry', `${rotateY.toFixed(2)}deg`);
    node.style.setProperty('--surface-lift', `${(-lift).toFixed(2)}px`);
    node.style.setProperty('--spotlight-x', `${(x * 100).toFixed(2)}%`);
    node.style.setProperty('--spotlight-y', `${(y * 100).toFixed(2)}%`);
    node.style.setProperty('--surface-glow', '1');
    node.dataset.engaged = 'true';
  };

  const resetSurface = () => {
    const node = surfaceRef.current;

    if (!node) {
      return;
    }

    setDefaults(node);
  };

  const pressSurface = () => {
    if (!supportsFinePointer()) {
      return;
    }

    const node = surfaceRef.current;

    if (!node) {
      return;
    }

    node.style.setProperty('--surface-lift', `${(-lift * 0.45).toFixed(2)}px`);
  };

  return (
    <Tag
      ref={surfaceRef}
      className={`interactive-surface ${className}`.trim()}
      onPointerMove={composeHandlers(updateSurface, onPointerMove)}
      onPointerEnter={composeHandlers(updateSurface, onPointerEnter)}
      onPointerLeave={composeHandlers(resetSurface, onPointerLeave)}
      onPointerDown={composeHandlers(pressSurface, onPointerDown)}
      onPointerUp={composeHandlers(updateSurface, onPointerUp)}
      {...props}
    >
      {children}
    </Tag>
  );
}
