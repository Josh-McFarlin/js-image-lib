import { imageTransformer } from "../src";

describe("imageTransformer", () => {
  test("should be defined", () => {
    expect(imageTransformer).not.toBeNull();
  });

  test("should throw error on invalid image", () => {
    expect(() =>
      imageTransformer(
        {
          data: new Uint8Array(1),
        },
        {
          width: 100,
        }
      )
    ).toThrow("Buffer is not a valid image!");
  });
});
