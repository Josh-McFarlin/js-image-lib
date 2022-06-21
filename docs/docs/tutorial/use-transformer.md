---
sidebar_position: 2
---

# Use Transformer

To use the image transformer, you must first get your image encoded as an Uint8Array.
This can be accomplished various ways, such as:

### Fetch
```typescript
const fetchResolver = async (url) => {
  const imageResponse = await fetch(url, {
    headers: {
      accept: "image/*",
    },
  });
  const arrBuff = await imageResponse.arrayBuffer();

  const buffer = new Uint8Array(arrBuff);
  const contentType = imageResponse.headers.get("content-type");

  return {
    buffer,
    contentType,
  };
};
```

### File
```typescript
import fs from "fs";
import path from "path";
import { mimeFromBuffer } from "js-image-lib";

const fsResolver = async (filePath) => {
  const buffer = fs.readFileSync(filePath);
  const contentType = mimeFromBuffer(buffer);

  return {
    buffer: new Uint8Array(buffer),
    contentType,
  };
};
```

## Transform

Once, you have your image as a Uint8Array, transform it with `imageTransformer` by providing the image and the options to use.
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

## Transform Options
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
  position?: ImagePosition | string | number;
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