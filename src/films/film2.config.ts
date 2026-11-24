// Film 2 — Les saveurs : bar → cuisine → plat → terrasse
// Source unique des timings. Images : /films/film2/{desktop|mobile}/0000.webp … 0350.webp (24 fps).
// TIMELINE : chaque étape amène la vidéo jusqu'à `frame` en `units` de scroll (100 units ≈ 1 écran).
// Une étape avec `hold` = caméra posée : le texte du chapitre correspondant est visible pendant cette étape.
// Images 25–32 : passage au noir chaud (#140c06) qui remplace le fondu de V3.

export const FILM = {
  id: "film2",
  frames: 351,
  fps: 24,
  dir: "/films/film2",
};

export const TIMELINE = [
  { frame: 0, units: 24 }, // bar immobile, entrée du film
  { frame: 69, units: 69 }, // bar → porte battante → passe (V3)
  { frame: 114, units: 90, hold: "cuisine" }, // pause V3 (45 images)
  { frame: 192, units: 78 }, // passe → gros plan du plat (V4)
  { frame: 232, units: 90, hold: "signature" }, // pause V4 (40 images)
  { frame: 310, units: 78 }, // plat → cuisine → portes vitrées → terrasse (V5)
  { frame: 350, units: 90, hold: "terrasse" }, // pause V5 (40 images)
] as const;

export const CHAPTERS = [
  {
    id: "cuisine",
    pos: "top-left",
    kicker: "03 / CUISINE",
    title: "LA PASSE",
    line: "Deux cuisines, un même feu.",
  },
  {
    id: "signature",
    pos: "bottom-left",
    kicker: "04 / SIGNATURE",
    title: "LE PLAT",
    line: "Un geste précis, une saveur juste.",
  },
  {
    id: "terrasse",
    pos: "top-right",
    kicker: "05 / TERRASSE",
    title: "DEHORS",
    line: "La nuit de Calavi, à table.",
  },
] as const;
