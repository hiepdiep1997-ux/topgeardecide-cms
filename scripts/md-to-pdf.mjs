/**
 * Renders HUONG-DAN-QUAN-TRI.md to a styled, print-ready HTML file.
 *   node scripts/md-to-pdf.mjs
 * Then a headless browser (Edge/Chrome) prints that HTML to PDF.
 * Needs `npm install --no-save marked`.
 */
import { marked } from "marked";
import { readFile, writeFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const md = await readFile(resolve(ROOT, "HUONG-DAN-QUAN-TRI.md"), "utf8");
// Drop the in-page anchor links in the table of contents (they don't matter in PDF)
const body = marked.parse(md);

const html = `<!doctype html>
<html lang="vi"><head><meta charset="utf-8" />
<style>
  @page { size: A4; margin: 18mm 16mm; }
  * { box-sizing: border-box; }
  body {
    font-family: "Segoe UI", "Arial", sans-serif;
    color: #1b2530; line-height: 1.55; font-size: 11.5px; margin: 0;
  }
  h1 { color: #155c39; font-size: 24px; border-bottom: 3px solid #ff7a1a; padding-bottom: 8px; margin: 0 0 6px; }
  h2 { color: #1f7a4d; font-size: 17px; margin: 22px 0 8px; border-bottom: 1px solid #dde4ea; padding-bottom: 4px; page-break-after: avoid; }
  h3 { color: #155c39; font-size: 13.5px; margin: 16px 0 6px; page-break-after: avoid; }
  p { margin: 6px 0; }
  a { color: #1f7a4d; text-decoration: none; word-break: break-all; }
  ul, ol { margin: 6px 0 6px 20px; padding: 0; }
  li { margin: 3px 0; }
  code { background: #eef2f6; padding: 1px 5px; border-radius: 4px; font-family: Consolas, monospace; font-size: 10.5px; }
  hr { border: 0; border-top: 1px solid #dde4ea; margin: 18px 0; }
  blockquote {
    border-left: 4px solid #ff7a1a; background: #fff8f2; margin: 10px 0; padding: 8px 14px; color: #3f4b58;
  }
  blockquote p { margin: 3px 0; }
  table { border-collapse: collapse; width: 100%; margin: 10px 0; font-size: 10.5px; page-break-inside: avoid; }
  th, td { border: 1px solid #dde4ea; padding: 6px 9px; text-align: left; vertical-align: top; }
  th { background: #1f7a4d; color: #fff; font-weight: 700; }
  tr:nth-child(even) td { background: #f7f9fb; }
  strong { color: #14331f; }
  h2, h3, table, blockquote { page-break-inside: avoid; }
</style></head>
<body>${body}</body></html>`;

await writeFile(resolve(ROOT, "HUONG-DAN-QUAN-TRI.html"), html);
console.log("wrote HUONG-DAN-QUAN-TRI.html");
