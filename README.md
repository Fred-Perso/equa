# 🧮 Résolveur d'équations

Application web qui **résout** des équations et **explique chaque étape** du raisonnement, en français.

Gère :

- les équations du **1er degré** (linéaires) : `2x + 3 = 7`, `3(x - 1) = x + 5`
- les équations du **2nd degré** (quadratiques) : `x^2 - 5x + 6 = 0`, `(x+1)(x-3) = 0`
- les parenthèses, la multiplication implicite (`2x`), les puissances (`x^2`)
- les cas particuliers : aucune solution, infinité de solutions, discriminant négatif (solutions complexes)

Toute la résolution se fait **côté navigateur** (aucun serveur, aucune clé d'API).

## Lancer en local

```bash
npm install
npm run dev
```

Puis ouvre http://localhost:3000

## Déployer sur Vercel

### Option A — via l'interface web (le plus simple)

1. Pousse ce dossier sur un dépôt GitHub.
2. Va sur https://vercel.com → **Add New… → Project**.
3. Importe le dépôt. Vercel détecte automatiquement Next.js.
4. Clique sur **Deploy**. C'est tout.

### Option B — via la CLI

```bash
npm i -g vercel
vercel        # déploiement de prévisualisation
vercel --prod # déploiement en production
```

## Comment ça marche

- `lib/solver.ts` : le moteur — un parseur d'expressions (descente récursive) qui
  transforme l'équation en polynôme, puis applique les méthodes de résolution
  (isolation pour le 1er degré, discriminant pour le 2nd degré) en générant les
  explications.
- `app/page.tsx` : l'interface (saisie, exemples, affichage des étapes).
