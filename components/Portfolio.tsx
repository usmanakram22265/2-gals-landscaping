"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Parallax from "./Parallax";

type Item = { id: string; src: string; span: string; alt: string };

const ITEMS: Item[] = [
  {
    id: "port-1",
    src: "/uploads/028.jpg",
    span: "col-span-2 row-span-2",
    alt: "Backyard transformation with layered garden beds and a stone patio",
  },
  {
    id: "port-2",
    src: "/uploads/017.jpg",
    span: "",
    alt: "Garden water feature set among native plantings",
  },
  {
    id: "port-3",
    src: "/uploads/003.jpg",
    span: "",
    alt: "Fresh sod lawn framed by trimmed shrub borders",
  },
  {
    id: "port-4",
    src: "/uploads/038.jpg",
    span: "col-span-2",
    alt: "Custom deck and pergola overlooking a planted yard",
  },
  {
    id: "port-5",
    src: "/uploads/009.jpg",
    span: "",
    alt: "Stone walkway winding through a mulched flower bed",
  },
  {
    id: "port-6",
    src: "/img/port-6.webp",
    span: "",
    alt: "Evening landscape lighting along a curved garden path",
  },
  {
    id: "port-7",
    src: "/img/port-7.webp",
    span: "col-span-2",
    alt: "Retaining wall and tiered planting on a sloped lot",
  },
];

export default function Portfolio() {
  const [open, setOpen] = useState<number | null>(null);
  const active = open === null ? null : ITEMS[open];

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: number) =>
      setOpen((i) => (i === null ? i : (i + dir + ITEMS.length) % ITEMS.length)),
    [],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, step]);

  return (
    <section id="portfolio" className="section-y bg-cream px-10">
      <div className="mx-auto max-w-content">
        <div className="mb-[clamp(2.5rem,5vw,3.5rem)] max-w-[40ch]">
          <h2 className="text-[clamp(2rem,4vw,2.875rem)] font-bold leading-[1.1] tracking-[-0.02em] text-teal">
            A look at recent projects
          </h2>
          <p className="mt-4 text-[15px] leading-[1.7] text-slate-soft">
            Built across West Houston and finished to last. Select any project to
            see it up close.
          </p>
        </div>
        <div className="grid auto-rows-[200px] grid-cols-4 gap-[18px]">
          {ITEMS.map((it, i) => (
            <button
              key={it.id}
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`View larger: ${it.alt}`}
              className={`group relative overflow-hidden rounded-[16px] transition-[transform,box-shadow] duration-500 hover:shadow-[0_26px_50px_rgba(15,45,30,0.22)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal ${it.span}`}
            >
              <Parallax speed={0.05} className="absolute inset-x-0 -inset-y-[16%]">
                <Image
                  src={it.src}
                  alt={it.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(.22,.61,.36,1)] group-hover:scale-110"
                />
              </Parallax>
              <div
                className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-[450ms] ease-[cubic-bezier(.22,.61,.36,1)] group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(180deg,rgba(15,78,78,0) 40%,rgba(15,78,78,0.55) 100%)",
                }}
              />
              <span className="pointer-events-none absolute bottom-[18px] left-5 translate-y-3 font-display text-[15px] font-bold tracking-[0.2px] text-cream opacity-0 transition-[opacity,transform] duration-[450ms] ease-[cubic-bezier(.22,.61,.36,1)] group-hover:translate-y-0 group-hover:opacity-100">
                View project →
              </span>
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Project image viewer"
          onClick={close}
          className="lb-backdrop fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(8,30,30,0.82)] p-6 backdrop-blur-[6px]"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={close}
            className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-[22px] text-cream transition-[background-color,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-white/20 active:scale-[0.92] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
          >
            ✕
          </button>
          <button
            type="button"
            aria-label="Previous project"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-[22px] text-cream transition-[background-color,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-white/20 active:scale-[0.92] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream sm:left-8"
          >
            ←
          </button>
          <figure
            key={open}
            onClick={(e) => e.stopPropagation()}
            className="lb-figure relative max-h-[82vh] w-full max-w-[1080px]"
          >
            <Image
              src={active.src}
              alt={active.alt}
              width={1080}
              height={720}
              className="max-h-[82vh] w-full rounded-[16px] object-contain"
            />
            <figcaption className="mt-3 text-center text-[13.5px] text-white/80">
              {active.alt}
            </figcaption>
          </figure>
          <button
            type="button"
            aria-label="Next project"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-[22px] text-cream transition-[background-color,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-white/20 active:scale-[0.92] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream sm:right-8"
          >
            →
          </button>
        </div>
      )}
    </section>
  );
}
