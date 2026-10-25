// Planche de contrôle : chaque version sur crème / vert / rouge.
import { chromium } from 'playwright';
import fs from 'fs';
const m = JSON.parse(fs.readFileSync('content/generated/manifest.json','utf8')).assets.filter(a=>a.path && a.path.endsWith('.svg') && a.status!=='reference');
let h='<body style="margin:0;font:12px sans-serif;display:grid;grid-template-columns:200px repeat(3,1fr)">';
for(const a of m){const d='data:image/svg+xml;base64,'+fs.readFileSync('assets/'+a.path).toString('base64');
 h+=`<div style="padding:8px;border-bottom:1px solid #ccc">${a.src}<br><b>${a.id}</b></div>`;
 for(const bg of ['#FFF6E9','#0E4725','#C72F27']) h+=`<div style="background:${bg};padding:16px;display:flex;justify-content:center;align-items:center;height:110px"><img src="${d}" style="max-height:100px;max-width:90%"></div>`;}
const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1300,height:800}}); await p.setContent(h); await p.screenshot({path:process.argv[2],fullPage:true}); await b.close();
