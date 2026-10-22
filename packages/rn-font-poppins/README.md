# Poppins Font for React Native

Poppins font, packaged for React Native. Exports a typed weight map of PostScript names that resolves correctly on both iOS and Android, so there is no `Platform.select` and no `fontFamily` guessing.

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
npm install @88khp/rn-font-poppins
```

Add the font assets to `react-native.config.js` in your app root:

```js
module.exports = {
  assets: [
    './node_modules/@88khp/rn-font-poppins/assets/fonts',
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
import { poppinsFonts } from '@88khp/rn-font-poppins';

createVajraTheme({
  typography: {
    fonts: {
      families: {
        ...poppinsFonts,
      },
    },
  },
});
```

```tsx
<Text font="poppins" fontWeight="100">Sample text</Text>
<Text font="poppins" fontWeight="200">Sample text</Text>
```

### Without Vajra UI

The export is a plain object, so use it however your app resolves fonts:

```ts
import { poppinsFonts } from '@88khp/rn-font-poppins';

const styles = StyleSheet.create({
  // poppinsFonts.poppins['100'] → 'Poppins-Thin'
  heading: { fontFamily: poppinsFonts.poppins['100'], fontSize: 24 },
  body: { fontFamily: poppinsFonts.poppins['900'], fontSize: 16 },
});
```

## Font map

| Family | Weight | PostScript name |
|--------|--------|-----------------|
| `poppins` | `'100'` | `'Poppins-Thin'` |
| `poppins` | `'200'` | `'Poppins-ExtraLight'` |
| `poppins` | `'300'` | `'Poppins-Light'` |
| `poppins` | `'400'` | `'Poppins-Regular'` |
| `poppins` | `'500'` | `'Poppins-Medium'` |
| `poppins` | `'600'` | `'Poppins-SemiBold'` |
| `poppins` | `'700'` | `'Poppins-Bold'` |
| `poppins` | `'800'` | `'Poppins-ExtraBold'` |
| `poppins` | `'900'` | `'Poppins-Black'` |

## License

MIT
