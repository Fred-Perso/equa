"use client";

import { useEffect, useRef, useState } from "react";
import { solveEquation, fmtNum, type Result } from "../lib/solver";
import Graph from "./Graph";

// Écrit le polynôme f(x) sous forme lisible (ex : "x² − 5x + 6").
function fmtPolyLabel(p: number[]): string {
  const parts: string[] = [];
  for (let i = p.length - 1; i >= 0; i--) {
    const c = p[i];
    if (Math.abs(c) < 1e-12) continue;
    const a = Math.abs(c);
    let body = "";
    if (i === 0) body = fmtNum(a);
    else {
      body = Math.abs(a - 1) < 1e-12 ? "" : fmtNum(a);
      body += i === 1 ? "x" : "x²";
    }
    if (parts.length === 0) parts.push((c < 0 ? "−" : "") + body);
    else parts.push(` ${c < 0 ? "−" : "+"} ${body}`);
  }
  return parts.length ? parts.join("") : "0";
}

const EXEMPLES = [
  "2x + 3 = 7",
  "3(x - 1) = x + 5",
  "x^2 - 5x + 6 = 0",
  "2x^2 + 4x = 0",
  "(x + 1)(x - 3) = 0",
  "x^2 + 1 = 0",
];

// Durées (ms) entre deux étapes selon la vitesse choisie.
const SPEEDS: { label: string; ms: number }[] = [
  { label: "0.5×", ms: 2400 },
  { label: "1×", ms: 1200 },
  { label: "2×", ms: 600 },
];

// Glossaire des termes employés dans les explications.
const GLOSSAIRE: { terme: string; def: string; exemple?: string }[] = [
  {
    terme: "Équation",
    def: "Une égalité qui contient une valeur inconnue. La résoudre, c'est trouver la (ou les) valeur(s) qui rendent l'égalité vraie.",
    exemple: "2x + 3 = 7",
  },
  {
    terme: "Inconnue (x)",
    def: "La valeur que l'on cherche. On la note traditionnellement « x », mais ce pourrait être n'importe quelle lettre.",
  },
  {
    terme: "Membre",
    def: "Ce qui se trouve de chaque côté du signe « = ». Le membre de gauche et le membre de droite.",
    exemple: "Dans 2x + 3 = 7, le membre de gauche est 2x + 3.",
  },
  {
    terme: "Terme",
    def: "Un morceau de l'expression séparé des autres par un + ou un −.",
    exemple: "3x, −5 et x² sont trois termes.",
  },
  {
    terme: "Coefficient",
    def: "Le nombre qui multiplie l'inconnue.",
    exemple: "Dans 3x, le coefficient est 3.",
  },
  {
    terme: "Terme constant",
    def: "Le terme qui ne contient pas d'inconnue : un nombre seul.",
    exemple: "Dans x² + 2x − 5, le terme constant est −5.",
  },
  {
    terme: "Degré",
    def: "La plus grande puissance de x présente. Degré 1 = équation « linéaire », degré 2 = équation « quadratique ».",
    exemple: "x² − 4 est de degré 2.",
  },
  {
    terme: "Polynôme",
    def: "Une somme de termes faisant intervenir des puissances entières de x.",
    exemple: "2x² + 3x − 1",
  },
  {
    terme: "Discriminant (Δ)",
    def: "Pour une équation du 2nd degré ax² + bx + c = 0, c'est Δ = b² − 4ac. Son signe indique le nombre de solutions réelles : Δ>0 → 2 solutions, Δ=0 → 1 solution, Δ<0 → aucune (solutions complexes).",
  },
  {
    terme: "Racine / solution",
    def: "Une valeur de x qui rend l'équation vraie (qui « annule » l'expression mise sous la forme … = 0).",
  },
];

// Cas concrets « vraie vie ».
const CAS_REELS: { emoji: string; titre: string; texte: string; eq: string }[] = [
  {
    emoji: "📱",
    titre: "Abonnement & budget (1er degré)",
    texte:
      "Un forfait coûte 8 € par mois, plus 12 € de frais d'activation. Avec un budget de 50 €, pendant combien de mois puis-je le garder ? On pose 8x + 12 = 50, et on résout pour trouver x (le nombre de mois).",
    eq: "8x + 12 = 50",
  },
  {
    emoji: "🚀",
    titre: "Trajectoire d'un objet lancé (2nd degré)",
    texte:
      "On lance un ballon vers le haut. Sa hauteur (en mètres) après t secondes vaut environ −5t² + 20t. À quel moment retouche-t-il le sol (hauteur = 0) ? On résout −5t² + 20t = 0 : les solutions t = 0 (départ) et t = 4 s (retombée).",
    eq: "-5x^2 + 20x = 0",
  },
  {
    emoji: "🏡",
    titre: "Dimensionner un terrain (2nd degré)",
    texte:
      "Un jardin rectangulaire est 3 m plus long que large et doit faire 40 m² . Si x est la largeur, sa longueur est x + 3, donc x(x + 3) = 40. En résolvant, on trouve la largeur qui donne exactement cette surface.",
    eq: "x(x + 3) = 40",
  },
];

export default function EquationSolver() {
  const [input, setInput] = useState("x^2 - 5x + 6 = 0");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Nombre d'étapes actuellement révélées + état de lecture.
  const [revealed, setRevealed] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speedIdx, setSpeedIdx] = useState(1);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const total = result?.steps.length ?? 0;
  const done = result != null && revealed >= total;

  function handleSolve(value?: string) {
    const eq = value ?? input;
    if (value !== undefined) setInput(value);
    clearTimer();
    setError(null);
    setResult(null);
    setRevealed(0);
    setPlaying(false);
    try {
      const r = solveEquation(eq);
      setResult(r);
      setRevealed(1); // on montre tout de suite la 1re étape
      setPlaying(true); // puis on lance l'animation
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur inconnue.");
    }
  }

  function clearTimer() {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }

  // Moteur d'animation : tant qu'on « joue » et qu'il reste des étapes,
  // on en dévoile une de plus après le délai correspondant à la vitesse.
  useEffect(() => {
    clearTimer();
    if (!playing || !result) return;
    if (revealed >= result.steps.length) {
      setPlaying(false);
      return;
    }
    timer.current = setTimeout(() => {
      setRevealed((n) => n + 1);
    }, SPEEDS[speedIdx].ms);
    return clearTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, revealed, result, speedIdx]);

  function togglePlay() {
    if (!result) return;
    if (done) {
      // rejouer depuis le début
      setRevealed(1);
      setPlaying(true);
    } else {
      setPlaying((p) => !p);
    }
  }

  function nextStep() {
    if (!result) return;
    setPlaying(false);
    setRevealed((n) => Math.min(n + 1, result.steps.length));
  }

  function showAll() {
    if (!result) return;
    setPlaying(false);
    setRevealed(result.steps.length);
  }

  // Charge une équation citée dans le tuto/les exemples et remonte en haut.
  function loadEquation(eq: string) {
    handleSolve(eq);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <main className="page">
      <div className="container">
        <header className="header">
          <h1>🧮 Résolveur d'équations</h1>
          <p>
            Saisis une équation : l'application la résout <strong>et</strong> déroule
            chaque étape du raisonnement, animée pas à pas.
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
            <h2 className="steps-title first">Explication pas à pas</h2>

            {/* Barre de contrôle de l'animation */}
            <div className="controls">
              <div className="ctrl-buttons">
                <button
                  className="ctrl"
                  onClick={togglePlay}
                  title={done ? "Rejouer" : playing ? "Pause" : "Lecture"}
                >
                  {done ? "↻ Rejouer" : playing ? "⏸ Pause" : "▶ Lecture"}
                </button>
                <button
                  className="ctrl ghost"
                  onClick={nextStep}
                  disabled={done}
                  title="Étape suivante"
                >
                  ⏭ Étape
                </button>
                <button className="ctrl ghost" onClick={showAll} disabled={done}>
                  Tout afficher
                </button>
              </div>

              <div className="ctrl-right">
                <div className="speed">
                  {SPEEDS.map((s, i) => (
                    <button
                      key={s.label}
                      className={`speed-btn ${i === speedIdx ? "on" : ""}`}
                      onClick={() => setSpeedIdx(i)}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
                <span className="counter">
                  {Math.min(revealed, total)} / {total}
                </span>
              </div>
            </div>

            <div className="progress">
              <div
                className="progress-bar"
                style={{ width: `${total ? (Math.min(revealed, total) / total) * 100 : 0}%` }}
              />
            </div>

            <ol className="steps">
              {result.steps.slice(0, revealed).map((step, i) => (
                <li
                  key={i}
                  className={`step-item ${i === revealed - 1 && !done ? "active" : ""}`}
                >
                  <div className="step-num">{i + 1}</div>
                  <div className="step-body">
                    <div className="step-title">{step.title}</div>
                    <pre className="step-detail">{step.detail}</pre>
                  </div>
                </li>
              ))}
            </ol>

            {/* Le résultat ne se dévoile qu'une fois toutes les étapes jouées */}
            {done && (
              <div className="solutions reveal">
                <h2>✅ Résultat</h2>
                {result.solutions.length > 0 ? (
                  <div className="sol-list">
                    {result.solutions.map((s, i) => (
                      <span
                        key={i}
                        className="sol-pill pop"
                        style={{ animationDelay: `${i * 0.12}s` }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="sol-pill none pop">Aucune solution réelle</span>
                )}
                <p className="summary">{result.summary}</p>

                <h3 className="graph-title">📈 Représentation graphique</h3>
                <p className="graph-intro">
                  On trace la fonction f(x) obtenue en ramenant tout d'un côté
                  (<code>{`${fmtPolyLabel(result.poly)} = 0`}</code>). Les{" "}
                  <strong>solutions</strong> sont les abscisses où la courbe croise
                  l'axe horizontal.
                </p>
                <Graph poly={result.poly} roots={result.roots} />
              </div>
            )}
          </div>
        )}

        {/* ----- Section pédagogique ----- */}
        <div className="learn">
          <h2 className="learn-heading">📚 Comprendre les équations</h2>

          {/* Glossaire */}
          <details className="accordion" open>
            <summary>
              <span className="acc-icon">🔤</span> Glossaire — le vocabulaire
            </summary>
            <div className="acc-body">
              <p className="acc-intro">
                Les mots qui reviennent dans les explications du solveur, en clair :
              </p>
              <dl className="glossary">
                {GLOSSAIRE.map((g) => (
                  <div key={g.terme} className="gloss-item">
                    <dt>{g.terme}</dt>
                    <dd>
                      {g.def}
                      {g.exemple && (
                        <span className="gloss-ex">Exemple : {g.exemple}</span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </details>

          {/* Mini-tuto */}
          <details className="accordion">
            <summary>
              <span className="acc-icon">🧭</span> Mini-tuto — comment on résout
            </summary>
            <div className="acc-body">
              <h3 className="tuto-h">1️⃣ Équation du 1er degré (linéaire)</h3>
              <p>
                Forme <code>a·x + b = 0</code>. On veut isoler x :
              </p>
              <ol className="tuto-steps">
                <li>Regrouper les termes en x d'un côté, les nombres de l'autre.</li>
                <li>Réduire chaque côté.</li>
                <li>Diviser par le coefficient de x.</li>
              </ol>
              <div className="tuto-example">
                <code>2x + 3 = 7</code> → <code>2x = 4</code> → <code>x = 2</code>
                <button className="try" onClick={() => loadEquation("2x + 3 = 7")}>
                  ▶ Essayer
                </button>
              </div>

              <h3 className="tuto-h">2️⃣ Équation du 2nd degré (quadratique)</h3>
              <p>
                Forme <code>a·x² + b·x + c = 0</code>. On utilise le discriminant :
              </p>
              <ol className="tuto-steps">
                <li>Tout ramener d'un côté pour obtenir « … = 0 ».</li>
                <li>
                  Calculer <strong>Δ = b² − 4ac</strong>.
                </li>
                <li>
                  Lire le résultat selon le signe de Δ :
                  <ul className="tuto-cases">
                    <li>
                      <strong>Δ &gt; 0</strong> → deux solutions :{" "}
                      <code>x = (−b ± √Δ) / (2a)</code>
                    </li>
                    <li>
                      <strong>Δ = 0</strong> → une solution double :{" "}
                      <code>x = −b / (2a)</code>
                    </li>
                    <li>
                      <strong>Δ &lt; 0</strong> → aucune solution réelle (solutions
                      complexes).
                    </li>
                  </ul>
                </li>
              </ol>
              <div className="tuto-example">
                <code>x² − 5x + 6 = 0</code> → Δ = 1 →{" "}
                <code>x = 2</code> ou <code>x = 3</code>
                <button
                  className="try"
                  onClick={() => loadEquation("x^2 - 5x + 6 = 0")}
                >
                  ▶ Essayer
                </button>
              </div>
            </div>
          </details>

          {/* Vraie vie */}
          <details className="accordion">
            <summary>
              <span className="acc-icon">🌍</span> À quoi ça sert dans la vraie vie
            </summary>
            <div className="acc-body">
              <p className="acc-intro">
                Une équation, c'est juste une question posée avec des chiffres :
                « quelle valeur faut-il pour que ça tombe juste ? » On en croise
                partout sans le savoir.
              </p>
              <div className="cas-list">
                {CAS_REELS.map((c) => (
                  <div key={c.titre} className="cas-item">
                    <div className="cas-titre">
                      <span className="cas-emoji">{c.emoji}</span>
                      {c.titre}
                    </div>
                    <p className="cas-texte">{c.texte}</p>
                    <button className="try" onClick={() => loadEquation(c.eq)}>
                      ▶ Résoudre <code>{c.eq}</code>
                    </button>
                  </div>
                ))}
              </div>
              <p className="cas-foot">
                Et au-delà : un ingénieur calcule la résistance d'un pont, un banquier
                des intérêts, un médecin une dose, un développeur l'équilibrage d'un
                jeu… toujours en résolvant des équations.
              </p>
            </div>
          </details>
        </div>

        <footer className="footer">
          Gère les équations du 1er et du 2nd degré (linéaires et quadratiques).
        </footer>
      </div>
    </main>
  );
}
