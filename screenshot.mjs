// screenshot.mjs — capture a full-page screenshot of a URL with Puppeteer.
// Usage:
//   node screenshot.mjs                              → http://localhost:3000
//   node screenshot.mjs http://localhost:3000
//   node screenshot.mjs http://localhost:3000 hero   → screenshot-N-hero.png
// Saves to ./temporary screenshots/screenshot-N(-label).png (auto-incremented).
import { readdir, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import puppeteer from "puppeteer";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(ROOT, "temporary screenshots");

const url = process.argv[2] || "http://localhost:3000";
const label = process.argv[3]
  ? process.argv[3].replace(/[^a-z0-9-_]/gi, "-")
  : "";
const width = Number(process.env.WIDTH) || 1440;
const height = Number(process.env.HEIGHT) || 900;

async function nextIndex() {
  await mkdir(OUT_DIR, { recursive: true });
  const files = await readdir(OUT_DIR).catch(() => []);
  let max = 0;
  for (const f of files) {
    const m = f.match(/^screenshot-(\d+)/);
    if (m) max = Math.max(max, Number(m[1]));
  }
  return max + 1;
}

const n = await nextIndex();
const name = label ? `screenshot-${n}-${label}.png` : `screenshot-${n}.png`;
const outPath = path.join(OUT_DIR, name);

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox", "--hide-scrollbars"],
});
try {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 2 });
  // Deterministic capture: reduced-motion reveals all scroll-triggered content
  // and disables animations/parallax so layout is fully painted.
  if (process.env.MOTION !== "1") {
    await page.emulateMediaFeatures([
      { name: "prefers-reduced-motion", value: "reduce" },
    ]);
  }
  await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
  await page.evaluate(() => document.fonts && document.fonts.ready);
  // Scroll through the page so IntersectionObserver reveals and lazy images fire,
  // then return to the top before capturing.
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.8);
    for (let y = 0; y <= document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 250));
  });
  await new Promise((r) => setTimeout(r, 400)); // let late paints/animations settle
  await page.screenshot({ path: outPath, fullPage: true });
  console.log(`Saved ${path.relative(ROOT, outPath)}`);
} finally {
  await browser.close();
}
