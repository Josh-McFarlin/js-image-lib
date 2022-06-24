import ImageTransformer from "js-image-lib";
import fs from "fs";
import path from "path";
import mimeFromBuffer from "mime-tree";

/**
 * Open a PNG image
 */
const filePath = path.resolve("./camera.png");
const buffer = fs.readFileSync(filePath);
const contentType = mimeFromBuffer(buffer);

const image = new Uint8Array(buffer);

/**
 * Resize the image to 200px wide and convert it to a JPEG
 */
const transformedImage = new ImageTransformer(image, contentType)
  .resize(200)
  .toBuffer("image/jpeg");

/**
 * Save the JPEG image
 */
fs.writeFileSync("./camera.jpeg", transformedImage);

console.log("Successfully transformed image!");
