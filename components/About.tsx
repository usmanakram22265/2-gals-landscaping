import Image from "next/image";
import Parallax from "./Parallax";

const ICON =
  "h-[22px] w-[22px] [&_*]:[stroke:#0F4E4E] [&_*]:[stroke-width:1.8]";

const FEATURES = [
  {
    title: "Custom Designed",
    body: "Thoughtfully planned spaces shaped around your home, your taste, and how you live.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" className={ICON}>
        <path d="M12 22c5-3 8-7 8-12V5l-8-3-8 3v5c0 5 3 9 8 12z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Native & Water-Efficient",
    body: "Plant choices and irrigation built for the Texas climate: beautiful and low-maintenance.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" className={ICON}>
        <path d="M12 2C7 7 7 13 12 22c5-9 5-15 0-20z" />
        <path d="M12 22V8" />
      </svg>
    ),
  },
  {
    title: "Built to Last",
    body: "Quality construction and ongoing care that keeps your landscape thriving long-term.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" className={ICON}>
        <path d="M3 21h18" />
        <path d="M5 21V8l7-5 7 5v13" />
        <path d="M9 21v-6h6v6" />
      </svg>
    ),
  },
];

export default function About() {
  return (
    <section id="about" className="section-y bg-cream px-10">
      <div className="mx-auto grid max-w-content grid-cols-2 items-center gap-20">
        <div className="relative">
          <div className="relative h-[520px] w-full overflow-hidden rounded-[18px] bg-mist">
            <Parallax speed={0.13} className="absolute inset-x-0 -inset-y-[20%]">
              <Image
                src="/uploads/030.jpg"
                alt="The 2 Gals team at work on a landscape"
                fill
                sizes="(max-width: 768px) 100vw, 590px"
                className="object-cover"
              />
            </Parallax>
          </div>
          <div
            className="absolute inset-x-[26px] bottom-[26px] flex items-start gap-[14px] rounded-2xl p-[20px_22px] text-cream backdrop-blur-[6px]"
            style={{ background: "rgba(15,78,78,0.92)" }}
          >
            <span className="h-[46px] w-[46px] flex-none rounded-full bg-sage" />
            <div>
              <div className="mb-[3px] text-[14px] font-bold">
                Paula Rodriguez
              </div>
              <div className="text-[12.5px] leading-[1.5] text-white/85">
                &ldquo;Every yard tells a story. We make sure yours grows
                beautifully for years to come.&rdquo;
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-[18px] text-[clamp(2rem,4vw,2.875rem)] font-bold leading-[1.1] tracking-[-0.02em] text-teal">
            Why choose 2&nbsp;Gals?
          </h2>
          <p className="mb-9 max-w-[480px] text-[16px] leading-[1.7] text-slate-soft">
            A woman-owned Houston team with two decades of experience. We believe
            great landscapes are built through care, intention, and a deep
            respect for the land they grow on.
          </p>
          <div className="flex flex-col gap-[26px]">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex items-start gap-[18px]">
                <span className="flex h-[46px] w-[46px] flex-none items-center justify-center rounded-xl bg-mist">
                  {f.icon}
                </span>
                <div>
                  <h3 className="mb-[5px] text-[17px] font-bold text-ink">
                    {f.title}
                  </h3>
                  <p className="text-[14px] leading-[1.6] text-slate-muted">
                    {f.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
