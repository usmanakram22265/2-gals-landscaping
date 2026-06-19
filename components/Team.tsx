import Image from "next/image";
import Parallax from "./Parallax";

const TEAM = [
  { id: "team-1", name: "Paula Rodriguez", role: "Founder & Lead Designer" },
  { id: "team-2", name: "Katty", role: "Co-Founder & Head of Operations" },
  { id: "team-3", name: "Alicia Galindo", role: "Sales Manager" },
];

export default function Team() {
  return (
    <section id="team" className="section-y bg-cream px-10">
      <div className="mx-auto max-w-content">
        <div className="mb-[clamp(2.5rem,5vw,3.5rem)] text-center">
          <h2 className="text-[clamp(2rem,4vw,2.875rem)] font-bold leading-[1.1] tracking-[-0.02em] text-teal">
            The gals behind the green
          </h2>
        </div>
        <div className="mx-auto grid max-w-[900px] grid-cols-3 gap-[34px]">
          {TEAM.map((m) => (
            <div key={m.id} className="text-center">
              <div className="relative mb-5 h-[320px] w-full overflow-hidden rounded-[16px] bg-mist">
                <Parallax speed={0.06} className="absolute inset-x-0 -inset-y-[12%]">
                  <Image
                    src={`/img/${m.id}.webp`}
                    alt={m.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 290px"
                    className="object-cover"
                  />
                </Parallax>
              </div>
              <h3 className="text-[19px] font-bold text-teal">{m.name}</h3>
              <p className="mt-1 text-[14px] text-slate-muted">{m.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
