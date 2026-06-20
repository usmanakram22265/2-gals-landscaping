"use client";

import { useEffect, useRef } from "react";

const STATS = [
  { value: "20+", label: "Years Experience" },
  { value: "500+", label: "Projects Completed" },
  { value: "1,000+", label: "Happy Clients" },
  { value: "100%", label: "Satisfaction Rate" },
  { value: "10", label: "Team Members" },
];

function animateCount(el: HTMLElement, raw: string) {
  const target = parseInt(raw.replace(/[^0-9]/g, ""), 10) || 0;
  const prefix = raw.match(/^[^0-9]*/)?.[0] ?? "";
  const suffix = raw.match(/[^0-9,]*$/)?.[0] ?? "";
  const hasComma = raw.includes(",");
  const fmt = (n: number) => (hasComma ? n.toLocaleString("en-US") : String(n));
  const finalText = prefix + fmt(target) + suffix;
  const dur = 1400;
  const t0 = performance.now();
  const step = (now: number) => {
    const p = Math.min((now - t0) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = prefix + fmt(Math.round(target * eased)) + suffix;
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = finalText;
  };
  requestAnimationFrame(step);
  setTimeout(() => {
    el.textContent = finalText;
  }, dur + 500);
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const nums = Array.from(
      root.querySelectorAll<HTMLElement>("[data-countup]"),
    );
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const obs = new IntersectionObserver(
      (entries, o) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          if (!reduce) animateCount(el, el.dataset.countup || el.textContent || "");
          o.unobserve(el);
        });
      },
      { threshold: 0.5 },
    );
    nums.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="stats" className="bg-teal text-cream">
      <div
        ref={ref}
        className="mx-auto grid max-w-shell grid-cols-5 gap-6 px-10 py-[clamp(2.5rem,4vw,3.25rem)]"
      >
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className="text-center"
            style={{
              borderRight:
                i < STATS.length - 1
                  ? "1px solid rgba(184,200,181,0.25)"
                  : "none",
            }}
          >
            <div
              data-countup={s.value}
              className="font-display text-[42px] font-bold tracking-[-1px] text-sage"
            >
              {s.value}
            </div>
            <div className="mt-1 text-[14px] font-medium tracking-[0.5px] text-white/80">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
