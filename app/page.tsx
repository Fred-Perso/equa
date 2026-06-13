"use client";

import { useState } from "react";
import { solveEquation, type Result } from "../lib/solver";

const EXEMPLES = [
  "2x + 3 = 7",
  "3(x - 1) = x + 5",
  "x^2 - 5x + 6 = 0",
  "2x^2 + 4x = 0",
  "(x + 1)(x - 3) = 0",
  "x^2 + 1 = 0",
];

export default function Home() {
  const [input, setInput] = useState("x^2 - 5x + 6 = 0");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleSolve(value?: string) {
    const eq = value ?? input;
    if (value !== undefined) setInput(value);
    setError(null);
    setResult(null);
    try {
      setResult(solveEquation(eq));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur inconnue.");
    }
  }

  return (
    <main className="page">
      <div className="container">
        <header className="header">
          <h1>🧮 Résolveur d'équations</h1>
          <p>
            Saisis une équation : l'application la résout <strong>et</strong> t'explique
            chaque étape du raisonnement.
          </p>
        </header>

        <div className="card">
          <label htmlFor="eq">Ton équation</label>
          <div className="input-row">
            <input
              id="eq"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSolve()}
              placeholder="ex : x^2 - 5x + 6 = 0"
              autoComplete="off"
            />
            <button onClick={() => handleSolve()}>Résoudre</button>
          </div>

          <div className="examples">
            <span>Exemples :</span>
            {EXEMPLES.map((ex) => (
              <button key={ex} className="chip" onClick={() => handleSolve(ex)}>
                {ex}
              </button>
            ))}
          </div>

          <p className="hint">
            Astuce : utilise <code>x^2</code> pour x², <code>*</code> pour multiplier
            (facultatif : <code>2x</code> fonctionne), et les parenthèses sont gérées.
          </p>
        </div>

        {error && (
          <div className="card error">
            <strong>⚠️ Impossible de résoudre</strong>
            <p>{error}</p>
          </div>
        )}

        {result && (
          <div className="card">
            <div className="solutions">
              <h2>Résultat</h2>
              {result.solutions.length > 0 ? (
                <div className="sol-list">
                  {result.solutions.map((s, i) => (
                    <span key={i} className="sol-pill">
                      {s}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="sol-pill none">Aucune solution réelle</span>
              )}
              <p className="summary">{result.summary}</p>
            </div>

            <h2 className="steps-title">Explication pas à pas</h2>
            <ol className="steps">
              {result.steps.map((step, i) => (
                <li key={i}>
                  <div className="step-num">{i + 1}</div>
                  <div className="step-body">
                    <div className="step-title">{step.title}</div>
                    <pre className="step-detail">{step.detail}</pre>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}

        <footer className="footer">
          Gère les équations du 1er et du 2nd degré (linéaires et quadratiques).
        </footer>
      </div>
    </main>
  );
}
