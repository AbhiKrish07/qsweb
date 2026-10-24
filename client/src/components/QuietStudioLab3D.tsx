import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownRight, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { playClick } from "@/lib/sound";
import { STATIONS } from "@/lib/stations";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Module Spatial Coordinates in 3D Space (Docked -> Separated around core)
const DOCKED_MODULE_POSITIONS = [
  new THREE.Vector3(0, 0.25, 1.6),   // 01 AI Research (front)
  new THREE.Vector3(1.6, 0.25, 0),   // 02 Open Source (right)
  new THREE.Vector3(0, 0.25, -1.6),  // 03 Models (back)
  new THREE.Vector3(-1.6, 0.25, 0),  // 04 Templates (left)
];

const SEPARATED_MODULE_POSITIONS = [
  new THREE.Vector3(0, 0.75, 2.5),   // 01 AI Research (front separated)
  new THREE.Vector3(2.5, 0.75, 0),   // 02 Open Source (right separated)
  new THREE.Vector3(0, 0.75, -2.5),  // 03 Models (back separated)
  new THREE.Vector3(-2.5, 0.75, 0),  // 04 Templates (left separated)
];

// Dynamic camera distance helper: adjusts z-distance on mobile portrait screens to keep models in frame
function getResponsiveCameraZ(aspect: number): number {
  if (aspect >= 1.3) return 7.8;
  if (aspect >= 1.0) return 8.6;
  if (aspect >= 0.75) return 9.8;
  // Mobile portrait (aspect ~0.44 - 0.72)
  return Math.min(12.5, 7.8 * (0.82 / Math.max(0.44, aspect)));
}

export default function QuietStudioLab3D() {
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeStationIndex, setActiveStationIndex] = useState<number>(0);
  const [scrollStationVal, setScrollStationVal] = useState<number>(0);
  const [labProgress, setLabProgress] = useState(0);
  const [webglSupported, setWebglSupported] = useState(true);
  const [activeDossierOpen, setActiveDossierOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(() =>
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  const touchStartX = useRef<number | null>(null);

  // Performance refs for Three.js instances
  const sceneState = useRef<{
    renderer: THREE.WebGLRenderer | null;
    scene: THREE.Scene | null;
    camera: THREE.PerspectiveCamera | null;
    coreGroup: THREE.Group | null;
    modules: THREE.Group[];
    tetherLines: THREE.Line[];
    particles: THREE.Points | null;
    mouseTarget: THREE.Vector2;
    currentMouse: THREE.Vector2;
    currentRot: THREE.Vector2;
    rect: { left: number; top: number; width: number; height: number };
    animFrameId: number;
    timeline: gsap.core.Timeline | null;
    targetLookAt: THREE.Vector3;
    currentLookAt: THREE.Vector3;
    isIntersecting: boolean;
    activeProgress: number;
  }>({
    renderer: null,
    scene: null,
    camera: null,
    coreGroup: null,
    modules: [],
    tetherLines: [],
    particles: null,
    mouseTarget: new THREE.Vector2(0, 0),
    currentMouse: new THREE.Vector2(0, 0),
    currentRot: new THREE.Vector2(0, 0),
    rect: { left: 0, top: 0, width: 1, height: 1 },
    animFrameId: 0,
    timeline: null,
    targetLookAt: new THREE.Vector3(0, 0, 0),
    currentLookAt: new THREE.Vector3(0, 0, 0),
    isIntersecting: true,
    activeProgress: 0,
  });

  // Synchronous station switch: rotates 3D core & smoothly scrolls to station
  const selectStation = useCallback((index: number) => {
    playClick();
    setActiveStationIndex(index);
    setScrollStationVal(index);

    const track = trackRef.current;
    if (track) {
      const scrollableDist = track.offsetHeight - window.innerHeight;
      const targetProg = 0.22 + (index / 3) * 0.72;
      const targetTop = track.offsetTop + targetProg * scrollableDist;
      window.scrollTo({ top: targetTop, behavior: "smooth" });
    }

    // Rotate core so the selected module faces front directly behind the center card
    if (sceneState.current.coreGroup) {
      gsap.to(sceneState.current.coreGroup.rotation, {
        y: -index * (Math.PI / 2),
        duration: 0.85,
        ease: "power2.out",
      });
    }

    // Pulse active module
    const mod = sceneState.current.modules[index];
    if (mod) {
      gsap.to(mod.scale, {
        x: 1.25,
        y: 1.25,
        z: 1.25,
        duration: 0.22,
        yoyo: true,
        repeat: 1,
        ease: "power1.inOut",
      });
    }
  }, []);

  // Three.js Scene Setup (Geometric Core & 4 Floating Modules)
  useEffect(() => {
    const canvas = canvasRef.current;
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!canvas || !track || !viewport) return;

    try {
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    const vRect = viewport.getBoundingClientRect();
    sceneState.current.rect = {
      left: vRect.left,
      top: vRect.top,
      width: vRect.width || window.innerWidth,
      height: vRect.height || window.innerHeight,
    };

    const width = sceneState.current.rect.width;
    const height = sceneState.current.rect.height;
    const aspect = width / height;
    const isMobile = width < 768 || aspect < 0.9;

    // 1. Scene & Camera (Dynamically scaled z-distance ensures full model visibility on mobile portrait)
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, aspect, 0.1, 100);
    const initialCamZ = getResponsiveCameraZ(aspect);
    camera.position.set(0, isMobile ? 0.7 : 0.4, initialCamZ);

    // 2. High-Performance Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // 3. Cinematic Atmospheric Studio Lighting (sentient-os.ai aesthetic)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(6, 8, 7);
    scene.add(keyLight);

    const rimOrangeLight = new THREE.DirectionalLight(0xff5a1f, 4.0);
    rimOrangeLight.position.set(-6, -4, -4);
    scene.add(rimOrangeLight);

    const fillCyanLight = new THREE.DirectionalLight(0x38bdf8, 2.5);
    fillCyanLight.position.set(5, -5, -3);
    scene.add(fillCyanLight);

    // 4. Starlight & Ambient Particulates
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 16;
      particlePositions[i + 1] = (Math.random() - 0.5) * 10;
      particlePositions[i + 2] = (Math.random() - 0.5) * 12;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.028,
      transparent: true,
      opacity: 0.35,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    sceneState.current.particles = particles;

    // 5. Central Geometric Core (Polygonal Titanium Nucleus)
    const coreGroup = new THREE.Group();
    if (isMobile) {
      coreGroup.scale.setScalar(0.76);
      coreGroup.position.y = 0.5;
    }
    scene.add(coreGroup);

    // Titanium faceted outer polyhedron
    const coreOuterGeo = new THREE.IcosahedronGeometry(1.35, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x14161d,
      metalness: 0.94,
      roughness: 0.16,
    });
    const coreOuterMesh = new THREE.Mesh(coreOuterGeo, coreMat);
    coreGroup.add(coreOuterMesh);

    // Wireframe geometric cage
    const wireGeo = new THREE.IcosahedronGeometry(1.42, 0);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.14,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    coreGroup.add(wireMesh);

    // Inner glowing energetic crystal
    const innerCrystalGeo = new THREE.OctahedronGeometry(0.75, 0);
    const innerCrystalMat = new THREE.MeshStandardMaterial({
      color: 0xff5a1f,
      emissive: 0xff5a1f,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.8,
    });
    const innerCrystalMesh = new THREE.Mesh(innerCrystalGeo, innerCrystalMat);
    coreGroup.add(innerCrystalMesh);

    // Concentric orbital titanium rings (Signature sentient-os.ai aesthetic)
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.22 });
    const ringGeo1 = new THREE.TorusGeometry(2.1, 0.015, 16, 120);
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0xff5a1f, transparent: true, opacity: 0.35 });
    const ringGeo2 = new THREE.TorusGeometry(2.5, 0.012, 16, 120);
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = Math.PI / 6;
    coreGroup.add(ring2);

    sceneState.current.coreGroup = coreGroup;

    // 6. Four Floating Satellite Modules (AI Research, Open Source, Models, Templates)
    const modules: THREE.Group[] = [];
    const tetherLines: THREE.Line[] = [];
    const moduleBaseMats: THREE.MeshStandardMaterial[] = [];

    STATIONS.forEach((station, idx) => {
      const moduleGroup = new THREE.Group();
      const initialPos = DOCKED_MODULE_POSITIONS[idx].clone();
      moduleGroup.position.copy(initialPos);
      coreGroup.add(moduleGroup);
      modules.push(moduleGroup);

      const accentColor = new THREE.Color(station.accent);

      // Module base chassis (architectural platinum/gray in light mode, dark titanium in dark mode)
      const baseGeo = new THREE.CylinderGeometry(0.52, 0.52, 0.12, 32);
      const baseMat = new THREE.MeshStandardMaterial({
        color: 0x1b1d24,
        metalness: 0.9,
        roughness: 0.2,
      });
      moduleBaseMats.push(baseMat);
      const baseMesh = new THREE.Mesh(baseGeo, baseMat);
      baseMesh.rotation.x = Math.PI / 2;
      moduleGroup.add(baseMesh);

      // Glowing accent rim
      const rimGeo = new THREE.TorusGeometry(0.54, 0.02, 16, 48);
      const rimMat = new THREE.MeshBasicMaterial({ color: accentColor });
      const rimMesh = new THREE.Mesh(rimGeo, rimMat);
      moduleGroup.add(rimMesh);

      // Center glowing holographic optic lens
      const lensGeo = new THREE.SphereGeometry(0.24, 24, 24);
      const lensMat = new THREE.MeshStandardMaterial({
        color: accentColor,
        emissive: accentColor,
        emissiveIntensity: 0.7,
        roughness: 0.1,
        metalness: 0.8,
      });
      const lensMesh = new THREE.Mesh(lensGeo, lensMat);
      lensMesh.position.z = 0.08;
      moduleGroup.add(lensMesh);

      // Module point light
      const modLight = new THREE.PointLight(accentColor, 1.8, 3.2);
      modLight.position.set(0, 0, 0.3);
      moduleGroup.add(modLight);

      // Hairline connection laser tether to central core
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        initialPos.clone(),
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: accentColor,
        transparent: true,
        opacity: 0.45,
      });
      const tether = new THREE.Line(lineGeo, lineMat);
      coreGroup.add(tether);
      tetherLines.push(tether);
    });

    // Theme synchronization helper: adjusts 3D model materials & lighting for light vs dark mode
    const applyTheme = (isDark: boolean) => {
      // Central core outer polyhedron: clean sculptural satin white/gray in light mode
      coreMat.color.setHex(isDark ? 0x14161d : 0xdedfe4);
      coreMat.metalness = isDark ? 0.94 : 0.24;
      coreMat.roughness = isDark ? 0.16 : 0.32;
      coreMat.needsUpdate = true;

      // Wireframe cage: subtle graphite outline in light mode, starlight white in dark mode
      wireMat.color.setHex(isDark ? 0xffffff : 0x18181b);
      wireMat.opacity = isDark ? 0.14 : 0.18;
      wireMat.needsUpdate = true;

      // Concentric ring 1: charcoal gray in light mode, white in dark mode
      ringMat1.color.setHex(isDark ? 0xffffff : 0x27272a);
      ringMat1.opacity = isDark ? 0.22 : 0.22;
      ringMat1.needsUpdate = true;

      // Floating particulates: charcoal smoke in light mode, white dust in dark mode
      particleMat.color.setHex(isDark ? 0xffffff : 0x52525b);
      particleMat.opacity = isDark ? 0.35 : 0.24;
      particleMat.needsUpdate = true;

      // Satellite module bases: light architectural platinum in light mode, dark titanium in dark mode
      moduleBaseMats.forEach((mat) => {
        mat.color.setHex(isDark ? 0x1b1d24 : 0xd8dbe0);
        mat.metalness = isDark ? 0.9 : 0.25;
        mat.roughness = isDark ? 0.2 : 0.35;
        mat.needsUpdate = true;
      });

      // Atmospheric lights: balanced for crisp faceted geometry in both themes
      ambientLight.intensity = isDark ? 0.65 : 1.45;
      keyLight.intensity = isDark ? 3.2 : 2.8;
      rimOrangeLight.intensity = isDark ? 4.0 : 2.9;
      fillCyanLight.color.setHex(isDark ? 0x38bdf8 : 0x94a3b8);
      fillCyanLight.intensity = isDark ? 2.5 : 1.6;
    };

    // Initialize with current document theme
    const initialIsDark = typeof document !== "undefined" && document.documentElement.classList.contains("dark");
    applyTheme(initialIsDark);

    // Watch for dynamic theme changes (e.g. user toggles theme via header button)
    const themeObserver = new MutationObserver(() => {
      const isNowDark = document.documentElement.classList.contains("dark");
      applyTheme(isNowDark);
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    sceneState.current.modules = modules;
    sceneState.current.tetherLines = tetherLines;
    sceneState.current.renderer = renderer;
    sceneState.current.scene = scene;
    sceneState.current.camera = camera;

    // 7. Hardware-Composited GSAP Scrubbing (Spatial Separation on Scroll)
    const animTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: track,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.4,
        onUpdate: (self) => {
          const prog = self.progress;
          setLabProgress(prog);
          sceneState.current.activeProgress = prog;

          // Interpolate modules from DOCKED to SEPARATED (scaled tighter on mobile to stay within viewport)
          const isMobileNow = window.innerWidth < 768;
          const sepScale = isMobileNow ? 0.68 : 1.0;

          modules.forEach((mod, idx) => {
            const docked = DOCKED_MODULE_POSITIONS[idx];
            const separated = SEPARATED_MODULE_POSITIONS[idx].clone();
            separated.x *= sepScale;
            separated.z *= sepScale;
            mod.position.lerpVectors(docked, separated, Math.min(1, Math.max(0, (prog - 0.12) * 2.8)));

            // Update tether line vertices
            const tether = tetherLines[idx];
            if (tether) {
              const positions = tether.geometry.attributes.position as THREE.BufferAttribute;
              positions.setXYZ(0, 0, 0, 0);
              positions.setXYZ(1, mod.position.x, mod.position.y, mod.position.z);
              positions.needsUpdate = true;
            }
          });

          // Continuous fluid scroll for the 4 stations (from prog 0.18 to 0.96)
          if (prog >= 0.18) {
            const normalized = Math.min(1, Math.max(0, (prog - 0.2) / 0.76));
            const continuousVal = normalized * 3; // 0.0 -> 3.0
            setScrollStationVal(continuousVal);

            const activeIdx = Math.min(3, Math.round(continuousVal));
            setActiveStationIndex(activeIdx);

            if (coreGroup) {
              coreGroup.rotation.y = -continuousVal * (Math.PI / 2);
            }
          }
        },
      },
    });

    // Elevate 3D core into background crown position behind monolith cards on scroll
    animTimeline
      .to(coreGroup.position, { y: isMobile ? 1.35 : 0.75, z: -0.6, ease: "none" }, 0)
      .to(camera.position, { z: initialCamZ - 0.6, y: isMobile ? 0.4 : 0.1, ease: "none" }, 0.3);

    sceneState.current.timeline = animTimeline;

    // 8. Zero-Layout-Thrashing Resize Listener
    const handleResize = () => {
      if (!viewport || !renderer || !camera) return;
      const r = viewport.getBoundingClientRect();
      const newW = r.width || window.innerWidth;
      const newH = r.height || window.innerHeight;
      const newAspect = newW / newH;
      const newIsMobile = newW < 768 || newAspect < 0.9;
      setWindowWidth(newW);

      sceneState.current.rect = {
        left: r.left,
        top: r.top,
        width: newW,
        height: newH,
      };
      camera.aspect = newAspect;
      const newCamZ = getResponsiveCameraZ(newAspect);
      camera.position.z = newCamZ;
      camera.position.y = newIsMobile ? 0.7 : 0.4;
      if (coreGroup) {
        coreGroup.scale.setScalar(newIsMobile ? 0.76 : 1.0);
      }
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // 9. Pointer Parallax
    const handlePointerMove = (e: PointerEvent) => {
      const r = sceneState.current.rect;
      const x = ((e.clientX - r.left) / r.width) * 2 - 1;
      const y = -((e.clientY - r.top) / r.height) * 2 + 1;
      sceneState.current.mouseTarget.set(x, y);
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    // 10. Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          sceneState.current.isIntersecting = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(track);

    // 11. 60/120fps Kinetic Loop
    const animate = (now: number) => {
      sceneState.current.animFrameId = requestAnimationFrame(animate);

      if (!sceneState.current.isIntersecting) return;

      const time = now * 0.001;
      const s = sceneState.current;

      // Ambient geometric float (spins during Hero, locks to station during Screen 2)
      if (s.activeProgress < 0.2) {
        coreGroup.rotation.y += 0.003;
      }
      coreGroup.rotation.z = Math.sin(time * 0.6) * 0.04;
      ring1.rotation.z += 0.004;
      ring2.rotation.z -= 0.005;

      // Pulse floating modules
      modules.forEach((mod, i) => {
        mod.rotation.z = Math.sin(time * 1.2 + i) * 0.12;
      });

      // Ambient particle drift
      if (particles) {
        particles.rotation.y = time * 0.015;
      }

      // Smooth pointer parallax
      s.currentMouse.lerp(s.mouseTarget, 0.05);

      if (s.activeProgress < 0.2) {
        s.currentRot.y += (s.currentMouse.x * 0.3 - s.currentRot.y) * 0.05;
        s.currentRot.x += (-s.currentMouse.y * 0.2 - s.currentRot.x) * 0.05;
        coreGroup.rotation.y += s.currentRot.y * 0.01;
      }

      s.currentLookAt.lerp(s.targetLookAt, 0.05);
      camera.lookAt(s.currentLookAt);

      renderer.render(scene, camera);
    };

    sceneState.current.animFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(sceneState.current.animFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      observer.disconnect();
      themeObserver.disconnect();

      if (sceneState.current.timeline) {
        sceneState.current.timeline.kill();
      }
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === track) st.kill();
      });

      renderer.dispose();
      scene.clear();
    };
  }, []);

  const activeStation = STATIONS[activeStationIndex] || STATIONS[0];

  return (
    <div className="quiet-lab-scroll-track" ref={trackRef} id="laboratory">
      <div className="quiet-lab-sticky-viewport" ref={viewportRef}>
        {/* 3D WebGL Canvas Stage */}
        <div className="lab-canvas-wrap" aria-hidden="true">
          <canvas ref={canvasRef} className="lab-3d-canvas" />
          <div className="lab-cinematic-vignette" />


        </div>

        {/* =====================================================================
            SCREEN 1 — HERO: CINEMATIC MONOLITHIC LANDING
            ===================================================================== */}
        <div
          className="lab-hero-overlay"
          style={{
            opacity: Math.max(0, 1 - labProgress * 3.8),
            pointerEvents: labProgress > 0.22 ? "none" : "auto",
            transform: `translateY(${labProgress * -60}px)`,
          }}
        >
          <div className="lab-hero-content">
            <div className="hero-status-pill">
              <span className="pulse-dot" />
              <span>INDEPENDENT AI LABORATORY &amp; CREATIVE TECHNOLOGY STUDIO — 2026</span>
            </div>

            {/* Oversized Monolithic Wordmark (Sentient OS style) */}
            <h1 className="cinematic-monolithic-wordmark">
              QUIETSTUDIO
            </h1>

            <p className="cinematic-concise-tagline">
              Engineering AI as a <em className="editorial-italic-serif">proactive partner</em> in your life—building
              domain-vertical models and calm local runtimes tailored for the exact tasks you need.
            </p>

            <div className="lab-hero-actions">
              <a
                href="#models"
                onClick={(e) => {
                  e.preventDefault();
                  playClick();
                  const target = document.getElementById("models");
                  if (target) {
                    const top = target.getBoundingClientRect().top + window.scrollY;
                    window.scrollTo({
                      top,
                      behavior: "smooth",
                    });
                  } else {
                    window.location.hash = "models";
                  }
                }}
                className="sentient-primary-pill"
              >
                Vertical Models <ArrowDownRight size={14} />
              </a>

              <Link
                href="/research"
                onClick={() => playClick()}
                className="sentient-outline-pill"
              >
                Research Papers <ArrowUpRight size={14} />
              </Link>
            </div>

            <div className="lab-hero-scroll-indicator">
              <span className="scroll-pulse-dot" />
              <span className="meta-label">SCROLL TO SEPARATE LABORATORY MODULES ↓</span>
            </div>
          </div>
        </div>

        {/* =====================================================================
            SCREEN 2 — THE AI LAB: SPATIAL SEPARATION HUD
            ===================================================================== */}
        <div
          className="lab-separation-hud"
          style={{
            opacity: Math.min(1, Math.max(0, (labProgress - 0.18) * 3.5)),
            pointerEvents: labProgress < 0.2 ? "none" : "auto",
          }}
        >
          {/* Header */}
          <div className="separation-header-row">
            <div className="section-marker">[ 00 // THE SPATIAL AI LABORATORY ]</div>
            <h2 className="separation-title">
              Autonomous Modules<span className="orange-dot">.</span>
            </h2>
            <p className="separation-eyebrow">
              The geometric core decouples into four specialized production stations. Select a module to inspect runtime telemetry.
            </p>
          </div>

          {/* Spatial Monolith Track (IT Empire smoked glass aesthetic matching user reference) */}
          <div
            className="monolith-spatial-stage"
            onTouchStart={(e) => {
              touchStartX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (touchStartX.current === null) return;
              const touchEndX = e.changedTouches[0].clientX;
              const deltaX = touchEndX - touchStartX.current;
              if (Math.abs(deltaX) > 40) {
                if (deltaX < 0 && activeStationIndex < STATIONS.length - 1) {
                  selectStation(activeStationIndex + 1);
                } else if (deltaX > 0 && activeStationIndex > 0) {
                  selectStation(activeStationIndex - 1);
                }
              }
              touchStartX.current = null;
            }}
          >
            <div className="monolith-cards-fan">
              {STATIONS.map((station, i) => {
                // Continuous offset driven by scroll & responsive screen width
                const diff = i - scrollStationVal;
                const isMobileCard = windowWidth < 768;
                const cardStep = isMobileCard ? Math.min(windowWidth * 0.76, 260) : 340;
                const translateX = diff * cardStep;
                const translateZ = Math.max(-240, (isMobileCard ? 30 : 80) - Math.abs(diff) * (isMobileCard ? 90 : 140));
                const rotateY = Math.max(-28, Math.min(28, -diff * (isMobileCard ? 12 : 18)));
                const scale = Math.max(0.72, 1 - Math.abs(diff) * (isMobileCard ? 0.14 : 0.13));
                const opacity = Math.max(0, 1 - Math.abs(diff) * (isMobileCard ? 0.48 : 0.52));
                const zIndex = Math.round(30 - Math.abs(diff) * 10);
                const pointerEvents = Math.abs(diff) > 1.6 ? "none" : "auto";
                const isCenter = Math.abs(diff) < 0.35;

                const headlines: Record<string, string> = {
                  partner: "Proactive AI Life Partner",
                  vertical: "Domain-Vertical Task Models",
                  sctm: "Cognitive Architecture & SCTM",
                  gating: "Discrete Authority Gating",
                };

                const headline = headlines[station.id] || station.name;

                return (
                  <div
                    key={station.id}
                    className={`it-empire-monolith-card ${isCenter ? "monolith-center" : "monolith-fanned"}`}
                    onClick={() => selectStation(i)}
                    style={{
                      transform: `translate3d(${translateX}px, 0, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                      opacity,
                      zIndex,
                      pointerEvents,
                      "--card-accent": station.accent,
                    } as React.CSSProperties}
                  >
                    {/* Vertical Warm Ambient Light Beam */}
                    <div className="monolith-light-beam" aria-hidden="true" />

                    {/* Top Header: Cloverleaf Glyph + Category + Subtitle */}
                    <div className="monolith-card-header">
                      <div className="monolith-header-icon-col">
                        <svg className="clover-glyph" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                          <circle cx="12" cy="7.2" r="3.2" />
                          <circle cx="7.2" cy="15.2" r="3.2" />
                          <circle cx="16.8" cy="15.2" r="3.2" />
                          <circle cx="12" cy="12.5" r="1.4" fill="#0d0e12" />
                        </svg>
                      </div>
                      <div className="monolith-header-text-col">
                        <span className="monolith-category-title">{station.name}</span>
                        <span className="monolith-category-subtitle">{station.tagline}</span>
                      </div>
                    </div>

                    {/* Center: Glowing White Circular Crosshair Aperture Emblem */}
                    <div className="monolith-center-stage">
                      <div className="monolith-aperture-emblem">
                        <div className="aperture-halo-glow" />
                        <svg viewBox="0 0 80 80" className="card-aperture-svg" aria-hidden="true">
                          <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
                          <circle cx="40" cy="40" r="23" fill="#ffffff" />
                          <line x1="40" y1="13" x2="40" y2="67" stroke="#0c0e14" strokeWidth="3" />
                          <line x1="13" y1="40" x2="67" y2="40" stroke="#0c0e14" strokeWidth="3" />
                          <circle cx="40" cy="40" r="5.5" fill="#0c0e14" />
                        </svg>
                      </div>
                    </div>

                    {/* Lower Third: Corner Brackets ⌝ & ⌞ Hugging Title + Body + Action */}
                    <div className="monolith-lower-container">
                      <div className="monolith-title-box">
                        <span className="bracket-bl" aria-hidden="true">⌞</span>
                        <h3 className="monolith-headline">{headline}</h3>
                        <span className="bracket-tr" aria-hidden="true">⌝</span>
                      </div>

                      <p className="monolith-body-copy">{station.description}</p>

                      <div className="monolith-action-wrap">
                        {station.primaryAction.external ? (
                          <a
                            href={station.primaryAction.href}
                            target="_blank"
                            rel="noreferrer"
                            className="monolith-explore-btn"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span>{station.primaryAction.label}</span>
                            <ArrowUpRight size={13} />
                          </a>
                        ) : (
                          <Link
                            href={station.primaryAction.href}
                            className="monolith-explore-btn"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span>{station.primaryAction.label}</span>
                            <ArrowRight size={13} />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Station Navigation Quick Selector (Ensures all models easily accessible on mobile) */}
          <div className="monolith-station-nav-bar">
            <button
              type="button"
              className="station-nav-arrow"
              onClick={() => selectStation(Math.max(0, activeStationIndex - 1))}
              disabled={activeStationIndex === 0}
              aria-label="Previous station"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="station-nav-pills">
              {STATIONS.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  className={`station-nav-pill ${activeStationIndex === idx ? "active" : ""}`}
                  onClick={() => selectStation(idx)}
                >
                  <span className="pill-index">{s.index}</span>
                  <span className="pill-name">{s.name.split(" ")[0]}</span>
                </button>
              ))}
            </div>

            <button
              type="button"
              className="station-nav-arrow"
              onClick={() => selectStation(Math.min(STATIONS.length - 1, activeStationIndex + 1))}
              disabled={activeStationIndex === STATIONS.length - 1}
              aria-label="Next station"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* WebGL Fallback */}
        {!webglSupported && (
          <div className="webgl-fallback-panel">
            <div className="fallback-inner">
              <span className="section-marker">[ 3D ACCELERATION DISABLED ]</span>
              <h3>Autonomous Modules</h3>
              <p>Your browser or environment does not support WebGL. All modules remain accessible below.</p>
              <div className="fallback-links">
                {STATIONS.map((s) => (
                  <Link key={s.id} href={s.primaryAction.href} className="sentient-outline-pill">
                    {s.name} <ArrowRight size={14} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
