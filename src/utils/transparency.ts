import { MimeType } from "../types/file";
import { Color, ImageData } from "../types/image";

export const fixTransparency = (
  src: ImageData,
  contentType: MimeType,
  background: Color
): ImageData => {
  if (contentType === MimeType.GIF) {
    /** Gif does not support partial transparency */
    const newData = src.data.slice(0);
    const fixedColor = background.slice(0);
    fixedColor[3] = 0xff;

    for (let i = 0; i < newData.length; i += 4) {
      const transparency = newData[i + 3];

      if (transparency < 0x80) {
        newData.set(fixedColor, i);
      } else {
        newData[i + 3] = 0xff;
      }
    }

    return {
      width: src.width,
      height: src.height,
      data: newData,
    };
  } else if (contentType === MimeType.JPEG) {
    /** Jpeg does not support transparency */
    const newData = src.data.slice(0);

    for (let i = 3; i < newData.length; i += 4) {
      newData[i] = 0xff;
    }

    return {
      width: src.width,
      height: src.height,
      data: newData,
    };
  }

  return src;
};
