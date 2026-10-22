# Manrope Font for React Native

Manrope font, packaged for React Native. Exports a typed weight map of PostScript names that resolves correctly on both iOS and Android, so there is no `Platform.select` and no `fontFamily` guessing.

| | |
|---|---|
| React Native | 0.60+ |
| iOS | ✓ |
| Android | ✓ |

## Install

```bash
npx @88khp/rn-fonts
```

Or install it directly:

```bash
npm install @88khp/rn-font-manrope
```

Add the font assets to `react-native.config.js` in your app root:

```js
module.exports = {
  assets: [
    './node_modules/@88khp/rn-font-manrope/assets/fonts',
  ],
};
```

Then link the fonts into your native projects and rebuild:

```bash
npx react-native-asset
```

Run `npx react-native-asset` again whenever you add or update a font package.

## Usage

### With Vajra UI

Register the font in your theme and use it through the `font` prop:

```ts
import { manropeFonts } from '@88khp/rn-font-manrope';

createVajraTheme({
  typography: {
    fonts: {
      families: {
        ...manropeFonts,
      },
    },
  },
});
```

```tsx
<Text font="manrope" fontWeight="200">Sample text</Text>
<Text font="manrope" fontWeight="300">Sample text</Text>
```

### Without Vajra UI

The export is a plain object, so use it however your app resolves fonts:

```ts
import { manropeFonts } from '@88khp/rn-font-manrope';

const styles = StyleSheet.create({
  // manropeFonts.manrope['200'] → 'Manrope-ExtraLight'
  heading: { fontFamily: manropeFonts.manrope['200'], fontSize: 24 },
  body: { fontFamily: manropeFonts.manrope['800'], fontSize: 16 },
});
```

## Font map

| Family | Weight | PostScript name |
|--------|--------|-----------------|
| `manrope` | `'200'` | `'Manrope-ExtraLight'` |
| `manrope` | `'300'` | `'Manrope-Light'` |
| `manrope` | `'400'` | `'Manrope-Regular'` |
| `manrope` | `'500'` | `'Manrope-Medium'` |
| `manrope` | `'600'` | `'Manrope-SemiBold'` |
| `manrope` | `'700'` | `'Manrope-Bold'` |
| `manrope` | `'800'` | `'Manrope-ExtraBold'` |

## License

MIT
