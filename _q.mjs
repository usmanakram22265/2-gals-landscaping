import puppeteer from "puppeteer";
const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto("http://localhost:3000", { waitUntil: "networkidle2" });
const el = await page.$("#quote");
await el.screenshot({ path: "temporary screenshots/audit-quote.png" });
await browser.close();
