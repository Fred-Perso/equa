import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Résolveur d'équations",
  description:
    "Résout les équations du 1er et 2nd degré en expliquant chaque étape du raisonnement.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
