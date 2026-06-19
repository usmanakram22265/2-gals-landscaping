"use client";

import { useEffect } from "react";

type Flagged = HTMLElement & { __rev?: boolean };

/**
 * Re-creates the prototype's scroll-reveal: walk each section's top-level
 * children, give them a directional offset, then settle them as they enter view.
 */
export default function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const units: HTMLElement[] = [];
    const add = (el: Element | null | undefined, dir: string, delay = 0) => {
      const node = el as Flagged | null;
      if (!node || node.__rev) return;
      node.__rev = true;
      node.classList.add("reveal", `reveal-${dir}`);
      if (delay) node.style.transitionDelay = `${delay}ms`;
      units.push(node);
    };

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section, footer"),
    ).filter((s) => s.id !== "top" && s.dataset.reveal !== "off");

    sections.forEach((sec, si) => {
      const container = sec.querySelector<HTMLElement>(":scope > div") || sec;
      Array.from(container.children).forEach((child) => {
        const cs = getComputedStyle(child);
        const grid = cs.display === "grid" || cs.display === "flex";
        if (grid && child.children.length > 1) {
          if (child.children.length === 2 && cs.display === "grid") {
            add(child.children[0], "left", 0);
            add(child.children[1], "right", 120);
          } else {
            Array.from(child.children).forEach((g, i) =>
              add(g, i % 2 ? "up" : "zoom", i * 90),
            );
          }
        } else {
          add(child, si % 2 ? "right" : "up");
        }
      });
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    units.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
