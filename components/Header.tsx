"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const NAV = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#process", label: "Process" },
  { href: "#team", label: "Team" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Track each section's visible ratio and light the most-visible link;
    // clear the highlight when none of them are on screen.
    const ratios = new Map<string, number>();
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          ratios.set(
            "#" + e.target.id,
            e.isIntersecting ? e.intersectionRatio : 0,
          );
        });
        let best = "";
        let max = 0;
        ratios.forEach((r, id) => {
          if (r > max) {
            max = r;
            best = id;
          }
        });
        setActive(max > 0 ? best : "");
      },
      { threshold: [0.25, 0.5, 0.75] },
    );
    NAV.forEach((n) => {
      const el = document.querySelector(n.href);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const navColor = scrolled ? "#1c2b2b" : "rgba(255,255,255,0.9)";

  return (
    <header
      id="site-header"
      className="fixed inset-x-0 top-0 z-50 transition-[background,box-shadow] duration-300"
      style={{
        background: scrolled ? "#FCFCFC" : "transparent",
        boxShadow: scrolled ? "0 6px 24px rgba(15,45,30,0.14)" : "none",
      }}
    >
      <div
        className="mx-auto grid max-w-shell grid-cols-[1fr_auto_1fr] items-center px-10 transition-[padding] duration-300"
        style={{
          paddingTop: scrolled ? 16 : 28,
          paddingBottom: scrolled ? 16 : 28,
        }}
      >
        <Link
          href="#top"
          className="flex items-center gap-[11px] justify-self-start rounded-[8px] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
          style={{ color: scrolled ? "#0F4E4E" : "#FCFCFC" }}
        >
          <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-sage font-display text-[15px] font-extrabold tracking-[-0.5px] text-teal">
            2G
          </span>
          <span className="font-display text-[17px] font-bold tracking-[0.2px]">
            2 Gals <span className="font-normal opacity-80">Landscaping</span>
          </span>
        </Link>

        <nav
          ref={navRef}
          id="site-nav"
          className="flex items-center gap-8 justify-self-center"
        >
          {NAV.map((n) => {
            const on = active === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                className="group relative rounded-[4px] pb-1 font-display text-[14px] font-medium transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
                style={{ color: navColor }}
              >
                {n.label}
                <span
                  className={`absolute inset-x-0 bottom-0 h-[2px] origin-left rounded-[2px] bg-current transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 ${
                    on ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <Link
          href="#quote"
          id="site-cta"
          className="justify-self-end rounded-full border px-[22px] py-[11px] font-display text-[14px] font-semibold backdrop-blur-[8px] transition-[background,color,border-color] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
          style={{
            background: scrolled ? "#0F4E4E" : "rgba(255,255,255,0.14)",
            borderColor: scrolled ? "#0F4E4E" : "rgba(255,255,255,0.4)",
            color: "#FCFCFC",
          }}
        >
          Get a Quote
        </Link>
      </div>
    </header>
  );
}
