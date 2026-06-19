type Review = {
  text: string;
  name: string;
  place: string;
  initials: string;
  color: string;
};

const REVIEWS: Review[] = [
  { text: "The 2 Gals team transformed our backyard into something we use every single day. Beautiful work and so easy to deal with.", name: "Marisol Vega", place: "Memorial, Houston", initials: "MV", color: "#B8C8B5" },
  { text: "From the first consultation to the final walkthrough, everything was on time and exactly as designed. Highly recommend.", name: "Derek Albright", place: "Katy, TX", initials: "DA", color: "#D9E2C9" },
  { text: "Our new patio and plantings still look incredible a year later. You can tell they genuinely care about the work.", name: "Priya Nandakumar", place: "Energy Corridor", initials: "PN", color: "#C9DCC2" },
  { text: "Professional from start to finish. The crew was respectful and our new irrigation has made such a difference.", name: "Carl Whitfield", place: "Spring Branch", initials: "CW", color: "#B8C8B5" },
  { text: "They re-graded our whole yard to fix drainage that flooded every storm. Two seasons in and not a single puddle.", name: "Renata Cole", place: "Cypress, TX", initials: "RC", color: "#D9E2C9" },
  { text: "The native plant beds they designed barely need watering and look gorgeous. Exactly the low-maintenance look we wanted.", name: "Hugo Martínez", place: "Bunker Hill", initials: "HM", color: "#C9DCC2" },
  { text: "Pergola, lighting, and walkway all done in one go. Our backyard finally feels like an extra room of the house.", name: "Tessa Bryant", place: "Bellaire, TX", initials: "TB", color: "#B8C8B5" },
  { text: "Fair quote, no surprises, and they cleaned up perfectly each day. The whole experience was refreshingly easy.", name: "Jordan Okafor", place: "West University", initials: "JO", color: "#D9E2C9" },
  { text: "Our front yard went from tired sod to a showpiece the neighbors keep asking about. Worth every penny.", name: "Lena Ferraro", place: "Spring Branch", initials: "LF", color: "#C9DCC2" },
  { text: "They listened to what we wanted instead of upselling. The retaining wall and steps look like they've always been there.", name: "Sam Petrov", place: "Katy, TX", initials: "SP", color: "#B8C8B5" },
];

function Card({ r }: { r: Review }) {
  return (
    <div className="w-[360px] flex-none rounded-[16px] border border-sage/20 bg-white/[0.06] p-[30px]">
      <div className="mb-4 text-[16px] tracking-[3px] text-sage">★★★★★</div>
      <p className="mb-6 min-h-[100px] text-[14.5px] leading-[1.7] text-white/90">
        {r.text}
      </p>
      <div className="flex items-center gap-3">
        <span
          className="flex h-[42px] w-[42px] flex-none items-center justify-center rounded-full font-display text-[14px] font-extrabold text-teal"
          style={{ background: r.color }}
        >
          {r.initials}
        </span>
        <div>
          <div className="text-[14px] font-bold text-cream">{r.name}</div>
          <div className="text-[12px] text-white/75">{r.place}</div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const loop = [...REVIEWS, ...REVIEWS];
  return (
    <section className="section-y bg-teal px-10">
      <div className="mx-auto max-w-content">
        <div className="mb-[clamp(2.5rem,5vw,3.5rem)] text-center">
          <h2 className="text-[clamp(2rem,4vw,2.875rem)] font-bold leading-[1.1] tracking-[-0.02em] text-cream">
            What our customers say
          </h2>
        </div>
      </div>
      <div className="marquee-mask group relative w-full overflow-hidden">
        <div className="flex w-max animate-marquee gap-[22px] px-[11px] py-[6px] group-hover:[animation-play-state:paused]">
          {loop.map((r, i) => (
            <Card key={i} r={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
