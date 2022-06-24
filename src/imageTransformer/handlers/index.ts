import { MimeType } from "../../types/file";
import { ImageHandler } from "../../types/transformer";
import { BmpHandler } from "./bmp";
import { GifHandler } from "./gif";
import { JpegHandler } from "./jpeg";
import { PngHandler } from "./png";
import { TiffHandler } from "./tiff";

export const typeHandlers: Record<string, ImageHandler> = {
  [MimeType.JPEG]: JpegHandler,
  [MimeType.PNG]: PngHandler,
  [MimeType.GIF]: GifHandler,
  [MimeType.BMP]: BmpHandler,
  [MimeType.TIFF]: TiffHandler,
};
