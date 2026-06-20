const linkCls =
  "inline-block rounded-[3px] text-white/80 transition-[color,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:translate-x-1 hover:text-sage active:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage";

export default function Footer() {
  return (
    <footer className="bg-teal-dark px-10 pb-9 pt-[70px] text-white/80">
      <div className="mx-auto grid max-w-content grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 border-b border-white/10 pb-12">
        <div>
          <div className="mb-[18px] flex items-center gap-[11px] text-cream">
            <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-sage font-display text-[16px] font-extrabold text-teal">
              2G
            </span>
            <span className="font-display text-[17px] font-bold">
              2 Gals Landscaping
            </span>
          </div>
          <p className="max-w-[280px] text-[15px] leading-[1.7]">
            Woman-owned landscaping &amp; construction serving West Houston for
            over 20 years.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-[15px] font-bold tracking-[0.5px] text-cream">
            Contact
          </h4>
          <div className="flex flex-col gap-[11px] text-[14px] leading-[1.5]">
            <span>(832) 275-9015</span>
            <span>sales@2galslandscaping.net</span>
            <span>
              16225 Park Ten Place, Suite 500
              <br />
              Houston, TX 77084
            </span>
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-[15px] font-bold tracking-[0.5px] text-cream">
            Service Areas
          </h4>
          <div className="flex flex-col gap-[10px] text-[14px]">
            <span>West Houston</span>
            <span>Energy Corridor</span>
            <span>Memorial</span>
            <span>Spring Branch</span>
            <span>Katy</span>
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-[15px] font-bold tracking-[0.5px] text-cream">
            Follow Us
          </h4>
          <div className="flex flex-col gap-[10px] text-[14px]">
            <a href="https://facebook.com/2galslandscaping" className={linkCls}>
              Facebook
            </a>
            <a
              href="https://instagram.com/2galslandscapingtx"
              className={linkCls}
            >
              Instagram @2galslandscapingtx
            </a>
            <a href="https://wa.me/18322759015" className={linkCls}>
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-[26px] flex max-w-content items-center justify-between text-[13.5px] text-white/75">
        <span>© 2026 2 Gals Landscaping &amp; Construction. All rights reserved.</span>
        <span>Privacy Policy &nbsp;·&nbsp; Terms</span>
      </div>
    </footer>
  );
}
