import type { Metadata } from "next";
import "./globals.css";
import Nav from "./Nav";
import JourneyNav from "./JourneyNav";

export const metadata: Metadata = {
  title: "MathLab — équations, fonctions & physique",
  description:
    "Explorer les équations, les fonctions et la relativité restreinte avec des explications pas à pas et des graphiques.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <Nav />
        {children}
        <JourneyNav />
      </body>
    </html>
  );
}
