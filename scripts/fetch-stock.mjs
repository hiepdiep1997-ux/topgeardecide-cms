/**
 * Downloads curated, license-cleared stock photos and writes web-sized,
 * cropped JPEGs into public/images/ (overwriting the brand placeholders of the
 * same name, so no article frontmatter changes are needed).
 *
 *   node scripts/fetch-stock.mjs
 *
 * All images are from Pexels under the Pexels License: free for commercial use,
 * NO attribution required. Source pages are recorded in scripts/stock-manifest.json
 * for transparency. These are generic CATEGORY illustrations for card/hero art —
 * they do not depict the specific reviewed product models.
 */
import sharp from "sharp";
import { writeFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126.0 Safari/537.36";
const sized = (base) => `${base}?auto=compress&cs=tinysrgb&w=1800`;

// file, target size, direct Pexels CDN url, source page (Pexels License)
const ITEMS = [
  { file: "best-whey-protein-powders.jpg", w: 800, h: 450, url: "https://images.pexels.com/photos/15120889/pexels-photo-15120889.jpeg", page: "https://www.pexels.com/photo/15120889/" },
  { file: "best-greens-powders.jpg", w: 800, h: 450, url: "https://images.pexels.com/photos/12049998/pexels-photo-12049998.jpeg", page: "https://www.pexels.com/photo/smoothie-with-fruit-12049998/" },
  { file: "best-creatine-monohydrate.jpg", w: 800, h: 450, url: "https://images.pexels.com/photos/12625114/pexels-photo-12625114.jpeg", page: "https://www.pexels.com/photo/12625114/" },
  { file: "best-extra-virgin-olive-oil.jpg", w: 800, h: 450, url: "https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg", page: "https://www.pexels.com/photo/33783/" },
  { file: "best-protein-bars.jpg", w: 800, h: 450, url: "https://images.pexels.com/photos/17763560/pexels-photo-17763560.jpeg", page: "https://www.pexels.com/photo/protein-bar-with-sesame-seeds-and-nuts-17763560/" },
  { file: "best-manuka-honey.jpg", w: 800, h: 450, url: "https://images.pexels.com/photos/5634206/pexels-photo-5634206.jpeg", page: "https://www.pexels.com/photo/liquid-yellow-honey-in-a-glass-jar-5634206/" },
  { file: "best-electrolyte-drink-mixes.jpg", w: 800, h: 450, url: "https://images.pexels.com/photos/2470021/pexels-photo-2470021.jpeg", page: "https://www.pexels.com/photo/man-drinking-water-2470021/" },
  { file: "best-ground-coffee.jpg", w: 800, h: 450, url: "https://images.pexels.com/photos/2456424/pexels-photo-2456424.jpeg", page: "https://www.pexels.com/photo/close-up-photo-of-coffee-cup-beside-coffee-beans-2456424/" },
  { file: "best-meal-replacement-shakes.jpg", w: 800, h: 450, url: "https://images.pexels.com/photos/2424034/pexels-photo-2424034.jpeg", page: "https://www.pexels.com/photo/close-up-photo-of-smoothie-in-drinking-glass-2424034/" },
  { file: "deals.jpg", w: 800, h: 450, url: "https://images.pexels.com/photos/33975355/pexels-photo-33975355.jpeg", page: "https://www.pexels.com/photo/colorful-fresh-produce-display-at-grocery-store-33975355/" },
  { file: "hero-1.jpg", w: 1600, h: 760, url: "https://images.pexels.com/photos/5971874/pexels-photo-5971874.jpeg", page: "https://www.pexels.com/photo/food-ingredients-on-the-table-5971874/" },
];

async function main() {
  const manifest = [];
  let ok = 0;
  for (const it of ITEMS) {
    const outPath = resolve(ROOT, "public/images", it.file);
    try {
      const res = await fetch(sized(it.url), { headers: { "User-Agent": UA } });
      if (!res.ok) throw new Error("http " + res.status);
      const buf = Buffer.from(await res.arrayBuffer());
      const meta = await sharp(buf).metadata();
      if (!meta.width || meta.width < 600) throw new Error("image too small / not an image");
      await sharp(buf).resize(it.w, it.h, { fit: "cover", position: "attention" }).jpeg({ quality: 80 }).toFile(outPath);
      console.log(`OK  ${it.file}  (src ${meta.width}x${meta.height} -> ${it.w}x${it.h})`);
      manifest.push({ file: it.file, license: "Pexels License (free commercial, no attribution)", source: it.page });
      ok++;
    } catch (e) {
      console.log(`FAIL ${it.file}: ${e.message}`);
    }
  }
  await writeFile(resolve(ROOT, "scripts/stock-manifest.json"), JSON.stringify(manifest, null, 2));
  console.log(`\nDone: ${ok}/${ITEMS.length} images. Manifest -> scripts/stock-manifest.json`);
}

main().catch((e) => { console.error(e); process.exit(1); });
