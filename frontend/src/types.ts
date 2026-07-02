
export type Phase = 'idle' | 'gather' | 'burst' | 'done';
export type AppPage = 'page1' | 'page2' | 'page3';

export interface Node {
  x: number; y: number;
  vx: number; vy: number;
  gx: number; gy: number;
  t: number; speed: number;
}

export interface Burst {
  x: number; y: number;
  vx: number; vy: number;
  angle: number; accel: number;
  life: number; maxLife: number;
  width: number; tailX: number; tailY: number;
}