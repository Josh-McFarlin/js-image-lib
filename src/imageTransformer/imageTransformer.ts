import mimeFromBuffer from "mime-tree";
import { MimeType } from "../types/file";
import { Transformer } from "../types/transformer";
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

/**
 * Transform an image
 */
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

  const targetWidth = Math.round(
    width || rgba.width * ((height || 0) / rgba.height)
  );
  const targetHeight = Math.round(
    height || rgba.height * ((width || 0) / rgba.width)
  );

  if (targetWidth <= 0 || targetHeight <= 0) {
    throw new Error("At least one dimension must be provided!");
  }

  const rawImageData = applyOperations(rgba, {
    width: targetWidth,
    height: targetHeight,
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
