// Film 1 — L'arrivée : dehors → salle → bar
// Source unique des timings. Images : /films/film1/{desktop|mobile}/0000.webp … 0236.webp (24 fps).
// TIMELINE : chaque étape amène la vidéo jusqu'à `frame` en `units` de scroll (100 units ≈ 1 écran).
// Une étape avec `hold` = caméra posée : le texte du chapitre correspondant est visible pendant cette étape.

export const FILM = {
  id: "film1",
  frames: 237,
  fps: 24,
  dir: "/films/film1",
};

export const TIMELINE = [
  { frame: 0, units: 36, hold: "intro" }, // façade AZA immobile
  { frame: 83, units: 83 }, // rue → porte → salle (V1)
  { frame: 118, units: 90, hold: "salle" }, // pause V1 (35 images)
  { frame: 211, units: 93 }, // allée de la salle → bar (V2)
  { frame: 236, units: 90, hold: "bar" }, // pause V2 (25 images)
] as const;

export const CHAPTERS = [
  {
    id: "intro",
    pos: "top-left",
    kicker: "COMPLEXE AZA",
    title: "AZA",
    line: "Complexe AZA, en un seul plan. Scrollez pour entrer.",
  },
  {
    id: "salle",
    pos: "top-left",
    kicker: "01 / SALLE",
    title: "LA SALLE",
    line: "Velours vert et lin sous la lumière.",
  },
  {
    id: "bar",
    pos: "top-left",
    kicker: "02 / BAR",
    title: "LE BAR",
    line: "Pierre fraîche, laiton chaud, verres alignés.",
  },
] as const;
