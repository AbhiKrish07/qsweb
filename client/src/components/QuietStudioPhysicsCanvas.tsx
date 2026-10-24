import { useEffect, useRef } from "react";
import * as THREE from "three";

interface Ball {
  id: number;
  radius: number;
  mass: number;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  meshGroup: THREE.Group;
  sphere: THREE.Mesh;
  material: THREE.MeshPhysicalMaterial;
  role: "pastel" | "light" | "medium" | "deep" | "glass";
  isGlass: boolean;
  visualScale: number;
  shapeTarget: THREE.Vector3;
}

const PAL = {
  lime: ["#FBFFE2", "#EFFE69", "#E1FC03", "#B1E200", "#DCFF32"],
  pink: ["#FFF5F4", "#FFECEB", "#FFA6B3", "#FF4D6D", "#FFA6B3"],
  blue: ["#ECEFFF", "#A8C1FF", "#2F69FF", "#0A33BF", "#4D80FF"],
};

const ROLES: ("pastel" | "light" | "medium" | "deep" | "glass")[] = [
  "pastel",
  "light",
  "medium",
  "deep",
  "glass",
];

function getPal(colors: string[]) {
  const o: Record<string, THREE.Color> = {};
  ROLES.forEach((r, i) => {
    o[r] = new THREE.Color(colors[i] || colors[2]);
  });
  return o;
}

const palHero = getPal(PAL.blue);
const palLime = getPal(PAL.lime);
const palPink = getPal(PAL.pink);

const cl = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const ss = (a: number, b: number, x: number) => {
  const t = cl((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const lp = (a: number, b: number, t: number) => a + (b - a) * t;
const eo = (t: number) => 1 - Math.pow(1 - t, 3);

export default function QuietStudioPhysicsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const bgRef0 = useRef<HTMLElement | null>(null);
  const bgRef1 = useRef<HTMLElement | null>(null);
  const bgRef2 = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId: number;
    let isDisposed = false;

    const mouse = { x: 99, y: 99, isDown: false };
    const onPointerMove = (e: PointerEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    const onMouseDown = () => {
      mouse.isDown = true;
    };
    const onMouseUp = () => {
      mouse.isDown = false;
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    const control = { progress: 0, started: true };

    const onScroll = () => {
      const p = window.scrollY / (window.innerHeight || 1);
      control.progress = p;
      const st = p > 1.55 ? 2 : p > 0.7 ? 1 : 0;
      if (bgRef0.current) bgRef0.current.classList.toggle("on", st === 0);
      if (bgRef1.current) bgRef1.current.classList.toggle("on", st === 1);
      if (bgRef2.current) bgRef2.current.classList.toggle("on", st === 2);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      38,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 11);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const curPal: Record<string, THREE.Color> = {};
    ROLES.forEach((r) => {
      curPal[r] = new THREE.Color().copy(palHero[r]);
    });

    const hemi = new THREE.HemisphereLight(0xffffff, curPal.medium, 1.6);
    scene.add(hemi);

    const key = new THREE.DirectionalLight(0xffffff, 1.4);
    key.position.set(-6, 10, 8);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.near = 0.5;
    key.shadow.camera.far = 30;
    key.shadow.camera.left = -8;
    key.shadow.camera.right = 8;
    key.shadow.camera.top = 8;
    key.shadow.camera.bottom = -8;
    key.shadow.bias = -0.0003;
    key.shadow.radius = 12;
    scene.add(key);

    const addLight = (i: number, x: number, y: number, z: number) => {
      const l = new THREE.DirectionalLight(0xffffff, i);
      l.position.set(x, y, z);
      scene.add(l);
    };
    addLight(1.25, 8, 7, -8);
    addLight(0.4, 0, 0, 11);
    addLight(0.3, -9, -2, 4);

    let vw = 10,
      vh = 6;
    const updateFrustum = () => {
      vh =
        2 *
        Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2) *
        camera.position.z;
      vw = vh * (window.innerWidth / window.innerHeight);
    };
    updateFrustum();

    const N = window.innerWidth < 768 ? 48 : 84;
    const geo = new THREE.SphereGeometry(1, 36, 36);
    const balls: Ball[] = [];

    for (let i = 0; i < N; i++) {
      const q = Math.random();
      const r =
        q < 0.3
          ? 0.27 + Math.random() * 0.12
          : q < 0.8
            ? 0.42 + Math.random() * 0.18
            : 0.66 + Math.random() * 0.21;

      const glass = Math.random() < 0.22;
      let role: "pastel" | "light" | "medium" | "deep" | "glass" = "medium";
      let mat: THREE.MeshPhysicalMaterial;

      if (glass) {
        role = "glass";
        mat = new THREE.MeshPhysicalMaterial({
          color: palHero.glass,
          roughness: 0.08,
          metalness: 0,
          clearcoat: 1,
          clearcoatRoughness: 0.03,
          transmission: 0.95,
          ior: 1.485,
          thickness: 2.2,
          specularColor: new THREE.Color("#fff"),
          specularIntensity: 1,
          attenuationColor: palHero.pastel,
          attenuationDistance: 1,
          emissive: palHero.glass,
          emissiveIntensity: 0.12,
          transparent: true,
        });
      } else {
        const c = Math.random();
        role =
          c < 0.25
            ? "pastel"
            : c < 0.55
              ? "light"
              : c < 0.85
                ? "medium"
                : "deep";
        mat = new THREE.MeshPhysicalMaterial({
          color: palHero[role],
          roughness: 0.44,
          metalness: 0,
          clearcoat: 0.24,
          clearcoatRoughness: 0.35,
          emissive: palHero[role],
          emissiveIntensity: 0.08,
          transparent: true,
        });
      }

      const g = new THREE.Group();
      const m = new THREE.Mesh(geo, mat);
      m.scale.setScalar(r);
      m.castShadow = true;
      m.receiveShadow = true;
      g.add(m);
      scene.add(g);

      balls.push({
        id: i,
        radius: r,
        mass: Math.pow(r, 3),
        position: new THREE.Vector3(),
        velocity: new THREE.Vector3(),
        meshGroup: g,
        sphere: m,
        material: mat,
        role,
        isGlass: glass,
        visualScale: r,
        shapeTarget: new THREE.Vector3(),
      });
    }

    const inHeart = (x: number, y: number) => {
      const a = x * x + y * y - 1;
      return a * a * a - x * x * y * y * y <= 0;
    };

    let shapeScale = 1;
    const meanR = balls.reduce((s, b) => s + b.radius, 0) / balls.length;

    const setupHeart = () => {
      const S = Math.min(vw * 0.3, vh * 0.27);
      const cy = -vh * 0.03;
      shapeScale = Math.max(0.3, Math.min(1, (S * 0.45) / 2.3 / meanR));
      for (const b of balls) {
        let x = 0,
          y = 0,
          t = 0;
        do {
          x = (Math.random() * 2 - 1) * 1.25;
          y = Math.random() * 2.55 - 1.4;
          t++;
        } while (!inHeart(x, y) && t < 60);
        b.shapeTarget.set(
          x * S,
          (y + 0.12) * S + cy,
          (Math.random() - 0.5) * 0.35
        );
      }
    };
    setupHeart();

    const scatter = (inward: boolean) => {
      const R = Math.max(vw, vh) * 1.5;
      for (const b of balls) {
        const a = Math.random() * Math.PI * 2;
        const px = Math.cos(a) * R * 1.25;
        const py = Math.sin(a) * R * 0.85;
        const pz = (Math.random() - 0.5) * 4;
        b.position.set(px, py, pz);
        b.meshGroup.position.copy(b.position);
        if (inward) {
          b.velocity
            .set(-px, -py, -pz)
            .normalize()
            .multiplyScalar(0.08 + Math.random() * 0.05);
        } else {
          b.velocity.set(0, 0, 0);
        }
      }
    };
    scatter(true);

    const P = { rebound: -0.3, rF: 0.05, rR: 4.4, cA: 0.0035, bounce: 0.02 };
    const mp = new THREE.Vector3();
    const mw = new THREE.Vector3();
    const pmw = new THREE.Vector3();

    const updateMouseWorld = () => {
      mp.set(mouse.x, mouse.y, 0.5).unproject(camera);
      const d = mp.sub(camera.position).normalize();
      mw.copy(camera.position).add(
        d.multiplyScalar(-camera.position.z / d.z)
      );
    };

    const clock = new THREE.Clock();
    const t0 = clock.getElapsedTime();
    let mSpeed = 0;

    const dv = new THREE.Vector3();
    const cd = new THREE.Vector3();
    const rv = new THREE.Vector3();
    const dp = new THREE.Vector3();
    const ax = new THREE.Vector3();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      updateFrustum();
      setupHeart();
    };
    window.addEventListener("resize", onResize);

    const animate = () => {
      if (isDisposed) return;
      animId = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();
      updateMouseWorld();

      const pr = control.progress;
      const heroF = 1 - ss(0.3, 0.8, pr);
      const dropF = ss(0.4, 0.95, pr) * (1 - ss(1.25, 1.75, pr));
      const shapeF = ss(1.4, 2.05, pr) * (1 - ss(2.55, 3.0, pr));
      const flyF = ss(2.7, 3.45, pr);

      const bL = ss(0.55, 1.05, pr);
      const bP = ss(1.4, 1.95, pr);

      for (const r of ROLES) {
        curPal[r]
          .copy(palHero[r])
          .lerp(palLime[r], bL)
          .lerp(palPink[r], bP);
      }
      hemi.groundColor.copy(curPal.medium);

      const eT = eo(cl((time - t0) / 2.2));
      const boost = lp(7.5, 1, eT);

      const inter = Math.abs(mouse.x) < 0.99 || Math.abs(mouse.y) < 0.99;
      mSpeed = inter ? mw.distanceTo(pmw) : 0;
      if (mSpeed > 3) mSpeed = 3;
      pmw.copy(mw);

      let damp = 0.91;
      damp = lp(damp, 0.992, dropF);
      damp = lp(damp, 0.9, shapeF);
      damp = lp(damp, 0.985, flyF);

      const camZ = camera.position.z;
      const cA = Math.max(heroF, eT < 1 ? 1 : 0);

      for (const b of balls) {
        if (heroF > 0.01) {
          b.velocity.x +=
            Math.sin(time * 0.4 + b.id * 1.5) * 0.0004 * b.radius * heroF;
          b.velocity.y +=
            Math.cos(time * 0.5 + b.id * 1.2) * 0.0004 * b.radius * heroF;
          b.velocity.z +=
            Math.sin(time * 0.35 + b.id) * 0.0001 * heroF;
        }

        const cs = P.cA * boost * cA;
        if (cs > 1e-5) {
          b.velocity.x += (0 - b.position.x) * cs * 0.38;
          b.velocity.y += (0 - b.position.y) * cs * 1.85;
          b.velocity.z += (0 - b.position.z) * cs * 1.8;
        }

        if (dropF > 0.001) {
          b.velocity.y -= 0.011 * dropF;
        }

        if (shapeF > 0.001) {
          const k = 0.06 * shapeF;
          b.velocity.x += (b.shapeTarget.x - b.position.x) * k;
          b.velocity.y += (b.shapeTarget.y - b.position.y) * k;
          b.velocity.z += (b.shapeTarget.z - b.position.z) * k;
        }

        if (flyF > 0.001) {
          const st = (b.id * 0.6180339887) % 1;
          const lc = ss(st * 0.55, st * 0.55 + 0.45, flyF);
          b.velocity.z += 0.05 * lc;
          b.velocity.x += b.position.x * 0.006 * lc;
          b.velocity.y += b.position.y * 0.006 * lc;
        }

        if (inter) {
          dv.subVectors(b.position, mw);
          const rd = dv.length();
          const dn = mouse.isDown;
          const aR = dn ? P.rR * 1.4 : P.rR;
          const aF = dn ? P.rF * 1.7 : P.rF;

          if (rd < aR && rd > 1e-4) {
            const ra = rd / aR;
            const sf = 1 - (ra * ra * (3 - 2 * ra));
            const push = sf * aF * (1 + mSpeed * 3.2);
            dv.normalize();
            dv.z *= 0.12;
            dv.normalize();
            b.velocity.addScaledVector(dv, push);
          }
        }

        b.velocity.multiplyScalar(damp);
        b.position.addScaledVector(b.velocity, 1);

        const c = b.isGlass ? curPal.glass : curPal[b.role];
        b.material.color.copy(c);
        b.material.emissive.copy(c);
        b.material.opacity =
          flyF > 0.001
            ? 1 - ss(camZ - 2.6, camZ - 0.3, b.position.z)
            : 1;

        const tv = b.radius * (1 - (1 - shapeScale) * shapeF);
        b.visualScale += (tv - b.visualScale) * 0.12;
        b.sphere.scale.setScalar(b.visualScale);
      }

      // Sphere-to-sphere collision resolution
      const cS = 0.28 * (1 - 0.93 * shapeF) * (1 - flyF);
      for (let s = 0; s < 4; s++) {
        for (let i = 0; i < N; i++) {
          for (let j = i + 1; j < N; j++) {
            const a = balls[i];
            const b = balls[j];
            cd.subVectors(b.position, a.position);
            const d = cd.length();
            const md = a.visualScale + b.visualScale;
            if (d < md && d > 0.001) {
              const ov = md - d;
              cd.multiplyScalar(1 / d);
              const tm = a.mass + b.mass;
              a.position.addScaledVector(cd, -ov * (b.mass / tm) * cS);
              b.position.addScaledVector(cd, ov * (a.mass / tm) * cS);
              rv.subVectors(b.velocity, a.velocity);
              const vn = rv.dot(cd);
              if (vn < -1e-4) {
                const im =
                  (-(1 + P.bounce) * vn) / (1 / a.mass + 1 / b.mass);
                a.velocity.addScaledVector(cd, -im / a.mass);
                b.velocity.addScaledVector(cd, im / b.mass);
              }
            }
          }
        }
      }

      // Screen boundary bounces
      const xB = vw / 2 - 0.2;
      const topY = vh / 2 - 0.05;
      const floorY = -vh / 2 + 0.05;
      const zB = 2;
      const rest = 0.3 + 0.35 * dropF;
      const contain = flyF < 0.5;
      const zC = flyF < 0.02;

      for (const b of balls) {
        const r = b.visualScale;
        if (contain) {
          if (b.position.x < -xB - r) {
            b.position.x = -xB - r;
            b.velocity.x *= P.rebound;
          } else if (b.position.x > xB + r) {
            b.position.x = xB + r;
            b.velocity.x *= P.rebound;
          }
          if (b.position.y - r < floorY) {
            b.position.y = floorY + r;
            if (b.velocity.y < 0) b.velocity.y = -b.velocity.y * rest;
            if (dropF > 0.3) {
              b.velocity.x *= 0.86;
              b.velocity.z *= 0.86;
            }
          }
          if (b.position.y + r > topY) {
            b.position.y = topY - r;
            if (b.velocity.y > 0) b.velocity.y *= P.rebound;
          }
        }
        if (zC) {
          if (b.position.z < -zB) {
            b.position.z = -zB;
            b.velocity.z *= P.rebound;
          } else if (b.position.z > zB) {
            b.position.z = zB;
            b.velocity.z *= P.rebound;
          }
        }

        // Rolling mesh rotation
        dp.copy(b.position).sub(b.meshGroup.position);
        if (dp.lengthSq() > 1e-6) {
          ax.set(dp.y, -dp.x, 0).normalize();
          b.meshGroup.rotateOnWorldAxis(
            ax,
            (dp.length() / b.radius) * 0.95
          );
        }
        b.meshGroup.position.copy(b.position);
      }

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geo.dispose();
      balls.forEach((b) => {
        b.material.dispose();
        scene.remove(b.meshGroup);
      });
    };
  }, []);

  return (
    <>
      <div className="bg" aria-hidden="true">
        <i id="b0" ref={bgRef0} className="on" />
        <i id="b1" ref={bgRef1} />
        <i id="b2" ref={bgRef2} />
      </div>
      <canvas id="cv" ref={canvasRef} className="quiet-physics-canvas" />
    </>
  );
}
