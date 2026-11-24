import { SITE, whatsappUrl } from "@/content/site";

const LIENS = [
  { href: "#menu", label: "Menu" },
  { href: "#galerie", label: "Galerie" },
  { href: "#avis", label: "Avis" },
  { href: "#infos", label: "Infos" },
];

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <a href="#top" className="font-brand text-2xl font-bold tracking-[0.25em] text-laiton-clair" aria-label={SITE.nom}>
          {SITE.marque}
        </a>
        <ul className="hidden items-center gap-8 font-mono text-xs uppercase tracking-[0.2em] text-lin/80 md:flex">
          {LIENS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-laiton-clair">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={whatsappUrl("Bonjour Complexe AZA, je souhaite réserver une table.")}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-laiton px-4 py-2 text-sm font-medium text-chaud shadow-lg shadow-black/30 transition-colors hover:bg-laiton-clair md:px-5"
        >
          Réserver
        </a>
      </nav>
    </header>
  );
}
