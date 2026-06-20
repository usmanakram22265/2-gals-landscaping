import Image from "next/image";
import Parallax from "./Parallax";

/**
 * Contained photographic divider between sections: a rounded image, inset from
 * the page edges, whose photo drifts slower than the scroll (parallax) for a
 * sense of depth. Decorative: hidden from assistive tech and skipped by
 * ScrollReveal.
 */
export default function ParallaxBand() {
  return (
    <section
      aria-hidden="true"
      data-reveal="off"
      className="bg-cream px-10 py-[clamp(1.5rem,4vw,2.5rem)]"
    >
      <div className="mx-auto max-w-content">
        <div className="relative h-[52vh] min-h-[360px] w-full overflow-hidden rounded-[24px]">
          <Parallax speed={0.15} className="absolute inset-x-0 -inset-y-[26%]">
            <Image
              src="/uploads/013.jpg"
              alt=""
              fill
              sizes="(max-width: 1240px) 100vw, 1180px"
              className="object-cover"
            />
          </Parallax>
          {/* Soft brand tint for depth, kept light since there's no text. */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(8,40,36,0.30) 0%, rgba(8,40,36,0.06) 42%, rgba(8,40,36,0.34) 100%)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
