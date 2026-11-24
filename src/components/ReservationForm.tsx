"use client";

import { useState } from "react";
import { whatsappUrl } from "@/content/site";

const HEURES = ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"];

// Le formulaire n'envoie rien à un serveur : il prépare un message WhatsApp
// que le client envoie lui-même au restaurant.
export default function ReservationForm() {
  const [erreur, setErreur] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const nom = String(f.get("nom") || "").trim();
    const date = String(f.get("date") || "");
    const heure = String(f.get("heure") || "");
    const personnes = String(f.get("personnes") || "");
    const note = String(f.get("note") || "").trim();
    if (!nom || !date || !heure) {
      setErreur("Indiquez votre nom, la date et l'heure.");
      return;
    }
    const jour = new Date(date + "T12:00:00");
    if (jour.getDay() === 1) {
      setErreur("Le restaurant est fermé le lundi. Choisissez un autre jour.");
      return;
    }
    setErreur("");
    const dateLisible = jour.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
    const message =
      `Bonjour Complexe AZA, je souhaite réserver une table.\n` +
      `Nom : ${nom}\nDate : ${dateLisible}\nHeure : ${heure}\nPersonnes : ${personnes}` +
      (note ? `\nPrécision : ${note}` : "");
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  };

  const champ =
    "mt-2 w-full rounded-lg border border-lin/20 bg-nuit/40 px-4 py-3 text-lin placeholder:text-lin/40 focus:border-laiton focus:outline-none";
  const label = "font-mono text-[11px] uppercase tracking-[0.2em] text-lin/70";

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2" noValidate>
      <label className="sm:col-span-2">
        <span className={label}>Nom</span>
        <input name="nom" type="text" autoComplete="name" className={champ} placeholder="Votre nom" />
      </label>
      <label>
        <span className={label}>Date</span>
        <input name="date" type="date" className={champ} />
      </label>
      <label>
        <span className={label}>Heure</span>
        <select name="heure" className={champ} defaultValue="20:00">
          {HEURES.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span className={label}>Personnes</span>
        <select name="personnes" className={champ} defaultValue="2">
          {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span className={label}>Précision (facultatif)</span>
        <input name="note" type="text" className={champ} placeholder="Terrasse, anniversaire…" />
      </label>
      {erreur && (
        <p role="alert" className="text-sm text-red-300 sm:col-span-2">
          {erreur}
        </p>
      )}
      <button
        type="submit"
        className="rounded-full bg-laiton px-6 py-4 font-medium text-chaud transition-colors hover:bg-laiton-clair sm:col-span-2"
      >
        Envoyer la demande sur WhatsApp
      </button>
    </form>
  );
}
