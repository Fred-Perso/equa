import FunctionExplorer from "./FunctionExplorer";

// Glossaire « pour les nuls » des termes des fonctions.
const GLOSSAIRE: { terme: string; def: string }[] = [
  {
    terme: "Fonction",
    def: "Une machine à transformer : tu lui donnes un nombre (l'entrée), elle te rend un seul nombre (la sortie). On la note f(x), qui se lit « f de x ».",
  },
  {
    terme: "Variable (x)",
    def: "Le nombre d'entrée, celui qu'on fait varier. C'est le « bouton » qu'on tourne.",
  },
  {
    terme: "Image",
    def: "La sortie : la valeur que la fonction renvoie. L'image de 3 par f, c'est f(3).",
  },
  {
    terme: "Antécédent",
    def: "L'inverse de l'image : si f(3) = 5, alors 3 est l'antécédent de 5. On part de la sortie pour retrouver l'entrée.",
  },
  {
    terme: "Courbe (graphe)",
    def: "Le dessin de la fonction : pour chaque x sur l'axe horizontal, on monte jusqu'à f(x) sur l'axe vertical. En reliant tous les points, on obtient la courbe.",
  },
  {
    terme: "Pente",
    def: "L'inclinaison d'une droite : de combien monte (ou descend) f(x) quand x augmente de 1.",
  },
  {
    terme: "Asymptote",
    def: "Une ligne dont la courbe s'approche infiniment sans jamais la toucher (par exemple les axes pour la fonction inverse a/x).",
  },
  {
    terme: "Variations",
    def: "Le fait que la fonction monte (croissante) ou descende (décroissante) sur une zone donnée.",
  },
];

// Familles de fonctions détaillées.
const FAMILLES: {
  emoji: string;
  nom: string;
  formule: string;
  texte: string;
  exemple: string;
}[] = [
  {
    emoji: "📏",
    nom: "Fonction affine",
    formule: "f(x) = a·x + b",
    texte:
      "La plus simple : une droite. « a » donne la pente, « b » le point de départ sur l'axe vertical. Si a = 0, c'est une droite horizontale (fonction constante).",
    exemple:
      "Un taxi : 3 € de prise en charge + 2 €/km. Le prix f(x) = 2·x + 3, où x est le nombre de kilomètres.",
  },
  {
    emoji: "🥣",
    nom: "Fonction carré (parabole)",
    formule: "f(x) = a·x² + b·x + c",
    texte:
      "Une courbe en forme de bol. C'est exactement la fonction des équations du 2nd degré : ses « racines » sont les points où la courbe croise l'axe horizontal.",
    exemple:
      "La trajectoire d'un ballon lancé, l'aire d'un carré en fonction de son côté, l'optimisation d'un bénéfice…",
  },
  {
    emoji: "⤵️",
    nom: "Fonction inverse",
    formule: "f(x) = a / x",
    texte:
      "Quand l'un grandit, l'autre rapetisse (proportionnalité inverse). La courbe a deux branches et ne touche jamais les axes.",
    exemple:
      "À budget fixe, le nombre de parts × le prix par part est constant : plus il y a de convives, plus la part est petite.",
  },
  {
    emoji: "🚀",
    nom: "Fonction exponentielle",
    formule: "f(x) = a·eᵏˣ",
    texte:
      "Une croissance qui s'emballe : elle double, puis re-double, de plus en plus vite. (Ou l'inverse : une décroissance qui s'effondre.)",
    exemple:
      "Les intérêts composés d'un placement, la propagation d'un virus, la désintégration radioactive (en décroissance).",
  },
];

export default function FonctionsPage() {
  return (
    <main className="page">
      <div className="container">
        <header className="header">
          <h1>📈 Fonctions — pour les nuls</h1>
          <p>
            Une fonction, c'est une <strong>machine à nombres</strong> : tu mets un
            nombre dedans, elle en ressort un autre. Tout le reste n'est que des
            variantes de cette idée. 👇
          </p>
        </header>

        {/* La machine */}
        <div className="card">
          <h2 className="steps-title first">🧠 L'idée en une image : la machine</h2>
          <div className="machine">
            <div className="machine-box in">
              <span className="machine-label">Entrée</span>
              <span className="machine-val">x = 3</span>
            </div>
            <div className="machine-arrow">→</div>
            <div className="machine-box fn">
              <span className="machine-label">La fonction</span>
              <span className="machine-val">f(x) = 2x + 1</span>
            </div>
            <div className="machine-arrow">→</div>
            <div className="machine-box out">
              <span className="machine-label">Sortie</span>
              <span className="machine-val">f(3) = 7</span>
            </div>
          </div>
          <p className="eq-explain">
            On donne <strong>3</strong> à la machine, elle calcule 2×3 + 1 et renvoie{" "}
            <strong>7</strong>. On dit que « l'image de 3 est 7 », ou que « 3 est
            l'antécédent de 7 ». Une règle d'or : pour une entrée, <strong>une seule</strong>{" "}
            sortie possible.
          </p>
        </div>

        {/* Explorateur interactif */}
        <FunctionExplorer />

        {/* Familles de fonctions */}
        <h2 className="learn-heading">🧩 Les grandes familles de fonctions</h2>
        {FAMILLES.map((fam) => (
          <div key={fam.nom} className="card eq-block">
            <h3 className="eq-title">
              {fam.emoji} {fam.nom}
            </h3>
            <div className="eq-formula">
              <span className="big">{fam.formule}</span>
            </div>
            <p className="eq-explain">{fam.texte}</p>
            <div className="eq-example">
              <strong>Vraie vie :</strong> {fam.exemple}
            </div>
          </div>
        ))}

        {/* ---- Les fonctions qui tendent vers zéro ---- */}
        <h2 className="learn-heading">📉 Les courbes qui frôlent zéro… sans jamais y toucher</h2>
        <div className="card eq-block">
          <h3 className="eq-title">L'histoire du mur qu'on n'atteint jamais</h3>
          <p className="eq-explain">
            Imagine que tu marches vers un mur, et qu'à chaque pas tu parcours{" "}
            <strong>la moitié de la distance qui reste</strong>. Tu t'en approches encore,
            encore, encore… mais il te restera <strong>toujours</strong> une moitié. Tu ne
            le touches jamais !
          </p>
          <p className="eq-explain">
            Certaines fonctions font pareil avec l'axe horizontal : elles{" "}
            <strong>descendent vers 0</strong> et s'en rapprochent à l'infini, mais sans
            jamais l'atteindre. Cette droite qu'on frôle sans la toucher porte un nom :
            une <strong>asymptote</strong>.
          </p>

          <h4 className="tuto-h">Trois exemples (à essayer dans l'explorateur ⤴︎)</h4>
          <ul className="tuto-steps">
            <li>
              <code>1/x²</code> — plus x s'éloigne de 0, plus la courbe s'écrase vers le bas.
            </li>
            <li>
              <code>e^(−x)</code> — la « décroissance exponentielle » : elle fond vers 0 à
              toute vitesse (c'est exactement « la moitié du mur à chaque pas »).
            </li>
            <li>
              <code>e^(−x²)</code> — la cloche de Gauss, qui s'aplatit vers 0 des deux côtés.
            </li>
          </ul>

          <div className="eq-example">
            <strong>Le truc à comprendre :</strong> 0 est une <em>cible</em>, pas une{" "}
            <em>étape</em>. La fonction se rapproche d'aussi près qu'on veut (un millième,
            un milliardième…), mais la valeur 0 n'est jamais réellement atteinte. On dit
            que la fonction <strong>« tend vers 0 »</strong>.
          </div>

          <p className="eq-explain">
            Et ce n'est pas qu'une curiosité de maths : c'est la forme de tout ce qui{" "}
            <strong>s'éteint en douceur sans jamais finir tout à fait</strong> — ☢️ la
            radioactivité (divisée par deux à chaque demi-vie), ☕ le café qui refroidit,
            🔋 une batterie qui se décharge, 🔔 un écho qui s'estompe.
          </p>
          <div className="eq-example">
            <strong>À voir de tes yeux :</strong> dans l'explorateur plus haut, choisis{" "}
            <em>1/x²</em>, <em>e^(−x)</em> ou la <em>cloche de Gauss</em>. La ligne{" "}
            <span style={{ color: "#86efac", fontWeight: 700 }}>verte en pointillés</span>{" "}
            est l'asymptote <code>y = 0</code> : tu verras la courbe s'en approcher
            inexorablement… sans jamais la franchir.
          </div>
        </div>

        {/* ---- Le pont avec la relativité ---- */}
        <h2 className="learn-heading">🌌 Le pont avec la relativité</h2>
        <div className="card eq-block highlight">
          <div className="eq-tag star">Tout se relie ⭐</div>
          <h3 className="eq-title">Et si la relativité n'était qu'une histoire de fonctions ?</h3>
          <p className="eq-explain">
            Surprise : tout ce qu'on a vu dans la section relativité, ce sont des{" "}
            <strong>fonctions</strong>. Le facteur de Lorentz, ce n'est pas un nombre
            fixe : c'est une fonction de la vitesse, qu'on peut tracer comme n'importe
            quelle courbe.
          </p>
          <div className="eq-formula">
            <span className="big">γ(v) =</span>
            <span className="frac">
              <span className="frac-num">1</span>
              <span className="frac-den">
                <span className="sqrt">
                  <span className="radicand">1 − v² / c²</span>
                </span>
              </span>
            </span>
          </div>
          <p className="eq-explain">
            Ici l'<strong>entrée</strong> est la vitesse v, la <strong>sortie</strong>{" "}
            est le facteur γ. C'est une fonction comme une autre — sauf qu'elle a une{" "}
            <strong>asymptote verticale</strong> en v = c : quand on s'approche de la
            vitesse de la lumière, la courbe s'envole vers l'infini. C'est pour ça que la
            lumière est une limite infranchissable.
          </p>
          <div className="bridge-list">
            <div className="bridge-item">
              <span className="bridge-fn">γ(v) = 1/√(1 − v²/c²)</span>
              <span className="bridge-arrow">↦</span>
              <span className="bridge-use">le facteur de déformation (asymptote en c)</span>
            </div>
            <div className="bridge-item">
              <span className="bridge-fn">Δt(v) = γ(v)·Δt₀</span>
              <span className="bridge-arrow">↦</span>
              <span className="bridge-use">la dilatation du temps, fonction de la vitesse</span>
            </div>
            <div className="bridge-item">
              <span className="bridge-fn">L(v) = L₀/γ(v)</span>
              <span className="bridge-arrow">↦</span>
              <span className="bridge-use">la contraction des longueurs</span>
            </div>
            <div className="bridge-item">
              <span className="bridge-fn">E(v) = γ(v)·m·c²</span>
              <span className="bridge-arrow">↦</span>
              <span className="bridge-use">l'énergie totale, qui explose près de c</span>
            </div>
          </div>
          <div className="eq-example">
            <strong>À tester :</strong> dans l'explorateur ci-dessus, choisis la famille{" "}
            <em>« Lorentz γ(v) »</em> : tu verras de tes yeux la courbe grimper vers
            l'infini à l'approche de la vitesse de la lumière. Et en relativité{" "}
            <strong>générale</strong>, on va encore plus loin : l'espace-temps lui-même
            devient une « fonction » courbée par la matière.
          </div>
        </div>

        {/* ---- Glossaire ---- */}
        <div className="learn">
          <details className="accordion" open>
            <summary>
              <span className="acc-icon">🔤</span> Glossaire — le vocabulaire
            </summary>
            <div className="acc-body">
              <p className="acc-intro">Les mots des fonctions, en langage simple :</p>
              <dl className="glossary">
                {GLOSSAIRE.map((g) => (
                  <div key={g.terme} className="gloss-item">
                    <dt>{g.terme}</dt>
                    <dd>{g.def}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </details>
        </div>

        <footer className="footer">
          MathLab — section Fonctions · de la droite à l'espace-temps courbé
        </footer>
      </div>
    </main>
  );
}
