import { decode } from "decode-tiff";
import { ImageHandler } from "../../types/transformer";

export const TiffHandler: ImageHandler = {
  decode(buffer) {
    const image = decode(buffer);

    return {
      width: image.width,
      height: image.height,
      data: image.data,
    };
  },
  encode() {
    /**
     * Tiff encoding is not supported because it is an outdated file type
     * You should use a different file type for your exports
     */
    throw new Error("Encoding is not supported for TIFF images!");
  },
};
