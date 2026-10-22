#!/usr/bin/env node
/**
 * rn-fonts: pick font packages from the 88khp catalog and add them to the
 * React Native app in the current folder.
 *
 *   npx @88khp/rn-fonts          pick fonts interactively
 *   npx @88khp/rn-fonts --list   print the available fonts and exit
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { spawnSync } = require('child_process');

const catalog = require('../catalog.json').fonts;
const APP_DIR = process.cwd();
const CONFIG_PATH = path.join(APP_DIR, 'react-native.config.js');

const summary = (font) => {
  const families = Object.keys(font.families).length;
  const weights = Object.values(font.families).reduce((n, w) => n + w.length, 0);
  return `${families} famil${families === 1 ? 'y' : 'ies'}, ${weights} weights`;
};

function printCatalog() {
  catalog.forEach((font, i) => {
    console.log(`  ${i + 1}) ${font.name}  ${summary(font)}`);
    console.log(`     ${font.description}`);
  });
}

function ask(rl, question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

// "1,3" → [0, 2]. "all" → every font. Anything out of range is ignored.
function parseSelection(answer) {
  const trimmed = answer.trim().toLowerCase();
  if (trimmed === 'all') return catalog.map((_, i) => i);
  return [...new Set(trimmed.split(/[\s,]+/).map(Number))]
    .filter((n) => Number.isInteger(n) && n >= 1 && n <= catalog.length)
    .map((n) => n - 1);
}

function detectInstaller() {
  if (fs.existsSync(path.join(APP_DIR, 'yarn.lock'))) return ['yarn', ['add']];
  if (fs.existsSync(path.join(APP_DIR, 'pnpm-lock.yaml'))) return ['pnpm', ['add']];
  return ['npm', ['install']];
}

function installPackages(names) {
  const [bin, args] = detectInstaller();
  console.log(`\n→ ${bin} ${[...args, ...names].join(' ')}`);
  const result = spawnSync(bin, [...args, ...names], { cwd: APP_DIR, stdio: 'inherit' });
  if (result.status !== 0) throw new Error(`${bin} exited with code ${result.status}`);
}

// Adds the packages' asset folders to react-native.config.js. An existing file
// is never rewritten, because it may hold other config. Missing entries are
// printed for the user to paste in instead.
function updateRnConfig(names) {
  const assetLines = names.map((n) => `    './node_modules/${n}/assets/fonts',`);

  if (!fs.existsSync(CONFIG_PATH)) {
    fs.writeFileSync(
      CONFIG_PATH,
      `module.exports = {\n  assets: [\n${assetLines.join('\n')}\n  ],\n};\n`,
    );
    console.log('✓ react-native.config.js created');
    return;
  }

  const existing = fs.readFileSync(CONFIG_PATH, 'utf8');
  const missing = names.filter((n) => !existing.includes(`node_modules/${n}/assets/fonts`));
  if (!missing.length) {
    console.log('✓ react-native.config.js already has these fonts');
    return;
  }
  console.log('\n⚠  react-native.config.js exists. Add these lines to its assets array:');
  missing.forEach((n) => console.log(`    './node_modules/${n}/assets/fonts',`));
}

function printUsage(selected) {
  console.log('\nUse them in your code:');
  selected.forEach((font) => {
    console.log(`  import { ${font.export} } from '${font.name}';`);
  });
  console.log('\nThen link the fonts into the native projects and rebuild:');
  console.log('  npx react-native-asset');
}

async function main() {
  if (process.argv.includes('--list')) {
    printCatalog();
    return;
  }

  if (!fs.existsSync(path.join(APP_DIR, 'package.json'))) {
    console.error('✗ No package.json here. Run rn-fonts from your React Native app folder.');
    process.exit(1);
  }

  console.log('Available fonts:\n');
  printCatalog();

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const answer = await ask(rl, '\nWhich fonts? (e.g. 1,3 or all, blank to cancel): ');
  rl.close();

  const indexes = parseSelection(answer);
  if (!indexes.length) {
    console.log('Nothing selected.');
    return;
  }

  const selected = indexes.map((i) => catalog[i]);
  const names = selected.map((f) => f.name);
  installPackages(names);
  updateRnConfig(names);
  printUsage(selected);
}

main().catch((err) => {
  console.error(`✗ ${err.message}`);
  process.exit(1);
});
