import fs from 'node:fs';
import path from 'node:path';

const outDir = path.join(process.cwd(), 'out');
const noJekyllPath = path.join(outDir, '.nojekyll');

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(noJekyllPath, '', 'utf-8');

console.log('✓ GitHub Pages marker → out/.nojekyll');