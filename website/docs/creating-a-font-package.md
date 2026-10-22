---
sidebar_position: 4
---

# Creating a font package

Each package is generated from its `.ttf` files. Only static fonts are supported. Variable fonts are skipped.

## 1. Add the fonts

Create `packages/rn-font-<name>/` with a `package.json` (copy an existing package), a `tsconfig.json`, and the font files:

```
packages/rn-font-<name>/
├── assets/fonts/      # one .ttf per weight, named Family-Weight.ttf
├── package.json
├── react-native.config.js
└── tsconfig.json
```

## 2. Generate

```bash
yarn generate packages/rn-font-<name>
```

This writes `src/index.ts` and `README.md`. Add `--dry-run` to print the output without writing it.

## 3. Refresh the catalog

```bash
yarn catalog
```

This updates `tools/rn-fonts/catalog.json`, which the CLI reads.

## 4. Build and publish

```bash
yarn workspace @88khp/rn-font-<name> build
```

Publish from the package folder with `npm publish --access public`.
