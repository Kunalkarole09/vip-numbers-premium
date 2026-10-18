const { chromium } = require("playwright");
const fs = require("fs");
(async () => {
  const browser = await chromium.launch({ headless: true });
  const outDir = "c:/Users/HP/Desktop/Vip/audit-screenshots";
  fs.mkdirSync(outDir, { recursive: true });
  const pages = [
    { name: "home-desktop", url: "https://www.vipnumbersclub.com/", w: 1440, h: 900 },
    { name: "home-mobile", url: "https://www.vipnumbersclub.com/", w: 390, h: 844 },
    { name: "about-desktop", url: "https://www.vipnumbersclub.com/about-us", w: 1440, h: 900 },
    { name: "contact-desktop", url: "https://www.vipnumbersclub.com/contact-us", w: 1440, h: 900 },
    { name: "search-desktop", url: "https://www.vipnumbersclub.com/search-front", w: 1440, h: 900 },
    { name: "vvip-mobile", url: "https://www.vipnumbersclub.com/vvip-numbers", w: 390, h: 844 },
  ];
  for (const p of pages) {
    const context = await browser.newContext({ viewport: { width: p.w, height: p.h } });
    const page = await context.newPage();
    try {
      await page.goto(p.url, { waitUntil: "domcontentloaded", timeout: 60000 });
      await page.waitForTimeout(3000);
      await page.screenshot({ path: `${outDir}/${p.name}.png`, fullPage: false });
      console.log("OK", p.name);
    } catch (e) {
      console.log("FAIL", p.name, e.message);
    }
    await context.close();
  }
  await browser.close();
})();
