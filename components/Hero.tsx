"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  // Autoplay coaxing (muted/playsinline + retries) mirroring the prototype.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    const slow = () => {
      try {
        v.playbackRate = 0.75;
      } catch {
        /* noop */
      }
    };
    const tryPlay = () => {
      v.muted = true;
      const p = v.play();
      if (p && p.catch) p.catch(() => {});
    };
    v.addEventListener("canplay", () => {
      slow();
      tryPlay();
    });
    v.addEventListener("loadeddata", tryPlay);
    const kick = () => tryPlay();
    window.addEventListener("pointerdown", kick, { once: true, passive: true });
    window.addEventListener("scroll", kick, { once: true, passive: true });
    slow();
    tryPlay();
    const retries = [200, 600, 1500].map((ms) => setTimeout(tryPlay, ms));
    return () => retries.forEach(clearTimeout);
  }, []);

  // Parallax: scale + drift the video, drift + fade the copy.
  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const v = videoRef.current;
    const inner = innerRef.current;
    if (v) v.style.transform = "scale(1.28)";
    let ticking = false;
    const apply = () => {
      ticking = false;
      const y = window.scrollY;
      const vh = window.innerHeight;
      if (y >= vh * 1.15) return;
      if (v) v.style.transform = `scale(1.28) translateY(${(y * 0.16).toFixed(1)}px)`;
      if (inner) {
        inner.style.transform = `translateY(${(y * 0.32).toFixed(1)}px)`;
        inner.style.opacity = Math.max(0, 1 - y / (vh * 0.7)).toFixed(3);
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(apply);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    apply();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="top"
      className="relative flex items-start justify-center overflow-hidden"
      style={{ minHeight: "108vh" }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
        poster="/assets/hero-poster.jpg"
        className="absolute inset-0 h-full w-full bg-teal object-cover [will-change:transform]"
      >
        <source src="/assets/hero-new.mp4" type="video/mp4" />
      </video>

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.42) 35%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      <div
        ref={innerRef}
        className="relative z-[2] max-w-[820px] animate-floatUp px-6 pt-[172px] text-center text-cream [will-change:transform,opacity]"
      >
        <span className="mb-5 inline-block font-display text-[12px] font-semibold uppercase tracking-[3px] text-sage">
          Houston Landscaping &amp; Construction
        </span>
        <h1
          className="mb-5 text-[clamp(2.75rem,6vw,4.5rem)] font-bold leading-[1.04] tracking-[-0.02em] [text-wrap:balance]"
          style={{ textShadow: "0 2px 24px rgba(8,30,30,0.55)" }}
        >
          Let us bring life to
          <br />
          your landscape
        </h1>
        <p
          className="mx-auto mb-[34px] max-w-[440px] text-[15px] font-normal leading-[1.7] text-white/90"
          style={{ textShadow: "0 1px 12px rgba(8,30,30,0.6)" }}
        >
          We design, build, and care for outdoor spaces across West Houston,
          crafted to grow beautifully and last for years.
        </p>
        <Link
          href="#quote"
          className="inline-flex items-center gap-[10px] rounded-full border border-cream bg-cream px-[34px] py-4 font-display text-[15px] font-bold text-teal shadow-cta transition-[background,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-[#eef3ec] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal active:translate-y-0 active:scale-[0.98]"
        >
          Get a Quote <span className="text-[16px]">→</span>
        </Link>
      </div>
    </section>
  );
}
