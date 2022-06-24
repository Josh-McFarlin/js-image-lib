import fs from "fs";
import path from "path";
import { MimeType } from "mime-tree";
import ImageTransformer, { ImagePosition } from "../src";

describe("imageTransformer", () => {
  beforeAll(() => {
    if (!fs.existsSync(path.join(__dirname, "results"))) {
      fs.mkdirSync(path.join(__dirname, "results"));
    }
  });

  test("should be defined", () => {
    expect(ImageTransformer).not.toBeNull();
  });

  test("should throw error on invalid image", () => {
    expect(() => new ImageTransformer(new Uint8Array(1))).toThrow(
      "Buffer is not a valid image!"
    );
  });

  test("should transform types", () => {
    const fromTypes = ["bmp", "gif", "jpeg", "png", "tif"];
    const toTypes = ["bmp", "gif", "jpeg", "png"];

    fromTypes.forEach((from) => {
      const imgPath = path.join(__dirname, "fixtures", `camera.${from}`);

      toTypes.forEach((to) => {
        const resultPath = path.join(
          __dirname,
          "results",
          `camera-${from}-${to}.${to}`
        );

        const result = new ImageTransformer(fs.readFileSync(imgPath))
          .resize(100)
          .toBuffer(`image/${to}` as MimeType);

        expect(result).not.toBeNull();

        fs.writeFileSync(resultPath, result);
      });
    });
  });

  test("should resize correctly", () => {
    const positions = [
      "left top",
      "left center",
      "left bottom",
      "center top",
      "center center",
      "center bottom",
      "right top",
      "right center",
      "right bottom",
      "left",
      "center",
      "right",
      "top",
      "center",
      "bottom",
    ];

    const imgPath = path.join(__dirname, "fixtures", `camera.png`);

    positions.forEach((position) => {
      const resultPath = path.join(
        __dirname,
        "results",
        `camera-position-${position.replaceAll(" ", "-")}.png`
      );

      const result = new ImageTransformer(fs.readFileSync(imgPath), {
        background: [0x0, 0x0, 0xff, 0xff],
      })
        .resize(100, 200, {
          fit: "contain",
          position: position as ImagePosition,
        })
        .toBuffer(MimeType.PNG);

      expect(result).not.toBeNull();

      fs.writeFileSync(resultPath, result);
    });
  });

  test("should use image operations", () => {
    const imgPath = path.join(__dirname, "fixtures", `camera.png`);

    let result: Uint8Array;

    // Blur
    result = new ImageTransformer(fs.readFileSync(imgPath))
      .resize(200, 100, {
        fit: "contain",
        position: "center",
      })
      .blur(5)
      .toBuffer(MimeType.PNG);
    expect(result).not.toBeNull();
    fs.writeFileSync(
      path.join(__dirname, "results", `camera-blur.png`),
      result
    );

    // Crop
    result = new ImageTransformer(fs.readFileSync(imgPath))
      .resize(200, 100, {
        fit: "contain",
        position: "center",
      })
      .crop(50, 50, 100, 100)
      .toBuffer(MimeType.PNG);
    expect(result).not.toBeNull();
    fs.writeFileSync(
      path.join(__dirname, "results", `camera-crop.png`),
      result
    );

    // Flip
    result = new ImageTransformer(fs.readFileSync(imgPath))
      .resize(200, 100, {
        fit: "contain",
        position: "center",
      })
      .flip("both")
      .toBuffer(MimeType.PNG);
    expect(result).not.toBeNull();
    fs.writeFileSync(
      path.join(__dirname, "results", `camera-flip.png`),
      result
    );

    // Rotate
    result = new ImageTransformer(fs.readFileSync(imgPath), {
      background: [0x0, 0x0, 0xff, 0xff],
    })
      .rotate(45)
      .toBuffer(MimeType.PNG);
    expect(result).not.toBeNull();
    fs.writeFileSync(
      path.join(__dirname, "results", `camera-rotate.png`),
      result
    );
  });

  test("should use correct transparency", () => {
    const toTypes = ["bmp", "gif", "jpeg", "png"];

    const imgPath = path.join(__dirname, "fixtures", `globe.png`);

    toTypes.forEach((to) => {
      const resultPath = path.join(
        __dirname,
        "results",
        `transparency-test-${to}.${to}`
      );

      const result = new ImageTransformer(fs.readFileSync(imgPath), {
        background: [0x0, 0x0, 0xff, 0x30],
      })
        .resize(50, 100, {
          fit: "cover",
          position: "center",
        })
        .toBuffer(`image/${to}` as MimeType);

      expect(result).not.toBeNull();

      fs.writeFileSync(resultPath, result);
    });
  });

  test("should accept alternate color encodings", () => {
    const imgPath = path.join(__dirname, "fixtures", `globe-bw.png`);

    const resultPath = path.join(__dirname, "results", `alternate-color.png`);

    const result = new ImageTransformer(fs.readFileSync(imgPath), {
      background: [0x0, 0x0, 0xff, 0xff],
    })
      .resize(100, 200, {
        fit: "contain",
        position: "center",
      })
      .toBuffer(MimeType.PNG);

    expect(result).not.toBeNull();

    fs.writeFileSync(resultPath, result);
  });
});
