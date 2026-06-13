"use client";

// Tracé de la fonction f(x) associée à l'équation (forme « … = 0 »).
// Les solutions réelles sont exactement les points où la courbe coupe l'axe des x.

type Props = {
  poly: number[]; // coefficients indexés par puissance de x
  roots: number[]; // racines réelles à marquer
};

const W = 600;
const H = 360;
const PAD_L = 44;
const PAD_R = 16;
const PAD_T = 16;
const PAD_B = 32;

function evalPoly(poly: number[], x: number): number {
  let y = 0;
  for (let i = poly.length - 1; i >= 0; i--) y = y * x + poly[i];
  return y;
}

// Intervalle « rond » (1, 2, 5 × 10ⁿ) proche de span / cible.
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

export default function Graph({ poly, roots }: Props) {
  // --- Domaine en x : centré sur les racines (et le sommet pour le 2nd degré).
  const interesting: number[] = [...roots];
  if (poly.length >= 3 && Math.abs(poly[2]) > 1e-12) {
    interesting.push(-poly[1] / (2 * poly[2])); // sommet de la parabole
  }

  let xmin: number;
  let xmax: number;
  if (interesting.length > 0) {
    const lo = Math.min(...interesting);
    const hi = Math.max(...interesting);
    if (hi - lo < 1e-9) {
      const half = Math.max(4, Math.abs(lo) * 0.5 + 2);
      xmin = lo - half;
      xmax = lo + half;
    } else {
      const pad = (hi - lo) * 0.6 + 1;
      xmin = lo - pad;
      xmax = hi + pad;
    }
  } else {
    xmin = -10;
    xmax = 10;
  }

  // --- Échantillonnage de la courbe.
  const N = 240;
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i <= N; i++) {
    const x = xmin + ((xmax - xmin) * i) / N;
    pts.push({ x, y: evalPoly(poly, x) });
  }

  // --- Domaine en y : on englobe les valeurs ET la ligne y = 0 (où sont les racines).
  let ymin = Math.min(0, ...pts.map((p) => p.y));
  let ymax = Math.max(0, ...pts.map((p) => p.y));
  if (ymax - ymin < 1e-9) {
    ymin -= 1;
    ymax += 1;
  }
  const ypad = (ymax - ymin) * 0.12;
  ymin -= ypad;
  ymax += ypad;

  // --- Fonctions de projection vers les coordonnées SVG.
  const sx = (x: number) => PAD_L + ((x - xmin) / (xmax - xmin)) * (W - PAD_L - PAD_R);
  const sy = (y: number) => PAD_T + ((ymax - y) / (ymax - ymin)) * (H - PAD_T - PAD_B);

  // --- Graduations.
  const xStep = niceStep(xmax - xmin, 8);
  const yStep = niceStep(ymax - ymin, 6);
  const xTicks: number[] = [];
  for (let t = Math.ceil(xmin / xStep) * xStep; t <= xmax; t += xStep) xTicks.push(t);
  const yTicks: number[] = [];
  for (let t = Math.ceil(ymin / yStep) * yStep; t <= ymax; t += yStep) yTicks.push(t);

  const axisYvisible = xmin <= 0 && xmax >= 0; // axe vertical x = 0 visible ?
  const curve = pts.map((p) => `${sx(p.x).toFixed(1)},${sy(p.y).toFixed(1)}`).join(" ");

  return (
    <div className="graph">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Graphique de la fonction">
        {/* Grille */}
        {xTicks.map((t) => (
          <line
            key={`gx${t}`}
            x1={sx(t)}
            y1={PAD_T}
            x2={sx(t)}
            y2={H - PAD_B}
            className="grid"
          />
        ))}
        {yTicks.map((t) => (
          <line
            key={`gy${t}`}
            x1={PAD_L}
            y1={sy(t)}
            x2={W - PAD_R}
            y2={sy(t)}
            className="grid"
          />
        ))}

        {/* Axe des x (y = 0) — toujours visible car le domaine y englobe 0 */}
        <line x1={PAD_L} y1={sy(0)} x2={W - PAD_R} y2={sy(0)} className="axis" />
        {/* Axe des y (x = 0) si dans le cadre */}
        {axisYvisible && (
          <line x1={sx(0)} y1={PAD_T} x2={sx(0)} y2={H - PAD_B} className="axis" />
        )}

        {/* Graduations chiffrées */}
        {xTicks.map((t) => (
          <text key={`tx${t}`} x={sx(t)} y={H - PAD_B + 16} className="tick-x">
            {fmtTick(t)}
          </text>
        ))}
        {yTicks.map((t) =>
          Math.abs(t) < 1e-9 ? null : (
            <text key={`ty${t}`} x={PAD_L - 6} y={sy(t) + 4} className="tick-y">
              {fmtTick(t)}
            </text>
          )
        )}

        {/* La courbe */}
        <polyline points={curve} className="curve" />

        {/* Racines : points sur l'axe des x + étiquette */}
        {roots.map((r, i) => (
          <g key={`r${i}`}>
            <circle cx={sx(r)} cy={sy(0)} r={5.5} className="root" />
            <text x={sx(r)} y={sy(0) - 12} className="root-label">
              x = {fmtTick(r)}
            </text>
          </g>
        ))}
      </svg>

      <p className="graph-caption">
        {roots.length === 0
          ? "La courbe ne coupe jamais l'axe horizontal : aucune solution réelle."
          : roots.length === 1
          ? "La courbe touche l'axe horizontal en un point : c'est l'unique solution."
          : "Chaque point où la courbe croise l'axe horizontal est une solution."}
      </p>
    </div>
  );
}
