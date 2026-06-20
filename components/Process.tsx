"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Parallax from "./Parallax";

const STEPS = [
  {
    num: "01",
    title: "Discovery & Consultation",
    body: "We walk your space, listen to your goals, and map out what's possible.",
  },
  {
    num: "02",
    title: "Design & Plant Selection",
    body: "We plan the layout and choose Texas-friendly plants and water-efficient irrigation built for your site.",
  },
  {
    num: "03",
    title: "Build & Installation",
    body: "Our crew constructs the hardscape and installs the plantings, on schedule and on plan.",
  },
  {
    num: "04",
    title: "Care & Support",
    body: "Ongoing maintenance and check-ins keep your landscape healthy and thriving for years.",
  },
];

export default function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries, o) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          o.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="process"
      data-reveal="off"
      className="section-y relative overflow-hidden px-10"
    >
      {/* Photographic backdrop + brand tint, matching the divider treatment.
          The photo drifts slower than scroll (parallax) for a subtle depth
          break. Buffer extends well past the section so the drift never
          reveals an edge; no-ops under prefers-reduced-motion. */}
      <Parallax speed={0.65} className="absolute inset-x-0 -inset-y-[100%]">
        <Image
          src="/uploads/013.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </Parallax>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,40,36,0.85) 0%, rgba(8,40,36,0.72) 45%, rgba(8,40,36,0.88) 100%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-content">
        <div className="mb-[clamp(3rem,6vw,4.5rem)] text-center">
          <h2 className="text-[clamp(2rem,4vw,2.875rem)] font-bold leading-[1.1] tracking-[-0.02em] text-cream">
            How a project comes together
          </h2>
        </div>
        <ol
          ref={ref}
          className={`grid grid-cols-4 gap-[22px] ${inView ? "tl-in" : ""}`}
        >
          {STEPS.map((s, i) => (
            <li key={s.num} className="relative flex flex-col">
              {i < STEPS.length - 1 && (
                <span
                  aria-hidden
                  style={{ transitionDelay: `${i * 180 + 260}ms` }}
                  className="tl-line absolute left-[26px] top-[25px] h-[2px] w-[calc(100%+22px)] bg-cream/30"
                />
              )}
              <div
                className="tl-step flex flex-col"
                style={{ transitionDelay: `${i * 180}ms` }}
              >
                <span className="relative z-[1] flex h-[52px] w-[52px] items-center justify-center rounded-full bg-cream font-display text-[18px] font-bold text-teal shadow-[0_8px_18px_rgba(8,30,30,0.4)]">
                  {s.num}
                </span>
                <h3 className="mb-2 mt-7 text-[18px] font-bold text-cream">
                  {s.title}
                </h3>
                <p className="max-w-[24ch] text-[15px] leading-[1.65] text-sage-light">
                  {s.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
