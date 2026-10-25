// Planche contact de pages PNG : node tools/montage.mjs sortie.png colonnes img1 img2 ...
import { chromium } from 'playwright';
import fs from 'fs';
const [,, out, cols, ...files] = process.argv;
const html = `<body style="margin:0;background:#555;display:grid;grid-template-columns:repeat(${cols},1fr);gap:6px;padding:6px;width:1600px">${files.map((f) => `<figure style="margin:0;color:#fff;font:12px sans-serif"><img style="width:100%;display:block" src="data:image/png;base64,${fs.readFileSync(f).toString('base64')}">${f.split('/').pop()}</figure>`).join('')}</body>`;
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1612, height: 900 } });
await p.setContent(html); await p.screenshot({ path: out, fullPage: true }); await b.close();
