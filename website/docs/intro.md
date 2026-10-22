---
sidebar_position: 1
---

# RN Fonts

Typed font packages for React Native. Each package exports a weight map of PostScript names, so a font resolves the same way on iOS and Android with no `Platform.select` and no `fontFamily` guessing.

## Quick start

From your React Native app folder:

```bash
npx @88khp/rn-fonts
```

The CLI lists the available fonts, installs the ones you pick, and sets up `react-native.config.js`. Then link the fonts into the native projects:

```bash
npx react-native-asset
```

See [Adding a font](./add-a-font) for the full flow and [Packages](./packages) for the list of fonts.
