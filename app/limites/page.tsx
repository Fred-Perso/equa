// Les autres frontières du savoir.
const FRONTIERES: { emoji: string; titre: string; texte: string }[] = [
  {
    emoji: "🌑",
    titre: "95 % de l'Univers nous échappe",
    texte:
      "La matière ordinaire (étoiles, planètes, toi) ne représente que ~5 % de l'Univers. Le reste, on l'appelle « matière noire » (~27 %) et « énergie noire » (~68 %) — mais ce sont des noms posés sur notre ignorance : on ne sait pas ce que c'est.",
  },
  {
    emoji: "🔬",
    titre: "Une limite gravée dans la nature",
    texte:
      "Le principe d'incertitude de Heisenberg n'est pas un problème de matériel : il interdit, pour toujours, de tout connaître en même temps. Une part du réel restera floue par principe.",
  },
  {
    emoji: "🤖",
    titre: "Des vérités que rien ne peut prouver",
    texte:
      "Gödel (en maths) et Turing (avec le « problème de l'arrêt » — vu dans le chapitre Machine de Turing) l'ont démontré : il existe des questions vraies qu'aucune méthode, aucun ordinateur ne pourra jamais trancher. Le calcul a ses murs.",
  },
  {
    emoji: "❓",
    titre: "On utilise la quantique sans la comprendre",
    texte:
      "La mécanique quantique marche à la perfection, mais personne ne s'accorde sur ce qu'elle signifie vraiment (le « problème de la mesure »). Comme disait Feynman : « Je crois pouvoir affirmer que personne ne comprend la mécanique quantique. »",
  },
];

export default function LimitesPage() {
  return (
    <main className="page">
      <div className="container">
        <header className="header">
          <h1>🧩 Les limites de la science aujourd'hui</h1>
          <p>
            Tout ce parcours menait à rêver d'<strong>une seule explication</strong> du
            réel. Voici l'heure de l'honnêteté : aujourd'hui, la science{" "}
            <strong>n'y arrive pas encore</strong>. Et c'est passionnant. 👇
          </p>
        </header>

        {/* Le mur entre les deux théories */}
        <div className="card">
          <h2 className="steps-title first">🧱 Deux théories géniales… qui se cognent</h2>
          <p className="eq-explain">
            Nous avons deux théories d'une précision stupéfiante, vérifiées des milliers de
            fois :
          </p>
          <ul className="tuto-steps">
            <li>
              🌌 La <strong>relativité générale</strong> règne sur l'infiniment grand :
              gravité, astres, espace-temps. Lisse et déterministe.
            </li>
            <li>
              ⚛️ La <strong>mécanique quantique</strong> règne sur l'infiniment petit :
              atomes, particules. Granuleuse et probabiliste.
            </li>
          </ul>
          <p className="eq-explain">
            Chacune est parfaite <em>dans son domaine</em>. Le problème surgit quand on a
            besoin des <strong>deux à la fois</strong> : là où quelque chose est{" "}
            <strong>à la fois très massif ET minuscule</strong> — le cœur d'un{" "}
            <strong>trou noir</strong>, ou le tout premier instant du{" "}
            <strong>Big Bang</strong>. On mélange alors les deux équations… et le résultat
            part en <strong>infinis absurdes</strong>. Les maths se cassent.
          </p>
        </div>

        {/* Le rêve de la théorie du tout */}
        <div className="card eq-block highlight">
          <div className="eq-tag star">Le grand rêve ⭐</div>
          <h3 className="eq-title">« La théorie du tout » — et pourquoi on la cherche encore</h3>
          <p className="eq-explain">
            Le Graal de la physique : <strong>une seule poignée d'équations</strong> qui
            engloberait à la fois la relativité et la quantique. On l'appelle « gravité
            quantique » ou « théorie du tout ». <strong>Einstein</strong> y a consacré ses{" "}
            <strong>30 dernières années</strong>… sans succès. Personne n'a réussi depuis.
          </p>
          <div className="bridge-list">
            <div className="bridge-item">
              <span className="bridge-fn">Théorie des cordes</span>
              <span className="bridge-arrow">↦</span>
              <span className="bridge-use">
                les particules seraient de minuscules « cordes » vibrantes — élégant, mais
                jamais vérifié
              </span>
            </div>
            <div className="bridge-item">
              <span className="bridge-fn">Gravité à boucles</span>
              <span className="bridge-arrow">↦</span>
              <span className="bridge-use">
                l'espace-temps lui-même serait granuleux, fait de minuscules « grains » —
                non confirmé non plus
              </span>
            </div>
          </div>
          <p className="eq-explain">
            Le mur n'est pas qu'théorique : pour <em>tester</em> ces idées, il faudrait des
            énergies si colossales qu'un accélérateur de particules devrait avoir la taille
            d'une <strong>galaxie</strong>. Ces théories sont, pour l'instant,{" "}
            <strong>hors de portée de l'expérience</strong>.
          </p>
        </div>

        {/* Les autres frontières */}
        <h2 className="learn-heading">🚧 Les autres frontières du savoir</h2>
        <div className="card">
          <div className="cas-list">
            {FRONTIERES.map((f) => (
              <div key={f.titre} className="cas-item">
                <div className="cas-titre">
                  <span className="cas-emoji">{f.emoji}</span>
                  {f.titre}
                </div>
                <p className="cas-texte">{f.texte}</p>
              </div>
            ))}
          </div>
        </div>

        {/* La boucle : l'asymptote + Spinoza */}
        <div className="card eq-block highlight">
          <div className="eq-tag star">La boucle est bouclée ⭐</div>
          <h3 className="eq-title">Frôler l'unité sans (encore) l'atteindre</h3>
          <p className="eq-explain">
            Souviens-toi du chapitre <strong>Fonctions</strong> : ces courbes qui
            s'approchent de zéro sans jamais le toucher. La science fait pareil avec{" "}
            <strong>l'unification</strong> : elle s'en rapproche, théorie après théorie,
            mais ne l'a pas atteinte. Une <strong>asymptote</strong>, à l'échelle de la
            connaissance.
          </p>
          <p className="eq-explain">
            Et c'est là que <strong>Spinoza</strong> tend la main par-dessus les siècles.
            Son intuition — une <strong>seule</strong> substance, un Tout unique et
            nécessaire — reste un <em>pari philosophique</em>. La nature <em>semble</em> une
            ; nos équations, elles, ne savent pas encore l'écrire d'une seule voix. Le rêve
            d'unité est très ancien ; l'impasse, elle, est d'aujourd'hui.
          </p>
          <blockquote className="quote">
            « Le plus incompréhensible, à propos de l'Univers, c'est qu'il soit
            compréhensible. »
            <cite>— attribué à Albert Einstein</cite>
          </blockquote>
          <div className="eq-example">
            <strong>Le mot de la fin :</strong> les limites de la science ne sont pas un
            échec — ce sont les <strong>questions ouvertes</strong> où commence l'aventure.
            On est partis d'une équation à une inconnue ; on termine devant la plus grande
            inconnue de toutes : <strong>l'Univers est-il, au fond, Un ?</strong>
          </div>
        </div>

        <footer className="footer">
          MathLab — Les limites de la science · là où finit le parcours, commencent les
          questions
        </footer>
      </div>
    </main>
  );
}
