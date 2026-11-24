import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

// Dossier séparé pour `npm run dev` : un `npm run build` lancé pendant que le
// serveur de dev tourne ne peut plus écraser ses fichiers (CSS en 404).
export default function config(phase: string): NextConfig {
  return {
    reactStrictMode: true,
    distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next",
  };
}
