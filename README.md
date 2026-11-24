# Complexe AZA — site plan-séquence

Site Next.js 15 + Tailwind 4 + GSAP ScrollTrigger + Lenis.
Deux films au scroll (canvas épinglé) séparés par le menu, puis galerie, avis, réservation WhatsApp.

## Lancer

```bash
npm i
npm run dev
```

Puis ouvrir http://localhost:3000. En développement, un compteur `film · frame N` s'affiche en bas à droite de chaque film pour les réglages.

Mise en ligne : `npm run build`, ou importer le dossier sur Vercel.

`npm run dev` écrit dans `.next-dev` et `npm run build` dans `.next` : on peut lancer un build pendant que le serveur de dev tourne sans casser son CSS.

Tester sur un téléphone (même Wi-Fi) : `npm run build`, puis `npm start -- -H 0.0.0.0 -p 3005`, puis ouvrir `http://<IP du PC>:3005`.

## Où modifier quoi

| Quoi | Fichier |
|---|---|
| Textes, adresse, horaires, WhatsApp, menu, galerie, avis, réseaux | `src/content/site.ts` |
| Timings des films et textes des chapitres | `src/films/film1.config.ts`, `src/films/film2.config.ts` |
| Images des films (24 fps, webp) | `public/films/film1|film2/desktop|mobile/0000.webp…` |
| Couleurs et polices | `src/app/globals.css`, `src/app/layout.tsx` |

### Régler un texte qui apparaît trop tôt ou trop tard

Dans `film*.config.ts`, chaque étape de `TIMELINE` amène la vidéo jusqu'à l'image `frame` en `units` de scroll (100 units ≈ 1 écran). Les étapes avec `hold` sont les pauses où le texte du chapitre est visible : augmenter `units` allonge la pause.

### À compléter par le restaurant

- Menu : noms définitifs et prix (`prix: null` = prix non affiché).
- Avis : coller de vrais avis clients dans `AVIS` (la section affiche une invitation tant que la liste est vide).
- Réseaux : liens Instagram / TikTok dans `reseaux` (masqués tant qu'ils sont vides).
- Capacité de la salle si on veut l'afficher.

## Comportements

- Images mobiles (960 px) sous 768 px de large, scroll 20 % plus court, textes en bas.
- `prefers-reduced-motion` : une image fixe par chapitre, sans animation.
- Chaque film ne charge ses images qu'à l'approche (un écran de marge) : 60 premières, puis le reste par paquets.
- Le formulaire de réservation n'envoie rien à un serveur : il ouvre WhatsApp avec un message prérempli.
