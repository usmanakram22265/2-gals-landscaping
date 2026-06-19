"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const fieldCls =
  "rounded-[10px] border border-line bg-white px-[14px] py-[13px] text-[14px] text-ink outline-none transition-colors focus:border-teal aria-[invalid=true]:border-[#b4452f]";
const labelCls = "mb-[6px] block text-[12.5px] font-semibold text-slate-soft";

const socials = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14 9h3V6h-3c-1.66 0-3 1.34-3 3v2H9v3h2v6h3v-6h2.5l.5-3H14V9.5c0-.28.22-.5.5-.5z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "#",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.04 21.5h-.01a9.5 9.5 0 0 1-4.84-1.33l-.35-.2-3.6.94.96-3.5-.23-.36a9.46 9.46 0 0 1-1.45-5.05c0-5.23 4.26-9.49 9.5-9.49 2.54 0 4.92.99 6.71 2.79a9.42 9.42 0 0 1 2.78 6.71c0 5.24-4.26 9.49-9.48 9.49zm5.55-15.04A11.4 11.4 0 0 0 12.04 3C6.06 3 1.2 7.86 1.2 13.84c0 1.9.5 3.76 1.44 5.4L1.1 24.5l5.4-1.42a10.8 10.8 0 0 0 5.53 1.51h.01c5.98 0 10.84-4.86 10.84-10.84 0-2.9-1.13-5.62-3.18-7.67z" />
      </svg>
    ),
  },
];

type Errors = Record<string, string>;

const MESSAGES: Record<string, string> = {
  name: "Please enter your name.",
  phone: "Please enter a phone number we can reach you at.",
  email: "Please enter a valid email address.",
  address: "Please enter the project address.",
  service: "Please choose a service type.",
  message: "Tell us a little about your project.",
};

export default function Quote() {
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [hasService, setHasService] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  function validate(form: HTMLFormElement): Errors {
    const next: Errors = {};
    for (const el of Array.from(form.elements)) {
      const field = el as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
      if (!field.name || !("validity" in field)) continue;
      if (!field.validity.valid) {
        next[field.name] =
          field.validity.typeMismatch && field.name === "email"
            ? "That email doesn't look right, please check it."
            : MESSAGES[field.name] ?? "This field is required.";
      }
    }
    return next;
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(e.currentTarget);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = e.currentTarget.querySelector<HTMLElement>(
        `[name="${Object.keys(found)[0]}"]`,
      );
      first?.focus();
      return;
    }
    // Brief acknowledged "sending" state before the success screen so the
    // submit registers as real work. Skipped under reduced motion.
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      setSubmitted(true);
      return;
    }
    setPending(true);
    window.setTimeout(() => {
      setPending(false);
      setSubmitted(true);
    }, 600);
  }

  const errId = (name: string) => (errors[name] ? `${name}-error` : undefined);

  return (
    <section
      id="quote"
      className="flex min-h-screen items-center px-10 py-[clamp(3rem,6vw,4.5rem)]"
      style={{
        background:
          "linear-gradient(180deg, #98ae7f 0%, #809b76 38%, #5f7e69 72%, #3f6155 100%)",
      }}
    >
      <div className="mx-auto grid w-full max-w-quote grid-cols-[0.85fr_1fr] items-center gap-10">
        {/* Plant / social panel */}
        <div
          className="relative flex min-h-[460px] flex-col justify-end rounded-[28px] p-11 shadow-float"
          style={{
            background:
              "linear-gradient(90deg, #d2ebc2 0%, #a9c393 45%, #7e9b6b 100%)",
          }}
        >
          <Image
            src="/assets/plant3.png"
            alt=""
            width={640}
            height={640}
            priority
            className="animate-plantFloat pointer-events-none absolute z-[5] object-contain object-bottom"
            style={{
              left: "50%",
              marginLeft: -40, // half of width → centers the pot within the card
              bottom: -15,
              height: 660,
              width: 660,
              maxWidth: "none", // override Tailwind preflight img{max-width:100%}
              filter: "drop-shadow(rgba(20,40,20,0.35) 0px 26px 38px)",
            }}
          />
          <div className="absolute bottom-7 right-7 z-[6] flex flex-col gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal text-cream shadow-[0_6px_16px_rgba(15,45,30,0.35)] transition-colors hover:bg-teal-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Form / success panel */}
        <div className="rounded-[28px] bg-cream px-[50px] py-12 shadow-float">
          {submitted ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-mist">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#0F4E4E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12l5 5L20 7" />
                </svg>
              </div>
              <h3 className="mb-[10px] text-[24px] font-bold text-teal">
                Thank you!
              </h3>
              <p className="mb-7 max-w-[320px] text-[15px] leading-[1.6] text-slate-soft">
                We&rsquo;ve received your request. One of the gals will reach out
                within one business day to schedule your free estimate.
              </p>
              <button
                type="button"
                onClick={() => {
                  formRef.current?.reset();
                  setErrors({});
                  setHasService(false);
                  setSubmitted(false);
                }}
                className="rounded-[10px] border border-teal px-5 py-3 font-display text-[14px] font-semibold text-teal transition-colors hover:bg-teal hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
              >
                Send another request
              </button>
            </div>
          ) : (
            <div>
              <h3 className="mb-[6px] text-[26px] font-bold text-teal">
                Let&rsquo;s talk about your landscape.
              </h3>
              <p className="mb-[18px] text-[14px] leading-[1.5] text-slate-soft">
                Free estimates across West Houston, Energy Corridor, Memorial,
                Spring Branch and Katy. Tell us about your project and
                we&rsquo;ll be in touch.
              </p>
              <form ref={formRef} onSubmit={onSubmit} noValidate className="flex flex-col gap-[13px]">
                <div className="grid grid-cols-2 gap-[14px]">
                  <div>
                    <label htmlFor="q-name" className={labelCls}>Full name</label>
                    <input id="q-name" name="name" required autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errId("name")} className={`${fieldCls} w-full`} />
                    {errors.name && <p id="name-error" className="mt-1 text-[12px] text-[#b4452f]">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="q-phone" className={labelCls}>Phone</label>
                    <input id="q-phone" name="phone" type="tel" required autoComplete="tel" aria-invalid={!!errors.phone} aria-describedby={errId("phone")} className={`${fieldCls} w-full`} />
                    {errors.phone && <p id="phone-error" className="mt-1 text-[12px] text-[#b4452f]">{errors.phone}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-[14px]">
                  <div>
                    <label htmlFor="q-email" className={labelCls}>Email</label>
                    <input id="q-email" name="email" type="email" required autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errId("email")} className={`${fieldCls} w-full`} />
                    {errors.email && <p id="email-error" className="mt-1 text-[12px] text-[#b4452f]">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="q-address" className={labelCls}>Project address</label>
                    <input id="q-address" name="address" required autoComplete="street-address" aria-invalid={!!errors.address} aria-describedby={errId("address")} className={`${fieldCls} w-full`} />
                    {errors.address && <p id="address-error" className="mt-1 text-[12px] text-[#b4452f]">{errors.address}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="q-service" className={labelCls}>Service type</label>
                  <select
                    id="q-service"
                    name="service"
                    required
                    defaultValue=""
                    onChange={(e) => setHasService(e.target.value !== "")}
                    aria-invalid={!!errors.service}
                    aria-describedby={errId("service")}
                    className={`${fieldCls} w-full ${hasService ? "text-ink" : "text-[#5a6b67]"}`}
                  >
                    <option value="" disabled>Select a service…</option>
                    <option>Landscaping</option>
                    <option>Construction</option>
                    <option>Both / Not sure</option>
                  </select>
                  {errors.service && <p id="service-error" className="mt-1 text-[12px] text-[#b4452f]">{errors.service}</p>}
                </div>
                <div>
                  <label htmlFor="q-message" className={labelCls}>About your project</label>
                  <textarea id="q-message" name="message" required rows={3} aria-invalid={!!errors.message} aria-describedby={errId("message")} className={`${fieldCls} w-full resize-y`} />
                  {errors.message && <p id="message-error" className="mt-1 text-[12px] text-[#b4452f]">{errors.message}</p>}
                </div>
                <button
                  type="submit"
                  disabled={pending}
                  aria-busy={pending}
                  className="mt-1 flex items-center justify-center gap-2 rounded-[10px] bg-teal p-[14px] font-display text-[15px] font-bold text-cream transition-[background,transform,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-teal-bright hover:shadow-[0_12px_26px_rgba(15,70,70,0.32)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal active:translate-y-0 active:scale-[0.99] active:shadow-[0_4px_12px_rgba(15,70,70,0.3)] disabled:cursor-default disabled:hover:translate-y-0 disabled:hover:bg-teal disabled:hover:shadow-none"
                >
                  {pending ? (
                    <>
                      <svg className="h-[18px] w-[18px] animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" />
                        <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    "Request My Free Quote"
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
