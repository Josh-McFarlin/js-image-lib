import { ImageFit } from "../src/types";
import { getFrameDimensions, getImageDimensions } from "../src/utils";

describe("sizing", () => {
  test("should work for contain", () => {
    const srcWidth = 200;
    const srcHeight = 200;
    const maxWidth = 400;
    const maxHeight = 600;
    const fit: ImageFit = "contain";

    const frame = getFrameDimensions(
      srcWidth,
      srcHeight,
      maxWidth,
      maxHeight,
      fit
    );
    expect(frame.frameWidth).toEqual(maxWidth);
    expect(frame.frameHeight).toEqual(maxHeight);

    const image = getImageDimensions(
      srcWidth,
      srcHeight,
      frame.frameWidth,
      frame.frameHeight,
      fit,
      "center"
    );
    expect(image.imageWidth).toEqual(maxWidth);
    expect(image.imageHeight).toEqual(maxWidth);
  });

  test("should work for cover", () => {
    const srcWidth = 200;
    const srcHeight = 200;
    const maxWidth = 400;
    const maxHeight = 600;
    const fit: ImageFit = "cover";

    const frame = getFrameDimensions(
      srcWidth,
      srcHeight,
      maxWidth,
      maxHeight,
      fit
    );
    expect(frame.frameWidth).toEqual(maxWidth);
    expect(frame.frameHeight).toEqual(maxHeight);

    const image = getImageDimensions(
      srcWidth,
      srcHeight,
      frame.frameWidth,
      frame.frameHeight,
      fit,
      "center"
    );
    expect(image.imageWidth).toEqual(maxHeight);
    expect(image.imageHeight).toEqual(maxHeight);
  });

  test("should work for fill", () => {
    const srcWidth = 200;
    const srcHeight = 200;
    const maxWidth = 400;
    const maxHeight = 600;
    const fit: ImageFit = "fill";

    const frame = getFrameDimensions(
      srcWidth,
      srcHeight,
      maxWidth,
      maxHeight,
      fit
    );
    expect(frame.frameWidth).toEqual(maxWidth);
    expect(frame.frameHeight).toEqual(maxHeight);

    const image = getImageDimensions(
      srcWidth,
      srcHeight,
      frame.frameWidth,
      frame.frameHeight,
      fit,
      "center"
    );
    expect(image.imageWidth).toEqual(maxWidth);
    expect(image.imageHeight).toEqual(maxHeight);
  });

  test("should use aspect ratio for fill with missing dimension", () => {
    const srcWidth = 200;
    const srcHeight = 200;
    const maxWidth = null;
    const maxHeight = 600;
    const fit: ImageFit = "fill";

    const frame = getFrameDimensions(
      srcWidth,
      srcHeight,
      maxWidth,
      maxHeight,
      fit
    );
    expect(frame.frameWidth).toEqual(maxHeight);
    expect(frame.frameHeight).toEqual(maxHeight);

    const image = getImageDimensions(
      srcWidth,
      srcHeight,
      frame.frameWidth,
      frame.frameHeight,
      fit,
      "center"
    );
    expect(image.imageWidth).toEqual(maxHeight);
    expect(image.imageHeight).toEqual(maxHeight);
  });

  test("should work for inside", () => {
    const srcWidth = 200;
    const srcHeight = 200;
    const maxWidth = 400;
    const maxHeight = 600;
    const fit: ImageFit = "inside";

    const frame = getFrameDimensions(
      srcWidth,
      srcHeight,
      maxWidth,
      maxHeight,
      fit
    );
    expect(frame.frameWidth).toEqual(maxWidth);
    expect(frame.frameHeight).toEqual(maxWidth);

    const image = getImageDimensions(
      srcWidth,
      srcHeight,
      frame.frameWidth,
      frame.frameHeight,
      fit,
      "center"
    );
    expect(image.imageWidth).toEqual(frame.frameWidth);
    expect(image.imageHeight).toEqual(frame.frameHeight);
  });

  test("should work for outside", () => {
    const srcWidth = 200;
    const srcHeight = 200;
    const maxWidth = 400;
    const maxHeight = 600;
    const fit: ImageFit = "outside";

    const frame = getFrameDimensions(
      srcWidth,
      srcHeight,
      maxWidth,
      maxHeight,
      fit
    );
    expect(frame.frameWidth).toEqual(maxHeight);
    expect(frame.frameHeight).toEqual(maxHeight);

    const image = getImageDimensions(
      srcWidth,
      srcHeight,
      frame.frameWidth,
      frame.frameHeight,
      fit,
      "center"
    );
    expect(image.imageWidth).toEqual(frame.frameWidth);
    expect(image.imageHeight).toEqual(frame.frameHeight);
  });
});
