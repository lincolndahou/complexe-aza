"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Chapter, { type ChapterData } from "./Chapter";

gsap.registerPlugin(ScrollTrigger);

type Step = { readonly frame: number; readonly units: number; readonly hold?: string };
type FilmData = { readonly id: string; readonly frames: number; readonly fps: number; readonly dir: string };

type Props = {
  film: FilmData;
  timeline: readonly Step[];
  chapters: readonly ChapterData[];
  label: string;
};

const pad = (n: number) => String(n).padStart(4, "0");
const FADE_UNITS = 12; // durée d'apparition / disparition d'un texte, en units de scroll
const MOBILE_SCALE = 0.8; // scroll un peu plus court sur téléphone
const DEV = process.env.NODE_ENV !== "production";

export default function ScrollFilm({ film, timeline, chapters, label }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const folder = `${film.dir}/${mobile ? "mobile" : "desktop"}`;
    const imgs: (HTMLImageElement | null)[] = new Array(film.frames).fill(null);
    const ready = new Uint8Array(film.frames);
    const state = { frame: timeline[0]?.frame ?? 0 };
    let shown = -1;
    let started = false;
    let alive = true;

    // Image chargée la plus proche de celle demandée
    const nearest = (f: number) => {
      if (ready[f]) return f;
      for (let d = 1; d < film.frames; d++) {
        if (f - d >= 0 && ready[f - d]) return f - d;
        if (f + d < film.frames && ready[f + d]) return f + d;
      }
      return -1;
    };

    const render = (force = false) => {
      const f = Math.min(film.frames - 1, Math.max(0, Math.round(state.frame)));
      const idx = nearest(f);
      if (idx < 0 || (!force && idx === shown)) return;
      shown = idx;
      const im = imgs[idx]!;
      const cw = canvas.width;
      const ch = canvas.height;
      const s = Math.max(cw / im.naturalWidth, ch / im.naturalHeight);
      const w = im.naturalWidth * s;
      const h = im.naturalHeight * s;
      ctx.drawImage(im, (cw - w) / 2, (ch - h) / 2, w, h);
      if (counterRef.current) counterRef.current.textContent = `${film.id} · frame ${f}`;
    };

    const load = (i: number) =>
      new Promise<void>((resolve) => {
        const im = new Image();
        im.decoding = "async";
        im.onload = () => {
          if (!alive) return resolve();
          imgs[i] = im;
          ready[i] = 1;
          if (shown < 0 || Math.abs(Math.round(state.frame) - i) < Math.abs(Math.round(state.frame) - shown)) render(true);
          resolve();
        };
        im.onerror = () => resolve();
        im.src = `${folder}/${pad(i)}.webp`;
      });

    // 60 premières images d'abord, puis le reste par paquets de 8
    const startLoading = async () => {
      if (started) return;
      started = true;
      const first = Math.min(60, film.frames);
      await Promise.all(Array.from({ length: first }, (_, i) => load(i)));
      for (let i = first; i < film.frames && alive; i += 8) {
        await Promise.all(Array.from({ length: Math.min(8, film.frames - i) }, (_, k) => load(i + k)));
      }
    };

    const startWhenIdle = () => {
      if (document.readyState === "complete") window.setTimeout(startLoading, 300);
      else window.addEventListener("load", () => window.setTimeout(startLoading, 300), { once: true });
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      render(true);
    };
    resize();
    window.addEventListener("resize", resize);

    const k = mobile ? MOBILE_SCALE : 1;
    const totalUnits = timeline.reduce((a, s) => a + s.units, 0) * k;

    const gctx = gsap.context(() => {
      // Une seule timeline sur le ScrollTrigger épinglé : images + textes + barre
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${totalUnits}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      const fade = FADE_UNITS * k;
      let t = 0;
      timeline.forEach((step, i) => {
        const dur = step.units * k;
        tl.to(state, { frame: step.frame, duration: dur, ease: "none", onUpdate: () => render() }, t);
        if (step.hold) {
          const el = section.querySelector<HTMLElement>(`[data-chapter="${step.hold}"]`);
          if (el) {
            if (t > 0) {
              tl.fromTo(el, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: fade, ease: "power1.out" }, t);
            }
            if (i < timeline.length - 1) {
              tl.to(el, { autoAlpha: 0, y: -16, duration: fade, ease: "power1.in" }, t + dur - fade);
            }
          }
        }
        t += dur;
      });
      if (fillRef.current) {
        tl.fromTo(fillRef.current, { scaleX: 0 }, { scaleX: 1, ease: "none", duration: t }, 0);
      }

      // Charger les images quand le film approche (un écran de marge), mais seulement
      // après l'affichage complet de la page, pour ne pas ralentir le hero en 4G.
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom+=100%",
        onEnter: startWhenIdle,
        onEnterBack: startWhenIdle,
      });
      // Si le visiteur arrive déjà sur le film, on charge tout de suite.
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        onEnter: startLoading,
        onEnterBack: startLoading,
      });
    }, section);

    if (section.getBoundingClientRect().top < window.innerHeight * 2) startWhenIdle();

    return () => {
      alive = false;
      window.removeEventListener("resize", resize);
      gctx.revert();
    };
  }, [reduced, film, timeline]);

  // Mouvement réduit : une image fixe par chapitre
  if (reduced) {
    return (
      <section aria-label={label} className="bg-chaud">
        {timeline
          .filter((s) => s.hold)
          .map((s) => {
            const c = chapters.find((ch) => ch.id === s.hold);
            if (!c) return null;
            return (
              <div key={c.id} className="relative h-[100svh] overflow-hidden">
                <img
                  src={`${film.dir}/desktop/${pad(s.frame)}.webp`}
                  alt={c.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <Chapter data={c} visible />
              </div>
            );
          })}
      </section>
    );
  }

  const firstHold = timeline[0]?.hold;

  return (
    <section ref={sectionRef} aria-label={label} className="relative h-[100svh] w-full overflow-hidden bg-chaud">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(11,8,5,0.55) 100%)" }}
      />
      {chapters.map((c) => (
        <Chapter key={c.id} data={c} visible={c.id === firstHold} />
      ))}
      <div className="absolute inset-x-0 bottom-0 h-[3px] bg-lin/10">
        <div ref={fillRef} className="progress-fill h-full origin-left bg-laiton" style={{ transform: "scaleX(0)" }} />
      </div>
      {DEV && (
        <div
          ref={counterRef}
          className="absolute bottom-3 right-3 rounded bg-black/60 px-2 py-1 font-mono text-[11px] text-laiton-clair"
        >
          {film.id} · frame 0
        </div>
      )}
    </section>
  );
}
