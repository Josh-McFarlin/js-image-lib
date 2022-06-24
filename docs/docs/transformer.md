---
sidebar_position: 3
---

# Transformer

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

## Parameters
|     Name      |         Type          | Required |  Default  |                                Description                                |
|:-------------:|:---------------------:|:--------:|:---------:|:-------------------------------------------------------------------------:|
|     image     |      Uint8Array       |    X     |           |                   The source of the image to transform.                   |
|  contentType  |       MimeType        |          |           | optional, but should be provided if it is known to speed up performance.  |
| outputOptions |     OutputOptions     |          | See Below |                The options to use to transform the image.                 |

### Default Output Options

|       Name       |  Type  |         Default          |                          Description                          |
|:----------------:|:------:|:------------------------:|:-------------------------------------------------------------:|
|    background    | Color  | [0x00, 0x00, 0x00, 0x00] |             Background color of resulting image.              |
|     quality      | number |            80            |                    Quality, integer 1-100.                    |
| compressionLevel | number |            9             |                 zlib compression level, 0-9.                  |
|       loop       | number |            0             | Number of animation iterations, use 0 for infinite animation. |
|      delay       | number |           100            |       Delay between animation frames (in milliseconds).       |


## Class Methods

### Crop
```typescript
/**
 * Crop the image.
 * @param x The x position of the upper left pixel.
 * @param y The y position of the upper left pixel.
 * @param width The number of pixels wide to crop the image.
 * @param height The number of pixels high to crop the image.
 */
crop(x: number, y: number, width: number, height: number)
```

### Resize
```typescript
/**
 * Resize the image.
 * @param width Width of resulting image or null.
 * @param height Height of resulting image or null. If width is present, this takes priority.
 * @param options Optional settings used to adjust the fit and placement of the image within its frame.
 * @param options.fit How the image should be resized to fit both provided dimensions. (optional, default 'cover')
 * @param options.position Position to use when fit is cover or contain. (optional, default 'center')
 */
resize(width: number, options?: ResizeOptions)
resize(width: null, height: number, options?: ResizeOptions)
resize(width: number, height: number, options?: ResizeOptions)
```

### Flip
```typescript
/**
 * Flip the image across its axis.
 * @param direction The direction to mirror the image by.
 */
flip(direction: FlipDirection)
```

### Rotate
```typescript
/**
 * Rotate the image by a number of degrees clockwise.
 * @param degrees The number of degrees to rotate the image by.
 */
rotate(degrees: number)
```

### Blur
```typescript
/**
 * Blur the image using gaussian blur with a specified radius.
 * @param blurRadius The number of pixels to blur the image by.
 */
blur(blurRadius: number)
```

### ToBuffer
```typescript
/**
 * Export the image as a Uint8Array with an optionally specified mime type.
 * @param contentType The content type of the resulting image. (optional, default source type)
 */
toBuffer(contentType?: MimeType)
```

## Other Types
```typescript
export type ImageFit =
  /** Preserving aspect ratio, contain image within both provided dimensions using a border where necessary. */
  | "contain"
  /** Preserving aspect ratio, ensure the image covers both provided dimensions by cropping it to fit. */
  | "cover"
  /** Ignore the aspect ratio of the input and stretch to both provided dimensions. */
  | "fill"
  /** Preserving aspect ratio, resize the image to be as large as possible while ensuring its dimensions are less than or equal to both those specified. */
  | "inside"
  /** Preserving aspect ratio, resize the image to be as small as possible while ensuring its dimensions are greater than or equal to both those specified. */
  | "outside";

export type ImagePositionHorizontal = "left" | "center" | "right";
export type ImagePositionVertical = "top" | "center" | "bottom";
export type ImagePosition =
  | ImagePositionHorizontal
  | ImagePositionVertical
  | `${ImagePositionHorizontal} ${ImagePositionVertical}`;

export type FlipDirection = "horizontal" | "vertical" | "both";

export interface ResizeOptions {
  /** How the image should be resized to fit both provided dimensions. */
  fit?: ImageFit;
  /** Position to use when fit is cover or contain. */
  position?: ImagePosition;
}
```