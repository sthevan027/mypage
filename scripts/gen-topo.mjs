// Gera public/topo.svg: curvas de nível (mapa topográfico) de um terreno
// sintético. Semente fixa → o desenho é sempre o mesmo, e é único do hub.
// Rodar com `pnpm gen:topo` quando quiser outro desenho (troque a SEED).
import {contours} from "d3-contour";
import fs from "node:fs";
import path from "node:path";

const SEED = 20261004;
const W = 220;
const H = 130;
const LEVELS = 26;

// PRNG determinístico (mulberry32).
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Ruído de valor com interpolação suave, somado em oitavas.
function makeNoise(seed, cells) {
  const rand = rng(seed);
  const grid = Array.from({length: (cells + 1) * (cells + 1)}, rand);
  const at = (x, y) => grid[y * (cells + 1) + x];
  const smooth = t => t * t * (3 - 2 * t);
  return (u, v) => {
    const x = u * cells;
    const y = v * cells;
    const x0 = Math.floor(x);
    const y0 = Math.floor(y);
    const sx = smooth(x - x0);
    const sy = smooth(y - y0);
    const x1 = Math.min(x0 + 1, cells);
    const y1 = Math.min(y0 + 1, cells);
    const top = at(x0, y0) * (1 - sx) + at(x1, y0) * sx;
    const bottom = at(x0, y1) * (1 - sx) + at(x1, y1) * sx;
    return top * (1 - sy) + bottom * sy;
  };
}

const octaves = [
  {noise: makeNoise(SEED, 4), weight: 1},
  {noise: makeNoise(SEED + 1, 8), weight: 0.45},
  {noise: makeNoise(SEED + 2, 16), weight: 0.18},
];

const values = new Float64Array(W * H);
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const u = x / (W - 1);
    const v = y / (H - 1);
    values[y * W + x] = octaves.reduce((sum, o) => sum + o.noise(u, v) * o.weight, 0);
  }
}

let min = Infinity;
let max = -Infinity;
for (const value of values) {
  min = Math.min(min, value);
  max = Math.max(max, value);
}
const thresholds = Array.from({length: LEVELS}, (_, i) => min + ((max - min) * (i + 0.5)) / LEVELS);

// Anel → path, descartando pontos muito próximos (arquivo bem menor sem
// perder a forma).
function ringToPath(ring) {
  const out = [];
  let last = null;
  for (const [x, y] of ring) {
    if (last && Math.hypot(x - last[0], y - last[1]) < 1.4)
      continue;
    out.push(`${x.toFixed(1)} ${y.toFixed(1)}`);
    last = [x, y];
  }
  return out.length > 2 ? `M${out.join("L")}Z` : "";
}

const paths = contours().size([W, H]).thresholds(thresholds)(values).map((level, i) => {
  const d = level.coordinates.flatMap(polygon => polygon.map(ringToPath)).join("");
  // Uma curva "mestra" a cada 5, como nos mapas topográficos.
  const index = i % 5 === 0;
  return `<path d="${d}" stroke-opacity="${index ? 0.16 : 0.08}" stroke-width="${index ? 0.28 : 0.18}"/>`;
});

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="1 1 ${W - 2} ${H - 2}" preserveAspectRatio="xMidYMid slice" fill="none" stroke="#ffffff" stroke-linejoin="round">${paths.join("")}</svg>\n`;

const out = path.join(process.cwd(), "public", "topo.svg");
fs.writeFileSync(out, svg);
console.log(`topo.svg: ${(svg.length / 1024).toFixed(1)} KB, ${LEVELS} curvas`);
