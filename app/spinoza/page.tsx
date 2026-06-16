// Les idées maîtresses de la métaphysique de Spinoza, version « pour les nuls ».
const IDEES: { emoji: string; titre: string; texte: string }[] = [
  {
    emoji: "♾️",
    titre: "1. Une seule chose existe vraiment : la Substance",
    texte:
      "Spinoza part d'une idée radicale : au fond, il n'existe qu'UNE seule réalité, infinie, qui n'a besoin de rien d'autre qu'elle-même pour exister. Il l'appelle la « Substance ». Tout le reste — toi, les étoiles, tes pensées — n'est qu'une manière d'être de cette unique réalité.",
  },
  {
    emoji: "🌍",
    titre: "2. Dieu = la Nature (Deus sive Natura)",
    texte:
      "Cette substance unique, Spinoza l'appelle indifféremment « Dieu » ou « la Nature ». Mais attention : ce n'est pas un vieux monsieur barbu dans le ciel ! Dieu n'a pas fabriqué le monde de l'extérieur — Dieu EST le monde, l'Univers entier pris comme un tout. C'est ce qu'on appelle le panthéisme.",
  },
  {
    emoji: "🧠",
    titre: "3. Deux visages : la Pensée et l'Étendue",
    texte:
      "On ne perçoit cette substance que sous deux angles (Spinoza dit « attributs ») : l'Étendue (tout ce qui occupe l'espace, la matière) et la Pensée (les idées). Le corps et l'esprit ne sont pas deux choses séparées : ce sont deux façons de regarder une seule et même réalité.",
  },
  {
    emoji: "🌊",
    titre: "4. Nous sommes des vagues",
    texte:
      "Chaque chose particulière — un humain, un caillou, une émotion — est un « mode » : une vague à la surface de l'océan-substance. La vague n'est pas séparée de l'océan ; elle EST l'océan en train de prendre une forme, pour un temps. Quand elle retombe, rien n'est perdu : l'océan demeure.",
  },
  {
    emoji: "📐",
    titre: "5. Tout est nécessaire (à la manière des géomètres)",
    texte:
      "Pour Spinoza, rien n'arrive « par hasard » ni par un caprice divin. Tout découle de la nature de la substance avec la même nécessité qu'un théorème découle de ses axiomes. Il a d'ailleurs écrit son grand livre, l'Éthique, « à la manière des géomètres » : définitions, axiomes, démonstrations, comme en mathématiques.",
  },
  {
    emoji: "👁️",
    titre: "6. Voir sous l'angle de l'éternité",
    texte:
      "La sagesse, pour Spinoza, c'est de cesser de tout juger depuis notre petit point de vue du moment, et de regarder les choses « sous l'aspect de l'éternité » (sub specie aeternitatis) : comme des morceaux nécessaires d'un Tout intemporel. Une forme de paix qui vient de la compréhension.",
  },
];

const GLOSSAIRE: { terme: string; def: string }[] = [
  {
    terme: "Substance",
    def: "La réalité unique, infinie, qui existe par elle-même et n'a besoin de rien d'autre. Pour Spinoza, il n'y en a qu'une seule : c'est tout ce qui est.",
  },
  {
    terme: "Attribut",
    def: "Une façon dont on perçoit la substance. Nous en connaissons deux : l'Étendue (l'espace, la matière) et la Pensée (les idées).",
  },
  {
    terme: "Mode",
    def: "Une chose particulière et passagère : un humain, une pierre, une idée. Une simple « modification » de la substance, comme une vague sur l'océan.",
  },
  {
    terme: "Deus sive Natura",
    def: "« Dieu, c'est-à-dire la Nature ». La formule-choc de Spinoza : Dieu et l'Univers sont une seule et même chose.",
  },
  {
    terme: "Immanence",
    def: "L'idée que la cause est DANS son effet, pas au-dehors. Dieu est immanent au monde (il est dedans), et non transcendant (au-dessus, séparé).",
  },
  {
    terme: "Panthéisme",
    def: "La conviction que « tout est Dieu » / Dieu est l'ensemble de la Nature — par opposition à un Dieu créateur extérieur.",
  },
  {
    terme: "Déterminisme",
    def: "Tout ce qui arrive était nécessaire et découle des lois de la substance. Rien n'est laissé au pur hasard ni à un libre arbitre absolu.",
  },
  {
    terme: "Sub specie aeternitatis",
    def: "« Sous l'aspect de l'éternité ». Regarder les choses non pas dans l'instant, mais comme des éléments nécessaires et intemporels du Tout.",
  },
];

const IMPACTS: { emoji: string; titre: string; texte: string }[] = [
  {
    emoji: "🧘",
    titre: "Une source de sérénité",
    texte:
      "Comprendre que les choses arrivent par nécessité aide à moins se révolter contre ce qui ne dépend pas de nous. Cette idée a influencé toute une lignée de pensées sur l'acceptation et le calme intérieur.",
  },
  {
    emoji: "🌱",
    titre: "Une racine de l'écologie",
    texte:
      "Si nous ne sommes pas AU-DESSUS de la Nature mais une partie d'elle, notre rapport à l'environnement change. Spinoza est une référence majeure de « l'écologie profonde » (le philosophe Arne Næss s'en réclamait).",
  },
  {
    emoji: "🔬",
    titre: "Un socle de la science",
    texte:
      "Un univers régi par des lois nécessaires, sans intervention surnaturelle à chaque instant : c'est exactement le présupposé qui rend la science possible. Spinoza prépare le terrain de la pensée scientifique moderne.",
  },
  {
    emoji: "🕊️",
    titre: "Un pionnier de la liberté de penser",
    texte:
      "Banni de sa communauté à 23 ans pour ses idées, Spinoza a défendu la tolérance et la liberté d'expression bien avant les Lumières. Il gagnait sa vie en polissant des lentilles optiques — un tailleur de verres qui voulait nous apprendre à mieux voir.",
  },
];

export default function SpinozaPage() {
  return (
    <main className="page">
      <div className="container">
        <header className="header">
          <h1>♾️ L'Univers selon Spinoza</h1>
          <p>
            Baruch Spinoza (1632–1677), philosophe né à Amsterdam, a proposé une vision
            de l'Univers d'une cohérence vertigineuse — au point qu'<strong>Einstein
            lui-même</strong> disait croire au « Dieu de Spinoza ». Découvrons-la en
            douceur, puis relions-la à la relativité générale. 👇
          </p>
        </header>

        {/* Les idées maîtresses */}
        <h2 className="learn-heading">🧠 Sa vision en 6 idées</h2>
        {IDEES.map((i) => (
          <div key={i.titre} className="card eq-block">
            <h3 className="eq-title">
              {i.emoji} {i.titre}
            </h3>
            <p className="eq-explain">{i.texte}</p>
          </div>
        ))}

        {/* ---- Le pont avec la relativité générale ---- */}
        <h2 className="learn-heading">🌌 Le pont avec la relativité générale</h2>
        <div className="card eq-block highlight">
          <div className="eq-tag star">250 ans d'écart, une même intuition ⭐</div>
          <h3 className="eq-title">Spinoza (1677) rencontre Einstein (1915)</h3>
          <p className="eq-explain">
            Spinoza fait de la métaphysique, Einstein fait de la physique — ce sont deux
            domaines différents. Et pourtant, leurs visions de l'Univers se font
            étrangement écho. Voici les résonances, idée par idée :
          </p>

          <div className="trans-table">
            <div className="trans-row trans-head">
              <span>Spinoza (la Substance)</span>
              <span>Relativité générale (l'espace-temps)</span>
            </div>
            <div className="trans-row">
              <span>Une seule substance infinie, dont tout est une partie</span>
              <span>Un seul espace-temps : un continuum unique dont matière, énergie, espace et temps sont des aspects</span>
            </div>
            <div className="trans-row">
              <span>Dieu est immanent : il n'y a pas d'« extérieur » au Tout</span>
              <span>Il n'y a pas de scène hors de l'espace-temps ; pas de point de vue extérieur, les lois sont internes</span>
            </div>
            <div className="trans-row">
              <span>Tout est nécessaire, démontré « à la manière des géomètres »</span>
              <span>Les équations de champ déterminent la géométrie : l'Univers obéit à une nécessité mathématique</span>
            </div>
            <div className="trans-row">
              <span>Les choses sont des « modes » : des vagues de la substance</span>
              <span>Matière et particules = courbures et vibrations locales du champ ; nous sommes des plis de l'espace-temps</span>
            </div>
            <div className="trans-row">
              <span>Voir « sous l'aspect de l'éternité »</span>
              <span>L'univers-bloc : passé, présent et futur également réels dans le bloc à 4 dimensions</span>
            </div>
            <div className="trans-row">
              <span>La Pensée et l'Étendue : deux faces d'un même réel</span>
              <span>L'espace et le temps : deux faces d'un même espace-temps unifié</span>
            </div>
          </div>

          <p className="eq-explain">
            Et ce n'est pas qu'une coïncidence d'amateurs : Einstein a explicitement
            revendiqué cette filiation. Deux citations célèbres et documentées :
          </p>

          <blockquote className="quote">
            « Je crois au Dieu de Spinoza, qui se révèle dans l'harmonie ordonnée de ce
            qui existe, et non en un Dieu qui se préoccuperait du sort et des actes des
            humains. »
            <cite>— Albert Einstein, télégramme au rabbin H. Goldstein, 1929</cite>
          </blockquote>

          <blockquote className="quote">
            « Pour nous, physiciens convaincus, la distinction entre passé, présent et
            futur n'est qu'une illusion, aussi tenace soit-elle. »
            <cite>— Albert Einstein, lettre à la famille de son ami Besso, 1955</cite>
          </blockquote>

          <div className="eq-example">
            <strong>À garder en tête :</strong> il s'agit d'un <em>rapprochement d'idées</em>,
            pas d'une démonstration scientifique. Spinoza n'a pas « prédit » la relativité.
            Mais les deux dessinent le même tableau : un Univers <strong>unique</strong>,{" "}
            <strong>auto-suffisant</strong> et <strong>régi par une nécessité géométrique</strong>{" "}
            — exactement ce qui fascinait Einstein chez le philosophe.
          </div>
        </div>

        {/* ---- Glossaire & impact ---- */}
        <div className="learn">
          <details className="accordion" open>
            <summary>
              <span className="acc-icon">🔤</span> Glossaire — le vocabulaire de Spinoza
            </summary>
            <div className="acc-body">
              <p className="acc-intro">Les mots-clés, en langage simple :</p>
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
              <span className="acc-icon">🌍</span> Pourquoi ça compte encore aujourd'hui
            </summary>
            <div className="acc-body">
              <p className="acc-intro">
                Une pensée du XVIIᵉ siècle qui irrigue encore notre époque :
              </p>
              <div className="cas-list">
                {IMPACTS.map((c) => (
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
          MathLab — L'Univers de Spinoza · « Deus sive Natura »
        </footer>
      </div>
    </main>
  );
}
