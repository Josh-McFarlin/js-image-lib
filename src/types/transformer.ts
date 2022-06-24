import { Color, ImageData } from "./image";

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

export interface ImageHandler {
  decode(buffer: Uint8Array): ImageData;
  encode(image: ImageData, options: Required<OutputOptions>): Uint8Array;
}
