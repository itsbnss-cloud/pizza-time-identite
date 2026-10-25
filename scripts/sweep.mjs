// Supprime les fichiers « ._* » que macOS crée sur les disques exFAT/FAT
// (métadonnées AppleDouble) pour qu'ils ne partent ni dans les ZIP ni en ligne.
import fs from 'fs';
import path from 'path';

export function sweepAppleDouble(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.name.startsWith('._') || e.name === '.DS_Store') fs.rmSync(p, { force: true });
    else if (e.isDirectory()) sweepAppleDouble(p);
  }
}
