const fs = require("fs");
const html = fs.readFileSync(process.env.TEMP + "/vip-home.html", "utf8");

const sectionRe = /<(h[23])[^>]*>(.*?)<\/\1>/gi;
const headings = [];
let hm;
while ((hm = sectionRe.exec(html))) {
  const text = hm[2]
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (text) headings.push({ i: hm.index, text });
}

const startRe = /<div class="numberBox-number">([^<]+)<\/div>/gi;
const items = [];
let m;
while ((m = startRe.exec(html))) {
  const display = m[1].trim();
  const digits = display.replace(/\D/g, "");
  if (digits.length < 10) continue;

  const chunk = html.slice(m.index, m.index + 1200);
  const mrpMatch = chunk.match(/price-discount">₹([\d,]+)/);
  const priceMatches = [...chunk.matchAll(/<span(?: class="[^"]*")?>₹([\d,]+)<\/span>/g)];
  // last non-discount price span is sale price; if only one, use it
  let mrp = mrpMatch ? Number(mrpMatch[1].replace(/,/g, "")) : null;
  let price = null;
  if (priceMatches.length) {
    const last = priceMatches[priceMatches.length - 1][1];
    price = Number(last.replace(/,/g, ""));
  }
  if (price == null) continue;

  const sumMatch = chunk.match(/Sum:\s*(\d+)/i);
  const totalMatch = chunk.match(/Total:\s*(\d+)/i);

  let cat = "Featured";
  for (let i = headings.length - 1; i >= 0; i--) {
    if (headings[i].i < m.index) {
      cat = headings[i].text;
      break;
    }
  }

  // pattern hint from numberBox-4-cnt
  const patternMatch = chunk.match(/numberBox-4-cnt">([^<]+)</);

  items.push({
    id: `${digits.slice(0, 10)}`,
    number: digits.slice(0, 10),
    display,
    mrp,
    price,
    sum: sumMatch ? Number(sumMatch[1]) : digitSum(digits.slice(0, 10)),
    total: totalMatch
      ? Number(totalMatch[1])
      : digitalRoot(digits.slice(0, 10)),
    section: cat,
    pattern: patternMatch ? patternMatch[1].trim() : null,
  });
}

function digitSum(n) {
  return n.split("").reduce((a, d) => a + Number(d), 0);
}
function digitalRoot(n) {
  let s = digitSum(n);
  while (s > 9) s = digitSum(String(s));
  return s;
}

const seen = new Map();
for (const it of items) {
  if (!seen.has(it.number)) seen.set(it.number, it);
}
const unique = [...seen.values()];

// Map sections to category slugs used in UI
const sectionToCategory = {
  "VVIP HIGH END NUMBERS": "vvip",
  "0 Lovers ( Maximum Zeros )": "zeros",
  "AB-AB-AB Ending Special": "ababab",
  "Super Helpline Series (6)": "helpline",
  "786 Numbers": "786",
  "Tetra Numbers": "tetra",
  "Mirror Numbers": "mirror",
  "Penta Numbers": "penta",
  "Budget Friendly Numbers": "budget",
  "Lucky Numbers (Root Sum 1)": "lucky-1",
};

const enriched = unique.map((u) => ({
  ...u,
  category: sectionToCategory[u.section] || "featured",
  tags: [sectionToCategory[u.section] || "featured"].filter(Boolean),
}));

console.log("raw", items.length, "unique", enriched.length);
console.log(enriched.slice(0, 3));
fs.writeFileSync(
  "c:/Users/HP/Desktop/Vip/extracted-numbers.json",
  JSON.stringify(enriched, null, 2)
);
