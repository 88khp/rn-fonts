# rn-fonts

Typed font packages for React Native, published under `@88khp`. Each package exports a weight map of PostScript names that resolves the same way on iOS and Android.

## Is it for you?

### Why use it

- You want custom fonts in React Native without guessing `fontFamily` strings.
- You want to add a font family in a few commands instead of wiring up its files by hand.

### The problem it solves

On iOS and Android, a font's PostScript name often differs, so `fontFamily` has to be different per platform. Each package here exports a typed weight map of names that resolve the same way on both platforms, so no `Platform.select` is needed. The CLI installs the packages you pick and sets up `react-native.config.js`.

### Who it's not for

- Expo projects that load fonts with `expo-font`. This package uses `react-native-asset` to link fonts into the native projects.
- Projects that need variable fonts. Every package ships static files only.

### What it doesn't do

- It doesn't load fonts at runtime. Fonts are linked into the native projects at build time.
- It doesn't let you pick individual weights in the CLI. It installs whole font packages.

---

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
