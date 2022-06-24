---
sidebar_position: 2
---

# Use Transformer

## 1. Retrieving Images

To use the image transformer, you must first get your image encoded as an Uint8Array.
This can be accomplished various ways, such as:

### Fetch
```typescript
const imageResponse = await fetch(url, {
  headers: {
    accept: "image/*",
  },
});
const arrBuff = await imageResponse.arrayBuffer();

const image = new Uint8Array(arrBuff);
```

### File
```typescript
import fs from "fs";
import path from "path";

const image = new Uint8Array(fs.readFileSync(filePath));
```

## 2. Create ImageTransformer
Once, you have your image as a Uint8Array, create a new instance of ImageTransformer.

If you only have the image data:

```typescript
import ImageTransformer, { OutputOptions } from "js-image-lib";

const image: Uint8Array = ...;
const outputOptions: Partial<OutputOptions> = {}; // optional

const transformer = new ImageTransformer(image, outputOptions);
```

If you know the content type of your image, you can pass it into the constructor to speed up initialization.

```typescript
import ImageTransformer, { MimeType, OutputOptions } from "js-image-lib";

const image: Uint8Array = ...;
const contentType: MimeType = ...;
const outputOptions: Partial<OutputOptions> = {}; // optional

const transformer = new ImageTransformer(image, contentType, outputOptions);
```

In both constructors, you can add a final optional parameter `outputOptions` specifying the settings used when exporting your image.
Note: these settings are not used by every file format while exporting, and may have no effect. 

```typescript
export interface OutputOptions {
  /** Background color of resulting image. (optional, default [0x00, 0x00, 0x00, 0x00]) */
  background: Color;
  /** Quality, integer 1-100. (optional, default 80) */
  quality: number;
  /** zlib compression level, 0-9. (optional, default 9) */
  compressionLevel: number;
  /** Number of animation iterations, use 0 for infinite animation. (optional, default 0) */
  loop: number;
  /** Delay between animation frames (in milliseconds). (optional, default 100) */
  delay: number;
}
```

## 3. Transform

Once, you have created your ImageTransformer, you can apply operations to it.
```typescript
import ImageTransformer from "js-image-lib";

const transformer = new ImageTransformer(image);

transformer.blur(...);
transformer.crop(...);
transformer.flip(...);
transformer.resize(...);
transformer.rotate(...);

// Operations can be done in sequence
transformer.blur(5).rotate(45).flip("both");
```

To learn more about the supported operations on ImageTransformer, read the [transformer documentation](../transformer.md).

## 4. Export

Finally, export your image as a Uint8Array by calling `toBuffer` on your ImageTransformer.

```typescript
import ImageTransformer from "js-image-lib";

const transformer = new ImageTransformer(image);

const exported: Uint8Array = transformer.toBuffer()
```

You can optionally provide a content type to export your image to.

```typescript
import ImageTransformer, { MimeType } from "js-image-lib";

const transformer = new ImageTransformer(image);

const exported: Uint8Array = transformer.toBuffer(MimeType.PNG)
```

If a content type is not provided, your image will be exported in the same content type it was originally provided in.