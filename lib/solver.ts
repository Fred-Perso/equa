// Moteur de résolution d'équations avec explications pas à pas.
// Supporte les équations polynomiales de degré 0, 1 et 2,
// avec parenthèses, multiplication implicite (2x, 3(x+1)), puissances (x^2).

// ---------------------------------------------------------------------------
// Représentation d'un polynôme : tableau de coefficients indexés par la
// puissance de x. coeffs[0] = terme constant, coeffs[1] = coeff de x, etc.
// ---------------------------------------------------------------------------
type Poly = number[];

function polyTrim(p: Poly): Poly {
  const q = [...p];
  while (q.length > 1 && Math.abs(q[q.length - 1]) < 1e-12) q.pop();
  return q;
}

function polyAdd(a: Poly, b: Poly): Poly {
  const n = Math.max(a.length, b.length);
  const r: Poly = [];
  for (let i = 0; i < n; i++) r[i] = (a[i] ?? 0) + (b[i] ?? 0);
  return polyTrim(r);
}

function polySub(a: Poly, b: Poly): Poly {
  const n = Math.max(a.length, b.length);
  const r: Poly = [];
  for (let i = 0; i < n; i++) r[i] = (a[i] ?? 0) - (b[i] ?? 0);
  return polyTrim(r);
}

function polyMul(a: Poly, b: Poly): Poly {
  const r: Poly = new Array(a.length + b.length - 1).fill(0);
  for (let i = 0; i < a.length; i++)
    for (let j = 0; j < b.length; j++) r[i + j] += a[i] * b[j];
  return polyTrim(r);
}

function polyPow(a: Poly, n: number): Poly {
  let r: Poly = [1];
  for (let i = 0; i < n; i++) r = polyMul(r, a);
  return r;
}

// ---------------------------------------------------------------------------
// Tokenizer
// ---------------------------------------------------------------------------
type Tok =
  | { t: "num"; v: number }
  | { t: "x" }
  | { t: "op"; v: "+" | "-" | "*" | "/" | "^" }
  | { t: "(" }
  | { t: ")" };

function tokenize(input: string): Tok[] {
  const s = input.replace(/\s+/g, "").replace(/,/g, ".");
  const toks: Tok[] = [];
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (/[0-9.]/.test(c)) {
      let num = "";
      while (i < s.length && /[0-9.]/.test(s[i])) num += s[i++];
      toks.push({ t: "num", v: parseFloat(num) });
    } else if (c === "x" || c === "X") {
      toks.push({ t: "x" });
      i++;
    } else if (c === "(") {
      toks.push({ t: "(" });
      i++;
    } else if (c === ")") {
      toks.push({ t: ")" });
      i++;
    } else if (c === "+" || c === "-" || c === "*" || c === "/" || c === "^") {
      toks.push({ t: "op", v: c });
      i++;
    } else {
      throw new Error(`Caractère non reconnu : « ${c} »`);
    }
  }
  return toks;
}

// ---------------------------------------------------------------------------
// Parser (descente récursive) avec multiplication implicite.
// Grammaire :
//   expr   = term (('+'|'-') term)*
//   term   = factor (('*'|'/'| implicite) factor)*
//   factor = base ('^' entier)?
//   base   = num | 'x' | '(' expr ')'
// ---------------------------------------------------------------------------
class Parser {
  toks: Tok[];
  pos = 0;
  constructor(toks: Tok[]) {
    this.toks = toks;
  }
  peek(): Tok | undefined {
    return this.toks[this.pos];
  }
  next(): Tok | undefined {
    return this.toks[this.pos++];
  }

  parse(): Poly {
    const p = this.expr();
    if (this.pos < this.toks.length)
      throw new Error("Expression mal formée.");
    return p;
  }

  expr(): Poly {
    let left = this.term();
    while (true) {
      const t = this.peek();
      if (t && t.t === "op" && (t.v === "+" || t.v === "-")) {
        this.next();
        const right = this.term();
        left = t.v === "+" ? polyAdd(left, right) : polySub(left, right);
      } else break;
    }
    return left;
  }

  term(): Poly {
    let left = this.factor();
    while (true) {
      const t = this.peek();
      if (t && t.t === "op" && (t.v === "*" || t.v === "/")) {
        this.next();
        const right = this.factor();
        if (t.v === "*") left = polyMul(left, right);
        else {
          // division : on n'autorise que la division par une constante
          if (right.length !== 1)
            throw new Error("La division par une expression en x n'est pas gérée.");
          if (Math.abs(right[0]) < 1e-12) throw new Error("Division par zéro.");
          left = left.map((c) => c / right[0]);
        }
      } else if (t && (t.t === "x" || t.t === "(" || t.t === "num")) {
        // multiplication implicite : 2x, 3(x+1), (x+1)(x+2)...
        const right = this.factor();
        left = polyMul(left, right);
      } else break;
    }
    return left;
  }

  factor(): Poly {
    let base = this.base();
    const t = this.peek();
    if (t && t.t === "op" && t.v === "^") {
      this.next();
      const exp = this.base();
      if (exp.length !== 1 || !Number.isInteger(exp[0]) || exp[0] < 0)
        throw new Error("Les puissances doivent être des entiers positifs.");
      base = polyPow(base, exp[0]);
    }
    return base;
  }

  base(): Poly {
    const t = this.next();
    if (!t) throw new Error("Expression incomplète.");
    if (t.t === "num") return [t.v];
    if (t.t === "x") return [0, 1];
    if (t.t === "(") {
      const p = this.expr();
      const close = this.next();
      if (!close || close.t !== ")") throw new Error("Parenthèse fermante manquante.");
      return p;
    }
    if (t.t === "op" && t.v === "-") {
      // moins unaire
      return this.base().map((c) => -c);
    }
    if (t.t === "op" && t.v === "+") {
      return this.base();
    }
    throw new Error("Expression mal formée.");
  }
}

function parseExpr(s: string): Poly {
  if (s.trim() === "") return [0];
  return new Parser(tokenize(s)).parse();
}

// ---------------------------------------------------------------------------
// Formatage des nombres : entier, fraction simple ou décimal arrondi.
// ---------------------------------------------------------------------------
function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
}

export function fmtNum(x: number): string {
  if (Math.abs(x) < 1e-12) return "0";
  if (Math.abs(x - Math.round(x)) < 1e-9) return String(Math.round(x));
  // tentative de fraction (dénominateur jusqu'à 10000)
  for (let den = 2; den <= 10000; den++) {
    const num = x * den;
    if (Math.abs(num - Math.round(num)) < 1e-7) {
      const n = Math.round(num);
      const g = gcd(n, den);
      const nn = n / g;
      const dd = den / g;
      if (dd === 1) return String(nn);
      return `${nn}/${dd}`;
    }
  }
  return x.toFixed(4).replace(/\.?0+$/, "");
}

// terme du type "coeff·x^p" pour l'affichage d'un polynôme
function fmtPoly(p: Poly): string {
  const parts: string[] = [];
  for (let i = p.length - 1; i >= 0; i--) {
    const c = p[i];
    if (Math.abs(c) < 1e-12) continue;
    const sign = c < 0 ? "-" : "+";
    const a = Math.abs(c);
    let coeffStr = "";
    if (i === 0) coeffStr = fmtNum(a);
    else {
      coeffStr = Math.abs(a - 1) < 1e-12 ? "" : fmtNum(a);
      coeffStr += i === 1 ? "x" : `x²`;
    }
    if (parts.length === 0) {
      parts.push((c < 0 ? "-" : "") + coeffStr);
    } else {
      parts.push(` ${sign} ${coeffStr}`);
    }
  }
  return parts.length ? parts.join("") : "0";
}

// ---------------------------------------------------------------------------
// Résolution + explications
// ---------------------------------------------------------------------------
export type Step = { title: string; detail: string };
export type Result = {
  steps: Step[];
  solutions: string[];
  summary: string;
  // Données pour le tracé : coefficients de f(x) = membre gauche − membre droit
  // (indexés par puissance de x) et racines réelles (abscisses des solutions).
  poly: number[];
  roots: number[];
};

export function solveEquation(raw: string): Result {
  const eq = raw.trim();
  if (!eq.includes("=")) throw new Error("Une équation doit contenir un signe « = ».");
  const sides = eq.split("=");
  if (sides.length !== 2) throw new Error("L'équation doit contenir un seul signe « = ».");

  const left = parseExpr(sides[0]);
  const right = parseExpr(sides[1]);
  const poly = polySub(left, right); // = 0
  const degree = poly.length - 1;

  const steps: Step[] = [];
  steps.push({
    title: "Équation de départ",
    detail: `${fmtPoly(left)} = ${fmtPoly(right)}`,
  });

  steps.push({
    title: "On regroupe tout d'un même côté",
    detail: `On soustrait le membre de droite à celui de gauche pour obtenir une équation de la forme « … = 0 » :\n${fmtPoly(poly)} = 0`,
  });

  // ----- Degré 0 : pas de x -----
  if (degree <= 0) {
    const c = poly[0] ?? 0;
    if (Math.abs(c) < 1e-12) {
      steps.push({
        title: "Analyse",
        detail: "Tous les termes se sont annulés : l'égalité 0 = 0 est toujours vraie.",
      });
      return {
        steps,
        solutions: ["Tout réel x est solution"],
        summary: "Une infinité de solutions : l'équation est vraie pour tout x.",
        poly,
        roots: [],
      };
    }
    steps.push({
      title: "Analyse",
      detail: `On obtient ${fmtNum(c)} = 0, ce qui est faux. L'équation n'a pas de solution.`,
    });
    return {
      steps,
      solutions: [],
      summary: "Aucune solution (égalité impossible).",
      poly,
      roots: [],
    };
  }

  // ----- Degré 1 : ax + b = 0 -----
  if (degree === 1) {
    const a = poly[1];
    const b = poly[0] ?? 0;
    steps.push({
      title: "Identification (équation du 1er degré)",
      detail: `C'est une équation linéaire de la forme a·x + b = 0 avec a = ${fmtNum(a)} et b = ${fmtNum(b)}.`,
    });
    steps.push({
      title: "On isole le terme en x",
      detail: `On déplace le terme constant à droite :\n${fmtNum(a)}x = ${fmtNum(-b)}`,
    });
    const sol = -b / a;
    steps.push({
      title: "On divise par le coefficient de x",
      detail: `x = ${fmtNum(-b)} / ${fmtNum(a)} = ${fmtNum(sol)}`,
    });
    return {
      steps,
      solutions: [`x = ${fmtNum(sol)}`],
      summary: `Solution unique : x = ${fmtNum(sol)} (≈ ${sol.toFixed(4)}).`,
      poly,
      roots: [sol],
    };
  }

  // ----- Degré 2 : ax² + bx + c = 0 -----
  if (degree === 2) {
    const a = poly[2];
    const b = poly[1] ?? 0;
    const c = poly[0] ?? 0;
    steps.push({
      title: "Identification (équation du 2nd degré)",
      detail: `C'est une équation de la forme a·x² + b·x + c = 0 avec a = ${fmtNum(a)}, b = ${fmtNum(b)}, c = ${fmtNum(c)}.`,
    });
    const disc = b * b - 4 * a * c;
    steps.push({
      title: "Calcul du discriminant Δ",
      detail: `Δ = b² − 4ac = (${fmtNum(b)})² − 4 × ${fmtNum(a)} × ${fmtNum(c)} = ${fmtNum(disc)}`,
    });

    if (disc < -1e-12) {
      steps.push({
        title: "Interprétation du discriminant",
        detail: "Δ < 0 : l'équation n'a aucune solution réelle (les solutions sont complexes).",
      });
      const re = fmtNum(-b / (2 * a));
      const im = fmtNum(Math.sqrt(-disc) / (2 * a));
      return {
        steps,
        solutions: [`x₁ = ${re} − ${im}i`, `x₂ = ${re} + ${im}i`],
        summary: "Pas de solution réelle (Δ < 0). Deux solutions complexes conjuguées.",
        poly,
        roots: [],
      };
    }

    if (Math.abs(disc) < 1e-12) {
      const sol = -b / (2 * a);
      steps.push({
        title: "Interprétation du discriminant",
        detail: "Δ = 0 : il y a une unique solution (racine double).",
      });
      steps.push({
        title: "Calcul de la solution",
        detail: `x = −b / (2a) = ${fmtNum(-b)} / ${fmtNum(2 * a)} = ${fmtNum(sol)}`,
      });
      return {
        steps,
        solutions: [`x = ${fmtNum(sol)}`],
        summary: `Solution unique (racine double) : x = ${fmtNum(sol)}.`,
        poly,
        roots: [sol],
      };
    }

    const sq = Math.sqrt(disc);
    const x1 = (-b - sq) / (2 * a);
    const x2 = (-b + sq) / (2 * a);
    steps.push({
      title: "Interprétation du discriminant",
      detail: "Δ > 0 : l'équation admet deux solutions réelles distinctes.",
    });
    steps.push({
      title: "Application de la formule",
      detail: `x = (−b ± √Δ) / (2a) = (${fmtNum(-b)} ± √${fmtNum(disc)}) / ${fmtNum(2 * a)}`,
    });
    steps.push({
      title: "Calcul des deux solutions",
      detail: `x₁ = (${fmtNum(-b)} − ${fmtNum(sq)}) / ${fmtNum(2 * a)} = ${fmtNum(x1)}\nx₂ = (${fmtNum(-b)} + ${fmtNum(sq)}) / ${fmtNum(2 * a)} = ${fmtNum(x2)}`,
    });
    return {
      steps,
      solutions: [`x₁ = ${fmtNum(x1)}`, `x₂ = ${fmtNum(x2)}`],
      summary: `Deux solutions : x₁ = ${fmtNum(x1)} et x₂ = ${fmtNum(x2)}.`,
      poly,
      roots: [x1, x2],
    };
  }

  throw new Error(
    `Cette application gère les équations jusqu'au 2nd degré. Degré détecté : ${degree}.`
  );
}
