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
* Apply operations like `crop`, `rotate`, `blur`, and `flip`

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
import { imageTransformer, MimeType } from "js-image-lib";

const image: Uint8Array = ...;
const contentType: MimeType = ...;
const transformOptions = {
  width: 100,
};

const newImage = imageTransformer({
  data: image,
  contentType
}, transformOptions);
```

**Note**: The parameter `contentType` is optional, but should be provided if it is known to speed up performance.

#### Transform Options
```typescript
export interface TransformOptions {
  /** Width of resulting image. */
  width: number;
  /** Height of resulting image. If width is present, this take priority. */
  height?: number;
  /** The content type of the resulting image. (optional, default source type) */
  contentType?: MimeType;
  /** How the image should be resized to fit both provided dimensions. (optional, default 'contain') */
  fit?: ImageFit;
  /** Position to use when fit is cover or contain. (optional, default 'center') */
  position?: ImagePosition;
  /** Background color of resulting image. (optional, default [0x00, 0x00, 0x00, 0x00]) */
  background?: Color;
  /** Quality, integer 1-100. (optional, default 80) */
  quality?: number;
  /** zlib compression level, 0-9. (optional, default 9) */
  compressionLevel?: number;
  /** Number of animation iterations, use 0 for infinite animation. (optional, default 0) */
  loop?: number;
  /** Delay between animation frames (in milliseconds). (optional, default 100) */
  delay?: number;
  /** The number of pixels to blur the image by. (optional, default null) */
  blurRadius?: number | null;
  /** The number of degrees to rotate the image by. (optional, default null) */
  rotate?: number | null;
  /** The direction to mirror the image by. (optional, default null) */
  flip?: FlipDirection | null;
  /** The location to crop the source image before any other operations are applied. (optional, default null) */
  crop?: CropOptions | null;
}
```

## Docs

- Documentation for this library can be found at: [https://js-image-lib.mcfarl.in](https://js-image-lib.mcfarl.in)
- Several examples can be found in [examples/](examples/)
