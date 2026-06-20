import Link from "next/link";
import Slot from "./Slot";

type Card = {
  id: string;
  title: string;
  img: string;
  alt: string;
  desc?: string;
  items: string[];
};

const CARDS: Card[] = [
  {
    id: "svc-landscaping",
    title: "Landscaping",
    img: "/uploads/043.jpg",
    alt: "Custom garden landscaping",
    items: [
      "Custom Garden & Plant Design",
      "Sod Installation & Lawn Care",
      "Tree & Shrub Planting",
      "Mulching & Bed Maintenance",
      "Irrigation & Sprinkler Systems",
      "Outdoor Lighting",
    ],
  },
  {
    id: "svc-construction",
    title: "Construction",
    img: "/uploads/010.jpg",
    alt: "Hardscape deck construction",
    items: [
      "Custom Decks & Pergolas",
      "Walkways & Stepping Stones",
      "Retaining Walls",
      "Fencing & Hardscaping",
      "Water Features",
      "Drainage Solutions",
    ],
  },
  {
    id: "svc-water",
    title: "Water Features",
    img: "/uploads/017.jpg",
    alt: "Garden water feature",
    desc: "Beautiful fountains, ponds, and irrigation systems that add elegance while conserving water.",
    items: [
      "Fountains & Bubbling Rocks",
      "Ponds & Pondless Waterfalls",
      "Smart Irrigation Systems",
    ],
  },
  {
    id: "svc-maintenance",
    title: "Landscape Maintenance",
    img: "/uploads/035.jpg",
    alt: "Landscape maintenance crew",
    desc: "Regular care and maintenance to keep your landscape beautiful and healthy year-round.",
    items: [
      "Seasonal Cleanups & Pruning",
      "Lawn Mowing & Fertilization",
      "Bed Refresh & Weed Control",
    ],
  },
];

function Item({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-[13px] text-white/[0.88]">
      <span className="text-sage">✦</span> {children}
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="section-y relative bg-teal px-10">
      <div className="mx-auto max-w-content">
        <div className="mb-[clamp(2.5rem,5vw,3.5rem)] flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-[16ch] text-[clamp(2rem,4vw,2.875rem)] font-bold leading-[1.1] tracking-[-0.02em] text-cream">
            Everything your landscape needs, in one team
          </h2>
          <p className="max-w-[34ch] text-[15px] leading-[1.7] text-white/[0.78]">
            Design, build, and maintenance handled end to end, so the people who
            planned your space are the ones who care for it.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-[18px]">
          {CARDS.map((c) => (
            <div
              key={c.id}
              className="overflow-hidden rounded-[16px] border border-sage/20 bg-white/5 transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-card"
            >
              <div className="relative">
                <Slot
                  src={c.img}
                  alt={c.alt}
                  shape="rect"
                  className="h-[188px] w-full"
                  sizes="(max-width: 1024px) 50vw, 280px"
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(15,78,78,0) 35%, rgba(15,78,78,0.8) 100%)",
                  }}
                />
                <h3 className="absolute bottom-[18px] left-[22px] m-0 text-[19px] font-bold leading-[1.15] text-cream">
                  {c.title}
                </h3>
              </div>
              <div className="px-[22px] pb-[26px] pt-[22px]">
                {c.desc && (
                  <p className="m-0 text-[15px] leading-[1.7] text-white/[0.88]">
                    {c.desc}
                  </p>
                )}
                <div
                  className={`flex flex-col gap-[14px] ${c.desc ? "mt-5" : ""}`}
                >
                  {c.items.map((it) => (
                    <Item key={it}>{it}</Item>
                  ))}
                </div>
                <Link
                  href="#quote"
                  className="mt-[26px] inline-flex items-center gap-2 rounded-full bg-sage px-5 py-[11px] font-display text-[13.5px] font-bold text-teal transition-[background-color,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-cream active:translate-y-0 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
                >
                  Get a quote →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
