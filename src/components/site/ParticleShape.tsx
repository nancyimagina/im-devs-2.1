import { useEffect, useRef } from "react";

/** Lucide icon path data (24x24 viewBox), stroked then sampled and extruded into a 3D cloud. */
export const SHAPE_PATHS: Record<string, string[]> = {
  handshake: [
    "m11 17 2 2a1 1 0 1 0 3-3",
    "m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4",
    "m21 3 1 11h-2",
    "M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3",
    "M3 4h8",
  ],
  cloud: ["M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"],
};

type Particle = {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  tx: number;
  ty: number;
  tz: number;
  size: number;
  hueShift: number;
};

const SAMPLE = 260;
const DEPTH_LAYERS = 7;

/** Sample the stroked icon into 2D points, then extrude across z to build a 3D shell. */
function sampleShape3D(paths: string[], density: number): Array<[number, number, number]> {
  const c = document.createElement("canvas");
  c.width = SAMPLE;
  c.height = SAMPLE;
  const ctx = c.getContext("2d", { willReadFrequently: true });
  if (!ctx) return [];
  const scale = SAMPLE / 24;
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 1.35;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  for (const d of paths) ctx.stroke(new Path2D(d));

  const data = ctx.getImageData(0, 0, SAMPLE, SAMPLE).data;
  const pts: Array<[number, number, number]> = [];
  const step = 3;
  for (let y = 0; y < SAMPLE; y += step) {
    for (let x = 0; x < SAMPLE; x += step) {
      const a = data[(y * SAMPLE + x) * 4 + 3] ?? 0;
      if (a <= 120) continue;
      for (let l = 0; l < DEPTH_LAYERS; l++) {
        if (Math.random() > density) continue;
        // normalized -0.5..0.5 space, depth as a rounded shell
        const nx = x / SAMPLE - 0.5;
        const ny = y / SAMPLE - 0.5;
        const t = (l / (DEPTH_LAYERS - 1)) * 2 - 1;
        const nz = t * 0.11 + (Math.random() - 0.5) * 0.012;
        pts.push([nx, ny, nz]);
      }
    }
  }
  return pts;
}

export function ParticleShape({ shape }: { shape: keyof typeof SHAPE_PATHS }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shapeRef = useRef(shape);
  const particlesRef = useRef<Particle[]>([]);
  const pointerRef = useRef({ x: -9999, y: -9999, active: false });

  shapeRef.current = shape;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let width = 0;
    let height = 0;
    let box = 0;
    let yaw = 0;
    let pitch = 0;

    const buildTargets = () => {
      const paths = SHAPE_PATHS[shapeRef.current] ?? [];
      const raw = sampleShape3D(paths, 0.5);
      const count = raw.length;
      const particles = particlesRef.current;
      while (particles.length < count) {
        particles.push({
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2,
          z: (Math.random() - 0.5) * 2,
          vx: 0,
          vy: 0,
          vz: 0,
          tx: 0,
          ty: 0,
          tz: 0,
          size: 0.9 + Math.random() * 1.5,
          hueShift: Math.random(),
        });
      }
      particles.length = count;
      for (let i = 0; i < count; i++) {
        const t = raw[i]!;
        const p = particles[i]!;
        p.tx = t[0];
        p.ty = t[1];
        p.tz = t[2];
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      box = Math.min(width, height) * 0.78;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };
    const onLeave = () => {
      pointerRef.current = { x: -9999, y: -9999, active: false };
    };

    const styles = getComputedStyle(document.documentElement);
    const brand = styles.getPropertyValue("--brand").trim() || "oklch(0.86 0.21 135)";
    const soft = styles.getPropertyValue("--foreground").trim() || "#fff";

    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      const particles = particlesRef.current;
      const p0 = pointerRef.current;
      const cx = width / 2;
      const cy = height / 2;

      if (!reduce) yaw += 0.0055;
      // gentle pitch influenced by pointer height
      const targetPitch = p0.active ? ((p0.y - cy) / height) * 0.6 : Math.sin(yaw * 0.6) * 0.12;
      pitch += (targetPitch - pitch) * 0.05;

      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      const cosX = Math.cos(pitch);
      const sinX = Math.sin(pitch);
      const fov = 2.4;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]!;
        p.vx += (p.tx - p.x) * 0.03;
        p.vy += (p.ty - p.y) * 0.03;
        p.vz += (p.tz - p.z) * 0.03;
        p.vx *= 0.84;
        p.vy *= 0.84;
        p.vz *= 0.84;
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // rotate around Y then X
        const rx = p.x * cosY + p.z * sinY;
        const rz = -p.x * sinY + p.z * cosY;
        const ry = p.y * cosX - rz * sinX;
        const rz2 = p.y * sinX + rz * cosX;

        const persp = fov / (fov + rz2 * 2.2);
        let sx = cx + rx * box * persp;
        let sy = cy + ry * box * persp;

        // pointer repulsion in screen space
        if (p0.active) {
          const mx = sx - p0.x;
          const my = sy - p0.y;
          const md = Math.hypot(mx, my);
          if (md < 80 && md > 0.001) {
            const force = (1 - md / 80) * 26;
            sx += (mx / md) * force;
            sy += (my / md) * force;
          }
        }

        const depth = (rz2 + 0.16) / 0.32; // 0 back .. 1 front
        ctx.globalAlpha = 0.18 + Math.max(0, Math.min(1, depth)) * 0.7;
        ctx.fillStyle = p.hueShift > 0.55 ? brand : soft;
        ctx.beginPath();
        ctx.arc(sx, sy, p.size * persp, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };

    resize();
    buildTargets();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", onPointer);
    canvas.addEventListener("pointerleave", onLeave);
    if (reduce) {
      for (const p of particlesRef.current) {
        p.x = p.tx;
        p.y = p.ty;
        p.z = p.tz;
      }
    }
    raf = requestAnimationFrame(tick);

    const rebuild = () => buildTargets();
    canvas.addEventListener("imd:reshape", rebuild);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onPointer);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("imd:reshape", rebuild);
    };
  }, []);

  useEffect(() => {
    canvasRef.current?.dispatchEvent(new CustomEvent("imd:reshape"));
  }, [shape]);

  return <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />;
}
