import Image from "next/image";
import Parallax from "./Parallax";

/**
 * Full-bleed photographic divider between sections. The image drifts slower
 * than the scroll (parallax) so the band reads as a depth break, not a static
 * strip. Decorative: hidden from assistive tech and skipped by ScrollReveal.
 */
export default function ParallaxBand() {
  return (
    <section
      aria-hidden="true"
      data-reveal="off"
      className="relative h-[56vh] min-h-[380px] w-full overflow-hidden"
    >
      <Parallax speed={0.15} className="absolute inset-x-0 -inset-y-[26%]">
        <Image
          src="/uploads/013.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </Parallax>
      {/* Depth + brand tint so the photo feels composed rather than dropped in. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,40,36,0.5) 0%, rgba(8,40,36,0.18) 45%, rgba(8,40,36,0.55) 100%)",
        }}
      />
    </section>
  );
}
