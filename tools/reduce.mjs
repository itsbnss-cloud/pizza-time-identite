import { chromium } from 'playwright';
import fs from 'fs';
const d=f=>'data:image/svg+xml;base64,'+fs.readFileSync('assets/logos/'+f).toString('base64');
const rows=[['01_logo-principal/pizza-time_logo-principal.svg',[100,140,180,220,260],'#FFF6E9'],['02_declinaisons/pizza-time_logo-sans-cadre.svg',[50,64,80,100],'#FFF6E9'],['02_declinaisons/pizza-time_horizontal_vert.svg',[64,80,100,120,140],'#FFF6E9'],['02_declinaisons/pizza-time_signature-lineaire_creme.svg',[100,140,180,220],'#0E4725']];
let h='<body style="margin:10px;font:11px sans-serif">';
for(const [f,ws,bg] of rows){h+=`<div style="background:${bg};display:flex;gap:30px;align-items:flex-end;padding:14px;margin-bottom:6px">`;for(const w of ws)h+=`<figure style="margin:0"><img src="${d(f)}" style="width:${w}px;display:block"><figcaption style="color:#C72F27">${w}px</figcaption></figure>`;h+='</div>';}
const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1100,height:600},deviceScaleFactor:1}); await p.setContent(h); await p.screenshot({path:process.argv[2],fullPage:true}); await b.close();
