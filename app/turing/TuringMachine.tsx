"use client";

import { useEffect, useRef, useState } from "react";

// ---------------------------------------------------------------------------
// Simulateur de machine de Turing — version « exemples concrets ».
// Chaque symbole veut dire quelque chose (un interrupteur, une marque, un
// bâton…) et une phrase raconte en français ce que la machine fait à chaque pas.
// ---------------------------------------------------------------------------

type Move = "L" | "R" | "S";
type Rule = { write: string; move: Move; next: string };
type Machine = {
  key: string;
  emoji: string;
  name: string;
  story: string;
  blank: string;
  tape: string;
  head: number;
  start: string;
  alphabet: string[];
  symInfo: Record<string, string>; // ce que représente chaque symbole
  stateInfo: Record<string, string>; // ce que « fait » chaque état, en clair
  transitions: Record<string, Record<string, Rule>>;
};

const HALT = "STOP";

const MACHINES: Machine[] = [
  {
    key: "switch",
    emoji: "💡",
    name: "Les interrupteurs",
    story:
      "Une rangée d'interrupteurs. La machine passe devant chacun et l'inverse : allumé → éteint, éteint → allumé. Elle s'arrête au bout de la rangée. (Symboles : ● = allumé, ○ = éteint.)",
    blank: "·",
    tape: "●○●○○",
    head: 0,
    start: "parcours",
    alphabet: ["○", "●", "·"],
    symInfo: {
      "○": "un interrupteur éteint",
      "●": "un interrupteur allumé",
      "·": "la fin de la rangée (vide)",
    },
    stateInfo: { parcours: "longe la rangée et inverse les interrupteurs" },
    transitions: {
      parcours: {
        "○": { write: "●", move: "R", next: "parcours" },
        "●": { write: "○", move: "R", next: "parcours" },
        "·": { write: "·", move: "S", next: HALT },
      },
    },
  },
  {
    key: "eraser",
    emoji: "🧹",
    name: "La gomme",
    story:
      "Un tableau couvert de marques. La machine est une éponge : elle efface chaque marque en avançant, jusqu'à atteindre le vide. L'exemple le plus simple qui soit. (Symbole : ▓ = une marque.)",
    blank: "·",
    tape: "▓▓▓▓▓",
    head: 0,
    start: "efface",
    alphabet: ["▓", "·"],
    symInfo: { "▓": "une marque au tableau", "·": "une case déjà vide" },
    stateInfo: { efface: "efface tout ce qu'elle rencontre" },
    transitions: {
      efface: {
        "▓": { write: "·", move: "R", next: "efface" },
        "·": { write: "·", move: "S", next: HALT },
      },
    },
  },
  {
    key: "add",
    emoji: "➕",
    name: "Additionner avec des bâtons",
    story:
      "On calcule 3 + 2 façon « bâtons » : ||| + ||. La machine colle les deux tas (le + devient un bâton) puis retire un bâton en trop. Résultat : ||||| = 5. C'est exactement compter sur ses doigts ! (Symboles : | = un bâton, + = le signe plus.)",
    blank: "·",
    tape: "|||+||",
    head: 0,
    start: "colle",
    alphabet: ["|", "+", "·"],
    symInfo: { "|": "un bâton", "+": "le signe +", "·": "le vide" },
    stateInfo: {
      colle: "avance jusqu'au signe + pour coller les deux tas",
      fin: "file jusqu'au tout dernier bâton",
      retire: "enlève le bâton en trop",
    },
    transitions: {
      colle: {
        "|": { write: "|", move: "R", next: "colle" },
        "+": { write: "|", move: "R", next: "fin" },
        "·": { write: "·", move: "S", next: HALT },
      },
      fin: {
        "|": { write: "|", move: "R", next: "fin" },
        "·": { write: "·", move: "L", next: "retire" },
      },
      retire: {
        "|": { write: "·", move: "S", next: HALT },
      },
    },
  },
  {
    key: "double",
    emoji: "✖️2",
    name: "La machine-fonction : f(x) = 2x",
    story:
      "Une vraie « machine-fonction » ! Tu mets x bâtons à gauche, elle recopie chacun pour écrire 2x bâtons à droite du repère =. C'est la fonction « doubler » de la section Fonctions, réalisée à la main. Ici x = 2 → on doit obtenir 4. Regarde les bâtons après le = : c'est la sortie f(x).",
    blank: "·",
    tape: "||",
    head: 0,
    start: "init",
    alphabet: ["|", "▪", "=", "·"],
    symInfo: {
      "|": "un bâton",
      "▪": "un bâton d'entrée déjà copié",
      "=": "le repère : à sa droite = le résultat f(x)",
      "·": "le vide",
    },
    stateInfo: {
      init: "place un repère = à la fin",
      rew: "revient tout au début",
      scan: "cherche le prochain bâton d'entrée à copier",
      app1: "va écrire le 1ᵉʳ des deux bâtons (à droite)",
      app2: "écrit le 2ᵉ bâton — on double !",
      home: "repart au début pour le bâton suivant",
      restore: "remet l'entrée au propre, c'est fini",
    },
    transitions: {
      init: {
        "|": { write: "|", move: "R", next: "init" },
        "=": { write: "=", move: "R", next: "init" },
        "·": { write: "=", move: "L", next: "rew" },
      },
      rew: {
        "|": { write: "|", move: "L", next: "rew" },
        "▪": { write: "▪", move: "L", next: "rew" },
        "=": { write: "=", move: "L", next: "rew" },
        "·": { write: "·", move: "R", next: "scan" },
      },
      scan: {
        "▪": { write: "▪", move: "R", next: "scan" },
        "|": { write: "▪", move: "R", next: "app1" },
        "=": { write: "=", move: "L", next: "restore" },
      },
      app1: {
        "|": { write: "|", move: "R", next: "app1" },
        "▪": { write: "▪", move: "R", next: "app1" },
        "=": { write: "=", move: "R", next: "app1" },
        "·": { write: "|", move: "R", next: "app2" },
      },
      app2: { "·": { write: "|", move: "L", next: "home" } },
      home: {
        "|": { write: "|", move: "L", next: "home" },
        "▪": { write: "▪", move: "L", next: "home" },
        "=": { write: "=", move: "L", next: "home" },
        "·": { write: "·", move: "R", next: "scan" },
      },
      restore: {
        "▪": { write: "|", move: "L", next: "restore" },
        "|": { write: "|", move: "L", next: "restore" },
        "·": { write: "·", move: "S", next: HALT },
      },
    },
  },
  {
    key: "mult",
    emoji: "✖️",
    name: "Multiplication : 2 × 2",
    story:
      "La multiplication façon bâtons : ||×||. Pour CHAQUE bâton de gauche, la machine recopie tout le groupe de droite dans la zone résultat (après le =). C'est la multiplication vue comme une addition répétée. Ici 2 × 2 → on doit obtenir 4 bâtons après le =.",
    blank: "·",
    tape: "||×||",
    head: 0,
    start: "init",
    alphabet: ["|", "×", "▪", "▫", "=", "·"],
    symInfo: {
      "|": "un bâton",
      "×": "le signe multiplier",
      "▪": "un bâton de gauche déjà traité",
      "▫": "un bâton de droite en cours de copie",
      "=": "le repère : à sa droite = le résultat",
      "·": "le vide",
    },
    stateInfo: {
      init: "place un repère = pour le résultat",
      rew: "revient tout au début",
      pickA: "prend un bâton du groupe de gauche",
      gotoB: "file vers le groupe de droite",
      copyB: "prend un bâton de droite à recopier",
      append: "ajoute ce bâton au résultat (après le =)",
      backB: "revient dans le groupe de droite",
      restoreB: "remet le groupe de droite au complet",
      toPickA: "retourne chercher le bâton de gauche suivant",
      restoreA: "termine et remet le tout au propre",
    },
    transitions: {
      init: {
        "|": { write: "|", move: "R", next: "init" },
        "×": { write: "×", move: "R", next: "init" },
        "=": { write: "=", move: "R", next: "init" },
        "·": { write: "=", move: "L", next: "rew" },
      },
      rew: {
        "|": { write: "|", move: "L", next: "rew" },
        "▪": { write: "▪", move: "L", next: "rew" },
        "▫": { write: "▫", move: "L", next: "rew" },
        "×": { write: "×", move: "L", next: "rew" },
        "=": { write: "=", move: "L", next: "rew" },
        "·": { write: "·", move: "R", next: "pickA" },
      },
      pickA: {
        "▪": { write: "▪", move: "R", next: "pickA" },
        "|": { write: "▪", move: "R", next: "gotoB" },
        "×": { write: "×", move: "S", next: "restoreA" },
      },
      gotoB: {
        "|": { write: "|", move: "R", next: "gotoB" },
        "▪": { write: "▪", move: "R", next: "gotoB" },
        "×": { write: "×", move: "R", next: "copyB" },
      },
      copyB: {
        "|": { write: "▫", move: "R", next: "append" },
        "▫": { write: "▫", move: "R", next: "copyB" },
        "=": { write: "=", move: "L", next: "restoreB" },
      },
      append: {
        "|": { write: "|", move: "R", next: "append" },
        "▫": { write: "▫", move: "R", next: "append" },
        "=": { write: "=", move: "R", next: "append" },
        "·": { write: "|", move: "L", next: "backB" },
      },
      backB: {
        "|": { write: "|", move: "L", next: "backB" },
        "=": { write: "=", move: "L", next: "backB" },
        "▫": { write: "▫", move: "L", next: "backB" },
        "×": { write: "×", move: "R", next: "copyB" },
      },
      restoreB: {
        "▫": { write: "|", move: "L", next: "restoreB" },
        "|": { write: "|", move: "L", next: "restoreB" },
        "×": { write: "×", move: "L", next: "toPickA" },
      },
      toPickA: {
        "|": { write: "|", move: "L", next: "toPickA" },
        "▪": { write: "▪", move: "L", next: "toPickA" },
        "·": { write: "·", move: "R", next: "pickA" },
      },
      restoreA: {
        "×": { write: "×", move: "L", next: "restoreA" },
        "▪": { write: "|", move: "L", next: "restoreA" },
        "|": { write: "|", move: "L", next: "restoreA" },
        "·": { write: "·", move: "S", next: HALT },
      },
    },
  },
  {
    key: "beaver",
    emoji: "🦫",
    name: "Le castor affairé (pour les curieux)",
    story:
      "Personne ne lui dit quoi dessiner : avec 3 petites règles seulement, il part d'un ruban vide, gribouille des marques en faisant des allers-retours, puis s'arrête tout seul après 13 pas. Étonnant ! (Symbole : ▮ = une marque.)",
    blank: "·",
    tape: "·",
    head: 0,
    start: "A",
    alphabet: ["·", "▮"],
    symInfo: { "·": "une case vide", "▮": "une marque" },
    stateInfo: { A: "phase A", B: "phase B", C: "phase C" },
    transitions: {
      A: {
        "·": { write: "▮", move: "R", next: "B" },
        "▮": { write: "▮", move: "L", next: "C" },
      },
      B: {
        "·": { write: "▮", move: "L", next: "A" },
        "▮": { write: "▮", move: "R", next: "B" },
      },
      C: {
        "·": { write: "▮", move: "L", next: "B" },
        "▮": { write: "▮", move: "R", next: HALT },
      },
    },
  },
];

const SPEEDS = [
  { label: "lent", ms: 1100 },
  { label: "normal", ms: 550 },
  { label: "rapide", ms: 230 },
];

const WINDOW = 6;

function buildTape(m: Machine): Record<number, string> {
  const t: Record<number, string> = {};
  for (let i = 0; i < m.tape.length; i++) t[i] = m.tape[i];
  return t;
}

export default function TuringMachine() {
  const [mKey, setMKey] = useState("switch");
  const machine = MACHINES.find((m) => m.key === mKey)!;

  const [tape, setTape] = useState<Record<number, string>>(() => buildTape(machine));
  const [head, setHead] = useState(machine.head);
  const [state, setState] = useState(machine.start);
  const [steps, setSteps] = useState(0);
  const [halted, setHalted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [speedIdx, setSpeedIdx] = useState(1);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function clearTimer() {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  }

  function reset(m: Machine) {
    clearTimer();
    setTape(buildTape(m));
    setHead(m.head);
    setState(m.start);
    setSteps(0);
    setHalted(false);
    setPlaying(false);
  }

  function chooseMachine(m: Machine) {
    setMKey(m.key);
    reset(m);
  }

  function readAt(t: Record<number, string>, i: number): string {
    return t[i] ?? machine.blank;
  }

  const currentSymbol = readAt(tape, head);
  const activeRule =
    !halted && state !== HALT ? machine.transitions[state]?.[currentSymbol] : undefined;

  function step() {
    if (halted || state === HALT) return;
    const sym = readAt(tape, head);
    const rule = machine.transitions[state]?.[sym];
    if (!rule) {
      setHalted(true);
      setPlaying(false);
      return;
    }
    setTape((prev) => ({ ...prev, [head]: rule.write }));
    setHead((h) => h + (rule.move === "R" ? 1 : rule.move === "L" ? -1 : 0));
    setSteps((s) => s + 1);
    if (rule.next === HALT) {
      setState(HALT);
      setHalted(true);
      setPlaying(false);
    } else {
      setState(rule.next);
    }
  }

  useEffect(() => {
    clearTimer();
    if (!playing || halted) return;
    timer.current = setTimeout(step, SPEEDS[speedIdx].ms);
    return clearTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, steps, halted, speedIdx]);

  function togglePlay() {
    if (halted) reset(machine);
    else setPlaying((p) => !p);
  }

  function manualStep() {
    setPlaying(false);
    step();
  }

  // ----- Narration : une phrase en français qui décrit le pas en cours -----
  function symName(s: string): string {
    return machine.symInfo[s] ?? `« ${s} »`;
  }
  function narration(): string {
    if (halted) {
      return "✋ Terminé : la machine a atteint l'état STOP, le calcul est fini.";
    }
    if (!activeRule) return "";
    const doing = machine.stateInfo[state] ?? `état « ${state} »`;
    const move =
      activeRule.move === "L"
        ? "recule d'une case ◀"
        : activeRule.move === "R"
        ? "avance d'une case ▶"
        : "reste sur place";
    const next =
      activeRule.next === HALT
        ? "puis elle s'arrête ✋"
        : `puis elle passe en « ${activeRule.next} »`;
    return `🔎 La machine ${doing}. Sous la tête : ${symName(currentSymbol)}. → elle écrit ${symName(
      activeRule.write
    )}, ${move}, ${next}.`;
  }

  const cells: number[] = [];
  for (let i = head - WINDOW; i <= head + WINDOW; i++) cells.push(i);

  // Résultat des machines de calcul : nombre de bâtons après le repère « = ».
  const hasResult = machine.alphabet.includes("=");
  function computeResult(): number {
    const ordered = Object.keys(tape)
      .map(Number)
      .sort((a, b) => a - b);
    let after = false;
    let c = 0;
    for (const i of ordered) {
      const v = tape[i];
      if (v === "=") after = true;
      else if (after && v === "|") c++;
    }
    return c;
  }

  return (
    <div className="card tm">
      <h2 className="steps-title first">⚙️ Simulateur — avec des exemples concrets</h2>

      <div className="calc-presets">
        {MACHINES.map((m) => (
          <button
            key={m.key}
            className={`chip ${m.key === mKey ? "on" : ""}`}
            onClick={() => chooseMachine(m)}
          >
            {m.emoji} {m.name}
          </button>
        ))}
      </div>

      <p className="graph-intro">{machine.story}</p>

      {/* Légende des symboles */}
      <div className="tm-legend">
        {machine.alphabet.map((s) => (
          <span key={s} className="tm-leg">
            <span className="tm-leg-sym">{s}</span> = {symName(s)}
          </span>
        ))}
      </div>

      {/* Le ruban */}
      <div className="tm-tape-wrap">
        <div className="tm-state-badge" data-halted={halted}>
          {halted ? "Le robot s'arrête ✋" : `🙂 Le robot ${machine.stateInfo[state] ?? state}`}
        </div>
        <div className="tm-head-arrow">🤖</div>
        <div className="tm-tape">
          {cells.map((i) => {
            const sym = readAt(tape, i);
            const isHead = i === head;
            const blank = sym === machine.blank;
            return (
              <div
                key={i}
                className={`tm-cell ${isHead ? "head" : ""} ${blank ? "blank" : ""}`}
              >
                {sym}
              </div>
            );
          })}
        </div>
      </div>

      {/* Narration en français */}
      <div className={`tm-narration ${halted ? "done" : ""}`}>{narration()}</div>

      {halted && hasResult && (
        <div className="tm-result">
          🎉 Résultat : <strong>{computeResult()}</strong> bâton(s) après le repère « = »
          &nbsp;—&nbsp; obtenu en <strong>{steps}</strong> pas.
        </div>
      )}

      {/* Contrôles */}
      <div className="controls">
        <div className="ctrl-buttons">
          <button className="ctrl" onClick={togglePlay}>
            {halted ? "↻ Recommencer" : playing ? "⏸ Pause" : "▶ Lancer"}
          </button>
          <button className="ctrl ghost" onClick={manualStep} disabled={halted}>
            ⏭ Un pas
          </button>
          <button className="ctrl ghost" onClick={() => reset(machine)}>
            Reset
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
          <span className="counter">{steps} pas</span>
        </div>
      </div>

      <p className="tm-tip">
        💡 Conseil : commence en <strong>« Un pas »</strong> et lis la phrase à chaque
        fois. Tu verras que la machine ne fait que répéter le même petit geste.
      </p>

      {/* Table de transitions */}
      <h3 className="tm-table-title">📋 La « notice » de la machine (sa table de règles)</h3>
      <p className="graph-intro">
        Chaque case = une règle : <em>écris ce symbole</em>, <em>déplace-toi</em> (◀/▶),{" "}
        <em>va à cet état</em>. La règle utilisée à l'instant est surlignée.
      </p>
      <div className="tm-table-scroll">
        <table className="tm-table">
          <thead>
            <tr>
              <th>État \ Lit</th>
              {machine.alphabet.map((s) => (
                <th key={s}>{s}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.keys(machine.transitions).map((st) => (
              <tr key={st} className={st === state && !halted ? "active-row" : ""}>
                <td className="tm-st">{st}</td>
                {machine.alphabet.map((sym) => {
                  const r = machine.transitions[st]?.[sym];
                  const isActive =
                    !halted && st === state && sym === currentSymbol && !!activeRule;
                  return (
                    <td key={sym} className={isActive ? "active-cell" : ""}>
                      {r ? (
                        <>
                          <span className="rw">{r.write}</span>
                          <span className="mv">
                            {r.move === "L" ? "◀" : r.move === "R" ? "▶" : "•"}
                          </span>
                          <span className="nx">{r.next === HALT ? "STOP" : r.next}</span>
                        </>
                      ) : (
                        <span className="muted">—</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
