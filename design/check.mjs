// Guard for the design/ folder. Run: node design/check.mjs
// Fails if a required file is missing, anything references the network,
// or a url()/href/src in the CSS and sample pages points at a file that does not exist.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, resolve, extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const designDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(designDir, '..');
const problems = [];

const required = [
  'design/README.md',
  'design/tokens.css',
  'design/fonts.css',
  'design/print.css',
  'design/print-standard.md',
  'design/departures.md',
  'design/sample/index.html',
  'design/sample/carry-card.html',
  'design/sample/leader-card-front.html',
  'design/sample/leader-card-back.html',
  'design/sample/registrar-sheet.html',
  'design/sample/nurse-record.html',
  'design/fonts/inter-latin-400-normal.woff2',
  'design/fonts/inter-latin-500-normal.woff2',
  'design/fonts/inter-latin-600-normal.woff2',
  'design/fonts/cormorant-garamond-latin-500-normal.woff2',
  'design/fonts/cormorant-garamond-latin-600-normal.woff2',
  'design/fonts/material-icons.woff2',
  'design/fonts/LICENSE-inter.txt',
  'design/fonts/LICENSE-cormorant-garamond.txt',
  'design/fonts/LICENSE-material-icons.txt',
  'THIRD_PARTY_NOTICES.md',
  'docs/decisions/0002-conform-look-and-print-first-standard.md',
];
for (const f of required) {
  if (!existsSync(join(repoRoot, f))) problems.push(`missing required file: ${f}`);
}

function walk(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

const webFiles = walk(designDir).filter((p) => ['.css', '.html'].includes(extname(p)));
const external = /(https?:)?\/\/[a-z0-9-]+\.[a-z]{2,}/i;

for (const file of webFiles) {
  const text = readFileSync(file, 'utf8');
  const rel = relative(repoRoot, file);

  if (external.test(text)) problems.push(`${rel}: references a network address (no CDN or external URL allowed)`);
  if (/@import/i.test(text)) problems.push(`${rel}: uses @import (link files explicitly)`);

  const refs = [];
  for (const m of text.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g)) refs.push(m[1]);
  if (extname(file) === '.html') {
    for (const m of text.matchAll(/\s(?:href|src)=["']([^"'#]+)["']/g)) refs.push(m[1]);
  }
  for (const ref of refs) {
    if (ref.startsWith('data:')) continue;
    if (!existsSync(resolve(dirname(file), ref))) problems.push(`${rel}: ${ref} does not exist`);
  }
}

if (problems.length) {
  console.error(problems.map((p) => `FAIL ${p}`).join('\n'));
  process.exit(1);
}
console.log(`design check passed (${required.length} required files, ${webFiles.length} CSS/HTML files)`);
