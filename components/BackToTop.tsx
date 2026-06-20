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
    // Outer layer owns the show/hide transform so the button's own transform
    // stays free for a crisp hover-lift + press feedback (the two never fight).
    <div
      className="fixed bottom-7 right-7 z-[60] transition-[opacity,transform] duration-300 ease-[cubic-bezier(.22,.61,.36,1)]"
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0) scale(1)" : "translateY(20px) scale(0.9)",
        pointerEvents: show ? "auto" : "none",
      }}
    >
      <button
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-teal text-[20px] text-cream shadow-[0_10px_26px_rgba(15,45,30,0.35)] transition-[background-color,transform] duration-200 ease-[cubic-bezier(.22,.61,.36,1)] hover:-translate-y-0.5 hover:bg-teal-dark active:translate-y-0 active:scale-[0.92] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
      >
        ↑
      </button>
    </div>
  );
}
