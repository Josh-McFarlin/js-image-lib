import mimeFromBuffer from "mime-tree";
import { MimeType } from "../types/file";
import { ImageData } from "../types/image";
import {
  FlipDirection,
  OutputOptions,
  ResizeOptions,
} from "../types/transformer";
import { fixTransparency } from "../utils/transparency";
import { typeHandlers } from "./handlers";
import { blurImage } from "./operations/blur";
import { cropImage } from "./operations/crop";
import { flipImage } from "./operations/flip";
import { resizeImage } from "./operations/resize";
import { rotateImage } from "./operations/rotate";

/**
 * Mime types accepted as inputs by the ImageTransformer.
 */
export const supportedInputs = new Set([
  MimeType.JPEG,
  MimeType.PNG,
  MimeType.GIF,
  MimeType.BMP,
  MimeType.TIFF,
]);

/**
 * Mime types the ImageTransformer allows exporting as.
 */
export const supportedOutputs = new Set([
  MimeType.JPEG,
  MimeType.PNG,
  MimeType.GIF,
  MimeType.BMP,
]);

export default class ImageTransformer {
  readonly #data: ImageData;
  readonly #inputContentType: MimeType;
  /**
   * Settings used during image export for some image formats.
   */
  outputOptions: OutputOptions;

  /**
   * Create a new ImageTransformer.
   * @param image The image to transform encoded as a Uint8Array.
   * @param outputOptions Settings used during image export for some image formats. (optional)
   */
  constructor(image: Uint8Array, outputOptions?: Partial<OutputOptions>);
  /**
   * Create a new ImageTransformer.
   * @param image The image to transform encoded as a Uint8Array.
   * @param contentType The predetermined mime type of the image, optional, but speeds up transformation if provided.
   * @param outputOptions Settings used during image export for some image formats. (optional)
   */
  constructor(
    image: Uint8Array,
    contentType: MimeType,
    outputOptions?: Partial<OutputOptions>
  );
  constructor(
    image: Uint8Array,
    optionsOrContentType: Partial<OutputOptions> | MimeType | undefined,
    outputOptions: Partial<OutputOptions> = {}
  ) {
    let userOptions: Partial<OutputOptions> = {};

    if (optionsOrContentType == null) {
      this.#inputContentType = mimeFromBuffer(image);
      userOptions = outputOptions || {};
    } else if (typeof optionsOrContentType === "string") {
      this.#inputContentType = optionsOrContentType;
      userOptions = outputOptions || {};
    } else {
      this.#inputContentType = mimeFromBuffer(image);

      if (
        typeof optionsOrContentType === "object" &&
        !Array.isArray(optionsOrContentType)
      ) {
        userOptions = optionsOrContentType || {};
      }
    }

    if (!supportedInputs.has(this.#inputContentType)) {
      throw new Error(`Unsupported input file type: ${this.#inputContentType}`);
    }

    this.#data = typeHandlers[this.#inputContentType].decode(image);
    this.outputOptions = {
      background: userOptions.background ?? [0x00, 0x00, 0x00, 0x00],
      quality: userOptions.quality ?? 80,
      compressionLevel: userOptions.compressionLevel ?? 9,
      loop: userOptions.loop ?? 0,
      delay: userOptions.delay ?? 100,
    };
  }

  /**
   * Width of the currently transformed image.
   */
  get width(): number {
    return this.#data.width;
  }

  /**
   * Height of the currently transformed image.
   */
  get height(): number {
    return this.#data.height;
  }

  /**
   * Crop the image.
   * @param x The x position of the upper left pixel.
   * @param y The y position of the upper left pixel.
   * @param width The number of pixels wide to crop the image.
   * @param height The number of pixels high to crop the image.
   */
  crop(x: number, y: number, width: number, height: number): ImageTransformer {
    cropImage(
      this.#data,
      { x, y, width, height },
      this.outputOptions.background
    );
    return this;
  }

  /**
   * Resize the image.
   * @param width Width of resulting image or null.
   * @param height Height of resulting image or null. If width is present, this takes priority. (optional, default null)
   * @param options Optional settings used to adjust the fit and placement of the image within its frame.
   */
  resize(width: number, options?: ResizeOptions): ImageTransformer;
  resize(
    width: null,
    height: number,
    options?: ResizeOptions
  ): ImageTransformer;
  resize(
    width: number,
    height: number,
    options?: ResizeOptions
  ): ImageTransformer;
  resize(
    width: number | null,
    optionsOrHeight: ResizeOptions | number | null = null,
    options: ResizeOptions = {}
  ): ImageTransformer {
    let height = null;
    let userOptions: ResizeOptions = {};

    if (optionsOrHeight == null) {
      height = null;
      userOptions = options || {};
    } else if (typeof optionsOrHeight === "number") {
      height = optionsOrHeight;
      userOptions = options || {};
    } else {
      height = null;

      if (
        typeof optionsOrHeight === "object" &&
        !Array.isArray(optionsOrHeight)
      ) {
        userOptions = optionsOrHeight || {};
      }
    }

    if (!width && !height) {
      throw new Error("At least one dimension must be provided!");
    }

    resizeImage(
      this.#data,
      width,
      height,
      {
        fit: userOptions.fit ?? "cover",
        position: userOptions.position ?? "center",
      },
      this.outputOptions.background
    );
    return this;
  }

  /**
   * Flip the image across its axis.
   * @param direction The direction to mirror the image by.
   */
  flip(direction: FlipDirection): ImageTransformer {
    flipImage(this.#data, direction);
    return this;
  }

  /**
   * Rotate the image by a number of degrees clockwise.
   * @param degrees The number of degrees to rotate the image by.
   */
  rotate(degrees: number): ImageTransformer {
    rotateImage(this.#data, degrees, this.outputOptions.background);
    return this;
  }

  /**
   * Blur the image using gaussian blur with a specified radius.
   * @param blurRadius The number of pixels to blur the image by.
   */
  blur(blurRadius: number): ImageTransformer {
    blurImage(this.#data, blurRadius);
    return this;
  }

  /**
   * Export the image as a Uint8Array with an optionally specified mime type.
   * @param contentType The content type of the resulting image. (optional, default source type)
   */
  toBuffer(contentType?: MimeType): Uint8Array {
    const usingType = contentType || this.#inputContentType;

    if (!supportedOutputs.has(usingType)) {
      throw new Error(`Unsupported output file type: ${usingType}`);
    }

    return typeHandlers[usingType].encode(
      fixTransparency(this.#data, usingType, this.outputOptions.background),
      this.outputOptions
    );
  }
}
