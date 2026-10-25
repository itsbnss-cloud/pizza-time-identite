// Rendu des pages d'un PDF en PNG (contrôle visuel) via pdf.js dans Chromium.
// Usage : node tools/pdf2png.mjs fichier.pdf dossier-sortie [échelle]
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import http from 'http';
const [,, pdfPath, outDir, scaleArg] = process.argv;
const scale = Number(scaleArg || 1.5);
fs.mkdirSync(outDir, { recursive: true });
const root = path.resolve('node_modules/pdfjs-dist');
const pdfData = fs.readFileSync(pdfPath);
const server = http.createServer((req, res) => {
  if (req.url === '/doc.pdf') { res.writeHead(200, { 'content-type': 'application/pdf' }); return res.end(pdfData); }
  if (req.url === '/') { res.writeHead(200, { 'content-type': 'text/html' }); return res.end('<html><body style="margin:0"></body></html>'); }
  const f = path.join(root, decodeURIComponent(req.url));
  if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': f.endsWith('.mjs') ? 'text/javascript' : 'application/octet-stream' });
  res.end(fs.readFileSync(f));
}).listen(0);
const port = server.address().port;
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(`http://localhost:${port}/`);
const pages = await page.evaluate(async ({ scale }) => {
  const pdfjs = await import('/build/pdf.min.mjs');
  pdfjs.GlobalWorkerOptions.workerSrc = '/build/pdf.worker.min.mjs';
  const doc = await pdfjs.getDocument({ url: '/doc.pdf', cMapUrl: '/cmaps/', cMapPacked: true, standardFontDataUrl: '/standard_fonts/' }).promise;
  const out = [];
  for (let i = 1; i <= doc.numPages; i++) {
    const p = await doc.getPage(i);
    const vp = p.getViewport({ scale });
    const c = document.createElement('canvas');
    c.width = vp.width; c.height = vp.height;
    await p.render({ canvasContext: c.getContext('2d'), viewport: vp }).promise;
    out.push({ w: vp.width / scale, h: vp.height / scale, data: c.toDataURL('image/png') });
  }
  return out;
}, { scale });
pages.forEach((p, i) => fs.writeFileSync(path.join(outDir, `page-${String(i + 1).padStart(2, '0')}.png`), Buffer.from(p.data.split(',')[1], 'base64')));
console.log(`${pages.length} page(s) — ${pages[0].w.toFixed(1)} × ${pages[0].h.toFixed(1)} pt`);
await browser.close(); server.close();
