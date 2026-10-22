# rn-fonts

Typed font packages for React Native, published under `@88khp`. Each package exports a weight map of PostScript names that resolves the same way on iOS and Android.

## Add fonts

From your React Native app folder:

```bash
npx @88khp/rn-fonts
```

Pick the fonts you want. The CLI installs them, sets up `react-native.config.js`, and prints the import lines. Full docs live in [website/](website/).

## Repository layout

```
packages/            one @88khp/rn-font-* package per font family
tools/font-generator/  generates src/index.ts and README.md from the .ttf files
tools/rn-fonts/      the @88khp/rn-fonts CLI and its catalog.json
website/             Docusaurus docs site
```

## Development

```bash
yarn install
yarn generate packages/rn-font-<name>   # regenerate one package from its .ttf files
yarn catalog                            # refresh tools/rn-fonts/catalog.json
```

## License

MIT
