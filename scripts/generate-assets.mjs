/**
 * Generates Top Gear Decide brand assets from inline SVG using `sharp`.
 *
 *   node scripts/generate-assets.mjs
 *
 * Outputs (committed to the repo):
 *   public/logo.png              header/footer logo mark (icon only)
 *   public/favicon.png           browser-tab / apple-touch icon
 *   public/assets/og-default.jpg default social-share image (1200x630)
 *   public/images/deals.jpg      homepage "deals" card
 *   public/images/<slug>.jpg     placeholder card/hero image per article
 *
 * These are BRAND-COLORED PLACEHOLDERS — no third-party/Amazon imagery is used
 * or hotlinked. Replace them with real product/lifestyle photos later via the
 * CMS (Admin -> each article -> Card / Hero Image).
 *
 * sharp is a build-only tool installed with `npm install --no-save sharp`;
 * it is intentionally NOT a runtime dependency of the site.
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

// Brand palette (matches src/styles/global.css)
const GREEN = "#1f7a4d";
const GREEN_DARK = "#155c39";
const GREEN_LIGHT = "#2e9d67";
const AMBER = "#ff7a1a";
const WHITE = "#ffffff";

const out = (p) => resolve(ROOT, p);
async function ensureDir(file) {
  await mkdir(dirname(file), { recursive: true });
}
async function svgToPng(svg, file, w, h) {
  await ensureDir(file);
  await sharp(Buffer.from(svg)).resize(w, h).png().toFile(file);
  console.log("wrote", file);
}
async function svgToJpg(svg, file) {
  await ensureDir(file);
  await sharp(Buffer.from(svg)).jpeg({ quality: 82 }).toFile(file);
  console.log("wrote", file);
}

function escapeXml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ---- Logo mark: rounded green square with a white check + amber leaf --------
function iconSvg(size = 512) {
  const r = size * 0.22;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${GREEN_LIGHT}"/>
      <stop offset="1" stop-color="${GREEN_DARK}"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="512" height="512" rx="${r}" fill="url(#g)"/>
  <!-- amber leaf accent -->
  <path d="M330 150 C300 150 250 175 250 235 C250 260 262 278 262 278 C262 278 300 270 322 248 C350 220 350 175 330 150 Z" fill="${AMBER}"/>
  <!-- white check mark (the 'decide') -->
  <path d="M150 268 l58 60 l118 -140" fill="none" stroke="${WHITE}" stroke-width="46" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
}

// ---- Text card placeholder ---------------------------------------------------
function cardSvg(label, title, w = 1200, h = 680) {
  const words = title.split(" ");
  const lines = [];
  let cur = "";
  const max = title.length > 22 ? 14 : 18;
  for (const word of words) {
    if ((cur + " " + word).trim().length > max && cur) {
      lines.push(cur.trim());
      cur = word;
    } else {
      cur = (cur + " " + word).trim();
    }
  }
  if (cur) lines.push(cur);
  const startY = h / 2 - (lines.length - 1) * 44 + 8;
  const tspans = lines
    .map(
      (ln, i) =>
        `<text x="80" y="${startY + i * 90}" font-family="Segoe UI, Arial, sans-serif" font-size="76" font-weight="800" fill="${WHITE}">${escapeXml(
          ln
        )}</text>`
    )
    .join("\n");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${GREEN}"/>
      <stop offset="1" stop-color="${GREEN_DARK}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <rect x="80" y="${startY - 118}" width="70" height="12" rx="6" fill="${AMBER}"/>
  <text x="80" y="${startY - 66}" font-family="Segoe UI, Arial, sans-serif" font-size="30" font-weight="700" letter-spacing="3" fill="${AMBER}">${escapeXml(
    label.toUpperCase()
  )}</text>
  ${tspans}
  <text x="80" y="${h - 54}" font-family="Segoe UI, Arial, sans-serif" font-size="30" font-weight="700" fill="rgba(255,255,255,0.85)">TopGear<tspan fill="${AMBER}">Decide</tspan></text>
</svg>`;
}

// ---- OG default --------------------------------------------------------------
function ogSvg(w = 1200, h = 630) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${GREEN_LIGHT}"/>
      <stop offset="1" stop-color="${GREEN_DARK}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <rect x="90" y="250" width="90" height="14" rx="7" fill="${AMBER}"/>
  <text x="90" y="360" font-family="Segoe UI, Arial, sans-serif" font-size="92" font-weight="800" fill="${WHITE}">TopGear<tspan fill="${AMBER}">Decide</tspan></text>
  <text x="92" y="430" font-family="Segoe UI, Arial, sans-serif" font-size="38" font-weight="600" fill="rgba(255,255,255,0.9)">Independent food, supplement &amp; drink reviews</text>
</svg>`;
}

const cards = [
  ["best-whey-protein-powders", "Supplements", "Best Whey Protein Powders"],
  ["best-greens-powders", "Supplements", "Best Greens Powders"],
  ["best-creatine-monohydrate", "Supplements", "Best Creatine Monohydrate"],
  ["best-extra-virgin-olive-oil", "Pantry", "Best Extra Virgin Olive Oil"],
  ["best-protein-bars", "Pantry", "Best Protein Bars"],
  ["best-manuka-honey", "Pantry", "Best Manuka Honey"],
  ["best-electrolyte-drink-mixes", "Drinks", "Best Electrolyte Drink Mixes"],
  ["best-ground-coffee", "Drinks", "Best Ground Coffee"],
  ["best-meal-replacement-shakes", "Drinks", "Best Meal Replacement Shakes"],
];

async function main() {
  await svgToPng(iconSvg(), out("public/logo.png"), 160, 160);
  await svgToPng(iconSvg(), out("public/favicon.png"), 512, 512);
  await svgToJpg(ogSvg(), out("public/assets/og-default.jpg"));
  await svgToJpg(cardSvg("Deals", "This Week's Best Deals"), out("public/images/deals.jpg"));
  for (const [slug, label, title] of cards) {
    await svgToJpg(cardSvg(label, title), out(`public/images/${slug}.jpg`));
  }
  console.log("\nAll brand assets generated.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
