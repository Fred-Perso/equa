import Link from "next/link";

// Le parcours : une montée du concret vers l'abstrait, où chaque étape
// jette un « pont » vers la suivante. Tout est lié.
const STEPS: {
  href: string;
  emoji: string;
  titre: string;
  desc: string;
  pont?: string;
}[] = [
  {
    href: "/equations",
    emoji: "🧮",
    titre: "Les équations",
    desc: "Poser une question à l'inconnu — « quelle valeur fait que ça tombe juste ? » — et la résoudre pas à pas. C'est le langage de base, le premier mot de toute l'aventure.",
    pont: "Mais une équation fige un seul instant. Et si la réponse pouvait varier, dépendre de quelque chose ?",
  },
  {
    href: "/fonctions",
    emoji: "📈",
    titre: "Les fonctions",
    desc: "Une machine qui relie une cause à un effet. On y rencontre l'infini : des courbes qui frôlent zéro sans jamais l'atteindre, d'autres qui s'envolent vers l'infini.",
    pont: "Et si cette « machine » décrivait le temps lui-même, et la façon dont il s'étire ?",
  },
  {
    href: "/relativite",
    emoji: "🌌",
    titre: "La relativité",
    desc: "L'espace et le temps fusionnent en une seule étoffe, que la matière courbe. Le facteur de Lorentz n'est qu'une fonction ; la gravité, qu'une géométrie. Du restreint au général.",
    pont: "Ça, c'est l'infiniment grand. Mais que se passe-t-il à l'échelle de l'atome ?",
  },
  {
    href: "/quantique",
    emoji: "⚛️",
    titre: "La mécanique quantique",
    desc: "L'infiniment petit, où la nature devient granuleuse et probabiliste. La fonction d'onde n'est qu'une… fonction de probabilités. Einstein s'y refusait : « Dieu ne joue pas aux dés. »",
    pont: "Deux théories magnifiques, l'une du grand, l'autre du petit. Mais d'abord : qu'est-ce que « calculer » veut dire ?",
  },
  {
    href: "/turing",
    emoji: "🤖",
    titre: "La machine de Turing",
    desc: "Toute la pensée mécanique réduite à un petit robot, des cases et des cartes. L'ancêtre de l'ordinateur, qui montre ce qu'on peut calculer… et ce qui restera à jamais hors d'atteinte.",
    pont: "Nombres, espace-temps, information… et si tout cela n'était que les visages d'UNE seule et même chose ?",
  },
  {
    href: "/spinoza",
    emoji: "♾️",
    titre: "L'Univers de Spinoza",
    desc: "La vision qui rassemble tout : une seule substance infinie et nécessaire, dont nous sommes des vagues. Le « Dieu » dont Einstein lui-même se réclamait.",
    pont: "Belle intuition d'unité… mais notre science y arrive-t-elle vraiment, aujourd'hui ?",
  },
  {
    href: "/limites",
    emoji: "🧩",
    titre: "Les limites de la science",
    desc: "L'épilogue honnête : relativité et quantique refusent de fusionner. On rêve d'une « théorie du tout », on la frôle… sans l'atteindre. Une asymptote, à l'échelle de la connaissance.",
    pont: "Et si ce mur n'était qu'une illusion de perspective — si le petit et le grand n'étaient qu'Un ?",
  },
  {
    href: "/vertige",
    emoji: "🌀",
    titre: "Le vertige",
    desc: "Le saut final, assumé comme métaphysique : l'Univers est-il « observé » ? Le petit est-il aussi le grand dans l'infini ? De Berkeley à Spinoza, en passant par 1/x — là où l'intuition court devant les équations.",
  },
];

export default function Home() {
  return (
    <main className="page">
      <div className="container">
        <header className="hero">
          <div className="hero-badge">♾️ un seul fil, du calcul au cosmos</div>
          <h1>
            D'une équation toute simple
            <br />
            jusqu'à la structure du réel
          </h1>
          <p className="tagline">
            Ce petit laboratoire raconte une seule histoire en plusieurs chapitres :
            comment les <strong>nombres</strong>, l'<strong>espace-temps</strong>, le{" "}
            <strong>calcul</strong> et la <strong>philosophie</strong> ne sont, peut-être,
            que des manières différentes de regarder <strong>une même réalité</strong>.
            Tout est expliqué « pour les nuls », avec des animations, des graphiques et des
            exemples concrets.
          </p>
          <Link href="/equations" className="hero-cta">
            Commencer le parcours →
          </Link>
        </header>

        <h2 className="learn-heading">🧭 Le parcours, étape par étape</h2>
        <ol className="hub">
          {STEPS.map((s, i) => (
            <li key={s.href}>
              <Link href={s.href} className="hub-card">
                <span className="hub-badge">{i + 1}</span>
                <span className="hub-body">
                  <span className="hub-title">
                    {s.emoji} {s.titre}
                  </span>
                  <span className="hub-desc">{s.desc}</span>
                </span>
                <span className="hub-go">→</span>
              </Link>
              {s.pont && (
                <div className="hub-bridge">
                  <span className="hub-bridge-arrow">↓</span> {s.pont}
                </div>
              )}
            </li>
          ))}
        </ol>

        {/* Le fil rouge explicité */}
        <div className="card eq-block highlight">
          <div className="eq-tag star">Le fil rouge ⭐</div>
          <h3 className="eq-title">Pourquoi mettre tout ça ensemble ?</h3>
          <p className="eq-explain">
            Parce que la même idée revient à chaque étage, sous un déguisement différent :
          </p>
          <div className="bridge-list">
            <div className="bridge-item">
              <span className="bridge-fn">L'unité</span>
              <span className="bridge-arrow">↦</span>
              <span className="bridge-use">
                une seule étoffe (l'espace-temps), une seule substance (Spinoza), un seul
                ruban (Turing)
              </span>
            </div>
            <div className="bridge-item">
              <span className="bridge-fn">L'infini & la limite</span>
              <span className="bridge-arrow">↦</span>
              <span className="bridge-use">
                frôler zéro sans l'atteindre, frôler la vitesse de la lumière sans la
                franchir
              </span>
            </div>
            <div className="bridge-item">
              <span className="bridge-fn">La nécessité</span>
              <span className="bridge-arrow">↦</span>
              <span className="bridge-use">
                résoudre « à la manière des géomètres » — des équations aux lois de
                l'Univers
              </span>
            </div>
            <div className="bridge-item">
              <span className="bridge-fn">Le point de vue</span>
              <span className="bridge-arrow">↦</span>
              <span className="bridge-use">
                tout dépend de l'observateur, du référentiel… et pourtant le Tout, lui,
                demeure
              </span>
            </div>
          </div>
          <div className="eq-example">
            Tu peux lire les chapitres dans l'ordre (recommandé), ou picorer celui qui
            t'attire. À la fin de chaque page, une flèche « suivant » te ramène sur le fil.
          </div>
        </div>

        <footer className="footer">
          MathLab — un parcours du calcul au cosmos · « Deus sive Natura »
        </footer>
      </div>
    </main>
  );
}
