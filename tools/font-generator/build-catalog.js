#!/usr/bin/env node
/**
 * Writes tools/rn-fonts/catalog.json from every font package in packages/.
 * The rn-fonts CLI reads this file, so run it after regenerating any package:
 *
 *   yarn catalog
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const PACKAGES_DIR = path.join(ROOT, 'packages');
const CATALOG_PATH = path.join(ROOT, 'tools', 'rn-fonts', 'catalog.json');

// Reads the family → weight map back out of a generated src/index.ts.
// Keeps this in step with the output format in generate.js.
function parseFamilies(indexTs) {
  const families = {};
  let current = null;
  for (const line of indexTs.split('\n')) {
    const family = line.match(/^ {2}(\w+): \{$/);
    if (family) {
      current = family[1];
      families[current] = [];
      continue;
    }
    const weight = line.match(/^ {4}'(\w+)': '/);
    if (weight && current) families[current].push(weight[1]);
    if (line === '  },') current = null;
  }
  return families;
}

function main() {
  const entries = fs
    .readdirSync(PACKAGES_DIR)
    .sort()
    .map((dir) => {
      const pkgDir = path.join(PACKAGES_DIR, dir);
      const pkg = JSON.parse(fs.readFileSync(path.join(pkgDir, 'package.json'), 'utf8'));
      const indexTs = fs.readFileSync(path.join(pkgDir, 'src', 'index.ts'), 'utf8');
      const exportName = indexTs.match(/export const (\w+): TFontPackage/)[1];
      return {
        name: pkg.name,
        version: pkg.version,
        description: pkg.description,
        export: exportName,
        families: parseFamilies(indexTs),
      };
    });

  fs.mkdirSync(path.dirname(CATALOG_PATH), { recursive: true });
  fs.writeFileSync(CATALOG_PATH, JSON.stringify({ fonts: entries }, null, 2) + '\n');
  console.log(`✓ catalog.json written with ${entries.length} font packages`);
}

main();
