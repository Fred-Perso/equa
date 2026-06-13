import LorentzCalculator from "./LorentzCalculator";

// Glossaire « pour les nuls » des termes de la relativité restreinte.
const GLOSSAIRE: { terme: string; def: string }[] = [
  {
    terme: "Référentiel",
    def: "Le point de vue depuis lequel on observe et on mesure : par exemple « le quai de la gare » ou « l'intérieur du train ». Chacun a sa propre horloge et son propre mètre ruban.",
  },
  {
    terme: "Vitesse de la lumière (c)",
    def: "Environ 300 000 km/s (299 792 458 m/s exactement). C'est la vitesse limite de l'Univers : rien ayant une masse ne peut l'atteindre.",
  },
  {
    terme: "Facteur de Lorentz (γ)",
    def: "Un nombre toujours ≥ 1 qui mesure « à quel point » le temps et l'espace se déforment. À faible vitesse γ ≈ 1 (rien ne change) ; proche de c, γ explose.",
  },
  {
    terme: "Temps propre (Δt₀)",
    def: "La durée mesurée par une horloge qui se déplace avec l'événement (l'horloge du voyageur). C'est le temps « le plus court » possible entre deux événements.",
  },
  {
    terme: "Dilatation du temps",
    def: "Une horloge en mouvement tourne plus lentement vue de l'extérieur. « Les voyageurs rapides vieillissent moins vite. »",
  },
  {
    terme: "Contraction des longueurs",
    def: "Un objet en mouvement paraît plus court dans le sens du déplacement, vu depuis un référentiel immobile.",
  },
  {
    terme: "Simultanéité",
    def: "Deux événements « en même temps » pour un observateur peuvent ne pas l'être pour un autre qui bouge. Le « maintenant » n'est pas universel.",
  },
  {
    terme: "Masse-énergie",
    def: "La masse est une forme d'énergie « concentrée ». C'est le sens de la célèbre formule E = mc².",
  },
];

const CAS_REELS: { emoji: string; titre: string; texte: string }[] = [
  {
    emoji: "🛰️",
    titre: "Le GPS de ton téléphone",
    texte:
      "Les satellites GPS filent à ~14 000 km/h. Leurs horloges, à cause de la relativité, se décalent d'environ 38 microsecondes par jour par rapport au sol. Sans correction relativiste, ta position dériverait de ~10 km chaque jour ! Ton GPS applique donc la formule de dilatation du temps en permanence.",
  },
  {
    emoji: "☄️",
    titre: "Les muons venus de l'espace",
    texte:
      "Des particules (les muons) sont créées en haut de l'atmosphère et ne « vivent » que 2 millionièmes de seconde. En théorie elles devraient se désintégrer avant d'atteindre le sol. Mais elles vont si vite que, pour elles, le temps ralentit (dilatation) : on les détecte au sol par milliers. C'est une preuve quotidienne de la relativité.",
  },
  {
    emoji: "☀️",
    titre: "Le Soleil et l'énergie nucléaire",
    texte:
      "E = mc² dit qu'un tout petit peu de masse libère une énorme énergie. Le Soleil transforme chaque seconde ~4 millions de tonnes de masse en lumière. Les centrales nucléaires exploitent le même principe à plus petite échelle.",
  },
  {
    emoji: "👯",
    titre: "Le paradoxe des jumeaux",
    texte:
      "Un jumeau part dans un vaisseau ultra-rapide, l'autre reste sur Terre. Au retour, le voyageur a moins vieilli que celui resté à la maison. Ce n'est pas de la science-fiction : c'est la dilatation du temps, vérifiée avec des horloges atomiques embarquées dans des avions.",
  },
];

// Le cheminement d'Einstein, de la relativité restreinte (1905) à la générale (1915).
const JOURNEY: {
  annee?: string;
  titre: string;
  texte: string;
  details: string[];
}[] = [
  {
    annee: "1905",
    titre: "Le point de départ : la relativité restreinte",
    texte:
      "La relativité restreinte est un triomphe : elle a unifié l'espace et le temps en un seul « espace-temps » et montré que rien ne dépasse la lumière. Mais elle a une condition cachée dans son nom : elle est « restreinte » aux référentiels qui se déplacent à vitesse constante, en ligne droite (les référentiels dits inertiels).",
    details: [
      "Elle ne sait pas décrire un objet qui accélère, freine ou tourne.",
      "Elle ignore complètement la gravité — pourtant la chose la plus banale qui soit (une pomme qui tombe).",
      "Pire : la gravité de Newton est « instantanée » (elle agirait partout en même temps), ce qui contredit la limite de la vitesse de la lumière. Les deux théories sont incompatibles.",
      "Einstein le sait et cherche pendant des années à généraliser sa théorie à TOUS les mouvements.",
    ],
  },
  {
    annee: "1907",
    titre: "« La pensée la plus heureuse de ma vie »",
    texte:
      "L'éclair de génie lui vient en imaginant un peintre qui tombe d'un toit. Pendant sa chute, l'homme ne ressent plus son propre poids : ses outils flottent à côté de lui comme dans une station spatiale. Einstein comprend que tomber, c'est exactement comme flotter en apesanteur.",
    details: [
      "En chute libre, la gravité « disparaît » localement : on ne la sent plus du tout.",
      "Conclusion renversante : la gravité et l'accélération ne sont pas deux phénomènes différents, mais les deux visages d'une même réalité.",
      "C'est ce lien qui va lui permettre de faire entrer la gravité dans la relativité.",
    ],
  },
  {
    titre: "Le principe d'équivalence",
    texte:
      "Pour transformer cette intuition en principe solide, Einstein imagine une expérience de pensée devenue célèbre : l'ascenseur sans fenêtre. À l'intérieur, aucune mesure ne permet de savoir si tu es immobile sur Terre ou tiré dans l'espace.",
    details: [
      "Cas A : l'ascenseur est posé sur Terre. Tu pèses ton poids normal à cause de la gravité.",
      "Cas B : l'ascenseur est dans l'espace, loin de tout, mais accéléré vers le haut par une fusée. Tu es plaqué au sol exactement de la même façon.",
      "De l'intérieur, AUCUNE expérience ne peut distinguer les deux situations : gravité et accélération sont localement identiques.",
      "C'est le « principe d'équivalence », la pierre angulaire de toute la relativité générale.",
    ],
  },
  {
    titre: "Si c'est vrai… alors la lumière doit se courber",
    texte:
      "Einstein pousse le raisonnement de l'ascenseur jusqu'au bout, et tombe sur une conséquence stupéfiante. Imagine un rayon laser tiré horizontalement d'un mur à l'autre de l'ascenseur en pleine accélération.",
    details: [
      "Pendant que la lumière traverse, l'ascenseur a légèrement monté : le rayon arrive donc un peu plus bas sur le mur d'en face. Pour le passager, la lumière a suivi une trajectoire courbée.",
      "Or, par le principe d'équivalence, accélération = gravité. Donc la gravité aussi doit courber la lumière.",
      "C'est révolutionnaire : la lumière, qui n'a pas de masse, est pourtant déviée par les astres massifs.",
      "Cette prédiction sera la première grande vérification de la théorie, lors de l'éclipse de 1919.",
    ],
  },
  {
    titre: "L'idée révolutionnaire : l'espace-temps se courbe",
    texte:
      "Si même la lumière est déviée, c'est que le problème n'est pas la lumière… c'est l'espace lui-même. Einstein fait alors le saut conceptuel le plus audacieux : la gravité n'est pas une force, c'est une géométrie. La matière déforme le « tissu » de l'espace-temps autour d'elle.",
    details: [
      "Image du trampoline : pose une boule de bowling au centre, la toile se creuse. Lance une bille, elle tourne autour en suivant le creux — non pas « attirée », mais parce que le sol est déformé.",
      "La Terre ne « tire » pas la Lune : elle creuse l'espace-temps, et la Lune suit le chemin le plus droit possible dans cet espace courbé.",
      "Même le temps est déformé : plus on est près d'une masse, plus le temps s'écoule lentement (vérifié par le GPS).",
      "La gravité de Newton devient un cas particulier, valable quand les déformations sont faibles.",
    ],
  },
  {
    annee: "1915",
    titre: "Les équations de champ",
    texte:
      "Restait le plus dur : traduire cette image en mathématiques. Einstein a dû apprendre une géométrie toute neuve, celle des surfaces courbes développée par Riemann, et a buté pendant près de huit ans, avec de nombreuses fausses pistes.",
    details: [
      "Il lui fallait un outil capable de décrire la courbure en chaque point de l'espace-temps : c'est le rôle du « tenseur ».",
      "Fin 1915, après une course contre le mathématicien David Hilbert, il publie enfin la bonne équation.",
      "Elle relie d'un côté la géométrie (la courbure) et de l'autre le contenu (matière + énergie).",
      "La relativité générale est née — et un siècle plus tard, toutes ses prédictions tiennent toujours.",
    ],
  },
];

// Les vérifications expérimentales de la relativité générale.
const CAS_GR: { emoji: string; titre: string; texte: string }[] = [
  {
    emoji: "🌗",
    titre: "L'éclipse de 1919",
    texte:
      "Pendant une éclipse, l'astronome Eddington photographie des étoiles proches du Soleil. Leur lumière est déviée d'exactement l'angle prédit par Einstein. Du jour au lendemain, il devient une célébrité mondiale.",
  },
  {
    emoji: "🪐",
    titre: "L'orbite de Mercure",
    texte:
      "L'orbite de Mercure avait une petite anomalie que la gravité de Newton n'expliquait pas depuis des décennies. La relativité générale la prédit pile-poil, sans rien ajouter.",
  },
  {
    emoji: "🛰️",
    titre: "Le GPS, deux fois corrigé",
    texte:
      "En altitude, la gravité est plus faible : les horloges des satellites avancent de ~45 µs/jour (effet de la générale). Leur vitesse les ralentit de ~7 µs/jour (effet de la restreinte). Le GPS doit corriger les DEUX, sinon il devient inutilisable.",
  },
  {
    emoji: "🌊",
    titre: "Les ondes gravitationnelles (2015)",
    texte:
      "Deux trous noirs qui fusionnent font « vibrer » le tissu de l'espace-temps. Ces vagues, prédites par Einstein, ont été détectées par LIGO exactement 100 ans après la théorie.",
  },
];

export default function RelativitePage() {
  return (
    <main className="page">
      <div className="container">
        <header className="header">
          <h1>🌌 Relativité restreinte — pour les nuls</h1>
          <p>
            En 1905, Einstein a compris une chose folle : le temps et l'espace ne sont
            pas les mêmes pour tout le monde. Tout dépend de la vitesse à laquelle on se
            déplace. Décortiquons ça en douceur. 👇
          </p>
        </header>

        {/* Les deux idées de départ */}
        <div className="card">
          <h2 className="steps-title first">🧠 Les 2 idées de départ d'Einstein</h2>
          <div className="cas-list">
            <div className="cas-item">
              <div className="cas-titre">
                <span className="cas-emoji">1️⃣</span> Les lois de la physique sont les
                mêmes partout
              </div>
              <p className="cas-texte">
                Que tu sois immobile sur un quai ou dans un train qui roule à vitesse
                constante, les mêmes lois s'appliquent. Impossible de « sentir » qu'on
                bouge sans regarder dehors.
              </p>
            </div>
            <div className="cas-item">
              <div className="cas-titre">
                <span className="cas-emoji">2️⃣</span> La lumière va toujours à la même
                vitesse
              </div>
              <p className="cas-texte">
                Peu importe que tu coures vers une lampe ou que tu t'en éloignes, tu
                mesureras toujours la lumière à ~300 000 km/s. C'est contre-intuitif…
                et c'est ce qui force le temps et l'espace à se déformer.
              </p>
            </div>
          </div>
        </div>

        {/* Calculateur interactif */}
        <LorentzCalculator />

        {/* ---- Les équations en détail ---- */}
        <h2 className="learn-heading">🧮 Les équations, expliquées en détail</h2>

        {/* 1. Facteur de Lorentz */}
        <div className="card eq-block">
          <div className="eq-tag">La clé de tout</div>
          <h3 className="eq-title">1. Le facteur de Lorentz γ</h3>
          <div className="eq-formula">
            <span className="big">γ =</span>
            <span className="frac">
              <span className="frac-num">1</span>
              <span className="frac-den">
                <span className="sqrt">
                  <span className="radicand">1 − v² / c²</span>
                </span>
              </span>
            </span>
          </div>
          <dl className="eq-where">
            <div>
              <dt>γ</dt>
              <dd>le facteur de Lorentz (« gamma »), toujours ≥ 1</dd>
            </div>
            <div>
              <dt>v</dt>
              <dd>la vitesse de l'objet</dd>
            </div>
            <div>
              <dt>c</dt>
              <dd>la vitesse de la lumière (~300 000 km/s)</dd>
            </div>
          </dl>
          <p className="eq-explain">
            C'est le « taux de déformation ». Si v est petit devant c, alors v²/c² ≈ 0,
            la racine vaut 1, donc <strong>γ ≈ 1</strong> : rien ne change, on retrouve
            la physique classique. Mais quand v s'approche de c, le contenu de la racine
            tend vers 0, et <strong>γ tend vers l'infini</strong>.
          </p>
          <div className="eq-example">
            <strong>Exemple chiffré :</strong> à v = 0,8c (80 % de la lumière), v²/c² =
            0,64. Donc γ = 1 / √(1 − 0,64) = 1 / √0,36 = 1 / 0,6 ≈ <strong>1,67</strong>.
            Le temps et les longueurs sont déformés de 67 %.
          </div>
        </div>

        {/* 2. Dilatation du temps */}
        <div className="card eq-block">
          <div className="eq-tag">Le temps</div>
          <h3 className="eq-title">2. La dilatation du temps</h3>
          <div className="eq-formula">
            <span className="big">Δt = γ · Δt₀</span>
          </div>
          <dl className="eq-where">
            <div>
              <dt>Δt₀</dt>
              <dd>le temps mesuré à bord (horloge du voyageur, « temps propre »)</dd>
            </div>
            <div>
              <dt>Δt</dt>
              <dd>le temps mesuré par l'observateur resté immobile</dd>
            </div>
            <div>
              <dt>γ</dt>
              <dd>le facteur de Lorentz (≥ 1)</dd>
            </div>
          </dl>
          <p className="eq-explain">
            Comme γ ≥ 1, on a toujours Δt ≥ Δt₀ : pour celui qui reste sur place,{" "}
            <strong>plus de temps s'écoule</strong> que pour le voyageur. Autrement dit,
            <strong> l'horloge en mouvement tourne au ralenti</strong>.
          </p>
          <div className="eq-example">
            <strong>Vraie vie — le GPS :</strong> les satellites bougent vite, leurs
            horloges se décalent de ~38 µs/jour. Si on ne corrigeait pas avec cette
            formule, ta position GPS serait fausse de ~10 km après une seule journée.
          </div>
        </div>

        {/* 3. Contraction des longueurs */}
        <div className="card eq-block">
          <div className="eq-tag">L'espace</div>
          <h3 className="eq-title">3. La contraction des longueurs</h3>
          <div className="eq-formula">
            <span className="big">L =</span>
            <span className="frac">
              <span className="frac-num">L₀</span>
              <span className="frac-den">γ</span>
            </span>
          </div>
          <dl className="eq-where">
            <div>
              <dt>L₀</dt>
              <dd>la longueur de l'objet au repos (« longueur propre »)</dd>
            </div>
            <div>
              <dt>L</dt>
              <dd>la longueur vue par un observateur qui le regarde filer</dd>
            </div>
            <div>
              <dt>γ</dt>
              <dd>le facteur de Lorentz (≥ 1)</dd>
            </div>
          </dl>
          <p className="eq-explain">
            On divise par γ, donc L ≤ L₀ : un objet en mouvement{" "}
            <strong>paraît plus court</strong> dans le sens où il avance (seulement dans
            ce sens-là, pas en largeur).
          </p>
          <div className="eq-example">
            <strong>Vraie vie — les muons :</strong> du point de vue du muon qui fonce
            vers le sol, l'épaisseur de l'atmosphère est « contractée ». La distance à
            parcourir devient assez courte pour qu'il arrive avant de se désintégrer.
          </div>
        </div>

        {/* 4. Addition des vitesses */}
        <div className="card eq-block">
          <div className="eq-tag">Vitesses</div>
          <h3 className="eq-title">4. L'addition des vitesses</h3>
          <div className="eq-formula">
            <span className="big">w =</span>
            <span className="frac">
              <span className="frac-num">u + v</span>
              <span className="frac-den">1 + (u · v) / c²</span>
            </span>
          </div>
          <dl className="eq-where">
            <div>
              <dt>u, v</dt>
              <dd>les deux vitesses que l'on veut « additionner »</dd>
            </div>
            <div>
              <dt>w</dt>
              <dd>la vitesse résultante réellement observée</dd>
            </div>
          </dl>
          <p className="eq-explain">
            En physique classique, 0,8c + 0,8c = 1,6c… ce qui dépasserait la lumière !
            La vraie formule l'en empêche : le dénominateur grossit juste assez pour que{" "}
            <strong>le résultat reste toujours sous c</strong>.
          </p>
          <div className="eq-example">
            <strong>Exemple chiffré :</strong> deux vaisseaux à 0,8c l'un vers l'autre.
            w = (0,8c + 0,8c) / (1 + 0,64) = 1,6c / 1,64 ≈ <strong>0,976c</strong>. On
            s'approche de c mais on ne le franchit jamais.
          </div>
        </div>

        {/* 5. E = mc² */}
        <div className="card eq-block highlight">
          <div className="eq-tag star">La star ⭐</div>
          <h3 className="eq-title">5. L'équivalence masse-énergie</h3>
          <div className="eq-formula">
            <span className="big huge">E = m · c²</span>
          </div>
          <dl className="eq-where">
            <div>
              <dt>E</dt>
              <dd>l'énergie contenue dans l'objet (en joules)</dd>
            </div>
            <div>
              <dt>m</dt>
              <dd>sa masse (en kg)</dd>
            </div>
            <div>
              <dt>c²</dt>
              <dd>la vitesse de la lumière au carré — un nombre gigantesque</dd>
            </div>
          </dl>
          <p className="eq-explain">
            La masse <em>est</em> de l'énergie. Et comme c² est énorme (≈ 9 × 10¹⁶),
            <strong> un gramme de matière contient une énergie colossale</strong>. La
            forme complète, avec le mouvement, s'écrit E = γmc².
          </p>
          <div className="eq-example">
            <strong>Vraie vie :</strong> 1 gramme transformé entièrement en énergie =
            ~90 000 milliards de joules, soit l'équivalent de ~21 000 tonnes de TNT.
            C'est le principe du Soleil et des centrales nucléaires.
          </div>
        </div>

        {/* ---- De la restreinte à la générale ---- */}
        <h2 className="learn-heading">
          🚀 De la relativité <em>restreinte</em> à la <em>générale</em>
        </h2>

        <div className="card">
          <h2 className="steps-title first">Le problème qui chiffonnait Einstein</h2>
          <p className="eq-explain">
            La relativité restreinte (1905) a un angle mort : elle ne marche que pour des
            vitesses <strong>constantes</strong> et ignore totalement la{" "}
            <strong>gravité</strong>. Or une pomme qui tombe, ça accélère… Einstein va
            mettre <strong>10 ans</strong> à combler ce trou. Voici son cheminement :
          </p>

          <ol className="journey">
            {JOURNEY.map((j, i) => (
              <li key={i} className="journey-step">
                <div className="journey-badge">{i + 1}</div>
                <div className="journey-card">
                  {j.annee && <span className="journey-year">{j.annee}</span>}
                  <div className="journey-title">{j.titre}</div>
                  <p className="journey-text">{j.texte}</p>
                  <ul className="journey-details">
                    {j.details.map((d, k) => (
                      <li key={k}>{d}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* L'équation de champ d'Einstein */}
        <div className="card eq-block highlight">
          <div className="eq-tag star">L'aboutissement ⭐</div>
          <h3 className="eq-title">L'équation de champ d'Einstein (1915)</h3>
          <div className="eq-formula">
            <span className="big">
              G<sub>μν</sub> + Λ g<sub>μν</sub> =
            </span>
            <span className="frac">
              <span className="frac-num">8πG</span>
              <span className="frac-den">c⁴</span>
            </span>
            <span className="big">
              T<sub>μν</sub>
            </span>
          </div>
          <dl className="eq-where">
            <div>
              <dt>G<sub>μν</sub></dt>
              <dd>la courbure de l'espace-temps (sa « forme », sa géométrie)</dd>
            </div>
            <div>
              <dt>g<sub>μν</sub></dt>
              <dd>le tissu de l'espace-temps lui-même (la « règle » qui mesure les distances)</dd>
            </div>
            <div>
              <dt>Λ</dt>
              <dd>la constante cosmologique (l'énergie du vide, liée à l'expansion de l'Univers)</dd>
            </div>
            <div>
              <dt>G</dt>
              <dd>la constante de gravitation, déjà connue de Newton</dd>
            </div>
            <div>
              <dt>T<sub>μν</sub></dt>
              <dd>tout le contenu en matière et en énergie présent à cet endroit</dd>
            </div>
          </dl>
          <p className="eq-explain">
            En une ligne, le résumé du physicien John Wheeler :{" "}
            <strong>
              « La matière dit à l'espace-temps comment se courber ; l'espace-temps dit à
              la matière comment se déplacer. »
            </strong>{" "}
            Le côté droit (T) décrit la matière/énergie, le côté gauche (G, g) décrit la
            géométrie : l'équation met un signe « = » entre les deux.
          </p>
          <div className="eq-example">
            <strong>Vraie vie :</strong> cette équation prédit les trous noirs, l'expansion
            de l'Univers, la déviation de la lumière, et le fonctionnement exact du GPS.
            Toutes ses prédictions, même les plus folles, ont été confirmées.
          </div>
        </div>

        {/* Preuves de la relativité générale */}
        <div className="card">
          <h2 className="steps-title first">🔬 Les preuves dans la vraie vie</h2>
          <div className="cas-list">
            {CAS_GR.map((c) => (
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

        {/* ---- Glossaire ---- */}
        <div className="learn">
          <details className="accordion" open>
            <summary>
              <span className="acc-icon">🔤</span> Glossaire — le vocabulaire
            </summary>
            <div className="acc-body">
              <p className="acc-intro">Les mots de la relativité, en langage simple :</p>
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

          {/* ---- Vraie vie ---- */}
          <details className="accordion" open>
            <summary>
              <span className="acc-icon">🌍</span> À quoi ça sert dans la vraie vie
            </summary>
            <div className="acc-body">
              <p className="acc-intro">
                La relativité n'est pas qu'une curiosité : elle est dans ta poche et dans
                le ciel.
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
          MathLab — Relativité restreinte · Einstein, 1905
        </footer>
      </div>
    </main>
  );
}
