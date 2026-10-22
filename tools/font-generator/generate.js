#!/usr/bin/env node
/**
 * Generates src/index.ts and README.md for one font package from the .ttf
 * files in its assets/fonts folder.
 *
 * Usage:
 *   node tools/font-generator/generate.js packages/rn-font-inter
 *   node tools/font-generator/generate.js packages/rn-font-inter --dry-run
 */

const fs = require('fs');
const path = require('path');
const fontkit = require('fontkit');

// ─── Weight token inference ───────────────────────────────────────────────────

// Order matters: longer or more specific keywords must come before shorter ones
// (e.g. 'extrabold' before 'bold', 'extralight' before 'light').
const WEIGHT_MAP = [
  [['thin'], '100'],
  [['extralight', 'extra light', 'ultralight'], '200'],
  [['light'], '300'],
  [['regular', 'normal', 'book'], '400'],
  [['medium'], '500'],
  [['demibold', 'demi bold', 'semibold', 'semi bold'], '600'],
  [['extrabold', 'extra bold', 'ultrabold', 'ultra bold'], '800'],
  [['bold'], '700'],
  [['black', 'heavy'], '900'],
];

const WEIGHT_ORDER = ['100', '200', '300', '400', '500', '600', '700', '800', '900'];

const normalise = (name) => name.toLowerCase().replace(/-/g, ' ').trim();

function inferWeightToken(name) {
  const normalised = normalise(name);
  // "Italic" or "Oblique" alone (no weight keyword) implies regular weight
  if (normalised === 'italic' || normalised === 'oblique') return '400';
  for (const [keywords, token] of WEIGHT_MAP) {
    if (keywords.some((kw) => normalised.includes(kw))) return token;
  }
  return null;
}

const isItalic = (name) => {
  const normalised = normalise(name);
  return normalised.includes('italic') || normalised.includes('oblique');
};

// ─── Font inspection ──────────────────────────────────────────────────────────

function inspectFont(ttfPath) {
  const font = fontkit.openSync(ttfPath);
  const name = (key) => font.getName(key) || '';
  return {
    path: ttfPath,
    family: name('fontFamily'),
    subfamily: name('fontSubfamily'),
    postscript: name('postscriptName'),
    typoFamily: name('preferredFamily'),
    typoSub: name('preferredSubfamily'),
    isVariable: Object.keys(font.variationAxes || {}).length > 0,
  };
}

// ─── Family / weight map ──────────────────────────────────────────────────────

const capitalise = (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

// 'Newsreader 14pt' → 'newsreader14pt', 'JetBrains Mono' → 'jetbrainsMono'
function familyToAlias(family) {
  const [first, ...rest] = family.trim().split(/\s+/);
  return first.toLowerCase() + rest.map(capitalise).join('');
}

// Groups fonts by family and returns { alias: { token: postscript } }.
// Normal weights use numeric keys ('400'); italic weights add an 'i' ('400i').
function buildFamilyMap(infos) {
  const families = {};

  for (const info of infos) {
    if (info.isVariable) continue;

    const rawFamily = (info.typoFamily || info.family || 'font').trim();
    const alias = familyToAlias(rawFamily);
    const sub = info.typoSub || info.subfamily;
    const nameForInference = sub || info.postscript;
    const token = inferWeightToken(nameForInference);
    if (!token) {
      console.log(`  ⚠  Could not infer token for: ${path.basename(info.path)} (subfamily: "${sub}")`);
      continue;
    }

    const key = isItalic(nameForInference) ? `${token}i` : token;
    families[alias] = families[alias] || {};
    if (key in families[alias]) {
      console.log(`  ⚠  Duplicate token '${key}' in '${alias}', skipping ${path.basename(info.path)}`);
      continue;
    }
    families[alias][key] = info.postscript;
  }

  const variable = infos.filter((i) => i.isVariable).map((i) => path.basename(i.path));
  if (variable.length) {
    console.log('  ℹ  Variable font(s) skipped (these packages are static-only):');
    variable.forEach((v) => console.log(`       ${v}`));
  }
  return families;
}

// ─── src/index.ts ─────────────────────────────────────────────────────────────

const orderedKeys = (wmap) => [
  ...WEIGHT_ORDER.filter((t) => t in wmap),
  ...WEIGHT_ORDER.filter((t) => `${t}i` in wmap).map((t) => `${t}i`),
];

function exportNameFor(infos) {
  const first = infos.find((i) => !i.isVariable) || infos[0];
  const base = (first.typoFamily || first.family || 'font').trim().split(/\s+/)[0];
  return base.charAt(0).toLowerCase() + base.slice(1) + 'Fonts';
}

function buildIndexTs(exportName, familyMap) {
  const allTokens = new Set(Object.values(familyMap).flatMap((w) => Object.keys(w)));
  const union = orderedKeys(Object.fromEntries([...allTokens].map((t) => [t, true])))
    .map((t) => `'${t}'`)
    .join(' | ');
  const hasItalic = [...allTokens].some((t) => t.endsWith('i'));
  const italicNote = hasItalic ? "\n * Italic keys use the weight suffixed with 'i' (e.g. '400i', '700i')." : '';

  const familyBlocks = Object.entries(familyMap).map(([alias, wmap]) => {
    const entries = orderedKeys(wmap).map((k) => `    '${k}': '${wmap[k]}',`).join('\n');
    return `  ${alias}: {\n${entries}\n  },`;
  });

  return `/**
 * Font package: ${exportName}
 * Generated by tools/font-generator/generate.js. Edit as needed.
 *
 * Values are PostScript names, which work on both iOS and Android.${italicNote}
 */

export type TFontWeightToken = ${union};
export type TFontFamilyMap = Partial<Record<TFontWeightToken, string>>;
export type TFontPackage = Record<string, TFontFamilyMap>;

export const ${exportName}: TFontPackage = {
${familyBlocks.join('\n')}
};
`;
}

// ─── README.md ────────────────────────────────────────────────────────────────

function buildReadme(pkgName, exportName, displayName, familyMap) {
  const aliases = Object.keys(familyMap);
  const fontMapRows = aliases.flatMap((alias) =>
    orderedKeys(familyMap[alias]).map((k) => `| \`${alias}\` | \`'${k}'\` | \`'${familyMap[alias][k]}'\` |`),
  );

  const firstAlias = aliases[0];
  const firstWeight = orderedKeys(familyMap[firstAlias])[0];
  const italicAlias = aliases.find((a) => Object.keys(familyMap[a]).some((k) => k.endsWith('i')));

  const textExamples = aliases
    .flatMap((alias) =>
      WEIGHT_ORDER.filter((t) => t in familyMap[alias])
        .slice(0, 2)
        .map((t) => `<Text font="${alias}" fontWeight="${t}">Sample text</Text>`),
    )
    .join('\n');

  const standalone = aliases
    .flatMap((alias) => {
      const tokens = WEIGHT_ORDER.filter((t) => t in familyMap[alias]);
      const lines = [];
      if (tokens.length) {
        const first = tokens[0];
        const last = tokens[tokens.length - 1];
        lines.push(`  // ${exportName}.${alias}['${first}'] → '${familyMap[alias][first]}'`);
        lines.push(`  heading: { fontFamily: ${exportName}.${alias}['${first}'], fontSize: 24 },`);
        if (tokens.length > 1) {
          lines.push(`  body: { fontFamily: ${exportName}.${alias}['${last}'], fontSize: 16 },`);
        }
      }
      const italic = orderedKeys(familyMap[alias]).find((k) => k.endsWith('i'));
      if (italic) {
        lines.push(`  italic: { fontFamily: ${exportName}.${alias}['${italic}'], fontSize: 16 },`);
      }
      return lines;
    })
    .join('\n');

  const italicSection = italicAlias
    ? `
### Italic

Pass \`fontStyle="italic"\` and the design system resolves the correct italic font file:

\`\`\`tsx
<Text font="${italicAlias}" fontStyle="italic">Good morning.</Text>
\`\`\`
`
    : '';

  return `# ${displayName} Font for React Native

${displayName} font, packaged for React Native. Exports a typed weight map of PostScript names that resolves correctly on both iOS and Android, so there is no \`Platform.select\` and no \`fontFamily\` guessing.

| | |
|---|---|
| React Native | 0.60+ |
| iOS | ✓ |
| Android | ✓ |

## Install

\`\`\`bash
npx @88khp/rn-fonts
\`\`\`

Or install it directly:

\`\`\`bash
npm install ${pkgName}
\`\`\`

Add the font assets to \`react-native.config.js\` in your app root:

\`\`\`js
module.exports = {
  assets: [
    './node_modules/${pkgName}/assets/fonts',
  ],
};
\`\`\`

Then link the fonts into your native projects and rebuild:

\`\`\`bash
npx react-native-asset
\`\`\`

Run \`npx react-native-asset\` again whenever you add or update a font package.

## Usage

### With Vajra UI

Register the font in your theme and use it through the \`font\` prop:

\`\`\`ts
import { ${exportName} } from '${pkgName}';

createVajraTheme({
  typography: {
    fonts: {
      families: {
        ...${exportName},
      },
    },
  },
});
\`\`\`

\`\`\`tsx
${textExamples}
\`\`\`
${italicSection}
### Without Vajra UI

The export is a plain object, so use it however your app resolves fonts:

\`\`\`ts
import { ${exportName} } from '${pkgName}';

const styles = StyleSheet.create({
${standalone}
});
\`\`\`

## Font map

| Family | Weight | PostScript name |
|--------|--------|-----------------|
${fontMapRows.join('\n')}

## License

MIT
`;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const pkgDir = path.resolve(args.find((a) => !a.startsWith('--')) || '.');
  const fontsDir = path.join(pkgDir, 'assets', 'fonts');

  const ttfFiles = fs
    .readdirSync(fontsDir)
    .filter((f) => f.toLowerCase().endsWith('.ttf') && !f.startsWith('<'))
    .sort()
    .map((f) => path.join(fontsDir, f));
  if (!ttfFiles.length) {
    console.log(`✗ No .ttf files found in ${fontsDir}`);
    process.exit(1);
  }

  const infos = ttfFiles.map(inspectFont);
  const familyMap = buildFamilyMap(infos);
  if (!Object.keys(familyMap).length) {
    console.log('✗ No weight tokens mapped. Aborting.');
    process.exit(1);
  }

  const exportName = exportNameFor(infos);
  const pkgJson = JSON.parse(fs.readFileSync(path.join(pkgDir, 'package.json'), 'utf8'));
  const first = infos.find((i) => !i.isVariable) || infos[0];
  const displayName = (first.typoFamily || first.family || 'Font').trim().split(/\s+/)[0];

  const indexTs = buildIndexTs(exportName, familyMap);
  const readme = buildReadme(pkgJson.name, exportName, displayName, familyMap);

  if (dryRun) {
    console.log(indexTs);
    console.log(readme);
    return;
  }

  fs.writeFileSync(path.join(pkgDir, 'src', 'index.ts'), indexTs);
  fs.writeFileSync(path.join(pkgDir, 'README.md'), readme);
  console.log(`✓ ${pkgJson.name}: src/index.ts and README.md written (${exportName})`);
}

module.exports = { inferWeightToken, familyToAlias, buildFamilyMap, buildIndexTs, buildReadme, exportNameFor };

if (require.main === module) main();
