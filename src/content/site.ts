// Contenu du site Complexe AZA — tout le texte modifiable est ici.

export const SITE = {
  nom: "Complexe AZA",
  marque: "AZA",
  cuisine: "Cuisine africaine et occidentale",
  ville: "Abomey-Calavi",
  quartier: "Bidossessi",
  adresse: "Bidossessi, après Les Cours SONOU — Abomey-Calavi, Bénin",
  accroche:
    "À Bidossessi, Complexe AZA réunit les cuisines africaine et occidentale autour d'une même table, dans la chaleur du soir.",
  sousTitre: "Une enseigne chaude dans la nuit.",
  whatsapp: "2290192725649", // format international sans +
  telephoneAffiche: "+229 01 92 72 56 49",
  horaires: [
    { jours: "Mardi – Dimanche", heures: "12h – 15h · 19h – 23h" },
    { jours: "Lundi", heures: "Fermé" },
  ],
  // Laisser vide ("") pour masquer le lien.
  reseaux: {
    instagram: "",
    tiktok: "",
  },
};

export const whatsappUrl = (message?: string) =>
  `https://wa.me/${SITE.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

export const itineraireUrl =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("Complexe AZA Bidossessi Abomey-Calavi");

// Carte provisoire : noms et prix à confirmer par le restaurant.
// prix : laisser null tant qu'il n'est pas fixé (il n'est alors pas affiché).
export type Plat = { nom: string; detail: string; prix: number | null; signature?: boolean };

export const MENU: { titre: string; plats: Plat[] }[] = [
  {
    titre: "Entrées",
    plats: [
      { nom: "Accras de niébé", detail: "Beignets de haricots, piment doux, citron vert", prix: null },
      { nom: "Avocat & crevettes", detail: "Avocat, crevettes grillées, vinaigrette aux agrumes", prix: null },
      { nom: "Velouté de potiron", detail: "Potiron, gingembre frais, crème légère", prix: null },
    ],
  },
  {
    titre: "Plats",
    plats: [
      {
        nom: "Poisson braisé, alloco",
        detail: "Poisson entier braisé, banane plantain dorée, sauce tomate pimentée, oignons frais",
        prix: null,
        signature: true,
      },
      { nom: "Poulet yassa", detail: "Poulet mariné citron-oignon, riz parfumé", prix: null },
      { nom: "Amiwo & poulet", detail: "Pâte rouge de maïs, poulet sauté, sauce tomate", prix: null },
      { nom: "Filet de bœuf", detail: "Sauce au poivre, frites maison, légumes du marché", prix: null },
      { nom: "Risotto aux champignons", detail: "Riz crémeux, champignons, parmesan", prix: null },
    ],
  },
  {
    titre: "Desserts",
    plats: [
      { nom: "Moelleux au chocolat", detail: "Cœur coulant, glace vanille", prix: null },
      { nom: "Fruits frais & sorbet", detail: "Ananas, mangue, papaye de saison", prix: null },
      { nom: "Crème brûlée au gingembre", detail: "Vanille, gingembre, sucre caramélisé", prix: null },
    ],
  },
];

export const GALERIE = [
  { src: "/galerie/facade.webp", legende: "L'entrée, à Bidossessi" },
  { src: "/galerie/salle.webp", legende: "La salle" },
  { src: "/galerie/bar.webp", legende: "Le bar" },
  { src: "/galerie/cuisine.webp", legende: "La passe" },
  { src: "/galerie/plat.webp", legende: "Le plat signature" },
  { src: "/galerie/terrasse.webp", legende: "La terrasse" },
];

// Avis réels uniquement (copiés de Google, Facebook…). Tant que la liste est vide,
// la section invite les clients à laisser un avis.
export type Avis = { nom: string; texte: string; note: number; source: string };
export const AVIS: Avis[] = [];
