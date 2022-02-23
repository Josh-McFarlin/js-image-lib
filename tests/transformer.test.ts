import fs from "fs";
import path from "path";
import { MimeType } from "mime-tree";
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

  test("should transform types", () => {
    const fromTypes = ["bmp", "gif", "jpeg", "png", "tif"];
    const toTypes = ["bmp", "gif", "jpeg", "png"];

    try {
      fs.mkdirSync(path.join(__dirname, "results"));
    } catch (err) {
      // probably already exists
    }

    fromTypes.forEach((from) => {
      const imgPath = path.join(__dirname, "fixtures", `camera.${from}`);

      toTypes.forEach((to) => {
        const resultPath = path.join(
          __dirname,
          "results",
          `camera-${from}-${to}.${to}`
        );

        const result = imageTransformer(
          {
            data: fs.readFileSync(imgPath),
          },
          {
            width: 100,
            contentType: `image/${to}` as MimeType,
          }
        );

        expect(result).not.toBeNull();

        fs.writeFileSync(resultPath, result);
      });
    });
  });
});
