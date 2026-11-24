export type ChapterData = {
  readonly id: string;
  readonly pos: string;
  readonly kicker: string;
  readonly title: string;
  readonly line: string;
};

// Position desktop ; sur téléphone, tous les textes passent en bas.
const POS: Record<string, string> = {
  center: "md:top-1/3 md:bottom-auto md:left-0 md:right-0 md:mx-auto md:text-center",
  "top-left": "md:top-28 md:bottom-auto md:left-16 md:right-auto md:text-left",
  "top-right": "md:top-28 md:bottom-auto md:left-auto md:right-16 md:text-right",
  "bottom-left": "md:top-auto md:bottom-24 md:left-16 md:right-auto md:text-left",
};

export default function Chapter({ data, visible = false }: { data: ChapterData; visible?: boolean }) {
  return (
    <div
      data-chapter={data.id}
      className={`pointer-events-none absolute z-10 bottom-28 left-6 right-6 max-w-xl ${POS[data.pos] ?? POS["top-left"]}`}
      style={visible ? undefined : { opacity: 0, visibility: "hidden" }}
    >
      <div
        className="absolute -inset-12 -z-10 rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(11,8,5,0.55), transparent)" }}
        aria-hidden="true"
      />
      <p className="font-mono text-xs tracking-[0.3em] text-laiton-clair md:text-sm">{data.kicker}</p>
      <h2 className="ombre-texte mt-2 font-titre text-5xl font-light uppercase leading-none tracking-tight text-lin md:text-7xl">
        {data.title}
      </h2>
      <p className="ombre-texte mt-4 text-base font-light text-lin/90 md:text-xl">{data.line}</p>
    </div>
  );
}
