/**
 * Searches OPEN-LICENSE image sources for EXACT product-model photos:
 *   - Openverse API filtered to license=cc0,pdm (no attribution needed)
 *   - Wikimedia Commons search, keeping only Public Domain / CC0 files
 *
 * It only REPORTS candidates (title + license + url) so a human can confirm the
 * model actually matches before anything is downloaded. Nothing is written to
 * the site. Google/retailer/Amazon are intentionally NOT queried.
 *
 *   node scripts/find-product-images.mjs
 */
const UA = "TopGearDecide-image-finder/1.0";

const PRODUCTS = [
  ["whey", "Optimum Nutrition Gold Standard Whey"],
  ["whey", "Dymatize ISO100"],
  ["whey", "Isopure Zero Carb protein"],
  ["whey", "Naked Whey protein"],
  ["whey", "GHOST Whey protein"],
  ["greens", "Amazing Grass Greens Blend"],
  ["greens", "Bloom Nutrition Greens"],
  ["greens", "Garden of Life Perfect Food greens"],
  ["greens", "Nested Naturals Super Greens"],
  ["greens", "Athletic Greens AG1"],
  ["creatine", "Optimum Nutrition Micronized Creatine"],
  ["creatine", "Thorne Creatine"],
  ["creatine", "Nutricost Creatine Monohydrate"],
  ["creatine", "BulkSupplements Creatine Monohydrate"],
  ["creatine", "Optimum Nutrition Creatine 2500 capsules"],
  ["oliveoil", "Pompeian Robust olive oil"],
  ["oliveoil", "Graza olive oil"],
  ["oliveoil", "Colavita olive oil"],
  ["oliveoil", "Bertolli extra virgin olive oil"],
  ["bars", "Quest protein bar"],
  ["bars", "RXBAR protein bar"],
  ["bars", "Pure Protein bar"],
  ["bars", "Barebells protein bar"],
  ["bars", "ONE protein bar"],
  ["honey", "Comvita Manuka honey UMF 10"],
  ["honey", "Manukora Manuka honey"],
  ["honey", "Wedderspoon Manuka honey"],
  ["honey", "Comvita Manuka honey UMF 15"],
  ["honey", "Manukora MGO 200 Manuka honey"],
  ["electrolyte", "Liquid IV Hydration Multiplier"],
  ["electrolyte", "LMNT electrolyte"],
  ["electrolyte", "Nuun Sport tablets"],
  ["electrolyte", "DripDrop hydration"],
  ["electrolyte", "Ultima Replenisher electrolyte"],
  ["coffee", "Peet's Major Dickason's coffee"],
  ["coffee", "Death Wish Coffee"],
  ["coffee", "Cafe Bustelo espresso coffee"],
  ["coffee", "Starbucks Pike Place Roast"],
  ["coffee", "Lavazza Super Crema coffee"],
  ["shakes", "Ka'Chava shake"],
  ["shakes", "Huel Black Edition"],
  ["shakes", "Orgain Organic Meal"],
  ["shakes", "Soylent meal"],
  ["shakes", "OWYN protein shake"],
];

async function openverse(q) {
  const url = `https://api.openverse.org/v1/images/?q=${encodeURIComponent(q)}&license=cc0,pdm&page_size=3`;
  try {
    const r = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json" } });
    if (!r.ok) return [];
    const d = await r.json();
    return (d.results || []).map((x) => ({ src: "openverse", lic: x.license, title: (x.title || "").slice(0, 60), url: x.url }));
  } catch {
    return [];
  }
}

async function commons(q) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(
    q + " filetype:bitmap"
  )}&gsrnamespace=6&gsrlimit=3&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=1000&format=json&origin=*`;
  try {
    const r = await fetch(url, { headers: { "User-Agent": UA } });
    if (!r.ok) return [];
    const d = await r.json();
    const pages = (d.query && d.query.pages) || {};
    return Object.values(pages)
      .map((p) => {
        const ii = p.imageinfo && p.imageinfo[0];
        if (!ii) return null;
        const lic = ii.extmetadata && ii.extmetadata.LicenseShortName && ii.extmetadata.LicenseShortName.value;
        return { src: "commons", lic: lic || "?", title: (p.title || "").replace("File:", "").slice(0, 60), url: ii.thumburl };
      })
      .filter(Boolean)
      .filter((x) => /cc0|public domain|pd|no restriction/i.test(x.lic));
  } catch {
    return [];
  }
}

async function main() {
  for (const [cat, name] of PRODUCTS) {
    const [ov, cm] = await Promise.all([openverse(name), commons(name)]);
    const hits = [...ov, ...cm];
    if (!hits.length) {
      console.log(`— [${cat}] ${name}: no CC0/PD candidates`);
    } else {
      console.log(`✔ [${cat}] ${name}:`);
      for (const h of hits) console.log(`     (${h.src}/${h.lic}) "${h.title}"  ${h.url}`);
    }
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
