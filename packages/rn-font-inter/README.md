# Inter Font for React Native

Inter font, packaged for React Native. Exports a typed weight map of PostScript names that resolves correctly on both iOS and Android, so there is no `Platform.select` and no `fontFamily` guessing.

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
npm install @88khp/rn-font-inter
```

Add the font assets to `react-native.config.js` in your app root:

```js
module.exports = {
  assets: [
    './node_modules/@88khp/rn-font-inter/assets/fonts',
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
import { interFonts } from '@88khp/rn-font-inter';

createVajraTheme({
  typography: {
    fonts: {
      families: {
        ...interFonts,
      },
    },
  },
});
```

```tsx
<Text font="inter18pt" fontWeight="100">Sample text</Text>
<Text font="inter18pt" fontWeight="200">Sample text</Text>
<Text font="inter24pt" fontWeight="100">Sample text</Text>
<Text font="inter24pt" fontWeight="200">Sample text</Text>
<Text font="inter28pt" fontWeight="100">Sample text</Text>
<Text font="inter28pt" fontWeight="200">Sample text</Text>
```

### Italic

Pass `fontStyle="italic"` and the design system resolves the correct italic font file:

```tsx
<Text font="inter18pt" fontStyle="italic">Good morning.</Text>
```

### Without Vajra UI

The export is a plain object, so use it however your app resolves fonts:

```ts
import { interFonts } from '@88khp/rn-font-inter';

const styles = StyleSheet.create({
  // interFonts.inter18pt['100'] → 'Inter18pt-Thin'
  heading: { fontFamily: interFonts.inter18pt['100'], fontSize: 24 },
  body: { fontFamily: interFonts.inter18pt['900'], fontSize: 16 },
  italic: { fontFamily: interFonts.inter18pt['100i'], fontSize: 16 },
  // interFonts.inter24pt['100'] → 'Inter24pt-Thin'
  heading: { fontFamily: interFonts.inter24pt['100'], fontSize: 24 },
  body: { fontFamily: interFonts.inter24pt['900'], fontSize: 16 },
  italic: { fontFamily: interFonts.inter24pt['100i'], fontSize: 16 },
  // interFonts.inter28pt['100'] → 'Inter28pt-Thin'
  heading: { fontFamily: interFonts.inter28pt['100'], fontSize: 24 },
  body: { fontFamily: interFonts.inter28pt['900'], fontSize: 16 },
  italic: { fontFamily: interFonts.inter28pt['100i'], fontSize: 16 },
});
```

## Font map

| Family | Weight | PostScript name |
|--------|--------|-----------------|
| `inter18pt` | `'100'` | `'Inter18pt-Thin'` |
| `inter18pt` | `'200'` | `'Inter18pt-ExtraLight'` |
| `inter18pt` | `'300'` | `'Inter18pt-Light'` |
| `inter18pt` | `'400'` | `'Inter18pt-Regular'` |
| `inter18pt` | `'500'` | `'Inter18pt-Medium'` |
| `inter18pt` | `'600'` | `'Inter18pt-SemiBold'` |
| `inter18pt` | `'700'` | `'Inter18pt-Bold'` |
| `inter18pt` | `'800'` | `'Inter18pt-ExtraBold'` |
| `inter18pt` | `'900'` | `'Inter18pt-Black'` |
| `inter18pt` | `'100i'` | `'Inter18pt-ThinItalic'` |
| `inter18pt` | `'200i'` | `'Inter18pt-ExtraLightItalic'` |
| `inter18pt` | `'300i'` | `'Inter18pt-LightItalic'` |
| `inter18pt` | `'400i'` | `'Inter18pt-Italic'` |
| `inter18pt` | `'500i'` | `'Inter18pt-MediumItalic'` |
| `inter18pt` | `'600i'` | `'Inter18pt-SemiBoldItalic'` |
| `inter18pt` | `'700i'` | `'Inter18pt-BoldItalic'` |
| `inter18pt` | `'800i'` | `'Inter18pt-ExtraBoldItalic'` |
| `inter18pt` | `'900i'` | `'Inter18pt-BlackItalic'` |
| `inter24pt` | `'100'` | `'Inter24pt-Thin'` |
| `inter24pt` | `'200'` | `'Inter24pt-ExtraLight'` |
| `inter24pt` | `'300'` | `'Inter24pt-Light'` |
| `inter24pt` | `'400'` | `'Inter24pt-Regular'` |
| `inter24pt` | `'500'` | `'Inter24pt-Medium'` |
| `inter24pt` | `'600'` | `'Inter24pt-SemiBold'` |
| `inter24pt` | `'700'` | `'Inter24pt-Bold'` |
| `inter24pt` | `'800'` | `'Inter24pt-ExtraBold'` |
| `inter24pt` | `'900'` | `'Inter24pt-Black'` |
| `inter24pt` | `'100i'` | `'Inter24pt-ThinItalic'` |
| `inter24pt` | `'200i'` | `'Inter24pt-ExtraLightItalic'` |
| `inter24pt` | `'300i'` | `'Inter24pt-LightItalic'` |
| `inter24pt` | `'400i'` | `'Inter24pt-Italic'` |
| `inter24pt` | `'500i'` | `'Inter24pt-MediumItalic'` |
| `inter24pt` | `'600i'` | `'Inter24pt-SemiBoldItalic'` |
| `inter24pt` | `'700i'` | `'Inter24pt-BoldItalic'` |
| `inter24pt` | `'800i'` | `'Inter24pt-ExtraBoldItalic'` |
| `inter24pt` | `'900i'` | `'Inter24pt-BlackItalic'` |
| `inter28pt` | `'100'` | `'Inter28pt-Thin'` |
| `inter28pt` | `'200'` | `'Inter28pt-ExtraLight'` |
| `inter28pt` | `'300'` | `'Inter28pt-Light'` |
| `inter28pt` | `'400'` | `'Inter28pt-Regular'` |
| `inter28pt` | `'500'` | `'Inter28pt-Medium'` |
| `inter28pt` | `'600'` | `'Inter28pt-SemiBold'` |
| `inter28pt` | `'700'` | `'Inter28pt-Bold'` |
| `inter28pt` | `'800'` | `'Inter28pt-ExtraBold'` |
| `inter28pt` | `'900'` | `'Inter28pt-Black'` |
| `inter28pt` | `'100i'` | `'Inter28pt-ThinItalic'` |
| `inter28pt` | `'200i'` | `'Inter28pt-ExtraLightItalic'` |
| `inter28pt` | `'300i'` | `'Inter28pt-LightItalic'` |
| `inter28pt` | `'400i'` | `'Inter28pt-Italic'` |
| `inter28pt` | `'500i'` | `'Inter28pt-MediumItalic'` |
| `inter28pt` | `'600i'` | `'Inter28pt-SemiBoldItalic'` |
| `inter28pt` | `'700i'` | `'Inter28pt-BoldItalic'` |
| `inter28pt` | `'800i'` | `'Inter28pt-ExtraBoldItalic'` |
| `inter28pt` | `'900i'` | `'Inter28pt-BlackItalic'` |

## License

MIT
