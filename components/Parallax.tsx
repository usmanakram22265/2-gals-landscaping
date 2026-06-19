"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Subtle scroll parallax for image layers. All instances share ONE scroll
 * listener and one rAF tick, so adding many is cheap. The wrapped layer should
 * be sized larger than its (overflow-hidden) frame so the translate never
 * reveals an edge. No-ops under prefers-reduced-motion.
 */
type Item = { el: HTMLElement; speed: number };

let items: Item[] = [];
let raf = 0;
let bound = false;

function update() {
  raf = 0;
  const vh = window.innerHeight;
  for (const { el, speed } of items) {
    const r = el.getBoundingClientRect();
    const fromCenter = r.top + r.height / 2 - vh / 2;
    el.style.transform = `translate3d(0, ${(-fromCenter * speed).toFixed(1)}px, 0)`;
  }
}

function onScroll() {
  if (!raf) raf = requestAnimationFrame(update);
}

function ensureBound() {
  if (bound || typeof window === "undefined") return;
  bound = true;
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
}

type Props = {
  speed?: number;
  className?: string;
  children: ReactNode;
};

export default function Parallax({ speed = 0.1, className, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    ensureBound();
    const item: Item = { el, speed };
    items.push(item);
    onScroll();
    return () => {
      items = items.filter((i) => i !== item);
    };
  }, [speed]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
