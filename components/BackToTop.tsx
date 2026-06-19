"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () =>
      setShow(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-7 right-7 z-[60] flex h-[50px] w-[50px] items-center justify-center rounded-full bg-teal text-[20px] text-cream shadow-[0_10px_26px_rgba(15,45,30,0.35)] transition-[opacity,transform,background] duration-[400ms] ease-[cubic-bezier(.22,.61,.36,1)] hover:bg-teal-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0) scale(1)" : "translateY(20px) scale(0.8)",
        pointerEvents: show ? "auto" : "none",
      }}
    >
      ↑
    </button>
  );
}
