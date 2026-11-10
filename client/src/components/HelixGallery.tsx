'use client';

import React, {
  CSSProperties,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import './HelixGallery.css';

export interface HelixGalleryItem {
  src: string;
  alt?: string;
  title?: string;
  subtitle?: string;
  href?: string;
}

export interface HelixGalleryProps {
  items?: HelixGalleryItem[];
  arms?: number;
  perTurn?: number;
  pitch?: number;
  centerDensity?: number;
  centerFade?: number;
  cardSize?: number;
  roundness?: number;
  tilt?: number;
  rotation?: number;
  direction?: 'counterclockwise' | 'clockwise';
  speed?: number;
  centerX?: number;
  centerY?: number;
  shadow?: number;
  backgroundColor?: string;
  openOnClick?: boolean;
  captions?: boolean;
  draggable?: boolean;
  wheel?: boolean;
  pauseOnHover?: boolean;
  interactive?: boolean;
  paused?: boolean;
  dpr?: number;
  ariaLabel?: string;
  onOpen?: (item: HelixGalleryItem | null, index: number) => void;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const DEFAULT_ITEMS: HelixGalleryItem[] = [
  {
    src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    title: 'Brand Tokens v2.4',
    subtitle: 'System Architecture',
  },
  {
    src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
    title: 'Executive Analytics',
    subtitle: 'SaaS Platform UX',
  },
  {
    src: '/assets/abhinav-D5oDz_17.png',
    title: 'Design Director',
    subtitle: 'Weekly Live Sprints',
  },
  {
    src: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80',
    title: 'Motion Kinetics',
    subtitle: 'Creative Direction',
  },
  {
    src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
    title: 'Production Code',
    subtitle: 'Next.js 15 & TypeScript',
  },
  {
    src: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
    title: 'Zero-Trust Security',
    subtitle: 'Discrete Authority Gating',
  },
  {
    src: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80',
    title: 'Tactile Physicality',
    subtitle: 'High-Craft Aesthetics',
  },
  {
    src: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=600&auto=format&fit=crop&q=80',
    title: 'Conversion Engine',
    subtitle: 'A/B Funnel Optimization',
  },
];

export default function HelixGallery({
  items = DEFAULT_ITEMS,
  arms = 1,
  perTurn = 18,
  pitch = 7,
  centerDensity = 1.3,
  centerFade = 0.5,
  cardSize = 0.28,
  roundness = 0.22,
  tilt = 1,
  rotation = 0,
  direction = 'counterclockwise',
  speed = 0.35,
  centerX = 0.5,
  centerY = 0.5,
  shadow = 0.5,
  backgroundColor = 'transparent',
  openOnClick = true,
  captions = true,
  draggable = true,
  wheel = true,
  pauseOnHover = true,
  interactive = true,
  paused = false,
  ariaLabel = 'Spiral gallery of design deliverables spiraling from a dense core',
  onOpen,
  children,
  className = '',
  style,
}: HelixGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 700 });
  const [activeItem, setActiveItem] = useState<{ item: HelixGalleryItem; index: number } | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);
  const isDraggingRef = useRef(false);
  const lastPointerRef = useRef({ x: 0, y: 0, angle: 0 });
  const animFrameRef = useRef<number>(0);

  // Resize observer
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const updateSize = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setDimensions({ width: rect.width, height: rect.height });
      }
    };
    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Main animation ticker
  useEffect(() => {
    let lastTime = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      if (!activeItem) {
        if (!isDraggingRef.current) {
          // Inertia damping
          velocityRef.current *= Math.pow(0.92, dt * 60);

          // Natural constant flow
          if (!paused && !(pauseOnHover && isHovered)) {
            const dirMultiplier = direction === 'clockwise' ? 1 : -1;
            velocityRef.current += speed * dirMultiplier * dt;
          }
        }
        offsetRef.current += velocityRef.current;
      }

      // Trigger re-render smoothly
      setRenderTrigger(offsetRef.current);
      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [paused, pauseOnHover, isHovered, speed, direction, activeItem]);

  const [, setRenderTrigger] = useState(0);

  // Drag handling around spiral center
  const getPointerAngle = useCallback(
    (clientX: number, clientY: number) => {
      if (!containerRef.current) return 0;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width * centerX;
      const cy = rect.top + rect.height * centerY;
      return Math.atan2(clientY - cy, clientX - cx);
    },
    [centerX, centerY]
  );

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!draggable || !interactive || activeItem) return;
    isDraggingRef.current = true;
    lastPointerRef.current = {
      x: e.clientX,
      y: e.clientY,
      angle: getPointerAngle(e.clientX, e.clientY),
    };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || activeItem) return;
    const currentAngle = getPointerAngle(e.clientX, e.clientY);
    let deltaAngle = currentAngle - lastPointerRef.current.angle;

    // Handle wrapping across -PI / +PI boundary
    if (deltaAngle > Math.PI) deltaAngle -= Math.PI * 2;
    if (deltaAngle < -Math.PI) deltaAngle += Math.PI * 2;

    const deltaPhotos = (deltaAngle / (Math.PI * 2)) * perTurn;
    offsetRef.current += deltaPhotos;
    velocityRef.current = deltaPhotos * 0.4;

    lastPointerRef.current = {
      x: e.clientX,
      y: e.clientY,
      angle: currentAngle,
    };
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  // Wheel handling: one photo per notch
  const handleWheel = (e: React.WheelEvent) => {
    if (!wheel || !interactive || activeItem) return;
    e.preventDefault();
    const delta = Math.sign(e.deltaY || e.deltaX) * 0.45;
    velocityRef.current += delta;
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!interactive) return;
    if (e.key === 'Escape' && activeItem) {
      closeItem();
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      offsetRef.current += 1;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      offsetRef.current -= 1;
    }
  };

  const openItem = (item: HelixGalleryItem, index: number) => {
    if (!openOnClick) return;
    setActiveItem({ item, index });
    onOpen?.(item, index);
  };

  const closeItem = () => {
    setActiveItem(null);
    onOpen?.(null, -1);
  };

  // Calculate position along the logarithmic helix
  const cx = dimensions.width * centerX;
  const cy = dimensions.height * centerY;
  const maxRadius = Math.max(dimensions.width, dimensions.height) * 0.72;
  const totalTurns = 3.5;
  const totalPhotos = Math.round(perTurn * totalTurns * arms);

  const photoElements: ReactNode[] = [];

  for (let i = 0; i < totalPhotos; i++) {
    const itemIndex = i % items.length;
    const item = items[itemIndex];

    // Effective index with offset and arms interleaving
    const armIndex = i % arms;
    const armOffsetAngle = (armIndex * (Math.PI * 2)) / arms;
    const photoProg = (i / arms + offsetRef.current) / perTurn;

    // Angle theta in radians
    const theta = photoProg * Math.PI * 2 + armOffsetAngle + (rotation * Math.PI) / 180;

    // Radius scaling with centerDensity
    // When centerDensity > 1, photos cluster tightly at center and expand outward
    const normalizedTurn = (photoProg % totalTurns + totalTurns) % totalTurns;
    const progress = normalizedTurn / totalTurns;

    // Power curve for dense core: r = maxR * progress^centerDensity
    const r = Math.max(16, maxRadius * Math.pow(progress, centerDensity));

    const x = cx + r * Math.cos(theta);
    const y = cy + r * Math.sin(theta);

    // Card sizing grows with distance from core
    const cardW = Math.max(38, Math.min(220, r * cardSize));
    const cardH = cardW * 1.32;

    // Tilt card tangent to spiral or toward center
    const cardRotation = (theta * 180) / Math.PI + 90 * tilt;

    // Opacity fade across centerFade
    const fadeDistance = maxRadius * centerFade * 0.45;
    const opacity = Math.min(1, Math.max(0, (r - 20) / fadeDistance));

    // Depth z-index
    const zIndex = Math.round(r * 10);

    const isCurrentActive = activeItem?.index === itemIndex && activeItem?.item === item;

    if (opacity > 0.05 && x > -cardW && x < dimensions.width + cardW && y > -cardH && y < dimensions.height + cardH) {
      photoElements.push(
        <div
          key={`helix-node-${i}`}
          className={`helix-photo-node ${isCurrentActive ? 'is-active' : ''}`}
          style={{
            transform: `translate3d(${x - cardW / 2}px, ${y - cardH / 2}px, 0) rotate(${cardRotation}deg)`,
            width: `${cardW}px`,
            height: `${cardH}px`,
            borderRadius: `${cardW * roundness}px`,
            opacity: activeItem ? (isCurrentActive ? 0 : 0.15) : opacity,
            zIndex,
            boxShadow: `0 ${Math.round(cardW * 0.12)}px ${Math.round(cardW * 0.28)}px rgba(0, 0, 0, ${shadow * 0.6})`,
            pointerEvents: opacity < 0.3 || activeItem ? 'none' : 'auto',
          }}
          onClick={(e) => {
            e.stopPropagation();
            openItem(item, itemIndex);
          }}
          role="button"
          tabIndex={0}
          aria-label={item.title || item.alt || 'Gallery photo'}
        >
          <img
            src={item.src}
            alt={item.alt || item.title || 'Helix gallery image'}
            className="helix-photo-img"
            loading="lazy"
            crossOrigin="anonymous"
          />
          <div className="helix-photo-sheen" />
        </div>
      );
    }
  }

  return (
    <div
      ref={containerRef}
      className={`helix-gallery-root ${className}`}
      style={{ backgroundColor, ...style }}
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onWheel={handleWheel}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Helix Canvas Field */}
      <div className="helix-spiral-canvas" aria-hidden="true">
        {photoElements}
      </div>

      {/* Centered Children Layer (Fades when a photo is open) */}
      <div className={`helix-center-content ${activeItem ? 'is-faded' : ''}`}>
        {children}
      </div>

      {/* Expanded Modal Photo with Captions */}
      {activeItem && (
        <div className="helix-active-overlay" onClick={closeItem}>
          <div className="helix-modal-card" onClick={(e) => e.stopPropagation()}>
            <img
              src={activeItem.item.src}
              alt={activeItem.item.alt || activeItem.item.title || ''}
              className="helix-modal-img"
            />
            {captions && (activeItem.item.title || activeItem.item.subtitle) && (
              <div className="helix-modal-captions">
                {activeItem.item.title && <h3>{activeItem.item.title}</h3>}
                {activeItem.item.subtitle && <p>{activeItem.item.subtitle}</p>}
                {activeItem.item.href && (
                  <a
                    href={activeItem.item.href}
                    className="helix-modal-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Project ↗
                  </a>
                )}
              </div>
            )}
            <button
              type="button"
              className="helix-close-btn"
              onClick={closeItem}
              aria-label="Close photo preview"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

