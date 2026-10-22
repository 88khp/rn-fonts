---
sidebar_position: 2
---

# Adding a font

## 1. Pick fonts with the CLI

```bash
npx @88khp/rn-fonts
```

You'll see a numbered list. Enter the numbers you want, such as `1,3`, or `all`. The CLI:

1. Installs the selected `@88khp/rn-font-*` packages with the package manager your app uses (npm, yarn or pnpm, detected from the lockfile).
2. Creates `react-native.config.js` if it doesn't exist. If it does, the CLI prints the asset lines to add and leaves the file alone.
3. Prints the import lines for each font.

To see the list without installing anything:

```bash
npx @88khp/rn-fonts --list
```

## 2. Link the fonts

```bash
npx react-native-asset
```

Run this again, then rebuild the app, whenever you add or update a font package.

## 3. Use the font

```tsx
import { manropeFonts } from '@88khp/rn-font-manrope';

const styles = StyleSheet.create({
  heading: { fontFamily: manropeFonts.manrope['700'], fontSize: 24 },
});
```

Each family has keys for its weights, such as `'400'` or `'700'`. Italic weights add an `i`, such as `'400i'`.
