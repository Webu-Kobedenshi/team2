import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import type{ Phase, Node, Burst } from '../types';

const NODE_COUNT = 55;
const CONNECT_DIST = 160;

export interface NetworkCanvasHandle {
  startGather: (cx: number, cy: number, onComplete: () => void) => void;
}

const NetworkCanvas = forwardRef<NetworkCanvasHandle>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phaseRef = useRef<Phase>('idle');
  const nodesRef = useRef<Node[]>([]);
  const burstsRef = useRef<Burst[]>([]);
  const gatherTargetRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const onCompleteRef = useRef<(() => void) | null>(null);

  function initNodes(w: number, h: number) {
    nodesRef.current = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.6, vy: (Math.random() - 0.5) * 0.6,
      gx: 0, gy: 0, t: 0,
      speed: 0.08 + Math.random() * 0.05,
    }));
  }

  function easeInOut(t: number) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }
  function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

  useImperativeHandle(ref, () => ({
    startGather(cx: number, cy: number, onComplete: () => void) {
      gatherTargetRef.current = { x: cx, y: cy };
      onCompleteRef.current = onComplete;
      for (const n of nodesRef.current) {
        n.gx = cx + (Math.random() - 0.5) * 120;
        n.gy = cy + (Math.random() - 0.5) * 40;
        n.t = 0;
      }
      phaseRef.current = 'gather';
    },
  }));

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (phaseRef.current === 'idle') initNodes(canvas.width, canvas.height);
    }
    resize();
    window.addEventListener('resize', resize);
    initNodes(canvas.width, canvas.height);

    function drawLoop() {
      if (phaseRef.current === 'burst' || phaseRef.current === 'done') return;
      const { width, height } = canvas;
      const { x: cx, y: cy } = gatherTargetRef.current;
      ctx.clearRect(0, 0, width, height);

      if (phaseRef.current === 'idle') {
        for (const n of nodesRef.current) {
          n.x += n.vx; n.y += n.vy;
          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;
        }
      } else if (phaseRef.current === 'gather') {
        let allArrived = true;
        for (const n of nodesRef.current) {
          n.t = Math.min(1, n.t + n.speed);
          const e = easeInOut(n.t);
          n.x = lerp(n.x, n.gx, e);
          n.y = lerp(n.y, n.gy, e);
          if (n.t < 0.88) allArrived = false;
        }
        if (allArrived) {
          phaseRef.current = 'burst';
          startBurst();
          return;
        }
      }

      const nodes = nodesRef.current;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            let alpha = (1 - dist / CONNECT_DIST) * 0.45;
            if (phaseRef.current === 'gather') {
              const gd = Math.sqrt((nodes[i].x - cx) ** 2 + (nodes[i].y - cy) ** 2);
              const maxD = Math.sqrt((width / 2) ** 2 + (height / 2) ** 2);
              alpha *= 1 - (gd / maxD) ** 2;
            }
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        let alpha = 0.6;
        if (phaseRef.current === 'gather') {
          const gd = Math.sqrt((n.x - cx) ** 2 + (n.y - cy) ** 2);
          const maxD = Math.sqrt((width / 2) ** 2 + (height / 2) ** 2);
          alpha *= 1 - (gd / maxD) ** 2;
        }
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(drawLoop);
    }

    function startBurst() {
      const { x: cx, y: cy } = gatherTargetRef.current;
      burstsRef.current = Array.from({ length: 140 }, () => {
        const angle = Math.random() * Math.PI * 2;
        const initSpeed = 0.1 + Math.random() * 0.4;
        const life = 120 + Math.random() * 60;
        return {
          x: cx, y: cy,
          vx: Math.cos(angle) * initSpeed, vy: Math.sin(angle) * initSpeed,
          angle, accel: 1.035 + Math.random() * 0.02,
          life, maxLife: life,
          width: Math.random() * 1.5 + 0.5,
          tailX: cx, tailY: cy,
        };
      });

      let glowFrame = 0;
      const maxGlow = 45;

      function burstLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (glowFrame < maxGlow) {
          const gAlpha = (1 - glowFrame / maxGlow) * 0.4;
          const gRadius = 15 + glowFrame * 3;
          const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, gRadius);
          grad.addColorStop(0, `rgba(255,255,255,${gAlpha})`);
          grad.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(cx, cy, gRadius, 0, Math.PI * 2);
          ctx.fill();
          glowFrame++;
        }

        let alive = false;
        for (const b of burstsRef.current) {
          if (b.life <= 0) continue;
          alive = true;
          b.tailX = b.x; b.tailY = b.y;
          b.vx *= b.accel; b.vy *= b.accel;
          b.x += b.vx; b.y += b.vy;
          b.life--;
          const alpha = Math.max(0, b.life / b.maxLife);
          const tailAlpha = Math.min(alpha * 1.8, 1);
          const grad = ctx.createLinearGradient(b.tailX, b.tailY, b.x, b.y);
          grad.addColorStop(0, `rgba(255,255,255,${tailAlpha})`);
          grad.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.strokeStyle = grad;
          ctx.lineWidth = b.width * alpha;
          ctx.beginPath();
          ctx.moveTo(b.tailX, b.tailY);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }

        if (alive) {
          rafRef.current = requestAnimationFrame(burstLoop);
        } else {
          phaseRef.current = 'done';
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          setTimeout(() => onCompleteRef.current?.(), 200);
        }
      }
      burstLoop();
    }

    rafRef.current = requestAnimationFrame(drawLoop);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />;
});

export default NetworkCanvas;