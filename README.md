# js-image-lib

![](https://badgen.net/npm/v/js-image-lib)
![](https://badgen.net/npm/license/js-image-lib)
![](https://badgen.net/npm/types/js-image-lib)
![](https://badgen.net/bundlephobia/min/js-image-lib)
![](https://badgen.net/npm/dt/js-image-lib)

## 👋 Intro

An image manipulation library using only pure JavaScript

This library lets you:
* Resize images to different sizes
* Convert between the following file types: `png`, `jpeg`, `gif`, `bmp`, and `tiff`
* Apply operations like `resize`, `crop`, `rotate`, `blur`, and `flip`

This library uses pure browser-compatible JavaScript, relying on no Node packages.
This means js-image-lib can be run anywhere you use JavaScript!

**Note**: The use of pure JavaScript means this library will run much slower
than alternative libraries that have C/etc bindings. You should primarily use js-image-lib
in environments where speed is not the first concern, especially in cases where you are trying to support all platforms!

## 🚀 How to use

### Install

To install this library, use on of the following commands:
```bash
npm install -S js-image-lib
yarn add js-image-lib
```

### Use

Retrieve your image as a Uint8Array, then transform it with `imageTransformer` by providing the image and the options to use.

```typescript jsx
import ImageTransformer from "js-image-lib";

// Get your image to transform on Node
const inputJpeg = new Uint8Array(fs.readFileSync("./my-image.jpeg"));

// Or get your image to transform in the browser using fetch
const imageResponse = await fetch(url, {
  headers: {
    accept: "image/*",
  },
});
const arrBuff = await imageResponse.arrayBuffer();
const inputJpeg = new Uint8Array(arrBuff);

// Create ImageTransformer with your image
const transformer = new ImageTransformer(inputJpeg);

transformer.blur(...);
transformer.crop(...);
transformer.flip(...);
transformer.resize(...);
transformer.rotate(...);

// Operations can be done in sequence
transformer.blur(5).rotate(45).flip("both");

// Finally, export your image
const exported = transformer.toBuffer("image/jpeg");
```

## Docs

- Documentation for this library can be found at: [https://js-image-lib.mcfarl.in](https://js-image-lib.mcfarl.in)
- Several examples can be found in [examples/](examples/)
