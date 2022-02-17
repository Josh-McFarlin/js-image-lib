import TIFFJS from "utif";
import { ImageHandler } from "../../types/transformer";

export const TiffHandler: ImageHandler = {
  decode(buffer) {
    const ifds = TIFFJS.decode(buffer);
    if (!ifds || ifds.length < 1) {
      throw new Error("Invalid TIFF!");
    }
    TIFFJS.decodeImage(buffer, ifds[0]);

    return {
      width: ifds[0].width,
      height: ifds[0].height,
      data: TIFFJS.toRGBA8(ifds[0]),
    };
  },
  encode(image) {
    const tiffImageData = TIFFJS.encodeImage(
      image.data,
      image.width,
      image.height
    );

    return new Uint8Array(tiffImageData);
  },
};
