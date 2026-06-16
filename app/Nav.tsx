"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Accueil", emoji: "🧭" },
  { href: "/equations", label: "Équations", emoji: "🧮" },
  { href: "/fonctions", label: "Fonctions", emoji: "📈" },
  { href: "/relativite", label: "Relativité", emoji: "🌌" },
  { href: "/quantique", label: "Quantique", emoji: "⚛️" },
  { href: "/turing", label: "Machine de Turing", emoji: "🤖" },
  { href: "/spinoza", label: "Spinoza", emoji: "♾️" },
  { href: "/limites", label: "Limites de la science", emoji: "🧩" },
  { href: "/vertige", label: "Le vertige", emoji: "🌀" },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/" className="nav-brand">
          <span className="nav-brand-icon">∑</span> MathLab
        </Link>
        <ul className="nav-links">
          {LINKS.map((l) => {
            const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`nav-link ${active ? "active" : ""}`}
                >
                  <span className="nav-emoji">{l.emoji}</span>
                  <span className="nav-label">{l.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
