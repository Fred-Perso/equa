import TuringMachine from "./TuringMachine";

const GLOSSAIRE: { terme: string; def: string }[] = [
  {
    terme: "Ruban",
    def: "Une bande de papier infinie, découpée en cases. Chaque case contient un symbole (0, 1, ou « vide »). C'est à la fois la mémoire et la feuille de brouillon de la machine.",
  },
  {
    terme: "Tête de lecture/écriture",
    def: "Un curseur posé sur une case. Il peut lire le symbole, le réécrire, puis se déplacer d'une case à gauche ou à droite. Il ne voit qu'une seule case à la fois.",
  },
  {
    terme: "État",
    def: "L'« humeur » interne de la machine, son unique souvenir. Par exemple « je suis en train de chercher la fin du nombre ». Il y en a un nombre fini.",
  },
  {
    terme: "Table de transitions",
    def: "Le programme : la liste des règles. Une règle dit, pour un état et un symbole lu : quoi écrire, où aller (gauche/droite), et dans quel état passer.",
  },
  {
    terme: "État d'arrêt (STOP)",
    def: "Un état spécial dans lequel la machine n'a plus de règle à appliquer : elle s'arrête. Le calcul est terminé.",
  },
  {
    terme: "Halte (le « problème de l'arrêt »)",
    def: "Turing a prouvé qu'aucun programme ne peut prédire à coup sûr si une machine quelconque finira par s'arrêter ou tournera indéfiniment. C'est une limite fondamentale de l'informatique.",
  },
];

const CAS_REELS: { emoji: string; titre: string; texte: string }[] = [
  {
    emoji: "💻",
    titre: "Tous tes appareils",
    texte:
      "Ton téléphone, ton ordinateur, ta console : ce sont tous des machines de Turing « améliorées ». Tout ce qu'ils calculent, une machine de Turing pourrait le calculer aussi (en beaucoup plus lent). C'est la thèse de Church-Turing.",
  },
  {
    emoji: "🔐",
    titre: "Casser les codes (Enigma)",
    texte:
      "Pendant la 2ᵉ guerre mondiale, Alan Turing a conçu des machines pour décrypter les messages allemands chiffrés par Enigma. Ses idées ont raccourci la guerre et fondé l'informatique moderne.",
  },
  {
    emoji: "🧠",
    titre: "Ce qu'un ordinateur NE peut pas faire",
    texte:
      "La machine de Turing ne sert pas qu'à calculer : elle définit les limites du calculable. Certains problèmes (comme le « problème de l'arrêt ») sont prouvés impossibles à résoudre, quelle que soit la puissance de la machine.",
  },
  {
    emoji: "🤖",
    titre: "Le test de Turing & l'IA",
    texte:
      "Turing a aussi imaginé un test pour décider si une machine « pense » : si tu ne peux pas la distinguer d'un humain en discutant, alors… ? C'est encore le débat de fond de l'intelligence artificielle aujourd'hui.",
  },
];

export default function TuringPage() {
  return (
    <main className="page">
      <div className="container">
        <header className="header">
          <h1>🤖 La machine de Turing — pour les nuls</h1>
          <p>
            En 1936, bien avant le premier ordinateur, Alan Turing a imaginé sur le papier
            la machine la plus simple possible capable de <strong>tout</strong> calculer.
            C'est l'ancêtre théorique de tous nos ordinateurs. 👇
          </p>
        </header>

        {/* La scène concrète : le robot */}
        <div className="card">
          <h2 className="steps-title first">
            🤖 Oublie les ordinateurs : imagine un petit robot
          </h2>
          <p className="eq-explain">
            Dessine dans ta tête un <strong>long couloir</strong>, avec par terre une
            rangée de <strong>carreaux</strong>, comme un trottoir. Sur certains
            carreaux il y a un <strong>caillou</strong> 🪨 ; les autres sont vides.
          </p>

          {/* Petite illustration */}
          <div className="robot-scene">
            <div className="robot-figure">🤖</div>
            <div className="robot-tiles">
              <span className="rt">🪨</span>
              <span className="rt empty"></span>
              <span className="rt here">🪨</span>
              <span className="rt empty"></span>
              <span className="rt">🪨</span>
              <span className="rt empty"></span>
            </div>
            <div className="robot-caption">
              Le robot ne voit QUE le carreau sous ses pieds (celui encadré).
            </div>
          </div>

          <p className="eq-explain">
            Sur l'un des carreaux se tient un <strong>petit robot très bête</strong>. Il
            ne voit <em>que</em> le carreau sous ses pieds — pas les autres. Dans sa
            main, il tient un paquet de <strong>cartes</strong> : ses règles. Une carte
            dit par exemple :
          </p>
          <div className="robot-card">
            « Si je suis d'humeur <strong>A</strong> et que je vois un <strong>caillou</strong> :
            j'enlève le caillou, je fais <strong>un pas à droite</strong>, et je passe
            d'humeur <strong>B</strong>. »
          </div>
          <p className="eq-explain">Et le robot répète bêtement, en boucle :</p>
          <ol className="tuto-steps">
            <li>👀 Il <strong>regarde</strong> le carreau sous ses pieds (caillou ? ou vide ?).</li>
            <li>🃏 Il cherche la <strong>carte</strong> qui correspond à son humeur + ce qu'il voit.</li>
            <li>✋ Il <strong>pose ou enlève</strong> un caillou comme la carte le dit.</li>
            <li>👣 Il fait <strong>un pas</strong> à gauche ou à droite.</li>
            <li>🙂 Il <strong>change d'humeur</strong>… et il recommence.</li>
          </ol>
          <p className="eq-explain">
            Quand plus aucune carte ne correspond, il <strong>s'arrête</strong>. C'est
            fini. Et voilà le truc fou : avec <strong>seulement ça</strong> — un robot,
            des cailloux, des cartes — on peut compter, additionner, multiplier, et au
            fond faire <strong>tout</strong> ce que ton téléphone sait faire (en bien plus
            lent). C'est ce qu'Alan Turing a prouvé en 1936, avant même que les
            ordinateurs existent.
          </p>
        </div>

        {/* Tableau de traduction */}
        <div className="card">
          <h2 className="steps-title first">🔄 La traduction des « gros mots »</h2>
          <p className="eq-explain">
            Les informaticiens donnent juste des noms compliqués au robot et à ses
            affaires. Voici la traduction — c'est exactement la même chose :
          </p>
          <div className="trans-table">
            <div className="trans-row trans-head">
              <span>Le robot (vraie vie)</span>
              <span>Le mot « savant »</span>
            </div>
            <div className="trans-row">
              <span>🟦 La rangée de carreaux</span>
              <span>le <strong>ruban</strong></span>
            </div>
            <div className="trans-row">
              <span>🪨 Les cailloux / cases vides</span>
              <span>les <strong>symboles</strong></span>
            </div>
            <div className="trans-row">
              <span>🤖 Le robot posé dessus</span>
              <span>la <strong>tête de lecture</strong></span>
            </div>
            <div className="trans-row">
              <span>🙂 L'humeur du robot</span>
              <span>l'<strong>état</strong></span>
            </div>
            <div className="trans-row">
              <span>🃏 Le paquet de cartes-règles</span>
              <span>la <strong>table de transitions</strong> (= le « programme »)</span>
            </div>
            <div className="trans-row">
              <span>🛑 Le robot n'a plus de carte</span>
              <span>l'état <strong>STOP</strong></span>
            </div>
          </div>
          <p className="eq-explain">
            Dans le simulateur ci-dessous, les cailloux sont juste remplacés par des
            symboles dessinés (●, ▓, |…), mais c'est <strong>exactement le même
            robot</strong>. Le <strong>🤖</strong> te montre où il se tient, et la phrase
            en français te dit ce qu'il fait à chaque pas.
          </p>
        </div>

        {/* Le simulateur */}
        <TuringMachine />

        {/* Pourquoi c'est génial */}
        <div className="card eq-block highlight">
          <div className="eq-tag star">L'idée géniale ⭐</div>
          <h3 className="eq-title">Pourquoi c'est l'invention du siècle</h3>
          <p className="eq-explain">
            Turing a démontré qu'il existe une <strong>machine universelle</strong> :
            une seule machine capable d'imiter <em>n'importe quelle</em> autre machine,
            simplement en lui donnant sa table de règles en entrée. Ça vous rappelle
            quelque chose ?
          </p>
          <div className="eq-example">
            <strong>C'est exactement ton ordinateur :</strong> une machine unique qui
            exécute n'importe quel programme (= une table de règles) qu'on lui fournit.
            Le concept de « logiciel » est né là, sur le papier, en 1936.
          </div>
        </div>

        {/* ---- Glossaire ---- */}
        <div className="learn">
          <details className="accordion" open>
            <summary>
              <span className="acc-icon">🔤</span> Glossaire — le vocabulaire
            </summary>
            <div className="acc-body">
              <p className="acc-intro">Les pièces de la machine, en langage simple :</p>
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
                Une idée de 1936 qui fait tourner le monde d'aujourd'hui :
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
          MathLab — Machine de Turing · Alan Turing, 1936
        </footer>
      </div>
    </main>
  );
}
