import jpeg from "jpeg-js";
import { ImageHandler } from "../../types/transformer";

export const JpegHandler: ImageHandler = {
  decode(buffer) {
    const image = jpeg.decode(buffer, {
      useTArray: true,
      colorTransform: true,
    });

    return {
      width: image.width,
      height: image.height,
      data: image.data,
    };
  },
  encode(image, options) {
    const jpegImageData = jpeg.encode(image, options.quality);

    return new Uint8Array(jpegImageData.data);
  },
};
