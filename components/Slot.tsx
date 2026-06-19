import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  /** border-radius in px; ignored when shape is "circle" */
  radius?: number;
  shape?: "rect" | "rounded" | "circle";
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * Faithful re-creation of the design's <image-slot>: an image cropped with
 * object-fit: cover, filling a sized box with the given corner treatment.
 */
export default function Slot({
  src,
  alt,
  radius = 0,
  shape = "rect",
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
}: Props) {
  const borderRadius = shape === "circle" ? "9999px" : `${radius}px`;
  return (
    <div
      className={`relative overflow-hidden bg-mist ${className}`}
      style={{ borderRadius }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
