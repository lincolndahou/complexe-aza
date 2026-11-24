import type { Metadata, Viewport } from "next";
import { Outfit, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "500", "700"], variable: "--font-outfit" });
const interTight = Inter_Tight({ subsets: ["latin"], weight: ["200", "300", "400", "500"], variable: "--font-inter-tight" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: "Complexe AZA — Restaurant à Abomey-Calavi",
  description:
    "Cuisine africaine et occidentale à Bidossessi, Abomey-Calavi. Salle, bar, terrasse. Réservation sur WhatsApp.",
};

export const viewport: Viewport = {
  themeColor: "#0b0805",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${outfit.variable} ${interTight.variable} ${jetbrains.variable}`}>
      <body>{children}</body>
    </html>
  );
}
