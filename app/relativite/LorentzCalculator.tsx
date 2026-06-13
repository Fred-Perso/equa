"use client";

import { useState } from "react";

const C_KMS = 299792.458; // vitesse de la lumière en km/s

// Quelques vitesses repères, exprimées en % de la vitesse de la lumière.
const PRESETS: { label: string; pct: number }[] = [
  { label: "Station ISS (7,7 km/s)", pct: 0.00255 },
  { label: "10 % de c", pct: 10 },
  { label: "50 % de c", pct: 50 },
  { label: "90 % de c", pct: 90 },
  { label: "99 % de c", pct: 99 },
  { label: "99,9 % de c", pct: 99.9 },
];

function fmtGamma(g: number): string {
  if (g - 1 < 1e-4) return g.toFixed(8); // quasi immobile : on montre les décimales
  if (g < 10) return g.toFixed(3);
  if (g < 100) return g.toFixed(1);
  return Math.round(g).toLocaleString("fr-FR");
}

function fmtYears(y: number): string {
  if (y < 10) return y.toFixed(2);
  if (y < 1000) return y.toFixed(0);
  return Math.round(y).toLocaleString("fr-FR");
}

function fmtMeters(m: number): string {
  if (m > 0.1) return `${(m * 100).toFixed(1)} cm`;
  if (m > 0.001) return `${(m * 1000).toFixed(1)} mm`;
  return `${(m * 1e6).toFixed(1)} µm`;
}

export default function LorentzCalculator() {
  const [pct, setPct] = useState(90);

  const beta = Math.min(pct / 100, 0.9999999);
  const gamma = 1 / Math.sqrt(1 - beta * beta);
  const vKms = beta * C_KMS;

  // Pour 1 an vécu par le voyageur, il s'écoule γ années sur Terre.
  const earthYears = gamma;
  // Une règle d'1 m, lancée à cette vitesse, paraît mesurer 1/γ mètre.
  const contracted = 1 / gamma;

  let mood = "À cette vitesse, les effets sont quasi imperceptibles.";
  if (gamma > 1.01 && gamma <= 2) mood = "Les effets deviennent nettement mesurables.";
  else if (gamma > 2 && gamma <= 7) mood = "Le temps et l'espace se déforment fortement.";
  else if (gamma > 7) mood = "Effets extrêmes : on frôle la vitesse de la lumière !";

  return (
    <div className="card calc">
      <h2 className="steps-title first">🧪 Calculateur relativiste</h2>
      <p className="graph-intro">
        Fais glisser la vitesse du vaisseau (en % de la vitesse de la lumière{" "}
        <em>c</em>) et observe le <strong>facteur de Lorentz γ</strong> ainsi que ses
        effets sur le temps et les longueurs.
      </p>

      <div className="calc-presets">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            className={`chip ${Math.abs(p.pct - pct) < 1e-9 ? "on" : ""}`}
            onClick={() => setPct(p.pct)}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="calc-slider">
        <input
          type="range"
          min={0}
          max={99.9}
          step={0.1}
          value={pct}
          onChange={(e) => setPct(parseFloat(e.target.value))}
        />
        <div className="calc-vline">
          <span>
            Vitesse : <strong>{pct < 0.01 ? pct.toFixed(5) : pct}</strong> % de c
          </span>
          <span className="muted">≈ {Math.round(vKms).toLocaleString("fr-FR")} km/s</span>
        </div>
      </div>

      <div className="calc-grid">
        <div className="calc-cell gamma">
          <div className="calc-k">Facteur de Lorentz γ</div>
          <div className="calc-v">{fmtGamma(gamma)}</div>
        </div>
        <div className="calc-cell">
          <div className="calc-k">⏱️ 1 an à bord équivaut à…</div>
          <div className="calc-v">{fmtYears(earthYears)} an(s) sur Terre</div>
        </div>
        <div className="calc-cell">
          <div className="calc-k">📏 Une règle d'1 m paraît mesurer…</div>
          <div className="calc-v">{fmtMeters(contracted)}</div>
        </div>
      </div>

      <p className="calc-mood">{mood}</p>
    </div>
  );
}
