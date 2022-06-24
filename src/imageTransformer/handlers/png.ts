import PNGJS from "@pdf-lib/upng";
import { ImageHandler } from "../../types/transformer";

export const PngHandler: ImageHandler = {
  decode(buffer) {
    const image = PNGJS.decode(buffer);

    return {
      width: image.width,
      height: image.height,
      data: new Uint8Array(PNGJS.toRGBA8(image)[0]),
    };
  },
  encode(image) {
    const encoded = PNGJS.encode([image.data], image.width, image.height, 0);

    return new Uint8Array(encoded);
  },
};
