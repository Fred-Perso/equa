const GLOSSAIRE: { terme: string; def: string }[] = [
  {
    terme: "Quantum (des « quanta »)",
    def: "Un tout petit paquet indivisible. À l'échelle atomique, l'énergie ne coule pas en continu : elle vient par grains. Comme un escalier (marche par marche) plutôt qu'une rampe lisse.",
  },
  {
    terme: "Photon",
    def: "Le grain de lumière : la plus petite quantité de lumière possible. La lumière est faite d'une pluie de photons.",
  },
  {
    terme: "Dualité onde-particule",
    def: "Un objet quantique (électron, photon) se comporte tantôt comme une onde (qui s'étale, ondule), tantôt comme une bille. Il est les deux à la fois selon la façon dont on le regarde.",
  },
  {
    terme: "Fonction d'onde (ψ)",
    def: "Une fonction — oui, comme dans le chapitre Fonctions ! — qui décrit l'état d'une particule. Son carré donne la probabilité de la trouver à tel endroit.",
  },
  {
    terme: "Superposition",
    def: "Tant qu'on ne regarde pas, une particule peut être dans plusieurs états en même temps (ici ET là, 0 ET 1). C'est l'idée derrière le chat de Schrödinger, vivant et mort à la fois.",
  },
  {
    terme: "Principe d'incertitude",
    def: "Découvert par Heisenberg : on ne peut pas connaître en même temps, avec une précision parfaite, la position ET la vitesse d'une particule. Plus on sait l'une, moins on sait l'autre.",
  },
  {
    terme: "Mesure (effondrement)",
    def: "Au moment où on observe, la superposition « s'effondre » sur un seul résultat, au hasard (selon des probabilités). Avant la mesure : du possible. Après : du réel.",
  },
  {
    terme: "Intrication",
    def: "Deux particules peuvent être liées de sorte que mesurer l'une fixe instantanément l'état de l'autre, même très loin. Einstein appelait ça « l'action fantôme à distance ».",
  },
];

const CAS_REELS: { emoji: string; titre: string; texte: string }[] = [
  {
    emoji: "📱",
    titre: "Le transistor (donc ton téléphone)",
    texte:
      "Les milliards de transistors de ta puce reposent sur le comportement quantique des électrons dans les semi-conducteurs. Sans mécanique quantique, pas d'ordinateurs, pas de smartphones.",
  },
  {
    emoji: "🔦",
    titre: "Le laser, la LED, le code-barres",
    texte:
      "Lasers, diodes (LED), lecteurs de disques, scanners de caisse : tous exploitent la façon dont les atomes émettent des photons un par un, par quanta d'énergie.",
  },
  {
    emoji: "🏥",
    titre: "L'IRM à l'hôpital",
    texte:
      "L'imagerie médicale par résonance magnétique manipule le « spin » quantique des noyaux d'atomes de ton corps pour en faire des images, sans rayons X.",
  },
  {
    emoji: "💻",
    titre: "L'ordinateur quantique",
    texte:
      "En utilisant la superposition (des « qubits » qui valent 0 et 1 à la fois), on construit des machines d'un genre nouveau, capables de calculs hors de portée des ordinateurs classiques.",
  },
];

export default function QuantiquePage() {
  return (
    <main className="page">
      <div className="container">
        <header className="header">
          <h1>⚛️ La mécanique quantique — pour les nuls</h1>
          <p>
            La relativité décrit l'infiniment <strong>grand</strong> (étoiles, galaxies,
            espace-temps). La mécanique quantique, elle, décrit l'infiniment{" "}
            <strong>petit</strong> (atomes, électrons, lumière). Et là, les règles
            deviennent franchement bizarres. Accroche-toi, c'est fascinant. 👇
          </p>
        </header>

        {/* L'idée de base */}
        <div className="card">
          <h2 className="steps-title first">🧠 L'idée de départ : le monde par grains</h2>
          <p className="eq-explain">
            À notre échelle, tout semble continu : tu peux verser de l'eau en un filet
            aussi fin que tu veux. Mais à l'échelle de l'atome, la nature est{" "}
            <strong>granuleuse</strong> : l'énergie, la lumière, la matière viennent par
            petits <strong>paquets indivisibles</strong> appelés « quanta ». D'où le nom.
          </p>
          <p className="eq-explain">
            Pire (ou mieux !) : une particule n'a pas de position bien définie tant qu'on
            ne la regarde pas. Elle existe comme un <strong>nuage de probabilités</strong>,
            à plusieurs endroits à la fois. Ce n'est qu'au moment où on la mesure qu'elle
            « choisit » une position — au hasard.
          </p>
        </div>

        {/* ---- Les équations ---- */}
        <h2 className="learn-heading">🧮 Les équations clés, expliquées</h2>

        {/* E = hf */}
        <div className="card eq-block">
          <div className="eq-tag">Le grain de lumière</div>
          <h3 className="eq-title">1. L'énergie d'un quantum : E = h·f</h3>
          <div className="eq-formula">
            <span className="big">E = h · f</span>
          </div>
          <dl className="eq-where">
            <div>
              <dt>E</dt>
              <dd>l'énergie d'un seul grain de lumière (un photon)</dd>
            </div>
            <div>
              <dt>f</dt>
              <dd>la fréquence de cette lumière (sa « couleur »)</dd>
            </div>
            <div>
              <dt>h</dt>
              <dd>la constante de Planck — un nombre minuscule, la « taille du grain »</dd>
            </div>
          </dl>
          <p className="eq-explain">
            C'est l'acte de naissance de la physique quantique (Planck, Einstein) :
            l'énergie lumineuse ne se divise pas à l'infini, elle vient par{" "}
            <strong>paquets</strong> dont la taille dépend de la couleur.
          </p>
          <div className="eq-example">
            <strong>Vraie vie :</strong> c'est pour ça qu'une LED bleue demande plus
            d'énergie qu'une rouge, et que les panneaux solaires transforment des photons
            en électricité, un grain à la fois.
          </div>
        </div>

        {/* Heisenberg */}
        <div className="card eq-block">
          <div className="eq-tag">La limite du savoir</div>
          <h3 className="eq-title">2. Le principe d'incertitude de Heisenberg</h3>
          <div className="eq-formula">
            <span className="big">Δx · Δp ≥ ℏ / 2</span>
          </div>
          <dl className="eq-where">
            <div>
              <dt>Δx</dt>
              <dd>l'incertitude sur la position de la particule</dd>
            </div>
            <div>
              <dt>Δp</dt>
              <dd>l'incertitude sur sa quantité de mouvement (sa vitesse)</dd>
            </div>
            <div>
              <dt>ℏ</dt>
              <dd>la constante de Planck « réduite » — encore ce minuscule grain</dd>
            </div>
          </dl>
          <p className="eq-explain">
            Le produit des deux incertitudes ne peut pas descendre sous une certaine
            valeur. Donc <strong>plus tu connais précisément la position</strong> d'une
            particule, <strong>moins tu connais sa vitesse</strong>, et inversement. Ce
            n'est pas un défaut de nos instruments : c'est une <strong>limite inscrite
            dans la nature elle-même</strong>.
          </p>
          <div className="eq-example">
            <strong>À retenir :</strong> il y a une frontière infranchissable à ce qu'on
            peut savoir. Garde cette idée pour le dernier chapitre, « Les limites de la
            science ».
          </div>
        </div>

        {/* Fonction d'onde */}
        <div className="card eq-block">
          <div className="eq-tag star">Le pont avec les Fonctions ⭐</div>
          <h3 className="eq-title">3. La fonction d'onde : ψ (psi)</h3>
          <div className="eq-formula">
            <span className="big">
              |ψ(x)|² = probabilité de présence
            </span>
          </div>
          <p className="eq-explain">
            Tout l'état d'une particule est décrit par une <strong>fonction</strong> —
            exactement la notion du chapitre Fonctions ! On l'appelle la « fonction
            d'onde » ψ. On ne peut pas dire « la particule est ici » ; on dit seulement
            « voici la <strong>courbe des probabilités</strong> de la trouver à chaque
            endroit ». Là où la courbe est haute, on a de bonnes chances ; là où elle est
            basse, peu de chances.
          </p>
          <div className="eq-example">
            <strong>Le retournement :</strong> en physique classique, une fonction te
            donne <em>la</em> réponse (la position exacte). En quantique, la fonction ne
            te donne que des <em>probabilités</em>. Le hasard entre au cœur des lois.
          </div>
        </div>

        {/* ---- Relativité vs Quantique ---- */}
        <h2 className="learn-heading">⚖️ Deux mondes, deux logiques</h2>
        <div className="card eq-block highlight">
          <div className="eq-tag star">Les deux piliers ⭐</div>
          <h3 className="eq-title">Relativité et quantique se tournent le dos</h3>
          <p className="eq-explain">
            Ce sont les deux théories les plus précises jamais écrites. Mais elles
            décrivent le monde de façons opposées :
          </p>
          <div className="trans-table">
            <div className="trans-row trans-head">
              <span>Relativité générale</span>
              <span>Mécanique quantique</span>
            </div>
            <div className="trans-row">
              <span>L'infiniment grand (astres, galaxies)</span>
              <span>L'infiniment petit (atomes, particules)</span>
            </div>
            <div className="trans-row">
              <span>Lisse, continu (l'espace-temps coule)</span>
              <span>Granuleux, par paquets (les quanta)</span>
            </div>
            <div className="trans-row">
              <span>Déterministe : tout est nécessaire</span>
              <span>Probabiliste : le hasard est fondamental</span>
            </div>
            <div className="trans-row">
              <span>L'observateur ne change rien</span>
              <span>Observer modifie le résultat (la mesure)</span>
            </div>
          </div>
          <p className="eq-explain">
            Einstein, fidèle au « Dieu de Spinoza » et à un Univers nécessaire, n'a jamais
            digéré ce hasard quantique. D'où sa célèbre formule :
          </p>
          <blockquote className="quote">
            « Dieu ne joue pas aux dés. »
            <cite>— Albert Einstein, à propos de la mécanique quantique</cite>
          </blockquote>
          <div className="eq-example">
            Et le pire : ces deux théories <strong>refusent de fusionner</strong> en une
            seule. C'est tout le sujet du dernier chapitre — <strong>« Les limites de la
            science »</strong>.
          </div>
        </div>

        {/* ---- Glossaire & vraie vie ---- */}
        <div className="learn">
          <details className="accordion" open>
            <summary>
              <span className="acc-icon">🔤</span> Glossaire — le vocabulaire quantique
            </summary>
            <div className="acc-body">
              <p className="acc-intro">Les mots clés, en langage simple :</p>
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

          <details className="accordion" open>
            <summary>
              <span className="acc-icon">🌍</span> À quoi ça sert dans la vraie vie
            </summary>
            <div className="acc-body">
              <p className="acc-intro">
                Le « bizarre » quantique fait tourner ton quotidien :
              </p>
              <div className="cas-list">
                {CAS_REELS.map((c) => (
                  <div key={c.titre} className="cas-item">
                    <div className="cas-titre">
                      <span className="cas-emoji">{c.emoji}</span>
                      {c.titre}
                    </div>
                    <p className="cas-texte">{c.texte}</p>
                  </div>
                ))}
              </div>
            </div>
          </details>
        </div>

        <footer className="footer">
          MathLab — Mécanique quantique · le monde par grains
        </footer>
      </div>
    </main>
  );
}
