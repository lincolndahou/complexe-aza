import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ScrollFilm from "@/components/ScrollFilm";
import SmoothScroll from "@/components/SmoothScroll";
import { Menu, Galerie, Avis, Infos, Footer } from "@/components/Sections";
import * as film1 from "@/films/film1.config";
import * as film2 from "@/films/film2.config";
import { whatsappUrl } from "@/content/site";

export default function Page() {
  return (
    <>
      <SmoothScroll />
      <Nav />
      <main>
        <Hero />
        <ScrollFilm film={film1.FILM} timeline={film1.TIMELINE} chapters={film1.CHAPTERS} label="Visite : de l'entrée au bar" />
        <Menu />
        <ScrollFilm film={film2.FILM} timeline={film2.TIMELINE} chapters={film2.CHAPTERS} label="Visite : de la cuisine à la terrasse" />
        <Galerie />
        <Avis />
        <Infos />
      </main>
      <Footer />
      {/* CTA principal toujours visible sur téléphone */}
      <a
        href={whatsappUrl("Bonjour Complexe AZA, je souhaite réserver une table.")}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed inset-x-4 bottom-4 z-50 rounded-full bg-laiton py-4 text-center font-medium text-chaud shadow-xl shadow-black/40 md:hidden"
      >
        Réserver sur WhatsApp
      </a>
    </>
  );
}
