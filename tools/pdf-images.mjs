// Liste, page par page, les images matricielles d'un PDF (contrôle de netteté vectorielle).
import { chromium } from 'playwright';
import fs from 'fs'; import path from 'path'; import http from 'http';
const pdf = fs.readFileSync(process.argv[2]); const root = path.resolve('node_modules/pdfjs-dist');
const srv = http.createServer((q, r) => { if (q.url === '/d.pdf') return r.end(pdf); if (q.url === '/') return r.end('<html></html>'); const f = path.join(root, q.url); r.writeHead(200, { 'content-type': f.endsWith('.mjs') ? 'text/javascript' : 'application/octet-stream' }); r.end(fs.existsSync(f) ? fs.readFileSync(f) : ''); }).listen(0);
const b = await chromium.launch(); const p = await b.newPage(); await p.goto(`http://localhost:${srv.address().port}/`);
const res = await p.evaluate(async () => { const pj = await import('/build/pdf.min.mjs'); pj.GlobalWorkerOptions.workerSrc = '/build/pdf.worker.min.mjs'; const d = await pj.getDocument('/d.pdf').promise; const out = {}; for (let i = 1; i <= d.numPages; i++) { const ops = await (await d.getPage(i)).getOperatorList(); const n = ops.fnArray.filter((f) => f === pj.OPS.paintImageXObject || f === pj.OPS.paintInlineImageXObject).length; if (n) out[i] = n; } return out; });
console.log(JSON.stringify(res)); await b.close(); srv.close();
