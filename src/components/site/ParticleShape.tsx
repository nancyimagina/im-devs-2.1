import { useEffect, useRef } from "react";

/** Lucide icon path data (24x24 viewBox), stroked then sampled into particles. */
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
  vx: number;
  vy: number;
  tx: number;
  ty: number;
  size: number;
  hueShift: number;
};

function sampleShape(paths: string[], size: number, density: number): Array<[number, number]> {
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d", { willReadFrequently: true });
  if (!ctx) return [];
  const scale = size / 24;
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 1.35;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  for (const d of paths) ctx.stroke(new Path2D(d));

  const data = ctx.getImageData(0, 0, size, size).data;
  const pts: Array<[number, number]> = [];
  const step = 2;
  for (let y = 0; y < size; y += step) {
    for (let x = 0; x < size; x += step) {
      const a = data[(y * size + x) * 4 + 3] ?? 0;
      if (a > 120 && Math.random() < density) pts.push([x, y]);
    }
  }
  return pts;
}

export function ParticleShape({ shape }: { shape: keyof typeof SHAPE_PATHS }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shapeRef = useRef(shape);
  const particlesRef = useRef<Particle[]>([]);
  const targetsRef = useRef<Array<[number, number]>>([]);
  const pointerRef = useRef({ x: -9999, y: -9999 });

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

    const buildTargets = () => {
      const paths = SHAPE_PATHS[shapeRef.current] ?? [];
      const raw = sampleShape(paths, 260, 0.55);
      const offsetX = (width - box) / 2;
      const offsetY = (height - box) / 2;
      const k = box / 260;
      targetsRef.current = raw.map(([x, y]) => [offsetX + x * k, offsetY + y * k]);

      const count = targetsRef.current.length;
      const particles = particlesRef.current;
      while (particles.length < count) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: 0,
          vy: 0,
          tx: 0,
          ty: 0,
          size: 0.9 + Math.random() * 1.7,
          hueShift: Math.random(),
        });
      }
      particles.length = count;
      for (let i = 0; i < count; i++) {
        const t = targetsRef.current[i]!;
        particles[i]!.tx = t[0]!;
        particles[i]!.ty = t[1]!;
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      box = Math.min(width, height) * 0.82;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildTargets();
    };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => {
      pointerRef.current = { x: -9999, y: -9999 };
    };

    const styles = getComputedStyle(document.documentElement);
    const brand = styles.getPropertyValue("--brand").trim() || "oklch(0.86 0.21 135)";
    const soft = styles.getPropertyValue("--foreground").trim() || "#fff";

    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      const particles = particlesRef.current;
      const p0 = pointerRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]!;
        const dx = p.tx - p.x;
        const dy = p.ty - p.y;
        p.vx += dx * 0.022;
        p.vy += dy * 0.022;

        const mx = p.x - p0.x;
        const my = p.y - p0.y;
        const md = Math.hypot(mx, my);
        if (md < 90 && md > 0.001) {
          const force = (1 - md / 90) * 2.2;
          p.vx += (mx / md) * force;
          p.vy += (my / md) * force;
        }

        p.vx *= 0.82;
        p.vy *= 0.82;
        p.x += p.vx;
        p.y += p.vy;

        const settled = Math.abs(dx) + Math.abs(dy) < 2;
        ctx.globalAlpha = settled ? 0.55 + p.hueShift * 0.45 : 0.35;
        ctx.fillStyle = p.hueShift > 0.55 ? brand : soft;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", onPointer);
    canvas.addEventListener("pointerleave", onLeave);
    if (reduce) {
      for (const p of particlesRef.current) {
        p.x = p.tx;
        p.y = p.ty;
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
