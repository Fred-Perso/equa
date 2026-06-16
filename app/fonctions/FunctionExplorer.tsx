"use client";

import { useState } from "react";

// ---------------------------------------------------------------------------
// Explorateur de fonctions : on choisit une famille, on règle les paramètres
// avec des curseurs, et la courbe se trace en direct.
// ---------------------------------------------------------------------------

type Param = { name: string; min: number; max: number; step: number; val: number };
type Preset = {
  key: string;
  emoji: string;
  label: string;
  params: Param[];
  f: (x: number, p: Record<string, number>) => number;
  xRange: [number, number];
  yRange: [number, number];
  desc: string;
  expr: (p: Record<string, number>) => string;
  rel?: boolean; // fait le lien avec la relativité
  asym0?: boolean; // trace l'asymptote y = 0 (la courbe tend vers zéro)
  xLabel?: string;
  yLabel?: string;
};

const PRESETS: Preset[] = [
  {
    key: "affine",
    emoji: "📏",
    label: "Affine",
    params: [
      { name: "a", min: -4, max: 4, step: 0.5, val: 1 },
      { name: "b", min: -6, max: 6, step: 0.5, val: 1 },
    ],
    f: (x, p) => p.a * x + p.b,
    xRange: [-10, 10],
    yRange: [-10, 10],
    desc: "Une droite. « a » est la pente (l'inclinaison), « b » est l'endroit où elle croise l'axe vertical.",
    expr: (p) => `f(x) = ${p.a}·x ${p.b >= 0 ? "+ " + p.b : "− " + -p.b}`,
  },
  {
    key: "parabole",
    emoji: "🥣",
    label: "Carré (parabole)",
    params: [
      { name: "a", min: -3, max: 3, step: 0.25, val: 1 },
      { name: "b", min: -6, max: 6, step: 0.5, val: 0 },
      { name: "c", min: -6, max: 6, step: 0.5, val: -4 },
    ],
    f: (x, p) => p.a * x * x + p.b * x + p.c,
    xRange: [-8, 8],
    yRange: [-10, 14],
    desc: "Une courbe en forme de bol (ou de cloche renversée si a < 0). C'est la fonction des trajectoires et des équations du 2nd degré.",
    expr: (p) =>
      `f(x) = ${p.a}·x² ${p.b >= 0 ? "+ " + p.b : "− " + -p.b}·x ${
        p.c >= 0 ? "+ " + p.c : "− " + -p.c
      }`,
  },
  {
    key: "inverse",
    emoji: "⤵️",
    label: "Inverse",
    params: [{ name: "a", min: -6, max: 6, step: 0.5, val: 2 }],
    f: (x, p) => p.a / x,
    xRange: [-8, 8],
    yRange: [-8, 8],
    desc: "Plus x grandit, plus f(x) rapetisse. Deux branches qui ne touchent jamais les axes : ce sont des « asymptotes ».",
    expr: (p) => `f(x) = ${p.a} / x`,
  },
  {
    key: "exp",
    emoji: "🚀",
    label: "Exponentielle",
    params: [
      { name: "a", min: 0.5, max: 3, step: 0.5, val: 1 },
      { name: "k", min: -1.5, max: 1.5, step: 0.25, val: 0.8 },
    ],
    f: (x, p) => p.a * Math.exp(p.k * x),
    xRange: [-5, 5],
    yRange: [-2, 20],
    desc: "Une croissance (ou décroissance) fulgurante. Sert à décrire les intérêts composés, une épidémie, la radioactivité…",
    expr: (p) => `f(x) = ${p.a}·e^(${p.k}·x)`,
  },
  {
    key: "inv2",
    emoji: "⤵️",
    label: "1/x² — tend vers 0",
    params: [],
    f: (x) => (x !== 0 ? 1 / (x * x) : NaN),
    xRange: [-6, 6],
    yRange: [-0.6, 8],
    desc: "Quand x s'éloigne de 0 (à droite OU à gauche), la courbe plonge vers 0 et se colle à l'axe… sans jamais le toucher. La ligne verte en pointillés est l'asymptote y = 0.",
    expr: () => "f(x) = 1 / x²",
    asym0: true,
  },
  {
    key: "decay",
    emoji: "📉",
    label: "e^(−x) — décroissance",
    params: [],
    f: (x) => Math.exp(-x),
    xRange: [-2, 6],
    yRange: [-0.6, 6],
    desc: "La décroissance exponentielle : divisée par le même facteur à chaque pas. Elle fond vers 0 très vite, mais reste toujours au-dessus de l'axe (asymptote y = 0).",
    expr: () => "f(x) = e^(−x)",
    asym0: true,
  },
  {
    key: "gauss",
    emoji: "🔔",
    label: "Cloche de Gauss",
    params: [],
    f: (x) => Math.exp(-x * x),
    xRange: [-4, 4],
    yRange: [-0.15, 1.2],
    desc: "La fameuse courbe en cloche (celle des probabilités). Ses deux extrémités s'aplatissent vers 0 des deux côtés, sans jamais l'atteindre.",
    expr: () => "f(x) = e^(−x²)",
    asym0: true,
  },
  {
    key: "lorentz",
    emoji: "🌌",
    label: "Lorentz γ(v) — relativité !",
    params: [],
    f: (v) => (v > -1 && v < 1 ? 1 / Math.sqrt(1 - v * v) : NaN),
    xRange: [-0.99, 0.99],
    yRange: [0, 8],
    desc: "Le facteur de Lorentz de la relativité restreinte EST une fonction : γ en fonction de la vitesse v (ici en unités où c = 1). Près de v = ±1 (la vitesse de la lumière), la courbe s'envole vers l'infini.",
    expr: () => "γ(v) = 1 / √(1 − v²)",
    rel: true,
    xLabel: "v (en fraction de c)",
    yLabel: "γ",
  },
];

const W = 600;
const H = 360;
const PAD_L = 46;
const PAD_R = 16;
const PAD_T = 16;
const PAD_B = 34;

function niceStep(span: number, target: number): number {
  const raw = span / target;
  const pow = Math.pow(10, Math.floor(Math.log10(raw)));
  const n = raw / pow;
  const mult = n >= 5 ? 5 : n >= 2 ? 2 : 1;
  return mult * pow;
}

function fmtTick(v: number): string {
  if (Math.abs(v) < 1e-9) return "0";
  const r = Math.round(v * 100) / 100;
  return String(r);
}

function initParams(p: Preset): Record<string, number> {
  return Object.fromEntries(p.params.map((q) => [q.name, q.val]));
}

export default function FunctionExplorer() {
  const [key, setKey] = useState("parabole");
  const preset = PRESETS.find((p) => p.key === key)!;
  const [params, setParams] = useState<Record<string, number>>(() => initParams(preset));

  function choose(p: Preset) {
    setKey(p.key);
    setParams(initParams(p));
  }

  const [xmin, xmax] = preset.xRange;
  const [ymin, ymax] = preset.yRange;

  const sx = (x: number) => PAD_L + ((x - xmin) / (xmax - xmin)) * (W - PAD_L - PAD_R);
  const sy = (y: number) => PAD_T + ((ymax - y) / (ymax - ymin)) * (H - PAD_T - PAD_B);

  // Échantillonnage avec rupture des segments aux discontinuités / hors-cadre.
  const N = 360;
  const yBig = ymax + (ymax - ymin) * 3;
  const segments: string[][] = [];
  let current: string[] = [];
  for (let i = 0; i <= N; i++) {
    const x = xmin + ((xmax - xmin) * i) / N;
    const y = preset.f(x, params);
    if (Number.isFinite(y) && Math.abs(y) <= yBig) {
      const yc = Math.max(ymin, Math.min(ymax, y)); // on clippe au cadre
      current.push(`${sx(x).toFixed(1)},${sy(yc).toFixed(1)}`);
    } else if (current.length) {
      segments.push(current);
      current = [];
    }
  }
  if (current.length) segments.push(current);

  // Graduations.
  const xStep = niceStep(xmax - xmin, 8);
  const yStep = niceStep(ymax - ymin, 6);
  const xTicks: number[] = [];
  for (let t = Math.ceil(xmin / xStep) * xStep; t <= xmax + 1e-9; t += xStep)
    xTicks.push(t);
  const yTicks: number[] = [];
  for (let t = Math.ceil(ymin / yStep) * yStep; t <= ymax + 1e-9; t += yStep)
    yTicks.push(t);

  const xAxis = ymin <= 0 && ymax >= 0;
  const yAxis = xmin <= 0 && xmax >= 0;

  return (
    <div className={`card calc explorer ${preset.rel ? "rel" : ""}`}>
      <h2 className="steps-title first">🎛️ Explorateur de fonctions</h2>
      <p className="graph-intro">
        Choisis une famille de fonctions, bouge les curseurs et regarde la courbe
        changer en direct.
      </p>

      <div className="calc-presets">
        {PRESETS.map((p) => (
          <button
            key={p.key}
            className={`chip ${p.key === key ? "on" : ""} ${p.rel ? "rel-chip" : ""}`}
            onClick={() => choose(p)}
          >
            {p.emoji} {p.label}
          </button>
        ))}
      </div>

      <div className="fexpr">{preset.expr(params)}</div>

      {preset.params.length > 0 && (
        <div className="fparams">
          {preset.params.map((q) => (
            <div key={q.name} className="fparam">
              <label>
                <span className="fparam-name">{q.name}</span>
                <span className="fparam-val">{params[q.name]}</span>
              </label>
              <input
                type="range"
                min={q.min}
                max={q.max}
                step={q.step}
                value={params[q.name]}
                onChange={(e) =>
                  setParams((prev) => ({ ...prev, [q.name]: parseFloat(e.target.value) }))
                }
              />
            </div>
          ))}
        </div>
      )}

      <div className="graph">
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Courbe de la fonction">
          {xTicks.map((t) => (
            <line key={`gx${t}`} x1={sx(t)} y1={PAD_T} x2={sx(t)} y2={H - PAD_B} className="grid" />
          ))}
          {yTicks.map((t) => (
            <line key={`gy${t}`} x1={PAD_L} y1={sy(t)} x2={W - PAD_R} y2={sy(t)} className="grid" />
          ))}

          {xAxis && (
            <line x1={PAD_L} y1={sy(0)} x2={W - PAD_R} y2={sy(0)} className="axis" />
          )}
          {yAxis && (
            <line x1={sx(0)} y1={PAD_T} x2={sx(0)} y2={H - PAD_B} className="axis" />
          )}

          {xTicks.map((t) => (
            <text key={`tx${t}`} x={sx(t)} y={H - PAD_B + 16} className="tick-x">
              {fmtTick(t)}
            </text>
          ))}
          {yTicks.map((t) =>
            Math.abs(t) < 1e-9 && yAxis ? null : (
              <text key={`ty${t}`} x={PAD_L - 6} y={sy(t) + 4} className="tick-y">
                {fmtTick(t)}
              </text>
            )
          )}

          {/* asymptote y = 0 : la courbe s'en approche sans jamais la toucher */}
          {preset.asym0 && (
            <>
              <line
                x1={PAD_L}
                y1={sy(0)}
                x2={W - PAD_R}
                y2={sy(0)}
                className="asymptote"
              />
              <text x={W - PAD_R - 4} y={sy(0) - 7} className="asym-label" textAnchor="end">
                asymptote y = 0 (jamais atteinte)
              </text>
            </>
          )}

          {segments.map((seg, i) => (
            <polyline key={i} points={seg.join(" ")} className="curve plain" />
          ))}

          {/* étiquettes d'axes (cas relativité) */}
          {preset.xLabel && (
            <text x={W - PAD_R} y={sy(0) - 6} className="tick-x" textAnchor="end">
              {preset.xLabel}
            </text>
          )}
          {preset.yLabel && (
            <text x={sx(0) + 6} y={PAD_T + 12} className="tick-y" textAnchor="start">
              {preset.yLabel}
            </text>
          )}
        </svg>
      </div>

      <p className={`calc-mood ${preset.rel ? "rel-note" : ""}`}>{preset.desc}</p>
    </div>
  );
}
