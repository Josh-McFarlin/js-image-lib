import { MimeType } from "../types/file";
import { Transformer } from "../types/transformer";
import { mimeFromBuffer } from "../utils";
import { typeHandlers } from "./handlers";
import { applyOperations } from "./operations";

const supportedInputs = new Set([
  MimeType.JPEG,
  MimeType.PNG,
  MimeType.GIF,
  MimeType.BMP,
  MimeType.TIFF,
]);

const supportedOutputs = new Set([
  MimeType.JPEG,
  MimeType.PNG,
  MimeType.GIF,
  MimeType.BMP,
]);

export const imageTransformer: Transformer = (
  { data, contentType: inputContentType = mimeFromBuffer(data) },
  {
    contentType: outputContentType = inputContentType,
    width,
    height,
    fit,
    position,
    background,
    quality,
    compressionLevel,
    loop,
    delay,
    blurRadius,
    rotate,
    flip,
    crop,
  }
) => {
  if (!supportedInputs.has(inputContentType)) {
    throw new Error(`Unsupported input file type: ${inputContentType}`);
  }
  if (!supportedOutputs.has(outputContentType)) {
    throw new Error(`Unsupported output file type: ${outputContentType}`);
  }

  const inputHandler = typeHandlers[inputContentType];
  const rgba = inputHandler.decode(data);

  const targetWidth = width || rgba.width * ((height || 0) / rgba.height);
  const targetHeight = height || rgba.height * ((width || 0) / rgba.width);

  if (targetWidth <= 0 || targetHeight <= 0) {
    throw new Error("At least one dimension must be provided!");
  }

  const rawImageData = applyOperations(rgba, {
    width: Math.round(targetWidth),
    height: Math.round(targetHeight),
    rotate,
    flip,
    blurRadius,
    crop,
  });

  const outputHandler = typeHandlers[outputContentType || inputContentType];
  return outputHandler.encode(rawImageData, {
    width: targetWidth,
    height: targetHeight,
    fit,
    position,
    background,
    quality,
    compressionLevel,
    loop,
    delay,
  });
};
