"use client";

import { useEffect, useState } from "react";

/**
 * Full-screen brand cover shown on first load until the hero video can play.
 * It always dismisses: on the video's canplay/playing, on error, or a hard
 * timeout fallback, so content is never gated indefinitely. A <noscript> rule
 * in the layout hides it for crawlers / JS-off users, who get the page at once.
 */
export default function Preloader() {
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const finish = () => setDone(true);

    const video = document.querySelector("video");
    if (video) {
      if (video.readyState >= 3) {
        finish();
      } else {
        ["canplay", "playing", "loadeddata", "error"].forEach((e) =>
          video.addEventListener(e, finish, { once: true }),
        );
      }
    } else {
      finish();
    }

    // Never let the cover outstay the video: reveal regardless after a cap.
    const hard = window.setTimeout(finish, reduce ? 1000 : 3500);
    return () => clearTimeout(hard);
  }, []);

  useEffect(() => {
    if (!done) return;
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const t = window.setTimeout(() => setGone(true), reduce ? 0 : 600);
    return () => clearTimeout(t);
  }, [done]);

  if (gone) return null;

  return (
    <div
      className={`preloader${done ? " is-done" : ""}`}
      role="status"
      aria-label="Loading"
    >
      <span className="preloader-mark">2G</span>
      <span className="preloader-spin" aria-hidden="true" />
    </div>
  );
}
