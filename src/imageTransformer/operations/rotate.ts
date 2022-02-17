import { ImageData } from "../../types/image";

const createTranslationFunction =
  (deltaX: number, deltaY: number) => (x: number, y: number) => ({
    x: x + deltaX,
    y: y + deltaY,
  });

export const rotateImage = (src: ImageData, degrees: number): ImageData => {
  const rad = ((degrees % 360) * Math.PI) / 180;
  const cosine = Math.cos(rad);
  const sine = Math.sin(rad);

  const dstBuffer = new Uint8Array(src.data.length);

  const translate2Cartesian = createTranslationFunction(
    -(src.width / 2),
    -(src.height / 2)
  );
  const translate2Screen = createTranslationFunction(
    src.width / 2 + 0.5,
    src.height / 2 + 0.5
  );

  for (let y = 1; y <= src.height; y++) {
    for (let x = 1; x <= src.width; x++) {
      const cartesian = translate2Cartesian(x, y);
      const source = translate2Screen(
        cosine * cartesian.x - sine * cartesian.y,
        cosine * cartesian.y + sine * cartesian.x
      );
      const dstIdx = (src.width * (y - 1) + x - 1) << 2;

      if (
        source.x >= 0 &&
        source.x < src.width &&
        source.y >= 0 &&
        source.y < src.height
      ) {
        const srcIdx = ((src.width * (source.y | 0) + source.x) | 0) << 2;
        const pixelRGBA = src.data.subarray(srcIdx, srcIdx + 4);
        dstBuffer.set(pixelRGBA, dstIdx);
      } else {
        // reset off-image pixels
        dstBuffer.fill(0, dstIdx, dstIdx + 4);
      }
    }
  }

  src.data = dstBuffer;

  return src;
};
