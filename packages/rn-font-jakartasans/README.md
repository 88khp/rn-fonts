# Plus Font for React Native

Plus font, packaged for React Native. Exports a typed weight map of PostScript names that resolves correctly on both iOS and Android, so there is no `Platform.select` and no `fontFamily` guessing.

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
npm install @88khp/rn-font-jakartasans
```

Add the font assets to `react-native.config.js` in your app root:

```js
module.exports = {
  assets: [
    './node_modules/@88khp/rn-font-jakartasans/assets/fonts',
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
import { plusFonts } from '@88khp/rn-font-jakartasans';

createVajraTheme({
  typography: {
    fonts: {
      families: {
        ...plusFonts,
      },
    },
  },
});
```

```tsx
<Text font="plusJakartaSans" fontWeight="200">Sample text</Text>
<Text font="plusJakartaSans" fontWeight="300">Sample text</Text>
```

### Italic

Pass `fontStyle="italic"` and the design system resolves the correct italic font file:

```tsx
<Text font="plusJakartaSans" fontStyle="italic">Good morning.</Text>
```

### Without Vajra UI

The export is a plain object, so use it however your app resolves fonts:

```ts
import { plusFonts } from '@88khp/rn-font-jakartasans';

const styles = StyleSheet.create({
  // plusFonts.plusJakartaSans['200'] → 'PlusJakartaSans-ExtraLight'
  heading: { fontFamily: plusFonts.plusJakartaSans['200'], fontSize: 24 },
  body: { fontFamily: plusFonts.plusJakartaSans['800'], fontSize: 16 },
  italic: { fontFamily: plusFonts.plusJakartaSans['200i'], fontSize: 16 },
});
```

## Font map

| Family | Weight | PostScript name |
|--------|--------|-----------------|
| `plusJakartaSans` | `'200'` | `'PlusJakartaSans-ExtraLight'` |
| `plusJakartaSans` | `'300'` | `'PlusJakartaSans-Light'` |
| `plusJakartaSans` | `'400'` | `'PlusJakartaSans-Regular'` |
| `plusJakartaSans` | `'500'` | `'PlusJakartaSans-Medium'` |
| `plusJakartaSans` | `'600'` | `'PlusJakartaSans-SemiBold'` |
| `plusJakartaSans` | `'700'` | `'PlusJakartaSans-Bold'` |
| `plusJakartaSans` | `'800'` | `'PlusJakartaSans-ExtraBold'` |
| `plusJakartaSans` | `'200i'` | `'PlusJakartaSans-ExtraLightItalic'` |
| `plusJakartaSans` | `'300i'` | `'PlusJakartaSans-LightItalic'` |
| `plusJakartaSans` | `'400i'` | `'PlusJakartaSans-Italic'` |
| `plusJakartaSans` | `'500i'` | `'PlusJakartaSans-MediumItalic'` |
| `plusJakartaSans` | `'600i'` | `'PlusJakartaSans-SemiBoldItalic'` |
| `plusJakartaSans` | `'700i'` | `'PlusJakartaSans-BoldItalic'` |
| `plusJakartaSans` | `'800i'` | `'PlusJakartaSans-ExtraBoldItalic'` |

## License

MIT
