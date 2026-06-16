"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// L'ordre du parcours — le « fil rouge » qui relie les chapitres.
const JOURNEY = [
  { href: "/equations", label: "Équations" },
  { href: "/fonctions", label: "Fonctions" },
  { href: "/relativite", label: "Relativité" },
  { href: "/quantique", label: "Quantique" },
  { href: "/turing", label: "Machine de Turing" },
  { href: "/spinoza", label: "Spinoza" },
  { href: "/limites", label: "Limites de la science" },
  { href: "/vertige", label: "Le vertige" },
];

export default function JourneyNav() {
  const pathname = usePathname();

  // Page d'accueil : on invite simplement à démarrer.
  if (pathname === "/") {
    return (
      <div className="jnav">
        <span />
        <Link href="/equations" className="jnav-link next">
          Commencer : Équations <span className="jnav-arr">→</span>
        </Link>
      </div>
    );
  }

  const idx = JOURNEY.findIndex((s) => pathname.startsWith(s.href));
  if (idx === -1) return null;

  const prev = idx > 0 ? JOURNEY[idx - 1] : { href: "/", label: "Accueil" };
  const next = idx < JOURNEY.length - 1 ? JOURNEY[idx + 1] : null;

  return (
    <div className="jnav">
      <Link href={prev.href} className="jnav-link prev">
        <span className="jnav-arr">←</span> {prev.label}
      </Link>
      {next ? (
        <Link href={next.href} className="jnav-link next">
          {next.label} <span className="jnav-arr">→</span>
        </Link>
      ) : (
        <Link href="/" className="jnav-link next">
          Boucler le parcours <span className="jnav-arr">↺</span>
        </Link>
      )}
    </div>
  );
}
