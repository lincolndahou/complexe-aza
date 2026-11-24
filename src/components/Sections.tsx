import { SITE, MENU, GALERIE, AVIS, whatsappUrl, itineraireUrl } from "@/content/site";
import ReservationForm from "./ReservationForm";

function Titre({ kicker, titre }: { kicker: string; titre: string }) {
  return (
    <div className="mb-12">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-laiton">{kicker}</p>
      <h2 className="mt-3 font-titre text-4xl font-extralight uppercase tracking-tight text-lin md:text-6xl">{titre}</h2>
    </div>
  );
}

export function Menu() {
  return (
    <section id="menu" className="bg-vert px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Titre kicker="La carte" titre="Le menu" />
        <div className="grid gap-12 md:grid-cols-3">
          {MENU.map((cat) => (
            <div key={cat.titre}>
              <h3 className="border-b border-laiton/30 pb-3 font-mono text-sm uppercase tracking-[0.25em] text-laiton-clair">
                {cat.titre}
              </h3>
              <ul className="mt-6 space-y-6">
                {cat.plats.map((p) => (
                  <li key={p.nom}>
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="font-titre text-lg text-lin">
                        {p.nom}
                        {p.signature && (
                          <span className="ml-2 rounded-full border border-laiton/50 px-2 py-0.5 align-middle font-mono text-[10px] uppercase tracking-widest text-laiton-clair">
                            Signature
                          </span>
                        )}
                      </p>
                      {p.prix !== null && (
                        <p className="shrink-0 font-mono text-sm text-laiton-clair">
                          {p.prix.toLocaleString("fr-FR")} F CFA
                        </p>
                      )}
                    </div>
                    <p className="mt-1 text-sm font-light text-lin/65">{p.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-14 text-sm font-light text-lin/60">
          Carte indicative, selon le marché. Prix et plats du jour sur{" "}
          <a href={whatsappUrl("Bonjour, pouvez-vous m'envoyer la carte et les prix du jour ?")} target="_blank" rel="noopener noreferrer" className="text-laiton-clair underline underline-offset-4">
            WhatsApp
          </a>
          .
        </p>
      </div>
    </section>
  );
}

export function Galerie() {
  return (
    <section id="galerie" className="bg-nuit px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Titre kicker="En images" titre="Galerie" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GALERIE.map((g) => (
            <figure key={g.src} className="group overflow-hidden rounded-xl">
              <img
                src={g.src}
                alt={g.legende}
                loading="lazy"
                className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <figcaption className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-lin/60">{g.legende}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Avis() {
  return (
    <section id="avis" className="bg-chaud px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Titre kicker="Ils sont venus" titre="Avis" />
        {AVIS.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-3">
            {AVIS.map((a) => (
              <blockquote key={a.nom + a.texte} className="verre rounded-2xl p-6">
                <p className="text-laiton-clair" aria-label={`${a.note} sur 5`}>
                  {"★".repeat(a.note)}
                  <span className="text-lin/20">{"★".repeat(5 - a.note)}</span>
                </p>
                <p className="mt-4 font-light leading-relaxed text-lin/90">« {a.texte} »</p>
                <footer className="mt-4 font-mono text-xs uppercase tracking-widest text-lin/60">
                  {a.nom} · {a.source}
                </footer>
              </blockquote>
            ))}
          </div>
        ) : (
          <div className="verre max-w-2xl rounded-2xl p-8">
            <p className="font-titre text-2xl font-light text-lin">Vous êtes venu dîner chez nous ?</p>
            <p className="mt-3 font-light text-lin/70">Votre avis nous aide à grandir. Écrivez-nous quelques mots, nous les partagerons ici.</p>
            <a
              href={whatsappUrl("Bonjour Complexe AZA, voici mon avis : ")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-full border border-laiton/60 px-6 py-3 text-laiton-clair transition-colors hover:bg-laiton hover:text-chaud"
            >
              Laisser un avis
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

export function Infos() {
  return (
    <section id="infos" className="bg-vert px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-2">
        <div>
          <Titre kicker="Réservation" titre="Réserver une table" />
          <ReservationForm />
        </div>
        <div className="space-y-10">
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-laiton-clair">Adresse</h3>
            <p className="mt-3 text-lg font-light text-lin">{SITE.adresse}</p>
            <a href={itineraireUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-laiton-clair underline underline-offset-4">
              Itinéraire Google Maps
            </a>
          </div>
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-laiton-clair">Horaires</h3>
            <dl className="mt-3 space-y-2">
              {SITE.horaires.map((h) => (
                <div key={h.jours} className="flex justify-between gap-6 border-b border-lin/10 pb-2 text-lin">
                  <dt className="font-light">{h.jours}</dt>
                  <dd className="font-mono text-sm">{h.heures}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-laiton-clair">WhatsApp</h3>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block font-titre text-2xl font-light text-lin hover:text-laiton-clair">
              {SITE.telephoneAffiche}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const reseaux = Object.entries(SITE.reseaux).filter(([, url]) => url);
  return (
    <footer className="bg-nuit px-4 pb-28 pt-16 md:px-8 md:pb-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-brand text-4xl font-bold tracking-[0.25em] text-laiton-clair">{SITE.marque}</p>
          <p className="mt-2 text-sm font-light text-lin/60">
            {SITE.cuisine} · {SITE.quartier}, {SITE.ville}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-6 font-mono text-xs uppercase tracking-[0.2em] text-lin/60">
          {reseaux.map(([nom, url]) => (
            <a key={nom} href={url} target="_blank" rel="noopener noreferrer" className="hover:text-laiton-clair">
              {nom}
            </a>
          ))}
          <span>© {new Date().getFullYear()} {SITE.nom}</span>
        </div>
      </div>
    </footer>
  );
}
