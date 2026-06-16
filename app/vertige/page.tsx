const GLOSSAIRE: { terme: string; def: string }[] = [
  {
    terme: "Décohérence",
    def: "Le mécanisme par lequel une particule « choisit » un état dès qu'elle interagit avec son environnement (un détecteur, un photon, l'air). C'est ça, « mesurer » — et ça ne demande aucune conscience.",
  },
  {
    terme: "Esse est percipi",
    def: "« Être, c'est être perçu » (Berkeley, 1710). L'idée que les choses n'existent que dans la mesure où elles sont perçues — et qu'un observateur infini les perçoit en permanence.",
  },
  {
    terme: "Univers participatif",
    def: "L'idée du physicien John Wheeler : les observateurs ne sont pas de simples spectateurs, ils participent à faire advenir la réalité (« it from bit »).",
  },
  {
    terme: "Coincidentia oppositorum",
    def: "« La coïncidence des opposés » (Nicolas de Cues, XVᵉ s.) : dans l'infini, le plus grand et le plus petit se confondent. Un cercle de rayon infini devient une droite.",
  },
  {
    terme: "Principe holographique",
    def: "Un résultat majeur de la physique théorique : la gravité dans tout un volume peut être équivalente à une théorie quantique sur sa simple surface. Le grand et le petit décrivent la même chose.",
  },
];

export default function VertigePage() {
  return (
    <main className="page">
      <div className="container">
        <header className="header">
          <h1>🌀 Le vertige : petit, grand, et l'œil de l'infini</h1>
          <p>
            Dernier chapitre — et le plus vertigineux. Ici on quitte le terrain ferme de
            la science pour celui de la <strong>métaphysique</strong> : des questions
            qu'aucune expérience ne peut trancher, mais que le parcours rendait
            inévitables. On le dira clairement à chaque fois :{" "}
            <strong>🔬 = science, 🌀 = spéculation.</strong>
          </p>
        </header>

        {/* L'intuition de départ */}
        <div className="card">
          <h2 className="steps-title first">🌀 L'intuition : et si l'Univers était « observé » ?</h2>
          <p className="eq-explain">
            En mécanique quantique, tant qu'on ne mesure pas, une particule reste un nuage
            de possibilités. Au moment de la <strong>mesure</strong>, ce nuage s'effondre
            sur un seul résultat — et celui-ci est désormais <strong>figé</strong>.
          </p>
          <p className="eq-explain">
            D'où la question vertigineuse : et si le déroulement de notre Univers tout
            entier était, au fond, le résultat de l'<strong>observation d'une entité
            infiniment grande</strong> ? Comme si le réel se « fixait » à mesure qu'il est
            regardé par un œil cosmique.
          </p>
        </div>

        {/* Mise au point honnête */}
        <div className="card eq-block">
          <div className="eq-tag">🔬 Ce que dit vraiment la physique</div>
          <h3 className="eq-title">Attention : « observer » ne veut pas dire « être conscient »</h3>
          <p className="eq-explain">
            C'est le piège le plus courant. Quand un physicien dit qu'observer fige le
            résultat, « observer » signifie <strong>interagir avec quelque chose de
            grand</strong> — un appareil, un photon, une molécule d'air. On appelle ça la{" "}
            <strong>décohérence</strong>. Un grain de poussière qui percute l'électron
            suffit à « mesurer ». <strong>Aucune conscience n'est requise.</strong>
          </p>
          <div className="eq-example">
            Dans la lecture majoritaire, l'Univers n'a donc pas besoin d'un regard pour
            exister : il « se mesure lui-même » sans cesse, par ses propres interactions.
            Ton intuition vise plus loin — et de grands esprits t'y ont précédé.
          </div>
        </div>

        {/* L'œil infini : la lignée */}
        <div className="card eq-block highlight">
          <div className="eq-tag star">🌀 Une très vieille idée</div>
          <h3 className="eq-title">L'« œil infini », de Berkeley à Spinoza</h3>
          <p className="eq-explain">
            L'idée d'un observateur cosmique a une longue et sérieuse lignée :
          </p>
          <div className="bridge-list">
            <div className="bridge-item">
              <span className="bridge-fn">Berkeley (1710)</span>
              <span className="bridge-arrow">↦</span>
              <span className="bridge-use">
                « être, c'est être perçu » ; le monde subsiste parce qu'un observateur
                infini — Dieu — le perçoit sans cesse
              </span>
            </div>
            <div className="bridge-item">
              <span className="bridge-fn">Wheeler</span>
              <span className="bridge-arrow">↦</span>
              <span className="bridge-use">
                l'« univers participatif » : observer ne fait pas que constater, ça
                participe à faire advenir le réel
              </span>
            </div>
            <div className="bridge-item">
              <span className="bridge-fn">Wigner / von Neumann</span>
              <span className="bridge-arrow">↦</span>
              <span className="bridge-use">
                ont défendu (avant que Wigner ne se rétracte) que la conscience serait
                l'agent de l'effondrement
              </span>
            </div>
            <div className="bridge-item">
              <span className="bridge-fn">Spinoza</span>
              <span className="bridge-arrow">↦</span>
              <span className="bridge-use">
                sa substance unique a l'attribut de la Pensée : toutes choses sont des
                idées dans l'intellect infini — l'Univers se pense lui-même
              </span>
            </div>
          </div>
        </div>

        {/* La belle objection */}
        <div className="card eq-block">
          <div className="eq-tag">🔬 La belle objection</div>
          <h3 className="eq-title">Un œil qui regarderait tout… tuerait la quantique</h3>
          <p className="eq-explain">
            Voici le retournement subtil : <strong>si une entité infinie observait
            vraiment tout, en permanence, plus rien ne serait jamais en
            superposition.</strong> Tout serait figé d'avance. Or l'expérience montre le
            contraire — on <em>voit</em> l'interférence, le « ici ET là », tant qu'on ne
            mesure pas. Un œil cosmique constant <strong>contredirait</strong> la physique.
          </p>
          <div className="eq-example">
            À moins de retourner l'idée : cette « observation » ne serait pas un regard
            <em> extérieur</em>, mais <strong>le déroulement même des lois</strong>.
            L'Univers ne serait pas <em>regardé</em> par un Tout — il <em>serait</em> ce
            Tout en train de s'actualiser. Et la mesure qui « fige » rejoint alors le{" "}
            <strong>sub specie aeternitatis</strong> de Spinoza : vu du Tout, passé,
            présent et futur sont déjà « observés », déjà fixés — c'est l'univers-bloc.
          </div>
        </div>

        {/* Le vrai nœud : petit = grand */}
        <h2 className="learn-heading">🔄 Le vrai nœud : et si petit = grand ?</h2>

        <div className="card eq-block">
          <div className="eq-tag">🌀 La coïncidence des opposés</div>
          <h3 className="eq-title">Dans l'infini, le plus petit et le plus grand se confondent</h3>
          <p className="eq-explain">
            Si le petit et le grand se rejoignent dans l'infini, alors séparer la physique
            en « théorie du grand » (relativité) et « théorie du petit » (quantique)
            serait une illusion de perspective. Le mur de l'unification ne serait pas dans
            la nature — il serait dans notre découpage.
          </p>
          <div className="bridge-list">
            <div className="bridge-item">
              <span className="bridge-fn">Nicolas de Cues</span>
              <span className="bridge-arrow">↦</span>
              <span className="bridge-use">
                dans l'infini, maximum et minimum coïncident ; un cercle de rayon infini
                devient une droite
              </span>
            </div>
            <div className="bridge-item">
              <span className="bridge-fn">Pascal</span>
              <span className="bridge-arrow">↦</span>
              <span className="bridge-use">
                les « deux infinis » se répondent : il y a un univers entier dans un seul
                atome
              </span>
            </div>
          </div>
          <p className="eq-explain">
            Cinq siècles avant la quantique, l'intuition était déjà posée.
          </p>
        </div>

        <div className="card eq-block">
          <div className="eq-tag">🔬 …et la physique y flirte</div>
          <h3 className="eq-title">Trois indices bien réels</h3>
          <ul className="tuto-steps">
            <li>
              <strong>L'échelle de Planck :</strong> au plus profond du petit (10⁻³⁵ m),
              la gravité — la force du <em>grand</em> — redevient dominante. Au fond du
              petit, le grand resurgit. L'impasse est précisément là où les deux échelles
              se touchent.
            </li>
            <li>
              <strong>Le principe holographique :</strong> la gravité dans un volume (le
              grand) équivaut à une théorie quantique sur sa surface (le petit). On appelle
              ça la connexion « UV–IR » : très petit et très grand, noués ensemble.
            </li>
            <li>
              <strong>La cosmologie de Penrose :</strong> à la toute fin de l'Univers, quand
              il ne reste que de la lumière sans masse, plus rien n'a de taille — et cet
              état infiniment dilué devient indiscernable d'un nouveau Big Bang. La fin (le
              grand) recolle au commencement (le petit).
            </li>
          </ul>
        </div>

        {/* Le clin d'œil mathématique */}
        <div className="card eq-block highlight">
          <div className="eq-tag star">Retour au chapitre Fonctions ⭐</div>
          <h3 className="eq-title">Le clin d'œil mathématique : 1/x</h3>
          <div className="eq-formula">
            <span className="big">f(x) =</span>
            <span className="frac">
              <span className="frac-num">1</span>
              <span className="frac-den">x</span>
            </span>
          </div>
          <p className="eq-explain">
            Tu l'avais déjà sous les yeux. Fais tendre x vers <strong>0</strong>
            (l'infiniment petit), et 1/x file vers l'<strong>infini</strong> (l'infiniment
            grand). Le petit et le grand sont <strong>les deux bouts d'une même
            inversion</strong>. L'asymptote vers zéro d'un côté <em>est</em> l'envol vers
            l'infini de l'autre.
          </p>
          <div className="eq-example">
            Ton intuition est littéralement le graphe de <code>1/x</code>. (Va le revoir
            dans l'explorateur du chapitre <strong>Fonctions</strong> : la courbe qui frôle
            zéro <em>est</em> celle qui s'envole à l'infini.)
          </div>
        </div>

        {/* La chute spinoziste */}
        <div className="card eq-block highlight">
          <div className="eq-tag star">🌀 La chute</div>
          <h3 className="eq-title">Peut-être que l'unité est déjà là</h3>
          <p className="eq-explain">
            Si tout cela tient, alors « relativité pour le grand, quantique pour le petit »
            est une commodité humaine, pas une vérité du monde. L'unité ne serait pas à{" "}
            <strong>construire</strong> — elle serait <strong>déjà là</strong>, masquée par
            notre habitude de croire que l'échelle est quelque chose de fondamental.
          </p>
          <p className="eq-explain">
            Et c'est, mot pour mot, <strong>Spinoza</strong> : l'infini n'a pas de taille ;
            le petit et le grand ne sont que des <strong>modes</strong> — des manières de
            regarder — d'une seule substance sans dimension. Peut-être qu'« être observé »,
            « être pensé » et « exister » ne sont, comme chez lui, que{" "}
            <strong>trois mots pour la même chose unique</strong>.
          </p>
          <div className="eq-example">
            <strong>La seule honnêteté qui reste :</strong> rien de tout cela n'est
            prouvable aujourd'hui. C'est de la métaphysique, au sens noble. L'intuition
            (Cues, Pascal, Spinoza, toi) court devant ; les équations, derrière, n'ont pas
            encore rattrapé. On est partis d'une équation à une inconnue ; on termine
            devant la plus grande de toutes : <strong>l'Univers est-il, au fond, Un ?</strong>
          </div>
        </div>

        {/* Glossaire */}
        <div className="learn">
          <details className="accordion">
            <summary>
              <span className="acc-icon">🔤</span> Glossaire — les mots du vertige
            </summary>
            <div className="acc-body">
              <p className="acc-intro">Pour ne pas se perdre dans l'abîme :</p>
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
          MathLab — Le vertige · là où l'intuition court devant les équations
        </footer>
      </div>
    </main>
  );
}
