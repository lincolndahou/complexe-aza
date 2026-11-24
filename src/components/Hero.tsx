import { SITE, whatsappUrl, itineraireUrl } from "@/content/site";

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-end overflow-hidden bg-chaud pb-16 pt-24 md:items-center md:pb-0">
      {/* Même image que la 1re image du film 1 : le passage hero → film est continu */}
      <picture>
        <source media="(max-width: 767px)" srcSet="/films/film1/mobile/0000.webp" />
        <img
          src="/films/film1/desktop/0000.webp"
          alt="Façade du Complexe AZA de nuit, enseigne en laiton"
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
        />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-t from-nuit via-nuit/50 to-nuit/30 md:bg-gradient-to-r md:from-nuit/85 md:via-nuit/40 md:to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-4 md:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-laiton-clair">
          {SITE.quartier} · {SITE.ville}
        </p>
        <h1 className="mt-3 font-brand text-[28vw] font-bold leading-[0.85] tracking-[0.08em] text-lin md:text-[13rem]">
          {SITE.marque}
        </h1>
        <p className="mt-2 font-titre text-lg font-light text-lin/80 md:text-2xl">{SITE.sousTitre}</p>

        <div className="verre mt-8 max-w-xl rounded-2xl p-5 md:p-7">
          <p className="text-base font-light leading-relaxed text-lin md:text-lg">{SITE.accroche}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={whatsappUrl("Bonjour Complexe AZA, je souhaite réserver une table.")}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-laiton px-6 py-3 font-medium text-chaud transition-colors hover:bg-laiton-clair"
            >
              Réserver sur WhatsApp
            </a>
            <a
              href="#menu"
              className="rounded-full border border-lin/30 px-6 py-3 text-lin transition-colors hover:border-laiton-clair hover:text-laiton-clair"
            >
              Voir le menu
            </a>
            <a
              href={itineraireUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-3 text-lin/80 underline decoration-laiton/50 underline-offset-4 hover:text-laiton-clair"
            >
              Itinéraire
            </a>
          </div>
        </div>
      </div>

      <p className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.3em] text-lin/60 md:block">
        Scrollez pour entrer ↓
      </p>
    </section>
  );
}
